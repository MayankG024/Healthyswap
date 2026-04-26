import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
import { newMeals } from './new_meals.js';
import { newMeals2 } from './new_meals_2.js';
import { newMeals3 } from './new_meals_3.js';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  console.log('Clearing existing meals to prevent duplicates...');
  await prisma.mealLibrary.deleteMany();

  // 1. Grilled Tandoori Chicken
  await prisma.mealLibrary.create({
    data: {
      name: 'Grilled Tandoori Chicken',
      originalNutrition: {
        name: 'Butter Chicken',
        calories: 820,
        protein: 36,
        carbs: 45,
        fat: 55,
        fiber: 4,
        sugar: 8
      },
      improvedNutrition: {
        calories: 480,
        protein: 42,
        carbs: 12,
        fat: 28,
        fiber: 6,
        sugar: 4
      },
      changes: [
        'Replaced heavy cream with Greek yogurt',
        'Baked/grilled instead of deep-frying',
        'Used minimal heart-healthy oil'
      ],
      swaps: [
        { original: 'Heavy Cream', improved: 'Greek Yogurt/Cashew Paste', benefit: 'Higher protein, less saturated fat' },
        { original: 'Butter', improved: 'Olive Oil Spray', benefit: 'Lower cholesterol' },
        { original: 'Naan', improved: 'Whole Wheat Roti', benefit: 'More complex carbs' }
      ],
      cookingMethod: {
        original: 'Pan-fried in butter and simmered in heavy cream.',
        improved: 'Marinated in yogurt and spices, then grilled or air-fried.',
        benefit: 'Reduces fat absorption significantly.'
      },
      portionTip: 'One chicken breast (about 150g) with a side of cucumber raita.',
      cuisine: 'North Indian',
      foodType: 'Dish',
      healthTags: ['High Protein', 'Weight Loss', 'Low Carb'],
      imageUrl: 'https://images.unsplash.com/photo-1735353783227-80b22ef618d9?w=800'
    }
  });

  // 2. Cauliflower Fried Rice
  await prisma.mealLibrary.create({
    data: {
      name: 'Cauliflower Fried Rice',
      originalNutrition: {
        name: 'Restaurant Fried Rice',
        calories: 520,
        protein: 12,
        carbs: 72,
        fat: 22,
        fiber: 3,
        sugar: 4
      },
      improvedNutrition: {
        calories: 240,
        protein: 16,
        carbs: 18,
        fat: 12,
        fiber: 8,
        sugar: 6
      },
      changes: [
        'Swapped white rice for riced cauliflower',
        'Added more lean protein (egg whites/tofu)',
        'Used low-sodium soy sauce'
      ],
      swaps: [
        { original: 'White Rice', improved: 'Riced Cauliflower', benefit: 'Fraction of the carbs and calories' },
        { original: 'Vegetable Oil', improved: 'Sesame Oil (few drops for flavor)', benefit: 'Lower total fat' }
      ],
      cookingMethod: {
        original: 'Stir-fried with large amounts of oil.',
        improved: 'Steamed cauliflower, quickly tossed in a hot non-stick pan with a tiny bit of oil.',
        benefit: 'Keeps the volume high but drastically cuts calories.'
      },
      portionTip: 'Eat 2 cups as a main or 1 cup as a side.',
      cuisine: 'Chinese',
      foodType: 'Dish',
      healthTags: ['Weight Loss', 'Low Carb', 'Diabetic Friendly'],
      imageUrl: 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=800'
    }
  });

  // 3. Quinoa Burrito Bowl
  await prisma.mealLibrary.create({
    data: {
      name: 'Quinoa Burrito Bowl',
      originalNutrition: {
        name: 'Fast Food Beef Burrito',
        calories: 980,
        protein: 34,
        carbs: 110,
        fat: 45,
        fiber: 8,
        sugar: 5
      },
      improvedNutrition: {
        calories: 520,
        protein: 32,
        carbs: 55,
        fat: 20,
        fiber: 14,
        sugar: 4
      },
      changes: [
        'Removed the flour tortilla',
        'Swapped white rice for quinoa',
        'Replaced sour cream with Greek yogurt'
      ],
      swaps: [
        { original: 'Flour Tortilla', improved: 'No Tortilla (Bowl)', benefit: 'Saves 300 empty calories' },
        { original: 'Sour Cream', improved: 'Plain Greek Yogurt', benefit: 'More protein, less fat' },
        { original: 'Ground Beef (high fat)', improved: 'Lean Ground Turkey or Black Beans', benefit: 'Heart healthier protein' }
      ],
      cookingMethod: {
        original: 'Meat cooked in oil, beans refried in lard.',
        improved: 'Grilled or baked lean meat, whole boiled black beans.',
        benefit: 'Removes hidden saturated fats.'
      },
      portionTip: 'Load up on fajita veggies (peppers, onions) to add volume without calories.',
      cuisine: 'Mexican',
      foodType: 'Dish',
      healthTags: ['Heart Healthy', 'High Protein'],
      imageUrl: 'https://images.unsplash.com/photo-1623428188495-89c064ee061a?w=800'
    }
  });

  // 4. Avocado Toast with Eggs
  await prisma.mealLibrary.create({
    data: {
      name: 'Avocado Toast with Eggs',
      originalNutrition: {
        name: 'Bacon & Cheese Croissant',
        calories: 600,
        protein: 16,
        carbs: 45,
        fat: 40,
        fiber: 2,
        sugar: 5
      },
      improvedNutrition: {
        calories: 380,
        protein: 18,
        carbs: 28,
        fat: 22,
        fiber: 8,
        sugar: 3
      },
      changes: [
        'Swapped refined pastry for whole grain bread',
        'Swapped bacon for poached eggs',
        'Swapped cheese/butter for smashed avocado'
      ],
      swaps: [
        { original: 'Croissant', improved: 'Sprouted Grain Bread', benefit: 'Higher fiber, stable blood sugar' },
        { original: 'Bacon', improved: 'Poached Eggs', benefit: 'High quality protein, no processed meat' },
        { original: 'Butter', improved: 'Avocado', benefit: 'Heart healthy monounsaturated fats' }
      ],
      cookingMethod: {
        original: 'Baked with layered butter, fried bacon.',
        improved: 'Toasted bread, boiled or poached eggs.',
        benefit: 'Zero added cooking fats.'
      },
      portionTip: 'Use 1/3 of a medium avocado per slice of toast.',
      cuisine: 'American',
      foodType: 'Snack',
      healthTags: ['Heart Healthy', 'Weight Loss'],
      imageUrl: 'https://images.unsplash.com/photo-1551888645-5ec881101c3f?w=800'
    }
  });

  // 5. Salmon Poke Bowl
  await prisma.mealLibrary.create({
    data: {
      name: 'Salmon Poke Bowl',
      originalNutrition: {
        name: 'Tempura Sushi Platter',
        calories: 880,
        protein: 24,
        carbs: 110,
        fat: 38,
        fiber: 4,
        sugar: 15
      },
      improvedNutrition: {
        calories: 520,
        protein: 38,
        carbs: 45,
        fat: 24,
        fiber: 6,
        sugar: 6
      },
      changes: [
        'Removed deep-fried tempura batter',
        'Reduced rice portion and swapped to brown rice/greens',
        'Used light soy sauce and avoided spicy mayo'
      ],
      swaps: [
        { original: 'Tempura Shrimp', improved: 'Raw/Sashimi Salmon', benefit: 'Omega-3s instead of trans fats' },
        { original: 'Spicy Mayo', improved: 'Ponzu or Light Soy Sauce', benefit: 'Saves 100+ calories per spoonful' },
        { original: 'White Rice (large portion)', improved: 'Half Brown Rice / Half Salad Greens', benefit: 'More fiber and micronutrients' }
      ],
      cookingMethod: {
        original: 'Deep fried items, rice mixed with sugary vinegar.',
        improved: 'Raw fish, steamed grains, fresh vegetables.',
        benefit: 'Maximizes nutrient retention.'
      },
      portionTip: 'Keep the rice to 1/2 cup and fill the rest of the bowl with cucumbers and edamame.',
      cuisine: 'Japanese',
      foodType: 'Dish',
      healthTags: ['High Protein', 'Heart Healthy', 'Diabetic Friendly'],
      imageUrl: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?w=800'
    }
  });

  // 6. Berry Protein Smoothie Bowl
  await prisma.mealLibrary.create({
    data: {
      name: 'Berry Protein Smoothie Bowl',
      originalNutrition: {
        name: 'Ice Cream Sundae',
        calories: 600,
        protein: 8,
        carbs: 85,
        fat: 28,
        fiber: 2,
        sugar: 65
      },
      improvedNutrition: {
        calories: 280,
        protein: 22,
        carbs: 35,
        fat: 8,
        fiber: 10,
        sugar: 15
      },
      changes: [
        'Swapped ice cream for frozen berries and banana',
        'Added whey or plant protein powder',
        'Topped with nuts/seeds instead of chocolate syrup'
      ],
      swaps: [
        { original: 'Ice Cream', improved: 'Frozen Mixed Berries', benefit: 'Antioxidants and fiber, natural sugars' },
        { original: 'Chocolate Syrup', improved: 'Chia Seeds', benefit: 'Omega-3s and crunch' }
      ],
      cookingMethod: {
        original: 'Churned dairy with high sugar.',
        improved: 'Blended whole fruits with unsweetened almond milk.',
        benefit: 'No added sugars or preservatives.'
      },
      portionTip: 'Watch out for toppings - stick to 1 tbsp of nuts/seeds.',
      cuisine: 'American',
      foodType: 'Dessert',
      healthTags: ['Weight Loss', 'High Protein'],
      imageUrl: 'https://images.unsplash.com/photo-1610450620997-6921021865da?w=800'
    }
  });

  // 7. Greek Yogurt Parfait
  await prisma.mealLibrary.create({
    data: {
      name: 'Greek Yogurt Parfait',
      originalNutrition: {
        name: 'Dessert Parfait / Tiramisu',
        calories: 480,
        protein: 6,
        carbs: 60,
        fat: 25,
        fiber: 1,
        sugar: 45
      },
      improvedNutrition: {
        calories: 240,
        protein: 20,
        carbs: 25,
        fat: 6,
        fiber: 5,
        sugar: 12
      },
      changes: [
        'Used plain, non-fat Greek yogurt instead of mascarpone/cream',
        'Layered with fresh fruit instead of sugary compote',
        'Used a sprinkle of oats instead of ladyfingers'
      ],
      swaps: [
        { original: 'Sweetened Cream', improved: 'Plain Greek Yogurt', benefit: 'Massive protein boost, no added sugar' },
        { original: 'Cake layers', improved: 'Whole rolled oats', benefit: 'Sustained energy' }
      ],
      cookingMethod: {
        original: 'Layered with processed sweets.',
        improved: 'Layered with raw, natural ingredients.',
        benefit: 'Clean ingredients.'
      },
      portionTip: 'A standard coffee-cup size is a perfect serving.',
      cuisine: 'Mediterranean',
      foodType: 'Dessert',
      healthTags: ['Diabetic Friendly', 'High Protein', 'Heart Healthy'],
      imageUrl: 'https://images.unsplash.com/photo-1571230389215-b34a89739ef1?w=800'
    }
  });

  // 8. Overnight Oats
  await prisma.mealLibrary.create({
    data: {
      name: 'Overnight Oats',
      originalNutrition: {
        name: 'Sugary Breakfast Cereal',
        calories: 500,
        protein: 6,
        carbs: 85,
        fat: 12,
        fiber: 2,
        sugar: 35
      },
      improvedNutrition: {
        calories: 320,
        protein: 14,
        carbs: 45,
        fat: 10,
        fiber: 9,
        sugar: 8
      },
      changes: [
        'Swapped refined cereal for whole rolled oats',
        'Used unsweetened milk',
        'Naturally sweetened with a bit of fruit'
      ],
      swaps: [
        { original: 'Frosted Flakes', improved: 'Rolled Oats', benefit: 'Complex carbs keep you full' },
        { original: 'Cow’s Milk (whole)', improved: 'Unsweetened Almond Milk', benefit: 'Lower calorie' }
      ],
      cookingMethod: {
        original: 'Extruded processed grains.',
        improved: 'Cold-soaked raw oats.',
        benefit: 'Preserves resistant starch which is good for the gut.'
      },
      portionTip: '1/2 cup of dry oats makes a large, filling bowl once soaked.',
      cuisine: 'American',
      foodType: 'Snack',
      healthTags: ['Heart Healthy', 'Diabetic Friendly', 'Weight Loss'],
      imageUrl: 'https://images.unsplash.com/photo-1665394055917-de22650a17b4?w=800'
    }
  });

  // 9. Vegetable Noodle Bowl
  await prisma.mealLibrary.create({
    data: {
      name: 'Vegetable Noodle Bowl',
      originalNutrition: {
        name: 'Instant Noodles / Ramen',
        calories: 380,
        protein: 8,
        carbs: 55,
        fat: 16,
        fiber: 2,
        sugar: 3
      },
      improvedNutrition: {
        calories: 320,
        protein: 18,
        carbs: 40,
        fat: 10,
        fiber: 7,
        sugar: 5
      },
      changes: [
        'Used buckwheat (soba) or zucchini noodles',
        'Added lean protein and double veggies',
        'Made broth from scratch to reduce sodium'
      ],
      swaps: [
        { original: 'Fried Wheat Noodles', improved: 'Soba or Zucchini Noodles', benefit: 'Fewer empty carbs, more nutrients' },
        { original: 'Flavor Packet', improved: 'Low-sodium broth with real ginger/garlic', benefit: 'Massively cuts sodium' }
      ],
      cookingMethod: {
        original: 'Boiled fried noodles in salty water.',
        improved: 'Simmered fresh ingredients in a light broth.',
        benefit: 'Controls sodium and avoids trans fats.'
      },
      portionTip: 'Fill half the bowl with bok choy or spinach.',
      cuisine: 'Chinese',
      foodType: 'Dish',
      healthTags: ['Weight Loss', 'Heart Healthy'],
      imageUrl: 'https://images.unsplash.com/photo-1661257711676-79a0fc533569?w=800'
    }
  });

  // 10. Brown Rice Biryani
  await prisma.mealLibrary.create({
    data: {
      name: 'Brown Rice Biryani',
      originalNutrition: {
        name: 'Chicken Biryani',
        calories: 850,
        protein: 28,
        carbs: 95,
        fat: 42,
        fiber: 3,
        sugar: 5
      },
      improvedNutrition: {
        calories: 520,
        protein: 38,
        carbs: 55,
        fat: 18,
        fiber: 9,
        sugar: 4
      },
      changes: [
        'Swapped white basmati for brown basmati',
        'Reduced ghee significantly',
        'Used skinless chicken breast'
      ],
      swaps: [
        { original: 'White Rice', improved: 'Brown Rice', benefit: 'Lower glycemic index, more fiber' },
        { original: 'Lots of Ghee', improved: 'Measured 1 tsp Ghee', benefit: 'Keeps flavor but cuts fat by 70%' }
      ],
      cookingMethod: {
        original: 'Cooked with large amounts of clarified butter.',
        improved: 'Steamed with spices and minimal oil.',
        benefit: 'Lighter and heart-healthier.'
      },
      portionTip: '1 cup cooked rice maximum, fill the rest with raita and side salad.',
      cuisine: 'North Indian',
      foodType: 'Dish',
      healthTags: ['High Protein', 'Heart Healthy', 'Diabetic Friendly'],
      imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800'
    }
  });

  console.log('Adding new meals to the database...');
  await prisma.mealLibrary.createMany({
    data: [...newMeals, ...newMeals2, ...newMeals3]
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
