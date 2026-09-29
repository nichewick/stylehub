import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ASSET_IMAGES } from '../data/products';

export const CampaignSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#F7F5F1]">
      
      {/* 1. New Arrivals Editorial Campaign */}
      <section className="relative overflow-hidden bg-[#111111] text-[#F7F5F1] py-16 sm:py-24 border-b border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E8E2D8] block">
                JUST DROPPED
              </span>
              <h2 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight uppercase leading-[0.98]">
                NEW ENERGY.
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 max-w-lg font-light leading-relaxed">
                Fresh silhouettes. Better essentials. Made for the way you move. Engineered with 280+ GSM structured twills, Japanese loopknit weaves, and refined architectural drape.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('shop', { gender: 'all' })}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#F7F5F1] text-[#111111] text-xs font-bold tracking-widest uppercase hover:bg-white transition-all cursor-pointer group"
                >
                  <span>SHOP NEW ARRIVALS</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center gap-6 text-xs text-neutral-400 uppercase tracking-widest">
                <span>LIMITED RUN</span>
                <span>·</span>
                <span>ZERO SHRINKAGE</span>
                <span>·</span>
                <span>ETHICALLY MILLED</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border border-neutral-800 group">
                <img
                  src={ASSET_IMAGES.campaignStreet}
                  alt="New arrivals campaign"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-xs font-medium tracking-widest uppercase text-white/90">
                  AUTUMN 2026 CAPSULE
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Men / Women Split Screen Banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-[#111111]/10">
        
        {/* Men Banner */}
        <div
          onClick={() => navigateTo('shop', { gender: 'men' })}
          className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#E8E2D8] cursor-pointer flex flex-col justify-end p-8 sm:p-12"
        >
          <img
            src={ASSET_IMAGES.catMen}
            alt="Men's collection"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity group-hover:from-black/90" />

          <div className="relative z-10 text-white space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E8E2D8] font-semibold block">
              MEN’S COLLECTION
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F7F5F1]">
              EVERYDAY.<br />ELEVATED.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xs font-light">
              Boxy tees, structured French terry hoodies, and utility cargo silhouettes.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7F5F1] underline underline-offset-4 group-hover:text-white">
                SHOP MEN <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>

        {/* Women Banner */}
        <div
          onClick={() => navigateTo('shop', { gender: 'women' })}
          className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#E8E2D8] cursor-pointer flex flex-col justify-end p-8 sm:p-12 md:border-l border-[#111111]/10"
        >
          <img
            src={ASSET_IMAGES.catWomen}
            alt="Women's collection"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity group-hover:from-black/90" />

          <div className="relative z-10 text-white space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E8E2D8] font-semibold block">
              WOMEN’S COLLECTION
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F7F5F1]">
              EFFORTLESSLY<br />YOURS.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xs font-light">
              Breathable co-ords, fluid wide-leg trousers, and oversized drape denim.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7F5F1] underline underline-offset-4 group-hover:text-white">
                SHOP WOMEN <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
