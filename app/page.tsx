import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import BrandStrip from '@/components/home/BrandStrip';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ManifestoSection from '@/components/home/ManifestoSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import NewsletterSection from '@/components/home/NewsletterSection';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';

function ProductsSkeleton() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStrip />
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <ManifestoSection />
      <Suspense fallback={<div className="py-24 bg-vault-surface border-y border-vault-border" />}>
        <CategoryGrid />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
