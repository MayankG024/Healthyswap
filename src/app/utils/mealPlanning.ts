export type MealSlot = 'breakfast' | 'lunch' | 'dinner';
export type GroceryCategory = 'Produce' | 'Protein' | 'Grains' | 'Dairy' | 'Spices' | 'Other';

export interface PlannerMeal {
  id: string;
  name: string;
  cuisine: string;
  foodType: string;
  tags: string[];
  image: string;
  calories: number;
  protein: number;
}

export interface PlannedMealItem {
  id: string;
  dayOfWeek: number;
  mealSlot: MealSlot;
  meal: PlannerMeal;
}

export interface GroceryItem {
  name: string;
  category: GroceryCategory;
  quantity: number;
  unit: string;
  checked: boolean;
}

const DEFAULT_MEAL_IMAGE = 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=800';

export function getWeekStartISO(date: Date): string {
  const copy = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = copy.getUTCDay();
  const daysSinceMonday = day === 0 ? 6 : day - 1;
  copy.setUTCDate(copy.getUTCDate() - daysSinceMonday);
  return copy.toISOString().slice(0, 10);
}

export function toSlotKey(dayOfWeek: number, mealSlot: MealSlot): string {
  return `${dayOfWeek}:${mealSlot}`;
}

export function normalizeMealLibraryRow(row: any): PlannerMeal {
  return {
    id: row.id,
    name: row.name,
    cuisine: row.cuisine || 'Global',
    foodType: row.food_type || 'Dish',
    tags: row.health_tags || [],
    image: row.image_url || DEFAULT_MEAL_IMAGE,
    calories: row.improved_nutrition?.calories || 0,
    protein: row.improved_nutrition?.protein || 0,
  };
}

function inferMealIngredients(meal: PlannerMeal): GroceryItem[] {
  const name = meal.name.toLowerCase();
  const items: GroceryItem[] = [];

  if (name.includes('yogurt') || name.includes('parfait') || name.includes('lassi')) {
    items.push(item('Greek yogurt', 'Dairy'));
  }

  if (name.includes('berry') || name.includes('parfait') || name.includes('smoothie')) {
    items.push(item('Mixed berries', 'Produce'));
  }

  if (name.includes('chicken') || name.includes('tandoori') || name.includes('biryani')) {
    items.push(item('Chicken breast', 'Protein'));
  } else if (name.includes('paneer')) {
    items.push(item('Paneer or tofu', 'Protein'));
  } else if (name.includes('tofu')) {
    items.push(item('Tofu', 'Protein'));
  } else if (meal.tags.includes('High Protein') && meal.foodType !== 'Dessert' && meal.foodType !== 'Beverage') {
    items.push(item('Lean protein add-on', 'Protein'));
  }

  if (
    name.includes('rice') ||
    name.includes('biryani') ||
    name.includes('bowl') ||
    name.includes('roti') ||
    name.includes('oats')
  ) {
    items.push(item('Brown rice or whole grain base', 'Grains'));
  }

  if (!name.includes('berry')) {
    items.push(item('Mixed vegetables', 'Produce'));
  }

  items.push(item(meal.foodType === 'Dessert' ? 'Mint or cinnamon' : 'Herbs and spices', 'Spices'));
  return items;
}

function item(name: string, category: GroceryCategory): GroceryItem {
  return {
    name,
    category,
    quantity: 1,
    unit: 'pack',
    checked: false,
  };
}

export function buildGroceryItems(plannedItems: PlannedMealItem[]): GroceryItem[] {
  const merged = new Map<string, GroceryItem>();

  plannedItems.forEach((plannedItem) => {
    inferMealIngredients(plannedItem.meal).forEach((groceryItem) => {
      const key = `${groceryItem.category}:${groceryItem.name}`;
      const existing = merged.get(key);

      if (existing) {
        existing.quantity += groceryItem.quantity;
      } else {
        merged.set(key, { ...groceryItem });
      }
    });
  });

  return Array.from(merged.values());
}
