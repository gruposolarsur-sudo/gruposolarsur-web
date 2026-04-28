const RECAPTCHA_SITEVERIFY_URL =
  "https://www.google.com/recaptcha/api/siteverify";
const VERIFY_TIMEOUT_MS = 8000;

function getRecaptchaSecretKey() {
  return process.env.RECAPTCHA_SECRET_KEY || "";
}

function buildFailure(message, code = "verification-failed") {
  return {
    success: false,
    message,
    code,
  };
}

function normalizeHostname(value) {
  const input = String(value ?? "").trim();
  if (!input) {
    return "";
  }

  try {
    return new URL(`http://${input}`).hostname.toLowerCase();
  } catch {
    return input.toLowerCase();
  }
}

export async function verifyRecaptchaToken({
  token,
  remoteIp,
  expectedHostname,
}) {
  const secret = getRecaptchaSecretKey();

  if (!secret) {
    if (process.env.NODE_ENV !== "production") {
      return {
        success: true,
        hostname: null,
        challengeTs: null,
        skipped: true,
      };
    }

    return buildFailure(
      "La verificación de seguridad no está configurada en este entorno.",
      "missing-secret",
    );
  }

  if (!token) {
    return buildFailure(
      "Completa la verificación de seguridad antes de enviar el formulario.",
      "missing-token",
    );
  }

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);

  if (remoteIp && remoteIp !== "unknown") {
    params.set("remoteip", remoteIp);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);

  try {
    const response = await fetch(RECAPTCHA_SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      signal: controller.signal,
    });

    if (!response.ok) {
      return buildFailure(
        "No se ha podido validar la verificación de seguridad en este momento.",
        "service-unavailable",
      );
    }

    const result = await response.json();

    if (!result.success) {
      const firstErrorCode = Array.isArray(result["error-codes"])
        ? result["error-codes"][0]
        : "verification-failed";

      return buildFailure(
        "No se ha podido validar la verificación de seguridad. Inténtalo de nuevo.",
        firstErrorCode,
      );
    }

    if (process.env.NODE_ENV === "production" && expectedHostname) {
      const actualHostname = normalizeHostname(result.hostname);
      const normalizedExpectedHostname = normalizeHostname(expectedHostname);

      if (!actualHostname || actualHostname !== normalizedExpectedHostname) {
        return buildFailure(
          "La verificación de seguridad no coincide con este dominio.",
          "hostname-mismatch",
        );
      }
    }

    return {
      success: true,
      hostname: typeof result.hostname === "string" ? result.hostname : null,
      challengeTs:
        typeof result.challenge_ts === "string" ? result.challenge_ts : null,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return buildFailure(
        "La validacion de seguridad ha tardado demasiado. Vuelve a intentarlo.",
        "validation-timeout",
      );
    }

    return buildFailure(
      "No se ha podido validar la verificación de seguridad. Inténtalo de nuevo.",
      "internal-error",
    );
  } finally {
    clearTimeout(timeout);
  }
}
