import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
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
import { AndaluciaProjectsMap } from "@/components/projects/AndaluciaProjectsMap";
import { Container } from "@/components/ui/Container";
import { type ProjectDetailIcon, projectStories } from "@/data/projectStories";

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
};

export const metadata: Metadata = {
  title: "Proyectos reales por zonas | Grupo Solar Sur",
  description:
    "Mapa de proyectos reales de Grupo SolarSur en Andalucía con fichas técnicas por tipo de instalación y mini noticias enlazadas al blog.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_12%,rgba(250,204,21,0.18),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(147,197,253,0.2),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-amber-500">
                  Proyectos reales
                </p>
                <h1 className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-[0.98] tracking-tight text-blue-950 sm:text-6xl lg:text-[4.7rem]">
                  Obras por zonas en Andalucía
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl">
                  Un mapa para identificar instalaciones reales por provincia,
                  zona y tipo de solución, con una ficha técnica clara y una
                  mini noticia publicada en el blog.
                </p>
              </div>

              <AndaluciaProjectsMap />
            </div>
          </Container>
        </section>

        <section className="border-y border-slate-200 bg-white py-5">
          <Container>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "Mapa por provincias",
                "Ficha técnica resumida",
                "Mini noticia enlazada al blog",
              ].map((item) => (
                <div
                  key={item}
                  className="flex min-h-14 items-center gap-3 text-sm font-extrabold text-blue-950"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <MapPin size={20} aria-hidden="true" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Fichas técnicas
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
              {projectStories.map((project) => (
                <article
                  id={project.slug}
                  key={project.slug}
                  className="scroll-mt-28 overflow-hidden rounded-lg border border-blue-200/70 bg-blue-950 shadow-[0_24px_70px_rgba(15,23,42,0.18)] lg:grid lg:grid-cols-[0.88fr_1.12fr]"
                >
                  <div className="relative min-h-[18rem] bg-blue-950 lg:min-h-full">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 42vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1)_0%,rgba(23,37,84,0.9)_100%)]" />
                    <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                      <span className="inline-flex min-h-8 items-center rounded-full bg-yellow-300 px-3 py-1 text-xs font-extrabold text-blue-950">
                        {project.category}
                      </span>
                      <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-blue-950/82 px-3 py-1 text-xs font-extrabold text-white backdrop-blur">
                        <MapPin size={13} aria-hidden="true" />
                        {project.zone}
                      </span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden p-6 text-white sm:p-8">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sky-300/14 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 left-1/4 h-40 w-40 rounded-full bg-yellow-300/12 blur-3xl" />

                    <div className="relative flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-extrabold text-blue-950">
                        {project.installationType}
                      </span>
                      <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs font-extrabold text-blue-50">
                        {project.publishedAt}
                      </span>
                    </div>

                    <h3 className="relative mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="relative mt-4 text-[1rem] leading-8 text-blue-50/78">
                      {project.summary}
                    </p>

                    <div className="relative mt-7 overflow-hidden rounded-lg border border-white/12 bg-[linear-gradient(180deg,rgba(30,64,175,0.7)_0%,rgba(15,23,42,0.72)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-yellow-300">
                          Ficha técnica
                        </p>
                        <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-extrabold text-blue-50/82">
                          Datos clave
                        </span>
                      </div>

                      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                        {project.technicalSheet.map((item) => {
                          const DetailIcon = detailIcons[item.icon];

                          return (
                            <div
                              key={`${project.slug}-${item.label}`}
                              className="grid min-h-[5.4rem] grid-cols-[auto_1fr] gap-3 rounded-lg border border-white/10 bg-white/9 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
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

                      <div className="mt-4 rounded-lg border border-sky-200/16 bg-sky-300/10 px-4 py-3">
                        <p className="inline-flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-sky-100/76">
                          <Activity size={14} strokeWidth={2.4} aria-hidden="true" />
                          Nota técnica
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-6 text-blue-50/82">
                          {project.technicalNote}
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
