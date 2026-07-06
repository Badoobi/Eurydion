import { useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../../data";

function Thumbnail({ project }) {
  return (
    <div className="relative aspect-16/10 w-full overflow-hidden border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
      {project.cover ? (
        <img
          src={project.cover}
          alt=""
          className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 12px)",
            color: "rgba(120,120,120,0.18)",
          }}
        />
      )}
      <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
        {project.tag}
      </span>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col border border-neutral-200 transition-colors duration-300 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <Thumbnail project={project} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-center justify-between gap-2 text-base font-semibold tracking-tight">
          {project.name}
          <span
            aria-hidden="true"
            className="text-neutral-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-900 dark:text-neutral-700 dark:group-hover:text-neutral-100"
          >
            →
          </span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <section
      id="projects"
      className="border-b border-neutral-200 py-24 dark:border-neutral-800"
    >
      <div className="reveal flex items-end justify-between">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h2>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
          {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="reveal mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {PROJECTS.length > 3 && (
        <div className="reveal mt-10">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="group inline-flex items-center gap-2 border-b border-neutral-300 pb-1 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-neutral-100"
          >
            {expanded ? "Show less" : "View all projects"}
            <span
              aria-hidden="true"
              className={
                "transition-transform duration-300 " +
                (expanded ? "-rotate-90" : "rotate-90")
              }
            >
              →
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
