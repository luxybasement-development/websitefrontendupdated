'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ShopifyCart } from '@/lib/shopify/types';
import { createCart, addToCart, getCart } from '@/lib/shopify/client';

const CART_ID_KEY = 'lb_cart_id';

interface CartContextValue {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Rehydrate cart from localStorage on mount
  useEffect(() => {
    const savedId = localStorage.getItem(CART_ID_KEY);
    if (!savedId) return;
    getCart(savedId).then((existing) => {
      if (existing && existing.totalQuantity > 0) {
        setCart(existing);
      } else {
        localStorage.removeItem(CART_ID_KEY);
      }
    }).catch(() => {
      localStorage.removeItem(CART_ID_KEY);
    });
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(async (variantId: string) => {
    setIsLoading(true);
    try {
      let updated: ShopifyCart;
      if (cart) {
        updated = await addToCart(cart.id, variantId);
      } else {
        updated = await createCart(variantId);
        localStorage.setItem(CART_ID_KEY, updated.id);
      }
      setCart(updated);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, isOpen, isLoading, openCart, closeCart, addItem }}>
      {children}
    </CartContext.Provider>
  );
}
