const fs = require('fs');
const jsonfile = require('jsonfile');

const writeSizeFile = (location, content) => {
  const file = location + '/packsize.config.json';

  try {
    jsonfile.writeFileSync(
      file,
      content,
      { spaces: 2 },
      {
        flag: fs.existsSync(file) ? 'a' : undefined,
      }
    );
  } catch (e) {
    console.error('writeSizeFile failed', e);
  }
};

module.exports = {
  writeSizeFile,
};
