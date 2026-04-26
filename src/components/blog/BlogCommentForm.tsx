"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImagePlus, MessageSquareText, X } from "lucide-react";

import { TurnstileWidget } from "@/components/security/TurnstileWidget";

const LOCAL_STORAGE_KEY = "blog-comment-form";
const COMMENT_MIN_LENGTH = 20;
const MAX_IMAGE_COUNT = 4;
const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type CommentFormState = {
  comment: string;
  authorName: string;
  authorEmail: string;
  authorWebsite: string;
  rememberDetails: boolean;
  company: string;
};

type ReplyTarget = {
  id: string;
  authorName: string;
};

type BlogCommentFormProps = {
  replyTo?: ReplyTarget | null;
  onCancelReply?: () => void;
};

type FormStatus =
  | { kind: "success"; message: string }
  | { kind: "error"; message: string }
  | null;

type ImagePreview = {
  name: string;
  sizeLabel: string;
  url: string;
};

const isCaptchaRequired = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

const initialState: CommentFormState = {
  comment: "",
  authorName: "",
  authorEmail: "",
  authorWebsite: "",
  rememberDetails: false,
  company: "",
};

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function BlogCommentForm({
  replyTo = null,
  onCancelReply,
}: BlogCommentFormProps) {
  const [formState, setFormState] = useState<CommentFormState>(initialState);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaResetSignal, setCaptchaResetSignal] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!saved) {
        return;
      }

      const parsed = JSON.parse(saved) as Partial<CommentFormState>;
      setFormState((current) => ({
        ...current,
        authorName: parsed.authorName ?? "",
        authorEmail: parsed.authorEmail ?? "",
        authorWebsite: parsed.authorWebsite ?? "",
        rememberDetails: Boolean(parsed.rememberDetails),
      }));
    } catch {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const previews = images.map((file) => ({
      name: file.name,
      sizeLabel: formatFileSize(file.size),
      url: URL.createObjectURL(file),
    }));

    setImagePreviews(previews);

    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [images]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = event.currentTarget;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    setFormState((current) => ({
      ...current,
      [target.name]: value,
    }));
  }

  function appendImages(nextFiles: File[]) {
    if (nextFiles.length === 0) {
      return;
    }

    const availableSlots = MAX_IMAGE_COUNT - images.length;
    if (availableSlots <= 0) {
      setStatus({
        kind: "error",
        message: `Ya has adjuntado el maximo de ${MAX_IMAGE_COUNT} imagenes.`,
      });
      return;
    }

    const acceptedFiles: File[] = [];

    for (const file of nextFiles) {
      if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
        setStatus({
          kind: "error",
          message: "Solo se admiten imagenes JPG, PNG o WEBP.",
        });
        continue;
      }

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        setStatus({
          kind: "error",
          message: "Cada imagen debe pesar como maximo 4 MB.",
        });
        continue;
      }

      if (acceptedFiles.length >= availableSlots) {
        setStatus({
          kind: "error",
          message: `Puedes adjuntar hasta ${MAX_IMAGE_COUNT} imagenes por comentario.`,
        });
        break;
      }

      acceptedFiles.push(file);
    }

    if (acceptedFiles.length > 0) {
      setImages((current) => [...current, ...acceptedFiles]);
      setStatus(null);
    }
  }

  function handleImagesChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFiles = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    appendImages(nextFiles);
  }

  function handleCommentPaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    const clipboardFiles = Array.from(event.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);

    if (clipboardFiles.length === 0) {
      return;
    }

    appendImages(clipboardFiles);
  }

  function handleRemoveImage(index: number) {
    setImages((current) => current.filter((_, imageIndex) => imageIndex !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (isCaptchaRequired && !captchaToken) {
      setStatus({
        kind: "error",
        message:
          "Completa la verificacion de seguridad antes de publicar el comentario.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const payload = new FormData();
      payload.set("comment", formState.comment);
      payload.set("authorName", formState.authorName);
      payload.set("authorEmail", formState.authorEmail);
      payload.set("authorWebsite", formState.authorWebsite);
      payload.set("company", formState.company);
      payload.set("startedAt", String(startedAt));
      payload.set("parentId", replyTo?.id ?? "");
      payload.set("turnstileToken", captchaToken || "");

      images.forEach((image) => {
        payload.append("images", image);
      });

      const response = await fetch("/api/blog-comments", {
        method: "POST",
        body: payload,
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          kind: "error",
          message:
            data.message ??
            "No se ha podido enviar el comentario. Intentalo de nuevo.",
        });
        return;
      }

      if (formState.rememberDetails) {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({
            authorName: formState.authorName,
            authorEmail: formState.authorEmail,
            authorWebsite: formState.authorWebsite,
            rememberDetails: true,
          }),
        );
      } else {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      }

      setStatus({
        kind: "success",
        message:
          data.message ??
          "Comentario recibido. Lo revisaremos antes de publicarlo.",
      });
      setFormState((current) => ({
        ...initialState,
        authorName: current.rememberDetails ? current.authorName : "",
        authorEmail: current.rememberDetails ? current.authorEmail : "",
        authorWebsite: current.rememberDetails ? current.authorWebsite : "",
        rememberDetails: current.rememberDetails,
      }));
      setImages([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setStartedAt(Date.now());
      onCancelReply?.();
    } catch {
      setStatus({
        kind: "error",
        message: "No se ha podido conectar con el formulario de comentarios.",
      });
    } finally {
      setCaptchaToken("");
      setCaptchaResetSignal((current) => current + 1);
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
            <MessageSquareText size={21} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-blue-950">
              {replyTo ? "Responder comentario" : "Deja una respuesta"}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Los comentarios se revisan antes de publicarse.
            </p>
          </div>
        </div>

        {replyTo ? (
          <button
            type="button"
            onClick={onCancelReply}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Cancelar
            <X size={16} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {replyTo ? (
        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">
          Respondiendo a <span className="font-extrabold">{replyTo.authorName}</span>.
        </div>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold text-blue-950">
        Comentario
        <textarea
          name="comment"
          value={formState.comment}
          onChange={handleChange}
          onPaste={handleCommentPaste}
          required
          minLength={COMMENT_MIN_LENGTH}
          rows={10}
          placeholder="Escribe tu comentario aquí, añade contexto y, si quieres, acompáñalo con imágenes."
          className="w-full rounded-lg border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20"
        />
      </label>

      <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-blue-950">Imagenes adjuntas</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              JPG, PNG o WEBP. Hasta {MAX_IMAGE_COUNT} imagenes de 4 MB por
              comentario.
            </p>
            <p className="text-sm leading-6 text-slate-500">
              Tambien puedes pegar imagenes directamente en la caja del comentario.
            </p>
          </div>

          <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50">
            <ImagePlus size={16} aria-hidden="true" />
            Añadir imagenes
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImagesChange}
              className="sr-only"
            />
          </label>
        </div>

        {imagePreviews.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {imagePreviews.map((preview, index) => (
              <div
                key={`${preview.name}-${index}`}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image
                    src={preview.url}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 px-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-blue-950">
                      {preview.name}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {preview.sizeLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold text-blue-950">
          Nombre
          <input
            type="text"
            name="authorName"
            value={formState.authorName}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Nombre (obligatorio)"
            className="h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-blue-950">
          Correo electronico
          <input
            type="email"
            name="authorEmail"
            value={formState.authorEmail}
            onChange={handleChange}
            required
            maxLength={120}
            autoComplete="email"
            placeholder="Correo electronico (obligatorio)"
            className="h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-blue-950">
          Web
          <input
            type="url"
            name="authorWebsite"
            value={formState.authorWebsite}
            onChange={handleChange}
            maxLength={200}
            autoComplete="url"
            placeholder="https://tuweb.com"
            className="h-14 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-300/20"
          />
        </label>
      </div>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Empresa
          <input
            type="text"
            name="company"
            value={formState.company}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm font-medium leading-6 text-slate-600">
        <input
          type="checkbox"
          name="rememberDetails"
          checked={formState.rememberDetails}
          onChange={handleChange}
          className="mt-1 h-4 w-4 shrink-0 accent-blue-900"
        />
        <span>
          Guarda mi nombre, correo electronico y web en este navegador para la
          proxima vez que comente.
        </span>
      </label>

      <TurnstileWidget
        action="blog_comment"
        variant="light"
        theme="light"
        resetSignal={captchaResetSignal}
        onTokenChange={setCaptchaToken}
        tokenValue={captchaToken}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm font-medium leading-6 text-slate-500">
          Al publicar aceptas la{" "}
          <Link
            href="/politica-privacidad"
            className="font-semibold text-blue-800 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-950"
          >
            Politica de Privacidad
          </Link>
          .
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-[#23a8e2] px-8 py-4 text-base font-extrabold uppercase tracking-[0.12em] !text-white transition hover:bg-[#1598d1] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting
            ? "Enviando..."
            : replyTo
              ? "Publicar respuesta"
              : "Publicar comentario"}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>

      {status ? (
        <p
          className={
            status.kind === "success"
              ? "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
              : "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          }
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
