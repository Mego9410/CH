import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteBackground } from "@/components/SiteBackground";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chronicle Health",
    template: "%s — Chronicle Health",
  },
  description:
    "Your complete health history, organised and in your hands. I retrieve your full GP record and transform it into a structured personal health record you own and control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${sans.variable} ${serif.variable} h-full antialiased bg-[var(--background)] text-[var(--foreground)]`}
    >
      <body className="relative min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <SiteBackground />
        <div className="relative z-10 flex min-h-full flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
