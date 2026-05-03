import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Gem, Shield, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Sister Boutique — LuxyBasement',
  description:
    'Discover Luxybit — our sister boutique offering a curated selection of pre-owned luxury, handpicked with the same authentication standards you trust.',
};

const HIGHLIGHTS = [
  {
    icon: Gem,
    title: 'Curated Selection',
    body: 'Luxybit is not a marketplace — it is a boutique. Every piece is handpicked and presented with context, condition notes, and careful styling.',
  },
  {
    icon: Shield,
    title: 'Shared Authentication Standards',
    body: 'Luxybit and LuxyBasement share the same authentication backbone. What passes our review passes theirs. No grey area, no guesswork.',
  },
  {
    icon: Sparkles,
    title: 'A Different Aesthetic',
    body: 'Where LuxyBasement is direct and vault-like, Luxybit brings a lighter touch — think of it as the sunlit showroom to our basement vault.',
  },
];

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-vault-bg pt-28 pb-24">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 border-b border-vault-border">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-vault-gold" />
          <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Sister Boutique</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-vault-text tracking-tight leading-[1.05] mb-6">
              Meet <span className="text-vault-gold">Luxybit</span>
            </h1>
            <p className="text-vault-muted text-lg leading-relaxed">
              A sister brand born from the same world — and the same insistence on authenticity.
              Luxybit is where pre-owned luxury is given room to breathe: styled, contextualized,
              and presented for the buyer who wants a bit more curation in the experience.
            </p>
          </div>
          <a
            href="https://luxybit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 inline-flex items-center gap-3 border border-vault-gold text-vault-gold px-7 py-4 text-sm tracking-widest uppercase hover:bg-vault-gold hover:text-vault-bg transition-all duration-300 self-start lg:self-auto"
          >
            Visit Luxybit
            <ArrowUpRight size={15} strokeWidth={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* What is Luxybit */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-vault-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-vault-gold mb-5">The Relationship</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-vault-text mb-6 leading-tight">
              Two names. One standard.
            </h2>
            <div className="space-y-5 text-vault-muted text-[15px] leading-relaxed">
              <p>
                LuxyBasement and Luxybit share DNA. They grew out of the same expertise,
                the same commitment to authentication, and the same core belief: that buying
                pre-owned luxury should feel safe, not stressful.
              </p>
              <p>
                The difference is in the experience. LuxyBasement is direct — a vault of
                verified pieces, priced honestly, photographed as-is. Luxybit layers on a
                boutique sensibility, offering more editorial curation for the buyer who
                shops by feeling as much as by specification.
              </p>
              <p>
                Together, they cover the full spectrum of how people approach pre-owned luxury.
                Some want the vault. Some want the boutique. Now you can have both.
              </p>
            </div>
          </div>

          {/* Decorative card */}
          <div className="border border-vault-border bg-vault-surface p-10 flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="w-10 h-10 border border-vault-gold flex items-center justify-center mb-6">
                <span className="text-vault-gold text-sm font-bold tracking-tight">LB</span>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-vault-muted mb-2">A note from LuxyBasement</p>
              <p className="font-serif italic text-vault-text text-lg leading-relaxed">
                "We point our clients to Luxybit with full confidence. If something lives there,
                it has been held to the same standard we hold ourselves to — no exceptions."
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-vault-border">
              <a
                href="https://luxybit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-vault-gold text-xs tracking-widest uppercase hover:gap-3 transition-all"
              >
                Explore Luxybit <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-vault-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-vault-gold" />
          <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">What to expect</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-vault-text mb-12">
          Why we love recommending it
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-vault-border border border-vault-border">
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.title} className="bg-vault-bg p-8">
                <div className="w-9 h-9 border border-vault-border flex items-center justify-center mb-5">
                  <Icon size={16} strokeWidth={1.5} className="text-vault-gold" />
                </div>
                <h3 className="text-sm font-semibold text-vault-text mb-3">{h.title}</h3>
                <p className="text-vault-muted text-sm leading-relaxed">{h.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 border border-vault-border bg-vault-surface p-10 sm:p-14">
          <div>
            <p className="text-xs tracking-widest uppercase text-vault-gold mb-3">Ready to explore?</p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vault-text">
              The boutique is waiting.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href="https://luxybit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-vault-gold text-vault-bg px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-vault-gold/90 transition-colors"
            >
              Visit Luxybit <ArrowUpRight size={14} />
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border border-vault-border text-vault-muted hover:text-vault-text hover:border-vault-border/80 px-8 py-4 text-sm tracking-widest uppercase transition-colors"
            >
              Shop The Vault
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
