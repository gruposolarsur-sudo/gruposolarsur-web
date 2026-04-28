import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  ChartNoAxesCombined,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  Phone,
  SunMedium,
  Wrench,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

const benefits = [
  {
    icon: ChartNoAxesCombined,
    title: "Análisis de consumo",
    copy: "Estudiamos facturas, hábitos, horarios y demanda para entender dónde se está yendo la energía.",
  },
  {
    icon: Calculator,
    title: "Ahorro estimado",
    copy: "Calculamos escenarios de inversión, autoconsumo, excedentes y retorno para tomar decisiones con datos.",
  },
  {
    icon: Gauge,
    title: "Mejora de eficiencia",
    copy: "Detectamos medidas que pueden reducir consumo y mejorar el rendimiento energético del inmueble.",
  },
];

const includedItems = [
  {
    icon: ClipboardCheck,
    title: "Diagnóstico inicial",
    copy: "Revisamos consumo eléctrico, potencia contratada, estacionalidad y necesidades reales del cliente.",
  },
  {
    icon: SunMedium,
    title: "Estudio solar",
    copy: "Valoramos orientación, superficie disponible, sombras y potencia fotovoltaica recomendable.",
  },
  {
    icon: FileCheck2,
    title: "Informe claro",
    copy: "Entregamos una propuesta comprensible con alcance técnico, ahorro previsto y próximos pasos.",
  },
  {
    icon: Wrench,
    title: "Plan de actuación",
    copy: "Ordenamos prioridades: instalación solar, aerotermia, mantenimiento, ayudas o mejoras de eficiencia.",
  },
];

const processSteps = [
  {
    title: "Recogida de datos",
    copy: "Solicitamos facturas, ubicación, tipo de inmueble y hábitos de consumo.",
  },
  {
    title: "Lectura energética",
    copy: "Analizamos potencia, curva de consumo, horarios y oportunidades de ahorro.",
  },
  {
    title: "Estudio técnico",
    copy: "Valoramos cubierta, orientación, sombras, equipos actuales y posibles mejoras.",
  },
  {
    title: "Escenario de ahorro",
    copy: "Calculamos potencia recomendada, producción, autoconsumo y amortización estimada.",
  },
  {
    title: "Recomendación final",
    copy: "Definimos la solución más coherente y los pasos para ejecutarla con seguridad.",
  },
];

const studyBlocks = [
  "Viviendas unifamiliares",
  "Comunidades de propietarios",
  "Empresas y naves",
  "Locales y oficinas",
  "Instalaciones existentes",
  "Proyectos con ayudas",
];

export const metadata: Metadata = {
  title: "Estudio y asesoramiento energético | Grupo Solar Sur",
  description:
    "Estudio energético y asesoramiento profesional para optimizar consumo, ahorro, placas solares, aerotermia y eficiencia energética en Andalucía.",
};

export default function EnergyConsultingPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative min-h-[620px] overflow-hidden bg-blue-950 py-20 text-white sm:py-24 lg:py-28">
          <Image
            src="/imagenes/servicios/estudio-y-asesoramiento-energetico.webp"
            alt=""
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,37,84,0.97)_0%,rgba(23,37,84,0.78)_43%,rgba(23,37,84,0.16)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.98)_100%)]" />

          <Container className="relative">
            <div className="max-w-3xl pt-6">
              <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-yellow-300">
                Estudio y asesoramiento energético
              </p>
              <h1 className="mt-5 max-w-[13ch] text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.8rem]">
                Decidir con datos antes de invertir
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-50/86 sm:text-xl">
                Analizamos tu consumo y diseñamos la mejor solución en energía
                solar, eficiencia y ahorro para tu vivienda, comunidad o empresa.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/#contacto"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-7 py-4 text-base font-bold !text-blue-950 shadow-[0_18px_40px_rgba(250,204,21,0.26)] transition hover:bg-yellow-200"
                >
                  Solicitar estudio gratuito
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  href="tel:955515708"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:border-white/45 hover:bg-white/16"
                >
                  <Phone size={18} aria-hidden="true" />
                  Llamar ahora
                </a>
              </div>
            </div>
          </Container>
        </section>

        <section className="relative -mt-16 pb-16 sm:pb-20">
          <Container>
            <div className="grid gap-4 md:grid-cols-3">
              {benefits.map(({ icon: Icon, title, copy }) => (
                <article
                  key={title}
                  className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_24px_58px_rgba(15,23,42,0.08)]"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-blue-50 text-blue-900">
                    <Icon size={23} aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-xl font-extrabold tracking-tight text-blue-950">
                    {title}
                  </h2>
                  <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Diagnóstico energético
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  El primer paso para ahorrar mejor
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  Un buen proyecto energético no empieza colocando placas: empieza
                  entendiendo cómo consumes, cuándo consumes y qué solución tiene
                  sentido para tu caso concreto.
                </p>
                <p>
                  En Grupo SolarSur estudiamos facturas, ubicación, orientación,
                  potencia contratada, hábitos de uso y posibilidades técnicas
                  para proponer una instalación ajustada, eficiente y rentable.
                </p>
                <p>
                  El objetivo es evitar sobredimensionamientos, detectar ahorros
                  rápidos y ordenar la inversión: autoconsumo, aerotermia,
                  mantenimiento, ayudas o mejoras de eficiencia.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[linear-gradient(180deg,#f0fdf4_0%,#ffffff_100%)] py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="rounded-lg border border-emerald-200 bg-white p-7 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-emerald-700">
                  Qué incluye
                </p>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Asesoramiento útil, medible y orientado a resultados
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Convertimos facturas, hábitos y posibilidades técnicas en una
                  recomendación clara antes de invertir.
                </p>

                <div className="mt-8 grid gap-3 border-t border-emerald-100 pt-6">
                  {["Datos", "Escenarios", "Decisión"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-blue-950">
                      <BadgeCheck
                        size={20}
                        className="shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      <span className="font-extrabold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {includedItems.map(({ icon: Icon, title, copy }) => (
                  <article
                    key={title}
                    className="grid gap-4 border-b border-slate-200 pb-6 last:border-b-0 sm:grid-cols-[auto_1fr]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight text-blue-950">
                        {title}
                      </h3>
                      <p className="mt-2 text-[0.98rem] leading-7 text-slate-600">
                        {copy}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Proceso
                </p>
                <h2 className="mt-4 max-w-[12ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Cómo transformamos datos en una decisión clara
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  Hacemos que la parte técnica sea comprensible: qué conviene,
                  cuánto puede ahorrar y qué pasos hay que dar.
                </p>
              </div>

              <ol className="border-y border-slate-200">
                {processSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid gap-4 border-b border-slate-200 py-6 last:border-b-0 sm:grid-cols-[7rem_1fr]"
                  >
                    <div className="text-sm font-black uppercase tracking-[0.24em] text-emerald-600">
                      Fase {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight text-blue-950">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-base leading-7 text-slate-600">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section className="bg-blue-50/70 py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Aplicaciones
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Un estudio para cada tipo de proyecto
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  El asesoramiento cambia según el inmueble, el consumo y el
                  objetivo. Por eso planteamos cada caso desde sus datos reales.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {studyBlocks.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[1.1rem] border border-slate-200 bg-white px-5 py-4 text-base font-bold text-blue-950 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
                  >
                    <BadgeCheck
                      size={20}
                      className="shrink-0 text-emerald-500"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-blue-950 py-16 text-white sm:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-yellow-300 text-blue-950">
                  <Zap size={24} aria-hidden="true" />
                </div>
                <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.7rem]">
                  ¿Quieres saber qué solución energética te conviene?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50/78">
                  Cuéntanos tu caso y prepararemos un estudio para valorar
                  consumo, ahorro, potencia recomendada y próximos pasos.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/#contacto"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-7 py-4 text-base font-bold !text-blue-950 shadow-[0_18px_40px_rgba(250,204,21,0.24)] transition hover:bg-yellow-200"
                >
                  Solicitar estudio
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  href="tel:955515708"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 text-base font-bold text-white transition hover:border-white/35 hover:bg-white/8"
                >
                  <Phone size={18} aria-hidden="true" />
                  955 515 708
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {["Consumo real", "Ahorro estimado", "Decisión con datos"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 text-blue-50/82">
                    <BadgeCheck
                      size={20}
                      className="shrink-0 text-yellow-300"
                      aria-hidden="true"
                    />
                    <span className="font-semibold">{item}</span>
                  </div>
                ),
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
