import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock3,
  Home,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { ContactStudyForm } from "@/components/contact/ContactStudyForm";
import { Container } from "@/components/ui/Container";

const captureHighlights: Array<{
  icon: LucideIcon;
  title: string;
  copy: string;
}> = [
  {
    icon: Clock3,
    title: "Respuesta rápida",
    copy: "Revisamos tus datos y te contactamos con una propuesta clara.",
  },
  {
    icon: ShieldCheck,
    title: "Sin compromiso",
    copy: "Análisis preliminar gratuito y orientado a ahorro real.",
  },
  {
    icon: BadgeCheck,
    title: "Acompañamiento completo",
    copy: "Te guiamos en financiación, ejecución y legalización.",
  },
];

const projectTypes = [
  { icon: Home, label: "Vivienda unifamiliar" },
  { icon: Building2, label: "Negocio o nave" },
];

const discoveryOptions = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Google",
  "Por un amigo o familiar",
  "Publicidad",
];

const interestOptions = [
  "Placas solares fotovoltaicas",
  "Energía solar térmica",
  "Aerotermia",
  "Mantenimiento y soporte",
];

export function Contact() {
  return (
    <section id="contacto" className="relative -mt-8 pb-20 lg:-mt-10">
      <Container className="relative">
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-100/80 bg-white shadow-[0_34px_90px_rgba(15,23,42,0.12)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#facc15_0%,#fde68a_24%,#60a5fa_100%)]" />
          <div className="absolute -left-14 top-16 h-44 w-44 rounded-full bg-yellow-200/40 blur-3xl" />
          <div className="absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-blue-200/35 blur-3xl" />

          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="order-2 relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_58%,#eef5ff_100%)] px-6 py-8 text-slate-900 sm:px-8 lg:px-10 lg:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.14),transparent_26%)]" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900">
                  <BadgeCheck size={15} />
                  Estudio inmediato
                </div>

                <h2 className="mt-5 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[2.25rem]">
                  Te preparamos un estudio gratuito para empezar a ahorrar cuanto
                  antes
                </h2>

                <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                  Déjanos tus datos y te orientamos con una solución solar
                  profesional, rentable y adaptada al consumo real de tu
                  vivienda o negocio.
                </p>

                <div className="mt-8 space-y-4">
                  {captureHighlights.map(({ icon: Icon, title, copy }) => (
                    <div
                      key={title}
                      className="rounded-[1.5rem] border border-slate-200 bg-white/90 px-4 py-4 shadow-[0_14px_32px_rgba(15,23,42,0.06)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-900 text-white">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-blue-950">
                            {title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {copy}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-8 overflow-hidden rounded-[1.6rem] border border-yellow-300/90 bg-[linear-gradient(135deg,#fff7cc_0%,#ffffff_48%,#eaf3ff_100%)] p-5 shadow-[0_22px_50px_rgba(250,204,21,0.18)]">
                  <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-yellow-300/45 blur-2xl" />
                  <div className="relative flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-amber-700/80">
                        ¿Prefieres llamarnos?
                      </div>
                      <div className="mt-2 text-lg font-semibold text-blue-950">
                        Hablamos contigo directamente
                      </div>
                    </div>
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-900 text-white shadow-[0_14px_28px_rgba(23,37,84,0.22)] sm:flex">
                      <Phone size={18} className="text-white" />
                    </div>
                  </div>
                  <a
                    href="tel:955515708"
                    className="group relative mt-5 inline-flex min-h-14 w-full items-center justify-between gap-4 overflow-hidden rounded-full bg-blue-900 px-4 py-3 text-left font-bold !text-white shadow-[0_18px_38px_rgba(23,37,84,0.28)] ring-2 ring-yellow-300/70 transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-[0_22px_44px_rgba(23,37,84,0.34)] hover:!text-white"
                    aria-label="Llamar a Grupo Solarsur al 955 515 708"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-blue-950 shadow-[inset_0_-2px_0_rgba(15,23,42,0.12)]">
                        <Phone size={18} />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-[0.18em] text-yellow-200">
                          Llamar ahora
                        </span>
                        <span className="block text-xl leading-6">
                          955 515 708
                        </span>
                      </span>
                    </span>
                    <ArrowRight
                      size={19}
                      className="shrink-0 transition group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="order-1 relative overflow-hidden bg-[linear-gradient(180deg,#12244b_0%,#172554_55%,#1d4ed8_100%)] px-6 py-8 text-white sm:px-8 lg:px-10 lg:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.16),transparent_26%)]" />

              <div className="relative">
                <div className="flex flex-wrap gap-3">
                  {projectTypes.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50"
                    >
                      <Icon size={16} className="text-yellow-300" />
                      {label}
                    </div>
                  ))}
                </div>

                <h3 className="mt-5 flex max-w-md items-start gap-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.25rem]">
                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-yellow-300">
                    <Clock3 size={22} />
                  </span>
                  <span>Solicita tu estudio en menos de un minuto</span>
                </h3>

                <p className="mt-3 max-w-2xl text-base leading-7 text-blue-50/78">
                  Cuanto mejor entendamos tu situación, mejor podremos estimar el
                  ahorro y plantearte una instalación bien dimensionada desde el
                  primer contacto.
                </p>

                <ContactStudyForm
                  discoveryOptions={discoveryOptions}
                  interestOptions={interestOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
