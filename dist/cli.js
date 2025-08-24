#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const compare_1 = require("./compare");
const program = new commander_1.Command();
program
    .name('compare-models')
    .description('CLI tool to compare AI model outputs')
    .version('1.0.0');
program
    .command('run-all')
    .description('Run a prompt through all configured AI models')
    .requiredOption('-p, --prompt <prompt>', 'The prompt to send to all models')
    .option('-o, --output <directory>', 'Output directory for results', 'output')
    .action(async (options) => {
    try {
        console.log('🚀 Running prompt through all models...');
        console.log(`Prompt: "${options.prompt}"`);
        console.log(`Output directory: ${options.output}`);
        await (0, compare_1.runAllModels)(options.prompt, options.output);
        console.log('✅ Comparison complete! Check the output directory for results.');
    }
    catch (error) {
        console.error('❌ Error running comparison:', error);
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=cli.js.map