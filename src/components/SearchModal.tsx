import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, navigateTo } = useShop();
  const [query, setQuery] = useState('');

  const trendingTerms = ['Oversized Tee', 'Cargo Pants', 'Denim Jacket', 'Co-ord Set', 'French Terry Hoodie'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  if (!isSearchModalOpen) return null;

  const handleSelectProduct = (productId: string) => {
    setIsSearchModalOpen(false);
    navigateTo('product', { productId });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearchModalOpen(false);
    navigateTo('shop', { query });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchModalOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
        <div className="relative bg-[#FFFFFF] w-full max-w-3xl shadow-2xl border border-[#111111]/20 p-6 sm:p-8 z-10">
          
          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b-2 border-[#111111] pb-3">
            <Search size={22} className="text-[#111111] mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product name, category, or style..."
              className="w-full text-base sm:text-xl font-medium placeholder-neutral-400 focus:outline-none bg-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-black p-1 mr-2 cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(false)}
              className="p-1 text-neutral-500 hover:text-black cursor-pointer"
              aria-label="Close search"
            >
              <X size={22} />
            </button>
          </form>

          {/* Trending Suggestions */}
          {!query && (
            <div className="mt-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B6B6B] block mb-3">
                POPULAR SEARCHES
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingTerms.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                    }}
                    className="px-3.5 py-1.5 bg-[#F7F5F1] hover:bg-[#E8E2D8] text-xs font-semibold uppercase tracking-wider text-[#111111] border border-black/10 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Search Results */}
          {query && (
            <div className="mt-6">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs font-bold uppercase tracking-widest text-[#6B6B6B]">
                <span>MATCHING RESULTS ({results.length})</span>
                {results.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="text-[#111111] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    View all in catalog <ArrowRight size={13} />
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#6B6B6B]">
                  No products found matching "{query}". Try checking our featured collections.
                </div>
              ) : (
                <div className="divide-y divide-black/5 max-h-96 overflow-y-auto">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="py-3 flex items-center justify-between hover:bg-[#F7F5F1] px-2 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-14 object-cover bg-neutral-200"
                        />
                        <div>
                          <p className="text-xs uppercase tracking-wider text-[#6B6B6B] font-medium">
                            {product.gender} · {product.category}
                          </p>
                          <h4 className="text-sm font-semibold text-[#111111]">
                            {product.name}
                          </h4>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold text-[#111111] tabular-nums">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[11px] text-emerald-700 font-semibold">
                          {product.discount}% OFF
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
