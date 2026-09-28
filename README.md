# Eurydion

A work-first portfolio for Roblox developer and filmmaker Eurydion, built with
Next.js App Router, TypeScript, and Tailwind CSS.

## Structure

- `app/page.tsx` — the single scrolling showcase
- `app/api/games/route.ts` — cached same-origin Roblox stats endpoint
- `app/components/showcase/` — navbar, game panels, stats, media facades,
  profile, and footer
- `games.config.json` — game metadata and last-known fallback statistics
- `lib/roblox-games.ts` — Roblox API and fallback logic
- `lib/creator-data.ts` — server-only YouTube data loading
- `public/images/games/` — owned fallback game thumbnails

The legacy `/works` route redirects to the Worlds section.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

```bash
YOUTUBE_API_KEY=...
YOUTUBE_CHANNEL_ID=UCZ88rtXWEJdSCJzN8C2fofg
YOUTUBE_CHANNEL_URL=https://www.youtube.com/@Eurydion
YOUTUBE_SHORTS_URL=https://www.youtube.com/@Eurydion/shorts

ROBLOX_PROFILE_URL=https://www.roblox.com/users/31053640/profile
NEXT_PUBLIC_CONTACT_EMAIL=you@example.com
```

`YOUTUBE_API_KEY` remains server-only. If the optional contact email is not set,
the Email button opens a new message without a prefilled recipient.

## Live Roblox data

The browser requests `/api/games`. That route calls Roblox's games and votes
endpoints with the universe IDs in `games.config.json`, computes approval
percentages, and caches responses for ten minutes.

If Roblox is unavailable, the route returns the last-known values committed in
`games.config.json`. The interface identifies that fallback instead of showing
empty or success-shaped data.

## Verification

```bash
npm run lint
npm run build
```

## Deploy

Pushes to `main` deploy automatically to GitHub Pages at
`https://eurydion.is-a.dev`. The workflow creates a static Next.js export and
refreshes the Roblox data snapshot every ten minutes.

For request-time Roblox revalidation instead, import the repository in Vercel,
add the environment variables above, and keep the default `npm run build`
command. Normal builds remain server-capable unless `NEXT_OUTPUT=export` is set.
