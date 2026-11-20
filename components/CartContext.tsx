"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type CartContextValue = {
  items: Record<string, number>;
  count: number;
  add: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});

  const add = useCallback((id: string) => {
    setItems((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const value = useMemo(
    () => ({
      items,
      add,
      count: Object.values(items).reduce((a, b) => a + b, 0),
    }),
    [items, add]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
