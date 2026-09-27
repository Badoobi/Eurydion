import { splitConfigEntries } from "@/lib/site-config";

const REVALIDATE_SECONDS = 15 * 60;

type LoadState<T> = {
  items: T[];
  status: "ready" | "empty" | "error";
  message?: string;
};

export type RobloxGame = {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string | null;
  rating: number | null;
  playing: number;
  visits: number;
  url: string;
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

export type CreatorContent = {
  roblox: LoadState<RobloxGame>;
  youtube: LoadState<YouTubeVideo> & {
    videos: YouTubeVideo[];
    shorts: YouTubeVideo[];
  };
};

type RobloxGameResponse = {
  data: Array<{
    id: number;
    rootPlaceId: number;
    name: string;
    description: string;
    playing: number;
    visits: number;
  }>;
};

type RobloxVoteResponse = {
  data: Array<{ id: number; upVotes: number; downVotes: number }>;
};

type RobloxThumbnailResponse = {
  data: Array<{
    universeId: number;
    thumbnails: Array<{ imageUrl: string; state: string }>;
  }>;
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

type RobloxConfiguredSource = {
  key: string;
  kind: "place" | "legacy";
  placeId?: string;
  universeId?: string;
  url?: string | null;
};

type ResolvedRobloxSource = {
  key: string;
  universeId: string;
  url: string | null;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function fetchJson<T>(url: string, label: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    next: { revalidate: REVALIDATE_SECONDS },
    headers: {
      "User-Agent": "EurydionCreatorHub/1.0",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    console.error(`${label} request failed`, response.status, url);
    throw new Error(`${label} request failed`);
  }

  return response.json() as Promise<T>;
}

async function fetchText(url: string, label: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    next: { revalidate: REVALIDATE_SECONDS },
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; EurydionCreatorHub/1.0)",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    console.error(`${label} request failed`, response.status, url);
    throw new Error(`${label} request failed`);
  }

  return response.text();
}

function parseNumericId(value: string) {
  return /^\d+$/.test(value) ? value : null;
}

function parseRobloxPlaceId(value: string) {
  const match = value.match(/(?:roblox\.com\/games\/|^)(\d+)/i);
  return match?.[1] ?? null;
}

function normalizeRobloxGameUrl(value: string) {
  try {
    const parsed = new URL(value);
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return value;
  }
}

function getRobloxConfiguredSources() {
  const sources: RobloxConfiguredSource[] = [];
  const seen = new Set<string>();
  const configuredGameUrls = splitConfigEntries(process.env.ROBLOX_GAME_URLS);
  const configuredPlaceIds = splitConfigEntries(process.env.ROBLOX_GAME_PLACE_IDS);
  const hasExplicitPlaceConfig = configuredGameUrls.length > 0 || configuredPlaceIds.length > 0;

  configuredGameUrls.forEach((value) => {
    const placeId = parseRobloxPlaceId(value);
    if (!placeId || seen.has(`place:${placeId}`)) return;
    seen.add(`place:${placeId}`);
    sources.push({
      key: `place:${placeId}`,
      kind: "place",
      placeId,
      url: normalizeRobloxGameUrl(value),
    });
  });

  configuredPlaceIds.forEach((value) => {
    const placeId = parseNumericId(value);
    if (!placeId || seen.has(`place:${placeId}`)) return;
    seen.add(`place:${placeId}`);
    sources.push({
      key: `place:${placeId}`,
      kind: "place",
      placeId,
      url: `https://www.roblox.com/games/${placeId}`,
    });
  });

  if (hasExplicitPlaceConfig) {
    return sources;
  }

  splitConfigEntries(process.env.ROBLOX_UNIVERSE_IDS).forEach((value) => {
    const id = parseNumericId(value);
    if (!id || seen.has(`legacy:${id}`)) return;
    seen.add(`legacy:${id}`);
    sources.push({
      key: `legacy:${id}`,
      kind: "legacy",
      universeId: id,
      url: null,
    });
  });

  return sources;
}

function buildRobloxGameUrl(rootPlaceId: number, name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug
    ? `https://www.roblox.com/games/${rootPlaceId}/${slug}`
    : `https://www.roblox.com/games/${rootPlaceId}`;
}

async function fetchRobloxGamesByUniverseIds(universeIds: string[]) {
  if (universeIds.length === 0) return { data: [] } satisfies RobloxGameResponse;

  const encodedIds = encodeURIComponent(universeIds.join(","));
  return fetchJson<RobloxGameResponse>(
    `https://games.roblox.com/v1/games?universeIds=${encodedIds}`,
    "Roblox games",
  );
}

async function resolveRobloxPlaceSource(source: RobloxConfiguredSource): Promise<ResolvedRobloxSource> {
  const placeId = source.placeId;
  if (!placeId) {
    throw new Error(`Missing Roblox place id for ${source.key}`);
  }

  const html = await fetchText(`https://www.roblox.com/games/${placeId}`, "Roblox game page");
  const universeId = html.match(/data-universe-id="(\d+)"/)?.[1];
  const rootPlaceId = html.match(/data-root-place-id="(\d+)"/)?.[1] ?? placeId;
  const canonicalUrl = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? null;

  if (!universeId) {
    throw new Error(`Universe ID not found for Roblox place ${placeId}`);
  }

  return {
    key: source.key,
    universeId,
    url: source.url ?? canonicalUrl ?? `https://www.roblox.com/games/${rootPlaceId}`,
  };
}

async function resolveRobloxSources() {
  const configuredSources = getRobloxConfiguredSources();
  if (configuredSources.length === 0) return [];

  const legacySources = configuredSources.filter((source) => source.kind === "legacy");
  const legacyUniverseIds = legacySources.flatMap((source) => (source.universeId ? [source.universeId] : []));
  const legacyUniverseGames = await fetchRobloxGamesByUniverseIds(legacyUniverseIds);
  const confirmedLegacyUniverseIds = new Set(
    legacyUniverseGames.data.map((game) => String(game.id)),
  );

  const placeSources = configuredSources.flatMap((source) => {
    if (source.kind === "place") return [source];
    if (source.universeId && !confirmedLegacyUniverseIds.has(source.universeId)) {
      return [{
        key: source.key,
        kind: "place" as const,
        placeId: source.universeId,
        url: source.url,
      }];
    }

    return [];
  });

  const placeResults = await Promise.allSettled(placeSources.map(resolveRobloxPlaceSource));
  const resolvedByKey = new Map<string, ResolvedRobloxSource>();

  placeResults.forEach((result, index) => {
    if (result.status === "fulfilled") {
      resolvedByKey.set(result.value.key, result.value);
      return;
    }

    console.error(
      `Roblox place resolution failed for ${placeSources[index]?.key ?? "unknown source"}`,
      getErrorMessage(result.reason),
    );
  });

  legacySources.forEach((source) => {
    if (!source.universeId || !confirmedLegacyUniverseIds.has(source.universeId)) return;
    resolvedByKey.set(source.key, {
      key: source.key,
      universeId: source.universeId,
      url: source.url ?? null,
    });
  });

  const deduped = new Map<string, ResolvedRobloxSource>();

  configuredSources.forEach((source) => {
    const resolved = resolvedByKey.get(source.key);
    if (!resolved || deduped.has(resolved.universeId)) return;
    deduped.set(resolved.universeId, resolved);
  });

  return [...deduped.values()];
}

async function getRobloxGames(): Promise<LoadState<RobloxGame>> {
  const resolvedSources = await resolveRobloxSources();

  if (resolvedSources.length === 0) {
    return { items: [], status: "empty", message: "No public worlds are ready to visit yet." };
  }

  const universeIds = resolvedSources.map((source) => source.universeId);
  const encodedIds = encodeURIComponent(universeIds.join(","));

  try {
    const [games, votes, thumbnails] = await Promise.all([
      fetchJson<RobloxGameResponse>(
        `https://games.roblox.com/v1/games?universeIds=${encodedIds}`,
        "Roblox games",
      ),
      fetchJson<RobloxVoteResponse>(
        `https://games.roblox.com/v1/games/votes?universeIds=${encodedIds}`,
        "Roblox votes",
      ),
      fetchJson<RobloxThumbnailResponse>(
        `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${encodedIds}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`,
        "Roblox thumbnails",
      ),
    ]);

    const voteById = new Map(votes.data.map((vote) => [vote.id, vote]));
    const thumbnailById = new Map(
      thumbnails.data.map((entry) => [
        Number(entry.universeId),
        entry.thumbnails.find((thumbnail) => thumbnail.state === "Completed")?.imageUrl ?? null,
      ]),
    );
    const configuredByUniverseId = new Map(
      resolvedSources.map((source) => [Number(source.universeId), source]),
    );

    const items = resolvedSources
      .map((source) => games.data.find((game) => game.id === Number(source.universeId)))
      .filter((game): game is RobloxGameResponse["data"][number] => Boolean(game))
      .map((game) => {
        const vote = voteById.get(game.id);
        const voteTotal = vote ? vote.upVotes + vote.downVotes : 0;
        const configured = configuredByUniverseId.get(game.id);

        return {
          id: game.id,
          name: game.name,
          description: game.description || "Visit this world on Roblox.",
          thumbnailUrl: thumbnailById.get(game.id) ?? null,
          rating: voteTotal > 0 ? Math.round((vote!.upVotes / voteTotal) * 100) : null,
          playing: game.playing,
          visits: game.visits,
          url: configured?.url ?? buildRobloxGameUrl(game.rootPlaceId, game.name),
        };
      });

    return items.length > 0
      ? { items, status: "ready" }
      : { items: [], status: "empty", message: "No public worlds are ready to visit yet." };
  } catch (error) {
    console.error("Roblox integration failed", getErrorMessage(error));
    return {
      items: [],
      status: "error",
      message: "The worlds are resting right now. Visit the Roblox profile directly.",
    };
  }
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
      headers: { "User-Agent": "EurydionCreatorHub/1.0" },
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
    // YouTube Data API v3 does not expose a short-vs-video flag, so we only probe
    // sub-3-minute uploads and trust the canonical watch URL for the final bucket.
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
    if (await remoteAssetExists(candidate)) {
      return candidate;
    }
  }

  return fallbackUrl;
}

async function getYouTubeVideos(): Promise<CreatorContent["youtube"]> {
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

    if (!uploadsId) {
      throw new Error("YouTube uploads playlist unavailable");
    }

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
      videos: items.filter((video) => video.kind === "video").slice(0, 3),
      shorts: items.filter((video) => video.kind === "short").slice(0, 4),
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

export async function getCreatorContent(): Promise<CreatorContent> {
  const [roblox, youtube] = await Promise.all([getRobloxGames(), getYouTubeVideos()]);
  return { roblox, youtube };
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

  const diffMs = Date.now() - date.getTime();
  const dayMs = 1000 * 60 * 60 * 24;
  const days = Math.max(1, Math.floor(diffMs / dayMs));

  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}
