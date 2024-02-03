import fs from "fs-extra";

import jsonfile from 'jsonfile';

const writeSizeFile = ({ location, content }) => {
  console.log('writeSizeFile', location, content)
  try {
    jsonfile.writeFileSync(
      location,
      content,
      { spaces: 2 },
      {
        flag: fs.existsSync(location) ? 'a' : undefined
      }
    );
  } catch (e) {
    console.error('writeSizeFile failed', e);
  }
};

const readSizeFile = ({ location }) => {
  try {
    return jsonfile.readFileSync(location);
  } catch (e) {
    console.error('readSizeFile failed', e);
  }
};

const removeFileOrDir = (location: string): void => {
  // clean
  if (!location) {
    console.log("dir arg is missing for cleanDir() call");
  }

  if (fs.existsSync(location)) return fs.removeSync(location);
};

export {
  writeSizeFile,
  readSizeFile,
  removeFileOrDir
};
