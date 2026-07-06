import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../lib/smoothScroll";

export default function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
    setTimeout(() => scrollToTop(true), 80);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 pt-28 sm:px-8 md:px-10 md:pt-24">
      <p className="font-mono text-xs tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
        404
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Hey, this area does not exist. Go back!
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
        The page you're looking for isn't here — it may have moved, or the link
        might be wrong.
      </p>
      <button
        type="button"
        onClick={goHome}
        className="group mt-8 inline-flex items-center gap-2 border-b border-neutral-300 pb-1 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-neutral-100"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          ←
        </span>
        Back home
      </button>
    </div>
  );
}
