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

Drop files into `public/cases/`. They are matched **by name, without the
extension** — `.webp`, `.png`, `.jpg`, `.avif` and `.gif` all work, and the
match is case-insensitive, so no renaming or converting is needed.

Slots are declared on the case in `src/data/cases.ts`:

```ts
images: [
  {
    src: 'fotocasa-3',                  // matches fotocasa-3.webp, .png, .jpg…
    span: 'wide',                       // full content width
    alt: { en: 'SUI token reference', es: 'Referencia de tokens de SUI' },
    caption: { en: 'Design tokens', es: 'Design tokens' },
  },
  { src: 'fotocasa-4', span: 'half', alt: { en: '…', es: '…' } },
  { src: 'fotocasa-5', span: 'half', alt: { en: '…', es: '…' } },
]
```

- A slot with **no matching file renders nothing** and does not break the
  layout, so files can be added one at a time and each appears as it lands.
- The first `wide` image opens the case; the rest are dealt out between the
  narrative sections. `half` images sit in a two-up row — add them in pairs.
- `alt` is required in both languages. `caption` is optional.
- If one name exists in several formats, the newest wins, in the order
  avif → webp → png → jpg → jpeg → gif → svg.

**Sizes.** Wide slots render up to ~1290px across, half slots up to ~630px.
Export at 2× (2580px / 1260px wide) and compress.

## Turning on the contact form

The footer shows a plain email link until a Formspree form is configured, so
the page is never left with a form that goes nowhere.

1. Create a form at [formspree.io](https://formspree.io) and copy the ID — the
   part after `/f/` in the endpoint it gives you.
2. Set it in `src/data/site.ts`:

   ```ts
   formspreeId: 'abcdwxyz',
   ```

The form (name, email, message) then replaces the email as the footer's
primary action, with the address still shown beneath it.

It is not a secret — it ships in the HTML of every static site that uses one.
That does mean anyone can post to the endpoint, so the form carries a honeypot
field that Formspree drops; turn on their spam filtering as well.

Nothing is requested from Formspree until someone actually submits, so
ordinary visitors still load the page without touching a third party. Without
JavaScript the form posts normally to Formspree rather than silently failing.

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
