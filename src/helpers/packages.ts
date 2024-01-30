import { getSizeOfPackageFile } from './size';
import { doExec } from './exec';
import packlist from 'npm-packlist';
import Arborist from '@npmcli/arborist';
import hash from 'object-hash';

const parsePackageList = async (json, opts = {}) => {
  // add workspace name in package data
  const parsedData = json.map(async (p) => {
    const pkgDir = p.location;
    const pr = pkgDir.split(global.WS)[1].split('/');
    pr[pr.length - 1] = undefined;
    const ws = pr.join('');

    console.log(pkgDir, pr, ws);

    /**
     * get more details of package by using Arborist
     */
    const arborist = new Arborist({ path: pkgDir });
    const tree = await arborist.loadActual();

    /**
     * get list of all files that would be part of publish package. In other words,
     * all files that go in the tar ball of a package when published.
     */
    const pkgfiles = await packlist(tree);

    /**
     * get size of each file
     */
    const s = await getSizeOfPackageFile(pkgDir, pkgfiles);

    /**
     * return the sizes for each workspace
     */
    p.size = s;
    p.workspace = ws;

    return {
      workspace: ws,
      package: p.name,
      version: p.version,
      artifacts: s
    };
  });

  const d = await Promise.all(parsedData);
  return d;
};

const getSizeSnapsForProject = async () => {
  // expecting project is in lerna
  const listPackagesCMD = () => 'lerna ls --json';
  const cmd = listPackagesCMD();
  try {
    const { error, stdout, stderr } = await doExec(cmd);
    const packData = await parsePackageList(JSON.parse(stdout));
    const r = {
      hash: hash(packData),
      packages: packData
    };
    return r;
  } catch (e) {
    console.log('listPackages catch', e);
    return { error: e };
  }
};

export { getSizeSnapsForProject };
