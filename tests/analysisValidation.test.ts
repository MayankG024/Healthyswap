import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseGeminiJson,
  validateAnalysisPayload,
} from '../supabase/functions/analyze-meal/analysisValidation';

test('parseGeminiJson strips markdown fences before parsing', () => {
  assert.deepEqual(parseGeminiJson('```json\n{"ok":true}\n```'), { ok: true });
});

test('validateAnalysisPayload normalizes valid Gemini analysis JSON', () => {
  const result = validateAnalysisPayload({
    original: {
      name: 'Pizza',
      calories: 700,
      protein: 20,
      carbs: 80,
      fat: 30,
      fiber: 4,
      sugar: 8,
      factors: ['Refined crust'],
    },
    improved: {
      name: 'Veggie Thin Crust Pizza',
      calories: 430,
      protein: 24,
      carbs: 50,
      fat: 12,
      fiber: 9,
      sugar: 5,
    },
    changes: [{ label: 'Calories', change: 'down', percentage: 39 }],
    swaps: [{ original: 'White crust', replacement: 'Whole wheat crust', rationale: 'More fiber' }],
    cookingMethod: {
      original: 'Heavy cheese bake',
      improved: 'Thin crust bake',
      benefit: 'Lower fat',
    },
    portionTip: 'Add salad first',
  });

  assert.equal(result.swaps[0].benefit, 'More fiber');
  assert.equal(result.original.factors?.[0], 'Refined crust');
});

test('validateAnalysisPayload rejects missing required nutrition fields', () => {
  assert.throws(
    () => validateAnalysisPayload({ original: { name: 'Pizza' } }),
    /original.calories must be a number/,
  );
});
