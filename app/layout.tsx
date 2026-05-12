import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApréndeIdiomas — Aprende idiomas gratis a tu manera",
  description:
    "Plataforma 100% gratuita para aprender idiomas adaptada a tus gustos, ritmo y capacidades. Sin anuncios, sin pagos ocultos. Escucha, habla, lectura y escritura en un solo lugar.",
  keywords: [
    "aprender idiomas gratis",
    "aprender inglés gratis",
    "plataforma de idiomas",
    "aprendizaje adaptativo",
    "inglés sin pagar",
    "aprende idiomas",
  ],
  openGraph: {
    title: "ApréndeIdiomas — Aprende idiomas gratis a tu manera",
    description:
      "100% gratuito. Sin anuncios. Sin pagos ocultos. Aprende idiomas adaptados a tus intereses y ritmo.",
    type: "website",
    locale: "es_ES",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
