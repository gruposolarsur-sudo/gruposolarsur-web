import type { ElementType } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText, SunMedium, Wrench } from "lucide-react";

import {
  AerotermiaIcon,
  SolarThermalIcon,
  type ServiceIconProps,
} from "@/components/icons/ServiceIcons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProjectStoryArticle } from "@/components/projects/ProjectStoryArticle";
import { Container } from "@/components/ui/Container";
import {
  projectServiceGroups,
  type ProjectServiceKey,
} from "@/data/projectServices";
import {
  getProjectCategoryGroups,
  getProjectServiceBySlug,
  getProjectHref,
} from "@/lib/projectCatalog";

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

export function generateStaticParams() {
  return projectServiceGroups.map((service) => ({
    category: service.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  return params.then(({ category }) => {
    const service = getProjectServiceBySlug(category);

    if (!service) {
      return {
        title: "Categoría de proyectos | Grupo Solar Sur",
      };
    }

    return {
      title: `${service.label} | Proyectos reales | Grupo Solar Sur`,
      description: `${service.description} Consulta proyectos reales, fichas técnicas e imágenes en la categoría ${service.label.toLowerCase()}.`,
    };
  });
}

export default async function ProjectCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const service = getProjectServiceBySlug(category);

  if (!service) {
    notFound();
  }

  const styles = projectServiceStyles[service.key];
  const Icon = styles.icon;
  const categoryGroup = getProjectCategoryGroups().find(
    (group) => group.key === service.key,
  );

  if (!categoryGroup) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-16 sm:py-20">
          <Container>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.iconClass}`}
                  >
                    <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                    {styles.eyebrow}
                  </p>
                </div>
                <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  {service.label}
                </h1>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex min-h-10 items-center rounded-full bg-blue-900 px-4 py-2 text-sm font-extrabold text-white">
                  {categoryGroup.projects.length}{" "}
                  {categoryGroup.projects.length === 1 ? "ficha publicada" : "fichas publicadas"}
                </span>
                <Link
                  href="/proyectos"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-900 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  Volver al resumen
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {projectServiceGroups.map((item) => {
                const itemStyles = projectServiceStyles[item.key];
                const ItemIcon = itemStyles.icon;
                const isCurrent = item.key === service.key;

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`rounded-lg border p-4 transition ${
                      isCurrent
                        ? "border-blue-300 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl ${itemStyles.iconClass}`}
                      >
                        <ItemIcon size={18} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-extrabold text-blue-950">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {itemStyles.eyebrow}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            {categoryGroup.projects.length > 0 ? (
              <div className="grid gap-6">
                {categoryGroup.projects.map((project) => (
                  <ProjectStoryArticle key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white px-5 py-5 text-sm leading-7 text-slate-500">
                Estamos preparando las primeras fichas documentadas para esta
                categoría.
              </div>
            )}
          </Container>
        </section>

        <section className="pb-16 sm:pb-20">
          <Container>
            <div className="grid gap-8 rounded-lg border border-yellow-200 bg-[linear-gradient(180deg,#fff7cc_0%,#fffdf2_100%)] p-7 shadow-[0_20px_48px_rgba(15,23,42,0.06)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900 text-yellow-300">
                  <FileText size={23} aria-hidden="true" />
                </div>
                <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[2.35rem]">
                  ¿Quieres ver un proyecto similar a este?
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-950/72">
                  Te ayudamos a revisar tu caso y a plantear una solución ajustada
                  a tu cubierta, consumo y tipo de instalación.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#contacto"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-900 px-7 py-4 text-base font-bold !text-white shadow-[0_18px_40px_rgba(23,37,84,0.22)] transition hover:bg-blue-800"
                >
                  Pedir estudio
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                {categoryGroup.projects[0] ? (
                  <Link
                    href={getProjectHref(categoryGroup.projects[0])}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-7 py-4 text-base font-bold text-blue-900 transition hover:border-blue-300 hover:bg-white"
                  >
                    Ver una ficha
                  </Link>
                ) : null}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
