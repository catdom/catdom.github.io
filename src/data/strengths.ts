import type { L10n } from './types';

export type Strength = {
  /** Part number in the capability list — PT-01 through PT-04. */
  id: string;
  title: L10n;
  body: L10n;
  /** The measured outcome, hung in the right-hand column of the row. */
  value: L10n;
  /** The plate drawn for this capability — the hero's figure, re-cut. */
  figure: string;
  /** What the figure is doing, for anyone who cannot see it. */
  figureAlt: L10n;
};

export const strengths: Strength[] = [
  {
    id: 'PT-01',
    figure: '/figures/pt-01.svg',
    figureAlt: { en: 'Contour rings tightening on a single centre', es: 'Curvas de nivel cerrándose sobre un único centro' },
    title: { en: 'UX Strategy', es: 'Estrategia UX' },
    value: { en: 'CSAT → OKR', es: 'CSAT → OKR' },
    body: {
      en: 'Turn research and data into a direction a team can actually act on — and tie it to the metrics the business already watches.',
      es: 'Convierto investigación y datos en una dirección con la que un equipo puede trabajar, atada a las métricas que el negocio ya mira.',
    },
  },
  {
    id: 'PT-02',
    figure: '/figures/pt-02.svg',
    figureAlt: { en: 'Two contour fields running into one another', es: 'Dos campos de curvas encontrándose' },
    title: { en: 'Design Operations', es: 'Design Operations' },
    value: { en: '3 countries', es: '3 países' },
    body: {
      en: 'Take the friction out from between design, product and engineering, so designers spend their day designing instead of negotiating process.',
      es: 'Quito la fricción entre diseño, producto e ingeniería para que los diseñadores diseñen en vez de negociar procesos.',
    },
  },
  {
    id: 'PT-03',
    figure: '/figures/pt-03.svg',
    figureAlt: { en: 'Contour rings stepped at an even interval', es: 'Curvas de nivel a intervalo constante' },
    title: { en: 'Design Systems', es: 'Design Systems' },
    value: { en: '7 brands', es: '7 marcas' },
    body: {
      en: 'Build multi-brand systems teams adopt on their own, grown piece by piece instead of shipped as a framework nobody asked for.',
      es: 'Construyo sistemas multimarca que los equipos adoptan solos, creciendo pieza a pieza en vez de lanzando un framework que nadie pidió.',
    },
  },
  {
    id: 'PT-04',
    figure: '/figures/pt-04.svg',
    figureAlt: { en: 'One field breaking into four smaller centres', es: 'Un campo que se abre en cuatro centros' },
    title: { en: 'Team Leadership', es: 'Liderazgo de equipo' },
    value: { en: '2 → 8 people', es: '2 → 8 personas' },
    body: {
      en: 'Hire, mentor and grow designers — a UX team from two people to a multidisciplinary eight, with room for each of them to get better.',
      es: 'Contrato, acompaño y hago crecer diseñadores: de dos personas a un equipo multidisciplinar de ocho, con sitio para que cada una mejore.',
    },
  },
];
