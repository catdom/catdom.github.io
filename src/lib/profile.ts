/* ============================================================================
 * PROFILE — THE ONLY FILE YOU NEED TO EDIT TO MAKE THIS SITE YOURS.
 *
 * Every string below is PLACEHOLDER content, marked with a ⚑ where a real
 * value is required before launch. Nothing here is duplicated anywhere else
 * in the codebase — components read from this object exclusively.
 *
 * Search this file for "⚑" to find everything still awaiting real content.
 * ========================================================================= */

export type Social = {
  label: string;
  href: string;
  handle: string;
  /** Shown in the contact bento cell as a primary link. */
  featured?: boolean;
};

export const profile = {
  /* -- Identity ---------------------------------------------------------- */
  name: 'Your Name', // ⚑
  /** Short form used in the wordmark and the browser tab. */
  shortName: 'YN', // ⚑
  role: 'Design Engineer', // ⚑
  /** The display headline. Kept short — it is set at up to 9rem. */
  headline: 'Interfaces that feel like objects.', // ⚑
  /** One sentence under the headline. This is the elevator pitch. */
  standfirst:
    'I design and build product interfaces where the craft is legible — ' +
    'considered typography, real motion, and front-end that holds up under ' +
    'load.', // ⚑
  location: 'Lisbon, Portugal', // ⚑
  timezone: 'Europe/Lisbon', // ⚑

  /* -- Availability ------------------------------------------------------ */
  availability: {
    state: 'open' as 'open' | 'closed',
    label: 'Open to senior roles', // ⚑
    detail: 'Available from Q1 2026 · Remote or hybrid in the EU', // ⚑
  },

  /* -- Contact. Email-only by design: no form, no backend, no third party. */
  email: 'hello@example.com', // ⚑
  /** Optional. Set to null to hide the CV button entirely. */
  cvHref: '/cv.pdf' as string | null, // ⚑ drop the file in public/cv.pdf

  /* -- Biography. Rendered in the About cell; keep to 2-3 paragraphs. ----- */
  bio: [
    'I work at the seam between design and engineering — the part of a ' +
      'product where the interaction model, the type ramp and the render ' +
      'performance all have to agree with each other.', // ⚑
    'Most recently I led interface work on a design-systems team, shipping ' +
      'component libraries used across a dozen product surfaces and cutting ' +
      'first-paint on the main application roughly in half.', // ⚑
    'Before that: agency work, a stint in data visualisation, and a long ' +
      'detour through typography that I have never fully recovered from.', // ⚑
  ],

  /* -- Capability list for the "what I do" cell -------------------------- */
  capabilities: [
    'Design systems',
    'Front-end architecture',
    'Interaction & motion design',
    'Typography',
    'Accessibility (WCAG 2.2 AA)',
    'Performance engineering',
  ], // ⚑

  /* -- Tools ticker ------------------------------------------------------ */
  stack: [
    'TypeScript', 'React', 'Astro', 'CSS', 'WebGL',
    'Figma', 'Rive', 'Playwright', 'Node', 'Postgres',
  ], // ⚑

  /* -- Career. Newest first. --------------------------------------------- */
  experience: [
    { role: 'Senior Design Engineer', org: 'Company Name', period: '2023 — Present' }, // ⚑
    { role: 'Product Designer, Systems', org: 'Company Name', period: '2021 — 2023' }, // ⚑
    { role: 'Front-end Developer', org: 'Studio Name', period: '2018 — 2021' }, // ⚑
  ],

  /* -- A metric worth putting on the wall -------------------------------- */
  metrics: [
    { value: '12', unit: 'product surfaces', note: 'on one shared system' }, // ⚑
    { value: '48', unit: '% faster', note: 'first contentful paint' }, // ⚑
    { value: '100', unit: 'Lighthouse', note: 'on this site' },
  ],

  /* -- Social links. Delete any you do not want; order is preserved. ----- */
  socials: [
    { label: 'GitHub',   href: 'https://github.com/username',        handle: '@username', featured: true }, // ⚑
    { label: 'LinkedIn', href: 'https://linkedin.com/in/username',   handle: '/in/username', featured: true }, // ⚑
    { label: 'X',        href: 'https://x.com/username',             handle: '@username' }, // ⚑
    { label: 'Read.cv',  href: 'https://read.cv/username',           handle: '/username' }, // ⚑
  ] satisfies Social[],

  /* -- SEO --------------------------------------------------------------- */
  seo: {
    title: 'Your Name — Design Engineer', // ⚑
    description:
      'Portfolio of Your Name, a design engineer working on product ' +
      'interfaces, design systems and front-end performance.', // ⚑
    /** Must match `site` in astro.config.mjs. */
    origin: 'https://example.com', // ⚑
  },
} as const;

/** True while any ⚑ placeholder is still in place — drives the dev banner. */
export const IS_PLACEHOLDER = profile.email === 'hello@example.com';

export const featuredSocials = profile.socials.filter((s) => s.featured);
