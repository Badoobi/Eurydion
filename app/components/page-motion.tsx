"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

export function PageMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.01,
      },
    );

    const prepare = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);

        element.classList.add("reveal-managed");

        if (reducedMotion.matches) {
          element.classList.add("is-revealed");
          return;
        }

        observer.observe(element);
      });
    };

    let prepareTimer = window.setTimeout(() => prepare(document), 0);
    const mutationObserver = new MutationObserver(() => {
      window.clearTimeout(prepareTimer);
      prepareTimer = window.setTimeout(() => prepare(document), 80);
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(prepareTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
