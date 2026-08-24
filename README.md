# jordicatalan — portfolio

Personal portfolio for **Jordi Catalán**, Head of UX & Design Operations.
Bilingual (EN/ES), static, self-hosted fonts, no third-party requests.

Built with [Astro](https://astro.build). Deployed to GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the built output
npm run check    # astro + TypeScript diagnostics
```

Node 22 (see `.nvmrc`).

---

## Routes

| URL | Page |
| --- | --- |
| `/` | Home (English) |
| `/es/` | Home (Spanish) |
| `/work/<slug>/` | Case study (English) |
| `/es/work/<slug>/` | Case study (Spanish) |

Slugs: `kleinanzeigen`, `fotocasa`, `coches-net`, `bmw`.

English lives at the root and Spanish under `/es`. The language switcher in the
header keeps you on the same page.

---

## Where the content lives

Everything is typed data — no CMS, no Markdown. Each string is a
`{ en, es }` pair, so the two languages can never drift apart structurally.

| File | Holds |
| --- | --- |
| `src/data/site.ts` | Name, email, LinkedIn, nav labels, UI strings |
| `src/data/home.ts` | Hero copy, and the intro for each home section |
| `src/data/cases.ts` | The four case studies, including their image slots |
| `src/data/strengths.ts` | The four strengths cards |
| `src/data/timeline.ts` | Career accordion entries and education |

### ⚑ The hero is provisional

`hero` in `src/data/home.ts` is a first pass and is meant to be replaced.
Everything else is drawn from the CV and the case texts.

---

## Adding case study images

Drop files into `public/cases/`, then list them on the case in
`src/data/cases.ts`:

```ts
images: [
  {
    src: 'fotocasa-tokens.png',
    span: 'wide',                       // full content width
    alt: { en: 'SUI token reference', es: 'Referencia de tokens de SUI' },
    caption: { en: 'Design tokens', es: 'Design tokens' },
  },
  { src: 'fotocasa-a.png', span: 'half', alt: { en: '…', es: '…' } },
  { src: 'fotocasa-b.png', span: 'half', alt: { en: '…', es: '…' } },
]
```

- `span: 'wide'` renders above the narrative, full width of the content column.
- `span: 'half'` renders in a two-up row inside the narrative — add them in pairs.
- `alt` is required in both languages. `caption` is optional.
- An empty `images: []` renders nothing at all; the layout does not break.

**Sizes.** Wide slots render up to ~1290px across, half slots up to ~630px.
Export at 2× (2580px / 1260px wide) and compress — WebP or AVIF preferred, PNG
for flat UI, JPEG for photography.

---

## Deploying to `catdom.github.io`

The site is configured for a **user site** at the domain root — no `base` path.

1. Create a repository named exactly **`catdom.github.io`**.
2. Push this project's contents to its `main` branch.
3. In that repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

The site is then live at `https://catdom.github.io`.

### Using a custom domain instead

1. Add `public/CNAME` containing the bare domain, e.g. `jordicatalan.com`.
2. Point the DNS `A` records at GitHub Pages, or a `CNAME` record at
   `catdom.github.io`.
3. Update `site` in `astro.config.mjs`, `origin` in `src/data/site.ts`, and the
   `Sitemap:` line in `public/robots.txt`.

---

## Design notes

The layout, spacing, typography and transitions follow a reference the site was
modelled on.

- **Type** — [Geist](https://vercel.com/font), variable, self-hosted from
  `public/fonts/` (~45 KB, latin + latin-ext). No webfont CDN.
- **Colour** — white, lavender `#dde3fb`, dark plum `#190a1d`. All tokens are in
  `src/styles/global.css`.
- **Grid** — `.split`: a bulleted label in the left rail, content on the right.
- **Interactions** — the numbered role list fills with a lavender pill on hover;
  the career accordion turns `+` into `−` and dims its siblings; sections reveal
  on scroll; the fixed header flips tone over dark sections.

All motion is disabled under `prefers-reduced-motion`, and every reveal falls
back to visible when JavaScript is unavailable.
