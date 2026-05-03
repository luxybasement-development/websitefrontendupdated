import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProducts, toProductCardData } from '@/lib/shopify/client';
import ProductCard from '@/components/ui/ProductCard';

export default async function FeaturedProducts() {
  let products: ReturnType<typeof toProductCardData>[] = [];
  try {
    const raw = await getProducts(8);
    products = raw.map(toProductCardData);
  } catch {
    // Shopify not yet configured — show placeholder grid
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-vault-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Just In</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-vault-text tracking-tight">
              Fresh To The Vault
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm text-vault-muted hover:text-vault-gold transition-colors group"
          >
            View All
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          /* Placeholder state while Shopify isn't connected */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/5] bg-vault-surface border border-vault-border flex items-center justify-center">
                  <span className="text-xs text-vault-muted tracking-widest uppercase">
                    Inventory Loading
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-16 bg-vault-surface-2 rounded" />
                  <div className="h-3 w-3/4 bg-vault-surface-2 rounded" />
                  <div className="h-3 w-1/3 bg-vault-surface-2 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-vault-border text-vault-text px-6 py-3 text-sm tracking-wider uppercase hover:border-vault-gold hover:text-vault-gold transition-all duration-300"
          >
            View All Items
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
