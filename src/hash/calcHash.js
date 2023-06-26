import path from 'path';
import { stdout } from 'node:process';
import { createHash } from 'node:crypto';
import { createReadStream } from 'fs';

const calculateHash = async (dirName, fileName) => {
    const pathToFile = path.resolve(dirName, fileName);
    const hash = createHash('sha256');
    const input = createReadStream(pathToFile);
    input.pipe(hash).setEncoding('hex').pipe(stdout);
    input.on('end', () => console.log('\n'));
    input.on('error', () => console.log(`Cant read ${fileName}`));
};

export default calculateHash;