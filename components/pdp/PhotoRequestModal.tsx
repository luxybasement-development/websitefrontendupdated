'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Send, CircleCheck as CheckCircle2 } from 'lucide-react';

interface PhotoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  productHandle: string;
}

export default function PhotoRequestModal({
  isOpen,
  onClose,
  productTitle,
}: PhotoRequestModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    void submitRequest();
  }

  async function submitRequest() {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-photo-request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name,
            email,
            notes,
            productTitle,
            productUrl: window.location.href,
          }),
        }
      );

      if (!res.ok) throw new Error('Failed to send');

      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
        setName('');
        setEmail('');
        setNotes('');
      }, 2500);
    } catch {
      setError('Something went wrong. Please try again or email us at luxybasement@gmail.com.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[70]"
            onClick={onClose}
          />

          {/* Modal — centered with style, not Tailwind transforms, to avoid Framer conflict */}
          <div
            className="fixed z-[71] w-[calc(100%-2rem)] max-w-md"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-vault-surface border border-vault-border p-8"
            >
              {sent ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle2 size={48} className="text-vault-gold mx-auto mb-4" strokeWidth={1} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-vault-text mb-2">Request Sent</h3>
                  <p className="text-sm text-vault-muted">
                    We'll send the additional photos directly to{' '}
                    <span className="text-vault-text">{email}</span> within a few hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border border-vault-border flex items-center justify-center">
                        <Camera size={15} className="text-vault-gold" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-vault-text">Request Additional Photos</h3>
                        <p className="text-xs text-vault-muted">{productTitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-vault-muted hover:text-vault-text transition-colors"
                    >
                      <X size={18} strokeWidth={1.5} />
                    </button>
                  </div>

                  <p className="text-xs text-vault-muted mb-5 leading-relaxed">
                    Fill out the form below and we'll send the photos directly to the email address provided, typically within a few hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-vault-muted mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full bg-vault-bg border border-vault-border px-4 py-3 text-sm text-vault-text placeholder:text-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-vault-muted mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-vault-bg border border-vault-border px-4 py-3 text-sm text-vault-text placeholder:text-vault-muted focus:outline-none focus:border-vault-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-vault-muted mb-2">
                        Specific Areas (Optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g., Close-up of stitching, hardware, interior lining..."
                        rows={3}
                        className="w-full bg-vault-bg border border-vault-border px-4 py-3 text-sm text-vault-text placeholder:text-vault-muted focus:outline-none focus:border-vault-gold transition-colors resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-red-400">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 bg-vault-gold text-vault-bg py-3.5 text-sm font-semibold tracking-wider uppercase hover:bg-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-vault-bg/40 border-t-vault-bg rounded-full animate-spin" />
                      ) : (
                        <Send size={14} />
                      )}
                      {loading ? 'Sending...' : 'Send Request'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
