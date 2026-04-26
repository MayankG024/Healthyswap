import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'sonner';
import { supabase } from './utils/supabase';
import { useAppStore } from './store/useAppStore';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MealPlanner = lazy(() => import('./pages/MealPlanner'));
const Profile = lazy(() => import('./pages/Profile'));
const AnalysisDetail = lazy(() => import('./pages/AnalysisDetail'));
const GroceryList = lazy(() => import('./pages/GroceryList'));
const MealLibrary = lazy(() => import('./components/MealLibrary'));
const NutritionBreakdown = lazy(() => import('./components/NutritionBreakdown'));
const PersonalizedRecommendations = lazy(() => import('./components/PersonalizedRecommendations'));

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

      <Suspense
        fallback={(
          <div className="min-h-[70vh] flex items-center justify-center text-[#FF9800] font-bold">
            Loading...
          </div>
        )}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meal-library" element={<MealLibrary />} />
          <Route path="/analysis/:id" element={<AnalysisDetail />} />
          <Route path="/nutrition/:id" element={<NutritionBreakdown mealName="Meal" />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/personalized" element={<PersonalizedRecommendations />} />
        </Routes>
      </Suspense>
    </div>
  );
}
