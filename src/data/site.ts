import type { L10n } from './types';

export const site = {
  name: 'Jordi Catalán',
  initials: 'JC',
  linkedin: 'https://www.linkedin.com/in/jordicatalan',
  location: 'Barcelona',
  /** Drives canonical URLs, OG tags and the sitemap. */
  origin: 'https://catdom.github.io',

  /* ⚑ Search engines are locked out while the site is still being finished.
     Flip to `true` to allow indexing — it drives the robots meta tag,
     robots.txt and whether the sitemap is served. */
  indexable: false,
} as const;

export const tagline: L10n = {
  en: 'Design Leadership · Design Systems · UX Strategy',
  es: 'Design Leadership · Design Systems · Estrategia UX',
};

export const availability: L10n<{ badge: string; note: string }> = {
  en: { badge: '24 years in', note: 'Head of UX & Design Operations' },
  es: { badge: '24 años dentro', note: 'Head of UX y Design Operations' },
};

export const nav: L10n<{ label: string; href: string }[]> = {
  en: [
    { label: 'Capability', href: '#capability' },
    { label: 'Where', href: '#where' },
    { label: 'Design system', href: '/design-system/' },
  ],
  es: [
    { label: 'Capacidades', href: '#capability' },
    { label: 'Dónde', href: '#where' },
    { label: 'Design system', href: '/design-system/' },
  ],
};

export const ui: L10n<Record<string, string>> = {
  en: {
    contact: 'Let\u2019s talk',
    linkedin: 'LinkedIn',
    contactOn: 'on LinkedIn',
    scroll: 'Scroll down',
    backToTop: 'Back to top',
    backHome: 'Back to the start',
    rights: 'All rights reserved',
    nextCase: 'Next one',
    viewCase: 'Read the case',
    role: 'Role',
    period: 'Period',
    company: 'Company',
    skip: 'Skip to content',
    langLabel: 'Language',
    dsLabel: 'A · Reference',
    dsTitle: 'The parts, drawn to spec',
    dsBody: 'The system this site runs on, drawn twice \u2014 once as design, once as the spec a team would build from. Every number here is the number the CSS actually sets. The button and the tag are not lookalikes either: they are the very ones in the header and under the claim.',
    contactLabel: '03 · Contact',
    contactHeading: 'Work together',
    contactNote: 'Listening to design leadership roles',
    brandsLabel: 'Where the work ended up',
    figuresLabel: 'The short version, in numbers',
  },
  es: {
    contact: 'Hablemos',
    linkedin: 'LinkedIn',
    contactOn: 'en LinkedIn',
    scroll: 'Desliza',
    backToTop: 'Volver arriba',
    backHome: 'Volver al principio',
    rights: 'Todos los derechos reservados',
    nextCase: 'El siguiente',
    viewCase: 'Leer el caso',
    role: 'Puesto',
    period: 'Periodo',
    company: 'Empresa',
    skip: 'Ir al contenido',
    langLabel: 'Idioma',
    dsLabel: 'A · Referencia',
    dsTitle: 'Las piezas, dibujadas a medida',
    dsBody: 'El sistema sobre el que corre este site, dibujado dos veces: una como diseño y otra como la especificación desde la que construiría un equipo. Cada número de aquí es el que pone el CSS de verdad. Y el botón y la etiqueta tampoco se parecen: son exactamente los de la cabecera y los de debajo del claim.',
    contactLabel: '03 · Contacto',
    contactHeading: 'Trabajemos juntos',
    contactNote: 'Escuchando posiciones de liderazgo de diseño',
    brandsLabel: 'Dónde acabó el trabajo',
    figuresLabel: 'La versión corta, en cifras',
  },
};
