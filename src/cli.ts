#!/usr/bin/env node

import { Command } from 'commander';
import { runAllModels } from './compare';

const program = new Command();

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
      
      await runAllModels(options.prompt, options.output);
      
      console.log('✅ Comparison complete! Check the output directory for results.');
    } catch (error) {
      console.error('❌ Error running comparison:', error);
      process.exit(1);
    }
  });

program.parse();
