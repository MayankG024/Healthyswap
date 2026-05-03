import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useAppStore } from '../store/useAppStore';
import UploadCard from '../components/UploadCard';
import ComparisonView from '../components/ComparisonView';
import MealShowcase from '../components/MealShowcase';
import FoodBackground from '../components/FoodBackground';
import Footer from '../components/Footer';
import AnalyzingAnimation from '../components/AnalyzingAnimation';
// We will replace this mock function with an API call later
import { analyzeMeal } from '../utils/mealAnalyzer';
import { supabase } from '../utils/supabase';

export default function Home() {
  const { 
    isAnalyzing, 
    analysisResult, 
    user,
    setIsAnalyzing,
    setAnalysisResult,
    reset
  } = useAppStore();

  useEffect(() => {
    if (analysisResult) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [analysisResult]);

  const handleSubmit = async (input: string, image?: File) => {
    setIsAnalyzing(true);
    toast.loading('Analyzing your meal...', { id: 'analyze' });
    
    try {
      let imageUrl = null;
      
      if (image && user) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('meal-images')
          .upload(filePath, image);
          
        if (!uploadError) {
          const { data } = supabase.storage.from('meal-images').getPublicUrl(filePath);
          imageUrl = data.publicUrl;
        }
      }

      // Try Edge Function first if user is logged in
      if (user) {
        const { data, error } = await supabase.functions.invoke('analyze-meal', {
          body: { mealName: input, imageUrl }
        });
        
        if (!error && data) {
          setAnalysisResult({
            original: data.original_nutrition,
            improved: data.improved_nutrition,
            changes: data.changes,
            swaps: data.swaps,
            cookingMethod: data.cooking_method,
            portionTip: data.portion_tip
          });
          toast.success('Analysis complete! 🎉', { id: 'analyze' });
          setIsAnalyzing(false);
          return;
        }
      }
      
      // Fallback to local deterministic analysis
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = analyzeMeal(input, image);
      setAnalysisResult(result);
      toast.success('Analysis complete (Local fallback)! 🎉', { id: 'analyze' });
    } catch (error) {
      toast.error('Failed to analyze meal. Please try again.', { id: 'analyze' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToHome = () => {
    reset();
  };

  return (
    <div className="relative">
      <Toaster position="top-center" richColors />
      
      {isAnalyzing && <AnalyzingAnimation />}

      {!analysisResult ? (
        <>
          <FoodBackground />
          
          <div className="relative min-h-[90vh] flex items-center overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-gray-900 mb-6 px-4 tracking-tight uppercase leading-[0.9]">
                  <span className="inline-block">EAT</span>{' '}
                  <span className="inline-block text-[#FFB347]">BETTER</span>
                  <br />
                  <span className="inline-block">FEEL</span>{' '}
                  <span className="inline-block text-[#6BCF7F]">AMAZING!</span>
                </h1>

                <p className="text-2xl sm:text-3xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: 'Fredoka' }}>
                  Transform any meal into a <span className="text-[#FFB347] font-bold">healthier version</span>
                  {' '}with smart swaps & <span className="text-[#6BCF7F] font-bold">instant nutrition insights</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <UploadCard onSubmit={handleSubmit} isAnalyzing={isAnalyzing} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4 mt-12"
              >
                {[
                  { icon: '📸', text: 'Upload Any Food Photo' },
                  { icon: '⚡', text: 'Instant AI Analysis' },
                  { icon: '🎯', text: 'Smart Ingredient Swaps' },
                  { icon: '💪', text: 'Better Health Goals' },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="px-6 py-3 bg-white text-gray-800 rounded-full shadow-sm border-2 border-gray-100"
                  >
                    <span className="text-lg font-bold">
                      {feature.icon} {feature.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="relative py-20 bg-[#FFF8E1] overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl text-center mb-16 text-gray-900 uppercase tracking-tight"
                style={{ fontFamily: 'Bebas Neue' }}
              >
                Proven Results
              </motion.h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: '70+', label: 'MEALS TRANSFORMED', icon: '🍽️', color: 'bg-[#FFB8D1]', textColor: 'text-[#D81B60]' },
                  { value: '40%', label: 'AVG CALORIES CUT', icon: '🔥', color: 'bg-[#FFD93D]', textColor: 'text-[#FF9800]' },
                  { value: '95%', label: 'HAPPY USERS', icon: '😍', color: 'bg-[#A8E6B5]', textColor: 'text-[#2E7D32]' },
                  { value: '1000+', label: 'HEALTHY RECIPES', icon: '📚', color: 'bg-[#C490E4]', textColor: 'text-[#7B1FA2]' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    <div className={`${stat.color} p-8 rounded-3xl shadow-lg border-2 border-white transform hover:scale-105 transition-transform`}>
                      <div className="text-5xl mb-3 text-center">{stat.icon}</div>
                      <div className={`text-5xl sm:text-6xl text-center mb-2 ${stat.textColor}`} style={{ fontFamily: 'Bebas Neue' }}>
                        {stat.value}
                      </div>
                      <div className={`text-sm text-center font-bold uppercase tracking-wide ${stat.textColor}`}>
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative bg-white py-20">
            <MealShowcase />
          </div>

          <div className="relative py-24 bg-[#6BCF7F] overflow-hidden">
            <div className="relative max-w-5xl mx-auto px-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl sm:text-7xl text-white mb-8 uppercase tracking-tight"
                style={{ fontFamily: 'Bebas Neue' }}
              >
                Ready To Start?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl text-white/95 mb-12"
                style={{ fontFamily: 'Fredoka' }}
              >
                Join thousands making healthier food choices every day!
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-12 py-6 bg-white text-[#2E7D32] rounded-full text-2xl font-bold shadow-xl hover:shadow-2xl transition-all uppercase tracking-wide"
                style={{ fontFamily: 'Bebas Neue' }}
              >
                Start Now - It's Free!
              </motion.button>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBackToHome}
            className="flex items-center gap-2 px-6 py-3 bg-[#FFEAA7] text-[#FF9800] rounded-full font-bold mb-8 group hover:shadow-lg transition-all"
          >
            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-wide">Analyze Another Meal</span>
          </motion.button>

          <ComparisonView analysis={analysisResult} />
        </div>
      )}
    </div>
  );
}
