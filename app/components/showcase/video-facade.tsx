"use client";

import Image from "next/image";
import { useState } from "react";
import { ShowcaseIcon } from "@/app/components/showcase/icons";

export function VideoFacade({
  videoId,
  title,
  thumbnailUrl,
  vertical = false,
  priority = false,
}: {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  vertical?: boolean;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 size-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      className="comic-media group absolute inset-0 size-full cursor-pointer"
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
    >
      <Image
        src={thumbnailUrl}
        alt={`${title} video thumbnail`}
        fill
        priority={priority}
        sizes={vertical ? "(max-width: 720px) 74vw, 280px" : "(max-width: 720px) 100vw, 50vw"}
        className="object-cover"
      />
      <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center border-[3px] border-ink bg-paper transition-transform duration-150 group-active:scale-95">
        <ShowcaseIcon className="size-7" name="play" />
      </span>
    </button>
  );
}
