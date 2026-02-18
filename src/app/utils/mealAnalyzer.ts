export interface NutritionChange {
  label: string;
  change: 'up' | 'down';
  percentage: number;
}

export interface IngredientSwap {
  original: string;
  replacement: string;
  benefit: string;
}

export interface MealData {
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  factors?: string[];
}

export interface MealAnalysis {
  original: MealData;
  improved: MealData;
  changes: NutritionChange[];
  swaps: IngredientSwap[];
  cookingMethod: {
    original: string;
    improved: string;
    benefit: string;
  };
  portionTip: string;
}

// DETERMINISTIC NUTRITION RULES
interface NutritionThresholds {
  calories: { max: number; target: number };
  protein: { min: number; target: number };
  fat: { max: number; saturatedFatMax: number };
  carbs: { max: number; refinedMax: number };
  fiber: { min: number; target: number };
  sugar: { max: number; addedSugarMax: number };
  sodium: { max: number };
}

const NUTRITION_THRESHOLDS: NutritionThresholds = {
  calories: { max: 800, target: 500 },       // Above 800 requires reduction
  protein: { min: 20, target: 30 },          // Below 20g needs boost
  fat: { max: 25, saturatedFatMax: 10 },     // Above 25g total fat needs reduction
  carbs: { max: 70, refinedMax: 40 },        // High carbs need evaluation
  fiber: { min: 5, target: 8 },              // Below 5g needs increase
  sugar: { max: 12, addedSugarMax: 8 },      // Above 12g needs reduction
  sodium: { max: 800 }                       // Above 800mg needs reduction
};

// Apply deterministic rules to generate improvement suggestions
function applyNutritionRules(original: MealData): {
  targetCalories: number;
  targetProtein: number;
  targetFat: number;
  targetCarbs: number;
  targetFiber: number;
  targetSugar: number;
  requiredSwaps: string[];
} {
  const requiredSwaps: string[] = [];
  
  // Rule 1: If calories > 800, must reduce by 30-40%
  let targetCalories = original.calories;
  if (original.calories > NUTRITION_THRESHOLDS.calories.max) {
    targetCalories = Math.round(original.calories * 0.65); // 35% reduction
    requiredSwaps.push('calorie_reduction');
  } else if (original.calories > NUTRITION_THRESHOLDS.calories.target) {
    targetCalories = Math.round(original.calories * 0.8); // 20% reduction
  }
  
  // Rule 2: If protein < 20g, must boost
  let targetProtein = original.protein;
  if (original.protein < NUTRITION_THRESHOLDS.protein.min) {
    targetProtein = NUTRITION_THRESHOLDS.protein.target;
    requiredSwaps.push('protein_boost');
  } else if (original.protein < NUTRITION_THRESHOLDS.protein.target) {
    targetProtein = Math.round(original.protein * 1.3);
  }
  
  // Rule 3: If fat > 25g, must reduce
  let targetFat = original.fat;
  if (original.fat > NUTRITION_THRESHOLDS.fat.max) {
    targetFat = Math.round(original.fat * 0.5); // 50% reduction
    requiredSwaps.push('fat_reduction');
  }
  
  // Rule 4: Carbs - reduce refined carbs
  let targetCarbs = original.carbs;
  if (original.carbs > NUTRITION_THRESHOLDS.carbs.max) {
    targetCarbs = Math.round(original.carbs * 0.65);
    requiredSwaps.push('carb_swap');
  }
  
  // Rule 5: If fiber < 5g, must increase
  let targetFiber = original.fiber;
  if (original.fiber < NUTRITION_THRESHOLDS.fiber.min) {
    targetFiber = NUTRITION_THRESHOLDS.fiber.target;
    requiredSwaps.push('fiber_boost');
  }
  
  // Rule 6: If sugar > 12g, must reduce
  let targetSugar = original.sugar;
  if (original.sugar > NUTRITION_THRESHOLDS.sugar.max) {
    targetSugar = Math.round(original.sugar * 0.5);
    requiredSwaps.push('sugar_reduction');
  }
  
  return {
    targetCalories,
    targetProtein,
    targetFat,
    targetCarbs,
    targetFiber,
    targetSugar,
    requiredSwaps
  };
}

// Mock meal database
const mealDatabase: { [key: string]: MealAnalysis } = {
  'butter chicken': {
    original: {
      name: 'Butter Chicken with Naan',
      image: 'https://images.unsplash.com/photo-1766589221522-d5beae155124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjB1bmhlYWx0aHl8ZW58MXx8fHwxNzcwMjg3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 820,
      protein: 35,
      carbs: 68,
      fat: 48,
      fiber: 3,
      sugar: 12,
      factors: ['High in saturated fat', 'Heavy cream', 'Refined flour naan']
    },
    improved: {
      name: 'Grilled Tandoori Chicken with Roti',
      image: 'https://images.unsplash.com/photo-1735353783227-80b22ef618d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGhlYWx0aHl8ZW58MXx8fHwxNzcwMjg3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 480,
      protein: 42,
      carbs: 45,
      fat: 16,
      fiber: 7,
      sugar: 4
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 41 },
      { label: 'Protein', change: 'up', percentage: 20 },
      { label: 'Fat', change: 'down', percentage: 67 },
      { label: 'Fiber', change: 'up', percentage: 133 },
      { label: 'Sugar', change: 'down', percentage: 67 }
    ],
    swaps: [
      {
        original: 'Heavy cream & butter',
        replacement: 'Greek yogurt',
        benefit: 'Cuts fat by 60%, adds probiotics'
      },
      {
        original: 'Refined flour naan',
        replacement: 'Whole wheat roti',
        benefit: 'More fiber, slower digestion'
      },
      {
        original: 'Fried chicken',
        replacement: 'Tandoori grilled chicken',
        benefit: 'Less oil, retains protein'
      }
    ],
    cookingMethod: {
      original: 'Pan-fried with butter',
      improved: 'Grilled/Tandoori',
      benefit: 'Eliminates excess oil while maintaining flavor through spices'
    },
    portionTip: 'Pair with a side salad to increase volume without extra calories'
  },
  'instant noodles': {
    original: {
      name: 'Instant Noodles',
      image: 'https://images.unsplash.com/photo-1766589221522-d5beae155124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjB1bmhlYWx0aHl8ZW58MXx8fHwxNzcwMjg3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 380,
      protein: 10,
      carbs: 52,
      fat: 14,
      fiber: 2,
      sugar: 3,
      factors: ['High sodium (1800mg)', 'Refined carbs', 'Low nutrients']
    },
    improved: {
      name: 'Vegetable Noodle Bowl',
      image: 'https://images.unsplash.com/photo-1661257711676-79a0fc533569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJvd2wlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzAyODc1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 320,
      protein: 18,
      carbs: 42,
      fat: 8,
      fiber: 9,
      sugar: 5
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 16 },
      { label: 'Protein', change: 'up', percentage: 80 },
      { label: 'Fat', change: 'down', percentage: 43 },
      { label: 'Fiber', change: 'up', percentage: 350 },
      { label: 'Sodium', change: 'down', percentage: 75 }
    ],
    swaps: [
      {
        original: 'Instant noodles',
        replacement: 'Rice noodles or zucchini noodles',
        benefit: 'Lower sodium, more nutrients'
      },
      {
        original: 'Flavor packet',
        replacement: 'Low-sodium broth + fresh herbs',
        benefit: 'Reduces sodium by 75%'
      },
      {
        original: 'No vegetables',
        replacement: 'Add bok choy, carrots, mushrooms',
        benefit: 'Boosts vitamins and fiber'
      }
    ],
    cookingMethod: {
      original: 'Boiled with flavor packet',
      improved: 'Fresh ingredients in homemade broth',
      benefit: 'Control sodium and add real nutrition'
    },
    portionTip: 'Fill half the bowl with vegetables to increase satiety'
  },
  'fried rice': {
    original: {
      name: 'Fried Rice',
      image: 'https://images.unsplash.com/photo-1766589221522-d5beae155124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjB1bmhlYWx0aHl8ZW58MXx8fHwxNzcwMjg3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 520,
      protein: 12,
      carbs: 78,
      fat: 18,
      fiber: 2,
      sugar: 4,
      factors: ['High in oil', 'White rice', 'Low vegetables']
    },
    improved: {
      name: 'Cauliflower Fried "Rice"',
      image: 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzcwMjA3OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 240,
      protein: 16,
      carbs: 28,
      fat: 8,
      fiber: 8,
      sugar: 6
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 54 },
      { label: 'Protein', change: 'up', percentage: 33 },
      { label: 'Fat', change: 'down', percentage: 56 },
      { label: 'Fiber', change: 'up', percentage: 300 },
      { label: 'Carbs', change: 'down', percentage: 64 }
    ],
    swaps: [
      {
        original: 'White rice',
        replacement: 'Cauliflower rice',
        benefit: 'Cuts carbs by 75%, adds vitamins'
      },
      {
        original: 'Vegetable oil',
        replacement: 'Spray olive oil',
        benefit: 'Reduces fat while maintaining flavor'
      },
      {
        original: 'Minimal vegetables',
        replacement: 'Mixed vegetables & edamame',
        benefit: 'Increases protein and nutrients'
      }
    ],
    cookingMethod: {
      original: 'Deep fried in oil',
      improved: 'Stir-fried with minimal oil',
      benefit: 'Reduces oil absorption significantly'
    },
    portionTip: 'Use a smaller bowl and eat slowly to feel satisfied with less'
  },
  'pizza': {
    original: {
      name: 'Pizza Margherita',
      image: 'https://images.unsplash.com/photo-1766589221522-d5beae155124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjB1bmhlYWx0aHl8ZW58MXx8fHwxNzcwMjg3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 680,
      protein: 24,
      carbs: 82,
      fat: 28,
      fiber: 4,
      sugar: 8,
      factors: ['Refined flour crust', 'High cheese', 'Low vegetables']
    },
    improved: {
      name: 'Thin Crust Veggie Pizza',
      image: 'https://images.unsplash.com/photo-1661257711676-79a0fc533569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJvd2wlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzAyODc1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 420,
      protein: 22,
      carbs: 52,
      fat: 14,
      fiber: 9,
      sugar: 6
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 38 },
      { label: 'Fat', change: 'down', percentage: 50 },
      { label: 'Fiber', change: 'up', percentage: 125 },
      { label: 'Carbs', change: 'down', percentage: 37 },
      { label: 'Protein', change: 'down', percentage: 8 }
    ],
    swaps: [
      {
        original: 'Thick white flour crust',
        replacement: 'Thin whole wheat crust',
        benefit: 'More fiber, fewer calories'
      },
      {
        original: 'Heavy cheese',
        replacement: 'Light mozzarella + nutritional yeast',
        benefit: 'Cuts fat while keeping flavor'
      },
      {
        original: 'Few toppings',
        replacement: 'Loaded with vegetables',
        benefit: 'Adds nutrients and volume'
      }
    ],
    cookingMethod: {
      original: 'Baked with excess cheese',
      improved: 'Baked with balanced toppings',
      benefit: 'Better nutritional balance'
    },
    portionTip: 'Start with a salad to reduce pizza consumption'
  },
  'biryani': {
    original: {
      name: 'Chicken Biryani',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pfGVufDB8fHx8MTcwOTMwNDUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 850,
      protein: 32,
      carbs: 95,
      fat: 38,
      fiber: 3,
      sugar: 6,
      factors: ['High calories', 'Excess oil/ghee', 'White basmati rice', 'High sodium']
    },
    improved: {
      name: 'Brown Rice Chicken Biryani',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwYmlyeWFuaXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 520,
      protein: 38,
      carbs: 62,
      fat: 14,
      fiber: 9,
      sugar: 4
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 39 },
      { label: 'Protein', change: 'up', percentage: 19 },
      { label: 'Fat', change: 'down', percentage: 63 },
      { label: 'Fiber', change: 'up', percentage: 200 },
      { label: 'Carbs', change: 'down', percentage: 35 }
    ],
    swaps: [
      {
        original: 'White basmati rice',
        replacement: 'Brown rice or quinoa blend',
        benefit: 'Triple the fiber, better blood sugar control'
      },
      {
        original: 'Excess ghee/oil',
        replacement: 'Minimal oil with yogurt marinade',
        benefit: 'Cuts fat by 60%, adds probiotics'
      },
      {
        original: 'Deep fried onions',
        replacement: 'Air-fried or caramelized onions',
        benefit: 'Same flavor, 70% less oil'
      }
    ],
    cookingMethod: {
      original: 'Dum cooked with excess ghee',
      improved: 'Pressure cooked with minimal oil',
      benefit: 'Retains flavor while drastically reducing fat'
    },
    portionTip: 'Fill half your plate with raita and salad before serving biryani'
  },
  'samosa': {
    original: {
      name: 'Fried Samosas (3 pieces)',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2F8ZW58MHx8fHwxNzA5MzA0NTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 720,
      protein: 14,
      carbs: 76,
      fat: 42,
      fiber: 4,
      sugar: 3,
      factors: ['Deep fried', 'Refined flour', 'High in saturated fat', 'Low protein']
    },
    improved: {
      name: 'Baked Whole Wheat Samosas (3 pieces)',
      image: 'https://images.unsplash.com/photo-1626132647523-66f2bf18ba8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyMHx8aGVhbHRoeSUyMHNhbW9zYXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 380,
      protein: 18,
      carbs: 52,
      fat: 12,
      fiber: 8,
      sugar: 3
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 47 },
      { label: 'Protein', change: 'up', percentage: 29 },
      { label: 'Fat', change: 'down', percentage: 71 },
      { label: 'Fiber', change: 'up', percentage: 100 },
      { label: 'Carbs', change: 'down', percentage: 32 }
    ],
    swaps: [
      {
        original: 'Refined flour (maida)',
        replacement: 'Whole wheat flour',
        benefit: 'Doubles fiber, more nutrients'
      },
      {
        original: 'Deep fried in oil',
        replacement: 'Baked with oil spray',
        benefit: 'Cuts fat by 70%'
      },
      {
        original: 'Potato filling only',
        replacement: 'Potato + peas + paneer',
        benefit: 'Adds protein and nutrients'
      }
    ],
    cookingMethod: {
      original: 'Deep fried at high temperature',
      improved: 'Baked at 200°C until golden',
      benefit: 'Crispy exterior without oil absorption'
    },
    portionTip: 'Limit to 2 pieces and pair with mint chutney and salad'
  },
  'paneer': {
    original: {
      name: 'Paneer Butter Masala with Naan',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjBidXR0ZXIlMjBtYXNhbGF8ZW58MHx8fHwxNzA5MzA0NTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 920,
      protein: 28,
      carbs: 78,
      fat: 56,
      fiber: 4,
      sugar: 14,
      factors: ['High fat from cream', 'Heavy butter', 'Refined naan', 'High calories']
    },
    improved: {
      name: 'Paneer Tikka with Whole Wheat Roti',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwYW5lZXIlMjB0aWtrYXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 540,
      protein: 32,
      carbs: 48,
      fat: 24,
      fiber: 8,
      sugar: 6
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 41 },
      { label: 'Protein', change: 'up', percentage: 14 },
      { label: 'Fat', change: 'down', percentage: 57 },
      { label: 'Fiber', change: 'up', percentage: 100 },
      { label: 'Sugar', change: 'down', percentage: 57 }
    ],
    swaps: [
      {
        original: 'Cream-based gravy',
        replacement: 'Yogurt and tomato-based gravy',
        benefit: 'Cuts fat by 60%, adds probiotics'
      },
      {
        original: 'Butter (makhani)',
        replacement: 'Olive oil + spices',
        benefit: 'Healthier fats, same richness'
      },
      {
        original: 'Refined flour naan',
        replacement: 'Whole wheat roti',
        benefit: 'Double the fiber, slower digestion'
      }
    ],
    cookingMethod: {
      original: 'Paneer fried, gravy with heavy cream',
      improved: 'Grilled paneer, lighter gravy',
      benefit: 'Maintains protein, eliminates excess fat'
    },
    portionTip: 'Use paneer as a protein source with more vegetables on the side'
  },
  'chole bhature': {
    original: {
      name: 'Chole Bhature',
      image: 'https://images.unsplash.com/photo-1626132647523-66f2bf18ba8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyMHx8aGVhbHRoeSUyMHNhbW9zYXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 950,
      protein: 24,
      carbs: 98,
      fat: 52,
      fiber: 12,
      sugar: 8,
      factors: ['Deep fried bhature', 'High calories', 'Excess oil', 'Very heavy meal']
    },
    improved: {
      name: 'Chole with Whole Wheat Kulcha',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9sZSUyMGN1cnJ5JTIwaGVhbHRoeXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 480,
      protein: 22,
      carbs: 64,
      fat: 14,
      fiber: 14,
      sugar: 6
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 49 },
      { label: 'Fat', change: 'down', percentage: 73 },
      { label: 'Fiber', change: 'up', percentage: 17 },
      { label: 'Carbs', change: 'down', percentage: 35 },
      { label: 'Protein', change: 'down', percentage: 8 }
    ],
    swaps: [
      {
        original: 'Deep fried bhature',
        replacement: 'Baked whole wheat kulcha',
        benefit: 'Eliminates 75% of fat'
      },
      {
        original: 'Oil-rich chole',
        replacement: 'Chole with minimal oil',
        benefit: 'Keeps protein and fiber, reduces fat'
      },
      {
        original: 'Large portion',
        replacement: 'Moderate portion with salad',
        benefit: 'Better portion control'
      }
    ],
    cookingMethod: {
      original: 'Bhature deep fried, chole in excess oil',
      improved: 'Kulcha baked, chole simmered',
      benefit: 'Maintains authentic taste with minimal oil'
    },
    portionTip: 'Have 1 kulcha instead of 2 bhature, add onion-tomato salad'
  },
  'dosa': {
    original: {
      name: 'Masala Dosa with Butter',
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3NhfGVufDB8fHx8MTcwOTMwNDUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 620,
      protein: 16,
      carbs: 88,
      fat: 22,
      fiber: 4,
      sugar: 4,
      factors: ['Excess butter/oil', 'White rice batter', 'Large portion', 'Low protein']
    },
    improved: {
      name: 'Oats and Ragi Dosa',
      image: 'https://images.unsplash.com/photo-1694170269221-ea3df8c27f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWdpJTIwZG9zYXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 380,
      protein: 24,
      carbs: 54,
      fat: 9,
      fiber: 10,
      sugar: 3
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 39 },
      { label: 'Protein', change: 'up', percentage: 50 },
      { label: 'Fat', change: 'down', percentage: 59 },
      { label: 'Fiber', change: 'up', percentage: 150 },
      { label: 'Carbs', change: 'down', percentage: 39 }
    ],
    swaps: [
      {
        original: 'White rice batter',
        replacement: 'Oats + ragi + lentils batter',
        benefit: 'More protein, fiber, and minerals'
      },
      {
        original: 'Excess butter on dosa',
        replacement: 'Light oil spray',
        benefit: 'Cuts fat by 60%'
      },
      {
        original: 'Potato masala filling',
        replacement: 'Mixed vegetable + paneer filling',
        benefit: 'Higher protein and nutrients'
      }
    ],
    cookingMethod: {
      original: 'Made with butter on high heat',
      improved: 'Non-stick pan with minimal oil',
      benefit: 'Same crispy texture, far less fat'
    },
    portionTip: 'One medium dosa with sambar and chutney is sufficient'
  },
  'burger': {
    original: {
      name: 'Burger with Fries',
      image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmcmllc3xlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 1050,
      protein: 32,
      carbs: 98,
      fat: 58,
      fiber: 4,
      sugar: 12,
      factors: ['Deep fried fries', 'Processed meat patty', 'Refined bun', 'High sodium']
    },
    improved: {
      name: 'Grilled Chicken Burger with Sweet Potato',
      image: 'https://images.unsplash.com/photo-1619221882010-23e5b72bc561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8aGVhbHRoeSUyMGJ1cmdlcnxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 520,
      protein: 42,
      carbs: 54,
      fat: 16,
      fiber: 9,
      sugar: 8
    },
    changes: [
      { label: 'Calories', change: 'down', percentage: 50 },
      { label: 'Protein', change: 'up', percentage: 31 },
      { label: 'Fat', change: 'down', percentage: 72 },
      { label: 'Fiber', change: 'up', percentage: 125 },
      { label: 'Carbs', change: 'down', percentage: 45 }
    ],
    swaps: [
      {
        original: 'Fried beef patty',
        replacement: 'Grilled chicken or chickpea patty',
        benefit: 'Lean protein, less saturated fat'
      },
      {
        original: 'White refined bun',
        replacement: 'Whole grain bun',
        benefit: 'More fiber and nutrients'
      },
      {
        original: 'Deep fried french fries',
        replacement: 'Baked sweet potato wedges',
        benefit: 'Rich in vitamin A, 70% less fat'
      }
    ],
    cookingMethod: {
      original: 'Fried patty and fries',
      improved: 'Grilled patty, baked sides',
      benefit: 'Maintains taste while cutting unhealthy fats'
    },
    portionTip: 'Skip the cheese or use a thin slice, load up on vegetables'
  }
};

export function analyzeMeal(input: string, image?: File): MealAnalysis {
  const inputLower = input.toLowerCase();
  
  // Try to match with database
  for (const key in mealDatabase) {
    if (inputLower.includes(key)) {
      return mealDatabase[key];
    }
  }
  
  // Default generic response with deterministic rules applied
  const defaultOriginal: MealData = {
    name: input || 'Your Meal',
    image: 'https://images.unsplash.com/photo-1766589221522-d5beae155124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjB1bmhlYWx0aHl8ZW58MXx8fHwxNzcwMjg3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 600,
    protein: 20,
    carbs: 65,
    fat: 28,
    fiber: 3,
    sugar: 10,
    factors: ['Processed ingredients', 'High sodium', 'Low nutrients']
  };

  // Apply deterministic nutrition rules
  const rules = applyNutritionRules(defaultOriginal);
  
  // Generate factors based on rules
  const factors: string[] = [];
  if (defaultOriginal.calories > NUTRITION_THRESHOLDS.calories.max) {
    factors.push('High calories (needs reduction)');
  }
  if (defaultOriginal.protein < NUTRITION_THRESHOLDS.protein.min) {
    factors.push('Low protein (needs boost)');
  }
  if (defaultOriginal.fat > NUTRITION_THRESHOLDS.fat.max) {
    factors.push('High fat (needs reduction)');
  }
  if (defaultOriginal.fiber < NUTRITION_THRESHOLDS.fiber.min) {
    factors.push('Low fiber (needs increase)');
  }
  if (defaultOriginal.sugar > NUTRITION_THRESHOLDS.sugar.max) {
    factors.push('High sugar (needs reduction)');
  }
  
  defaultOriginal.factors = factors.length > 0 ? factors : ['Processed ingredients', 'High sodium', 'Low nutrients'];

  // Calculate percentage changes
  const calculateChange = (original: number, target: number): number => {
    return Math.round(Math.abs((target - original) / original * 100));
  };

  return {
    original: defaultOriginal,
    improved: {
      name: `Healthier ${input || 'Meal'}`,
      image: 'https://images.unsplash.com/photo-1661257711676-79a0fc533569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJvd2wlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzAyODc1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: rules.targetCalories,
      protein: rules.targetProtein,
      carbs: rules.targetCarbs,
      fat: rules.targetFat,
      fiber: rules.targetFiber,
      sugar: rules.targetSugar
    },
    changes: [
      { 
        label: 'Calories', 
        change: defaultOriginal.calories > rules.targetCalories ? 'down' : 'up', 
        percentage: calculateChange(defaultOriginal.calories, rules.targetCalories) 
      },
      { 
        label: 'Protein', 
        change: defaultOriginal.protein < rules.targetProtein ? 'up' : 'down', 
        percentage: calculateChange(defaultOriginal.protein, rules.targetProtein) 
      },
      { 
        label: 'Fat', 
        change: defaultOriginal.fat > rules.targetFat ? 'down' : 'up', 
        percentage: calculateChange(defaultOriginal.fat, rules.targetFat) 
      },
      { 
        label: 'Fiber', 
        change: defaultOriginal.fiber < rules.targetFiber ? 'up' : 'down', 
        percentage: calculateChange(defaultOriginal.fiber, rules.targetFiber) 
      },
      { 
        label: 'Sugar', 
        change: defaultOriginal.sugar > rules.targetSugar ? 'down' : 'up', 
        percentage: calculateChange(defaultOriginal.sugar, rules.targetSugar) 
      }
    ],
    swaps: [
      {
        original: 'Processed ingredients',
        replacement: 'Whole food alternatives',
        benefit: 'More nutrients, less additives'
      },
      {
        original: 'Refined grains',
        replacement: 'Whole grains',
        benefit: 'Better blood sugar control'
      },
      {
        original: 'Heavy sauces',
        replacement: 'Herbs and spices',
        benefit: 'Flavor without extra calories'
      }
    ],
    cookingMethod: {
      original: 'Fried or processed',
      improved: 'Grilled or baked',
      benefit: 'Reduces unhealthy fats'
    },
    portionTip: 'Add a colorful salad to increase nutrients and satiety'
  };
}
