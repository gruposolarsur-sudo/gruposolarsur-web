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
  | "target";

export type ProjectStory = {
  slug: string;
  title: string;
  category: string;
  installationType: string;
  zone: string;
  province: string;
  image: string;
  summary: string;
  blogSummary: string;
  publishedAt: string;
  mapPosition: {
    x: number;
    y: number;
  };
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
      "Publicamos una obra fotovoltaica coplanar ejecutada en la zona de Sevilla, con una solución pensada para aprovechar cubierta, cuidar la integración y mejorar el ahorro eléctrico.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 29, y: 49 },
    technicalSheet: [
      { label: "Tipo", value: "Autoconsumo fotovoltaico", icon: "type" },
      { label: "Montaje", value: "Coplanar sobre cubierta inclinada", icon: "mount" },
      { label: "Módulos", value: "Panel monocristalino", icon: "module" },
      { label: "Inversor", value: "String según suministro", icon: "inverter" },
      { label: "Protecciones", value: "Cuadro AC/DC", icon: "shield" },
      { label: "Estado", value: "Ejecutada", icon: "status" },
    ],
    technicalNote:
      "Potencia, número de módulos y producción estimada se incorporarán en la ficha definitiva de la obra.",
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
    technicalSheet: [
      { label: "Tipo", value: "Bomba de calor aire-agua", icon: "type" },
      { label: "Servicio", value: "Climatización y ACS", icon: "service" },
      { label: "Unidad", value: "Exterior + módulo hidráulico", icon: "unit" },
      { label: "Control", value: "Regulación por demanda", icon: "control" },
      { label: "Diseño", value: "Según demanda térmica", icon: "design" },
      { label: "Estado", value: "Ejecutada", icon: "status" },
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
    image: "/proyectos/fotovoltaica/sevilla/mantenimiento-soporte-sevilla.webp",
    summary:
      "Revisión técnica para asegurar rendimiento, seguridad y funcionamiento correcto.",
    blogSummary:
      "Mostramos una intervención de mantenimiento donde el objetivo principal fue comprobar producción, estado general y seguridad de la instalación.",
    publishedAt: "Obra publicada",
    mapPosition: { x: 27, y: 55 },
    technicalSheet: [
      { label: "Tipo", value: "Mantenimiento solar", icon: "type" },
      { label: "Campo FV", value: "Inspección visual", icon: "inspection" },
      { label: "Inversor", value: "Lectura de estado", icon: "inverter" },
      { label: "Protecciones", value: "Revisión AC/DC", icon: "shield" },
      { label: "Objetivo", value: "Rendimiento y seguridad", icon: "target" },
      { label: "Estado", value: "Revisada", icon: "status" },
    ],
    technicalNote:
      "Las mediciones eléctricas e incidencias detectadas se documentan en el informe técnico de mantenimiento.",
  },
];
