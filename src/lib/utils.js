import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves a path to a file in the `public/` folder so it works both locally
 * and when the site is served from a subpath (e.g. GitHub Pages /Eurydion/).
 * Full URLs (http/https) are returned unchanged.
 */
export function asset(path) {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base + (path.startsWith("/") ? path : "/" + path);
}
