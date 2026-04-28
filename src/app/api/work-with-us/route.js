import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { verifyRecaptchaToken } from "@/lib/recaptcha";

const MIN_FILL_TIME_MS = 4000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 4;
const MAX_CV_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_CV_EXTENSIONS = new Set([".pdf", ".docx", ".odt", ".txt", ".rtf"]);
const ALLOWED_CV_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.text",
  "text/plain",
  "application/rtf",
  "text/rtf",
]);

const rateLimitStore = new Map();

function sanitizeText(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
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

function getFileExtension(fileName) {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot >= 0 ? fileName.slice(lastDot).toLowerCase() : "";
}

function buildEmailContent(data) {
  const fullName = `${data.nombre} ${data.apellidos}`.trim();

  const text = [
    "Nueva candidatura desde la web de Grupo SolarSur",
    "",
    `Nombre: ${fullName}`,
    `Departamento: ${data.departamento}`,
    `Teléfono: ${data.telefono}`,
    `Correo: ${data.email}`,
    `Acepta privacidad: ${data.aceptaPrivacidad ? "Si" : "No"}`,
    `Acepta comunicaciones: ${data.aceptaComunicaciones ? "Si" : "No"}`,
    `CV adjunto: ${data.cvFileName}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.6">
      <h2 style="margin:0 0 16px;color:#1e3a8a">Nueva candidatura desde la web</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        <tbody>
          <tr><td style="padding:8px 0;font-weight:700">Nombre</td><td style="padding:8px 0">${fullName}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Departamento</td><td style="padding:8px 0">${data.departamento}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Teléfono</td><td style="padding:8px 0">${data.telefono}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Correo</td><td style="padding:8px 0">${data.email}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Acepta privacidad</td><td style="padding:8px 0">${data.aceptaPrivacidad ? "Si" : "No"}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Acepta comunicaciones</td><td style="padding:8px 0">${data.aceptaComunicaciones ? "Si" : "No"}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">CV adjunto</td><td style="padding:8px 0">${data.cvFileName}</td></tr>
        </tbody>
      </table>
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
      { message: "Has enviado demasiadas candidaturas en poco tiempo." },
      { status: 429 },
    );
  }

  let formData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "No se ha podido procesar la candidatura." },
      { status: 400 },
    );
  }

  const honeypot = typeof formData.get("company") === "string"
    ? String(formData.get("company") ?? "").trim()
    : "";

  if (honeypot) {
    return NextResponse.json(
      { message: "Candidatura recibida. La revisaremos en breve." },
      { status: 200 },
    );
  }

  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json(
      { message: "No se ha podido validar el envio del formulario." },
      { status: 400 },
    );
  }

  const nombre = sanitizeText(String(formData.get("nombre") ?? ""));
  const apellidos = sanitizeText(String(formData.get("apellidos") ?? ""));
  const departamento = sanitizeText(String(formData.get("departamento") ?? ""));
  const email = sanitizeText(String(formData.get("email") ?? "")).toLowerCase();
  const telefono = sanitizeText(String(formData.get("telefono") ?? ""));
  const privacidad = sanitizeText(String(formData.get("acepta_privacidad") ?? ""));
  const aceptaComunicaciones =
    sanitizeText(String(formData.get("acepta_comunicaciones") ?? "")) === "si";
  const recaptchaToken = sanitizeText(String(formData.get("recaptchaToken") ?? ""));
  const cv = formData.get("cv");

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

  if (!departamento) {
    return NextResponse.json(
      { message: "Selecciona un departamento de interés." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email) || email.length > 120) {
    return NextResponse.json(
      { message: "Introduce un correo electrónico válido." },
      { status: 400 },
    );
  }

  if (telefono.length < 9 || telefono.length > 25) {
    return NextResponse.json(
      { message: "Introduce un teléfono de contacto válido." },
      { status: 400 },
    );
  }

  if (!privacidad) {
    return NextResponse.json(
      { message: "Debes aceptar la política de privacidad." },
      { status: 400 },
    );
  }

  if (!(cv instanceof File) || cv.size === 0) {
    return NextResponse.json(
      { message: "Adjunta tu CV para enviar la candidatura." },
      { status: 400 },
    );
  }

  if (cv.size > MAX_CV_SIZE_BYTES) {
    return NextResponse.json(
      { message: "El CV no puede superar los 2 MB." },
      { status: 400 },
    );
  }

  const cvExtension = getFileExtension(cv.name);
  if (!ALLOWED_CV_EXTENSIONS.has(cvExtension)) {
    return NextResponse.json(
      { message: "Formato no permitido. Adjunta PDF, DOCX, ODT, TXT o RTF." },
      { status: 400 },
    );
  }

  if (cv.type && !ALLOWED_CV_MIME_TYPES.has(cv.type)) {
    return NextResponse.json(
      { message: "El archivo adjunto no coincide con un formato permitido." },
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
  const toAddress = process.env.WORK_WITH_US_TO_EMAIL || "rrhh@gruposolarsur.com";
  const subject = `Nueva candidatura web - ${departamento}`;
  const content = buildEmailContent({
    nombre,
    apellidos,
    departamento,
    telefono,
    email,
    aceptaPrivacidad: Boolean(privacidad),
    aceptaComunicaciones,
    cvFileName: cv.name,
  });

  try {
    const arrayBuffer = await cv.arrayBuffer();

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject,
      text: content.text,
      html: content.html,
      attachments: [
        {
          filename: cv.name,
          content: Buffer.from(arrayBuffer),
          contentType: cv.type || undefined,
        },
      ],
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "No se ha podido enviar la candidatura en este momento. Inténtalo de nuevo.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      message:
        "Candidatura enviada correctamente. Gracias por contactar con Grupo SolarSur.",
    },
    { status: 201 },
  );
}
