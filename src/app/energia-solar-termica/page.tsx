import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Droplets,
  FileCheck2,
  Phone,
  ShowerHead,
  SunMedium,
  ThermometerSun,
  Wrench,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

const benefits = [
  {
    icon: Droplets,
    title: "ACS eficiente",
    copy: "Aprovechamos la radiación solar para producir agua caliente sanitaria de forma eficiente.",
  },
  {
    icon: SunMedium,
    title: "Más ahorro",
    copy: "Reducimos el consumo energético asociado al agua caliente en viviendas, comunidades y negocios.",
  },
  {
    icon: ThermometerSun,
    title: "Mayor eficiencia",
    copy: "Diseñamos sistemas solares térmicos orientados a rendimiento, estabilidad y confort diario.",
  },
];

const includedItems = [
  {
    icon: ClipboardCheck,
    title: "Estudio de demanda",
    copy: "Calculamos las necesidades de agua caliente según uso, ocupación y tipo de inmueble.",
  },
  {
    icon: ShowerHead,
    title: "Sistema para ACS",
    copy: "Planteamos captadores, acumulación y apoyo energético para un suministro cómodo y eficiente.",
  },
  {
    icon: FileCheck2,
    title: "Gestión y legalización",
    copy: "Te orientamos con la documentación técnica necesaria y posibles ayudas disponibles.",
  },
  {
    icon: Wrench,
    title: "Instalación profesional",
    copy: "Ejecutamos la instalación con equipo especializado y cuidando integración, seguridad y rendimiento.",
  },
];

const processSteps = [
  "Analizamos la demanda de agua caliente y las condiciones de cubierta o ubicación.",
  "Definimos captadores, acumulador y sistema de apoyo para cubrir tus necesidades reales.",
  "Instalamos el circuito solar térmico, acumulación y elementos de control necesarios.",
  "Revisamos el funcionamiento para que el sistema produzca ACS con eficiencia desde el primer día.",
];

export const metadata: Metadata = {
  title: "Energía solar térmica | Grupo Solar Sur",
  description:
    "Instalaciones de energía solar térmica para producción de agua caliente sanitaria con más ahorro y eficiencia.",
};

export default function SolarThermalPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative min-h-[620px] overflow-hidden bg-blue-950 py-20 text-white sm:py-24 lg:py-28">
          <Image
            src="/imagenes/hero/hero-energia-solar-termica.svg"
            alt=""
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,37,84,0.96)_0%,rgba(23,37,84,0.76)_42%,rgba(23,37,84,0.16)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.98)_100%)]" />

          <Container className="relative">
            <div className="max-w-3xl pt-6">
              <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-yellow-300">
                Energía solar térmica
              </p>
              <h1 className="mt-5 max-w-[13ch] text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.8rem]">
                Agua caliente con energía del sol
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-50/86 sm:text-xl">
                Producción de agua caliente sanitaria (ACS) con energía solar.
                Más ahorro y eficiencia para tu vivienda, comunidad o negocio.
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
                  Agua caliente sanitaria
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Una solución térmica para reducir consumo
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  La energía solar térmica permite aprovechar la radiación solar
                  para calentar agua y cubrir parte importante de la demanda de
                  ACS en viviendas, comunidades, alojamientos, negocios y
                  edificios con consumo regular.
                </p>
                <p>
                  Diseñamos cada instalación teniendo en cuenta la demanda real,
                  el espacio disponible, la orientación, el sistema de acumulación
                  y el apoyo energético necesario para garantizar confort.
                </p>
                <p>
                  Es una opción práctica para mejorar la eficiencia energética y
                  reducir el gasto asociado al agua caliente durante todo el año.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-blue-950 py-16 text-white sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-yellow-300">
                  Qué incluye
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight sm:text-[3.2rem]">
                  Proyecto térmico adaptado a tu demanda
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-blue-50/78">
                  La solar térmica se diseña alrededor del uso diario del agua:
                  demanda, acumulación, apoyo y control.
                </p>

                <div className="mt-9 grid max-w-lg grid-cols-3 border border-white/12 text-center">
                  {["Captación", "Acumulación", "ACS"].map((item) => (
                    <div
                      key={item}
                      className="border-r border-white/12 px-3 py-4 text-sm font-extrabold last:border-r-0"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {includedItems.map(({ icon: Icon, title, copy }, index) => (
                  <article
                    key={title}
                    className="grid gap-4 rounded-lg border border-white/12 bg-white/8 p-5 backdrop-blur sm:grid-cols-[auto_1fr_auto] sm:items-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-300 text-blue-950">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight">
                        {title}
                      </h3>
                      <p className="mt-2 text-[0.98rem] leading-7 text-blue-50/76">
                        {copy}
                      </p>
                    </div>
                    <span className="text-4xl font-black leading-none text-white/12">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div className="rounded-lg bg-amber-50 p-7">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-600">
                  Proceso
                </p>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Cómo instalamos tu sistema térmico
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-700">
                  Definimos una solución clara para que el sistema produzca agua
                  caliente con energía solar y funcione de forma estable.
                </p>
                <div className="mt-8 flex items-center gap-3 border-t border-amber-200 pt-6 text-blue-950">
                  <ThermometerSun size={28} className="text-amber-600" aria-hidden="true" />
                  <span className="text-xl font-extrabold">Rendimiento estable</span>
                </div>
              </div>

              <ol className="grid gap-4 sm:grid-cols-2">
                {processSteps.map((step, index) => (
                  <li
                    key={step}
                    className="relative min-h-[14rem] rounded-lg border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.05)]"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-8 text-base font-semibold leading-7 text-blue-950">
                      {step}
                    </p>
                    <div className="absolute bottom-0 left-0 h-1.5 w-full bg-[linear-gradient(90deg,#facc15_0%,#38bdf8_100%)]" />
                  </li>
                ))}
              </ol>
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
                  ¿Quieres producir ACS con energía solar?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50/78">
                  Cuéntanos tu caso y prepararemos un estudio gratuito para
                  valorar una instalación solar térmica eficiente y bien
                  dimensionada.
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
              {["ACS eficiente", "Más ahorro", "Mayor eficiencia"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-blue-50/82">
                  <BadgeCheck
                    size={20}
                    className="shrink-0 text-yellow-300"
                    aria-hidden="true"
                  />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
