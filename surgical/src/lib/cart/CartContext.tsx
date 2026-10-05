"use client";

// ─────────────────────────────────────────────────────────────
// Lightweight client-side cart.
//
// State is kept in React context and mirrored to localStorage so it
// survives reloads. Only the fields needed to render the cart are
// stored per line item (kept small and serializable). This is a
// demo cart — swap the persistence for a real API/session later.
// ─────────────────────────────────────────────────────────────

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/types";

export interface CartLine {
  slug: string;
  name: string;
  price: number;
  image: string;
  packSize: string;
  qty: number;
}

interface CartContextValue {
  items: CartLine[];
  count: number;
  subtotal: number;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clear: () => void;
  ready: boolean;
}

const STORAGE_KEY = "medvance.cart.v1";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartLine[]);
    } catch {
      // ignore malformed / unavailable storage
    }
    setReady(true);
  }, []);

  // Persist on change (after initial hydration).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota / unavailable storage
    }
  }, [items, ready]);

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((l) => l.slug === product.slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === product.slug ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          packSize: product.packSize,
          qty,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, qty) } : l))
        .filter((l) => l.qty > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, l) => n + l.qty, 0);
    const subtotal = items.reduce((s, l) => s + l.price * l.qty, 0);
    return {
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      updateQty,
      clear,
      ready,
    };
  }, [items, addItem, removeItem, updateQty, clear, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
