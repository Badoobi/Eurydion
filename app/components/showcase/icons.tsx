import type { ReactNode } from "react";

export type ShowcaseIconName =
  | "arrow"
  | "discord"
  | "email"
  | "menu"
  | "play"
  | "roblox"
  | "youtube";

export function ShowcaseIcon({
  name,
  className,
}: {
  name: ShowcaseIconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<ShowcaseIconName, ReactNode> = {
    arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
    discord: (
      <>
        <path d="M8 8.2a11.4 11.4 0 0 1 8 0l1.4 7.1c-1.9 1.4-3.6 2-5.4 2-1.8 0-3.5-.6-5.4-2L8 8.2Z" />
        <path d="M9.7 13h.1m4.4 0h.1" />
      </>
    ),
    email: (
      <>
        <rect x="3" y="5.5" width="18" height="13" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    menu: <path d="M3 7h18M3 12h18M3 17h18" />,
    play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor" stroke="none" />,
    roblox: (
      <>
        <path d="m8.7 3.9 11.1 3-3 11.2-11.2-3Z" />
        <path d="m11.2 9.1 4 1.1-1.1 4-4-1.1Z" />
      </>
    ),
    youtube: (
      <>
        <rect x="3.5" y="6.5" width="17" height="11" rx="2" />
        <path d="m10.2 9.4 5 2.6-5 2.6V9.4Z" fill="currentColor" stroke="none" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}
