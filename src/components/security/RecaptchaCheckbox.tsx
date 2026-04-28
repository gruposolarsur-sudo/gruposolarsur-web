"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ShieldCheck } from "lucide-react";

const RECAPTCHA_SCRIPT_SRC =
  "https://www.google.com/recaptcha/api.js?render=explicit";

type RecaptchaTheme = "light" | "dark";
type RecaptchaVariant = "light" | "dark";
type WidgetState = "idle" | "expired" | "error";

type RecaptchaCheckboxProps = {
  className?: string;
  description?: string;
  onTokenChange: (token: string) => void;
  resetSignal?: number;
  theme?: RecaptchaTheme;
  title?: string;
  tokenValue?: string;
  variant?: RecaptchaVariant;
};

type RecaptchaRenderOptions = {
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  sitekey: string;
  theme?: RecaptchaTheme;
};

type RecaptchaApi = {
  ready: (callback: () => void) => void;
  render: (container: HTMLElement, options: RecaptchaRenderOptions) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

const resolvedSiteKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

function getVariantClasses(variant: RecaptchaVariant) {
  if (variant === "dark") {
    return {
      card: "border-white/15 bg-white/10",
      icon: "bg-white/12 text-yellow-300",
      title: "text-blue-50",
      description: "text-blue-50/78",
      widgetFrame: "border-white/15 bg-white/95",
      helper: "text-blue-50/70",
      success: "text-emerald-200",
      error: "text-red-200",
    };
  }

  return {
    card: "border-slate-200 bg-slate-50",
    icon: "bg-blue-50 text-blue-900",
    title: "text-blue-950",
    description: "text-slate-500",
    widgetFrame: "border-slate-200 bg-white",
    helper: "text-slate-500",
    success: "text-emerald-700",
    error: "text-red-700",
  };
}

export function RecaptchaCheckbox({
  className,
  description = "Antes de enviar, confirma que eres una persona real.",
  onTokenChange,
  resetSignal = 0,
  theme = "light",
  title = "Verificación de seguridad",
  tokenValue = "",
  variant = "light",
}: RecaptchaCheckboxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const lastResetSignalRef = useRef(resetSignal);
  const [scriptLoaded, setScriptLoaded] = useState(
    () => typeof window !== "undefined" && Boolean(window.grecaptcha),
  );
  const [scriptError, setScriptError] = useState(false);
  const [widgetState, setWidgetState] = useState<WidgetState>("idle");
  const styles = getVariantClasses(variant);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.grecaptcha) {
      return;
    }

    if (!resolvedSiteKey || widgetIdRef.current !== null) {
      return;
    }

    window.grecaptcha.ready(() => {
      if (!containerRef.current || !window.grecaptcha || widgetIdRef.current !== null) {
        return;
      }

      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: resolvedSiteKey,
        theme,
        callback(token) {
          setWidgetState("idle");
          onTokenChange(token);
        },
        "expired-callback": () => {
          setWidgetState("expired");
          onTokenChange("");

          if (widgetIdRef.current !== null && window.grecaptcha) {
            window.grecaptcha.reset(widgetIdRef.current);
          }
        },
        "error-callback": () => {
          setWidgetState("error");
          onTokenChange("");
        },
      });
    });
  }, [onTokenChange, scriptLoaded, theme]);

  useEffect(() => {
    if (lastResetSignalRef.current === resetSignal) {
      return;
    }

    lastResetSignalRef.current = resetSignal;
    onTokenChange("");

    if (widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  }, [onTokenChange, resetSignal]);

  let helperMessage = "Protección activa con Google reCAPTCHA.";
  let helperClassName = styles.helper;

  if (!resolvedSiteKey) {
    helperMessage =
      process.env.NODE_ENV !== "production"
        ? "La verificación de seguridad queda desactivada en este entorno local. En producción seguirá activa."
        : "La verificación de seguridad no está disponible en este entorno.";
    helperClassName =
      process.env.NODE_ENV !== "production" ? styles.helper : styles.error;
  } else if (scriptError || widgetState === "error") {
    helperMessage =
      "No se ha podido cargar la verificación. Recarga la página o vuelve a intentarlo.";
    helperClassName = styles.error;
  } else if (tokenValue) {
    helperMessage = "Verificación completada correctamente.";
    helperClassName = styles.success;
  } else if (widgetState === "expired") {
    helperMessage =
      "La verificación ha caducado. Marca la casilla de nuevo para continuar.";
    helperClassName = styles.helper;
  }

  return (
    <div
      className={`rounded-[1.5rem] border px-4 py-4 sm:px-5 ${styles.card}${className ? ` ${className}` : ""}`}
    >
      {resolvedSiteKey ? (
        <Script
          src={RECAPTCHA_SCRIPT_SRC}
          strategy="afterInteractive"
          onReady={() => {
            setScriptError(false);
            setScriptLoaded(true);
          }}
          onError={() => {
            setScriptError(true);
            setScriptLoaded(false);
            setWidgetState("error");
            onTokenChange("");
          }}
        />
      ) : null}

      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}
        >
          <ShieldCheck size={20} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-extrabold ${styles.title}`}>{title}</p>
          <p className={`mt-1 text-sm leading-6 ${styles.description}`}>
            {description}
          </p>
        </div>
      </div>

      <div
        className={`mt-4 overflow-hidden rounded-[1.25rem] border p-3 ${styles.widgetFrame}`}
      >
        <div ref={containerRef} className="min-h-[78px]" />
      </div>

      <p className={`mt-3 text-sm font-medium leading-6 ${helperClassName}`}>
        {helperMessage}
      </p>
    </div>
  );
}
