import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Gender, Category, Size } from '../types';

export const FilterDrawer: React.FC = () => {
  const {
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    filters,
    setFilters,
    resetFilters,
  } = useShop();

  if (!isFilterDrawerOpen) return null;

  const categories: Category[] = [
    'Tees',
    'Shirts',
    'Hoodies',
    'Trousers',
    'Jackets',
    'Co-ords',
    'Dresses',
    'Streetwear',
  ];

  const allSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  const toggleSize = (size: Size) => {
    setFilters((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsFilterDrawerOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#FFFFFF] shadow-2xl flex flex-col border-l border-[#111111]/15">
          
          {/* Header */}
          <div className="p-5 border-b border-[#111111]/10 flex items-center justify-between">
            <h3 className="font-editorial text-lg font-bold uppercase tracking-tight text-[#111111]">
              FILTERS
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="text-xs text-[#6B6B6B] hover:text-black flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 text-neutral-500 hover:text-black cursor-pointer"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Filter Options Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-7 text-xs">
            
            {/* Gender Filter */}
            <div>
              <span className="font-bold uppercase tracking-widest text-[#111111] block mb-3">
                GENDER
              </span>
              <div className="flex flex-wrap gap-2">
                {(['all', 'men', 'women'] as (Gender | 'all')[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setFilters((prev) => ({ ...prev, gender: g }))}
                    className={`px-3.5 py-1.5 uppercase font-semibold tracking-wider transition-colors cursor-pointer ${
                      filters.gender === g
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#F7F5F1] text-neutral-600 hover:text-black border border-black/10'
                    }`}
                  >
                    {g === 'all' ? 'All' : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <span className="font-bold uppercase tracking-widest text-[#111111] block mb-3">
                CATEGORY
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                  className={`px-3 py-2 text-left uppercase font-semibold tracking-wider transition-colors cursor-pointer ${
                    filters.category === 'all'
                      ? 'bg-[#111111] text-white'
                      : 'bg-[#F7F5F1] text-neutral-600 hover:text-black border border-black/10'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                    className={`px-3 py-2 text-left uppercase font-semibold tracking-wider transition-colors cursor-pointer truncate ${
                      filters.category === cat
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#F7F5F1] text-neutral-600 hover:text-black border border-black/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <span className="font-bold uppercase tracking-widest text-[#111111] block mb-3">
                SIZE
              </span>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((s) => {
                  const active = filters.sizes.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`w-10 h-10 font-bold uppercase transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#111111] text-white'
                          : 'bg-[#F7F5F1] text-neutral-600 hover:text-black border border-black/10'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex justify-between font-bold uppercase tracking-widest text-[#111111] mb-2">
                <span>MAX PRICE</span>
                <span className="tabular-nums">₹{filters.maxPrice}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                }
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#6B6B6B] mt-1 tabular-nums">
                <span>₹500</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Minimum Discount */}
            <div>
              <span className="font-bold uppercase tracking-widest text-[#111111] block mb-3">
                DISCOUNT
              </span>
              <div className="flex flex-wrap gap-2">
                {[0, 20, 30].map((disc) => (
                  <button
                    key={disc}
                    onClick={() => setFilters((prev) => ({ ...prev, minDiscount: disc }))}
                    className={`px-3 py-1.5 uppercase font-semibold tracking-wider transition-colors cursor-pointer ${
                      filters.minDiscount === disc
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#F7F5F1] text-neutral-600 hover:text-black border border-black/10'
                    }`}
                  >
                    {disc === 0 ? 'All' : `${disc}%+ OFF`}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Footer CTAs */}
          <div className="p-5 border-t border-[#111111]/10 bg-[#F7F5F1] flex gap-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 border border-[#111111] text-[#111111] font-bold text-xs uppercase tracking-widest hover:bg-black/5 cursor-pointer"
            >
              CLEAR ALL
            </button>
            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="flex-1 py-3 bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-black cursor-pointer shadow-sm"
            >
              APPLY FILTERS
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
