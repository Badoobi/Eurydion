import type { GameData } from "@/lib/roblox-games";
import { CountUp } from "@/app/components/showcase/count-up";

export function StatsStrip({ games }: { games: GameData[] }) {
  const totalVisits = games.reduce((sum, game) => sum + game.visits, 0);
  const playing = games.reduce((sum, game) => sum + game.playing, 0);
  const bestApproval = Math.max(...games.map((game) => game.approval), 0);

  const stats = [
    { label: "Total visits", value: totalVisits, suffix: "+" },
    { label: "Games shipped", value: games.length, format: "number" as const },
    { label: "Players online", value: playing, format: "number" as const },
    { label: "Best approval", value: bestApproval, format: "number" as const, suffix: "%" },
  ];

  return (
    <section className="border-y-4 border-ink bg-ink text-paper" id="stats" aria-labelledby="stats-title">
      <h2 className="sr-only" id="stats-title">Live creator statistics</h2>
      <div className="mx-auto grid max-w-[1480px] grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            className="halftone-dark border-ink p-5 text-center odd:border-r-2 max-lg:border-b-2 lg:border-r-2 lg:p-8 lg:last:border-r-0"
            key={stat.label}
          >
            <strong className="block font-display text-5xl leading-none tracking-wide sm:text-6xl lg:text-7xl">
              <CountUp
                value={stat.value}
                format={stat.format}
                suffix={stat.suffix}
              />
            </strong>
            <span className="mt-2 block text-xs font-black uppercase tracking-wide">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
