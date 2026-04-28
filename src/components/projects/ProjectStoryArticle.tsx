import Link from "next/link";
import {
  Activity,
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

import { ProjectMediaCarousel } from "@/components/projects/ProjectMediaCarousel";
import { type ProjectDetailIcon, type ProjectStory } from "@/data/projectStories";

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

export function ProjectStoryArticle({ project }: { project: ProjectStory }) {
  const visibleTechnicalSheet = project.technicalSheet.filter(
    (item) => item.label !== "Tipo",
  );

  return (
    <article
      id={project.slug}
      className="scroll-mt-28 overflow-hidden rounded-lg border border-blue-200/70 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]"
    >
      <div className="relative aspect-[16/8.8] overflow-hidden bg-blue-950 sm:aspect-[16/7.5] lg:aspect-[16/6.1]">
        <ProjectMediaCarousel
          images={project.galleryImages?.length ? project.galleryImages : [project.image]}
          imageAlts={
            project.galleryImageAlts?.length
              ? project.galleryImageAlts
              : project.imageAlt
                ? [project.imageAlt]
                : undefined
          }
          title={project.title}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(23,37,84,0.76)_100%)]"
        />
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 flex flex-wrap gap-2">
          <span className="inline-flex min-h-8 items-center rounded-full bg-yellow-300 px-3 py-1 text-xs font-extrabold text-blue-950">
            {project.category}
          </span>
          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-blue-950/82 px-3 py-1 text-xs font-extrabold text-white backdrop-blur">
            <MapPin size={13} aria-hidden="true" />
            {project.zone}
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eaf3ff_100%)] p-6 text-blue-950 sm:p-8">
        <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 border-l border-t border-blue-200/70" />
        <div className="pointer-events-none absolute bottom-8 right-8 h-20 w-20 border-b border-r border-blue-200/60" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-blue-200 bg-white/88 px-3 py-1 text-xs font-extrabold text-blue-900 shadow-[0_10px_24px_rgba(59,130,246,0.08)]">
              {project.publishedAt}
            </span>
          </div>

          <h3 className="mt-4 max-w-4xl text-2xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-3xl lg:text-[2.2rem]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-4xl text-[1rem] leading-8 text-slate-600">
            {project.summary}
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] xl:items-stretch">
            <div className="flex h-full min-h-[9.25rem] flex-col rounded-lg border border-white/10 bg-[linear-gradient(180deg,#133164_0%,#1d448d_100%)] px-5 py-5 text-white shadow-[0_20px_48px_rgba(15,23,42,0.16)]">
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-blue-100/70">
                Tipo de instalación
              </p>
              <div className="mt-3 flex flex-1 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-yellow-300">
                  <SunMedium size={18} aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-sm font-extrabold text-white">
                    {project.installationType}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-blue-50/72">
                    Configuración principal del proyecto ejecutado.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex h-full min-h-[9.25rem] flex-col rounded-lg border border-white/10 bg-[linear-gradient(180deg,#133164_0%,#1d448d_100%)] px-5 py-5 text-white shadow-[0_20px_48px_rgba(15,23,42,0.16)]">
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-blue-100/70">
                Ubicación del proyecto
              </p>
              <div className="mt-3 flex flex-1 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-yellow-300">
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-sm font-extrabold text-white">
                    {project.zone}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-blue-50/72">
                    Proyecto documentado y enlazado con su mini noticia.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:flex-wrap xl:col-span-1 xl:items-start xl:justify-end">
              <Link
                href={`/blog#${project.slug}`}
                className="inline-flex h-12 w-auto self-start items-center justify-center gap-2 rounded-full bg-yellow-300 px-5 text-sm font-bold !text-blue-950 transition hover:bg-yellow-200"
              >
                <Newspaper size={16} aria-hidden="true" />
                Mini noticia
              </Link>
              <Link
                href="/#contacto"
                className="inline-flex h-12 w-auto self-start items-center justify-center gap-2 rounded-full border border-blue-200 bg-white/90 px-5 text-sm font-bold text-blue-900 transition hover:border-blue-300 hover:bg-white"
              >
                <FileText size={16} aria-hidden="true" />
                Consultar proyecto similar
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-lg border border-white/12 bg-[linear-gradient(180deg,#133164_0%,#1d448d_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(191,219,254,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(191,219,254,0.22)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.94)_18%,rgba(0,0,0,0.72)_72%,transparent_100%)]"
          />
          <div className="pointer-events-none absolute inset-x-5 top-14 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(125,211,252,0.5)_18%,rgba(125,211,252,0.18)_82%,transparent_100%)]" />
          <div className="pointer-events-none absolute bottom-5 right-5 h-14 w-14 border-b border-r border-sky-200/18" />

          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-yellow-300">
              Ficha técnica
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
              Nota técnica
            </p>
            <p className="mt-1 text-sm font-semibold leading-6 text-blue-50/82">
              {project.technicalNote}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
