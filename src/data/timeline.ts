import type { L10n } from './types';

export type TimelineEntry = {
  id: string;
  company: string;
  role: L10n;
  period: L10n;
  /** Displayed in the left rail of the row. */
  range: string;
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
    range: '2025 —',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'kleinanzeigen',
    summary: {
      en: 'End-to-end design on one of Europe\'s biggest classifieds marketplaces. The job is scale: keeping the busiest flows consistent, paying down design debt and getting teams to agree on the same thing.',
      es: 'Diseño end-to-end en uno de los mayores marketplaces de clasificados de Europa. El trabajo aquí es la escala: mantener coherentes los flujos con más tráfico, bajar deuda de diseño y conseguir que los equipos se pongan de acuerdo.',
    },
  },
  {
    id: 'fotocasa',
    company: 'Fotocasa & Habitaclia',
    role: { en: 'Design Ops & Systems', es: 'Design Ops & Systems' },
    period: { en: 'Nov 2021 — May 2025', es: 'Nov 2021 — May 2025' },
    range: '2021 — 2025',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'fotocasa',
    summary: {
      en: 'I ran Design Operations across two marketplaces and built the multi-brand system their product teams still work in \u2014 tokens, documentation, governance \u2014 and got the leads in Spain, France and Germany onto one way of working without slowing any of them down.',
      es: 'Llev\u00e9 Design Operations en dos marketplaces y constru\u00ed el sistema multimarca en el que sus equipos de producto siguen trabajando \u2014tokens, documentaci\u00f3n, gobernanza\u2014 y puse de acuerdo a los responsables de Espa\u00f1a, Francia y Alemania en una forma de trabajar sin frenar a ninguno.',
    },
  },
  {
    id: 'coches-head',
    company: 'coches.net',
    role: { en: 'Head of User Experience', es: 'Head of User Experience' },
    period: { en: 'Jan 2016 — Nov 2021', es: 'Ene 2016 — Nov 2021' },
    range: '2016 — 2021',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'coches-net',
    summary: {
      en: 'I led UX at one of Spain\u2019s biggest car marketplaces and grew the team from two designers to eight. Satisfaction stopped being a feeling: CSATs mapped to the key flows and folded into the company\u2019s OKRs.',
      es: 'Lider\u00e9 UX en uno de los mayores marketplaces de automoci\u00f3n de Espa\u00f1a y llev\u00e9 el equipo de dos dise\u00f1adores a ocho. La satisfacci\u00f3n dej\u00f3 de ser una sensaci\u00f3n: CSATs mapeados a los flujos clave y metidos en los OKRs de compa\u00f1\u00eda.',
    },
  },
  {
    id: 'coches-ux',
    company: 'coches.net',
    role: { en: 'UX & Web Development', es: 'UX y desarrollo web' },
    period: { en: 'Nov 2007 — Jan 2016', es: 'Nov 2007 — Ene 2016' },
    range: '2007 — 2016',
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
    range: '2005 — 2007',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'bmw',
    summary: {
      en: 'Layouts and site structures for BMW, one of the agency\u2019s biggest accounts, under brand standards that left no room to improvise \u2014 and always shoulder to shoulder with creatives, developers and the client.',
      es: 'Layouts y estructuras de site para BMW, una de las cuentas grandes de la agencia, bajo unos est\u00e1ndares de marca que no dejaban margen para improvisar \u2014 y siempre codo con codo con creativos, desarrolladores y cliente.',
    },
  },
];
