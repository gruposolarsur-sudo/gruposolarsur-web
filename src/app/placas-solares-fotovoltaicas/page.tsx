import type { Metadata } from "next";
import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  ChartNoAxesCombined,
  ClipboardCheck,
  FileCheck2,
  Home,
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
    icon: Calculator,
    title: "Estudio previo",
    copy: "Analizamos tu consumo, cubierta y hábitos para plantear una instalación ajustada a tu caso.",
  },
  {
    icon: SunMedium,
    title: "Dimensionado profesional",
    copy: "Calculamos el número de paneles y la potencia necesaria para maximizar el rendimiento.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Ahorro real",
    copy: "Orientamos el proyecto a reducir la factura con una solución eficiente y rentable.",
  },
];

const includedItems = [
  {
    icon: ClipboardCheck,
    title: "Visita técnica y asesoramiento",
    copy: "Revisamos el punto de instalación y resolvemos dudas antes de preparar la propuesta.",
  },
  {
    icon: Home,
    title: "Diseño para viviendas y empresas",
    copy: "Adaptamos la instalación fotovoltaica a cubiertas residenciales, negocios y comunidades.",
  },
  {
    icon: FileCheck2,
    title: "Gestión documental",
    copy: "Te orientamos con la documentación, legalización y posibles ayudas disponibles.",
  },
  {
    icon: Wrench,
    title: "Instalación y soporte",
    copy: "Ejecutamos el proyecto con equipo especializado y damos seguimiento técnico posterior.",
  },
];

const processSteps = [
  "Estudiamos tu consumo y las posibilidades reales de tu cubierta.",
  "Preparamos una propuesta clara con potencia, ahorro estimado y alcance técnico.",
  "Instalamos los paneles, inversor y elementos necesarios con criterio profesional.",
  "Dejamos la instalación lista para producir energía solar y empezar a ahorrar.",
];

type MountIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

function CoplanarMountIcon({
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}: MountIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 34 32 18l22 16" />
      <path d="M17 34v18h30V34" />
      <path d="m21 33 14-10 16 11-14 10-16-11Z" />
      <path d="m28 28 16 11" />
      <path d="m36 23-14 10" />
      <path d="m43 28-14 10" />
    </svg>
  );
}

function PergolaMountIcon({
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}: MountIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 23h34l8 8H20l-8-8Z" />
      <path d="M20 31v22" />
      <path d="M50 31v22" />
      <path d="M25 23v8" />
      <path d="M34 23v8" />
      <path d="M43 23v8" />
      <path d="M17 53h38" />
      <path d="M28 46h14" />
    </svg>
  );
}

function TiltedStructureIcon({
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}: MountIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 50h44" />
      <path d="M18 42 39 25l15 17H18Z" />
      <path d="M22 38h27" />
      <path d="M31 30v12" />
      <path d="M41 27v15" />
      <path d="M18 42v8" />
      <path d="M54 42v8" />
    </svg>
  );
}

function IndustrialGroundMountIcon({
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}: MountIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 51h46" />
      <path d="M12 51V31l16-9 16 9v20" />
      <path d="M18 51V37h20v14" />
      <path d="M16 34h24" />
      <path d="M43 44h14l-6-8H37l6 8Z" />
      <path d="M47 44v7" />
      <path d="M55 44v7" />
    </svg>
  );
}

function CoplanarMountPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 360 240" fill="none" aria-hidden="true" {...props}>
      <path d="M32 146 176 54l152 92" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 147v70h220v-70" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M118 124 176 86l92 58-59 38-91-58Z" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d="m145 106 92 58" stroke="currentColor" strokeWidth="3" />
      <path d="m173 88 92 58" stroke="currentColor" strokeWidth="3" />
      <path d="m144 141 58-38" stroke="currentColor" strokeWidth="3" />
      <path d="m176 161 58-38" stroke="currentColor" strokeWidth="3" />
      <path d="M98 216h154" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

function PergolaMountPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 360 240" fill="none" aria-hidden="true" {...props}>
      <path d="M52 68h194l58 54H111L52 68Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <path d="M99 68v54" stroke="currentColor" strokeWidth="4" />
      <path d="M146 68v54" stroke="currentColor" strokeWidth="4" />
      <path d="M193 68v54" stroke="currentColor" strokeWidth="4" />
      <path d="M240 69v52" stroke="currentColor" strokeWidth="4" />
      <path d="M111 122v90" stroke="currentColor" strokeWidth="6" />
      <path d="M285 122v90" stroke="currentColor" strokeWidth="6" />
      <path d="M84 212h230" stroke="currentColor" strokeWidth="6" />
      <path d="M137 178h86c9 0 18 7 20 16l3 18H113l4-19c2-9 11-15 20-15Z" stroke="currentColor" strokeWidth="4" />
      <path d="M140 212a12 12 0 1 0 24 0" stroke="currentColor" strokeWidth="4" />
      <path d="M211 212a12 12 0 1 0 24 0" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

function TiltedStructurePattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 360 240" fill="none" aria-hidden="true" {...props}>
      <path d="M40 204h280" stroke="currentColor" strokeWidth="6" />
      <path d="M67 159 209 62l82 97H67Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <path d="M90 149h178" stroke="currentColor" strokeWidth="4" />
      <path d="M126 119h117" stroke="currentColor" strokeWidth="4" />
      <path d="M164 93h55" stroke="currentColor" strokeWidth="4" />
      <path d="M102 159v45" stroke="currentColor" strokeWidth="5" />
      <path d="M181 159v45" stroke="currentColor" strokeWidth="5" />
      <path d="M262 159v45" stroke="currentColor" strokeWidth="5" />
      <path d="M102 204 181 159l81 45" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

function IndustrialGroundMountPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 360 240" fill="none" aria-hidden="true" {...props}>
      <path d="M30 210h300" stroke="currentColor" strokeWidth="6" />
      <path d="M45 210V110l72-40 72 40v100" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <path d="M72 126h90" stroke="currentColor" strokeWidth="4" />
      <path d="M72 148h90" stroke="currentColor" strokeWidth="4" />
      <path d="M72 170h90" stroke="currentColor" strokeWidth="4" />
      <path d="M88 210v-46h58v46" stroke="currentColor" strokeWidth="5" />
      <path d="M210 164h98l-34-50h-98l34 50Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <path d="M200 148h98" stroke="currentColor" strokeWidth="4" />
      <path d="M188 131h98" stroke="currentColor" strokeWidth="4" />
      <path d="M224 164v46" stroke="currentColor" strokeWidth="5" />
      <path d="M298 164v46" stroke="currentColor" strokeWidth="5" />
      <path d="M224 210 298 164" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

const installationTypes = [
  {
    icon: CoplanarMountIcon,
    pattern: CoplanarMountPattern,
    title: "Instalación coplanar",
    copy: "Paneles integrados sobre la misma inclinación de la cubierta, una solución limpia y discreta para tejados inclinados.",
    tone: "text-amber-500",
    patternTone: "text-amber-300/30",
    projectsHref: "/proyectos/fotovoltaica",
  },
  {
    icon: PergolaMountIcon,
    pattern: PergolaMountPattern,
    title: "Tipo pérgola solar",
    copy: "Estructuras que generan sombra y producción fotovoltaica en patios, aparcamientos, terrazas o zonas exteriores.",
    tone: "text-orange-500",
    patternTone: "text-orange-300/30",
    projectsHref: "/proyectos/fotovoltaica",
  },
  {
    icon: TiltedStructureIcon,
    pattern: TiltedStructurePattern,
    title: "Estructuras inclinadas",
    copy: "Montajes sobre cubierta plana para orientar mejor los módulos y optimizar producción, seguridad y mantenimiento.",
    tone: "text-sky-600",
    patternTone: "text-sky-300/30",
    projectsHref: "/proyectos/fotovoltaica",
  },
  {
    icon: IndustrialGroundMountIcon,
    pattern: IndustrialGroundMountPattern,
    title: "Cubiertas industriales y suelo",
    copy: "Soluciones para naves, negocios, comunidades o espacios técnicos donde hace falta una estructura específica.",
    tone: "text-emerald-600",
    patternTone: "text-emerald-300/30",
    projectsHref: "/proyectos/fotovoltaica",
  },
];

export const metadata: Metadata = {
  title: "Placas solares fotovoltaicas | Grupo Solar Sur",
  description:
    "Instalaciones eficientes de placas solares fotovoltaicas coplanares, tipo pérgola, sobre estructuras y cubiertas industriales para reducir tu factura.",
};

export default function PhotovoltaicSolarPanelsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative min-h-[620px] overflow-hidden bg-blue-950 py-20 text-white sm:py-24 lg:py-28">
          <Image
            src="/imagenes/hero/hero-placas-solares.svg"
            alt=""
            fill
            priority
            className="object-cover opacity-88"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,37,84,0.96)_0%,rgba(23,37,84,0.78)_44%,rgba(23,37,84,0.18)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.98)_100%)]" />

          <Container className="relative">
            <div className="max-w-3xl pt-6">
              <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-yellow-300">
                Placas solares fotovoltaicas
              </p>
              <h1 className="mt-5 max-w-[13ch] text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.8rem]">
                Energía solar para ahorrar desde tu tejado
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-50/86 sm:text-xl">
                Instalaciones eficientes para reducir tu factura y aprovechar al
                máximo la energía solar.
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
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-yellow-300">
                  Autoconsumo solar
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Una instalación diseñada para tu consumo
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  En Grupo SolarSur diseñamos instalaciones fotovoltaicas para
                  viviendas, empresas y comunidades que quieren reducir su
                  dependencia de la red eléctrica y aprovechar mejor la energía
                  producida por el sol.
                </p>
                <p>
                  Cada proyecto se dimensiona con criterio técnico: consumo
                  anual, orientación, espacio disponible, potencia necesaria y
                  posibilidades de compensación de excedentes.
                </p>
                <p>
                  El objetivo es claro: una solución solar eficiente, bien
                  instalada y orientada a conseguir un ahorro real en la factura.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-blue-50/60 py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-yellow-300">
                  Tipos de instalación
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Montaje adaptado a cada cubierta y espacio
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  No todas las instalaciones solares se resuelven igual. Elegimos
                  el sistema de montaje según inclinación, orientación,
                  resistencia, sombras, uso del espacio y estética del inmueble.
                </p>
              </div>

              <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
                {installationTypes.map(
                  ({
                    icon: Icon,
                    pattern: Pattern,
                    title,
                    copy,
                    tone,
                    patternTone,
                    projectsHref,
                  }) => (
                  <article
                    key={title}
                    className="relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.05)]"
                  >
                    <Pattern
                      className={`pointer-events-none absolute inset-x-0 bottom-0 h-full w-full ${patternTone}`}
                    />
                    <div
                      className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-[0_10px_26px_rgba(15,23,42,0.08)] ${tone}`}
                    >
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <h3 className="relative z-10 mt-6 max-w-[18ch] text-xl font-extrabold tracking-tight text-blue-950">
                      {title}
                    </h3>
                    <p className="relative z-10 mt-3 max-w-[23rem] text-[0.98rem] leading-7 text-slate-600">
                      {copy}
                    </p>
                    <Link
                      href={projectsHref}
                      className="relative z-10 mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-bold text-blue-900 transition hover:text-blue-700"
                    >
                      Ver proyectos
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </article>
                  ),
                )}
              </div>
            </div>
          </Container>
        </section>

        <section className="overflow-hidden bg-[linear-gradient(135deg,#071a3d_0%,#102a56_58%,#123c43_100%)] py-16 text-white sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Qué incluye
                </p>
                <h2 className="mt-4 max-w-[16ch] text-4xl font-extrabold leading-tight tracking-tight sm:text-[3.2rem]">
                  Acompañamiento completo de principio a fin
                </h2>
                <p className="mt-5 max-w-md text-lg leading-8 text-blue-50/78">
                  La instalación fotovoltaica se ordena como un proyecto completo:
                  análisis, diseño, documentación y puesta en marcha.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {["Consumo", "Cubierta", "Trámites", "Soporte"].map((item) => (
                    <div
                      key={item}
                      className="border-l-4 border-yellow-300 bg-white/8 px-4 py-3 text-sm font-extrabold text-blue-50 shadow-[0_10px_26px_rgba(0,0,0,0.12)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
                {includedItems.map(({ icon: Icon, title, copy }) => (
                  <article
                    key={title}
                    className="relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-lg border border-yellow-300/40 bg-white/14 p-6 shadow-[0_20px_46px_rgba(0,0,0,0.18)]"
                  >
                    <Icon
                      size={96}
                      strokeWidth={1.2}
                      className="absolute -right-3 -top-4 text-white/8"
                      aria-hidden="true"
                    />
                    <div
                      className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-300 text-blue-950"
                    >
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <h3 className="relative mt-6 max-w-[18ch] text-2xl font-extrabold tracking-tight text-white">
                      {title}
                    </h3>
                    <p className="relative mt-3 max-w-2xl text-[0.98rem] leading-7 text-blue-50/78">
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
            <div className="max-w-3xl">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                Proceso
              </p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                Cómo ponemos tu instalación en marcha
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Trabajamos con un proceso claro para que sepas qué se va a
                instalar, por qué se dimensiona así y qué ahorro puedes esperar.
              </p>
            </div>

            <ol className="mt-12 grid gap-5 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <li
                  key={step}
                  className="relative flex min-h-[15rem] flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_38px_rgba(15,23,42,0.06)]"
                >
                  <div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-900 text-sm font-black text-yellow-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-6 h-1.5 w-24 bg-yellow-300" />
                  </div>
                  <p className="mt-8 text-base font-semibold leading-7 text-blue-950">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
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
                  ¿Quieres saber cuánto puedes ahorrar con placas solares?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50/78">
                  Cuéntanos tu caso y prepararemos un estudio gratuito para
                  valorar la mejor solución fotovoltaica para tu vivienda o
                  negocio.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/#contacto"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-7 py-4 text-base font-bold !text-blue-950 shadow-[0_18px_40px_rgba(250,204,21,0.24)] transition hover:bg-yellow-200"
                >
                  Pedir presupuesto
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
              {["Instalación profesional", "Materiales de calidad", "Seguimiento técnico"].map(
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
