import Image from "next/image";
import type { GameData } from "@/lib/roblox-games";
import { formatCompactNumber } from "@/lib/creator-data";
import { ShowcaseIcon } from "@/app/components/showcase/icons";

export function GameStats({ game }: { game: GameData }) {
  return (
    <dl className="grid grid-cols-3 border-y-[3px] border-ink bg-gray-light text-center">
      <div className="border-r-2 border-ink px-2 py-3">
        <dt className="sr-only">Approval</dt>
        <dd className="font-black tabular-nums">{game.approval}%</dd>
        <span className="text-[0.68rem] font-bold uppercase">Approval</span>
      </div>
      <div className="border-r-2 border-ink px-2 py-3">
        <dt className="sr-only">Visits</dt>
        <dd className="font-black tabular-nums">{formatCompactNumber(game.visits)}</dd>
        <span className="text-[0.68rem] font-bold uppercase">Visits</span>
      </div>
      <div className="px-2 py-3">
        <dt className="sr-only">Playing now</dt>
        <dd className="flex items-center justify-center gap-1.5 font-black tabular-nums">
          {game.playing > 0 ? <span className="playing-dot" aria-hidden="true" /> : null}
          {formatCompactNumber(game.playing)}
        </dd>
        <span className="text-[0.68rem] font-bold uppercase">Playing</span>
      </div>
    </dl>
  );
}

export function GameCard({ game }: { game: GameData }) {
  return (
    <article className="comic-card comic-card--press flex h-full flex-col bg-paper" data-reveal>
      <div className="comic-media relative aspect-video overflow-hidden border-b-[3px] border-ink bg-gray-light">
        <Image
          src={game.thumbnailPath}
          alt={`${game.name} Roblox game thumbnail`}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="sticker absolute left-3 top-3">{game.status}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-4xl leading-[0.9] tracking-wide">{game.name}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6">{game.description}</p>
        <div className="mt-auto pt-5">
          <GameStats game={game} />
          <a
            className="comic-button comic-button--black mt-4 w-full"
            href={game.url}
            target="_blank"
            rel="noreferrer"
          >
            Play on Roblox
            <ShowcaseIcon className="size-5" name="arrow" />
          </a>
        </div>
      </div>
    </article>
  );
}
