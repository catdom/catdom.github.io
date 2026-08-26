import type { L10n } from './types';

export type TimelineEntry = {
  id: string;
  company: string;
  role: L10n;
  period: L10n;
  /** Displayed in the left rail of the row. */
  range: string;
  location: L10n;
  /** One or two lines for the right-hand column of the Where row. */
  summary: L10n<string[]>;
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
      en: [
        'Designing end-to-end experiences for one of the largest classifieds marketplaces in Europe, balancing user needs, business priorities and platform constraints.',
        'A systems mindset applied at scale: consistency, less design debt, and cross-team alignment on the flows that carry the most traffic.',
      ],
      es: [
        'Diseño de experiencias end-to-end para uno de los mayores marketplaces de clasificados de Europa, equilibrando usuario, negocio y restricciones de plataforma.',
        'Mentalidad de sistemas aplicada a escala: consistencia, menos deuda de diseño y alineación entre equipos en los flujos de más tráfico.',
      ],
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
      en: [
        'Led Design Operations for two marketplaces and built the multi-brand design system used across product teams — tokens, documentation, governance and the rituals that made it stick.',
        'Partnered with product and engineering leads in Spain, France and Germany to align on one way of working without slowing local teams down.',
      ],
      es: [
        'Lideré Design Operations para dos marketplaces y construí el design system multimarca que usan los equipos de producto — tokens, documentación, gobernanza y los rituales que lo sostuvieron.',
        'Trabajé con leads de producto e ingeniería en España, Francia y Alemania para alinear una forma de trabajar sin frenar a los equipos locales.',
      ],
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
      en: [
        'Led the UX team for one of Spain\'s largest automotive marketplaces, growing it from two designers to a multidisciplinary group of eight.',
        'Made research the input and satisfaction a measured outcome: CSATs mapped to key flows and folded into company OKRs.',
      ],
      es: [
        'Lideré el equipo de UX de uno de los mayores marketplaces de automoción de España, creciéndolo de dos diseñadores a un grupo multidisciplinar de ocho.',
        'Convertí la investigación en input y la satisfacción en resultado medible: CSATs mapeados a flujos clave e integrados en los OKRs de compañía.',
      ],
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
      en: [
        'Worked across front-end development and UX, combining technical execution with user-focused design.',
        'Designed and implemented UI components and frameworks that product teams kept using long after I moved on.',
      ],
      es: [
        'Trabajé entre desarrollo front-end y UX, combinando ejecución técnica y diseño centrado en el usuario.',
        'Diseñé e implementé componentes de UI y frameworks que los equipos de producto siguieron usando mucho después.',
      ],
    },
  },
  {
    id: 'herraiz-soto',
    company: 'Herraiz Soto — BMW.es',
    role: { en: 'Web Design & Development', es: 'Diseño y desarrollo web' },
    period: { en: 'Jan 2005 — Nov 2007', es: 'Ene 2005 — Nov 2007' },
    range: '2005 — 2007',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'bmw',
    summary: {
      en: [
        'Designed and built web layouts and site structures for BMW.es, one of the agency\'s main accounts.',
        'Worked to strict global brand standards alongside creative, technical and client-facing teams.',
      ],
      es: [
        'Diseñé y construí layouts y estructuras de site para BMW.es, una de las cuentas principales de la agencia.',
        'Trabajé bajo estándares de marca globales estrictos junto a equipos creativos, técnicos y de cliente.',
      ],
    },
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: { en: 'Web Design & Development', es: 'Diseño y desarrollo web' },
    period: { en: 'Jan 2002 — Jan 2007', es: 'Ene 2002 — Ene 2007' },
    range: '2002 — 2007',
    location: { en: 'Barcelona', es: 'Barcelona' },
    summary: {
      en: [
        'Independent design and front-end development for a range of clients — the technical grounding that still shapes how I lead design today.',
      ],
      es: [
        'Diseño y desarrollo front-end independiente para distintos clientes — la base técnica que todavía hoy marca mi forma de liderar diseño.',
      ],
    },
  },
];
