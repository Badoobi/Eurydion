const VSCODE_URL =
  "https://code.visualstudio.com/?wt.mc_id=studentamb_514120";

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4l-3 16"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Tutorials() {
  return (
    <section
      id="tutorials"
      className="border-b border-neutral-200 py-24 dark:border-neutral-800"
    >
      <div className="reveal flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
            From YouTube
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Tutorials
          </h2>
        </div>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
          00
        </span>
      </div>

      <div className="reveal relative mt-10 overflow-hidden border border-dashed border-neutral-300 px-6 py-12 sm:px-10 dark:border-neutral-700">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-35 dark:opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 14px)",
            color: "rgba(120,120,120,0.16)",
          }}
        />

        <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <span className="inline-flex border border-neutral-300 px-2.5 py-1 font-mono text-[10px] tracking-widest text-neutral-500 uppercase dark:border-neutral-700 dark:text-neutral-400">
              Coming soon
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">
              Practical Roblox tutorials are in the works.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Development breakdowns, systems, and techniques will appear here soon.
            </p>
          </div>

          <a
            href={VSCODE_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 border border-neutral-900 bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-neutral-900 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-transparent dark:hover:text-neutral-100"
          >
            <CodeIcon />
            Get Visual Studio Code
            <span
              aria-hidden="true"
              className="text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
