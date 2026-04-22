"use client";

import Link from "next/link";
import { Check, Settings2, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  personalization: boolean;
  advertising: boolean;
};

type StoredCookieConsent = CookiePreferences & {
  status: "accepted" | "rejected" | "configured";
  updatedAt: string;
};

const STORAGE_KEY = "gruposolarsur-cookie-consent-v1";
const CONSENT_EVENT = "gruposolarsur-cookie-consent";

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  personalization: false,
  advertising: false,
};

const preferenceOptions: Array<{
  key: keyof Omit<CookiePreferences, "necessary">;
  title: string;
  copy: string;
}> = [
  {
    key: "analytics",
    title: "Cookies de análisis",
    copy: "Nos ayudan a entender cómo se utiliza la web para mejorar contenidos y servicios.",
  },
  {
    key: "personalization",
    title: "Cookies de personalización",
    copy: "Permiten recordar algunas preferencias de navegación del usuario.",
  },
  {
    key: "advertising",
    title: "Cookies publicitarias",
    copy: "Permiten gestionar publicidad y mostrar contenidos más relevantes si se implementan.",
  },
];

function persistConsent(consent: StoredCookieConsent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  document.cookie = `gruposolarsur_cookie_consent=${consent.status}; Max-Age=15552000; Path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}

function readStoredConsent() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
}

export function CookieConsent() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const storedConsent = useSyncExternalStore(
    subscribeToConsent,
    readStoredConsent,
    () => "server",
  );
  const isVisible = storedConsent === "";

  function saveConsent(
    status: StoredCookieConsent["status"],
    nextPreferences: CookiePreferences,
  ) {
    const consent: StoredCookieConsent = {
      ...nextPreferences,
      necessary: true,
      status,
      updatedAt: new Date().toISOString(),
    };

    persistConsent(consent);
    setPreferences(nextPreferences);
    setIsConfigOpen(false);
  }

  function acceptAll() {
    saveConsent("accepted", {
      necessary: true,
      analytics: true,
      personalization: true,
      advertising: true,
    });
  }

  function rejectOptional() {
    saveConsent("rejected", DEFAULT_PREFERENCES);
  }

  function savePreferences() {
    saveConsent("configured", preferences);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <section
        aria-label="Aviso de cookies"
        className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/20 bg-blue-950/96 px-4 py-4 text-blue-50 shadow-[0_-18px_60px_rgba(23,37,84,0.28)] backdrop-blur sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.24em] text-yellow-300">
              Aviso de cookies
            </p>
            <p className="mt-2 text-sm leading-6 text-blue-50/82 sm:text-[0.95rem]">
              Utilizamos cookies técnicas necesarias y, con tu consentimiento,
              cookies de análisis, personalización y publicidad para mejorar la
              experiencia de navegación. Puedes aceptar, rechazar o configurar
              tus preferencias.
            </p>
            <Link
              href="/politica-cookies"
              className="mt-2 inline-flex text-sm font-semibold text-yellow-300 underline decoration-yellow-300/45 underline-offset-4 transition hover:text-yellow-200"
            >
              Ver política de cookies
            </Link>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
            <button
              type="button"
              onClick={rejectOptional}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/16 px-5 py-2.5 text-sm font-bold text-blue-50 transition hover:border-white/30 hover:bg-white/8"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => setIsConfigOpen(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-yellow-300/42 px-5 py-2.5 text-sm font-bold text-yellow-200 transition hover:border-yellow-300 hover:bg-yellow-300/10"
            >
              <Settings2 size={16} aria-hidden="true" />
              Configurar
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-yellow-300 px-5 py-2.5 text-sm font-bold !text-blue-950 shadow-[0_14px_32px_rgba(250,204,21,0.24)] transition hover:bg-yellow-200"
            >
              <Check size={16} aria-hidden="true" />
              Aceptar
            </button>
          </div>
        </div>
      </section>

      {isConfigOpen ? (
        <div className="fixed inset-0 z-[80] flex items-end bg-slate-950/54 px-4 py-4 backdrop-blur-sm sm:items-center sm:justify-center">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[1.35rem] border border-slate-200 bg-white p-5 text-slate-700 shadow-[0_28px_80px_rgba(2,8,23,0.28)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.24em] text-amber-500">
                  Preferencias
                </p>
                <h2
                  id="cookie-settings-title"
                  className="mt-2 text-2xl font-extrabold tracking-tight text-blue-950"
                >
                  Configurar cookies
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsConfigOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-blue-950"
                aria-label="Cerrar configuración de cookies"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-blue-950">Cookies técnicas</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Son necesarias para que la web funcione correctamente.
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-900 px-3 py-1 text-xs font-bold text-white">
                    Siempre activas
                  </span>
                </div>
              </div>

              {preferenceOptions.map((option) => (
                <label
                  key={option.key}
                  className="flex cursor-pointer items-start justify-between gap-4 rounded-[1rem] border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <span>
                    <span className="block font-bold text-blue-950">
                      {option.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {option.copy}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences[option.key]}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        [option.key]: event.target.checked,
                      }))
                    }
                    className="mt-1 h-5 w-5 shrink-0 accent-blue-900"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectOptional}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-bold text-blue-950 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Rechazar no necesarias
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-blue-200 px-5 py-2.5 text-sm font-bold text-blue-900 transition hover:border-blue-300 hover:bg-blue-50"
              >
                Guardar configuración
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-900 px-5 py-2.5 text-sm font-bold text-white shadow-[0_14px_32px_rgba(23,37,84,0.18)] transition hover:bg-blue-800"
              >
                Aceptar todas
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
