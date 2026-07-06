import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_LINKS, CONTACT } from "../data";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToId, scrollToTop } from "../lib/smoothScroll";

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      />
    </svg>
  );
}

// Nav icons keyed by link id. Add a matching entry here if you add a NAV_LINK.
const NAV_ICONS = {
  home: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"
      />
    </svg>
  ),
  projects: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 13h6v6h-6z"
      />
    </svg>
  ),
  products: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l9-4 9 4-9 4-9-4zM3 8v8l9 4 9-4V8M12 12v8"
      />
    </svg>
  ),
  testimonials: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5h16v11H9l-4 3v-3H4z"
      />
    </svg>
  ),
  contact: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6"
      />
    </svg>
  ),
};

function ThemeToggle({ theme, toggle, className = "" }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={
        "group inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100 " +
        className
      }
    >
      {isDark ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

function ContactBlurb() {
  return (
    <div className="border-t border-neutral-200 pt-5 dark:border-neutral-800">
      <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        For works, promotions, and collabs, contact me at:
      </p>
      <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
        Discord:<br></br> 
        <strong className="font-bold text-neutral-900 dark:text-neutral-100">
          {CONTACT.discord}
        </strong>
      </p>
    </div>
  );
}

function NavList({ active, onSelect, spacing = "space-y-1.5" }) {
  return (
    <ul className={spacing}>
      {NAV_LINKS.map((link) => {
        const isActive = active === link.id;
        const Icon = NAV_ICONS[link.id];
        return (
          <li key={link.id}>
            <a
              href={`/#${link.id}`}
              onClick={(e) => onSelect(e, link.id)}
              aria-current={isActive ? "true" : undefined}
              className={
                "group relative flex items-center gap-3 py-2.5 text-sm transition-colors " +
                (isActive
                  ? "text-neutral-900 dark:text-neutral-50"
                  : "text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100")
              }
            >
              <span
                aria-hidden="true"
                className={
                  "h-px transition-all duration-300 " +
                  (isActive
                    ? "w-6 bg-neutral-900 dark:bg-neutral-100"
                    : "w-3 bg-neutral-300 group-hover:w-5 dark:bg-neutral-700")
                }
              />
              {Icon && <Icon className="h-5 w-5 shrink-0" />}
              <span
                className={
                  "tracking-wide " +
                  (isActive ? "font-semibold" : "font-medium")
                }
              >
                {link.label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar({ theme, toggle }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection();

  // Only highlight a section when we're on the home page
  const active = location.pathname === "/" ? activeSection : null;

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSelect = (e, id) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") {
      // Go home first, then scroll to the section once it's rendered
      navigate("/");
      setTimeout(() => scrollToId(id), 80);
    } else {
      scrollToId(id);
    }
  };

  const goHome = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    setTimeout(() => scrollToTop(), 0);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed top-0 left-0 z-40 hidden h-screen w-64 flex-col justify-between border-r border-neutral-200 bg-white px-8 py-10 md:flex dark:border-neutral-800 dark:bg-neutral-950">
        <div>
          <a
            href="/"
            onClick={goHome}
            className="group inline-flex flex-col"
          >
            <span className="text-xl font-extrabold tracking-tight">
              Eurydion
            </span>
            <span className="mt-1 font-mono text-[11px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
              Roblox Developer
            </span>
          </a>

          <nav className="mt-12" aria-label="Primary">
            <NavList active={active} onSelect={handleSelect} />
          </nav>
        </div>

        <div className="space-y-6">
          <ThemeToggle theme={theme} toggle={toggle} />
          <ContactBlurb />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-neutral-200 bg-white/85 px-5 py-4 backdrop-blur-sm md:hidden dark:border-neutral-800 dark:bg-neutral-950/85">
        <a href="/" onClick={goHome} className="text-lg font-extrabold tracking-tight">
          Eurydion
        </a>
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggle={toggle} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-700 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-300"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-white/95 px-5 pt-20 backdrop-blur-sm md:hidden dark:bg-neutral-950/95"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex h-full flex-col justify-between pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <nav aria-label="Mobile" className="mt-4">
              <NavList active={active} onSelect={handleSelect} spacing="space-y-1" />
            </nav>
            <ContactBlurb />
          </div>
        </div>
      )}
    </>
  );
}
