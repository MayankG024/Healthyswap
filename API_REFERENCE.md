<![CDATA[# API Reference

This document covers the HealthySwap Edge Function API, Gemini AI integration, request/response contracts, and client-side API usage patterns.

---

## Edge Function: `analyze-meal`

The core AI analysis pipeline runs as a Supabase Edge Function on Deno's serverless runtime. It accepts a meal name (and optional image URL), sends it to Gemini 2.5 Pro for multimodal analysis, validates the AI response, and persists the result to the database.

### Endpoint

```
POST https://<project-ref>.supabase.co/functions/v1/analyze-meal
```

### Authentication

Requires a valid Supabase JWT in the `Authorization` header. The Edge Function verifies the user via `supabase.auth.getUser()` and rejects unauthenticated requests with `401 Unauthorized`.

### Request

**Headers:**
```
Authorization: Bearer <supabase_access_token>
Content-Type: application/json
```

**Body:**
```json
{
  "mealName": "Butter Chicken with Naan",
  "imageUrl": "https://storage.example.com/meal-photos/butter-chicken.jpg"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `mealName` | `string` | Yes | Name or description of the meal to analyze |
| `imageUrl` | `string` | No | URL of a meal image for visual analysis |

### Response: Success (200)

Returns the validated analysis result as saved in the `meal_analyses` table.

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "user-uuid",
  "image_url": "https://...",
  "original_name": "Butter Chicken with Naan",
  "original_nutrition": {
    "name": "Butter Chicken with Naan",
    "calories": 820,
    "protein": 35,
    "carbs": 68,
    "fat": 48,
    "fiber": 3,
    "sugar": 12,
    "factors": ["High in saturated fat", "Heavy cream", "Refined flour naan"]
  },
  "improved_nutrition": {
    "name": "Grilled Tandoori Chicken with Roti",
    "calories": 480,
    "protein": 42,
    "carbs": 45,
    "fat": 16,
    "fiber": 7,
    "sugar": 4
  },
  "changes": [
    { "label": "Calories", "change": "down", "percentage": 41 },
    { "label": "Protein", "change": "up", "percentage": 20 },
    { "label": "Fat", "change": "down", "percentage": 67 }
  ],
  "swaps": [
    {
      "original": "Heavy cream & butter",
      "replacement": "Greek yogurt",
      "benefit": "Cuts fat by 60%, adds probiotics"
    }
  ],
  "cooking_method": {
    "original": "Pan-fried with butter",
    "improved": "Grilled/Tandoori",
    "benefit": "Eliminates excess oil while maintaining flavor through spices"
  },
  "portion_tip": "Pair with a side salad to increase volume without extra calories",
  "created_at": "2026-05-02T08:30:00.000Z"
}
```

### Response: Errors

| Status | Code | Description |
|---|---|---|
| `401` | `Unauthorized` | Missing or invalid JWT token |
| `400` | `analysis_failed` | Gemini returned invalid/unparseable data, or validation failed |
| `502` | `gemini_request_failed` | Gemini API returned a non-200 response |

**Error body:**
```json
{
  "error": "Error message description",
  "code": "analysis_failed",
  "details": "Optional additional details"
}
```

---

## CORS Configuration

The Edge Function accepts cross-origin requests from any domain:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
```

Preflight `OPTIONS` requests return `200 OK` with CORS headers.

---

## Gemini AI Integration

### Model

- **Model**: `gemini-2.5-pro`
- **API**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent`
- **Authentication**: API key via `GEMINI_API_KEY` Supabase secret

### Prompt Engineering

The prompt instructs Gemini to return **strictly JSON** (no markdown blocks) with a specific schema:

```
Analyze this meal: "{mealName}".
If an image is attached, use it as the primary signal for identifying the food.
Provide a JSON response with the following structure (strictly JSON, no markdown blocks):
{
  "original": { name, calories, protein, carbs, fat, fiber, sugar, factors[] },
  "improved": { name, calories, protein, carbs, fat, fiber, sugar },
  "changes": [{ label, change: "up"|"down", percentage }],
  "swaps": [{ original, replacement, benefit }],
  "cookingMethod": { original, improved, benefit },
  "portionTip": "string"
}
```

### Image Processing

When an `imageUrl` is provided:

1. The Edge Function fetches the image from the URL
2. Validates the MIME type starts with `image/`
3. Converts the `ArrayBuffer` to Base64
4. Sends it as an `inline_data` part alongside the text prompt

```typescript
{
  inline_data: {
    mime_type: "image/jpeg",
    data: "<base64-encoded-image>"
  }
}
```

### Response Validation

All Gemini responses pass through a two-stage validation pipeline:

**Stage 1: `parseGeminiJson(text)`**
- Strips markdown code fences (` ```json ... ``` `)
- Parses the cleaned string as JSON
- Throws on invalid JSON

**Stage 2: `validateAnalysisPayload(value)`**
- Validates `original` and `improved` nutrition objects (requires all 6 numeric fields)
- Validates `changes` array (each entry must have label, direction, percentage)
- Validates `swaps` array (each entry must have original, replacement, benefit)
  - Accepts `rationale` as an alias for `benefit` (Gemini sometimes uses this)
- Validates `cookingMethod` object (original, improved, benefit)
- Provides defaults for optional string fields
- Throws descriptive errors for any missing or invalid fields

---

## Client-Side API Usage

### Supabase Client Initialization

```typescript
// src/app/utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Authentication

```typescript
// Google OAuth login
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: import.meta.env.VITE_AUTH_REDIRECT_URL,
  },
});

// Get current session
const { data: { session } } = await supabase.auth.getSession();

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  setSession(session);
  setUser(session?.user || null);
});

// Logout
await supabase.auth.signOut();
```

### Invoking the Edge Function

```typescript
const { data, error } = await supabase.functions.invoke('analyze-meal', {
  body: { mealName: 'Butter Chicken', imageUrl: 'https://...' },
});
```

### Database Queries

```typescript
// Fetch meal library
const { data: meals } = await supabase
  .from('meal_library')
  .select('*')
  .order('created_at', { ascending: false });

// Fetch user's analysis history
const { data: analyses } = await supabase
  .from('meal_analyses')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });

// Upsert meal plan
const { data: plan } = await supabase
  .from('meal_plans')
  .upsert({ user_id: user.id, week_start: weekStart })
  .select()
  .single();

// Assign meal to slot
await supabase
  .from('meal_plan_items')
  .upsert({
    plan_id: planId,
    meal_id: mealId,
    day_of_week: dayIndex,
    meal_slot: slot,
  });

// Read/write profile
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();
```

---

## Deterministic Analysis API (Client-Side)

For instant, offline analysis of known meals, the client-side `analyzeMeal()` function in `mealAnalyzer.ts` provides deterministic results:

```typescript
import { analyzeMeal } from './utils/mealAnalyzer';

const result: MealAnalysis = analyzeMeal('butter chicken');
// Returns pre-computed analysis from the local meal database
```

### Supported Meals (Local Database)

| Key | Original Meal | Improved Version |
|---|---|---|
| `butter chicken` | Butter Chicken with Naan | Grilled Tandoori Chicken with Roti |
| `biryani` | Chicken Biryani | Brown Rice Chicken Biryani |
| `samosa` | Fried Samosas (3 pcs) | Baked Whole Wheat Samosas |
| `paneer` | Paneer Butter Masala | Paneer Tikka with Roti |
| `chole bhature` | Chole Bhature | Chole with Whole Wheat Kulcha |
| `dosa` | Masala Dosa with Butter | Oats and Ragi Dosa |
| `burger` | Burger with Fries | Grilled Chicken Burger |
| `pizza` | Pizza Margherita | Thin Crust Veggie Pizza |
| `fried rice` | Fried Rice | Cauliflower Fried "Rice" |
| `instant noodles` | Instant Noodles | Vegetable Noodle Bowl |

For unrecognized meals, the function applies the deterministic nutrition rules engine to generate generic improvement targets.

---

## Environment Variables

### Client-Side (Vite)

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable anon key |
| `VITE_AUTH_REDIRECT_URL` | OAuth redirect URL (e.g., `https://app.example.com/dashboard`) |

### Server-Side (Edge Function Secrets)

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google AI Gemini API key |
| `SUPABASE_URL` | Auto-injected by Supabase |
| `SUPABASE_ANON_KEY` | Auto-injected by Supabase |

### Prisma / Seeding

| Variable | Description |
|---|---|
| `DIRECT_URL` | Direct PostgreSQL connection string (bypasses pgBouncer) |
]]>
