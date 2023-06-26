import path from 'path';
import { rm } from 'node:fs/promises';

const remove = async (dirName, fileName) => {
    const pathToFile = path.resolve(dirName, fileName);
    rm(pathToFile)
        .then(() => console.log('deleted'))
        .catch(() => {
            console.log('FS operation failed: no such file');
        })
};

export default remove;