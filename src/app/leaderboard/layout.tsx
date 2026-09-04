import type { Metadata } from "next";
import { Suspense } from "react";
import { Archivo } from "next/font/google";

export const metadata: Metadata = {
  title: "Live Ranked Ladder",
  description:
    "Live Clasher Network ranked. 100 LP a division, BO5 at LT1 and MT1. Climb, flex #1, share the card.",
};

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${archivo.variable} ${archivo.className} lb-hq min-h-screen`}>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
