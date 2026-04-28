import type { ElementType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, SunMedium, Wrench } from "lucide-react";

import {
  AerotermiaIcon,
  SolarThermalIcon,
  type ServiceIconProps,
} from "@/components/icons/ServiceIcons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import {
  projectServiceGroups,
  type ProjectServiceKey,
} from "@/data/projectServices";
import { getProjectCategoryGroups, getProjectHref } from "@/lib/projectCatalog";

const projectServiceStyles: Record<
  ProjectServiceKey,
  {
    icon: ElementType<ServiceIconProps>;
    iconClass: string;
    eyebrow: string;
  }
> = {
  photovoltaic: {
    icon: SunMedium,
    iconClass: "bg-yellow-50 text-amber-600",
    eyebrow: "Autoconsumo y baterías",
  },
  "solar-thermal": {
    icon: SolarThermalIcon,
    iconClass: "bg-amber-50 text-amber-600",
    eyebrow: "ACS y soluciones híbridas",
  },
  aerotermia: {
    icon: AerotermiaIcon,
    iconClass: "bg-cyan-50 text-cyan-700",
    eyebrow: "Climatización eficiente",
  },
  maintenance: {
    icon: Wrench,
    iconClass: "bg-sky-50 text-blue-800",
    eyebrow: "Seguimiento técnico",
  },
};

const categorizedProjectGroups = getProjectCategoryGroups().map((service) => ({
  ...service,
  ...projectServiceStyles[service.key],
}));

export const metadata: Metadata = {
  title: "Proyectos por categorías | Grupo Solar Sur",
  description:
    "Accede a las páginas independientes de proyectos de fotovoltaica, solar térmica, aerotermia y mantenimiento con fichas técnicas e imágenes reales.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="bg-slate-50 py-16 sm:py-20">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Proyectos por categorías
                </p>
                <h1 className="mt-4 max-w-[14ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Resumen de proyectos
                </h1>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                Hemos separado los proyectos en páginas independientes por
                categoría para que cada servicio tenga su propio escaparate:
                fotovoltaica, solar térmica, aerotermia y mantenimiento.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {categorizedProjectGroups.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.key}
                    className="rounded-lg border border-blue-200/70 bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${service.iconClass}`}
                      >
                        <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <span className="inline-flex min-h-8 items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-900">
                        {service.projects.length}{" "}
                        {service.projects.length === 1 ? "proyecto" : "proyectos"}
                      </span>
                    </div>

                    <p className="mt-4 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                      {service.eyebrow}
                    </p>
                    <h2 className="mt-2 text-xl font-extrabold leading-tight tracking-tight text-blue-950">
                      {service.label}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {service.description}
                    </p>

                    <div className="mt-5 space-y-2">
                      {service.projects.slice(0, 2).map((project) => (
                        <Link
                          key={`${service.key}-${project.slug}`}
                          href={getProjectHref(project)}
                          className="block rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-blue-950 transition hover:border-blue-200 hover:bg-blue-50"
                        >
                          {project.title}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={service.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-900 transition hover:text-blue-700"
                    >
                      Ver página de categoría
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-8 rounded-lg border border-yellow-200 bg-[linear-gradient(180deg,#fff7cc_0%,#fffdf2_100%)] p-7 shadow-[0_20px_48px_rgba(15,23,42,0.06)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900 text-yellow-300">
                  <FileText size={23} aria-hidden="true" />
                </div>
                <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[2.35rem]">
                  ¿Buscas un proyecto similar al tuyo?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-950/72">
                  Entra en la categoría que mejor encaje con tu necesidad y revisa
                  las obras publicadas con datos técnicos, imágenes y contexto real.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href={projectServiceGroups[0].href}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-900 px-7 py-4 text-base font-bold !text-white shadow-[0_18px_40px_rgba(23,37,84,0.22)] transition hover:bg-blue-800"
                >
                  Ver fotovoltaica
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link
                  href="/#contacto"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-7 py-4 text-base font-bold text-blue-900 transition hover:border-blue-300 hover:bg-white"
                >
                  Pedir estudio
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
