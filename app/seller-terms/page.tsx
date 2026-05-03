import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seller Terms & Conditions — LuxyBasement',
  description: 'Seller Terms and Conditions for selling pre-owned luxury goods to LuxyBasement.',
};

export default function SellerTermsPage() {
  return (
    <div className="min-h-screen bg-vault-bg pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-vault-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Legal</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-vault-text mb-3">
            Seller Terms & Conditions
          </h1>
          <p className="text-xs text-vault-muted">Last updated: 2025</p>
        </div>

        <div className="prose prose-sm prose-invert max-w-none space-y-10 text-vault-muted leading-relaxed">

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">1. Agreement to Terms</h2>
            <p>
              By submitting an item for sale to LuxyBasement ("we," "us," or "our"), you ("the Seller") agree to be bound by these Seller Terms and Conditions. These terms constitute a binding agreement between you and LuxyBasement. If you do not agree to these terms, do not submit an item for sale.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">2. Item Submission</h2>
            <p>
              Sellers may submit items for purchase consideration by emailing luxybasement@gmail.com with photographs of the item, a description of its condition, and any available accessories (dust bag, box, receipts, authenticity cards). LuxyBasement reserves the right to decline any item at its sole discretion without obligation to provide a reason.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">3. Offer and Acceptance</h2>
            <p>
              LuxyBasement will provide a preliminary purchase offer within 24 business hours of a complete submission. All offers are conditional upon physical inspection and authentication of the item. The final purchase price is confirmed upon receipt and successful authentication. Acceptance of an offer by the Seller constitutes agreement to these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">4. Shipping</h2>
            <p>
              Upon acceptance of an offer, LuxyBasement will provide a pre-paid UPS shipping label. The Seller is responsible for securely packaging the item and dropping it off at a UPS location. LuxyBasement assumes no responsibility for damage resulting from inadequate packaging by the Seller. Sellers are advised to retain their UPS tracking number.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">5. Authentication and Final Offer</h2>
            <p>
              Upon receipt, LuxyBasement will authenticate and inspect the item. If the item's condition or authenticity does not match what was represented at the time of the preliminary offer, LuxyBasement reserves the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-3 pl-2">
              <li>Revise the purchase offer downward to reflect actual condition;</li>
              <li>Decline to purchase the item entirely;</li>
              <li>Return the item to the Seller at the Seller's expense.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">6. Payment</h2>
            <p>
              Upon successful authentication, LuxyBasement will issue payment to the Seller the next business day via the Seller's chosen method: check by mail, direct bank deposit, or PayPal. LuxyBasement is not responsible for delays caused by banking institutions or payment processors.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">7. Seller Representations and Warranties</h2>
            <p>By submitting an item, the Seller represents and warrants that:</p>
            <ul className="list-disc list-inside space-y-1 mt-3 pl-2">
              <li>The Seller is the legal owner of the item or is authorized to sell it;</li>
              <li>The item is genuine and not counterfeit;</li>
              <li>All material information about the item's condition has been disclosed accurately;</li>
              <li>The item is free from any liens, encumbrances, or legal disputes;</li>
              <li>Serial numbers and identifying marks are legible and unaltered;</li>
              <li>Handbags submitted are free of odors (smoke, perfume, mildew);</li>
              <li>The item has not been altered, repaired, or restored without disclosure.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">8. Item Accessories and Documentation</h2>
            <p>
              While not required, items submitted with original accessories (dust bag, box, original receipt, authenticity cards, lock and keys where applicable) will consistently receive higher offers. Accessories described at time of submission must be included with the item as shipped.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">9. Counterfeit Items</h2>
            <p>
              Knowingly submitting a counterfeit item is a violation of federal and state law. LuxyBasement will report any known or suspected counterfeit submissions to the appropriate authorities and reserves all legal remedies against the Seller.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">10. Liability Limitation</h2>
            <p>
              LuxyBasement's liability to the Seller shall not exceed the agreed purchase price of the item. LuxyBasement is not liable for any indirect, incidental, or consequential damages arising from this transaction.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Washington. Any disputes arising under these Terms shall be resolved in the courts of Washington State.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">12. Modifications</h2>
            <p>
              LuxyBasement reserves the right to modify these Terms at any time. Updated Terms will be posted on this page. Continued use of our selling services constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-vault-text mb-3">13. Contact</h2>
            <p>
              Questions regarding these Terms may be directed to:{' '}
              <a href="mailto:luxybasement@gmail.com" className="text-vault-gold hover:underline">
                luxybasement@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
