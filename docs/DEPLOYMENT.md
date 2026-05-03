<![CDATA[# Production Deployment Guide

This document covers the complete deployment pipeline for HealthySwap, including Vercel hosting, Supabase configuration, Edge Function deployment, CI/CD via GitHub Actions, and environment-specific setup.

---

## Deployment Architecture

```
┌──────────────────────┐     ┌────────────────────────────┐
│    GitHub (main)      │────▶│   GitHub Actions CI/CD     │
│    Source of Truth     │     │   Build → Deploy to Pages  │
└──────────────────────┘     └────────────────────────────┘
                                       │
                              ┌────────▼────────┐
                              │  Vercel (Primary)│
                              │  SPA Hosting     │
                              │  + SPA Rewrites  │
                              └────────┬────────┘
                                       │ HTTPS
                              ┌────────▼────────┐
                              │    Supabase      │
                              │  ┌────────────┐  │
                              │  │ PostgreSQL │  │
                              │  │ Auth       │  │
                              │  │ Storage    │  │
                              │  │ Edge Fns   │  │
                              │  └────────────┘  │
                              └──────────────────┘
```

---

## 1. Vercel Deployment (Frontend)

### Initial Setup

1. Connect your GitHub repository to Vercel
2. Vercel auto-detects Vite as the build framework
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`

### Environment Variables (Vercel Dashboard)

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_AUTH_REDIRECT_URL` | `https://your-vercel-domain.vercel.app/dashboard` |

### SPA Routing

The `vercel.json` file configures catch-all rewrites for client-side routing:

```json
{
  "rewrites": [
    {
      "source": "/((?!.*\\..*).*)","destination": "/index.html"
    }
  ]
}
```

This ensures that direct URL access to routes like `/dashboard` or `/meal-planner` doesn't return 404.

### Custom Domain (Optional)

1. Add your domain in Vercel → Settings → Domains
2. Update DNS records as instructed by Vercel
3. Update `VITE_AUTH_REDIRECT_URL` in Vercel environment variables
4. Update Supabase Auth redirect URLs to include the custom domain

---

## 2. GitHub Actions CI/CD (Alternative: GitHub Pages)

The repository includes a GitHub Actions workflow for deploying to GitHub Pages:

### Workflow: `.github/workflows/deploy.yml`

**Trigger**: Push to `main` branch or manual dispatch

**Pipeline**:
1. Checkout code
2. Setup Node.js 20 with npm cache
3. Install dependencies (`npm ci`)
4. Build production bundle (`npm run build`)
5. Upload `dist/` as a Pages artifact
6. Deploy to GitHub Pages

**Permissions Required**:
- `contents: read`
- `pages: write`
- `id-token: write`

**Concurrency**: Single deployment at a time; in-progress deployments are cancelled.

> **Note**: If using Vercel as primary hosting, the GitHub Pages workflow can be disabled or repurposed for preview deployments.

---

## 3. Supabase Configuration

### Project Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Note your **Project URL** and **Anon Key** from Settings → API

### Database Schema

Apply the full schema via the SQL Editor:

```sql
-- Copy and run the contents of schema.sql
```

This creates all tables, enables RLS, adds policies, creates indexes, and sets up the storage bucket.

### Seed Data

Option A — Prisma (recommended):
```bash
export DIRECT_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
npx prisma db seed
```

Option B — SQL:
```bash
# Run seed_meal_library.sql in Supabase SQL Editor
```

### Google OAuth Provider

1. **Google Cloud Console**:
   - Create an OAuth 2.0 Client ID (Web Application type)
   - Add authorized redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`
   - Note the Client ID and Client Secret

2. **Supabase Dashboard**:
   - Go to Authentication → Providers → Google
   - Enable Google provider
   - Paste Client ID and Client Secret
   - Go to Authentication → URL Configuration
   - Set Site URL to your production domain
   - Add redirect URLs:
     - `https://your-vercel-domain.vercel.app/dashboard`
     - `http://localhost:5173/dashboard` (for local dev)

---

## 4. Edge Function Deployment

### Prerequisites

Install the Supabase CLI:
```bash
npm install -g supabase
```

Login to Supabase:
```bash
supabase login
```

### Set Secrets

```bash
supabase secrets set GEMINI_API_KEY=your_gemini_api_key \
  --project-ref <your-project-ref>
```

### Deploy

```bash
supabase functions deploy analyze-meal \
  --project-ref <your-project-ref>
```

This deploys the function from `supabase/functions/analyze-meal/` including:
- `index.ts` — Main handler (auth check, Gemini call, persist)
- `analysisValidation.ts` — JSON parsing and validation module

### Verify

```bash
# Check function is deployed
supabase functions list --project-ref <your-project-ref>

# Check logs
supabase functions logs analyze-meal --project-ref <your-project-ref>
```

### Testing the Function

```bash
curl -X POST 'https://<project-ref>.supabase.co/functions/v1/analyze-meal' \
  -H 'Authorization: Bearer <user-access-token>' \
  -H 'Content-Type: application/json' \
  -d '{"mealName": "Butter Chicken"}'
```

---

## 5. Environment Checklist

### Local Development

| Variable | File | Value |
|---|---|---|
| `VITE_SUPABASE_URL` | `.env` | `https://<ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `.env` | Your anon key |
| `VITE_AUTH_REDIRECT_URL` | `.env` | `http://localhost:5173/dashboard` |
| `DIRECT_URL` | `.env` | `postgresql://postgres:[password]@db.<ref>.supabase.co:5432/postgres` |
| `GEMINI_API_KEY` | `supabase/.env.local` | Your Gemini API key |

### Production (Vercel)

| Variable | Location | Value |
|---|---|---|
| `VITE_SUPABASE_URL` | Vercel env vars | `https://<ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Vercel env vars | Your anon key |
| `VITE_AUTH_REDIRECT_URL` | Vercel env vars | `https://your-domain.vercel.app/dashboard` |

### Edge Function (Supabase)

| Secret | Set via | Value |
|---|---|---|
| `GEMINI_API_KEY` | `supabase secrets set` | Your Gemini API key |
| `SUPABASE_URL` | Auto-injected | — |
| `SUPABASE_ANON_KEY` | Auto-injected | — |

---

## 6. Pre-Deployment Validation Checklist

- [ ] `npm run build` completes without errors
- [ ] All environment variables are set in Vercel
- [ ] `schema.sql` has been applied to Supabase
- [ ] Meal library has been seeded (74+ meals)
- [ ] Google OAuth provider is enabled in Supabase
- [ ] OAuth redirect URLs include the production domain
- [ ] `GEMINI_API_KEY` is set as a Supabase secret
- [ ] `analyze-meal` Edge Function is deployed
- [ ] Google sign-in works end-to-end (login → redirect → session)
- [ ] AI analysis completes successfully (upload → analyze → dashboard)
- [ ] Meal planner saves and loads across page refreshes
- [ ] Grocery list generates from planned meals

---

## 7. Production Considerations

### Performance
- Vite tree-shakes unused code and splits routes into separate chunks
- Images are lazy-loaded with skeleton placeholders
- Supabase Edge Functions run on Deno Deploy's global edge network

### Security
- Supabase anon key is safe for client-side use (RLS enforces access control)
- Gemini API key is stored as a server-side secret, never exposed to the client
- All user data is isolated via RLS policies at the database level

### Monitoring
- **Edge Function Logs**: `supabase functions logs analyze-meal`
- **Database Logs**: Supabase Dashboard → Logs → Postgres
- **Build Logs**: Vercel Dashboard → Deployments → Build Logs
- **Auth Logs**: Supabase Dashboard → Authentication → Logs

### Cost Estimates (Free Tier)
- **Supabase Free**: 500MB database, 1GB storage, 500K Edge Function invocations/month
- **Vercel Free**: 100GB bandwidth/month, automatic HTTPS
- **Gemini Free Tier**: Rate-limited but sufficient for development and moderate traffic
]]>
