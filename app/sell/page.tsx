import type { Metadata } from 'next';
import SellHero from '@/components/sell/SellHero';
import SellProcess from '@/components/sell/SellProcess';
import BrandsWeBuy from '@/components/sell/BrandsWeBuy';
import SellerRequirements from '@/components/sell/SellerRequirements';
import SellCTA from '@/components/sell/SellCTA';

export const metadata: Metadata = {
  title: 'Sell Your Items — LuxyBasement',
  description:
    'Turn your pre-owned luxury goods into cash. Submit your item, receive a competitive offer within 24 hours, ship with a free UPS label, and get paid the next business day.',
};

export default function SellPage() {
  return (
    <div className="min-h-screen bg-vault-bg">
      <SellHero />
      <SellProcess />
      <BrandsWeBuy />
      <SellerRequirements />
      <SellCTA />
    </div>
  );
}
