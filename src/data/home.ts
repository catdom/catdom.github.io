import type { L10n } from './types';

/**
 * PROVISIONAL — the hero copy is a first pass, flagged for review.
 * Everything else on the page is drawn from the CV and the case texts.
 */
export const hero: L10n<{ eyebrow: string; lines: string[]; body: string }> = {
  en: {
    eyebrow: 'Design Leadership · Barcelona',
    lines: ['Design that scales,', 'teams that ship'],
    body: 'Fifteen years turning design into a system: UX strategy, design operations and design systems for marketplaces used by millions.',
  },
  es: {
    eyebrow: 'Design Leadership · Barcelona',
    lines: ['Diseño que escala,', 'equipos que entregan'],
    body: 'Quince años convirtiendo el diseño en sistema: estrategia UX, design operations y design systems para marketplaces de millones de usuarios.',
  },
};

export const intro: L10n<{ label: string; heading: string; body: string[] }> = {
  en: {
    label: 'About, since 2007',
    heading: 'Jordi Catalán is a design leader based in Barcelona.',
    body: [
      'I have led teams, scaled design practices and shipped product improvements across high-traffic marketplaces — Fotocasa, Habitaclia, Kleinanzeigen and coches.net. I build and evolve design systems, define UX strategy for complex platforms, and make multi-disciplinary teams work better together.',
      'My background as a developer keeps me technical and pragmatic. My years in UX leadership and design operations let me connect strategy with execution in a way that is clear, scalable and aligned with the business.',
    ],
  },
  es: {
    label: 'Sobre mí, desde 2007',
    heading: 'Jordi Catalán es un design leader afincado en Barcelona.',
    body: [
      'He liderado equipos, escalado prácticas de diseño y entregado mejoras de producto en marketplaces de alto tráfico — Fotocasa, Habitaclia, Kleinanzeigen y coches.net. Construyo y hago evolucionar design systems, defino estrategia UX para plataformas complejas y consigo que equipos multidisciplinares trabajen mejor juntos.',
      'Mi origen como desarrollador me mantiene técnico y pragmático. Mis años en liderazgo de UX y design operations me permiten conectar estrategia y ejecución de forma clara, escalable y alineada con el negocio.',
    ],
  },
};

export const strengthsIntro: L10n<{ label: string; heading: string; body: string }> = {
  en: {
    label: 'What I do',
    heading: 'Where I add value',
    body: 'Four things I am consistently brought in to do — and the reason teams keep me close to both strategy and delivery.',
  },
  es: {
    label: 'Qué hago',
    heading: 'Dónde aporto valor',
    body: 'Cuatro cosas para las que me llaman de forma recurrente — y la razón por la que los equipos me quieren cerca de la estrategia y de la entrega.',
  },
};

export const careerIntro: L10n<{ label: string; heading: string; body: string }> = {
  en: {
    label: 'Career',
    heading: 'The full path',
    body: 'From front-end developer to Head of UX. Open any role to see what the job actually involved.',
  },
  es: {
    label: 'Trayectoria',
    heading: 'El recorrido completo',
    body: 'De desarrollador front-end a Head of UX. Abre cualquier puesto para ver en qué consistió realmente.',
  },
};
