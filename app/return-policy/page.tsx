import type { Metadata } from 'next';
import Link from 'next/link';
import { Tag, RotateCcw, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return Policy — LuxyBasement',
  description: '30-day return policy for authenticated pre-owned luxury goods purchased from LuxyBasement.',
};

const POLICY_HIGHLIGHTS = [
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    body: 'Return any item within 30 days of delivery for a full refund, provided all conditions are met.',
  },
  {
    icon: Tag,
    title: 'Keep the Tag On',
    body: "Items must have the yellow 'Keep This Tag On' tag still attached. Removed tags incur a 15% restocking fee.",
  },
  {
    icon: Clock,
    title: '5–7 Business Days',
    body: 'Refunds are processed within 5–7 business days of receiving and inspecting the returned item.',
  },
  {
    icon: Mail,
    title: 'Email to Start',
    body: 'Email us within 30 days of delivery with your order number. We will send a prepaid return label.',
  },
];

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-vault-bg pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-vault-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Policies</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-vault-text mb-3">
            Return Policy
          </h1>
          <p className="text-vault-muted leading-relaxed max-w-xl">
            We want you to feel completely confident in every purchase. If something isn't right, we make returns straightforward.
          </p>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {POLICY_HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex gap-4 p-5 border border-vault-border bg-vault-surface"
              >
                <div className="w-10 h-10 border border-vault-border flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={17} className="text-vault-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-vault-text mb-1">{item.title}</p>
                  <p className="text-xs text-vault-muted leading-relaxed">{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full policy */}
        <div className="space-y-10 text-vault-muted leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">Eligibility</h2>
            <p>
              We offer a <strong className="text-vault-text font-semibold">30-day return policy</strong> from the date of delivery. To be eligible for a return:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 pl-2 text-sm">
              <li>The item must be in the same condition as received — unworn, unaltered, and undamaged.</li>
              <li>The yellow <strong className="text-vault-text font-semibold">"Keep This Tag On"</strong> tag must still be attached to the item.</li>
              <li>The return must be authorized by LuxyBasement before the item is shipped back.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">The "Keep This Tag On" Tag</h2>
            <p>
              Every item ships with a small yellow tag bearing the instruction <em>"Keep This Tag On."</em> This tag serves as confirmation that the item has not been worn or used since delivery. The tag must remain attached for the return to be accepted without a restocking fee.
            </p>
            <p className="mt-3">
              If the tag has been removed, a <strong className="text-vault-text font-semibold">15% restocking fee</strong> will be deducted from your refund. Please do not remove this tag until you are certain you wish to keep the item.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">How to Initiate a Return</h2>
            <ol className="list-decimal list-inside space-y-3 mt-2 pl-2 text-sm">
              <li>Email <a href="mailto:luxybasement@gmail.com" className="text-vault-gold hover:underline">luxybasement@gmail.com</a> within 30 days of delivery.</li>
              <li>Include your order number and reason for return.</li>
              <li>We will respond with return instructions and a prepaid return shipping label.</li>
              <li>Pack the item securely and drop it off with the carrier as instructed.</li>
            </ol>
            <p className="mt-4 text-sm">
              Items sent back without prior authorization will not be accepted.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">Refunds</h2>
            <p>
              Once we receive and inspect the returned item, refunds are processed within <strong className="text-vault-text font-semibold">5–7 business days</strong>. Refunds are issued to the original payment method. We will notify you by email once the refund has been processed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">Non-Returnable Items</h2>
            <p>
              Items that have been worn, altered, or show signs of use beyond what was present at the time of sale are not eligible for return. Any item returned without prior authorization or outside of the 30-day window will be returned to the sender at their expense.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 border border-vault-border bg-vault-surface p-8 text-center">
          <p className="text-sm font-medium text-vault-text mb-2">Questions about a return?</p>
          <p className="text-xs text-vault-muted mb-6">
            Reach out and we will get back to you promptly.
          </p>
          <a
            href="mailto:luxybasement@gmail.com"
            className="inline-flex items-center gap-2 border border-vault-gold text-vault-gold px-6 py-3 text-xs tracking-widest uppercase hover:bg-vault-gold hover:text-vault-bg transition-colors duration-300"
          >
            luxybasement@gmail.com
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-vault-muted">
          See also:{' '}
          <Link href="/faq#returns" className="text-vault-gold hover:underline">
            Returns & Refunds in our FAQ
          </Link>
        </p>
      </div>
    </div>
  );
}
