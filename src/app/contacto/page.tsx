import type { Metadata } from "next";
import { ArrowRight, Clock3, Mail, MapPinned, Phone } from "lucide-react";

import ReviewsSection from "@/components/ReviewsSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Contact } from "@/sections/home/Contact";
import { getGooglePlaceReviews } from "@/lib/google-place-reviews";

const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Grupo%20Solarsur%20Energ%C3%ADa%20Solar%20S.L.%2C%20C.%20Progreso%2C%209%2C%2041960%20Gines%2C%20Sevilla";
const mapEmbedUrl =
  "https://www.google.com/maps?q=Grupo%20Solarsur%20Energia%20Solar%20S.L.%2C%20C.%20Progreso%2C%209%2C%2041960%20Gines%2C%20Sevilla&z=15&output=embed";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.gruposolarsur.com";

const contactDetails = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "955 515 708",
    href: "tel:955515708",
  },
  {
    icon: Mail,
    label: "Correo",
    value: "info@gruposolarsur.com",
    href: "mailto:info@gruposolarsur.com",
  },
  {
    icon: MapPinned,
    label: "Dirección",
    value: "C. Progreso, 9, 41960 Gines, Sevilla",
    href: directionsUrl,
  },
  {
    icon: Clock3,
    label: "Horario",
    value: "Lunes a viernes · 07:30 a 14:30",
  },
];

export const metadata: Metadata = {
  title: "Contacto | Grupo Solar Sur",
  description:
    "Contacto de Grupo Solarsur con mapa de Google, formulario y opiniones de clientes publicadas en Google.",
};

export const revalidate = 86400;

export default async function ContactPage() {
  const reviewsResult = await getGooglePlaceReviews();
  const reviewsData = reviewsResult.ok ? reviewsResult.data : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Grupo Solarsur Energ\u00eda Solar S.L.",
    url: `${siteUrl}/contacto`,
    telephone: "+34 955 515 708",
    image: `${siteUrl}/assets/logos/logo-solarsur.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C. Progreso, 9",
      postalCode: "41960",
      addressLocality: "Gines",
      addressRegion: "Sevilla",
      addressCountry: "ES",
    },
    ...(reviewsData
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(reviewsData.rating.toFixed(1)),
            reviewCount: reviewsData.user_ratings_total,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  };

  return (
    <>
      <Header />
      <main className="bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] pb-28 pt-16 sm:pb-32 sm:pt-20 lg:pt-24">
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_18%_20%,rgba(250,204,21,0.22),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(59,130,246,0.18),transparent_28%)]" />

          <Container className="relative">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-amber-500">
                  Contacto
                </p>
                <h1 className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-[0.98] tracking-tight text-blue-950 sm:text-6xl lg:text-[4.6rem]">
                  Estamos en Gines, Sevilla
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 sm:text-xl">
                  Si quieres visitarnos, hablar con el equipo o pedir una ruta
                  directa hasta la oficina, aquí tienes la ubicación de Grupo
                  Solarsur y un acceso rápido a Google Maps.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => {
                    const content = (
                      <>
                        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                            {label}
                          </span>
                          <span className="mt-1 block text-sm font-bold leading-6 text-blue-950">
                            {value}
                          </span>
                        </span>
                      </>
                    );

                    return href ? (
                      <a
                        key={label}
                        href={href}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        className="flex min-h-24 items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={label}
                        className="flex min-h-24 items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={directionsUrl}
                    rel="noreferrer"
                    target="_blank"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-900 px-7 py-4 text-base font-bold !text-white transition hover:bg-blue-800"
                  >
                    Cómo llegar
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                  <a
                    href="tel:955515708"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-bold text-blue-900 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <Phone size={18} aria-hidden="true" />
                    Llamar ahora
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <div className="relative h-[24rem] w-full">
                  <iframe
                    title="Mapa de Grupo Solarsur en Gines, Sevilla"
                    src={mapEmbedUrl}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className="grid gap-4 border-t border-slate-200 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-blue-600">
                      Oficina y punto de atención
                    </p>
                    <p className="mt-2 text-base font-bold leading-7 text-blue-950">
                      Grupo Solarsur Energía Solar S.L. · C. Progreso, 9, 41960
                      Gines, Sevilla
                    </p>
                  </div>
                  <a
                    href={directionsUrl}
                    rel="noreferrer"
                    target="_blank"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-amber-200"
                  >
                    Abrir ruta
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Contact />

        <ReviewsSection initialData={reviewsData} />
      </main>
      <Footer />
    </>
  );
}
