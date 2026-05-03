'use client';

import { motion } from 'framer-motion';
import { Upload, MessageSquare, Package, DollarSign } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Upload,
    title: 'Submit',
    subtitle: 'Tell Us What You Have',
    description:
      'Email us photos and details of your item — brand, model, condition, and any accessories included (receipt, dust bag, authenticity cards). The more information you share, the faster we can review.',
    detail: 'Email: luxybasement@gmail.com',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Range',
    subtitle: 'Receive a Price Range in 24 Hours',
    description:
      "We'll review your submission and respond with a competitive price range within 24 hours. We provide a range upfront because our final offer may vary slightly based on our hands-on condition assessment once we receive the item — so you know exactly what to expect before you ship.",
    detail: 'Response within 24 business hours',
  },
  {
    number: '03',
    icon: Package,
    title: 'Ship',
    subtitle: 'Free Pre-Paid UPS Label',
    description:
      "Once you accept our offer, we'll email you a fully pre-paid, insured UPS shipping label. Package your item securely and drop it off at any UPS location — we handle everything from there.",
    detail: 'Pre-paid & insured UPS shipping',
  },
  {
    number: '04',
    icon: DollarSign,
    title: 'Payment',
    subtitle: 'Paid the Next Business Day',
    description:
      "Upon receiving and authenticating your item, we issue payment the next business day. Choose your preferred method: check by mail, direct bank deposit, or PayPal.",
    detail: 'Check · Direct Deposit · PayPal',
  },
];

export default function SellProcess() {
  return (
    <section id="process" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-vault-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Our Process</span>
            <div className="h-px w-8 bg-vault-gold" />
          </div>
          <h2 className="font-serif text-4xl font-bold text-vault-text mb-4">
            Simple. Fast. Secure.
          </h2>
          <p className="text-vault-muted max-w-xl mx-auto">
            Four straightforward steps from submission to payment — designed around your time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%+16px)] w-[calc(100%-32px)] h-px bg-vault-border z-0" style={{ width: 'calc(100% - 32px)', left: 'calc(100% + 16px)' }} />
              )}

              <div className="border border-vault-border bg-vault-surface p-6 h-full flex flex-col relative z-10 hover:border-vault-gold transition-colors duration-300 group">
                {/* Number */}
                <span className="font-serif text-5xl font-bold text-vault-border group-hover:text-vault-gold/20 transition-colors duration-300 mb-4 leading-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 border border-vault-border group-hover:border-vault-gold flex items-center justify-center mb-5 transition-colors duration-300">
                  <step.icon size={18} strokeWidth={1.5} className="text-vault-gold" />
                </div>

                <h3 className="font-serif text-xl font-bold text-vault-text mb-1">{step.title}</h3>
                <p className="text-xs tracking-wider uppercase text-vault-gold mb-3">{step.subtitle}</p>
                <p className="text-sm text-vault-muted leading-relaxed flex-1">{step.description}</p>

                {/* Detail pill */}
                <div className="mt-5 pt-4 border-t border-vault-border">
                  <span className="text-[10px] tracking-widest uppercase text-vault-muted">{step.detail}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
