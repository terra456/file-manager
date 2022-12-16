import { argv } from 'node:process';
import { homedir } from 'node:os';
import { sep } from 'node:path';

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
    dir 
    return path.concat(separator, dir);
}

process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
process.stdout.write(`You are currently in ${homeDir}\n`);
process.stdin.on('data', (chunc) => {
    const [comand, ...params] = chunc.toString().split(' ');
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
          
          break;
        case 'cat':
          
          break;
        case 'add':
          
          break;
        case 'rn':
          
          break;
        case 'cp':
          
          break;
        case 'mv':
          
          break;
        case 'rm':
          
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

