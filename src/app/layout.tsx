import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Inter, JetBrains_Mono } from "next/font/google";
import { SERVER_CONFIG } from "@/lib/config";
import "./globals.css";

/* Display: tall, condensed, flat-terminalled — architectural rather than
   decorative, which is what keeps it out of "gamer font" territory. */
const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Mono carries every instrument reading, label and address on the site. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = `${SERVER_CONFIG.name} — Minecraft Survival Server`;

export const metadata: Metadata = {
  metadataBase: new URL(SERVER_CONFIG.url),
  title: { default: title, template: `%s — ${SERVER_CONFIG.name}` },
  description: `${SERVER_CONFIG.description} Join ${SERVER_CONFIG.ip} on Minecraft ${SERVER_CONFIG.version}, Java and Bedrock.`,
  keywords: [
    "minecraft server",
    "survival smp",
    "java and bedrock",
    SERVER_CONFIG.name,
    SERVER_CONFIG.ip,
  ],
  applicationName: SERVER_CONFIG.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SERVER_CONFIG.url,
    siteName: SERVER_CONFIG.name,
    title,
    description: SERVER_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SERVER_CONFIG.description,
  },
  icons: {
    icon: [{ url: "/assets/favicon-64.png", sizes: "64x64", type: "image/png" }],
    apple: "/assets/icon-192.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#01040c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
