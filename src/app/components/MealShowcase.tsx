import { motion } from 'motion/react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

interface ShowcaseMeal {
  original: string;
  improved: string;
  image: string;
  savings: string;
}

const meals: ShowcaseMeal[] = [
  {
    original: 'Butter Chicken',
    improved: 'Grilled Tandoori Chicken',
    image: 'https://images.unsplash.com/photo-1735353783227-80b22ef618d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGhlYWx0aHl8ZW58MXx8fHwxNzcwMjg3NTY4fDA&ixlib=rb-4.1.0&q=80&w=400',
    savings: '340 cal saved'
  },
  {
    original: 'Fried Rice',
    improved: 'Cauliflower Rice Bowl',
    image: 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzcwMjA3OTgwfDA&ixlib=rb-4.1.0&q=80&w=400',
    savings: '280 cal saved'
  },
  {
    original: 'Pizza',
    improved: 'Veggie Flatbread',
    image: 'https://images.unsplash.com/photo-1623428188495-89c064ee061a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzcwMjg3NzI2fDA&ixlib=rb-4.1.0&q=80&w=400',
    savings: '260 cal saved'
  }
];

export default function MealShowcase() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
          Real Transformations
        </h2>
        <p className="text-lg text-gray-600">
          See how we make your favorite meals healthier
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {meals.map((meal, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <ImageWithSkeleton
                src={meal.image}
                alt={meal.improved}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                skeletonClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm opacity-80 line-through">{meal.original}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
              <h3 className="text-xl mb-2">{meal.improved}</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>{meal.savings}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
