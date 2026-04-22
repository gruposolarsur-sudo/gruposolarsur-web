import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

const cookieTypes = [
  {
    title: "Cookies técnicas",
    copy: "Son necesarias para el funcionamiento básico del sitio web y permiten la navegación y el uso de sus funcionalidades, por ejemplo el acceso a áreas seguras o el envío de formularios.",
  },
  {
    title: "Cookies de análisis",
    copy: "Permiten cuantificar el número de usuarios y analizar el uso del sitio web con el fin de mejorar los servicios ofrecidos. Este sitio web utiliza Google Analytics.",
  },
  {
    title: "Cookies de personalización",
    copy: "Permiten recordar información para que el usuario acceda al servicio con determinadas características, como idioma o configuración regional.",
  },
  {
    title: "Cookies publicitarias",
    copy: "Si se implementan, permiten gestionar los espacios publicitarios y mostrar anuncios relevantes en función del comportamiento del usuario.",
  },
];

const consentOptions = [
  "Aceptar todas las cookies.",
  "Rechazar las cookies no necesarias.",
  "Configurar sus preferencias.",
];

const browserOptions = [
  "Google Chrome.",
  "Mozilla Firefox.",
  "Microsoft Edge.",
  "Safari.",
];

function LegalSection({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold tracking-tight text-blue-950">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
        {children}
      </div>
    </section>
  );
}

function LegalList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item) => (
        <li key={item} className="list-disc pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

export const metadata: Metadata = {
  title: "Política de cookies | Grupo Solar Sur",
  description:
    "Información sobre el uso de cookies en el sitio web de Grupo SolarSur Energía Solar, S.L.",
};

export default function CookiesPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-16 sm:py-20">
          <Container>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-500">
                Grupo Solar Sur
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-5xl">
                Política de cookies
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Información sobre las cookies utilizadas en el sitio web de
                Grupo SolarSur Energía Solar, S.L. y sobre cómo puede gestionar
                sus preferencias.
              </p>
            </div>
          </Container>
        </section>

        <Container className="pb-20">
          <article className="mx-auto max-w-4xl space-y-10">
            <LegalSection title="1. ¿Qué son las cookies?">
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en
                el dispositivo del usuario al visitar un sitio web. Su finalidad
                es permitir el correcto funcionamiento de la web, mejorar la
                experiencia de usuario y recopilar información sobre la
                navegación.
              </p>
            </LegalSection>

            <LegalSection title="2. Tipos de cookies utilizadas">
              <p>
                Este sitio web puede utilizar las siguientes categorías de
                cookies:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {cookieTypes.map((cookieType) => (
                  <article
                    key={cookieType.title}
                    className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-5"
                  >
                    <h3 className="font-bold text-blue-950">{cookieType.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {cookieType.copy}
                    </p>
                  </article>
                ))}
              </div>
            </LegalSection>

            <LegalSection title="3. Base legal">
              <p>
                El uso de cookies no necesarias, como las analíticas, de
                personalización o publicitarias, se basa en el consentimiento
                del usuario, que puede aceptar, rechazar o configurar en
                cualquier momento.
              </p>
            </LegalSection>

            <LegalSection title="4. Gestión de cookies">
              <p>Al acceder al sitio web, el usuario puede:</p>
              <LegalList items={consentOptions} />
              <p>
                El usuario puede modificar o retirar su consentimiento en
                cualquier momento a través del banner de configuración de
                cookies.
              </p>
            </LegalSection>

            <LegalSection title="5. Desactivación desde el navegador">
              <p>
                El usuario puede permitir, bloquear o eliminar las cookies
                instaladas en su dispositivo mediante la configuración de su
                navegador:
              </p>
              <LegalList items={browserOptions} />
            </LegalSection>

            <LegalSection title="6. Cookies de terceros">
              <p>
                Este sitio web utiliza servicios de terceros que pueden instalar
                cookies en el dispositivo del usuario, como Google, a través de
                Google Analytics, para analizar el uso del sitio web.
              </p>
              <p>
                Estos terceros pueden transferir datos fuera del Espacio
                Económico Europeo, cumpliendo con las garantías adecuadas
                conforme a la normativa vigente.
              </p>
            </LegalSection>

            <LegalSection title="7. Conservación de datos">
              <p>
                Las cookies se conservarán durante el tiempo necesario para
                cumplir su finalidad o hasta que el usuario las elimine
                manualmente desde su navegador.
              </p>
            </LegalSection>

            <LegalSection title="8. Actualizaciones de la política de cookies">
              <p>
                Grupo SolarSur Energía Solar, S.L. se reserva el derecho a
                modificar la presente política de cookies para adaptarla a
                cambios legislativos o técnicos.
              </p>
            </LegalSection>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
