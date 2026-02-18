import { useState } from 'react';
import { Target, TrendingDown, TrendingUp, Heart, Leaf, Flame, Apple, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import ImageWithSkeleton from './ImageWithSkeleton';

type Goal = 'lose-fat' | 'gain-muscle' | 'healthy-lifestyle' | null;
type DietPreference = 'vegetarian' | 'keto' | 'high-protein' | 'balanced' | null;

interface Recommendation {
  id: string;
  title: string;
  description: string;
  meals: string[];
  benefits: string[];
  image: string;
}

const goalOptions = [
  { id: 'lose-fat' as Goal, label: 'Lose Fat', icon: TrendingDown, color: 'blue', bgColor: 'bg-blue-50', borderColor: 'border-blue-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { id: 'gain-muscle' as Goal, label: 'Gain Muscle', icon: TrendingUp, color: 'purple', bgColor: 'bg-purple-50', borderColor: 'border-purple-500', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: 'healthy-lifestyle' as Goal, label: 'Healthy Lifestyle', icon: Heart, color: 'emerald', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-500', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' }
];

const dietOptions = [
  { id: 'vegetarian' as DietPreference, label: 'Vegetarian', icon: Leaf },
  { id: 'keto' as DietPreference, label: 'Keto', icon: Flame },
  { id: 'high-protein' as DietPreference, label: 'High Protein', icon: TrendingUp },
  { id: 'balanced' as DietPreference, label: 'Balanced', icon: Apple }
];

const recommendations: { [key: string]: Recommendation } = {
  'lose-fat-vegetarian': {
    id: '1',
    title: 'Plant-Powered Fat Loss',
    description: 'High-fiber, nutrient-dense vegetarian meals to support healthy weight loss',
    meals: [
      'Quinoa Buddha Bowl with Roasted Vegetables',
      'Lentil & Spinach Curry with Cauliflower Rice',
      'Greek Salad with Chickpeas & Feta',
      'Vegetable Stir-Fry with Tofu'
    ],
    benefits: ['High in fiber', 'Low calorie density', 'Rich in plant protein', 'Keeps you full longer'],
    image: 'https://images.unsplash.com/photo-1623428188495-89c064ee061a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzcwMjg3NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'lose-fat-keto': {
    id: '2',
    title: 'Keto Fat Burning',
    description: 'Low-carb, high-fat meals optimized for ketosis and fat loss',
    meals: [
      'Grilled Salmon with Asparagus',
      'Zucchini Noodles with Avocado Pesto',
      'Cauliflower Fried Rice with Egg',
      'Chicken Breast with Brussels Sprouts'
    ],
    benefits: ['Very low carbs', 'High healthy fats', 'Promotes ketosis', 'Stable energy'],
    image: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NzAyMTczMTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'lose-fat-high-protein': {
    id: '3',
    title: 'High-Protein Lean Diet',
    description: 'Protein-rich meals to preserve muscle while losing fat',
    meals: [
      'Grilled Chicken Breast with Vegetables',
      'Egg White Omelet with Spinach',
      'Tuna Salad Bowl',
      'Greek Yogurt Parfait with Berries'
    ],
    benefits: ['High protein', 'Preserves muscle', 'Increases satiety', 'Boosts metabolism'],
    image: 'https://images.unsplash.com/photo-1735353783227-80b22ef618d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGhlYWx0aHl8ZW58MXx8fHwxNzcwMjg3NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'lose-fat-balanced': {
    id: '4',
    title: 'Balanced Weight Loss',
    description: 'Moderate approach with balanced macros for sustainable fat loss',
    meals: [
      'Grilled Fish with Sweet Potato & Greens',
      'Turkey & Avocado Whole Grain Wrap',
      'Vegetable Soup with Lean Protein',
      'Overnight Oats with Nuts & Berries'
    ],
    benefits: ['Balanced macros', 'Sustainable', 'Nutrient-rich', 'Easy to maintain'],
    image: 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzcwMjA3OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'gain-muscle-vegetarian': {
    id: '5',
    title: 'Plant-Based Muscle Building',
    description: 'Protein-rich vegetarian meals to support muscle growth',
    meals: [
      'Tempeh & Quinoa Power Bowl',
      'Chickpea Curry with Brown Rice',
      'Tofu Scramble with Vegetables',
      'Lentil Pasta with Nutritional Yeast'
    ],
    benefits: ['High plant protein', 'Complete amino acids', 'Anti-inflammatory', 'Supports recovery'],
    image: 'https://images.unsplash.com/photo-1623428188495-89c064ee061a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzcwMjg3NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'gain-muscle-high-protein': {
    id: '6',
    title: 'Maximum Muscle Gain',
    description: 'High-protein, calorie-dense meals for serious muscle building',
    meals: [
      'Grilled Steak with Sweet Potato',
      'Salmon with Quinoa & Avocado',
      'Chicken & Rice Bowl',
      'Protein Smoothie with Banana & Oats'
    ],
    benefits: ['Very high protein', 'Calorie surplus', 'Optimal for growth', 'Fast recovery'],
    image: 'https://images.unsplash.com/photo-1633862472152-e3873eb1b3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBib3dsJTIwaGVhbHRoeXxlbnwxfHx8fDE3NzAyMTczMTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'healthy-lifestyle-vegetarian': {
    id: '7',
    title: 'Balanced Vegetarian Living',
    description: 'Well-rounded plant-based meals for overall health',
    meals: [
      'Mediterranean Vegetable Bowl',
      'Spinach & Feta Frittata',
      'Veggie Buddha Bowl',
      'Roasted Vegetable Quinoa'
    ],
    benefits: ['Nutrient-dense', 'Heart-healthy', 'Anti-oxidant rich', 'Sustainable'],
    image: 'https://images.unsplash.com/photo-1661257711676-79a0fc533569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJvd2wlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzAyODc1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  'healthy-lifestyle-balanced': {
    id: '8',
    title: 'Holistic Wellness',
    description: 'Diverse, balanced meals for long-term health',
    meals: [
      'Grilled Fish with Mixed Vegetables',
      'Whole Grain Salad Bowl',
      'Lean Protein with Roasted Veggies',
      'Smoothie Bowl with Fresh Fruit'
    ],
    benefits: ['Variety of nutrients', 'Sustainable habits', 'Boosts immunity', 'Promotes longevity'],
    image: 'https://images.unsplash.com/photo-1610450620997-6921021865da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGJvd2wlMjBiZXJyaWVzfGVufDF8fHx8MTc3MDI4MTgwMXww&ixlib=rb-4.1.0&q=80&w=1080'
  }
};

export default function PersonalizedRecommendations() {
  const [selectedGoal, setSelectedGoal] = useState<Goal>(null);
  const [selectedDiet, setSelectedDiet] = useState<DietPreference>(null);

  const getRecommendation = (): Recommendation | null => {
    if (!selectedGoal || !selectedDiet) return null;
    const key = `${selectedGoal}-${selectedDiet}`;
    return recommendations[key] || null;
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            Personalized for You
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us your goals and preferences to get customized meal recommendations
          </p>
        </div>

        {/* Goal Selection */}
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-6">What's your goal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goalOptions.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;
              return (
                <motion.button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-3xl border-2 transition-all text-left ${
                    isSelected
                      ? `${goal.borderColor} ${goal.bgColor} shadow-lg`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    isSelected ? goal.iconBg : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected ? goal.iconColor : 'text-gray-600'
                    }`} />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">{goal.label}</h3>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2"
                    >
                      <CheckCircle className={`w-5 h-5 ${goal.iconColor}`} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Diet Preference Selection */}
        <div className="mb-12">
          <h2 className="text-2xl text-gray-900 mb-6">Dietary preference?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dietOptions.map((diet) => {
              const Icon = diet.icon;
              const isSelected = selectedDiet === diet.id;
              return (
                <motion.button
                  key={diet.id}
                  onClick={() => setSelectedDiet(diet.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${
                    isSelected ? 'text-emerald-600' : 'text-gray-600'
                  }`} />
                  <span className={`text-sm ${
                    isSelected ? 'text-emerald-700' : 'text-gray-700'
                  }`}>
                    {diet.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Recommendation Display */}
        {recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="relative h-80">
              <ImageWithSkeleton
                src={recommendation.image}
                alt={recommendation.title}
                className="w-full h-full object-cover"
                skeletonClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-sm mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Your Personalized Plan</span>
                </div>
                <h2 className="text-4xl mb-3">{recommendation.title}</h2>
                <p className="text-lg text-gray-200">{recommendation.description}</p>
              </div>
            </div>

            <div className="p-8">
              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-xl text-gray-900 mb-4">Key Benefits</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {recommendation.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-xl"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm text-emerald-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Meals */}
              <div>
                <h3 className="text-xl text-gray-900 mb-4">Recommended Meals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendation.meals.map((meal, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Apple className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-gray-700">{meal}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span className="text-lg">Start Your Journey</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Prompt if nothing selected */}
        {!recommendation && (selectedGoal || selectedDiet) && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Almost there!</h3>
            <p className="text-gray-600">
              {!selectedGoal && 'Select your goal to continue'}
              {!selectedDiet && selectedGoal && 'Choose your dietary preference to see recommendations'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}