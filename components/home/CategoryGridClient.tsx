'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Category {
  title: string;
  sub: string;
  href: string;
  image: string;
  span: string;
}

interface CategoryGridClientProps {
  categories: Category[];
}

export default function CategoryGridClient({ categories }: CategoryGridClientProps) {
  return (
    <section className="py-24 bg-vault-surface border-y border-vault-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-vault-gold" />
          <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Browse By Category</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight mb-12">
          Find Your Next Piece
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cat.span}
            >
              <Link href={cat.href} className="group relative block overflow-hidden aspect-[4/3] bg-vault-bg border border-vault-border">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{cat.title}</h3>
                  <p className="text-sm text-white/60 mb-4">{cat.sub}</p>
                  <div className="flex items-center gap-2 text-vault-gold text-xs tracking-wider uppercase group-hover:gap-3 transition-all">
                    Shop Now <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
