import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gauge,
  HandCoins,
  Home,
  Landmark,
  Laptop,
  Phone,
  ScrollText,
  ShieldCheck,
  SunMedium,
  ReceiptText,
  Wrench,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

const groupSolarSurAgencyLink =
  "https://incentivos.agenciaandaluzadelaenergia.es/Orden2016SIG/listadoDetalle.jsp?idEmp=3113";

const aidHighlights = [
  {
    icon: Landmark,
    label: "Fondos europeos",
    title: "NextGenerationEU y FEDER",
    copy: "Revisamos cada convocatoria vigente para saber si tu instalación fotovoltaica, térmica o de aerotermia puede encajar.",
  },
  {
    icon: ShieldCheck,
    label: "Gestión autonómica",
    title: "Agencia Andaluza de la Energía",
    copy: "En Andalucía, la Agencia gestiona programas de ayudas energéticas y publica el estado, bases y entidades adheridas.",
  },
  {
    icon: BadgeCheck,
    label: "Empresa acreditada",
    title: "Grupo SolarSur",
    copy: "Grupo SolarSur figura como empresa acreditada/adherida desde 2017 en la ficha oficial de la Agencia Andaluza de la Energía.",
    href: groupSolarSurAgencyLink,
    linkLabel: "Consultar ficha oficial",
  },
];

const aidTypes = [
  {
    icon: SunMedium,
    title: "Autoconsumo fotovoltaico",
    copy: "Instalaciones solares con o sin almacenamiento, según programa, beneficiario y potencia del proyecto.",
  },
  {
    icon: Zap,
    title: "Baterías y almacenamiento",
    copy: "Ayudas asociadas a acumulación cuando la convocatoria contempla equipos de almacenamiento elegibles.",
  },
  {
    icon: Home,
    title: "Sector residencial",
    copy: "Viviendas, comunidades y tercer sector, con requisitos que cambian según bases y disponibilidad.",
  },
  {
    icon: Building2,
    title: "Empresas y actividad económica",
    copy: "Líneas para negocios, sector servicios, industria o cadena agroalimentaria cuando exista convocatoria abierta.",
  },
];

const lifecycleSteps = [
  {
    icon: FileText,
    title: "CEE previo",
    copy: "Solicitar el certificado de eficiencia energética y registrarlo antes de iniciar el expediente.",
  },
  {
    icon: HandCoins,
    title: "Registro de la subvención",
    copy: "Preparar la solicitud, anexos y documentación necesaria para registrar la ayuda.",
  },
  {
    icon: ScrollText,
    title: "Solicitud de licencia",
    copy: "Tramitar la licencia o comunicación previa que corresponda según el municipio.",
  },
  {
    icon: ClipboardCheck,
    title: "Certificado final",
    copy: "Emitir la documentación final de instalación una vez ejecutado el proyecto.",
  },
  {
    icon: ShieldCheck,
    title: "Legalización",
    copy: "Legalizar la instalación ante Industria con la documentación técnica exigida.",
  },
  {
    icon: Gauge,
    title: "CEE posterior",
    copy: "Emitir y registrar el certificado posterior para acreditar la mejora energética.",
  },
  {
    icon: Laptop,
    title: "Postventa",
    copy: "Crear la planta del cliente y dejar el acceso preparado para seguimiento.",
  },
  {
    icon: Wrench,
    title: "Monitorización",
    copy: "Revisar producción, consumo y mantenimiento para que la planta siga rindiendo.",
  },
];

const irpfCards = [
  {
    icon: Calculator,
    title: "30% menos energía primaria",
    copy: "La mejora se acredita reduciendo al menos un 30% el consumo de energía primaria no renovable, o alcanzando clase A o B.",
  },
  {
    icon: Banknote,
    title: "Deducción del 40%",
    copy: "La Agencia Tributaria recoge una deducción del 40% para esta modalidad, con base máxima de 7.500 € y requisitos vigentes.",
  },
  {
    icon: FileCheck2,
    title: "CEE antes y después",
    copy: "El certificado previo y el posterior son la pieza clave para demostrar la mejora y ordenar la documentación.",
  },
];

const irpfOfficialLink =
  "https://sede.agenciatributaria.gob.es/Sede/vivienda-otros-inmuebles/deducciones-obras-mejora-eficiencia-energetica-viviendas/deduccion-obras-mejora-consumo-energia-renovable/que-obras-derecho-deduccion.html";

const officialLinks = [
  {
    label: "Ficha de Grupo SolarSur en la Agencia Andaluza",
    href: groupSolarSurAgencyLink,
  },
  {
    label: "Fondos NextGenerationEU gestionados por la Agencia",
    href: "https://www.agenciaandaluzadelaenergia.es/es/todos-los-programas/fondos-nextgenerationeu-prtr",
  },
  {
    label: "Incentivos autoconsumo, almacenamiento y térmicas",
    href: "https://www.agenciaandaluzadelaenergia.es/es/todos-los-programas/incentivos-para-energias-renovables-en-autoconsumo-almacenamiento-y-para-termicas-en-sector-residencial",
  },
  {
    label: "Programa INEA financiado por FEDER 2021-2027",
    href: "https://www.agenciaandaluzadelaenergia.es/es/todos-los-programas/incentivos-para-el-uso-eficiente-de-la-energia-en-andalucia-inea",
  },
  {
    label: "Deducción IRPF por energía primaria no renovable",
    href: irpfOfficialLink,
  },
];

export const metadata: Metadata = {
  title: "Ayudas y subvenciones solares | Grupo Solar Sur",
  description:
    "Gestión documental de ayudas, subvenciones europeas e IRPF para instalaciones solares, autoconsumo, aerotermia y eficiencia energética en Andalucía.",
};

export default function GrantsAndSubsidiesPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative min-h-[680px] overflow-hidden bg-[#061331] py-20 text-white sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(250,204,21,0.26),transparent_30%),radial-gradient(circle_at_66%_74%,rgba(14,165,233,0.28),transparent_34%),linear-gradient(135deg,#061331_0%,#10256d_52%,#0f3a69_100%)]" />
          <div className="absolute -right-24 top-20 h-[34rem] w-[34rem] rounded-full border-[4.5rem] border-cyan-300/10" />
          <div className="absolute right-8 top-32 hidden h-[26rem] w-[26rem] rounded-full border-[2rem] border-yellow-300/14 lg:block" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.98)_100%)]" />

          <Container className="relative">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="max-w-3xl pt-6">
                <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-yellow-300">
                  Ayudas y subvenciones
                </p>
                <h1 className="mt-5 max-w-[12ch] text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.7rem]">
                  Tu proyecto solar con expediente claro
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-50/86 sm:text-xl">
                  Revisamos ayudas europeas, subvenciones gestionadas por la
                  Agencia Andaluza de la Energía y deducciones IRPF para que tu
                  instalación avance con documentación, legalización y
                  seguimiento.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/#contacto"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-7 py-4 text-base font-bold !text-blue-950 shadow-[0_18px_40px_rgba(250,204,21,0.26)] transition hover:bg-yellow-200"
                  >
                    Revisar mi caso
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <a
                    href="tel:651194097"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:border-white/45 hover:bg-white/16"
                  >
                    <Phone size={18} aria-hidden="true" />
                    Llamar ahora
                  </a>
                </div>
              </div>

              <div className="relative min-h-[360px] lg:min-h-[520px]">
                <div className="absolute left-2 top-4 w-[76%] rounded-[1.35rem] border border-white/18 bg-white/10 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-md sm:left-8 sm:w-[62%]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-300 text-blue-950">
                      <ReceiptText size={24} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-yellow-200">
                        Expediente
                      </p>
                      <p className="text-xl font-extrabold leading-tight">
                        Ayuda + licencia + legalización
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {["CEE previo", "Subvención", "Industria"].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-full bg-white/12 px-4 py-3 text-sm font-bold text-blue-50"
                      >
                        <span>{item}</span>
                        <CheckCircle2
                          size={18}
                          className="text-yellow-300"
                          aria-hidden="true"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-4 right-0 w-[82%] rounded-[1.35rem] border border-white/16 bg-white p-5 text-blue-950 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:w-[70%]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-amber-500">
                    Organismos y fondos
                  </p>
                  <div className="mt-5 grid grid-cols-3 items-center gap-4">
                    <Image
                      src="/logos/sello-agencia-andaluza-energia.webp"
                      alt="Sello de la Agencia Andaluza de la Energía"
                      width={430}
                      height={241}
                      className="h-auto w-full object-contain"
                    />
                    <Image
                      src="/logos/sello-next-generation-ue.webp"
                      alt="Sello Next Generation EU"
                      width={144}
                      height={144}
                      className="mx-auto h-auto w-full max-w-24 object-contain"
                    />
                    <Image
                      src="/logos/sello-eco-vivienda.webp"
                      alt="Sello PLA Eco Vivienda"
                      width={144}
                      height={144}
                      className="mx-auto h-auto w-full max-w-24 object-contain"
                    />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Image
                      src="/logos/banner-autoconsumo.png"
                      alt="Banner oficial de autoconsumo"
                      width={520}
                      height={180}
                      className="h-auto rounded-xl border border-slate-200 object-contain"
                    />
                    <Image
                      src="/logos/banner-termicas.png"
                      alt="Banner oficial de energías renovables térmicas"
                      width={520}
                      height={180}
                      className="h-auto rounded-xl border border-slate-200 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="relative -mt-16 pb-16 sm:pb-20">
          <Container>
            <div className="grid gap-4 md:grid-cols-3">
              {aidHighlights.map(
                ({ icon: Icon, label, title, copy, href, linkLabel }) => (
                  <article
                    key={title}
                    className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_24px_58px_rgba(15,23,42,0.08)]"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-blue-50 text-blue-900">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-[0.72rem] font-extrabold uppercase tracking-[0.24em] text-amber-500">
                      {label}
                    </p>
                    <h2 className="mt-2 text-xl font-extrabold tracking-tight text-blue-950">
                      {title}
                    </h2>
                    <p className="mt-3 text-[0.98rem] leading-7 text-slate-600">
                      {copy}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-950 transition hover:text-blue-700"
                      >
                        {linkLabel}
                        <ArrowRight size={15} aria-hidden="true" />
                      </a>
                    ) : null}
                  </article>
                ),
              )}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Repaso de ayudas
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Fondos europeos, convocatoria y expediente
                </h2>
              </div>

              <div className="space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  Las ayudas para autoconsumo, almacenamiento y sistemas
                  térmicos renovables han estado vinculadas al Plan de
                  Recuperación, Transformación y Resiliencia, financiado por la
                  Unión Europea NextGenerationEU, y gestionadas en Andalucía por
                  la Agencia Andaluza de la Energía.
                </p>
                <p>
                  La disponibilidad cambia según programa: algunas líneas ya
                  cerraron nuevas solicitudes y otras convocatorias se publican
                  dentro de marcos como Andalucía FEDER 2021-2027. Por eso el
                  primer paso es revisar bases, plazos, beneficiario, potencia,
                  documentación y compatibilidad.
                </p>
                <p>
                  Grupo SolarSur acompaña al cliente en la parte técnica y
                  documental: certificados, licencia, legalización, registro,
                  postventa y seguimiento de la planta.
                </p>
                <div className="rounded-[1.2rem] border border-amber-200 bg-amber-50 px-5 py-4 text-base leading-7 text-blue-950">
                  <p className="font-extrabold">Estado actual de referencia</p>
                  <p className="mt-2 text-slate-700">
                    El programa NextGeneration de autoconsumo cerró nuevas
                    solicitudes el 31/12/2023. Las actuaciones concedidas deben
                    ejecutarse y justificarse según su resolución, sin superar el
                    30/06/2026. Para nuevos expedientes revisamos convocatorias
                    activas o futuras como INEA/FEDER y lo publicado por la
                    Agencia Andaluza de la Energía.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-4">
              {aidTypes.map(({ icon: Icon, title, copy }) => (
                <article
                  key={title}
                  className="rounded-[1.25rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_16px_38px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-yellow-300 text-blue-950">
                    <Icon size={23} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight text-blue-950">
                    {title}
                  </h3>
                  <p className="mt-3 text-[0.96rem] leading-7 text-slate-600">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                Ciclo de vida
              </p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                Del primer certificado a la planta monitorizada
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Ordenamos el proceso para que cada hito tenga su documento,
                responsable y momento dentro del expediente.
              </p>
            </div>

            <ol className="relative mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {lifecycleSteps.map(({ icon: Icon, title, copy }, index) => (
                <li key={title} className="relative">
                  <article className="flex h-full flex-col rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-blue-50 text-blue-900">
                        <Icon size={23} aria-hidden="true" />
                      </div>
                      <span className="text-4xl font-black leading-none text-blue-100">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold tracking-tight text-blue-950">
                      {title}
                    </h3>
                    <p className="mt-3 text-[0.96rem] leading-7 text-slate-600">
                      {copy}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                  Alternativa fiscal
                </p>
                <h2 className="mt-4 max-w-[13ch] text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.2rem]">
                  Si no hay subvención, miramos el IRPF
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                  Cuando no existe convocatoria abierta o el proyecto no encaja,
                  revisamos si puede acogerse a la deducción por mejora de
                  eficiencia energética, siempre con certificado previo y
                  posterior.
                </p>
                <a
                  href={irpfOfficialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-900 px-5 py-3 text-sm font-extrabold text-blue-950 transition hover:bg-blue-950 hover:!text-white"
                >
                  Consultar bases legales oficiales
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {irpfCards.map(({ icon: Icon, title, copy }) => (
                  <article
                    key={title}
                    className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-emerald-50 text-emerald-700">
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold tracking-tight text-blue-950">
                      {title}
                    </h3>
                    <p className="mt-3 text-[0.96rem] leading-7 text-slate-600">
                      {copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-blue-950 py-16 text-white sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-yellow-300 text-blue-950">
                  <FileCheck2 size={24} aria-hidden="true" />
                </div>
                <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.7rem]">
                  Revisamos tu expediente antes de mover una pieza
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50/78">
                  Cuantificamos el proyecto, comprobamos ayudas disponibles,
                  documentación necesaria, certificados y vía fiscal aplicable.
                  Así sabes desde el inicio qué camino tiene más sentido.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/#contacto"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-7 py-4 text-base font-bold !text-blue-950 shadow-[0_18px_40px_rgba(250,204,21,0.24)] transition hover:bg-yellow-200"
                  >
                    Solicitar revisión
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <a
                    href="tel:651194097"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 px-7 py-4 text-base font-bold text-white transition hover:border-white/35 hover:bg-white/8"
                  >
                    <Phone size={18} aria-hidden="true" />
                    651 194 097
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.32em] text-yellow-300">
                  Fuentes oficiales
                </p>
                <ul className="mt-5 grid gap-3">
                  {officialLinks.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        rel="noreferrer"
                        target="_blank"
                        className="flex items-center justify-between gap-4 rounded-[1rem] border border-white/10 bg-white/8 px-5 py-4 text-sm font-bold text-blue-50 transition hover:border-yellow-300/50 hover:bg-white/12"
                      >
                        <span>{item.label}</span>
                        <ArrowRight
                          size={16}
                          className="shrink-0 text-yellow-300"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
