"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ProjectMediaCarouselProps = {
  images: string[];
  title: string;
};

export function ProjectMediaCarousel({
  images,
  title,
}: ProjectMediaCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || images.length < 2) {
      return;
    }

    function syncIndex() {
      const currentRail = railRef.current;
      if (!currentRail) {
        return;
      }

      const nextIndex = Math.round(
        currentRail.scrollLeft / Math.max(currentRail.clientWidth, 1),
      );
      setCurrentIndex(Math.max(0, Math.min(images.length - 1, nextIndex)));
    }

    syncIndex();
    rail.addEventListener("scroll", syncIndex, { passive: true });
    window.addEventListener("resize", syncIndex);

    return () => {
      rail.removeEventListener("scroll", syncIndex);
      window.removeEventListener("resize", syncIndex);
    };
  }, [images.length]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (images.length > 1 && event.key === "ArrowRight") {
        setLightboxIndex((current) => (current + 1) % images.length);
      }

      if (images.length > 1 && event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, isLightboxOpen]);

  function scrollToIndex(nextIndex: number) {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    rail.scrollTo({
      left: rail.clientWidth * nextIndex,
      behavior: "smooth",
    });
  }

  function handleStep(direction: "prev" | "next") {
    if (images.length < 2) {
      return;
    }

    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % images.length
        : (currentIndex - 1 + images.length) % images.length;

    scrollToIndex(nextIndex);
  }

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  }

  function handleLightboxStep(direction: "prev" | "next") {
    if (images.length < 2) {
      return;
    }

    setLightboxIndex((current) =>
      direction === "next"
        ? (current + 1) % images.length
        : (current - 1 + images.length) % images.length,
    );
  }

  return (
    <>
      <div
        ref={railRef}
        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <button
            key={`${title}-image-${index}`}
            type="button"
            onClick={() => openLightbox(index)}
            className="relative h-full w-full shrink-0 snap-start cursor-zoom-in"
            aria-label={`Abrir imagen completa ${index + 1} de ${title}`}
          >
            <Image
              src={image}
              alt={`${title} - imagen ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => openLightbox(currentIndex)}
        className="absolute bottom-4 right-4 z-20 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/18 bg-blue-950/76 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-blue-900/88"
        aria-label="Ver imagen completa"
      >
        <Expand size={15} aria-hidden="true" />
        Ver completa
      </button>

      {images.length > 1 ? (
        <>
          <div className="absolute left-4 top-4 z-20 inline-flex min-h-8 items-center rounded-full border border-white/18 bg-blue-950/84 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur">
            {currentIndex + 1}/{images.length}
          </div>

          <div className="absolute inset-y-0 left-3 z-20 flex items-center">
            <button
              type="button"
              onClick={() => handleStep("prev")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-blue-950/74 text-white backdrop-blur transition hover:bg-blue-900/86"
              aria-label="Mostrar imagen anterior"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-3 z-20 flex items-center">
            <button
              type="button"
              onClick={() => handleStep("next")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-blue-950/74 text-white backdrop-blur transition hover:bg-blue-900/86"
              aria-label="Mostrar imagen siguiente"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
            {images.map((_, index) => (
              <button
                key={`${title}-dot-${index}`}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  currentIndex === index
                    ? "w-7 bg-yellow-300"
                    : "w-2.5 bg-white/58 hover:bg-white/80"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[90] bg-slate-950/94 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${title}`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative mx-auto flex h-full w-full max-w-[96rem] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-4">
              <div className="inline-flex min-h-10 items-center rounded-full border border-white/18 bg-slate-900/74 px-4 py-2 text-sm font-extrabold text-white backdrop-blur">
                {lightboxIndex + 1}/{images.length}
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-slate-900/74 text-white backdrop-blur transition hover:bg-slate-800"
                aria-label="Cerrar imagen ampliada"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {images.length > 1 ? (
              <>
                <div className="absolute inset-y-0 left-0 z-20 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleLightboxStep("prev")}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-slate-900/74 text-white backdrop-blur transition hover:bg-slate-800"
                    aria-label="Ver imagen anterior"
                  >
                    <ChevronLeft size={20} aria-hidden="true" />
                  </button>
                </div>

                <div className="absolute inset-y-0 right-0 z-20 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleLightboxStep("next")}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-slate-900/74 text-white backdrop-blur transition hover:bg-slate-800"
                    aria-label="Ver imagen siguiente"
                  >
                    <ChevronRight size={20} aria-hidden="true" />
                  </button>
                </div>
              </>
            ) : null}

            <div className="relative h-full max-h-[calc(100vh-5rem)] w-full">
              <Image
                src={images[lightboxIndex]}
                alt={`${title} - vista completa ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
