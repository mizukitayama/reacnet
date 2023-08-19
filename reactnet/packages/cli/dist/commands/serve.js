"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action((filename = 'reactnetbook.js', options) => {
    console.log(filename, options);
});
