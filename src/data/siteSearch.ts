import { projectServiceGroups } from "@/data/projectServices";
import { projectStories } from "@/data/projectStories";
import { getProjectHref } from "@/lib/projectCatalog";

export type SiteSearchItem = {
  label: string;
  description: string;
  href: string;
  group: "Pagina" | "Servicio" | "Categoria" | "Proyecto";
  keywordsText: string;
};

const pageSearchItems: SiteSearchItem[] = [
  {
    label: "Inicio",
    description: "Portada principal de Grupo SolarSur.",
    href: "/#inicio",
    group: "Pagina",
    keywordsText: "inicio portada home gruposolarsur",
  },
  {
    label: "Servicios",
    description: "Resumen de soluciones energ\u00e9ticas y tipos de instalaci\u00f3n.",
    href: "/#servicios",
    group: "Pagina",
    keywordsText: "servicios placas solares energia solar termica aerotermia ayudas estudio mantenimiento",
  },
  {
    label: "Proyectos",
    description: "Resumen general con fichas reales por categor\u00eda.",
    href: "/proyectos",
    group: "Pagina",
    keywordsText: "proyectos obras casos reales instalaciones",
  },
  {
    label: "Blog",
    description: "Obras, noticias y contenido informativo del sector.",
    href: "/blog",
    group: "Pagina",
    keywordsText: "blog noticias actualidad obras energia solar",
  },
  {
    label: "Empleo",
    description: "Vacantes y formulario para trabajar con nosotros.",
    href: "/trabaja-con-nosotros",
    group: "Pagina",
    keywordsText: "empleo trabajo vacantes equipo",
  },
  {
    label: "Contacto",
    description: "Tel\u00e9fono, direcci\u00f3n y formulario de contacto.",
    href: "/contacto",
    group: "Pagina",
    keywordsText: "contacto telefono direccion formulario presupuesto",
  },
];

const serviceSearchItems: SiteSearchItem[] = [
  {
    label: "Placas solares fotovoltaicas",
    description: "Instalaciones eficientes para reducir la factura el\u00e9ctrica.",
    href: "/placas-solares-fotovoltaicas",
    group: "Servicio",
    keywordsText: "servicio placas solares fotovoltaica autoconsumo baterias paneles",
  },
  {
    label: "Energ\u00eda solar t\u00e9rmica",
    description: "Agua caliente sanitaria con energ\u00eda solar.",
    href: "/energia-solar-termica",
    group: "Servicio",
    keywordsText: "servicio energia solar termica acs agua caliente termosifon",
  },
  {
    label: "Aerotermia",
    description: "Climatizaci\u00f3n y agua caliente con alta eficiencia.",
    href: "/aerotermia",
    group: "Servicio",
    keywordsText: "servicio aerotermia climatizacion calefaccion acs",
  },
  {
    label: "Ayudas y subvenciones",
    description: "Orientaci\u00f3n documental y gesti\u00f3n guiada de ayudas.",
    href: "/ayudas-y-subvenciones",
    group: "Servicio",
    keywordsText: "servicio ayudas subvenciones ecovivienda deducciones",
  },
  {
    label: "Estudio y asesoramiento energ\u00e9tico",
    description: "An\u00e1lisis de consumo para maximizar el ahorro.",
    href: "/estudio-asesoramiento-energetico",
    group: "Servicio",
    keywordsText: "servicio estudio asesoramiento consultoria analisis energetico",
  },
  {
    label: "Mantenimiento y soporte",
    description: "Seguimiento t\u00e9cnico para mejorar el rendimiento.",
    href: "/mantenimiento-soporte",
    group: "Servicio",
    keywordsText: "servicio mantenimiento soporte revision incidencias monitorizacion",
  },
];

const categorySearchItems: SiteSearchItem[] = projectServiceGroups.map((service) => ({
  label: service.label,
  description: `Categoria de proyectos: ${service.description}`,
  href: service.href,
  group: "Categoria",
  keywordsText: `categoria proyectos ${service.label} ${service.description} ${service.slug}`,
}));

const projectSearchItems: SiteSearchItem[] = projectStories.map((project) => ({
  label: project.title,
  description: `${project.zone} · ${project.category}`,
  href: getProjectHref(project),
  group: "Proyecto",
  keywordsText: [
    "proyecto",
    project.title,
    project.zone,
    project.province,
    project.category,
    project.installationType,
    project.summary,
    project.blogSummary,
    ...(project.serviceKeys ?? []),
  ].join(" "),
}));

export const siteSearchItems: SiteSearchItem[] = [
  ...pageSearchItems,
  ...serviceSearchItems,
  ...categorySearchItems,
  ...projectSearchItems,
];

export const quickSearchItems: SiteSearchItem[] = [
  pageSearchItems[2],
  serviceSearchItems[0],
  serviceSearchItems[1],
  serviceSearchItems[3],
  categorySearchItems[0],
  pageSearchItems[5],
];
