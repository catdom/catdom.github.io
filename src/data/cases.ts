import type { L10n } from './types';

export type CaseImage = {
  /** Relative to `/public/cases/`. Slots render nothing until the file exists. */
  src: string;
  alt: L10n;
  caption?: L10n;
  /** `wide` spans the full content column, `half` sits in a two-up row. */
  span?: 'wide' | 'half';
};

export type CaseSection = {
  title: L10n;
  body: L10n<string[]>;
};

export type CaseStudy = {
  slug: string;
  company: string;
  /** Shown in the numbered list on the home page. */
  featured: boolean;
  role: L10n;
  period: L10n;
  years: string;
  tagline: L10n;
  problem: L10n;
  solution: L10n;
  sections: CaseSection[];
  achievements: L10n<string[]>;
  images: CaseImage[];
};

export const cases: CaseStudy[] = [
  {
    slug: 'kleinanzeigen',
    company: 'Kleinanzeigen',
    featured: true,
    role: { en: 'Senior Product Design', es: 'Senior Product Design' },
    period: { en: 'Mar 2025 — Present', es: 'Mar 2025 — Actualidad' },
    years: '2025',
    tagline: {
      en: 'A large-scale marketplace connecting millions of users to buy and sell locally across multiple categories.',
      es: 'Un marketplace de gran escala que conecta a millones de usuarios para comprar y vender en local a través de múltiples categorías.',
    },
    problem: {
      en: 'As the marketplace grew, users found it harder to discover relevant listings, trust interactions, and complete key flows smoothly. Small inconsistencies across the product added friction and reduced confidence, especially at scale.',
      es: 'A medida que el marketplace crecía, a los usuarios les costaba más descubrir anuncios relevantes, confiar en las interacciones y completar los flujos clave con fluidez. Pequeñas inconsistencias a lo largo del producto añadían fricción y restaban confianza, especialmente a escala.',
    },
    solution: {
      en: 'We focused on improving trust and consistency across key user flows by aligning teams around shared patterns and system-driven solutions. This helped users navigate more confidently while giving teams clearer foundations to build on.',
      es: 'Nos centramos en mejorar la confianza y la consistencia en los flujos clave alineando a los equipos alrededor de patrones compartidos y soluciones basadas en sistema. Esto ayudó a los usuarios a navegar con más seguridad y dio a los equipos unos cimientos más claros sobre los que construir.',
    },
    sections: [
      {
        title: { en: 'Context', es: 'Contexto' },
        body: {
          en: [
            'The work started by looking closely at how users were navigating the marketplace and where friction was appearing along the way. As the platform grew, it became clear that experience quality depended not only on design decisions, but also on how teams collaborated and reused solutions.',
            'Buying and selling second-hand items at scale introduces complexity well beyond simple listing and messaging flows. Users often struggle not only to find relevant listings, but to understand which results are trustworthy, how safe interactions are, and what to expect as they move through the buying or selling process. As categories, regions, and use cases grow, small inconsistencies in patterns, terminology, and flows quickly add friction and reduce confidence.',
          ],
          es: [
            'El trabajo empezó observando de cerca cómo navegaban los usuarios por el marketplace y dónde aparecía la fricción por el camino. A medida que la plataforma crecía, quedó claro que la calidad de la experiencia no dependía solo de las decisiones de diseño, sino también de cómo colaboraban los equipos y reutilizaban soluciones.',
            'Comprar y vender productos de segunda mano a escala introduce una complejidad que va mucho más allá de los flujos de publicación y mensajería. A menudo los usuarios no solo tienen dificultades para encontrar anuncios relevantes, sino para entender qué resultados son fiables, cómo de seguras son las interacciones y qué esperar mientras avanzan en el proceso de compra o venta. Al crecer las categorías, regiones y casos de uso, pequeñas inconsistencias en patrones, terminología y flujos añaden fricción rápidamente y reducen la confianza.',
          ],
        },
      },
      {
        title: { en: 'Approach', es: 'Enfoque' },
        body: {
          en: [
            'We combined user research, data insights, and hands-on collaboration with product and engineering teams to identify where clarity and consistency would have the biggest impact. Together, we reviewed existing patterns, reduced unnecessary variation, and defined shared solutions that teams could apply in their daily work.',
            'The focus was always on practical improvements that could be adopted easily, rather than building overly complex frameworks. This helped ensure that the work translated into real changes in how the product was designed and delivered.',
          ],
          es: [
            'Combinamos investigación de usuario, datos y colaboración directa con los equipos de producto e ingeniería para identificar dónde la claridad y la consistencia tendrían más impacto. Juntos revisamos los patrones existentes, redujimos la variación innecesaria y definimos soluciones compartidas que los equipos pudieran aplicar en su día a día.',
            'El foco estuvo siempre en mejoras prácticas y fáciles de adoptar, en lugar de construir frameworks excesivamente complejos. Eso ayudó a que el trabajo se tradujera en cambios reales en cómo se diseñaba y entregaba el producto.',
          ],
        },
      },
      {
        title: { en: 'Impact', es: 'Impacto' },
        body: {
          en: [
            'Over time, the marketplace experience became more predictable and easier to use for both buyers and sellers. Users were better able to find relevant listings, understand interactions, and complete transactions with greater confidence.',
            'Internally, teams benefited from clearer guidance and shared foundations, which reduced friction and improved delivery efficiency. These changes helped Kleinanzeigen continue to scale while maintaining a consistent and trustworthy user experience across categories and regions.',
          ],
          es: [
            'Con el tiempo, la experiencia del marketplace se volvió más predecible y fácil de usar tanto para compradores como para vendedores. Los usuarios encontraban mejor los anuncios relevantes, entendían las interacciones y completaban transacciones con más confianza.',
            'Internamente, los equipos se beneficiaron de guías más claras y cimientos compartidos, lo que redujo la fricción y mejoró la eficiencia de entrega. Estos cambios ayudaron a Kleinanzeigen a seguir escalando manteniendo una experiencia consistente y fiable entre categorías y regiones.',
          ],
        },
      },
    ],
    achievements: {
      en: [
        'Designing end-to-end experiences for one of the largest classifieds marketplaces in Europe, balancing user needs with business priorities and platform constraints.',
        'Bringing a systems-oriented mindset to scale consistency, reduce design debt, and support cross-team alignment.',
        'Contributing to strategic initiatives that improve usability, clarity, and overall product quality across high-traffic environments.',
        'Collaborating with PMs, engineering teams, and data analysts to define problems, explore solutions, and deliver meaningful product improvements.',
      ],
      es: [
        'Diseño de experiencias end-to-end para uno de los mayores marketplaces de clasificados de Europa, equilibrando necesidades de usuario, prioridades de negocio y restricciones de plataforma.',
        'Aportar una mentalidad de sistemas para escalar la consistencia, reducir deuda de diseño y sostener la alineación entre equipos.',
        'Contribuir a iniciativas estratégicas que mejoran usabilidad, claridad y calidad de producto en entornos de alto tráfico.',
        'Colaboración con PMs, equipos de ingeniería y analistas de datos para definir problemas, explorar soluciones y entregar mejoras de producto relevantes.',
      ],
    },
    images: [],
  },
  {
    slug: 'fotocasa',
    company: 'Fotocasa & Habitaclia',
    featured: true,
    role: { en: 'Design Operations | Design Systems', es: 'Design Operations | Design Systems' },
    period: { en: 'Nov 2021 — May 2025', es: 'Nov 2021 — May 2025' },
    years: '2021',
    tagline: {
      en: 'SUI — a multi-brand design system enabling consistent and scalable digital experiences across marketplaces.',
      es: 'SUI — un design system multimarca que permite experiencias digitales consistentes y escalables entre marketplaces.',
    },
    problem: {
      en: 'As digital marketplaces grew across brands and products, maintaining consistency and quality became increasingly difficult. Teams were working with duplicated components and slightly different patterns, which led to inconsistent user experiences and slower delivery. In a multi-brand and international context, this lack of shared foundations also made collaboration harder: design decisions were re-discussed, maintenance costs increased, and scaling product development became more complex than necessary.',
      es: 'A medida que los marketplaces digitales crecían entre marcas y productos, mantener la consistencia y la calidad se volvió cada vez más difícil. Los equipos trabajaban con componentes duplicados y patrones ligeramente distintos, lo que producía experiencias inconsistentes y entregas más lentas. En un contexto multimarca e internacional, esa falta de cimientos compartidos también dificultaba la colaboración: las decisiones de diseño se rediscutían, los costes de mantenimiento subían y escalar el desarrollo de producto era más complejo de lo necesario.',
    },
    solution: {
      en: 'SUI was created as a centralized, multi-brand design system to provide a shared foundation for design and product teams. The goal was not to make all brands look the same, but to define common patterns, components, and guidelines that could adapt to each brand’s identity. Through shared tooling, documentation, and governance, SUI helped teams work more efficiently while delivering consistent experiences across brands and regions.',
      es: 'SUI se creó como un design system multimarca y centralizado para dar unos cimientos compartidos a los equipos de diseño y producto. El objetivo no era que todas las marcas se vieran iguales, sino definir patrones, componentes y guías comunes capaces de adaptarse a la identidad de cada marca. Con herramientas, documentación y gobernanza compartidas, SUI ayudó a los equipos a trabajar de forma más eficiente entregando experiencias consistentes entre marcas y regiones.',
    },
    sections: [
      {
        title: { en: 'Context', es: 'Contexto' },
        body: {
          en: [
            'The initiative behind SUI was driven by the need to bring structure and alignment to a complex, multi-brand ecosystem. As platforms like Fotocasa, Habitaclia, Coches.net, Milanuncios, and InfoJobs evolved independently, differences in patterns, workflows, and tooling gradually increased friction for both users and internal teams.',
            'The goal was not simply to standardize visual elements, but to establish a shared system that could evolve over time. SUI was conceived as a flexible foundation capable of adapting to different brand identities while providing enough structure to reduce duplication, improve collaboration, and support long-term product development.',
          ],
          es: [
            'La iniciativa detrás de SUI nació de la necesidad de aportar estructura y alineación a un ecosistema multimarca complejo. Al evolucionar de forma independiente plataformas como Fotocasa, Habitaclia, Coches.net, Milanuncios e InfoJobs, las diferencias en patrones, flujos de trabajo y herramientas fueron aumentando la fricción tanto para usuarios como para equipos internos.',
            'El objetivo no era simplemente estandarizar elementos visuales, sino establecer un sistema compartido capaz de evolucionar en el tiempo. SUI se concibió como una base flexible, capaz de adaptarse a distintas identidades de marca y a la vez aportar estructura suficiente para reducir duplicación, mejorar la colaboración y sostener el desarrollo de producto a largo plazo.',
          ],
        },
      },
      {
        title: { en: 'Approach', es: 'Enfoque' },
        body: {
          en: [
            'We began by reviewing existing products, workflows, and design patterns across brands to understand what was shared and where differences actually mattered. Design, product, and engineering teams collaborated closely to identify reusable components and common interaction patterns.',
            'Instead of building everything upfront, we grew SUI incrementally. We focused on making it practical and usable in day-to-day work, supporting adoption with clear documentation, defined ownership, and simple governance. This helped teams trust and rely on the system as part of their normal workflow.',
          ],
          es: [
            'Empezamos revisando los productos, flujos y patrones de diseño existentes en las distintas marcas para entender qué era común y dónde las diferencias importaban de verdad. Los equipos de diseño, producto e ingeniería colaboraron estrechamente para identificar componentes reutilizables y patrones de interacción comunes.',
            'En lugar de construirlo todo de golpe, hicimos crecer SUI de forma incremental. Nos centramos en que fuera práctico y usable en el día a día, apoyando la adopción con documentación clara, ownership definido y una gobernanza simple. Eso ayudó a que los equipos confiaran en el sistema como parte de su flujo normal de trabajo.',
          ],
        },
      },
      {
        title: { en: 'Impact', es: 'Impacto' },
        body: {
          en: [
            'Beyond visual consistency, SUI established clearer workflows and shared ways of working between design, product, and engineering. Governance models helped teams make decisions with confidence, while documentation and tooling reduced ambiguity and onboarding effort. As a result, collaboration improved and delivery became more predictable across teams.',
            'The system was later extended to support international expansion, aligning with platforms such as Leboncoin and Kleinanzeigen. As SUI matured, it enabled faster delivery, improved quality, and stronger alignment across teams, helping multiple marketplaces scale consistently while maintaining a cohesive and recognizable user experience across brands and regions.',
          ],
          es: [
            'Más allá de la consistencia visual, SUI estableció flujos más claros y formas de trabajo compartidas entre diseño, producto e ingeniería. Los modelos de gobernanza ayudaron a los equipos a decidir con confianza, mientras que la documentación y el tooling redujeron la ambigüedad y el esfuerzo de onboarding. El resultado: mejor colaboración y una entrega más predecible entre equipos.',
            'El sistema se extendió después para dar soporte a la expansión internacional, alineándose con plataformas como Leboncoin y Kleinanzeigen. A medida que SUI maduró, permitió entregas más rápidas, mejor calidad y una alineación más fuerte entre equipos, ayudando a varios marketplaces a escalar de forma consistente manteniendo una experiencia cohesionada y reconocible entre marcas y regiones.',
          ],
        },
      },
    ],
    achievements: {
      en: [
        'Led Design Operations for two major marketplaces, improving workflows, alignment, and delivery across multi-disciplinary teams.',
        'Built and evolved the Design System used across product teams, ensuring consistency, accessibility, and efficiency at scale.',
        'Ensured adoption of scalable systems through clear documentation, design tokens, and cross-team rituals.',
        'Strengthened design governance, workflow optimisation, and design-to-engineering collaboration across teams.',
        'Partnered with PMs, engineering leads, and stakeholders in Spain, France and Germany to align product vision and elevate design maturity across the organisation.',
      ],
      es: [
        'Lideré Design Operations para dos grandes marketplaces, mejorando flujos, alineación y entrega en equipos multidisciplinares.',
        'Construí e hice evolucionar el Design System usado por los equipos de producto, garantizando consistencia, accesibilidad y eficiencia a escala.',
        'Aseguré la adopción de sistemas escalables mediante documentación clara, design tokens y rituales entre equipos.',
        'Reforcé la gobernanza de diseño, la optimización de flujos y la colaboración diseño-ingeniería.',
        'Trabajé con PMs, leads de ingeniería y stakeholders en España, Francia y Alemania para alinear la visión de producto y elevar la madurez de diseño de la organización.',
      ],
    },
    images: [],
  },
  {
    slug: 'coches-net',
    company: 'coches.net',
    featured: true,
    role: { en: 'Head of User Experience', es: 'Head of User Experience' },
    period: { en: 'Nov 2007 — Nov 2021', es: 'Nov 2007 — Nov 2021' },
    years: '2007',
    tagline: {
      en: 'A leading automotive marketplace evolving its user experience through research, culture, and scale.',
      es: 'Un marketplace de automoción líder que hizo evolucionar su experiencia de usuario a través de investigación, cultura y escala.',
    },
    problem: {
      en: 'As a high-traffic automotive marketplace matured, user expectations increased while product complexity continued to grow. Legacy workflows, limited research practices, and a small UX team made it difficult to consistently understand user needs and measure experience quality across critical journeys. Without shared metrics, clear UX strategy, or scalable team structures, aligning user satisfaction with business goals became increasingly challenging.',
      es: 'A medida que maduraba un marketplace de automoción de alto tráfico, las expectativas de los usuarios subían mientras la complejidad del producto seguía creciendo. Flujos heredados, prácticas de investigación limitadas y un equipo de UX pequeño dificultaban entender de forma consistente las necesidades de usuario y medir la calidad de la experiencia en los journeys críticos. Sin métricas compartidas, estrategia de UX clara ni estructuras de equipo escalables, alinear la satisfacción de usuario con los objetivos de negocio era cada vez más difícil.',
    },
    solution: {
      en: 'Coches.net addressed these challenges by establishing UX as a strategic discipline embedded across the organization. Through structured research practices, user-centered metrics, and a clear UX strategy, the platform evolved towards measurable, outcome-driven experiences. By scaling the UX team, defining roles and growth paths, and aligning UX initiatives with company OKRs, user satisfaction became a core driver of product and business decisions.',
      es: 'Coches.net abordó estos retos estableciendo UX como una disciplina estratégica integrada en toda la organización. Mediante prácticas de investigación estructuradas, métricas centradas en el usuario y una estrategia de UX clara, la plataforma evolucionó hacia experiencias medibles y orientadas a resultados. Al escalar el equipo de UX, definir roles y planes de crecimiento y alinear las iniciativas de UX con los OKRs de compañía, la satisfacción de usuario pasó a ser un motor central de las decisiones de producto y negocio.',
    },
    sections: [
      {
        title: { en: 'Context', es: 'Contexto' },
        body: {
          en: [
            'The transformation at coches.net was shaped by a long-term commitment to improving user experience from both a hands-on and leadership perspective. Over a thirteen-year period, the role evolved from UX and web development execution to leading UX at an organizational level. This progression provided a deep understanding of the product, users, and technical constraints, creating a strong foundation for driving change at scale.',
            'As the platform grew in complexity and traffic, UX needed to move beyond individual improvements and become a strategic discipline. This shift enabled the introduction of research as a core input for decision-making and helped establish a shared understanding of user needs across product, design, and engineering teams.',
          ],
          es: [
            'La transformación en coches.net se construyó sobre un compromiso a largo plazo con la experiencia de usuario, tanto desde la ejecución como desde el liderazgo. A lo largo de trece años, el rol evolucionó desde la ejecución de UX y desarrollo web hasta liderar UX a nivel organizativo. Esa progresión aportó un conocimiento profundo del producto, los usuarios y las restricciones técnicas, creando una base sólida para impulsar el cambio a escala.',
            'Al crecer la plataforma en complejidad y tráfico, UX tuvo que ir más allá de las mejoras puntuales y convertirse en una disciplina estratégica. Ese giro permitió introducir la investigación como input central en la toma de decisiones y ayudó a establecer un entendimiento compartido de las necesidades de usuario entre producto, diseño e ingeniería.',
          ],
        },
      },
      {
        title: { en: 'Building UX foundations', es: 'Construir los cimientos de UX' },
        body: {
          en: [
            'The work focused on creating the structures required to scale UX sustainably. Research practices were formalized to inform product direction, replacing assumptions with evidence and making user insights accessible across teams. UX strategy provided clarity on priorities, helping teams align day-to-day decisions with long-term product goals.',
            'To support team growth and balance, T-shaped profiles and a skill matrix were introduced. These frameworks helped define roles, expectations, and development paths, ensuring the team combined deep expertise with cross-functional versatility. This approach strengthened collaboration and reduced dependencies as the organization scaled.',
          ],
          es: [
            'El trabajo se centró en crear las estructuras necesarias para escalar UX de forma sostenible. Se formalizaron las prácticas de investigación para informar la dirección de producto, sustituyendo suposiciones por evidencia y haciendo accesibles los insights a todos los equipos. La estrategia de UX aportó claridad sobre las prioridades, ayudando a alinear las decisiones del día a día con los objetivos de producto a largo plazo.',
            'Para sostener el crecimiento y el equilibrio del equipo se introdujeron perfiles en T y una matriz de competencias. Estos marcos ayudaron a definir roles, expectativas y planes de desarrollo, asegurando que el equipo combinara especialización profunda con versatilidad transversal. Este enfoque reforzó la colaboración y redujo dependencias a medida que la organización escalaba.',
          ],
        },
      },
      {
        title: { en: 'Measurement and alignment', es: 'Medición y alineación' },
        body: {
          en: [
            'User satisfaction became a measurable and shared outcome through the introduction of CSATs mapped to key user flows. Measuring experience at the journey level connected UX quality directly to product performance, shifting conversations from subjective opinions to observable impact. These insights helped teams identify friction points and prioritize the improvements that mattered most to users.',
            'CSATs and research findings were later integrated into company-level OKRs, aligning UX initiatives with broader business objectives. This alignment reinforced UX as a strategic driver rather than a support function, ensuring that user experience remained central to decision-making across the organization.',
          ],
          es: [
            'La satisfacción de usuario se convirtió en un resultado medible y compartido gracias a la introducción de CSATs mapeados a los flujos clave. Medir la experiencia a nivel de journey conectó la calidad de UX directamente con el rendimiento de producto, cambiando las conversaciones de opiniones subjetivas a impacto observable. Estos datos ayudaron a identificar puntos de fricción y priorizar las mejoras que más importaban a los usuarios.',
            'Los CSATs y los hallazgos de investigación se integraron después en los OKRs de compañía, alineando las iniciativas de UX con los objetivos de negocio. Esa alineación consolidó UX como motor estratégico en lugar de función de soporte, asegurando que la experiencia de usuario siguiera siendo central en la toma de decisiones.',
          ],
        },
      },
      {
        title: { en: 'Team growth and impact', es: 'Crecimiento de equipo e impacto' },
        body: {
          en: [
            'As UX maturity increased, the team scaled from two designers to a multidisciplinary group of eight. Hiring focused not only on craft, but on collaboration, ownership, and strategic thinking. Clear roles, shared principles, and consistent feedback practices helped maintain quality and cohesion as the team grew.',
            'Together, these changes strengthened UX as an organizational capability at coches.net. By combining research, strategy, metrics, and people development, the UX function evolved into a sustainable system that enabled better products, stronger alignment, and long-term impact across the platform.',
          ],
          es: [
            'Al aumentar la madurez de UX, el equipo pasó de dos diseñadores a un grupo multidisciplinar de ocho. La contratación no se centró solo en el oficio, sino en la colaboración, el ownership y el pensamiento estratégico. Roles claros, principios compartidos y prácticas de feedback consistentes ayudaron a mantener la calidad y la cohesión durante el crecimiento.',
            'En conjunto, estos cambios consolidaron UX como capacidad organizativa en coches.net. Combinando investigación, estrategia, métricas y desarrollo de personas, la función de UX se convirtió en un sistema sostenible que permitió mejores productos, más alineación e impacto a largo plazo en toda la plataforma.',
          ],
        },
      },
    ],
    achievements: {
      en: [
        'Led the UX team for one of Spain’s largest automotive marketplaces, driving product strategy, research, and end-to-end design.',
        'Grew the team from two designers to a multidisciplinary group of eight, with defined roles, T-shaped profiles and a skill matrix.',
        'Introduced CSATs mapped to key user flows and integrated them into company-level OKRs.',
        'Elevated design maturity through research integration, structured processes, and design culture initiatives.',
        'Mentored designers and contributed to organisational growth through hiring, onboarding, and coaching.',
      ],
      es: [
        'Lideré el equipo de UX de uno de los mayores marketplaces de automoción de España, impulsando estrategia de producto, investigación y diseño end-to-end.',
        'Hice crecer el equipo de dos diseñadores a un grupo multidisciplinar de ocho, con roles definidos, perfiles en T y matriz de competencias.',
        'Introduje CSATs mapeados a los flujos clave e integrados en los OKRs de compañía.',
        'Elevé la madurez de diseño mediante la integración de investigación, procesos estructurados e iniciativas de cultura de diseño.',
        'Mentoricé a diseñadores y contribuí al crecimiento organizativo mediante contratación, onboarding y coaching.',
      ],
    },
    images: [],
  },
  {
    slug: 'bmw',
    company: 'BMW.es',
    featured: false,
    role: { en: 'Web Designer & Developer — Herraiz Soto', es: 'Web Designer & Developer — Herraiz Soto' },
    period: { en: 'Jan 2005 — Nov 2007', es: 'Ene 2005 — Nov 2007' },
    years: '2005',
    tagline: {
      en: 'A corporate automotive website focused on performance, brand, and digital presence.',
      es: 'Un site corporativo de automoción centrado en rendimiento, marca y presencia digital.',
    },
    problem: {
      en: 'At the time, corporate automotive websites needed to balance strong brand expression with growing digital demands. Maintaining visual consistency, performance, and cross-browser compatibility was challenging in an environment where content updates were frequent and technical constraints were significant.',
      es: 'En aquel momento, los sites corporativos de automoción tenían que equilibrar una expresión de marca potente con exigencias digitales crecientes. Mantener consistencia visual, rendimiento y compatibilidad entre navegadores era complicado en un entorno con actualizaciones de contenido frecuentes y restricciones técnicas importantes.',
    },
    solution: {
      en: 'BMW.es addressed these challenges through careful front-end implementation and structured web layouts that respected brand guidelines while ensuring technical reliability. By focusing on clean markup, consistency, and accurate visual execution, the website maintained a strong brand presence and a stable user experience across devices and browsers.',
      es: 'BMW.es abordó estos retos con una implementación front-end cuidadosa y layouts estructurados que respetaban las guías de marca garantizando fiabilidad técnica. Con foco en markup limpio, consistencia y ejecución visual precisa, el site mantuvo una presencia de marca fuerte y una experiencia estable entre dispositivos y navegadores.',
    },
    sections: [
      {
        title: { en: 'Context', es: 'Contexto' },
        body: {
          en: [
            'My work on BMW.es took place within a creative advertising agency environment at Herraiz Soto in Barcelona, where BMW was one of the main accounts. This context combined brand-driven creativity with real production needs, requiring close collaboration between creative, technical, and client-facing teams. The role was strongly hands-on, focused on translating creative concepts into functional, production-ready web experiences for the Spanish market.',
          ],
          es: [
            'Mi trabajo en BMW.es se desarrolló en el entorno de una agencia creativa, Herraiz Soto en Barcelona, donde BMW era una de las cuentas principales. Ese contexto combinaba creatividad de marca con necesidades reales de producción, exigiendo colaboración estrecha entre equipos creativos, técnicos y de cliente. El rol era muy hands-on, centrado en traducir conceptos creativos en experiencias web funcionales y listas para producción para el mercado español.',
          ],
        },
      },
      {
        title: { en: 'The work', es: 'El trabajo' },
        body: {
          en: [
            'The work involved designing and building web layouts, developing site structures, and implementing creative concepts across BMW.es. Particular attention was given to accurately translating visual designs into clean, maintainable front-end code, ensuring consistency across browsers and devices while respecting BMW’s strict brand standards.',
            'The result was a series of digital experiences that supported BMW’s brand presence in Spain, combining strong visual identity with reliable execution. While the scope was primarily executional, the work demanded a high level of attention to detail, responsiveness, and quality control, contributing to a consistent and polished digital presence for a global brand.',
          ],
          es: [
            'El trabajo consistió en diseñar y construir layouts web, desarrollar estructuras de site e implementar conceptos creativos en BMW.es. Se prestó especial atención a traducir con precisión los diseños visuales en código front-end limpio y mantenible, asegurando consistencia entre navegadores y dispositivos y respetando los estrictos estándares de marca de BMW.',
            'El resultado fue una serie de experiencias digitales que apoyaron la presencia de marca de BMW en España, combinando una identidad visual fuerte con una ejecución fiable. Aunque el alcance era principalmente de ejecución, el trabajo exigía un alto nivel de atención al detalle, capacidad de respuesta y control de calidad, contribuyendo a una presencia digital consistente y cuidada para una marca global.',
          ],
        },
      },
    ],
    achievements: {
      en: [
        'Designed and built web layouts and site structures across BMW.es for the Spanish market.',
        'Translated creative concepts into clean, maintainable, cross-browser front-end code.',
        'Worked to strict global brand standards inside a creative agency environment.',
      ],
      es: [
        'Diseñé y construí layouts y estructuras de site en BMW.es para el mercado español.',
        'Traduje conceptos creativos en código front-end limpio, mantenible y compatible entre navegadores.',
        'Trabajé bajo estándares de marca globales estrictos dentro de un entorno de agencia creativa.',
      ],
    },
    images: [],
  },
];

export const featuredCases = cases.filter((c) => c.featured);
export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
