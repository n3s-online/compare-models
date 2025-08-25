export interface ModelConfig {
  name: string;
  provider: string;
  model: string;
  apiKey: string;
}

export interface ModelMetadata {
  company: string;
  modelName: string;
  modelIdentifier: string;
  context: number | null;
  usdCostPerMillionInputTokens: number;
  usdCostPerMillionOutputTokens: number | null;
  providers: string[];
  releaseDate: string;
  tier: "small" | "normal" | "large";
  canGenerateImage: boolean;
  hasReasoning: boolean;
}

export interface ModelResponse {
  modelName: string;
  provider: string;
  model: string;
  prompt: string;
  response: string;
  timestamp: string;
  duration: number;
  error?: string;
}

export interface ComparisonResult {
  prompt: string;
  timestamp: string;
  models: ModelResponse[];
  summary: {
    totalModels: number;
    successfulResponses: number;
    failedResponses: number;
    averageDuration: number;
  };
}
