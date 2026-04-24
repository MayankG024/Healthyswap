import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Plus, ChefHat, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';
import { useAppStore } from '../store/useAppStore';
import { Link } from 'react-router-dom';

export default function MealPlanner() {
  const { user } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FFF8E1] px-4 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
          <Calendar className="w-12 h-12 text-[#FFB347]" />
        </div>
        <h2 className="text-5xl text-gray-900 mb-6 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
          Your Meal Planner
        </h2>
        <p className="text-2xl text-gray-700 mb-8 max-w-md font-bold" style={{ fontFamily: 'Fredoka' }}>
          Please log in to plan your healthy meals for the week!
        </p>
        <Link to="/login" className="px-8 py-4 bg-[#6BCF7F] text-white rounded-2xl text-xl font-bold hover:scale-105 transition-all uppercase shadow-lg" style={{ fontFamily: 'Bebas Neue' }}>
          Log In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#FFD93D] rounded-2xl flex items-center justify-center shadow-md">
              <Calendar className="w-8 h-8 text-[#FF9800]" />
            </div>
            <div>
              <h1 className="text-5xl text-gray-900 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
                Meal Planner
              </h1>
              <p className="text-lg text-gray-600 font-bold" style={{ fontFamily: 'Fredoka' }}>
                Plan your healthy week ahead
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border-2 border-gray-100">
            <button onClick={() => setCurrentDate(addDays(currentDate, -7))} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-lg font-bold text-gray-800 uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem' }}>
              {format(startDate, 'MMM d')} - {format(addDays(startDate, 6), 'MMM d, yyyy')}
            </span>
            <button onClick={() => setCurrentDate(addDays(currentDate, 7))} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {days.map((day, idx) => {
            const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
            return (
              <motion.div
                key={day.toISOString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white rounded-3xl p-4 shadow-sm border-2 ${isToday ? 'border-[#6BCF7F] bg-[#E8F5E9]' : 'border-gray-100'}`}
              >
                <div className="text-center mb-4 border-b-2 border-gray-100 pb-2">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{format(day, 'EEE')}</p>
                  <p className={`text-2xl font-bold ${isToday ? 'text-[#2E7D32]' : 'text-gray-900'}`} style={{ fontFamily: 'Bebas Neue' }}>
                    {format(day, 'd')}
                  </p>
                </div>

                <div className="space-y-3">
                  {['Breakfast', 'Lunch', 'Dinner'].map(mealTime => (
                    <div key={mealTime} className="bg-gray-50 rounded-2xl p-3 border border-gray-100 hover:border-[#FFD93D] hover:bg-[#FFF8E1] cursor-pointer transition-all group min-h-[80px] flex flex-col justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase">{mealTime}</span>
                      <div className="flex items-center justify-center h-full">
                        <Plus className="w-6 h-6 text-gray-300 group-hover:text-[#FFB347] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border-2 border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl text-gray-900 uppercase tracking-tight mb-2" style={{ fontFamily: 'Bebas Neue' }}>Grocery List</h3>
            <p className="text-gray-600 font-bold" style={{ fontFamily: 'Fredoka' }}>Auto-generates based on your meal plan</p>
          </div>
          <button className="px-8 py-4 bg-[#FFB347] text-white rounded-2xl font-bold uppercase tracking-wide hover:shadow-lg transition-all flex items-center gap-2" style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem' }}>
            <ChefHat className="w-6 h-6" />
            Generate List
          </button>
        </div>
      </div>
    </div>
  );
}
