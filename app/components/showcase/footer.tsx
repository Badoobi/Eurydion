"use client";

import { useState } from "react";
import { ShowcaseIcon, type ShowcaseIconName } from "@/app/components/showcase/icons";

type FooterLink = {
  label: string;
  href: string;
  icon: ShowcaseIconName;
};

export function Footer({
  youtubeUrl,
  robloxUrl,
  emailUrl,
}: {
  youtubeUrl: string;
  robloxUrl: string;
  emailUrl: string;
}) {
  const [discordLabel, setDiscordLabel] = useState("Discord");

  const links: FooterLink[] = [
    { label: "YouTube", href: youtubeUrl, icon: "youtube" },
    { label: "Roblox", href: robloxUrl, icon: "roblox" },
    { label: "Email", href: emailUrl, icon: "email" },
  ];

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText("@eurydion");
      setDiscordLabel("Copied @eurydion");
      window.setTimeout(() => setDiscordLabel("Discord"), 1800);
    } catch (error) {
      console.error("Discord handle copy failed", error);
      setDiscordLabel("Copy failed");
    }
  }

  return (
    <footer className="border-t-4 border-ink bg-gray-light px-4 py-12 sm:px-6 lg:px-8" id="connect">
      <div className="mx-auto max-w-[1480px]">
        <div className="section-heading mb-8">
          <div>
            <span className="speech-label">Open channel</span>
            <h2>CONNECT</h2>
          </div>
          <p>Play the work, watch the process, or send a direct message.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.slice(0, 2).map((link) => (
            <a className="connect-button" href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              <ShowcaseIcon className="size-6" name={link.icon} />
              {link.label}
            </a>
          ))}
          <button className="connect-button" type="button" onClick={copyDiscord}>
            <ShowcaseIcon className="size-6" name="discord" />
            {discordLabel}
          </button>
          <a className="connect-button" href={links[2].href}>
            <ShowcaseIcon className="size-6" name="email" />
            Email
          </a>
        </div>
        <p className="mt-10 border-t-2 border-ink pt-5 text-xs font-bold">
          © {new Date().getFullYear()} Eurydion. Built with Next.js and live Roblox data.
        </p>
      </div>
    </footer>
  );
}
