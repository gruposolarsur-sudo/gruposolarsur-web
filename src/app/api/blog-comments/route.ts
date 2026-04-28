import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

import {
  createPendingBlogComment,
  getStoredBlogCommentById,
  isValidEmail,
  normalizeWebsite,
  sanitizeComment,
  sanitizeText,
} from "@/lib/blogComments";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

export const runtime = "nodejs";

const COMMENT_MIN_LENGTH = 20;
const COMMENT_HARD_MAX_LENGTH = 12000;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 80;
const EMAIL_MAX_LENGTH = 120;
const WEBSITE_MAX_LENGTH = 200;
const MIN_FILL_TIME_MS = 4000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 4;
const MAX_IMAGE_COUNT = 4;
const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_IMAGE_SIZE_BYTES = 12 * 1024 * 1024;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isSameOriginRequest(request: Request) {
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

function isRateLimited(ip: string) {
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

function detectImageType(bytes: Uint8Array) {
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { extension: "png", mime: "image/png" as const };
  }

  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { extension: "jpg", mime: "image/jpeg" as const };
  }

  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { extension: "webp", mime: "image/webp" as const };
  }

  return null;
}

async function saveUploadedImages(files: File[]) {
  if (files.length === 0) {
    return [];
  }

  if (files.length > MAX_IMAGE_COUNT) {
    throw new Error(`Puedes adjuntar hasta ${MAX_IMAGE_COUNT} imagenes por comentario.`);
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_TOTAL_IMAGE_SIZE_BYTES) {
    throw new Error("El total de imagenes supera el tamano permitido.");
  }

  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const targetDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "blog-comments",
    year,
    month,
  );
  const publicBasePath = `/uploads/blog-comments/${year}/${month}`;
  const writtenFiles: string[] = [];
  const publicUrls: string[] = [];

  await mkdir(targetDir, { recursive: true });

  try {
    for (const file of files) {
      if (file.size === 0) {
        continue;
      }

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        throw new Error("Cada imagen debe pesar como máximo 4 MB.");
      }

      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const detected = detectImageType(bytes);

      if (!detected) {
        throw new Error("Solo se admiten imagenes JPG, PNG o WEBP.");
      }

      if (file.type && file.type !== detected.mime) {
        throw new Error("Una de las imagenes no coincide con un formato valido.");
      }

      const fileName = `${crypto.randomUUID()}.${detected.extension}`;
      const absolutePath = path.join(targetDir, fileName);

      await writeFile(absolutePath, Buffer.from(arrayBuffer));
      writtenFiles.push(absolutePath);
      publicUrls.push(`${publicBasePath}/${fileName}`);
    }

    return publicUrls;
  } catch (error) {
    await Promise.all(
      writtenFiles.map((filePath) =>
        unlink(filePath).catch(() => {
          return;
        }),
      ),
    );

    throw error;
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { message: "No se ha podido validar el origen de la solicitud." },
      { status: 403 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Has enviado demasiados comentarios en poco tiempo." },
      { status: 429 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "No se ha podido procesar el comentario." },
      { status: 400 },
    );
  }

  const honeypot = typeof formData.get("company") === "string"
    ? String(formData.get("company") ?? "").trim()
    : "";

  if (honeypot) {
    return NextResponse.json(
      { message: "Comentario recibido. Se revisara antes de publicarse." },
      { status: 200 },
    );
  }

  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json(
      { message: "No se ha podido validar el envio del comentario." },
      { status: 400 },
    );
  }

  const comment = sanitizeComment(String(formData.get("comment") ?? ""));
  const authorName = sanitizeText(String(formData.get("authorName") ?? ""));
  const authorEmail = sanitizeText(String(formData.get("authorEmail") ?? "")).toLowerCase();
  const authorWebsiteRaw = String(formData.get("authorWebsite") ?? "");
  const parentId = sanitizeText(String(formData.get("parentId") ?? ""));
  const recaptchaToken = sanitizeText(String(formData.get("recaptchaToken") ?? ""));
  const files = formData
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (comment.length < COMMENT_MIN_LENGTH || comment.length > COMMENT_HARD_MAX_LENGTH) {
    return NextResponse.json(
      {
        message:
          comment.length < COMMENT_MIN_LENGTH
            ? `El comentario debe tener al menos ${COMMENT_MIN_LENGTH} caracteres.`
            : "El comentario es demasiado largo para publicarlo de una sola vez.",
      },
      { status: 400 },
    );
  }

  if (authorName.length < NAME_MIN_LENGTH || authorName.length > NAME_MAX_LENGTH) {
    return NextResponse.json(
      {
        message: `El nombre debe tener entre ${NAME_MIN_LENGTH} y ${NAME_MAX_LENGTH} caracteres.`,
      },
      { status: 400 },
    );
  }

  if (authorEmail.length === 0 || authorEmail.length > EMAIL_MAX_LENGTH || !isValidEmail(authorEmail)) {
    return NextResponse.json(
      { message: "Introduce un correo electrónico válido." },
      { status: 400 },
    );
  }

  if (authorWebsiteRaw.length > WEBSITE_MAX_LENGTH) {
    return NextResponse.json(
      { message: "La web no puede superar los 200 caracteres." },
      { status: 400 },
    );
  }

  const authorWebsite = normalizeWebsite(authorWebsiteRaw);
  if (authorWebsiteRaw.trim() && !authorWebsite) {
    return NextResponse.json(
      { message: "La direccion web debe empezar por http:// o https://." },
      { status: 400 },
    );
  }

  if (parentId) {
    const parentComment = await getStoredBlogCommentById(parentId);

    if (!parentComment || parentComment.status !== "approved") {
      return NextResponse.json(
        { message: "El comentario al que respondes ya no esta disponible." },
        { status: 400 },
      );
    }
  }

  const recaptchaResult = await verifyRecaptchaToken({
    token: recaptchaToken,
    remoteIp: ip,
    expectedHostname: request.headers.get("host") || "",
  });

  if (!recaptchaResult.success) {
    return NextResponse.json(
      {
        message:
          "message" in recaptchaResult
            ? recaptchaResult.message
            : "No se ha podido validar la verificación de seguridad.",
      },
      { status: 400 },
    );
  }

  let imageUrls: string[] = [];

  try {
    imageUrls = await saveUploadedImages(files);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "No se han podido guardar las imagenes adjuntas.",
      },
      { status: 400 },
    );
  }

  await createPendingBlogComment({
    comment,
    authorName,
    authorEmail,
    authorWebsite: authorWebsite || undefined,
    parentId: parentId || undefined,
    imageUrls,
  });

  return NextResponse.json(
    {
      message:
        "Comentario recibido. Lo revisaremos antes de publicarlo para evitar spam.",
    },
    { status: 201 },
  );
}
