import { homedir } from 'node:os';
import { stdin, stdout } from 'node:process';
import { argv } from 'node:process';
import path from 'path';
import changeDir from './serfe/changeDir.js';
import { Buffer } from 'node:buffer';
import list from './fs/list.js';
import read from './fs/read.js';
import osInfo from './os/index.js';

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
console.log(`You are currently in ${homeDir}/`);

stdin.on('data', async (data) => {
  const [comand, ...params] = data.toString().replace(/\r\n|\r|\n/, '').split(' ');
  process.stdout.write(params + '\n');
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
      // new_file_name
      read(homeDir, ...params);
      break;

    case 'rn':
      // path_to_file new_filename
      read(homeDir, ...params);
      break;

    case 'cp':
      // cp path_to_file path_to_new_directory
      read(homeDir, ...params);
      break;

    case 'mv':
      // mv path_to_file path_to_new_directory
      read(homeDir, ...params);
      break;

    case 'rm':
      // rm path_to_file
      read(homeDir, ...params);
      break;

    case 'os':
      // rGet EOL (default system End-Of-Line) and print it to console
      osInfo(...params);
      break;
      
    case 'hash':
      // hash path_to_file
      read(homeDir, ...params);
      break;

    case 'compress':
      // compress path_to_file path_to_destination
      read(homeDir, ...params);
      break;
  
    case 'decompress':
      // decompress path_to_file path_to_destination
      read(homeDir, ...params);
      break;
  
    default:
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