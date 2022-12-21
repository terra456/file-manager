import { argv } from 'node:process';
import { homedir } from 'node:os';
import { sep } from 'node:path';

import list from './list.mjs';
import cat from './cat.mjs';
import add from './add.mjs';
import rn from './rename.mjs';
import copy from './copy.mjs';
import move from './move.mjs';
import delite from './delete.mjs';

const username = argv.find((el) => el.toString().startsWith('--')).split('=')[1];

const homeDir = homedir();

let currentDir = homeDir;
const separator = sep;

const upDir = (path) => {
    const res = path.split(separator);
    if (res.length > 2) {
        res.pop();
    }
    return res.join(separator);
}

const changeDir = (path, dir) => {
    const res = dir.toString().replace(/\r\n|\r|\n/, '');
    return path.concat(separator, res);
}

process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
process.stdout.write(`You are currently in ${homeDir}\n`);
process.stdin.on('data', (chunc) => {
    const [comand, ...params] = chunc.toString().replace(/\r\n|\r|\n/, '').split(' ');
    process.stdout.write(params + '\n');
    switch (comand) {
        case 'up':
            currentDir = upDir(currentDir);
            process.stdout.write(`You are currently in ${currentDir}\n`);
            break;
        case 'cd':
            currentDir = changeDir(currentDir, params);
            process.stdout.write(`You are currently in ${currentDir}\n`);
            break;
        case 'ls':
            list(currentDir);
            break;
        case 'cat':
          cat(currentDir, params);
          break;
        case 'add':
          add(currentDir, params);
          break;
        case 'rn':
          rn(currentDir, params);
          break;
        case 'cp':
          copy(currentDir, params);
          break;
        case 'mv':
          move(currentDir, params);
          break;
        case 'rm':
          delite(currentDir, params);
          break;
        case 'os':
          
          break;
        case 'hash':
          
          break;
        case 'compress':
          
          break;
        case 'decompress':
          
          break;
        default:
          console.log("Invalid input.");
    }
})
.on('end', () => {
    process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
})

