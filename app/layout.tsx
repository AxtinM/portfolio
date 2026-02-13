import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Mohamed Attig | Founder & AI Systems Engineer",
    template: "%s | Mohamed Attig",
  },
  description:
    "Founder of Cortex Kernel and creator of Craftsignal. Backend engineer with 6 years of experience building reliable AI systems with Node.js and Python.",
  keywords: [
    "Mohamed Attig",
    "Cortex Kernel",
    "Craftsignal",
    "AI systems engineer",
    "Backend engineer",
    "Node.js",
    "Python",
    "LangGraph",
    "FastAPI",
    "Portfolio",
  ],
  metadataBase: new URL("https://cortexkernel.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mohamed Attig | Founder & AI Systems Engineer",
    description:
      "Founder-operator building robust AI applications through clean architecture and production-grade backend systems.",
    url: "/",
    siteName: "Mohamed Attig Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile_pic.png",
        width: 1200,
        height: 1200,
        alt: "Mohamed Attig portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Attig | Founder & AI Systems Engineer",
    description:
      "Founder of Cortex Kernel. Creator of Craftsignal. Building resilient AI systems and backend architecture.",
    images: ["/profile_pic.png"],
  },
  icons: {
    icon: "/profile_pic.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
