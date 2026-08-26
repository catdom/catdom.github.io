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
      en: 'Turning user research and data into a direction teams can act on. I define UX vision, map journeys, and tie experience quality to metrics the business already tracks — CSATs mapped to key flows, folded into company OKRs.',
      es: 'Convertir investigación y datos en una dirección accionable. Defino la visión de UX, mapeo journeys y conecto la calidad de la experiencia con métricas que el negocio ya sigue — CSATs mapeados a flujos clave, integrados en los OKRs de compañía.',
    },
  },
  {
    id: 'PT-02',
    title: { en: 'Design Operations', es: 'Design Operations' },
    value: { en: '3 countries', es: '3 países' },
    body: {
      en: 'Reducing friction between design, product and engineering. Workflows, rituals, governance and documentation that make delivery predictable — so designers spend their time designing instead of negotiating process.',
      es: 'Reducir la fricción entre diseño, producto e ingeniería. Flujos, rituales, gobernanza y documentación que hacen la entrega predecible — para que los diseñadores diseñen en vez de negociar procesos.',
    },
  },
  {
    id: 'PT-03',
    title: { en: 'Design Systems', es: 'Design Systems' },
    value: { en: '7 brands', es: '7 marcas' },
    body: {
      en: 'Building systems teams actually adopt. Multi-brand components, design tokens, clear ownership and simple governance — grown incrementally rather than shipped as a big-bang framework nobody uses.',
      es: 'Construir sistemas que los equipos adoptan de verdad. Componentes multimarca, design tokens, ownership claro y gobernanza simple — creciendo de forma incremental en vez de lanzar un framework enorme que nadie usa.',
    },
  },
  {
    id: 'PT-04',
    title: { en: 'Leading & growing teams', es: 'Liderar y hacer crecer equipos' },
    value: { en: '2 → 8 people', es: '2 → 8 personas' },
    body: {
      en: 'Hiring, onboarding, mentoring and career paths. I have grown a UX team from two designers to a multidisciplinary group of eight, using T-shaped profiles and a skill matrix to keep depth and versatility in balance.',
      es: 'Contratación, onboarding, mentoring y planes de carrera. He hecho crecer un equipo de UX de dos diseñadores a un grupo multidisciplinar de ocho, con perfiles en T y una matriz de competencias para equilibrar profundidad y versatilidad.',
    },
  },
];
