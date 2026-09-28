import type { YouTubeVideo } from "@/lib/creator-data";
import { formatCompactNumber, formatPublishedDate } from "@/lib/creator-data";
import { VideoFacade } from "@/app/components/showcase/video-facade";

export function VideoGrid({
  videos,
  channelUrl,
}: {
  videos: YouTubeVideo[];
  channelUrl: string;
}) {
  return (
    <section className="section-shell section-rule" id="films" aria-labelledby="films-title">
      <div className="section-heading" data-reveal>
        <div>
          <span className="speech-label">Behind the build</span>
          <h2 id="films-title">VID SHOWCASE</h2>
        </div>
        <p>Longer cuts from the process: systems, updates, decisions, and the work behind each world.</p>
      </div>

      {videos.length > 0 ? (
        <div className="grid gap-7 lg:grid-cols-2">
          {videos.map((video, index) => (
            <article className="comic-card comic-card--press bg-paper" data-reveal key={video.id}>
              <div className="relative aspect-video overflow-hidden border-b-[3px] border-ink bg-gray-light">
                <VideoFacade
                  videoId={video.id}
                  title={video.title}
                  thumbnailUrl={video.thumbnailUrl}
                  priority={index === 0}
                />
                <span className="sticker absolute right-3 top-3">{video.duration}</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black leading-tight tracking-[-0.03em]">{video.title}</h3>
                <p className="mt-3 flex justify-between gap-4 text-xs font-bold uppercase">
                  <span>{formatCompactNumber(video.views)} views</span>
                  <span>{formatPublishedDate(video.publishedAt)}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="error-panel" data-reveal>
          <strong>The film shelf is between uploads.</strong>
          <a className="underline decoration-[3px] underline-offset-4" href={channelUrl} target="_blank" rel="noreferrer">
            Open the YouTube channel
          </a>
        </div>
      )}
    </section>
  );
}
