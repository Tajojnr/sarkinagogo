'use client';

import { useState } from 'react';
import WatchCard from './WatchCard';
import { ALL_WATCHES } from '@/data/watches';

const CATEGORIES = ["All Pieces", "Presidential Series", "Executive Suite", "Iced & Bespoke", "Heritage Line"];

export default function ProductGrid({ limit = null, title = "The Royal Catalog" }) {
  const [activeCategory, setActiveCategory] = useState("All Pieces");

  const filteredWatches = activeCategory === "All Pieces"
    ? ALL_WATCHES
    : ALL_WATCHES.filter(w => w.category === activeCategory);

  const displayedWatches = limit ? filteredWatches.slice(0, limit) : filteredWatches;

  return (
    <section className="bg-obsidian py-24 px-6 md:px-12 border-t border-gold/10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-[10px] tracking-[0.5em] text-gold uppercase mb-3">
              Precision Horology
            </p>
            <h2 
              className="text-4xl md:text-7xl font-light text-ivory"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {title}
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-ivory/10 text-ivory/60 hover:text-ivory hover:border-ivory/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedWatches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>

      </div>
    </section>
  );
}