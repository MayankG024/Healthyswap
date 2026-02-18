import { useState } from 'react';
import { Search, Filter, Heart, TrendingUp, Flame, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import ImageWithSkeleton from './ImageWithSkeleton';

interface MealCard {
  id: string;
  name: string;
  image: string;
  originalName: string;
  calories: number;
  protein: number;
  tags: string[];
  nutritionScore: number;
  caloriesReduced: number;
}

interface MealLibraryProps {
  onViewNutrition: (itemName: string) => void;
}

const meals: MealCard[] = [
  {
    id: '1',
    name: 'Grilled Tandoori Chicken',
    originalName: 'Butter Chicken',
    image: 'https://images.unsplash.com/photo-1735353783227-80b22ef618d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGhlYWx0aHl8ZW58MXx8fHwxNzcwMjg3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 480,
    protein: 42,
    tags: ['High Protein', 'Weight Loss'],
    nutritionScore: 92,
    caloriesReduced: 340
  },
  {
    id: '2',
    name: 'Cauliflower Fried Rice',
    originalName: 'Fried Rice',
    image: 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzcwMjA3OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 240,
    protein: 16,
    tags: ['Weight Loss', 'Low Carb'],
    nutritionScore: 88,
    caloriesReduced: 280
  },
  {
    id: '3',
    name: 'Quinoa Buddha Bowl',
    originalName: 'Burrito Bowl',
    image: 'https://images.unsplash.com/photo-1623428188495-89c064ee061a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzcwMjg3NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 420,
    protein: 24,
    tags: ['Heart Healthy', 'High Protein'],
    nutritionScore: 95,
    caloriesReduced: 180
  },
  {
    id: '4',
    name: 'Avocado Toast with Eggs',
    originalName: 'Bacon & Eggs Toast',
    image: 'https://images.unsplash.com/photo-1551888645-5ec881101c3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3QlMjBoZWFsdGh5fGVufDF8fHx8MTc3MDI4NzcyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 380,
    protein: 18,
    tags: ['Heart Healthy', 'Weight Loss'],
    nutritionScore: 90,
    caloriesReduced: 220
  },
  {
    id: '5',
    name: 'Grilled Salmon Bowl',
    originalName: 'Fish & Chips',
    image: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NzAyMTczMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 520,
    protein: 38,
    tags: ['High Protein', 'Heart Healthy', 'Diabetic Friendly'],
    nutritionScore: 94,
    caloriesReduced: 360
  },
  {
    id: '6',
    name: 'Berry Protein Smoothie Bowl',
    originalName: 'Ice Cream Sundae',
    image: 'https://images.unsplash.com/photo-1610450620997-6921021865da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGJvd2wlMjBiZXJyaWVzfGVufDF8fHx8MTc3MDI4MTgwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 280,
    protein: 22,
    tags: ['Weight Loss', 'High Protein'],
    nutritionScore: 86,
    caloriesReduced: 320
  },
  {
    id: '7',
    name: 'Greek Yogurt Parfait',
    originalName: 'Dessert Parfait',
    image: 'https://images.unsplash.com/photo-1571230389215-b34a89739ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMHlvZ3VydCUyMHBhcmZhaXR8ZW58MXx8fHwxNzcwMTg3NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 240,
    protein: 20,
    tags: ['Diabetic Friendly', 'High Protein'],
    nutritionScore: 89,
    caloriesReduced: 240
  },
  {
    id: '8',
    name: 'Overnight Oats Bowl',
    originalName: 'Sugary Cereal',
    image: 'https://images.unsplash.com/photo-1665394055917-de22650a17b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYXRtZWFsJTIwYnJlYWtmYXN0JTIwaGVhbHRoeXxlbnwxfHx8fDE3NzAxODMyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 320,
    protein: 14,
    tags: ['Heart Healthy', 'Diabetic Friendly'],
    nutritionScore: 87,
    caloriesReduced: 180
  },
  {
    id: '9',
    name: 'Vegetable Noodle Bowl',
    originalName: 'Instant Noodles',
    image: 'https://images.unsplash.com/photo-1661257711676-79a0fc533569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJvd2wlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzAyODc1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 320,
    protein: 18,
    tags: ['Weight Loss', 'Heart Healthy'],
    nutritionScore: 85,
    caloriesReduced: 60
  },
  {
    id: '10',
    name: 'Brown Rice Chicken Biryani',
    originalName: 'Chicken Biryani',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwYmlyeWFuaXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 520,
    protein: 38,
    tags: ['High Protein', 'Heart Healthy'],
    nutritionScore: 91,
    caloriesReduced: 330
  },
  {
    id: '11',
    name: 'Baked Whole Wheat Samosas',
    originalName: 'Fried Samosas',
    image: 'https://images.unsplash.com/photo-1626132647523-66f2bf18ba8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyMHx8aGVhbHRoeSUyMHNhbW9zYXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 380,
    protein: 18,
    tags: ['Weight Loss', 'Diabetic Friendly'],
    nutritionScore: 86,
    caloriesReduced: 340
  },
  {
    id: '12',
    name: 'Paneer Tikka with Whole Wheat Roti',
    originalName: 'Paneer Butter Masala',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwYW5lZXIlMjB0aWtrYXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 540,
    protein: 32,
    tags: ['High Protein', 'Heart Healthy'],
    nutritionScore: 89,
    caloriesReduced: 380
  },
  {
    id: '13',
    name: 'Oats and Ragi Dosa',
    originalName: 'Masala Dosa',
    image: 'https://images.unsplash.com/photo-1694170269221-ea3df8c27f87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWdpJTIwZG9zYXxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 380,
    protein: 24,
    tags: ['High Protein', 'Weight Loss', 'Diabetic Friendly'],
    nutritionScore: 93,
    caloriesReduced: 240
  },
  {
    id: '14',
    name: 'Grilled Chicken Burger',
    originalName: 'Burger with Fries',
    image: 'https://images.unsplash.com/photo-1619221882010-23e5b72bc561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8aGVhbHRoeSUyMGJ1cmdlcnxlbnwwfHx8fDE3MDkzMDQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    calories: 520,
    protein: 42,
    tags: ['High Protein', 'Weight Loss'],
    nutritionScore: 87,
    caloriesReduced: 530
  }
];

const filters = [
  { id: 'all', label: 'All Meals', icon: Leaf },
  { id: 'high-protein', label: 'High Protein', icon: TrendingUp },
  { id: 'weight-loss', label: 'Weight Loss', icon: Flame },
  { id: 'diabetic', label: 'Diabetic Friendly', icon: Heart },
  { id: 'heart', label: 'Heart Healthy', icon: Heart }
];

export default function MealLibrary({ onViewNutrition }: MealLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meal.originalName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    
    const filterMap: { [key: string]: string } = {
      'high-protein': 'High Protein',
      'weight-loss': 'Weight Loss',
      'diabetic': 'Diabetic Friendly',
      'heart': 'Heart Healthy'
    };
    
    return matchesSearch && meal.tags.includes(filterMap[activeFilter]);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            Smart Meal Library
          </h1>
          <p className="text-xl text-gray-600">
            Explore healthier versions of popular dishes
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for meals..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Meal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal, idx) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
              onClick={() => onViewNutrition(meal.name)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithSkeleton
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  skeletonClassName="w-full h-full"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded-full text-sm shadow-lg">
                  <Leaf className="w-4 h-4" />
                  <span>{meal.nutritionScore}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl text-gray-900 mb-2">{meal.name}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Healthier than: <span className="text-gray-700">{meal.originalName}</span>
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{meal.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm">{meal.protein}g protein</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-emerald-600 mb-4">
                  <span>↓ {meal.caloriesReduced} calories saved</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {meal.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMeals.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">No meals found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
