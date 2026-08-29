"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/store/cart";

/**
 * CSS can shorten a transition; it cannot stop a JS-driven spring. `MotionConfig`
 * makes `prefers-reduced-motion` actually reach every animation on the page.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>{children}</CartProvider>
    </MotionConfig>
  );
}
