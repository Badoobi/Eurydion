"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/app/components/brand-mark";
import { ShowcaseIcon } from "@/app/components/showcase/icons";

const navItems = [
  { href: "#worlds", label: "Work" },
  { href: "#stats", label: "Stats" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          className="flex min-h-11 items-center gap-2 font-bold"
          href="#worlds"
          aria-label="Eurydion work"
        >
          <BrandMark className="h-7 w-8" />
          <span className="text-lg tracking-[-0.03em]">Eurydion</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="comic-button comic-button--black min-h-11 px-5" href="#connect">
            Connect
          </Link>
        </nav>

        <div className="mobile-nav relative md:hidden">
          <button
            className="comic-button mobile-menu-button grid size-11 cursor-pointer place-items-center p-0"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <ShowcaseIcon className="size-5" name="menu" />
          </button>
          {menuOpen ? (
            <nav
              className="absolute right-0 top-[calc(100%+10px)] grid min-w-52 border-[3px] border-ink bg-paper p-2 shadow-[5px_5px_0_#0a0a0a]"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <Link
                  className="min-h-11 border-b-2 border-ink px-3 py-3 font-bold last:border-0"
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="comic-button comic-button--black mt-2 min-h-11"
                href="#connect"
                onClick={() => setMenuOpen(false)}
              >
                Connect
              </Link>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
