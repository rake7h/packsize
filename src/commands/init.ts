import { writeSizeSnapForProject } from '../helpers/packages';
import { createRequire } from 'module'
import {getProjectsFromConfig} from '../helpers/configs';

const init = async (projectDir) => {
  console.time('init-cli');
  const require = createRequire(import.meta.url)
  const WSPackage = require(`${projectDir}/package.json`);

  global.WS = projectDir;
  global.WSPKG = WSPackage;
  global.CONFIG_FILE = 'packsize.snap.json';
  global.PACKAGE_SNAP_FILE = '.packsize.json';

  /**
   * 
   * 0 react the packge list from packsize.config
   * 
   * 0. config init for first time setup 
   * 
   * 1. read the packages list for sizecheck to enable for 
   * 
   * 2. run the size check for all list packages 
   * 
   * 3. show increased size packge in pretty view
   */

  /** get projects as per configs */

  const projects = getProjectsFromConfig(WS);

  /** get size configs for all workspace packages */
  await writeSizeSnapForProject(projects);
  console.timeEnd('init-cli');
};

export { init };
