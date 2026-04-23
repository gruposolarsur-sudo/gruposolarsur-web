import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, MapPin, Newspaper } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { projectStories } from "@/data/projectStories";

export function Projects() {
  const featuredProject = projectStories[0];

  return (
    <section
      id="proyectos"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_12%,rgba(250,204,21,0.08),transparent_22%),linear-gradient(180deg,#172554_0%,#1e3a8a_100%)] py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-yellow-300">
              Proyectos reales
            </p>

            <h2 className="mt-4 max-w-[15ch] text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-[2.7rem]">
              Obras en una página propia
            </h2>

            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-blue-50/86 sm:text-lg">
              Hemos preparado un espacio específico para subir proyectos reales,
              ubicarlos en el mapa de Andalucía y publicar su ficha técnica con
              mini noticia enlazada al blog.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/proyectos"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-7 py-4 text-base font-bold !text-blue-950 shadow-[0_18px_40px_rgba(250,204,21,0.24)] transition hover:bg-yellow-200"
              >
                Ver mapa de proyectos
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 text-base font-bold text-white transition hover:border-white/35 hover:bg-white/8"
              >
                <Newspaper size={18} aria-hidden="true" />
                Ver noticias
              </Link>
            </div>
          </div>

          <article className="overflow-hidden rounded-lg border border-white/12 bg-[linear-gradient(180deg,rgba(53,80,159,0.82)_0%,rgba(43,68,143,0.76)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="relative min-h-[18rem] bg-blue-950">
              <Image
                src={featuredProject.image}
                alt=""
                fill
                className="object-cover opacity-88"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(23,37,84,0.82)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2 text-xs font-extrabold">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-300 px-3 py-1 text-blue-950">
                    <FileText size={13} aria-hidden="true" />
                    Ficha técnica
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-white backdrop-blur">
                    <MapPin size={13} aria-hidden="true" />
                    {featuredProject.province}
                  </span>
                </div>
                <h3 className="mt-4 max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-white">
                  {featuredProject.title}
                </h3>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
