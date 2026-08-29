import type { Metadata } from "next";
import "./globals.css";
import { Inter, Outfit } from "next/font/google";
import { SERVER_CONFIG } from "@/lib/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading", weight: ["400","500","600","700","800"] });

export const metadata: Metadata = {
  title: `${SERVER_CONFIG.name} — Minecraft Survival Server`,
  description: SERVER_CONFIG.description,
  keywords: ["minecraft", "server", "survival", "smp", "java", "bedrock", SERVER_CONFIG.name.toLowerCase()],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="64x64" href="/assets/favicon-64.png" />
        <link rel="apple-touch-icon" href="/assets/icon-192.png" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
