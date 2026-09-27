"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "eurydion-sound-muted";
const INTERACTIVE_SELECTOR = "a, button, summary, [role='button']";

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10h4l5-4v12l-5-4H4z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      {muted ? (
        <path d="m16 9 5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      ) : (
        <>
          <path d="M16 9.5a4 4 0 0 1 0 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M18.8 7a7.5 7.5 0 0 1 0 10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function playClick(context: AudioContext) {
  const now = context.currentTime;
  const gain = context.createGain();
  const oscillator = context.createOscillator();

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.025, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(760, now);
  oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.09);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.1);
}

export function InteractionSound() {
  const contextRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMuted(window.localStorage.getItem(STORAGE_KEY) === "true");
    });

    const ensureContext = async () => {
      if (!("AudioContext" in window)) return null;
      contextRef.current ??= new window.AudioContext();
      if (contextRef.current.state === "suspended") await contextRef.current.resume();
      return contextRef.current;
    };

    const onClick = async (event: MouseEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (!target?.closest(INTERACTIVE_SELECTOR)) return;
      if (target.closest("[data-sound-ignore='true']")) return;
      if (window.localStorage.getItem(STORAGE_KEY) === "true") return;

      const context = await ensureContext();
      if (context?.state === "running") playClick(context);
    };

    const arm = () => {
      void ensureContext();
    };

    window.addEventListener("pointerdown", arm, { passive: true, once: true });
    document.addEventListener("click", onClick, true);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  function toggleMuted() {
    setMuted((current) => {
      const next = !current;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <button
      type="button"
      className="sound-toggle"
      data-sound-ignore="true"
      onClick={toggleMuted}
      aria-pressed={!muted}
      aria-label={muted ? "Enable interface sounds" : "Mute interface sounds"}
    >
      <SoundIcon muted={muted} />
      <span>{muted ? "Sound off" : "Sound on"}</span>
    </button>
  );
}
