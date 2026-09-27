import Image from "next/image";
import { AmbientStage } from "@/app/components/ambient-stage";
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

export const revalidate = 900;

function FeaturedGame({ game }: { game: RobloxGame }) {
  return (
    <a
      className="landing-feature"
      href={game.url}
      target="_blank"
      rel="noreferrer"
      data-cursor-label="PLAY"
      data-reveal-item
    >
      <div className="landing-feature__media">
        {game.thumbnailUrl ? (
          <Image
            src={game.thumbnailUrl}
            alt=""
            fill
            quality={92}
            sizes="(max-width: 760px) 100vw, 56vw"
          />
        ) : null}
        <span className="landing-feature__open"><Icon name="arrow" /></span>
      </div>
      <div className="landing-feature__copy">
        <div>
          <span>Featured world</span>
          <h2>{game.name}</h2>
        </div>
        <p>{game.description}</p>
        <dl>
          {game.rating !== null ? <div><dt>{game.rating}%</dt><dd>approval</dd></div> : null}
          <div><dt>{formatCompactNumber(game.visits)}</dt><dd>visits</dd></div>
          <div><dt>{formatCompactNumber(game.playing)}</dt><dd>playing now</dd></div>
        </dl>
      </div>
    </a>
  );
}

function FeaturedVideo({ video }: { video: YouTubeVideo }) {
  return (
    <a
      className="landing-feature"
      href={video.url}
      target="_blank"
      rel="noreferrer"
      data-cursor-label="WATCH"
      data-reveal-item
    >
      <div className="landing-feature__media">
        <Image
          src={video.thumbnailUrl}
          alt=""
          fill
          quality={92}
          sizes="(max-width: 760px) 100vw, 56vw"
        />
        <span className="landing-feature__play"><Icon name="play" /></span>
      </div>
      <div className="landing-feature__copy">
        <div>
          <span>Featured film</span>
          <h2>{video.title}</h2>
        </div>
        <p>A closer look at the systems, experiments, and decisions behind the work.</p>
        <dl>
          <div><dt>{video.duration}</dt><dd>runtime</dd></div>
          <div><dt>{formatCompactNumber(video.views)}</dt><dd>views</dd></div>
          <div><dt>{formatPublishedDate(video.publishedAt)}</dt><dd>published</dd></div>
        </dl>
      </div>
    </a>
  );
}

export default async function Home() {
  const content = await getCreatorContent();
  const featuredGame = content.roblox.items[0] ?? null;
  const latestVideo = content.youtube.videos[0] ?? null;
  const totalGameVisits = content.roblox.items.reduce((sum, game) => sum + game.visits, 0);

  return (
    <main className="page-shell landing-page">
      <section className="landing-hero" id="home" aria-labelledby="hero-title" data-hero-sequence>
        <Image
          className="landing-hero__image"
          src="/images/eurydion-hero.png"
          alt=""
          fill
          priority
          quality={100}
          data-critical-image="true"
          sizes="100vw"
        />
        <div className="landing-hero__veil" aria-hidden="true" />
        <AmbientStage />
        <SiteHeader current="home" />

        <div className="landing-hero__copy">
          <p className="landing-hero__identity" data-hero-item>
            Independent Roblox developer building worlds with a pulse.
          </p>
          <h1 id="hero-title" aria-label="Eurydion">
            <span data-hero-word>Eury</span>
            <span data-hero-word>dion</span>
          </h1>
          <div className="landing-hero__actions" data-hero-item>
            <PrimaryAction href="/works">Explore the worlds</PrimaryAction>
            {latestVideo ? (
              <TextAction href={latestVideo.url} external>Watch the latest film</TextAction>
            ) : null}
          </div>
        </div>

        <a className="landing-hero__scroll" href="#about" data-hero-item aria-label="Continue to introduction">
          <span />
          Scroll to discover
        </a>
      </section>

      <section className="landing-quote" id="about" data-reveal>
        <p data-reveal-item>
          I don&apos;t just ship games. I build <em>places worth returning to</em> —
          then document every system, experiment, and strange idea that gets them there.
        </p>
        <span className="flow-cue" aria-hidden="true" data-reveal-item><Icon name="arrow" /></span>
      </section>

      <section className="proof-section" aria-labelledby="proof-title" data-reveal>
        <div className="compact-section-heading" data-reveal-item>
          <h2 id="proof-title">Proof in the work</h2>
          <p>Six years of building, shipping, and learning in public.</p>
        </div>
        <dl className="proof-grid">
          <div data-reveal-item><dt>{formatCompactNumber(totalGameVisits)}</dt><dd>World visits</dd></div>
          <div data-reveal-item><dt>300+</dt><dd>Commissions fulfilled</dd></div>
          <div data-reveal-item><dt>6</dt><dd>Years developing</dd></div>
          <div data-reveal-item><dt>50+</dt><dd>Community reviews</dd></div>
        </dl>
      </section>

      <section className="featured-section" aria-labelledby="featured-title" data-reveal>
        <div className="compact-section-heading" data-reveal-item>
          <h2 id="featured-title">Start here</h2>
          <TextAction href="/works">View all work</TextAction>
        </div>
        {featuredGame ? (
          <FeaturedGame game={featuredGame} />
        ) : latestVideo ? (
          <FeaturedVideo video={latestVideo} />
        ) : (
          <div className="empty-state" data-reveal-item>
            <p>The latest work is being prepared.</p>
            <TextAction href="/works">Open the work archive</TextAction>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
