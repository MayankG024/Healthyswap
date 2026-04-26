import { Prisma } from '@prisma/client';

export const newMeals3: Prisma.MealLibraryCreateInput[] = [
  // COLD BEVERAGES
  {
    name: 'Iced Vanilla London Fog',
    cuisine: 'British',
    foodType: 'Beverage',
    healthTags: ['Low Sugar', 'Refreshing'],
    imageUrl: 'https://image.pollinations.ai/prompt/Iced%20Vanilla%20London%20Fog%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Brew the tea double strength so it doesn\'t dilute when poured over ice.',
    originalNutrition: { name: 'Cafe Iced London Fog', calories: 250, protein: 4, carbs: 45, fat: 5, fiber: 0, sugar: 42 },
    improvedNutrition: { name: 'Iced Vanilla London Fog', calories: 35, protein: 1, carbs: 3, fat: 2, fiber: 0, sugar: 1 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-97%' },
      { type: 'decrease', label: 'Calories', amount: '-86%' }
    ],
    swaps: [
      { original: 'Vanilla Syrup', replacement: 'Sugar-Free Vanilla Syrup', rationale: 'Removes nearly 40g of refined sugar.' },
      { original: 'Whole Milk', replacement: 'Unsweetened Almond Milk', rationale: 'Significantly cuts calories while keeping the creamy texture.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Brew 2 bags of Earl Grey tea in 1/2 cup hot water. Let cool.' },
      { step: 2, instruction: 'Add 1-2 pumps of sugar-free vanilla syrup to the cooled tea.' },
      { step: 3, instruction: 'Pour over a tall glass of ice and top with 1/2 cup almond milk.' }
    ]
  },
  {
    name: 'Cold Brew Protein Slush',
    cuisine: 'American',
    foodType: 'Beverage',
    healthTags: ['High Protein', 'Energy Boost'],
    imageUrl: 'https://image.pollinations.ai/prompt/Cold%20Brew%20Protein%20Slush%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Use a frozen banana instead of ice for a creamier texture (adds 90 calories).',
    originalNutrition: { name: 'Caramel Frappuccino', calories: 380, protein: 5, carbs: 55, fat: 16, fiber: 0, sugar: 54 },
    improvedNutrition: { name: 'Protein Coffee Slush', calories: 130, protein: 25, carbs: 4, fat: 2, fiber: 1, sugar: 1 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-98%' },
      { type: 'increase', label: 'Protein', amount: '+400%' }
    ],
    swaps: [
      { original: 'Caramel Syrup Base', replacement: 'Caramel or Vanilla Whey Protein', rationale: 'Replaces pure sugar with high-quality muscle-building protein.' },
      { original: 'Whipped Cream', replacement: 'Blended Ice Texture', rationale: 'The protein powder fluffs up when blended with ice, mimicking whipped texture without the fat.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Add 1 cup cold brew coffee, 1 scoop caramel/vanilla protein powder, and 1.5 cups of ice to a blender.' },
      { step: 2, instruction: 'Blend on high until smooth and frosty.' }
    ]
  },
  {
    name: 'Sparkling Mint Limeade',
    cuisine: 'Fusion',
    foodType: 'Beverage',
    healthTags: ['Zero Calorie', 'Hydration'],
    imageUrl: 'https://image.pollinations.ai/prompt/Sparkling%20Mint%20Limeade%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Great alternative to sugary sodas during a hot afternoon.',
    originalNutrition: { name: 'Restaurant Mint Lemonade', calories: 220, protein: 0, carbs: 56, fat: 0, fiber: 1, sugar: 52 },
    improvedNutrition: { name: 'Sparkling Mint Limeade', calories: 10, protein: 0, carbs: 3, fat: 0, fiber: 1, sugar: 0 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-100%' }
    ],
    swaps: [
      { original: 'Simple Syrup', replacement: 'Muddled Mint + Liquid Stevia', rationale: 'Muddling mint releases natural, sweet essential oils, requiring far less added sweetener.' },
      { original: 'Sprite/7-Up', replacement: 'Sparkling Water', rationale: 'Provides the fizz with zero calories or artificial syrups.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Muddle 5-6 fresh mint leaves at the bottom of a glass.' },
      { step: 2, instruction: 'Add 1 tbsp fresh lime juice and stevia to taste.' },
      { step: 3, instruction: 'Fill with ice and top with sparkling water. Stir gently.' }
    ]
  },
  {
    name: 'Iced Golden Maca Shake',
    cuisine: 'Fusion',
    foodType: 'Beverage',
    healthTags: ['Adaptogenic', 'Anti-inflammatory'],
    imageUrl: 'https://image.pollinations.ai/prompt/Iced%20Golden%20Maca%20Shake%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Maca has a strong earthy flavor, start with 1/2 tsp if you are new to it.',
    originalNutrition: { name: 'Turmeric Smoothie', calories: 350, protein: 5, carbs: 45, fat: 15, fiber: 4, sugar: 30 },
    improvedNutrition: { name: 'Maca Golden Shake', calories: 120, protein: 8, carbs: 12, fat: 5, fiber: 3, sugar: 3 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-90%' }
    ],
    swaps: [
      { original: 'Agave/Honey', replacement: 'Dash of Cinnamon & Stevia', rationale: 'Cinnamon naturally tricks the palate into tasting sweetness.' },
      { original: 'Banana Base', replacement: 'Half Banana + Greek Yogurt', rationale: 'Halves the sugar while boosting protein and creaminess.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Blend 1 cup almond milk, 1/4 cup plain Greek yogurt, 1/2 frozen banana, 1/2 tsp turmeric, 1/2 tsp maca powder, and a pinch of black pepper.' },
      { step: 2, instruction: 'Blend until completely smooth and pour over ice.' }
    ]
  },
  {
    name: 'Watermelon Basil Cooler',
    cuisine: 'American',
    foodType: 'Beverage',
    healthTags: ['Electrolytes', 'Low Calorie'],
    imageUrl: 'https://image.pollinations.ai/prompt/Watermelon%20Basil%20Cooler%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Watermelon is mostly water; don\'t add too much ice when blending.',
    originalNutrition: { name: 'Watermelon Slushie', calories: 280, protein: 1, carbs: 70, fat: 0, fiber: 2, sugar: 65 },
    improvedNutrition: { name: 'Watermelon Basil Cooler', calories: 45, protein: 1, carbs: 11, fat: 0, fiber: 1, sugar: 9 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-86%' }
    ],
    swaps: [
      { original: 'Watermelon Syrup', replacement: 'Fresh Watermelon Chunks', rationale: 'Uses the real fruit for natural sweetness and vitamins instead of corn syrup.' },
      { original: 'Added Sugar', replacement: 'Fresh Basil', rationale: 'Basil adds a complex, refreshing flavor profile that masks the lack of heavy sugar.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Blend 1 cup frozen watermelon chunks, 3 fresh basil leaves, and 1/2 cup coconut water.' },
      { step: 2, instruction: 'Pour into a chilled glass and garnish with a basil leaf.' }
    ]
  },

  // HOT BEVERAGES
  {
    name: 'Spiced Keto Hot Chocolate',
    cuisine: 'Mexican',
    foodType: 'Beverage',
    healthTags: ['Keto Friendly', 'Low Sugar'],
    imageUrl: 'https://image.pollinations.ai/prompt/Spiced%20Keto%20Hot%20Chocolate%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'A tiny pinch of cayenne pepper enhances the chocolate flavor dramatically.',
    originalNutrition: { name: 'Cafe Hot Chocolate', calories: 400, protein: 12, carbs: 50, fat: 16, fiber: 2, sugar: 43 },
    improvedNutrition: { name: 'Keto Hot Chocolate', calories: 90, protein: 3, carbs: 5, fat: 7, fiber: 3, sugar: 1 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-97%' },
      { type: 'decrease', label: 'Calories', amount: '-77%' }
    ],
    swaps: [
      { original: 'Chocolate Syrup & Milk', replacement: 'Unsweetened Cocoa Powder & Almond Milk', rationale: 'Eliminates processed syrups and replaces dairy sugars.' },
      { original: 'Whipped Cream', replacement: '1 tsp Coconut Oil (blended)', rationale: 'Blending coconut oil into hot liquids creates a rich, creamy froth.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Heat 1 cup almond milk in a small pot.' },
      { step: 2, instruction: 'Whisk in 1 tbsp unsweetened cocoa powder, a pinch of cinnamon, a tiny pinch of cayenne, and stevia.' },
      { step: 3, instruction: 'Add 1 tsp coconut oil and blend with a frother until foamy.' }
    ]
  },
  {
    name: 'Collagen Matcha Latte',
    cuisine: 'Japanese',
    foodType: 'Beverage',
    healthTags: ['Joint Health', 'Antioxidant'],
    imageUrl: 'https://image.pollinations.ai/prompt/Collagen%20Matcha%20Latte%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Ensure your matcha is "ceremonial grade" for drinking without bitterness.',
    originalNutrition: { name: 'Sweetened Matcha Latte', calories: 240, protein: 8, carbs: 32, fat: 8, fiber: 1, sugar: 30 },
    improvedNutrition: { name: 'Collagen Matcha', calories: 95, protein: 12, carbs: 4, fat: 3, fiber: 2, sugar: 1 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-96%' },
      { type: 'increase', label: 'Protein', amount: '+50%' }
    ],
    swaps: [
      { original: 'Pre-sweetened Matcha Mix', replacement: 'Pure Matcha + Collagen Peptides', rationale: 'Avoids 30g of sugar while adding flavorless collagen for skin and joint health.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Whisk 1 tsp matcha powder in 2 oz hot (not boiling) water until frothy.' },
      { step: 2, instruction: 'Stir in 1 scoop unflavored collagen peptides.' },
      { step: 3, instruction: 'Top with steamed unsweetened soy or almond milk.' }
    ]
  },
  {
    name: 'Cinnamon Apple Cider Vitality Drink',
    cuisine: 'American',
    foodType: 'Beverage',
    healthTags: ['Digestive Health', 'Low Calorie'],
    imageUrl: 'https://image.pollinations.ai/prompt/Cinnamon%20Apple%20Cider%20Vitality%20Drink%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Great first thing in the morning to stimulate digestion.',
    originalNutrition: { name: 'Hot Apple Cider', calories: 120, protein: 0, carbs: 30, fat: 0, fiber: 0, sugar: 28 },
    improvedNutrition: { name: 'ACV Vitality Drink', calories: 15, protein: 0, carbs: 3, fat: 0, fiber: 0, sugar: 1 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-96%' }
    ],
    swaps: [
      { original: 'Apple Cider (Juice)', replacement: 'Apple Cider Vinegar (ACV) + Hot Water + Stevia', rationale: 'Replicates the tangy apple flavor while providing acetic acid for blood sugar control instead of pure fructose.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Pour 1 cup hot water into a mug.' },
      { step: 2, instruction: 'Stir in 1 tbsp raw Apple Cider Vinegar, 1/4 tsp cinnamon, and stevia.' },
      { step: 3, instruction: 'Let steep for 1 minute before drinking.' }
    ]
  },
  {
    name: 'Sugar-Free Chai Tea Latte',
    cuisine: 'Indian',
    foodType: 'Beverage',
    healthTags: ['Low Carb', 'Warming'],
    imageUrl: 'https://image.pollinations.ai/prompt/Sugar-Free%20Chai%20Tea%20Latte%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Steeping your own spices is much healthier than using a liquid concentrate.',
    originalNutrition: { name: 'Coffeehouse Chai Latte', calories: 240, protein: 8, carbs: 45, fat: 4, fiber: 1, sugar: 42 },
    improvedNutrition: { name: 'Spiced Chai Latte', calories: 45, protein: 1, carbs: 4, fat: 3, fiber: 1, sugar: 0 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-100%' }
    ],
    swaps: [
      { original: 'Sweetened Chai Concentrate', replacement: 'Chai Tea Bags + Steamed Milk + Spices', rationale: 'Commercial concentrates are often 80% sugar syrup.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Steep 2 Chai tea bags in 1/2 cup boiling water for 5 minutes.' },
      { step: 2, instruction: 'Remove bags, stir in a drop of liquid stevia or monk fruit.' },
      { step: 3, instruction: 'Top with 1/2 cup steamed unsweetened almond milk and a sprinkle of nutmeg.' }
    ]
  },
  {
    name: 'Peppermint Mocha Bone Broth',
    cuisine: 'Fusion',
    foodType: 'Beverage',
    healthTags: ['High Protein', 'Gut Health'],
    imageUrl: 'https://image.pollinations.ai/prompt/Peppermint%20Mocha%20Bone%20Broth%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Sounds weird, but high-quality beef bone broth blends perfectly with chocolate and mint!',
    originalNutrition: { name: 'Peppermint Mocha', calories: 440, protein: 13, carbs: 63, fat: 16, fiber: 4, sugar: 54 },
    improvedNutrition: { name: 'Mocha Bone Broth', calories: 80, protein: 12, carbs: 4, fat: 2, fiber: 2, sugar: 0 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-100%' },
      { type: 'increase', label: 'Gut Nutrients', amount: '+100%' }
    ],
    swaps: [
      { original: 'Milk & Espresso Base', replacement: 'Unsalted Beef Bone Broth', rationale: 'Bone broth provides massive amounts of collagen and amino acids for gut repair, with a savory depth that pairs with cocoa.' },
      { original: 'Peppermint Syrup', replacement: 'Peppermint Extract + Cocoa', rationale: 'No sugar, just pure flavor.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Heat 1 cup unsalted beef bone broth until simmering.' },
      { step: 2, instruction: 'Carefully transfer to a blender with 1 tbsp cocoa powder, 1 drop peppermint extract, and stevia.' },
      { step: 3, instruction: 'Blend until frothy and serve immediately.' }
    ]
  },

  // DESSERTS
  {
    name: 'Greek Yogurt Tiramisu',
    cuisine: 'Italian',
    foodType: 'Dessert',
    healthTags: ['High Protein', 'Low Sugar'],
    imageUrl: 'https://image.pollinations.ai/prompt/Greek%20Yogurt%20Tiramisu%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Let it set in the fridge for at least 4 hours for the flavors to meld.',
    originalNutrition: { name: 'Restaurant Tiramisu', calories: 490, protein: 8, carbs: 42, fat: 32, fiber: 2, sugar: 28 },
    improvedNutrition: { name: 'Yogurt Tiramisu', calories: 180, protein: 18, carbs: 15, fat: 5, fiber: 2, sugar: 5 },
    changes: [
      { type: 'decrease', label: 'Fat', amount: '-84%' },
      { type: 'increase', label: 'Protein', amount: '+125%' }
    ],
    swaps: [
      { original: 'Mascarpone Cheese & Heavy Cream', replacement: 'Vanilla Greek Yogurt & Light Ricotta', rationale: 'Maintains the creamy, rich texture while swapping saturated fat for high-quality protein.' },
      { original: 'Ladyfingers soaked in sugar/rum', replacement: 'High-fiber crackers soaked in black coffee', rationale: 'Reduces refined carbs and eliminates alcohol calories.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Mix 1/2 cup vanilla Greek yogurt with 2 tbsp light ricotta cheese.' },
      { step: 2, instruction: 'Quickly dip 2 plain graham cracker squares or high-fiber biscuits in strong black coffee.' },
      { step: 3, instruction: 'Layer the coffee-soaked crackers and yogurt mixture in a glass. Dust with cocoa powder and chill.' }
    ]
  },
  {
    name: 'Protein Mug Brownie',
    cuisine: 'American',
    foodType: 'Dessert',
    healthTags: ['Quick Dessert', 'High Protein'],
    imageUrl: 'https://image.pollinations.ai/prompt/Protein%20Mug%20Brownie%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Do not overcook! 45-60 seconds in the microwave is usually enough.',
    originalNutrition: { name: 'Chocolate Fudge Brownie', calories: 410, protein: 4, carbs: 55, fat: 22, fiber: 3, sugar: 38 },
    improvedNutrition: { name: 'Protein Mug Brownie', calories: 170, protein: 24, carbs: 12, fat: 4, fiber: 5, sugar: 2 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-94%' },
      { type: 'increase', label: 'Protein', amount: '+500%' }
    ],
    swaps: [
      { original: 'Flour & Butter', replacement: 'Chocolate Whey Protein & Applesauce', rationale: 'Turns a fat-and-carb bomb into a muscle-building powerhouse.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'In a mug, mix 1 scoop chocolate protein powder, 1 tbsp cocoa powder, and 1/4 tsp baking powder.' },
      { step: 2, instruction: 'Stir in 2 tbsp unsweetened applesauce and a splash of almond milk until a thick batter forms.' },
      { step: 3, instruction: 'Microwave for 45-60 seconds. Let sit for 1 minute before eating.' }
    ]
  },
  {
    name: 'Strawberry Coconut Milk Ice Cream',
    cuisine: 'American',
    foodType: 'Dessert',
    healthTags: ['Dairy Free', 'Vegan'],
    imageUrl: 'https://image.pollinations.ai/prompt/Strawberry%20Coconut%20Milk%20Ice%20Cream%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Because it lacks commercial emulsifiers, let it sit on the counter for 5 mins before scooping.',
    originalNutrition: { name: 'Premium Strawberry Ice Cream', calories: 280, protein: 4, carbs: 32, fat: 16, fiber: 1, sugar: 26 },
    improvedNutrition: { name: 'Strawberry Coconut Ice Cream', calories: 140, protein: 1, carbs: 12, fat: 10, fiber: 3, sugar: 8 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-69%' },
      { type: 'decrease', label: 'Calories', amount: '-50%' }
    ],
    swaps: [
      { original: 'Heavy Cream', replacement: 'Lite Coconut Milk', rationale: 'Lower in calories while still providing a creamy mouthfeel.' },
      { original: 'Corn Syrup', replacement: 'Frozen Strawberries', rationale: 'Uses the natural pectin and sweetness of frozen fruit to bind the ice cream.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Blend 2 cups frozen strawberries with 1/2 cup lite coconut milk and stevia to taste.' },
      { step: 2, instruction: 'Blend until smooth (like soft serve).' },
      { step: 3, instruction: 'Eat immediately, or freeze in a container for a harder texture.' }
    ]
  },
  {
    name: 'Low-Carb Lemon Bars',
    cuisine: 'American',
    foodType: 'Dessert',
    healthTags: ['Gluten Free', 'Keto Friendly'],
    imageUrl: 'https://image.pollinations.ai/prompt/Low-Carb%20Lemon%20Bars%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'The almond flour crust is dense, so one small square goes a long way.',
    originalNutrition: { name: 'Bakery Lemon Bar', calories: 350, protein: 3, carbs: 48, fat: 18, fiber: 1, sugar: 35 },
    improvedNutrition: { name: 'Keto Lemon Bar', calories: 130, protein: 4, carbs: 6, fat: 11, fiber: 2, sugar: 1 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-97%' },
      { type: 'decrease', label: 'Carbs', amount: '-87%' }
    ],
    swaps: [
      { original: 'White Flour Crust', replacement: 'Almond Flour Crust', rationale: 'Removes gluten and refined carbs, adding healthy fats and fiber.' },
      { original: 'Confectioners Sugar Filling', replacement: 'Eggs, Lemon, & Erythritol', rationale: 'Erythritol provides the bulk and sweetness of sugar without the calories or insulin spike.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Mix 1 cup almond flour, 2 tbsp melted butter, and stevia. Press into an 8x8 pan and bake at 350°F for 10 mins.' },
      { step: 2, instruction: 'Whisk 3 eggs, 1/3 cup lemon juice, 1/2 cup powdered erythritol, and 1 tsp lemon zest.' },
      { step: 3, instruction: 'Pour over crust and bake for 20-25 mins until set. Chill thoroughly before slicing.' }
    ]
  },
  {
    name: 'Dark Chocolate Avocado Truffles',
    cuisine: 'French',
    foodType: 'Dessert',
    healthTags: ['Heart Healthy', 'Vegan'],
    imageUrl: 'https://image.pollinations.ai/prompt/Dark%20Chocolate%20Avocado%20Truffles%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Extremely rich—two truffles are a perfect serving.',
    originalNutrition: { name: 'Chocolate Ganache Truffles (3)', calories: 240, protein: 2, carbs: 22, fat: 18, fiber: 2, sugar: 18 },
    improvedNutrition: { name: 'Avocado Truffles (3)', calories: 150, protein: 2, carbs: 12, fat: 12, fiber: 6, sugar: 4 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-77%' },
      { type: 'increase', label: 'Fiber', amount: '+200%' }
    ],
    swaps: [
      { original: 'Heavy Whipping Cream & Butter', replacement: 'Mashed Avocado', rationale: 'Avocado provides the exact same fatty, creamy mouthfeel as heavy cream but uses monounsaturated fats.' },
      { original: 'Milk Chocolate', replacement: '70%+ Dark Chocolate', rationale: 'Significantly lowers sugar while maximizing antioxidants.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Melt 1/2 cup dark chocolate chips.' },
      { step: 2, instruction: 'Blend the melted chocolate with 1/2 of a ripe, smooth avocado and a splash of vanilla until completely smooth.' },
      { step: 3, instruction: 'Chill the mixture for 1 hour until firm. Roll into small balls, then roll in cocoa powder.' }
    ]
  },
  {
    name: 'Cottage Cheese Cookie Dough',
    cuisine: 'American',
    foodType: 'Dessert',
    healthTags: ['High Protein', 'Low Carb'],
    imageUrl: 'https://image.pollinations.ai/prompt/Cottage%20Cheese%20Cookie%20Dough%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Don\'t skip the blending step! Blending removes the curds to create a dough-like texture.',
    originalNutrition: { name: 'Raw Cookie Dough', calories: 420, protein: 4, carbs: 60, fat: 18, fiber: 2, sugar: 35 },
    improvedNutrition: { name: 'Protein Cookie Dough', calories: 190, protein: 18, carbs: 15, fat: 6, fiber: 3, sugar: 4 },
    changes: [
      { type: 'increase', label: 'Protein', amount: '+350%' },
      { type: 'decrease', label: 'Sugar', amount: '-88%' }
    ],
    swaps: [
      { original: 'Butter & Sugar Base', replacement: 'Blended Cottage Cheese', rationale: 'Replaces empty calories with a massive protein hit and creamy texture.' },
      { original: 'White Flour', replacement: 'Almond Flour or Protein Powder', rationale: 'Binds the dough while keeping carbs extremely low.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Blend 1/2 cup low-fat cottage cheese until completely smooth (no curds).' },
      { step: 2, instruction: 'Stir in 1 tbsp almond flour, 1/2 scoop vanilla protein powder, a splash of vanilla extract, and stevia.' },
      { step: 3, instruction: 'Fold in 1 tbsp sugar-free chocolate chips. Eat immediately or chill.' }
    ]
  },
  {
    name: 'Baked Peaches with Pecans',
    cuisine: 'American',
    foodType: 'Dessert',
    healthTags: ['High Fiber', 'Natural Sweetness'],
    imageUrl: 'https://image.pollinations.ai/prompt/Baked%20Peaches%20with%20Pecans%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Serve with a dollop of Greek yogurt instead of ice cream.',
    originalNutrition: { name: 'Peach Cobbler', calories: 450, protein: 4, carbs: 65, fat: 22, fiber: 3, sugar: 40 },
    improvedNutrition: { name: 'Baked Peach Halves', calories: 120, protein: 2, carbs: 16, fat: 6, fiber: 4, sugar: 13 },
    changes: [
      { type: 'decrease', label: 'Calories', amount: '-73%' },
      { type: 'decrease', label: 'Carbs', amount: '-75%' }
    ],
    swaps: [
      { original: 'Biscuit/Pie Crust', replacement: 'None (Focus on the fruit)', rationale: 'Eliminates hundreds of calories of refined flour and butter.' },
      { original: 'Syrup filling', replacement: 'Natural Peach Juices + Cinnamon', rationale: 'Baking brings out the natural sugars in the peach, requiring zero added sugar.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Cut a peach in half and remove the pit.' },
      { step: 2, instruction: 'Sprinkle with cinnamon, nutmeg, and 1 tbsp of chopped pecans.' },
      { step: 3, instruction: 'Bake at 375°F (190°C) for 20 minutes until tender and juicy.' }
    ]
  },
  {
    name: 'Sugar-Free Raspberry Sorbet',
    cuisine: 'French',
    foodType: 'Dessert',
    healthTags: ['Zero Fat', 'Refreshing'],
    imageUrl: 'https://image.pollinations.ai/prompt/Sugar-Free%20Raspberry%20Sorbet%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'A great palate cleanser after a heavy meal.',
    originalNutrition: { name: 'Store-bought Sorbet', calories: 200, protein: 0, carbs: 50, fat: 0, fiber: 2, sugar: 45 },
    improvedNutrition: { name: 'Homemade Sorbet', calories: 60, protein: 1, carbs: 14, fat: 0, fiber: 6, sugar: 6 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-86%' }
    ],
    swaps: [
      { original: 'Corn Syrup & Fruit Juice', replacement: 'Whole Frozen Raspberries', rationale: 'Using whole fruit keeps the fiber intact, which slows sugar absorption.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Add 2 cups frozen raspberries, 1 tbsp lemon juice, and 2 tbsp hot water to a food processor.' },
      { step: 2, instruction: 'Add stevia or monk fruit to taste.' },
      { step: 3, instruction: 'Process until completely smooth. Serve immediately as soft sorbet, or freeze to harden.' }
    ]
  },
  {
    name: 'Protein Crepes',
    cuisine: 'French',
    foodType: 'Dessert',
    healthTags: ['High Protein', 'Low Carb'],
    imageUrl: 'https://image.pollinations.ai/prompt/Protein%20Crepes%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Fill with Greek yogurt and berries instead of Nutella.',
    originalNutrition: { name: 'Nutella Crepes (2)', calories: 550, protein: 10, carbs: 65, fat: 28, fiber: 4, sugar: 40 },
    improvedNutrition: { name: 'Protein Crepes (2)', calories: 180, protein: 22, carbs: 8, fat: 6, fiber: 2, sugar: 3 },
    changes: [
      { type: 'decrease', label: 'Sugar', amount: '-92%' },
      { type: 'increase', label: 'Protein', amount: '+120%' }
    ],
    swaps: [
      { original: 'White Flour', replacement: 'Egg Whites & Protein Powder', rationale: 'Creates a thin, flexible crepe without any empty carbs.' },
      { original: 'Nutella', replacement: 'PB2 (Powdered Peanut Butter) & Cocoa', rationale: 'Gives the chocolate-nut flavor for 1/4 of the calories.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Whisk 1/2 cup egg whites with 1 scoop vanilla protein powder and a splash of almond milk until liquidy.' },
      { step: 2, instruction: 'Pour a thin layer into a non-stick skillet over medium-low heat. Cook 1-2 mins per side.' },
      { step: 3, instruction: 'Roll up with a filling of Greek yogurt and mixed berries.' }
    ]
  },
  {
    name: 'Almond Butter Stuffed Dates',
    cuisine: 'Middle Eastern',
    foodType: 'Dessert',
    healthTags: ['Energy Boost', 'Natural Sweetness'],
    imageUrl: 'https://image.pollinations.ai/prompt/Almond%20Butter%20Stuffed%20Dates%20food%20photography?width=800&height=600&nologo=true',
    portionTip: 'Dates are calorie-dense; 2 stuffed dates is a perfect sweet fix.',
    originalNutrition: { name: 'Chocolate Caramel Candy (2)', calories: 200, protein: 2, carbs: 30, fat: 10, fiber: 1, sugar: 25 },
    improvedNutrition: { name: 'Stuffed Dates (2)', calories: 150, protein: 3, carbs: 24, fat: 6, fiber: 4, sugar: 18 },
    changes: [
      { type: 'decrease', label: 'Processed Sugar', amount: '-100%' },
      { type: 'increase', label: 'Fiber', amount: '+300%' }
    ],
    swaps: [
      { original: 'Caramel', replacement: 'Medjool Dates', rationale: 'Dates have a natural caramel flavor and texture but provide significant fiber and potassium.' },
      { original: 'Nougat', replacement: 'Almond Butter', rationale: 'Provides healthy fats and protein to blunt the blood sugar spike.' }
    ],
    cookingMethod: [
      { step: 1, instruction: 'Slice 2 Medjool dates down the center and remove the pits.' },
      { step: 2, instruction: 'Stuff each date with 1 tsp of unsweetened almond butter.' },
      { step: 3, instruction: 'Sprinkle with a tiny pinch of sea salt. Serve chilled.' }
    ]
  }
];
