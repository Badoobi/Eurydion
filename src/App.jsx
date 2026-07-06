import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import GridBackground from "./components/GridBackground";
import Sidebar from "./components/Sidebar";
import Character from "./components/Character";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import { useTheme } from "./hooks/useTheme";
import { setLenis } from "./lib/smoothScroll";

export default function App() {
  const { theme, toggle } = useTheme();
  const [loading, setLoading] = useState(true);

  // Smooth (momentum) scrolling — disabled for reduced-motion users.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}

      <GridBackground />
      <Sidebar theme={theme} toggle={toggle} />
      <Character />

      <main className="md:ml-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
