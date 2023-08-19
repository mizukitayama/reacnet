"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
const src_1 = require("../../../local-api/src");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action((filename = 'reactnetbook.js', options) => {
    (0, src_1.serve)(parseInt(options.port), filename, 'hihi');
});
