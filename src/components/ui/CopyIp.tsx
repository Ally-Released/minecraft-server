"use client";

import { AnimatePresence, motion } from "motion/react";
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
  const [runs, setRuns] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const copy = async () => {
    const ok = await writeClipboard(SERVER_CONFIG.ip);
    setRuns((n) => n + 1);
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
        className={`slab group block w-full text-left transition-transform duration-300 active:scale-[0.99] ${
          big ? "" : "slab-sm"
        }`}
        style={{
          ["--edge-angle" as string]: copied ? "90deg" : "135deg",
          transition: "filter .4s ease",
          filter: copied ? "drop-shadow(0 0 28px rgba(134,229,255,0.4))" : "none",
        }}
      >
        <span
          className="slab-face relative block overflow-hidden"
          style={{
            ["--slab-fill" as string]: copied
              ? "linear-gradient(140deg, #0c3560 0%, #072747 60%, #04162c 100%)"
              : "linear-gradient(140deg, #061730 0%, #04101f 60%, #030b18 100%)",
          }}
        >
          {/* light sweeping across the face on success */}
          <AnimatePresence>
            {copied && (
              <motion.span
                key={runs}
                aria-hidden
                initial={{ x: "-110%" }}
                animate={{ x: "110%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-glow/30 to-transparent"
              />
            )}
          </AnimatePresence>

          <span
            className={`relative flex items-center justify-between gap-5 ${
              big ? "px-6 py-5 sm:px-8" : "px-5 py-3.5"
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className="eyebrow block transition-colors duration-300 group-hover:text-ink-2">
                {state === "failed"
                  ? "Press Ctrl + C to copy"
                  : copied
                    ? "Copied to clipboard"
                    : "Server address"}
              </span>
              {/* The address never truncates — it scales instead. An
                  ellipsised server IP is a broken server IP. */}
              <span
                className={`hud mt-1.5 block font-semibold text-ink transition-colors duration-300 ${
                  big
                    ? "text-[clamp(0.9rem,3.6vw,1.375rem)]"
                    : "text-[clamp(0.78rem,3vw,0.95rem)]"
                } ${copied ? "text-glow" : "group-hover:text-paper"}`}
              >
                {SERVER_CONFIG.ip}
              </span>
            </span>

            <span className="relative flex shrink-0 items-center gap-2.5">
              {copied && (
                <span
                  aria-hidden
                  className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full border border-glow/60"
                  style={{ animation: "pulse-ring 1.1s var(--ease-out-quart) 2" }}
                />
              )}
              <span
                className={`display-tight hidden text-[0.8rem] tracking-[0.22em] transition-colors duration-300 sm:block ${
                  copied ? "text-glow" : "text-ink-3 group-hover:text-ice"
                }`}
              >
                {copied ? "Copied" : "Copy"}
              </span>
              <span
                className={`relative grid h-9 w-9 place-items-center border transition-all duration-300 ${
                  copied
                    ? "border-glow/70 bg-glow/15 text-glow"
                    : "border-hair bg-void/60 text-ink-3 group-hover:border-steel group-hover:text-ice"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 520, damping: 22 }}
                    >
                      <Check size={16} strokeWidth={2.5} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ duration: 0.16 }}
                    >
                      <Copy size={15} strokeWidth={2} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
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
