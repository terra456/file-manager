import copy from "./copy.mjs";
import delite from "./delete.mjs";
import { sep } from 'node:path';

const move = async (path, fileNames) => {
    const oldName = path.concat(sep, fileNames[0]);
    const newName = path.concat(sep, fileNames[1]);
    try {
        await copy(path, fileNames)
            .then(() => {
                delite(path, fileNames[0]);
            })
        } catch (err) {
            console.log('FS operation failed (no files)', err);
        }
};

export default move;