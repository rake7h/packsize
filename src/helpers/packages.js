const { getSizeOfPackageFile } = require('./size');
const { doExec } = require('./exec');
const packlist = require('npm-packlist');
const Arborist = require('@npmcli/arborist');

const parsePackageList = async (json, opts = {}) => {
  // add workspace name in package data
  const parsedData = json.map(async (p) => {
    const pkgDir = p.location;
    const pr = pkgDir.split(global.WS)[1].split('/');
    pr[pr.length - 1] = undefined;
    const ws = pr.join('');

    const arborist = new Arborist({ path: pkgDir });
    const tree = await arborist.loadActual();
    const pkgfiles = await packlist(tree);

    const s = await getSizeOfPackageFile(pkgDir, pkgfiles);
    p.size = s;
    p.workspace = ws;

    return p;
  });

  const d = await Promise.all(parsedData);
  return d;
};

const listPackages = async () => {
  const listPackagesCMD = () => 'lerna ls --json';
  const cmd = listPackagesCMD();
  try {
    const { error, stdout, stderr } = await doExec(cmd);
    const packData = await parsePackageList(JSON.parse(stdout));
    const r = {
      data: packData,
    };
    return r;
  } catch (e) {
    console.log('listPackages catch', e);
    return { error: e };
  }
};

module.exports = { listPackages };
