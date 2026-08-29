"use client";

import { AnimatePresence, motion } from "motion/react";
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

type Flight = { id: number; from: DOMRect; to: DOMRect };

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
    /* corrupt or unavailable storage is not worth surfacing */
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // One state object rather than two: the whole cart is restored in a single
  // write, which keeps the mount effect to one setState.
  const [{ items, username }, setCart] = useState<Persisted>(EMPTY);
  const [open, setOpen] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);

  // Restoring *has* to happen after mount rather than in lazy initial state:
  // the server renders an empty cart, so reading storage during the first
  // render would produce a hydration mismatch in the nav badge.
  useEffect(() => {
    const saved = read();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
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

  const add = useCallback((item: Omit<CartItem, "key">, origin?: DOMRect | null) => {
    const key = `${item.catalogueId}:${item.rankId}`;
    setCart((prev) =>
      prev.items.some((i) => i.key === key)
        ? prev
        : { ...prev, items: [...prev.items, { ...item, key }] }
    );
    // Both endpoints are measured here, at the moment of the click, so the
    // animation layer stays a pure function of its props.
    const anchor = document.getElementById("cart-anchor")?.getBoundingClientRect();
    if (origin && anchor) {
      const id = Date.now() + Math.random();
      setFlights((f) => [...f, { id, from: origin, to: anchor }]);
      window.setTimeout(() => setFlights((f) => f.filter((x) => x.id !== id)), 750);
    }
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
      <FlightLayer flights={flights} />
    </CartContext.Provider>
  );
}

/**
 * The block that leaves the product and lands in the cart. Purely decorative —
 * the cart is already updated by the time this renders.
 */
function FlightLayer({ flights }: { flights: Flight[] }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100">
      <AnimatePresence>
        {flights.map((f) => (
          <motion.span
            key={f.id}
            initial={{
              x: f.from.left + f.from.width / 2 - 9,
              y: f.from.top + f.from.height / 2 - 9,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: f.to.left + f.to.width / 2 - 9,
              y: f.to.top + f.to.height / 2 - 9,
              scale: 0.35,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.68, ease: [0.32, 0.9, 0.32, 1] }}
            className="absolute left-0 top-0 h-[18px] w-[18px] rotate-45 bg-glow shadow-[0_0_18px_4px_rgba(134,229,255,0.55)]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
