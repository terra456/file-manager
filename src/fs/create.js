import path from 'path';
import { access, writeFile } from 'node:fs/promises';

const create = async (dirName, fileName) => {
    const pathToFile = path.resolve(dirName, fileName);
    access(pathToFile, constants.F_OK)
        .then(() => {
            console.log('FS operation failed: file already exists');
        })
        .catch((e) => {
            writeFile(pathToFile, '')
                .then(() => console.log('file created'))
                .catch(() => console.log('Cant create file'));
        });
};

export default create;