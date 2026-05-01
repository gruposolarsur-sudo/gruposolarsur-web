import type { ProjectServiceKey } from "@/data/projectServices";

export type ProjectDetailIcon =
  | "type"
  | "mount"
  | "module"
  | "inverter"
  | "shield"
  | "status"
  | "service"
  | "unit"
  | "control"
  | "design"
  | "inspection"
  | "target"
  | "battery";

export type PhotovoltaicSolutionKey =
  | "coplanar"
  | "pergola"
  | "tilted"
  | "industrial-ground";

export type ProjectStorySectionTone = "default" | "accent" | "neutral";

export type ProjectStorySection = {
  title: string;
  copy?: string;
  items?: string[];
  footnote?: string;
  tone?: ProjectStorySectionTone;
};

export type ProjectStoryCta = {
  title: string;
  copy: string;
  href: string;
  label: string;
};

export const photovoltaicSolutions: Array<{
  key: PhotovoltaicSolutionKey;
  title: string;
  copy: string;
}> = [
  {
    key: "coplanar",
    title: "Instalación coplanar",
    copy: "Paneles integrados sobre la misma inclinación de la cubierta, una solución limpia y discreta para tejados inclinados.",
  },
  {
    key: "pergola",
    title: "Tipo pérgola solar",
    copy: "Estructuras que generan sombra y producción fotovoltaica en patios, aparcamientos, terrazas o zonas exteriores.",
  },
  {
    key: "tilted",
    title: "Estructuras inclinadas",
    copy: "Montajes sobre cubierta plana para orientar mejor los módulos y optimizar producción, seguridad y mantenimiento.",
  },
  {
    key: "industrial-ground",
    title: "Cubiertas industriales y suelo",
    copy: "Soluciones para naves, negocios, comunidades o espacios técnicos donde hace falta una estructura específica.",
  },
];

export type ProjectStory = {
  slug: string;
  title: string;
  category: string;
  installationType: string;
  zone: string;
  province: string;
  image: string;
  imageAlt?: string;
  galleryImages?: string[];
  galleryImageAlts?: string[];
  summary: string;
  blogSummary: string;
  publishedAt: string;
  mapPosition: {
    x: number;
    y: number;
  };
  serviceKeys?: ProjectServiceKey[];
  solutionKey?: PhotovoltaicSolutionKey;
  technicalSheet: Array<{
    label: string;
    value: string;
    icon: ProjectDetailIcon;
  }>;
  technicalNote: string;
  contentSections?: ProjectStorySection[];
  cta?: ProjectStoryCta;
};

export const projectStories: ProjectStory[] = [
  {
    slug: "instalacion-fotovoltaica-vivienda-malaga-terraza",
    title: "Instalación fotovoltaica en vivienda en Málaga",
    category: "Obra fotovoltaica residencial",
    installationType: "Autoconsumo residencial en terraza",
    zone: "Málaga",
    province: "Málaga",
    image:
      "/proyectos/fotovoltaica/malaga/instalacion-placas-solares-malaga-coplanar-hibrido.webp",
    imageAlt:
      "Instalación de placas solares en terraza en Málaga con estructura elevada",
    galleryImages: [
      "/proyectos/fotovoltaica/malaga/instalacion-placas-solares-malaga-coplanar-hibrido.webp",
      "/proyectos/fotovoltaica/malaga/instalacion-placas-solares-malaga-coplanar.webp",
    ],
    galleryImageAlts: [
      "Instalación de placas solares en terraza en Málaga con estructura elevada",
      "Vista exterior de paneles solares en terraza residencial en Málaga",
    ],
    summary:
      "Instalación fotovoltaica sobre terraza con estructura metálica elevada, preparada para autoconsumo residencial y almacenamiento escalable.",
    blogSummary:
      "Publicamos un proyecto residencial en Málaga con paneles Canadian Solar TOPHiKu6, inversor Axpert VM III de 5 kW, batería Deye LiFePO4 y tramitación completa para autoconsumo en terraza.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 48, y: 65 },
    serviceKeys: ["photovoltaic"],
    solutionKey: "tilted",
    technicalSheet: [
      {
        label: "Tipo",
        value: "Autoconsumo residencial en terraza",
        icon: "type",
      },
      { label: "Superficie", value: "Vivienda de 119 m²", icon: "design" },
      {
        label: "Montaje",
        value: "Estructura metálica elevada con inclinación sobre terraza",
        icon: "mount",
      },
      {
        label: "Paneles",
        value: "Canadian Solar TOPHiKu6 de hasta 555 W por módulo",
        icon: "module",
      },
      {
        label: "Inversor",
        value: "Axpert VM III 5 kW híbrido con monitorización",
        icon: "inverter",
      },
      {
        label: "Batería",
        value: "Deye LiFePO4 de 5,12 kWh por módulo y +6000 ciclos",
        icon: "battery",
      },
      {
        label: "Sistema",
        value: "Autoconsumo con almacenamiento y arquitectura escalable",
        icon: "target",
      },
      {
        label: "Control",
        value: "Monitorización vía app para seguimiento del sistema",
        icon: "control",
      },
      {
        label: "Tramitación",
        value: "Memoria técnica, licencia, legalización y Ecovivienda L4",
        icon: "status",
      },
    ],
    technicalNote:
      "Proyecto con tramitación incluida: memoria técnica, licencia de obra, legalización en industria y apoyo para la subvención Plan Ecovivienda Línea 4.",
  },
  {
    slug: "subvencion-energia-solar-benacazon-sevilla",
    title: "Subvención energética solar en Benacazón (Sevilla)",
    category: "Ayudas y subvenciones",
    installationType: "Rehabilitación energética subvencionada",
    zone: "Benacazón, Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/ayudas-y-subvenciones/sevilla/benacazon/placas-solares-tejado.webp",
    imageAlt:
      "Instalación energética subvencionada en Benacazón con paneles solares sobre cubierta",
    galleryImages: [
      "/proyectos/ayudas-y-subvenciones/sevilla/benacazon/placas-solares-tejado.webp",
      "/proyectos/ayudas-y-subvenciones/sevilla/benacazon/inversor-bateria-instalacion.webp",
    ],
    galleryImageAlts: [
      "Paneles solares instalados sobre cubierta inclinada en vivienda de Benacazón",
      "Detalle del equipo inversor de la instalación subvencionada en Benacazón",
    ],
    summary:
      "Instalación energética subvencionada dentro del Plan Ecovivienda, con reducción del consumo energético de hasta el 98,87% y ayudas de hasta el 80% en una vivienda de Benacazón.",
    blogSummary:
      "Documentamos un proyecto real en Benacazón con fotovoltaica de 4,20 kWp, solar térmica por termosifón de 200 litros y expediente Plan Ecovivienda, con ahorro energético de hasta el 98,87% y una ayuda superior a 10.000 €.",
    publishedAt: "Obra subvencionada",
    mapPosition: { x: 24, y: 48 },
    serviceKeys: ["subsidies", "solar-thermal", "photovoltaic"],
    technicalSheet: [
      {
        label: "Tipo",
        value: "Rehabilitación energética subvencionada",
        icon: "type",
      },
      {
        label: "Programa",
        value: "Plan Ecovivienda",
        icon: "status",
      },
      {
        label: "Ahorro energético",
        value: "Hasta el 98,87%",
        icon: "target",
      },
      {
        label: "Subvención",
        value: "Hasta el 80% y más de 10.000 € de ayuda",
        icon: "control",
      },
      {
        label: "Fotovoltaica",
        value: "4,20 kWp con compensación de excedentes",
        icon: "module",
      },
      {
        label: "Inversor",
        value: "Inversor monofásico de 4,6 kW",
        icon: "inverter",
      },
      {
        label: "Solar térmica",
        value: "Sistema termosifón con acumulador de 200 litros",
        icon: "service",
      },
      {
        label: "Cobertura ACS",
        value: "Superior al 70% del consumo de agua caliente",
        icon: "unit",
      },
      {
        label: "Montaje",
        value: "Instalación sobre cubierta inclinada",
        icon: "mount",
      },
      {
        label: "Justificación",
        value: "Reducción superior al 60% e integración de renovables",
        icon: "shield",
      },
    ],
    technicalNote:
      "Proyecto residencial en Benacazón orientado a rehabilitación energética, combinando autoconsumo fotovoltaico y solar térmica para ACS con gestión documental integral del expediente subvencionable.",
    contentSections: [
      {
        title: "Resultados del proyecto",
        tone: "accent",
        items: [
          "Ahorro energético estimado de hasta el 98,87%.",
          "Subvención obtenida de hasta el 80% del coste elegible.",
          "Ayuda económica superior a 10.000 €.",
          "Mejora de la eficiencia y revalorización de la vivienda.",
        ],
      },
      {
        title: "Instalación solar térmica (ACS)",
        copy:
          "Sistema solar térmico diseñado para producir agua caliente sanitaria mediante energía solar, con funcionamiento autónomo y sin consumo eléctrico en la circulación.",
        items: [
          "Sistema termosifón sin bombeo.",
          "Depósito acumulador de 200 litros.",
          "Cobertura superior al 70% del consumo de ACS.",
          "Funcionamiento por circulación natural.",
          "Mantenimiento mínimo.",
        ],
      },
      {
        title: "Instalación fotovoltaica",
        items: [
          "Potencia instalada de 4,20 kWp.",
          "Inversor monofásico de 4,6 kW.",
          "Sistema con compensación de excedentes.",
          "Instalación sobre cubierta inclinada.",
          "Producción optimizada para autoconsumo.",
        ],
      },
      {
        title: "Por qué obtiene subvención",
        tone: "neutral",
        copy:
          "Este proyecto cumple los criterios habituales de rehabilitación energética por reducción de demanda e integración de energías renovables.",
        items: [
          "Reducción del consumo energético superior al 60%.",
          "Integración de energías renovables en la vivienda.",
          "Mejora de la eficiencia energética del edificio.",
          "Cumplimiento del CTE HE4 para contribución solar mínima.",
        ],
        footnote:
          "En este tipo de expedientes del Plan Ecovivienda, la cobertura de la ayuda podía situarse entre el 40% y el 80% según la mejora energética acreditada.",
      },
    ],
    cta: {
      title: "¿Quieres conseguir una subvención como esta?",
      copy:
        "En Grupo SolarSur gestionamos el proceso completo: estudio energético, instalación, documentación, legalización y tramitación de ayudas.",
      href: "/#contacto",
      label: "Solicitar estudio gratuito",
    },
  },
  {
    slug: "subvencion-placas-solares-el-puerto-de-santa-maria-cadiz",
    title: "Subvención placas solares en El Puerto de Santa María (Cádiz)",
    category: "Obra fotovoltaica subvencionada",
    installationType: "Autoconsumo fotovoltaico subvencionado conectado a red",
    zone: "El Puerto de Santa María, Cádiz",
    province: "Cádiz",
    image:
      "/proyectos/fotovoltaica/cadiz/el-puerto-de-santa-maria/placas-solares-fotovoltaicas-el-puerto-de-santa-maria.webp",
    imageAlt:
      "Instalación de placas solares en El Puerto de Santa María con estructura inclinada sobre cubierta",
    galleryImages: [
      "/proyectos/fotovoltaica/cadiz/el-puerto-de-santa-maria/placas-solares-fotovoltaicas-el-puerto-de-santa-maria.webp",
      "/proyectos/fotovoltaica/cadiz/el-puerto-de-santa-maria/instalacion-paneles-solares-vivienda-el-puerto-de-santa-maria.webp",
      "/proyectos/fotovoltaica/cadiz/el-puerto-de-santa-maria/instalacion-placas-solares-el-puerto-de-santa-maria.webp",
      "/proyectos/fotovoltaica/cadiz/el-puerto-de-santa-maria/montaje-placas-solares-el-puerto-de-santa-maria.webp",
    ],
    galleryImageAlts: [
      "Vista general de la instalación fotovoltaica subvencionada en El Puerto de Santa María",
      "Paneles solares residenciales instalados en vivienda de El Puerto de Santa María",
      "Detalle del campo fotovoltaico y estructura inclinada en cubierta",
      "Montaje de placas solares con estructura de aluminio en vivienda de Cádiz",
    ],
    summary:
      "Instalación fotovoltaica residencial acogida al Plan Ecovivienda, con subvención del 80%, estructura inclinada sobre cubierta y una producción estimada cercana a 7.500 kWh al año.",
    blogSummary:
      "Publicamos un caso real en El Puerto de Santa María con 4,45 kWp, 10 paneles LONGi de 445 W, inversor híbrido monofásico de 4,6 kW, estructura inclinada y una subvención del 80% dentro del Plan Ecovivienda.",
    publishedAt: "Obra subvencionada",
    mapPosition: { x: 13, y: 58 },
    serviceKeys: ["photovoltaic", "subsidies"],
    solutionKey: "tilted",
    technicalSheet: [
      {
        label: "Tipo",
        value: "Autoconsumo fotovoltaico conectado a red",
        icon: "type",
      },
      {
        label: "Programa",
        value: "Plan Ecovivienda con subvención del 80%",
        icon: "status",
      },
      { label: "Potencia", value: "4,45 kWp", icon: "target" },
      {
        label: "Paneles",
        value: "10 módulos LONGi 445 W monocristalinos",
        icon: "module",
      },
      {
        label: "Inversor",
        value: "Híbrido monofásico de 4,6 kW",
        icon: "inverter",
      },
      {
        label: "Montaje",
        value: "Estructura inclinada sobre cubierta",
        icon: "mount",
      },
      {
        label: "Control",
        value: "App móvil con monitorización y vatímetro",
        icon: "control",
      },
      {
        label: "Protecciones",
        value: "Cableado DC/AC y protecciones según normativa REBT",
        icon: "shield",
      },
      {
        label: "Coste final",
        value: "2.029,60 € tras subvención",
        icon: "unit",
      },
    ],
    technicalNote:
      "Proyecto residencial en El Puerto de Santa María con coste total de 10.148 €, subvención de 8.118,40 € y sistema preparado para futuras baterías con estructura inclinada de aluminio y fijaciones en acero inoxidable.",
    contentSections: [
      {
        title: "Resultados del proyecto",
        tone: "accent",
        items: [
          "Subvención obtenida del 80% sobre el coste elegible.",
          "Coste final para el cliente de 2.029,60 €.",
          "Producción estimada cercana a 7.500 kWh al año.",
          "Reducción directa de la factura eléctrica desde el primer día.",
        ],
      },
      {
        title: "Ficha técnica de la instalación",
        items: [
          "Ubicación: El Puerto de Santa María (Cádiz).",
          "Sistema de autoconsumo conectado a red con 4,45 kWp.",
          "10 paneles LONGi de 445 W e inversor híbrido monofásico de 4,6 kW.",
          "Estructura inclinada para optimizar orientación, producción y mantenimiento.",
          "Monitorización remota mediante app y vatímetro.",
        ],
      },
      {
        title: "Instalación ejecutada en cubierta",
        copy:
          "La instalación se ha resuelto con estructura de aluminio y fijaciones de acero inoxidable, buscando durabilidad, seguridad y una integración limpia sobre la vivienda.",
        items: [
          "Montaje con estructura inclinada adaptada a la cubierta.",
          "Cableado completo en corriente continua y alterna.",
          "Protecciones eléctricas dimensionadas según REBT.",
          "Sistema listo para una posible ampliación con baterías futuras.",
        ],
      },
      {
        title: "Subvención Plan Ecovivienda",
        tone: "neutral",
        copy:
          "Este caso se acoge a una de las líneas del Plan Ecovivienda orientadas a rehabilitación energética residencial, con cobertura de ayuda en función de la mejora energética acreditada.",
        items: [
          "Cobertura de subvención entre el 40% y el 80% según el ahorro energético conseguido.",
          "Mejora de la eficiencia energética del inmueble.",
          "Reducción del consumo de energía no renovable.",
          "Gestión documental y tramitación completa dentro del proyecto.",
        ],
        footnote:
          "En este caso concreto, la ayuda económica asciende a 8.118,40 € sobre un coste total de 10.148 €.",
      },
      {
        title: "Coste del proyecto",
        items: [
          "Coste total de la instalación: 10.148 €.",
          "Subvención concedida: 8.118,40 €.",
          "Coste final para el cliente: 2.029,60 €.",
          "Pago inicial orientativo del 50%: 5.074 €.",
        ],
      },
    ],
    cta: {
      title: "¿Quieres pagar solo una parte de tu instalación solar?",
      copy:
        "En Grupo SolarSur diseñamos tu sistema fotovoltaico, tramitamos la subvención y te acompañamos durante todo el proceso para reducir la inversión inicial.",
      href: "/#contacto",
      label: "Solicitar estudio gratuito",
    },
  },
  {
    slug: "subvencion-energia-solar-castilleja-de-guzman-sevilla",
    title: "Nuestra propuesta",
    category: "Subvenci\u00f3n energ\u00e9tica integral",
    installationType: "Instalaci\u00f3n combinada fotovoltaica + solar t\u00e9rmica",
    zone: "Castilleja de Guzm\u00e1n, Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/fotovoltaica/sevilla/castilleja-de-guzman/instalacion-placas-solares-castilleja-de-guzman.webp",
    imageAlt:
      "Instalaci\u00f3n combinada de placas solares en Castilleja de Guzm\u00e1n con sistema energ\u00e9tico residencial subvencionado",
    galleryImages: [
      "/proyectos/fotovoltaica/sevilla/castilleja-de-guzman/instalacion-placas-solares-castilleja-de-guzman.webp",
      "/proyectos/fotovoltaica/sevilla/castilleja-de-guzman/placas-solares-castilleja-de-guzman.webp",
      "/proyectos/fotovoltaica/sevilla/castilleja-de-guzman/instalacion-paneles-solares-castilleja-de-guzman.webp",
    ],
    galleryImageAlts: [
      "Vista general de la instalaci\u00f3n energ\u00e9tica subvencionada en Castilleja de Guzm\u00e1n",
      "Detalle del campo fotovoltaico instalado en la vivienda de Castilleja de Guzm\u00e1n",
      "Montaje de paneles solares y sistema combinado sobre cubierta residencial en Sevilla",
    ],
    summary:
      "Proyecto residencial acogido al Plan Ecovivienda que combina autoconsumo fotovoltaico y solar t\u00e9rmica para ACS, con subvenci\u00f3n de hasta el 80% y un planteamiento energ\u00e9tico completo para reducir consumo el\u00e9ctrico y demanda de agua caliente.",
    blogSummary:
      "Documentamos un caso real en Castilleja de Guzm\u00e1n con 4,84 kWp fotovoltaicos, 8 paneles AIKO de 605 W, inversor h\u00edbrido Huawei de 5 kW, sistema solar t\u00e9rmico por termosif\u00f3n de 200 litros y tramitaci\u00f3n del Plan Ecovivienda.",
    publishedAt: "Obra subvencionada",
    mapPosition: { x: 28, y: 48 },
    serviceKeys: ["photovoltaic", "subsidies", "solar-thermal"],
    technicalSheet: [
      {
        label: "Tipo",
        value: "Rehabilitaci\u00f3n energ\u00e9tica con fotovoltaica y solar t\u00e9rmica",
        icon: "type",
      },
      {
        label: "Programa",
        value: "Plan Ecovivienda con cobertura de hasta el 80%",
        icon: "status",
      },
      { label: "Potencia FV", value: "4,84 kWp", icon: "target" },
      {
        label: "Paneles",
        value: "8 m\u00f3dulos AIKO de 605 W",
        icon: "module",
      },
      {
        label: "Inversor",
        value: "Huawei h\u00edbrido de 5 kW",
        icon: "inverter",
      },
      {
        label: "Solar t\u00e9rmica",
        value: "Termosif\u00f3n con acumulador de 200 litros para ACS",
        icon: "service",
      },
      {
        label: "Montaje",
        value: "Estructura de aluminio sobre cubierta",
        icon: "mount",
      },
      {
        label: "Control",
        value: "Monitorizaci\u00f3n fotovoltaica mediante app m\u00f3vil",
        icon: "control",
      },
      {
        label: "Tramitaci\u00f3n",
        value: "Legalizaci\u00f3n, certificados energ\u00e9ticos y subvenci\u00f3n incluida",
        icon: "shield",
      },
      {
        label: "Coste final",
        value: "2.514,60 \u20ac seg\u00fan documentaci\u00f3n facilitada",
        icon: "unit",
      },
    ],
    technicalNote:
      "Proyecto residencial en Castilleja de Guzm\u00e1n con planteamiento energ\u00e9tico completo: generaci\u00f3n fotovoltaica, agua caliente solar, legalizaci\u00f3n, certificados energ\u00e9ticos, libro del edificio y tramitaci\u00f3n del expediente subvencionable.",
    contentSections: [
      {
        title: "Instalaci\u00f3n fotovoltaica",
        items: [
          "Potencia instalada de 4,84 kWp.",
          "8 m\u00f3dulos AIKO de 605 W.",
          "Inversor h\u00edbrido Huawei de 5 kW.",
          "Estructura de aluminio sobre cubierta.",
          "Monitorizaci\u00f3n del sistema mediante app m\u00f3vil.",
        ],
      },
      {
        title: "Instalaci\u00f3n solar t\u00e9rmica",
        copy:
          "El proyecto incorpora tambi\u00e9n un sistema solar t\u00e9rmico para producci\u00f3n de agua caliente sanitaria, con funcionamiento eficiente y apoyo el\u00e9ctrico inteligente cuando es necesario.",
        items: [
          "Dep\u00f3sito acumulador de 200 litros.",
          "Sistema termosif\u00f3n sin consumo el\u00e9ctrico para circulaci\u00f3n.",
          "Captadores solares de \u00faltima generaci\u00f3n.",
          "Sistema de apoyo el\u00e9ctrico inteligente.",
          "Cobertura superior al 70% del ACS.",
        ],
      },
      {
        title: "Instalaci\u00f3n",
        items: [
          "Instalaci\u00f3n completa llave en mano.",
          "Cableado DC y AC con protecciones REBT.",
          "Legalizaci\u00f3n de la instalaci\u00f3n.",
          "Certificados energ\u00e9ticos y libro del edificio.",
          "Tramitaci\u00f3n de subvenci\u00f3n incluida.",
        ],
      },
      {
        title: "Subvenci\u00f3n Plan Ecovivienda",
        tone: "neutral",
        items: [
          "Programa de rehabilitaci\u00f3n energ\u00e9tica de viviendas.",
          "Subvenci\u00f3n de hasta el 80%.",
          "Ayuda estimada de 10.058,40 \u20ac seg\u00fan la documentaci\u00f3n facilitada.",
          "Reducci\u00f3n del consumo energ\u00e9tico del inmueble.",
        ],
      },
      {
        title: "Coste del proyecto",
        items: [
          "Coste total de 10.390,91 \u20ac.",
          "Subvenci\u00f3n estimada de 10.058,40 \u20ac.",
          "Coste final para el cliente de 2.514,60 \u20ac.",
        ],
      },
      {
        title: "Resultados del proyecto",
        tone: "accent",
        items: [
          "Subvenci\u00f3n obtenida de hasta el 80%.",
          "Coste final documentado de 2.514,60 \u20ac.",
          "Instalaci\u00f3n energ\u00e9tica completa para electricidad y ACS.",
          "Reducci\u00f3n global del consumo energ\u00e9tico.",
        ],
      },
    ],
    cta: {
      title: "\u00bfQuieres una instalaci\u00f3n completa con subvenci\u00f3n?",
      copy:
        "En Grupo SolarSur dise\u00f1amos soluciones a medida combinando fotovoltaica y solar t\u00e9rmica para maximizar tu ahorro y acompa\u00f1arte durante toda la tramitaci\u00f3n.",
      href: "/#contacto",
      label: "Solicitar estudio gratuito",
    },
  },
  {
    slug: "instalacion-hibrida-sanlucar-la-mayor-sevilla",
    title: "Instalación fotovoltaica híbrida + solar térmica en Sanlúcar la Mayor (Sevilla)",
    category: "Obra híbrida FV + ACS",
    installationType: "Fotovoltaica residencial híbrida + solar térmica",
    zone: "Sanlúcar la Mayor, Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/fotovoltaica/sevilla/sanlucar-la-mayor/instalacion-solar-inclinada-01.webp.webp",
    imageAlt:
      "Instalación fotovoltaica híbrida y solar térmica en Sanlúcar la Mayor con paneles y termosifón",
    galleryImages: [
      "/proyectos/fotovoltaica/sevilla/sanlucar-la-mayor/instalacion-solar-inclinada-01.webp.webp",
      "/proyectos/fotovoltaica/sevilla/sanlucar-la-mayor/instalacion-solar-inclinada.webp.webp",
      "/proyectos/fotovoltaica/sevilla/sanlucar-la-mayor/instalacion-solar-inclinada-02.webp.webp",
    ],
    galleryImageAlts: [
      "Instalación fotovoltaica híbrida y solar térmica en Sanlúcar la Mayor con paneles y termosifón",
      "Detalle de estructura inclinada anclada sobre cubierta plana con grava en Sanlúcar la Mayor",
      "Vista general del campo fotovoltaico residencial en Sanlúcar la Mayor",
    ],
    summary:
      "Proyecto energético completo sobre cubierta plana con grava: autoconsumo conectado a red, inversor híbrido preparado para baterías y equipo solar térmico por termosifón para ACS.",
    blogSummary:
      "Documentamos una instalación híbrida en Sanlúcar la Mayor con 5,34 kWp, 12 paneles LONGi Hi-MO6 de 445 W, inversor Huawei híbrido de 6 kW y sistema solar térmico por termosifón de 300 L para agua caliente sanitaria.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 26, y: 47 },
    serviceKeys: ["solar-thermal", "photovoltaic"],
    solutionKey: "tilted",
    technicalSheet: [
      {
        label: "Tipo",
        value: "Fotovoltaica residencial híbrida + solar térmica ACS",
        icon: "type",
      },
      {
        label: "Montaje",
        value: "Estructura inclinada sobre cubierta plana con anclaje mecánico",
        icon: "mount",
      },
      { label: "Cubierta", value: "Cubierta plana transitable con grava", icon: "design" },
      { label: "Potencia", value: "5,34 kWp", icon: "target" },
      {
        label: "Paneles",
        value: "12 LONGi Hi-MO6 445 W N-Type",
        icon: "module",
      },
      {
        label: "Inversor",
        value: "Huawei híbrido 6 kW listo para baterías",
        icon: "inverter",
      },
      {
        label: "Solar térmica",
        value: "Termosifón 300 L con apoyo eléctrico integrado",
        icon: "service",
      },
      {
        label: "Control",
        value: "App móvil con medida de consumo y producción",
        icon: "control",
      },
      {
        label: "Protecciones",
        value: "DC + AC según REBT con cuadro eléctrico incluido",
        icon: "shield",
      },
      {
        label: "Estructura",
        value: "Aluminio y acero inoxidable con vida útil prevista de 30 años",
        icon: "status",
      },
    ],
    technicalNote:
      "Doble sistema energético con electricidad y ACS solar, inversor Huawei híbrido escalable y estructura profesional anclada para mejorar la resistencia al viento en cubierta plana con grava.",
  },
  {
    slug: "instalacion-fotovoltaica-hibrida-la-luisiana-sevilla",
    title: "Instalación fotovoltaica híbrida en La Luisiana (Sevilla)",
    category: "Obra fotovoltaica híbrida",
    installationType: "Autoconsumo residencial monofásico híbrido",
    zone: "La Luisiana, Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/fotovoltaica/sevilla/la-luisiana/instalacion-solar-la-luisiana.webp.webp",
    imageAlt:
      "Instalación solar residencial en La Luisiana con estructura inclinada elevada",
    galleryImages: [
      "/proyectos/fotovoltaica/sevilla/la-luisiana/instalacion-solar-la-luisiana.webp.webp",
      "/proyectos/fotovoltaica/sevilla/la-luisiana/placas-solares-la-luisiana.webp.webp",
      "/proyectos/fotovoltaica/sevilla/la-luisiana/instalacion-placas-solares-la-luisiana.webp.webp",
      "/proyectos/fotovoltaica/sevilla/la-luisiana/inversor-huawei-instalacion-solar-la-luisiana.webp.webp",
    ],
    galleryImageAlts: [
      "Instalación solar residencial en La Luisiana con estructura inclinada elevada",
      "Paneles solares AIKO de 600 W en cubierta residencial en La Luisiana",
      "Detalle de estructura de aluminio y anclajes en instalación solar de La Luisiana",
      "Inversor Huawei híbrido de 6 kW en instalación fotovoltaica de La Luisiana",
    ],
    summary:
      "Instalación fotovoltaica de 5,4 kWp en La Luisiana con 9 paneles de 600 W, inversor Huawei híbrido de 6 kW, estructura inclinada elevada y legalización completa incluida.",
    blogSummary:
      "Documentamos un autoconsumo residencial monofásico en La Luisiana con 9 paneles AIKO de 600 W, inversor Huawei híbrido de 6 kW, monitorización remota, protecciones REBT y tramitación integral del proyecto.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 34, y: 46 },
    serviceKeys: ["photovoltaic"],
    solutionKey: "tilted",
    technicalSheet: [
      {
        label: "Tipo",
        value: "Autoconsumo residencial monofásico híbrido",
        icon: "type",
      },
      { label: "Potencia", value: "5,4 kWp", icon: "target" },
      {
        label: "Paneles",
        value: "9 AIKO-A600-MAH72Mb de 600 W",
        icon: "module",
      },
      {
        label: "Inversor",
        value: "Huawei híbrido 6 kW listo para batería",
        icon: "inverter",
      },
      {
        label: "Montaje",
        value: "Estructura inclinada elevada sobre cubierta",
        icon: "mount",
      },
      {
        label: "Estructura",
        value: "Aluminio con tornillería de acero inoxidable",
        icon: "design",
      },
      {
        label: "Control",
        value: "Monitorización remota Huawei con vatímetro y PLC",
        icon: "control",
      },
      {
        label: "Protecciones",
        value: "Cableado DC/AC y protecciones según REBT",
        icon: "shield",
      },
      {
        label: "Gestión",
        value: "Subvenciones, legalización, licencia y certificados",
        icon: "status",
      },
    ],
    technicalNote:
      "Precio total de la instalación: 6.400 € IVA incluido. Sistema híbrido preparado para baterías futuras, con legalización completa y estructura inclinada elevada en La Luisiana.",
  },
  {
    slug: "instalacion-fotovoltaica-coplanar-sevilla",
    title: "Instalación fotovoltaica coplanar en Sevilla",
    category: "Obra fotovoltaica",
    installationType: "Fotovoltaica",
    zone: "Área metropolitana de Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/fotovoltaica/sevilla/instalacion-placas-solares-sevilla-coplanar.webp",
    summary:
      "Montaje sobre cubierta con integración visual y orientación a producción diaria estable.",
    blogSummary:
      "Publicamos una obra fotovoltaica coplanar ejecutada en la zona de Sevilla, con una solución pensada para aprovechar la cubierta, cuidar la integración y mejorar el ahorro eléctrico.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 29, y: 49 },
    serviceKeys: ["photovoltaic"],
    solutionKey: "coplanar",
    technicalSheet: [
      { label: "Tipo", value: "Autoconsumo fotovoltaico", icon: "type" },
      { label: "Montaje", value: "Coplanar sobre cubierta inclinada", icon: "mount" },
      { label: "Módulos", value: "Panel monocristalino", icon: "module" },
      { label: "Inversor", value: "String según suministro", icon: "inverter" },
      { label: "Protecciones", value: "Cuadro AC/DC", icon: "shield" },
    ],
    technicalNote:
      "Potencia, número de módulos y producción estimada se incorporarán en la ficha definitiva de la obra.",
  },
  {
    slug: "instalacion-solar-bateria-olivares-sevilla",
    title: "Instalación solar con batería en Olivares (Sevilla)",
    category: "Obra fotovoltaica con batería",
    installationType: "Fotovoltaica + batería",
    zone: "Olivares, Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/fotovoltaica/sevilla/instalacion-placas-solares-sevilla-coplanar-hibrido.webp",
    galleryImages: [
      "/proyectos/fotovoltaica/sevilla/instalacion-placas-solares-sevilla-coplanar-hibrido.webp",
      "/proyectos/fotovoltaica/sevilla/instalacion-placas-solares-sevilla-coplanar-bateria.webp",
    ],
    summary:
      "Sistema de autoconsumo residencial con almacenamiento para consumir energía solar de día y de noche con mayor autonomía.",
    blogSummary:
      "Documentamos una instalación en Olivares con 6,1 kWp, inversor híbrido Deye de 6 kW y batería TAB de 5 kWh, pensada para elevar el autoconsumo, cubrir la demanda nocturna y reforzar la independencia frente a la red.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 27, y: 48 },
    serviceKeys: ["photovoltaic"],
    solutionKey: "coplanar",
    technicalSheet: [
      {
        label: "Tipo",
        value: "Autoconsumo residencial con almacenamiento",
        icon: "type",
      },
      {
        label: "Montaje",
        value: "Cubierta inclinada de teja con estructura coplanar",
        icon: "mount",
      },
      { label: "Potencia", value: "6,1 kWp", icon: "target" },
      { label: "Paneles", value: "10 módulos AIKO de 610 W", icon: "module" },
      {
        label: "Inversor",
        value: "Deye híbrido monofásico 6 kW",
        icon: "inverter",
      },
      { label: "Batería", value: "TAB 5 kWh con backup", icon: "battery" },
      {
        label: "Protecciones",
        value: "Protecciones REBT + vatímetro con PLC",
        icon: "shield",
      },
    ],
    technicalNote:
      "Instalación llave en mano orientada a maximizar el autoconsumo, almacenar excedente para uso nocturno y mantener respaldo energético ante cortes puntuales de suministro.",
  },
  {
    slug: "instalacion-solar-termica-mairena-del-aljarafe-sevilla",
    title: "Instalaci\u00f3n solar t\u00e9rmica en vivienda en Mairena del Aljarafe (Sevilla)",
    category: "Obra de solar t\u00e9rmica",
    installationType: "Solar t\u00e9rmica para ACS por termosif\u00f3n",
    zone: "Mairena del Aljarafe, Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/solar-termica/sevilla/mairena-del-aljarafe/instalacion-solar-termica-vivienda-mairena-del-aljarafe.webp.webp",
    imageAlt:
      "Sistema solar t\u00e9rmico por termosif\u00f3n en vivienda de Mairena del Aljarafe",
    galleryImages: [
      "/proyectos/solar-termica/sevilla/mairena-del-aljarafe/instalacion-solar-termica-vivienda-mairena-del-aljarafe.webp.webp",
      "/proyectos/solar-termica/sevilla/mairena-del-aljarafe/instalacion-solar-termica-vivienda-sevilla-mairena-del-aljarafe.webp.webp",
    ],
    galleryImageAlts: [
      "Vista general del equipo solar t\u00e9rmico compacto instalado sobre cubierta en Mairena del Aljarafe",
      "Detalle del termosif\u00f3n TUSOL de 200 litros con captador Tinox en vivienda de Sevilla",
    ],
    summary:
      "Sistema solar t\u00e9rmico por termosif\u00f3n de 200 litros con captador Tinox, instalado sobre cubierta en vivienda unifamiliar de Mairena del Aljarafe para cubrir hasta el 85% del consumo de ACS.",
    blogSummary:
      "Documentamos una instalaci\u00f3n solar t\u00e9rmica para ACS en Mairena del Aljarafe con equipo compacto TUSOL ECO 2000, acumulador integrado de 200 L, captador de alta eficiencia Tinox y apoyo el\u00e9ctrico inteligente.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 28, y: 49 },
    serviceKeys: ["solar-thermal"],
    technicalSheet: [
      {
        label: "Tipo",
        value: "Solar t\u00e9rmica para agua caliente sanitaria",
        icon: "type",
      },
      {
        label: "Sistema",
        value: "Equipo compacto aut\u00f3nomo por termosif\u00f3n",
        icon: "service",
      },
      {
        label: "Montaje",
        value: "Instalaci\u00f3n sobre cubierta con circulaci\u00f3n natural y sin bombeo",
        icon: "mount",
      },
      {
        label: "Captador",
        value: "1 captador de alta eficiencia con tratamiento Tinox",
        icon: "module",
      },
      {
        label: "Homologaci\u00f3n",
        value: "Captador con certificado oficial del Ministerio de Industria",
        icon: "shield",
      },
      {
        label: "Acumulaci\u00f3n",
        value: "200 litros integrados en acumulador TSS200",
        icon: "unit",
      },
      {
        label: "Equipo",
        value: "TUSOL ECO 2000",
        icon: "status",
      },
      {
        label: "Apoyo",
        value: "Resistencia el\u00e9ctrica y sistema centralizado inteligente",
        icon: "control",
      },
      {
        label: "Cobertura ACS",
        value: "Hasta el 85% del consumo estimado de agua caliente",
        icon: "target",
      },
    ],
    technicalNote:
      "Proyecto de solar t\u00e9rmica para vivienda unifamiliar en Sevilla con equipo termosif\u00f3n de 200 L, captaci\u00f3n Tinox de alta eficiencia y funcionamiento aut\u00f3nomo por circulaci\u00f3n natural.",
  },
  {
    slug: "subvencion-solar-termica-dos-hermanas-sevilla",
    title: "Instalación solar térmica en Dos Hermanas (Sevilla)",
    category: "Obra de solar térmica",
    installationType: "Solar térmica para ACS por termosifón",
    zone: "Dos Hermanas, Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/solar-termica/sevilla/dos-hermanas/instalacion-solar-termica-dos-hermanas.webp.webp",
    imageAlt:
      "Instalación solar térmica por termosifón en vivienda de Dos Hermanas",
    galleryImages: [
      "/proyectos/solar-termica/sevilla/dos-hermanas/instalacion-solar-termica-dos-hermanas.webp.webp",
      "/proyectos/solar-termica/sevilla/dos-hermanas/instalacion-placa-solar-termica-dos-hermanas.webp.webp",
      "/proyectos/solar-termica/sevilla/dos-hermanas/placas-solares-termicas-dos-hermanas.webp",
    ],
    galleryImageAlts: [
      "Vista general del equipo solar térmico instalado sobre cubierta en Dos Hermanas",
      "Detalle del captador solar térmico instalado en vivienda de Dos Hermanas",
      "Vista de los captadores solares térmicos sobre tejado residencial en Sevilla",
    ],
    summary:
      "Instalación de energía solar térmica para agua caliente sanitaria en vivienda de Dos Hermanas, con sistema termosifón de 200 litros y reducción superior al 70% en el consumo de ACS.",
    blogSummary:
      "Mostramos un proyecto real de solar térmica en Dos Hermanas con sistema termosifón de 200 litros, captadores de alta eficiencia y apoyo eléctrico inteligente para agua caliente sanitaria.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 29, y: 50 },
    serviceKeys: ["solar-thermal"],
    technicalSheet: [
      {
        label: "Tipo",
        value: "Solar térmica para agua caliente sanitaria",
        icon: "type",
      },
      {
        label: "Sistema",
        value: "Equipo termosifón de alta eficiencia sin bombeo",
        icon: "service",
      },
      {
        label: "Acumulación",
        value: "Depósito acumulador de 200 litros en acero vitrificado",
        icon: "unit",
      },
      {
        label: "Captadores",
        value: "Captación solar de última generación para ACS",
        icon: "module",
      },
      {
        label: "Montaje",
        value: "Instalación sobre cubierta inclinada en vivienda",
        icon: "mount",
      },
      {
        label: "Apoyo",
        value: "Centralita, resistencia y control inteligente de temperatura",
        icon: "control",
      },
      {
        label: "Funcionamiento",
        value: "Circulación natural por termosifón",
        icon: "status",
      },
      {
        label: "Cobertura ACS",
        value: "Reducción superior al 70% del consumo de agua caliente",
        icon: "target",
      },
    ],
    technicalNote:
      "Proyecto residencial de solar térmica en Dos Hermanas planteado para reducir el consumo de ACS con funcionamiento autónomo por termosifón, apoyo eléctrico inteligente y mantenimiento muy bajo.",
  },
  {
    slug: "aerotermia-climatizacion-andalucia",
    title: "Sistema de aerotermia para climatización eficiente",
    category: "Obra de aerotermia",
    installationType: "Aerotermia",
    zone: "Andalucía occidental",
    province: "Sevilla",
    image: "/proyectos/fotovoltaica/sevilla/instalacion-aerotermia-sevilla.webp",
    summary:
      "Sistema orientado a confort térmico, agua caliente y reducción del consumo energético.",
    blogSummary:
      "Compartimos una instalación de aerotermia preparada para mejorar confort, climatización y consumo en un inmueble con demanda térmica diaria.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 33, y: 47 },
    serviceKeys: ["aerotermia"],
    technicalSheet: [
      { label: "Tipo", value: "Bomba de calor aire-agua", icon: "type" },
      { label: "Servicio", value: "Climatización y ACS", icon: "service" },
      { label: "Unidad", value: "Exterior + módulo hidráulico", icon: "unit" },
      { label: "Control", value: "Regulación por demanda", icon: "control" },
      { label: "Diseño", value: "Según demanda térmica", icon: "design" },
    ],
    technicalNote:
      "La ficha final puede incluir modelo de equipo, potencia térmica y volumen de acumulación instalado.",
  },
  {
    slug: "mantenimiento-instalacion-solar-sevilla",
    title: "Mantenimiento técnico de instalación solar",
    category: "Mantenimiento",
    installationType: "Mantenimiento",
    zone: "Provincia de Sevilla",
    province: "Sevilla",
    image: "/imagenes/servicios/mantenimiento-soporte-sevilla.webp",
    summary:
      "Revisión técnica para asegurar rendimiento, seguridad y funcionamiento correcto.",
    blogSummary:
      "Mostramos una intervención de mantenimiento donde el objetivo principal fue comprobar la producción, el estado general y la seguridad de la instalación.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 27, y: 55 },
    serviceKeys: ["maintenance"],
    technicalSheet: [
      { label: "Tipo", value: "Mantenimiento solar", icon: "type" },
      { label: "Campo FV", value: "Inspección visual", icon: "inspection" },
      { label: "Inversor", value: "Lectura de estado", icon: "inverter" },
      { label: "Protecciones", value: "Revisión AC/DC", icon: "shield" },
      { label: "Objetivo", value: "Rendimiento y seguridad", icon: "target" },
    ],
    technicalNote:
      "Las mediciones eléctricas e incidencias detectadas se documentan en el informe técnico de mantenimiento.",
  },
];
