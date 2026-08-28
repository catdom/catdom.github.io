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
    heading: 'Four disciplines I lead',
    body: 'None of them is a deliverable. They are all systems, which is the only reason they are still running in places I left years ago.',
  },
  es: {
    label: '01 · Capacidades',
    heading: 'Cuatro disciplinas que lidero',
    body: 'Ninguna es un entregable. Todas son sistemas, y por eso siguen funcionando en sitios de los que me fui hace años.',
  },
};

export const careerIntro: L10n<{ label: string; heading: string; body: string }> = {
  en: {
    label: '02 · Where',
    heading: 'Where it all got built',
    body: 'Twenty-four years and four employers, and honestly the same question the whole way through: how do you keep design coherent when the teams, the brands and the markets keep multiplying?',
  },
  es: {
    label: '02 · Dónde',
    heading: 'Dónde se construyó todo esto',
    body: 'Veinticuatro años y cuatro empresas, y sinceramente la misma pregunta todo el rato: cómo mantienes el diseño coherente cuando los equipos, las marcas y los mercados no paran de multiplicarse.',
  },
};

/** The measured record, shown as a four-up row of figures. */
/**
 * The measured record. Every figure here traces to a date or a claim already
 * on the page — the 2002 the dimension line starts at, the four employers the
 * Where intro counts, the 2 → 8 in PT-04, the three countries in PT-02. None
 * of them is an estimate.
 */
export const figures: L10n<{ value: string; label: string }[]> = {
  en: [
    { value: '24', label: 'Years building things for the web' },
    { value: '19', label: 'Of them spent inside marketplaces' },
    { value: '×4', label: 'The UX team I grew, two to eight' },
    { value: '3', label: 'Countries working the same way' },
  ],
  es: [
    { value: '24', label: 'Años construyendo cosas para la web' },
    { value: '19', label: 'De ellos dentro de marketplaces' },
    { value: '×4', label: 'El equipo de UX que hice crecer, de dos a ocho' },
    { value: '3', label: 'Países trabajando de la misma manera' },
  ],
};
