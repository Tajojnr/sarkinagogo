'use client';

import { useState } from 'react';

export default function Watch360Viewer({ name }) {
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' | '360'

  return (
    <div className="relative w-full aspect-square bg-onyx border border-ivory/10 rounded-sm overflow-hidden flex flex-col justify-between p-6">
      {/* Top Toggle */}
      <div className="flex justify-between items-center z-10">
        <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-medium bg-gold/10 border border-gold/30 px-3 py-1 rounded-full">
          100% Authentic
        </span>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`text-[9px] uppercase tracking-wider px-3 py-1 border transition-all ${
              activeTab === 'gallery' ? 'border-gold text-gold bg-gold/10' : 'border-ivory/20 text-ivory/60'
            }`}
          >
            Gallery
          </button>
          <button 
            onClick={() => setActiveTab('360')}
            className={`text-[9px] uppercase tracking-wider px-3 py-1 border transition-all ${
              activeTab === '360' ? 'border-gold text-gold bg-gold/10' : 'border-ivory/20 text-ivory/60'
            }`}
          >
            360° Interactive
          </button>
        </div>
      </div>

      {/* Main Visual Display */}
      <div className="relative flex-1 flex items-center justify-center my-6">
        <div className="w-64 h-64 rounded-full border border-gold/30 flex items-center justify-center relative shadow-2xl bg-obsidian/80">
          <div className="w-52 h-52 rounded-full border border-gold/50 flex items-center justify-center relative">
            <div className="absolute top-4 text-[9px] text-gold font-mono">12</div>
            <div className="absolute bottom-4 text-[9px] text-gold font-mono">6</div>
            <div className="absolute left-4 text-[9px] text-gold font-mono">9</div>
            <div className="absolute right-4 text-[9px] text-gold font-mono">3</div>
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="absolute w-0.5 h-16 bg-gold top-8 origin-bottom transform rotate-45" />
            <div className="absolute w-0.5 h-20 bg-ivory/90 top-5 origin-bottom transform -rotate-25" />
          </div>
        </div>

        {activeTab === '360' && (
          <div className="absolute bottom-2 inset-x-0 text-center">
            <span className="text-[9px] tracking-[0.3em] uppercase text-gold/80 bg-obsidian/90 px-3 py-1 border border-gold/30">
              Drag left / right to rotate 360°
            </span>
          </div>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="grid grid-cols-4 gap-2 z-10">
        {[1, 2, 3, 4].map((thumb) => (
          <div 
            key={thumb} 
            className="h-14 bg-obsidian border border-ivory/10 hover:border-gold/50 cursor-pointer flex items-center justify-center text-[9px] text-ivory/40"
          >
            View #{thumb}
          </div>
        ))}
      </div>
    </div>
  );
}