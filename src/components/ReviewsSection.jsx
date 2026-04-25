"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const GOOGLE_PLACE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJwSztZwQTEg0Rv0lUXYxyDT4";

/**
 * @typedef {Object} GoogleReview
 * @property {string} author_name
 * @property {number} rating
 * @property {string} [text]
 * @property {number} [time]
 * @property {string} [relative_time_description]
 *
 * @typedef {Object} ReviewsData
 * @property {GoogleReview[]} reviews
 * @property {number} rating
 * @property {number} user_ratings_total
 * @property {string} [place_id]
 * @property {string} [place_url]
 * @property {string} [name]
 * @property {string} [fetched_at]
 * @property {string} [source]
 * @property {string} [sort_mode]
 */

function RatingStars({ rating, className = "", size = 16 }) {
  const filledStars = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className={`flex items-center gap-1 ${className}`.trim()}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          className={
            index < filledStars
              ? "fill-current text-amber-400"
              : "text-slate-300"
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewsLoadingState() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="h-3 w-36 animate-pulse rounded-full bg-slate-200" />
          <div className="h-12 w-full max-w-md animate-pulse rounded-lg bg-slate-200" />
          <div className="h-6 w-full max-w-xl animate-pulse rounded-lg bg-slate-200" />
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="h-20 w-48 animate-pulse rounded-xl bg-slate-100" />
        </div>

        <div className="mt-8 flex gap-5 overflow-hidden">
          {Array.from({ length: 3 }, (_, index) => (
            <article
              key={index}
              className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
              <div className="mt-5 space-y-3">
                <div className="h-4 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200" />
              </div>
              <div className="mt-8 h-4 w-28 animate-pulse rounded-full bg-slate-200" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsErrorState() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
            Reseñas y opiniones
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
            Hablan sobre nosotros
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Experiencias reales con Grupo Solarsur. No hemos podido cargar las
            reseñas ahora mismo. Puedes verlas directamente en Google mientras
            recuperamos la conexión.
          </p>

          <a
            href={GOOGLE_PLACE_URL}
            rel="noreferrer"
            target="_blank"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
          >
            Ver todas en Google
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="group flex h-full min-h-[19rem] flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-slate-300">
      <div className="flex items-start justify-between gap-4">
        <RatingStars rating={review.rating} />
        <span className="inline-flex min-h-8 items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-slate-500">
          Google
        </span>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <Quote
          size={18}
          className="mt-1 shrink-0 text-slate-300"
          aria-hidden="true"
        />
        <p className="text-[0.98rem] leading-7 text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden">
          {review.text || "Reseña publicada en Google sin texto adicional."}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="text-sm font-bold text-slate-950">{review.author_name}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {review.relative_time_description || "Cliente verificado en Google"}
        </p>
      </div>
    </article>
  );
}

/**
 * @param {{ initialData?: ReviewsData | null }} props
 */
export default function ReviewsSection({ initialData = null }) {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState(initialData ? "ready" : "loading");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const railRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      return;
    }

    let isCancelled = false;

    async function loadReviews() {
      try {
        setStatus("loading");

        const response = await fetch("/api/reviews", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar las reseñas.");
        }

        const payload = await response.json();

        if (!isCancelled) {
          setData(payload);
          setStatus("ready");
        }
      } catch {
        if (!isCancelled) {
          setStatus("error");
        }
      }
    }

    loadReviews();

    return () => {
      isCancelled = true;
    };
  }, [initialData]);

  const reviews = useMemo(() => data?.reviews ?? [], [data]);
  const rating = data?.rating ?? 0;
  const totalReviews = data?.user_ratings_total ?? 0;

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    function syncRailState() {
      const maxScrollLeft = rail.scrollWidth - rail.clientWidth - 4;
      setCanScrollLeft(rail.scrollLeft > 4);
      setCanScrollRight(rail.scrollLeft < maxScrollLeft);
    }

    syncRailState();
    rail.addEventListener("scroll", syncRailState, { passive: true });
    window.addEventListener("resize", syncRailState);

    return () => {
      rail.removeEventListener("scroll", syncRailState);
      window.removeEventListener("resize", syncRailState);
    };
  }, [reviews.length]);

  function scrollRail(direction) {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const amount = Math.max(rail.clientWidth * 0.84, 320);

    rail.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }

  if (status === "loading" && !data) {
    return <ReviewsLoadingState />;
  }

  if (status === "error" || !data) {
    return <ReviewsErrorState />;
  }

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
              Reseñas y opiniones
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
              Hablan sobre nosotros
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Experiencias reales con Grupo Solarsur. Valoraciones publicadas en
            Google sobre la atención, la ejecución y el acompañamiento técnico
            del equipo.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
            <div>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-extrabold leading-none text-blue-950">
                  {rating.toFixed(1)}
                </span>
                <span className="pb-1 text-sm font-semibold text-slate-500">
                  sobre 5
                </span>
              </div>
              <RatingStars rating={rating} className="mt-4" size={18} />
            </div>

            <div>
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-400">
                  Valoración agregada
                </p>
                <p className="mt-2 text-lg font-semibold leading-8 text-slate-600">
                  {totalReviews} reseñas verificadas en Google sobre Grupo
                  Solarsur Energia Solar S.L.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-400">
              Reseñas destacadas
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Desliza horizontalmente para ver las ultimas opiniones
              disponibles.
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollRail("prev")}
              disabled={!canScrollLeft}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Mostrar reseñas anteriores"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail("next")}
              disabled={!canScrollRight}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
              aria-label="Mostrar más reseñas"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="mt-5 flex gap-5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.slice(0, 5).map((review, index) => (
            <div
              key={`${review.author_name}-${review.time}-${index}`}
              className="w-[84%] shrink-0 snap-start sm:w-[31rem] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={GOOGLE_PLACE_URL}
            rel="noreferrer"
            target="_blank"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
          >
            Ver todas en Google
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
