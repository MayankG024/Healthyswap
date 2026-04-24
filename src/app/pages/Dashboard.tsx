import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useAppStore } from '../store/useAppStore';
import { motion } from 'motion/react';
import { Activity, Clock, Flame, History, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user, setAnalysisResult } = useAppStore();
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHistory();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('meal_analyses')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error: any) {
      console.error('Error fetching history:', error);
      toast.error('Failed to load your history');
    } finally {
      setLoading(false);
    }
  };

  const deleteAnalysis = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { error } = await supabase.from('meal_analyses').delete().eq('id', id);
      if (error) throw error;
      setHistory(history.filter(h => h.id !== id));
      toast.success('Deleted from history');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleViewAnalysis = (item: any) => {
    setAnalysisResult({
      original: item.original_nutrition,
      improved: item.improved_nutrition,
      changes: item.changes,
      swaps: item.swaps,
      cookingMethod: item.cooking_method,
      portionTip: item.portion_tip
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FFF8E1]">
        <div className="animate-spin text-[#FF9800]">
          <Activity className="w-12 h-12" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FFF8E1] px-4 text-center">
        <h2 className="text-5xl text-gray-900 mb-6 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
          Welcome to your Dashboard
        </h2>
        <p className="text-2xl text-gray-700 mb-8 max-w-md font-bold" style={{ fontFamily: 'Fredoka' }}>
          Please log in to track your healthy swaps and view your history!
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
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-[#FFD93D] rounded-2xl flex items-center justify-center shadow-md">
            <Activity className="w-8 h-8 text-[#FF9800]" />
          </div>
          <div>
            <h1 className="text-5xl text-gray-900 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
              Your Dashboard
            </h1>
            <p className="text-lg text-gray-600 font-bold" style={{ fontFamily: 'Fredoka' }}>
              Track your healthy transformation journey
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-gray-100 flex items-center gap-6">
            <div className="w-14 h-14 bg-[#E8F5E9] rounded-2xl flex items-center justify-center">
              <History className="w-7 h-7 text-[#4CAF50]" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Meals Analyzed</p>
              <p className="text-4xl text-gray-900" style={{ fontFamily: 'Bebas Neue' }}>{history.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-gray-100 flex items-center gap-6">
            <div className="w-14 h-14 bg-[#FFF3E0] rounded-2xl flex items-center justify-center">
              <Flame className="w-7 h-7 text-[#FF9800]" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Calories Saved</p>
              <p className="text-4xl text-gray-900" style={{ fontFamily: 'Bebas Neue' }}>
                {history.reduce((acc, curr) => {
                  const original = curr.original_nutrition?.calories || 0;
                  const improved = curr.improved_nutrition?.calories || 0;
                  return acc + Math.max(0, original - improved);
                }, 0)} kcal
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-gray-100 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/profile')}>
            <div className="w-14 h-14 bg-[#E3F2FD] rounded-2xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-[#2196F3]" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Complete Profile</p>
              <p className="text-xl text-[#2196F3] font-bold" style={{ fontFamily: 'Fredoka' }}>Settings <ArrowRight className="inline w-5 h-5"/></p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <h2 className="text-3xl text-gray-900 mb-6 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
          Recent Analyses
        </h2>

        {history.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm border-2 border-gray-100 text-center">
            <div className="w-24 h-24 bg-[#FFF8E1] rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-[#FFB347]" />
            </div>
            <h3 className="text-2xl text-gray-900 font-bold mb-4" style={{ fontFamily: 'Fredoka' }}>No meals analyzed yet</h3>
            <p className="text-gray-500 mb-8">Upload your first meal to start tracking your healthy swaps!</p>
            <Link to="/" className="px-8 py-3 bg-[#FFB347] text-white rounded-full font-bold hover:shadow-lg transition-all uppercase tracking-wide inline-block" style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem' }}>
              Analyze a Meal
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleViewAnalysis(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border-2 border-gray-100 cursor-pointer transition-all group"
              >
                {item.image_url ? (
                  <div className="h-48 relative overflow-hidden bg-gray-100">
                    <img src={item.image_url} alt={item.original_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[#FFD93D] to-[#FF9800] p-6 flex items-end">
                    <h3 className="text-3xl text-white uppercase tracking-tight line-clamp-2" style={{ fontFamily: 'Bebas Neue' }}>
                      {item.original_name}
                    </h3>
                  </div>
                )}
                
                <div className="p-6 relative">
                  {item.image_url && (
                    <h3 className="text-2xl text-gray-900 uppercase tracking-tight mb-2 truncate" style={{ fontFamily: 'Bebas Neue' }}>
                      {item.original_name}
                    </h3>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm font-bold text-gray-600 mb-4" style={{ fontFamily: 'Fredoka' }}>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-[#FF9800]" />
                      <span className="line-through opacity-70">{item.original_nutrition?.calories}</span>
                      <span className="text-[#4CAF50]">{item.improved_nutrition?.calories}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
                    <span className="text-xs text-gray-400 font-bold">
                      {format(new Date(item.created_at), 'MMM d, yyyy')}
                    </span>
                    <button 
                      onClick={(e) => deleteAnalysis(item.id, e)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
