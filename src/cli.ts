#!/usr/bin/env node

import dotenv from "dotenv";
import { Command } from "commander";
import { runAllModels } from "./compare";
import { addModelsCommands } from "./models-cli";
import { convertJsonToText } from "./convert";

// Load environment variables from .env file
dotenv.config();

const program = new Command();

program
  .name("compare-models")
  .description("CLI tool to compare AI model outputs")
  .version("1.0.0");

program
  .command("run-all")
  .description("Run a prompt through AI models")
  .requiredOption("-p, --prompt <prompt>", "The prompt to send to all models")
  .option("-o, --output <directory>", "Output directory for results", "output")
  .option(
    "-m, --models <models>",
    "Comma-separated list of model identifiers (e.g., gpt-5,claude-sonnet-4)"
  )
  .option(
    "-d, --delay <milliseconds>",
    "Delay between batches of AI requests in milliseconds",
    "2000"
  )
  .option("--no-cleanup", "Skip GPT-3.5-turbo cleanup step for responses")
  .action(async (options) => {
    try {
      console.log("🚀 Running prompt through models...");
      console.log(`Prompt: "${options.prompt}"`);
      console.log(`Output directory: ${options.output}`);
      console.log(`Delay between batches: ${options.delay}ms`);
      console.log(
        `Response cleanup: ${options.cleanup ? "enabled" : "disabled"}`
      );

      await runAllModels(
        options.prompt,
        options.output,
        options.models,
        parseInt(options.delay),
        options.cleanup
      );

      console.log(
        "✅ Comparison complete! Check the output directory for results."
      );
    } catch (error) {
      console.error("❌ Error running comparison:", error);
      process.exit(1);
    }
  });

program
  .command("convert")
  .description("Convert JSON comparison results to text format")
  .option(
    "-i, --input <file>",
    "Input JSON file (defaults to most recent in output directory)"
  )
  .option(
    "-o, --output <file>",
    "Output text file (defaults to input filename with .txt extension)"
  )
  .action(async (options) => {
    try {
      await convertJsonToText(options.input, options.output);
      console.log("✅ Conversion complete!");
    } catch (error) {
      console.error("❌ Error converting file:", error);
      process.exit(1);
    }
  });

// Add models exploration commands
addModelsCommands(program);

program.parse();
