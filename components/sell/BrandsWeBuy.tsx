'use client';

import { motion } from 'framer-motion';

const BRANDS = [
  { name: 'Hermès', categories: 'Handbags · Scarves · Jewelry' },
  { name: 'Chanel', categories: 'Handbags · Jewelry · Accessories' },
  { name: 'Louis Vuitton', categories: 'Handbags · Accessories · Luggage' },
  { name: 'Rolex', categories: 'Watches' },
  { name: 'Patek Philippe', categories: 'Watches' },
  { name: 'Cartier', categories: 'Watches · Jewelry · Accessories' },
  { name: 'Van Cleef & Arpels', categories: 'Jewelry · Accessories' },
  { name: 'Gucci', categories: 'Handbags · Shoes · Accessories' },
  { name: 'Prada', categories: 'Handbags · Shoes · Accessories' },
  { name: 'Bottega Veneta', categories: 'Handbags · Accessories' },
  { name: 'Celine', categories: 'Handbags · Accessories' },
  { name: 'Dior', categories: 'Handbags · Accessories · Jewelry' },
  { name: 'Fendi', categories: 'Handbags · Accessories' },
  { name: 'Givenchy', categories: 'Handbags · Accessories' },
  { name: 'Audemars Piguet', categories: 'Watches' },
  { name: 'IWC', categories: 'Watches' },
  { name: 'Omega', categories: 'Watches' },
  { name: 'Tiffany & Co.', categories: 'Jewelry · Accessories' },
  { name: 'Bvlgari', categories: 'Jewelry · Watches · Accessories' },
  { name: 'Saint Laurent', categories: 'Handbags · Shoes · Accessories' },
  { name: 'Valentino', categories: 'Handbags · Shoes · Accessories' },
  { name: 'Burberry', categories: 'Accessories · Handbags' },
  { name: 'Miu Miu', categories: 'Handbags · Accessories' },
  { name: 'Loewe', categories: 'Handbags · Accessories' },
];

export default function BrandsWeBuy() {
  return (
    <section className="py-24 px-4 bg-vault-surface border-y border-vault-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-vault-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Accepted Brands</span>
            <div className="h-px w-8 bg-vault-gold" />
          </div>
          <h2 className="font-serif text-4xl font-bold text-vault-text mb-4">
            Brands We Buy
          </h2>
          <p className="text-vault-muted max-w-xl mx-auto">
            We purchase from the world's top luxury maisons. Don't see your brand listed? Email us — we consider all authenticated luxury goods.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              className="border border-vault-border bg-vault-bg p-4 hover:border-vault-gold transition-colors duration-300 group"
            >
              <p className="font-serif text-base font-semibold text-vault-text group-hover:text-vault-gold transition-colors duration-300 mb-1">
                {brand.name}
              </p>
              <p className="text-[10px] text-vault-muted tracking-wide">{brand.categories}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-vault-muted mt-10">
          + many more luxury brands considered. Email{' '}
          <a href="mailto:luxybasement@gmail.com" className="text-vault-gold hover:underline">
            luxybasement@gmail.com
          </a>{' '}
          with your item details.
        </p>
      </div>
    </section>
  );
}
