'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQSection[] = [
  {
    title: 'Buying & Orders',
    items: [
      {
        q: 'Can I be certain every item is authentic?',
        a: "Absolutely. Every item in our vault has been personally authenticated by our in-house team — backed by nearly 30 years of professional experience. We verify date codes, serial numbers, stitching, hardware, logo stampings, and craftsmanship on every single piece. We stand behind our authentication with complete certainty: if any item is ever proven inauthentic, you receive a full refund, no questions asked.",
      },
      {
        q: 'What are your shipping policies?',
        a: "All orders ship via UPS with signature required upon delivery. We do not ship to P.O. Boxes. We currently only ship within the United States — no international shipping at this time. Items are fully insured during transit.",
      },
      {
        q: 'Do you collect sales tax?',
        a: "Sales tax is collected on orders shipping to Washington state, in accordance with state tax law. No sales tax is charged on orders shipping to other states.",
      },
      {
        q: 'Can I combine multiple items into one order?',
        a: "Yes. Add all desired items to your cart and proceed through Shopify checkout. All items ship together where possible. Contact us at luxybasement@gmail.com if you have questions about multi-item orders.",
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: "We offer a 30-day return policy from the date of delivery. To be eligible for a return, the item must be in the same condition as received and the yellow 'Keep This Tag On' tag must still be attached. If the tag has been removed, a 15% restocking fee will be deducted from your refund.",
      },
      {
        q: "What is the 'Keep This Tag On' tag?",
        a: "Every item ships with a small yellow tag with the instruction 'Keep This Tag On.' This tag must remain attached to the item for the return to be accepted without a restocking fee. Please do not remove this tag until you are certain you wish to keep the item.",
      },
      {
        q: 'How do I initiate a return?',
        a: "Email luxybasement@gmail.com within 30 days of delivery with your order number and reason for return. We will provide return instructions and a return shipping label. Items sent back without prior authorization will not be accepted.",
      },
      {
        q: 'When will I receive my refund?',
        a: "Refunds are processed within 5–7 business days of receiving and inspecting the returned item. Refunds are issued to the original payment method.",
      },
    ],
  },
  {
    title: 'Authentication',
    items: [
      {
        q: 'How do you authenticate items?',
        a: "Our in-house authenticators examine every item against brand-specific criteria including: hardware weight, logo stampings, date code formatting, stitching count and direction, interior lining quality, zipper mechanisms, and overall craftsmanship. We have been authenticating luxury goods for nearly 30 years and stay current with manufacturer changes and counterfeit techniques.",
      },
      {
        q: 'What are your condition grades?',
        a: "We use four condition grades: PRISTINE (no visible wear), LIKE NEW (slight wear only), GENTLY USED (regular wear visible), and WELL USED (visible wear and aging). Each listing clearly states the item's grade with a detailed description.",
      },
      {
        q: 'Why do you photograph items in-house without a studio?',
        a: "We deliberately photograph every item in our facility upon arrival — no studio, no retouching, no flattering lighting. This gives you the most honest possible representation of the item's actual condition. What you see is exactly what you receive.",
      },
    ],
  },
  {
    title: 'Selling',
    items: [
      {
        q: 'How do I sell my luxury item to LuxyBasement?',
        a: "Email photos and details of your item to luxybasement@gmail.com. Include photos of the item, any accessories (dust bag, box, receipt), and a brief description of condition. We will respond with a price range within 24 business hours — so you know what to expect before you ship.",
      },
      {
        q: 'Why do you provide a price range instead of a fixed offer?',
        a: "We provide a competitive price range upfront based on your photos and description. Our final offer is confirmed after we receive and assess the item in person — condition details like stitching, hardware wear, and interior are best evaluated hands-on. The final offer always falls within the range we gave you, so there are no surprises.",
      },
      {
        q: 'How long does it take to receive a price range?',
        a: "We respond to all seller inquiries within 24 business hours. We buy outright — no consignment waiting periods, no auction fees, no uncertainty.",
      },
      {
        q: 'How do you ship my item after I accept an offer?',
        a: "We email you a fully pre-paid, insured UPS shipping label. You package the item securely and drop it off at any UPS location. We recommend keeping your tracking number.",
      },
      {
        q: 'When and how do I get paid?',
        a: "Once we receive and authenticate your item, we issue payment the next business day. You can choose check by mail, direct bank deposit, or PayPal.",
      },
    ],
  },
  {
    title: 'Contact & Support',
    items: [
      {
        q: 'How do I contact you?',
        a: "For buying inquiries: luxybasement@gmail.com. For selling inquiries: luxybasement@gmail.com. For photo requests on specific items, use the 'Request Additional Photos' button on any product page.",
      },
      {
        q: 'Do you offer live showings of items?',
        a: "Yes! Use the 'Schedule a Live Online Showing' button on any product page to book a real-time video walk-through with our team via Calendly.",
      },
    ],
  },
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-vault-border overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-vault-surface/50 transition-colors"
          >
            <span className="text-sm font-medium text-vault-text pr-6 leading-snug">{item.q}</span>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              className={`text-vault-gold flex-shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="px-5 pb-5 border-t border-vault-border bg-vault-surface">
                  <p className="text-sm text-vault-muted leading-relaxed pt-4">{item.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-vault-bg pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-vault-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Support</span>
            <div className="h-px w-8 bg-vault-gold" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-vault-text mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-vault-muted max-w-lg mx-auto">
            Everything you need to know about buying, selling, authentication, and returns at LuxyBasement.
          </p>
        </div>

        <div className="space-y-12">
          {FAQ_DATA.map((section) => (
            <div key={section.title} id={section.title === 'Returns & Refunds' ? 'returns' : undefined}>
              <h2 className="font-serif text-xl font-bold text-vault-text mb-5 pb-3 border-b border-vault-border">
                {section.title}
              </h2>
              <FAQAccordion items={section.items} />
            </div>
          ))}
        </div>

        <div className="mt-16 border border-vault-border bg-vault-surface p-8 text-center">
          <p className="text-sm font-medium text-vault-text mb-2">Still have questions?</p>
          <p className="text-xs text-vault-muted mb-6">
            Our team is happy to help with any inquiry not covered above.
          </p>
          <a
            href="mailto:luxybasement@gmail.com"
            className="inline-flex items-center gap-2 border border-vault-gold text-vault-gold px-6 py-3 text-xs tracking-widest uppercase hover:bg-vault-gold hover:text-vault-bg transition-colors duration-300"
          >
            luxybasement@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
