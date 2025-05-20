import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RetroGrid } from "@/components/ui/retro-grid";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Attig – Full Stack Developer Portfolio",
  description:
    "Mohamed Attig is a Full Stack Developer specializing in Next.js, Node.js/NestJS, Django/FastAPI, and AI-driven solutions. Explore his professional experience, thoughts on tech, and blog.",
  keywords: [
    "Mohamed Attig",
    "Full Stack Developer",
    "Next.js",
    "Node.js",
    "NestJS",
    "Django",
    "FastAPI",
    "AI",
    "Portfolio",
    "Tech Blog",
    "Software Engineer",
    "Tunisia",
    "React",
    "Web Development",
  ],
  openGraph: {
    title: "Mohamed Attig – Full Stack Developer Portfolio",
    description:
      "Explore Mohamed Attig's professional experience, projects, and insights on technology, history, and philosophy.",
    url: "https://www.linkedin.com/in/mohamed-attig",
    siteName: "Mohamed Attig Portfolio",
    images: [
      {
        url: "/me_bebop_style.png",
        width: 64,
        height: 64,
        alt: "Mohamed Attig Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mohamed Attig – Full Stack Developer Portfolio",
    description:
      "Full Stack Developer specializing in Next.js, Node.js/NestJS, Django/FastAPI, and AI-driven solutions.",
    images: ["/me_bebop_style.png"],
  },
  metadataBase: new URL("https://www.linkedin.com/in/mohamed-attig"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/me_bebop_style.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground relative min-h-screen`}>
      
        {/* 21dev Retro Grid Background */}
        <RetroGrid />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
