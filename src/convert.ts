import * as fs from "fs/promises";
import * as path from "path";
import { ComparisonResult } from "./types";
import { MODELS_DATA } from "./models-data";

/**
 * Find the most recent JSON file in the output directory
 */
async function findMostRecentJsonFile(
  outputDir: string = "output"
): Promise<string> {
  try {
    const files = await fs.readdir(outputDir);
    const jsonFiles = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => ({
        name: file,
        path: path.join(outputDir, file),
        // Extract timestamp from filename like "comparison-2025-08-25T03-35-37-348Z.json"
        timestamp: file.match(/comparison-(.+)\.json$/)?.[1] || "",
      }))
      .filter((file) => file.timestamp)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp)); // Sort by timestamp descending

    if (jsonFiles.length === 0) {
      throw new Error(
        `No JSON comparison files found in ${outputDir} directory`
      );
    }

    return jsonFiles[0].path;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new Error(`Output directory ${outputDir} does not exist`);
    }
    throw error;
  }
}

/**
 * Convert JSON comparison results to text format
 */
export async function convertJsonToText(
  inputFile?: string,
  outputFile?: string
): Promise<void> {
  // Determine input file
  const jsonFile = inputFile || (await findMostRecentJsonFile());

  // Determine output file
  const txtFile = outputFile || jsonFile.replace(/\.json$/, ".txt");

  console.log(`📖 Reading from: ${jsonFile}`);
  console.log(`📝 Writing to: ${txtFile}`);

  // Read and parse JSON file
  const jsonContent = await fs.readFile(jsonFile, "utf8");
  const data: ComparisonResult = JSON.parse(jsonContent);

  // Generate text content
  const textLines: string[] = [];

  textLines.push(`Prompt: ${data.prompt}`);
  textLines.push("");

  // Get model metadata and group by company
  const modelsByCompany = new Map<
    string,
    Array<{
      model: any;
      metadata: any;
    }>
  >();

  data.models.forEach((model) => {
    // Find metadata for this model
    const metadata = MODELS_DATA.find((m) => m.modelName === model.modelName);
    const company = metadata?.company || "Unknown";

    if (!modelsByCompany.has(company)) {
      modelsByCompany.set(company, []);
    }

    modelsByCompany.get(company)!.push({ model, metadata });
  });

  // Sort companies alphabetically and models within each company by release date (newest first)
  const sortedCompanies = Array.from(modelsByCompany.keys()).sort();

  sortedCompanies.forEach((company) => {
    const companyModels = modelsByCompany.get(company)!;

    // Sort models by release date (newest first)
    companyModels.sort((a, b) => {
      const dateA = a.metadata?.releaseDate || "1900-01-01";
      const dateB = b.metadata?.releaseDate || "1900-01-01";
      return dateB.localeCompare(dateA);
    });

    // Add each model's response
    companyModels.forEach(({ model }) => {
      if (model.error) {
      } else {
        textLines.push(`${model.modelName}: ${model.response}`);
      }
    });

    textLines.push("");
  });

  // Add summary information
  textLines.push("");
  textLines.push("--- Summary ---");
  textLines.push(`Total Models: ${data.summary.totalModels}`);
  textLines.push(`Successful Responses: ${data.summary.successfulResponses}`);
  textLines.push(`Failed Responses: ${data.summary.failedResponses}`);
  textLines.push(
    `Average Duration: ${Math.round(data.summary.averageDuration)}ms`
  );
  textLines.push(`Generated: ${data.timestamp}`);

  // Write text file
  const textContent = textLines.join("\n");
  await fs.writeFile(txtFile, textContent, "utf8");
}
