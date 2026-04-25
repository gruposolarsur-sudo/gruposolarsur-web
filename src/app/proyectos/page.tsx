import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BatteryCharging,
  BadgeCheck,
  Fan,
  FileText,
  Gauge,
  HousePlug,
  LayoutGrid,
  MapPin,
  Newspaper,
  PanelTop,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  SunMedium,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProjectMediaCarousel } from "@/components/projects/ProjectMediaCarousel";
import { Container } from "@/components/ui/Container";
import {
  type ProjectDetailIcon,
  photovoltaicSolutions,
  projectStories,
} from "@/data/projectStories";

const detailIcons: Record<ProjectDetailIcon, LucideIcon> = {
  type: SunMedium,
  mount: HousePlug,
  module: PanelTop,
  inverter: Zap,
  shield: ShieldCheck,
  status: BadgeCheck,
  service: Fan,
  unit: Wrench,
  control: SlidersHorizontal,
  design: Ruler,
  inspection: LayoutGrid,
  target: Gauge,
  battery: BatteryCharging,
};

const photovoltaicProjectGroups = photovoltaicSolutions.map((solution) => ({
  ...solution,
  projects: projectStories.filter((project) => project.solutionKey === solution.key),
}));

export const metadata: Metadata = {
  title: "Proyectos reales por zonas | Grupo Solar Sur",
  description:
    "Mapa de proyectos reales de Grupo SolarSur en Andalucia con fichas tecnicas por tipo de instalacion y mini noticias enlazadas al blog.",
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
                  Proyectos por tipo
                </p>
                <h2 className="mt-4 max-w-[16ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Cada solucion enlaza con sus obras
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                Desde cada tarjeta de servicio puedes venir directamente a esta
                zona y revisar las obras documentadas para ese tipo de montaje
                fotovoltaico.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {photovoltaicProjectGroups.map((solution) => (
                <article
                  id={`solucion-${solution.key}`}
                  key={solution.key}
                  className="scroll-mt-28 rounded-lg border border-blue-200/70 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-blue-600">
                        Tipo de montaje
                      </p>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-blue-950">
                        {solution.title}
                      </h3>
                    </div>
                    <span className="inline-flex min-h-9 items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-900">
                      {solution.projects.length}{" "}
                      {solution.projects.length === 1 ? "proyecto" : "proyectos"}
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-slate-600">
                    {solution.copy}
                  </p>

                  <div className="mt-6 space-y-3">
                    {solution.projects.length > 0 ? (
                      solution.projects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`#${project.slug}`}
                          className="group flex min-h-16 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50"
                        >
                          <div>
                            <p className="text-sm font-extrabold text-blue-950">
                              {project.title}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                              {project.zone}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-800 transition group-hover:text-blue-600">
                            Ver ficha
                            <ArrowRight size={16} aria-hidden="true" />
                          </span>
                        </Link>
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-4 text-sm leading-7 text-slate-500">
                        Estamos preparando las primeras obras documentadas para
                        esta solucion.
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Fichas tecnicas
                </p>
                <h2 className="mt-4 max-w-[15ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Instalaciones documentadas
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-sm font-bold !text-white shadow-[0_16px_34px_rgba(23,37,84,0.2)] transition hover:bg-blue-800 sm:w-auto"
              >
                Ver blog
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6">
              {projectStories.map((project) => {
                const visibleTechnicalSheet = project.technicalSheet.filter(
                  (item) => item.label !== "Tipo",
                );

                return (
                  <article
                    id={project.slug}
                    key={project.slug}
                    className="scroll-mt-28 overflow-hidden rounded-lg border border-blue-200/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
                  >
                  <div className="relative aspect-[16/8.8] overflow-hidden bg-blue-950 sm:aspect-[16/7.5] lg:aspect-[16/6.1]">
                    <ProjectMediaCarousel
                      images={
                        project.galleryImages?.length
                          ? project.galleryImages
                          : [project.image]
                      }
                      title={project.title}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(23,37,84,0.76)_100%)]" />
                    <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-wrap gap-2">
                      <span className="inline-flex min-h-8 items-center rounded-full bg-yellow-300 px-3 py-1 text-xs font-extrabold text-blue-950">
                        {project.category}
                      </span>
                      <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-blue-950/82 px-3 py-1 text-xs font-extrabold text-white backdrop-blur">
                        <MapPin size={13} aria-hidden="true" />
                        {project.zone}
                      </span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden bg-[linear-gradient(180deg,#12244b_0%,#17306b_58%,#1e3a8a_100%)] p-6 text-white sm:p-8">
                    <div className="pointer-events-none absolute inset-0 opacity-16 [background-image:linear-gradient(rgba(191,219,254,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(191,219,254,0.14)_1px,transparent_1px)] [background-size:2rem_2rem]" />
                    <div className="pointer-events-none absolute inset-0 opacity-8 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:0.55rem_0.55rem]" />
                    <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 border-l border-t border-sky-200/20" />
                    <div className="pointer-events-none absolute bottom-8 right-8 h-20 w-20 border-b border-r border-sky-200/16" />

                    <div className="relative">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs font-extrabold text-blue-50">
                          {project.publishedAt}
                        </span>
                      </div>

                      <h3 className="mt-4 max-w-4xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.2rem]">
                        {project.title}
                      </h3>
                      <p className="mt-4 max-w-4xl text-[1rem] leading-8 text-blue-50/78">
                        {project.summary}
                      </p>

                      <div className="mt-7 grid gap-4 xl:grid-cols-[1fr_1fr_auto] xl:items-start">
                        <div className="rounded-lg border border-white/10 bg-white/7 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                          <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-blue-100/70">
                            Tipo de instalacion
                          </p>
                          <div className="mt-3 flex items-start gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-yellow-300">
                              <SunMedium size={18} aria-hidden="true" />
                            </span>
                            <div>
                              <p className="text-sm font-extrabold text-white">
                                {project.installationType}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-blue-50/72">
                                Configuracion principal del proyecto ejecutado.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/7 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                          <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-blue-100/70">
                            Ubicacion del proyecto
                          </p>
                          <div className="mt-3 flex items-start gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-yellow-300">
                              <MapPin size={18} aria-hidden="true" />
                            </span>
                            <div>
                              <p className="text-sm font-extrabold text-white">
                                {project.zone}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-blue-50/72">
                                Proyecto documentado y enlazado con su mini noticia.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:justify-end">
                          <Link
                            href={`/blog#${project.slug}`}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-yellow-300 px-5 py-3 text-sm font-bold !text-blue-950 transition hover:bg-yellow-200"
                          >
                            <Newspaper size={16} aria-hidden="true" />
                            Mini noticia
                          </Link>
                          <Link
                            href="/#contacto"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/8 px-5 py-3 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/12"
                          >
                            <FileText size={16} aria-hidden="true" />
                            Consultar proyecto similar
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-8 overflow-hidden rounded-lg border border-white/12 bg-[linear-gradient(180deg,rgba(30,64,175,0.44)_0%,rgba(15,23,42,0.62)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-5">
                      <div className="pointer-events-none absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(191,219,254,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(191,219,254,0.14)_1px,transparent_1px)] [background-size:1.75rem_1.75rem]" />
                      <div className="pointer-events-none absolute inset-x-5 top-14 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(125,211,252,0.5)_18%,rgba(125,211,252,0.18)_82%,transparent_100%)]" />
                      <div className="pointer-events-none absolute bottom-5 right-5 h-14 w-14 border-b border-r border-sky-200/18" />

                      <div className="relative flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-yellow-300">
                          Ficha tecnica
                        </p>
                        <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-extrabold text-blue-50/82">
                          Datos clave
                        </span>
                      </div>

                      <dl className="relative mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {visibleTechnicalSheet.map((item) => {
                          const DetailIcon = detailIcons[item.icon];

                          return (
                            <div
                              key={`${project.slug}-${item.label}`}
                              className="grid min-h-[5.6rem] grid-cols-[auto_1fr] gap-3 rounded-lg border border-white/10 bg-white/9 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-300 text-blue-950 shadow-[0_10px_22px_rgba(250,204,21,0.18)]">
                                <DetailIcon
                                  size={18}
                                  strokeWidth={2.4}
                                  aria-hidden="true"
                                />
                              </span>
                              <div>
                                <dt className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-blue-100/66">
                                  {item.label}
                                </dt>
                                <dd className="mt-1 text-sm font-medium leading-6 text-white/88">
                                  {item.value}
                                </dd>
                              </div>
                            </div>
                          );
                        })}
                      </dl>

                      <div className="relative mt-4 rounded-lg border border-sky-200/16 bg-sky-300/10 px-4 py-3">
                        <p className="inline-flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-sky-100/76">
                          <Activity size={14} strokeWidth={2.4} aria-hidden="true" />
                          Nota tecnica
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-6 text-blue-50/82">
                          {project.technicalNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
