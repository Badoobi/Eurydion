import { useEffect, useState } from "react";

/**
 * Full-screen intro loader: a blank screen showing only "Eury".
 * Stays for HOLD_MS, then fades out and calls onFinish.
 * Change HOLD_MS to adjust how long it stays.
 */
const HOLD_MS = 2000; // how long "Eury" is shown
const FADE_MS = 600; // fade-out duration

export default function Loader({ onFinish }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const holdTimer = setTimeout(() => setFading(true), HOLD_MS);
    const doneTimer = setTimeout(() => onFinish(), HOLD_MS + FADE_MS);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      aria-hidden="true"
      className={
        "fixed inset-0 z-100 flex items-center justify-center bg-white transition-opacity ease-out dark:bg-neutral-950 " +
        (fading ? "opacity-0" : "opacity-100")
      }
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <span className="loader-shine text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
        Eury
      </span>
    </div>
  );
}
