import Image from "next/image";
import type { GameData } from "@/lib/roblox-games";
import { GameStats } from "@/app/components/showcase/game-card";
import { ShowcaseIcon } from "@/app/components/showcase/icons";

export function FeaturedGame({ game }: { game: GameData }) {
  return (
    <article className="comic-card comic-card--press grid bg-paper lg:grid-cols-[1.45fr_0.8fr]" data-reveal>
      <div className="comic-media relative min-h-[280px] overflow-hidden border-b-[3px] border-ink lg:min-h-[480px] lg:border-b-0 lg:border-r-[3px]">
        <Image
          src={game.thumbnailPath}
          alt={`${game.name} Roblox game thumbnail`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover"
        />
        <span className="sticker sticker--large absolute left-4 top-4 -rotate-2">FEATURED</span>
      </div>
      <div className="flex flex-col">
        <div className="halftone-light flex flex-1 flex-col p-6 sm:p-8">
          <span className="speech-label w-fit">Featured world</span>
          <h2 className="mt-7 font-display text-6xl leading-[0.86] tracking-wide sm:text-7xl">
            {game.name}
          </h2>
          <p className="mt-5 max-w-xl text-base font-medium leading-7">{game.description}</p>
          <a
            className="comic-button comic-button--black mt-8 w-full sm:w-fit"
            href={game.url}
            target="_blank"
            rel="noreferrer"
          >
            Play now
            <ShowcaseIcon className="size-5" name="arrow" />
          </a>
        </div>
        <GameStats game={game} />
      </div>
    </article>
  );
}
