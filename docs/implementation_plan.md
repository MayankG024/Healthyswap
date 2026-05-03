<![CDATA[# HealthySwap — Implementation Plan

HealthySwap is a full-stack AI-powered nutrition transformation platform that analyzes meals from images or text, estimates nutrition, recommends culturally relevant healthier alternatives, stores user progress, and generates personalized meal plans and grocery lists across cuisines, dishes, snacks, beverages, and desserts.

---

## Architecture Baseline

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 6 + TypeScript 5 + Tailwind CSS 4 |
| Backend | Supabase (Auth, PostgreSQL, Storage, Edge Functions) |
| AI Analysis | Gemini 2.5 Pro via Supabase Edge Function (`analyze-meal`) |
| ORM / Seeding | Prisma 7 with `@prisma/adapter-pg` |
| Deployment | Vercel (primary), GitHub Pages (secondary via Actions) |

---

## ✅ Completed

### Core Full-Stack Foundation
- [x] Supabase client setup using environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- [x] App-wide auth session sync in global Zustand store (`user`, `session`)
- [x] SQL schema created for `profiles`, `meal_analyses`, `meal_library`, `meal_plans`, `meal_plan_items`, `grocery_lists`
- [x] Row Level Security policies for all user-scoped tables
- [x] `meal-images` storage bucket with public-read, auth-write policies
- [x] Prisma ORM schema with model mappings and foreign key relationships

### Authentication
- [x] Google OAuth login flow via `supabase.auth.signInWithOAuth`
- [x] Logout flow and auth-state-driven UI/navigation
- [x] Auth session listener with automatic state sync (`onAuthStateChange`)

### AI Meal Analysis Pipeline
- [x] Supabase Edge Function `analyze-meal` implemented (Deno runtime)
- [x] Image URL fetch + base64 conversion for multimodal Gemini requests
- [x] Structured JSON prompt engineering for consistent AI output
- [x] Two-stage response validation (`parseGeminiJson` + `validateAnalysisPayload`)
- [x] Validated analyses persisted to `meal_analyses` table
- [x] Error handling for auth failures, Gemini errors, and validation failures

### Meal Library
- [x] 74+ pre-analyzed meals across 13 cuisines and 4 food types
- [x] Prisma seed script with 3 batch files for meal data
- [x] Client-side fallback data (24 meals) when Supabase is unavailable
- [x] Filterable by cuisine, food type, and health tags
- [x] Pollinations.ai-generated images for all library entries

### Product Features
- [x] **Home**: Meal upload (text/image) with real-time analysis
- [x] **Dashboard**: Persisted analysis history with detail view
- [x] **Meal Library**: Searchable, filterable meal browser
- [x] **Meal Planner**: 7-day × 3-slot weekly planner with Supabase persistence
- [x] **Grocery List**: Auto-generated categorized shopping list from planned meals
- [x] **Profile**: User health profile (age, height, weight, activity, goals, diet, allergies)
- [x] **Nutrition Breakdown**: Detailed visualization with Recharts
- [x] **Personalized Recommendations**: Diet-specific suggestions

### Frontend Architecture
- [x] React Router DOM with 10 lazy-loaded routes
- [x] Zustand global store for auth + analysis state
- [x] Framer Motion animations (< 300ms, GPU-accelerated)
- [x] 48 Radix UI component wrappers (shadcn/ui pattern)
- [x] Custom design system with CSS custom properties (light/dark mode)
- [x] Error boundary with fallback UI
- [x] Progressive image loading with skeleton placeholders

### Code Quality
- [x] Strict TypeScript (no `any` policy)
- [x] Unit tests for validation and planning logic
- [x] AI agent guidelines (`.cursorrules`)
- [x] Comprehensive documentation (README, ARCHITECTURE, DATABASE, API_REFERENCE, DEPLOYMENT, CONTRIBUTING)

### Deployment
- [x] Vercel deployment with SPA rewrites
- [x] GitHub Actions CI/CD pipeline
- [x] Environment variable configuration for local + production

---

## 🔲 Remaining Work

### Environment & Infrastructure
- [ ] Populate local `.env` with valid credentials for all environments
- [ ] Execute `schema.sql` on the active Supabase project
- [ ] Set `GEMINI_API_KEY` as a Supabase Edge Function secret
- [ ] Deploy Edge Function: `supabase functions deploy analyze-meal`

### Google Auth Activation
- [ ] Enable Google provider in Supabase Authentication settings
- [ ] Configure OAuth Client ID and Secret
- [ ] Configure exact redirect URLs for local and production

### Image Upload Pipeline
- [ ] Implement direct image upload to Supabase Storage (`meal-images` bucket)
- [ ] Pass storage URL (not client blob) to Edge Function for analysis
- [ ] Add image compression/resize before upload

### Verification & Quality Gates
- [ ] Validate production build (`npm run build`) completes without errors
- [ ] Validate end-to-end login flow (Google sign-in → redirect → session restore)
- [ ] Validate upload → analysis → save → dashboard history flow
- [ ] Validate planner persistence and grocery regeneration across refresh/navigation
- [ ] Add integration tests for Supabase queries
- [ ] Add E2E tests with Playwright

### Future Enhancements
- [ ] Personalized calorie targets based on user profile (BMR calculation)
- [ ] Social sharing of meal transformations
- [ ] PWA support for offline meal library access
- [ ] Push notifications for meal plan reminders
- [ ] Admin dashboard for managing the meal library
- [ ] Multi-language support (Hindi, Spanish)

---

## Execution Sequence (Recommended)

1. Configure Supabase project and Google OAuth provider
2. Apply database schema and storage policies
3. Configure secrets and deploy Edge Function
4. Seed meal library data (74+ meals via Prisma)
5. Run end-to-end validation checklist
6. Implement image upload pipeline
7. Add integration and E2E tests

---

## Definition of Done

- Google login works in local and production with no redirect mismatch errors
- AI analysis requests complete successfully and create rows in `meal_analyses`
- Authenticated users can create/update profile, plan meals, and generate grocery lists
- Meal library has broad, culturally relevant coverage with stable filtering and display
- All tests pass and production build succeeds
- Documentation is comprehensive and up-to-date
]]>
