'use client';

import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export default function SellCTA() {
  return (
    <section className="py-24 px-4 bg-vault-surface border-t border-vault-border">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-vault-gold" />
            <span className="text-xs tracking-[0.4em] uppercase text-vault-gold">Get Started</span>
            <div className="h-px w-12 bg-vault-gold" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-vault-text mb-6">
            Ready to Sell?
          </h2>
          <p className="text-vault-muted leading-relaxed mb-10 max-w-xl mx-auto">
            Email us photos and details of your luxury item. We'll respond with a competitive price range within 24 hours — so you know what to expect before you ever ship. Our final offer is confirmed after hands-on inspection, and it falls within the range we provide upfront.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="mailto:luxybasement@gmail.com"
              className="inline-flex items-center gap-3 bg-vault-gold text-vault-bg px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors duration-300"
            >
              <Mail size={15} />
              luxybasement@gmail.com
            </a>
          </div>

          <div className="border-t border-vault-border pt-8 text-xs text-vault-muted space-y-1">
            <p>By submitting an item you agree to our Seller Terms & Conditions.</p>
            <p>
              <a href="/seller-terms" className="text-vault-gold hover:underline">
                Read Seller Terms →
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
