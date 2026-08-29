"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/components/store/cart";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>{children}</CartProvider>
  );
}
