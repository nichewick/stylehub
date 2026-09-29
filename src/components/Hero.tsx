import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ASSET_IMAGES } from '../data/products';

export const Hero: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative overflow-hidden bg-[#F7F5F1] pt-4 sm:pt-8 pb-12 sm:pb-20 border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Editorial Content (approx 45-50% width on desktop) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 z-10">
            {/* Small uppercase micro-label */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B]">
                STYLE HUB
              </span>
              <span className="w-8 h-[1px] bg-[#111111]/30"></span>
              <span className="text-[11px] font-medium tracking-wider uppercase text-[#111111]/60">
                Autumn / Winter 2026
              </span>
            </div>

            {/* Huge Headline */}
            <h1 className="font-editorial text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#111111] leading-[0.98] uppercase">
              MORE THAN<br />
              JUST CLOTHES.
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#6B6B6B] max-w-xl font-normal leading-relaxed">
              Modern essentials designed for everyday confidence, comfort and effortless style. Crafted from premium heavyweight textiles made specifically for India’s climate.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop', { gender: 'all' })}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] text-[#F7F5F1] text-xs font-semibold tracking-widest uppercase hover:bg-black transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>SHOP NOW</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('explore-categories');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 border border-[#111111] text-[#111111] text-xs font-semibold tracking-widest uppercase hover:bg-[#111111] hover:text-[#F7F5F1] transition-all duration-200 cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100" />
              </button>
            </div>

            {/* Editorial Secondary Tagline */}
            <div className="pt-6 sm:pt-8 border-t border-[#111111]/10 flex items-center justify-between">
              <div>
                <p className="font-editorial text-sm font-bold tracking-wider text-[#111111] uppercase leading-tight">
                  GOOD STYLE.<br />
                  GOOD VIBES.
                </p>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                  100% Organic Indian Cottons &amp; Gabardines
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-[#111111]">12,000+ CUSTOMERS</p>
                <p className="text-[11px] text-[#6B6B6B]">Across 180+ Indian Cities</p>
              </div>
            </div>
          </div>

          {/* Right Editorial Visual (approx 50-55% width) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="relative group overflow-hidden bg-[#E8E2D8] shadow-sm">
              <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/12] w-full overflow-hidden">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Style Hub contemporary Indian fashion editorial campaign"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to high-resolution editorial portrait
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80';
                  }}
                />
              </div>

              {/* Editorial bottom scrim badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#111111]/80 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between text-[#F7F5F1]">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-neutral-400 block">CAMPAIGN 01</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">URBAN MONOCHROME</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] tracking-widest uppercase text-neutral-400 block">LOCALE</span>
                  <span className="text-xs font-medium text-[#F7F5F1]">MUMBAI / NEW DELHI</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
