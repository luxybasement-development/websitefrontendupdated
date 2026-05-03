import Link from 'next/link';
import { Shield, Instagram, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';

const NewsletterSection = dynamic(() => import('@/components/home/NewsletterSection'), { ssr: false });

const SHOP_LINKS = [
  { label: 'All Items', href: '/products' },
  { label: 'New Arrivals', href: '/products?type=new' },
  { label: 'Handbags', href: '/products?type=handbags' },
  { label: 'Watches', href: '/products?type=watches' },
  { label: 'Jewelry', href: '/products?type=jewelry' },
  { label: 'Accessories', href: '/products?type=accessories' },
];

const INFO_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Sell Your Items', href: '/sell' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Return Policy', href: '/return-policy' },
  { label: 'Seller Terms', href: '/seller-terms' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Sister Boutique', href: '/boutique' },
];

export default function Footer() {
  return (
    <div className="bg-vault-surface border-t border-vault-border">
      <div className="border-b border-vault-border py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase text-vault-gold mb-4">Backed by Nearly 30 Years of Professional Authentication Experience</p>
          <p className="font-serif italic text-vault-text text-xl mb-4">
            "What you see is exactly what you get."
          </p>
          <p className="text-vault-muted text-sm leading-relaxed">
            We skip the expensive photo studios to bring you the best possible prices.
            Our items are authenticated, inspected, and photographed directly in our facility
            the moment they arrive. This lean, honest approach gives you an unfiltered look
            at your next luxury piece — and passes the savings directly to you.
          </p>
        </div>
      </div>

      <NewsletterSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 border border-vault-gold flex items-center justify-center">
                <span className="text-vault-gold text-xs font-bold">LB</span>
              </div>
              <span className="text-vault-text font-semibold tracking-[0.15em] uppercase text-sm">
                LUXY<span className="text-vault-gold">BASEMENT</span>
              </span>
            </div>
            <p className="text-vault-muted text-sm leading-relaxed max-w-xs mb-6">
              Your premier source for authenticated pre-owned designer luxury goods.
              Backed by nearly 30 years of professional authentication experience — no studio overhead, no inflated prices.
            </p>
            <div className="flex items-center gap-4 mb-6">
              
                href="https://instagram.com/luxybasement"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-vault-muted hover:text-vault-gold transition-colors"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              
                href="/contact"
                aria-label="Contact Us"
                className="text-vault-muted hover:text-vault-gold transition-colors"
              >
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
            <div className="flex items-center gap-2 border border-vault-border bg-vault-bg px-4 py-3 w-fit">
              <Shield size={13} className="text-vault-gold" />
              <span className="text-[10px] tracking-widest uppercase text-vault-muted">100% Verified Authentic</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs tracking-widest uppercase text-vault-muted mb-5">Shop</h3>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-vault-muted hover:text-vault-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-widest uppercase text-vault-muted mb-5">Info</h3>
            <ul className="space-y-3">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-vault-muted hover:text-vault-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-vault-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-vault-muted">
            &copy; {new Date().getFullYear()} LuxyBasement. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
