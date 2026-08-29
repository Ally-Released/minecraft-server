import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Inter, JetBrains_Mono } from "next/font/google";
import { SERVER_CONFIG } from "@/lib/config";
import { fetchServerStatus } from "@/lib/status";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import Providers from "./providers";
import "./globals.css";

/* Display: tall, condensed, flat-terminalled — architectural rather than
   decorative, which is what keeps it out of "gamer font" territory. */
const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-big-shoulders",
  display: "swap",
  // Next cannot compute override metrics for this family, so name a condensed
  // fallback ourselves rather than letting it swap in from a full-width sans.
  fallback: ["Arial Narrow", "Haettenschweiler", "sans-serif"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Mono carries every instrument reading, command, price and address. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = `${SERVER_CONFIG.name} — Minecraft Survival Network`;

export const metadata: Metadata = {
  metadataBase: new URL(SERVER_CONFIG.url),
  title: { default: title, template: `%s — ${SERVER_CONFIG.name}` },
  description: `${SERVER_CONFIG.description} Join ${SERVER_CONFIG.ip} on Minecraft ${SERVER_CONFIG.version}, Java and Bedrock.`,
  keywords: [
    "minecraft server",
    "survival smp",
    "lifesteal",
    "box pvp",
    "pvp practice",
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Fetched once for the whole shell so the nav instrument is real on first
  // paint on every route, not just the home page.
  const status = await fetchServerStatus();

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-navy focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Providers>
          <Nav status={status} />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
        <div aria-hidden className="grain-overlay" />
      </body>
    </html>
  );
}
