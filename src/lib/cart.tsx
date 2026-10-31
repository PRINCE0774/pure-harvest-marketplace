/**
 * Demo cart with localStorage persistence.
 * A tiny React context any component can read via useCart().
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { findProductById, type Product } from "./products";

export interface CartLine {
  productId: string;
  quantity: number;
}

const CART_KEY = "pureharvest_cart_v1";

interface CartContextValue {
  /** Line items as stored (raw ids + quantities) */
  lines: CartLine[];
  /** Lines joined with product data, quantities > 0 only */
  items: { product: Product; quantity: number }[];
  count: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CART_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        !!l && typeof l.productId === "string" && typeof l.quantity === "number" && l.quantity > 0
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Start empty so server and first client render match; load after hydration.
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load the saved cart once, after the browser is in control.
  useEffect(() => {
    setLines(readStoredLines());
    setHydrated(true);
  }, []);

  // Persist on every change (only after hydration, so we never wipe the
  // saved cart with the empty initial state).
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = (productId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const setQuantity = (productId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, quantity } : l))
    );
  };

  const removeItem = (productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  };

  const clearCart = () => setLines([]);

  const items = lines
    .map((l) => {
      const product = findProductById(l.productId);
      return product ? { product, quantity: l.quantity } : null;
    })
    .filter((x): x is { product: Product; quantity: number } => x !== null);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ lines, items, count, subtotal, addItem, setQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
