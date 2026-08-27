import type { L10n } from './types';

/**
 * The headline reads "<stem> <rotating phrase>", set line by line so each one
 * can rise into place from behind the one above it, with the last line cycling
 * through the three payoffs.
 *
 * Keep the stem's breaks — they are the composition, not a wrap. And keep every
 * rotating phrase a similar length: they are stacked in one grid cell, so the
 * line takes the width of the longest, and a much longer one would open a hole
 * beside the shorter ones.
 */
export const hero: L10n<{
  eyebrow: string;
  stem: string[];
  /** Cycled in place, in the mark colour. */
  rotating: string[];
  from: string;
  to: string;
}> = {
  en: {
    eyebrow: 'Jordi Catalán · Barcelona',
    stem: ['Design leadership', 'focused on'],
    rotating: [
      'UX strategy.',
      'design systems.',
      'business OKRs.',
      'user research.',
      'agile frameworks.',
      'people growth.',
    ],
    from: '2002',
    to: '2026',
  },
  es: {
    eyebrow: 'Jordi Catalán · Barcelona',
    stem: ['Liderazgo de diseño', 'enfocado en'],
    rotating: [
      'estrategia UX.',
      'sistemas de diseño.',
      'OKRs de negocio.',
      'la voz del usuario.',
      'frameworks ágiles.',
      'crecer al equipo.',
    ],
    from: '2002',
    to: '2026',
  },
};

/** The cover sheet: what the discipline is, and where it is practised. */
export const spec: L10n<{ term: string; value: string }[]> = {
  en: [
    {
      term: 'Discipline',
      value:
        'UX strategy, design operations and design systems — the practice of keeping design coherent as teams, brands and markets multiply.',
    },
    {
      term: 'Domain',
      value: 'High-traffic marketplaces. Spain, France, Germany.',
    },
  ],
  es: [
    {
      term: 'Disciplina',
      value:
        'Estrategia UX, design operations y design systems — la práctica de mantener el diseño coherente mientras equipos, marcas y mercados se multiplican.',
    },
    {
      term: 'Ámbito',
      value: 'Marketplaces de alto tráfico. España, Francia, Alemania.',
    },
  ],
};

/** Labels for the design-system board and its Design / Specs switch. */
export const board: L10n<{
  label: string;
  design: string;
  live: string;
  specs: string;
  legend: string;
  unitsValue: string;
  hint: string;
  key: string;
  keyValue: string;
  space: string;
  radius: string;
  type: string;
  colour: string;
  shared: string;
}> = {
  en: {
    label: 'Component library',
    design: 'Design',
    live: 'Live components — hover, focus and click them',
    specs: 'Specs',
    legend: 'Units',
    unitsValue: 'px',
    hint: 'Switch to Specs to see the measurements',
    key: 'Key',
    keyValue: 'H height &middot; W width &middot; P padding &middot; G gap &middot; R radius &middot; B border &middot; T type',
    space: 'Space',
    radius: 'Radius',
    type: 'Type',
    colour: 'Colour',
    shared: 'Site component',
  },
  es: {
    label: 'Librería de componentes',
    design: 'Diseño',
    live: 'Componentes vivos — pásales el cursor, enfócalos y púlsalos',
    specs: 'Medidas',
    legend: 'Unidades',
    unitsValue: 'px',
    hint: 'Cambia a Medidas para ver las cotas',
    key: 'Leyenda',
    keyValue: 'H alto &middot; W ancho &middot; P padding &middot; G gap &middot; R radio &middot; B borde &middot; T tipo',
    space: 'Espaciado',
    radius: 'Radios',
    type: 'Tipografía',
    colour: 'Color',
    shared: 'Componente del site',
  },
};

/** The brands the work reached, for the marquee. Order is the reading rhythm. */
export const brands = [
  'Kleinanzeigen',
  'Fotocasa',
  'Habitaclia',
  'coches.net',
  'Milanuncios',
  'InfoJobs',
  'Leboncoin',
  'BMW',
];

export const strengthsIntro: L10n<{ label: string; heading: string; body: string }> = {
  en: {
    label: '01 · Capability',
    heading: 'Four things I am brought in to do',
    body: 'Each one is a system, not a deliverable — which is why they outlast me.',
  },
  es: {
    label: '01 · Capacidades',
    heading: 'Cuatro cosas para las que me llaman',
    body: 'Cada una es un sistema, no un entregable — por eso siguen ahí cuando yo ya no estoy.',
  },
};

export const careerIntro: L10n<{ label: string; heading: string; body: string }> = {
  en: {
    label: '02 · Where',
    heading: 'Where it was built',
    body: 'Twenty-four years, five employers, one continuous problem: how design holds together as everything around it multiplies.',
  },
  es: {
    label: '02 · Dónde',
    heading: 'Dónde se construyó',
    body: 'Veinticuatro años, cinco empresas, un mismo problema de fondo: cómo mantener el diseño coherente mientras todo a su alrededor se multiplica.',
  },
};

/** The measured record, shown as a four-up row of figures. */
/**
 * The measured record. Every figure here traces to a date or a claim already
 * on the page — the 2002 the dimension line starts at, the five employers the
 * Where intro counts, the 2 → 8 in PT-04, the three countries in PT-02. None
 * of them is an estimate.
 */
export const figures: L10n<{ value: string; label: string }[]> = {
  en: [
    { value: '24', label: 'Years building for the web' },
    { value: '19', label: 'Of them inside marketplaces' },
    { value: '×4', label: 'UX team, two designers to eight' },
    { value: '3', label: 'Countries, one way of working' },
  ],
  es: [
    { value: '24', label: 'Años construyendo para la web' },
    { value: '19', label: 'De ellos en marketplaces' },
    { value: '×4', label: 'Equipo de UX, de dos a ocho' },
    { value: '3', label: 'Países, una forma de trabajar' },
  ],
};
