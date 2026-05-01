"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";

const GOOGLE_PLACE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJwSztZwQTEg0Rv0lUXYxyDT4";
const MAX_VISIBLE_REVIEWS = 5;

type ReviewItem = {
  author_name?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type ReviewsApiPayload = {
  error_message?: string | null;
  name?: string;
  place_url?: string;
  rating?: number;
  reviews?: ReviewItem[];
  status?: string;
  total?: number;
  user_ratings_total?: number;
};

type NormalizedReviewsData = {
  name: string;
  placeUrl: string;
  rating: number;
  total: number;
  reviews: ReviewItem[];
};

function normalizeReviewsPayload(
  payload: ReviewsApiPayload | null,
): NormalizedReviewsData | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const total =
    typeof payload.total === "number"
      ? payload.total
      : typeof payload.user_ratings_total === "number"
        ? payload.user_ratings_total
        : 0;

  return {
    name:
      typeof payload.name === "string" && payload.name.trim()
        ? payload.name.trim()
        : "Grupo Solarsur Energia Solar S.L.",
    placeUrl:
      typeof payload.place_url === "string" && payload.place_url.trim()
        ? payload.place_url.trim()
        : GOOGLE_PLACE_URL,
    rating: typeof payload.rating === "number" ? payload.rating : 0,
    total,
    reviews: Array.isArray(payload.reviews)
      ? payload.reviews.slice(0, MAX_VISIBLE_REVIEWS)
      : [],
  };
}

function formatRating(rating: number) {
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("es-ES").format(value);
}

function getAuthorInitial(name?: string) {
  const trimmedName = typeof name === "string" ? name.trim() : "";

  return trimmedName ? trimmedName.charAt(0).toUpperCase() : "G";
}

function RatingStars({
  rating,
  size = 18,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const filledStars = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div className={`flex items-center gap-1 ${className}`.trim()}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          aria-hidden="true"
          className={
            index < filledStars
              ? "fill-current text-amber-400"
              : "text-slate-300"
          }
        />
      ))}
    </div>
  );
}

function ReviewsLoadingState() {
  return (
    <section className="bg-white py-18 sm:py-22">
      <Container>
        <div className="rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_40%,#eff6ff_100%)] px-6 py-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10 lg:px-10">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <div className="h-3 w-40 animate-pulse rounded-full bg-slate-200" />
              <div className="mt-4 h-10 w-full max-w-lg animate-pulse rounded-2xl bg-slate-200" />
              <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded-full bg-slate-200" />
            </div>

            <div className="flex gap-3 self-end">
              <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />
              <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="mt-8 flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="min-w-0 flex-1 rounded-[1.75rem] border border-slate-200 bg-white p-6"
              >
                <div className="h-5 w-32 animate-pulse rounded-full bg-slate-200" />
                <div className="mt-5 h-4 w-24 animate-pulse rounded-full bg-slate-200" />
                <div className="mt-6 space-y-3">
                  <div className="h-4 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-4 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ReviewsErrorState({ message }: { message: string }) {
  return (
    <section className="bg-white py-18 sm:py-22">
      <Container>
        <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
          <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-amber-500">
            Reseñas de Google
          </p>
          <h2 className="mt-4 max-w-[14ch] text-3xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[2.8rem]">
            Seguimos visibles en Google Maps
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Ahora mismo no hemos podido traer las reseñas al sitio.
            {message ? ` ${message}` : ""}
          </p>

          <a
            href={GOOGLE_PLACE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
          >
            Abrir ficha en Google
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}

function ReviewCard({
  review,
  placeUrl,
}: {
  review: ReviewItem;
  placeUrl: string;
}) {
  const authorName = review.author_name || "Cliente de Google";
  const relativeTime =
    review.relative_time_description || "Reseña publicada en Google";

  return (
    <article
      data-review-card
      className="flex h-full min-w-0 shrink-0 snap-start flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] basis-full md:basis-[calc((100%-1rem)/2)] xl:basis-[calc((100%-2rem)/3)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-950 text-sm font-extrabold text-white">
            {getAuthorInitial(authorName)}
          </div>
          <div>
            <p className="text-sm font-extrabold text-blue-950">{authorName}</p>
            <p className="mt-1 text-xs font-semibold uppercase text-slate-400">
              {relativeTime}
            </p>
          </div>
        </div>

        <span className="inline-flex min-h-8 items-center rounded-full bg-amber-100 px-3 py-1 text-[0.68rem] font-extrabold uppercase text-amber-700">
          Google
        </span>
      </div>

      <RatingStars rating={review.rating ?? 0} className="mt-5" size={16} />

      <div className="mt-5 flex flex-1 items-start gap-3">
        <Quote
          size={18}
          aria-hidden="true"
          className="mt-1 shrink-0 text-blue-200"
        />
        <p className="text-[0.98rem] leading-7 text-slate-600">
          {review.text || "Reseña publicada en Google sin comentario adicional."}
        </p>
      </div>

      <a
        href={placeUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-900 transition hover:text-blue-700"
      >
        Ver en Google
        <ArrowRight size={15} aria-hidden="true" />
      </a>
    </article>
  );
}

export default function ReviewsSection() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [reviewsData, setReviewsData] = useState<NormalizedReviewsData | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleCards, setVisibleCards] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews", {
          method: "GET",
          cache: "no-store",
        });

        const payload = (await response.json()) as ReviewsApiPayload;
        const normalizedData = normalizeReviewsPayload(payload);

        if (!response.ok || !normalizedData || payload.status !== "OK") {
          throw new Error(
            payload.error_message || "No se han podido cargar las reseñas.",
          );
        }

        if (!isCancelled) {
          setReviewsData(normalizedData);
          setStatus("ready");
          setErrorMessage("");
        }
      } catch (error) {
        if (!isCancelled) {
          setStatus("error");
          setErrorMessage(
            error instanceof Error ? error.message : "Error desconocido.",
          );
        }
      }
    }

    loadReviews();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCards(3);
        return;
      }

      if (window.innerWidth >= 768) {
        setVisibleCards(2);
        return;
      }

      setVisibleCards(1);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    const getCardPitch = () => {
      const firstCard = track.firstElementChild as HTMLElement | null;

      if (!firstCard) {
        return 0;
      }

      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;

      return firstCard.getBoundingClientRect().width + gap;
    };

    const updateScrollState = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      const pitch = getCardPitch();
      const rawIndex = pitch > 0 ? Math.round(track.scrollLeft / pitch) : 0;
      const maxIndex = Math.max(
        0,
        (reviewsData?.reviews.length ?? 0) - visibleCards,
      );

      setCanScrollLeft(track.scrollLeft > 4);
      setCanScrollRight(maxScrollLeft - track.scrollLeft > 4);
      setCurrentIndex(Math.max(0, Math.min(rawIndex, maxIndex)));
    };

    updateScrollState();

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateScrollState();
      });

      resizeObserver.observe(track);
      Array.from(track.children).forEach((child) =>
        resizeObserver?.observe(child),
      );
    }

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver?.disconnect();
    };
  }, [reviewsData, visibleCards]);

  function scrollCarousel(direction: "left" | "right") {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.firstElementChild as HTMLElement | null;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : Math.max(track.clientWidth * 0.92, 320);
    const delta = direction === "left" ? -step : step;

    track.scrollBy({
      left: delta,
      behavior: "smooth",
    });
  }

  if (status === "loading") {
    return <ReviewsLoadingState />;
  }

  if (status === "error" || !reviewsData) {
    return <ReviewsErrorState message={errorMessage} />;
  }

  const reviews = reviewsData.reviews;
  const totalReviewsLabel = formatNumber(reviewsData.total);
  const ratingLabel = formatRating(reviewsData.rating);
  const hasOverflow = reviews.length > visibleCards;
  const visibleStart = reviews.length === 0 ? 0 : currentIndex + 1;
  const visibleEnd = Math.min(currentIndex + visibleCards, reviews.length);

  return (
    <section className="bg-white py-18 sm:py-22">
      <Container>
        <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_40%,#eff6ff_100%)] px-6 py-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10 lg:px-10">
          <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_12%_20%,rgba(250,204,21,0.22),transparent_32%),radial-gradient(circle_at_88%_10%,rgba(59,130,246,0.16),transparent_28%)]" />

          <div className="relative">
            <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
              <div>
                <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-amber-500">
                  Reseñas de Google
                </p>
                <h2 className="mt-4 max-w-[15ch] text-3xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[2.8rem]">
                  Asi valoran la experiencia con Grupo Solarsur
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  Opiniones reales publicadas en Google, ahora en un carrusel
                  horizontal para recorrer la experiencia completa de nuestros
                  clientes de izquierda a derecha.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="flex min-h-[7.5rem] flex-col justify-between rounded-[1.5rem] border border-white/70 bg-white/90 p-5 backdrop-blur sm:flex-row sm:items-center sm:gap-6">
                  <div>
                    <p className="text-xs font-extrabold uppercase text-slate-400">
                      Nota media
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      Valoración publicada en Google
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:text-right">
                    <div className="flex items-end gap-3 sm:justify-end">
                      <span className="text-4xl font-extrabold leading-none text-blue-950">
                        {ratingLabel}
                      </span>
                      <span className="pb-1 text-sm font-semibold text-slate-500">
                        sobre 5
                      </span>
                    </div>
                    <RatingStars
                      rating={reviewsData.rating}
                      className="mt-3 sm:justify-end"
                    />
                  </div>
                </div>

                <div className="flex min-h-[7.5rem] flex-col justify-between rounded-[1.5rem] border border-white/70 bg-white/90 p-5 backdrop-blur sm:flex-row sm:items-center sm:gap-6">
                  <div>
                    <p className="text-xs font-extrabold uppercase text-slate-400">
                      Reseñas visibles
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      Total de valoraciones en Google
                    </p>
                  </div>
                  <p className="mt-4 text-4xl font-extrabold leading-none text-blue-950 sm:mt-0 sm:text-right">
                    {totalReviewsLabel}
                  </p>
                </div>

                <div className="flex min-h-[7.5rem] flex-col justify-between rounded-[1.5rem] border border-white/70 bg-blue-950 p-5 text-white sm:flex-row sm:items-center sm:gap-6">
                  <div>
                    <p className="text-xs font-extrabold uppercase text-blue-200">
                      Fuente
                    </p>
                    <p className="mt-2 text-2xl font-extrabold leading-tight">
                      Grupo Solarsur
                    </p>
                  </div>
                  <a
                    href={reviewsData.placeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-amber-300 transition hover:text-amber-200 sm:mt-0 sm:self-center"
                  >
                    Abrir Google Maps
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {reviews.length > 0 ? (
              <div className="relative mt-8">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-blue-950">
                      {reviews.length} reseñas cargadas
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Mostrando {visibleStart}-{visibleEnd} de {reviews.length}.
                      Desliza o usa las flechas para ver el resto.
                    </p>
                  </div>

                  {hasOverflow ? (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => scrollCarousel("left")}
                        disabled={!canScrollLeft}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition hover:border-blue-200 hover:bg-blue-50 disabled:opacity-40"
                        aria-label="Ver reseñas anteriores"
                      >
                        <ArrowLeft size={18} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollCarousel("right")}
                        disabled={!canScrollRight}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition hover:border-blue-200 hover:bg-blue-50 disabled:opacity-40"
                        aria-label="Ver más reseñas"
                      >
                        <ArrowRight size={18} aria-hidden="true" />
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 top-[4.5rem] z-10 w-10 bg-gradient-to-r from-[#f8fbff] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 top-[4.5rem] z-10 w-10 bg-gradient-to-l from-[#eff6ff] to-transparent" />

                <div
                  ref={trackRef}
                  className="reviews-carousel-track flex gap-4 overflow-x-auto scroll-smooth px-1 pb-3 pt-1 [scroll-snap-type:x_mandatory]"
                >
                  {reviews.map((review, index) => (
                    <ReviewCard
                      key={`${review.author_name || "google"}-${review.time || index}-${index}`}
                      review={review}
                      placeUrl={reviewsData.placeUrl}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-white/80 p-6 sm:p-7">
                <p className="text-lg font-extrabold text-blue-950">
                  Google no ha devuelto reseñas para mostrar ahora mismo.
                </p>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                  La valoración sigue disponible y puedes consultar la ficha
                  completa directamente en Google Maps.
                </p>
                <a
                  href={reviewsData.placeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-blue-950 transition hover:bg-amber-200"
                >
                  Ver reseñas en Google
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
