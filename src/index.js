require('dotenv').config();
const { listPackages } = require('./helpers/packages');
const { writeSizeFile } = require('./helpers/fs');

const Ws = process.env.REPO_PATH;
// eslint-disable-next-line import/no-dynamic-require
const WsPackage = require(`${Ws}/package.json`);
global.WS = Ws;
global.WSPKG = WsPackage;

const getPackageInfo = async () => {
  const pkgsInfo = await listPackages();
  console.log('pkgsInfo', pkgsInfo);

  writeSizeFile(WS, pkgsInfo);
};

getPackageInfo();
