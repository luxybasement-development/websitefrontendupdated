'use client';

import { motion } from 'framer-motion';

const BRANDS = [
  'CHANEL', 'LOUIS VUITTON', 'HERMÈS', 'GUCCI', 'PRADA',
  'BOTTEGA VENETA', 'SAINT LAURENT', 'DIOR', 'CELINE', 'BALENCIAGA',
];

export default function BrandStrip() {
  return (
    <section className="py-10 border-y border-vault-border overflow-hidden bg-vault-surface">
      <div className="relative flex">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="text-xs tracking-[0.3em] uppercase text-vault-muted font-medium"
            >
              {brand}
              <span className="text-vault-gold mx-6">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
