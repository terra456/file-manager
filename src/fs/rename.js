import path from 'path';
import { access, rename as renameFs, constants } from 'node:fs/promises';

const rename = async (dirName, oldName, newName) => {
    if (!dirName || !oldName || !newName) {
        console.log('Invalid input');
        return;
    }
    const sourceFile = path.resolve(dirName, oldName);
    const distFile = path.resolve(dirName, newName);
    access(distFile, constants.F_OK)
        .then(() => {
            console.log(`FS operation failed: file already exists ${distFile}`);
        })
        .catch((e) => {
            renameFs(sourceFile, distFile)
                .then(() => console.log('renamed'))
                .catch((e) => {
                    console.log(`FS operation failed: no such file or directory ${sourceFile}`);
                });
        });
};

export default rename;