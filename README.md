# Eurydion

A Next.js creator portfolio that surfaces Eurydion's Roblox games, YouTube uploads, Shorts, and community links inside a cinematic editorial experience.

The interface keeps its source data live through the Roblox and YouTube integrations,
uses locally served `next/font` assets, and includes an accessible scene-based loader
with a reduced-motion path.

The experience is divided into two routes:

- `/` — a short identity, proof, and featured-work landing page
- `/works` — the complete Worlds, Build Films, and Short Cuts catalog

Fine-pointer devices receive a restrained custom cursor and optional click feedback.
Touch, keyboard, and reduced-motion paths retain their native behavior.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Configuration

Create a local env file with the media sources you want to surface:

```bash
YOUTUBE_API_KEY=...
YOUTUBE_CHANNEL_ID=UCZ88rtXWEJdSCJzN8C2fofg
YOUTUBE_CHANNEL_URL=https://www.youtube.com/@Eurydion
YOUTUBE_SHORTS_URL=https://www.youtube.com/@Eurydion/shorts

ROBLOX_PROFILE_URL=https://www.roblox.com/users/31053640/profile
ROBLOX_GAME_PLACE_IDS=11380769866,10400440200,100989019560808
ROBLOX_GAME_URLS=https://www.roblox.com/games/11380769866/Chipeo-Paradise,https://www.roblox.com/games/10400440200/That-One-OMORI-Game,https://www.roblox.com/games/100989019560808/Knife-or-Die
```

### Roblox ID support

The homepage now treats the supplied Roblox IDs as **place IDs** and resolves their universe IDs automatically by reading each public game page before requesting metadata and thumbnails.

For backwards compatibility, `ROBLOX_UNIVERSE_IDS` is still accepted. If a value in `ROBLOX_UNIVERSE_IDS` is actually a place ID, the loader falls back to the same place-resolution flow.

### YouTube Shorts support

The YouTube Data API does not expose a reliable "this upload is a Short" field. The integration now:

1. fetches uploads from the official YouTube Data API v3
2. probes sub-3-minute watch pages server-side
3. uses the canonical YouTube URL to decide whether an item belongs in the Videos shelf or the Shorts shelf
4. upgrades Shorts thumbnails to portrait variants when YouTube provides them

## Verification

Run the standard checks:

```bash
npm run lint
npm run build
```

## GitHub Pages deployment

The site is exported as static HTML and deployed by
`.github/workflows/static.yml` whenever `main` changes. The workflow also runs
every 15 minutes so the exported Roblox and YouTube content stays current
without exposing API credentials to browsers.

Add `YOUTUBE_API_KEY` as a GitHub Actions repository secret under
**Settings -> Secrets and variables -> Actions**. The YouTube section degrades
to its existing empty state when the secret is absent. Roblox uses public APIs
and does not require a secret.

The custom domain remains configured through the repository's GitHub Pages
settings and its existing DNS record.
