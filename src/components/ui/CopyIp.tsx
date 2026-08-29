"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SERVER_CONFIG } from "@/lib/config";
import { writeClipboard } from "@/lib/clipboard";

type State = "idle" | "copied" | "failed";

export default function CopyIp({
  size = "lg",
  className = "",
}: {
  size?: "lg" | "sm";
  className?: string;
}) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const copy = async () => {
    const ok = await writeClipboard(SERVER_CONFIG.ip);
    setState(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), ok ? 2600 : 5000);
  };

  const big = size === "lg";
  const copied = state === "copied";

  return (
    <div className={className}>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy server address ${SERVER_CONFIG.ip} to clipboard`}
        className={`group block w-full text-left transition-all duration-200 active:scale-[0.99] border rounded-md overflow-hidden ${
          copied ? "border-primary/50 shadow-[0_0_15px_rgba(77,163,255,0.15)]" : "border-border shadow-sm hover:border-primary/30"
        }`}
      >
        <span
          className={`relative flex items-center justify-between gap-5 bg-card/80 transition-colors ${
            big ? "px-5 py-4 sm:px-6" : "px-4 py-3"
          }`}
        >
          <span className="min-w-0 flex-1">
            <span className="eyebrow block text-muted-foreground">
              {state === "failed"
                ? "Press Ctrl + C to copy"
                : copied
                  ? "Copied to clipboard"
                  : "Server address"}
            </span>
            <span
              className={`hud mt-1.5 block font-semibold transition-colors duration-300 ${
                big
                  ? "text-[clamp(0.9rem,3.6vw,1.25rem)]"
                  : "text-[clamp(0.78rem,3vw,0.95rem)]"
              } ${copied ? "text-primary" : "text-foreground"}`}
            >
              {SERVER_CONFIG.ip}
            </span>
          </span>

          <span className="relative flex shrink-0 items-center gap-2.5">
            <span
              className={`display-tight hidden text-xs tracking-wider transition-colors duration-200 sm:block ${
                copied ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {copied ? "COPIED" : "COPY"}
            </span>
            <span
              className={`relative grid h-9 w-9 place-items-center rounded border transition-all duration-200 ${
                copied
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"
              }`}
            >
              {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={15} strokeWidth={2} />}
            </span>
          </span>
        </span>
      </button>

      <span aria-live="polite" className="sr-only">
        {copied ? `${SERVER_CONFIG.ip} copied to clipboard` : ""}
      </span>
    </div>
  );
}
