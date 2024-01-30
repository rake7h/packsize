import fs from 'fs';
import { detailedDiff as diffCheck } from 'deep-object-diff';
import { getSizeSnapsForProject } from '../helpers/packages';
import { readSizeFile } from '../helpers/fs';
import { createRequire } from 'module'

const diff = async (directory) => {
  const require = createRequire(import.meta.url)
  const WSPackage = require(`${directory}/package.json`);
  global.WS = directory;
  global.WSPKG = WSPackage;
  global.CONFIG_FILE = 'packsize.config.json';

  if (!fs.existsSync(`${directory}/${CONFIG_FILE}`)) {
    console.info('No packsize config present, run > packsize init');
  }

  const originalConfig = await readSizeFile({
    location: `${directory}/${CONFIG_FILE}`
  });

  const updatedConfig = await getSizeSnapsForProject(directory);

  const originalHash = originalConfig.hash;
  const updatedHash = updatedConfig.hash;

  if (originalHash === updatedHash) {
    console.info('No changes!!');
  } else {
    console.log(
      JSON.stringify(diffCheck(originalConfig, updatedConfig), null, 2)
    );
    console.error('Some Changes Found!!');
  }
};

export { diff };
