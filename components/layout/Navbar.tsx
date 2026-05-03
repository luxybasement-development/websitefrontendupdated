'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, Shield } from 'lucide-react';
import { useCart } from './CartProvider';
import SearchOverlay from './SearchOverlay';

const NAV_LINKS = [
  { label: 'All Items', href: '/products' },
  { label: 'Handbags', href: '/products?type=handbags' },
  { label: 'Watches', href: '/products?type=watches' },
  { label: 'Jewelry', href: '/products?type=jewelry' },
  { label: 'Accessories', href: '/products?type=accessories' },
  { label: 'Sell Your Items', href: '/sell' },
];

const NAV_LINKS_SECONDARY = [
  { label: 'About Us', href: '/about' },
  { label: 'Boutique', href: '/boutique' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, cart } = useCart();
  const cartQty = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-vault-bg/95 backdrop-blur-md border-b border-vault-border'
            : 'bg-transparent'
        }`}
      >
        {/* Announcement bar */}
        <div className="bg-vault-surface border-b border-vault-border py-2 px-4 text-center">
          <p className="text-xs text-vault-muted tracking-widest uppercase">
            <span className="text-vault-gold mr-2">✦</span>
            Backed by nearly 30 years of professional authentication experience — every item fully verified
            <span className="text-vault-gold ml-2">✦</span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 border border-vault-gold flex items-center justify-center">
                <span className="text-vault-gold text-xs font-bold tracking-tight">LB</span>
              </div>
              <span className="text-vault-text font-semibold tracking-[0.15em] uppercase text-sm">
                LUXY<span className="text-vault-gold">BASEMENT</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-widest uppercase text-vault-muted hover:text-vault-text transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-vault-gold group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex text-vault-muted hover:text-vault-text transition-colors duration-200"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              <button
                onClick={openCart}
                aria-label="Cart"
                className="text-vault-muted hover:text-vault-text transition-colors duration-200 relative"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartQty > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-vault-gold text-vault-bg text-[9px] font-bold flex items-center justify-center">
                    {cartQty}
                  </span>
                )}
              </button>
              <button
                aria-label="Menu"
                className="lg:hidden text-vault-muted hover:text-vault-text transition-colors duration-200"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-vault-surface border-l border-vault-border z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-vault-border">
                <span className="text-sm tracking-widest uppercase text-vault-muted">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-vault-muted hover:text-vault-text transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <div className="px-6 pt-6">
                <button
                  onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-vault-border text-vault-muted hover:text-vault-text hover:border-vault-gold/50 transition-all duration-200"
                >
                  <Search size={15} strokeWidth={1.5} />
                  <span className="text-sm tracking-wider">Search items…</span>
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-lg font-medium text-vault-text hover:text-vault-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-2 border-t border-vault-border space-y-4">
                  {NAV_LINKS_SECONDARY.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (NAV_LINKS.length + i) * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-sm text-vault-muted hover:text-vault-gold transition-colors tracking-wide"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>
              <div className="mt-auto p-6 border-t border-vault-border">
                <div className="flex items-center gap-2 text-vault-muted">
                  <Shield size={14} />
                  <span className="text-xs tracking-wider">Nearly 30 Years of Authentication Experience</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
