import path from 'path';
import { readFile } from 'node:fs/promises';

const read = async (dirName, fileName) => {
    if (!fileName) {
        console.log('Invalid input');
        return;
    }
    const pathToFile = path.resolve(dirName, fileName);
    return readFile(pathToFile, { encoding: 'utf8' })
        .then((data) => console.log(data))
        .catch((e) => console.log('FS operation failed', ' ', e.message));
};

export default read;