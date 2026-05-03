'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function SellHero() {
  return (
    <section className="relative pt-40 pb-24 px-4 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-vault-surface via-vault-bg to-vault-bg" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #C9A96E 40px, #C9A96E 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #C9A96E 40px, #C9A96E 41px)' }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-vault-gold" />
            <span className="text-xs tracking-[0.4em] uppercase text-vault-gold">Consign & Sell</span>
            <div className="h-px w-12 bg-vault-gold" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-vault-text leading-tight mb-6">
            Turn Luxury
            <br />
            <span className="italic text-vault-gold">Into Cash</span>
          </h1>
          <p className="text-vault-muted text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            We've been purchasing pre-owned luxury goods directly from sellers for nearly 30 years.
            No consignment waiting periods — we buy outright, provide a price range before you ship, and pay fast.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:luxybasement@gmail.com"
              className="inline-flex items-center gap-3 bg-vault-gold text-vault-bg px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors duration-300"
            >
              Start Selling
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-3 border border-vault-border text-vault-muted px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:border-vault-gold hover:text-vault-gold transition-colors duration-300"
            >
              How It Works
              <ArrowDown size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
