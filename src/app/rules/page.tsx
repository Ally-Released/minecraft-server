import type { Metadata } from "next";
import { SERVER_CONFIG } from "@/lib/config";
import Rules from "@/components/site/Rules";

const total = Object.values(SERVER_CONFIG.rules).reduce((n, list) => n + list.length, 0);

export const metadata: Metadata = {
  title: "Rules",
  description: `${total} rules across ${Object.keys(SERVER_CONFIG.rules).length} categories on ${SERVER_CONFIG.name}. Conduct, gameplay, building and chat.`,
  alternates: { canonical: "/rules" },
};

export default function RulesPage() {
  return <Rules standalone />;
}
