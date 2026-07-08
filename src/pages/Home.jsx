import { useScrollReveal } from "../hooks/useScrollReveal";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Products from "../components/sections/Products";
import Tutorials from "../components/sections/Tutorials";
import Testimonials from "../components/sections/Testimonials";
import Communities from "../components/sections/Communities";
import Contact from "../components/sections/Contact";

export default function Home() {
  const revealRef = useScrollReveal();

  return (
    <div
      ref={revealRef}
      className="mx-auto max-w-5xl px-6 pt-24 sm:px-8 md:px-10 md:pt-0"
    >
      <Hero />
      <Projects />
      <Products />
      <Tutorials />
      <Testimonials />
      <Communities />
      <Contact />
    </div>
  );
}
