import type { Metadata } from "next";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ranked profile",
  description: "Live Clasher Network ranked profile, match history, and flex card — synced from Supabase.",
};

export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${archivo.variable} ${archivo.className} lb-hq min-h-screen`}>{children}</div>;
}
