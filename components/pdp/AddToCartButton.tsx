'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Loader as Loader2, Shield, Lock } from 'lucide-react';
import { useCart } from '@/components/layout/CartProvider';
import { createCart } from '@/lib/shopify/client';

interface AddToCartButtonProps {
  variantId: string;
  availableForSale: boolean;
}

export default function AddToCartButton({ variantId, availableForSale }: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');

  async function handleAddToCart() {
    if (!availableForSale || state !== 'idle') return;
    setState('loading');
    try {
      await addItem(variantId);
      setState('success');
      setTimeout(() => setState('idle'), 2500);
    } catch {
      setState('idle');
    }
  }

  async function handleBuyNow() {
    if (!availableForSale) return;
    setState('loading');
    try {
      const cart = await createCart(variantId);
      window.location.href = cart.checkoutUrl;
    } catch {
      setState('idle');
    }
  }

  if (!availableForSale) {
    return (
      <div className="w-full py-4 border border-vault-border text-center text-sm text-vault-muted tracking-widest uppercase">
        Sold — Check Back Soon
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Trust signals */}
      <div className="flex items-center justify-center gap-6 py-3 border-y border-vault-border">
        <div className="flex items-center gap-2">
          <Shield size={13} className="text-vault-gold flex-shrink-0" />
          <span className="text-[10px] tracking-wider uppercase text-vault-muted">Verified Authentic</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock size={13} className="text-vault-gold flex-shrink-0" />
          <span className="text-[10px] tracking-wider uppercase text-vault-muted">Secure Checkout</span>
        </div>
      </div>

      {/* Add to Cart */}
      <motion.button
        onClick={handleAddToCart}
        disabled={state === 'loading'}
        whileTap={{ scale: 0.99 }}
        className={`w-full flex items-center justify-center gap-3 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
          state === 'success'
            ? 'bg-green-700 text-white'
            : 'bg-vault-gold text-vault-bg hover:bg-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {state === 'loading' && (
            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Adding...
            </motion.span>
          )}
          {state === 'success' && (
            <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Check size={16} />
              Added to Cart
            </motion.span>
          )}
          {state === 'idle' && (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <ShoppingBag size={16} strokeWidth={1.5} />
              Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Buy Now */}
      <button
        onClick={handleBuyNow}
        disabled={state === 'loading'}
        className="w-full flex items-center justify-center gap-3 py-4 border border-vault-border text-vault-text text-sm font-semibold tracking-wider uppercase hover:border-vault-gold hover:text-vault-gold transition-all duration-300"
      >
        Buy Now
      </button>
    </div>
  );
}
