import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { CookieConsent } from "@/components/layout/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="es" className={`${inter.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full bg-white font-sans text-slate-900 antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
