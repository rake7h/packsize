import fs from 'fs';
import path from 'path';
import gzipSize from 'gzip-size';
import byteSize from 'byte-size';

async function getFileSizes({ filePath }) {
  const result = {
    path: filePath,
    size: undefined,
    sizeGzip: undefined
  };

  const fileStream = fs.createReadStream(filePath);

  const [totalSize, sizeGzip] = await Promise.all([
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
    }),
    new Promise((resolve) => {
      fileStream.pipe(gzipSize.stream()).on('gzip-size', (sizeGzip) => {
        result.sizeGzip = sizeGzip;
        resolve(sizeGzip);
      });
    })
  ]);

  return result;
}

const getSizeOfPackageFile = async (pkgDir, pkgfiles) => {
  const i = {
    size: 0,
    files: {}
  };

  const results = await Promise.all(
    pkgfiles.map(async (f, index) => {
      const fpath = path.join(pkgDir, f);
      const { size, sizeGzip } = await getFileSizes({ filePath: fpath });

      i.size += size;

      i.files[f] = {
        size: byteSize(size).toString(),
        // gzip: byteSize(sizeGzip).toString()
      };

      return { index, result: i.files[f] };
    })
  );

  // Sort the results based on the original index
  results.sort((a, b) => a.index - b.index);

  const sortedFiles = {};
  results.forEach(({ result }, index) => {
    sortedFiles[pkgfiles[index]] = result;
  });

  return {
    ...i,
    size: byteSize(i.size).toString(),
    files: sortedFiles,
  };
};

export { getSizeOfPackageFile };
