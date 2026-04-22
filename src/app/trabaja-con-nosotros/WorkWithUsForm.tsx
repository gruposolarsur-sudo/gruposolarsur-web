"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const departments = ["Administrativo", "Comercial", "Técnico"];
const textOnlyPattern = "[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[\\s'-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*";
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
  const [status, setStatus] = useState<FormStatus | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      cvField?.setCustomValidity(cvError);
      cvField?.reportValidity();
      setStatus({ kind: "error", message: cvError });
      return;
    }

    cvField?.setCustomValidity("");

    const formData = new FormData(form);
    const candidateData = {
      nombre: formData.get("nombre"),
      apellidos: formData.get("apellidos"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
      departamento: formData.get("departamento"),
      cv: formData.get("cv"),
      aceptaPrivacidad: formData.get("acepta_privacidad") === "si",
      aceptaComunicaciones: formData.get("acepta_comunicaciones") === "si",
    };

    console.info("Candidatura preparada para envío", candidateData);
    setStatus({
      kind: "success",
      message:
        "Candidatura preparada correctamente. Gracias por contactar con Grupo SolarSur.",
    });
    form.reset();
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
              Selecciona una opción
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
            title="Escribe un correo válido, por ejemplo nombre@email.com."
            autoComplete="email"
            placeholder="nombre@email.com"
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-blue-950">
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
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25 sm:-mt-12"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-blue-950">
          Subir CV
          <input
            type="file"
            name="cv"
            required
            accept={acceptedCvFormats}
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              const cvError = validateCvFile(file);
              event.currentTarget.setCustomValidity(cvError);
              setStatus(cvError ? { kind: "error", message: cvError } : null);
            }}
            className="flex h-14 w-full items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-blue-900 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25"
          />
          <span className="text-xs font-medium leading-5 text-slate-500">
            Formatos permitidos: PDF, DOCX, ODT, TXT o RTF. Máximo 2 MB.
          </span>
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
            He leído y acepto la{" "}
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

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-blue-900 px-8 py-4 text-base font-extrabold !text-white shadow-[0_18px_40px_rgba(23,37,84,0.22)] transition hover:bg-blue-800 hover:!text-white"
        >
          Enviar candidatura
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
