import { ModelMetadata } from "./types";
import { MODELS_DATA } from "./models-data";

/**
 * Get model metadata by identifier
 */
export function getModelMetadata(modelIdentifier: string): ModelMetadata | undefined {
  return MODELS_DATA.find(model => model.modelIdentifier === modelIdentifier);
}

/**
 * Get all models by company
 */
export function getModelsByCompany(company: string): ModelMetadata[] {
  return MODELS_DATA.filter(model => 
    model.company.toLowerCase() === company.toLowerCase()
  );
}

/**
 * Get all models by tier
 */
export function getModelsByTier(tier: "small" | "normal" | "large"): ModelMetadata[] {
  return MODELS_DATA.filter(model => model.tier === tier);
}

/**
 * Get all models that can generate images
 */
export function getImageGenerationModels(): ModelMetadata[] {
  return MODELS_DATA.filter(model => model.canGenerateImage);
}

/**
 * Get all models with reasoning capabilities
 */
export function getReasoningModels(): ModelMetadata[] {
  return MODELS_DATA.filter(model => model.hasReasoning);
}

/**
 * Get all models by provider
 */
export function getModelsByProvider(provider: string): ModelMetadata[] {
  return MODELS_DATA.filter(model => 
    model.providers.some(p => p.toLowerCase() === provider.toLowerCase())
  );
}

/**
 * Get models sorted by cost (input tokens)
 */
export function getModelsSortedByCost(ascending: boolean = true): ModelMetadata[] {
  return [...MODELS_DATA].sort((a, b) => {
    const costA = a.usdCostPerMillionInputTokens;
    const costB = b.usdCostPerMillionInputTokens;
    return ascending ? costA - costB : costB - costA;
  });
}

/**
 * Get models sorted by context window size
 */
export function getModelsSortedByContext(ascending: boolean = false): ModelMetadata[] {
  return [...MODELS_DATA]
    .filter(model => model.context !== null)
    .sort((a, b) => {
      const contextA = a.context!;
      const contextB = b.context!;
      return ascending ? contextA - contextB : contextB - contextA;
    });
}

/**
 * Get models released after a specific date
 */
export function getModelsReleasedAfter(date: string): ModelMetadata[] {
  const targetDate = new Date(date);
  return MODELS_DATA.filter(model => {
    const releaseDate = new Date(model.releaseDate);
    return releaseDate > targetDate;
  });
}

/**
 * Get models released in a specific year
 */
export function getModelsByYear(year: number): ModelMetadata[] {
  return MODELS_DATA.filter(model => {
    const releaseYear = new Date(model.releaseDate).getFullYear();
    return releaseYear === year;
  });
}

/**
 * Search models by name (case-insensitive)
 */
export function searchModelsByName(searchTerm: string): ModelMetadata[] {
  const term = searchTerm.toLowerCase();
  return MODELS_DATA.filter(model => 
    model.modelName.toLowerCase().includes(term) ||
    model.modelIdentifier.toLowerCase().includes(term)
  );
}

/**
 * Get model statistics
 */
export function getModelStatistics() {
  const totalModels = MODELS_DATA.length;
  const companyCounts = MODELS_DATA.reduce((acc, model) => {
    acc[model.company] = (acc[model.company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const tierCounts = MODELS_DATA.reduce((acc, model) => {
    acc[model.tier] = (acc[model.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const imageGenerationCount = MODELS_DATA.filter(m => m.canGenerateImage).length;
  const reasoningCount = MODELS_DATA.filter(m => m.hasReasoning).length;
  
  const avgInputCost = MODELS_DATA.reduce((sum, model) => 
    sum + model.usdCostPerMillionInputTokens, 0) / totalModels;
  
  const avgOutputCost = MODELS_DATA
    .filter(model => model.usdCostPerMillionOutputTokens !== null)
    .reduce((sum, model) => sum + model.usdCostPerMillionOutputTokens!, 0) / 
    MODELS_DATA.filter(model => model.usdCostPerMillionOutputTokens !== null).length;

  return {
    totalModels,
    companyCounts,
    tierCounts,
    imageGenerationCount,
    reasoningCount,
    avgInputCost: Math.round(avgInputCost * 100) / 100,
    avgOutputCost: Math.round(avgOutputCost * 100) / 100,
  };
}

/**
 * Export all models data for external use
 */
export function getAllModelsData(): ModelMetadata[] {
  return [...MODELS_DATA];
}
