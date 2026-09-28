import { DevProfile } from "@/app/components/showcase/dev-profile";
import { Footer } from "@/app/components/showcase/footer";
import { GamesShowcase } from "@/app/components/showcase/games-showcase";
import { Navbar } from "@/app/components/showcase/navbar";
import { ShortsRow } from "@/app/components/showcase/shorts-row";
import { VideoGrid } from "@/app/components/showcase/video-grid";
import { getYouTubeContent } from "@/lib/creator-data";
import { getFallbackGames } from "@/lib/roblox-games";
import { siteLinks } from "@/lib/site-config";

export default async function Home() {
  const [youtube, fallbackGames] = await Promise.all([
    getYouTubeContent(),
    Promise.resolve(getFallbackGames()),
  ]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <GamesShowcase fallbackGames={fallbackGames} />
        <VideoGrid videos={youtube.videos} channelUrl={siteLinks.youtube} />
        <ShortsRow videos={youtube.shorts} shortsUrl={siteLinks.youtubeShorts} />
        <DevProfile />
      </main>
      <Footer
        youtubeUrl={siteLinks.youtube}
        robloxUrl={siteLinks.robloxProfile}
        emailUrl={siteLinks.email}
      />
    </div>
  );
}
