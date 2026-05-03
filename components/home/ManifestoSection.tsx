'use client';

import { motion } from 'framer-motion';
import { Camera, CircleCheck as CheckCircle2, TrendingDown } from 'lucide-react';

const PILLARS = [
  {
    icon: Camera,
    title: 'No Studio Theatre',
    body: 'We photograph every item in our facility the moment it arrives — raw, honest, and immediate. No props, no retouching.',
  },
  {
    icon: CheckCircle2,
    title: 'Authenticated On Arrival',
    body: "Every piece is inspected and authenticated in-house before it ever goes live. If it doesn't pass, it doesn't ship.",
  },
  {
    icon: TrendingDown,
    title: 'Savings Passed to You',
    body: 'By eliminating expensive overheads, we price items closer to real market value — not inflated retail or consignment margins.',
  },
];

export default function ManifestoSection() {
  return (
    <section className="py-24 border-y border-vault-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: manifesto text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-vault-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">The Outlet Advantage</span>
            </div>
            <blockquote className="font-serif text-2xl sm:text-3xl font-semibold text-vault-text leading-snug mb-8">
              "We skip the expensive photo studios to bring you{' '}
              <span className="text-vault-gold">the best possible prices</span>."
            </blockquote>
            <p className="text-vault-muted leading-relaxed">
              Our items are authenticated, inspected, and photographed directly in our facility the
              moment they arrive. This lean, honest approach gives you an unfiltered look at your
              next luxury piece — and passes the massive overhead savings directly to you.
            </p>
          </motion.div>

          {/* Right: three pillars */}
          <div className="space-y-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5 p-5 border border-vault-border bg-vault-surface hover:border-vault-gold/40 transition-colors duration-300"
                >
                  <div className="w-10 h-10 border border-vault-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-vault-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-vault-text mb-1.5">{pillar.title}</h3>
                    <p className="text-xs text-vault-muted leading-relaxed">{pillar.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
