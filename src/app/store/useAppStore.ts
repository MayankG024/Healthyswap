import { create } from 'zustand';
import { MealAnalysis } from '../utils/mealAnalyzer';

type Page = 'home' | 'library' | 'nutrition' | 'personalized';

interface AppState {
  currentPage: Page;
  isAnalyzing: boolean;
  analysisResult: MealAnalysis | null;
  selectedMeal: string;
  setCurrentPage: (page: Page) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisResult: (result: MealAnalysis | null) => void;
  setSelectedMeal: (meal: string) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'home',
  isAnalyzing: false,
  analysisResult: null,
  selectedMeal: '',
  setCurrentPage: (page) => set({ currentPage: page }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  setSelectedMeal: (meal) => set({ selectedMeal: meal }),
  reset: () => set({ 
    analysisResult: null, 
    currentPage: 'home',
    selectedMeal: ''
  }),
}));
