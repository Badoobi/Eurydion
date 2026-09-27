"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "@/app/components/brand-mark";

const STORAGE_KEY = "eurydion-loader-seen-v3";
const EXIT_DURATION_MS = 900;
const FAILSAFE_MS = 5000;

function isImageReady(image: HTMLImageElement) {
  return image.complete && image.naturalWidth > 0;
}

function LoaderScene({ exiting = false }: { exiting?: boolean }) {
  return (
    <div
      className={`loader-scene${exiting ? " loader-scene--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Eurydion"
    >
      <div className="loader-curtain loader-curtain--left" aria-hidden="true" />
      <div className="loader-curtain loader-curtain--right" aria-hidden="true" />
      <div className="loader-scene__coordinates" aria-hidden="true">
        <span>48.8566° N</span>
        <span>WORLD / 001</span>
      </div>
      <div className="loader-aperture" aria-hidden="true">
        <span className="loader-orbit loader-orbit--outer" />
        <span className="loader-orbit loader-orbit--inner" />
        <span className="loader-sweep" />
        <BrandMark className="loader-mark" />
      </div>
      <div className="loader-title" aria-hidden="true">
        <span>Eury</span>
        <span>dion</span>
      </div>
      <p className="loader-copy">
        <span>Building worlds</span>
        <span>Threading stories</span>
        <span>Opening scene</span>
      </p>
      <span className="sr-only">Loading the latest games and videos</span>
    </div>
  );
}

export function SiteLoader() {
  const [phase, setPhase] = useState<"visible" | "exit" | "hidden">("visible");

  useEffect(() => {
    document.documentElement.dataset.pageReady = "false";

    if (window.sessionStorage.getItem(STORAGE_KEY) === "true") {
      const skipFrame = window.requestAnimationFrame(() => {
        document.documentElement.dataset.pageReady = "true";
        setPhase("hidden");
      });
      return () => window.cancelAnimationFrame(skipFrame);
    }

    let cancelled = false;
    let exitTimer = 0;
    let failSafeTimer = 0;
    let frame = 0;

    const finish = () => {
      if (cancelled) return;

      window.sessionStorage.setItem(STORAGE_KEY, "true");
      setPhase((current) => (current === "visible" ? "exit" : current));
      exitTimer = window.setTimeout(() => {
        if (!cancelled) {
          document.documentElement.dataset.pageReady = "true";
          setPhase("hidden");
        }
      }, EXIT_DURATION_MS);
    };

    const ready = () => {
      if (document.readyState !== "complete") return false;

      const criticalImages = Array.from(
        document.querySelectorAll<HTMLImageElement>('img[data-critical-image="true"]'),
      );

      return criticalImages.length === 0 || criticalImages.every(isImageReady);
    };

    const check = () => {
      if (ready()) finish();
    };

    window.addEventListener("load", check);

    frame = window.requestAnimationFrame(() => {
      const criticalImages = Array.from(
        document.querySelectorAll<HTMLImageElement>('img[data-critical-image="true"]'),
      );

      criticalImages.forEach((image) => {
        if (isImageReady(image)) return;
        image.addEventListener("load", check, { once: true });
        image.addEventListener("error", check, { once: true });
      });

      check();
    });

    failSafeTimer = window.setTimeout(finish, FAILSAFE_MS);

    return () => {
      cancelled = true;
      document.documentElement.dataset.pageReady = "true";
      window.removeEventListener("load", check);
      window.clearTimeout(exitTimer);
      window.clearTimeout(failSafeTimer);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (phase === "hidden") return null;

  return <LoaderScene exiting={phase === "exit"} />;
}

export { LoaderScene };
