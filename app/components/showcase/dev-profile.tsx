const skills = [
  "Luau",
  "Roblox Studio",
  "Rojo",
  "Git",
  "Blender",
  "Systems design",
  "World building",
  "Video editing",
];

const milestones = [
  {
    title: "Almost 20 Million",
    copy: "Game visits across multiple games I've worked on",
  },
  {
    title: "High Approval Rate 97%",
    copy: "Quality works that leads to high approval rates.",
  },
  {
    title: "Now",
    copy: "Building Roblox worlds, short experiments, and films about the process.",
  },
];

export function DevProfile() {
  return (
    <section className="section-shell section-rule scroll-mt-16" id="about" aria-labelledby="about-title">
      <div className="section-heading" data-reveal>
        <div>
          <span className="speech-label">Character sheet</span>
          <h2 id="about-title">DEV BACKGROUND</h2>
        </div>
        <p>Who am I? what I do, and why it matters.</p>
      </div>

      <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="comic-card halftone-light bg-paper p-6 sm:p-8" data-reveal>
          <span className="sticker inline-block -rotate-2">PLAYER ONE</span>
          <h3 className="mt-7 font-display text-6xl leading-none tracking-wide">EURYDION</h3>
          <p className="mt-5 max-w-xl text-base font-medium leading-7">
            Roblox developer and filmmaker focused on playable systems, authored worlds,
            and clear process storytelling.
          </p>
          <dl className="mt-7 grid grid-cols-2 border-[3px] border-ink bg-paper">
            <div className="border-r-[3px] border-ink p-4">
              <dt className="text-xs font-black uppercase">Experience</dt>
              <dd className="mt-1 font-display text-4xl tracking-wide">6+ years</dd>
            </div>
            <div className="p-4">
              <dt className="text-xs font-black uppercase">Role</dt>
              <dd className="mt-1 text-sm font-black">Scripter / Builder / Filmmaker</dd>
            </div>
          </dl>
          <div className="mt-7 flex flex-wrap gap-2" aria-label="Skills">
            {skills.map((skill, index) => (
              <span className={`skill-sticker ${index % 3 === 1 ? "rotate-1" : index % 3 === 2 ? "-rotate-1" : ""}`} key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </article>

        <article className="comic-card bg-paper p-6 sm:p-8" data-reveal>
          <h3 className="font-display text-5xl tracking-wide">MILESTONES</h3>
          <ol className="mt-7 grid gap-0">
            {milestones.map((milestone, index) => (
              <li className="grid grid-cols-[56px_1fr] border-t-[3px] border-ink py-5 first:border-t-0 first:pt-0" key={milestone.title}>
                <span className="font-display text-4xl" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4 className="text-lg font-black">{milestone.title}</h4>
                  <p className="mt-1 max-w-2xl text-sm leading-6">{milestone.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}
