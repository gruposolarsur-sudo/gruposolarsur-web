import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";

export function SavingsBanner() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="rounded-[1.35rem] bg-[linear-gradient(180deg,#facc15_0%,#f8c400_100%)] px-5 py-8 shadow-[0_24px_58px_rgba(15,23,42,0.16)] sm:rounded-[1.75rem] sm:px-10 sm:py-9 lg:px-11">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.32em] text-blue-900">
                Estudio gratuito
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[2.05rem]">
                Empieza hoy a estudiar cuánto puedes ahorrar
              </h2>

              <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-blue-950/82 sm:text-lg">
                Te ayudamos a valorar tu instalación y a dar el paso con seguridad,
                claridad y una propuesta bien planteada.
              </p>
            </div>

            <a
              href="#contacto"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-blue-950 px-8 py-4 text-base !font-normal !text-white shadow-[0_18px_40px_rgba(23,37,84,0.22)] transition hover:bg-blue-900 hover:!text-white sm:w-auto"
              style={{ color: "#fff", fontWeight: 400 }}
            >
              Solicitar estudio gratuito
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
