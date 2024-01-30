import { getSizeSnapsForProject } from '../helpers/packages';
import { writeSizeFile } from '../helpers/fs';
import { createRequire } from 'module'

const init = async (projectDir) => {
  const require = createRequire(import.meta.url)
  const WSPackage = require(`${projectDir}/package.json`);

  global.WS = projectDir;
  global.WSPKG = WSPackage;
  global.CONFIG_FILE = 'packsize.config.json';
  const pkgsInfo = await getSizeSnapsForProject();
  writeSizeFile({ location: `${WS}/${CONFIG_FILE}`, content: pkgsInfo });

  console.info('packsize config initialised at root!');
};

export { init };
