'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import type { ShopifyImage } from '@/lib/shopify/types';

/* eslint-disable @next/next/no-img-element */

interface ImageGalleryProps {
  images: ShopifyImage[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activeImage = images[activeIndex];

  // Ensure portal only renders on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  function prev() {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, closeLightbox]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main image — natural aspect ratio, no forced crop */}
        <div className="relative bg-vault-surface border border-vault-border group">
          <AnimatePresence mode="sync">
            {activeImage ? (
              <motion.img
                key={activeIndex}
                src={activeImage.url}
                alt={activeImage.altText ?? title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-auto block"
                loading="eager"
              />
            ) : (
              <div className="aspect-square flex items-center justify-center bg-vault-surface">
                <span className="text-vault-muted text-xs tracking-widest uppercase">No Image</span>
              </div>
            )}
          </AnimatePresence>

          {/* Prev / Next controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-vault-bg/80 border border-vault-border flex items-center justify-center text-vault-text hover:bg-vault-gold hover:text-vault-bg transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-vault-bg/80 border border-vault-border flex items-center justify-center text-vault-text hover:bg-vault-gold hover:text-vault-bg transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Zoom button */}
          {activeImage && (
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-vault-bg/80 border border-vault-border px-2 py-1 hover:bg-vault-gold/10 hover:border-vault-gold/50"
              aria-label="Zoom image"
            >
              <ZoomIn size={11} className="text-vault-muted" />
              <span className="text-[10px] tracking-wider uppercase text-vault-muted">Zoom</span>
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 bg-vault-bg/80 border border-vault-border px-2 py-1">
              <span className="text-[10px] text-vault-muted tracking-widest">
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.slice(0, 10).map((img, i) => (
              <button
                key={img.url}
                onClick={() => setActiveIndex(i)}
                className={`relative aspect-square overflow-hidden border transition-all duration-200 bg-vault-surface ${
                  i === activeIndex
                    ? 'border-vault-gold'
                    : 'border-vault-border hover:border-vault-muted'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt={img.altText ?? `${title} image ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox - Portaled to document.body */}
      {mounted && createPortal(
        <AnimatePresence>
          {lightboxOpen && activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[99999] bg-black flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {images.length > 1 && (
                <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase">
                  {activeIndex + 1} / {images.length}
                </div>
              )}

              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-5xl max-h-[90vh] mx-auto px-16 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeImage.url}
                  alt={activeImage.altText ?? title}
                  className="max-h-[85vh] max-w-full w-auto h-auto object-contain"
                  loading="eager"
                />
              </motion.div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
