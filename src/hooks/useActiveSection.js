import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data";

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * Returns the active section id.
 */
export function useActiveSection() {
  const [active, setActive] = useState(NAV_LINKS[0].id);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        // Trigger when a section occupies the middle band of the viewport
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}
