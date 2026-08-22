# Portfolio 2026 — "Warm Instrument"

A hyper-minimal personal portfolio. Static, offline-capable, zero third-party
requests, ~3.6 KB of client JavaScript.

> **⚑ All personal content is placeholder.** Every name, project, link and
> metric is filler. See [Making it yours](#making-it-yours). An orange banner
> is shown on the home page until you change the email in `src/lib/profile.ts`.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve the built output
npm run check      # astro + TypeScript diagnostics
```

Node 22 (see `.nvmrc`). Deploy `dist/` to any static host — no server, no
runtime, no environment variables.

---

## Making it yours

Almost everything lives in **one file**.

### 1. `src/lib/profile.ts`

Name, role, headline, bio, location, availability, email, socials, career,
metrics, SEO. Every value that still needs replacing is marked `// ⚑`:

```bash
grep -n "⚑" src/lib/profile.ts
```

The placeholder banner disappears automatically once `email` is no longer
`hello@example.com`.

### 2. `src/content/projects/*.md`

One Markdown file per project. Frontmatter is schema-validated
(`src/content.config.ts`) — a missing or malformed field fails the build
rather than rendering a broken card.

| Field | Notes |
| --- | --- |
| `layout.col` | Desktop grid span: `3 \| 4 \| 6 \| 8 \| 12`. Must total 12 per row. |
| `layout.row` | Row span: `1 \| 2 \| 3`. |
| `layout.accent` | Fills the cell with the accent colour. Use on **one** project only. |
| `featured` | `false` moves it out of the bento and into the dense archive table. |
| `published` | `false` keeps a draft out of the production build. |
| `order` | Sort order, ascending. |

Mobile and tablet spans are derived automatically — never set them by hand.

### 3. Re-generate the derived assets

```bash
node tools/make-og.mjs      # public/og/default.png   (1200×630 social card)
node tools/make-icons.mjs   # public/icons/*.png      (PWA + apple-touch)
node tools/make-cv.mjs      # public/cv.pdf           (placeholder CV)
```

All three read from `profile.ts` and render with a local Chromium. Replace
`public/cv.pdf` with your real CV, or set `cvHref: null` to hide the button.

### 4. Before deploying

- `site` in `astro.config.mjs` → your domain
- `profile.seo.origin` → the same domain
- `Sitemap:` host in `public/robots.txt`
- `name` / `short_name` in `public/manifest.webmanifest`

---

## Re-branding

Two lines in `src/styles/tokens.css` change the entire site:

```css
--accent:      #e8552a;   /* Ember */
--accent-soft: #ff7a52;
```

There is no hardcoded colour, size, radius or duration anywhere else — every
value in the codebase resolves through a custom property in that file.

To swap fonts, drop new `.woff2` variable fonts into `public/fonts/`, update
`src/styles/fonts.css`, and adjust `--font-display` / `--font-text` /
`--font-mono`. Keep a font with a **`wdth` axis** for the display face, or the
kinetic typography degrades to weight-only.

---

## Architecture

```
src/
├─ lib/
│  ├─ profile.ts          ← ALL personal content
│  └─ icons.ts            inline SVG set + IconName type
├─ content/projects/*.md  case studies (schema-validated)
├─ content.config.ts      zod schemas
├─ styles/
│  ├─ global.css          declares @layer order, imports the rest
│  ├─ tokens.css          the entire design system
│  ├─ fonts.css           self-hosted variable fonts
│  ├─ reset.css  base.css  layout.css
│  ├─ components.css      card, nav, status, buttons, archive
│  └─ kinetic.css         variable-font axis behaviour
├─ scripts/               vanilla TS, no framework
│  ├─ main.ts             entry; idempotent, survives view transitions
│  ├─ tilt.ts             pointer-driven 3D tilt
│  ├─ kinetic.ts          scroll velocity + cursor proximity
│  ├─ theme.ts  nav.ts  clipboard.ts  lottie.ts
├─ components/            Astro, zero client components
├─ layouts/Layout.astro
└─ pages/                 index, work/[...slug], 404, offline, sitemap.xml
```

CSS uses a single explicit cascade layer order declared in `global.css`:

```css
@layer reset, tokens, base, layout, components, utilities;
```

No `!important` outside reduced-motion guards. No specificity wars.

---

## The four requirements, and how each is met

### 1. Dynamic bento grid with 3D tilt

12 columns on desktop, 6 on tablet, 2 on mobile, with `grid-auto-rows` so
cells can span rows predictably. Spans collapse automatically at each
breakpoint.

Tilt is pointer-driven and capped at **6°** — past ~8° it stops reading as
tactile and starts reading as a gimmick. `.tilt-root` owns the 3D transform
and `.card` owns the surface, so per-frame transform writes never invalidate
the card's own colour and shadow transitions.

Performance: all pointer writes are batched into **one** `requestAnimationFrame`
regardless of how many cards are hovered, and rects are cached on
`pointerenter` and invalidated on scroll/resize — measuring per `pointermove`
would force synchronous layout on every event.

### 2. Kinetic typography

Genuinely variable-font axis animation, not fake weight swapping. Two
independent signals:

| Signal | Variable | Effect |
| --- | --- | --- |
| Scroll velocity | `--k-vel` on `:root` | Type narrows and lightens — it leans into the motion |
| Cursor proximity | `--k-prox` per word | Type thickens and widens — it reaches back toward the pointer |

The JS only *measures*; `kinetic.css` decides what the numbers **mean**, so
retuning the effect is a stylesheet change. Only
`font-variation-settings` is animated — a paint-only property, so no reflow.

Headings are split into per-word spans **at build time**, not in the browser:
client-side splitting would cause layout shift after hydration.

The rAF loop parks itself after ~30 idle frames and is woken by scroll or
pointer movement, so an idle page burns no frames.

### 3. dotLottie micro-interactions

Three hand-authored `.lottie` packages (~750 bytes each) in `public/lottie/`:
`arrow` (project links), `check` (copy confirmation), `pulse` (status).

**The honest tradeoff:** the dotLottie renderer is a ~1.2 MB wasm binary — far
too much for decorative icons on a site whose brief is "no bloat". So:

- Every icon renders server-side as an **inline SVG**. That is the real icon:
  it works with JS disabled, on a cold cache, and in a feed reader.
- The wasm is dynamically imported **only** when an icon scrolls into view,
  **and** the connection is not `saveData`/2g, **and** motion is not reduced.
  Most visits never fetch it.
- It is served from **our own origin** — never a CDN.
- If the import fails, the SVG stays. There is no visible failure state.

### 4. Privacy & performance

- **Zero third-party requests.** Fonts, wasm and every asset are self-hosted.
  Verified in-browser: no request leaves the origin.
- No analytics, cookies, or local storage beyond the theme preference.
- Client JS: **~3.6 KB gzipped** for tilt, kinetic type, theme, nav, clipboard
  and the Lottie gate combined.
- Fonts: 245 KB total, latin-subset variable `woff2`, self-hosted, `swap`.
- Service worker: network-first for navigations, stale-while-revalidate for
  static assets, `/offline` fallback. Same-origin only. The wasm is
  deliberately **not** precached.

---

## Accessibility

Verified in-browser: single `<h1>`, `lang` set, skip link, no unlabelled
links, no images without `alt`.

- Full keyboard operation; stretched card links keep a real focusable anchor
  with an accessible name.
- `prefers-reduced-motion: reduce` disables tilt, kinetic axes, the marquee
  and Lottie entirely — verified, not assumed.
- Theme toggle has three states — light / dark / **system**. Most
  implementations omit "system", which silently overrides the OS setting
  forever after one accidental click.
- Clipboard confirmation is mirrored into an `aria-live` region.

---

## Verified behaviour

Checked against the built output in a real browser:

| | |
| --- | --- |
| Tilt | Writes capped, sign-correct rotations; springs back on leave |
| Kinetic proximity | Word width 545 px → 585 px as the cursor approaches |
| Kinetic velocity | `--k-vel` decays 0.547 → 0.000 over ~69 frames |
| Themes | system → light → dark → system, all resolving correct backgrounds |
| Bento | Every card fills its grid cell; rows align at all breakpoints |
| Reduced motion | Axes locked, marquee stopped, tilt off, 0 Lottie mounted |
| No JavaScript | Full page renders: 15 cards, 16 words, 6 icons, mailto live |
| Offline | Service worker serves the complete home page with the network off |
| Nav at 320 px | No horizontal overflow |
| Console | 0 errors, 0 failed requests, 0 external requests |

---

## Deployment

Any static host. `dist/` is self-contained.

Recommended headers:

```
/fonts/*    Cache-Control: public, max-age=31536000, immutable
/_astro/*   Cache-Control: public, max-age=31536000, immutable
/sw.js      Cache-Control: no-cache
```

Bump `CACHE_VERSION` in `public/sw.js` when you want to force a cache sweep.
