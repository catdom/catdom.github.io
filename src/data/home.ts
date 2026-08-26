import type { L10n } from './types';

/**
 * The headline is set line by line so each one can rise into place from behind
 * the line above it. Keep the breaks — they are the composition, not a wrap.
 */
export const hero: L10n<{
  eyebrow: string;
  lines: string[];
  /** Rendered inside the last line, in the mark colour. */
  markWord: string;
  from: string;
  to: string;
}> = {
  en: {
    eyebrow: 'Design leadership · specification',
    lines: ['I build the', 'system the', 'design runs on.'],
    markWord: 'runs on',
    from: '2002',
    to: '2026',
  },
  es: {
    eyebrow: 'Liderazgo de diseño · especificación',
    lines: ['Construyo el', 'sistema sobre', 'el que corre el diseño.'],
    markWord: 'corre el diseño',
    from: '2002',
    to: '2026',
  },
};

/** The four rows of the cover sheet, read as a specification. */
export const spec: L10n<{ term: string; value: string; strong?: string }[]> = {
  en: [
    { term: 'Discipline', value: 'UX strategy, design operations, design systems' },
    { term: 'Current', strong: 'Senior Product Design', value: ', Kleinanzeigen — since March 2025' },
    { term: 'Domain', value: 'High-traffic marketplaces. Spain, France, Germany.' },
    { term: 'Origin', value: 'Front-end developer, 2002–2016. Still reads the diff.' },
  ],
  es: [
    { term: 'Disciplina', value: 'Estrategia UX, design operations, design systems' },
    { term: 'Actual', strong: 'Senior Product Design', value: ', Kleinanzeigen — desde marzo de 2025' },
    { term: 'Ámbito', value: 'Marketplaces de alto tráfico. España, Francia, Alemania.' },
    { term: 'Origen', value: 'Desarrollador front-end, 2002–2016. Sigue leyendo el diff.' },
  ],
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
  'BMW.es',
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
export const figures: L10n<{ value: string; label: string }[]> = {
  en: [
    { value: '15+', label: 'Years in the discipline' },
    { value: '2 → 8', label: 'UX team, grown and kept' },
    { value: '7', label: 'Brands on one system' },
    { value: '3', label: 'Markets aligned' },
  ],
  es: [
    { value: '15+', label: 'Años en la disciplina' },
    { value: '2 → 8', label: 'Equipo de UX, crecido y retenido' },
    { value: '7', label: 'Marcas sobre un sistema' },
    { value: '3', label: 'Mercados alineados' },
  ],
};
