import path from 'path';
import { stdout } from 'node:process';
import { createReadStream } from 'fs';

const read = async (dirName, fileName) => {
    const pathToFile = path.resolve(dirName, fileName);
    const readStream = createReadStream(pathToFile);
    readStream.on('data', (chunk) => {
        stdout.write(chunk);
    });
    readStream.on('error', (e) => {
        stdout.write('Error when read file \n');
    })
    readStream.on('end', () => {
        stdout.write('\n');
    })
};

export default read;
