import { ArrowLeft, Flame, TrendingUp, Heart, Droplet, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface NutritionBreakdownProps {
  mealName: string;
}

export default function NutritionBreakdown({ mealName }: NutritionBreakdownProps) {
  // Macro data
  const macroData = [
    { name: 'Protein', value: 42, color: '#10b981' },
    { name: 'Carbs', value: 45, color: '#f59e0b' },
    { name: 'Fat', value: 16, color: '#ef4444' }
  ];

  // Vitamin data
  const vitaminData = [
    { name: 'Vitamin A', value: 85, daily: '85%' },
    { name: 'Vitamin C', value: 65, daily: '65%' },
    { name: 'Vitamin D', value: 40, daily: '40%' },
    { name: 'Vitamin B12', value: 92, daily: '92%' },
    { name: 'Iron', value: 55, daily: '55%' },
    { name: 'Calcium', value: 48, daily: '48%' }
  ];

  // Comparison data
  const comparisonData = [
    { metric: 'Calories', original: 820, improved: 480 },
    { metric: 'Protein (g)', original: 35, improved: 42 },
    { metric: 'Fat (g)', original: 48, improved: 16 },
    { metric: 'Fiber (g)', original: 3, improved: 7 },
    { metric: 'Sugar (g)', original: 12, improved: 4 }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Heart Health',
      description: 'Lower saturated fat supports cardiovascular wellness'
    },
    {
      icon: TrendingUp,
      title: 'Energy Boost',
      description: 'Balanced macros provide sustained energy throughout the day'
    },
    {
      icon: Sparkles,
      title: 'Better Digestion',
      description: '133% more fiber aids gut health and satiety'
    },
    {
      icon: Flame,
      title: 'Weight Management',
      description: '41% fewer calories while maintaining nutrition'
    }
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl text-gray-900 mb-4">
            {mealName}
          </h1>
          <p className="text-xl text-gray-600">
            Complete nutritional breakdown and health benefits
          </p>
        </motion.div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Calories', value: '480', icon: Flame, color: 'orange' },
            { label: 'Protein', value: '42g', icon: TrendingUp, color: 'emerald' },
            { label: 'Carbs', value: '45g', icon: Droplet, color: 'amber' },
            { label: 'Fat', value: '16g', icon: Heart, color: 'red' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6"
              >
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Macro Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
          >
            <h2 className="text-2xl text-gray-900 mb-6">Macro Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {macroData.map((macro, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="w-4 h-4 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: macro.color }}
                  />
                  <div className="text-sm text-gray-600">{macro.name}</div>
                  <div className="text-lg text-gray-900">{macro.value}g</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vitamins & Minerals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
          >
            <h2 className="text-2xl text-gray-900 mb-6">Vitamins & Minerals</h2>
            <div className="space-y-4">
              {vitaminData.map((vitamin, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">{vitamin.name}</span>
                    <span className="text-sm text-emerald-600">{vitamin.daily} DV</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${vitamin.value}%` }}
                      transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-2xl">
              <p className="text-sm text-emerald-700">
                <strong>Daily Value (DV):</strong> Percentage of recommended daily intake
              </p>
            </div>
          </motion.div>
        </div>

        {/* Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8"
        >
          <h2 className="text-2xl text-gray-900 mb-6">Original vs Healthier Version</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="original" fill="#ef4444" name="Original" radius={[8, 8, 0, 0]} />
                <Bar dataKey="improved" fill="#10b981" name="Healthier" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Health Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl text-gray-900 mb-6">Health Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Daily Value Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl shadow-lg border border-emerald-200 p-8"
        >
          <h2 className="text-2xl text-gray-900 mb-6">How This Fits Your Day</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Calories', value: '24%', description: 'Based on 2000 cal/day' },
              { label: 'Protein', value: '84%', description: 'Based on 50g/day' },
              { label: 'Fat', value: '21%', description: 'Based on 78g/day' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl text-emerald-600 mb-2">{item.value}</div>
                <div className="text-lg text-gray-900 mb-1">{item.label}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
