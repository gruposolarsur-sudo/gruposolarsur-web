"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CornerDownRight, Images, MessageCircleReply } from "lucide-react";

import { type PublicBlogCommentNode } from "@/lib/blogComments";

import { BlogCommentForm } from "./BlogCommentForm";

type BlogCommentsSectionProps = {
  comments: PublicBlogCommentNode[];
  totalCount: number;
};

type ReplyTarget = {
  id: string;
  authorName: string;
};

function formatCommentDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

type CommentItemProps = {
  comment: PublicBlogCommentNode;
  depth?: number;
  onReply: (replyTo: ReplyTarget) => void;
};

function CommentItem({
  comment,
  depth = 0,
  onReply,
}: CommentItemProps) {
  return (
    <article
      className={
        depth === 0
          ? "rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-6"
          : "rounded-lg border border-blue-100 bg-blue-50/55 p-4 sm:p-5"
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-extrabold text-blue-950">
          {comment.authorWebsite ? (
            <a
              href={comment.authorWebsite}
              rel="noreferrer"
              target="_blank"
              className="transition hover:text-blue-700"
            >
              {comment.authorName}
            </a>
          ) : (
            comment.authorName
          )}
        </h3>
        <span className="text-sm font-semibold text-slate-500">
          {formatCommentDate(comment.createdAt)}
        </span>
      </div>

      <p className="mt-3 whitespace-pre-line text-[0.98rem] leading-7 text-slate-600">
        {comment.comment}
      </p>

      {comment.imageUrls.length > 0 ? (
        <div className="mt-4">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
            <Images size={14} aria-hidden="true" />
            Imagenes adjuntas
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {comment.imageUrls.map((imageUrl) => (
              <a
                key={imageUrl}
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={imageUrl}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 640px) 320px, 100vw"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onReply({ id: comment.id, authorName: comment.authorName })}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-900 transition hover:border-blue-200 hover:bg-blue-100"
        >
          <MessageCircleReply size={15} aria-hidden="true" />
          Responder
        </button>
      </div>

      {comment.replies.length > 0 ? (
        <div className="mt-5 space-y-4 border-l-2 border-blue-100 pl-4 sm:pl-6">
          {comment.replies.map((reply) => (
            <div key={reply.id}>
              <p className="mb-3 inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-blue-600">
                <CornerDownRight size={14} aria-hidden="true" />
                Respuesta
              </p>
              <CommentItem comment={reply} depth={depth + 1} onReply={onReply} />
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function BlogCommentsSection({
  comments,
  totalCount,
}: BlogCommentsSectionProps) {
  const [replyTo, setReplyTo] = useState<ReplyTarget | null>(null);

  const publishedLabel = useMemo(
    () => `${totalCount} ${totalCount === 1 ? "publicado" : "publicados"}`,
    [totalCount],
  );

  function handleReply(replyTarget: ReplyTarget) {
    setReplyTo(replyTarget);

    const formElement = document.getElementById("blog-comment-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-amber-500">
            Comentarios
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-[3.1rem]">
            Conversacion del blog
          </h2>
        </div>
        <span className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-extrabold text-blue-900 shadow-sm">
          {publishedLabel}
        </span>
      </div>

      <div className="mt-10 grid gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white px-5 py-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:px-6">
            <p className="text-base font-semibold leading-7 text-slate-600">
              Todavia no hay comentarios publicados. El primero puede ser el tuyo.
            </p>
          </div>
        )}
      </div>

      <div
        id="blog-comment-form"
        className="mt-10 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_22px_54px_rgba(15,23,42,0.08)] sm:p-8"
      >
        <BlogCommentForm replyTo={replyTo} onCancelReply={() => setReplyTo(null)} />
      </div>
    </div>
  );
}
