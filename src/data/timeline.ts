import type { L10n } from './types';

export type TimelineEntry = {
  id: string;
  company: string;
  role: L10n;
  period: L10n;
  /** Displayed in the left rail of the row. */
  range: L10n;
  /** First and last month worked, ISO. A missing end means still there — the
      row's duration is counted from today, so it never goes stale. */
  start: string;
  end?: string;
  location: L10n;
  /** A single synthesised paragraph for the right-hand column of the Where row. */
  summary: L10n;
  /** Slug of a case study page, when this role has one. */
  caseSlug?: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: 'kleinanzeigen',
    company: 'Kleinanzeigen',
    role: { en: 'Senior Product Design', es: 'Senior Product Design' },
    period: { en: 'Mar 2025 — Present', es: 'Mar 2025 — Actualidad' },
    range: { en: '2025 — Today', es: '2025 — Hoy' },
    start: '2025-03',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'kleinanzeigen',
    summary: {
      en: 'End-to-end design on one of Europe\u2019s biggest classifieds marketplaces, where the job is scale: consistent flows, less debt, teams agreeing.',
      es: 'Dise\u00f1o end-to-end en uno de los mayores marketplaces de clasificados de Europa: flujos coherentes, menos deuda de dise\u00f1o y equipos de acuerdo.'
    },
  },
  {
    id: 'fotocasa',
    company: 'Fotocasa & Habitaclia',
    role: { en: 'Design Ops & Systems', es: 'Design Ops & Systems' },
    period: { en: 'Nov 2021 — May 2025', es: 'Nov 2021 — May 2025' },
    range: { en: '2021 — 2025', es: '2021 — 2025' },
    start: '2021-11',
    end: '2025-05',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'fotocasa',
    summary: {
      en: 'Design Operations across two marketplaces, and the multi-brand system their product teams still work in: tokens, documentation, governance.',
      es: 'Design Operations en dos marketplaces y el sistema multimarca en el que sus equipos de producto siguen trabajando: tokens, documentaci\u00f3n y gobernanza.'
    },
  },
  {
    id: 'coches-head',
    company: 'coches.net',
    role: { en: 'Head of User Experience', es: 'Head of User Experience' },
    period: { en: 'Jan 2016 — Nov 2021', es: 'Ene 2016 — Nov 2021' },
    range: { en: '2016 — 2021', es: '2016 — 2021' },
    start: '2016-01',
    end: '2021-11',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'coches-net',
    summary: {
      en: 'UX at one of Spain\u2019s biggest car marketplaces: a team from two designers to eight, and CSATs mapped to key flows and folded into OKRs.',
      es: 'UX en uno de los mayores marketplaces de coches de Espa\u00f1a: el equipo de dos dise\u00f1adores a ocho y los CSATs metidos en los OKRs de la compa\u00f1\u00eda.'
    },
  },
  {
    id: 'coches-ux',
    company: 'coches.net',
    role: { en: 'UX & Web Development', es: 'UX y desarrollo web' },
    period: { en: 'Nov 2007 — Jan 2016', es: 'Nov 2007 — Ene 2016' },
    range: { en: '2007 — 2016', es: '2007 — 2016' },
    start: '2007-11',
    end: '2016-01',
    location: { en: 'Barcelona', es: 'Barcelona' },
    summary: {
      en: 'UX and front-end in the same pair of hands, building UI components and frameworks that product teams kept using long after I had moved on.',
      es: 'UX y front-end en las mismas manos, construyendo componentes de UI y frameworks que los equipos de producto siguieron usando mucho despu\u00e9s de que yo me fuera.',
    },
  },
  {
    id: 'herraiz-soto',
    company: 'Herraiz Soto — BMW',
    role: { en: 'Web Design & Development', es: 'Diseño y desarrollo web' },
    period: { en: 'Jan 2005 — Nov 2007', es: 'Ene 2005 — Nov 2007' },
    range: { en: '2005 — 2007', es: '2005 — 2007' },
    start: '2005-01',
    end: '2007-11',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'bmw',
    summary: {
      en: 'Layouts and site structures for BMW under brand standards with no room to improvise, alongside creatives, developers and the client.',
      es: 'Layouts y estructuras de site para BMW bajo unos est\u00e1ndares de marca sin margen para improvisar, junto a creativos, desarrolladores y cliente.'
    },
  },
];

/**
 * Completed years in a role, for the line under its dates. Counted in whole
 * months so a role that ran three years and eleven months does not claim four,
 * and counted from today for the one still running.
 */
export const yearsIn = (entry: TimelineEntry, lang: 'en' | 'es'): string => {
  const [sy, sm] = entry.start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = entry.end
    ? entry.end.split('-').map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const years = Math.max(1, Math.floor(((ey - sy) * 12 + (em - sm)) / 12));
  if (lang === 'es') return `${years} ${years === 1 ? 'año' : 'años'}`;
  return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
};
