import path from 'path';
import { access, constants } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { rm } from 'fs/promises';

const decompress = async (dirName, fileName, newPath) => {
    if (!fileName || path.extname(fileName) !== '.br') {
        console.log(path.extname(fileName));
        console.log('Invalid input');
        return;
      }
      if (!newPath) {
        newPath = path.parse(fileName).name;
      } else if (!path.extname(newPath)) {
        newPath = path.join(newPath, path.parse(fileName).name);
      }
    const srcFile = path.resolve(dirName, fileName);
    const distFile = path.resolve(dirName, newPath);
    return access(distFile, constants.F_OK)
      .then(() => {
        console.log(`FS operation failed: file already exists ${distFile}`);
      })
      .catch(() => {
          const readStream = createReadStream(srcFile);
          const writeStream = createWriteStream(distFile);
          const compressStream = createBrotliDecompress();
          readStream.on('error', () => {
            console.log(`Could not read file ${srcFile}`);
            return;
          });
          writeStream.on('error', () => {
            console.log(`Could not create file ${distFile}`);
            return;
          });
          readStream
              .pipe(compressStream)
              .pipe(writeStream);
          
          writeStream.on('close', () => {
            rm(srcFile);
            console.log('Decompressed sucsessfuly');
          });
      })
};

export default decompress;