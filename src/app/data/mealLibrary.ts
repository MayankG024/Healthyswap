export type FoodType = 'Dish' | 'Snack' | 'Beverage' | 'Dessert';

export interface LibraryMeal {
  id: string;
  name: string;
  originalName: string;
  image: string;
  calories: number;
  protein: number;
  tags: string[];
  nutritionScore: number;
  caloriesReduced: number;
  cuisine: string;
  foodType: FoodType;
  originalNutrition: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  improvedNutrition: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  swaps: Array<{
    original: string;
    replacement: string;
    benefit: string;
  }>;
}

const image = 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

function meal(
  id: string,
  name: string,
  originalName: string,
  cuisine: string,
  foodType: FoodType,
  originalCalories: number,
  improvedCalories: number,
  protein: number,
  tags: string[],
): LibraryMeal {
  const caloriesReduced = Math.max(0, originalCalories - improvedCalories);
  const score = Math.max(72, Math.min(96, Math.round(76 + protein * 0.35 + caloriesReduced / 45)));

  return {
    id,
    name,
    originalName,
    image,
    calories: improvedCalories,
    protein,
    tags,
    nutritionScore: score,
    caloriesReduced,
    cuisine,
    foodType,
    originalNutrition: {
      name: originalName,
      calories: originalCalories,
      protein: Math.max(8, protein - 8),
      carbs: Math.round(originalCalories * 0.1),
      fat: Math.round(originalCalories * 0.045),
      fiber: 3,
      sugar: foodType === 'Dessert' || foodType === 'Beverage' ? 34 : 8,
    },
    improvedNutrition: {
      name,
      calories: improvedCalories,
      protein,
      carbs: Math.round(improvedCalories * 0.09),
      fat: Math.round(improvedCalories * 0.025),
      fiber: foodType === 'Beverage' ? 5 : 8,
      sugar: foodType === 'Dessert' || foodType === 'Beverage' ? 12 : 5,
    },
    swaps: [
      {
        original: 'Refined carbs and excess oil',
        replacement: 'Whole grains, lean protein, and measured oil',
        benefit: 'Improves satiety while reducing calorie density',
      },
      {
        original: 'Heavy sauces or sweeteners',
        replacement: 'Yogurt, herbs, spices, fruit, or low-sugar bases',
        benefit: 'Keeps flavor while lowering sugar and saturated fat',
      },
    ],
  };
}

export const fallbackMeals: LibraryMeal[] = [
  meal('fallback-1', 'Grilled Tandoori Chicken with Roti', 'Butter Chicken with Naan', 'North Indian', 'Dish', 820, 480, 42, ['High Protein', 'Weight Loss', 'Heart Healthy']),
  meal('fallback-2', 'Brown Rice Chicken Biryani', 'Chicken Biryani', 'Indian', 'Dish', 850, 520, 38, ['High Protein', 'Heart Healthy']),
  meal('fallback-3', 'Oats and Ragi Dosa', 'Masala Dosa with Butter', 'South Indian', 'Dish', 620, 380, 24, ['High Protein', 'Diabetic Friendly']),
  meal('fallback-4', 'Paneer Tikka with Whole Wheat Roti', 'Paneer Butter Masala', 'North Indian', 'Dish', 920, 540, 32, ['High Protein', 'Heart Healthy']),
  meal('fallback-5', 'Veggie Thin Crust Pizza', 'Cheese Burst Pizza', 'Italian', 'Dish', 980, 520, 28, ['Weight Loss', 'Heart Healthy']),
  meal('fallback-6', 'Tomato Lentil Pasta', 'Creamy Alfredo Pasta', 'Italian', 'Dish', 860, 470, 26, ['Weight Loss', 'High Protein']),
  meal('fallback-7', 'Brown Rice Sushi Bowl', 'Tempura Sushi Platter', 'Japanese', 'Dish', 780, 460, 30, ['Heart Healthy', 'High Protein']),
  meal('fallback-8', 'Chicken Lettuce Taco Bowl', 'Loaded Nachos', 'Mexican', 'Dish', 900, 510, 40, ['High Protein', 'Weight Loss']),
  meal('fallback-9', 'Tofu Vegetable Stir Fry', 'Chilli Paneer Fried Rice', 'Chinese', 'Dish', 820, 450, 27, ['Weight Loss', 'Diabetic Friendly']),
  meal('fallback-10', 'Grilled Chicken Shawarma Bowl', 'Creamy Shawarma Wrap', 'Middle Eastern', 'Dish', 760, 480, 39, ['High Protein', 'Heart Healthy']),
  meal('fallback-11', 'Baked Whole Wheat Samosas', 'Fried Samosas', 'Indian', 'Snack', 720, 380, 18, ['Weight Loss', 'Diabetic Friendly']),
  meal('fallback-12', 'Air-Fried Sweet Potato Wedges', 'French Fries', 'American', 'Snack', 560, 260, 6, ['Weight Loss', 'Heart Healthy']),
  meal('fallback-13', 'Steamed Veg Momos', 'Fried Momos', 'Chinese', 'Snack', 610, 330, 16, ['Weight Loss']),
  meal('fallback-14', 'Sprout Bhel Bowl', 'Sev Puri Chaat', 'Indian', 'Snack', 520, 290, 15, ['Diabetic Friendly', 'Weight Loss']),
  meal('fallback-15', 'Baked Spring Rolls', 'Fried Spring Rolls', 'Thai', 'Snack', 590, 310, 14, ['Weight Loss']),
  meal('fallback-16', 'Roasted Chickpea Trail Mix', 'Packaged Chips', 'American', 'Snack', 480, 250, 14, ['High Protein', 'Heart Healthy']),
  meal('fallback-17', 'Unsweetened Cold Coffee Protein Shake', 'Cold Coffee with Ice Cream', 'American', 'Beverage', 540, 220, 24, ['High Protein', 'Weight Loss']),
  meal('fallback-18', 'Low-Sugar Mango Lassi', 'Sweet Mango Shake', 'Indian', 'Beverage', 490, 240, 14, ['Diabetic Friendly']),
  meal('fallback-19', 'Masala Chai with Less Sugar', 'Creamy Sweet Chai', 'Indian', 'Beverage', 260, 90, 5, ['Weight Loss', 'Diabetic Friendly']),
  meal('fallback-20', 'Fruit Yogurt Smoothie', 'Bubble Tea', 'Korean', 'Beverage', 620, 280, 18, ['High Protein']),
  meal('fallback-21', 'Date-Free Kheer with Nuts', 'Sugar-Rich Kheer', 'Indian', 'Dessert', 640, 340, 13, ['Diabetic Friendly']),
  meal('fallback-22', 'Baked Apple Yogurt Bowl', 'Apple Pie with Ice Cream', 'American', 'Dessert', 780, 320, 16, ['Weight Loss']),
  meal('fallback-23', 'Greek Yogurt Berry Parfait', 'Ice Cream Sundae', 'Mediterranean', 'Dessert', 700, 280, 22, ['High Protein', 'Weight Loss']),
  meal('fallback-24', 'Dark Chocolate Chia Mousse', 'Chocolate Mousse', 'French', 'Dessert', 590, 310, 12, ['Heart Healthy']),
];

export const healthFilters = ['All Meals', 'High Protein', 'Weight Loss', 'Diabetic Friendly', 'Heart Healthy'];
export const foodTypeFilters: Array<'All Types' | FoodType> = ['All Types', 'Dish', 'Snack', 'Beverage', 'Dessert'];
export const cuisineFilters = [
  'All Cuisines',
  'Indian',
  'South Indian',
  'North Indian',
  'Chinese',
  'Italian',
  'Mexican',
  'Mediterranean',
  'Japanese',
  'Korean',
  'Thai',
  'American',
  'French',
  'Middle Eastern',
];
