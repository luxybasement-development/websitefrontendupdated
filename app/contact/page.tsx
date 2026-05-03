'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CircleCheck as CheckCircle2, Mail, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    void submitMessage();
  }

  async function submitMessage() {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-contact-message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ name, email, subject, message }),
        }
      );

      if (!res.ok) throw new Error('Failed to send');

      setSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-vault-bg pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-vault-gold font-semibold mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-vault-text mb-4">
            Contact Us
          </h1>
          <p className="text-vault-muted text-sm leading-relaxed">
            Have a question about an item, need help with an order, or want to discuss selling your piece?
            Send us a message and we'll get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Left: Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-vault-border bg-vault-surface p-12 text-center"
              >
                <CheckCircle2 size={48} className="text-vault-gold mx-auto mb-5" strokeWidth={1} />
                <h2 className="font-serif text-xl font-bold text-vault-text mb-3">Message Sent</h2>
                <p className="text-sm text-vault-muted leading-relaxed max-w-sm mx-auto">
                  Thanks for reaching out, {name}. We typically respond within a few hours during business hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-vault-muted mb-2">
                      Your Name <span className="text-vault-gold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full bg-vault-surface border border-vault-border px-4 py-3 text-sm text-vault-text placeholder:text-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-vault-muted mb-2">
                      Email Address <span className="text-vault-gold">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-vault-surface border border-vault-border px-4 py-3 text-sm text-vault-text placeholder:text-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-vault-muted mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Question about an item, order help, selling..."
                    className="w-full bg-vault-surface border border-vault-border px-4 py-3 text-sm text-vault-text placeholder:text-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-vault-muted mb-2">
                    Message <span className="text-vault-gold">*</span>
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    className="w-full bg-vault-surface border border-vault-border px-4 py-3 text-sm text-vault-text placeholder:text-vault-muted focus:outline-none focus:border-vault-gold transition-colors resize-none"
                  />
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-3 bg-vault-gold text-vault-bg px-8 py-3.5 text-sm font-semibold tracking-wider uppercase hover:bg-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-vault-bg/40 border-t-vault-bg rounded-full animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="border border-vault-border bg-vault-surface p-6">
              <h3 className="text-xs tracking-widest uppercase text-vault-muted mb-5">
                Other Ways to Reach Us
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:luxybasement@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 border border-vault-border group-hover:border-vault-gold flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail size={15} className="text-vault-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-vault-muted">Email</p>
                    <p className="text-sm text-vault-text group-hover:text-vault-gold transition-colors">
                      luxybasement@gmail.com
                    </p>
                  </div>
                </a>
                <a
                  href="https://instagram.com/luxybasement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 border border-vault-border group-hover:border-vault-gold flex items-center justify-center flex-shrink-0 transition-colors">
                    <Instagram size={15} className="text-vault-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-vault-muted">Instagram</p>
                    <p className="text-sm text-vault-text group-hover:text-vault-gold transition-colors">
                      @luxybasement
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="border border-vault-border bg-vault-surface p-6">
              <h3 className="text-xs tracking-widest uppercase text-vault-muted mb-4">
                Response Time
              </h3>
              <p className="text-sm text-vault-muted leading-relaxed">
                We typically respond within a few hours during business hours (Mon–Fri, 9am–5pm PT).
                For photo requests, please use the product page form for the fastest response.
              </p>
            </div>

            <div className="border border-vault-border bg-vault-surface p-6">
              <h3 className="text-xs tracking-widest uppercase text-vault-muted mb-4">
                Looking to Sell?
              </h3>
              <p className="text-sm text-vault-muted leading-relaxed mb-4">
                Learn about our selling process and requirements before reaching out.
              </p>
              <a
                href="/sell"
                className="text-xs tracking-widest uppercase text-vault-gold hover:text-white transition-colors font-semibold"
              >
                View Seller Info &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
