import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Copy } from "lucide-react";
import { scrollToTop } from "../lib/smoothScroll";
import { CONTACT } from "../data";
import {
  YoutubeIcon,
  InstagramIcon,
  DiscordIcon,
} from "../components/SocialIcons";

function LinkCard({ icon: Icon, label, handle, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center gap-4 rounded-2xl border border-neutral-200 px-5 py-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <Icon className="size-5 shrink-0 text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100" />
      <div className="min-w-0 text-left">
        <div className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          {label}
        </div>
        <div className="truncate text-base font-semibold tracking-tight">
          {handle}
        </div>
      </div>
      <span
        aria-hidden="true"
        className="ml-auto text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 dark:text-neutral-600"
      >
        →
      </span>
    </a>
  );
}

function DiscordCard({ handle }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — handle is still visible to copy manually */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full items-center gap-4 rounded-2xl border border-neutral-200 px-5 py-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <DiscordIcon className="size-5 shrink-0 text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100" />
      <div className="min-w-0 text-left">
        <div className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          Discord
        </div>
        <div className="truncate text-base font-semibold tracking-tight">
          {handle}
        </div>
      </div>
      <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 dark:text-neutral-500">
        {copied ? (
          <>
            <Check className="size-3.5" /> Copied
          </>
        ) : (
          <>
            <Copy className="size-3.5" /> Copy
          </>
        )}
      </span>
    </button>
  );
}

export default function Links() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
    setTimeout(() => scrollToTop(true), 80);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Eurydion
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        Find me across the internet.
      </p>

      <div className="mt-10 flex w-full flex-col gap-3">
        <LinkCard
          icon={YoutubeIcon}
          label="YouTube"
          handle={CONTACT.youtube}
          href={CONTACT.youtubeUrl}
        />
        <DiscordCard handle={`@${CONTACT.discord}`} />
        <LinkCard
          icon={InstagramIcon}
          label="Instagram"
          handle={CONTACT.instagram}
          href={CONTACT.instagramUrl}
        />
      </div>

      <button
        type="button"
        onClick={goHome}
        className="group mt-12 inline-flex items-center gap-2 border-b border-neutral-300 pb-1 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-neutral-100"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          ←
        </span>
        Back to home
      </button>
    </div>
  );
}
