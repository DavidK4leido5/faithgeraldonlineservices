# Faith Gerald Online Services

Marketing site for Faith Gerald Online Services, an independent provider of
online transaction and payment assistance in the Philippines.

Plain static HTML, CSS and JavaScript. No build step, no dependencies, no
framework. Open `index.html` in a browser, or serve the folder with any static
file server.

## Structure

```
index.html                  The entire site: 11 sections, semantic HTML
css/styles.css              Design tokens, components, responsive rules
js/main.js                  Site config, nav, reveal, accordion, lightbox
assets/
  brand/logo.svg            Primary logo (circular FG mark)
  hero/hero-device.jpg      Landing visual
  og/…-cover.png            1200x630 social preview image
  proofs/README.md          Where real receipt images go
PRODUCT.md                  Product truth: audience, positioning, constraints
DESIGN.md                   Visual system: tokens, rules, components
```

## Before publishing

Two values in `js/main.js` are placeholders and **must** be replaced. The site
warns in the browser console until they are:

1. **`SITE.siteUrl`** — currently `https://example.com/`. It feeds the canonical
   tag, Open Graph tags, and every URL in the JSON-LD. Shipping it as-is means
   search engines index the placeholder domain.
2. **`SITE.contact`** — currently empty. Fill in any of `whatsapp`, `phone`,
   `email`, `messenger`, or `facebook` and the Contact buttons rebuild
   themselves. Until then they stay as honest in-page links, never fake ones.

Also supply the real receipts: drop images into `assets/proofs/` named
`proof-01.png` through `proof-08.png`. See `assets/proofs/README.md`. Missing
images render a labelled placeholder and their lightbox is disabled.

## Content rules that must be preserved

This business is an **independent service provider**. Future edits must not:

- Rename it to a platform-derived name, or imply official affiliation with,
  authorization by, or endorsement from GCash or any other platform.
- Claim guaranteed approval, guaranteed conversion, or guaranteed transaction
  completion. Service availability depends on the platform, account, and
  current availability, and the copy says so.
- Invent a business address, phone number, email, opening hours, price range,
  certifications, ratings, or review counts.
- Publish review or aggregate-rating structured data. The testimonials are
  sample copy and carry no schema.
- Fabricate receipts, or draw them in HTML. Only real images go in the gallery,
  and receipt details are never repeated as page text.

`PRODUCT.md` is the fuller record of these constraints.

## Design system

`DESIGN.md` documents the visual system, and it is normative. The short version:

- White ground, navy ink, one confident blue for actions.
- Type is the system font stack only. No web fonts, no icon library, no
  animation library.
- All sizes, radii, and colors come from tokens in `:root`. No raw literals.
- Depth is a hairline border at rest; shadows are neutral, offset, and subtle.
- Content is real HTML text, never baked into an image.

## Accessibility

- Body text meets WCAG AA contrast.
- Full keyboard operation with visible focus states on every interactive element.
- The mobile menu, accordion, FAQ, and lightbox are keyboard accessible.
- `prefers-reduced-motion: reduce` disables float animation and reveal motion.
- No horizontal scrolling from 320px up.

## Local preview

Any static server works:

```sh
npx serve .
# or
python -m http.server 8000
```

Then open the printed URL.
