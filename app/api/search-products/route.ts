import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify/client';

export async function GET() {
  try {
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
      headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
