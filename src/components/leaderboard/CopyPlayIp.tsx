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
      className={`inline-flex items-center justify-center gap-2 border font-bold transition-all duration-300 active:scale-95 ${
        compact 
          ? "h-9 px-3 text-[12px] rounded-lg border-lb-brand/50 bg-lb-brand text-lb-brand-on hover:bg-lb-brand-soft" 
          : "h-11 px-5 text-[14px] rounded-xl border-lb-brand bg-lb-brand text-lb-brand-on shadow-[0_4px_20px_-4px_rgba(231,193,99,0.5)] hover:bg-lb-brand-soft hover:shadow-[0_4px_25px_-2px_rgba(231,193,99,0.7)]"
      }`}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "IP COPIED" : SERVER_CONFIG.ip.toUpperCase()}
    </button>
  );
}
