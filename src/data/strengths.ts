import type { L10n } from './types';

export type Strength = {
  /** Part number in the capability list — PT-01 through PT-04. */
  id: string;
  title: L10n;
  body: L10n;
  /** The measured outcome, hung in the right-hand column of the row. */
  value: L10n;
};

export const strengths: Strength[] = [
  {
    id: 'PT-01',
    title: { en: 'UX Strategy', es: 'Estrategia UX' },
    value: { en: 'CSAT → OKR', es: 'CSAT → OKR' },
    body: {
      en: 'Turn research and data into a direction a team can actually act on — and tie it to the metrics the business already watches.',
      es: 'Convierto investigación y datos en una dirección con la que un equipo puede trabajar, atada a las métricas que el negocio ya mira.',
    },
  },
  {
    id: 'PT-02',
    title: { en: 'Design Operations', es: 'Design Operations' },
    value: { en: '3 countries', es: '3 países' },
    body: {
      en: 'Take the friction out from between design, product and engineering, so designers spend their day designing instead of negotiating process.',
      es: 'Quito la fricción entre diseño, producto e ingeniería para que los diseñadores diseñen en vez de negociar procesos.',
    },
  },
  {
    id: 'PT-03',
    title: { en: 'Design Systems', es: 'Design Systems' },
    value: { en: '7 brands', es: '7 marcas' },
    body: {
      en: 'Build multi-brand systems teams adopt on their own, grown piece by piece instead of shipped as a framework nobody asked for.',
      es: 'Construyo sistemas multimarca que los equipos adoptan solos, creciendo pieza a pieza en vez de lanzando un framework que nadie pidió.',
    },
  },
  {
    id: 'PT-04',
    title: { en: 'Team Leadership', es: 'Liderazgo de equipo' },
    value: { en: '2 → 8 people', es: '2 → 8 personas' },
    body: {
      en: 'Hire, mentor and grow designers — a UX team from two people to a multidisciplinary eight, with room for each of them to get better.',
      es: 'Contrato, acompaño y hago crecer diseñadores: de dos personas a un equipo multidisciplinar de ocho, con sitio para que cada una mejore.',
    },
  },
];
