import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, isInWishlist, toggleWishlist, addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenSize = product.sizes[selectedSizeIndex] || product.sizes[0];
    const chosenColor = product.colors[0];
    addToCart(product, chosenSize, chosenColor, 1, false);

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  const handleCardClick = () => {
    navigateTo('product', { productId: product.id });
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col cursor-pointer bg-transparent transition-all duration-300"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE8DF]">
        {/* Wishlist Button (Always accessible top right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isFavorited
              ? 'bg-[#111111] text-white'
              : 'bg-white/80 hover:bg-white text-[#111111] backdrop-blur-sm'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={`transition-transform duration-200 ${isFavorited ? 'fill-white scale-110' : 'hover:scale-110'}`}
          />
        </button>

        {/* Subtle Discount / Tag at Top Left (No pill, clean text) */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-[#111111] text-[#F7F5F1] text-[10px] font-bold tracking-widest uppercase px-2 py-1">
            {product.discount}% OFF
          </div>
        )}

        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out ${
            isHovered && secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80';
          }}
        />

        {/* Secondary Image for Hover Reveal */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent transition-all duration-300 flex flex-col gap-2 z-20 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          {/* Quick Size Select */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1"
          >
            {product.sizes.slice(0, 5).map((size, idx) => (
              <button
                key={size}
                onClick={() => setSelectedSizeIndex(idx)}
                className={`w-7 h-7 text-[11px] font-semibold transition-colors ${
                  selectedSizeIndex === idx
                    ? 'bg-white text-[#111111]'
                    : 'bg-black/60 text-white hover:bg-white/80 hover:text-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quick Add CTA */}
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#111111] hover:bg-black text-[#F7F5F1] text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer shadow-md"
          >
            {addedAnimation ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>QUICK ADD</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Block */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-1">
          <span className="uppercase tracking-widest text-[10px] font-medium">
            {product.gender} · {product.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#111111]">
            <Star size={12} className="fill-[#111111] text-[#111111]" />
            <span>{product.rating}</span>
            <span className="text-[#6B6B6B]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-semibold text-sm sm:text-[15px] text-[#111111] tracking-tight line-clamp-1 group-hover:text-black">
          {product.name}
        </h3>

        {/* Price & MRP Row */}
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="font-bold text-[15px] text-[#111111] tabular-nums">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-[#6B6B6B] line-through tabular-nums">
            ₹{product.mrp.toLocaleString('en-IN')}
          </span>
          <span className="text-xs font-semibold text-[#111111] tracking-wider uppercase">
            {product.discount}% OFF
          </span>
        </div>

        {/* Subtle Colors Available indicator */}
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((color) => (
            <span
              key={color.name}
              title={color.name}
              style={{ backgroundColor: color.hex }}
              className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
            />
          ))}
          <span className="text-[10px] text-[#6B6B6B] ml-1">
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
          </span>
        </div>
      </div>
    </div>
  );
};
