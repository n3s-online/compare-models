export interface ModelConfig {
  name: string;
  provider: string;
  model: string;
  apiKey: string;
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
