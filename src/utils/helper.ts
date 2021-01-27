import chalk from 'chalk';

export const infoLog = (msg: any): void => {
  console.log(chalk.greenBright(msg));
};

export const promptLog = (msg: any): void => {
  console.log(chalk.cyanBright(msg));
};
