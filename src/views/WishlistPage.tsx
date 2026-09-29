import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistPage: React.FC = () => {
  const {
    wishlistProducts,
    toggleWishlist,
    addToCart,
    navigateTo,
  } = useShop();

  const handleMoveToCart = (product: any) => {
    addToCart(product, product.sizes[0], product.colors[0], 1, true);
    toggleWishlist(product.id);
  };

  return (
    <main className="bg-[#F7F5F1] min-h-screen py-8 sm:py-12 border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-[#111111]/10 pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-1">
              SAVED PIECES
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold uppercase text-[#111111]">
              MY WISHLIST ({wishlistProducts.length})
            </h1>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold uppercase tracking-wider underline hover:text-[#6B6B6B]"
          >
            Explore Catalog
          </button>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white border border-[#111111]/10 p-12 text-center max-w-md mx-auto space-y-4 my-10">
            <div className="w-16 h-16 bg-[#E8E2D8] rounded-full mx-auto flex items-center justify-center text-[#111111]/40">
              <Heart size={28} />
            </div>
            <h2 className="font-editorial text-2xl font-bold uppercase text-[#111111]">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Save your favorite items to buy later. Click the heart icon on any product card while browsing.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer shadow-sm"
            >
              BROWSE COLLECTION
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#111111]/10 flex flex-col justify-between group"
              >
                <div
                  onClick={() => navigateTo('product', { productId: product.id })}
                  className="relative aspect-[3/4] overflow-hidden bg-[#E8E2D8] cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 hover:bg-white text-neutral-600 hover:text-black flex items-center justify-center cursor-pointer shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                  {product.discount > 0 && (
                    <div className="absolute top-2.5 left-2.5 bg-[#111111] text-white text-[10px] font-bold uppercase px-2 py-0.5">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#6B6B6B] uppercase font-semibold">
                      {product.gender} · {product.category}
                    </span>
                    <h3
                      onClick={() => navigateTo('product', { productId: product.id })}
                      className="font-semibold text-xs sm:text-sm text-[#111111] cursor-pointer line-clamp-1 hover:underline"
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="font-bold text-sm text-[#111111] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#6B6B6B] line-through tabular-nums">
                        ₹{product.mrp.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full py-2.5 bg-[#111111] hover:bg-black text-[#F7F5F1] text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                    >
                      <ShoppingBag size={13} />
                      <span>MOVE TO BAG</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
};
