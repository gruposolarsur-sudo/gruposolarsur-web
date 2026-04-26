const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 8000;

function getTurnstileSecretKey() {
  return process.env.TURNSTILE_SECRET_KEY || "";
}

function buildFailure(message, code = "verification-failed") {
  return {
    success: false,
    message,
    code,
  };
}

export async function verifyTurnstileToken({
  token,
  remoteIp,
  expectedAction,
}) {
  const secret = getTurnstileSecretKey();

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
      "La verificacion de seguridad no esta configurada en este entorno.",
      "missing-secret",
    );
  }

  if (!token) {
    return buildFailure(
      "Completa la verificacion de seguridad antes de enviar el formulario.",
      "missing-token",
    );
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  formData.append("idempotency_key", crypto.randomUUID());

  if (remoteIp && remoteIp !== "unknown") {
    formData.append("remoteip", remoteIp);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);

  try {
    const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    if (!response.ok) {
      return buildFailure(
        "No se ha podido validar la verificacion de seguridad en este momento.",
        "service-unavailable",
      );
    }

    const result = await response.json();
    if (!result.success) {
      const firstErrorCode = Array.isArray(result["error-codes"])
        ? result["error-codes"][0]
        : "verification-failed";

      return buildFailure(
        "No se ha podido validar la verificacion de seguridad. Intentalo de nuevo.",
        firstErrorCode,
      );
    }

    // Cloudflare test keys always return action "test", so we allow that in development.
    if (
      expectedAction &&
      result.action &&
      result.action !== expectedAction &&
      result.action !== "test"
    ) {
      return buildFailure(
        "La verificacion de seguridad no coincide con este formulario.",
        "action-mismatch",
      );
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
      "No se ha podido validar la verificacion de seguridad. Intentalo de nuevo.",
      "internal-error",
    );
  } finally {
    clearTimeout(timeout);
  }
}
