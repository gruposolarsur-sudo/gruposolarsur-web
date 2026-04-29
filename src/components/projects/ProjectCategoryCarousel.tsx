"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import type { ProjectStory } from "@/data/projectStories";
import { getProjectHref } from "@/lib/projectCatalog";

type ProjectCategoryCarouselProps = {
  projects: Array<Pick<ProjectStory, "slug" | "title" | "zone" | "serviceKeys">>;
};

export function ProjectCategoryCarousel({
  projects,
}: ProjectCategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (projects.length === 0) {
    return null;
  }

  function handleStep(direction: "prev" | "next") {
    setCurrentIndex((current) =>
      direction === "next"
        ? Math.min(current + 1, projects.length - 1)
        : Math.max(current - 1, 0),
    );
  }

  return (
    <div className="mt-5">
      <div className="overflow-hidden rounded-xl border border-white/65 bg-white/72 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: `${projects.length * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / projects.length}%)`,
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="shrink-0"
              style={{ width: `${100 / projects.length}%` }}
            >
              <Link
                href={getProjectHref(project)}
                className="group flex min-h-[7.75rem] flex-col justify-between gap-3 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-blue-900/36">
                    Proyecto {index + 1}
                  </p>
                  <p className="mt-1 break-words text-sm font-extrabold leading-6 text-blue-900">
                    {project.title}
                  </p>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <p className="text-sm leading-5 text-blue-900/62">{project.zone}</p>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-blue-800 transition group-hover:text-blue-600">
                    Ver ficha
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {projects.length > 1 ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleStep("prev")}
              disabled={currentIndex === 0}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/72 text-blue-900 shadow-[0_8px_18px_rgba(15,23,42,0.06)] backdrop-blur-sm transition hover:border-blue-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Ver proyecto anterior"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>

            {projects.map((project, index) => (
              <button
                key={`${project.slug}-dot`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  currentIndex === index
                    ? "w-7 bg-blue-900"
                    : "w-2.5 bg-blue-200 hover:bg-blue-300"
                }`}
                aria-label={`Ver proyecto ${index + 1}`}
              />
            ))}

            <button
              type="button"
              onClick={() => handleStep("next")}
              disabled={currentIndex === projects.length - 1}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/72 text-blue-900 shadow-[0_8px_18px_rgba(15,23,42,0.06)] backdrop-blur-sm transition hover:border-blue-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Ver proyecto siguiente"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>

          <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-blue-900/40">
            {currentIndex + 1}/{projects.length}
          </span>
        </div>
      ) : null}
    </div>
  );
}
