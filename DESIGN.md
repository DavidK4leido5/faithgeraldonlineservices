---
name: Faith Gerald Online Services
description: Fast, secure and convenient online transaction assistance for Filipino customers.
colors:
  navy-ink: "#0b2549"
  navy-deep: "#061a3a"
  navy-mid: "#123259"
  slate-strong: "#3d4d66"
  slate-body: "#4a5a75"
  slate-muted: "#5c6b80"
  slate-line: "#e2e8f0"
  surface-white: "#ffffff"
  surface-soft: "#f6f8fb"
  surface-tint: "#f2f7fd"
  blue-accent: "#0158b8"
  blue-deep: "#01428c"
  blue-bright: "#0181e6"
  blue-wash: "#dceafb"
  glow-blue: "rgba(47, 155, 240, 0.42)"
  indigo-accent: "#4f46e5"
  indigo-wash: "#e6e7fd"
  amber-signal: "#ffaf12"
  amber-ink: "#a8690a"
  green-confirm: "#0f7b52"
  green-wash: "#d9f2e6"
  shadow-ink: "#0f172a"
  print-ink: "#000000"
typography:
  display:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
    fontSize: "clamp(2.35rem, 1.15rem + 4.1vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
    fontSize: "clamp(1.7rem, 1.1rem + 1.9vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.18
    letterSpacing: "-0.018em"
  title:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
    fontSize: "clamp(1.06rem, 0.97rem + 0.34vw, 1.22rem)"
    fontWeight: 800
    lineHeight: 1.18
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "0.14em"
  card-title:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 800
    lineHeight: 1.25
  micro:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.6
    letterSpacing: "0.1em"
  micro-sm:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "22px"
  2xl: "28px"
  pill: "999px"
  hair: "2px"
  focus: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.blue-accent}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.surface-white}"
  button-outline:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-onDark:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.blue-deep}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  card-service:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-proof:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.lg}"
    padding: "12px"
  chip:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.navy-mid}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  nav-link:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.slate-body}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: Faith Gerald Online Services

## Overview

**Creative North Star: "The Clear Statement"**

The system reads like a clean receipt or a bank statement: precise lines, legible
numbers, nothing decorative competing with the facts. A customer arrives anxious
about money and needs to leave certain. So the page is built out of white, a
single confident blue, and an honest paragraph of text. Every surface is a
statement of fact.

The palette answers to **Confident Blue**. Blue is not a whisper here; it carries
the hero, the primary actions, and the section that proves the business is real.
It still never becomes decoration. Blue marks the things a customer can act on or
verify, and everything else stays navy ink on white.

The form language is **precise and approachable**: soft radii between 12px and
22px, hairline borders, and shadows so subtle they read as paper lift rather than
depth. The result should feel like a well-printed document from a competent
local business, not a promotional poster.

**Key Characteristics:**
- White ground, navy ink, one confident blue accent.
- Generous whitespace; sections breathe at 56-104px vertical rhythm.
- Rounded cards (16-22px) with hairline borders and near-flat shadows.
- Typography does the hierarchy work: heavy, tightly-tracked headings over calm body text.
- System font stack only. No web fonts, no layout shift, no font cost.
- Real HTML text everywhere. No text baked into images.
- Restrained motion: one fade-up on section entry, small hover lift on cards.

## Colors

A deep navy ink carries all text, a confident blue carries every action, and
three washes (blue, indigo, amber) supply light section backgrounds without
introducing a second identity.

### Primary
- **Confident Blue** (`#0158b8`): The action color. Primary buttons, the hero display line, active nav state, the eyebrow micro-label, focus borders. Confined to things the customer can act on or verify.
- **Deep Blue** (`#01428c`): Pressed and hover state for primary actions, and the dark end of the CTA gradient. Also the on-dark button text color.
- **Bright Blue** (`#0181e6`): Logo-derived highlight. Focus rings, small icon accents, the light end of gradients. Never used for body text: it fails contrast on white.
- **Blue Wash** (`#dceafb`): Card borders on hover, icon tile backgrounds, subtle gradient stops in the hero.

### Secondary
- **Indigo Accent** (`#4f46e5`): The deliberate second accent, used only on the E-Wallet icon tile and one testimonial avatar. Its scarcity keeps the palette from reading as one-note blue.
- **Indigo Wash** (`#e6e7fd`): Background for indigo icon tiles only.

### Tertiary
- **Amber Signal** (`#ffaf12`): Logo-derived brand amber. Bill Payment and Fast Processing icon tiles, star ratings, the hero eyebrow dot, the footer tagline. A signal color, never a surface.
- **Amber Ink** (`#a8690a`): The readable foreground for amber tiles. Amber Signal itself fails contrast as text, so icon strokes on an amber wash use this darker ink.
- **Green Confirm** (`#0f7b52`): Success-check icons and the Reliable Assistance tile. Reserved for confirmation semantics so green keeps meaning "this is handled".
- **Green Wash** (`#d9f2e6`): Background for green icon tiles only.

### Neutral
- **Navy Deep** (`#061a3a`): Footer and CTA gradient base. The darkest surface in the system.
- **Navy Ink** (`#0b2549`): All headings and primary body text.
- **Navy Mid** (`#123259`): Chip text, secondary headings, hero tagline.
- **Slate Strong** (`#3d4d66`): Testimonial quotes and other copy that needs slightly more presence than standard body text.
- **Slate Body** (`#4a5a75`): Standard body and paragraph copy.
- **Slate Muted** (`#5c6b80`): Supporting copy, card meta, captions, small print. Deliberately darker than a typical muted grey so it clears 4.5:1 on Surface Soft: `#64748b` was the original value and failed AA at 4.47:1.
- **Slate Line** (`#e2e8f0`): All hairlines: card borders, dividers, table rules.
- **Surface Soft** (`#f6f8fb`): Alternating section background and proof card frames.
- **Surface Tint** (`#f2f7fd`): The blue-tinted alternate section background.
- **Surface White** (`#ffffff`): The default page ground.
- **Shadow Ink** (`#0f172a`): Never painted. The single tint used in every elevation shadow, always offset downward and always with a soft blur. Deliberately neutral rather than navy, so a shadow never reads as a colored glow.
- **Print Ink** (`#000000`): Print stylesheet only.

### Named Rules
**The Blue Means Action Rule.** Confident Blue appears only on something the customer can act on, trust, or verify: primary buttons, active nav, focus states, the hero display line. It is never a decorative fill. If blue is on a surface for atmosphere, that surface uses Blue Wash instead.

**The Ink And Wash Rule.** Text is always navy or slate ink on a wash or white ground. Never white text on Blue Wash or any light wash. The only white text sits on Deep Blue, Navy Deep, or a gradient containing them.

**The One Second Accent Rule.** Indigo appears on at most two elements per viewport. It exists to prove the palette is considered, not to compete with blue.

## Typography

**Display Font:** system-ui stack (`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`)
**Body Font:** the same stack, differentiated by weight and tracking.

**Character:** One family, worked hard. Hierarchy comes from weight, size, and
letter-spacing rather than from a second typeface. The stack renders natively on
every device, costs zero bytes, and cannot cause a font-swap layout shift, which
matters on the low-end Android devices much of this audience uses.

### Hierarchy
- **Display** (900, `clamp(2.35rem, 1.15rem + 4.1vw, 3.75rem)`, 1.04, -0.03em tracking, uppercase): The single H1 only. The brand name is the loudest thing on the page.
- **Headline** (800, `clamp(1.7rem, 1.1rem + 1.9vw, 2.5rem)`, 1.18, -0.018em): Every section H2.
- **Title** (800, `clamp(1.06rem, 0.97rem + 0.34vw, 1.22rem)`, 1.18): Service card H3s, benefit headings, FAQ questions.
- **Body** (400, 1rem, 1.65): Paragraph copy. Held to roughly 65-75 characters per line via `max-width` on lead paragraphs.
- **Label** (800, 0.8125rem, 0.14em tracking, uppercase): Eyebrows, trust badges, footer column headings, section kickers.

### Named Rules
**The Tight-Tracking Rule.** Anything 1.7rem and larger carries negative tracking (-0.018em to -0.03em). Large text set at default tracking reads loose and amateur.

**The No-Web-Font Rule.** No `@font-face`, no Google Fonts link, no font CDN. Typography is solved with the system stack. Adding a web font requires removing something else of equal weight from the critical path.

**The Sentence Case Rule.** Only the H1, eyebrows, and trust badges are uppercase. Everything else, including buttons and card titles, is sentence case. Uppercase body text is a poster habit, and this is not a poster.

## Layout

A single centered container capped at 1200px, with fluid side padding of
16-32px (`clamp(1rem, 0.4rem + 2.6vw, 2rem)`). The page is a vertical sequence
of full-bleed section bands, each with generous vertical rhythm
(`clamp(3.5rem, 2rem + 5vw, 6.5rem)`).

Section backgrounds alternate between white, Surface Soft, and Surface Tint to
separate topics without drawing lines between them. The hero is the one
asymmetric composition: copy occupies the left column while the landing visual
fills the section and the device sits right of center.

- **Grid:** CSS Grid throughout. Service and testimonial grids use
  `repeat(auto-fit, minmax(min(100%, 270-290px), 1fr))` so cards reflow without
  media queries.
- **Hero:** two columns above 1100px; a fixed center band is reserved for the
  device while floating service cards occupy the side gutters. Below 1100px the
  hero stacks and the cards become a two-column list.
- **Proof gallery:** `auto-fill` with a 3:4 frame, collapsing to two columns and
  then one.
- **Breakpoints:** 1080px, 1100px (hero stack), 980px, 880px (mobile nav),
  760px, 560px, 360px.
- **Density:** comfortable on desktop, tightening to compact only inside cards on
  small screens.

## Elevation & Depth

A hybrid system that leans flat. Depth is carried mostly by hairline borders and
tonal washes; shadows exist but are near-invisible at rest and only become
legible as a response to state. Nothing floats decoratively.

The single exception is the hero, where floating service cards sit above the
photo. They earn real elevation because they genuinely overlap another plane.

### Shadow Vocabulary
- **Hairline lift** (`box-shadow: 0 1px 3px rgba(6,26,58,0.06), 0 1px 2px rgba(6,26,58,0.04)`): Default resting state for cards. Barely perceptible.
- **Hover lift** (`box-shadow: 0 6px 18px rgba(6,26,58,0.07), 0 2px 6px rgba(6,26,58,0.04)`): Card hover. Paired with a 3-4px translate.
- **Raised panel** (`box-shadow: 0 18px 40px rgba(6,26,58,0.12), 0 4px 12px rgba(6,26,58,0.06)`): The CTA panel and the lightbox dialog.
- **Floating card** (`box-shadow: 0 10px 26px rgba(6,26,58,0.16), 0 2px 6px rgba(6,26,58,0.06)`): Hero service cards only, which overlap the photo.
- **Action blue** (`box-shadow: 0 10px 24px rgba(1,88,184,0.25)`): Primary buttons only.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. A card at rest gets a hairline border and the hairline-lift shadow. Real elevation appears only on hover, on the CTA panel, and on hero cards that genuinely overlap another plane.

**The No-Glow Rule.** No zero-offset chromatic halo, no colored glow, no neon. Shadows are neutral navy-black and offset downward. A glow reads as a template, not as lighting.

## Shapes

Rounded and quiet. Corners step from 8px for small controls to 28px for the
largest panels, with 12px as the working default for tiles and chips, 16px for
accordion and FAQ rows, and 22px for content cards.

Pills (`999px`) are reserved for buttons, chips, and status tags, so "fully
round" always means "interactive or a label". Borders are always 1px hairlines in
Slate Line; a 2px or thicker accent border on one side is never used.

- **Radius scale:** 8px small controls, 12px tiles and chips, 16px rows and
  accordion items, 22px content cards, 28px hero panel and CTA, 999px pills.
- **Clipping:** rounded containers clip their image children. Proof images use
  `object-fit: contain` inside a 3:4 frame so receipt proportions are never
  distorted.
- **Form language:** rectangles with softened corners. No notched corners, no
  asymmetric radii, no blobs.

### Named Rules
**The Hairline Rule.** Borders are always 1px, always Slate Line, always on all
sides or none. Never a thick border on a single side.

**The Pill Means Interactive Rule.** Fully-round shapes are buttons, chips, and
tags. Content surfaces are never pill-shaped.

## Components

### Buttons
- **Shape:** pill (999px). Height 48px, 42px for the compact nav variant.
- **Primary:** Confident Blue ground, white text, `0 10px 24px rgba(1,88,184,0.25)` shadow, `0 24px` horizontal padding. Hover deepens to Deep Blue and lifts 2px.
- **Hover / Focus:** 200ms transitions on background, transform, and shadow. Focus-visible is a 3px Bright Blue outline at 2px offset on every interactive element without exception.
- **Secondary:** white ground, Navy Ink text, 1px Slate Line border, hairline shadow. Hover shifts the border to Bright Blue and lifts 2px.
- **On dark:** white ground with Deep Blue text for primary, translucent white border with white text for secondary.

### Chips
- **Style:** Surface Soft ground, 1px Slate Line border, pill radius, Navy Mid text at 0.8125rem, with a 14px Bright Blue check icon.
- **State:** Static and non-interactive. They enumerate supported transactions; they are not filters.

### Cards / Containers
- **Corner Style:** 22px for content cards, 16px for rows and accordion items, 12px for tiles.
- **Background:** white on tinted sections, Surface Soft for proof frames.
- **Shadow Strategy:** hairline lift at rest, hover lift on interaction.
- **Border:** 1px Slate Line, shifting to Blue Wash on hover.
- **Internal Padding:** 24px standard, 20px compact, 32px for large panels.

### Inputs / Fields
The site ships no form inputs. Contact happens through messaging channels, so
there is no field styling to document. Do not add a contact form without
establishing field styles first.

### Navigation
- **Style:** sticky header, translucent white with a 10px backdrop blur, becoming
  bordered and shadowed after 8px of scroll.
- **Typography:** 0.9375rem, weight 600, Slate Body at rest, Deep Blue and weight
  700 when active.
- **Mobile:** a hamburger disclosure below 880px. The menu is absolutely
  positioned so opening it never shifts page layout, closes on link click,
  Escape, and outside click, and is keyboard operable.

### Icon Tiles
- **Shape:** 48px rounded square (12px radius), or 40px compact, holding a 24px
  stroked icon.
- **Color:** Wash ground with a matching strong foreground: Blue Wash on
  Confident Blue, Indigo Wash on Indigo Accent, amber wash on Amber Signal,
  green wash on Green Confirm.
- **Placement:** Icon tiles sit beside or above their heading inside cards. They
  are never a decorative badge on a standalone row.

### Hero Service Cards (signature component)
The one component that genuinely overlaps another plane. White at 97% opacity
with a 6px backdrop blur, 16px radius, and the floating-card shadow. Each holds a
34px icon tile, a 0.8125rem bold title, and a 0.6875rem muted meta line. They
animate on a 9s float cycle with staggered delays, disabled entirely under
`prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** keep the page ground white and let section alternation happen through Surface Soft and Surface Tint only.
- **Do** reserve Confident Blue for actions, active states, and the hero display line.
- **Do** set every interactive element to a visible 3px Bright Blue focus outline at 2px offset.
- **Do** use `object-fit: contain` for receipt images inside a fixed 3:4 frame so proportions and evidence stay honest.
- **Do** keep all content as real HTML text, including headings, service names, and FAQs.
- **Do** respect `prefers-reduced-motion: reduce` by disabling float animation and reveal transitions.
- **Do** hold body copy to 65-75 characters per line.

### Don't:
- **Don't** add a web font, icon library, or animation library. The stack is system fonts plus inline SVG.
- **Don't** use a thick colored border on a single side of a card; that is the most recognizable generated-UI tell.
- **Don't** stack an icon tile above a heading inside a card. Icon and heading share one row (`.service-card__head`, `.why__card-head`, `.benefit`): the icon sits beside the text it labels.
- **Don't** use repeating-gradient stripes as surface decoration.
- **Don't** leave an `<img>` without a `src`. The lightbox image carries a 1x1 transparent GIF until a proof is opened.
- **Don't** set functional text below 11px, including the brand sub-label at its smallest breakpoint.
- **Don't** add zero-offset colored glows or neon shadows. Shadows are neutral and offset downward.
- **Don't** build a repeating-gradient stripe pattern as surface decoration.
- **Don't** place a small tracked uppercase kicker directly above every heading as a reflex. The heading carries its own weight.
- **Don't** put functional text below 11px. The footer micro-label is 10.9px and is the floor; raise it rather than matching it elsewhere.
- **Don't** use Bright Blue for body text; it fails AA contrast on white.
- **Don't** bake text into images. Platform names, claims, and service names must be selectable text.
- **Don't** imply official affiliation with any platform through color, badge, or lockup. Blue is this brand's own, derived from its own logo.
