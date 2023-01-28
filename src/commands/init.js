const init = async (directory) => {
  const { listPackages } = require('../helpers/packages');
  const { writeSizeFile } = require('../helpers/fs');

  const WSPackage = require(`${directory}/package.json`);
  global.WS = directory;
  global.WSPKG = WSPackage;

  const pkgsInfo = await listPackages(directory);
  writeSizeFile(WS, pkgsInfo);

  console.info('initialised config!');
};

module.exports = { init };
