import path from 'path';
import { readdir } from 'node:fs/promises';

const list = async (dir) => {
    const sourcePath = path.resolve(dir);
    readdir(sourcePath, {withFileTypes: true})
        .then((files) => {
            console.table(files.sort((el) => el.isDirectory() ? -1 : 1).map((el) => {
                return { Name: el.name, Type: el.isDirectory() ? 'directory' : 'file' }
            }));
        })
        .catch(() => {
            console.log('FS operation failed: no such folder');
        })
};

export default list;