import { access, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import { sep } from 'node:path';

const delite = async (path, fileName) => {
    const oldName = path.concat(sep, fileName);
    await access(oldName, constants.R_OK)
        .then(() => {
            rm(oldName)
                .then(() => console.log('File removed'))
                .catch((err) => {
                    console.log('FS operation failed ' + err);
                })
        })
        .catch((err) => console.log('FS operation failed ' + err));
};

export default delite;