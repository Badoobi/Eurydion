import { useState } from "react";
import { CONTACT } from "../../data";
import {
  InstagramIcon,
  YoutubeIcon,
  DiscordIcon,
  MailIcon,
} from "../SocialIcons";

function Card({ icon: Icon, label, value, action }) {
  return (
    <div className="flex flex-col items-start rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">
      <Icon className="size-4 text-neutral-400 dark:text-neutral-500" />
      <div className="mt-3 font-mono text-[10px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
        {label}
      </div>
      <div className="mt-0.5 w-full truncate text-sm font-semibold tracking-tight">
        {value}
      </div>
      <div className="mt-3">{action}</div>
    </div>
  );
}

const pillClass =
  "inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-medium text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100";

function CopyButton({ value }) {
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
    <button type="button" onClick={copy} className={pillClass}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-14">

      <h2 className="reveal  max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl">
        Let&rsquo;s build something together.
      </h2>

      <p className="reveal mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
        Have an idea, a system to scale, or a project that needs a reliable
        developer? Reach out — I reply fast.
      </p>

      <div className="reveal mt-12 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          icon={DiscordIcon}
          label="Discord"
          value={CONTACT.discord}
          action={<CopyButton value={CONTACT.discord} />}
        />
        <Card
          icon={MailIcon}
          label="Email"
          value={CONTACT.email}
          action={<CopyButton value={CONTACT.email} />}
        />
        <Card
          icon={InstagramIcon}
          label="Instagram"
          value={CONTACT.instagram}
          action={
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={pillClass}
            >
              Follow
            </a>
          }
        />
        <Card
          icon={YoutubeIcon}
          label="YouTube"
          value={CONTACT.youtube}
          action={
            <a
              href={CONTACT.youtubeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={pillClass}
            >
              Subscribe
            </a>
          }
        />
      </div>

      <p className="reveal mt-16 font-mono text-xs text-neutral-400 dark:text-neutral-600">
        Eurydion · Roblox Full-Stack Developer · © 2026
      </p>
    </section>
  );
}
