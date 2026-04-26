import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToUpdate = ['new_meals.ts', 'new_meals_2.ts', 'new_meals_3.ts'];

for (const file of filesToUpdate) {
  const filePath = path.join(__dirname, 'prisma', file);
  let content = fs.readFileSync(filePath, 'utf8');

  const lines = content.split('\n');
  let currentMealName = '';
  let currentFoodType = 'Dish';
  let count = 1;

  for (let i = 0; i < lines.length; i++) {
    const nameMatch = lines[i].match(/name:\s*'([^']+)'/);
    if (nameMatch) {
      currentMealName = nameMatch[1];
    }
    
    const typeMatch = lines[i].match(/foodType:\s*'([^']+)'/);
    if (typeMatch) {
      currentFoodType = typeMatch[1];
    }

    if (lines[i].includes('imageUrl:')) {
      if (currentMealName) {
        let tags = 'food,dish';
        if (currentFoodType === 'Beverage') tags = 'beverage,drink,coffee';
        if (currentFoodType === 'Dessert') tags = 'dessert,cake,sweet';
        if (currentFoodType === 'Snack') tags = 'snack,food';
        
        // Use a unique random ID for each image so they don't cache as the same image
        const randomId = Math.floor(Math.random() * 10000);
        const replacement = `    imageUrl: 'https://loremflickr.com/800/600/${tags}?random=${randomId}',`;
        lines[i] = replacement;
      }
    }
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`Updated images in ${file}`);
}
