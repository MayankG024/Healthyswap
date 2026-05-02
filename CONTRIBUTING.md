<![CDATA[# Contributing to HealthySwap

Thanks for your interest in contributing! This guide covers code standards, development workflow, and guidelines for submitting changes.

---

## Table of Contents

- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Architecture Constraints](#architecture-constraints)
- [Component Patterns](#component-patterns)
- [Nutrition Rules (Critical)](#nutrition-rules-critical)
- [Adding Meals to the Library](#adding-meals-to-the-library)
- [Testing](#testing)
- [PR Workflow](#pr-workflow)
- [Code Quality Checklist](#code-quality-checklist)

---

## Development Setup

```bash
# Clone and install
git clone https://github.com/MayankG024/Healthyswap.git
cd Healthyswap
npm install

# Configure environment
cp .env.example .env
# Fill in VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_AUTH_REDIRECT_URL

# Start development server
npm run dev

# Run tests
npm test
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for full backend setup.

---

## Code Standards

### TypeScript

- **Strict typing everywhere** — no `any` unless absolutely necessary (and documented why)
- **Functional components with hooks only** — no class components (except `ErrorBoundary`)
- **Immutable state updates** — never mutate state directly
- **Components under 300 lines** — split into smaller components if exceeding this

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase `.tsx` | `MealLibrary.tsx` |
| Functions | camelCase | `analyzeMeal()` |
| Constants | UPPER_SNAKE_CASE | `NUTRITION_THRESHOLDS` |
| Hooks | useCamelCase | `useAppStore()` |
| Interfaces/Types | PascalCase | `MealAnalysis` |
| Files (non-component) | camelCase | `mealAnalyzer.ts` |

### Styling

- **Tailwind CSS only** — no inline styles (except `ErrorBoundary` which needs to work without Tailwind)
- **No ad-hoc color values** — use design tokens from `theme.css`
- **Responsive design** — every component must work on mobile

### Animation

- **Framer Motion only** for animations
- **Duration < 300ms** — micro-interactions should feel instant
- **`opacity` and `transform` only** — no layout-shifting animations
- **Respect `prefers-reduced-motion`** — check and disable animations when appropriate

---

## Architecture Constraints

| Constraint | Rationale |
|---|---|
| State: Zustand for global, `useState` for UI-only | Keeps state management minimal and predictable |
| File structure: `src/app/{components, pages, store, utils, data}` | Consistent organization |
| Pages lazy-loaded via `React.lazy()` | Reduces initial bundle size |
| Supabase client queries in pages/components | RLS-aware queries using session auth |
| Prisma for admin/seed operations only | Direct DB access for seeding; app uses Supabase SDK |
| Edge Functions for server-side logic | Keeps API keys secure |

---

## Component Patterns

### Standard Component Template

```tsx
interface Props {
  required: string;
  optional?: number;
}

export default function ComponentName({ required, optional = 0 }: Props) {
  const [state, setState] = useState<Type>(initialValue);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="..."
    >
      {/* Content */}
    </motion.div>
  );
}
```

### Async Operation Pattern

```tsx
const handleSubmit = async (data: DataType) => {
  toast.loading('Processing...', { id: 'action' });
  try {
    const result = await processData(data);
    toast.success('Success!', { id: 'action' });
  } catch {
    toast.error('Failed. Try again.', { id: 'action' });
  }
};
```

### Container/Presenter Split

- **Containers** (pages): Own state, make API calls, handle side effects
- **Presenters** (components): Receive data via props, render UI, emit callbacks

---

## Nutrition Rules (Critical)

> ⚠️ **These thresholds are immutable by convention. Do NOT modify without explicit approval and a documented rationale.**

```
Calories > 800 → 35% reduction
Protein < 20g → boost to 30g
Fat > 25g → 50% reduction
Fiber < 5g → increase to 8g+
Sugar > 12g → 50% reduction
Carbs > 70g → 35% reduction
```

These are defined in `NUTRITION_THRESHOLDS` in `src/app/utils/mealAnalyzer.ts` and are based on WHO, NIH, and ICMR guidelines.

If you believe a threshold should change:
1. Open a GitHub issue with your proposed change
2. Cite the nutritional science backing the change
3. Wait for review before submitting a PR

---

## Adding Meals to the Library

### Required Fields

Every meal in the library must include:

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Healthier version name |
| `originalNutrition` | `object` | `{ name, calories, protein, carbs, fat, fiber, sugar }` |
| `improvedNutrition` | `object` | Same structure as above |
| `changes` | `array` | List of changes made |
| `swaps` | `array` | `[{ original, improved, benefit }]` |
| `cookingMethod` | `object` | `{ original, improved, benefit }` |
| `portionTip` | `string` | Practical portion advice |
| `cuisine` | `string` | e.g., "North Indian", "Mexican" |
| `foodType` | `string` | "Dish", "Snack", "Beverage", or "Dessert" |
| `healthTags` | `string[]` | e.g., `["High Protein", "Weight Loss"]` |
| `imageUrl` | `string` | Valid image URL (Unsplash or Pollinations) |

### Validation Rules

- Calories: 100 – 1500 kcal
- Protein: 5 – 80g
- Macros should sum logically (protein + carbs + fat ≈ total caloric contribution)
- Improved version must show meaningful improvement over original

### Adding via Prisma Seed

1. Add your meal data to one of the `prisma/new_meals*.ts` files
2. Follow the exact object structure used by existing entries
3. Run `npx prisma db seed` to insert into the database
4. Verify the meal appears in the `/meal-library` page

### Adding to Client Fallback

If you also want the meal to appear when the database is unavailable, add it to `src/app/data/mealLibrary.ts` using the `meal()` helper function.

---

## Testing

### Running Tests

```bash
npm test
```

Tests use Node.js built-in test runner (`node:test`) with strict assertions (`node:assert/strict`).

### Test Coverage

| File | Tests |
|---|---|
| `tests/analysisValidation.test.ts` | Gemini JSON parsing, payload validation, error rejection |
| `tests/mealPlanning.test.ts` | Week calculation, slot keys, Supabase row normalization, grocery list aggregation |

### Writing New Tests

```typescript
import test from 'node:test';
import assert from 'node:assert/strict';

test('description of what is being tested', () => {
  // Arrange
  const input = { ... };

  // Act
  const result = functionUnderTest(input);

  // Assert
  assert.deepEqual(result, expectedOutput);
});
```

### What to Test

- ✅ Utility functions (pure logic)
- ✅ Validation functions
- ✅ Data transformation functions
- ✅ Edge cases and error conditions
- ❌ React components (future: add React Testing Library)
- ❌ API calls (future: add integration tests)

---

## PR Workflow

1. **Fork** the repository
2. **Create a branch** from `main`: `git checkout -b feature/your-feature`
3. **Make changes** following the code standards above
4. **Test**: `npm test` — all tests must pass
5. **Build**: `npm run build` — ensure no build errors
6. **Commit** with a descriptive message:
   - `feat: add Thai cuisine meals to library`
   - `fix: handle empty Gemini response gracefully`
   - `docs: update API reference with new endpoint`
7. **Push** to your fork and open a Pull Request
8. **Describe** what you changed and why

---

## Code Quality Checklist

Before submitting a PR, verify:

- [ ] No unused imports or `console.log` statements
- [ ] All props and function parameters are typed
- [ ] Error handling for all async operations (try/catch + toast)
- [ ] Responsive design (test at mobile and desktop widths)
- [ ] Accessibility (ARIA labels, keyboard navigation for interactive elements)
- [ ] No inline styles (use Tailwind classes)
- [ ] No `any` types (unless documented)
- [ ] Components under 300 lines
- [ ] All tests pass (`npm test`)
- [ ] Production build succeeds (`npm run build`)

---

## What NOT to Do

| ❌ Don't | ✅ Do Instead |
|---|---|
| Change nutrition thresholds | Open an issue with scientific rationale |
| Use `any` type | Define proper interfaces |
| Mutate state directly | Use immutable patterns with spread/setState |
| Add inline styles | Use Tailwind CSS utilities |
| Use `var` or class components | Use `const`/`let` and functional components |
| Add dependencies without justification | Document why in the PR description |

---

## Need Help?

- Open a [GitHub Issue](https://github.com/MayankG024/Healthyswap/issues) for bugs or feature requests
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design context
- Check [API_REFERENCE.md](API_REFERENCE.md) for API contracts
- Check [DATABASE.md](DATABASE.md) for schema details
]]>
