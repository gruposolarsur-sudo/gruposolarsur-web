import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Calculator,
  HardHat,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { HeroVisual } from "@/components/hero/HeroVisual";
import { Container } from "@/components/ui/Container";

const reassuranceItems: Array<{
  icon: LucideIcon;
  title: string;
  copy: string;
}> = [
  {
    icon: HardHat,
    title: "Visita técnica gratuita",
    copy: "Analizamos tu caso sin coste para proponerte una solución real.",
  },
  {
    icon: Calculator,
    title: "Sin inversión inicial",
    copy: "Estudiamos alternativas para que empieces a ahorrar desde el principio.",
  },
  {
    icon: ShieldCheck,
    title: "Financiación disponible",
    copy: "Te ayudamos a adaptar la instalación a una cuota asumible.",
  },
  {
    icon: MapPin,
    title: "Instalamos en tu zona",
    copy: "Acompañamiento cercano y ejecución profesional en Andalucía.",
  },
];

const quickStats = [
  { value: "Hasta 100%*", label: "de ahorro en la factura de la luz" },
  { value: "+10 años", label: "instalando en Andalucía" },
  { value: "Estudio", label: "gratuito y sin compromiso" },
];

function HighlightWord({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block overflow-visible px-1 pr-4 pb-6 pt-1 sm:px-2 sm:pr-5 sm:pb-7">
      <span className="relative z-10 inline-block font-black leading-[1.02] bg-gradient-to-r from-blue-700 via-blue-600 to-blue-900 bg-clip-text text-transparent drop-shadow-[0_6px_14px_rgba(37,99,235,0.12)]">
        {children}
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-[0.16rem] z-0 h-5.5 -rotate-[1.5deg] text-yellow-300/90 sm:bottom-[0.2rem] sm:h-6.5">
        <svg
          viewBox="0 0 240 28"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M8 18C41 13 76 10 118 10C158 10 194 8 230 5L236 15C199 20 162 23 118 23C77 23 44 24 11 27L8 18Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(147,197,253,0.22),transparent_24%),linear-gradient(180deg,#fffdf7_0%,#f4f9ff_48%,#eef5ff_100%)] pb-20 pt-12 sm:pt-20 lg:pb-36 lg:pt-24"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.34),transparent_68%)] blur-3xl" />
      <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-yellow-200/35 blur-3xl" />
      <div className="absolute -right-20 top-32 h-72 w-72 rounded-full bg-blue-200/35 blur-3xl" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(37,99,235,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.3)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.82)_14%,rgba(0,0,0,0.62)_76%,transparent_100%)]"
      />

      <Container className="relative">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start lg:gap-16">
          <div className="relative z-10 max-w-2xl lg:pr-6">
            <h1 className="max-w-[14.4ch] overflow-visible text-[2.55rem] font-black leading-[0.96] tracking-[-0.055em] text-blue-950 drop-shadow-[0_10px_26px_rgba(255,255,255,0.55)] min-[380px]:text-[2.85rem] sm:max-w-[13.2ch] sm:text-[4.2rem] sm:leading-[0.92] lg:max-w-[12.8ch] lg:text-[5rem]">
              <span className="block font-black">Convierte tu tejado en</span>
              <span className="mt-2 block text-[1.08em] leading-[0.9] sm:mt-2.5">
                <HighlightWord>ingresos</HighlightWord>
              </span>
              <span className="mt-3 block font-black text-[0.9em] leading-[0.98] sm:mt-3.5">
                desde el primer mes
              </span>
            </h1>

            <p className="mt-8 max-w-[38rem] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:text-[1.15rem]">
              Instalación solar profesional para viviendas y negocios. Estudio
              gratuito, financiación disponible y acompañamiento completo para
              que empieces a ahorrar con una solución real.
            </p>

            <div className="mt-8 grid gap-3 min-[520px]:grid-cols-3 sm:mt-9 sm:gap-4">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.25rem] border border-white/70 bg-white/85 px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:rounded-[1.6rem] sm:px-5 sm:py-5"
                >
                  <div className="text-2xl font-bold tracking-tight text-blue-950">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#contacto"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-900 px-7 py-4 text-base font-bold !text-white shadow-[0_18px_40px_rgba(23,37,84,0.24)] transition hover:bg-blue-800 hover:!text-white"
                style={{ color: "#fff" }}
              >
                Solicitar presupuesto gratuito
                <ArrowRight size={18} />
              </a>
              <a
                href="tel:955515708"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-yellow-300 bg-white px-7 py-4 text-base font-bold text-blue-700 shadow-sm transition hover:border-yellow-400 hover:bg-yellow-50"
              >
                <Phone size={18} className="text-blue-700" />
                Llamar ahora
              </a>
            </div>

            <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-slate-500">
              *El ahorro depende del consumo, la ubicación, la orientación y el tipo
              de instalación.
            </p>
          </div>

          <div className="relative z-0 lg:pt-8">
            <HeroVisual />
          </div>
        </div>

        <div className="mt-10 grid auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {reassuranceItems.map(({ icon: Icon, title, copy }) => (
            <article
              key={title}
              className="flex h-full flex-col rounded-[1.25rem] border border-slate-200/80 bg-white/88 px-5 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:min-h-[184px] sm:rounded-[1.45rem] sm:px-6 sm:py-7 lg:min-h-[184px]"
            >
              <div className="flex h-full flex-col items-start gap-3 min-[430px]:flex-row min-[430px]:gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] bg-blue-900 text-white shadow-lg shadow-blue-900/20">
                  <Icon size={24} strokeWidth={2.1} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="text-[1.02rem] font-semibold leading-[1.35] text-blue-950 sm:text-base sm:leading-6">
                    {title}
                  </h2>
                  <p className="mt-2 max-w-[28ch] text-sm leading-7 text-slate-500 min-[430px]:max-w-none sm:leading-6">
                    {copy}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
