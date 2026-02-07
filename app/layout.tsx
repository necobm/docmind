import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocMind - AI Knowledge Assistant",
  description: "B2B SaaS AI knowledge assistant powered by Notion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
