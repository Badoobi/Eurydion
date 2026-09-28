const DEFAULT_YOUTUBE_URL = "https://www.youtube.com/@Eurydion";
const DEFAULT_ROBLOX_PROFILE_URL = "https://www.roblox.com/users/31053640/profile";

export function splitConfigEntries(value?: string | null) {
  return (value ?? "")
    .split(/[\n,]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

const configuredYouTubeUrl =
  process.env.YOUTUBE_CHANNEL_URL?.trim() ||
  process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() ||
  (process.env.YOUTUBE_CHANNEL_ID?.trim()
    ? `https://www.youtube.com/channel/${process.env.YOUTUBE_CHANNEL_ID.trim()}`
    : "");

export const siteLinks = {
  youtube: configuredYouTubeUrl || DEFAULT_YOUTUBE_URL,
  youtubeShorts:
    process.env.YOUTUBE_SHORTS_URL?.trim() ||
    process.env.NEXT_PUBLIC_YOUTUBE_SHORTS_URL?.trim() ||
    `${configuredYouTubeUrl || DEFAULT_YOUTUBE_URL}/shorts`,
  robloxProfile:
    process.env.ROBLOX_PROFILE_URL?.trim() ||
    process.env.NEXT_PUBLIC_ROBLOX_PROFILE_URL?.trim() ||
    DEFAULT_ROBLOX_PROFILE_URL,
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()
      ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL.trim()}`
      : "mailto:?subject=Hello%20Eurydion",
};
