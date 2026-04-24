-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  age INTEGER,
  height DECIMAL,
  weight DECIMAL,
  activity_level TEXT,
  goals TEXT[],
  diet_preferences TEXT[],
  allergies TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- MEAL ANALYSES TABLE
CREATE TABLE IF NOT EXISTS public.meal_analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT,
  original_name TEXT NOT NULL,
  original_nutrition JSONB NOT NULL,
  improved_nutrition JSONB NOT NULL,
  changes JSONB NOT NULL,
  swaps JSONB NOT NULL,
  cooking_method JSONB NOT NULL,
  portion_tip TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.meal_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own analyses" ON public.meal_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analyses" ON public.meal_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own analyses" ON public.meal_analyses FOR DELETE USING (auth.uid() = user_id);

-- MEAL LIBRARY TABLE
CREATE TABLE IF NOT EXISTS public.meal_library (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  original_nutrition JSONB NOT NULL,
  improved_nutrition JSONB NOT NULL,
  changes JSONB NOT NULL,
  swaps JSONB NOT NULL,
  cooking_method JSONB NOT NULL,
  portion_tip TEXT,
  cuisine TEXT,
  food_type TEXT,
  health_tags TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.meal_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view meal library" ON public.meal_library FOR SELECT USING (true);

-- Create storage bucket for meal images
INSERT INTO storage.buckets (id, name, public) VALUES ('meal-images', 'meal-images', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view meal images" ON storage.objects FOR SELECT USING (bucket_id = 'meal-images');
CREATE POLICY "Authenticated users can upload meal images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'meal-images' AND auth.role() = 'authenticated');
