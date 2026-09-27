"use client";

import { useState } from "react";

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M7.8 8.4a11.1 11.1 0 0 1 8.4 0l1.3 6.5c-1.8 1.3-3.5 1.8-5.5 1.8-2 0-3.7-.5-5.5-1.8l1.3-6.5Z"
      />
      <circle cx="9.8" cy="12.6" r="0.9" fill="currentColor" />
      <circle cx="14.2" cy="12.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function CopyDiscord() {
  const [copied, setCopied] = useState(false);

  async function copyHandle() {
    await navigator.clipboard.writeText("@eurydion");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button className="discord-copy" type="button" onClick={copyHandle} aria-live="polite">
      <span className="discord-copy__label">
        <DiscordIcon />
        Discord
      </span>
      <span>{copied ? "Copied" : "@eurydion"}</span>
    </button>
  );
}
