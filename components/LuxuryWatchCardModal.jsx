'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LuxuryWatchCardModal({ watch, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState('Rose Gold');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // Gallery view mock (rotates through angles or variants)
  const images = [
    watch?.image || '/watches/watch-1.png',
    '/watches/watch-2.png',
    '/watches/watch-3.png',
  ];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const metals = [
    { name: 'Rose Gold', color: '#D4AF37' },
    { name: 'Yellow Gold', color: '#E5C158' },
    { name: 'Platinum Silver', color: '#E0E0E0' },
    { name: 'Stealth Black', color: '#222222' },
  ];

  const unitPrice = watch?.price || 3850000;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[28px] overflow-hidden shadow-[0_35px_80px_-15px_rgba(0,0,0,0.95)] border border-ivory/10 grid grid-cols-1 md:grid-cols-2 my-6">
      
      {/* ================= LEFT SIDE: STUDIO WHITE STAGE ================= */}
      <div className="relative bg-[#FAF9F6] text-black p-8 flex flex-col justify-between min-h-[480px] md:min-h-[580px] select-none">
        
        {/* Top Left Floating Control Stack (Close, Prev, Next) */}
        <div className="absolute top-6 left-6 flex flex-col gap-3 z-20">
          {onClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              title="Close"
            >
              ✕
            </button>
          )}
          <button
            onClick={handlePrevImage}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            title="Previous Image"
          >
            ←
          </button>
          <button
            onClick={handleNextImage}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            title="Next Image"
          >
            →
          </button>
        </div>

        {/* Top Right Actions (Share & Heart) */}
        <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
          <button 
            className="w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors shadow-sm"
            title="Share"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>

          <button
            onClick={() => setIsLiked(!isLiked)}
            className="w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors shadow-sm"
            title="Wishlist"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isLiked ? '#E53E3E' : 'none'}
              stroke={isLiked ? '#E53E3E' : 'currentColor'}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Centered Watch Image Display */}
        <div className="flex-1 flex items-center justify-center my-8 relative">
          <img
            src={images[activeImageIndex]}
            alt={watch?.name || 'Luxury Watch'}
            className="max-h-[340px] w-auto object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.35)] transition-all duration-500 hover:scale-105"
          />
        </div>

        {/* Bottom Pagination Index Controls */}
        <div className="flex items-center justify-between z-20">
          <div className="text-xs font-mono tracking-widest text-black/60 font-semibold">
            0{activeImageIndex + 1} <span className="text-black/20">/ 03</span>
          </div>

          <div className="flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeImageIndex === idx ? 'w-6 bg-black' : 'w-2 bg-black/20'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 bg-black/5 border border-black/10 rounded-full px-3 py-1">
            <button onClick={handlePrevImage} className="text-xs text-black font-bold px-1">‹</button>
            <button onClick={handleNextImage} className="text-xs text-black font-bold px-1">›</button>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE: MATTE DARK CONTROL PANEL ================= */}
      <div className="bg-[#141210] text-[#F5F1E8] p-8 md:p-10 flex flex-col justify-between">
        
        <div className="space-y-6">
          {/* Header Line + Subtitle */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-[1.5px] bg-[#C5A059]" />
                <span className="text-xs tracking-[0.3em] uppercase text-ivory/80 font-medium">
                  {watch?.category || 'Presidential Series'}
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                in stock
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-light text-white mt-3"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {watch?.name || 'Sarkin Agogo Day-Date'}
            </h2>
          </div>

          {/* Unit Price */}
          <div className="text-3xl font-light tracking-tight text-white font-sans">
            ₦ {unitPrice.toLocaleString()}
          </div>

          {/* Short Description */}
          <p className="text-xs text-ivory/60 leading-relaxed font-light">
            {watch?.specs ||
              'Fluted 18k Rose Gold Bezel, Olive Green Roman Dial, President Bracelet. Crafted for sovereigns and executive distinction.'}
          </p>

          {/* Metal / Variant Selection Swatches */}
          <div className="pt-2">
            <label className="text-[10px] uppercase tracking-[0.25em] text-ivory/50 block mb-3">
              Finish: <span className="text-gold">{selectedMetal}</span>
            </label>
            <div className="flex items-center gap-3">
              {metals.map((m) => (
                <button
                  key={m.name}
                  onClick={() => setSelectedMetal(m.name)}
                  className={`w-7 h-7 rounded-full transition-transform border-2 ${
                    selectedMetal === m.name
                      ? 'scale-125 border-gold shadow-[0_0_12px_rgba(197,160,89,0.6)]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: m.color }}
                  title={m.name}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="pt-2">
            <label className="text-[10px] uppercase tracking-[0.25em] text-ivory/50 block mb-3">
              Quantity
            </label>
            <div className="inline-flex items-center bg-obsidian border border-ivory/20 rounded-full p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full bg-onyx text-white hover:bg-gold/20 flex items-center justify-center text-sm font-bold transition-colors"
              >
                -
              </button>
              <span className="w-10 text-center text-sm font-mono font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full bg-onyx text-white hover:bg-gold/20 flex items-center justify-center text-sm font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price Row */}
          <div className="pt-4 border-t border-ivory/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-[1px] bg-gold" />
              <span className="text-xs uppercase tracking-widest text-ivory/60">
                Total investment
              </span>
            </div>
            <div className="text-2xl font-light text-gold-gradient font-sans">
              ₦ {totalPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Big White Floating CTA Button */}
        <div className="pt-8">
          <Link
            href={`/checkout?watch=${watch?.id || 1}`}
            className="w-full bg-white text-black hover:bg-gold hover:text-black py-4 rounded-full font-medium tracking-[0.2em] text-xs uppercase transition-all shadow-[0_15px_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3"
          >
            <span>Proceed To Acquisition</span>
            <span>→</span>
          </Link>
        </div>

      </div>

    </div>
  );
}