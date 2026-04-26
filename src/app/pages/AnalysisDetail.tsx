import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useAppStore } from '../store/useAppStore';
import ComparisonView from '../components/ComparisonView';
import { Activity, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function AnalysisDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppStore();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchAnalysis();
  }, [id, user]);

  const fetchAnalysis = async () => {
    try {
      // Try fetching from meal_analyses first (user's personal analyses)
      if (user) {
        const { data, error: dbError } = await supabase
          .from('meal_analyses')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (!dbError && data) {
          setAnalysis({
            original: {
              ...data.original_nutrition,
              image: data.image_url || `https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=800`
            },
            improved: {
              ...data.improved_nutrition,
              image: `https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800`
            },
            changes: data.changes || [],
            swaps: data.swaps || [],
            cookingMethod: data.cooking_method || { original: 'N/A', improved: 'N/A', benefit: '' },
            portionTip: data.portion_tip || 'Enjoy in moderation'
          });
          setLoading(false);
          return;
        }
      }

      // Try fetching from meal_library (public library items)
      const { data: libData, error: libError } = await supabase
        .from('meal_library')
        .select('*')
        .eq('id', id)
        .single();

      if (!libError && libData) {
        setAnalysis({
          original: {
            ...libData.original_nutrition,
            image: libData.image_url || `https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=800`
          },
          improved: {
            ...libData.improved_nutrition,
            image: libData.image_url || `https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800`
          },
          changes: libData.changes || [],
          swaps: libData.swaps || [],
          cookingMethod: libData.cooking_method || { original: 'N/A', improved: 'N/A', benefit: '' },
          portionTip: libData.portion_tip || 'Enjoy in moderation'
        });
        setLoading(false);
        return;
      }

      setError('Analysis not found');
    } catch (err) {
      console.error(err);
      setError('Failed to load analysis');
    } finally {
      setLoading(false);
    }
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

  if (error || !analysis) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FFF8E1] text-center px-4">
        <h2 className="text-4xl text-gray-900 mb-4 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
          {error || 'Analysis Not Found'}
        </h2>
        <p className="text-gray-600 mb-8" style={{ fontFamily: 'Fredoka' }}>
          This analysis may have been deleted or you don't have access.
        </p>
        <Link to="/meal-library" className="px-8 py-3 bg-[#6BCF7F] text-white rounded-full font-bold hover:shadow-lg transition-all uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue', fontSize: '1.25rem' }}>
          Browse Meal Library
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Link to="/dashboard" className="flex items-center gap-2 px-6 py-3 bg-[#FFEAA7] text-[#FF9800] rounded-full font-bold group hover:shadow-lg transition-all">
          <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-wide">Back</span>
        </Link>
      </motion.div>

      <ComparisonView analysis={analysis} />
    </div>
  );
}
