import type { L10n } from './types';

export type CaseImage = {
  /**
   * File name inside `/public/cases/`, WITHOUT the extension — the build
   * matches by name, so any image format works. A slot with no matching
   * file renders nothing.
   */
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
      en: 'One of Europe\u2019s biggest classifieds marketplaces \u2014 millions of people buying and selling to their neighbours, in just about every category you can think of.',
      es: 'Uno de los mayores marketplaces de clasificados de Europa: millones de personas comprando y vendiendo a sus vecinos, en casi cualquier categor\u00eda que se te ocurra.',
    },
    problem: {
      en: 'The bigger the marketplace got, the harder it became to find the right listing, trust the person on the other side and get through a flow without stumbling. None of it was one big broken thing \u2014 it was a hundred small inconsistencies, and at this scale small things get paid for in confidence.',
      es: 'Cuanto m\u00e1s crec\u00eda el marketplace, m\u00e1s costaba encontrar el anuncio adecuado, fiarte de quien est\u00e1 al otro lado y terminar un flujo sin tropezar. No hab\u00eda una cosa grande rota: hab\u00eda cien peque\u00f1as inconsistencias, y a esta escala lo peque\u00f1o se paga en confianza.',
    },
    solution: {
      en: 'We went after trust and consistency in the flows that carry the most traffic, and we did it by getting teams onto shared patterns instead of asking each of them to solve the same problem again. People navigate with more confidence; teams start from firmer ground.',
      es: 'Fuimos a por la confianza y la consistencia en los flujos con m\u00e1s tr\u00e1fico, y lo hicimos poniendo a los equipos sobre patrones compartidos en vez de pedirle a cada uno que resolviera otra vez lo mismo. La gente navega con m\u00e1s seguridad; los equipos parten de un suelo m\u00e1s firme.',
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
    images: [
      {
        src: 'kleinanzeigen-1',
        span: 'wide',
        alt: {
          en: 'The Kleinanzeigen app home screen: a greeting, a search field, a row of category icons, a promoted carousel, and stacked rows of listings above the main tab bar.',
          es: 'Pantalla de inicio de la app de Kleinanzeigen: saludo, buscador, fila de iconos de categoría, carrusel destacado y filas de anuncios sobre la barra de pestañas.',
        },
        caption: {
          en: 'The home screen, where category entry points and listing rows share a single scroll.',
          es: 'La pantalla de inicio, donde las categorías y las filas de anuncios comparten un mismo scroll.',
        },
      },
      {
        src: 'kleinanzeigen-pattern',
        span: 'wide',
        alt: {
          en: 'A diagram: the same listing row drawn four slightly different ways across four flows, then the one shared row used in all four.',
          es: 'Un diagrama: la misma fila de anuncio dibujada de cuatro formas ligeramente distintas en cuatro flujos, y despu\u00e9s la fila \u00fanica compartida usada en los cuatro.',
        },
        caption: {
          en: 'The listing row before and after: four near-identical variants, then one component with four uses.',
          es: 'La fila de anuncio antes y despu\u00e9s: cuatro variantes casi id\u00e9nticas, y luego un componente con cuatro usos.',
        },
      },
      {
        src: 'kleinanzeigen-4',
        span: 'wide',
        alt: {
          en: 'Three phone screens showing a messaging flow: the conversation list, a thread with the keyboard open mid-reply, and the same thread with the reply sent.',
          es: 'Tres pantallas de móvil con un flujo de mensajería: la lista de conversaciones, un hilo con el teclado abierto a media respuesta y el mismo hilo con la respuesta enviada.',
        },
        caption: {
          en: 'A messaging thread followed end to end, one of the flows where clarity mattered most.',
          es: 'Un hilo de mensajería seguido de principio a fin, uno de los flujos donde la claridad más importaba.',
        },
      },
      {
        src: 'kleinanzeigen-3',
        span: 'wide',
        alt: {
          en: 'Component documentation for buttons, a content switcher and tabs, each annotated with its variants and configurable properties.',
          es: 'Documentación de componentes para botones, un content switcher y pestañas, cada uno anotado con sus variantes y propiedades configurables.',
        },
        caption: {
          en: 'Buttons and navigation patterns, documented with the variants and properties teams can actually set.',
          es: 'Botones y patrones de navegación, documentados con las variantes y propiedades que los equipos pueden configurar.',
        },
      },
      {
        src: 'kleinanzeigen-5',
        span: 'wide',
        alt: {
          en: 'Component documentation for a slider, a number input and a text field, each with usage guidance, variants including error and disabled states, and configurable properties.',
          es: 'Documentación de componentes para un slider, un input numérico y un campo de texto, cada uno con pautas de uso, variantes —incluidos los estados de error y deshabilitado— y propiedades configurables.',
        },
        caption: {
          en: 'Form controls, each with the guidance that keeps teams from re-deciding the same thing.',
          es: 'Controles de formulario, cada uno con la pauta que evita que los equipos vuelvan a decidir lo mismo.',
        },
      },
      {
        src: 'kleinanzeigen-2',
        span: 'wide',
        alt: {
          en: 'Clear-space specification for the Kleinanzeigen logo, showing the horizontal and stacked lockups each with a 10% margin on every side.',
          es: 'Especificación del área de respeto del logo de Kleinanzeigen, con las versiones horizontal y apilada, cada una con un margen del 10% por cada lado.',
        },
        caption: {
          en: 'Clear-space rules, defined proportionally so both lockups hold at any size.',
          es: 'Área de respeto definida en proporción, para que ambas versiones aguanten a cualquier tamaño.',
        },
      },
    ],
  },
  {
    slug: 'fotocasa',
    company: 'Fotocasa & Habitaclia',
    featured: true,
    role: { en: 'Design Operations | Design Systems', es: 'Design Operations | Design Systems' },
    period: { en: 'Nov 2021 — May 2025', es: 'Nov 2021 — May 2025' },
    years: '2021',
    tagline: {
      en: 'SUI \u2014 the multi-brand design system that let several marketplaces ship consistently without all ending up looking the same.',
      es: 'SUI: el sistema de dise\u00f1o multimarca que permiti\u00f3 a varios marketplaces publicar de forma coherente sin acabar todos iguales.',
    },
    problem: {
      en: 'As the brands and the products multiplied, so did the copies. Teams kept rebuilding the same component slightly differently, which showed up outside as an inconsistent experience and inside as slower delivery. Multiply that by several brands and three countries and it stops being a nuisance and becomes a tax.',
      es: 'A medida que se multiplicaban marcas y productos, se multiplicaban las copias. Cada equipo reconstru\u00eda el mismo componente un poco distinto, y eso se ve\u00eda fuera como una experiencia inconsistente y dentro como entregas m\u00e1s lentas. Multipl\u00edcalo por varias marcas y tres pa\u00edses y deja de ser una molestia para convertirse en un impuesto.',
    },
    solution: {
      en: 'SUI gave design and product one shared foundation. The point was never to make the brands identical \u2014 it was to agree on the patterns, components and rules underneath and let each brand keep its own face on top. Shared tooling, documentation people actually read, and governance light enough that nobody routed around it.',
      es: 'SUI le dio a dise\u00f1o y producto unos cimientos comunes. El objetivo nunca fue que las marcas se parecieran: fue acordar los patrones, los componentes y las reglas de debajo, y dejar que cada marca mantuviera su cara encima. Herramientas compartidas, documentaci\u00f3n que la gente lee de verdad y una gobernanza lo bastante ligera como para que nadie la esquivara.',
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
    images: [
      {
        src: 'fotocasa-2',
        span: 'wide',
        alt: {
          en: 'The Fotocasa mobile home screen: a blue header, tabs for buying, renting and sharing, a property-type selector, a location search field, a search button, and a card resuming the last search.',
          es: 'La home móvil de Fotocasa: cabecera azul, pestañas de comprar, alquilar y compartir, selector de tipo de vivienda, buscador por ubicación, botón de buscar y una tarjeta que retoma la última búsqueda.',
        },
        caption: {
          en: 'The mobile home screen, assembled entirely from shared components.',
          es: 'La home móvil, montada por completo con componentes compartidos.',
        },
      },
      {
        src: 'fotocasa-tokens',
        span: 'wide',
        alt: {
          en: 'A diagram: five design tokens resolving to different values for Fotocasa and Habitaclia, and the same button rendered in each brand.',
          es: 'Un diagrama: cinco design tokens resolviendo a valores distintos para Fotocasa y Habitaclia, y el mismo bot\u00f3n renderizado en cada marca.',
        },
        caption: {
          en: 'How a token resolves: the system fixes the geometry, each brand keeps its colour and its radius.',
          es: 'C\u00f3mo resuelve un token: el sistema fija la geometr\u00eda y cada marca conserva su color y su radio.',
        },
      },
      {
        src: 'fotocasa-1',
        span: 'wide',
        alt: {
          en: 'Three Fotocasa phone screens side by side: the home search, a rental listing with price, size and contact actions, and a map view with clustered property pins over Barcelona.',
          es: 'Tres pantallas de móvil de Fotocasa: la búsqueda de la home, un anuncio de alquiler con precio, superficie y acciones de contacto, y una vista de mapa con chinchetas agrupadas sobre Barcelona.',
        },
        caption: {
          en: 'Search, listing and map — three very different screens holding one vocabulary.',
          es: 'Búsqueda, anuncio y mapa: tres pantallas muy distintas sosteniendo un mismo vocabulario.',
        },
      },
      {
        src: 'fotocasa-5',
        span: 'wide',
        alt: {
          en: 'A matrix of button specimens grouped into primary, secondary with blue text and secondary with black text, each shown across sizes, icon positions and default, hover, focus and disabled states.',
          es: 'Una matriz de botones agrupados en primarios, secundarios con texto azul y secundarios con texto negro, cada uno en varios tamaños, posiciones de icono y estados por defecto, hover, foco y deshabilitado.',
        },
        caption: {
          en: 'Every button the system allows — the point being how few of them there are.',
          es: 'Todos los botones que permite el sistema; la gracia está en lo pocos que son.',
        },
      },
      {
        src: 'fotocasa-4',
        span: 'wide',
        alt: {
          en: 'Text input specimens in three variants — plain, with a country dialling prefix, and with a help icon — each shown in default, hover, focus, filled, disabled and error states.',
          es: 'Campos de texto en tres variantes —simple, con prefijo telefónico de país y con icono de ayuda—, cada una en estado por defecto, hover, foco, relleno, deshabilitado y error.',
        },
        caption: {
          en: 'Input states defined once, so error and disabled never get improvised per team.',
          es: 'Estados definidos una vez, para que error y deshabilitado no se improvisen equipo por equipo.',
        },
      },
      {
        src: 'fotocasa-3',
        span: 'wide',
        alt: {
          en: 'Selection components: dropdown menus with a checked item, a location search listing provinces with result counts, and a collapsible checkbox tree of Barcelona districts and neighbourhoods.',
          es: 'Componentes de selección: menús desplegables con un elemento marcado, un buscador de ubicaciones con provincias y número de resultados, y un árbol plegable de distritos y barrios de Barcelona.',
        },
        caption: {
          en: 'Location selection, the pattern a property marketplace lives or dies by.',
          es: 'La selección de ubicación, el patrón del que vive o muere un portal inmobiliario.',
        },
      },
    ],
  },
  {
    slug: 'coches-net',
    company: 'coches.net',
    featured: true,
    role: { en: 'Head of User Experience', es: 'Head of User Experience' },
    period: { en: 'Nov 2007 — Nov 2021', es: 'Nov 2007 — Nov 2021' },
    years: '2007',
    tagline: {
      en: 'One of Spain\u2019s biggest car marketplaces, growing up: research as a habit, UX as a team, quality as a number.',
      es: 'Uno de los mayores marketplaces de coches de Espa\u00f1a, haci\u00e9ndose mayor: la investigaci\u00f3n como h\u00e1bito, UX como equipo y la calidad como n\u00famero.',
    },
    problem: {
      en: 'The product kept getting more complex and people kept expecting more of it, but the means to understand them had not kept up: legacy workflows, research that happened when there was room for it, and a UX team of two. Nobody could say, with evidence, whether the experience was getting better.',
      es: 'El producto se volv\u00eda m\u00e1s complejo y la gente esperaba m\u00e1s de \u00e9l, pero los medios para entenderla no hab\u00edan crecido igual: flujos heredados, investigaci\u00f3n cuando hab\u00eda hueco y un equipo de UX de dos personas. Nadie pod\u00eda decir, con pruebas, si la experiencia estaba mejorando.',
    },
    solution: {
      en: 'We made UX a discipline the company plans with, not a service it calls at the end. Research on a rhythm, a UX strategy anyone could repeat back to you, and satisfaction turned into a measured outcome \u2014 CSATs mapped to the key journeys and folded into company OKRs. The team went from two to eight along the way.',
      es: 'Convertimos UX en una disciplina con la que la compa\u00f1\u00eda planifica, no en un servicio al que llama al final. Investigaci\u00f3n con ritmo, una estrategia de UX que cualquiera pod\u00eda repetirte y la satisfacci\u00f3n convertida en resultado medible: CSATs mapeados a los journeys clave y metidos en los OKRs de compa\u00f1\u00eda. Por el camino, el equipo pas\u00f3 de dos a ocho.',
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
    images: [
      {
        src: 'coches-net-1',
        span: 'wide',
        alt: {
          en: 'A desktop vehicle search on coches.net: a filter rail with body-type and capacity checkboxes and a price slider, beside a grid of vehicle cards showing fuel, transmission, seats, a daily price and a red rental action.',
          es: 'Una búsqueda de vehículos de escritorio en coches.net: una columna de filtros con casillas de carrocería y capacidad y un slider de precio, junto a una rejilla de tarjetas con combustible, transmisión, plazas, precio por día y una acción de alquiler en rojo.',
        },
        caption: {
          en: 'Search, where filters and results have to stay legible together.',
          es: 'La búsqueda, donde filtros y resultados tienen que seguir siendo legibles a la vez.',
        },
      },
      {
        src: 'coches-net-csat',
        span: 'wide',
        alt: {
          en: 'A diagram: CSAT scores for four key flows as bars, with the lowest one feeding a quarterly objective and its three key results.',
          es: 'Un diagrama: los CSAT de cuatro flujos clave en barras, con el m\u00e1s bajo alimentando un objetivo trimestral y sus tres key results.',
        },
        caption: {
          en: 'Satisfaction as a number the plan can act on: the worst-scoring flow becomes the quarter\u2019s objective.',
          es: 'La satisfacci\u00f3n como un n\u00famero sobre el que se puede planificar: el flujo con peor nota se convierte en el objetivo del trimestre.',
        },
      },
      {
        src: 'coches-net-team',
        span: 'wide',
        alt: {
          en: 'A skill matrix: eight designers down the side, six disciplines across the top, each cell filled to the depth that person works at.',
          es: 'Una matriz de competencias: ocho dise\u00f1adores en vertical, seis disciplinas en horizontal, cada celda rellena hasta la profundidad a la que trabaja esa persona.',
        },
        caption: {
          en: 'The team as it was hired: T-shaped profiles, deliberately overlapping so no discipline had a single point of failure.',
          es: 'El equipo tal y como se contrat\u00f3: perfiles en T, solapados a prop\u00f3sito para que ninguna disciplina dependiera de una sola persona.',
        },
      },
      {
        src: 'coches-net-3',
        span: 'wide',
        alt: {
          en: 'Three coches.net phone screens: the home with search, condition filters and a featured carousel; a vehicle listing; and a screen of related vehicles beneath a video.',
          es: 'Tres pantallas de móvil de coches.net: la home con buscador, filtros por estado y un carrusel de destacados; un anuncio de vehículo; y una pantalla de vehículos relacionados bajo un vídeo.',
        },
        caption: {
          en: 'The mobile journey, from browsing to a single vehicle and out again.',
          es: 'El recorrido móvil, de la exploración a un vehículo concreto y de vuelta.',
        },
      },
      {
        src: 'coches-net-2',
        span: 'wide',
        alt: {
          en: 'A vehicle listing on a phone: a photo carousel, the model name and price, a description, specification chips for transmission, year, doors and fuel, colour swatches, and a red primary action.',
          es: 'Un anuncio de vehículo en móvil: carrusel de fotos, nombre del modelo y precio, descripción, chips de características para transmisión, año, puertas y combustible, muestras de color y una acción principal en rojo.',
        },
        caption: {
          en: 'The listing detail, where a buyer decides whether to make contact.',
          es: 'El detalle del anuncio, donde el comprador decide si contacta.',
        },
      },
    ],
  },
  {
    slug: 'bmw',
    company: 'BMW',
    featured: true,
    role: { en: 'Web Designer & Developer — Herraiz Soto', es: 'Web Designer & Developer — Herraiz Soto' },
    period: { en: 'Jan 2005 — Nov 2007', es: 'Ene 2005 — Nov 2007' },
    years: '2005',
    tagline: {
      en: 'A corporate site for BMW, built back when brand standards were strict and browsers were not.',
      es: 'Un site corporativo para BMW, construido cuando los est\u00e1ndares de marca eran estrictos y los navegadores no.',
    },
    problem: {
      en: 'A corporate car site had to look exactly like the brand book said, change constantly, and still work in the browsers of the day. Those three pulled in different directions, and the brand book never lost.',
      es: 'Un site corporativo de coches ten\u00eda que verse exactamente como dec\u00eda el manual de marca, cambiar constantemente y adem\u00e1s funcionar en los navegadores de la \u00e9poca. Las tres cosas tiraban en direcciones distintas, y el manual de marca no perd\u00eda nunca.',
    },
    solution: {
      en: 'Clean markup, layouts built so the content could change without breaking them, and visual execution accurate enough to pass brand review first time. Nothing clever \u2014 just careful, which in that context was the entire job.',
      es: 'Markup limpio, layouts construidos para que el contenido pudiera cambiar sin romperlos y una ejecuci\u00f3n visual lo bastante precisa como para pasar la revisi\u00f3n de marca a la primera. Nada ingenioso: cuidadoso, que en ese contexto era todo el trabajo.',
    },
    sections: [
      {
        title: { en: 'Context', es: 'Contexto' },
        body: {
          en: [
            'My work on BMW took place within a creative advertising agency environment at Herraiz Soto in Barcelona, where BMW was one of the main accounts. This context combined brand-driven creativity with real production needs, requiring close collaboration between creative, technical, and client-facing teams. The role was strongly hands-on, focused on translating creative concepts into functional, production-ready web experiences for the Spanish market.',
          ],
          es: [
            'Mi trabajo en BMW se desarrolló en el entorno de una agencia creativa, Herraiz Soto en Barcelona, donde BMW era una de las cuentas principales. Ese contexto combinaba creatividad de marca con necesidades reales de producción, exigiendo colaboración estrecha entre equipos creativos, técnicos y de cliente. El rol era muy hands-on, centrado en traducir conceptos creativos en experiencias web funcionales y listas para producción para el mercado español.',
          ],
        },
      },
      {
        title: { en: 'The work', es: 'El trabajo' },
        body: {
          en: [
            'The work involved designing and building web layouts, developing site structures, and implementing creative concepts across BMW. Particular attention was given to accurately translating visual designs into clean, maintainable front-end code, ensuring consistency across browsers and devices while respecting BMW’s strict brand standards.',
            'The result was a series of digital experiences that supported BMW’s brand presence in Spain, combining strong visual identity with reliable execution. While the scope was primarily executional, the work demanded a high level of attention to detail, responsiveness, and quality control, contributing to a consistent and polished digital presence for a global brand.',
          ],
          es: [
            'El trabajo consistió en diseñar y construir layouts web, desarrollar estructuras de site e implementar conceptos creativos en BMW. Se prestó especial atención a traducir con precisión los diseños visuales en código front-end limpio y mantenible, asegurando consistencia entre navegadores y dispositivos y respetando los estrictos estándares de marca de BMW.',
            'El resultado fue una serie de experiencias digitales que apoyaron la presencia de marca de BMW en España, combinando una identidad visual fuerte con una ejecución fiable. Aunque el alcance era principalmente de ejecución, el trabajo exigía un alto nivel de atención al detalle, capacidad de respuesta y control de calidad, contribuyendo a una presencia digital consistente y cuidada para una marca global.',
          ],
        },
      },
    ],
    achievements: {
      en: [
        'Designed and built web layouts and site structures across BMW for the Spanish market.',
        'Translated creative concepts into clean, maintainable, cross-browser front-end code.',
        'Worked to strict global brand standards inside a creative agency environment.',
      ],
      es: [
        'Diseñé y construí layouts y estructuras de site en BMW para el mercado español.',
        'Traduje conceptos creativos en código front-end limpio, mantenible y compatible entre navegadores.',
        'Trabajé bajo estándares de marca globales estrictos dentro de un entorno de agencia creativa.',
      ],
    },
    images: [
      {
        src: 'bmw-1',
        span: 'wide',
        alt: {
          en: 'The BMW homepage: a full-bleed photograph of a blue saloon on a mountain road, with the navigation bar, the headline “Elige lo que te mueve.”, a call-to-action button and a panel promoting new models.',
          es: 'La home de BMW: fotografía a sangre de una berlina azul en una carretera de montaña, con la barra de navegación, el titular «Elige lo que te mueve.», un botón de llamada a la acción y un panel de nuevos modelos.',
        },
        caption: {
          en: 'The homepage, where a full-bleed image had to carry the brand without crowding out the navigation.',
          es: 'La home, donde una imagen a sangre tenía que sostener la marca sin comerse la navegación.',
        },
      },
      {
        src: 'bmw-grid',
        span: 'wide',
        alt: {
          en: 'A diagram: a twelve-column grid with a masthead, an eight-column hero, a four-column aside and three modules sitting on it, with column and content widths called out.',
          es: 'Un diagrama: una ret\u00edcula de doce columnas con cabecera, un hero de ocho columnas, un lateral de cuatro y tres m\u00f3dulos encima, con las medidas de columna y de contenido acotadas.',
        },
        caption: {
          en: 'The grid the brand book prescribed, and the page assembled on top of it.',
          es: 'La ret\u00edcula que prescrib\u00eda el manual de marca, y la p\u00e1gina montada encima.',
        },
      },
      {
        src: 'bmw-2',
        span: 'wide',
        alt: {
          en: 'The same homepage layout shown inside a browser window, this time with a black coupé, demonstrating how the design holds with a different photograph.',
          es: 'La misma maquetación de la home dentro de una ventana de navegador, esta vez con un cupé negro, mostrando cómo aguanta el diseño con otra fotografía.',
        },
        caption: {
          en: 'The same layout with a different photograph — the contrast of the panels had to survive both.',
          es: 'La misma maquetación con otra fotografía: el contraste de los paneles tenía que aguantar en ambas.',
        },
      },
    ],
  },
];

export const featuredCases = cases.filter((c) => c.featured);
export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
