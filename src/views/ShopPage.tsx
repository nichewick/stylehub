import React, { useMemo } from 'react';
import { SlidersHorizontal, LayoutGrid, Grid3X3, X, Search, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Gender, Category, Size } from '../types';

export const ShopPage: React.FC = () => {
  const {
    filters,
    setFilters,
    resetFilters,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery,
    isLargeGrid,
    setIsLargeGrid,
    setIsFilterDrawerOpen,
  } = useShop();

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

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesTag = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesTag) return false;
      }

      // Gender
      if (filters.gender !== 'all') {
        if (item.gender !== filters.gender && item.gender !== 'unisex') return false;
      }

      // Category
      if (filters.category !== 'all') {
        if (item.category !== filters.category) return false;
      }

      // Sizes
      if (filters.sizes.length > 0) {
        const hasMatchingSize = filters.sizes.some((s) => item.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Price
      if (item.price > filters.maxPrice) return false;

      // Discount
      if (filters.minDiscount > 0 && item.discount < filters.minDiscount) return false;

      // In Stock
      if (filters.inStockOnly && item.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'popularity') return b.rating - a.rating;
      if (sortOption === 'discount-desc') return b.discount - a.discount;
      if (sortOption === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      return 0; // recommended
    });
  }, [filters, sortOption, searchQuery]);

  const hasActiveFilters =
    filters.gender !== 'all' ||
    filters.category !== 'all' ||
    filters.sizes.length > 0 ||
    filters.maxPrice < 5000 ||
    filters.minDiscount > 0 ||
    searchQuery.trim().length > 0;

  return (
    <main className="bg-[#F7F5F1] min-h-screen py-8 sm:py-12 border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Title Banner */}
        <div className="border-b border-[#111111]/10 pb-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-1">
                CATALOGUE
              </span>
              <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] uppercase">
                SHOP ALL STYLES
              </h1>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-normal">
                All styles, one place. Crafted for modern Indian everyday life.
              </p>
            </div>

            {/* Quick Gender Filter Pills (Interactive Buttons) */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white p-1 border border-[#111111]/10">
              <button
                onClick={() => setFilters((p) => ({ ...p, gender: 'all' }))}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  filters.gender === 'all' ? 'bg-[#111111] text-white' : 'text-[#6B6B6B] hover:text-black'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilters((p) => ({ ...p, gender: 'men' }))}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  filters.gender === 'men' ? 'bg-[#111111] text-white' : 'text-[#6B6B6B] hover:text-black'
                }`}
              >
                Men
              </button>
              <button
                onClick={() => setFilters((p) => ({ ...p, gender: 'women' }))}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  filters.gender === 'women' ? 'bg-[#111111] text-white' : 'text-[#6B6B6B] hover:text-black'
                }`}
              >
                Women
              </button>
            </div>
          </div>
        </div>

        {/* Controls Toolbar (Search, Filter Trigger, Sort, View Toggle) */}
        <div className="bg-white border border-[#111111]/10 p-3 sm:p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by keyword, cloth, or fit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F7F5F1] pl-9 pr-8 py-2 text-xs text-[#111111] placeholder-neutral-400 border border-neutral-300 focus:outline-none focus:border-black"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4">
            
            {/* Filter Drawer Trigger */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#111111] text-xs font-bold uppercase tracking-wider text-[#111111] hover:bg-[#F7F5F1] transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              <span>FILTERS</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-black"></span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#6B6B6B] hidden sm:inline uppercase tracking-wider font-medium">SORT:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                aria-label="Sort products"
                className="bg-[#F7F5F1] border border-neutral-300 px-3 py-2 text-xs font-semibold text-[#111111] uppercase tracking-wider focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popularity">Most Popular</option>
                <option value="discount-desc">Biggest Discount</option>
              </select>
            </div>

            {/* Grid Density Toggle (Desktop) */}
            <div className="hidden lg:flex items-center border border-neutral-300 bg-[#F7F5F1]">
              <button
                onClick={() => setIsLargeGrid(false)}
                className={`p-2 transition-colors ${!isLargeGrid ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'}`}
                title="Standard Grid (4 cols)"
                aria-label="Standard Grid (4 columns)"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setIsLargeGrid(true)}
                className={`p-2 transition-colors ${isLargeGrid ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'}`}
                title="Large Grid (3 cols)"
                aria-label="Large Grid (3 columns)"
              >
                <Grid3X3 size={15} />
              </button>
            </div>

          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <span className="text-[#6B6B6B] font-medium mr-1">Active:</span>

            {filters.gender !== 'all' && (
              <span className="bg-white border border-[#111111]/20 px-2.5 py-1 flex items-center gap-1.5 uppercase font-medium">
                Gender: {filters.gender}
                <button
                  onClick={() => setFilters((p) => ({ ...p, gender: 'all' }))}
                  className="hover:text-black"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {filters.category !== 'all' && (
              <span className="bg-white border border-[#111111]/20 px-2.5 py-1 flex items-center gap-1.5 uppercase font-medium">
                Category: {filters.category}
                <button
                  onClick={() => setFilters((p) => ({ ...p, category: 'all' }))}
                  className="hover:text-black"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {filters.sizes.map((s) => (
              <span
                key={s}
                className="bg-white border border-[#111111]/20 px-2.5 py-1 flex items-center gap-1.5 font-medium"
              >
                Size: {s}
                <button
                  onClick={() =>
                    setFilters((p) => ({
                      ...p,
                      sizes: p.sizes.filter((x) => x !== s),
                    }))
                  }
                  className="hover:text-black"
                >
                  <X size={12} />
                </button>
              </span>
            ))}

            {filters.maxPrice < 5000 && (
              <span className="bg-white border border-[#111111]/20 px-2.5 py-1 flex items-center gap-1.5 font-medium">
                Under ₹{filters.maxPrice}
                <button
                  onClick={() => setFilters((p) => ({ ...p, maxPrice: 5000 }))}
                  className="hover:text-black"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {filters.minDiscount > 0 && (
              <span className="bg-white border border-[#111111]/20 px-2.5 py-1 flex items-center gap-1.5 font-medium">
                {filters.minDiscount}%+ OFF
                <button
                  onClick={() => setFilters((p) => ({ ...p, minDiscount: 0 }))}
                  className="hover:text-black"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="bg-white border border-[#111111]/20 px-2.5 py-1 flex items-center gap-1.5 font-medium">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-black">
                  <X size={12} />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-[#111111] underline hover:text-[#6B6B6B] ml-2 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <RotateCcw size={12} />
              Clear all
            </button>
          </div>
        )}

        {/* Results Count & Product Grid */}
        <div className="mb-4 text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Style' : 'Styles'}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#111111]/10 p-12 text-center space-y-4 my-8">
            <h3 className="font-editorial text-2xl font-bold uppercase text-[#111111]">
              NO MATCHING STYLES FOUND
            </h3>
            <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
              We couldn’t find any items matching your selected criteria. Try adjusting your filters or clearing search terms.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12 ${
              isLargeGrid
                ? 'grid-cols-2 md:grid-cols-3'
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};
