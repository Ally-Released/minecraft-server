"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { RarityKey } from "@/lib/store";

export type CartItem = {
  key: string;
  catalogueId: string;
  catalogueName: string;
  rankId: string;
  rankName: string;
  price: number;
  rarity: RarityKey;
};

type CartApi = {
  items: CartItem[];
  count: number;
  subtotal: number;
  username: string;
  open: boolean;
  add: (item: Omit<CartItem, "key">, origin?: DOMRect | null) => void;
  remove: (key: string) => void;
  clear: () => void;
  setUsername: (name: string) => void;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartApi | null>(null);
const STORAGE = "cn.cart.v1";

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

type Persisted = { items: CartItem[]; username: string };
const EMPTY: Persisted = { items: [], username: "" };

function read(): Persisted | null {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<Persisted>;
    return {
      items: Array.isArray(saved.items) ? saved.items : [],
      username: typeof saved.username === "string" ? saved.username : "",
    };
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [{ items, username }, setCart] = useState<Persisted>(EMPTY);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = read();
    if (saved) setCart(saved);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify({ items, username }));
    } catch {
      /* private mode */
    }
  }, [items, username]);

  const setItems = useCallback(
    (next: (prev: CartItem[]) => CartItem[]) =>
      setCart((prev) => ({ ...prev, items: next(prev.items) })),
    []
  );

  const setUsername = useCallback(
    (name: string) => setCart((prev) => ({ ...prev, username: name })),
    []
  );

  const add = useCallback((item: Omit<CartItem, "key">) => {
    const key = `${item.catalogueId}:${item.rankId}`;
    setCart((prev) =>
      prev.items.some((i) => i.key === key)
        ? prev
        : { ...prev, items: [...prev.items, { ...item, key }] }
    );
  }, []);

  const remove = useCallback(
    (key: string) => setItems((prev) => prev.filter((i) => i.key !== key)),
    [setItems]
  );

  const clear = useCallback(() => setItems(() => []), [setItems]);

  const value = useMemo<CartApi>(
    () => ({
      items,
      count: items.length,
      subtotal: items.reduce((n, i) => n + i.price, 0),
      username,
      open,
      add,
      remove,
      clear,
      setUsername,
      setOpen,
    }),
    [items, username, open, add, remove, clear, setUsername]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
