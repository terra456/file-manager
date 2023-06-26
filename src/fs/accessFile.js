import path from 'path';
import { access } from 'node:fs/promises';

const accessFile = async (currentPath, param) => {
  const newPath = path.resolve(currentPath, param);
  return await access(newPath, constants.F_OK)
    .then(() => {
      return true;
    })
    .catch(() => {
      console.log(`Invalid input`);
      return false;
    });
};

export default accessFile;
