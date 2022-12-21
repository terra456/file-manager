import { readdir } from 'node:fs/promises';
import { type } from 'node:os';

const list = async (path) => {
    try {
        const files = await readdir(path, { withFileTypes: true });
        console.table(files.sort((el) => {
            return el.isDirectory() ? -1 : 1;
        }).map((el) => {
            return { name: el.name, type: el.isDirectory() ? 'directory' : 'file' };
        }));
    } catch (err) {
        console.error(err);
    }
}

export default list;