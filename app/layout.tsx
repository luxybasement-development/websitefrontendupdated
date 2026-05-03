import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import CartProvider from '@/components/layout/CartProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LuxyBasement — Pre-Owned Designer Luxury Goods',
  description:
    'Authenticated pre-owned designer luxury goods at outlet prices. Handbags, watches, and accessories from the world\'s top luxury houses.',
  keywords: 'pre-owned luxury, designer handbags, authenticated luxury, Chanel, Louis Vuitton, Hermès, Gucci',
  openGraph: {
    title: 'LuxyBasement — The Vault Outlet',
    description: 'Authenticated pre-owned designer luxury goods at outlet prices.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxyBasement — The Vault Outlet',
    description: 'Authenticated pre-owned designer luxury goods at outlet prices.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${playfair.variable}`}>
      <body className={`${spaceGrotesk.className} bg-vault-bg text-vault-text antialiased`}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
