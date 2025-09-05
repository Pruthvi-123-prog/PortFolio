"use client";

import "./globals.css";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Don't add any dynamic classes here that might change between
  // server and client rendering to avoid hydration mismatches
  
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased overflow-x-hidden min-h-screen w-full relative bg-background">
        <main className="relative min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
