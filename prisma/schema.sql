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

-- MEAL PLANNER TABLES
CREATE TABLE IF NOT EXISTS public.meal_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_start DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (user_id, week_start)
);

CREATE TABLE IF NOT EXISTS public.meal_plan_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  plan_id UUID REFERENCES public.meal_plans(id) ON DELETE CASCADE NOT NULL,
  meal_id UUID REFERENCES public.meal_library(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  meal_slot TEXT NOT NULL CHECK (meal_slot IN ('breakfast', 'lunch', 'dinner')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (plan_id, day_of_week, meal_slot)
);

CREATE TABLE IF NOT EXISTS public.grocery_lists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES public.meal_plans(id) ON DELETE CASCADE NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (plan_id)
);

CREATE INDEX IF NOT EXISTS meal_plan_items_plan_id_idx ON public.meal_plan_items(plan_id);
CREATE INDEX IF NOT EXISTS grocery_lists_user_id_idx ON public.grocery_lists(user_id);

ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_lists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own meal plans" ON public.meal_plans;
CREATE POLICY "Users can view own meal plans" ON public.meal_plans FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own meal plans" ON public.meal_plans;
CREATE POLICY "Users can insert own meal plans" ON public.meal_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own meal plans" ON public.meal_plans;
CREATE POLICY "Users can update own meal plans" ON public.meal_plans FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own meal plans" ON public.meal_plans;
CREATE POLICY "Users can delete own meal plans" ON public.meal_plans FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own meal plan items" ON public.meal_plan_items;
CREATE POLICY "Users can view own meal plan items" ON public.meal_plan_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.meal_plans
    WHERE meal_plans.id = meal_plan_items.plan_id
      AND meal_plans.user_id = auth.uid()
  )
);
DROP POLICY IF EXISTS "Users can insert own meal plan items" ON public.meal_plan_items;
CREATE POLICY "Users can insert own meal plan items" ON public.meal_plan_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.meal_plans
    WHERE meal_plans.id = meal_plan_items.plan_id
      AND meal_plans.user_id = auth.uid()
  )
);
DROP POLICY IF EXISTS "Users can update own meal plan items" ON public.meal_plan_items;
CREATE POLICY "Users can update own meal plan items" ON public.meal_plan_items FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.meal_plans
    WHERE meal_plans.id = meal_plan_items.plan_id
      AND meal_plans.user_id = auth.uid()
  )
);
DROP POLICY IF EXISTS "Users can delete own meal plan items" ON public.meal_plan_items;
CREATE POLICY "Users can delete own meal plan items" ON public.meal_plan_items FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.meal_plans
    WHERE meal_plans.id = meal_plan_items.plan_id
      AND meal_plans.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can view own grocery lists" ON public.grocery_lists;
CREATE POLICY "Users can view own grocery lists" ON public.grocery_lists FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can insert own grocery lists" ON public.grocery_lists;
CREATE POLICY "Users can insert own grocery lists" ON public.grocery_lists FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own grocery lists" ON public.grocery_lists;
CREATE POLICY "Users can update own grocery lists" ON public.grocery_lists FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own grocery lists" ON public.grocery_lists;
CREATE POLICY "Users can delete own grocery lists" ON public.grocery_lists FOR DELETE USING (auth.uid() = user_id);

-- Create storage bucket for meal images
INSERT INTO storage.buckets (id, name, public) VALUES ('meal-images', 'meal-images', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view meal images" ON storage.objects FOR SELECT USING (bucket_id = 'meal-images');
CREATE POLICY "Authenticated users can upload meal images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'meal-images' AND auth.role() = 'authenticated');
