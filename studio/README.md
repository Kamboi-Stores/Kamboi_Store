# Sanity Studio

1. `cd studio && npm i`
2. Set SANITY project ID and dataset in `sanity.config.ts` (or via env vars).
3. `npm run dev` to open Studio locally.
4. Create documents: Location, Menu Category, Menu Item, Page, Site Settings.
5. Deploy with `npm run deploy` (Sanity managed hosting) or host via Vercel.

Tip: Create a Webhook in Sanity to call your Next.js `/api/revalidate?secret=...` for instant updates.
