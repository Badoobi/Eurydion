import type { YouTubeVideo } from "@/lib/creator-data";
import { formatCompactNumber } from "@/lib/creator-data";
import { VideoFacade } from "@/app/components/showcase/video-facade";

export function ShortsRow({
  videos,
  shortsUrl,
}: {
  videos: YouTubeVideo[];
  shortsUrl: string;
}) {
  return (
    <section className="section-shell section-rule overflow-hidden" id="shorts" aria-labelledby="shorts-title">
      <div className="section-heading" data-reveal>
        <div>
          <span className="speech-label">Quick cuts</span>
          <h2 id="shorts-title">SHORTS</h2>
        </div>
        <p>Short system showcases.</p>
      </div>

      {videos.length > 0 ? (
        <div className="shorts-row -mr-4 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-7 pr-4 sm:-mr-6 sm:pr-6 lg:-mr-8 lg:pr-8">
          {videos.map((video) => (
            <article
              className="comic-card comic-card--press w-[74vw] max-w-[300px] shrink-0 snap-start bg-paper"
              data-reveal
              key={video.id}
            >
              <div className="relative aspect-[9/16] overflow-hidden border-b-[3px] border-ink bg-gray-light">
                <VideoFacade
                  videoId={video.id}
                  title={video.title}
                  thumbnailUrl={video.thumbnailUrl}
                  vertical
                />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-base font-black leading-tight">{video.title}</h3>
                <span className="mt-2 block text-xs font-bold uppercase">
                  {formatCompactNumber(video.views)} views
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="error-panel" data-reveal>
          <strong>No recent Shorts are on deck.</strong>
          <a className="underline decoration-[3px] underline-offset-4" href={shortsUrl} target="_blank" rel="noreferrer">
            Browse Shorts on YouTube
          </a>
        </div>
      )}
    </section>
  );
}
