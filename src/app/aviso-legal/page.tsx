import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

const forbiddenUses = [
  "Realizar actividades ilícitas o contrarias a la buena fe.",
  "Difundir contenidos de carácter ilegal, ofensivo o discriminatorio.",
  "Provocar daños en los sistemas físicos y lógicos del sitio web.",
  "Introducir virus informáticos o realizar acciones que puedan alterar el funcionamiento del sitio.",
];

const responsibilityLimits = [
  "Errores u omisiones en los contenidos.",
  "Falta de disponibilidad del sitio web.",
  "Transmisión de virus o programas maliciosos.",
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
  title: "Aviso legal | Grupo Solar Sur",
  description:
    "Información legal sobre el sitio web de Grupo Solarsur Energía Solar, S.L.",
};

export default function LegalNoticePage() {
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
                Aviso legal
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                Información sobre la titularidad, condiciones de uso y
                responsabilidades del sitio web de Grupo Solarsur Energía Solar,
                S.L.
              </p>
            </div>
          </Container>
        </section>

        <Container className="pb-20">
          <article className="mx-auto max-w-4xl space-y-10">
            <LegalSection title="1. Datos identificativos">
              <p>
                En cumplimiento del deber de información recogido en la Ley
                34/2002, de Servicios de la Sociedad de la Información y de
                Comercio Electrónico (LSSI-CE), se informa que el presente sitio
                web es titularidad de:
              </p>

              <dl className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-slate-700 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-blue-950">
                    Denominación social
                  </dt>
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
                <div>
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

            <LegalSection title="2. Objeto">
              <p>
                El presente Aviso Legal regula el acceso, navegación y uso del
                sitio web de Grupo SolarSur, así como las responsabilidades
                derivadas de la utilización de sus contenidos.
              </p>
              <p>
                El acceso a este sitio web atribuye la condición de usuario e
                implica la aceptación plena y sin reservas de todas las
                disposiciones incluidas en este Aviso Legal.
              </p>
            </LegalSection>

            <LegalSection title="3. Condiciones de uso">
              <p>
                El usuario se compromete a hacer un uso adecuado de los
                contenidos y servicios del sitio web, y a no emplearlos para:
              </p>
              <LegalList items={forbiddenUses} />
            </LegalSection>

            <LegalSection title="4. Propiedad intelectual e industrial">
              <p>
                Todos los contenidos del sitio web (textos, imágenes, logotipos,
                diseño, estructura, código fuente, etc.) son titularidad de Grupo
                SolarSur o de terceros autorizados, y están protegidos por la
                normativa de propiedad intelectual e industrial.
              </p>
              <p>
                Queda prohibida su reproducción, distribución o modificación sin
                autorización expresa del titular.
              </p>
            </LegalSection>

            <LegalSection title="5. Responsabilidad">
              <p>Grupo SolarSur no se responsabiliza de:</p>
              <LegalList items={responsibilityLimits} />
              <p>
                No obstante, se adoptan todas las medidas necesarias para
                garantizar el correcto funcionamiento y seguridad del sitio.
              </p>
            </LegalSection>

            <LegalSection title="6. Enlaces externos">
              <p>
                Este sitio web puede contener enlaces a páginas externas, sobre
                las cuales Grupo SolarSur no tiene control ni asume
                responsabilidad alguna respecto a sus contenidos o políticas de
                privacidad.
              </p>
            </LegalSection>

            <LegalSection title="7. Protección de datos">
              <p>
                El tratamiento de los datos personales se regirá por lo
                establecido en la{" "}
                <Link
                  className="font-semibold text-blue-800 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-950"
                  href="/politica-privacidad"
                >
                  Política de Privacidad
                </Link>{" "}
                del sitio web, elaborada conforme al Reglamento General de
                Protección de Datos y la Ley Orgánica de Protección de Datos y
                Garantía de Derechos Digitales.
              </p>
            </LegalSection>

            <LegalSection title="8. Legislación aplicable">
              <p>
                La relación entre el usuario y el titular del sitio web se
                regirá por la normativa vigente en España.
              </p>
              <p>
                Para la resolución de cualquier conflicto que pudiera surgir, las
                partes se someterán a los Juzgados y Tribunales de Sevilla.
              </p>
            </LegalSection>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
