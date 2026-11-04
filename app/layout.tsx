import type { Metadata, Viewport } from "next";
import {
  Inter,
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "500", "600"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Jakub - Real Amazon FBA Mentorship",
  description:
    "Direct 1-to-1 mentorship from a full-time Amazon seller. The Elite FBA system, taught personally - not a recycled guru course.",
  // Share image comes from app/opengraph-image.jpg; on Vercel the absolute URL
  // falls back to the production domain until a metadataBase is set.
  openGraph: {
    type: "website",
    siteName: "EliteFBA",
    locale: "en_GB",
    title: "The Elite FBA System - 1-to-1 mentorship with Jakub",
    description:
      "The Amazon FBA system I actually use, taught by me, personally. Small, hand-picked group.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Elite FBA System - 1-to-1 mentorship with Jakub",
    description:
      "The Amazon FBA system I actually use, taught by me, personally. Small, hand-picked group.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-ink">{children}</body>
    </html>
  );
}
