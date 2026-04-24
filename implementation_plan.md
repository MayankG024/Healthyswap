# HealthySwap: Full-Stack AI Nutrition Transformation Platform

This document outlines the architecture and implementation plan to evolve HealthySwap from a frontend mockup into a fully functional, database-backed full-stack application suitable for a final-year capstone project.

## User Review Approved

The implementation plan has been reviewed and approved with the following architectural choices:
1. **AI Vision Model**: Gemini API.
2. **Backend & Storage**: Supabase (PostgreSQL Database, Storage, and Edge Functions for AI).
3. **Authentication**: Supabase Google Auth.

## Proposed Changes

### 1. Architecture Setup
We will use Supabase as our Backend-as-a-Service (BaaS) and keep the frontend as React + Vite.
- `src/` -> Frontend code (React + Vite)
- Supabase -> PostgreSQL Database, Auth, Storage, and Edge Functions (for Gemini API)

---

## Phase 2: Supabase Backend Integration (In Progress)
- [x] Create `schema.sql` for PostgreSQL tables (profiles, meal_analyses, meal_library, meal_plans, groceries)
- [x] Create `useAppStore.ts` integration with Supabase Auth state
- [x] Create `.env.example` file and configure Supabase client (`utils/supabase.ts`)
- [x] Create `LoginPage.tsx` with Google Auth integration
- [x] Write Edge Function (`analyze-meal`) integrating Gemini 2.5 Pro Vision API
- [x] Update `Home.tsx` to handle uploading images to Supabase Storage and calling the Edge Function
- [ ] User Setup Required: 
      - Populate `.env` with actual Supabase keys
      - Run `npm install` for newly added dependencies
      - Execute `schema.sql` in Supabase dashboard
      - Deploy the `analyze-meal` Edge Function (`supabase functions deploy analyze-meal`)

## Phase 3: Dashboard & Library Integration (Completed)
- [x] Integrate `meal_analyses` into the Dashboard history tab
- [x] Update `MealLibrary` to fetch dynamically from Supabase `meal_library` (with local fallback)
- [x] Create `ProfilePage.tsx` with Supabase `profiles` table connection (upsert user info)
- [x] Create `MealPlannerPage.tsx` UI placeholder for users to plan meals

#### Supabase Auth & Storage
- [x] Enable Google OAuth provider in Supabase.
- [x] Create a `meal-images` storage bucket.

#### Supabase Edge Functions
- [x] `analyze-meal`: An Edge Function (Deno) that receives an image URL, calls the Gemini API to detect food and nutrition, applies transformation rules, and returns the healthy swaps.

---

### 3. Frontend Architecture (React + Vite)
Transition from state-based navigation to real routing using `react-router-dom`.

#### [MODIFY] `package.json`
- Add `react-router-dom`, `@supabase/supabase-js`, `@google/genai` (if using directly, but we will use Edge Function), `lucide-react` (if not present), `zustand`.

#### [MODIFY] `src/app/App.tsx` & `src/main.tsx`
- Remove `currentPage` state logic.
- Wrap application in `<BrowserRouter>` and define real routes:
  - `/` (Home/Landing)
  - `/login` (Google Auth button)
  - `/dashboard`
  - `/analyze`
  - `/analysis/:id`
  - `/history`
  - `/meal-library`
  - `/meal-planner`
  - `/grocery-list`
  - `/profile`
  - `/methodology`

#### [NEW] `src/pages/`
- Extract existing components (`UploadCard`, `MealLibrary`, `NutritionBreakdown`) into proper page components.
- Build new pages: `DashboardPage`, `LoginPage` (Google Auth), `MealPlannerPage`, `GroceryListPage`, `ProfilePage`.

#### [MODIFY] `src/app/utils/mealAnalyzer.ts` -> `src/services/supabase.ts` & `src/services/api.ts`
- Setup Supabase client.
- Replace deterministic hardcoded mock data with calls to Supabase Edge Function (`analyze-meal`) and Supabase DB.

---

### 4. Database-Backed Meal Library
- Migrate the static `mealDatabase` in the current `mealAnalyzer.ts` into a database seed script (`server/prisma/seed.ts`).
- Expand the library to include the new requested categories (Indian, Mexican, Desserts, Beverages, etc.).

## Verification Plan

### Automated Tests
- Test backend API routes using Postman or unit tests (Jest/Supertest) to ensure authentication and meal analysis pipelines work.
- Verify Prisma database connection and migrations.

### Manual Verification
1. **User Flow**: Register a new user, log in, and navigate to the dashboard.
2. **Analysis Flow**: Upload a food image. Verify that the request hits the backend, processes via the AI Vision API, saves to the database, and displays the dynamic results on the frontend.
3. **Meal Library**: Navigate to `/meal-library` and verify data is fetched from the PostgreSQL database and filtering works.
4. **Planner & Grocery**: Generate a weekly meal plan and ensure the grocery list accurately reflects the required ingredients.
