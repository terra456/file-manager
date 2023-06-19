import os from "node:os";

const osInfo = (param) => {
  switch (param) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;

    case '--cpus':
      console.table(os.cpus().map((el) => {return {model: el.model, clock_rate: el.speed / 1000 + ' GHz'}}));
      break;

    case '--homedir':
      console.log(os.homedir());
      break;

    case '--username':
      console.log(os.userInfo().username);
      break;

    case '--architecture':
      console.log(os.arch());
      break;
  
    default:
      break;
  }
}

export default osInfo;