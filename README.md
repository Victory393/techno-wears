# Techno Wears

This app now supports a real Supabase-backed product catalog. The homepage reads
products on the server through Next.js App Router and falls back to local sample
data until Supabase is configured.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in your Supabase values.

3. In the Supabase SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql).

4. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Backend Shape

- `app/page.tsx`: server component that loads products
- `components/home-page-content.tsx`: animated client UI
- `lib/products.ts`: server-side product loader with fallback behavior
- `lib/supabase/*`: Supabase client helpers
- `app/api/products/route.ts`: JSON endpoint for products
- `app/admin/login/*`: admin auth screens and server actions
- `app/admin/products/*`: protected product management dashboard
- `proxy.ts`: Supabase session refresh for admin/auth routes
- `supabase/schema.sql`: database schema and seed data

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=2349123305803
```

## Notes

- If Supabase env vars are missing, the app uses the local sample catalog.
- Once the env vars are present and `products` exists in Supabase, the homepage
  switches to live data automatically.
- Admin access is controlled by the `public.admin_users` table in Supabase.
- After signing up, add your user ID to `public.admin_users` to unlock `/admin/products`.
