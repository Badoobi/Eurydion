// Central content for the portfolio. Edit here to update the site.

// Community icons. Drop the image in src/assets/ and import it here.
import kolehiDevsIcon from "./assets/Kolehidevs.png";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "products", label: "Products" },
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
  { value: "6 Years", label: "Developing Experience" },
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
  {
    slug: "commission-blockjump",
    name: "Block Jump [Commission]",
    description: "A fast-paced Roblox survival game where the floor is lava and the sky is falling. Outrun the rising tide, dodge the crashing blocks, and be the last one standing.",
    tag: "Roblox Experience",
    year: "2026",
    role: "Commissioned Developer",
    cover: "projects/Block Jump.png", // e.g. "/projects/aether-cover.jpg"
    content: [
      {
        type: "paragraph",
        text: "Block Jump is a round-based multiplayer survival game built in Roblox. Players are dropped onto an arena where lava steadily rises from below while randomized tetris-block patterns slam down from above. Stay alive, reach the finish line, and earn coins and wins to climb the leaderboard.",
      },
      { type: "heading", text: "The Theme" },
      {
        type: "paragraph",
        text: "Survive the floor, fear the sky.",
      },
      { type: "heading", text: "How it works" },
      {
        type: "list",
        items: [
          "Join the Round - Every match kicks off after a short intermission, dropping all participants onto the arena floor.",
          "Watch the Sky - Randomized block patterns telegraph their landing zone before crashing down, crushing anyone caught underneath.",
          "Outrun the Lava - Lava rises across the map, shrinking the safe space and forcing constant movement toward the finish line.",
          "Survive and Score - Stay alive to earn coins, and survive the round to bank a win, all saved through persistent player data.",
          "Spectate the Chaos - Eliminated players can spectate survivors with a cinematic depth-of-field camera until the next round begins.",
          "Shop for Boosts - Spend Robux on coin bundles and items through an in-game shop powered by developer products.",
        ],
      },
      { type: "image", src: "/projects/Block Jump2.png", caption: "Spectator Mode View" },
      { type: "heading", text: "Stacks" },
      {
        type: "list",
        items: [
          "Luau OOP - Core gameplay scripting across server and client.",
          "Building - Engine, world building, and physics simulation.",
          "DataStoreService - Persistent saving of player coins and wins.",
          "RemoteEvents - Client-server communication for status, rounds, and screen shake.",
          "TweenService - Smooth animations for falling blocks, camera, and effects.",
          "Marketstore Service  - Robux-based monetization powering the in-game shop.",
          "Leaderboards - Persistent player stats and wins displayed on a leaderboard.",
          "Daily Rewards - A daily login system that rewards players with coins and boosts.",
        ],
      },

      {
        type: "quote",
        text: "Developed Solo | Full-stack Roblox gameplay, data persistence, and monetization systems built from scratch.",
      },
    ],
  },
  {
    slug: "gamejam-belowus",
    name: "Below Us",
    description: "You awaken in a cave, shrouded in darkness; Even when standing on solid ground, the place feels unfamiliar and alienating.",
    tag: "Roblox Game Jam 2026",
    year: "2026",
    role: "Lead Developer",
    cover: "/projects/BelowUsThumb.png", // e.g. "/projects/aether-cover.jpg"
    content: [
      {
        type: "paragraph",
        text: "A psychological horror adventure game where you escape the monster by climbing up, facing your fears, and navigating through a series of terrifying environments.",
      },
      { type: "heading", text: "The Theme" },
      {
        type: "paragraph",
        text: "Height.",
      },
      { type: "image", src: "/projects/BelowusGame.png", caption: "Inside the Game" },

      { type: "heading", text: "How it works" },
      {
        type: "list",
        items: [
          "Navigate thru the cave - Move carefully through the dark and unfamiliar environment.",
          "Avoid traps and obstacles - The cave is filled with hazards that can impede your progress.",
          "Uncover the Truth - Investigate the cave, piece together clues, and discover what lurks in the darkness.",
          "Complete the Objective - Each area has its own challenge that must be overcome before you can continue.",
          "Return to Safety - Once the area is completed, find your way back to a safe zone.",
          "Escape the Entity.",
        ],
      },
      { type: "image", src: "/projects/BelowUsThumb2.png", caption: "Inside the Game" },

      {
        type: "quote",
        text: "Developed with an excellent team.",
      },
       {
        type: "list",
        items: [
          "Lead Developer - @Eurydion",
          "Creative Director - @Buttons_LexiannePNAS",
          "Map Design and Modeller - @AngkolDimo & @pawensi",
          "UI Design - @mulanjam",
        ],
      },
    ],
  },
  {
    slug: "devilsburger",
    name: "Devil's Burger",
    description: "[IN DEVELOPMENT]",
    tag: "KolehiDevs Productiion",
    year: "2026",
    role: "Lead Developer",
    cover: "/projects/DevilsBurger.png", // e.g. "/projects/aether-cover.jpg"
    content: [
      {
        type: "paragraph",
        text: "A psychological horror game where you are [redacted] ",
      },
      {
        type: "quote",
        text: "In Development. For Inquiries, contact me on Discord.",
      },
      {
        type: "list",
        items: [
          "Lead Developer - @Eurydion",
          "Creative Director - @Buttons_LexiannePNAS",
          "Map Design and Modeller - @AngkolDimo & @pawensi",
          "UI Design - @mulanjam",
        ],
      },
    ],
  },
  {
    slug: "myportfolio",
    name: "Personal Portfolio",
    description: "Dynamic and interactive showcase of my projects and skills through website.",
    tag: "Website Development",
    year: "2026",
    role: "Lead Developer",
    cover: "/projects/Portfolio Website.png", // e.g. "/projects/aether-cover.jpg"
    content: [
      {
        type: "paragraph",
        text: "Clean and modern design with a focus on usability and aesthetics.",
      },
      { type: "heading", text: "Purpose" },
      {
        type: "paragraph",
        text: "Showcasing my projects and skills in an engaging and interactive manner.",
      },
      { type: "heading", text: "How it works" },
      {
        type: "list",
        items: [
          "ReactJS - Dynamic and interactive user interface built with ReactJS.",
          "TailwindCSS - Clean and modern design with a focus on usability and aesthetics.",
          "Responsive Design - Optimized for all devices and screen sizes.",
          "Vite - Fast and efficient build tool for modern web development.",
          "Github Pages - Hosting and deployment of the website on Github Pages.",
        ],
      },
      { type: "image", src: "/projects/Portfolio Website2.png", caption: "Content of Projects" },

      {
        type: "quote",
        text: "Developed with love, Contact me if you want to hire me for your website.",
      },
    ],
  },
];

/** Look up a single project by its slug. Returns undefined if not found. */
export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

/*
 * PRODUCTS
 * --------
 * Ready-made items / assets for sale. Displayed in a compact grid, and each
 * one opens its own page at /products/<slug> (same write-up system as projects).
 * How to add / edit a product:
 *
 * 1. Copy one of the objects below and change the fields.
 * 2. `slug` is the URL — it becomes /products/<slug>. Keep it lowercase
 *    with dashes and unique.
 * 3. Images: drop your image files into the `public/projects/` folder, then
 *    reference them with an absolute path, e.g. "/projects/my-product.jpg".
 *    Leave `cover` as null to show the default pattern thumbnail.
 * 4. `price` is free-form text, e.g. "R$ 500", "$10", or "Free".
 * 5. `buyUrl` (optional) adds a "Get it" button on the product page that opens
 *    in a new tab. Leave it as null to hide the button.
 * 6. `content` is the write-up shown on the product page. It uses the same
 *    block types as projects (heading, paragraph, image, youtube, list, quote).
 */
export const PRODUCTS = [
  {
    slug: "advanced-spectating-system",
    name: "Advanced Spectating System",
    description: "(DRAG AND DROP!) Smooth Spectating System ",
    tag: "Roblox System",
    price: "5$",
    cover: "/products/Advanced Spectating System.png",
    buyUrl: null,
    content: [
      {
        type: "paragraph",
        text: "A pre-built spectating camera system for Roblox games. Players can spectate other players smoothly, with a clean UI and scalable design.",
      },
      { type: "heading", text: "What's included" },
      {
        type: "list",
        items: [
          "Pre-Built Spectating Camera Script",
          "Clean UI and Scalable",
        ],
      },
      { type: "youtube", src: "https://www.youtube.com/shorts/rCwmCnaUsLo", caption: "Showcase Video" },

      {
        type: "quote",
        text: "Contact my discord if you're interested.",
      },
    ],
  },
];

/** Look up a single product by its slug. Returns undefined if not found. */
export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
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
      "Eury is a very nice guy he has finished my commision in under 24 hours and the process was smooth and i was satisified with my product",
    name: "Tapzy",
    role: "Client · Undisclosed",
    rating: 5,
  },
  
];

export const CONTACT = {
  discord: "@radioheadslover69",
};
