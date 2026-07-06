// Central content for the portfolio. Edit here to update the site.

// Community icons. Drop the image in src/assets/ and import it here.
import kolehiDevsIcon from "./assets/Kolehidevs.png";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

/*
 * COMMUNITIES
 * -----------
 * Each community shows its icon; clicking it opens the link in a new tab.
 * To add one:
 *   1. Put the icon image in src/assets/ and import it at the top of this file.
 *   2. Add an object below with { name, icon, url }.
 */
export const COMMUNITIES = [
  {
    name: "KolehiDevs",
    icon: kolehiDevsIcon,
    url: "https://www.roblox.com/communities/730764357/KolehiDevs",
  },
];

export const METRICS = [
  { value: "2020", label: "Developer since" },
  { value: "300+", label: "Successful commissions" },
  { value: "4.9/5", label: "10+ verified ratings · RoDevs" },
  { value: "10M+", label: "Total visits contributed" },
];

/*
 * PROJECTS
 * --------
 * How to add / edit a project:
 *
 * 1. Copy one of the objects below and change the fields.
 * 2. `slug` is the URL — it becomes /projects/<slug>. Keep it lowercase
 *    with dashes and unique.
 * 3. Images: drop your image files into the `public/projects/` folder, then
 *    reference them with an absolute path, e.g. "/projects/my-cover.jpg".
 *    Leave `cover` as null to show the default pattern thumbnail.
 * 4. `content` is your blog / write-up. It's an ordered list of blocks.
 *    Available block types:
 *      { type: "heading",   text: "A section title" }
 *      { type: "paragraph", text: "A paragraph of writing." }
 *      { type: "image",     src: "/projects/shot.jpg", caption: "Optional caption" }
 *      { type: "youtube",   src: "https://youtu.be/VIDEO_ID", caption: "Optional caption" }
 *      { type: "list",      items: ["First point", "Second point"] }
 *      { type: "quote",     text: "A highlighted callout or result." }
 *    Add as many blocks as you want, in any order.
 */
export const PROJECTS = [
  {
    slug: "gamejam-katipunan",
    name: "Katipunan",
    description: "Step onto a quiet late-night train leaving Katipunan. The city outside hums, but inside, the air is heavy with silence.",
    tag: "Game Jam 2025",
    year: "2025",
    role: "Solo Developer",
    cover: "/projects/Katipunan.png", // e.g. "/projects/aether-cover.jpg"
    content: [
      {
        type: "paragraph",
        text: "A psychological adventure where a train is trapped inside the Loop, forcing players to explore surreal stations, uncover forgotten truths, and break the cycle before reality is consumed.",
      },
      { type: "heading", text: "The Theme" },
      {
        type: "paragraph",
        text: "Take one, leave everything behind.",
      },
      // { type: "image", src: "/projects/aether-1.jpg", caption: "Hit registration debug view" },
      { type: "heading", text: "How it works" },
      {
        type: "list",
        items: [
          "Board the Train - Your journey begins aboard a train that suddenly becomes trapped within the Loop.",
          "Explore Each Station - Every stop is a unique chapter filled with distorted environments, puzzles, and mysteries.",
          "Uncover the Truth - Investigate the station, piece together memories, and discover what caused the Loop.",
          "Complete the Objective - Each station has its own challenge that must be overcome before you can continue.",
          "Return to the Train - Once the station is completed, the train departs for the next impossible destination.",
          "Escape the Loop - Finish every station and uncover the truth to finally reach the train's true destination.",
        ],
      },
      { type: "youtube", src: "https://www.youtube.com/watch?v=_Xtg81x-DUU", caption: "Showcase Video" },

      {
        type: "quote",
        text: "Developed Solo | Won 2nd Runner up amongst 10 teams.",
      },
    ],
  },
  
];

/** Look up a single project by its slug. Returns undefined if not found. */
export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

export const TESTIMONIALS = [
  {
    quote:
      "Eurydion made it well. Had fun working with him. He is very professional and knows what he is doing.",
    name: "@hanii",
    role: "Owner · That One OMORI Game",
    rating: 5,
  },
  {
    quote:
      "Clean, scalable code and clear communication. Very fast and quick delivery 10/10 would recommend.",
    name: "nikicole_zz",
    role: "Client · Glass Bridge Obby",
    rating: 5,
  },
  {
    quote:
      "Did a great job at the script i commissioned! really nice guy too and very helpful on guiding me to setup the script in my game!",
    name: "Undisclosed",
    role: "Client · Full Game Development",
    rating: 5,
  },
  {
    quote:
      "Kirby is a very nice guy he has finished my commision in under 24 hours and the process was smooth and i was satisified with my product",
    name: "Tapzy",
    role: "Client · Undisclosed",
    rating: 5,
  },
  
];

export const CONTACT = {
  discord: "@radioheadslover69",
};
