import { Prisma } from '@prisma/client';

export const newMeals: Prisma.MealLibraryCreateInput[] = [
  // BEVERAGES
  {
    name: 'Skinny Vanilla Latte',
    cuisine: 'American',
    foodType: 'Beverage',
    healthTags: ['Low Calorie', 'Low Sugar'],
    imageUrl: 'https://image.pollinations.ai/prompt/Skinny%20Vanilla%20Latte%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Use a standard 12oz cup. The foam adds volume without calories!',
    originalNutrition: { name: 'Standard Vanilla Latte', calories: 250, protein: 8, carbs: 35, fat: 9, fiber: 0, sugar: 33 },
    improvedNutrition: { name: 'Skinny Vanilla Latte', calories: 90, protein: 9, carbs: 12, fat: 0, fiber: 0, sugar: 10 },
    changes: [
      { type: 'decrease', label: 'Calories', amount: '-64%' },
      { type: 'decrease', label: 'Sugar', amount: '-70%' }
    ],
    swaps: [
      { original: 'Whole Milk', replacement: 'Skim Milk or Unsweetened Almond Milk', rationale: 'Saves 60+ calories and cuts saturated fat completely.' },
      { original: 'Vanilla Syrup', replacement: 'Sugar-Free Vanilla Syrup', rationale: 'Removes 20g of added sugar while maintaining the exact same flavor profile.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Brew 1-2 shots of espresso or 1/2 cup strong brewed coffee.' },
      { step: 2, instruction: 'Stir in 1-2 pumps (or 1 tbsp) of sugar-free vanilla syrup.' },
      { step: 3, instruction: 'Steam or froth 1 cup of skim milk until foamy, then pour over the coffee.' }
    ]
  },
  {
    name: 'Matcha Green Tea Smoothie',
    cuisine: 'Japanese',
    foodType: 'Beverage',
    healthTags: ['High Antioxidant', 'Energy Boost'],
    imageUrl: 'https://image.pollinations.ai/prompt/Matcha%20Green%20Tea%20Smoothie%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'One 16oz glass is a perfect morning energy booster.',
    originalNutrition: { name: 'Frappuccino/Sweet Matcha', calories: 420, protein: 6, carbs: 65, fat: 16, fiber: 2, sugar: 60 },
    improvedNutrition: { name: 'Matcha Green Tea Smoothie', calories: 150, protein: 12, carbs: 20, fat: 4, fiber: 5, sugar: 10 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-83%' },
      { type: 'increase', label: 'Protein', amount: '+100%' }
    ],
    swaps: [
      { original: 'Ice Cream/Heavy Syrup', replacement: 'Frozen Banana & Spinach', rationale: 'Provides natural sweetness and creamy texture with added vitamins and fiber.' },
      { original: 'Whole Milk', replacement: 'Unsweetened Soy or Almond Milk', rationale: 'Reduces calories and fat.' },
      { original: 'Sweetened Matcha Mix', replacement: 'Pure Ceremonial Matcha Powder', rationale: 'Avoids hidden sugars and maximizes antioxidant (EGCG) content.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Add 1 tsp pure matcha powder, 1/2 frozen banana, 1 cup spinach, 1 cup unsweetened milk, and 1 scoop unflavored/vanilla protein powder to a blender.' },
      { step: 2, instruction: 'Add 1/2 cup ice.' },
      { step: 3, instruction: 'Blend on high until completely smooth.' }
    ]
  },
  {
    name: 'Iced Protein Mocha',
    cuisine: 'American',
    foodType: 'Beverage',
    healthTags: ['High Protein', 'Low Sugar'],
    imageUrl: 'https://image.pollinations.ai/prompt/Iced%20Protein%20Mocha%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Use plenty of ice to make it a refreshing, large drink.',
    originalNutrition: { name: 'Coffeehouse Iced Mocha', calories: 400, protein: 10, carbs: 54, fat: 17, fiber: 4, sugar: 45 },
    improvedNutrition: { name: 'Iced Protein Mocha', calories: 140, protein: 22, carbs: 10, fat: 2.5, fiber: 3, sugar: 2 },
    changes: [
      { type: 'decrease', label: 'Calories', amount: '-65%' },
      { type: 'increase', label: 'Protein', amount: '+120%' }
    ],
    swaps: [
      { original: 'Chocolate Syrup', replacement: 'Unsweetened Cocoa Powder + Stevia/Monk Fruit', rationale: 'Removes all refined sugar but keeps the rich chocolate taste.' },
      { original: 'Milk/Cream', replacement: 'Chocolate Protein Shake (Premade or Powder+Water)', rationale: 'Adds a massive protein punch while acting as the creamer.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Fill a large glass with ice.' },
      { step: 2, instruction: 'Pour in 1 cup of cold brew or chilled espresso/coffee.' },
      { step: 3, instruction: 'Mix 1 scoop of chocolate protein powder with 1/2 cup almond milk (or use a premade protein shake) and pour over the coffee. Stir well.' }
    ]
  },
  {
    name: 'Golden Milk (Turmeric Latte)',
    cuisine: 'Indian',
    foodType: 'Beverage',
    healthTags: ['Anti-inflammatory', 'Low Calorie'],
    imageUrl: 'https://image.pollinations.ai/prompt/Golden%20Milk%20(Turmeric%20Latte)%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Enjoy warm before bed to aid sleep and digestion.',
    originalNutrition: { name: 'Cafe Sweetened Golden Milk', calories: 250, protein: 6, carbs: 30, fat: 12, fiber: 1, sugar: 25 },
    improvedNutrition: { name: 'Healthy Golden Milk', calories: 60, protein: 2, carbs: 5, fat: 4, fiber: 1, sugar: 0 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-100%' },
      { type: 'decrease', label: 'Calories', amount: '-76%' }
    ],
    swaps: [
      { original: 'Coconut Cream/Whole Milk', replacement: 'Unsweetened Almond or Light Coconut Milk', rationale: 'Significantly lowers caloric density and saturated fat.' },
      { original: 'Cane Sugar', replacement: 'Zero-calorie sweetener (Erythritol/Stevia) or skip', rationale: 'Eliminates sugar spike.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'In a small saucepan, whisk 1 cup unsweetened milk, 1/2 tsp turmeric, 1/4 tsp cinnamon, a pinch of black pepper, and sweetener.' },
      { step: 2, instruction: 'Heat gently over medium-low heat until warm (do not boil).' },
      { step: 3, instruction: 'Pour into a mug and sprinkle with extra cinnamon.' }
    ]
  },

  // DESSERTS
  {
    name: 'Greek Yogurt Berry Cheesecake Bowl',
    cuisine: 'American',
    foodType: 'Dessert',
    healthTags: ['High Protein', 'Low Sugar'],
    imageUrl: 'https://image.pollinations.ai/prompt/Greek%20Yogurt%20Berry%20Cheesecake%20Bowl%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'A 1-cup serving feels incredibly decadent but hits your protein goals.',
    originalNutrition: { name: 'Slice of Cheesecake', calories: 500, protein: 7, carbs: 45, fat: 35, fiber: 1, sugar: 35 },
    improvedNutrition: { name: 'Cheesecake Bowl', calories: 180, protein: 20, carbs: 15, fat: 4, fiber: 4, sugar: 8 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-88%' },
      { type: 'increase', label: 'Protein', amount: '+185%' }
    ],
    swaps: [
      { original: 'Cream Cheese', replacement: 'Non-fat Greek Yogurt + 1 tbsp Light Cream Cheese', rationale: 'Mimics the tang and texture of cheesecake with a fraction of the fat and triple the protein.' },
      { original: 'Graham Cracker Crust', replacement: 'Crushed High-Fiber Cereal or 1 crushed Graham Cracker Square', rationale: 'Gives the crunch without the butter and sugar binding.' },
      { original: 'Cherry Glaze', replacement: 'Warm Mixed Berries', rationale: 'Natural sweetness and high fiber.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Mix 3/4 cup plain non-fat Greek yogurt with 1 tbsp softened light cream cheese, a drop of vanilla extract, and sweetener of choice.' },
      { step: 2, instruction: 'Microwave 1/2 cup frozen berries for 30 seconds until warm and juicy.' },
      { step: 3, instruction: 'Top the yogurt mixture with the berries and sprinkle with 1 crushed graham cracker square.' }
    ]
  },
  {
    name: 'Avocado Chocolate Mousse',
    cuisine: 'Fusion',
    foodType: 'Dessert',
    healthTags: ['Heart Healthy', 'Vegan'],
    imageUrl: 'https://image.pollinations.ai/prompt/Avocado%20Chocolate%20Mousse%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Rich and dense, 1/2 cup is a perfect serving.',
    originalNutrition: { name: 'Traditional Chocolate Mousse', calories: 450, protein: 5, carbs: 35, fat: 35, fiber: 3, sugar: 30 },
    improvedNutrition: { name: 'Avocado Mousse', calories: 210, protein: 4, carbs: 18, fat: 15, fiber: 8, sugar: 5 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-83%' },
      { type: 'increase', label: 'Fiber', amount: '+166%' }
    ],
    swaps: [
      { original: 'Heavy Cream & Egg Yolks', replacement: 'Ripe Avocado', rationale: 'Provides an incredibly smooth, mousse-like texture using heart-healthy monounsaturated fats instead of saturated dairy fats.' },
      { original: 'Refined Sugar', replacement: 'Maple Syrup (small amount) or Stevia', rationale: 'Lowers glycemic impact.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Scoop the flesh of 1 ripe avocado into a food processor.' },
      { step: 2, instruction: 'Add 1/4 cup unsweetened cocoa powder, 2 tbsp almond milk, 1 tsp vanilla, and sweetener to taste.' },
      { step: 3, instruction: 'Blend until completely smooth, scraping down the sides as needed. Chill for 30 mins before serving.' }
    ]
  },
  {
    name: 'Protein Peanut Butter Cups',
    cuisine: 'American',
    foodType: 'Dessert',
    healthTags: ['High Protein', 'Keto Friendly'],
    imageUrl: 'https://image.pollinations.ai/prompt/Protein%20Peanut%20Butter%20Cups%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Make them in mini muffin tins. 2 cups = 1 serving.',
    originalNutrition: { name: 'Store-Bought PB Cups (2)', calories: 210, protein: 5, carbs: 24, fat: 13, fiber: 2, sugar: 22 },
    improvedNutrition: { name: 'Protein PB Cups (2)', calories: 160, protein: 12, carbs: 8, fat: 10, fiber: 3, sugar: 2 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-90%' },
      { type: 'increase', label: 'Protein', amount: '+140%' }
    ],
    swaps: [
      { original: 'Milk Chocolate', replacement: 'Sugar-Free Dark Chocolate Chips + Coconut Oil', rationale: 'Drastically reduces sugar while providing antioxidants.' },
      { original: 'Sugary Peanut Butter Filling', replacement: 'Natural PB mixed with Vanilla Protein Powder', rationale: 'Turns a sugar bomb into a muscle-building snack.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Melt 1/2 cup sugar-free chocolate chips with 1 tsp coconut oil.' },
      { step: 2, instruction: 'Mix 1/4 cup natural peanut butter with 1 scoop vanilla protein powder and a splash of almond milk until it forms a dough.' },
      { step: 3, instruction: 'Pour a small layer of chocolate into a mini muffin liner. Add a disc of PB dough, then cover with more chocolate. Freeze for 30 mins.' }
    ]
  },
  {
    name: 'Baked Cinnamon Apples',
    cuisine: 'American',
    foodType: 'Dessert',
    healthTags: ['High Fiber', 'Low Calorie'],
    imageUrl: 'https://image.pollinations.ai/prompt/Baked%20Cinnamon%20Apples%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'One whole apple is a satisfying, voluminous dessert.',
    originalNutrition: { name: 'Apple Pie (1 slice)', calories: 410, protein: 3, carbs: 58, fat: 19, fiber: 4, sugar: 28 },
    improvedNutrition: { name: 'Baked Apple', calories: 110, protein: 1, carbs: 28, fat: 1, fiber: 6, sugar: 19 },
    changes: [
      { type: 'decrease', label: 'Calories', amount: '-73%' },
      { type: 'decrease', label: 'Fat', amount: '-94%' }
    ],
    swaps: [
      { original: 'Pie Crust', replacement: 'None (Served in the apple)', rationale: 'Saves hundreds of empty calories from butter and white flour.' },
      { original: 'Brown Sugar Filling', replacement: 'Cinnamon & Nutmeg', rationale: 'Spices enhance the natural sweetness of the baked apple without needing added sugar.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Core a sweet apple (like Honeycrisp or Fuji).' },
      { step: 2, instruction: 'Sprinkle the inside heavily with cinnamon and nutmeg. Add 1 tsp of chopped walnuts if desired.' },
      { step: 3, instruction: 'Bake at 375°F (190°C) for 30 minutes until tender, or microwave for 4-5 minutes.' }
    ]
  },

  // DISHES - CHINESE
  {
    name: 'Cauliflower Fried Rice',
    cuisine: 'Chinese',
    foodType: 'Dish',
    healthTags: ['Low Carb', 'High Veggie'],
    imageUrl: 'https://image.pollinations.ai/prompt/Cauliflower%20Fried%20Rice%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'You can eat a massive 2-cup portion for very few calories!',
    originalNutrition: { name: 'Takeout Chicken Fried Rice', calories: 650, protein: 25, carbs: 85, fat: 22, fiber: 4, sugar: 6 },
    improvedNutrition: { name: 'Cauliflower Fried Rice', calories: 280, protein: 28, carbs: 18, fat: 12, fiber: 8, sugar: 5 },
    changes: [
      { type: 'decrease', label: 'Carbs', amount: '-78%' },
      { type: 'increase', label: 'Volume', amount: '+50%' }
    ],
    swaps: [
      { original: 'White Rice', replacement: 'Riced Cauliflower', rationale: 'Provides massive volume, slashes carbs, and adds tons of micronutrients.' },
      { original: 'Lots of Cooking Oil', replacement: 'Cooking Spray & Sesame Oil Finish', rationale: 'You get the sesame flavor without the 300+ calories of frying oil.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Spray a wok with cooking oil and scramble 2 eggs (or egg whites). Remove and set aside.' },
      { step: 2, instruction: 'Cook diced chicken breast or tofu until done.' },
      { step: 3, instruction: 'Add 1 bag of frozen riced cauliflower and mixed veggies (peas/carrots). Stir fry until heated.' },
      { step: 4, instruction: 'Stir in 2 tbsp low-sodium soy sauce, the cooked egg, and 1 tsp toasted sesame oil.' }
    ]
  },
  {
    name: 'Baked Sweet & Sour Chicken',
    cuisine: 'Chinese',
    foodType: 'Dish',
    healthTags: ['High Protein', 'Lower Sugar'],
    imageUrl: 'https://image.pollinations.ai/prompt/Baked%20Sweet%20%26%20Sour%20Chicken%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Pair with steamed broccoli instead of rice for an even lighter meal.',
    originalNutrition: { name: 'Deep-Fried Sweet & Sour Chicken', calories: 850, protein: 30, carbs: 90, fat: 40, fiber: 3, sugar: 45 },
    improvedNutrition: { name: 'Baked Sweet & Sour Chicken', calories: 350, protein: 35, carbs: 32, fat: 8, fiber: 4, sugar: 12 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-80%' },
      { type: 'decrease', label: 'Sugar', amount: '-73%' }
    ],
    swaps: [
      { original: 'Deep Frying in Batter', replacement: 'Light Cornstarch Dusting & Baking/Air Frying', rationale: 'Gives a crispy exterior without absorbing huge amounts of oil.' },
      { original: 'Sugary Glaze', replacement: 'Pineapple Juice + Vinegar + Sugar-Free Ketchup', rationale: 'Cuts out the refined sugar while keeping the authentic tang.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Toss chicken breast chunks in 1 tbsp cornstarch, salt, and pepper. Air fry or bake at 400°F until crispy.' },
      { step: 2, instruction: 'In a pan, mix 1/4 cup unsweetened pineapple juice, 2 tbsp rice vinegar, 2 tbsp sugar-free ketchup, and 1 tbsp soy sauce.' },
      { step: 3, instruction: 'Simmer sauce until thickened, then toss the crispy chicken and bell peppers in it.' }
    ]
  },

  // DISHES - MEXICAN
  {
    name: 'Zucchini Boat Enchiladas',
    cuisine: 'Mexican',
    foodType: 'Dish',
    healthTags: ['Low Carb', 'Gluten Free'],
    imageUrl: 'https://image.pollinations.ai/prompt/Zucchini%20Boat%20Enchiladas%20food%20photography?width=800&height=600&nologo=true',
    portionTip: '2 halves (1 whole zucchini) makes a great filling serving.',
    originalNutrition: { name: 'Beef Enchiladas (3)', calories: 750, protein: 35, carbs: 65, fat: 38, fiber: 6, sugar: 8 },
    improvedNutrition: { name: 'Zucchini Enchiladas', calories: 320, protein: 32, carbs: 14, fat: 16, fiber: 5, sugar: 7 },
    changes: [
      { type: 'decrease', label: 'Carbs', amount: '-78%' },
      { type: 'decrease', label: 'Calories', amount: '-57%' }
    ],
    swaps: [
      { original: 'Flour/Corn Tortillas', replacement: 'Hollowed-out Zucchini Halves', rationale: 'Replaces refined carbs with a watery, nutrient-dense vegetable.' },
      { original: 'Heavy Beef', replacement: 'Lean Ground Turkey or Extra Lean Beef', rationale: 'Saves on saturated fat while providing excellent protein.' },
      { original: 'Excessive Cheese', replacement: 'Moderate Sharp Cheddar (1/4 cup)', rationale: 'Sharp cheese provides more flavor, so you can use less.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Cut zucchinis in half lengthwise and scoop out the center.' },
      { step: 2, instruction: 'Brown lean meat with taco seasoning, onions, and black beans.' },
      { step: 3, instruction: 'Stuff the zucchini boats with the meat mixture, top with 2 tbsp enchilada sauce and a sprinkle of cheese.' },
      { step: 4, instruction: 'Bake at 400°F (200°C) for 20-25 minutes until zucchini is tender.' }
    ]
  },
  {
    name: 'Cauliflower Rice Burrito Bowl',
    cuisine: 'Mexican',
    foodType: 'Dish',
    healthTags: ['High Fiber', 'Weight Loss'],
    imageUrl: 'https://image.pollinations.ai/prompt/Cauliflower%20Rice%20Burrito%20Bowl%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Load up on the salsa and lettuce for unlimited volume.',
    originalNutrition: { name: 'Restaurant Burrito', calories: 1050, protein: 45, carbs: 110, fat: 45, fiber: 12, sugar: 6 },
    improvedNutrition: { name: 'Cauliflower Burrito Bowl', calories: 410, protein: 40, carbs: 22, fat: 18, fiber: 14, sugar: 5 },
    changes: [
      { type: 'decrease', label: 'Calories', amount: '-60%' },
      { type: 'decrease', label: 'Carbs', amount: '-80%' }
    ],
    swaps: [
      { original: 'Large Flour Tortilla & Rice', replacement: 'Bowl of Cauliflower Rice & Lettuce', rationale: 'Saves ~500 calories and 80g of carbs immediately.' },
      { original: 'Sour Cream', replacement: 'Plain Greek Yogurt', rationale: 'Tastes identical in a savory bowl but provides protein instead of fat.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Warm up riced cauliflower in a pan with a squeeze of lime and chopped cilantro.' },
      { step: 2, instruction: 'Assemble the bowl: Cauliflower rice, grilled chicken/fajita veggies, 1/4 cup black beans.' },
      { step: 3, instruction: 'Top with pico de gallo, 1/4 avocado, and a dollop of greek yogurt.' }
    ]
  },

  // DISHES - ITALIAN
  {
    name: 'Spaghetti Squash Bolognese',
    cuisine: 'Italian',
    foodType: 'Dish',
    healthTags: ['Low Carb', 'High Veggie'],
    imageUrl: 'https://image.pollinations.ai/prompt/Spaghetti%20Squash%20Bolognese%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'You can eat half a squash for the same calories as a tiny handful of pasta.',
    originalNutrition: { name: 'Spaghetti Bolognese', calories: 800, protein: 32, carbs: 95, fat: 28, fiber: 6, sugar: 12 },
    improvedNutrition: { name: 'Squash Bolognese', calories: 340, protein: 30, carbs: 22, fat: 14, fiber: 7, sugar: 9 },
    changes: [
      { type: 'decrease', label: 'Carbs', amount: '-76%' },
      { type: 'decrease', label: 'Calories', amount: '-57%' }
    ],
    swaps: [
      { original: 'Pasta', replacement: 'Spaghetti Squash', rationale: 'Provides the noodle experience with massive volume and very few calories.' },
      { original: 'Ground Pork/Beef Mix', replacement: 'Lean Ground Turkey or 96% Lean Beef', rationale: 'Significantly lowers saturated fat.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Cut a spaghetti squash in half, remove seeds, and bake face down at 400°F for 40 mins.' },
      { step: 2, instruction: 'Brown lean meat, add onions, garlic, and a low-sugar marinara sauce.' },
      { step: 3, instruction: 'Use a fork to shred the squash into "noodles" and top with the meat sauce.' }
    ]
  },
  {
    name: 'Eggplant Parmesan Stacks',
    cuisine: 'Italian',
    foodType: 'Dish',
    healthTags: ['Vegetarian', 'Gluten Free'],
    imageUrl: 'https://image.pollinations.ai/prompt/Eggplant%20Parmesan%20Stacks%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Stacking them looks gourmet and controls the cheese portion.',
    originalNutrition: { name: 'Fried Eggplant Parm', calories: 750, protein: 20, carbs: 65, fat: 45, fiber: 8, sugar: 15 },
    improvedNutrition: { name: 'Baked Eggplant Stacks', calories: 290, protein: 18, carbs: 25, fat: 12, fiber: 10, sugar: 10 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-73%' },
      { type: 'decrease', label: 'Calories', amount: '-61%' }
    ],
    swaps: [
      { original: 'Deep Frying in Oil', replacement: 'Baking or Air Frying', rationale: 'Eggplant acts like a sponge for oil. Baking it dry saves hundreds of calories.' },
      { original: 'Heavy Breading', replacement: 'Light dusting of Almond Flour & Parmesan', rationale: 'Reduces refined carbs and adds flavor directly to the crust.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Slice eggplant into rounds, sprinkle with salt to draw out moisture, then pat dry.' },
      { step: 2, instruction: 'Dip in egg wash, then lightly press into a mix of parmesan and almond flour. Bake at 400°F until golden.' },
      { step: 3, instruction: 'Stack slices with a spoon of marinara and part-skim mozzarella between them. Bake 5 mins to melt cheese.' }
    ]
  },

  // DISHES - THAI
  {
    name: 'Zucchini Noodle Pad Thai',
    cuisine: 'Thai',
    foodType: 'Dish',
    healthTags: ['Low Carb', 'Peanut Power'],
    imageUrl: 'https://image.pollinations.ai/prompt/Zucchini%20Noodle%20Pad%20Thai%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Don\'t overcook the zoodles or they become watery!',
    originalNutrition: { name: 'Restaurant Pad Thai', calories: 950, protein: 28, carbs: 105, fat: 48, fiber: 5, sugar: 35 },
    improvedNutrition: { name: 'Zoodle Pad Thai', calories: 380, protein: 34, carbs: 18, fat: 20, fiber: 6, sugar: 8 },
    changes: [
      { type: 'decrease', label: 'Carbs', amount: '-82%' },
      { type: 'decrease', label: 'Sugar', amount: '-77%' }
    ],
    swaps: [
      { original: 'Rice Noodles', replacement: 'Zucchini Noodles (Zoodles)', rationale: 'Eliminates dense carbs while keeping the slurpable noodle texture.' },
      { original: 'Sugar-heavy Sauce', replacement: 'PB2 (Powdered Peanut Butter) + Soy Sauce + Lime', rationale: 'Gets the authentic peanut flavor without the massive fat and sugar load.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Cook shrimp or chicken in a pan. Add 1 scrambled egg.' },
      { step: 2, instruction: 'Mix 2 tbsp PB2, 1 tbsp soy sauce, 1 tbsp lime juice, and a splash of water for the sauce.' },
      { step: 3, instruction: 'Toss raw zucchini noodles in the warm pan just long enough to heat through (1-2 mins), mix with sauce and protein.' }
    ]
  },
  {
    name: 'Light Coconut Curry',
    cuisine: 'Thai',
    foodType: 'Dish',
    healthTags: ['Dairy Free', 'Warming'],
    imageUrl: 'https://image.pollinations.ai/prompt/Light%20Coconut%20Curry%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Use lots of broth and vegetables to make the curry more filling.',
    originalNutrition: { name: 'Takeout Green Curry', calories: 720, protein: 25, carbs: 55, fat: 45, fiber: 6, sugar: 15 },
    improvedNutrition: { name: 'Light Green Curry', calories: 330, protein: 28, carbs: 20, fat: 14, fiber: 7, sugar: 6 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-68%' }
    ],
    swaps: [
      { original: 'Full-Fat Coconut Milk', replacement: 'Lite Coconut Milk + Chicken Broth', rationale: 'Keeps the coconut flavor but slashes the saturated fat and calories by over half.' },
      { original: 'White Rice', replacement: 'Cauliflower Rice or Half Portion Brown Rice', rationale: 'Lowers glycemic index and calories.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Sauté 1 tbsp green curry paste with diced chicken and vegetables (bell peppers, bamboo shoots, snap peas).' },
      { step: 2, instruction: 'Pour in 1/2 cup lite coconut milk and 1/2 cup broth. Simmer for 10 minutes.' },
      { step: 3, instruction: 'Finish with fresh basil and lime juice. Serve over cauliflower rice.' }
    ]
  },

  // DISHES - MEDITERRANEAN
  {
    name: 'Turkey Kofta with Tzatziki',
    cuisine: 'Mediterranean',
    foodType: 'Dish',
    healthTags: ['High Protein', 'Heart Healthy'],
    imageUrl: 'https://image.pollinations.ai/prompt/Turkey%20Kofta%20with%20Tzatziki%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Wrap in lettuce cups or a high-fiber low-carb pita.',
    originalNutrition: { name: 'Lamb Kofta Platter', calories: 850, protein: 35, carbs: 60, fat: 55, fiber: 5, sugar: 8 },
    improvedNutrition: { name: 'Turkey Kofta', calories: 380, protein: 40, carbs: 15, fat: 18, fiber: 6, sugar: 5 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-67%' }
    ],
    swaps: [
      { original: 'Ground Lamb/Beef', replacement: 'Lean Ground Turkey', rationale: 'Significantly leaner but absorbs Mediterranean spices perfectly.' },
      { original: 'White Pita & Fries', replacement: 'Greek Salad & Low-Carb Wrap', rationale: 'Replaces refined carbs with fresh, hydrating vegetables.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Mix ground turkey with minced onion, garlic, cumin, coriander, mint, and parsley. Form into oblong meatballs.' },
      { step: 2, instruction: 'Grill or bake until fully cooked (165°F internal).' },
      { step: 3, instruction: 'Serve with a homemade tzatziki (Greek yogurt, grated cucumber, lemon, dill) and a cucumber-tomato salad.' }
    ]
  },
  {
    name: 'Shakshuka (Eggs in Tomato Sauce)',
    cuisine: 'Middle Eastern',
    foodType: 'Dish',
    healthTags: ['Vegetarian', 'High Protein'],
    imageUrl: 'https://image.pollinations.ai/prompt/Shakshuka%20(Eggs%20in%20Tomato%20Sauce)%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'A great dinner option, not just for breakfast!',
    originalNutrition: { name: 'Restaurant Shakshuka with Bread', calories: 650, protein: 22, carbs: 70, fat: 30, fiber: 8, sugar: 12 },
    improvedNutrition: { name: 'Lean Shakshuka', calories: 310, protein: 24, carbs: 18, fat: 16, fiber: 7, sugar: 9 },
    changes: [
      { type: 'decrease', label: 'Carbs', amount: '-74%' }
    ],
    swaps: [
      { original: 'Lots of Olive Oil', replacement: '1 tsp Olive Oil / Cooking Spray', rationale: 'You only need a tiny bit of oil to sweat the onions and peppers.' },
      { original: 'Half a Loaf of White Bread', replacement: '1 Slice Whole Grain Toast or just eat with a spoon', rationale: 'The sauce is so flavorful it doesn\'t need to be soaked up by massive amounts of bread.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Sauté diced onions, bell peppers, and garlic. Add cumin, paprika, and chili powder.' },
      { step: 2, instruction: 'Pour in a can of crushed tomatoes and simmer for 10 minutes until thickened.' },
      { step: 3, instruction: 'Make small wells in the sauce and crack 2-3 eggs into them. Cover and simmer until whites are set but yolks are runny.' }
    ]
  },

  // DISHES - INDIAN (Additionals)
  {
    name: 'Palak Paneer (Tofu Twist)',
    cuisine: 'Indian',
    foodType: 'Dish',
    healthTags: ['Vegan', 'High Iron'],
    imageUrl: 'https://image.pollinations.ai/prompt/Palak%20Paneer%20(Tofu%20Twist)%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'The spinach base is incredibly low calorie, so you can eat a large bowl.',
    originalNutrition: { name: 'Restaurant Palak Paneer', calories: 600, protein: 20, carbs: 15, fat: 50, fiber: 5, sugar: 4 },
    improvedNutrition: { name: 'Palak Tofu', calories: 250, protein: 22, carbs: 12, fat: 14, fiber: 6, sugar: 3 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-72%' }
    ],
    swaps: [
      { original: 'Paneer (Full Fat Cheese)', replacement: 'Extra Firm Tofu', rationale: 'Tofu mimics paneer perfectly but has a fraction of the calories and saturated fat.' },
      { original: 'Heavy Cream', replacement: 'A splash of almond milk or cashew cream', rationale: 'Keeps the puree smooth without the heavy dairy fat.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Blanch a large bunch of spinach, then blend it into a puree with green chilies and garlic.' },
      { step: 2, instruction: 'Sauté onions and tomatoes with garam masala, turmeric, and cumin.' },
      { step: 3, instruction: 'Mix the spinach puree into the pan, simmer, and gently fold in cubed extra firm tofu.' }
    ]
  },
  {
    name: 'Tandoori Fish Tikka',
    cuisine: 'Indian',
    foodType: 'Dish',
    healthTags: ['High Protein', 'Omega 3'],
    imageUrl: 'https://image.pollinations.ai/prompt/Tandoori%20Fish%20Tikka%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Serve with mint chutney and cucumber salad.',
    originalNutrition: { name: 'Fried Fish Pakora', calories: 550, protein: 25, carbs: 40, fat: 32, fiber: 2, sugar: 2 },
    improvedNutrition: { name: 'Tandoori Fish Tikka', calories: 220, protein: 32, carbs: 6, fat: 6, fiber: 1, sugar: 2 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-81%' },
      { type: 'decrease', label: 'Carbs', amount: '-85%' }
    ],
    swaps: [
      { original: 'Deep Frying in Batter', replacement: 'Yogurt Marinade & Grilling/Air Frying', rationale: 'Eliminates the oil and refined flour batter entirely.' },
      { original: 'High-Fat Fish', replacement: 'Cod or Halibut (White Fish)', rationale: 'Very lean, high protein fish that takes on marinade flavors beautifully.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Cut firm white fish into chunks. Marinate in non-fat yogurt, ginger, garlic, lemon juice, and tikka masala powder.' },
      { step: 2, instruction: 'Thread onto skewers with bell peppers and onions.' },
      { step: 3, instruction: 'Grill or Air Fry at 400°F for 8-10 minutes until cooked through and slightly charred.' }
    ]
  },

  // SNACKS
  {
    name: 'Roasted Chickpeas',
    cuisine: 'Mediterranean',
    foodType: 'Snack',
    healthTags: ['High Fiber', 'Crunchy'],
    imageUrl: 'https://image.pollinations.ai/prompt/Roasted%20Chickpeas%20food%20photography?width=800&height=600&nologo=true',
    portionTip: '1/2 cup is a perfect snack serving.',
    originalNutrition: { name: 'Potato Chips (Large Bag)', calories: 450, protein: 4, carbs: 45, fat: 28, fiber: 3, sugar: 1 },
    improvedNutrition: { name: 'Roasted Chickpeas', calories: 140, protein: 7, carbs: 22, fat: 3, fiber: 6, sugar: 0 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-89%' },
      { type: 'increase', label: 'Fiber', amount: '+100%' }
    ],
    swaps: [
      { original: 'Fried Potatoes', replacement: 'Baked Chickpeas', rationale: 'Provides the salty crunch of chips but adds significant protein and fiber to keep you full.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Drain, rinse, and thoroughly dry a can of chickpeas (drying is key for crunch).' },
      { step: 2, instruction: 'Toss with 1 tsp olive oil, paprika, garlic powder, and salt.' },
      { step: 3, instruction: 'Bake at 400°F (200°C) for 25-30 minutes, shaking the pan halfway, until crispy.' }
    ]
  },
  {
    name: 'Apple Nachos',
    cuisine: 'American',
    foodType: 'Snack',
    healthTags: ['Sweet Craving', 'Kid Friendly'],
    imageUrl: 'https://image.pollinations.ai/prompt/Apple%20Nachos%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Slice the apples very thin to make the "nachos" go further.',
    originalNutrition: { name: 'Caramel Apple or Pastry', calories: 350, protein: 2, carbs: 65, fat: 12, fiber: 3, sugar: 45 },
    improvedNutrition: { name: 'Apple Nachos', calories: 160, protein: 4, carbs: 24, fat: 6, fiber: 5, sugar: 18 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-60%' },
      { type: 'decrease', label: 'Calories', amount: '-54%' }
    ],
    swaps: [
      { original: 'Thick Caramel Sauce', replacement: 'Melted Peanut Butter drizzle', rationale: 'Provides healthy fats and a bit of protein instead of pure corn syrup.' },
      { original: 'Candy Toppings', replacement: 'A few dark chocolate chips and cinnamon', rationale: 'Gives the dessert feel without the sugar crash.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Thinly slice an apple and arrange on a plate.' },
      { step: 2, instruction: 'Microwave 1 tbsp peanut butter for 15 seconds until runny, then drizzle over the apples.' },
      { step: 3, instruction: 'Sprinkle with cinnamon and 1 tsp of mini dark chocolate chips.' }
    ]
  }
];
