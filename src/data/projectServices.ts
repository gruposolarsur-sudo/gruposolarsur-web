export type ProjectServiceKey =
  | "photovoltaic"
  | "solar-thermal"
  | "aerotermia"
  | "subsidies"
  | "maintenance";

export const projectServiceGroups: Array<{
  key: ProjectServiceKey;
  slug: string;
  label: string;
  description: string;
  href: string;
}> = [
  {
    key: "photovoltaic",
    slug: "fotovoltaica",
    label: "Placas solares fotovoltaicas",
    description: "Autoconsumo residencial, soluciones híbridas y sistemas con batería.",
    href: "/proyectos/fotovoltaica",
  },
  {
    key: "solar-thermal",
    slug: "solar-termica",
    label: "Energía solar térmica",
    description: "Proyectos de ACS solar por termosifón y combinaciones híbridas.",
    href: "/proyectos/solar-termica",
  },
  {
    key: "aerotermia",
    slug: "aerotermia",
    label: "Aerotermia",
    description: "Casos orientados a climatización eficiente y agua caliente sanitaria.",
    href: "/proyectos/aerotermia",
  },
  {
    key: "subsidies",
    slug: "ayudas-y-subvenciones",
    label: "Ayudas y subvenciones",
    description: "Expedientes reales con ahorro acreditado, documentaciÃ³n y programas de ayuda.",
    href: "/proyectos/ayudas-y-subvenciones",
  },
  {
    key: "maintenance",
    slug: "mantenimiento",
    label: "Mantenimiento y soporte",
    description: "Intervenciones técnicas para revisión, control y rendimiento.",
    href: "/proyectos/mantenimiento",
  },
];
