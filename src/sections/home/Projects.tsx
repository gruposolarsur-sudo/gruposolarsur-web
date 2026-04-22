import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, Home, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/Container";

const solutionCards: Array<{
  icon: LucideIcon;
  title: string;
  copy: string;
}> = [
  {
    icon: Home,
    title: "Viviendas unifamiliares",
    copy: "Soluciones pensadas para ahorrar mes a mes y mejorar la eficiencia energética del hogar.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Negocios y oficinas",
    copy: "Proyectos orientados a reducir costes fijos y optimizar el consumo energético.",
  },
  {
    icon: ShieldCheck,
    title: "Instalaciones con garantía",
    copy: "Trabajo técnico profesional, materiales de calidad y enfoque en rendimiento real.",
  },
];

export function Projects() {
  return (
    <section
      id="proyectos"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_12%,rgba(250,204,21,0.08),transparent_22%),linear-gradient(180deg,#172554_0%,#1e3a8a_100%)] py-20 sm:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-yellow-300">
            Proyectos y soluciones
          </p>

          <h2 className="mt-4 max-w-[24ch] text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-[2.45rem]">
            Diseñamos instalaciones adaptadas a cada tipo de cliente
          </h2>

          <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-blue-50/86 sm:text-lg">
            Trabajamos con una visión práctica: viabilidad, ahorro, calidad de
            instalación y rendimiento.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-fr gap-4 lg:grid-cols-3 lg:gap-5">
          {solutionCards.map(({ icon: Icon, title, copy }) => (
            <article
              key={title}
              className="rounded-[1.25rem] border border-white/12 bg-[linear-gradient(180deg,rgba(53,80,159,0.78)_0%,rgba(43,68,143,0.72)_100%)] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:min-h-[242px] sm:rounded-[1.35rem] sm:px-7 sm:py-8"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[0.9rem] bg-white/9 text-yellow-300">
                <Icon size={24} strokeWidth={2} aria-hidden="true" />
              </div>

              <h3 className="mt-6 text-[1.45rem] font-extrabold leading-tight tracking-tight text-white">
                {title}
              </h3>

              <p className="mt-4 max-w-[20rem] text-base font-medium leading-7 text-blue-50/78">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
