import type { Metadata } from "next";
import Image from "next/image";
import {
  Icon,
  PrimaryAction,
  SiteFooter,
  SiteHeader,
  TextAction,
} from "@/app/components/portfolio-chrome";
import {
  formatCompactNumber,
  formatPublishedDate,
  getCreatorContent,
  type RobloxGame,
  type YouTubeVideo,
} from "@/lib/creator-data";
import { siteLinks } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Work | Eurydion",
  description: "Browse Eurydion's Roblox worlds, development films, and short-form experiments.",
};

function EmptyState({ message, href }: { message: string; href: string }) {
  return (
    <div className="empty-state" data-reveal-item>
      <p>{message}</p>
      <TextAction href={href} external>Visit the source</TextAction>
    </div>
  );
}

function WorldCard({
  game,
  featured = false,
}: {
  game: RobloxGame;
  featured?: boolean;
}) {
  return (
    <article className={`world-card${featured ? " world-card--featured" : ""}`} data-reveal-item>
      <a href={game.url} target="_blank" rel="noreferrer" data-cursor-label="PLAY">
        <div className="world-card__media">
          {game.thumbnailUrl ? (
            <Image
              src={game.thumbnailUrl}
              alt=""
              fill
              loading={featured ? "eager" : "lazy"}
              quality={92}
              sizes={featured ? "(max-width: 760px) 100vw, 72vw" : "(max-width: 760px) 100vw, 34vw"}
            />
          ) : null}
          <span className="card-action"><Icon name="arrow" /></span>
        </div>
        <div className="world-card__copy">
          <div>
            <span>{featured ? "Featured world" : "Roblox world"}</span>
            <h3>{game.name}</h3>
          </div>
          <p>{game.description}</p>
        </div>
        <div className="world-card__meta">
          {game.rating !== null ? <span>{game.rating}% approval</span> : null}
          <span>{formatCompactNumber(game.visits)} visits</span>
          <span>{formatCompactNumber(game.playing)} playing</span>
        </div>
      </a>
    </article>
  );
}

function FilmCard({
  video,
  featured = false,
}: {
  video: YouTubeVideo;
  featured?: boolean;
}) {
  return (
    <article className={`film-card${featured ? " film-card--featured" : ""}`} data-reveal-item>
      <a href={video.url} target="_blank" rel="noreferrer" data-cursor-label="WATCH">
        <div className="film-card__media">
          <Image
            src={video.thumbnailUrl}
            alt=""
            fill
            quality={92}
            sizes={featured ? "(max-width: 760px) 100vw, 66vw" : "(max-width: 760px) 100vw, 31vw"}
          />
          <span className="film-card__play"><Icon name="play" /></span>
          <span className="film-card__duration">{video.duration}</span>
        </div>
        <div className="film-card__copy">
          <span>{formatPublishedDate(video.publishedAt)}</span>
          <h3>{video.title}</h3>
          <p>{formatCompactNumber(video.views)} views</p>
        </div>
      </a>
    </article>
  );
}

function ShortCard({ video, index }: { video: YouTubeVideo; index: number }) {
  return (
    <article className={`short-card short-card--${(index % 3) + 1}`} data-reveal-item>
      <a href={video.url} target="_blank" rel="noreferrer" data-cursor-label="WATCH">
        <div className="short-card__media">
          <Image src={video.thumbnailUrl} alt="" fill quality={92} sizes="(max-width: 760px) 70vw, 23vw" />
          <span className="short-card__play"><Icon name="play" /></span>
        </div>
        <div className="short-card__copy">
          <h3>{video.title}</h3>
          <span>{formatCompactNumber(video.views)} views</span>
        </div>
      </a>
    </article>
  );
}

function CatalogHeading({
  title,
  copy,
  href,
  action,
}: {
  title: string;
  copy: string;
  href: string;
  action: string;
}) {
  return (
    <div className="catalog-heading">
      <h2 data-reveal-item>{title}</h2>
      <div data-reveal-item>
        <p>{copy}</p>
        <TextAction href={href} external>{action}</TextAction>
      </div>
    </div>
  );
}

export default async function WorksPage() {
  const content = await getCreatorContent();
  const [featuredWorld, ...otherWorlds] = content.roblox.items;
  const [featuredFilm, ...otherFilms] = content.youtube.videos;

  return (
    <main className="page-shell works-page">
      <section className="works-hero" data-hero-sequence aria-labelledby="works-title">
        <SiteHeader current="works" />
        <div className="works-hero__copy">
          <p data-hero-item>Playable worlds, build films, and fast experiments.</p>
          <h1 id="works-title">
            <span data-hero-word>Selected</span>
            <span data-hero-word>work.</span>
          </h1>
          <div data-hero-item>
            <PrimaryAction href="#worlds">Start with the worlds</PrimaryAction>
          </div>
        </div>
        <div className="works-hero__index" data-hero-item aria-hidden="true">
          <span>Worlds</span>
          <span>Films</span>
          <span>Shorts</span>
        </div>
      </section>

      <section className="catalog-section worlds-catalog" id="worlds" aria-labelledby="worlds-title" data-reveal>
        <CatalogHeading
          title="worlds"
          copy="Playable ideas shaped through atmosphere, systems, and a stubborn attention to how each moment feels."
          href={siteLinks.robloxProfile}
          action="Roblox profile"
        />
        <span id="worlds-title" className="sr-only">Roblox worlds</span>
        {featuredWorld ? (
          <>
            <WorldCard game={featuredWorld} featured />
            {otherWorlds.length > 0 ? (
              <div className="world-grid">
                {otherWorlds.map((game) => <WorldCard key={game.id} game={game} />)}
              </div>
            ) : null}
          </>
        ) : (
          <EmptyState
            message={content.roblox.message ?? "No public worlds are ready to visit yet."}
            href={siteLinks.robloxProfile}
          />
        )}
        <span className="section-flow" aria-hidden="true" data-reveal-item><Icon name="arrow" /></span>
      </section>

      <section className="catalog-section films-catalog" id="films" aria-labelledby="films-title" data-reveal>
        <CatalogHeading
          title="build films"
          copy="Longer cuts from the process: mechanics, experiments, updates, and the decisions behind each world."
          href={siteLinks.youtube}
          action="YouTube channel"
        />
        <span id="films-title" className="sr-only">Development films</span>
        {featuredFilm ? (
          <div className="film-layout">
            <FilmCard video={featuredFilm} featured />
            <div className="film-grid">
              {otherFilms.map((video) => <FilmCard key={video.id} video={video} />)}
            </div>
          </div>
        ) : (
          <EmptyState
            message={content.youtube.message ?? "No recent films are available right now."}
            href={siteLinks.youtube}
          />
        )}
        <span className="section-flow" aria-hidden="true" data-reveal-item><Icon name="arrow" /></span>
      </section>

      <section className="catalog-section shorts-catalog" id="shorts" aria-labelledby="shorts-title" data-reveal>
        <CatalogHeading
          title="short cuts"
          copy="Fast glimpses of work in motion — discoveries, prototypes, and features before they become a finished world."
          href={siteLinks.youtubeShorts}
          action="All Shorts"
        />
        <span id="shorts-title" className="sr-only">YouTube Shorts</span>
        {content.youtube.shorts.length > 0 ? (
          <div className="shorts-rail">
            {content.youtube.shorts.map((video, index) => (
              <ShortCard key={video.id} video={video} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState message="No recent Shorts are available right now." href={siteLinks.youtubeShorts} />
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
