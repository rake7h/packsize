const fs = require('fs');
const gzipSize = require('gzip-size');

async function getFileSizes({ filePath }) {
  const result = {
    path: filePath,
    size: undefined,
    sizeGzip: undefined,
  };

  const fileStream = fs.createReadStream(filePath);
  const sizes = [];

  sizes.push(
    new Promise((resolve) => {
      let totalSize = 0;
      fileStream
        .on('data', (chunk) => {
          totalSize += chunk.length;
        })
        .on('end', () => {
          result.size = totalSize;
          resolve(totalSize);
        });
    })
  );

  sizes.push(
    new Promise((resolve) => {
      fileStream.pipe(gzipSize.stream()).on('gzip-size', (sizeGzip) => {
        result.sizeGzip = sizeGzip;
        resolve(sizeGzip);
      });
    })
  );
  await Promise.all(sizes);
  return result;
}

const getSizeOfPackageFile = async (pkgDir, pkgfiles) => {
  const i = {
    size: 0,
    gzip: 0,
    files: {},
  };

  await Promise.all(
    pkgfiles.map(async (f) => {
      const fpath = pkgDir + '/' + f;
      const s = await getFileSizes({ filePath: fpath });
      i.size += s.size;
      i.gzip += s.sizeGzip;
      i.files[f] = {
        path: fpath,
        size: s.size,
        gzip: s.sizeGzip,
      };
    })
  );
  return i;
};

module.exports = { getSizeOfPackageFile };
