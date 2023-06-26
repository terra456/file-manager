import { homedir } from 'node:os';
import { stdin, stdout } from 'node:process';
import { argv } from 'node:process';
import path from 'path';
import changeDir from './fs/changeDir.js';
import { Buffer } from 'node:buffer';
import osInfo from './os/index.js';
import calculateHash from './hash/calcHash.js';
import { create, list, remove, rename, copyFile } from './fs/index.js';
import read from './streams/read.js';

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
      list(homeDir);
      break;

    case 'cat':
      read(homeDir, ...params);
      break;

    case 'add':
      create(homeDir, ...params);
      break;

    case 'rn':
      rename(homeDir, ...params);
      break;

    case 'cp':
      copyFile(homeDir, params).finally(() => console.log(`You are currently in ${homeDir}`));
      break;

    case 'mv':
      copyFile(homeDir, params, true);
      break;

    case 'rm':
      remove(homeDir, ...params);
      break;

    case 'os':
      osInfo(...params);
      break;
      
    case 'hash':
      calculateHash(homeDir, ...params);
      break;

    case 'compress':
      // compress path_to_file path_to_destination
      // read(homeDir, ...params);
      break;
  
    case 'decompress':
      // decompress path_to_file path_to_destination
      // read(homeDir, ...params);
      break;

    case 'exit':
      // decompress path_to_file path_to_destination
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