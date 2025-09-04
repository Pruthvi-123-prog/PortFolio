import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pruthvi Suvarna K M - Full Stack Developer & Cybersecurity Enthusiast",
  description: "Computer Science Engineering student specializing in full-stack development, cybersecurity, and AI-driven applications. Building secure, scalable digital solutions.",
  keywords: "Pruthvi Suvarna, Full Stack Developer, Cybersecurity, Web Development, React, Next.js, Node.js, TypeScript, Portfolio",
  authors: [{ name: "Pruthvi Suvarna K M" }],
  creator: "Pruthvi Suvarna K M",
  openGraph: {
    title: "Pruthvi Suvarna K M - Full Stack Developer",
    description: "Computer Science Engineering student specializing in full-stack development and cybersecurity",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pruthvi Suvarna K M - Full Stack Developer",
    description: "Computer Science Engineering student specializing in full-stack development and cybersecurity",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
