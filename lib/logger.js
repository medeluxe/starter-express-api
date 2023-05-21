import chalk from "chalk";
export function logError(...message) {
    const log = chalk.red.bold(message);
    console.log(log);
}
export function logDefault(...message) {
    const log = chalk.white.bold(message);
    console.log(log);
}
export function logSuccess(...message) {
    const log = chalk.green.bold(message);
    console.log(log);
    console.log();
}
export function logInfo(...message) {
    const log = chalk.white.bold.bgBlue(message);
    console.log(log);
}
export function logWarning(...message) {
    const log = chalk.blue.bold.bgYellow(message);
    console.log(log);
}
