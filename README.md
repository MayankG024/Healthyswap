# 🥗 HealthySwap — AI-Powered Meal Transformation Platform

> Analyze any meal — from butter chicken to burgers — and get a healthier version with specific ingredient swaps, cooking method upgrades, and side-by-side nutritional comparisons. Powered by **Gemini 2.5 Pro** on a real full-stack architecture.

[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Pro-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**[🌐 Live App](https://healthyswap-lime.vercel.app/)** · **[📦 Repository](https://github.com/MayankG024/Healthyswap)** · **[🏗 Architecture](ARCHITECTURE.md)** · **[📡 API Reference](API_REFERENCE.md)**

---

## Table of Contents

- [Project Ideology](#-project-ideology)
- [Hero Features](#-hero-features)
- [Nutrition Rules Engine](#-nutrition-rules-engine)
- [Meal Library](#-meal-library)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Design System](#-design-system)
- [Documentation](#-documentation)
- [Credits](#-credits)

---

## 🧠 Project Ideology

Most nutrition tools either lock features behind subscriptions, ignore regional cuisines entirely, or give vague advice like "eat less, move more." HealthySwap was built differently:

- **Cuisine-Aware** — Deep coverage of Indian food (North & South Indian), plus Japanese, Mexican, Chinese, Mediterranean, Thai, Korean, French, Middle Eastern, and American cuisines.
- **Evidence-Based** — All nutrition rules derived from WHO, NIH, and ICMR guidelines. Actual nutritional science, not arbitrary numbers.
- **Free & Instant** — No subscriptions. Upload a photo or type a meal name, get a full analysis in seconds.
- **Actionable, Not Preachy** — Every recommendation includes a concrete swap (e.g., *"heavy cream → Greek yogurt = 60% less fat + probiotics"*), a cooking method change, and a portion tip.

---

## ✨ Hero Features

| Feature | What It Does |
|---|---|
| **🤖 AI-Powered Analysis** | Gemini 2.5 Pro analyzes meals from photos or text. Identifies the dish, estimates nutrition, and generates a culturally-relevant healthier alternative via a Supabase Edge Function with structured validation. |
| **🔄 Smart Ingredient Swaps** | Specific, practical replacements with quantified benefits — e.g., *"Refined flour naan → Whole wheat roti = 2× fiber, slower digestion"*. |
| **📊 Side-by-Side Comparison** | Visual before/after comparison of calories, protein, fat, fiber, sugar, and carbs with animated percentage-change indicators. |
| **📚 74+ Meal Library** | Pre-analyzed meals across 13 cuisines and 4 food types (Dishes, Snacks, Beverages, Desserts). Filterable by cuisine, food type, and health tags. |
| **📅 Weekly Meal Planner** | Assign meals to breakfast/lunch/dinner slots across a full week. Plans persist per user per week in the database. |
| **🛒 Auto Grocery Lists** | Categorized shopping lists (Produce, Protein, Grains, Dairy, Spices) auto-generated from your planned meals. |
| **👤 User Profiles** | Google OAuth login with profile management — age, weight, activity level, dietary preferences, allergies, and goals. |
| **📈 Analysis History** | Every AI analysis is saved to the user's dashboard with the full breakdown accessible anytime. |

---

## 🧮 Nutrition Rules Engine

The deterministic rule engine applies evidence-based thresholds to flag nutritional issues and compute improvement targets. These thresholds are immutable by convention — see [CONTRIBUTING.md](CONTRIBUTING.md).

| Nutrient | Threshold | Action | Source |
|---|---|---|---|
| Calories | > 800 kcal | 35% reduction | WHO daily intake guidelines |
| Protein | < 20g | Boost to 30g minimum | NIH protein adequacy |
| Fat | > 25g | 50% reduction | ICMR fat intake limits |
| Fiber | < 5g | Increase to 8g+ | WHO fiber recommendations |
| Sugar | > 12g | 50% reduction | WHO free sugar limits |
| Carbs | > 70g | 35% reduction | ICMR refined carb guidance |

---

## 📚 Meal Library

74+ pre-analyzed meals seeded into Supabase PostgreSQL via Prisma ORM.

**13 Cuisines covered:** North Indian · South Indian · Chinese · Japanese · Italian · Mexican · Mediterranean · Thai · Korean · French · Middle Eastern · American · Global

**4 Food Types:** Dishes · Snacks · Beverages · Desserts

**5 Health Tags:** High Protein · Weight Loss · Diabetic Friendly · Heart Healthy · Low Carb

### Sample Transformations

| Original Meal | Healthier Version | Calorie Reduction |
|---|---|---|
| Butter Chicken with Naan | Grilled Tandoori Chicken with Roti | **−41%** |
| Chicken Biryani | Brown Rice Chicken Biryani | **−39%** |
| Fried Samosas (3 pcs) | Baked Whole Wheat Samosas | **−47%** |
| Paneer Butter Masala | Paneer Tikka with Whole Wheat Roti | **−41%** |
| Chole Bhature | Chole with Whole Wheat Kulcha | **−49%** |
| Masala Dosa with Butter | Oats and Ragi Dosa | **−39%** |
| Burger with Fries | Grilled Chicken Burger with Sweet Potato | **−50%** |
| Fried Rice | Cauliflower Fried "Rice" | **−54%** |

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | UI with hooks and Suspense |
| TypeScript | 5 | Strict typing across the codebase |
| Vite | 6.3 | Build tooling with tree-shaking and HMR |
| Tailwind CSS | 4.1 | Utility-first styling |
| Motion (Framer) | 12.23 | Micro-animations — GPU-accelerated, < 300ms |
| React Router DOM | 7.14 | Client-side routing with lazy-loaded pages |
| Zustand | 5.0 | Lightweight global state management |
| Radix UI | Various | 48 accessible UI primitives |
| Recharts | 2.15 | Nutrition data visualization |
| Sonner | 2.0 | Toast notifications |

### Backend & AI

| Technology | Purpose |
|---|---|
| Supabase (PostgreSQL) | Primary database with Row Level Security |
| Supabase Auth | Google OAuth 2.0 authentication |
| Supabase Edge Functions | Serverless Deno runtime for the AI pipeline |
| Supabase Storage | `meal-images` bucket for user-uploaded photos |
| Prisma ORM v7 | Schema management and database seeding |
| Gemini 2.5 Pro | Multimodal meal analysis (text + image) |

### Deployment

| Technology | Purpose |
|---|---|
| Vercel | Production SPA hosting with rewrites |
| GitHub Actions | CI/CD — auto-build and deploy on push to `main` |

---

## 📁 Project Structure

```
healthyswap/
├── .github/workflows/deploy.yml    # CI/CD pipeline
├── prisma/
│   ├── schema.prisma               # 6-model database schema
│   ├── seed.ts                     # Seeds 74+ meals
│   └── new_meals*.ts               # Meal data batches
├── src/
│   ├── main.tsx                    # App entry point
│   ├── styles/theme.css            # Design tokens + dark mode
│   └── app/
│       ├── App.tsx                 # Routes + auth sync
│       ├── components/             # Reusable UI components
│       ├── pages/                  # Lazy-loaded route pages
│       ├── store/useAppStore.ts    # Zustand global store
│       ├── data/mealLibrary.ts     # Client-side fallback data
│       └── utils/
│           ├── mealAnalyzer.ts     # Deterministic rules engine
│           ├── mealPlanning.ts     # Planner + grocery utilities
│           └── supabase.ts         # Supabase client
├── supabase/functions/analyze-meal/
│   ├── index.ts                    # Edge Function handler
│   └── analysisValidation.ts       # AI response validator
├── tests/
│   ├── analysisValidation.test.ts  # Validation unit tests
│   └── mealPlanning.test.ts        # Planning logic tests
├── schema.sql                      # Full DB schema with RLS
├── vercel.json                     # SPA rewrite rules
└── .env.example                    # Environment variable template
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Google Cloud](https://console.cloud.google.com) OAuth client
- A [Gemini API](https://aistudio.google.com/apikey) key

### 1. Clone & Install

```bash
git clone https://github.com/MayankG024/Healthyswap.git
cd Healthyswap
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_AUTH_REDIRECT_URL=http://localhost:5173/dashboard
DIRECT_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```

### 3. Set Up Database

Run `schema.sql` in the Supabase SQL Editor, then seed the meal library:

```bash
npx prisma db seed
```

This creates all tables, enables Row Level Security, and inserts 74+ meals.

### 4. Set Up Google OAuth

1. Enable Google provider in Supabase → Authentication → Providers
2. Add your Google OAuth Client ID and Secret
3. Set the callback URL: `https://<project-ref>.supabase.co/auth/v1/callback`

### 5. Deploy the Edge Function

```bash
supabase secrets set GEMINI_API_KEY=your_gemini_api_key --project-ref <ref>
supabase functions deploy analyze-meal --project-ref <ref>
```

### 6. Run Locally

```bash
npm run dev
```

App runs at `http://localhost:5173`.

---

## 🧪 Testing

```bash
npm test
```

| Test File | Coverage |
|---|---|
| `analysisValidation.test.ts` | Gemini JSON parsing, payload validation, error rejection |
| `mealPlanning.test.ts` | Week calculation, slot keys, row normalization, grocery aggregation |

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Primary Orange | `#FFB347` | CTAs, brand identity |
| Health Green | `#6BCF7F` | Success states, improvement indicators |
| Positivity Yellow | `#FFD93D` | Highlights, badges |
| Heading Font | Bebas Neue | Bold, high-impact headings |
| Body Font | Fredoka | Friendly body text |
| Accent Font | Righteous | Sub-headings, labels |
| Animation | < 300ms | Opacity + transform only |

---

## 📖 Documentation

| Document | Description |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, data flows, component hierarchy, security model |
| [DATABASE.md](DATABASE.md) | Schema, table relationships, RLS policies, seeding guide |
| [API_REFERENCE.md](API_REFERENCE.md) | Edge Function API, Gemini integration, client SDK usage |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Vercel, Supabase, CI/CD, and environment setup |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Code standards, PR workflow, development guidelines |
| [ATTRIBUTIONS.md](ATTRIBUTIONS.md) | Third-party licenses and credits |
| [implementation_plan.md](implementation_plan.md) | Feature completion tracking and roadmap |

---

## 📄 Credits

- Design inspired by this [Figma template](https://www.figma.com/design/PHhCHllqWVpLwYXkEMP5o5/Healthy-Meal-Transformation-Website) (heavily customized)
- UI primitives from [shadcn/ui](https://ui.shadcn.com/) (MIT License)
- Meal images from [Unsplash](https://unsplash.com) and [Pollinations.ai](https://pollinations.ai)
- Nutrition guidelines from WHO, NIH, and ICMR

---

*Built with ❤️ by [Mayank](https://github.com/MayankG024)*
