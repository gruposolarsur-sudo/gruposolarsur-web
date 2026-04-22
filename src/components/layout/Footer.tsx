import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";

const navigationLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Empleo", href: "/trabaja-con-nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

const serviceLinks = [
  { label: "Placas solares", href: "/placas-solares-fotovoltaicas" },
  { label: "Energía solar térmica", href: "/energia-solar-termica" },
  { label: "Aerotermia", href: "/aerotermia" },
  { label: "Ayudas y subvenciones", href: "/ayudas-y-subvenciones" },
  { label: "Estudio energético", href: "/estudio-asesoramiento-energetico" },
  { label: "Mantenimiento", href: "/mantenimiento-soporte" },
];

const searchLinks = [
  "Placas solares en Sevilla",
  "Instaladores solares en Andalucía",
  "Aerotermia en Sevilla",
  "Instalación fotovoltaica residencial",
];

const legalLinks = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Política de privacidad", href: "/politica-privacidad" },
  { label: "Política de cookies", href: "/politica-cookies" },
];

const contactItems = [
  {
    icon: Phone,
    label: "651 194 097",
    href: "tel:651194097",
  },
  {
    icon: Mail,
    label: "info@gruposolarsur.com",
    href: "mailto:info@gruposolarsur.com",
  },
  {
    icon: MapPin,
    label: "C. Progreso, 9, 41960 Gines, Sevilla",
    href: "https://www.google.com/maps/dir/?api=1&destination=Grupo%20Solarsur%20Energ%C3%ADa%20Solar%20S.L.%2C%20C.%20Progreso%2C%209%2C%2041960%20Gines%2C%20Sevilla",
  },
  {
    icon: Clock3,
    label: "Lunes a viernes · 07:30 a 14:30",
  },
];

const socialLogos = [
  {
    label: "Facebook",
    src: "/logos/logo-facebook.webp",
    href: "https://www.facebook.com/gruposolarsur",
  },
  {
    label: "Instagram",
    src: "/logos/logo-instagram.webp",
    href: "https://www.instagram.com/grupo_solarsur/",
  },
  { label: "LinkedIn", src: "/logos/logo-linkedin.webp" },
  { label: "TikTok", src: "/logos/logo-tiktok.webp" },
  { label: "X", src: "/logos/logo-x.webp" },
  { label: "YouTube", src: "/logos/logo-youtube.webp" },
  {
    label: "WhatsApp",
    src: "/logos/logo-whatsapp.webp",
    href: "https://wa.me/+34640292375",
  },
];

export function Footer() {
  return (
    <footer className="bg-[#020817] text-blue-50">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.55fr_0.66fr_0.66fr_0.95fr]">
          <div>
            <Link href="/#inicio" className="inline-flex">
              <Image
                src="/logos/logo-solarsur-blanco.svg"
                alt="Logo de Grupo SolarSur"
                width={205}
                height={74}
                className="h-14 w-auto"
              />
            </Link>

            <p className="mt-6 max-w-sm text-[0.95rem] leading-7 text-blue-100/76">
              Grupo SolarSur es una empresa especializada en instalaciones de
              placas solares en Andalucía, con servicio en Sevilla, Málaga,
              Cádiz, Córdoba, Huelva, Granada y Almería. Ofrecemos soluciones de
              energía solar fotovoltaica, aerotermia, mantenimiento y eficiencia
              energética para viviendas, comunidades y empresas.
            </p>

            <div className="mt-7 grid max-w-sm grid-cols-3 items-center gap-4">
              <a
                href="https://incentivos.agenciaandaluzadelaenergia.es/Orden2016SIG/listadoDetalle.jsp?idEmp=3113"
                rel="noreferrer"
                target="_blank"
                title="Ver Grupo SolarSur como empresa registrada"
                aria-label="Ver Grupo SolarSur como empresa registrada en la Agencia Andaluza de la Energía"
                className="flex min-w-0 justify-center transition hover:opacity-85"
              >
                <Image
                  src="/logos/sello-agencia-andaluza-energia.webp"
                  alt="Sello de la Agencia Andaluza de la Energía"
                  width={430}
                  height={241}
                  sizes="7rem"
                  className="h-auto w-full max-w-[6.8rem] object-contain"
                />
              </a>
              <Image
                src="/logos/sello-eco-vivienda.webp"
                alt="Sello PLA Eco Vivienda"
                width={144}
                height={144}
                className="mx-auto h-auto w-full max-w-[6.8rem] object-contain"
              />
              <Image
                src="/logos/sello-next-generation-ue.webp"
                alt="Sello Next Generation EU"
                width={144}
                height={144}
                className="mx-auto h-auto w-full max-w-[6.8rem] object-contain"
              />
            </div>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h2 className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-white">
              Navegación
            </h2>

            <ul className="mt-5 grid gap-3 text-sm font-medium text-blue-50">
              {navigationLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition hover:text-yellow-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-8 grid gap-3 text-sm text-blue-200/58">
              {searchLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Servicios del pie de página">
            <h2 className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-white">
              Servicios
            </h2>

            <ul className="mt-5 grid gap-3 text-sm font-medium text-blue-50">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition hover:text-yellow-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic">
            <h2 className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-white">
              Contacto
            </h2>

            <ul className="mt-5 grid gap-4 text-sm font-medium text-blue-100/82">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      className="flex items-center gap-3 transition hover:text-white"
                      href={href}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      target={href.startsWith("http") ? "_blank" : undefined}
                    >
                      <Icon
                        size={17}
                        strokeWidth={2.1}
                        className="shrink-0 text-yellow-300"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 break-words">{label}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Icon
                        size={17}
                        strokeWidth={2.1}
                        className="shrink-0 text-yellow-300"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 break-words">{label}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-white/10 pt-5">
              <div className="flex flex-nowrap items-center gap-2">
                {socialLogos.map((item) => {
                  const logo = (
                    <Image
                      src={item.src}
                      alt=""
                      width={28}
                      height={28}
                      className="h-5 w-5 object-contain"
                    />
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      className="inline-flex h-6 w-6 items-center justify-center transition hover:scale-105"
                      href={item.href}
                      rel="noreferrer"
                      target="_blank"
                      title={item.label}
                      aria-label={item.label}
                    >
                      {logo}
                    </a>
                  ) : (
                    <span
                      key={item.label}
                      className="inline-flex h-6 w-6 items-center justify-center"
                      title={item.label}
                      aria-label={item.label}
                    >
                      {logo}
                    </span>
                  );
                })}
              </div>
            </div>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/8">
        <Container className="flex flex-col gap-4 py-5 text-sm text-blue-200/58 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Grupo SolarSur. Todos los derechos reservados.</p>

          <nav aria-label="Enlaces legales">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition hover:text-yellow-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
