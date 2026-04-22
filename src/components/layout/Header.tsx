import type { ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChartNoAxesCombined,
  ChevronDown,
  FileText,
  Phone,
  SunMedium,
  Wrench,
} from "lucide-react";

import {
  AerotermiaIcon,
  SolarThermalIcon,
  type ServiceIconProps,
} from "@/components/icons/ServiceIcons";
import { Container } from "@/components/ui/Container";

const navigation = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Empleo", href: "/trabaja-con-nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

const serviceLinks: Array<{
  label: string;
  description: string;
  href: string;
  icon: ElementType<ServiceIconProps>;
  iconClass: string;
}> = [
  {
    label: "Placas solares fotovoltaicas",
    description: "Instalaciones eficientes para reducir la factura.",
    href: "/placas-solares-fotovoltaicas",
    icon: SunMedium,
    iconClass: "bg-yellow-50 text-amber-600",
  },
  {
    label: "Energía solar térmica",
    description: "Agua caliente sanitaria con energía solar.",
    href: "/energia-solar-termica",
    icon: SolarThermalIcon,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    label: "Aerotermia",
    description: "Climatización y agua caliente con alta eficiencia.",
    href: "/aerotermia",
    icon: AerotermiaIcon,
    iconClass: "bg-cyan-50 text-cyan-700",
  },
  {
    label: "Ayudas y subvenciones",
    description: "Orientación documental y gestión guiada.",
    href: "/ayudas-y-subvenciones",
    icon: FileText,
    iconClass: "bg-blue-50 text-blue-700",
  },
  {
    label: "Estudio y asesoramiento energético",
    description: "Análisis de consumo para maximizar el ahorro.",
    href: "/estudio-asesoramiento-energetico",
    icon: ChartNoAxesCombined,
    iconClass: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Mantenimiento y soporte",
    description: "Seguimiento técnico para mejorar el rendimiento.",
    href: "/mantenimiento-soporte",
    icon: Wrench,
    iconClass: "bg-sky-50 text-blue-800",
  },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <Link className="flex shrink-0 items-center" href="/#inicio">
          <Image
            src="/logos/logo-solarsur.svg"
            alt="Logo de Grupo SolarSur"
            width={160}
            height={50}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        <nav
          aria-label="Principal"
          className="hidden items-center text-sm font-medium text-slate-700 lg:flex"
        >
          <ul className="flex items-center gap-5 text-sm font-medium text-slate-600 xl:gap-7">
            <li>
              <Link
                className="whitespace-nowrap transition hover:text-blue-900"
                href="/#inicio"
              >
                Inicio
              </Link>
            </li>

            <li className="group relative">
              <Link
                className="inline-flex items-center gap-1.5 whitespace-nowrap py-2 transition hover:text-blue-900 group-focus-within:text-blue-900"
                href="/#servicios"
                aria-haspopup="true"
              >
                Servicios
                <ChevronDown
                  size={15}
                  strokeWidth={2.3}
                  className="transition duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  aria-hidden="true"
                />
              </Link>

              <div className="invisible absolute left-1/2 top-full z-50 w-[44rem] max-w-[calc(100vw-3rem)] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="grid gap-2 rounded-[1.35rem] border border-slate-200 bg-white p-3 shadow-[0_24px_70px_rgba(15,23,42,0.16)] md:grid-cols-2">
                  {serviceLinks.map((service) => {
                    const Icon = service.icon;

                    return (
                      <Link
                        key={service.label}
                        href={service.href}
                        className="flex gap-3 rounded-2xl border border-transparent px-4 py-3 transition hover:border-blue-100 hover:bg-blue-50/80 hover:text-blue-900"
                      >
                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${service.iconClass}`}
                        >
                          <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-blue-950">
                            {service.label}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-slate-500">
                            {service.description}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </li>

            {navigation.slice(1).map((item) => (
              <li key={item.label}>
                <Link
                  className="whitespace-nowrap transition hover:text-blue-900"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50 xl:flex"
            href="tel:651194097"
          >
            <Phone size={16} className="text-blue-700" />
            651 194 097
          </a>
          <Link
            className="header-cta-heartbeat rounded-full bg-blue-900 px-4 py-2.5 text-xs font-semibold !text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-800 hover:!text-white sm:px-5 sm:py-3 sm:text-sm"
            href="/#contacto"
            style={{ color: "#fff" }}
          >
            Solicitar estudio
          </Link>
        </div>
      </Container>
    </header>
  );
}
