import fs from "fs-extra";

import jsonfile from 'jsonfile';

const writeSizeFile = ({ location, content }) => {
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

const readJsonFile = ({
  path,
}: {
  path:string;
}) => {
  const packageObj = fs.readJsonSync(path);
  if (Object.keys(packageObj).length > 0) {
    return packageObj;
  }
  throw new Error("json file not found or could be invalid for " + path);
};

export {
  readJsonFile,
  writeSizeFile,
  readSizeFile,
  removeFileOrDir
};
