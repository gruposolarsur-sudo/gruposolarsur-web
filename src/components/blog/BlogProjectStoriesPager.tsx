"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

import type { ProjectStory } from "@/data/projectStories";
import { getProjectHref } from "@/lib/projectCatalog";

const PAGE_SIZE = 6;

type BlogProjectStoriesPagerProps = {
  posts: Array<
    Pick<
      ProjectStory,
      "slug" | "image" | "imageAlt" | "title" | "category" | "zone" | "blogSummary"
    >
  >;
};

function getPageIndexFromHash(
  posts: BlogProjectStoriesPagerProps["posts"],
  hash: string,
) {
  const slug = decodeURIComponent(hash.replace(/^#/, ""));

  if (!slug) {
    return 0;
  }

  const matchingIndex = posts.findIndex((post) => post.slug === slug);

  if (matchingIndex === -1) {
    return 0;
  }

  return Math.floor(matchingIndex / PAGE_SIZE);
}

export function BlogProjectStoriesPager({
  posts,
}: BlogProjectStoriesPagerProps) {
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    function syncPageFromHash() {
      const nextPage = getPageIndexFromHash(posts, window.location.hash);

      startTransition(() => {
        setCurrentPage(nextPage);
      });
    }

    syncPageFromHash();
    window.addEventListener("hashchange", syncPageFromHash);

    return () => {
      window.removeEventListener("hashchange", syncPageFromHash);
    };
  }, [posts]);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      return;
    }

    const slug = decodeURIComponent(hash.replace(/^#/, ""));
    const matchingIndex = posts.findIndex((post) => post.slug === slug);

    if (matchingIndex === -1) {
      return;
    }

    const targetPage = Math.floor(matchingIndex / PAGE_SIZE);

    if (targetPage !== currentPage) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(slug)?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [currentPage, posts]);

  function goToPage(nextPage: number) {
    if (nextPage < 0 || nextPage >= totalPages || nextPage === currentPage) {
      return;
    }

    startTransition(() => {
      setCurrentPage(nextPage);
    });
  }

  const startIndex = currentPage * PAGE_SIZE;
  const visiblePosts = posts.slice(startIndex, startIndex + PAGE_SIZE);
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  return (
    <>
      {totalPages > 1 ? (
        <div className="mt-10 flex flex-col gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-400">
              Navegación de proyectos
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Mostrando {startIndex + 1}-{startIndex + visiblePosts.length} de{" "}
              {posts.length} proyectos.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={!canGoPrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Mostrar los 6 proyectos anteriores"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            <span className="text-sm font-extrabold text-blue-950">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={!canGoNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Mostrar los 6 proyectos siguientes"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-3">
        {visiblePosts.map((post) => (
          <article
            id={post.slug}
            key={post.slug}
            className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(15,23,42,0.1)]"
          >
            <div className="relative aspect-[1.22] overflow-hidden bg-blue-950">
              <Image
                src={post.image}
                alt={post.imageAlt ?? post.title}
                fill
                className="object-cover opacity-92 transition duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-900">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                  <MapPin size={13} aria-hidden="true" />
                  {post.zone}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-blue-950">
                {post.title}
              </h3>
              <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">
                {post.blogSummary}
              </p>
              <Link
                href={getProjectHref(post)}
                className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-extrabold text-blue-900 transition hover:text-blue-700"
              >
                Ver ficha técnica en el mapa
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
