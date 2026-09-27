import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/app/components/brand-mark";
import { CopyDiscord } from "@/app/components/copy-discord";
import { siteLinks } from "@/lib/site-config";

export type IconName = "arrow" | "discord" | "menu" | "play" | "roblox" | "youtube";

export function Icon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
    discord: (
      <>
        <path d="M8 8.2a11.4 11.4 0 0 1 8 0l1.4 7.1c-1.9 1.4-3.6 2-5.4 2-1.8 0-3.5-.6-5.4-2L8 8.2Z" />
        <path d="M9.7 13h.1m4.4 0h.1" />
      </>
    ),
    menu: <path d="M4 8h16M4 16h16" />,
    play: <path d="m9.5 7.6 7 4.4-7 4.4V7.6Z" fill="currentColor" stroke="none" />,
    roblox: (
      <>
        <path d="m8.7 3.9 11.1 3-3 11.2-11.2-3Z" />
        <path d="m11.2 9.1 4 1.1-1.1 4-4-1.1Z" />
      </>
    ),
    youtube: (
      <>
        <rect x="3.5" y="6.5" width="17" height="11" rx="3.2" />
        <path d="m10.2 9.4 5 2.6-5 2.6V9.4Z" fill="currentColor" stroke="none" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export function SiteHeader({ current }: { current: "home" | "works" }) {
  return (
    <header className="site-header" data-hero-item>
      <Link className="wordmark" href="/" aria-label="Eurydion home">
        <BrandMark />
        <span>Eurydion</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link className={current === "home" ? "is-current" : ""} href="/">Home</Link>
        <Link className={current === "works" ? "is-current" : ""} href="/works">Work</Link>
        <a href={current === "home" ? "#about" : "/#about"}>About</a>
      </nav>
      <a className="header-contact" href="#contact">Connect</a>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">
          <Icon name="menu" />
        </summary>
        <nav aria-label="Mobile navigation">
          <Link href="/">Home</Link>
          <Link href="/works">Work</Link>
          <a href={current === "home" ? "#about" : "/#about"}>About</a>
          <a href="#contact">Contact</a>
        </nav>
      </details>
    </header>
  );
}

export function PrimaryAction({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="primary-action" href={href}>
      <span>{children}</span>
      <Icon name="arrow" />
    </Link>
  );
}

export function TextAction({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className = "text-action";
  const content = (
    <>
      <span>{children}</span>
      <Icon name="arrow" />
    </>
  );

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <Link className={className} href={href}>{content}</Link>;
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact" data-reveal>
      <Link className="footer-brand" href="/" data-reveal-item>
        <BrandMark />
        <span>Eurydion</span>
      </Link>
      <nav aria-label="Footer navigation" data-reveal-item>
        <Link href="/">Home</Link>
        <Link href="/works">Work</Link>
        <a href={siteLinks.youtube} target="_blank" rel="noreferrer">YouTube</a>
        <a href={siteLinks.robloxProfile} target="_blank" rel="noreferrer">Roblox</a>
      </nav>
      <div className="footer-contact" data-reveal-item>
        <CopyDiscord />
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
