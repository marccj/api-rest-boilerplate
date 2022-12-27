import chalk from 'chalk';

const chalkError = chalk.bold.red;
export const error = (msg) => {
  console.log(chalkError(`[ERROR] |${msg}`));
};

const chalkInfo = chalk.bold.blue;
export const info = (msg) => {
  console.log(chalkInfo(`[INFO] | ${msg}`));
};

const chalkImportant = chalk.bold.underline.bgYellow.white;
export const important = (msg) => {
  console.log(chalkImportant(`[IMPORTANT] | ${msg}`));
};

const chalkSuccess = chalk.bold.green.underline;
export const success = (msg) => {
  console.log(chalkSuccess(`[SUCCESS] | ${msg}`));
};

export const warning = chalk.bold.hex('#FFA500'); // Orange color
