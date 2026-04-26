"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TurnstileWidget } from "@/components/security/TurnstileWidget";

type ContactStudyFormProps = {
  discoveryOptions: string[];
  interestOptions: string[];
};

type FormStatus =
  | { kind: "success"; message: string }
  | { kind: "error"; message: string }
  | null;

const isCaptchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

export function ContactStudyForm({
  discoveryOptions,
  interestOptions,
}: ContactStudyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaResetSignal, setCaptchaResetSignal] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (isCaptchaRequired && !captchaToken) {
      setStatus({
        kind: "error",
        message:
          "Completa la verificacion de seguridad antes de enviar la solicitud.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const payload = Object.fromEntries(new FormData(form).entries());

      const response = await fetch("/api/contact-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          startedAt,
          turnstileToken: captchaToken || "",
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          kind: "error",
          message:
            data.message ??
            "No se ha podido enviar la solicitud. Intentalo de nuevo.",
        });
        return;
      }

      form.reset();
      setStartedAt(Date.now());
      setStatus({
        kind: "success",
        message:
          data.message ??
          "Solicitud enviada correctamente. Te responderemos lo antes posible.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "No se ha podido conectar con el formulario en este momento.",
      });
    } finally {
      setCaptchaToken("");
      setCaptchaResetSignal((current) => current + 1);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="contents">
          <label className="grid gap-2 text-sm font-medium text-blue-50">
            Nombre
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              required
              minLength={2}
              maxLength={80}
              autoComplete="given-name"
              className="h-14 w-full rounded-2xl border border-white/15 bg-white/96 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-blue-50">
            Apellidos
            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              required
              minLength={2}
              maxLength={120}
              autoComplete="family-name"
              className="h-14 w-full rounded-2xl border border-white/15 bg-white/96 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
            />
          </label>
        </div>

        <div className="contents">
          <label className="grid gap-2 text-sm font-medium text-blue-50">
            Telefono de contacto
            <input
              type="tel"
              name="telefono"
              placeholder="651 194 097"
              required
              minLength={9}
              maxLength={25}
              autoComplete="tel"
              className="h-14 w-full rounded-2xl border border-white/15 bg-white/96 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-blue-50">
            Correo electronico
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              required
              maxLength={120}
              autoComplete="email"
              className="h-14 w-full rounded-2xl border border-white/15 bg-white/96 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
            />
          </label>
        </div>

        <div className="contents">
          <label className="grid gap-2 text-sm font-medium text-blue-50">
            Poblacion
            <input
              type="text"
              name="poblacion"
              placeholder="Poblacion"
              required
              minLength={2}
              maxLength={100}
              autoComplete="address-level2"
              className="h-14 w-full rounded-2xl border border-white/15 bg-white/96 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-blue-50">
            Provincia
            <input
              type="text"
              name="provincia"
              placeholder="Provincia"
              required
              minLength={2}
              maxLength={100}
              autoComplete="address-level1"
              className="h-14 w-full rounded-2xl border border-white/15 bg-white/96 px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-blue-50 sm:col-span-2">
          Como nos has conocido <span className="text-yellow-300">*</span>
          <select
            name="como_nos_has_conocido"
            defaultValue=""
            required
            className="h-14 w-full rounded-2xl border border-white/15 bg-white/96 px-4 text-base text-slate-900 outline-none transition focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          >
            <option value="" disabled>
              Selecciona una opcion
            </option>
            {discoveryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-blue-50 sm:col-span-2">
          Estoy interesado/a <span className="text-yellow-300">*</span>
          <select
            name="interes"
            defaultValue=""
            required
            className="h-14 w-full rounded-2xl border border-white/15 bg-white/96 px-4 text-base text-slate-900 outline-none transition focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          >
            <option value="" disabled>
              Selecciona una opcion
            </option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-blue-50 sm:col-span-2">
          Comentarios
          <textarea
            name="comentarios"
            rows={4}
            maxLength={3000}
            placeholder="Cuentanos si es para vivienda, negocio, si te interesa financiacion o cualquier detalle util."
            className="w-full rounded-[1.5rem] border border-white/15 bg-white/96 px-4 py-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          />
        </label>

        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label>
            Empresa
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <TurnstileWidget
          action="contact_request"
          variant="dark"
          theme="light"
          resetSignal={captchaResetSignal}
          onTokenChange={setCaptchaToken}
          tokenValue={captchaToken}
          className="sm:col-span-2"
        />

        <label className="flex items-start gap-3 rounded-[1.5rem] border border-white/15 bg-white/10 px-4 py-4 text-sm font-medium leading-6 text-blue-50 sm:col-span-2">
          <input
            type="checkbox"
            name="acepta_politica_privacidad"
            value="Si"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-yellow-300"
          />
          <span>
            Acepto la{" "}
            <Link
              href="/politica-privacidad"
              className="font-semibold text-yellow-200 underline decoration-yellow-200/50 underline-offset-4 transition hover:text-yellow-100"
            >
              politica de privacidad
            </Link>{" "}
            <span className="text-yellow-300">*</span>
          </span>
        </label>

        <div className="flex justify-start sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-yellow-200/90 bg-yellow-300 px-7 py-4 text-base font-bold !text-blue-950 shadow-[0_18px_40px_rgba(250,204,21,0.28)] transition hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>

      {status ? (
        <p
          className={
            status.kind === "success"
              ? "mt-5 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold leading-6 text-emerald-700"
              : "mt-5 rounded-[1.5rem] border border-red-200 bg-red-50 px-4 py-4 text-sm font-semibold leading-6 text-red-700"
          }
        >
          {status.message}
        </p>
      ) : (
        <div className="mt-5 rounded-[1.5rem] border border-white/15 bg-white/10 px-4 py-4 text-sm font-medium leading-6 text-blue-50/82">
          Al enviar el formulario recibimos tu solicitud directamente en
          nuestro correo y te responderemos lo antes posible.
        </div>
      )}
    </>
  );
}
