import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  ChartNoAxesCombined,
  Eye,
  FileCheck2,
  Gauge,
  Phone,
  Settings,
  ShieldCheck,
  SunMedium,
  Wrench,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

const benefits = [
  {
    icon: Gauge,
    title: "Mayor rendimiento",
    copy: "Comprobamos producción, consumo y estado de la instalación para detectar pérdidas de rendimiento.",
  },
  {
    icon: ShieldCheck,
    title: "Instalación protegida",
    copy: "Revisamos elementos eléctricos, protecciones, estructura y puntos críticos para trabajar con seguridad.",
  },
  {
    icon: Activity,
    title: "Seguimiento continuo",
    copy: "Monitorizamos la planta y atendemos incidencias para que el sistema siga funcionando como debe.",
  },
];

const includedItems = [
  {
    icon: Eye,
    title: "Revisión visual y técnica",
    copy: "Comprobamos módulos, estructura, cableado, conectores, inversor y elementos de protección.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Análisis de producción",
    copy: "Comparamos la energía generada con el rendimiento esperado y revisamos posibles desviaciones.",
  },
  {
    icon: AlertTriangle,
    title: "Detección de incidencias",
    copy: "Localizamos avisos, fallos de comunicación, alarmas del inversor o bajadas anómalas de producción.",
  },
  {
    icon: FileCheck2,
    title: "Informe y recomendaciones",
    copy: "Entregamos conclusiones claras y, si procede, proponemos acciones para recuperar rendimiento.",
  },
];

const processSteps = [
  {
    title: "Consulta o revisión programada",
    copy: "Recogemos datos de la instalación, ubicación, potencia, inversor y acceso a monitorización.",
  },
  {
    title: "Diagnóstico de rendimiento",
    copy: "Revisamos producción, históricos, alarmas y comportamiento energético de la planta.",
  },
  {
    title: "Inspección técnica",
    copy: "Comprobamos estado de módulos, estructura, cuadros, protecciones y conexiones principales.",
  },
  {
    title: "Intervención o ajuste",
    copy: "Realizamos correcciones, limpieza técnica, ajustes de configuración o propuesta de reparación.",
  },
  {
    title: "Seguimiento posterior",
    copy: "Verificamos que la planta vuelve a producir correctamente y dejamos registro del servicio.",
  },
];

const supportAreas = [
  {
    icon: SunMedium,
    title: "Placas solares",
    copy: "Mantenimiento preventivo y correctivo para instalaciones fotovoltaicas residenciales y empresas.",
  },
  {
    icon: Settings,
    title: "Inversores y cuadros",
    copy: "Revisión de parámetros, protecciones, comunicaciones y elementos eléctricos asociados.",
  },
  {
    icon: Zap,
    title: "Baterías y excedentes",
    copy: "Comprobación de almacenamiento, perfiles de consumo y funcionamiento de compensación.",
  },
  {
    icon: Wrench,
    title: "Postventa",
    copy: "Atención cercana después de la instalación para resolver dudas e incidencias técnicas.",
  },
];

const monitoringStats = [
  { label: "Producción ahora", value: "6,8 kW", detail: "+12% vs previsto" },
  { label: "Energía hoy", value: "42,4 kWh", detail: "13:42 h" },
  { label: "Rendimiento", value: "97%", detail: "PR estimado" },
  { label: "CO2 evitado", value: "18,6 kg", detail: "hoy" },
];

const monitoringEvents = [
  "Inversor online",
  "String 02 estable",
  "Sin alarmas activas",
];

export const metadata: Metadata = {
  title: "Mantenimiento y soporte solar | Grupo Solar Sur",
  description:
    "Mantenimiento, monitorización y soporte técnico para instalaciones solares fotovoltaicas, inversores, baterías y rendimiento energético en Andalucía.",
};

export default function MaintenanceSupportPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative min-h-[560px] overflow-hidden bg-[#071936] pb-10 pt-8 text-white sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(250,204,21,0.22),transparent_25%),radial-gradient(circle_at_78%_76%,rgba(34,211,238,0.18),transparent_32%),linear-gradient(90deg,#071936_0%,#13275a_48%,#647da8_100%)]" />
          <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.98)_100%)]" />

          <Container className="relative">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="max-w-3xl">
              <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-yellow-300">
                Mantenimiento y soporte
              </p>
              <h1 className="mt-5 max-w-[13ch] text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.8rem]">
                Tu instalación siempre a punto
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-50/86 sm:text-xl">
                Seguimiento técnico, revisión preventiva y soporte profesional
                para que tu instalación solar mantenga su rendimiento.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/#contacto"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-7 py-4 text-base font-bold !text-blue-950 shadow-[0_18px_40px_rgba(250,204,21,0.26)] transition hover:bg-yellow-200"
                >
                  Solicitar revisión
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  href="tel:651194097"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:border-white/45 hover:bg-white/16"
                >
                  <Phone size={18} aria-hidden="true" />
                  Llamar ahora
                </a>
              </div>
            </div>

              <div className="relative hidden lg:mt-4 lg:block">
                <div className="absolute -inset-8 rounded-[2rem] bg-blue-200/10 blur-3xl" />
                <div className="relative overflow-hidden rounded-[1.2rem] border border-white/16 bg-slate-950/46 p-4 shadow-[0_32px_90px_rgba(0,0,0,0.32)] backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
                        Monitorización solar
                      </p>
                      <h2 className="mt-1.5 text-xl font-extrabold tracking-tight">
                        Planta FV · Sevilla Norte
                      </h2>
                    </div>
                    <div className="rounded-full border border-emerald-300/30 bg-emerald-400/12 px-3 py-1.5 text-xs font-extrabold text-emerald-200">
                      En tiempo real
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {monitoringStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-lg border border-white/10 bg-white/8 p-3"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100/72">
                          {stat.label}
                        </p>
                        <p className="mt-1.5 text-2xl font-black tracking-tight text-white">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-emerald-200">
                          {stat.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 grid gap-3 xl:grid-cols-[1.35fr_0.65fr]">
                    <div className="rounded-lg border border-white/10 bg-white/8 p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-extrabold text-blue-50">
                          Curva de potencia
                        </p>
                        <span className="text-xs font-bold text-yellow-200">
                          08:00 - 18:00
                        </span>
                      </div>
                      <svg
                        viewBox="0 0 420 180"
                        className="mt-3 h-32 w-full"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 148H400M20 108H400M20 68H400M20 28H400"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="1"
                        />
                        <path
                          d="M24 148C56 144 70 132 92 118C121 99 145 88 170 74C207 53 237 35 270 42C306 50 326 84 352 101C374 116 389 121 404 119"
                          stroke="#FACC15"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M24 148C56 144 70 132 92 118C121 99 145 88 170 74C207 53 237 35 270 42C306 50 326 84 352 101C374 116 389 121 404 119V160H24V148Z"
                          fill="url(#solarPowerFill)"
                        />
                        <circle cx="270" cy="42" r="7" fill="#FACC15" />
                        <defs>
                          <linearGradient
                            id="solarPowerFill"
                            x1="214"
                            y1="42"
                            x2="214"
                            y2="160"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FACC15" stopOpacity="0.36" />
                            <stop offset="1" stopColor="#FACC15" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div className="grid gap-2.5">
                      <div className="rounded-lg border border-white/10 bg-white/8 p-3">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-100/72">
                          Estado
                        </p>
                        <ul className="mt-3 grid gap-2">
                          {monitoringEvents.map((event) => (
                            <li
                              key={event}
                              className="flex items-center gap-2 text-sm font-semibold text-blue-50"
                            >
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
                              {event}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-lg border border-yellow-300/24 bg-yellow-300/12 p-3">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-200">
                          Próxima revisión
                        </p>
                        <p className="mt-2 text-2xl font-black text-white">
                          21 días
                        </p>
                        <p className="mt-1 text-xs font-semibold text-blue-50/72">
                          limpieza, protecciones e inversor
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="pt-12 pb-16 sm:pt-14 sm:pb-20">
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
                  Rendimiento solar
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Mantener también es ahorrar
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  Una instalación fotovoltaica necesita seguimiento para asegurar
                  que produce lo esperado. Polvo, sombras nuevas, fallos de
                  comunicación, alarmas del inversor o conexiones deterioradas
                  pueden reducir el ahorro sin que el usuario lo detecte a tiempo.
                </p>
                <p>
                  En Grupo SolarSur revisamos el estado técnico de la planta,
                  analizamos la producción y dejamos recomendaciones claras para
                  conservar el rendimiento durante toda la vida útil del sistema.
                </p>
                <p>
                  El mantenimiento permite anticiparse a incidencias, proteger la
                  inversión y mejorar la confianza diaria en la instalación.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-yellow-300">
                  Qué incluye
                </p>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-[3.2rem]">
                  Revisión técnica para producir con tranquilidad
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  El mantenimiento se lee como un diagnóstico: datos, inspección,
                  incidencias y recomendaciones accionables.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {includedItems.map(({ icon: Icon, title, copy }, index) => (
                  <article
                    key={title}
                    className="rounded-lg border border-white/10 bg-white p-6 text-blue-950 shadow-[0_18px_42px_rgba(0,0,0,0.18)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                        <Icon size={23} aria-hidden="true" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
                        Control {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">
                      {copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Proceso
                </p>
                <h2 className="mt-4 max-w-[12ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Cómo revisamos tu instalación
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  Combinamos datos de monitorización con revisión técnica para
                  detectar problemas y recuperar rendimiento.
                </p>
              </div>

              <ol className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
                {processSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid gap-4 border-b border-slate-200 p-5 last:border-b-0 sm:grid-cols-[6rem_0.85fr_1.15fr]"
                  >
                    <span className="text-sm font-black uppercase tracking-[0.22em] text-blue-900">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="text-lg font-extrabold tracking-tight text-blue-950">
                      {step.title}
                    </div>
                    <div>
                      <p className="text-base leading-7 text-slate-600">
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
                  Soporte técnico
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Cuidamos los puntos que más influyen
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  No se trata solo de revisar paneles. Un buen mantenimiento
                  también mira comunicaciones, inversores, protecciones y datos
                  de producción.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {supportAreas.map(({ icon: Icon, title, copy }) => (
                  <article
                    key={title}
                    className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-blue-50 text-blue-900">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold tracking-tight text-blue-950">
                      {title}
                    </h3>
                    <p className="mt-3 text-[0.96rem] leading-7 text-slate-600">
                      {copy}
                    </p>
                  </article>
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
                  <Wrench size={24} aria-hidden="true" />
                </div>
                <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.7rem]">
                  ¿Quieres comprobar si tu instalación rinde como debería?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50/78">
                  Cuéntanos tu caso y revisaremos el estado de tu planta,
                  producción, monitorización y posibles mejoras.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/#contacto"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-7 py-4 text-base font-bold !text-blue-950 shadow-[0_18px_40px_rgba(250,204,21,0.24)] transition hover:bg-yellow-200"
                >
                  Solicitar revisión
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  href="tel:651194097"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 text-base font-bold text-white transition hover:border-white/35 hover:bg-white/8"
                >
                  <Phone size={18} aria-hidden="true" />
                  651 194 097
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {["Revisión técnica", "Monitorización", "Mayor rendimiento"].map(
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
