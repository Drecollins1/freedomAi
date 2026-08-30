import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

/** Heavy grotesque for the hero billboard only — the rest of the page uses Space Grotesk. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${site.name} — Experience AI trading live`,
  description:
    "Gone are the days of spending years trying to figure out trading. Join a free 3-day live AI-assisted trading experience.",
  openGraph: {
    title: `${site.name} — Experience AI trading live`,
    description:
      "Watch a live AI-assisted trading session. Free 3-day experience.",
    type: "website",
  },
};

/** The site is dark-only, so the browser chrome is told to match, not adapt. */
export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="bg-ink text-fg flex min-h-full flex-col">{children}</body>
    </html>
  );
}
