import { access, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { sep } from 'node:path';

const add = async (path, fileName) => {
    const pathToFile = path.concat(sep, fileName);
    try {
        await access(pathToFile, constants.R_OK | constants.W_OK);
        console.log('File allreadu exists');
        throw new Error('FS operation fail');
    } catch {
        writeFile(pathToFile, '', 'utf8', (err) => {
            console.log('Done');
            if (err) throw err;
        });
    }
}

export default add;