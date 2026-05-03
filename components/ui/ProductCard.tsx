'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Eye } from 'lucide-react';
import type { ProductCardData } from '@/lib/shopify/types';

interface ProductCardProps {
  product: ProductCardData;
  index?: number;
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const price = formatPrice(product.price.amount, product.price.currencyCode);
  const compareAt = product.compareAtPrice
    ? formatPrice(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)
    : null;
  const discount =
    compareAt && product.compareAtPrice
      ? Math.round(
          ((parseFloat(product.compareAtPrice.amount) - parseFloat(product.price.amount)) /
            parseFloat(product.compareAtPrice.amount)) *
            100
        )
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: 'easeOut' }}
    >
      <Link href={`/products/${product.handle}`} className="group block">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-vault-surface border border-vault-border">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-vault-muted text-xs tracking-widest uppercase">No Image</span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center gap-2 bg-vault-bg/90 border border-vault-border px-4 py-2">
                <Eye size={14} className="text-vault-gold" />
                <span className="text-xs tracking-widest uppercase text-vault-text">View Details</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount && discount > 0 && (
              <span className="bg-vault-gold text-vault-bg text-xs font-semibold px-2 py-1 tracking-wide">
                -{discount}%
              </span>
            )}
            {!product.availableForSale && (
              <span className="bg-vault-surface/90 border border-vault-border text-vault-muted text-xs px-2 py-1 tracking-wider uppercase">
                Sold
              </span>
            )}
          </div>

          {/* Auth badge */}
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1.5 bg-vault-bg/90 border border-vault-border px-2 py-1">
              <Shield size={10} className="text-vault-gold" />
              <span className="text-[10px] tracking-wider uppercase text-vault-muted">Auth</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 space-y-1">
          <p className="text-[10px] tracking-widest uppercase text-vault-gold font-medium">
            {product.vendor}
          </p>
          <h3 className="text-sm font-medium text-vault-text leading-snug group-hover:text-white transition-colors line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-sm font-semibold text-vault-text">{price}</span>
            {compareAt && (
              <span className="text-xs text-vault-muted line-through">{compareAt}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
