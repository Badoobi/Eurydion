const REVALIDATE_SECONDS = 10 * 60;

type LoadState<T> = {
  items: T[];
  status: "ready" | "empty" | "error";
  message?: string;
};

export type YouTubeVideoKind = "video" | "short";

export type YouTubeVideo = {
  id: string;
  kind: YouTubeVideoKind;
  title: string;
  thumbnailUrl: string;
  views: number;
  publishedAt: string;
  duration: string;
  durationSeconds: number;
  url: string;
};

export type YouTubeContent = LoadState<YouTubeVideo> & {
  videos: YouTubeVideo[];
  shorts: YouTubeVideo[];
};

type YouTubeChannelResponse = {
  items?: Array<{
    contentDetails: { relatedPlaylists: { uploads: string } };
  }>;
};

type YouTubePlaylistResponse = {
  items?: Array<{ contentDetails: { videoId: string } }>;
};

type YouTubeVideosResponse = {
  items?: Array<{
    id: string;
    snippet: {
      title: string;
      publishedAt: string;
      thumbnails: Record<string, { url: string }>;
    };
    contentDetails: { duration: string };
    statistics: { viewCount?: string };
  }>;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function fetchJson<T>(url: string, label: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { "User-Agent": "EurydionPortfolio/2.0" },
  });

  if (!response.ok) {
    console.error(`${label} request failed`, response.status, url);
    throw new Error(`${label} request failed`);
  }

  return response.json() as Promise<T>;
}

async function fetchText(url: string, label: string) {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { "User-Agent": "Mozilla/5.0 (compatible; EurydionPortfolio/2.0)" },
  });

  if (!response.ok) {
    console.error(`${label} request failed`, response.status, url);
    throw new Error(`${label} request failed`);
  }

  return response.text();
}

function parseDuration(value: string) {
  const match = value.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return 0;
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
}

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function pickLandscapeThumbnail(thumbnails: Record<string, { url: string }>) {
  return (
    thumbnails.maxres?.url ??
    thumbnails.standard?.url ??
    thumbnails.high?.url ??
    thumbnails.medium?.url ??
    thumbnails.default?.url ??
    ""
  );
}

async function remoteAssetExists(url: string) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { "User-Agent": "EurydionPortfolio/2.0" },
    });
    return response.ok;
  } catch (error) {
    console.error("Remote asset probe failed", url, getErrorMessage(error));
    return false;
  }
}

async function classifyYouTubeVideo(videoId: string, durationSeconds: number) {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const shortUrl = `https://www.youtube.com/shorts/${videoId}`;

  if (durationSeconds <= 0 || durationSeconds > 180) {
    return { kind: "video" as const, url: watchUrl };
  }

  try {
    const html = await fetchText(watchUrl, "YouTube watch page");
    const canonicalUrl = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    const shortsFlag = html.match(/"isShortsEligible":(true|false)/)?.[1];
    const isShort = canonicalUrl?.includes("/shorts/") || shortsFlag === "true";

    return {
      kind: isShort ? "short" as const : "video" as const,
      url: canonicalUrl ?? (isShort ? shortUrl : watchUrl),
    };
  } catch (error) {
    console.error(`YouTube classification failed for ${videoId}`, getErrorMessage(error));
    return { kind: "video" as const, url: watchUrl };
  }
}

async function resolveYouTubeThumbnail(
  videoId: string,
  kind: YouTubeVideoKind,
  fallbackUrl: string,
) {
  if (kind === "video") return fallbackUrl;

  const candidates = [
    `https://i.ytimg.com/vi/${videoId}/oardefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/oar2.jpg`,
    `https://i.ytimg.com/vi/${videoId}/oar3.jpg`,
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  ];

  for (const candidate of candidates) {
    if (await remoteAssetExists(candidate)) return candidate;
  }

  return fallbackUrl;
}

export async function getYouTubeContent(): Promise<YouTubeContent> {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  const channelId = process.env.YOUTUBE_CHANNEL_ID?.trim();

  if (!apiKey || !channelId) {
    return {
      items: [],
      videos: [],
      shorts: [],
      status: "empty",
      message: "The YouTube archive is not connected yet.",
    };
  }

  const apiBase = "https://www.googleapis.com/youtube/v3";

  try {
    const channelParams = new URLSearchParams({ part: "contentDetails", id: channelId, key: apiKey });
    const channel = await fetchJson<YouTubeChannelResponse>(
      `${apiBase}/channels?${channelParams}`,
      "YouTube channel",
    );
    const uploadsId = channel.items?.[0]?.contentDetails.relatedPlaylists.uploads;
    if (!uploadsId) throw new Error("YouTube uploads playlist unavailable");

    const playlistParams = new URLSearchParams({
      part: "contentDetails",
      playlistId: uploadsId,
      maxResults: "24",
      key: apiKey,
    });
    const playlist = await fetchJson<YouTubePlaylistResponse>(
      `${apiBase}/playlistItems?${playlistParams}`,
      "YouTube uploads",
    );
    const videoIds = (playlist.items ?? []).map((item) => item.contentDetails.videoId);

    if (videoIds.length === 0) {
      return {
        items: [],
        videos: [],
        shorts: [],
        status: "empty",
        message: "The video archive is quiet right now.",
      };
    }

    const videoParams = new URLSearchParams({
      part: "snippet,contentDetails,statistics",
      id: videoIds.join(","),
      key: apiKey,
    });
    const response = await fetchJson<YouTubeVideosResponse>(
      `${apiBase}/videos?${videoParams}`,
      "YouTube videos",
    );
    const byId = new Map((response.items ?? []).map((item) => [item.id, item]));

    const rawItems = videoIds.flatMap((id) => {
      const video = byId.get(id);
      if (!video) return [];
      const durationSeconds = parseDuration(video.contentDetails.duration);
      const thumbnailUrl = pickLandscapeThumbnail(video.snippet.thumbnails);
      if (!thumbnailUrl) return [];

      return [{
        id: video.id,
        title: video.snippet.title,
        thumbnailUrl,
        views: Number(video.statistics.viewCount ?? 0),
        publishedAt: video.snippet.publishedAt,
        duration: formatDuration(durationSeconds),
        durationSeconds,
      }];
    });

    const items = await Promise.all(rawItems.map(async (video) => {
      const presentation = await classifyYouTubeVideo(video.id, video.durationSeconds);
      return {
        ...video,
        kind: presentation.kind,
        url: presentation.url,
        thumbnailUrl: await resolveYouTubeThumbnail(
          video.id,
          presentation.kind,
          video.thumbnailUrl,
        ),
      } satisfies YouTubeVideo;
    }));

    return {
      items,
      videos: items.filter((video) => video.kind === "video").slice(0, 6),
      shorts: items.filter((video) => video.kind === "short").slice(0, 8),
      status: items.length > 0 ? "ready" : "empty",
      message: items.length > 0 ? undefined : "The video archive is quiet right now.",
    };
  } catch (error) {
    console.error("YouTube integration failed", getErrorMessage(error));
    return {
      items: [],
      videos: [],
      shorts: [],
      status: "error",
      message: "The video archive is resting right now. Visit the channel directly.",
    };
  }
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value);
}

export function formatPublishedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently published";

  const days = Math.max(1, Math.floor((Date.now() - date.getTime()) / 86_400_000));
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}
