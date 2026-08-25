import type { L10n } from './types';

export type TimelineEntry = {
  id: string;
  company: string;
  role: L10n;
  period: L10n;
  /** Displayed in the left rail of the row. */
  range: string;
  location: L10n;
  bullets: L10n<string[]>;
  /** Slug of a case study page, when this role has one. */
  caseSlug?: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: 'kleinanzeigen',
    company: 'Kleinanzeigen',
    role: { en: 'Senior Product Design', es: 'Senior Product Design' },
    period: { en: 'Mar 2025 — Present', es: 'Mar 2025 — Actualidad' },
    range: '2025 —',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'kleinanzeigen',
    bullets: {
      en: [
        'Designing end-to-end experiences for one of the largest classifieds marketplaces in Europe, balancing user needs with business priorities and platform constraints.',
        'Bringing a systems-oriented mindset to scale consistency, reduce design debt, and support cross-team alignment.',
        'Contributing to strategic initiatives that improve usability, clarity, and overall product quality across high-traffic environments.',
        'Collaborating with PMs, engineering teams, and data analysts to define problems, explore solutions, and deliver meaningful product improvements.',
      ],
      es: [
        'Diseño de experiencias end-to-end para uno de los mayores marketplaces de clasificados de Europa, equilibrando necesidades de usuario, prioridades de negocio y restricciones de plataforma.',
        'Aporto una mentalidad de sistemas para escalar la consistencia, reducir deuda de diseño y sostener la alineación entre equipos.',
        'Contribuyo a iniciativas estratégicas que mejoran usabilidad, claridad y calidad de producto en entornos de alto tráfico.',
        'Colaboro con PMs, equipos de ingeniería y analistas de datos para definir problemas, explorar soluciones y entregar mejoras de producto relevantes.',
      ],
    },
  },
  {
    id: 'fotocasa',
    company: 'Fotocasa & Habitaclia',
    role: { en: 'Design Ops & Systems', es: 'Design Ops & Systems' },
    period: { en: 'Nov 2021 — May 2025', es: 'Nov 2021 — May 2025' },
    range: '2021 — 2025',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'fotocasa',
    bullets: {
      en: [
        'Led Design Operations for two major marketplaces, improving workflows, alignment, and delivery across multi-disciplinary teams.',
        'Built and evolved the Design System used across product teams, ensuring consistency, accessibility, and efficiency at scale.',
        'Ensured adoption of scalable systems through clear documentation, design tokens, and cross-team rituals.',
        'Strengthened design governance, workflow optimisation, and design-to-engineering collaboration across teams.',
        'Partnered with PMs, engineering leads, and stakeholders in Spain, France and Germany to align product vision, reduce friction, and elevate design maturity.',
      ],
      es: [
        'Lideré Design Operations para dos grandes marketplaces, mejorando flujos, alineación y entrega en equipos multidisciplinares.',
        'Construí e hice evolucionar el Design System usado por los equipos de producto, garantizando consistencia, accesibilidad y eficiencia a escala.',
        'Aseguré la adopción de sistemas escalables mediante documentación clara, design tokens y rituales entre equipos.',
        'Reforcé la gobernanza de diseño, la optimización de flujos y la colaboración diseño-ingeniería.',
        'Trabajé con PMs, leads de ingeniería y stakeholders en España, Francia y Alemania para alinear la visión de producto, reducir fricción y elevar la madurez de diseño.',
      ],
    },
  },
  {
    id: 'coches-head',
    company: 'coches.net',
    role: { en: 'Head of User Experience', es: 'Head of User Experience' },
    period: { en: 'Jan 2016 — Nov 2021', es: 'Ene 2016 — Nov 2021' },
    range: '2016 — 2021',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'coches-net',
    bullets: {
      en: [
        'Led the UX team for one of Spain’s largest automotive marketplaces, driving product strategy, research, and end-to-end design.',
        'Drove experience strategy and cross-functional leadership across product, engineering, and business teams.',
        'Elevated design maturity through research integration, structured processes, and design culture initiatives.',
        'Defined UX vision and processes, improving consistency, user understanding, and collaboration across squads.',
        'Built a user-centric culture by integrating research, workshops, and data insights into product decision-making.',
        'Mentored designers and contributed to organisational growth through hiring, onboarding, and coaching.',
      ],
      es: [
        'Lideré el equipo de UX de uno de los mayores marketplaces de automoción de España, impulsando estrategia de producto, investigación y diseño end-to-end.',
        'Impulsé la estrategia de experiencia y el liderazgo transversal entre producto, ingeniería y negocio.',
        'Elevé la madurez de diseño mediante integración de investigación, procesos estructurados e iniciativas de cultura de diseño.',
        'Definí la visión y los procesos de UX, mejorando consistencia, comprensión del usuario y colaboración entre squads.',
        'Construí una cultura centrada en el usuario integrando investigación, workshops e insights de datos en las decisiones de producto.',
        'Mentoricé diseñadores y contribuí al crecimiento organizativo mediante contratación, onboarding y coaching.',
      ],
    },
  },
  {
    id: 'coches-ux',
    company: 'coches.net',
    role: { en: 'UX & Web Development', es: 'UX y desarrollo web' },
    period: { en: 'Nov 2007 — Jan 2016', es: 'Nov 2007 — Ene 2016' },
    range: '2007 — 2016',
    location: { en: 'Barcelona', es: 'Barcelona' },
    bullets: {
      en: [
        'Worked across development (HTML, CSS, JS) and UX, combining technical execution with user-focused design principles.',
        'Designed and implemented UI components and frameworks still used across product teams.',
        'Collaborated closely with engineering to improve performance, usability, and consistency of key product areas.',
        'Built the foundational UX and design practices that the team later scaled at an organisational level.',
      ],
      es: [
        'Trabajé entre desarrollo (HTML, CSS, JS) y UX, combinando ejecución técnica con principios de diseño centrados en el usuario.',
        'Diseñé e implementé componentes de UI y frameworks que los equipos de producto siguieron usando después.',
        'Colaboré estrechamente con ingeniería para mejorar rendimiento, usabilidad y consistencia de áreas clave del producto.',
        'Construí las prácticas fundacionales de UX y diseño que el equipo escaló después a nivel organizativo.',
      ],
    },
  },
  {
    id: 'herraiz-soto',
    company: 'Herraiz Soto — BMW.es',
    role: { en: 'Web Design & Development', es: 'Diseño y desarrollo web' },
    period: { en: 'Jan 2005 — Nov 2007', es: 'Ene 2005 — Nov 2007' },
    range: '2005 — 2007',
    location: { en: 'Barcelona', es: 'Barcelona' },
    caseSlug: 'bmw',
    bullets: {
      en: [
        'Designed and built web layouts and site structures for BMW.es, one of the agency’s main accounts.',
        'Translated creative concepts into clean, maintainable, cross-browser front-end code.',
        'Worked to strict global brand standards alongside creative, technical and client-facing teams.',
      ],
      es: [
        'Diseñé y construí layouts y estructuras de site para BMW.es, una de las cuentas principales de la agencia.',
        'Traduje conceptos creativos en código front-end limpio, mantenible y compatible entre navegadores.',
        'Trabajé bajo estándares de marca globales estrictos junto a equipos creativos, técnicos y de cliente.',
      ],
    },
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: { en: 'Web Design & Development', es: 'Diseño y desarrollo web' },
    period: { en: 'Jan 2002 — Jan 2007', es: 'Ene 2002 — Ene 2007' },
    range: '2002 — 2007',
    location: { en: 'Barcelona', es: 'Barcelona' },
    bullets: {
      en: [
        'Independent design and front-end development work for a range of clients — the technical grounding that still shapes how I lead design today.',
      ],
      es: [
        'Diseño y desarrollo front-end independiente para distintos clientes — la base técnica que todavía hoy marca mi forma de liderar diseño.',
      ],
    },
  },
];
