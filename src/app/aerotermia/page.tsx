import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AirVent,
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Fan,
  FileCheck2,
  Home,
  Phone,
  ThermometerSun,
  Wrench,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

const benefits = [
  {
    icon: Zap,
    title: "Menor consumo",
    copy: "La aerotermia aprovecha la energía del aire exterior para climatizar con alta eficiencia.",
  },
  {
    icon: ThermometerSun,
    title: "Mayor confort",
    copy: "Permite calefacción, refrigeración y agua caliente con una solución estable y cómoda.",
  },
  {
    icon: Fan,
    title: "Sistema eficiente",
    copy: "Diseñamos equipos y emisores para mejorar rendimiento, consumo y funcionamiento diario.",
  },
];

const includedItems = [
  {
    icon: ClipboardCheck,
    title: "Estudio energético",
    copy: "Analizamos demanda, aislamiento, uso del inmueble y sistema actual antes de proponer una solución.",
  },
  {
    icon: Home,
    title: "Viviendas y negocios",
    copy: "Adaptamos la aerotermia a viviendas, locales, oficinas y proyectos con demanda de climatización o ACS.",
  },
  {
    icon: FileCheck2,
    title: "Asesoramiento técnico",
    copy: "Te orientamos en equipos, compatibilidades, documentación y posibles ayudas disponibles.",
  },
  {
    icon: Wrench,
    title: "Instalación y soporte",
    copy: "Ejecutamos la instalación con equipo profesional y seguimiento para asegurar buen rendimiento.",
  },
];

const processSteps = [
  "Revisamos consumo, necesidades térmicas y sistema existente de climatización o agua caliente.",
  "Seleccionamos el equipo y la configuración más adecuada para tu vivienda o negocio.",
  "Instalamos unidad exterior, circuito hidráulico y elementos interiores necesarios.",
  "Comprobamos funcionamiento, eficiencia y confort para dejar el sistema listo para el uso diario.",
];

export const metadata: Metadata = {
  title: "Aerotermia | Grupo Solar Sur",
  description:
    "Sistemas de aerotermia para climatización y agua caliente con alta eficiencia en viviendas y negocios.",
};

export default function AerothermalPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative min-h-[620px] overflow-hidden bg-blue-950 py-20 text-white sm:py-24 lg:py-28">
          <Image
            src="/hero-aerotermia.svg?v=wind-separated"
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
                Aerotermia
              </p>
              <h1 className="mt-5 max-w-[13ch] text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.8rem]">
                Climatización eficiente con energía del aire
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-50/86 sm:text-xl">
                Climatización y agua caliente con alta eficiencia para viviendas
                y negocios.
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
                  href="tel:651194097"
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
                  Bomba de calor
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Una solución para calefacción, frío y ACS
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  La aerotermia utiliza una bomba de calor para extraer energía
                  del aire exterior y transformarla en calefacción, refrigeración
                  o agua caliente sanitaria.
                </p>
                <p>
                  Es una alternativa eficiente para renovar sistemas antiguos,
                  mejorar el confort y reducir el consumo energético en viviendas
                  y negocios.
                </p>
                <p>
                  En Grupo SolarSur diseñamos cada instalación con criterio:
                  demanda térmica, emisores, espacio disponible, acumulación y
                  hábitos de uso.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[linear-gradient(180deg,#ecfeff_0%,#ffffff_100%)] py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
              <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
                {includedItems.map(({ icon: Icon, title, copy }, index) => (
                  <article
                    key={title}
                    className="flex h-full min-h-[15rem] flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
                        <Icon size={23} aria-hidden="true" />
                      </div>
                      <span className="text-3xl font-black leading-none text-cyan-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold tracking-tight text-blue-950">
                      {title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">
                      {copy}
                    </p>
                  </article>
                ))}
              </div>

              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-cyan-700">
                  Qué incluye
                </p>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Aerotermia bien dimensionada y lista para rendir
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  El sistema combina equipo, emisores, hidráulica y control.
                  Por eso cada pieza se ajusta a la demanda térmica real.
                </p>

                <div className="mt-8 grid gap-3 text-sm font-extrabold text-blue-950">
                  {["Aire exterior", "Bomba de calor", "Confort interior"].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 border-b border-cyan-200 pb-3"
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                Proceso
              </p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                Cómo instalamos tu sistema de aerotermia
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Planteamos una solución clara para conseguir confort, eficiencia
                y consumo controlado.
              </p>
            </div>

            <ol className="mt-12 grid gap-5 lg:grid-cols-2">
                {processSteps.map((step, index) => (
                  <li
                    key={step}
                    className={`relative rounded-lg border border-slate-200 bg-white p-6 shadow-[0_14px_34px_rgba(15,23,42,0.05)] ${
                      index % 2 === 1 ? "lg:translate-y-8" : ""
                    }`}
                  >
                    <span className="absolute left-0 top-6 h-[calc(100%-3rem)] w-1.5 bg-cyan-400" />
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-sm font-black text-yellow-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-5 text-base font-semibold leading-7 text-blue-950">
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
                  <AirVent size={24} aria-hidden="true" />
                </div>
                <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.7rem]">
                  ¿Quieres mejorar confort y consumo con aerotermia?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50/78">
                  Cuéntanos tu caso y prepararemos un estudio gratuito para
                  valorar una solución eficiente de climatización y agua caliente.
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
                  href="tel:651194097"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 text-base font-bold text-white transition hover:border-white/35 hover:bg-white/8"
                >
                  <Phone size={18} aria-hidden="true" />
                  651 194 097
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {["Calefacción y frío", "Agua caliente", "Alta eficiencia"].map(
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
