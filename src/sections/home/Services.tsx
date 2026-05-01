import type { ElementType } from "react";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  FileText,
  SunMedium,
  Wrench,
} from "lucide-react";

import {
  AerotermiaIcon,
  SolarThermalIcon,
  type ServiceIconProps,
} from "@/components/icons/ServiceIcons";
import { Container } from "@/components/ui/Container";

const services: Array<{
  icon: ElementType<ServiceIconProps>;
  title: string;
  copy: string;
  benefits: string[];
  href?: string;
  linkLabel?: string;
  backgroundImage: string;
  innerIconSize?: number;
  tone: "solar" | "thermal" | "air" | "admin" | "study" | "support";
}> = [
  {
    icon: SunMedium,
    title: "Placas solares fotovoltaicas",
    copy:
      "Instalaciones eficientes para reducir tu factura y aprovechar al máximo la energía solar.",
    benefits: ["Estudio previo", "Dimensionado profesional", "Ahorro real"],
    href: "/placas-solares-fotovoltaicas",
    linkLabel: "Ver servicio",
    backgroundImage: "/imagenes/servicios/fondo-servicio-fotovoltaica.svg",
    innerIconSize: 27,
    tone: "solar",
  },
  {
    icon: SolarThermalIcon,
    title: "Energía solar térmica",
    copy:
      "Producción de agua caliente sanitaria (ACS) con energía solar. Más ahorro y eficiencia.",
    benefits: ["ACS eficiente", "Más ahorro", "Mayor eficiencia"],
    href: "/energia-solar-termica",
    linkLabel: "Ver servicio",
    backgroundImage: "/imagenes/servicios/fondo-servicio-solar-termica.svg",
    tone: "thermal",
  },
  {
    icon: AerotermiaIcon,
    title: "Aerotermia",
    copy:
      "Climatización y agua caliente con alta eficiencia para viviendas y negocios.",
    benefits: ["Menor consumo", "Mayor confort", "Sistema eficiente"],
    href: "/aerotermia",
    linkLabel: "Ver servicio",
    backgroundImage: "/imagenes/servicios/fondo-servicio-aerotermia.svg",
    tone: "air",
  },
  {
    icon: FileText,
    title: "Ayudas y subvenciones",
    copy:
      "Te orientamos en la documentación y en los trámites para facilitar tu proyecto.",
    benefits: [
      "Revisión documental",
      "Gestión guiada",
      "Menos fricción",
    ],
    href: "/ayudas-y-subvenciones",
    linkLabel: "Ver servicio",
    backgroundImage: "/imagenes/servicios/fondo-servicio-ayudas.svg",
    tone: "admin",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Estudio y asesoramiento energético",
    copy:
      "Analizamos tu consumo y diseñamos la mejor solución en energía solar para maximizar tu ahorro y eficiencia.",
    benefits: [
      "Estudio energético",
      "Ahorro energético",
      "Asesoramiento experto",
    ],
    href: "/estudio-asesoramiento-energetico",
    linkLabel: "Ver servicio",
    backgroundImage: "/imagenes/servicios/fondo-servicio-estudio.svg",
    tone: "study",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y soporte",
    copy:
      "Seguimiento técnico y atención profesional para que tu instalación rinda al máximo.",
    benefits: [
      "Revisión técnica",
      "Atención cercana",
      "Mayor rendimiento",
    ],
    href: "/mantenimiento-soporte",
    linkLabel: "Ver servicio",
    backgroundImage:
      "/imagenes/servicios/fondo-servicio-mantenimiento-control.svg",
    tone: "support",
  },
];

const toneStyles = {
  solar: {
    card:
      "border-amber-200 bg-[linear-gradient(180deg,#fef3c7_0%,#fde68a_100%)] shadow-[0_18px_42px_rgba(180,83,9,0.1)]",
    icon: "bg-white/90 text-amber-700",
    link: "text-blue-950 hover:text-amber-900",
    copy: "text-blue-950/78",
    benefit: "border-amber-300/55 bg-white/62 text-blue-950",
  },
  thermal: {
    card:
      "border-orange-200 bg-[linear-gradient(180deg,#ffedd5_0%,#fed7aa_100%)] shadow-[0_18px_42px_rgba(194,65,12,0.1)]",
    icon: "bg-white/90 text-orange-700",
    link: "text-blue-950 hover:text-orange-900",
    copy: "text-blue-950/78",
    benefit: "border-orange-300/52 bg-white/62 text-blue-950",
  },
  air: {
    card:
      "border-cyan-200 bg-[linear-gradient(180deg,#cffafe_0%,#a5f3fc_100%)] shadow-[0_18px_42px_rgba(8,145,178,0.1)]",
    icon: "bg-white/90 text-cyan-800",
    link: "text-blue-950 hover:text-cyan-900",
    copy: "text-blue-950/78",
    benefit: "border-cyan-400/42 bg-white/62 text-blue-950",
  },
  admin: {
    card:
      "border-blue-200 bg-[linear-gradient(180deg,#eff6ff_0%,#dbeafe_100%)] shadow-[0_18px_42px_rgba(37,99,235,0.09)]",
    icon: "bg-white/90 text-blue-800",
    link: "text-blue-950 hover:text-blue-800",
    copy: "text-blue-950/76",
    benefit: "border-blue-300/45 bg-white/62 text-blue-950",
  },
  study: {
    card:
      "border-emerald-200 bg-[linear-gradient(180deg,#d1fae5_0%,#a7f3d0_100%)] shadow-[0_18px_42px_rgba(5,150,105,0.1)]",
    icon: "bg-white/90 text-emerald-800",
    link: "text-blue-950 hover:text-emerald-900",
    copy: "text-blue-950/78",
    benefit: "border-emerald-400/42 bg-white/62 text-blue-950",
  },
  support: {
    card:
      "border-sky-200 bg-[linear-gradient(180deg,#dbeafe_0%,#bfdbfe_100%)] shadow-[0_18px_42px_rgba(29,78,216,0.1)]",
    icon: "bg-white/90 text-blue-900",
    link: "text-blue-950 hover:text-blue-800",
    copy: "text-blue-950/78",
    benefit: "border-blue-400/42 bg-white/62 text-blue-950",
  },
};

export function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.35),transparent)]" />
      <div className="absolute left-0 top-24 h-28 w-full -skew-y-2 bg-blue-50/60" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.28em] text-amber-500">
              Servicios
            </p>

            <h2 className="mt-4 max-w-[18ch] text-4xl font-extrabold leading-[0.98] tracking-tight text-blue-900 sm:text-[3.45rem] lg:text-[3.9rem]">
              Soluciones energéticas pensadas para ahorrar de verdad
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-slate-600">
              Diseñamos proyectos orientados a reducir consumo, optimizar
              la inversión y acompañarte en todo el proceso.
            </p>

            <a
              href="#contacto"
                className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-7 py-4 text-base !font-normal !text-white shadow-[0_18px_40px_rgba(23,37,84,0.22)] transition hover:bg-blue-800 hover:!text-white sm:w-auto"
                style={{ color: "#fff", fontWeight: 400 }}
            >
              Solicitar estudio gratuito
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map(
            ({
              icon: Icon,
              title,
              copy,
              benefits,
              href,
              linkLabel,
              backgroundImage,
              innerIconSize,
              tone,
            }) => (
              <article
                key={title}
                className={`group relative flex h-full min-h-[19rem] flex-col overflow-hidden rounded-lg border p-5 shadow-[0_16px_34px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(15,23,42,0.11)] sm:min-h-[22rem] sm:p-6 ${toneStyles[tone].card}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.94]"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.2)_34%,rgba(255,255,255,0.08)_58%,rgba(255,255,255,0.02)_78%)]" />
                <div
                  className={`absolute inset-0 ${
                    tone === "thermal"
                      ? "bg-[linear-gradient(180deg,rgba(255,237,213,0.24)_0%,rgba(254,215,170,0.4)_100%)]"
                      : tone === "air"
                        ? "bg-[linear-gradient(180deg,rgba(207,250,254,0.24)_0%,rgba(165,243,252,0.38)_100%)]"
                        : tone === "support"
                          ? "bg-[linear-gradient(180deg,rgba(219,234,254,0.24)_0%,rgba(191,219,254,0.38)_100%)]"
                          : tone === "study"
                            ? "bg-[linear-gradient(180deg,rgba(209,250,229,0.24)_0%,rgba(167,243,208,0.38)_100%)]"
                            : tone === "admin"
                              ? "bg-[linear-gradient(180deg,rgba(239,246,255,0.24)_0%,rgba(219,234,254,0.38)_100%)]"
                              : "bg-[linear-gradient(180deg,rgba(254,243,199,0.24)_0%,rgba(253,230,138,0.38)_100%)]"
                  }`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.22),transparent_38%)]" />

                <div className="relative z-10 flex h-full flex-col">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${toneStyles[tone].icon}`}
                  >
                    <Icon
                      size={innerIconSize ?? 20}
                      strokeWidth={2.1}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-5 max-w-[18ch] text-[1.34rem] font-bold leading-[1.15] tracking-tight text-blue-950 sm:text-[1.46rem]">
                    {title}
                  </h3>

                  <p
                    className={`mt-3 max-w-[28rem] text-[0.95rem] leading-6 ${toneStyles[tone].copy}`}
                  >
                    {copy}
                  </p>

                  <div className="mt-auto grid gap-2 pt-5">
                    {benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className={`inline-flex min-h-9 w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${toneStyles[tone].benefit}`}
                      >
                        <Check size={13} strokeWidth={2.6} aria-hidden="true" />
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <a
                    href={href ?? "#contacto"}
                    className={`mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold transition ${toneStyles[tone].link}`}
                  >
                    {linkLabel ?? "Solicitar información"}
                    <ArrowRight
                      size={15}
                      className="transition duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </article>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
