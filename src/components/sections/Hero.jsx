import { METRICS } from "../../data";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen flex-col justify-center border-b border-neutral-200 py-24 dark:border-neutral-800"
    >
      <p className="reveal font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase dark:text-neutral-500">
        Roblox Full-Stack Developer
      </p>

      <h1 className="reveal mt-6 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
        Eurydion
      </h1>

      <p className="reveal mt-8 max-w-2xl text-xl font-medium text-neutral-700 sm:text-2xl dark:text-neutral-300">
        Roblox full-stack game and web developer with over 6 years of scripting
        experience.
      </p>

      <p className="reveal mt-5 max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
        Building scalable and future-proof systems that let millions of users
        play without a problem. I love turning wild ideas into realities. Hire me to create your next Roblox game or website.
      </p>

      <div className="reveal mt-10">
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 border border-neutral-900 px-6 py-3 text-sm font-semibold tracking-wide transition-colors hover:bg-neutral-900 hover:text-white dark:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-950"
        >
          Get in touch
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>

      {/* Metrics */}
      <dl className="reveal mt-20 grid grid-cols-2 border-t border-l border-neutral-200 lg:grid-cols-4 dark:border-neutral-800">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="border-r border-b border-neutral-200 px-4 py-4 dark:border-neutral-800"
          >
            <dt className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              {m.value}
            </dt>
            <dd className="mt-2 text-xs leading-snug text-neutral-500 dark:text-neutral-400">
              {m.label}
            </dd>
          </div>
        ))}
      </dl>

      <p className="reveal mt-6 font-mono text-xs text-neutral-400 dark:text-neutral-600">
        0 scam history · trusted across the RoDevs community. | 2012 Roblox Account
      </p>
    </section>
  );
}
