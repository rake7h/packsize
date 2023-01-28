const { writeFile } = require('fs');

const writeSizeFile = (location, content) => {
  const path = location + '/packsize.config.json';

  writeFile(path, JSON.stringify(content, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    console.log('config written successfully to file');
  });
};

module.exports = {
  writeSizeFile,
};
