'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Calendar, X, Shield, Star } from 'lucide-react';
import PhotoRequestModal from './PhotoRequestModal';

interface ShopWithConfidenceProps {
  productTitle: string;
  productHandle: string;
}

export default function ShopWithConfidence({
  productTitle,
  productHandle,
}: ShopWithConfidenceProps) {
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  return (
    <>
      <div className="border border-vault-border bg-vault-surface">
        {/* Header */}
        <div className="px-5 py-4 border-b border-vault-border flex items-center gap-3">
          <Shield size={16} className="text-vault-gold" strokeWidth={1.5} />
          <h3 className="text-xs tracking-widest uppercase font-semibold text-vault-text">
            Shop with Confidence
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="p-5 space-y-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setPhotoModalOpen(true)}
            className="group w-full flex items-center gap-4 border border-vault-border hover:border-vault-gold bg-vault-bg hover:bg-vault-gold/5 p-4 transition-all duration-300 text-left"
          >
            <div className="w-10 h-10 border border-vault-border group-hover:border-vault-gold flex items-center justify-center flex-shrink-0 transition-colors">
              <Camera size={18} strokeWidth={1.5} className="text-vault-gold" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-vault-text group-hover:text-vault-gold transition-colors">
                Request Additional Photos
              </p>
              <p className="text-xs text-vault-muted mt-0.5">
                We'll shoot and send extra facility photos within a few hours
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setCalendlyOpen(true)}
            className="group w-full flex items-center gap-4 border border-vault-border hover:border-vault-gold bg-vault-bg hover:bg-vault-gold/5 p-4 transition-all duration-300 text-left"
          >
            <div className="w-10 h-10 border border-vault-border group-hover:border-vault-gold flex items-center justify-center flex-shrink-0 transition-colors">
              <Calendar size={18} strokeWidth={1.5} className="text-vault-gold" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-vault-text group-hover:text-vault-gold transition-colors">
                Schedule a Live Online Showing
              </p>
              <p className="text-xs text-vault-muted mt-0.5">
                Book a real-time video walk-through with our team
              </p>
            </div>
          </motion.button>
        </div>

        {/* Trust micro-signals */}
        <div className="px-5 pb-5 grid grid-cols-3 gap-3">
          {[
            { icon: Shield, label: 'Authenticated' },
            { icon: Star, label: 'Inspected' },
            { icon: Camera, label: 'Raw Photos' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 py-3 border border-vault-border">
              <Icon size={14} className="text-vault-gold" strokeWidth={1.5} />
              <span className="text-[10px] tracking-wider uppercase text-vault-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Request Modal */}
      <PhotoRequestModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        productTitle={productTitle}
        productHandle={productHandle}
      />

      {/* Calendly Modal — centered with style to avoid Framer Motion transform conflict */}
      <AnimatePresence>
        {calendlyOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[70]"
              onClick={() => setCalendlyOpen(false)}
            />

            <div
              className="fixed z-[71] w-[calc(100%-2rem)] max-w-2xl"
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
                transition={{ duration: 0.2 }}
                className="bg-vault-surface border border-vault-border"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-vault-border">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-vault-gold" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-sm font-semibold text-vault-text">Live Online Showing</h3>
                      <p className="text-xs text-vault-muted">{productTitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCalendlyOpen(false)}
                    className="text-vault-muted hover:text-vault-text transition-colors"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="bg-vault-bg border border-vault-border rounded-sm overflow-hidden" style={{ minHeight: 460 }}>
                    <iframe
                      src="https://calendly.com/luxybasement"
                      width="100%"
                      height="460"
                      frameBorder="0"
                      title="Schedule a Live Showing"
                      className="block"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
