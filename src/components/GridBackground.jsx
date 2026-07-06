import { useEffect, useRef } from "react";

/**
 * Faint interactive dot-grid rendered on a canvas. Dots near the cursor
 * brighten and grow slightly, giving a subtle reaction to movement.
 * Purely decorative — kept low-contrast so it never competes with content.
 */
export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = 34; // spacing between dots
    const BASE_R = 1; // base dot radius
    const RADIUS = 150; // cursor influence radius

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Target + eased cursor position (starts off-screen)
    const pointer = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }

    let rafId;
    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Ease the cursor for smooth reaction
      eased.x += (pointer.x - eased.x) * 0.12;
      eased.y += (pointer.y - eased.y) * 0.12;

      const dark = isDark();
      const baseAlpha = dark ? 0.14 : 0.1;
      const activeAlpha = dark ? 0.55 : 0.4;
      const rgb = dark ? "255,255,255" : "0,0,0";

      for (let x = GAP; x < width; x += GAP) {
        for (let y = GAP; y < height; y += GAP) {
          const dx = x - eased.x;
          const dy = y - eased.y;
          const dist = Math.hypot(dx, dy);

          let alpha = baseAlpha;
          let r = BASE_R;
          if (dist < RADIUS) {
            const t = 1 - dist / RADIUS; // 0..1
            alpha = baseAlpha + (activeAlpha - baseAlpha) * t;
            r = BASE_R + t * 1.4;
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgb},${alpha})`;
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    function onPointerMove(e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }
    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    resize();
    window.addEventListener("resize", resize);

    if (prefersReduced) {
      // Draw a single static frame, no cursor interaction
      draw();
      cancelAnimationFrame(rafId);
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
