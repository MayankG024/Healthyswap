export interface NutritionPayload {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  factors?: string[];
  image?: string;
}

export interface AnalysisPayload {
  original: NutritionPayload;
  improved: NutritionPayload;
  changes: Array<{
    label: string;
    change: 'up' | 'down';
    percentage: number;
  }>;
  swaps: Array<{
    original: string;
    replacement: string;
    benefit: string;
  }>;
  cookingMethod: {
    original: string;
    improved: string;
    benefit: string;
  };
  portionTip: string;
}

export function parseGeminiJson(text: string): unknown {
  const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleaned);
}

export function validateAnalysisPayload(value: unknown): AnalysisPayload {
  if (!isRecord(value)) {
    throw new Error('Analysis response must be an object.');
  }

  return {
    original: validateNutrition(value.original, 'original'),
    improved: validateNutrition(value.improved, 'improved'),
    changes: validateChanges(value.changes),
    swaps: validateSwaps(value.swaps),
    cookingMethod: validateCookingMethod(value.cookingMethod),
    portionTip: stringOrDefault(value.portionTip, 'Keep portions moderate and add vegetables for volume.'),
  };
}

function validateNutrition(value: unknown, label: string): NutritionPayload {
  if (!isRecord(value)) {
    throw new Error(`${label} must be an object.`);
  }

  return {
    name: stringOrDefault(value.name, label === 'original' ? 'Original meal' : 'Healthier meal'),
    calories: requiredNumber(value.calories, `${label}.calories`),
    protein: requiredNumber(value.protein, `${label}.protein`),
    carbs: requiredNumber(value.carbs, `${label}.carbs`),
    fat: requiredNumber(value.fat, `${label}.fat`),
    fiber: requiredNumber(value.fiber, `${label}.fiber`),
    sugar: requiredNumber(value.sugar, `${label}.sugar`),
    factors: Array.isArray(value.factors) ? value.factors.map(String) : undefined,
    image: typeof value.image === 'string' ? value.image : undefined,
  };
}

function validateChanges(value: unknown): AnalysisPayload['changes'] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('changes must be a non-empty array.');
  }

  return value.map((change, index) => {
    if (!isRecord(change)) {
      throw new Error(`changes.${index} must be an object.`);
    }

    const direction = change.change === 'up' || change.change === 'down' ? change.change : undefined;
    if (!direction) {
      throw new Error(`changes.${index}.change must be "up" or "down".`);
    }

    return {
      label: stringOrDefault(change.label, 'Nutrition'),
      change: direction,
      percentage: requiredNumber(change.percentage, `changes.${index}.percentage`),
    };
  });
}

function validateSwaps(value: unknown): AnalysisPayload['swaps'] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('swaps must be a non-empty array.');
  }

  return value.map((swap, index) => {
    if (!isRecord(swap)) {
      throw new Error(`swaps.${index} must be an object.`);
    }

    return {
      original: stringOrDefault(swap.original, 'Original ingredient'),
      replacement: stringOrDefault(swap.replacement, 'Healthier replacement'),
      benefit: stringOrDefault(swap.benefit ?? swap.rationale, 'Improves nutrition quality.'),
    };
  });
}

function validateCookingMethod(value: unknown): AnalysisPayload['cookingMethod'] {
  if (!isRecord(value)) {
    throw new Error('cookingMethod must be an object.');
  }

  return {
    original: stringOrDefault(value.original, 'Original preparation'),
    improved: stringOrDefault(value.improved, 'Healthier preparation'),
    benefit: stringOrDefault(value.benefit, 'Reduces excess calories while keeping flavor.'),
  };
}

function requiredNumber(value: unknown, label: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${label} must be a number.`);
  }

  return value;
}

function stringOrDefault(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
