import { getCategoryPreviewImage } from '@/lib/shopify/client';
import CategoryGridClient from './CategoryGridClient';

const CATEGORIES = [
  {
    title: 'Handbags',
    sub: 'Iconic silhouettes from Chanel, Hermès, LV & more',
    href: '/products?type=handbags',
    query: 'product_type:handbag OR product_type:bag OR product_type:purse OR product_type:tote',
    fallback: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: 'lg:col-span-2',
  },
  {
    title: 'Watches',
    sub: 'Certified pre-owned timepieces',
    href: '/products?type=watches',
    query: 'product_type:watch OR product_type:timepiece',
    fallback: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: '',
  },
  {
    title: 'Accessories',
    sub: 'Scarves, belts, wallets & more',
    href: '/products?type=accessories',
    query: 'product_type:accessories OR product_type:scarf OR product_type:belt OR product_type:wallet',
    fallback: 'https://images.pexels.com/photos/1038000/pexels-photo-1038000.jpeg?auto=compress&cs=tinysrgb&w=800',
    span: '',
  },
];

export default async function CategoryGrid() {
  const images = await Promise.all(
    CATEGORIES.map((cat) => getCategoryPreviewImage(cat.query))
  );

  const categories = CATEGORIES.map((cat, i) => ({
    title: cat.title,
    sub: cat.sub,
    href: cat.href,
    span: cat.span,
    image: images[i]?.url ?? cat.fallback,
  }));

  return <CategoryGridClient categories={categories} />;
}
