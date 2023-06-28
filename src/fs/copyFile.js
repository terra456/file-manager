import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { access, constants } from 'node:fs/promises';
import { rm } from 'fs/promises';

const copyFile = async (dirName, [fileName, newPath], isRemoveSource = false) => {
  if (!fileName) {
    console.log('Invalid input');
    return;
  }
  if (!newPath) {
    newPath = path.parse(fileName).name + ' copy' + path.parse(fileName).ext;
  } else if (!path.extname(newPath)) {
    newPath = path.join(newPath, fileName);
  }
  const sourceFile = path.resolve(dirName, fileName);
  const distFile = path.resolve(dirName, newPath);
  await access(distFile, constants.F_OK)
    .then(() => {
      console.log(`FS operation failed: ${distFile} already exists`);
    })
    .catch(() => {
      const readStream = createReadStream(sourceFile);
      const writeStream = createWriteStream(distFile);
      readStream.on('error', () => {
        console.log(`Could not read file ${sourceFile}`);
        return;
      });
      writeStream.on('error', () => {
        console.log(`Could not create file ${distFile}`);
        return;
      });
      readStream.pipe(writeStream);
      readStream.on('end', () => {
        if (isRemoveSource) {
          rm(sourceFile);
          console.log(`File moved ${distFile}`);
        } else {
          console.log(`File copied ${distFile}`);
        }
      });
    });
};

export default copyFile;

