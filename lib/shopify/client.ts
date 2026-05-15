import type { ShopifyProduct, ShopifyCart, ShopifyImage, ProductCardData } from './types';
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_CART_QUERY,
  GET_CATEGORY_PREVIEW_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
} from './queries';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? '';
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? '';
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Shopify fetch error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }

  return json.data as T;
}

export async function getProducts(first = 48): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(GET_PRODUCTS_QUERY, { first });

  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(
    GET_PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return data.productByHandle;
}

export function toProductCardData(product: ShopifyProduct): ProductCardData {
  const firstVariant = product.variants.edges[0]?.node;
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    vendor: product.vendor,
    availableForSale: product.availableForSale,
    featuredImage: product.featuredImage,
    price: product.priceRange.minVariantPrice,
    compareAtPrice: firstVariant?.compareAtPrice ?? null,
  };
}

export async function getCategoryPreviewImage(shopifyQuery: string): Promise<ShopifyImage | null> {
  try {
    const data = await shopifyFetch<{
      products: { edges: { node: { featuredImage: ShopifyImage | null } }[] };
    }>(GET_CATEGORY_PREVIEW_QUERY, { query: shopifyQuery });
    return data.products.edges[0]?.node?.featuredImage ?? null;
  } catch {
    return null;
  }
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
    GET_CART_QUERY,
    { cartId }
  );
  return data.cart;
}

export async function createCart(variantId: string): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    CREATE_CART_MUTATION,
    { lines: [{ merchandiseId: variantId, quantity: 1 }] }
  );
  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    ADD_TO_CART_MUTATION,
    { cartId, lines: [{ merchandiseId: variantId, quantity: 1 }] }
  );
  return data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineId: string): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    REMOVE_FROM_CART_MUTATION,
    { cartId, lineIds: [lineId] }
  );
  return data.cartLinesRemove.cart;
}
