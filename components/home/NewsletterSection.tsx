'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/subscribe-newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      if (data.alreadySubscribed) {
        setStatus('success');
        setMessage("You're already on the list — we'll be in touch.");
        return;
      }

      setStatus('success');
      setMessage("You're on the list. Watch your inbox for new arrivals and exclusive offers.");
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section className="bg-vault-surface border-t border-vault-border py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-vault-gold" />
          <span className="text-xs tracking-[0.3em] uppercase text-vault-gold">Stay in the Know</span>
          <div className="h-px w-8 bg-vault-gold" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-vault-text mb-3">
          First access. Always.
        </h2>
        <p className="text-vault-muted text-[15px] leading-relaxed mb-10 max-w-md mx-auto">
          New arrivals, exclusive pieces, and private offers — delivered directly to you before anyone else sees them.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border border-vault-gold flex items-center justify-center">
              <CheckCircle size={22} strokeWidth={1.5} className="text-vault-gold" />
            </div>
            <p className="text-vault-text text-sm">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex flex-col gap-3 flex-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name (optional)"
                className="w-full bg-vault-bg border border-vault-border text-vault-text placeholder:text-vault-muted text-sm px-4 py-3 focus:outline-none focus:border-vault-gold/60 transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full bg-vault-bg border border-vault-border text-vault-text placeholder:text-vault-muted text-sm px-4 py-3 focus:outline-none focus:border-vault-gold/60 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="group flex items-center justify-center gap-2 bg-vault-gold text-vault-bg px-7 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-vault-gold/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed sm:self-end sm:h-[46px]"
            >
              {status === 'loading' ? (
                'Subscribing…'
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-4 text-sm text-red-400">{message}</p>
        )}

        <p className="mt-6 text-[11px] text-vault-muted tracking-wide">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
