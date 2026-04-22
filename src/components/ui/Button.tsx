import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
};

export function Button({ children, href = "#contacto" }: ButtonProps) {
  return (
    <a
      className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      href={href}
    >
      {children}
    </a>
  );
}
