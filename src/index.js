import { homedir } from 'node:os';
import { stdin } from 'node:process';
import { argv } from 'node:process';
import changeDir from './fs/changeDir.js';
import osInfo from './os/index.js';
import calculateHash from './hash/calcHash.js';
import { create, list, remove, rename, copyFile } from './fs/index.js';
import read from './streams/read.js';
import compress from './zip/compress.js';
import decompress from './zip/decompress.js';

let username;
let homeDir = homedir();
argv.forEach((el, i) => {
  if (el.startsWith('--username')) {
      username = el.split('=')[1]
  }
});
if (username) {
  console.log(`Welcome to the File Manager, ${username}!`);
}
console.log(`You are currently in ${homeDir}`);

stdin.on('data', async (data) => {
  let [comand, ...params] = data.toString().replace(/\r\n|\r|\n/, '').split(' ');
  if (data.toString().includes("\'")) {
    params = params.reduce((acc, el) => {
      if (el.startsWith("\'") && el.endsWith("\'")) {
        return acc.concat([el.replaceAll("\'", '')]);
      } else if (el.startsWith("\'")) {
        return acc.concat([el.replace("\'", '').concat(' ')]);
      } else if (el.endsWith("\'")) {
        acc[acc.length - 1] = acc[acc.length - 1].concat(el.replace("\'", ''));
        return acc;
      } else {
        acc[acc.length - 1] = acc[acc.length - 1].concat(el + ' ');
        return acc;
      }
    }, [])
  }
  switch (comand) {
    case 'up':
      homeDir = await changeDir(homeDir, '..');
      break;

    case 'cd':
      homeDir = await changeDir(homeDir, ...params);
      break;

    case 'ls':
      list(homeDir).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'cat':
      read(homeDir, ...params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'add':
      create(homeDir, ...params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'rn':
      rename(homeDir, ...params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'cp':
      copyFile(homeDir, params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'mv':
      copyFile(homeDir, params, true).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'rm':
      remove(homeDir, ...params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'os':
      osInfo(...params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;
      
    case 'hash':
      calculateHash(homeDir, ...params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'compress':
      compress(homeDir, ...params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;
  
    case 'decompress':
      decompress(homeDir, ...params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'exit':
      process.exit();
      break;
  
    default:
      console.log('Invalid input');
      break;
  }
});

process.on('SIGINT', () => {
  process.exit();
});
process.on('SIGQUIT', () => process.exit());
process.on('SIGTERM', () => process.exit());
process.on('exit', () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
});