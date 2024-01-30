import fs from 'fs';
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

export {
  writeSizeFile,
  readSizeFile
};
