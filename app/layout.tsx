import type { Metadata } from "next";
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
  title: "Aprende Idiomas — Domina el inglés a tu manera",
  description:
    "Plataforma de aprendizaje de inglés adaptada a tus gustos, tu ritmo y tus capacidades. Listening, writing, speaking y reading en un solo lugar.",
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
