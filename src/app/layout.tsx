import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    locale: "es_CL",
    siteName: site.name,
    title,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
