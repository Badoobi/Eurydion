import { useEffect, useState, useCallback } from "react";
import { flushSync } from "react-dom";

/** Builds a 5-pointed star clip-path polygon centered at (cx, cy). */
function starClip(cx, cy, radius) {
  const spikes = 5;
  // Higher inner ratio = shorter spikes = softer, curvier star.
  const inner = radius * 0.68;
  const step = Math.PI / spikes;
  let rot = -Math.PI / 2; // start pointing up
  const points = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? radius : inner;
    const x = cx + Math.cos(rot) * r;
    const y = cy + Math.sin(rot) * r;
    points.push(`${x}px ${y}px`);
    rot += step;
  }
  return `polygon(${points.join(", ")})`;
}

/**
 * Class-based theme toggle synced with localStorage and the initial
 * inline script in index.html (which prevents a flash of wrong theme).
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore storage errors */
    }
  }, [theme]);

  const toggle = useCallback((event) => {
    const flip = () =>
      setTheme((t) => (t === "dark" ? "light" : "dark"));

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fall back to a plain toggle without the animated reveal.
    if (!document.startViewTransition || reduce) {
      flip();
      return;
    }

    // Origin of the star = the click point (fallback: screen center).
    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    const maxRadius = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y)
    );
    // Over-scale so the star's concave gaps clear the screen edges.
    const endRadius = maxRadius * 2;

    const transition = document.startViewTransition(() => {
      flushSync(flip);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [starClip(x, y, 0), starClip(x, y, endRadius)],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }, []);

  return { theme, toggle };
}
