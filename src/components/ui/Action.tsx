"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "discord";

const FACE: Record<Variant, string> = {
  primary:
    "linear-gradient(150deg, #14477f 0%, #0a2b53 52%, #061b36 100%)",
  ghost: "linear-gradient(150deg, rgba(8,24,48,0.72) 0%, rgba(3,11,24,0.86) 100%)",
  discord: "linear-gradient(150deg, #2f7fd4 0%, #1f5da3 55%, #17457c 100%)",
};

const TEXT: Record<Variant, string> = {
  primary: "text-paper",
  ghost: "text-ink-2 group-hover:text-ink",
  discord: "text-paper",
};

/**
 * Magnetic slab button. The whole control leans toward the cursor and the
 * label leans a little further — parallax at the scale of a thumb, which is
 * what makes the press feel physical rather than flat.
 */
export default function Action({
  children,
  href,
  onClick,
  variant = "primary",
  external = false,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 20, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 8);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <>
      {/* light sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[440%]"
      />
      <motion.span
        style={{ x, y }}
        className="relative flex items-center justify-center gap-2.5 whitespace-nowrap"
      >
        {children}
      </motion.span>
    </>
  );

  const face = `slab-face group relative flex h-full w-full items-center justify-center overflow-hidden px-8 py-4 display-tight text-[0.95rem] tracking-[0.16em] transition-[filter,transform] duration-300 ${TEXT[variant]} hover:brightness-125 active:scale-[0.985]`;

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`slab group inline-block ${
        variant === "ghost" ? "opacity-90 hover:opacity-100" : ""
      } ${
        variant === "primary"
          ? "shadow-[0_0_0_rgba(77,163,255,0)] transition-shadow duration-500 hover:shadow-[0_10px_44px_-10px_rgba(77,163,255,0.65)]"
          : ""
      } ${className}`}
    >
      {href ? (
        <a
          href={href}
          aria-label={ariaLabel}
          onClick={onClick}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={face}
          style={{ ["--slab-fill" as string]: FACE[variant] }}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          aria-label={ariaLabel}
          onClick={onClick}
          className={face}
          style={{ ["--slab-fill" as string]: FACE[variant] }}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
