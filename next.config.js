/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ddkqwesyzvubstkmeezn.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRka3F3ZXN5enZ1YnN0a21lZXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NjQ3ODUsImV4cCI6MjA5MzI0MDc4NX0.m9TlTGJVU27bJOJlwsNRFNROCwirLuGOZfki08eWiWw',
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'luxybasement.myshopify.com',
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'c0faef693ecc4458144417be4341009c',
  },
};

module.exports = nextConfig;
