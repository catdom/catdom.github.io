import type { L10n } from './types';

export const site = {
  name: 'Jordi Catalán',
  initials: 'JC',
  email: 'jcdcata@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jordicatalan',
  location: 'Barcelona',
  /** Drives canonical URLs, OG tags and the sitemap. */
  origin: 'https://catdom.github.io',

  /* ⚑ Search engines are locked out while the site is still being finished.
     Flip to `true` to allow indexing — it drives the robots meta tag,
     robots.txt and whether the sitemap is served. */
  indexable: false,

  /**
   * ⚑ Formspree form ID — the part after /f/ in the endpoint they give you.
   * Not a secret: it ships in the HTML of every static site that uses one.
   * While it is null the footer falls back to the plain email link, so the
   * page is never left with a form that goes nowhere.
   */
  formspreeId: null as string | null,
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
    { label: 'Roles', href: '#roles' },
    { label: 'Strengths', href: '#strengths' },
    { label: 'Career', href: '#career' },
  ],
  es: [
    { label: 'Puestos', href: '#roles' },
    { label: 'Fortalezas', href: '#strengths' },
    { label: 'Trayectoria', href: '#career' },
  ],
};

export const ui: L10n<Record<string, string>> = {
  en: {
    contact: 'Get in touch',
    scroll: 'Scroll down',
    backToTop: 'Back to top',
    backHome: 'Back to home',
    rights: 'All rights reserved',
    nextCase: 'Next role',
    role: 'Role',
    period: 'Period',
    company: 'Company',
    skip: 'Skip to content',
    langLabel: 'Language',
    menu: 'Menu',
    formTitle: 'Send me a message',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    formSend: 'Send message',
    formSending: 'Sending…',
    formSent: 'Thanks — your message is on its way. I usually reply within a day or two.',
    formError: 'Something went wrong sending that. You can email me directly instead:',
    formRequired: 'Please fill in this field.',
    formBadEmail: 'Please enter a valid email address.',
    formOrEmail: 'Or email me directly',
  },
  es: {
    contact: 'Hablemos',
    scroll: 'Desliza',
    backToTop: 'Volver arriba',
    backHome: 'Volver al inicio',
    rights: 'Todos los derechos reservados',
    nextCase: 'Siguiente puesto',
    role: 'Puesto',
    period: 'Periodo',
    company: 'Empresa',
    skip: 'Ir al contenido',
    langLabel: 'Idioma',
    menu: 'Menú',
    formTitle: 'Escríbeme',
    formName: 'Nombre',
    formEmail: 'Email',
    formMessage: 'Mensaje',
    formSend: 'Enviar mensaje',
    formSending: 'Enviando…',
    formSent: 'Gracias, tu mensaje va en camino. Suelo responder en un día o dos.',
    formError: 'Algo ha fallado al enviarlo. Puedes escribirme directamente a:',
    formRequired: 'Rellena este campo, por favor.',
    formBadEmail: 'Introduce una dirección de email válida.',
    formOrEmail: 'O escríbeme directamente a',
  },
};
