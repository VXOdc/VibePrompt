import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const vpSans = IBM_Plex_Sans({
  variable: "--font-vp-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vpMono = IBM_Plex_Mono({
  variable: "--font-vp-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "VibePrompt — Prompt library for AI coding agents",
  description:
    "Discover, customize, improve, and copy high-quality prompts for ChatGPT Codex, Cursor, and other AI coding agents.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${vpSans.variable} ${vpMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
