import { Suspense } from 'react';
import { getProducts, toProductCardData } from '@/lib/shopify/client';
import ProductCard from '@/components/ui/ProductCard';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import ProductFilters from '@/components/products/ProductFilters';

interface SearchParams {
  type?: string;
  sort?: string;
  brand?: string;
}

// Maps URL ?type= values to Shopify productType values (case-insensitive contains match)
const TYPE_MAP: Record<string, string[]> = {
  handbags: ['handbag', 'bag', 'purse', 'tote', 'clutch', 'satchel', 'shoulder bag', 'crossbody'],
  watches: ['watch', 'timepiece'],
  // Jewelry includes explicit Shopify productType values: Bracelet, Necklace, Ring, Earrings
  jewelry: ['jewelry', 'jewellery', 'necklace', 'bracelet', 'ring', 'earring', 'earrings', 'pendant', 'bangle'],
  accessories: ['accessory', 'accessories', 'scarf', 'belt', 'wallet', 'sunglasses', 'keychain', 'card holder'],
  shoes: ['shoe', 'shoes', 'boot', 'sneaker', 'heel', 'loafer', 'sandal'],
};

function matchesType(productType: string, tags: string[], type: string, title: string): boolean {
  const keywords = TYPE_MAP[type.toLowerCase()] ?? [type.toLowerCase()];
  const normalizedType = (productType ?? '').toLowerCase().trim();
  const tagStr = tags.join(' ').toLowerCase();
  const normalizedTitle = (title ?? '').toLowerCase();
  return keywords.some(
    (kw) =>
      normalizedType === kw ||
      normalizedType.includes(kw) ||
      tagStr.includes(kw) ||
      // title fallback: catches cases where productType is empty/wrong but title says "bracelet" etc.
      normalizedTitle.includes(kw)
  );
}

async function ProductGrid({ searchParams }: { searchParams: SearchParams }) {
  let products: ReturnType<typeof toProductCardData>[] = [];
  let raw: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    raw = await getProducts(100);
  } catch {
    // Not yet configured
  }

  if (searchParams.type && searchParams.type !== 'new') {
    const filtered = raw.filter((p) =>
      matchesType(p.productType, p.tags, searchParams.type!, p.title)
    );
    products = filtered.map(toProductCardData);
  } else if (searchParams.type === 'new') {
    // New arrivals: first 20 products (already sorted by CREATED_AT DESC)
    products = raw.slice(0, 20).map(toProductCardData);
  } else {
    products = raw.map(toProductCardData);
  }

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-16 h-16 border border-vault-border flex items-center justify-center mx-auto mb-6">
          <span className="text-vault-gold text-xl">LB</span>
        </div>
        <h3 className="text-lg font-semibold text-vault-text mb-2">
          {searchParams.type ? 'No items in this category yet' : 'Vault Stocking Up'}
        </h3>
        <p className="text-vault-muted text-sm max-w-sm mx-auto">
          {searchParams.type
            ? 'Check back soon — new inventory arrives regularly.'
            : 'Connect your Shopify store to start displaying inventory.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
      {Array.from({ length: 16 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

function getCategoryTitle(type?: string): string {
  if (!type) return 'All Items';
  if (type === 'new') return 'New Arrivals';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="min-h-screen bg-vault-bg pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-vault-border pb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-vault-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">The Vault</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-vault-text tracking-tight">
              {getCategoryTitle(searchParams.type)}
            </h1>
            <p className="text-sm text-vault-muted">
              New inventory added continuously
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:w-56 flex-shrink-0">
            <ProductFilters activeType={searchParams.type} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <Suspense fallback={<GridSkeleton />}>
              <ProductGrid searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
