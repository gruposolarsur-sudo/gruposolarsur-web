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
    title: "Instalacion coplanar",
    copy: "Paneles integrados sobre la misma inclinacion de la cubierta, una solucion limpia y discreta para tejados inclinados.",
  },
  {
    key: "pergola",
    title: "Tipo pergola solar",
    copy: "Estructuras que generan sombra y produccion fotovoltaica en patios, aparcamientos, terrazas o zonas exteriores.",
  },
  {
    key: "tilted",
    title: "Estructuras inclinadas",
    copy: "Montajes sobre cubierta plana para orientar mejor los modulos y optimizar produccion, seguridad y mantenimiento.",
  },
  {
    key: "industrial-ground",
    title: "Cubiertas industriales y suelo",
    copy: "Soluciones para naves, negocios, comunidades o espacios tecnicos donde hace falta una estructura especifica.",
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
  galleryImages?: string[];
  summary: string;
  blogSummary: string;
  publishedAt: string;
  mapPosition: {
    x: number;
    y: number;
  };
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
    slug: "instalacion-fotovoltaica-coplanar-sevilla",
    title: "Instalacion fotovoltaica coplanar en Sevilla",
    category: "Obra fotovoltaica",
    installationType: "Fotovoltaica",
    zone: "Area metropolitana de Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/fotovoltaica/sevilla/instalacion-placas-solares-sevilla-coplanar.webp",
    summary:
      "Montaje sobre cubierta con integracion visual y orientacion a produccion diaria estable.",
    blogSummary:
      "Publicamos una obra fotovoltaica coplanar ejecutada en la zona de Sevilla, con una solucion pensada para aprovechar cubierta, cuidar la integracion y mejorar el ahorro electrico.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 29, y: 49 },
    solutionKey: "coplanar",
    technicalSheet: [
      { label: "Tipo", value: "Autoconsumo fotovoltaico", icon: "type" },
      { label: "Montaje", value: "Coplanar sobre cubierta inclinada", icon: "mount" },
      { label: "Modulos", value: "Panel monocristalino", icon: "module" },
      { label: "Inversor", value: "String segun suministro", icon: "inverter" },
      { label: "Protecciones", value: "Cuadro AC/DC", icon: "shield" },
    ],
    technicalNote:
      "Potencia, numero de modulos y produccion estimada se incorporaran en la ficha definitiva de la obra.",
  },
  {
    slug: "instalacion-solar-bateria-olivares-sevilla",
    title: "Instalacion solar con bateria en Olivares (Sevilla)",
    category: "Obra fotovoltaica con bateria",
    installationType: "Fotovoltaica + bateria",
    zone: "Olivares, Sevilla",
    province: "Sevilla",
    image:
      "/proyectos/fotovoltaica/sevilla/instalacion-placas-solares-sevilla-coplanar-hibrido.webp",
    galleryImages: [
      "/proyectos/fotovoltaica/sevilla/instalacion-placas-solares-sevilla-coplanar-hibrido.webp",
      "/proyectos/fotovoltaica/sevilla/instalacion-placas-solares-sevilla-coplanar-bateria.webp",
    ],
    summary:
      "Sistema de autoconsumo residencial con almacenamiento para consumir energia solar de dia y de noche con mayor autonomia.",
    blogSummary:
      "Documentamos una instalacion en Olivares con 6,1 kWp, inversor hibrido Deye de 6 kW y bateria TAB de 5 kWh, pensada para elevar el autoconsumo, cubrir demanda nocturna y reforzar la independencia frente a la red.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 27, y: 48 },
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
      { label: "Paneles", value: "10 modulos AIKO de 610 W", icon: "module" },
      {
        label: "Inversor",
        value: "Deye hibrido monofasico 6 kW",
        icon: "inverter",
      },
      { label: "Bateria", value: "TAB 5 kWh con backup", icon: "battery" },
      {
        label: "Protecciones",
        value: "Protecciones REBT + vatimetro con PLC",
        icon: "shield",
      },
    ],
    technicalNote:
      "Instalacion llave en mano orientada a maximizar el autoconsumo, almacenar excedente para uso nocturno y mantener respaldo energetico ante cortes puntuales de suministro.",
  },
  {
    slug: "aerotermia-climatizacion-andalucia",
    title: "Sistema de aerotermia para climatizacion eficiente",
    category: "Obra de aerotermia",
    installationType: "Aerotermia",
    zone: "Andalucia occidental",
    province: "Sevilla",
    image: "/proyectos/fotovoltaica/sevilla/instalacion-aerotermia-sevilla.webp",
    summary:
      "Sistema orientado a confort termico, agua caliente y reduccion del consumo energetico.",
    blogSummary:
      "Compartimos una instalacion de aerotermia preparada para mejorar confort, climatizacion y consumo en un inmueble con demanda termica diaria.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 33, y: 47 },
    technicalSheet: [
      { label: "Tipo", value: "Bomba de calor aire-agua", icon: "type" },
      { label: "Servicio", value: "Climatizacion y ACS", icon: "service" },
      { label: "Unidad", value: "Exterior + modulo hidraulico", icon: "unit" },
      { label: "Control", value: "Regulacion por demanda", icon: "control" },
      { label: "Diseno", value: "Segun demanda termica", icon: "design" },
    ],
    technicalNote:
      "La ficha final puede incluir modelo de equipo, potencia termica y volumen de acumulacion instalado.",
  },
  {
    slug: "mantenimiento-instalacion-solar-sevilla",
    title: "Mantenimiento tecnico de instalacion solar",
    category: "Mantenimiento",
    installationType: "Mantenimiento",
    zone: "Provincia de Sevilla",
    province: "Sevilla",
    image: "/proyectos/fotovoltaica/sevilla/mantenimiento-soporte-sevilla.webp",
    summary:
      "Revision tecnica para asegurar rendimiento, seguridad y funcionamiento correcto.",
    blogSummary:
      "Mostramos una intervencion de mantenimiento donde el objetivo principal fue comprobar produccion, estado general y seguridad de la instalacion.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 27, y: 55 },
    technicalSheet: [
      { label: "Tipo", value: "Mantenimiento solar", icon: "type" },
      { label: "Campo FV", value: "Inspeccion visual", icon: "inspection" },
      { label: "Inversor", value: "Lectura de estado", icon: "inverter" },
      { label: "Protecciones", value: "Revision AC/DC", icon: "shield" },
      { label: "Objetivo", value: "Rendimiento y seguridad", icon: "target" },
    ],
    technicalNote:
      "Las mediciones electricas e incidencias detectadas se documentan en el informe tecnico de mantenimiento.",
  },
];
