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
    slug: "instalacion-hibrida-sanlucar-la-mayor-sevilla",
    title: "Instalación fotovoltaica híbrida + solar térmica en Sanlúcar la Mayor",
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
    title: "Instalación fotovoltaica híbrida en La Luisiana",
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
    title: "Instalaci\u00f3n solar t\u00e9rmica en vivienda en Mairena del Aljarafe",
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
