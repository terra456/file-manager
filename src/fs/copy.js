import path from 'path';
import { access, cp } from 'node:fs/promises';
const sourceDir = 'files';
const destDir = 'files_copy';

const copy = async () => {
    const sourcePath = path.resolve(__dirname, sourceDir);
    const destPath = path.resolve(__dirname, destDir);

    return access(sourcePath, constants.F_OK)
        .then(() => {
            access(destPath, constants.F)
                .then(() => {
                    throw new Error('FS operation failed: folder already exists');
                })
                .catch((e) => {
                    if (e.message === 'FS operation failed: folder already exists') {
                        console.log(e.message);
                    } else {
                        cp(sourcePath, destPath, {recursive: true, force: true})
                            .then(() => console.log('copied'))
                            .catch(() => {
                                console.log(e.message);
                            })
                    }
                });
        })
        .catch(() => {
            console.log('FS operation failed: no such folder');
        })
};

export default copy;
