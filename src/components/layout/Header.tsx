"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ElementType, FormEvent, SVGProps } from "react";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChartNoAxesCombined,
  ChevronDown,
  FileText,
  Menu,
  Phone,
  Search,
  SunMedium,
  Wrench,
  X,
} from "lucide-react";

import {
  AerotermiaIcon,
  SolarThermalIcon,
  type ServiceIconProps,
} from "@/components/icons/ServiceIcons";
import {
  projectServiceGroups,
  type ProjectServiceKey,
} from "@/data/projectServices";
import { quickSearchItems, siteSearchItems, type SiteSearchItem } from "@/data/siteSearch";
import { Container } from "@/components/ui/Container";

const navigation = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Blog", href: "/blog" },
  { label: "Empleo", href: "/trabaja-con-nosotros" },
  { label: "Contacto", href: "/contacto" },
];

type StudySearchIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

function StudySearchIcon({
  size = 18,
  strokeWidth = 2.6,
  ...props
}: StudySearchIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...props}
    >
      <path d="M15.4 4.7A7.5 7.5 0 1 0 17 16.6" />
      <path d="M16.7 16.7L21 21" />
      <path d="M5.9 14.7L9.5 10.6C10 10 10.9 10 11.5 10.6L13.8 12.8C14.4 13.4 15.3 13.3 15.8 12.7L21 6.2" />
    </svg>
  );
}

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

const projectLinkStyles: Record<
  ProjectServiceKey,
  {
    icon: ElementType<ServiceIconProps>;
    iconClass: string;
  }
> = {
  photovoltaic: {
    icon: SunMedium,
    iconClass: "bg-yellow-50 text-amber-600",
  },
  "solar-thermal": {
    icon: SolarThermalIcon,
    iconClass: "bg-amber-50 text-amber-600",
  },
  aerotermia: {
    icon: AerotermiaIcon,
    iconClass: "bg-cyan-50 text-cyan-700",
  },
  subsidies: {
    icon: FileText,
    iconClass: "bg-blue-50 text-blue-700",
  },
  study: {
    icon: ChartNoAxesCombined,
    iconClass: "bg-emerald-50 text-emerald-700",
  },
  maintenance: {
    icon: Wrench,
    iconClass: "bg-sky-50 text-blue-800",
  },
};

const projectLinks = projectServiceGroups.map((service) => ({
  ...service,
  ...projectLinkStyles[service.key],
}));

const searchGroupStyles: Record<SiteSearchItem["group"], string> = {
  Pagina: "bg-slate-100 text-slate-700",
  Servicio: "bg-yellow-50 text-amber-700",
  Categoria: "bg-blue-50 text-blue-700",
  Proyecto: "bg-emerald-50 text-emerald-700",
};

function normalizeSearchValue(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getSearchScore(item: SiteSearchItem, query: string) {
  const normalizedLabel = normalizeSearchValue(item.label);
  const normalizedDescription = normalizeSearchValue(item.description);
  const normalizedKeywords = normalizeSearchValue(item.keywordsText);
  const queryTerms = query.split(" ").filter(Boolean);

  if (!queryTerms.length) {
    return Number.POSITIVE_INFINITY;
  }

  if (normalizedLabel === query) {
    return 0;
  }

  if (normalizedLabel.startsWith(query)) {
    return 1;
  }

  if (normalizedKeywords.includes(query) || normalizedDescription.includes(query)) {
    return 2;
  }

  if (queryTerms.every((term) => normalizedLabel.includes(term))) {
    return 3;
  }

  if (
    queryTerms.every(
      (term) =>
        normalizedKeywords.includes(term) || normalizedDescription.includes(term),
    )
  ) {
    return 4;
  }

  return Number.POSITIVE_INFINITY;
}

export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const normalizedSearchQuery = normalizeSearchValue(deferredSearchQuery);
  const searchResults = normalizedSearchQuery
    ? siteSearchItems
        .map((item) => ({
          item,
          score: getSearchScore(item, normalizedSearchQuery),
        }))
        .filter((entry) => Number.isFinite(entry.score))
        .sort((left, right) => {
          if (left.score !== right.score) {
            return left.score - right.score;
          }

          return left.item.label.localeCompare(right.item.label);
        })
        .slice(0, 8)
        .map((entry) => entry.item)
    : quickSearchItems;

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const focusTimer = window.setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    }, 30);

    return () => window.clearTimeout(focusTimer);
  }, [isSearchOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileProjectsOpen(false);
  }

  function closeSearch() {
    setIsSearchOpen(false);
    setSearchQuery("");
  }

  function closeHeaderOverlays() {
    closeMobileMenu();
    closeSearch();
  }

  function toggleMobileMenu() {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    closeSearch();
    setIsMobileMenuOpen(true);
  }

  function toggleSearch() {
    if (isSearchOpen) {
      closeSearch();
      return;
    }

    closeMobileMenu();
    setIsSearchOpen(true);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!normalizedSearchQuery || searchResults.length === 0) {
      return;
    }

    router.push(searchResults[0].href);
    closeHeaderOverlays();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-3 py-3">
        <Link
          className="flex shrink-0 items-center"
          href="/#inicio"
          onClick={closeHeaderOverlays}
        >
          <Image
            src="/assets/logos/logo-solarsur.svg"
            alt="Logo de Grupo SolarSur"
            width={160}
            height={50}
            className="h-9 w-auto min-[380px]:h-10 sm:h-12"
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
                onClick={closeHeaderOverlays}
              >
                Inicio
              </Link>
            </li>

            <li className="group relative">
              <Link
                className="inline-flex items-center gap-1.5 whitespace-nowrap py-2 transition hover:text-blue-900 group-focus-within:text-blue-900"
                href="/#servicios"
                aria-haspopup="true"
                onClick={closeHeaderOverlays}
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
                        onClick={closeHeaderOverlays}
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

            <li className="group relative">
              <Link
                className="inline-flex items-center gap-1.5 whitespace-nowrap py-2 transition hover:text-blue-900 group-focus-within:text-blue-900"
                href="/proyectos"
                aria-haspopup="true"
                onClick={closeHeaderOverlays}
              >
                Proyectos
                <ChevronDown
                  size={15}
                  strokeWidth={2.3}
                  className="transition duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  aria-hidden="true"
                />
              </Link>

              <div className="invisible absolute left-1/2 top-full z-50 w-[44rem] max-w-[calc(100vw-3rem)] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="grid gap-2 rounded-[1.35rem] border border-slate-200 bg-white p-3 shadow-[0_24px_70px_rgba(15,23,42,0.16)] md:grid-cols-2">
                  <Link
                    href="/proyectos"
                    onClick={closeHeaderOverlays}
                    className="md:col-span-2 rounded-2xl border border-blue-100 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_100%)] px-5 py-4 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="block text-sm font-bold text-blue-950">
                      Ver todos los proyectos
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      Accede al mapa de obras, fichas técnicas y casos reales publicados.
                    </span>
                  </Link>

                  {projectLinks.map((project) => {
                    const Icon = project.icon;

                    return (
                      <Link
                        key={project.key}
                        href={project.href}
                        onClick={closeHeaderOverlays}
                        className="flex gap-3 rounded-2xl border border-transparent px-4 py-3 transition hover:border-blue-100 hover:bg-blue-50/80 hover:text-blue-900"
                      >
                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${project.iconClass}`}
                        >
                          <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-blue-950">
                            {project.label}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-slate-500">
                            {project.description}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </li>

            {navigation.slice(2).map((item) => (
              <li key={item.label}>
                <Link
                  className="whitespace-nowrap transition hover:text-blue-900"
                  href={item.href}
                  onClick={closeHeaderOverlays}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleSearch}
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-blue-950 shadow-sm transition ${
              isSearchOpen
                ? "border-blue-200 bg-blue-50 text-blue-900"
                : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50"
            }`}
            aria-label={isSearchOpen ? "Cerrar buscador general" : "Abrir buscador general"}
            aria-expanded={isSearchOpen}
            aria-controls="site-search-panel"
          >
            <Search size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <a
            className="hidden h-11 items-center gap-2 rounded-full border border-slate-200 px-4 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50 xl:flex"
            href="tel:955515708"
          >
            <Phone size={16} className="text-blue-700" />
            955 515 708
          </a>
          <Link
            className="header-cta-heartbeat inline-flex items-center justify-center gap-2 rounded-full bg-blue-900 px-3 py-2.5 text-xs font-semibold !text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-800 hover:!text-white min-[380px]:px-4 sm:px-5 sm:py-3 sm:text-sm"
            href="/#contacto"
            style={{ color: "#fff" }}
            onClick={closeHeaderOverlays}
          >
            <StudySearchIcon size={17} strokeWidth={2.5} aria-hidden="true" />
            <span className="min-[420px]:hidden">Estudio</span>
            <span className="hidden min-[420px]:inline">Solicitar estudio</span>
          </Link>
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 lg:hidden"
            aria-label={
              isMobileMenuOpen
                ? "Cerrar menú principal"
                : "Abrir menú principal"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? (
              <X size={20} strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={2.2} aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {isSearchOpen ? (
        <div
          id="site-search-panel"
          className="border-t border-slate-200 bg-white/98 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur"
        >
          <Container className="py-3 sm:py-4">
            <div className="grid gap-3">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-3 rounded-[1.35rem] border border-blue-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
              >
                <Search
                  size={18}
                  strokeWidth={2.2}
                  className="shrink-0 text-blue-700"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Busca servicios, proyectos, categorias o paginas"
                  className="min-w-0 flex-1 bg-transparent text-sm text-blue-950 outline-none placeholder:text-slate-400 sm:text-base"
                  aria-label="Buscar en la web"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:text-blue-900"
                    aria-label="Borrar búsqueda"
                  >
                    <X size={16} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                ) : null}
              </form>

              <div className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
                  <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-blue-900/56">
                    {normalizedSearchQuery ? "Resultados" : "Accesos rápidos"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {normalizedSearchQuery
                      ? `${searchResults.length} coincidencias`
                      : "Pulsa Enter para abrir el primer resultado"}
                  </p>
                </div>

                {searchResults.length > 0 ? (
                  <div className="grid">
                    {searchResults.map((item) => (
                      <Link
                        key={`${item.group}-${item.href}-${item.label}`}
                        href={item.href}
                        onClick={closeHeaderOverlays}
                        className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 transition hover:bg-blue-50/70 last:border-b-0"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex min-h-7 items-center rounded-full px-2.5 py-1 text-[0.68rem] font-extrabold uppercase ${searchGroupStyles[item.group]}`}
                            >
                              {item.group}
                            </span>
                            <span className="truncate text-sm font-bold text-blue-950 sm:text-[0.96rem]">
                              {item.label}
                            </span>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="shrink-0 text-blue-700"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-5 text-sm leading-6 text-slate-500">
                    No encontramos resultados para esa búsqueda. Prueba con una
                    provincia, un servicio o el nombre de un proyecto.
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      ) : null}

      {isMobileMenuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] lg:hidden"
        >
          <Container className="py-4">
            <nav aria-label="Principal móvil" className="grid gap-4">
              <div className="grid gap-2">
                <Link
                  href="/#inicio"
                  onClick={closeMobileMenu}
                  className="flex min-h-12 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-blue-950 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  Inicio
                </Link>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                  <button
                    type="button"
                    onClick={() =>
                      setIsMobileServicesOpen((current) => !current)
                    }
                    className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-bold text-blue-950"
                    aria-expanded={isMobileServicesOpen}
                    aria-controls="mobile-services-navigation"
                  >
                    <span>Servicios</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2.3}
                      className={`shrink-0 transition duration-200 ${
                        isMobileServicesOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isMobileServicesOpen ? (
                    <div
                      id="mobile-services-navigation"
                      className="border-t border-slate-200 px-3 pb-3 pt-2"
                    >
                      <Link
                        href="/#servicios"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-xl px-2 py-2.5 text-sm font-bold text-blue-900 transition hover:bg-blue-50"
                      >
                        Ver todos los servicios
                      </Link>

                      <div className="grid gap-1.5">
                        {serviceLinks.map((service) => {
                          const Icon = service.icon;

                          return (
                            <Link
                              key={service.label}
                              href={service.href}
                              onClick={closeMobileMenu}
                              className="flex gap-3 rounded-xl px-2 py-2.5 text-blue-950 transition hover:bg-blue-50"
                            >
                              <span
                                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${service.iconClass}`}
                              >
                                <Icon
                                  size={18}
                                  strokeWidth={2.2}
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-bold leading-5">
                                  {service.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                                  {service.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                  <button
                    type="button"
                    onClick={() =>
                      setIsMobileProjectsOpen((current) => !current)
                    }
                    className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-bold text-blue-950"
                    aria-expanded={isMobileProjectsOpen}
                    aria-controls="mobile-projects-navigation"
                  >
                    <span>Proyectos</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2.3}
                      className={`shrink-0 transition duration-200 ${
                        isMobileProjectsOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isMobileProjectsOpen ? (
                    <div
                      id="mobile-projects-navigation"
                      className="border-t border-slate-200 px-3 pb-3 pt-2"
                    >
                      <Link
                        href="/proyectos"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-xl px-2 py-2.5 text-sm font-bold text-blue-900 transition hover:bg-blue-50"
                      >
                        Ver todos los proyectos
                      </Link>

                      <div className="grid gap-1.5">
                        {projectLinks.map((project) => {
                          const Icon = project.icon;

                          return (
                            <Link
                              key={project.key}
                              href={project.href}
                              onClick={closeMobileMenu}
                              className="flex gap-3 rounded-xl px-2 py-2.5 text-blue-950 transition hover:bg-blue-50"
                            >
                              <span
                                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${project.iconClass}`}
                              >
                                <Icon
                                  size={18}
                                  strokeWidth={2.2}
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-bold leading-5">
                                  {project.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                                  {project.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>

                {navigation.slice(2).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex min-h-12 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-blue-950 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="grid gap-2 min-[420px]:grid-cols-2">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 text-sm font-bold text-blue-900 transition hover:border-blue-200 hover:bg-blue-100"
                  href="tel:955515708"
                  onClick={closeMobileMenu}
                >
                  <Phone size={16} aria-hidden="true" />
                  955 515 708
                </a>
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-4 text-sm font-bold !text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-800"
                  href="/#contacto"
                  onClick={closeMobileMenu}
                >
                  <StudySearchIcon size={18} strokeWidth={2.5} aria-hidden="true" />
                  Solicitar estudio
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
