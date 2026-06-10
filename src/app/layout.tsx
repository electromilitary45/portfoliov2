import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
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
  title: "Portfolio Derek Leiva",
  description: "Portfolio personal de desarrollo web, proyectos y blog.",
  openGraph: {
    title: "Portfolio Derek Leiva",
    description: "Portfolio personal de desarrollo web, proyectos y blog.",
    url: "https://portfolio.villalobossebas.me/",
    siteName: "Portfolio Derek Leiva",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Derek Leiva - Preview",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Derek Leiva",
    description: "Portfolio personal de desarrollo web, proyectos y blog.",
    images: [
      {
        url: "/preview.png",
        alt: "Portfolio Derek Leiva - Preview",
      },
    ],
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-neutral-50 text-neutral-950 antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}