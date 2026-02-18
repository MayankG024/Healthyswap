# 🥗 Healthy Meal Transformation

> Ever wonder how unhealthy your favorite meal really is? Upload a photo or type it in, and I'll show you a healthier version that actually tastes good.

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan.svg)](https://tailwindcss.com/)

## 🎯 What Is This?

I built this after realizing my daily butter chicken habit was destroying my health goals. Instead of just feeling guilty, I decided to build something that could help me (and hopefully you) make better food choices without sacrificing flavor.

This web app analyzes any meal—from biryani to burgers—and generates a healthier version with specific ingredient swaps, cooking method tweaks, and nutritional comparisons. No BS, just practical advice based on actual nutrition science.

## ✨ What It Does

- **📸 Upload & Analyze** - Drop a meal photo or type the name, get instant nutrition breakdown
- **🔄 Smart Swaps** - Get specific ingredient replacements that keep the taste (e.g., "heavy cream → Greek yogurt = 60% less fat + probiotics")
- **📊 Visual Comparison** - See before/after calories, macros, and health scores side-by-side
- **📚 Meal Library** - Browse 14+ pre-analyzed meals (heavy on Indian food because that's what I eat!)
- **🎯 Actually Useful Advice** - Portion tips and cooking methods that don't require a culinary degree

## 🧮 The Rules (How It Works)

I implemented deterministic nutrition rules so recommendations stay consistent and science-backed:

| Nutrient | Threshold | What Happens |
|----------|-----------|--------------|
| Calories | > 800 kcal | 35% reduction (that's a lot!) |
| Protein | < 20g | Boost to 30g minimum |
| Fat | > 25g | 50% cut (goodbye deep frying) |
| Fiber | < 5g | Increase to 8g+ |
| Sugar | > 12g | 50% reduction |

The algorithm automatically flags issues and generates fixes. No guesswork.

## 🛠️ Tech Stack

**Core:** React 18 + TypeScript + Vite (because fast dev experience matters)

**Styling:** Tailwind CSS + Radix UI components (all the Dialog, Accordion, Dropdown stuff) + Custom fonts (Bebas Neue, Fredoka, Righteous)

**Animation:** Framer Motion for those smooth transitions

**State:** Zustand (lightweight, no boilerplate nonsense)

**Other Cool Stuff:** Sonner (toast notifications), Lucide React (icons), date-fns

## 🚀 Deployment

Deployed on Vercel for that sweet, sweet performance.
check bio for the link.

## 📱 Sample Meals in Database

I've pre-loaded 10+ meals with actual nutritional data:

**Indian Favorites:**

- Butter Chicken → Tandoori Chicken (-41% calories)
- Biryani → Brown Rice Biryani (-39% calories)
- Samosas → Baked Version (-47% calories)
- Paneer Masala → Paneer Tikka (-41% calories)
- Chole Bhature → Lighter Version (-49% calories)
- Masala Dosa → Oats & Ragi Dosa (-39% calories)

**International:**

- Pizza, Burgers, Fried Rice, Instant Noodles (all with healthier versions)

Each includes detailed swaps, cooking tips, and portion advice.

## 🎨 Design Philosophy

Kept it colorful and fun because eating healthy shouldn't feel like a chore:

- **Colors:** Orange (energy), Green (health), Yellow (positivity)
- **Typography:** Big bold headings (Bebas Neue) for impact, friendly body text (Fredoka)
- **Interactions:** Smooth animations, drag-drop uploads, instant feedback

The UI is fully responsive and works great on mobile.

## 🔮 What I'd Add Next

If this project gets traction , here's what's on my mind:

- [ ] TensorFlow.js for actual image recognition (right now it's keyword-based)
- [ ] User accounts to track meal history
- [ ] Connect to real nutrition APIs (USDA, Nutritionix)
- [ ] Generate grocery lists from the swaps
- [ ] Meal planning calendar
- [ ] Dark mode (because everyone wants dark mode)
- [ ] PWA support for offline use

## 🤔 Project Rationale

This project addresses the gap in accessible, cuisine-aware nutrition analysis tools. Many nutrition platforms require subscriptions or lack comprehensive coverage of regional cuisines, particularly Indian food. This solution provides free, instant analysis with a focus on familiar cuisine patterns.

The deterministic nutrition rules are based on established guidelines from WHO (World Health Organization), NIH (National Institutes of Health), and ICMR (Indian Council of Medical Research), ensuring evidence-based recommendations rather than arbitrary adjustments.

## 📋 AI Agent Guidelines

This project includes comprehensive documentation for AI-assisted development:

- **[`.cursorrules`](.cursorrules)**: Complete guidelines for AI agents working on this codebase
  - Code quality standards
  - Architectural constraints
  - Component patterns
  - Nutrition rules system
  - Testing checklist

- **[`ARCHITECTURE.md`](ARCHITECTURE.md)**: System architecture and design decisions
  - High-level structure
  - Key design decisions and trade-offs
  - Data flow patterns
  - Performance optimizations
  - Scalability considerations

These files ensure the system remains understandable and correct as it evolves, making it easy for AI agents (or humans!) to contribute while maintaining consistency.

## 📄 Credits

Design inspired by this [Figma template](https://www.figma.com/design/PHhCHllqWVpLwYXkEMP5o5/Healthy-Meal-Transformation-Website) (heavily customized though).

## 🤝 Contributing

Found a bug? Have a meal you want added? PRs and issues welcome! I'm most active on weekends.

---

**Built with dedication by Mayank**
  