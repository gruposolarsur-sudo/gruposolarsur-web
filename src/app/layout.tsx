import type { Metadata } from "next";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { FloatingWhatsAppButton } from "@/components/layout/FloatingWhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grupo Solar Sur",
  description: "Soluciones de autoconsumo solar para reducir la factura de la luz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full bg-white font-sans text-slate-900 antialiased">
        {children}
        <FloatingWhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
