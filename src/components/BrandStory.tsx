import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BrandStory: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Editorial Visual */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/5] bg-[#E8E2D8] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
                alt="Style Hub Craftsmanship"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between text-xs font-semibold tracking-widest uppercase">
                <span>ESTABLISHED 2026</span>
                <span>NEW DELHI · BENGALURU</span>
              </div>
            </div>
          </div>

          {/* Right Brand Story Text */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 sm:space-y-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block">
              OUR STORY
            </span>

            <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] uppercase leading-tight">
              WE BELIEVE STYLE SHOULD FEEL LIKE YOU.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#6B6B6B] font-light leading-relaxed">
              <p>
                Style Hub was created for people who see clothing as more than something they wear.
              </p>
              <div className="grid grid-cols-2 gap-4 py-2 text-sm font-semibold uppercase tracking-wider text-[#111111]">
                <div className="border-l-2 border-[#111111] pl-3">
                  <p className="font-editorial text-base">IT IS EXPRESSION.</p>
                  <p className="text-xs font-normal text-[#6B6B6B] mt-0.5 lowercase">Designed to speak before you do.</p>
                </div>
                <div className="border-l-2 border-[#111111] pl-3">
                  <p className="font-editorial text-base">IT IS CONFIDENCE.</p>
                  <p className="text-xs font-normal text-[#6B6B6B] mt-0.5 lowercase">Cut to stand tall anywhere.</p>
                </div>
                <div className="border-l-2 border-[#111111] pl-3">
                  <p className="font-editorial text-base">IT IS COMFORT.</p>
                  <p className="text-xs font-normal text-[#6B6B6B] mt-0.5 lowercase">Heavy organic breathable weaves.</p>
                </div>
                <div className="border-l-2 border-[#111111] pl-3">
                  <p className="font-editorial text-base">IT IS PERSONALITY.</p>
                  <p className="text-xs font-normal text-[#6B6B6B] mt-0.5 lowercase">Understated modern elegance.</p>
                </div>
              </div>
              <p>
                We collaborate directly with ethical textile artisans in Gujarat and Tamil Nadu, bringing together world-class fabric weights with sharp, contemporary Indian silhouettes.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('shop', { gender: 'all' })}
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#111111] hover:text-[#6B6B6B] border-b-2 border-[#111111] pb-1 cursor-pointer transition-colors"
              >
                <span>EXPLORE OUR ATELIER</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
