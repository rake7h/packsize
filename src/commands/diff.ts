import { compareSnaps } from '../helpers/packages';
import {getProjectsFromConfig} from '../helpers/configs';
import {readJsonFile} from '../helpers/fs';

const diff = async (projectDir) => {
  const WSPackage = readJsonFile({path:`${projectDir}/package.json`});
  global.WS = projectDir;
  global.WSPKG = WSPackage;
  global.CONFIG_FILE = 'packsize.config.json';
  global.PACKAGE_SNAP_FILE = '.packsize.json';

    /**
   * 
   * 0 react the packge list from packsize.config
   * 
   * 0. generate new size config and compare with present one
   * 
   * 1. show the diff
   * 
   */
  /** get projects as per configs */

  const projects = getProjectsFromConfig(WS);

  /** get size configs for all workspace packages */
  await compareSnaps(projects);
};

export { diff };
