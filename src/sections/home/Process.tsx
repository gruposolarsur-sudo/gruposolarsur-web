import type { LucideIcon } from "lucide-react";
import { Euro, FileText, SunMedium, Wrench } from "lucide-react";

import { Container } from "@/components/ui/Container";

const processSteps: Array<{
  number: string;
  icon: LucideIcon;
  title: string;
  copy: string;
  delay: string;
}> = [
  {
    number: "01",
    icon: FileText,
    title: "Estudio gratuito",
    copy: "Analizamos tu consumo, ubicación y necesidades reales.",
    delay: "0s",
  },
  {
    number: "02",
    icon: Euro,
    title: "Propuesta a medida",
    copy: "Preparamos una solución técnica y económica clara.",
    delay: "1s",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Instalación profesional",
    copy: "Ejecutamos el proyecto con un equipo técnico especializado.",
    delay: "2s",
  },
  {
    number: "04",
    icon: SunMedium,
    title: "Puesta en marcha",
    copy: "Dejamos todo listo para empezar a ahorrar desde el primer día.",
    delay: "3s",
  },
];

export function Process() {
  return (
    <section
      id="proceso"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] py-20 sm:py-24"
    >
      <Container>
        <div className="max-w-5xl">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
            Proceso
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-blue-900 sm:text-[2.35rem]">
            Te lo ponemos fácil desde el primer contacto
          </h2>
        </div>

        <div className="process-flow relative mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {processSteps.map(({ number, icon: Icon, title, copy, delay }) => (
            <article
              key={number}
              className="process-card relative flex min-h-[214px] flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-6 py-7 shadow-[0_18px_42px_rgba(15,23,42,0.07)]"
              style={{ "--process-delay": delay } as React.CSSProperties}
            >
              <div className="process-card-glow absolute inset-0 opacity-0" />
              <div className="process-progress absolute inset-x-0 top-0 h-1 origin-left bg-[linear-gradient(90deg,#facc15,#60a5fa)]" />

              <div className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-[0.85rem] bg-blue-50 text-blue-900">
                <Icon size={20} strokeWidth={2} aria-hidden="true" />
              </div>

              <div className="relative text-[2rem] font-extrabold leading-none tracking-[0.08em] text-yellow-400">
                {number}
              </div>

              <h3 className="relative mt-5 text-[1.18rem] font-extrabold leading-tight tracking-tight text-blue-900">
                {title}
              </h3>

              <p className="relative mt-4 max-w-[14rem] text-[0.98rem] leading-7 text-slate-600">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
