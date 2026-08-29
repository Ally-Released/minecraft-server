"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll reveal. Deliberately restrained — a short rise and a fade, no
 * scale, no rotation, no blur. Reveals are rhythm, not spectacle.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
