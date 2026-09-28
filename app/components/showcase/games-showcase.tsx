"use client";

import { useEffect, useState } from "react";
import type { GameData, GamesPayload } from "@/lib/roblox-games";
import { FeaturedGame } from "@/app/components/showcase/featured-game";
import { GameCard } from "@/app/components/showcase/game-card";
import { StatsStrip } from "@/app/components/showcase/stats-strip";

function ComicSkeleton() {
  return (
    <div aria-label="Loading Roblox worlds" role="status">
      <div className="skeleton-panel aspect-[16/8] border-[3px] border-ink" />
      <div className="mt-8 grid gap-7 md:grid-cols-2">
        <div className="skeleton-panel aspect-[4/3] border-[3px] border-ink" />
        <div className="skeleton-panel aspect-[4/3] border-[3px] border-ink" />
      </div>
      <span className="sr-only">Loading live game statistics</span>
    </div>
  );
}

export function GamesShowcase({ fallbackGames }: { fallbackGames: GameData[] }) {
  const [payload, setPayload] = useState<GamesPayload | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGames() {
      try {
        const response = await fetch("/api/games", { signal: controller.signal });
        if (!response.ok) throw new Error(`Games API returned ${response.status}`);
        setPayload(await response.json() as GamesPayload);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Games API request failed", error);
        setPayload({
          games: fallbackGames,
          source: "fallback",
          warning: "Oops! Stats took a nap. Last known numbers are on duty.",
        });
      }
    }

    void loadGames();
    return () => controller.abort();
  }, [fallbackGames]);

  const games = payload?.games ?? [];
  const featured = games.find((game) => game.featured) ?? games[0];
  const otherGames = games.filter((game) => game !== featured);

  return (
    <>
      <section className="section-shell scroll-mt-16" id="worlds" aria-labelledby="worlds-title">
        <div className="section-heading" data-reveal>
          <div>
            <span className="speech-label">Start playing</span>
            <h1 id="worlds-title">Showcases</h1>
          </div>
          <p>Games I&apos;ve contributed, building quality systems and experience.</p>
        </div>

        {!payload ? (
          <ComicSkeleton />
        ) : (
          <>
            {payload.warning ? (
              <p className="error-panel mb-7" role="status">{payload.warning}</p>
            ) : null}
            {featured ? <FeaturedGame game={featured} /> : null}
            {otherGames.length > 0 ? (
              <div className="mt-9 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {otherGames.map((game) => <GameCard game={game} key={game.universeId} />)}
              </div>
            ) : null}
          </>
        )}
      </section>

      <StatsStrip games={payload?.games ?? fallbackGames} />
    </>
  );
}
