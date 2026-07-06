import { COMMUNITIES } from "../../data";

export default function Communities() {
  return (
    <section
      id="communities"
      className="border-b border-neutral-200 py-5 dark:border-neutral-800"
    >
      <div className="reveal flex items-end justify-between">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Communities
        </h2>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
          {String(COMMUNITIES.length).padStart(2, "0")}
        </span>
      </div>

      <div className="reveal mt-12 flex flex-wrap gap-8">
        {COMMUNITIES.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            title={c.name}
            className="group flex flex-col items-center gap-3"
          >
            <span className="block overflow-hidden rounded-2xl border border-neutral-200 transition-colors duration-300 group-hover:border-neutral-400 dark:border-neutral-800 dark:group-hover:border-neutral-600">
              <img
                src={c.icon}
                alt={`${c.name} community icon`}
                className="h-24 w-24 object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
            </span>
            <span className="text-sm font-medium text-neutral-600 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100">
              {c.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
