"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Upload } from "lucide-react";

import { RecaptchaCheckbox } from "@/components/security/RecaptchaCheckbox";

const departments = ["Administrativo", "Comercial", "Tecnico"];
const textOnlyPattern =
  "[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[\\s'-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*";
const emailPattern = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";
const phonePattern = "^(?:\\+34\\s?)?(?:[6-9]\\d{2})(?:\\s?\\d{3}){2}$";
const maxCvSizeBytes = 2 * 1024 * 1024;
const allowedCvExtensions = [".pdf", ".docx", ".odt", ".txt", ".rtf"];
const acceptedCvFormats = [
  ".pdf",
  ".docx",
  ".odt",
  ".txt",
  ".rtf",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.text",
  "text/plain",
  "application/rtf",
  "text/rtf",
].join(",");
const isCaptchaRequired = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

type FormStatus = {
  kind: "success" | "error";
  message: string;
};

function getFileExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot >= 0 ? fileName.slice(lastDot).toLowerCase() : "";
}

function validateCvFile(file: File | undefined) {
  if (!file) {
    return "Adjunta tu CV para enviar la candidatura.";
  }

  if (file.size > maxCvSizeBytes) {
    return "El CV no puede superar los 2 MB.";
  }

  const extension = getFileExtension(file.name);
  if (!allowedCvExtensions.includes(extension)) {
    return "Formato no permitido. Adjunta PDF, DOCX, ODT, TXT o RTF.";
  }

  return "";
}

export function WorkWithUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [selectedCvName, setSelectedCvName] = useState("");
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

    const cvField = form.elements.namedItem("cv") as HTMLInputElement | null;
    const cvFile = cvField?.files?.[0];
    const cvError = validateCvFile(cvFile);

    if (cvError) {
      setStatus({ kind: "error", message: cvError });
      return;
    }

    if (isCaptchaRequired && !captchaToken) {
      setStatus({
        kind: "error",
        message:
          "Completa la verificación de seguridad antes de enviar la candidatura.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const payload = new FormData(form);
      payload.set("startedAt", String(startedAt));
      payload.set("recaptchaToken", captchaToken || "");

      const response = await fetch("/api/work-with-us", {
        method: "POST",
        body: payload,
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          kind: "error",
          message:
            data.message ??
            "No se ha podido enviar la candidatura. Inténtalo de nuevo.",
        });
        return;
      }

      setStatus({
        kind: "success",
        message:
          data.message ??
          "Candidatura enviada correctamente. Gracias por contactar con Grupo SolarSur.",
      });
      form.reset();
      setSelectedCvName("");
      setStartedAt(Date.now());
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
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-blue-950">
          Nombre
          <input
            type="text"
            name="nombre"
            required
            minLength={2}
            pattern={textOnlyPattern}
            title="Escribe solo letras y espacios. Mínimo 2 caracteres."
            autoComplete="given-name"
            placeholder="Tu nombre"
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-blue-950">
          Apellidos
          <input
            type="text"
            name="apellidos"
            required
            minLength={2}
            pattern={textOnlyPattern}
            title="Escribe solo letras y espacios. Mínimo 2 caracteres."
            autoComplete="family-name"
            placeholder="Tus apellidos"
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-blue-950">
          Departamento
          <select
            name="departamento"
            required
            defaultValue=""
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          >
            <option value="" disabled>
              Selecciona una opcion
            </option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-blue-950">
          Email
          <input
            type="email"
            name="email"
            required
            pattern={emailPattern}
            title="Escribe un correo valido, por ejemplo nombre@email.com."
            autoComplete="email"
            placeholder="nombre@email.com"
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          />
        </label>
      </div>

      <div className="grid items-start gap-4 sm:grid-cols-2">
        <label className="grid self-start gap-2 text-sm font-semibold text-blue-950">
          Teléfono
          <input
            type="tel"
            name="telefono"
            required
            pattern={phonePattern}
            title="Escribe un teléfono válido. Ejemplo: 640 292 375 o +34 640 292 375."
            autoComplete="tel"
            inputMode="tel"
            placeholder="640 292 375"
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          />
        </label>

        <div className="grid gap-2 text-sm font-semibold text-blue-950">
          <span>Subir CV</span>
          <label
            htmlFor="cv-upload"
            className="group cursor-pointer rounded-[1.6rem] border-2 border-dashed border-slate-300 bg-slate-50/65 p-4 transition hover:border-slate-400 hover:bg-slate-50 sm:p-5"
          >
            <input
              id="cv-upload"
              type="file"
              name="cv"
              accept={acceptedCvFormats}
              className="sr-only"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                const cvError = validateCvFile(file);
                setSelectedCvName(file?.name || "");
                setStatus(cvError ? { kind: "error", message: cvError } : null);
              }}
            />

            <div className="flex min-h-[8.5rem] flex-col items-center justify-center gap-2.5 text-center">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)] transition group-hover:text-slate-500">
                <Upload size={20} aria-hidden="true" />
              </div>

              <span className="text-lg font-semibold text-slate-700 transition group-hover:text-slate-800">
                Subir archivo
              </span>

              {selectedCvName ? (
                <span className="max-w-full break-words text-sm font-medium text-slate-600">
                  {selectedCvName}
                </span>
              ) : null}

              <p className="text-xs font-medium leading-6 text-slate-400">
                Archivos admitidos: PDF, DOCX, ODT, TXT o RTF. Maximo 2 MB.
              </p>
            </div>
          </label>
        </div>
      </div>

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

      <div className="mt-2 grid gap-3 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="acepta_privacidad"
            value="si"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-blue-900"
          />
          <span>
            He leido y acepto la{" "}
            <Link
              href="/politica-privacidad"
              className="font-semibold text-blue-800 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-950"
            >
              Política de Privacidad
            </Link>
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="acepta_comunicaciones"
            value="si"
            className="mt-1 h-4 w-4 shrink-0 accent-blue-900"
          />
          <span>Acepto recibir comunicaciones</span>
        </label>
      </div>

      <RecaptchaCheckbox
        variant="light"
        theme="light"
        resetSignal={captchaResetSignal}
        onTokenChange={setCaptchaToken}
        tokenValue={captchaToken}
      />

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-8 py-4 text-base font-extrabold !text-white shadow-[0_18px_40px_rgba(23,37,84,0.22)] transition hover:bg-blue-800 hover:!text-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? "Enviando..." : "Enviar candidatura"}
          <ArrowRight size={18} aria-hidden="true" />
        </button>

        <p className="text-sm font-medium text-slate-500">
          Nos pondremos en contacto contigo lo antes posible.
        </p>
      </div>

      {status ? (
        <p
          className={
            status.kind === "success"
              ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
              : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          }
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
