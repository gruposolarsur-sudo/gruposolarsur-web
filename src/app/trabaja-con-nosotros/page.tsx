import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  GraduationCap,
  ShieldCheck,
  SunMedium,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { WorkWithUsForm } from "./WorkWithUsForm";

const valueCards: Array<{
  icon: LucideIcon;
  title: string;
}> = [
  { icon: SunMedium, title: "Proyectos reales en energía solar" },
  { icon: Zap, title: "Empresa en crecimiento" },
  { icon: Wrench, title: "Equipo técnico especializado" },
  { icon: GraduationCap, title: "Formación continua" },
  { icon: Users, title: "Buen ambiente de trabajo" },
  { icon: ShieldCheck, title: "Estabilidad laboral" },
];

const profiles = [
  "Instaladores de placas solares",
  "Técnicos electricistas",
  "Técnicos de mantenimiento",
  "Comerciales energía solar",
  "Personal administrativo",
];

function SectionHeading({
  eyebrow,
  title,
  copy,
}: Readonly<{
  eyebrow: string;
  title: string;
  copy?: string;
}>) {
  return (
    <div className="max-w-3xl">
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[2.35rem]">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{copy}</p>
      ) : null}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Trabaja con nosotros en Grupo SolarSur",
  description:
    "Empleo en energía solar en Andalucía. Únete al equipo de Grupo SolarSur y envía tu candidatura.",
};

export default function WorkWithUsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_12%,rgba(250,204,21,0.22),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(147,197,253,0.22),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-4xl">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
                Empleo en energía solar
              </p>

              <h1 className="mt-4 max-w-[17ch] text-4xl font-extrabold leading-[0.98] tracking-tight text-blue-950 sm:text-5xl lg:text-[4.3rem]">
                Trabaja con nosotros en Grupo SolarSur
              </h1>

              <p className="mt-6 max-w-3xl text-xl font-semibold leading-8 text-blue-900">
                Empleo en energía solar en Andalucía | Únete a un equipo en
                crecimiento
              </p>

              <a
                href="#candidatura"
                className="mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-blue-900 px-8 py-4 text-base font-bold !text-white shadow-[0_18px_40px_rgba(23,37,84,0.22)] transition hover:bg-blue-800 hover:!text-white"
                style={{ color: "#fff" }}
              >
                Enviar candidatura
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <SectionHeading
                eyebrow="Grupo SolarSur"
                title="Especialistas en renovables en Andalucía"
              />

              <div className="space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  En Grupo SolarSur buscamos profesionales que quieran trabajar
                  en el sector de la energía solar en Sevilla y Andalucía. Si
                  tienes experiencia como instalador de placas solares, técnico
                  de mantenimiento, electricista o en gestión administrativa,
                  queremos conocerte.
                </p>
                <p>
                  Ofrecemos oportunidades laborales en un entorno en crecimiento
                  dentro de las energías renovables, participando en proyectos
                  reales de instalación fotovoltaica y eficiencia energética en
                  viviendas y empresas.
                </p>
                <p>
                  Si estás buscando empleo en energía solar en Sevilla o quieres
                  desarrollarte en un sector con alta demanda, envíanos tu CV y
                  valoraremos tu candidatura para futuras incorporaciones.
                </p>
                <p>
                  Operamos en Sevilla, Málaga, Cádiz, Córdoba, Huelva, Granada y
                  Almería, desarrollando proyectos de energía solar en toda
                  Andalucía.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Por qué unirte"
              title="Un entorno profesional para crecer en energía solar"
            />

            <div className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {valueCards.map(({ icon: Icon, title }) => (
                <article
                  key={title}
                  className="rounded-[1.35rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-blue-50 text-blue-900">
                    <Icon size={23} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-blue-900">
                    {title}
                  </h3>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <SectionHeading
                eyebrow="Perfiles"
                title="Buscamos distintos perfiles profesionales"
                copy="Si tienes experiencia técnica, comercial o administrativa, tu candidatura puede encajar en nuestro equipo."
              />

              <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_24px_64px_rgba(15,23,42,0.08)] sm:p-8">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {profiles.map((profile) => (
                    <li
                      key={profile}
                      className="flex items-start gap-3 text-base font-semibold leading-7 text-blue-950"
                    >
                      <BadgeCheck
                        size={20}
                        className="mt-1 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                      <span>{profile}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[linear-gradient(180deg,#172554_0%,#1e3a8a_100%)] py-16 text-white sm:py-20">
          <Container>
            <div className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/8 shadow-[0_24px_64px_rgba(15,23,42,0.22)] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[260px] bg-blue-950">
                <Image
                  src="/hero-casa-solar-collage.svg"
                  alt="Instalación solar de Grupo SolarSur"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              </div>

              <div className="p-7 sm:p-10 lg:p-12">
                <div className="inline-flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-[1.1rem] bg-yellow-300 text-blue-950">
                  <ClipboardCheck size={26} aria-hidden="true" />
                </div>

                <h2 className="mt-6 max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.35rem]">
                  Trabaja con nosotros en Grupo SolarSur
                </h2>

                <p className="mt-5 text-xl font-semibold text-blue-50">
                  Envía tu CV a{" "}
                  <a
                    href="mailto:rrhh@gruposolarsur.com"
                    className="text-yellow-300 underline decoration-yellow-300/50 underline-offset-4 transition hover:text-yellow-200"
                  >
                    rrhh@gruposolarsur.com
                  </a>
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section
          id="candidatura"
          className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] py-16 sm:py-20"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <SectionHeading
                eyebrow="Candidatura"
                title="Envíanos tus datos y tu CV"
                copy="Analizamos cada candidatura para incorporar talento que aporte valor real a nuestros proyectos. Da el paso y envíanos tu CV para unirte a un equipo enfocado en el futuro energético."
              />

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_64px_rgba(15,23,42,0.08)] sm:p-8">
                <WorkWithUsForm />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="rounded-[1.75rem] border border-yellow-200 bg-[linear-gradient(180deg,#fff7cc_0%,#fffdf2_100%)] p-7 shadow-[0_20px_48px_rgba(15,23,42,0.06)] sm:p-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-[0.95rem] bg-blue-900 text-yellow-300">
                <Building2 size={24} aria-hidden="true" />
              </div>
              <div className="mt-6 max-w-4xl space-y-4 text-base leading-8 text-blue-950/82 sm:text-lg">
                <p>
                  Grupo SolarSur ofrece oportunidades laborales en el sector de
                  las energías renovables, especialmente en energía solar
                  fotovoltaica y aerotermia.
                </p>
                <p>
                  Si buscas trabajo como instalador de placas solares en Sevilla
                  o Andalucía, puedes enviarnos tu candidatura a través de esta
                  página.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
