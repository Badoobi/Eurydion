"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "summary",
  "[role='button']",
  "[data-cursor-label]",
].join(",");

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cursor || !dot || !finePointer.matches || reducedMotion.matches) return;

    document.documentElement.classList.add("cursor-enabled");

    let frame = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const animate = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    const updateTarget = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("is-visible");
      dot.classList.add("is-visible");
    };

    const updateInteractiveState = (event: PointerEvent) => {
      const target = event.target instanceof HTMLElement
        ? event.target.closest<HTMLElement>(INTERACTIVE_SELECTOR)
        : null;
      const label = target?.dataset.cursorLabel ?? "";

      cursor.classList.toggle("is-interactive", Boolean(target));
      cursor.classList.toggle("has-label", Boolean(label));
      cursor.dataset.label = label;
    };

    const hide = () => {
      cursor.classList.remove("is-visible");
      dot.classList.remove("is-visible");
    };

    const press = () => cursor.classList.add("is-pressed");
    const release = () => cursor.classList.remove("is-pressed");

    frame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", updateTarget, { passive: true });
    document.addEventListener("pointerover", updateInteractiveState, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      document.documentElement.classList.remove("cursor-enabled");
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updateTarget);
      document.removeEventListener("pointerover", updateInteractiveState);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <span ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
