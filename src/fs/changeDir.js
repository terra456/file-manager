import path from 'path';
import { access, constants } from 'node:fs/promises';

const changeDir = async (currentPath, param) => {
  if (!param) {
    console.log('Invalid input');
    return currentPath;
  }
  const newPath = path.resolve(currentPath, param);
  return await access(newPath, constants.F_OK)
    .then(() => {
      console.log(`You are currently in ${newPath}`);
      return newPath;
    })
    .catch(() => {
      console.log(`Cant open ${newPath}`);
      console.log(`You are currently in ${currentPath}`);
      return currentPath;
    });
};

export default changeDir;
