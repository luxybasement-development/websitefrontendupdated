'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ExternalLink, Shield, Lock } from 'lucide-react';
import { useCart } from './CartProvider';

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export default function CartDrawer() {
  const { cart, isOpen, closeCart } = useCart();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const subtotal = cart?.cost.subtotalAmount
    ? formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-vault-surface border-l border-vault-border z-[61] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-vault-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-vault-gold" />
                <h2 className="text-sm font-semibold tracking-widest uppercase text-vault-text">
                  Your Cart
                  {cart && cart.totalQuantity > 0 && (
                    <span className="ml-2 text-vault-gold">({cart.totalQuantity})</span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="text-vault-muted hover:text-vault-text transition-colors"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-20 px-8 text-center">
                  <div className="w-16 h-16 border border-vault-border flex items-center justify-center mb-6">
                    <ShoppingBag size={24} strokeWidth={1} className="text-vault-muted" />
                  </div>
                  <p className="text-sm font-medium text-vault-text mb-2">Your vault is empty</p>
                  <p className="text-xs text-vault-muted">Add an authenticated piece to get started.</p>
                </div>
              ) : (
                <ul className="divide-y divide-vault-border">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-4 p-5">
                      <div className="relative w-20 h-24 flex-shrink-0 bg-vault-bg border border-vault-border overflow-hidden">
                        {line.merchandise.image ? (
                          <Image
                            src={line.merchandise.image.url}
                            alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-vault-muted text-[10px]">No img</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] tracking-widest uppercase text-vault-gold mb-1">
                          {line.merchandise.product.title.split(' ')[0]}
                        </p>
                        <p className="text-sm font-medium text-vault-text line-clamp-2 leading-snug">
                          {line.merchandise.product.title}
                        </p>
                        {line.merchandise.title !== 'Default Title' && (
                          <p className="text-xs text-vault-muted mt-1">{line.merchandise.title}</p>
                        )}
                        <p className="text-sm font-semibold text-vault-text mt-2">
                          {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && cart && (
              <div className="flex-shrink-0 border-t border-vault-border px-6 py-6 space-y-4">
                {/* Trust signals */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Shield size={12} className="text-vault-gold flex-shrink-0" />
                    <span className="text-[10px] text-vault-muted tracking-wider">Every Item Verified Authentic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={12} className="text-vault-gold flex-shrink-0" />
                    <span className="text-[10px] text-vault-muted tracking-wider">Secure Checkout</span>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between py-3 border-t border-vault-border">
                  <span className="text-sm text-vault-muted tracking-wider uppercase text-xs">Subtotal</span>
                  <span className="text-base font-semibold text-vault-text">{subtotal}</span>
                </div>

                <p className="text-[10px] text-vault-muted text-center">
                  Shipping & taxes calculated at checkout
                </p>

                {/* Checkout button */}
                <a
                  href={cart.checkoutUrl}
                  className="w-full flex items-center justify-center gap-3 bg-vault-gold text-vault-bg py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors duration-300"
                >
                  <ExternalLink size={15} strokeWidth={2} />
                  Proceed to Checkout
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
