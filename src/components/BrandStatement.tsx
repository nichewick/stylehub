import React from 'react';

export const BrandStatement: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-[#F7F5F1] border-b border-[#111111]/10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* Subtle Brand Tag */}
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#6B6B6B] block mb-6">
          THE STYLE HUB PHILOSOPHY
        </span>

        {/* Big Magazine Typography */}
        <blockquote className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] uppercase leading-[1.05]">
          WEAR YOUR<br />
          EVERYDAY<br />
          CONFIDENCE.
        </blockquote>

        <p className="mt-8 text-base sm:text-lg text-[#6B6B6B] max-w-xl mx-auto font-normal leading-relaxed">
          No ostentatious logos. No transient fast-fashion junk. Just honest fabrics, precise Indian body tailoring, and silhouettes designed to outlast the trend cycle.
        </p>

        {/* Small editorial metadata row */}
        <div className="mt-12 flex items-center justify-center gap-6 text-xs text-[#111111] font-semibold tracking-widest uppercase">
          <span>COMFORT FIRST</span>
          <span>·</span>
          <span>ETHICAL MILLS</span>
          <span>·</span>
          <span>TIMELESS CUTS</span>
        </div>

      </div>
    </section>
  );
};
