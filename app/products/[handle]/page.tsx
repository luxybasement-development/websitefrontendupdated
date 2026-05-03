import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Shield, Tag, Package, Ruler, CircleCheck as CheckCircle2, ChevronDown } from 'lucide-react';
import { getProductByHandle, getProducts } from '@/lib/shopify/client';
import ImageGallery from '@/components/pdp/ImageGallery';
import AddToCartButton from '@/components/pdp/AddToCartButton';
import ShopWithConfidence from '@/components/pdp/ShopWithConfidence';

interface PageProps {
  params: { handle: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const product = await getProductByHandle(params.handle);
    if (!product) return { title: 'Product Not Found — LuxyBasement' };
    return {
      title: `${product.title} — LuxyBasement`,
      description: product.description.slice(0, 160),
    };
  } catch {
    return { title: 'LuxyBasement' };
  }
}

export async function generateStaticParams() {
  try {
    const products = await getProducts(50);
    return products.map((p) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
}

const CONDITION_MAP: Record<string, { label: string; description: string; color: string; border: string; bg: string }> = {
  pristine: {
    label: 'PRISTINE',
    description: 'Never used. No signs of wear whatsoever. May include original tags and packaging.',
    color: 'text-emerald-400',
    border: 'border-emerald-400/30',
    bg: 'bg-emerald-400/5',
  },
  'like new': {
    label: 'LIKE NEW',
    description: 'Very lightly used with minimal signs of handling. Nearly indistinguishable from new.',
    color: 'text-vault-gold',
    border: 'border-vault-gold/30',
    bg: 'bg-vault-gold/5',
  },
  'gently used': {
    label: 'GENTLY USED',
    description: 'Shows normal signs of regular use — minor scuffs, light patina. Structurally sound.',
    color: 'text-orange-400',
    border: 'border-orange-400/30',
    bg: 'bg-orange-400/5',
  },
  'well used': {
    label: 'WELL USED',
    description: 'Visible wear including scuffs, corner wear, fading, or hardware tarnish.',
    color: 'text-red-400',
    border: 'border-red-400/30',
    bg: 'bg-red-400/5',
  },
};

// Normalize condition keys — check metafield first, then tags
function resolveCondition(metafieldValue: string | null | undefined, tags: string[]) {
  const candidates = [
    metafieldValue,
    ...tags,
  ].filter(Boolean).map((s) => s!.toLowerCase().trim());

  for (const candidate of candidates) {
    if (CONDITION_MAP[candidate]) return CONDITION_MAP[candidate];
    // partial match
    for (const key of Object.keys(CONDITION_MAP)) {
      if (candidate.includes(key)) return CONDITION_MAP[key];
    }
  }
  return null;
}

// Tags to show (excluding condition tags and common noise)
const CONDITION_KEYS = new Set(['pristine', 'like new', 'gently used', 'well used']);
function filterDisplayTags(tags: string[]): string[] {
  return tags.filter((t) => !CONDITION_KEYS.has(t.toLowerCase().trim())).slice(0, 5);
}

export default async function ProductPage({ params }: PageProps) {
  let product;
  try {
    product = await getProductByHandle(params.handle);
  } catch {
    notFound();
  }

  if (!product) notFound();

  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const firstVariant = variants[0];
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );
  const compareAt = firstVariant?.compareAtPrice
    ? formatPrice(firstVariant.compareAtPrice.amount, firstVariant.compareAtPrice.currencyCode)
    : null;
  const discount =
    compareAt && firstVariant?.compareAtPrice
      ? Math.round(
          ((parseFloat(firstVariant.compareAtPrice.amount) -
            parseFloat(product.priceRange.minVariantPrice.amount)) /
            parseFloat(firstVariant.compareAtPrice.amount)) *
            100
        )
      : null;

  const condition = resolveCondition(product.metafield?.value, product.tags);
  const conditionNotes = product.conditionNotes?.value ?? null;
  const displayTags = filterDisplayTags(product.tags);

  return (
    <div className="min-h-screen bg-vault-bg pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10 text-xs text-vault-muted tracking-wider">
          <a href="/" className="hover:text-vault-text transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-vault-text transition-colors">All Items</a>
          <span>/</span>
          <span className="text-vault-muted line-clamp-1">{product.title}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* LEFT: Image Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start min-w-0">
            <ImageGallery images={images} title={product.title} />

            {/* Facility Notice */}
            <div className="mt-4 flex items-start gap-3 border border-vault-border bg-vault-surface p-4">
              <div className="w-6 h-6 border border-vault-border flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-vault-gold text-[9px] font-bold">LB</span>
              </div>
              <p className="text-xs text-vault-muted leading-relaxed">
                <span className="text-vault-text font-medium">Photography.</span>{' '}
                These photos were taken in our facility and may be limited in production quality. Need more angles or closer detail? Request additional photos above — we'll shoot and send them within a few hours.
              </p>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="space-y-8">
            {/* Brand + Title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <p className="text-xs tracking-[0.3em] uppercase text-vault-gold font-semibold">
                  {product.vendor}
                </p>
                {!product.availableForSale && (
                  <span className="text-[10px] tracking-widest uppercase bg-vault-surface border border-vault-border text-vault-muted px-2 py-0.5">
                    Sold
                  </span>
                )}
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-vault-text leading-snug tracking-tight">
                {product.title}
              </h1>

              {/* Condition Badge */}
              {condition && (
                <div className={`mt-4 inline-flex items-center gap-3 border ${condition.border} ${condition.bg} px-4 py-2`}>
                  <span className={`text-xs font-bold tracking-widest ${condition.color}`}>
                    {condition.label}
                  </span>
                  <span className="text-[10px] text-vault-muted">{condition.description}</span>
                </div>
              )}

              {/* Other Tags */}
              {displayTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {displayTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-widest uppercase px-2 py-1 border border-vault-border text-vault-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-vault-text">{price}</span>
              {compareAt && (
                <span className="text-base text-vault-muted line-through">{compareAt}</span>
              )}
              {discount && discount > 0 && (
                <span className="text-sm text-vault-gold font-semibold">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Variant selector */}
            {variants.length > 1 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-vault-muted mb-3">Select Option</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      disabled={!v.availableForSale}
                      className={`px-4 py-2 border text-sm transition-all ${
                        v.availableForSale
                          ? 'border-vault-border text-vault-text hover:border-vault-gold hover:text-vault-gold'
                          : 'border-vault-border/40 text-vault-muted/40 line-through cursor-not-allowed'
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AddToCartButton
              variantId={firstVariant?.id ?? ''}
              availableForSale={product.availableForSale && (firstVariant?.availableForSale ?? false)}
            />

            {/* Shop with Confidence Card */}
            <ShopWithConfidence
              productTitle={product.title}
              productHandle={product.handle}
            />

            {/* Product Details Accordions */}
            <div className="space-y-4 pt-2">
              {/* Description */}
              {product.descriptionHtml && (
                <details className="group border border-vault-border">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      <Tag size={14} className="text-vault-gold" strokeWidth={1.5} />
                      <span className="text-xs tracking-widest uppercase font-semibold text-vault-text">
                        Description
                      </span>
                    </div>
                    <ChevronDown
                      size={14}
                      className="text-vault-muted transition-transform group-open:rotate-180"
                      strokeWidth={1.5}
                    />
                  </summary>
                  <div
                    className="px-5 pb-5 text-sm text-vault-muted leading-relaxed prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                </details>
              )}

              {/* Authentication & Condition */}
              <details className="group border border-vault-border" open>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <Shield size={14} className="text-vault-gold" strokeWidth={1.5} />
                    <span className="text-xs tracking-widest uppercase font-semibold text-vault-text">
                      Authentication & Condition
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className="text-vault-muted transition-transform group-open:rotate-180"
                    strokeWidth={1.5}
                  />
                </summary>
                <div className="px-5 pb-5 space-y-3">
                  {condition && (
                    <div className={`flex items-start gap-3 border ${condition.border} ${condition.bg} p-3 mb-4`}>
                      <div>
                        <span className={`text-xs font-bold tracking-widest block mb-0.5 ${condition.color}`}>
                          Condition: {condition.label}
                        </span>
                        <span className="text-xs text-vault-muted">{condition.description}</span>
                      </div>
                    </div>
                  )}
                  {conditionNotes && (
                    <div className="border border-vault-border bg-vault-bg p-3 mb-1">
                      <p className="text-xs text-vault-muted leading-relaxed">{conditionNotes}</p>
                    </div>
                  )}
                  {[
                    'Authenticated in-house upon arrival by our team',
                    'Inspected for condition and completeness',
                    'Full refund if ever proven inauthentic — buy with complete certainty',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={13} className="text-vault-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-xs text-vault-muted">{item}</span>
                    </div>
                  ))}
                </div>
              </details>

              {/* Shipping & Returns */}
              <details className="group border border-vault-border">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <Package size={14} className="text-vault-gold" strokeWidth={1.5} />
                    <span className="text-xs tracking-widest uppercase font-semibold text-vault-text">
                      Shipping & Returns
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className="text-vault-muted transition-transform group-open:rotate-180"
                    strokeWidth={1.5}
                  />
                </summary>
                <div className="px-5 pb-5 space-y-3">
                  {[
                    'Fully insured UPS shipping — signature required on delivery',
                    'Ships within 1–2 business days of order',
                    'No P.O. Boxes · Domestic US orders only',
                    'Sales tax collected on Washington state orders',
                    '30-day return window — yellow "Keep This Tag On" tag must remain attached',
                    'Tag removed? A 15% restocking fee applies',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={13} className="text-vault-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-xs text-vault-muted">{item}</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
