import fs from 'fs';
import { detailedDiff as diffCheck } from 'deep-object-diff';
import { compareSnaps } from '../helpers/packages';
import {getProjectsFromConfig} from '../helpers/configs';
import { createRequire } from 'module'

const diff = async (directory) => {
  console.time('diff-cli');
  const require = createRequire(import.meta.url)
  const WSPackage = require(`${directory}/package.json`);
  global.WS = directory;
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
  console.timeEnd('diff-cli');
};

export { diff };
