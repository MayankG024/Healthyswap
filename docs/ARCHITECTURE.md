<![CDATA[# System Architecture

## High-Level Overview

HealthySwap is a full-stack AI-powered nutrition platform built on a modern React + Supabase architecture. The system processes meal inputs (text or image), runs them through a Gemini 2.5 Pro AI pipeline via a Supabase Edge Function, validates and persists the results, and presents side-by-side nutritional comparisons to the user.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                             │
│                                                                     │
│  React 18 + TypeScript + Vite + Tailwind CSS 4                     │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────┐                │
│  │  Zustand  │  │ React Router │  │  Framer Motion │                │
│  │  (Store)  │  │  (Pages)     │  │  (Animations)  │                │
│  └────┬─────┘  └──────┬───────┘  └────────────────┘                │
│       │               │                                             │
│       ▼               ▼                                             │
│  ┌──────────────────────────────────────────────────┐               │
│  │              Supabase Client SDK                  │               │
│  │  (Auth · Realtime · Database · Storage · Functions)│              │
│  └──────────────────────┬───────────────────────────┘               │
└──────────────────────────┼──────────────────────────────────────────┘
                           │ HTTPS
┌──────────────────────────┼──────────────────────────────────────────┐
│                    SUPABASE PLATFORM                                 │
│                                                                     │
│  ┌──────────────────┐  ┌─────────────────────┐  ┌──────────────┐   │
│  │   Auth (GoTrue)  │  │  Edge Functions     │  │   Storage    │   │
│  │   Google OAuth   │  │  (Deno Runtime)     │  │  meal-images │   │
│  └──────────────────┘  │                     │  └──────────────┘   │
│                        │  analyze-meal:      │                      │
│                        │  ┌────────────────┐ │                      │
│                        │  │ Auth Check     │ │                      │
│                        │  │      ↓         │ │                      │
│                        │  │ Image Fetch +  │ │  ┌───────────────┐  │
│                        │  │ Base64 Convert │─┤──│ Gemini 2.5 Pro│  │
│                        │  │      ↓         │ │  │   (Google AI) │  │
│                        │  │ Parse + Validate│ │  └───────────────┘  │
│                        │  │      ↓         │ │                      │
│                        │  │ Persist to DB  │ │                      │
│                        │  └────────────────┘ │                      │
│                        └─────────┬───────────┘                      │
│                                  │                                   │
│  ┌───────────────────────────────▼───────────────────────────────┐  │
│  │                    PostgreSQL Database                         │  │
│  │                                                               │  │
│  │  profiles ← 1:1 → auth.users                                 │  │
│  │  meal_analyses ← user_id FK → auth.users                     │  │
│  │  meal_library (public, read-only)                             │  │
│  │  meal_plans ← 1:many → meal_plan_items ← FK → meal_library   │  │
│  │  grocery_lists ← FK → meal_plans                              │  │
│  │                                                               │  │
│  │  All tables: Row Level Security enabled                       │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

### 1. State Management: Zustand Over Redux

| Aspect | Decision |
|---|---|
| **Choice** | Zustand 5 (1KB gzipped) |
| **Rationale** | Only 5 global states needed (user, session, isAnalyzing, analysisResult, selectedMeal). Redux's boilerplate and middleware are unnecessary for this scale. |
| **Trade-off** | No time-travel debugging, no Redux DevTools — acceptable for this application's complexity. |
| **Pattern** | Global auth/analysis state in Zustand; component-local UI state via `useState`. |

```typescript
// Flat, typed, minimal re-renders
interface AppState {
  isAnalyzing: boolean;
  analysisResult: MealAnalysis | null;
  selectedMeal: string;
  user: User | null;
  session: Session | null;
}
```

### 2. AI Pipeline: Supabase Edge Function + Gemini

| Aspect | Decision |
|---|---|
| **Choice** | Supabase Edge Function (Deno) calling Gemini 2.5 Pro |
| **Rationale** | Server-side execution keeps the API key secure. Edge Functions run close to users (Deno Deploy's global network). No need to maintain a separate backend server. |
| **Trade-off** | Cold start latency on first request (~1-2s). Acceptable because analysis is inherently asynchronous. |
| **Safety** | Structured JSON prompt → parse markdown fences → validate every field → reject malformed payloads → persist only clean data. |

### 3. Deterministic Rules Engine: Fallback + Transparency

| Aspect | Decision |
|---|---|
| **Choice** | Client-side deterministic rules in `mealAnalyzer.ts` |
| **Rationale** | Provides instant, predictable results for known meals without network calls. Based on WHO/NIH/ICMR standards, not arbitrary values. Serves as fallback when AI is unavailable. |
| **Trade-off** | No personalization (same input → same output). This is a feature, not a bug — transparency in health advice is critical. |

### 4. Database: Supabase PostgreSQL with RLS

| Aspect | Decision |
|---|---|
| **Choice** | Supabase-managed PostgreSQL with Row Level Security |
| **Rationale** | RLS policies enforce data isolation at the database level — even if application code has bugs, users cannot access each other's data. The `meal_library` table is intentionally public-read. |
| **Trade-off** | RLS policies add complexity to queries. Acceptable for the security guarantees they provide. |

### 5. Component Architecture: Lazy Loading + Container/Presenter

| Aspect | Decision |
|---|---|
| **Choice** | `React.lazy()` for all page components; container/presenter split |
| **Rationale** | Lazy loading reduces initial bundle size (~150KB gzipped). Each route is a separate chunk loaded on demand. Container components own logic; presenters are pure UI. |
| **Trade-off** | Brief loading flash on first navigation. Mitigated with a Suspense fallback component. |

### 6. Styling: Tailwind CSS 4 + CSS Custom Properties

| Aspect | Decision |
|---|---|
| **Choice** | Tailwind CSS 4 (via `@tailwindcss/vite`) + custom theme in `theme.css` |
| **Rationale** | Tailwind 4's CSS-first config eliminates `tailwind.config.js`. Design tokens (colors, fonts, radii) defined as CSS custom properties enable runtime theming and dark mode support. |
| **Trade-off** | Requires team familiarity with utility-first CSS. Mitigated by strict guidelines in `.cursorrules`. |

### 7. ORM: Prisma 7 with `@prisma/adapter-pg`

| Aspect | Decision |
|---|---|
| **Choice** | Prisma 7 for schema management and seeding; Supabase client SDK for runtime queries |
| **Rationale** | Prisma provides type-safe schema definitions, migration tracking, and a seed script for the 74+ meal library. Runtime queries use the Supabase client for RLS-aware access. |
| **Trade-off** | Two database access patterns (Prisma for admin/seed, Supabase client for app). Acceptable because they serve different purposes. |

---

## Data Flow

### AI Analysis Pipeline

```
User Input (text/image)
     │
     ▼
  UploadCard.tsx ──────────────────────── Frontend validation
     │
     ▼
  supabase.functions.invoke('analyze-meal', { imageUrl, mealName })
     │
     ▼ ─── Auth check (JWT from session) ─── 401 if unauthorized
     │
     ▼
  Edge Function: analyze-meal/index.ts
     │
     ├── Image URL? → fetchImagePart() → base64 conversion
     │
     ▼
  Gemini 2.5 Pro API (generateContent)
     │
     ▼
  parseGeminiJson() → strip markdown fences → JSON.parse
     │
     ▼
  validateAnalysisPayload() → type-check every field → throw on invalid
     │
     ▼
  supabase.from('meal_analyses').insert() → persist to PostgreSQL
     │
     ▼
  Return validated result → Frontend renders ComparisonView
```

### Meal Planner Flow

```
User navigates to /meal-planner
     │
     ▼
  Fetch meal_library from Supabase (with fallback to client data)
  Fetch existing meal_plan for current week
     │
     ▼
  Display 7-day × 3-slot grid with assigned meals
     │
     ▼
  User selects meal → assigns to slot → upsert meal_plan_items
     │
     ▼
  Navigate to /grocery-list → buildGroceryItems() aggregates ingredients
     │
     ▼
  Persist grocery_lists to database → render categorized checklist
```

---

## Component Tree

```
ErrorBoundary
└── BrowserRouter
    └── App
        ├── Toaster (Sonner)
        ├── Navbar (auth-aware navigation)
        └── Suspense (lazy loading fallback)
            └── Routes
                ├── / → Home
                │   ├── FoodBackground (animated backdrop)
                │   ├── UploadCard (meal input)
                │   ├── ComparisonView (results)
                │   └── MealShowcase (featured meals)
                ├── /login → Login (Google OAuth)
                ├── /dashboard → Dashboard (analysis history)
                ├── /meal-library → MealLibrary (filterable grid)
                ├── /analysis/:id → AnalysisDetail (deep-dive)
                ├── /nutrition/:id → NutritionBreakdown (charts)
                ├── /meal-planner → MealPlanner (weekly grid)
                ├── /grocery-list → GroceryList (shopping checklist)
                ├── /profile → Profile (user settings)
                └── /personalized → PersonalizedRecommendations
```

---

## Performance Characteristics

| Metric | Value | Strategy |
|---|---|---|
| **Initial Bundle** | ~150KB gzipped | React 45KB + Motion 30KB + Radix 40KB + App 35KB |
| **Route Chunks** | 7 lazy-loaded | `React.lazy()` + Suspense per page |
| **Image Loading** | Progressive | `ImageWithSkeleton` component with skeleton placeholders |
| **Animation** | GPU-accelerated | `opacity` and `transform` only — no layout shifts |
| **Animation Duration** | < 300ms | Respects `prefers-reduced-motion` media query |
| **Tree Shaking** | Automatic | Vite's Rollup-based dead code elimination |
| **Font Loading** | Optimized | Google Fonts with `display=swap` strategy |

---

## Error Handling Strategy

### Client-Side
- **Global Error Boundary** — Catches unhandled React errors, displays user-friendly fallback with reload button
- **Toast Notifications** — Sonner toasts for async operation feedback (loading → success/error)
- **Suspense Fallback** — Loading indicator for lazy-loaded routes

### Edge Function
- **Auth Guard** — Returns 401 for unauthenticated requests
- **Input Validation** — Validates JSON body before processing
- **Gemini Error Handling** — Returns 502 with details for Gemini API failures
- **Response Validation** — `validateAnalysisPayload()` throws on malformed AI output
- **Database Error** — Propagates Supabase insert errors to client

### Database
- **RLS Policies** — Database-level access control; users can only CRUD their own data
- **Foreign Key Constraints** — Cascading deletes prevent orphaned records
- **Unique Constraints** — Prevent duplicate meal plan entries per slot/week

---

## Security Model

| Layer | Protection |
|---|---|
| **Authentication** | Google OAuth 2.0 via Supabase GoTrue |
| **Authorization** | Row Level Security on all tables; `auth.uid()` checks |
| **API Keys** | Supabase anon key (client-safe); Gemini key stored as Edge Function secret |
| **CORS** | Edge Function allows `*` origin with specific headers |
| **Storage** | `meal-images` bucket: public read, authenticated write |
| **Input Validation** | Structured JSON validation for all AI responses before persistence |

---

## Scalability Considerations

### Current Architecture Supports
- Thousands of concurrent users (Supabase managed infrastructure)
- 74+ meals in library (expandable via Prisma seed)
- Per-user analysis history, meal plans, and grocery lists

### For Higher Scale
| Area | Upgrade Path |
|---|---|
| **State Complexity** | Migrate to Redux Toolkit or TanStack Query for cache management |
| **API Optimization** | Add React Query for request deduplication and stale-while-revalidate |
| **Rendering** | Virtualized lists (TanStack Virtual) for large meal libraries |
| **Caching** | Service worker for offline meal library access |
| **CDN** | Image optimization via CDN (Cloudinary/imgix) |
| **Monitoring** | Sentry (error tracking), PostHog (analytics), Web Vitals reporting |
| **Testing** | Vitest (unit), Testing Library (integration), Playwright (E2E) |

---

## Dependencies Summary

| Category | Key Packages | Justification |
|---|---|---|
| **Core** | React 18, TypeScript 5, Vite 6 | Industry standard, mature, excellent DX |
| **Styling** | Tailwind CSS 4, tw-animate-css | Utility-first, zero-runtime, built-in dark mode |
| **UI Primitives** | Radix UI (48 components) | Accessible, unstyled, composable |
| **State** | Zustand 5 | 1KB, TypeScript-first, minimal boilerplate |
| **Animation** | Motion 12 (Framer) | Declarative, performant, respects reduced motion |
| **Backend** | Supabase JS 2.104, Prisma 7 | Managed Postgres + Auth + Functions + Storage |
| **AI** | Gemini 2.5 Pro (via REST) | Multimodal analysis, high accuracy, good cost/performance |
| **Charts** | Recharts 2.15 | React-native charts, declarative, responsive |
| **Notifications** | Sonner 2.0 | Beautiful, accessible toast notifications |
| **Icons** | Lucide React 0.487 | Tree-shakeable, consistent icon set |
| **Dates** | date-fns 3.6 | Modular, immutable date utilities |
]]>
