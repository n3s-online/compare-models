import * as fs from "fs/promises";
import * as path from "path";
import { MODEL_CONFIGS, validateApiKeys } from "./config";
import { generateWithModel } from "./models";
import { ComparisonResult } from "./types";
import { Logger } from "./logger";

export async function runAllModels(
  prompt: string,
  outputDir: string
): Promise<void> {
  const logger = Logger.getInstance();

  // Validate API keys
  const { valid, invalid } = validateApiKeys();

  if (invalid.length > 0) {
    logger.warning("Missing AI Gateway API key");
    logger.warning(
      "Please set the AI_GATEWAY_API_KEY environment variable to use all models"
    );
  }

  if (valid.length === 0) {
    throw new Error(
      "No AI Gateway API key found. Please set the AI_GATEWAY_API_KEY environment variable."
    );
  }

  console.log(`🔄 Running prompt through ${valid.length} models...`);

  // Run all models concurrently
  const promises = valid.map(async (config, index) => {
    console.log(`  ${index + 1}/${valid.length} Starting ${config.name}...`);
    const result = await generateWithModel(config, prompt);

    if (result.error) {
      console.log(`  ❌ ${config.name} failed: ${result.error}`);
    } else {
      console.log(`  ✅ ${config.name} completed (${result.duration}ms)`);
    }

    return result;
  });

  const responses = await Promise.all(promises);

  // Create comparison result
  const result: ComparisonResult = {
    prompt,
    timestamp: new Date().toISOString(),
    models: responses,
    summary: {
      totalModels: responses.length,
      successfulResponses: responses.filter((r) => !r.error).length,
      failedResponses: responses.filter((r) => r.error).length,
      averageDuration:
        responses.reduce((sum, r) => sum + r.duration, 0) / responses.length,
    },
  };

  // Save to JSON file
  await saveResults(result, outputDir);
}

async function saveResults(
  result: ComparisonResult,
  outputDir: string
): Promise<void> {
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `comparison-${timestamp}.json`;
  const filepath = path.join(outputDir, filename);

  // Write JSON file
  await fs.writeFile(filepath, JSON.stringify(result, null, 2), "utf-8");

  console.log(`📄 Results saved to: ${filepath}`);
  console.log(
    `📊 Summary: ${result.summary.successfulResponses}/${result.summary.totalModels} models succeeded`
  );
  console.log(
    `⏱️  Average response time: ${Math.round(result.summary.averageDuration)}ms`
  );
}
