import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Clasher Network | Oceanic Minecraft Survival Server",
  description: "A focused Minecraft SMP for Java and Bedrock. Copy the address, join Discord, and enter the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="icon" type="image/png" sizes="64x64" href="/assets/favicon-64.png" />
        <link rel="apple-touch-icon" href="/assets/icon-192.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#07111f" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
