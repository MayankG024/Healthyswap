import { Prisma } from '@prisma/client';

export const newMeals2: Prisma.MealLibraryCreateInput[] = [
  // BREAKFAST
  {
    name: 'Egg White Spinach Bites',
    cuisine: 'American',
    foodType: 'Breakfast',
    healthTags: ['High Protein', 'Keto Friendly'],
    imageUrl: 'https://image.pollinations.ai/prompt/Egg%20White%20Spinach%20Bites%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Pop a few of these on the go! 3-4 bites make a great breakfast.',
    originalNutrition: { name: 'Fast Food Egg & Cheese Biscuit', calories: 450, protein: 12, carbs: 35, fat: 28, fiber: 1, sugar: 3 },
    improvedNutrition: { name: 'Egg White Bites (4)', calories: 150, protein: 20, carbs: 4, fat: 5, fiber: 1, sugar: 1 },
    changes: [
      { type: 'decrease', label: 'Calories', amount: '-66%' },
      { type: 'increase', label: 'Protein', amount: '+66%' }
    ],
    swaps: [
      { original: 'Biscuit & Bacon', replacement: 'Muffin Tin & Spinach', rationale: 'Removes the dense carbohydrate biscuit and highly processed meat.' },
      { original: 'Whole Eggs', replacement: 'Egg Whites + 1 Whole Egg', rationale: 'Drastically lowers the fat and cholesterol while keeping the protein high.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Whisk 2 cups of liquid egg whites with 1 whole egg, salt, and pepper.' },
      { step: 2, instruction: 'Spray a muffin tin. Drop a pinch of chopped spinach and low-fat feta into each slot.' },
      { step: 3, instruction: 'Pour the egg mixture over the spinach and bake at 350°F (175°C) for 15-20 minutes until set.' }
    ]
  },
  {
    name: 'Protein Oatmeal (Proats)',
    cuisine: 'American',
    foodType: 'Breakfast',
    healthTags: ['High Fiber', 'Muscle Building'],
    imageUrl: 'https://image.pollinations.ai/prompt/Protein%20Oatmeal%20(Proats)%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Add liquid slowly when mixing in protein powder so it doesn\'t get too dry.',
    originalNutrition: { name: 'Pre-packaged Sugary Oatmeal (2 packets)', calories: 320, protein: 8, carbs: 64, fat: 4, fiber: 6, sugar: 28 },
    improvedNutrition: { name: 'Protein Oatmeal', calories: 290, protein: 28, carbs: 32, fat: 5, fiber: 8, sugar: 2 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-92%' },
      { type: 'increase', label: 'Protein', amount: '+250%' }
    ],
    swaps: [
      { original: 'Flavored Packets with Brown Sugar', replacement: 'Plain Rolled Oats + Whey Protein', rationale: 'Gives you total control over sweetness and turns a carb-heavy breakfast into a balanced meal.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Cook 1/2 cup plain rolled oats with 1 cup water or almond milk in the microwave for 2 minutes.' },
      { step: 2, instruction: 'Let it cool slightly (so the protein doesn\'t curdle), then stir in 1 scoop of your favorite protein powder.' },
      { step: 3, instruction: 'Top with a handful of berries and a dash of cinnamon.' }
    ]
  },

  // DISHES - KOREAN
  {
    name: 'Beef Bulgogi Lettuce Wraps',
    cuisine: 'Korean',
    foodType: 'Dish',
    healthTags: ['Low Carb', 'High Protein'],
    imageUrl: 'https://image.pollinations.ai/prompt/Beef%20Bulgogi%20Lettuce%20Wraps%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Use butter lettuce cups to hold the beef easily without breaking.',
    originalNutrition: { name: 'Restaurant Beef Bulgogi & Rice', calories: 850, protein: 35, carbs: 90, fat: 38, fiber: 3, sugar: 25 },
    improvedNutrition: { name: 'Bulgogi Wraps', calories: 340, protein: 38, carbs: 12, fat: 14, fiber: 4, sugar: 6 },
    changes: [
      { type: 'decrease', label: 'Carbs', amount: '-86%' },
      { type: 'decrease', label: 'Sugar', amount: '-76%' }
    ],
    swaps: [
      { original: 'White Rice base', replacement: 'Lettuce Wraps', rationale: 'Turns a heavy carb-loaded meal into a light, refreshing, high-protein dish.' },
      { original: 'Heavy Sugar Marinade', replacement: 'Blended Asian Pear & Soy Sauce', rationale: 'Uses the traditional Korean method of tenderizing and sweetening with pear instead of refined sugar.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Blend 1/4 Asian pear, 3 tbsp low-sodium soy sauce, garlic, ginger, and 1 tsp sesame oil.' },
      { step: 2, instruction: 'Marinate thin slices of lean flank steak in the mixture for 30 minutes.' },
      { step: 3, instruction: 'Sear the beef quickly in a hot pan. Serve immediately inside crisp lettuce leaves.' }
    ]
  },
  {
    name: 'Cauliflower Kimchi Fried Rice',
    cuisine: 'Korean',
    foodType: 'Dish',
    healthTags: ['Probiotic', 'Low Calorie'],
    imageUrl: 'https://image.pollinations.ai/prompt/Cauliflower%20Kimchi%20Fried%20Rice%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'The kimchi adds huge flavor, so you don\'t need extra salt.',
    originalNutrition: { name: 'Standard Kimchi Fried Rice', calories: 600, protein: 15, carbs: 75, fat: 25, fiber: 5, sugar: 8 },
    improvedNutrition: { name: 'Cauli-Kimchi Fried Rice', calories: 220, protein: 18, carbs: 16, fat: 10, fiber: 8, sugar: 4 },
    changes: [
      { type: 'decrease', label: 'Calories', amount: '-63%' },
      { type: 'decrease', label: 'Carbs', amount: '-78%' }
    ],
    swaps: [
      { original: 'White Rice', replacement: 'Riced Cauliflower', rationale: 'Drastically reduces calories while absorbing the kimchi juice perfectly.' },
      { original: 'Pork Belly', replacement: 'Egg Whites or Lean Chicken', rationale: 'Removes the massive saturated fat load of pork belly.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'In a pan, cook 1/2 cup chopped kimchi until fragrant.' },
      { step: 2, instruction: 'Add 2 cups riced cauliflower and stir fry until soft.' },
      { step: 3, instruction: 'Push aside, pour in 1/2 cup egg whites to scramble, then mix everything together with a dash of soy sauce.' }
    ]
  },

  // DISHES - JAPANESE
  {
    name: 'Sashimi & Cucumber Salad Bowl',
    cuisine: 'Japanese',
    foodType: 'Dish',
    healthTags: ['High Protein', 'Low Carb'],
    imageUrl: 'https://image.pollinations.ai/prompt/Sashimi%20%26%20Cucumber%20Salad%20Bowl%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Ask for dressing on the side if ordering out.',
    originalNutrition: { name: 'Spicy Tuna Roll (2) & Tempura', calories: 850, protein: 28, carbs: 95, fat: 38, fiber: 4, sugar: 12 },
    improvedNutrition: { name: 'Sashimi Salad', calories: 310, protein: 42, carbs: 10, fat: 12, fiber: 4, sugar: 4 },
    changes: [
      { type: 'decrease', label: 'Carbs', amount: '-89%' },
      { type: 'decrease', label: 'Fat', amount: '-68%' }
    ],
    swaps: [
      { original: 'Sushi Rice & Tempura Batter', replacement: 'Cucumber Noodles & Mixed Greens', rationale: 'Removes all refined flour and starchy rice, emphasizing the lean protein of the fish.' },
      { original: 'Spicy Mayo', replacement: 'Ponzu or Light Soy Sauce', rationale: 'Cuts out the heavy mayonnaise base.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Spiralize or thinly slice 1 large English cucumber.' },
      { step: 2, instruction: 'Top with 4-5 oz of fresh sashimi-grade salmon or tuna.' },
      { step: 3, instruction: 'Drizzle with 1 tbsp ponzu sauce and sprinkle with sesame seeds.' }
    ]
  },

  // BEVERAGES - COLD/SMOOTHIES
  {
    name: 'Berry Spinach Detox Smoothie',
    cuisine: 'American',
    foodType: 'Beverage',
    healthTags: ['High Antioxidant', 'Dairy Free'],
    imageUrl: 'https://image.pollinations.ai/prompt/Berry%20Spinach%20Detox%20Smoothie%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'A great mid-afternoon snack to stop sugar cravings.',
    originalNutrition: { name: 'Jamba Juice Mango-A-Go-Go', calories: 400, protein: 3, carbs: 95, fat: 1, fiber: 3, sugar: 85 },
    improvedNutrition: { name: 'Berry Detox Smoothie', calories: 160, protein: 18, carbs: 18, fat: 3, fiber: 7, sugar: 9 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-89%' },
      { type: 'increase', label: 'Protein', amount: '+500%' }
    ],
    swaps: [
      { original: 'Fruit Juice Base & Sherbet', replacement: 'Unsweetened Almond Milk & Fresh Greens', rationale: 'Removes massive amounts of concentrated fruit sugars and syrups.' },
      { original: 'All Fruit', replacement: 'Mixed Berries + Protein Powder', rationale: 'Berries have the lowest sugar of all fruits, and protein stabilizes blood sugar.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Add 1 cup spinach, 1/2 cup frozen mixed berries, and 1 scoop vanilla protein to a blender.' },
      { step: 2, instruction: 'Pour in 1 cup unsweetened almond milk.' },
      { step: 3, instruction: 'Blend until smooth. Add ice if you want it thicker.' }
    ]
  },
  {
    name: 'Sugar-Free Lemonade Iced Tea',
    cuisine: 'American',
    foodType: 'Beverage',
    healthTags: ['Zero Calorie', 'Refreshing'],
    imageUrl: 'https://image.pollinations.ai/prompt/Sugar-Free%20Lemonade%20Iced%20Tea%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Make a large pitcher and keep it in the fridge all week.',
    originalNutrition: { name: 'Sweet Tea / Arnold Palmer', calories: 200, protein: 0, carbs: 50, fat: 0, fiber: 0, sugar: 48 },
    improvedNutrition: { name: 'Sugar-Free Arnold Palmer', calories: 5, protein: 0, carbs: 1, fat: 0, fiber: 0, sugar: 0 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-100%' },
      { type: 'decrease', label: 'Calories', amount: '-97%' }
    ],
    swaps: [
      { original: 'Simple Syrup / Cane Sugar', replacement: 'Stevia or Erythritol', rationale: 'Provides the sweetness of Southern sweet tea with absolutely zero caloric impact.' },
      { original: 'Sugary Lemonade Mix', replacement: 'Fresh Squeezed Lemon Juice', rationale: 'Real lemons provide vitamin C without the corn syrup.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Brew 4 bags of black tea in 4 cups of hot water. Let cool.' },
      { step: 2, instruction: 'Squeeze the juice of 2 fresh lemons into the tea.' },
      { step: 3, instruction: 'Sweeten to taste with liquid stevia, then serve over ice.' }
    ]
  },

  // DISHES - AMERICAN COMFORT
  {
    name: 'Mashed Cauliflower Potatoes',
    cuisine: 'American',
    foodType: 'Dish',
    healthTags: ['Low Carb', 'Keto Friendly'],
    imageUrl: 'https://image.pollinations.ai/prompt/Mashed%20Cauliflower%20Potatoes%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'A great side dish for any lean protein.',
    originalNutrition: { name: 'Loaded Mashed Potatoes', calories: 450, protein: 6, carbs: 45, fat: 28, fiber: 4, sugar: 3 },
    improvedNutrition: { name: 'Cauli-Mash', calories: 120, protein: 5, carbs: 10, fat: 7, fiber: 5, sugar: 3 },
    changes: [
      { type: 'decrease', label: 'Carbs', amount: '-77%' },
      { type: 'decrease', label: 'Calories', amount: '-73%' }
    ],
    swaps: [
      { original: 'Starchy Potatoes', replacement: 'Steamed Cauliflower', rationale: 'Provides the exact same texture but is a non-starchy vegetable.' },
      { original: 'Heavy Cream & Butter', replacement: 'Light Sour Cream & Garlic Powder', rationale: 'Gives the creaminess and flavor without excessive saturated fat.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Steam 1 large head of cauliflower florets until very tender (fork easily pierces them).' },
      { step: 2, instruction: 'Drain well (squeeze out excess water if needed).' },
      { step: 3, instruction: 'Use a food processor to blend with 2 tbsp light sour cream, salt, pepper, and garlic powder until smooth.' }
    ]
  },
  {
    name: 'Turkey Chili',
    cuisine: 'American',
    foodType: 'Dish',
    healthTags: ['High Protein', 'High Fiber'],
    imageUrl: 'https://image.pollinations.ai/prompt/Turkey%20Chili%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Makes fantastic meal prep. Tastes better on day two!',
    originalNutrition: { name: 'Beef & Pork Chili', calories: 650, protein: 30, carbs: 45, fat: 40, fiber: 10, sugar: 12 },
    improvedNutrition: { name: 'Lean Turkey Chili', calories: 320, protein: 35, carbs: 30, fat: 6, fiber: 12, sugar: 8 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-85%' },
      { type: 'increase', label: 'Protein', amount: '+16%' }
    ],
    swaps: [
      { original: 'High-Fat Ground Beef/Pork', replacement: '99% Lean Ground Turkey', rationale: 'Chili relies on spices for flavor, not the meat fat. Turkey absorbs the chili powder perfectly.' },
      { original: 'Sour Cream & Fritos', replacement: 'Greek Yogurt & Jalapenos', rationale: 'Replaces empty fat/carbs with protein and spice.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Brown ground turkey with diced onions and bell peppers in a large pot.' },
      { step: 2, instruction: 'Add 1 can diced tomatoes, 1 can kidney beans, 1 can black beans (rinsed).' },
      { step: 3, instruction: 'Stir in 2 tbsp chili powder, cumin, and garlic. Simmer for at least 30 minutes.' }
    ]
  },

  // DESSERTS
  {
    name: 'Frozen Banana Snickers',
    cuisine: 'American',
    foodType: 'Dessert',
    healthTags: ['Vegan', 'Dairy Free'],
    imageUrl: 'https://image.pollinations.ai/prompt/Frozen%20Banana%20Snickers%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Eat them right out of the freezer!',
    originalNutrition: { name: 'King Size Snickers Bar', calories: 440, protein: 6, carbs: 55, fat: 22, fiber: 2, sugar: 48 },
    improvedNutrition: { name: 'Banana Snickers (2 pieces)', calories: 180, protein: 4, carbs: 22, fat: 9, fiber: 4, sugar: 12 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-75%' },
      { type: 'decrease', label: 'Calories', amount: '-59%' }
    ],
    swaps: [
      { original: 'Nougat & Caramel', replacement: 'Banana & Peanut Butter', rationale: 'Uses natural fruit sugars and healthy nut fats instead of processed corn syrup.' },
      { original: 'Milk Chocolate', replacement: 'Melted Dark Chocolate', rationale: 'Provides a richer flavor with less sugar and added antioxidants.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Cut a banana in half lengthwise, then cut those halves in half (giving you 4 pieces).' },
      { step: 2, instruction: 'Spread 1/2 tsp of peanut butter on each piece.' },
      { step: 3, instruction: 'Drizzle with melted dark chocolate. Freeze for 1 hour.' }
    ]
  },
  {
    name: 'Chia Seed Pudding',
    cuisine: 'Fusion',
    foodType: 'Dessert',
    healthTags: ['High Fiber', 'Omega 3'],
    imageUrl: 'https://image.pollinations.ai/prompt/Chia%20Seed%20Pudding%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Make it in a mason jar the night before for an instant dessert or breakfast.',
    originalNutrition: { name: 'Chocolate Pudding Cup', calories: 250, protein: 3, carbs: 40, fat: 8, fiber: 1, sugar: 30 },
    improvedNutrition: { name: 'Chia Pudding', calories: 160, protein: 6, carbs: 14, fat: 9, fiber: 10, sugar: 2 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-93%' },
      { type: 'increase', label: 'Fiber', amount: '+900%' }
    ],
    swaps: [
      { original: 'Cornstarch & Sugar Base', replacement: 'Chia Seeds & Almond Milk', rationale: 'Chia seeds naturally gel up like pudding but provide incredible amounts of fiber and Omega-3s.' },
      { original: 'Chocolate Syrup', replacement: 'Unsweetened Cocoa Powder & Stevia', rationale: 'Gives the chocolate flavor without the sugar crash.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'In a jar, mix 2 tbsp chia seeds, 1/2 cup almond milk, 1 tbsp cocoa powder, and a few drops of stevia.' },
      { step: 2, instruction: 'Stir vigorously. Wait 5 minutes and stir again (to prevent clumping).' },
      { step: 3, instruction: 'Refrigerate for at least 2 hours or overnight until it reaches pudding consistency.' }
    ]
  }
];
