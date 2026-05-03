'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Award, Camera } from 'lucide-react';

const TRUST_SIGNALS = [
  { icon: Shield, label: '100% Authenticated', sub: 'Fully verified, buy with certainty' },
  { icon: Award, label: '~30 Years Experience', sub: 'In-house authentication' },
  { icon: Zap, label: 'Direct Pricing', sub: 'No studio, no markup' },
  { icon: Camera, label: 'Photos & Live Showings', sub: 'Request extra photos or a private video walk-through on any listing' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-vault-bg">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-vault-gold/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-vault-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-vault-gold font-medium">
              The Vault Outlet
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-vault-text leading-[1.05] tracking-tight mb-6"
          >
            Luxury
            <br />
            <span className="text-vault-gold">Without</span>
            <br />
            the Markup
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-vault-muted leading-relaxed max-w-xl mb-10"
          >
            Your premier source for authenticated pre-owned designer luxury goods. Backed by nearly 30 years of professional authentication experience — no studio overhead, no inflated prices.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-vault-gold text-vault-bg px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-white transition-colors duration-300"
            >
              Shop The Vault
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/authentication"
              className="inline-flex items-center gap-3 border border-vault-border text-vault-text px-8 py-4 text-sm tracking-wider uppercase hover:border-vault-gold hover:text-vault-gold transition-all duration-300"
            >
              Our Auth Process
            </Link>
          </motion.div>
        </div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-vault-border"
        >
          {TRUST_SIGNALS.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <div
                key={signal.label}
                className={`flex items-center gap-4 p-6 ${
                  i < TRUST_SIGNALS.length - 1
                    ? 'border-b sm:border-b-0 sm:border-r border-vault-border'
                    : ''
                }`}
              >
                <div className="w-10 h-10 border border-vault-border flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-vault-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-vault-text">{signal.label}</p>
                  <p className="text-xs text-vault-muted">{signal.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-vault-bg to-transparent pointer-events-none" />
    </section>
  );
}
