import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { verifyRecaptchaToken } from "@/lib/recaptcha";

const MIN_FILL_TIME_MS = 4000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map();

function sanitizeText(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeMultilineText(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, " ")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(value);
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isSameOriginRequest(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return true;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

function getTransporterConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure =
    process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  };
}

function buildEmailContent(data) {
  const fullName = `${data.nombre} ${data.apellidos}`.trim();

  const text = [
    "Nueva solicitud de estudio desde la web de Grupo SolarSur",
    "",
    `Nombre: ${fullName}`,
    `Teléfono: ${data.telefono}`,
    `Correo: ${data.email}`,
    `Población: ${data.poblacion}`,
    `Provincia: ${data.provincia}`,
    `Cómo nos ha conocido: ${data.comoNosHaConocido}`,
    `Interés: ${data.interes}`,
    "",
    "Comentarios:",
    data.comentarios || "Sin comentarios adicionales.",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.6">
      <h2 style="margin:0 0 16px;color:#1e3a8a">Nueva solicitud de estudio desde la web</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        <tbody>
          <tr><td style="padding:8px 0;font-weight:700">Nombre</td><td style="padding:8px 0">${fullName}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Teléfono</td><td style="padding:8px 0">${data.telefono}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Correo</td><td style="padding:8px 0">${data.email}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Población</td><td style="padding:8px 0">${data.poblacion}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Provincia</td><td style="padding:8px 0">${data.provincia}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Cómo nos ha conocido</td><td style="padding:8px 0">${data.comoNosHaConocido}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Interés</td><td style="padding:8px 0">${data.interes}</td></tr>
        </tbody>
      </table>
      <div style="margin-top:20px;padding:16px;border:1px solid #dbeafe;border-radius:16px;background:#f8fbff">
        <p style="margin:0 0 8px;font-weight:700;color:#1e3a8a">Comentarios</p>
        <p style="margin:0;white-space:pre-line">${data.comentarios || "Sin comentarios adicionales."}</p>
      </div>
    </div>
  `;

  return { text, html };
}

export const runtime = "nodejs";

export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { message: "No se ha podido validar el origen de la solicitud." },
      { status: 403 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Has enviado demasiadas solicitudes en poco tiempo." },
      { status: 429 },
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "No se ha podido procesar la solicitud." },
      { status: 400 },
    );
  }

  const honeypot = sanitizeText(payload.company);
  if (honeypot) {
    return NextResponse.json(
      { message: "Solicitud recibida. La revisaremos en breve." },
      { status: 200 },
    );
  }

  const startedAt = Number(payload.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json(
      { message: "No se ha podido validar el envio del formulario." },
      { status: 400 },
    );
  }

  const nombre = sanitizeText(payload.nombre);
  const apellidos = sanitizeText(payload.apellidos);
  const telefono = sanitizeText(payload.telefono);
  const email = sanitizeText(payload.email).toLowerCase();
  const poblacion = sanitizeText(payload.poblacion);
  const provincia = sanitizeText(payload.provincia);
  const comoNosHaConocido = sanitizeText(payload.como_nos_has_conocido);
  const interes = sanitizeText(payload.interes);
  const comentarios = sanitizeMultilineText(payload.comentarios);
  const privacidad = sanitizeText(payload.acepta_politica_privacidad);
  const recaptchaToken = sanitizeText(payload.recaptchaToken);

  if (nombre.length < 2 || nombre.length > 80) {
    return NextResponse.json(
      { message: "El nombre debe tener entre 2 y 80 caracteres." },
      { status: 400 },
    );
  }

  if (apellidos.length < 2 || apellidos.length > 120) {
    return NextResponse.json(
      { message: "Los apellidos deben tener entre 2 y 120 caracteres." },
      { status: 400 },
    );
  }

  if (telefono.length < 9 || telefono.length > 25) {
    return NextResponse.json(
      { message: "Introduce un teléfono de contacto válido." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email) || email.length > 120) {
    return NextResponse.json(
      { message: "Introduce un correo electrónico válido." },
      { status: 400 },
    );
  }

  if (poblacion.length < 2 || poblacion.length > 100) {
    return NextResponse.json(
      { message: "La población debe tener entre 2 y 100 caracteres." },
      { status: 400 },
    );
  }

  if (provincia.length < 2 || provincia.length > 100) {
    return NextResponse.json(
      { message: "La provincia debe tener entre 2 y 100 caracteres." },
      { status: 400 },
    );
  }

  if (!comoNosHaConocido || !interes) {
    return NextResponse.json(
      { message: "Selecciona cómo nos has conocido y el servicio de interés." },
      { status: 400 },
    );
  }

  if (!privacidad) {
    return NextResponse.json(
      { message: "Debes aceptar la política de privacidad." },
      { status: 400 },
    );
  }

  if (comentarios.length > 3000) {
    return NextResponse.json(
      { message: "Los comentarios no pueden superar los 3000 caracteres." },
      { status: 400 },
    );
  }

  const recaptchaResult = await verifyRecaptchaToken({
    token: recaptchaToken,
    remoteIp: ip,
    expectedHostname: request.headers.get("host") || "",
  });

  if (!recaptchaResult.success) {
    return NextResponse.json(
      { message: recaptchaResult.message },
      { status: 400 },
    );
  }

  const transporterConfig = getTransporterConfig();
  if (!transporterConfig) {
    return NextResponse.json(
      {
        message:
          "El formulario aun no tiene configurado el servicio de envio de correo.",
      },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport(transporterConfig);
  const fromAddress =
    process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@gruposolarsur.com";
  const toAddress = process.env.CONTACT_TO_EMAIL || "calidad@gruposolarsur.com";
  const subject = `Nueva solicitud web - ${interes}`;
  const content = buildEmailContent({
    nombre,
    apellidos,
    telefono,
    email,
    poblacion,
    provincia,
    comoNosHaConocido,
    interes,
    comentarios,
  });

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject,
      text: content.text,
      html: content.html,
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "No se ha podido enviar el correo en este momento. Intentalo de nuevo.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      message:
        "Solicitud enviada correctamente. Te responderemos lo antes posible.",
    },
    { status: 201 },
  );
}
