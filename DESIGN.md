---
name: Eurydion
description: A cinematic world-builder's reel for games, films, and experiments.
colors:
  obsidian: "#0a080d"
  raised-ink: "#121017"
  ivory: "#f2eadc"
  muted-ivory: "#d6cdbf"
  electric-violet: "#6f4dff"
  cobalt: "#1856dc"
  amber: "#e6a43c"
  coral: "#e65568"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(5.2rem, 14vw, 13.5rem)"
    fontWeight: 400
    lineHeight: 0.7
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3rem, 7vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.9
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
motion:
  personality: "premium"
  signatureEasing: "cubic-bezier(0.16, 1, 0.3, 1)"
  quick: "180ms"
  standard: "350ms"
  slow: "800ms"
---

# Design System: Eurydion

## Creative North Star

**The World-Builder's Reel**

The site should feel like a creator's title sequence opening into a carefully edited
contact sheet. Large serif typography announces the name, cinematic crops make each
piece of work feel authored, and a dark gallery field gives changing Roblox and
YouTube imagery enough room to define the color of each section.

The visual reference supplies the editorial confidence: full-bleed imagery, oversized
type, thin rules, asymmetric work presentation, and restrained warm highlights. The
result remains specific to Eurydion by using the creator's fantasy artwork, real game
statistics, and real fetched media rather than photography-studio content.

## Color

- **Obsidian** is the continuous page surface.
- **Ivory** carries all major display typography.
- **Amber** marks authorship, interaction, and selected details.
- **Electric violet and cobalt** belong primarily to imagery and loading atmosphere.
- **Coral** is reserved for incidental media color, never used as generic UI emphasis.

Color should feel illuminated by the work. Do not place decorative gradients behind
ordinary text or convert every control into an accent surface.

## Typography

Cormorant Garamond is the display voice. Its high-contrast forms carry the title,
section names, and closing statement. Manrope handles navigation, descriptions,
metadata, and controls. The two families are self-hosted by `next/font`.

Display text is intentionally oversized and tightly set. Body text stays below 70
characters per line. Labels remain sentence case; metadata uses tabular numerals.

## Composition

The product is split into two focused routes that share one header, footer, spacing
scale, and type system.

The landing page fills its first viewport with the Eurydion identity and one dominant
route into the work. It then moves through one pull quote, a large proof grid, and one
featured work before ending in a single-row footer. The large Eurydion wordmark appears
only in this hero.

The `/works` route is the catalog. Its Roblox section leads with a wide featured world
before a staggered two-column grid. Build Films use a large/small editorial split.
Short Cuts use varied portrait ratios in a horizontal rhythm. These distinct browsing
patterns prevent the catalog from becoming one repeated card block.

Cards never become rounded dashboard containers. Images, rules, and typography create
the hierarchy.

## Motion

Motion is premium and controlled.

- **Focal moment:** the initial loader assembles an aperture-like system around the
  brand mark. On completion, two saturated curtains open and the hero headline,
  identity line, and actions enter in reading order in under 1.5 seconds.
- **Continuity:** each major section reveals once as it enters the viewport. Child
  items use a 70ms stagger capped at 280ms, and a small directional cue points toward
  the next section.
- **Ambient layer:** a large, low-opacity light follows fine-pointer movement inside
  the landing hero.
- **Feedback:** images tighten their crop, controls press to 0.97 scale, the custom
  cursor labels playable/watchable media, and optional synthesized clicks acknowledge
  activation.
- **Budget:** transforms and opacity dominate; blur is bounded to the loader, hero
  light, and contact panel.

Reduced motion removes spatial and looping movement while retaining visible state
changes.

## Interaction and Accessibility

The custom cursor runs only for fine pointers without reduced-motion enabled; touch,
coarse-pointer, and reduced-motion users keep native behavior. Keyboard focus uses a
visible amber outline. Navigation and external actions remain conventional links.
Image-only treatments have accessible names through their surrounding link text. All
data-driven empty and error states provide a direct route to the original platform.

## Do

- Lead with real artwork and fetched project media.
- Use dramatic scale for identity and quiet typography for operations.
- Let varying image ratios make the work grid feel edited rather than templated.
- Keep animation interruptible and honor reduced motion.

## Do Not

- Do not invent projects, reviews, counts, or testimonials.
- Do not add generic glowing gaming cards, pills, or dashboard chrome.
- Do not animate every section with the same scroll entrance.
- Do not obscure project titles or platform links for visual effect.
- Do not add a second equal-weight primary action to either page.
