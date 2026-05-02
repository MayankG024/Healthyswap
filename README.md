<![CDATA[<div align="center">

# 🥗 HealthySwap

### AI-Powered Meal Transformation Platform

> Analyze any meal — from butter chicken to burgers — get a healthier version with specific ingredient swaps, cooking method upgrades, and side-by-side nutritional comparisons. Powered by Gemini 2.5 Pro and built on a real full-stack architecture.

[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Pro-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[Live App](https://healthyswap-lime.vercel.app/)** · **[Repository](https://github.com/MayankG024/Healthyswap)** · **[Architecture](ARCHITECTURE.md)** · **[API Reference](API_REFERENCE.md)**

</div>

---

## 🧠 Project Ideology

Most nutrition tools either lock useful features behind subscriptions, ignore regional cuisines entirely, or give you vague advice like "eat less, move more." HealthySwap was built with a different philosophy:

- **Cuisine-Aware** — Heavy coverage of Indian food (North Indian, South Indian), plus Japanese, Mexican, Chinese, Mediterranean, Thai, Korean, French, Middle Eastern, and American cuisines. Not just another calorie counter built for Western diets.
- **Evidence-Based** — All deterministic nutrition rules are derived from WHO, NIH (National Institutes of Health), and ICMR (Indian Council of Medical Research) guidelines. Not arbitrary adjustments — actual nutritional science.
- **Free & Instant** — No subscription walls. Upload a photo or type a meal name, get a full analysis in seconds.
- **Actionable, Not Preachy** — Every recommendation includes a concrete swap (e.g., "heavy cream → Greek yogurt = 60% less fat + probiotics"), a cooking method change, and a portion tip.

---

## ✨ Hero Features — What Makes This Different

| Feature | Description |
|---|---|
| **🤖 AI-Powered Analysis** | Gemini 2.5 Pro analyzes meals from photos or text input. The AI identifies the dish, estimates nutrition, and generates a culturally-relevant healthier alternative — all through a Supabase Edge Function with structured validation. |
| **🔄 Smart Ingredient Swaps** | Not generic advice. Each meal gets specific, practical ingredient replacements with quantified benefits (e.g., "Refined flour naan → Whole wheat roti = 2× fiber, slower digestion"). |
| **📊 Side-by-Side Comparison** | Visual before/after comparison of calories, protein, fat, fiber, sugar, and carbs with percentage change indicators and animated progress bars. |
| **📚 74+ Meal Library** | Pre-analyzed meals across 13 cuisines and 4 food types (Dishes, Snacks, Beverages, Desserts). Filterable by cuisine, food type, and health tags. Served from Supabase PostgreSQL with client-side fallback. |
| **📅 Weekly Meal Planner** | Drag-and-drop meal planning for breakfast/lunch/dinner across a full week. Plans persist in the database per user per week. |
| **🛒 Auto Grocery Lists** | Generates categorized shopping lists (Produce, Protein, Grains, Dairy, Spices) from your planned meals. Persisted and checkable. |
| **👤 User Profiles** | Google OAuth login, profile management (age, height, weight, activity level, dietary preferences, allergies, goals). |
| **📈 Analysis History** | Every AI analysis is saved to the user's dashboard with full nutrition breakdown, swaps, and cooking tips — accessible anytime. |
| **🧮 Deterministic Rules Engine** | A fallback rule engine ensures consistent, science-backed recommendations even without AI — see [Nutrition Rules](#-deterministic-nutrition-rules). |

---

## 🧮 Deterministic Nutrition Rules

The core rule engine applies evidence-based thresholds to flag nutritional issues and compute improvement targets. These rules are **immutable by convention** — they must not be changed without explicit review.

| Nutrient | Threshold | Action Applied | Source |
|---|---|---|---|
| Calories | > 800 kcal | 35% reduction | WHO daily intake guidelines |
| Protein | < 20g | Boost to 30g minimum | NIH protein adequacy |
| Fat | > 25g | 50% reduction | ICMR fat intake limits |
| Fiber | < 5g | Increase to 8g+ | WHO fiber recommendations |
| Sugar | > 12g | 50% reduction | WHO free sugar limits |
| Carbs | > 70g | 35% reduction | ICMR refined carb guidance |

When a meal hits multiple thresholds, all applicable rules fire simultaneously. The engine also generates contextual swap recommendations based on the flagged categories.

---

## 📚 Meal Library Coverage

The platform ships with **74+ pre-analyzed meals** seeded via Prisma ORM into Supabase PostgreSQL:

### By Cuisine (13 cuisines)
- **Indian**: North Indian (Butter Chicken, Paneer Masala, Chole Bhature, Biryani), South Indian (Masala Dosa)
- **International**: Chinese, Japanese, Italian, Mexican, Mediterranean, Thai, Korean, French, Middle Eastern, American

### By Food Type (4 categories)
- **Dishes** (main meals), **Snacks** (samosas, momos, spring rolls), **Beverages** (lassi, chai, smoothies), **Desserts** (kheer, parfait, mousse)

### By Health Tags (5 filters)
- High Protein · Weight Loss · Diabetic Friendly · Heart Healthy · Low Carb

Each library entry includes: original nutrition, improved nutrition, ingredient swaps, cooking method changes, portion tips, cuisine/type metadata, and health tags.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | Component library with hooks and Suspense for lazy-loaded routes |
| TypeScript | 5 | Strict typing across the entire codebase — no `any` |
| Vite | 6.3 | Build tooling with HMR, tree-shaking, and automatic code splitting |
| Tailwind CSS | 4.1 | Utility-first styling via `@tailwindcss/vite` plugin |
| Motion (Framer) | 12.23 | Micro-animations (< 300ms, opacity/transform only, respects `prefers-reduced-motion`) |
| React Router DOM | 7.14 | Client-side routing with lazy-loaded pages |
| Zustand | 5.0 | Lightweight global state (auth, analysis result, UI state) |
| Radix UI | Various | 48 accessible, unstyled UI primitives (accordion, dialog, tabs, etc.) |
| Recharts | 2.15 | Data visualization for nutrition comparisons |
| Sonner | 2.0 | Toast notification system |
| Lucide React | 0.487 | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Supabase (PostgreSQL) | Primary database with Row Level Security for all user data |
| Supabase Auth | Google OAuth 2.0 provider for authentication |
| Supabase Edge Functions | Serverless Deno runtime for the `analyze-meal` AI pipeline |
| Supabase Storage | `meal-images` bucket for user-uploaded meal photos |
| Prisma ORM (v7) | Schema management, seeding, and type-safe database operations (via `@prisma/adapter-pg`) |

### AI & Analysis
| Technology | Purpose |
|---|---|
| Gemini 2.5 Pro | Multimodal meal analysis (text + image) via `generativelanguage.googleapis.com` |
| Custom Validation Layer | `analysisValidation.ts` — parses, validates, and normalizes all Gemini responses before database insertion |
| Deterministic Rules Engine | `mealAnalyzer.ts` — fallback analysis using WHO/NIH/ICMR thresholds for offline/instant analysis |

### DevOps & Tooling
| Technology | Purpose |
|---|---|
| Vercel | Production hosting with SPA rewrites (`vercel.json`) |
| GitHub Actions | CI/CD pipeline — auto-builds and deploys on push to `main` |
| Node.js Test Runner | Unit tests for validation and meal planning logic |
| PostCSS | CSS processing pipeline (extensible via `postcss.config.mjs`) |

---

## 🏗️ Project Structure

```
healthyswap/
├── .github/workflows/
│   └── deploy.yml              # CI/CD: build → deploy on push to main
├── prisma/
│   ├── schema.prisma           # Database schema (6 models)
│   ├── seed.ts                 # Seeds 74+ meals into meal_library
│   ├── new_meals.ts            # Batch 1 of expanded meal data
│   ├── new_meals_2.ts          # Batch 2
│   └── new_meals_3.ts          # Batch 3
├── public/
│   └── 404.html                # SPA fallback for direct URL access
├── src/
│   ├── main.tsx                # App bootstrap (ErrorBoundary → BrowserRouter → App)
│   ├── styles/
│   │   ├── index.css           # CSS entry point
│   │   ├── tailwind.css        # Tailwind imports
│   │   ├── theme.css           # Design tokens, typography, dark mode
│   │   └── fonts.css           # Custom font imports
│   └── app/
│       ├── App.tsx             # Route definitions + auth session sync
│       ├── components/
│       │   ├── Navbar.tsx              # Global navigation bar
│       │   ├── Footer.tsx              # Site footer
│       │   ├── UploadCard.tsx          # Meal input (text + image upload)
│       │   ├── ComparisonView.tsx      # Side-by-side nutrition comparison
│       │   ├── MealLibrary.tsx         # Filterable meal browser (Supabase + fallback)
│       │   ├── MealShowcase.tsx        # Featured meals carousel
│       │   ├── NutritionBreakdown.tsx  # Detailed nutrition visualization
│       │   ├── PersonalizedRecommendations.tsx  # Diet-specific suggestions
│       │   ├── AnalyzingAnimation.tsx  # Loading state animation
│       │   ├── FoodBackground.tsx      # Animated background elements
│       │   ├── ImageWithSkeleton.tsx   # Progressive image loading
│       │   ├── ErrorBoundary.tsx       # Global error boundary
│       │   ├── figma/                  # Figma-exported components
│       │   └── ui/                     # 48 Radix UI component wrappers
│       ├── pages/
│       │   ├── Home.tsx          # Landing page with upload + showcase
│       │   ├── Login.tsx         # Google OAuth login
│       │   ├── Dashboard.tsx     # Analysis history + quick actions
│       │   ├── MealPlanner.tsx   # Weekly drag-and-drop planner
│       │   ├── GroceryList.tsx   # Auto-generated shopping list
│       │   ├── Profile.tsx       # User profile management
│       │   └── AnalysisDetail.tsx  # Individual analysis deep-dive
│       ├── store/
│       │   └── useAppStore.ts    # Zustand global store
│       ├── data/
│       │   └── mealLibrary.ts    # Client-side fallback meal data
│       └── utils/
│           ├── mealAnalyzer.ts   # Deterministic rules engine + meal database
│           ├── mealPlanning.ts   # Planner utilities + grocery list builder
│           └── supabase.ts       # Supabase client initialization
├── supabase/
│   └── functions/
│       └── analyze-meal/
│           ├── index.ts              # Edge Function: auth → Gemini → validate → persist
│           └── analysisValidation.ts # JSON parsing + schema validation
├── tests/
│   ├── analysisValidation.test.ts  # Validation logic unit tests
│   └── mealPlanning.test.ts        # Planner and grocery builder tests
├── schema.sql                  # Full database schema with RLS policies
├── seed_meal_library.sql       # SQL seed data alternative
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite + React + Tailwind plugin config
├── vercel.json                 # Vercel SPA rewrite rules
├── prisma.config.ts            # Prisma 7 connection config
├── .cursorrules                # AI agent development guidelines
├── ARCHITECTURE.md             # System architecture deep-dive
├── API_REFERENCE.md            # Edge Function and database API docs
├── CONTRIBUTING.md             # Contribution guidelines
├── DEPLOYMENT.md               # Production deployment playbook
└── DATABASE.md                 # Database schema and RLS documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier works)
- A [Google Cloud](https://console.cloud.google.com) OAuth client (for auth)
- A [Gemini API](https://aistudio.google.com/apikey) key (for AI analysis)

### 1. Clone & Install

```bash
git clone https://github.com/MayankG024/Healthyswap.git
cd Healthyswap
npm install
```

### 2. Configure Environment

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill in your values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_AUTH_REDIRECT_URL=http://localhost:5173/dashboard
DIRECT_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```

### 3. Database Setup

Run the schema in Supabase SQL Editor:

```bash
# Option A: Use the SQL file directly in Supabase Dashboard → SQL Editor
# Copy and run the contents of schema.sql

# Option B: Use Prisma (requires DIRECT_URL in .env)
npx prisma db push
npx prisma db seed
```

This creates:
- `profiles` — User health profiles
- `meal_analyses` — AI analysis history
- `meal_library` — 74+ pre-analyzed meals
- `meal_plans` — Weekly meal plans
- `meal_plan_items` — Individual meal slot assignments
- `grocery_lists` — Auto-generated shopping lists
- `meal-images` storage bucket
- Row Level Security policies for all tables

### 4. Google OAuth Setup

1. Go to Supabase Dashboard → Authentication → Providers → Google
2. Enable Google and add your OAuth Client ID and Client Secret
3. In Google Cloud Console, add the callback URL: `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. In Supabase → Authentication → URL Configuration, add your redirect URLs

### 5. Deploy the Edge Function

```bash
# Install Supabase CLI if needed
npm i -g supabase

# Set your Gemini API key as a secret
supabase secrets set GEMINI_API_KEY=your_gemini_api_key --project-ref your-project-ref

# Deploy the analyze-meal function
supabase functions deploy analyze-meal --project-ref your-project-ref
```

### 6. Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🧪 Testing

```bash
npm test
```

Runs unit tests using Node.js built-in test runner:

- **`analysisValidation.test.ts`** — Tests Gemini JSON parsing, payload validation, and error handling for malformed AI responses
- **`mealPlanning.test.ts`** — Tests week calculation, slot key generation, Supabase row normalization, and grocery list aggregation

---

## 📱 Sample Transformations

| Original Meal | Healthier Version | Calorie Reduction |
|---|---|---|
| Butter Chicken with Naan | Grilled Tandoori Chicken with Roti | **-41%** |
| Chicken Biryani | Brown Rice Chicken Biryani | **-39%** |
| Fried Samosas (3 pcs) | Baked Whole Wheat Samosas | **-47%** |
| Paneer Butter Masala | Paneer Tikka with Whole Wheat Roti | **-41%** |
| Chole Bhature | Chole with Whole Wheat Kulcha | **-49%** |
| Masala Dosa with Butter | Oats and Ragi Dosa | **-39%** |
| Burger with Fries | Grilled Chicken Burger with Sweet Potato | **-50%** |
| Pizza Margherita | Thin Crust Veggie Pizza | **-38%** |
| Instant Noodles | Vegetable Noodle Bowl | **-16%** |
| Fried Rice | Cauliflower Fried "Rice" | **-54%** |

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| **Primary Orange** | `#FFB347` | CTAs, energy, brand identity |
| **Health Green** | `#6BCF7F` | Success states, health scores, improvement indicators |
| **Positivity Yellow** | `#FFD93D` | Highlights, badges, accent elements |
| **Heading Font** | Bebas Neue | Bold, high-impact headings |
| **Body Font** | Fredoka | Friendly, approachable body text |
| **Accent Font** | Righteous | Sub-headings, accent labels |
| **Corner Radius** | `0.625rem` | Consistent rounded corners |
| **Animation Duration** | < 300ms | Fast micro-interactions (opacity + transform only) |

The design system supports both light and dark modes via CSS custom properties in `theme.css`, with vibrant food-themed accent colors (lime, coral, grape, sky blue) for visual richness.

---

## 📖 Documentation Index

| Document | Description |
|---|---|
| **[README.md](README.md)** | Project overview, setup, and quick start |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System architecture, design decisions, data flow, and component hierarchy |
| **[DATABASE.md](DATABASE.md)** | Database schema, table relationships, RLS policies, and seeding guide |
| **[API_REFERENCE.md](API_REFERENCE.md)** | Edge Function API, Gemini integration, validation contracts |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Production deployment playbook for Vercel, Supabase, and CI/CD |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Code standards, PR workflow, and development guidelines |
| **[ATTRIBUTIONS.md](ATTRIBUTIONS.md)** | Third-party licenses and credits |
| **[implementation_plan.md](implementation_plan.md)** | Feature completion tracking and execution roadmap |

---

## 📄 Credits & Attributions

- Design inspired by this [Figma template](https://www.figma.com/design/PHhCHllqWVpLwYXkEMP5o5/Healthy-Meal-Transformation-Website) (heavily customized)
- UI primitives from [shadcn/ui](https://ui.shadcn.com/) (MIT License)
- Meal images from [Unsplash](https://unsplash.com) (Unsplash License)
- Nutrition guidelines from WHO, NIH, and ICMR publications

---

## 🤝 Contributing

Found a bug? Have a cuisine you want represented? See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full guide. PRs and issues are welcome.

---

<div align="center">

**Built with ❤️ by [Mayank](https://github.com/MayankG024)**

</div>
]]>
