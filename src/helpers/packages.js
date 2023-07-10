const { getArtifacts } = require('./size');
const { doExec } = require('./exec');
const packlist = require('npm-packlist');
const Arborist = require('@npmcli/arborist');
const hash = require('object-hash');

const parsePackageList = async (json, opts = {}) => {
  // add workspace name in package data

  const parsedData = json.map(async p => {
    const pkgDir = p.location;
    const pr = pkgDir.split(global.WS)[1].split('/');
    pr[pr.length - 1] = undefined;
    const ws = pr.join('');
    console.log('pkgDir1-0', pkgDir);

    const arborist = new Arborist({ path: pkgDir });

    const tree = await arborist.loadActual();
    const pkgfiles = await packlist(tree);
    console.log('pkgDir1-1', pkgDir);

    // order is changing here

    const s = await getArtifacts(pkgDir, pkgfiles);
    p.size = s;
    p.workspace = ws;

    return {
      workspace: ws,
      package: p.name,
      version: p.version,
      artifacts: s
    };
  });

  console.log('parsedData', JSON.stringify(parsedData));

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
      hash: hash(packData),
      packages: packData
    };
    return r;
  } catch (e) {
    console.log('listPackages catch', e);
    return { error: e };
  }
};

module.exports = { listPackages };
