"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { ProjectStory } from "@/data/projectStories";
import { getProjectHref } from "@/lib/projectCatalog";

type ProjectSummaryScrollerProps = {
  projects: Array<Pick<ProjectStory, "slug" | "title" | "zone" | "serviceKeys">>;
};

export function ProjectSummaryScroller({
  projects,
}: ProjectSummaryScrollerProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(projects.length > 1);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail || projects.length < 2) {
      return;
    }

    function syncRailState() {
      const currentRail = railRef.current;

      if (!currentRail) {
        return;
      }

      const maxScrollLeft = currentRail.scrollWidth - currentRail.clientWidth - 4;
      setCanScrollLeft(currentRail.scrollLeft > 4);
      setCanScrollRight(currentRail.scrollLeft < maxScrollLeft);

      const children = Array.from(currentRail.children) as HTMLElement[];
      let nextIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      children.forEach((child, index) => {
        const distance = Math.abs(child.offsetLeft - currentRail.scrollLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      setCurrentIndex(nextIndex);
    }

    syncRailState();
    rail.addEventListener("scroll", syncRailState, { passive: true });
    window.addEventListener("resize", syncRailState);

    return () => {
      rail.removeEventListener("scroll", syncRailState);
      window.removeEventListener("resize", syncRailState);
    };
  }, [projects.length]);

  function scrollToIndex(nextIndex: number) {
    const rail = railRef.current;
    const nextCard = rail?.children.item(nextIndex) as HTMLElement | null;

    if (!nextCard) {
      return;
    }

    nextCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  function handleStep(direction: "prev" | "next") {
    if (projects.length < 2) {
      return;
    }

    const nextIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, projects.length - 1)
        : Math.max(currentIndex - 1, 0);

    scrollToIndex(nextIndex);
  }

  return (
    <>
      {projects.length > 1 ? (
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Proyectos en esta solución
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Usa las flechas para pasar entre proyectos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleStep("prev")}
              disabled={!canScrollLeft}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Mostrar proyecto anterior"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleStep("next")}
              disabled={!canScrollRight}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Mostrar proyecto siguiente"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <div
            key={project.slug}
            className="min-w-full shrink-0 snap-start"
          >
            <Link
              href={getProjectHref(project)}
              className="group flex min-h-16 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div>
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                  Proyecto {index + 1}
                </p>
                <p className="mt-1 text-sm font-extrabold text-blue-950">
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
          </div>
        ))}
      </div>

      {projects.length > 1 ? (
        <div className="mt-3 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          <span>
            {currentIndex + 1} de {projects.length}
          </span>
          <span>Desplazamiento horizontal</span>
        </div>
      ) : null}
    </>
  );
}
