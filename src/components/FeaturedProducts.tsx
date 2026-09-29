import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const FeaturedProducts: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'men' | 'women' | 'streetwear'>('all');

  const filteredProducts = PRODUCTS.filter((item) => {
    if (activeTab === 'men') return item.gender === 'men';
    if (activeTab === 'women') return item.gender === 'women';
    if (activeTab === 'streetwear') return item.category === 'Streetwear' || item.gender === 'unisex';
    return item.featured || item.bestSeller;
  }).slice(0, 8);

  return (
    <section className="py-14 sm:py-24 bg-[#F7F5F1] border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Segmented Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-2">
              CURATED FOR YOU
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] uppercase">
              TRENDING NOW
            </h2>
          </div>

          {/* Interactive filter tab control */}
          <div className="flex items-center gap-1 bg-[#E8E2D8]/70 p-1 border border-[#111111]/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#111111] text-[#F7F5F1]'
                  : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'men'
                  ? 'bg-[#111111] text-[#F7F5F1]'
                  : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'women'
                  ? 'bg-[#111111] text-[#F7F5F1]'
                  : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => setActiveTab('streetwear')}
              className={`px-3 sm:px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === 'streetwear'
                  ? 'bg-[#111111] text-[#F7F5F1]'
                  : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              Streetwear
            </button>
          </div>
        </div>

        {/* 4-col desktop, 3-col tablet, 2-col mobile responsive grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore All CTA Bar */}
        <div className="mt-14 sm:mt-16 text-center">
          <button
            onClick={() => navigateTo('shop', { gender: 'all' })}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] text-[#F7F5F1] text-xs font-bold tracking-widest uppercase hover:bg-black transition-all cursor-pointer shadow-sm group"
          >
            <span>EXPLORE ENTIRE CATALOG ({PRODUCTS.length} STYLES)</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
