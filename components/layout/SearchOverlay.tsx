'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  { label: 'Handbags', value: 'handbags' },
  { label: 'Watches', value: 'watches' },
  { label: 'Jewelry', value: 'jewelry' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Shoes', value: 'shoes' },
];

const PRICE_RANGES = [
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 – $1,000', min: 500, max: 1000 },
  { label: '$1,000 – $2,500', min: 1000, max: 2500 },
  { label: '$2,500 – $5,000', min: 2500, max: 5000 },
  { label: '$5,000+', min: 5000, max: Infinity },
];

const TYPE_MAP: Record<string, string[]> = {
  handbags: ['handbag', 'bag', 'purse', 'tote', 'clutch', 'satchel', 'shoulder bag', 'crossbody'],
  watches: ['watch', 'timepiece'],
  jewelry: ['jewelry', 'jewellery', 'necklace', 'bracelet', 'ring', 'earring', 'earrings', 'pendant', 'bangle'],
  accessories: ['accessory', 'accessories', 'scarf', 'belt', 'wallet', 'sunglasses', 'keychain', 'card holder'],
  shoes: ['shoe', 'shoes', 'boot', 'sneaker', 'heel', 'loafer', 'sandal'],
};

interface RawProduct {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  price: { amount: string; currencyCode: string };
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function matchesCategories(product: RawProduct, categories: string[]): boolean {
  if (categories.length === 0) return true; // If nothing selected, match all
  return categories.some((category) => {
    const keywords = TYPE_MAP[category] ?? [category];
    const type = (product.productType ?? '').toLowerCase();
    const tags = product.tags.join(' ').toLowerCase();
    const title = product.title.toLowerCase();
    return keywords.some((kw) => type.includes(kw) || tags.includes(kw) || title.includes(kw));
  });
}

function matchesQuery(product: RawProduct, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    product.title.toLowerCase().includes(q) ||
    product.vendor.toLowerCase().includes(q) ||
    product.tags.some((t) => t.toLowerCase().includes(q)) ||
    (product.productType ?? '').toLowerCase().includes(q)
  );
}

function matchesPrices(product: RawProduct, priceIndices: number[]): boolean {
  if (priceIndices.length === 0) return true; // If nothing selected, match all
  const price = parseFloat(product.price.amount);
  return priceIndices.some((idx) => {
    const range = PRICE_RANGES[idx];
    return price >= range.min && price <= range.max;
  });
}

function matchesBrands(product: RawProduct, brands: string[]): boolean {
  if (brands.length === 0) return true; // If nothing selected, match all
  return brands.includes(product.vendor);
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceIndices, setSelectedPriceIndices] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [allProducts, setAllProducts] = useState<RawProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Dynamically extract and sort unique brands from the loaded products
  const availableBrands = Array.from(new Set(allProducts.map((p) => p.vendor)))
    .filter(Boolean)
    .sort();

  // Fetch products once when overlay first opens
  useEffect(() => {
    if (!isOpen || allProducts.length > 0) return;
    setLoading(true);
    fetch('/api/search-products')
      .then((r) => r.json())
      .then((data: RawProduct[]) => setAllProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isOpen, allProducts.length]);

  // Focus input when opening and reset state on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setSelectedCategories([]);
      setSelectedPriceIndices([]);
      setSelectedBrands([]);
      setShowFilters(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Helper function to toggle items in arrays
  const toggleArrayItem = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, item: T) => {
    setter((prev) => 
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const results = allProducts.filter((p) =>
    matchesQuery(p, query) &&
    matchesCategories(p, selectedCategories) &&
    matchesPrices(p, selectedPriceIndices) &&
    matchesBrands(p, selectedBrands)
  );

  const hasFilters = selectedCategories.length > 0 || selectedPriceIndices.length > 0 || selectedBrands.length > 0;
  const showResults = query.trim().length > 0 || hasFilters;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-[61] bg-vault-bg border-b border-vault-border shadow-2xl"
            style={{ maxHeight: '90vh' }}
          >
            {/* Search bar */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-4 h-16 border-b border-vault-border">
                <Search size={18} strokeWidth={1.5} className="text-vault-gold flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by brand, item, keyword…"
                  className="flex-1 bg-transparent text-vault-text placeholder:text-vault-muted text-base outline-none"
                />
                <button
                  onClick={() => setShowFilters((v) => !v)}
                  className={`flex items-center gap-1.5 text-xs tracking-wider uppercase transition-colors px-3 py-1.5 border ${
                    hasFilters || showFilters
                      ? 'border-vault-gold text-vault-gold'
                      : 'border-vault-border text-vault-muted hover:text-vault-text hover:border-vault-border'
                  }`}
                >
                  <SlidersHorizontal size={13} strokeWidth={1.5} />
                  <span className="hidden sm:inline">Filters</span>
                  {hasFilters && (
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-gold" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="text-vault-muted hover:text-vault-text transition-colors"
                  aria-label="Close search"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Filters row */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="py-4 flex flex-col gap-6 border-b border-vault-border">
                      
                      <div className="flex flex-wrap gap-6">
                        {/* Category */}
                        <div className="flex flex-col gap-2">
                          <p className="text-[10px] tracking-widest uppercase text-vault-muted">Category</p>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              onClick={() => setSelectedCategories([])}
                              className={`px-3 py-1 text-xs tracking-wider uppercase border transition-all duration-150 ${
                                selectedCategories.length === 0
                                  ? 'border-vault-gold text-vault-gold bg-vault-gold/5'
                                  : 'border-vault-border text-vault-muted hover:text-vault-text hover:border-vault-border/80'
                              }`}
                            >
                              All Categories
                            </button>
                            {CATEGORIES.map((cat) => (
                              <button
                                key={cat.value}
                                onClick={() => toggleArrayItem(setSelectedCategories, cat.value)}
                                className={`px-3 py-1 text-xs tracking-wider uppercase border transition-all duration-150 ${
                                  selectedCategories.includes(cat.value)
                                    ? 'border-vault-gold text-vault-gold bg-vault-gold/5'
                                    : 'border-vault-border text-vault-muted hover:text-vault-text hover:border-vault-border/80'
                                }`}
                              >
                                {cat.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-2">
                          <p className="text-[10px] tracking-widest uppercase text-vault-muted">Price</p>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              onClick={() => setSelectedPriceIndices([])}
                              className={`px-3 py-1 text-xs tracking-wider uppercase border transition-all duration-150 ${
                                selectedPriceIndices.length === 0
                                  ? 'border-vault-gold text-vault-gold bg-vault-gold/5'
                                  : 'border-vault-border text-vault-muted hover:text-vault-text hover:border-vault-border/80'
                              }`}
                            >
                              Any Price
                            </button>
                            {PRICE_RANGES.map((range, i) => (
                              <button
                                key={range.label}
                                onClick={() => toggleArrayItem(setSelectedPriceIndices, i)}
                                className={`px-3 py-1 text-xs tracking-wider uppercase border transition-all duration-150 ${
                                  selectedPriceIndices.includes(i)
                                    ? 'border-vault-gold text-vault-gold bg-vault-gold/5'
                                    : 'border-vault-border text-vault-muted hover:text-vault-text hover:border-vault-border/80'
                                }`}
                              >
                                {range.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Brand */}
                      {availableBrands.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <p className="text-[10px] tracking-widest uppercase text-vault-muted">Brand</p>
                          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                            <button
                              onClick={() => setSelectedBrands([])}
                              className={`px-3 py-1 text-xs tracking-wider uppercase border transition-all duration-150 ${
                                selectedBrands.length === 0
                                  ? 'border-vault-gold text-vault-gold bg-vault-gold/5'
                                  : 'border-vault-border text-vault-muted hover:text-vault-text hover:border-vault-border/80'
                              }`}
                            >
                              All Brands
                            </button>
                            {availableBrands.map((b) => (
                              <button
                                key={b}
                                onClick={() => toggleArrayItem(setSelectedBrands, b)}
                                className={`px-3 py-1 text-xs tracking-wider uppercase border transition-all duration-150 ${
                                  selectedBrands.includes(b)
                                    ? 'border-vault-gold text-vault-gold bg-vault-gold/5'
                                    : 'border-vault-border text-vault-muted hover:text-vault-text hover:border-vault-border/80'
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Clear Filters */}
                      {hasFilters && (
                        <div className="flex items-end">
                          <button
                            onClick={() => { setSelectedCategories([]); setSelectedPriceIndices([]); setSelectedBrands([]); }}
                            className="text-xs text-vault-muted hover:text-vault-text underline underline-offset-2 transition-colors"
                          >
                            Clear filters
                          </button>
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results */}
            <div
              className="max-w-4xl mx-auto px-4 sm:px-6 overflow-y-auto"
              style={{ maxHeight: 'calc(90vh - 64px)' }}
            >
              {loading && (
                <div className="py-16 text-center">
                  <div className="w-6 h-6 border border-vault-gold border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              )}

              {!loading && showResults && results.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-vault-muted text-sm">No items found.</p>
                  <p className="text-vault-muted/60 text-xs mt-1">Try adjusting your search or filters.</p>
                </div>
              )}

              {!loading && showResults && results.length > 0 && (
                <div className="py-4">
                  <p className="text-[10px] tracking-widest uppercase text-vault-muted mb-4">
                    {results.length} {results.length === 1 ? 'result' : 'results'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-8">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.handle}`}
                        onClick={onClose}
                        className="group flex flex-col gap-2"
                      >
                        <div className="aspect-square bg-vault-surface border border-vault-border overflow-hidden relative">
                          {product.featuredImage ? (
                            <Image
                              src={product.featuredImage.url}
                              alt={product.featuredImage.altText ?? product.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-vault-gold text-xs">LB</span>
                            </div>
                          )}
                          {!product.availableForSale && (
                            <div className="absolute inset-0 bg-vault-bg/60 flex items-center justify-center">
                              <span className="text-[9px] tracking-widest uppercase text-vault-muted border border-vault-border px-2 py-0.5 bg-vault-bg">
                                Sold
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] tracking-wider uppercase text-vault-gold truncate">{product.vendor}</p>
                          <p className="text-xs text-vault-text leading-snug line-clamp-2 mt-0.5">{product.title}</p>
                          <p className="text-xs text-vault-muted mt-1">
                            {parseFloat(product.price.amount).toLocaleString('en-US', {
                              style: 'currency',
                              currency: product.price.currencyCode,
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
