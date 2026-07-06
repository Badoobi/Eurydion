// Shared access to the app's single Lenis smooth-scroll instance so that
// navigation (sidebar links, "back to projects") can trigger eased scrolling.

let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Smoothly scroll to a section by its element id. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (lenis && el) {
    lenis.scrollTo(el, { offset: 0 });
    return;
  }
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else scrollToTop();
}

/** Scroll to the very top. Pass immediate=true to jump without animation. */
export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}
