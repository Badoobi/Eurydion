---
name: Eurydion
description: A black-and-white comic field guide to playable worlds and process films.
colors:
  ink: "#0a0a0a"
  paper: "#ffffff"
  gray-light: "#f2f2f2"
  gray-mid: "#d9d9d9"
typography:
  display:
    fontFamily: "Bangers, Impact, sans-serif"
    fontWeight: 400
    letterSpacing: "0.02em"
  body:
    fontFamily: "Space Grotesk, Arial, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
motion:
  personality: "direct"
  signatureEasing: "cubic-bezier(0.23, 1, 0.32, 1)"
  quick: "140ms"
  standard: "200ms"
---

# Design System: Eurydion

## Creative North Star

**The Developer Field Manual**

The portfolio behaves like one black-and-white comic issue documenting a working
Roblox creator. Visitors meet the playable work first, then live proof, films, shorts,
and a compact character sheet. Every section uses a different panel grammar so the
page reads like an authored issue rather than a repeated card template.

## Color and Material

- Ink and paper carry almost the entire interface.
- Light and mid gray separate inactive, loading, and secondary surfaces.
- Halftone dots provide print-like shading only where a panel needs depth or state.
- Color belongs to the work itself and appears only when a visitor hovers a thumbnail.
- Gradients, blur, glow, and soft shadows are not part of this world.

## Typography

Bangers carries chapter-scale section headings and large statistics. Space Grotesk
handles navigation, descriptions, metadata, and controls. Headings are uppercase,
short, and materially larger than supporting copy. Body lines remain under 75
characters.

## Composition

The site is one scrolling route:

1. A thin sticky navbar.
2. Worlds immediately below it, led by a cover-story feature.
3. A black stats centerfold.
4. Widescreen film panels.
5. A scroll-snap row of vertical short panels.
6. A character sheet and milestone list.
7. Large contact controls.

Sections are divided by four-pixel rules. Content panels use three-pixel outlines,
minimal corner rounding, and hard offset shadows. A featured panel may be large and
asymmetric; supporting cards remain compact.

## Interaction

- Cards and controls press toward their hard shadows using short transform feedback.
- Thumbnails start high-contrast grayscale and reveal original color in 200ms.
- Scroll reveals happen once with a short 18px rise and fade.
- Statistics count up once when the black strip enters view.
- YouTube embeds load only after a visitor presses a thumbnail facade.
- Reduced motion disables movement and count-up interpolation.

## Accessibility

Keyboard focus is a four-pixel ink outline with clear offset. Touch targets are at
least 44px. Platform actions use their respective icons and visible labels. Live
Roblox data has a same-origin route and a visible last-known-data warning when the
upstream service fails.

## Do

- Put real work, real imagery, and real numbers before biography.
- Use rules and panel shapes to encode hierarchy.
- Keep loading and error states inside the same comic language.
- Preserve platform-native meaning in icons and labels.

## Do Not

- Do not add a hero title screen, ambient atmosphere, audio widget, or custom cursor.
- Do not add color accents outside work thumbnails.
- Do not use soft elevation, glass, gradients, or decorative blur.
- Do not turn every section into the same equal-card grid.
