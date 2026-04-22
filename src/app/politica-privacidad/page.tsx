import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

const treatmentPurposes = [
  "Atender solicitudes de información y contacto.",
  "Elaborar y enviar presupuestos personalizados de instalaciones solares.",
  "Gestionar clientes y potenciales clientes.",
  "Enviar comunicaciones comerciales relacionadas con soluciones de energía solar, cuando el usuario lo autorice.",
  "Mejorar la experiencia de navegación y los servicios ofrecidos.",
];

const legalBasis = [
  "El consentimiento del usuario, otorgado mediante la aceptación de la presente política.",
  "La aplicación de medidas precontractuales, cuando solicita información o presupuesto.",
];

const retentionTerms = [
  "Mientras exista una relación comercial o interés por parte del usuario.",
  "Hasta que el usuario solicite su supresión.",
  "Durante los plazos necesarios para cumplir con las obligaciones legales.",
];

const dataProcessors = [
  "Servicios de alojamiento web (Vercel).",
  "CRM, software de gestión y facturación (Factusol, Odoo).",
  "Servicios de correo electrónico corporativo (Microsoft 365).",
  "Herramientas de análisis web (Google Analytics).",
];

const userRights = [
  "Acceder a sus datos personales.",
  "Solicitar la rectificación de datos inexactos.",
  "Solicitar su supresión cuando ya no sean necesarios.",
  "Oponerse al tratamiento de sus datos.",
  "Solicitar la limitación del tratamiento.",
  "Solicitar la portabilidad de sus datos.",
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
  title: "Política de privacidad | Grupo Solar Sur",
  description:
    "Información sobre el tratamiento de datos personales de Grupo Solarsur Energía Solar, S.L.",
};

export default function PrivacyPolicyPage() {
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
                Política de privacidad
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Información sobre cómo Grupo Solarsur Energía Solar, S.L. trata
                los datos personales recogidos a través de este sitio web.
              </p>
            </div>
          </Container>
        </section>

        <Container className="pb-20">
          <article className="mx-auto max-w-4xl space-y-10">
            <LegalSection title="1. Responsable del tratamiento">
              <p>
                En cumplimiento de lo dispuesto en el Reglamento General de
                Protección de Datos (RGPD) y en la Ley Orgánica de Protección de
                Datos y Garantía de Derechos Digitales (LOPDGDD), se informa de
                que los datos personales recogidos a través de este sitio web
                serán tratados por:
              </p>
              <dl className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-slate-700 sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-blue-950">Responsable</dt>
                  <dd>GRUPO SOLARSUR ENERGÍA SOLAR SOCIEDAD LIMITADA</dd>
                </div>
                <div>
                  <dt className="font-semibold text-blue-950">CIF</dt>
                  <dd>B90189002</dd>
                </div>
                <div>
                  <dt className="font-semibold text-blue-950">Domicilio</dt>
                  <dd>Calle Progreso, 9, 41960, Gines</dd>
                </div>
                <div>
                  <dt className="font-semibold text-blue-950">Teléfono</dt>
                  <dd>
                    <a className="font-semibold text-blue-800" href="tel:651194097">
                      651 19 40 97
                    </a>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-blue-950">Correo electrónico</dt>
                  <dd>
                    <a
                      className="font-semibold text-blue-800"
                      href="mailto:calidad@gruposolarsur.com"
                    >
                      calidad@gruposolarsur.com
                    </a>
                  </dd>
                </div>
              </dl>
            </LegalSection>

            <LegalSection title="2. Finalidad del tratamiento de los datos">
              <p>
                Los datos personales que el usuario facilite a través de los
                formularios de esta web serán tratados con las siguientes
                finalidades:
              </p>
              <LegalList items={treatmentPurposes} />
            </LegalSection>

            <LegalSection title="3. Legitimación">
              <p>La base legal para el tratamiento de sus datos es:</p>
              <LegalList items={legalBasis} />
            </LegalSection>

            <LegalSection title="4. Conservación de los datos">
              <p>Los datos personales se conservarán:</p>
              <LegalList items={retentionTerms} />
            </LegalSection>

            <LegalSection title="5. Destinatarios de los datos">
              <p>No se cederán datos a terceros salvo obligación legal.</p>
              <p>
                No obstante, podrán tener acceso a los datos proveedores que
                prestan servicios necesarios para el funcionamiento de la web,
                tales como:
              </p>
              <LegalList items={dataProcessors} />
              <p>
                Estos proveedores actúan como encargados del tratamiento y
                cumplen con la normativa vigente en protección de datos.
              </p>
            </LegalSection>

            <LegalSection title="6. Derechos del usuario">
              <p>El usuario tiene derecho a:</p>
              <LegalList items={userRights} />
              <p>
                Para ejercer estos derechos, puede enviar una solicitud a{" "}
                <a
                  className="font-semibold text-blue-800 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-950"
                  href="mailto:calidad@gruposolarsur.com"
                >
                  calidad@gruposolarsur.com
                </a>
                .
              </p>
            </LegalSection>

            <LegalSection title="7. Seguridad de los datos">
              <p>
                GRUPO SOLARSUR ENERGÍA SOLAR SOCIEDAD LIMITADA adopta las
                medidas técnicas y organizativas necesarias para garantizar la
                seguridad de los datos personales y evitar su pérdida,
                alteración o acceso no autorizado.
              </p>
            </LegalSection>

            <LegalSection title="8. Datos facilitados por el usuario">
              <p>
                El usuario garantiza que los datos facilitados son veraces,
                exactos y están actualizados, siendo responsable de cualquier
                daño o perjuicio que pudiera ocasionarse como consecuencia del
                incumplimiento de esta obligación.
              </p>
            </LegalSection>

            <LegalSection title="9. Comunicaciones comerciales">
              <p>
                En caso de que el usuario marque la casilla correspondiente, sus
                datos podrán ser utilizados para el envío de comunicaciones
                comerciales relacionadas con los servicios de Grupo Solar Sur.
              </p>
              <p>
                El usuario podrá retirar su consentimiento en cualquier momento
                mediante solicitud al correo electrónico indicado.
              </p>
            </LegalSection>

            <LegalSection title="10. Cambios en la política de privacidad">
              <p>
                GRUPO SOLARSUR ENERGÍA SOLAR SOCIEDAD LIMITADA se reserva el
                derecho a modificar la presente política para adaptarla a
                novedades legislativas o jurisprudenciales.
              </p>
            </LegalSection>

            <LegalSection title="11. Autoridad de control">
              <p>
                Si considera que sus derechos no han sido respetados, puede
                presentar una reclamación ante la Agencia Española de Protección
                de Datos (AEPD):{" "}
                <a
                  className="font-semibold text-blue-800 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-950"
                  href="https://www.aepd.es"
                  rel="noreferrer"
                  target="_blank"
                >
                  www.aepd.es
                </a>
                .
              </p>
            </LegalSection>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
