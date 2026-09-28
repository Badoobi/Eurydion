"use client";

import { useEffect, useRef, useState } from "react";
import { formatCompactNumber } from "@/lib/creator-data";

export function CountUp({
  value,
  format = "compact",
  suffix = "",
}: {
  value: number;
  format?: "compact" | "number";
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const target = element;

    let frame = 0;
    let initialFrame = 0;
    let started = false;

    const stopListening = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    const start = () => {
      if (started) return;
      started = true;
      stopListening();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplayValue(value);
        return;
      }

      const startedAt = performance.now();
      const duration = 900;
      const tick = (time: number) => {
        const progress = Math.min((time - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.round(value * eased));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };

      frame = window.requestAnimationFrame(tick);
    };

    function check() {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) start();
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    initialFrame = window.requestAnimationFrame(check);

    return () => {
      stopListening();
      window.cancelAnimationFrame(initialFrame);
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  const formatted = format === "compact"
    ? formatCompactNumber(displayValue)
    : new Intl.NumberFormat("en").format(displayValue);

  return <span ref={ref}>{formatted}{suffix}</span>;
}
