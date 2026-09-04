"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { SERVER_CONFIG } from "@/lib/config";
import { writeClipboard } from "@/lib/clipboard";
import { playerSharePath } from "@/lib/leaderboard";

export function FlexShare({
  username,
  caption,
}: {
  username: string;
  caption: string;
}) {
  const [copied, setCopied] = useState<"link" | "flex" | null>(null);
  const shareUrl = `${SERVER_CONFIG.url}${playerSharePath(username)}`;
  const tweetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(shareUrl)}`;

  const mark = (kind: "link" | "flex") => {
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 2000);
  };

  const copyLink = async () => {
    if (await writeClipboard(shareUrl)) mark("link");
  };

  const copyFlex = async () => {
    if (await writeClipboard(`${caption}\n${shareUrl}`)) mark("flex");
  };

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title: `${username} · Clasher Network`, text: caption, url: shareUrl });
        return;
      } catch {
        /* dismissed */
      }
    }
    await copyFlex();
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={nativeShare}
        className="inline-flex h-12 items-center justify-center gap-2 bg-lb-brand px-4 text-[13px] font-extrabold uppercase tracking-[0.12em] text-lb-brand-on hover:bg-lb-brand-soft"
      >
        <Share2 size={15} />
        Flex this rank
      </button>
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex h-10 items-center justify-center gap-1.5 border border-lb-line-strong bg-white/5 text-[11px] font-bold uppercase tracking-wide text-lb-body hover:text-lb-hi"
        >
          {copied === "link" ? <Check size={12} className="text-lb-pos" /> : <Copy size={12} />}
          {copied === "link" ? "Copied" : "Link"}
        </button>
        <button
          type="button"
          onClick={copyFlex}
          className="inline-flex h-10 items-center justify-center gap-1.5 border border-lb-line-strong bg-white/5 text-[11px] font-bold uppercase tracking-wide text-lb-body hover:text-lb-hi"
        >
          {copied === "flex" ? <Check size={12} className="text-lb-pos" /> : <Copy size={12} />}
          {copied === "flex" ? "Copied" : "Discord"}
        </button>
        <a
          href={tweetHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center justify-center border border-lb-line-strong bg-white/5 text-[11px] font-bold uppercase tracking-wide text-lb-body hover:text-lb-hi"
        >
          Post on X
        </a>
      </div>
    </div>
  );
}
