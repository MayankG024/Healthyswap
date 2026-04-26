# HealthySwap Implementation Plan

HealthySwap is a full-stack AI-powered nutrition transformation platform that analyzes meals from images or text, estimates nutrition, recommends culturally relevant healthier alternatives, stores user progress, and generates personalized meal plans and grocery lists across cuisines, dishes, snacks, beverages, and desserts.

## Architecture Baseline
- Frontend: React + Vite + TypeScript
- Backend Platform: Supabase (Auth, Postgres, Storage, Edge Functions)
- AI Analysis: Gemini via Supabase Edge Function (`analyze-meal`)

## Completed

### Core Full-Stack Foundation
- [x] Supabase client setup using environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- [x] App-wide auth session sync in global store (`user`, `session`).
- [x] SQL schema created for `profiles`, `meal_analyses`, `meal_library`, `meal_plans`, `meal_plan_items`, `grocery_lists`.
- [x] Row Level Security policies added for user-specific access control.
- [x] `meal-images` storage bucket and storage policies included in SQL setup.

### Authentication
- [x] Google OAuth login flow implemented in frontend (`supabase.auth.signInWithOAuth`).
- [x] Logout flow and auth-state-driven UI behavior implemented.

### AI Meal Analysis Pipeline
- [x] Supabase Edge Function `analyze-meal` implemented.
- [x] Image URL fetch + base64 conversion implemented before Gemini request.
- [x] AI response parsing and payload validation implemented.
- [x] Successful analyses saved to `meal_analyses` table.

### Product Features Implemented
- [x] Dashboard uses persisted meal analysis history.
- [x] Meal library reads from Supabase with fallback behavior.
- [x] Profile page reads/writes user profile data to `profiles`.
- [x] Weekly meal planner supports breakfast/lunch/dinner slot assignment.
- [x] Grocery list generation from planned meals implemented and persisted.

## Not Complete

### Environment and Deployment Setup
- [ ] Populate local `.env` with valid Supabase URL, anon key, and auth redirect URL.
- [ ] Execute `schema.sql` in Supabase SQL Editor for the active project environment.
- [ ] Set Supabase function secret `GEMINI_API_KEY`.
- [ ] Deploy Edge Function: `supabase functions deploy analyze-meal`.

### Google Auth Activation in Supabase Console
- [ ] Enable Google provider in Supabase Authentication settings.
- [ ] Add Google OAuth Client ID and Client Secret in Supabase.
- [ ] Configure exact allowed redirect URLs for local and production environments.

### Data Completeness
- [ ] Expand and validate meal library seed data for cuisines, dishes, snacks, beverages, and desserts.
- [ ] Verify that all records include structured nutrition/swap fields required by UI filters and planners.

### Verification and Quality Gates
- [ ] Run production build validation.
- [ ] Validate end-to-end login flow (Google sign-in, redirect, session restore).
- [ ] Validate upload -> analysis -> save -> dashboard history flow.
- [ ] Validate planner persistence and grocery regeneration across refresh/navigation.

## Execution Sequence (Recommended)
1. Configure Supabase project and Google OAuth provider.
2. Apply database schema and storage policies.
3. Configure secrets and deploy Edge Function.
4. Populate meal library data at sufficient breadth/quality.
5. Run end-to-end validation checklist.

## Definition of Done
- Google login works in local and production with no redirect mismatch errors.
- AI analysis requests complete successfully and create rows in `meal_analyses`.
- Authenticated users can create/update profile, plan meals, and generate grocery lists.
- Meal library has broad, culturally relevant coverage with stable filtering and display.
