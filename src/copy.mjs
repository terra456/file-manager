import { access } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { constants } from 'node:fs';
import { sep } from 'node:path';

const copy = async (path, fileNames) => {
    const oldName = path.concat(sep, fileNames[0]);
    const newName = path.concat(sep, fileNames[1]);
    try {
        await access(oldName, constants.R_OK)
            .then(() => {
                access(newName, constants.R_OK)
                    .then(() => {
                        console.log('file already exists');
                        throw new Error('file already exists');
                    })
                    .catch(() => {
                        const stream = createReadStream(oldName, 'UTF-8');
                        const writable = createWriteStream(newName);
                        stream.on('data', (chunk) => {
                            writable.write(chunk);
                        })
                        .on('end', () => {
                            writable.write('\n');
                        });
                    })
            })
        } catch (err) {
            console.log('FS operation failed (no files)', err);
        }
};

export default copy;