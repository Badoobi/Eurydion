import gamesConfig from "@/games.config.json";

const REVALIDATE_SECONDS = 10 * 60;

type RobloxGamesResponse = {
  data: Array<{
    id: number;
    playing: number;
    visits: number;
  }>;
};

type RobloxVotesResponse = {
  data: Array<{
    id: number;
    upVotes: number;
    downVotes: number;
  }>;
};

export type GameData = {
  name: string;
  universeId: string;
  placeId: string;
  thumbnailPath: string;
  description: string;
  order: number;
  featured: boolean;
  status: string;
  approval: number;
  visits: number;
  playing: number;
  url: string;
};

export type GamesPayload = {
  games: GameData[];
  source: "live" | "fallback";
  warning?: string;
};

function getApproval(upVotes: number, downVotes: number, fallback: number) {
  const totalVotes = upVotes + downVotes;
  return totalVotes > 0 ? Math.round((upVotes / totalVotes) * 100) : fallback;
}

export function getFallbackGames(): GameData[] {
  return gamesConfig.games
    .map((game) => ({
      name: game.name,
      universeId: game.universeId,
      placeId: game.placeId,
      thumbnailPath: game.thumbnailPath,
      description: game.description,
      order: game.order,
      featured: game.featured,
      status: game.status,
      approval: game.fallback.approval,
      visits: game.fallback.visits,
      playing: game.fallback.playing,
      url: `https://www.roblox.com/games/${game.placeId}`,
    }))
    .sort((a, b) => a.order - b.order);
}

async function fetchRobloxJson<T>(url: string, label: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { "User-Agent": "EurydionPortfolio/2.0" },
  });

  if (!response.ok) {
    console.error(`${label} request failed`, response.status, url);
    throw new Error(`${label} request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Keep every Roblox request here so the browser only talks to our same-origin route.
export async function getGamesPayload(): Promise<GamesPayload> {
  const fallbackGames = getFallbackGames();
  const universeIds = fallbackGames.map((game) => game.universeId).join(",");
  const query = encodeURIComponent(universeIds);

  try {
    const [gamesResponse, votesResponse] = await Promise.all([
      fetchRobloxJson<RobloxGamesResponse>(
        `https://games.roblox.com/v1/games?universeIds=${query}`,
        "Roblox games",
      ),
      fetchRobloxJson<RobloxVotesResponse>(
        `https://games.roblox.com/v1/games/votes?universeIds=${query}`,
        "Roblox votes",
      ),
    ]);

    const statsById = new Map(gamesResponse.data.map((game) => [String(game.id), game]));
    const votesById = new Map(votesResponse.data.map((game) => [String(game.id), game]));

    return {
      source: "live",
      games: fallbackGames.map((fallback) => {
        const stats = statsById.get(fallback.universeId);
        const votes = votesById.get(fallback.universeId);

        if (!stats || !votes) return fallback;

        return {
          ...fallback,
          visits: stats.visits,
          playing: stats.playing,
          approval: getApproval(votes.upVotes, votes.downVotes, fallback.approval),
        };
      }),
    };
  } catch (error) {
    console.error(
      "Roblox stats integration failed",
      error instanceof Error ? error.message : String(error),
    );

    return {
      games: fallbackGames,
      source: "fallback",
      warning: "Oops! Stats took a nap. Last known numbers are on duty.",
    };
  }
}
