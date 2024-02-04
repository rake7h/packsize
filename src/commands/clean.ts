import { clearSizeSnapsForProject } from '../helpers/packages';
import {getProjectsFromConfig} from '../helpers/configs';

const clean = async (projectDir) => {
  const WSPackage = readJsonFile({path:`${projectDir}/package.json`});

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
 clearSizeSnapsForProject(projects);
};

export { clean };
