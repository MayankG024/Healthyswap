import { ArrowRight, ArrowUp, ArrowDown, Flame, Droplet, TrendingUp, Sparkles, Check, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import type { MealAnalysis } from '../utils/mealAnalyzer';
import ImageWithSkeleton from './ImageWithSkeleton';

interface ComparisonViewProps {
  analysis: MealAnalysis;
}

export default function ComparisonView({ analysis }: ComparisonViewProps) {
  return (
    <div className="space-y-8">
      {/* Success Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="flex items-center justify-center gap-2 mb-8"
      >
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#CDFF00] via-[#4ADE80] to-[#CDFF00] text-[#78350F] rounded-full shadow-2xl border-4 border-white">
          <Check className="w-7 h-7" />
          <span className="text-2xl uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue' }}>
            ✨ ANALYSIS COMPLETE!
          </span>
        </div>
      </motion.div>

      {/* Main Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Original Meal */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="relative h-64">
            <ImageWithSkeleton
              src={analysis.original.image}
              alt={analysis.original.name}
              className="w-full h-full object-cover"
              skeletonClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-block px-3 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-white text-sm mb-2">
                Original
              </div>
              <h3 className="text-2xl text-white">{analysis.original.name}</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-3xl text-gray-900">{analysis.original.calories}</span>
              <span className="text-gray-500">calories</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-500">Protein</div>
                <div className="text-lg text-gray-900">{analysis.original.protein}g</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Carbs</div>
                <div className="text-lg text-gray-900">{analysis.original.carbs}g</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Fat</div>
                <div className="text-lg text-gray-900">{analysis.original.fat}g</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Fiber</div>
                <div className="text-lg text-gray-900">{analysis.original.fiber}g</div>
              </div>
            </div>

            {analysis.original.factors && (
              <div className="space-y-2">
                <div className="text-sm text-gray-500 mb-2">Concerns:</div>
                {analysis.original.factors.map((factor, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-red-600">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    {factor}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Improved Meal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl shadow-lg border border-emerald-200 overflow-hidden"
        >
          <div className="relative h-64">
            <ImageWithSkeleton
              src={analysis.improved.image}
              alt={analysis.improved.name}
              className="w-full h-full object-cover"
              skeletonClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-white text-sm mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Healthier Version</span>
              </div>
              <h3 className="text-2xl text-white">{analysis.improved.name}</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-emerald-500" />
              <span className="text-3xl text-gray-900">{analysis.improved.calories}</span>
              <span className="text-gray-500">calories</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-500">Protein</div>
                <div className="text-lg text-emerald-600">{analysis.improved.protein}g</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Carbs</div>
                <div className="text-lg text-emerald-600">{analysis.improved.carbs}g</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Fat</div>
                <div className="text-lg text-emerald-600">{analysis.improved.fat}g</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Fiber</div>
                <div className="text-lg text-emerald-600">{analysis.improved.fiber}g</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-500 mb-2">Benefits:</div>
              {analysis.changes.slice(0, 3).map((change, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  {change.label} improved by {change.percentage}%
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Nutrition Changes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
      >
        <h3 className="text-2xl text-gray-900 mb-6">Nutritional Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {analysis.changes.map((change, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className={`p-4 rounded-2xl ${
                change.change === 'up' 
                  ? 'bg-emerald-50 border border-emerald-200' 
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {change.change === 'up' ? (
                  <ArrowUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ArrowDown className="w-5 h-5 text-blue-600" />
                )}
                <span className={`text-sm ${
                  change.change === 'up' ? 'text-emerald-600' : 'text-blue-600'
                }`}>
                  {change.label}
                </span>
              </div>
              <div className={`text-2xl ${
                change.change === 'up' ? 'text-emerald-700' : 'text-blue-700'
              }`}>
                {change.percentage}%
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Ingredient Swaps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
      >
        <h3 className="text-2xl text-gray-900 mb-6">Smart Ingredient Swaps</h3>
        <div className="space-y-4">
          {analysis.swaps.map((swap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {swap.original}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    {swap.replacement}
                  </span>
                </div>
                <p className="text-sm text-gray-600 ml-1">{swap.benefit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cooking Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h3 className="text-xl text-gray-900 mb-4">Cooking Method</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
              {analysis.cookingMethod.original}
            </span>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl">
              {analysis.cookingMethod.improved}
            </span>
          </div>
          <p className="text-sm text-gray-600">{analysis.cookingMethod.benefit}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl shadow-lg border border-amber-200 p-8">
          <h3 className="text-xl text-gray-900 mb-4">Portion Tip</h3>
          <p className="text-gray-700">{analysis.portionTip}</p>
        </div>
      </motion.div>
    </div>
  );
}