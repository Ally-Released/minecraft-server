"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/config";
import { writeClipboard } from "@/lib/clipboard";

export function CopyPlayIp({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const ok = await writeClipboard(SERVER_CONFIG.ip);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 border border-lb-brand/50 bg-lb-brand text-lb-brand-on font-bold transition-colors hover:bg-lb-brand-soft ${
        compact ? "h-10 px-3 text-[12px]" : "h-12 px-4 text-[13px]"
      }`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "IP copied" : SERVER_CONFIG.ip}
    </button>
  );
}
