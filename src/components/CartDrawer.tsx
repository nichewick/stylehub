import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Truck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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
    navigateTo
  } = useShop();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const ok = applyCoupon(couponCodeInput);
    if (ok) setCouponCodeInput('');
  };

  const shippingFee = cartSubtotal >= freeShippingThreshold || cart.length === 0 ? 0 : 79;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount) + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5F1] shadow-2xl flex flex-col border-l border-[#111111]/10">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#111111]/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#111111]">
                SHOPPING BAG ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (Key Conversion Driver) */}
          <div className="px-5 py-3.5 bg-[#E8E2D8]/60 border-b border-[#111111]/10 text-xs">
            <div className="flex items-center justify-between font-semibold text-[#111111] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck size={14} />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-800 font-bold">YOU’VE UNLOCKED FREE SHIPPING! 🎉</span>
                ) : (
                  <span>
                    Add <strong className="tabular-nums">₹{amountNeededForFreeShipping}</strong> more for FREE SHIPPING
                  </span>
                )}
              </span>
              <span className="tabular-nums text-[11px] text-neutral-600">
                ₹{cartSubtotal} / ₹{freeShippingThreshold}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-[#D8CEBE] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#111111] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#111111]/10">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 bg-[#E8E2D8] rounded-full flex items-center justify-center text-[#111111]/50">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-editorial text-lg font-bold uppercase text-[#111111]">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs text-[#6B6B6B] max-w-xs">
                  Discover our modern essentials designed for everyday confidence and effortless comfort.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-6 py-3 bg-[#111111] text-[#F7F5F1] text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors cursor-pointer"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover bg-[#E8E2D8] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wide line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6B6B6B] hover:text-black p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-[#6B6B6B]">
                        <span>Size: <strong className="text-black">{item.size}</strong></span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          Color:
                          <span
                            className="w-2 h-2 rounded-full inline-block border border-black/20"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <strong className="text-black">{item.color.name}</strong>
                        </span>
                      </div>

                      <div className="mt-1 text-xs font-bold text-[#111111] tabular-nums">
                        ₹{item.product.price.toLocaleString('en-IN')}
                        <span className="text-[10px] text-[#6B6B6B] line-through ml-1.5 font-normal">
                          ₹{item.product.mrp.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#111111]/20 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F7F5F1] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F7F5F1] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#111111] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#111111]/10 space-y-4">
              
              {/* Quick Coupon Input */}
              <div className="space-y-1.5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag size={13} />
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
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. WELCOME10)"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#F7F5F1] border border-[#111111]/15 px-3 py-2 text-xs uppercase placeholder-neutral-400 focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#111111] text-[#F7F5F1] text-[11px] font-bold tracking-widest uppercase hover:bg-black cursor-pointer"
                    >
                      APPLY
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600">{couponError}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#6B6B6B] border-t border-[#111111]/5 pt-3">
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
                <div className="flex justify-between text-sm font-bold text-[#111111] border-t border-[#111111]/10 pt-2">
                  <span>Total (Incl. of all taxes)</span>
                  <span className="tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('checkout');
                  }}
                  className="w-full py-4 bg-[#111111] hover:bg-black text-[#F7F5F1] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all group"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('cart');
                  }}
                  className="w-full py-2.5 bg-transparent border border-[#111111] text-[#111111] text-[11px] font-semibold tracking-widest uppercase hover:bg-[#F7F5F1] transition-colors cursor-pointer"
                >
                  VIEW FULL BAG &amp; TAX DETAILS
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
