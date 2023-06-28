import path from 'path';
import { access, constants } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { rm } from 'fs/promises';

const compress = async (dirName, fileName, newPath) => {
    if (!fileName) {
        console.log('Invalid input');
        return;
      }
      if (!newPath) {
        newPath = path.join(path.parse(fileName).name + path.parse(fileName).ext + '.br');
      } else if (!path.extname(newPath)) {
        newPath = path.join(newPath, path.parse(fileName).name + path.parse(fileName).ext + '.br');
      } else if (path.extname(newPath) !== '.br') {
          newPath = path.join(newPath, 'br');
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
          const compressStream = createBrotliCompress();
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
            console.log('Compressed sucsessfuly');
          });
      })
};

export default compress;