import type { Metadata } from "next";
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
