import { TESTIMONIALS } from "../../data";

function Stars({ rating = 5 }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.9l-5.8 3.05 1.1-6.47-4.7-4.58 6.5-.95L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <figure className="mr-5 flex w-75 shrink-0 flex-col justify-between border border-neutral-200 p-6 sm:w-90 dark:border-neutral-800">
      <div>
        <span
          aria-hidden="true"
          className="font-serif text-5xl leading-none text-neutral-300 dark:text-neutral-700"
        >
          &ldquo;
        </span>
        <blockquote className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {t.quote}
        </blockquote>
      </div>
      <figcaption className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <div className="text-sm font-semibold tracking-tight">{t.name}</div>
        <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
          {t.role}
        </div>
        <div className="mt-3 text-neutral-500 dark:text-neutral-400">
          <Stars rating={t.rating} />
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-b border-neutral-200 py-24 dark:border-neutral-800"
    >
      <div className="reveal flex items-end justify-between">
        <h2 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
          Testimonials &amp; Recommendations
        </h2>
      </div>

      {/* Infinite auto-scrolling carousel — hover to pause */}
      <div className="reveal marquee-group mt-12 -mr-6 overflow-hidden md:-mr-10">
        <div className="marquee-track flex w-max">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
          {/* Duplicate for a seamless loop */}
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={`dup-${t.name}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
