import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { sep } from 'node:path';

const cat = async (path, fileName) => {
    const pathToFile = path.concat(sep, fileName);
    await access(pathToFile, constants.R_OK)
        .then(() => {
            readFile(pathToFile, { encoding: 'utf8' })
                .then((data) => {
                    console.log(data);
                })
                .catch(() => {
                    throw new Error('FS operation failed');
                })
        })
        .catch((err) => {
            console.log('FS operation failed ' + err);
        })
};

export default cat;