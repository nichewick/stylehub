import React, { useState } from 'react';
import { Trash2, ArrowRight, Truck, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    freeShippingProgress,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    discountAmount,
    navigateTo,
  } = useShop();

  const [couponCode, setCouponCode] = useState('');

  const shippingFee = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 79;
  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  // GST breakdown (12% standard on Indian apparel above ₹1000 or 5% below, calculated for display)
  const gstAmount = Math.round(taxableAmount * 0.12);
  const finalTotal = taxableAmount + shippingFee;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const ok = applyCoupon(couponCode);
    if (ok) setCouponCode('');
  };

  const suggestedItems = PRODUCTS.filter(
    (p) => !cart.some((item) => item.product.id === p.id)
  ).slice(0, 4);

  return (
    <main className="bg-[#F7F5F1] min-h-screen py-8 sm:py-12 border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="border-b border-[#111111]/10 pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-1">
              YOUR BAG
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold uppercase text-[#111111]">
              SHOPPING CART ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h1>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold uppercase tracking-wider underline hover:text-[#6B6B6B]"
          >
            Continue Shopping
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-[#111111]/10 p-12 text-center max-w-lg mx-auto space-y-4 my-10">
            <div className="w-16 h-16 bg-[#E8E2D8] rounded-full mx-auto flex items-center justify-center text-[#111111]/40">
              <ShoppingBag size={28} />
            </div>
            <h2 className="font-editorial text-2xl font-bold uppercase text-[#111111]">
              YOUR BAG IS EMPTY
            </h2>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Looks like you haven't added anything to your cart yet. Explore our latest drop of everyday modern essentials.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer shadow-sm"
            >
              SHOP NEW ARRIVALS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT: Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Alert Banner */}
              <div className="bg-white border border-[#111111]/10 p-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#111111] mb-2">
                  <span className="flex items-center gap-2">
                    <Truck size={15} />
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-emerald-800">CONGRATS! YOU GET FREE SHIPPING IN INDIA</span>
                    ) : (
                      <span>
                        Add <strong className="tabular-nums">₹{amountNeededForFreeShipping}</strong> more to unlock FREE SHIPPING
                      </span>
                    )}
                  </span>
                  <span className="tabular-nums text-neutral-500 font-semibold">
                    ₹{cartSubtotal} / ₹{freeShippingThreshold}
                  </span>
                </div>
                <div className="w-full bg-[#E8E2D8] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#111111] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white border border-[#111111]/10 divide-y divide-[#111111]/10">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-26 sm:w-24 sm:h-32 object-cover bg-[#E8E2D8] shrink-0"
                    />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] text-[#6B6B6B] uppercase tracking-wider font-semibold">
                            {item.product.gender} · {item.product.category}
                          </span>
                          <h3 className="font-semibold text-sm sm:text-base text-[#111111]">
                            {item.product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6B6B6B] hover:text-black p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#6B6B6B]">
                        <span>Size: <strong className="text-black">{item.size}</strong></span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          Color:
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <strong className="text-black">{item.color.name}</strong>
                        </span>
                      </div>

                      <div className="pt-2 flex items-center justify-between sm:justify-start sm:gap-8">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#111111]/20 bg-[#F7F5F1]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold hover:bg-neutral-200 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold hover:bg-neutral-200 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price Breakdown */}
                        <div className="text-right sm:text-left">
                          <span className="text-sm font-bold text-[#111111] tabular-nums">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-[#6B6B6B] line-through ml-2 tabular-nums">
                            ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              <div className="bg-white border border-[#111111]/10 p-6 space-y-5">
                <h3 className="font-editorial text-base font-bold uppercase tracking-wider text-[#111111] border-b border-[#111111]/10 pb-3">
                  ORDER SUMMARY
                </h3>

                {/* Coupon Form */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                    APPLY COUPON
                  </span>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                      <div className="flex items-center gap-1.5">
                        <Tag size={14} />
                        <span>Code <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount})</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-emerald-700 hover:text-emerald-900 underline text-[11px] cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. WELCOME10, STYLE20"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 bg-[#F7F5F1] border border-neutral-300 px-3 py-2 text-xs uppercase placeholder-neutral-400 focus:outline-none focus:border-black"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer"
                      >
                        APPLY
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                </div>

                {/* Calculations */}
                <div className="space-y-2 text-xs text-[#6B6B6B] border-t border-[#111111]/10 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#111111] tabular-nums">
                      ₹{cartSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-semibold tabular-nums">-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-[#111111]">
                      {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-500">
                    <span>Estimated GST (Included)</span>
                    <span className="tabular-nums">₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#111111] border-t border-[#111111]/10 pt-3">
                    <span>Estimated Total</span>
                    <span className="tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => navigateTo('checkout')}
                  className="w-full py-4 bg-[#111111] hover:bg-black text-[#F7F5F1] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all group"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B6B6B] pt-2">
                  <ShieldCheck size={14} />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Suggested Complementary Styles */}
        {suggestedItems.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#111111]/10">
            <h2 className="font-editorial text-2xl font-bold uppercase text-[#111111] mb-6">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {suggestedItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
};
