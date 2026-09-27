"use client";

import { useEffect, useRef } from "react";

export function AmbientStage() {
  const lightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    const stage = light?.parentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!light || !stage || !finePointer.matches || reducedMotion.matches) {
      return;
    }

    let frame = 0;

    const moveLight = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const bounds = stage.getBoundingClientRect();
        light.style.transform = `translate3d(${event.clientX - bounds.left - 240}px, ${event.clientY - bounds.top - 240}px, 0)`;
      });
    };

    const showLight = () => light.classList.add("is-visible");
    const hideLight = () => light.classList.remove("is-visible");

    stage.addEventListener("pointermove", moveLight);
    stage.addEventListener("pointerenter", showLight);
    stage.addEventListener("pointerleave", hideLight);

    return () => {
      window.cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", moveLight);
      stage.removeEventListener("pointerenter", showLight);
      stage.removeEventListener("pointerleave", hideLight);
    };
  }, []);

  return <span ref={lightRef} className="ambient-stage" aria-hidden="true" />;
}
