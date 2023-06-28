import path from 'path';
import { readdir } from 'node:fs/promises';

const list = async (dir) => {
    const sourcePath = path.resolve(dir);
    readdir(sourcePath, {withFileTypes: true})
        .then((files) => {
            console.table(
                files
                    .filter((el) => el.isDirectory())
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .concat(
                        files
                            .filter((el) => !el.isDirectory())
                            .sort((a, b) => a.name.localeCompare(b.name))
                    )
                    .map((el) => {
                        return { Name: el.name, Type: el.isDirectory() ? 'directory' : 'file' }
                    }));
            })
        .catch(() => {
            console.log('FS operation failed: no such folder');
        })
};

export default list;