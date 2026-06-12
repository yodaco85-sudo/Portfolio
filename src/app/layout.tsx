import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Yoann Dos Santos Da Costa — Product Builder NoCode & IA",
  description:
    "Portfolio de Yoann Dos Santos Da Costa — Product Builder NoCode & IA. Sites web, automatisations n8n, agents IA. En recherche d'alternance — Alegria.academy.",
  openGraph: {
    title: "Yoann Dos Santos Da Costa — Product Builder NoCode & IA",
    description:
      "De la mer à l'IA : sites web, automatisations n8n, agents IA multi-agents.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
