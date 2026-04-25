import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type BlogCommentStatus = "pending" | "approved" | "rejected";

export type StoredBlogComment = {
  id: string;
  comment: string;
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  createdAt: string;
  source: "blog-form";
  status: BlogCommentStatus;
  parentId?: string;
  imageUrls?: string[];
};

export type PublicBlogComment = {
  id: string;
  comment: string;
  authorName: string;
  authorWebsite?: string;
  createdAt: string;
  parentId?: string;
  imageUrls: string[];
};

export type PublicBlogCommentNode = PublicBlogComment & {
  replies: PublicBlogCommentNode[];
};

const BLOG_COMMENTS_FILE = path.join(process.cwd(), "data", "blog-comments.json");

function stripHtmlTags(value: string) {
  return value.replace(/<[^>]*>/g, " ");
}

export function sanitizeText(value: string) {
  return stripHtmlTags(value)
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeComment(value: string) {
  return stripHtmlTags(value)
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, " ")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(value);
}

export function normalizeWebsite(value: string) {
  const sanitized = sanitizeText(value);
  if (!sanitized) {
    return "";
  }

  try {
    const parsed = new URL(sanitized);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "";
    }

    return parsed.toString();
  } catch {
    return "";
  }
}

async function ensureCommentsFile() {
  await mkdir(path.dirname(BLOG_COMMENTS_FILE), { recursive: true });

  try {
    await readFile(BLOG_COMMENTS_FILE, "utf8");
  } catch {
    await writeFile(BLOG_COMMENTS_FILE, "[]\n", "utf8");
  }
}

async function readCommentsFile() {
  await ensureCommentsFile();

  try {
    const raw = await readFile(BLOG_COMMENTS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredBlogComment[]) : [];
  } catch {
    return [];
  }
}

async function writeCommentsFile(comments: StoredBlogComment[]) {
  await ensureCommentsFile();
  await writeFile(BLOG_COMMENTS_FILE, `${JSON.stringify(comments, null, 2)}\n`, "utf8");
}

function toPublicComment(comment: StoredBlogComment): PublicBlogComment {
  return {
    id: comment.id,
    comment: comment.comment,
    authorName: comment.authorName,
    authorWebsite: comment.authorWebsite,
    createdAt: comment.createdAt,
    parentId: comment.parentId,
    imageUrls: comment.imageUrls ?? [],
  };
}

export async function getStoredBlogCommentById(id: string) {
  const comments = await readCommentsFile();
  return comments.find((comment) => comment.id === id);
}

export async function getApprovedBlogCommentsThread() {
  const comments = await readCommentsFile();

  const approved = comments
    .filter((comment) => comment.status === "approved")
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map(toPublicComment);

  const commentsById = new Map<string, PublicBlogCommentNode>();

  for (const comment of approved) {
    commentsById.set(comment.id, {
      ...comment,
      replies: [],
    });
  }

  const roots: PublicBlogCommentNode[] = [];

  for (const comment of approved) {
    const node = commentsById.get(comment.id);
    if (!node) {
      continue;
    }

    if (comment.parentId) {
      const parent = commentsById.get(comment.parentId);
      if (parent) {
        parent.replies.push(node);
        continue;
      }
    }

    roots.push(node);
  }

  return {
    comments: roots,
    totalCount: approved.length,
  };
}

export async function createPendingBlogComment(input: {
  comment: string;
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  parentId?: string;
  imageUrls?: string[];
}) {
  const comments = await readCommentsFile();

  const nextComment: StoredBlogComment = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: "blog-form",
    status: "pending",
    ...input,
  };

  comments.push(nextComment);
  await writeCommentsFile(comments);

  return nextComment;
}
