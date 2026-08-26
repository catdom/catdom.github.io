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
  en: { badge: '15+ years', note: 'Head of UX & Design Operations' },
  es: { badge: '15+ años', note: 'Head of UX y Design Operations' },
};

export const nav: L10n<{ label: string; href: string }[]> = {
  en: [
    { label: 'Capability', href: '#capability' },
    { label: 'Where', href: '#where' },
  ],
  es: [
    { label: 'Capacidades', href: '#capability' },
    { label: 'Dónde', href: '#where' },
  ],
};

export const ui: L10n<Record<string, string>> = {
  en: {
    contact: 'Get in touch',
    contactOn: 'on LinkedIn',
    scroll: 'Scroll down',
    backToTop: 'Back to top',
    backHome: 'Back to home',
    rights: 'All rights reserved',
    nextCase: 'Next role',
    viewCase: 'View case',
    role: 'Role',
    period: 'Period',
    company: 'Company',
    skip: 'Skip to content',
    langLabel: 'Language',
    contactLabel: '03 · Contact',
    contactHeading: 'Start a conversation',
    contactNote: 'Open to design leadership roles',
    brandsLabel: 'Brands the system reached',
    figuresLabel: 'The measure of it',
  },
  es: {
    contact: 'Hablemos',
    contactOn: 'en LinkedIn',
    scroll: 'Desliza',
    backToTop: 'Volver arriba',
    backHome: 'Volver al inicio',
    rights: 'Todos los derechos reservados',
    nextCase: 'Siguiente puesto',
    viewCase: 'Ver caso',
    role: 'Puesto',
    period: 'Periodo',
    company: 'Empresa',
    skip: 'Ir al contenido',
    langLabel: 'Idioma',
    contactLabel: '03 · Contacto',
    contactHeading: 'Empecemos una conversación',
    contactNote: 'Abierto a posiciones de liderazgo de diseño',
    brandsLabel: 'Marcas alcanzadas por el sistema',
    figuresLabel: 'La medida de todo esto',
  },
};
