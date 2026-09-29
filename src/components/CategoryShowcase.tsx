import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ASSET_IMAGES } from '../data/products';

export const CategoryShowcase: React.FC = () => {
  const { navigateTo } = useShop();

  const categories = [
    {
      id: 'men',
      name: 'MEN',
      tag: 'Drop Shoulders & Essentials',
      count: '6 Styles',
      image: ASSET_IMAGES.catMen,
      fallbackImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
      action: () => navigateTo('shop', { gender: 'men' })
    },
    {
      id: 'women',
      name: 'WOMEN',
      tag: 'Tailored Cuts & Co-ords',
      count: '6 Styles',
      image: ASSET_IMAGES.catWomen,
      fallbackImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      action: () => navigateTo('shop', { gender: 'women' })
    },
    {
      id: 'streetwear',
      name: 'STREETWEAR',
      tag: 'Heavyweight Utility & Cargos',
      count: 'Limited Drops',
      image: ASSET_IMAGES.campaignStreet,
      fallbackImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=80',
      action: () => navigateTo('shop', { category: 'Streetwear' })
    },
    {
      id: 'new-arrivals',
      name: 'NEW ARRIVALS',
      tag: 'Autumn / Festive 2026',
      count: 'Just Dropped',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      fallbackImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
      action: () => navigateTo('shop', { gender: 'all' })
    }
  ];

  return (
    <section id="explore-categories" className="py-14 sm:py-24 bg-[#F7F5F1] border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-2">
              EXPLORE
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] uppercase">
              FIND YOUR STYLE
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop', { gender: 'all' })}
            className="mt-4 sm:mt-0 text-xs font-semibold tracking-widest uppercase text-[#111111] hover:text-[#6B6B6B] inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Large Editorial Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={cat.action}
              className="group relative overflow-hidden bg-[#E8E2D8] cursor-pointer aspect-[3/4] flex flex-col justify-end p-6 transition-all duration-300"
            >
              {/* Background Image with Hover Zoom */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = cat.fallbackImage;
                }}
              />

              {/* Minimal Dark Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

              {/* Card Meta Content */}
              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E8E2D8] font-medium block mb-1">
                  {cat.tag}
                </span>

                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-2xl font-bold uppercase tracking-wider text-[#F7F5F1]">
                    {cat.name}
                  </h3>

                  <div className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-none flex items-center justify-center text-white transition-transform duration-300 group-hover:bg-white group-hover:text-[#111111] group-hover:scale-110">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-neutral-300">
                  <span className="uppercase tracking-wider font-semibold group-hover:text-white">SHOP NOW</span>
                  <span>{cat.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
