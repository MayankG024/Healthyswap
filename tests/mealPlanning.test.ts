import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGroceryItems,
  getWeekStartISO,
  normalizeMealLibraryRow,
  toSlotKey,
} from '../src/app/utils/mealPlanning';

test('getWeekStartISO returns Monday for any date in the week', () => {
  assert.equal(getWeekStartISO(new Date('2026-04-26T10:30:00Z')), '2026-04-20');
  assert.equal(getWeekStartISO(new Date('2026-04-20T01:00:00Z')), '2026-04-20');
});

test('toSlotKey creates a stable day and meal slot key', () => {
  assert.equal(toSlotKey(2, 'lunch'), '2:lunch');
});

test('normalizeMealLibraryRow creates a planner option from Supabase row data', () => {
  const meal = normalizeMealLibraryRow({
    id: 'meal-1',
    name: 'Brown Rice Chicken Biryani',
    cuisine: 'North Indian',
    food_type: 'Dish',
    health_tags: ['High Protein'],
    image_url: 'https://example.com/biryani.jpg',
    improved_nutrition: { calories: 520, protein: 38 },
    original_nutrition: { name: 'Chicken Biryani', calories: 850 },
  });

  assert.deepEqual(meal, {
    id: 'meal-1',
    name: 'Brown Rice Chicken Biryani',
    cuisine: 'North Indian',
    foodType: 'Dish',
    tags: ['High Protein'],
    image: 'https://example.com/biryani.jpg',
    calories: 520,
    protein: 38,
  });
});

test('buildGroceryItems groups planned meals into expected categories', () => {
  const items = buildGroceryItems([
    {
      id: 'item-1',
      dayOfWeek: 0,
      mealSlot: 'breakfast',
      meal: {
        id: 'meal-1',
        name: 'Greek Yogurt Berry Parfait',
        cuisine: 'Mediterranean',
        foodType: 'Dessert',
        tags: ['High Protein'],
        image: '',
        calories: 280,
        protein: 22,
      },
    },
    {
      id: 'item-2',
      dayOfWeek: 1,
      mealSlot: 'dinner',
      meal: {
        id: 'meal-2',
        name: 'Brown Rice Chicken Biryani',
        cuisine: 'North Indian',
        foodType: 'Dish',
        tags: ['High Protein'],
        image: '',
        calories: 520,
        protein: 38,
      },
    },
  ]);

  assert.deepEqual(
    items.map((item) => `${item.category}:${item.name}`),
    [
      'Dairy:Greek yogurt',
      'Produce:Mixed berries',
      'Spices:Mint or cinnamon',
      'Protein:Chicken breast',
      'Grains:Brown rice or whole grain base',
      'Produce:Mixed vegetables',
      'Spices:Herbs and spices',
    ],
  );
});
