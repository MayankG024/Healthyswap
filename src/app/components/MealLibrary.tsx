import { useState, useEffect } from 'react';
import { Search, Heart, TrendingUp, Flame, Leaf, X, UtensilsCrossed, Coffee, IceCreamCone, Cookie, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ImageWithSkeleton from './ImageWithSkeleton';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

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
  cuisine: string;
  foodType: string;
}

const healthFilters = [
  { id: 'all', label: 'All', icon: Leaf },
  { id: 'High Protein', label: 'High Protein', icon: TrendingUp },
  { id: 'Weight Loss', label: 'Weight Loss', icon: Flame },
  { id: 'Diabetic Friendly', label: 'Diabetic Friendly', icon: Heart },
  { id: 'Heart Healthy', label: 'Heart Healthy', icon: Heart },
  { id: 'Low Carb', label: 'Low Carb', icon: Leaf }
];

const foodTypeFilters = [
  { id: 'all', label: 'All Types' },
  { id: 'Dish', label: 'Dishes', icon: UtensilsCrossed },
  { id: 'Snack', label: 'Snacks', icon: Cookie },
  { id: 'Beverage', label: 'Beverages', icon: Coffee },
  { id: 'Dessert', label: 'Desserts', icon: IceCreamCone }
];

const cuisineFilters = [
  'All Cuisines', 'North Indian', 'South Indian', 'Chinese', 'Italian',
  'Mexican', 'Mediterranean', 'Japanese', 'Korean', 'Thai', 'American', 'Middle Eastern'
];

const fallbackMeals: MealCard[] = [
  { id: '1', name: 'Grilled Tandoori Chicken', originalName: 'Butter Chicken', image: 'https://images.unsplash.com/photo-1735353783227-80b22ef618d9?w=800', calories: 480, protein: 42, tags: ['High Protein', 'Weight Loss'], nutritionScore: 92, caloriesReduced: 340, cuisine: 'North Indian', foodType: 'Dish' },
  { id: '2', name: 'Cauliflower Fried Rice', originalName: 'Fried Rice', image: 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=800', calories: 240, protein: 16, tags: ['Weight Loss', 'Low Carb'], nutritionScore: 88, caloriesReduced: 280, cuisine: 'Chinese', foodType: 'Dish' },
  { id: '3', name: 'Quinoa Burrito Bowl', originalName: 'Beef Burrito', image: 'https://images.unsplash.com/photo-1623428188495-89c064ee061a?w=800', calories: 520, protein: 32, tags: ['Heart Healthy', 'High Protein'], nutritionScore: 95, caloriesReduced: 460, cuisine: 'Mexican', foodType: 'Dish' },
  { id: '4', name: 'Avocado Toast with Eggs', originalName: 'Bacon & Eggs Toast', image: 'https://images.unsplash.com/photo-1551888645-5ec881101c3f?w=800', calories: 380, protein: 18, tags: ['Heart Healthy', 'Weight Loss'], nutritionScore: 90, caloriesReduced: 220, cuisine: 'American', foodType: 'Snack' },
  { id: '5', name: 'Salmon Poke Bowl', originalName: 'Tempura Platter', image: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?w=800', calories: 520, protein: 38, tags: ['High Protein', 'Heart Healthy', 'Diabetic Friendly'], nutritionScore: 94, caloriesReduced: 360, cuisine: 'Japanese', foodType: 'Dish' },
  { id: '6', name: 'Berry Protein Smoothie Bowl', originalName: 'Ice Cream Sundae', image: 'https://images.unsplash.com/photo-1610450620997-6921021865da?w=800', calories: 280, protein: 22, tags: ['Weight Loss', 'High Protein'], nutritionScore: 86, caloriesReduced: 320, cuisine: 'American', foodType: 'Dessert' },
  { id: '7', name: 'Greek Yogurt Parfait', originalName: 'Dessert Parfait', image: 'https://images.unsplash.com/photo-1571230389215-b34a89739ef1?w=800', calories: 240, protein: 20, tags: ['Diabetic Friendly', 'High Protein'], nutritionScore: 89, caloriesReduced: 240, cuisine: 'Mediterranean', foodType: 'Dessert' },
  { id: '8', name: 'Overnight Oats', originalName: 'Sugary Cereal', image: 'https://images.unsplash.com/photo-1665394055917-de22650a17b4?w=800', calories: 320, protein: 14, tags: ['Heart Healthy', 'Diabetic Friendly'], nutritionScore: 87, caloriesReduced: 180, cuisine: 'American', foodType: 'Snack' },
  { id: '9', name: 'Vegetable Noodle Bowl', originalName: 'Instant Noodles', image: 'https://images.unsplash.com/photo-1661257711676-79a0fc533569?w=800', calories: 320, protein: 18, tags: ['Weight Loss', 'Heart Healthy'], nutritionScore: 85, caloriesReduced: 60, cuisine: 'Chinese', foodType: 'Dish' },
  { id: '10', name: 'Brown Rice Biryani', originalName: 'Chicken Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800', calories: 520, protein: 38, tags: ['High Protein', 'Heart Healthy'], nutritionScore: 91, caloriesReduced: 330, cuisine: 'North Indian', foodType: 'Dish' },
  { id: '11', name: 'Baked Samosas', originalName: 'Fried Samosas', image: 'https://images.unsplash.com/photo-1626132647523-66f2bf18ba8c?w=800', calories: 380, protein: 18, tags: ['Weight Loss', 'Diabetic Friendly'], nutritionScore: 86, caloriesReduced: 340, cuisine: 'North Indian', foodType: 'Snack' },
  { id: '12', name: 'Paneer Tikka Bowl', originalName: 'Paneer Butter Masala', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800', calories: 540, protein: 32, tags: ['High Protein', 'Heart Healthy'], nutritionScore: 89, caloriesReduced: 380, cuisine: 'North Indian', foodType: 'Dish' },
  { id: '13', name: 'Oats Ragi Dosa', originalName: 'Masala Dosa', image: 'https://images.unsplash.com/photo-1694170269221-ea3df8c27f87?w=800', calories: 380, protein: 24, tags: ['High Protein', 'Weight Loss', 'Diabetic Friendly'], nutritionScore: 93, caloriesReduced: 240, cuisine: 'South Indian', foodType: 'Dish' },
  { id: '14', name: 'Grilled Chicken Burger', originalName: 'Double Cheeseburger', image: 'https://images.unsplash.com/photo-1619221882010-23e5b72bc561?w=800', calories: 520, protein: 42, tags: ['High Protein', 'Weight Loss'], nutritionScore: 87, caloriesReduced: 530, cuisine: 'American', foodType: 'Dish' }
];

export default function MealLibrary() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHealth, setActiveHealth] = useState('all');
  const [activeFoodType, setActiveFoodType] = useState('all');
  const [activeCuisine, setActiveCuisine] = useState('All Cuisines');
  const [meals, setMeals] = useState<MealCard[]>(fallbackMeals);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data, error } = await supabase
          .from('meal_library')
          .select('*')
          .order('name');

        if (!error && data && data.length > 0) {
          const formatted: MealCard[] = data.map((item: any) => {
            const origCal = item.original_nutrition?.calories || 0;
            const improvCal = item.improved_nutrition?.calories || 0;
            const proteinScore = Math.min(100, (item.improved_nutrition?.protein || 0) * 3);
            const score = Math.max(70, Math.min(99, 50 + proteinScore - (improvCal / 20)));
            return {
              id: item.id,
              name: item.name,
              originalName: item.original_nutrition?.name || 'Original Meal',
              image: item.image_url || 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=800',
              calories: improvCal,
              protein: item.improved_nutrition?.protein || 0,
              tags: item.health_tags || [],
              nutritionScore: Math.round(score),
              caloriesReduced: Math.max(0, origCal - improvCal),
              cuisine: item.cuisine || '',
              foodType: item.food_type || 'Dish'
            };
          });
          setMeals(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch meal library:', err);
      }
    };
    fetchMeals();
  }, []);

  const hasActiveFilters = activeHealth !== 'all' || activeFoodType !== 'all' || activeCuisine !== 'All Cuisines' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setActiveHealth('all');
    setActiveFoodType('all');
    setActiveCuisine('All Cuisines');
    setSearchQuery('');
  };

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meal.originalName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHealth = activeHealth === 'all' || meal.tags.includes(activeHealth);
    const matchesFoodType = activeFoodType === 'all' || meal.foodType === activeFoodType;
    const matchesCuisine = activeCuisine === 'All Cuisines' || meal.cuisine === activeCuisine;
    return matchesSearch && matchesHealth && matchesFoodType && matchesCuisine;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl text-gray-900 mb-3 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>
            Smart Meal Library
          </h1>
          <p className="text-xl text-gray-600" style={{ fontFamily: 'Fredoka' }}>
            Explore healthier versions of popular dishes
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for meals..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Filter Groups */}
        <div className="space-y-4 mb-6">
          {/* Health Goal Filters */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Health Goal</p>
            <div className="flex flex-wrap gap-2">
              {healthFilters.map(f => {
                const Icon = f.icon;
                const isActive = activeHealth === f.id;
                return (
                  <button key={f.id} onClick={() => setActiveHealth(f.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm ${
                      isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}>
                    <Icon className="w-4 h-4" /><span>{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Food Type Filters */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Food Type</p>
            <div className="flex flex-wrap gap-2">
              {foodTypeFilters.map(f => {
                const isActive = activeFoodType === f.id;
                return (
                  <button key={f.id} onClick={() => setActiveFoodType(f.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm ${
                      isActive ? 'bg-[#FFB347] text-white shadow-lg shadow-orange-300/30' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}>
                    {f.icon && <f.icon className="w-4 h-4" />}<span>{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cuisine Filters */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Cuisine</p>
            <div className="flex flex-wrap gap-2">
              {cuisineFilters.map(c => {
                const isActive = activeCuisine === c;
                return (
                  <button key={c} onClick={() => setActiveCuisine(c)}
                    className={`px-4 py-2 rounded-full transition-all text-sm ${
                      isActive ? 'bg-[#C490E4] text-white shadow-lg shadow-purple-300/30' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Filter Chips + Reset */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {activeHealth !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                {activeHealth} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setActiveHealth('all')} />
              </span>
            )}
            {activeFoodType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
                {activeFoodType} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setActiveFoodType('all')} />
              </span>
            )}
            {activeCuisine !== 'All Cuisines' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                {activeCuisine} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setActiveCuisine('All Cuisines')} />
              </span>
            )}
            <button onClick={resetFilters} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
              <RotateCcw className="w-3.5 h-3.5" /> Reset All
            </button>
          </div>
        )}

        {/* Meal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMeals.map((meal, idx) => (
              <motion.div
                key={meal.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.03 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                onClick={() => navigate(`/analysis/${meal.id}`)}
              >
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
                  {meal.cuisine && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-xs font-bold shadow">
                      {meal.cuisine}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl text-gray-900 mb-2" style={{ fontFamily: 'Fredoka' }}>{meal.name}</h3>
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
                      <span key={tagIdx} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredMeals.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2" style={{ fontFamily: 'Fredoka' }}>No meals found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button onClick={resetFilters} className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-colors">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
