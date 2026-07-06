import { useState } from "react";
import { CONTACT } from "../../data";

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — value is still visible to copy manually */
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-t border-neutral-200 py-5 dark:border-neutral-800">
      <div>
        <div className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          {label}
        </div>
        <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-24">

      <h2 className="reveal mt-6 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl">
        Let&rsquo;s build something together.
      </h2>

      <p className="reveal mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
        Have an idea, a system to scale, or a project that needs a reliable
        developer? Reach out — I reply fast.
      </p>

      <div className="reveal mt-12 border-b border-neutral-200 dark:border-neutral-800">
        <CopyField label="Discord" value={CONTACT.discord} />
      </div>

      <p className="reveal mt-16 font-mono text-xs text-neutral-400 dark:text-neutral-600">
        Eurydion · Roblox Full-Stack Developer · © 2026
      </p>
    </section>
  );
}
