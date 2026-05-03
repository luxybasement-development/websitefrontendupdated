'use client';

import { motion } from 'framer-motion';
import { CircleCheck as CheckCircle, Circle as XCircle, Info } from 'lucide-react';

const DO_INCLUDE = [
  'Original dust bag and box when available',
  'Authenticity cards and certificates of purchase',
  'Original receipt or proof of purchase',
  'All original hardware, straps, and accessories',
  'Lock and keys for applicable handbags',
];

const REQUIREMENTS = [
  'All serial numbers must be fully legible and intact',
  'Handbags must be free of odors (smoke, perfume, musty)',
  'Items must not have been altered, repaired, or restored without disclosure',
  'All clasps, zippers, and hardware must be functional',
  'Significant undisclosed damage may result in offer adjustment upon inspection',
];

const CONDITIONS = [
  {
    grade: 'PRISTINE',
    label: 'No visible wear',
    description: 'Item has never been used or shows absolutely no signs of use. May still have original tags and packaging.',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-400/30',
    bgColor: 'bg-emerald-400/5',
  },
  {
    grade: 'LIKE NEW',
    label: 'Slight wear only',
    description: 'Very lightly used with minimal signs of handling. May have been tried on or carried once or twice.',
    color: 'text-vault-gold',
    borderColor: 'border-vault-gold/30',
    bgColor: 'bg-vault-gold/5',
  },
  {
    grade: 'GENTLY USED',
    label: 'Regular wear visible',
    description: 'Shows normal signs of regular use — minor scuffs, light patina, or surface wear. Structurally sound.',
    color: 'text-orange-400',
    borderColor: 'border-orange-400/30',
    bgColor: 'bg-orange-400/5',
  },
  {
    grade: 'WELL USED',
    label: 'Visible wear & aging',
    description: 'Shows significant signs of regular use including scuffs, wear at corners, fading, or hardware tarnish.',
    color: 'text-red-400',
    borderColor: 'border-red-400/30',
    bgColor: 'bg-red-400/5',
  },
];

export default function SellerRequirements() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: What to Include */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-vault-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">For Best Offers</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-vault-text mb-4">
              What to Include
            </h2>
            <p className="text-vault-muted text-sm leading-relaxed mb-8">
              Items that come with original accessories consistently receive our highest offers. Here's what to gather before submitting:
            </p>

            <ul className="space-y-3 mb-10">
              {DO_INCLUDE.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={16} className="text-vault-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-sm text-vault-muted">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="border border-vault-border bg-vault-surface p-5">
              <div className="flex items-center gap-2 mb-3">
                <Info size={14} className="text-vault-gold" />
                <span className="text-xs tracking-widest uppercase text-vault-gold font-medium">Requirements</span>
              </div>
              <ul className="space-y-2">
                {REQUIREMENTS.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <XCircle size={13} className="text-vault-muted flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-xs text-vault-muted leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Condition Guide */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-vault-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Condition Guide</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-vault-text mb-4">
              Luxybasement Rating Scale
            </h2>
            <p className="text-vault-muted text-sm leading-relaxed mb-8">
              We rate every item on our 4-tier scale. Sellers should use this as a reference when describing their item's condition.
            </p>

            <div className="space-y-4">
              {CONDITIONS.map((cond, i) => (
                <motion.div
                  key={cond.grade}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`border ${cond.borderColor} ${cond.bgColor} p-5`}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className={`font-serif text-sm font-bold tracking-widest ${cond.color}`}>
                      {cond.grade}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-vault-muted">
                      {cond.label}
                    </span>
                  </div>
                  <p className="text-xs text-vault-muted leading-relaxed">{cond.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
