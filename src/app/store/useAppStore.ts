import { create } from 'zustand';
import { MealAnalysis } from '../utils/mealAnalyzer';
import { User, Session } from '@supabase/supabase-js';

interface AppState {
  isAnalyzing: boolean;
  analysisResult: MealAnalysis | null;
  selectedMeal: string;
  user: User | null;
  session: Session | null;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisResult: (result: MealAnalysis | null) => void;
  setSelectedMeal: (meal: string) => void;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAnalyzing: false,
  analysisResult: null,
  selectedMeal: '',
  user: null,
  session: null,
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  setSelectedMeal: (meal) => set({ selectedMeal: meal }),
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  reset: () => set({ 
    analysisResult: null, 
    selectedMeal: ''
  }),
}));
