import { rename as renameFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { sep } from 'node:path';

const rn = async (path, fileNames) => {
    const oldName = path.concat(sep, fileNames[0]);
    const newName = path.concat(sep, fileNames[1]);
    await access(oldName, constants.R_OK)
        .then(() => {
            access(newName, constants.R_OK)
            .then(() => {
                console.log('FS operation failed (file exist)');
            }).catch(() => {
                renameFile(oldName, newName)
                    .then(() => console.log('File renamed'))
                    .catch((err) => {
                        throw new Error('FS operation failed')
                    })
            })
        })
        .catch((err) => console.log('FS operation failed ' + err));

};

export default rn;