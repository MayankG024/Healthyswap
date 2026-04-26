import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import MealLibrary from './components/MealLibrary';
import NutritionBreakdown from './components/NutritionBreakdown';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import { Toaster } from 'sonner';
import { supabase } from './utils/supabase';
import { useAppStore } from './store/useAppStore';

import Dashboard from './pages/Dashboard';
import MealPlanner from './pages/MealPlanner';
import Profile from './pages/Profile';
import AnalysisDetail from './pages/AnalysisDetail';

export default function App() {
  const { setSession, setUser } = useAppStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [setSession, setUser]);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meal-library" element={<MealLibrary />} />
        <Route path="/analysis/:id" element={<AnalysisDetail />} />
        <Route path="/nutrition/:id" element={<NutritionBreakdown mealName="Meal" />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/personalized" element={<PersonalizedRecommendations />} />
      </Routes>
    </div>
  );
}
