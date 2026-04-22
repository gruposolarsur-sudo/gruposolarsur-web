import type { LucideIcon } from "lucide-react";
import { BadgeCheck, CheckCircle2, Euro, FileText, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";

const reasons = [
  "Estudio personalizado según tu consumo y tipo de inmueble",
  "Acompañamiento técnico y administrativo durante todo el proceso",
  "Soluciones para viviendas, negocios y proyectos de mayor escala",
];

const featureCards: Array<{
  icon: LucideIcon;
  title: string;
  copy: string;
  variant: "blue" | "white" | "yellow";
}> = [
  {
    icon: Euro,
    title: "Menos gasto mensual",
    copy: "Reduce tu factura con una solución energética más eficiente y mejor dimensionada.",
    variant: "blue",
  },
  {
    icon: BadgeCheck,
    title: "Equipo con experiencia",
    copy: "Más de una década trabajando instalaciones solares con criterio técnico y comercial.",
    variant: "white",
  },
  {
    icon: MapPin,
    title: "Cobertura en Andalucía",
    copy: "Atención cercana y capacidad de actuación en diferentes zonas de Andalucía.",
    variant: "white",
  },
  {
    icon: FileText,
    title: "Ayudas y gestión",
    copy: "También te orientamos con documentación, trámites y oportunidades de ayuda.",
    variant: "yellow",
  },
];

const cardStyles = {
  blue:
    "border-blue-900/20 bg-[linear-gradient(180deg,#1d3f9e_0%,#1e3a8a_100%)] text-white shadow-[0_24px_58px_rgba(30,58,138,0.24)]",
  white:
    "border-white/85 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-blue-950 shadow-[0_24px_58px_rgba(15,23,42,0.08)]",
  yellow:
    "border-yellow-300/70 bg-[linear-gradient(180deg,#facc15_0%,#fbbf24_100%)] text-blue-950 shadow-[0_24px_58px_rgba(250,204,21,0.22)]",
};

const iconStyles = {
  blue: "text-yellow-300",
  white: "text-blue-800",
  yellow: "text-blue-900",
};

const copyStyles = {
  blue: "text-blue-50/88",
  white: "text-slate-600",
  yellow: "text-blue-950/78",
};

export function Trust() {
  return (
    <section
      id="confianza"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_55%,#f9fbff_100%)] py-[4.5rem] sm:py-[5.5rem]"
    >
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1.05fr_1.15fr] lg:items-stretch">
          <div className="rounded-[1.35rem] border border-white/80 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-6 py-8 shadow-[0_22px_54px_rgba(15,23,42,0.07)] sm:px-8 sm:py-9 lg:px-9">
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
              Por qué elegirnos
            </p>

            <h2 className="mt-4 max-w-[20ch] text-3xl font-extrabold leading-[1.02] tracking-tight text-blue-900 sm:text-[2.42rem]">
              Instalación profesional, asesoramiento claro y enfoque en ahorro real
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-[1.05rem]">
              Nuestro objetivo no es solo instalar, sino ayudarte a tomar una
              decisión rentable, bien planteada y adaptada a tu consumo.
            </p>

            <ul className="mt-7 grid gap-4">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-[0.98rem] leading-7 text-blue-950">
                  <CheckCircle2
                    size={20}
                    strokeWidth={2.2}
                    className="mt-1 shrink-0 text-emerald-500"
                    aria-hidden="true"
                  />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {featureCards.map(({ icon: Icon, title, copy, variant }) => (
              <article
                key={title}
                className={`flex flex-col rounded-[1.25rem] border px-5 py-6 ${cardStyles[variant]} sm:min-h-[270px] sm:rounded-[1.35rem] sm:px-7 sm:py-8`}
              >
                <Icon
                  size={30}
                  strokeWidth={2}
                  className={iconStyles[variant]}
                  aria-hidden="true"
                />

                <div className="mt-7">
                  <h3 className="max-w-[12ch] text-[1.55rem] font-extrabold leading-[1.04] tracking-tight">
                    {title}
                  </h3>
                  <p className={`mt-3 text-[0.98rem] leading-6 ${copyStyles[variant]}`}>
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
