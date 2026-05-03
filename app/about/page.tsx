import type { Metadata } from 'next';
import { Shield, Award, Heart, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story — LuxyBasement',
  description:
    'How nearly three decades of authentication expertise and a desire to help friends became one of the most trusted names in pre-owned luxury.',
};

const MILESTONES = [
  {
    year: 'The Beginning',
    heading: 'A favor between friends',
    body: 'It started the way most meaningful things do — someone asked for help. A close friend had a collection of designer handbags she no longer carried and wanted to sell them fairly, without getting taken advantage of. With nearly 30 years of experience authenticating luxury goods professionally, the answer was obvious: we would handle it ourselves.',
  },
  {
    year: 'Word Spreads',
    heading: 'One friend became many',
    body: 'Word traveled quietly. A sister. A colleague. A neighbor who had inherited a Cartier watch and had no idea what it was truly worth. Each time, the same promise was made: we will tell you exactly what you have, exactly what it is worth, and make sure you are treated fairly — whether you are buying or selling.',
  },
  {
    year: 'The Vault Opens',
    heading: 'LuxyBasement is born',
    body: 'What had been a quiet side practice became something more intentional. We built LuxyBasement around a simple belief: the pre-owned luxury market deserved more transparency. No inflated "market value" theater. No mystery grades. Just authenticated pieces, honestly photographed, priced to reflect what they actually are.',
  },
  {
    year: 'Today',
    heading: 'Trust, built one piece at a time',
    body: 'Every item that enters our facility is personally inspected before it is listed. We skip the expensive studios and pass that savings directly to you. Our clients come back — not because of clever marketing, but because what we say is what you get.',
  },
];

const VALUES = [
  {
    icon: Shield,
    title: 'Uncompromising Authentication',
    body: 'Nearly three decades of hands-on experience means we have seen every replica, every restoration, every clever deception the market produces. If something does not pass, it does not list. Full stop.',
  },
  {
    icon: Award,
    title: 'Honest Pricing',
    body: 'We do not maintain a photo studio, a PR department, or a brand-building overhead. That discipline is what allows us to price pieces the way they should be priced — based on what they actually are, not what a marketing team needs them to be.',
  },
  {
    icon: Heart,
    title: 'Pieces With Provenance',
    body: 'Every Chanel, every Hermès, every piece that passes through our doors has a story. We respect that. Our clients are not just buying an object — they are acquiring something real, something with history, something that will outlast a trend cycle.',
  },
  {
    icon: Users,
    title: 'A Community, Not a Catalog',
    body: 'Our sellers are not drop-shippers. They are people who loved something, used it well, and want it to find the right next home. That ethos shapes every interaction we have, from intake to delivery.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-vault-bg pt-28 pb-24">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-vault-gold" />
          <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Our Story</span>
        </div>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-vault-text tracking-tight leading-[1.05] mb-8">
          Built on Trust.<br />
          <span className="text-vault-gold">Thirty Years</span> in the Making.
        </h1>
        <p className="text-vault-muted text-lg leading-relaxed max-w-2xl">
          LuxyBasement did not begin as a business plan. It began as a promise to a friend
          — to handle her things with the same care and expertise we had spent three decades
          cultivating in the professional authentication world.
        </p>
      </section>

      {/* Divider image strip */}
      <div className="w-full h-px bg-vault-border" />

      {/* Story Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-0">
          {MILESTONES.map((m, i) => (
            <div
              key={m.year}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-16 border-b border-vault-border py-12 last:border-b-0"
            >
              <div className="flex md:flex-col md:pt-1">
                <span className="text-xs tracking-[0.25em] uppercase text-vault-gold font-medium">
                  {m.year}
                </span>
              </div>
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vault-text mb-4">
                  {m.heading}
                </h2>
                <p className="text-vault-muted leading-relaxed text-[15px]">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-vault-surface border-y border-vault-border py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-px h-12 bg-vault-gold mx-auto mb-8" />
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-vault-text leading-relaxed mb-6">
            "We have never listed a single item we would not be comfortable handing to a friend."
          </blockquote>
          <p className="text-xs tracking-widest uppercase text-vault-gold">
            The LuxyBasement Standard
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-vault-gold" />
          <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">What We Stand For</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-vault-text tracking-tight mb-14">
          The principles behind every piece
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-vault-border border border-vault-border">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="bg-vault-bg p-8 sm:p-10">
                <div className="w-10 h-10 border border-vault-border flex items-center justify-center mb-6">
                  <Icon size={18} strokeWidth={1.5} className="text-vault-gold" />
                </div>
                <h3 className="text-base font-semibold text-vault-text tracking-wide mb-3">
                  {v.title}
                </h3>
                <p className="text-vault-muted text-sm leading-relaxed">{v.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Authentication badge strip */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="border border-vault-border bg-vault-surface p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-16 h-16 border border-vault-gold flex items-center justify-center">
            <Shield size={28} strokeWidth={1} className="text-vault-gold" />
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-vault-gold mb-2">Our Guarantee</p>
            <h3 className="font-serif text-xl font-bold text-vault-text mb-2">
              Every item. Every time. Fully authenticated.
            </h3>
            <p className="text-vault-muted text-sm leading-relaxed">
              If an item does not pass our authentication review, it does not appear on the site.
              No exceptions. If you ever receive something that does not match its listing,
              we will make it right — immediately and without question.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
