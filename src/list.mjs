import { readdir } from 'node:fs/promises';

const list = async (path) => {
    try {
        const files = await readdir(path);
        for (const file of files)
            console.log(file);
    } catch (err) {
        console.error(err);
    }
}

export default list;