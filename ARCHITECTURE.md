# System Architecture

## Overview
```
UI Layer (React + Framer Motion)
    ↓
State Layer (Zustand + Local State)
    ↓
Business Logic (Deterministic Rules)
```

## Key Design Decisions

### State: Zustand Over Redux
**Why**: 1KB bundle, minimal boilerplate, TypeScript-first, sufficient for 4 global states  
**Trade-off**: No time-travel debugging (acceptable for simple app)

### Logic: Deterministic Rules Over ML
**Why**: Predictable results, no hosting costs, instant processing, WHO/NIH/ICMR based  
**Trade-off**: No personalization (acceptable for transparency in health advice)

### Deployment: Client-Side Only
**Why**: Zero hosting costs, no auth complexity, fast loads, easy maintenance  
**Trade-off**: No user accounts/dynamic meals (acceptable for portfolio demo)

### Code: Container/Presenter Pattern
```tsx
// Container (App.tsx) - Logic
function App() {
  const { state } = useAppStore();
  return <ComparisonView data={state} onAction={handleAction} />;
}

// Presenter - Pure UI
function ComparisonView({ data, onAction }) {
  return <motion.div>{/* UI */}</motion.div>;
}
```

### Types: Strict TypeScript
```typescript
// ✅ Do
interface MealData { name: string; calories: number; }

// ❌ Avoid
const meal: any = { ... };
```

### Animation: Performance-First
- < 300ms duration
- opacity/transform only (no layout shifts)
- Respects reduced motion preference

## Data Flow
```
Input → UploadCard → handleSubmit() → analyzeMeal()
  → Check database
  → Apply rules (cal>800→35% cut, protein<20g→30g boost)
  → Calculate changes
  → Generate swaps
→ Update Zustand → Re-render ComparisonView
```

### State Structure
```typescript
{
  currentPage: 'home' | 'library' | 'nutrition' | 'personalized',
  isAnalyzing: boolean,
  analysisResult: MealAnalysis | null,
  selectedMeal: string
}
```
Flat → easy updates, minimal → fewer re-renders, typed → compile-time safety

## Component Tree
```
App
├── Navbar
├── Toaster
├── AnalyzingAnimation
└── Routes
    ├── Home (FoodBackground, UploadCard, ComparisonView, MealShowcase)
    ├── Library (MealLibrary)
    ├── Nutrition (NutritionBreakdown)
    └── Personalized (PersonalizedRecommendations)
```

## Performance
- **Bundle**: ~150KB gzipped (React 45KB + Framer 30KB + Radix 40KB + App 35KB)
- **Images**: Lazy loading, Unsplash optimization, skeleton placeholders
- **Code**: Vite tree-shaking, automatic route splitting

## Error Handling
```typescript
try {
  const result = await analyzeMeal(input);
  toast.success('Success');
} catch {
  toast.error('Please try again');
}
```
Error boundary catches component errors → fallback UI

## Scaling to Production

### Backend Needed
- Auth (JWT), database (meal history), API, image upload

### Enhanced State
- Redux for complexity, middleware caching, optimistic updates

### Testing
- Vitest (unit), Testing Library (integration), Playwright (E2E)

### Performance
- Virtualized lists, service worker, CDN, React Query

### Monitoring
- Sentry (errors), PostHog (analytics), Web Vitals

## Dependencies
- **Core**: React 18, TypeScript 5, Vite 6, Tailwind 4
- **UI**: Radix UI (accessible components), Motion 12, Lucide React
- **State**: Zustand 5, Sonner (toasts)

Chosen for: maturity, TypeScript support, bundle size, maintenance

## Maintenance

### Adding Meals
Update `mealDatabase` in `mealAnalyzer.ts` → test analysis flow

### Changing Nutrition Rules
Update `NUTRITION_THRESHOLDS` → adjust logic → update docs → test

### Refactoring
Maintain: strict types, animations, responsive design, accessibility
