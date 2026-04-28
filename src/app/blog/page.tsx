import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  FileText,
  Newspaper,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

import { BlogCommentsSection } from "@/components/blog/BlogCommentsSection";
import { BlogProjectStoriesPager } from "@/components/blog/BlogProjectStoriesPager";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { projectStories } from "@/data/projectStories";
import { getApprovedBlogCommentsThread } from "@/lib/blogComments";

const featuredPost = {
  label: "Obra destacada",
  title: "Instalaciones solares reales en viviendas y negocios de Andalucía",
  copy: "Un espacio para enseñar trabajos terminados, explicar decisiones técnicas y compartir resultados de proyectos fotovoltaicos, térmicos, aerotermia y mantenimiento.",
  image: projectStories[0].image,
  imageAlt: projectStories[0].imageAlt ?? projectStories[0].title,
};

const newsPosts = [
  {
    icon: FileText,
    category: "Ayudas",
    title: "Subvenciones y deducciones para instalaciones energéticas",
    copy: "Actualizaciones sobre ayudas disponibles, documentación necesaria y pasos habituales para proyectos solares.",
  },
  {
    icon: Zap,
    category: "Autoconsumo",
    title: "Claves para dimensionar una instalación fotovoltaica",
    copy: "Cómo influyen el consumo, la orientación, la cubierta y los hábitos de uso en el ahorro final de una vivienda o negocio.",
  },
  {
    icon: Wrench,
    category: "Soporte",
    title: "Por qué revisar una instalación antes de que baje su rendimiento",
    copy: "Noticias y recomendaciones sobre mantenimiento preventivo, monitorización y resolución de incidencias.",
  },
];

const editorialAreas = [
  "Obras terminadas",
  "Noticias del sector",
  "Ayudas y subvenciones",
  "Consejos de ahorro",
];

export const metadata: Metadata = {
  title: "Blog | Obras y noticias de energía solar | Grupo Solar Sur",
  description:
    "Obras, noticias relevantes y contenido informativo sobre energía solar, autoconsumo, aerotermia, ayudas y mantenimiento en Andalucía.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const approvedComments = await getApprovedBlogCommentsThread();

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_18%_20%,rgba(250,204,21,0.24),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(59,130,246,0.18),transparent_28%)]" />

          <Container className="relative">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div>
                <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-amber-500">
                  Blog SolarSur
                </p>
                <h1 className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-[0.98] tracking-tight text-blue-950 sm:text-6xl lg:text-[4.7rem]">
                  Obras, noticias y energía solar útil
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl">
                  Información clara sobre proyectos reales, novedades del sector,
                  ayudas energéticas y mantenimiento de instalaciones en
                  Andalucía.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {editorialAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex min-h-9 items-center rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-extrabold text-blue-950 shadow-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <article className="relative overflow-hidden rounded-lg border border-slate-200 bg-blue-950 shadow-[0_26px_70px_rgba(15,23,42,0.16)]">
                <div className="relative min-h-[24rem]">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt}
                    fill
                    priority
                    className="object-cover opacity-74"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,37,84,0.12)_0%,rgba(23,37,84,0.86)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span className="inline-flex min-h-8 items-center rounded-full bg-yellow-300 px-3 py-1 text-xs font-extrabold text-blue-950">
                      {featuredPost.label}
                    </span>
                    <h2 className="mt-5 max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-blue-50/82">
                      {featuredPost.copy}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </Container>
        </section>

        <section className="border-y border-slate-200 bg-white py-5">
          <Container>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Sparkles, label: "Obras documentadas" },
                { icon: Newspaper, label: "Noticias relevantes" },
                { icon: CalendarDays, label: "Actualidad energética" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex min-h-14 items-center gap-3 text-sm font-extrabold text-blue-950"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  {label}
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
                  Obras
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Trabajos y casos reales
                </h2>
              </div>
              <Link
                href="/proyectos"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-sm font-bold !text-white shadow-[0_16px_34px_rgba(23,37,84,0.2)] transition hover:bg-blue-800 sm:w-auto"
              >
                Ver proyectos
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <BlogProjectStoriesPager posts={projectStories} />
          </Container>
        </section>

        <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Noticias
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Actualidad y contenido informativo
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Una sección para publicar novedades importantes, cambios en
                  ayudas, consejos técnicos y explicaciones sencillas sobre el
                  sector energético.
                </p>
              </div>

              <div className="grid gap-4">
                {newsPosts.map(({ icon: Icon, category, title, copy }) => (
                  <article
                    key={title}
                    className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:grid-cols-[auto_1fr] sm:p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-500">
                        {category}
                      </span>
                      <h3 className="mt-2 text-xl font-extrabold leading-tight tracking-tight text-blue-950">
                        {title}
                      </h3>
                      <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">
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
            <div className="grid gap-8 rounded-lg border border-yellow-200 bg-[linear-gradient(180deg,#fff7cc_0%,#fffdf2_100%)] p-7 shadow-[0_20px_48px_rgba(15,23,42,0.06)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900 text-yellow-300">
                  <BadgeCheck size={23} aria-hidden="true" />
                </div>
                <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[2.35rem]">
                  ¿Tienes una obra o noticia que debería aparecer aquí?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-950/72">
                  Cuéntanos el caso y prepararemos la información con el enfoque
                  adecuado para mostrar el trabajo, el contexto y el valor del
                  proyecto.
                </p>
              </div>

              <Link
                href="/#contacto"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-900 px-7 py-4 text-base font-bold !text-white shadow-[0_18px_40px_rgba(23,37,84,0.22)] transition hover:bg-blue-800"
              >
                Contactar
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>

        <section className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-16 sm:py-20">
          <Container>
            <BlogCommentsSection
              comments={approvedComments.comments}
              totalCount={approvedComments.totalCount}
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
