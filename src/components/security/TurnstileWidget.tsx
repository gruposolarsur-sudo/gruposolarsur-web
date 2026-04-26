"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ShieldCheck } from "lucide-react";

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileTheme = "light" | "dark" | "auto";
type TurnstileVariant = "light" | "dark";
type WidgetState = "idle" | "expired" | "error";

type TurnstileWidgetProps = {
  action: string;
  className?: string;
  description?: string;
  onTokenChange: (token: string) => void;
  resetSignal?: number;
  theme?: TurnstileTheme;
  tokenValue?: string;
  title?: string;
  variant?: TurnstileVariant;
};

type TurnstileRenderOptions = {
  action?: string;
  appearance?: "always" | "execute" | "interaction-only";
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  sitekey: string;
  size?: "normal" | "compact" | "flexible";
  theme?: TurnstileTheme;
};

type TurnstileApi = {
  ready: (callback: () => void) => void;
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const resolvedSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

function getVariantClasses(variant: TurnstileVariant) {
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

export function TurnstileWidget({
  action,
  className,
  description = "Antes de enviar, confirma que eres una persona real.",
  onTokenChange,
  resetSignal = 0,
  theme = "light",
  tokenValue = "",
  title = "Verificacion de seguridad",
  variant = "light",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const lastResetSignalRef = useRef(resetSignal);
  const [scriptLoaded, setScriptLoaded] = useState(
    () => typeof window !== "undefined" && Boolean(window.turnstile),
  );
  const [scriptError, setScriptError] = useState(false);
  const [widgetState, setWidgetState] = useState<WidgetState>("idle");
  const styles = getVariantClasses(variant);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.turnstile) {
      return;
    }

    if (!resolvedSiteKey || widgetIdRef.current) {
      return;
    }

    window.turnstile.ready(() => {
      if (!containerRef.current || !window.turnstile || widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: resolvedSiteKey,
        action,
        appearance: "always",
        size: "flexible",
        theme,
        callback(token) {
          setWidgetState("idle");
          onTokenChange(token);
        },
        "expired-callback": () => {
          setWidgetState("expired");
          onTokenChange("");

          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
        },
        "error-callback": () => {
          setWidgetState("error");
          onTokenChange("");
        },
      });
    });
  }, [action, onTokenChange, scriptLoaded, theme]);

  useEffect(() => {
    if (lastResetSignalRef.current === resetSignal) {
      return;
    }

    lastResetSignalRef.current = resetSignal;
    onTokenChange("");

    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [onTokenChange, resetSignal]);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  let helperMessage = "Proteccion activa con Cloudflare Turnstile.";
  let helperClassName = styles.helper;

  if (!resolvedSiteKey) {
    helperMessage =
      process.env.NODE_ENV !== "production"
        ? "La verificacion de seguridad queda desactivada en este entorno local. En produccion seguira activa."
        : "La verificacion de seguridad no esta disponible en este entorno.";
    helperClassName =
      process.env.NODE_ENV !== "production" ? styles.helper : styles.error;
  } else if (scriptError || widgetState === "error") {
    helperMessage =
      "No se ha podido cargar la verificacion. Recarga la pagina o vuelve a intentarlo.";
    helperClassName = styles.error;
  } else if (tokenValue) {
    helperMessage = "Verificacion completada correctamente.";
    helperClassName = styles.success;
  } else if (widgetState === "expired") {
    helperMessage =
      "La verificacion ha caducado. Se ha renovado automaticamente para que puedas continuar.";
    helperClassName = styles.helper;
  }

  return (
    <div
      className={`rounded-[1.5rem] border px-4 py-4 sm:px-5 ${styles.card}${className ? ` ${className}` : ""}`}
    >
      {resolvedSiteKey ? (
        <Script
          src={TURNSTILE_SCRIPT_SRC}
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
        <div ref={containerRef} className="min-h-[72px]" />
      </div>

      <p className={`mt-3 text-sm font-medium leading-6 ${helperClassName}`}>
        {helperMessage}
      </p>
    </div>
  );
}
