import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify/client';

// 1. Force Next.js to treat this route as dynamic, disabling build-time static caching
export const dynamic = 'force-dynamic';
export const revalidate = 0; 

export async function GET() {
  try {
    // Note: Shopify's GraphQL maximum for a single query is 250 items.
    const products = await getProducts(250);
    
    const slim = products.map((p) => ({
      id: p.id,
      handle: p.handle,
      title: p.title,
      vendor: p.vendor,
      productType: p.productType,
      tags: p.tags,
      availableForSale: p.availableForSale,
      featuredImage: p.featuredImage
        ? { url: p.featuredImage.url, altText: p.featuredImage.altText }
        : null,
      price: p.priceRange.minVariantPrice,
    }));

    return NextResponse.json(slim, {
      // 2. Keep a short browser/CDN cache so you don't overwhelm the API
      // while still getting fast updates (60 seconds)
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch (error) {
    console.error('Error fetching search products:', error);
    return NextResponse.json([], { status: 200 });
  }
}
