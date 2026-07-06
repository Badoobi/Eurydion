import { useState } from "react";
import characterImg from "../assets/Character.png";

/**
 * Fixed mascot that peeks in from the right edge of the screen and shows a
 * random chat bubble when you hover it.
 *
 * Edit PHRASES to change what the character says.
 *
 * Layout tweaks:
 *  - image `right`  : more negative pushes more of the character off-screen
 *  - image `width`  : overall size of the character
 *  - the hotspot    : the hoverable area over the character's body
 *  - the bubble     : `right` / `bottom` position it above the head
 */
const PHRASES = [
  "Hire me please",
  "I'm kinda crazy",
  "mwehehehe",
  "Let's build something",
  "Pspsps... over here",
  "HELPPP",
  "i can do what u want",
  "perchance.."
];

export default function Character() {
  const [phrase, setPhrase] = useState(PHRASES[0]);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setPhrase((prev) => {
      if (PHRASES.length < 2) return prev;
      let next = prev;
      while (next === prev) {
        next = PHRASES[Math.floor(Math.random() * PHRASES.length)];
      }
      return next;
    });
    setHovered(true);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden lg:block">
      {/* Character image */}
      <img
        src={characterImg}
        alt=""
        aria-hidden="true"
        draggable="false"
        style={{ right: "-100px", width: "560px", bottom: "10px" }}
        className="absolute -scale-x-100 select-none drop-shadow-sm"
      />

      {/* Chat bubble */}
      <div
        style={{ right: "200px", bottom: "320px" }}
        className={
          "pointer-events-none absolute origin-bottom-right transition-all duration-200 ease-out " +
          (hovered
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-1 scale-95 opacity-0")
        }
      >
        <div className="relative rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
          {phrase}
          <span className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 border-r border-b border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900" />
        </div>
      </div>

      {/* Hover hotspot over the visible character body */}
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHovered(false)}
        onClick={() =>
          window.open(
            "https://www.roblox.com/users/31053640/profile",
            "_blank",
            "noopener,noreferrer"
          )
        }
        style={{ right: "60px", bottom: "10px", width: "280px", height: "290px" }}
        className="pointer-events-auto absolute cursor-pointer"
      />
    </div>
  );
}


