# MensClinicFinder

Men's health clinic directory. Compare prices, read reviews, find verified providers worldwide.

## Stack

- Next.js 15, App Router, TypeScript
- Supabase (Postgres + RLS)
- Tailwind CSS
- `nuqs` for URL state management

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a new project.

### 3. Run the schema

In the Supabase SQL editor, run `supabase/schema.sql` to create the `clinics` table.

### 4. Seed the database

Run `supabase/seed.sql` in the SQL editor to insert 25 sample clinics.

### 5. Set environment variables

Copy `.env` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in your Supabase project under **Settings → API**.

> **Never** commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` client-side.

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  page.tsx                  # Homepage
  clinics/
    page.tsx                # Directory with filters
    [slug]/page.tsx         # Clinic detail page
  for-clinics/page.tsx      # Clinic owner landing page
  about/page.tsx
  layout.tsx
  globals.css
  sitemap.ts
  robots.ts
src/
  components/               # Shared UI components
  lib/
    types.ts                # TypeScript types
    utils.ts                # Helpers (formatPrice, getCategoryLabel, etc.)
    supabase.ts             # Browser Supabase client
    supabase-server.ts      # Server Supabase client (service role)
supabase/
  schema.sql
  seed.sql
```

## Deployment (Vercel)

1. Push to GitHub
2. Import in Vercel
3. Add the three environment variables in Vercel project settings
4. Deploy

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anon key (safe for client) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key — server-side only |
