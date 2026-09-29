import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Banknote,
  Ruler,
  ChevronDown,
  ChevronUp,
  MapPin,
  Check,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Size, ProductColor } from '../types';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsSizeGuideOpen,
    navigateTo,
    lookupPinCode,
    showToast,
  } = useShop();

  const product = selectedProduct || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  // Accordion Toggles
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');

  // PIN Code Delivery Checker State
  const [pinCodeInput, setPinCodeInput] = useState('');
  const [pinCheckResult, setPinCheckResult] = useState<{
    valid: boolean;
    city?: string;
    state?: string;
    message: string;
  } | null>(null);

  const isFavorited = isInWishlist(product.id);

  const handleCheckPinCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCodeInput.length !== 6 || !/^\d+$/.test(pinCodeInput)) {
      setPinCheckResult({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code'
      });
      return;
    }

    const info = lookupPinCode(pinCodeInput);
    if (info) {
      setPinCheckResult({
        valid: true,
        city: info.city,
        state: info.state,
        message: `Delivery available to ${info.city}, ${info.state} by ${new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}. Cash on Delivery is eligible!`
      });
    } else {
      setPinCheckResult({
        valid: true,
        message: `Standard delivery available to PIN ${pinCodeInput} within 4–6 business days.`
      });
    }
  };

  const handleAddToCart = (openDrawer = true) => {
    addToCart(product, selectedSize, selectedColor, quantity, openDrawer);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity, false);
    navigateTo('checkout');
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <main className="bg-[#F7F5F1] min-h-screen py-6 sm:py-10 pb-24 sm:pb-16 border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-6 uppercase tracking-wider">
          <button onClick={() => navigateTo('home')} className="hover:text-black cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop', { gender: product.gender })} className="hover:text-black cursor-pointer">{product.gender}</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop', { category: product.category })} className="hover:text-black cursor-pointer">{product.category}</button>
          <span>/</span>
          <span className="text-[#111111] font-semibold truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-[#E8E2D8] overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx ? 'border-[#111111]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[3/4] bg-[#E8E2D8] overflow-hidden group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Wishlist Button floating on image */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center transition-all cursor-pointer ${
                  isFavorited ? 'bg-[#111111] text-white' : 'bg-white/80 hover:bg-white text-black backdrop-blur-sm'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} className={isFavorited ? 'fill-white' : ''} />
              </button>

              {/* Discount Tag */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
                  {product.discount}% OFF
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Category, Title & Reviews */}
            <div className="space-y-2 border-b border-[#111111]/10 pb-5">
              <div className="flex items-center justify-between text-xs text-[#6B6B6B] uppercase tracking-widest">
                <span>STYLE HUB · {product.gender}</span>
                <span className="font-semibold text-emerald-800">● IN STOCK</span>
              </div>

              <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111] uppercase leading-tight">
                {product.name}
              </h1>

              {/* Rating and Reviews link */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'fill-[#111111] text-[#111111]' : 'text-neutral-300'}
                    />
                  ))}
                </div>
                <span className="font-bold text-[#111111]">{product.rating}</span>
                <span className="text-[#6B6B6B]">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Row (India-First with MRP & Tax Note) */}
            <div className="space-y-1 border-b border-[#111111]/10 pb-5">
              <div className="flex items-baseline gap-3">
                <span className="font-bold text-2xl sm:text-3xl text-[#111111] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-[#6B6B6B] line-through tabular-nums">
                  MRP ₹{product.mrp.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                  {product.discount}% OFF
                </span>
              </div>
              <p className="text-[11px] text-[#6B6B6B]">
                Inclusive of all taxes · Free delivery on prepaid orders above ₹999
              </p>
            </div>

            {/* Color Selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold uppercase tracking-widest text-[#111111]">
                  COLOR: <span className="font-normal text-[#6B6B6B]">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 p-0.5 flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor.name === c.name ? 'ring-2 ring-black ring-offset-2' : 'hover:scale-105'
                    }`}
                    title={c.name}
                  >
                    <span
                      className="w-full h-full border border-black/20 block"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide Link */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-widest text-[#111111]">
                  SELECT SIZE: <span className="font-normal text-[#6B6B6B]">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1 font-semibold text-[#111111] underline hover:text-[#6B6B6B] cursor-pointer"
                >
                  <Ruler size={13} />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 text-xs font-bold uppercase transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-[#111111] text-white shadow-sm'
                        : 'bg-white border border-[#111111]/20 text-neutral-700 hover:border-black hover:text-black'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Buy Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#111111]/30 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 flex items-center justify-center text-sm font-semibold hover:bg-neutral-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-12 flex items-center justify-center text-sm font-semibold hover:bg-neutral-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(true)}
                  className="flex-1 py-3.5 bg-[#111111] hover:bg-black text-[#F7F5F1] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all group"
                >
                  <ShoppingBag size={16} />
                  <span>ADD TO BAG</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#E8E2D8] hover:bg-[#D8CEBE] text-[#111111] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>BUY IT NOW (EXPRESS CHECKOUT)</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* PIN Code Delivery Checker (Indian Market Specialized) */}
            <div className="p-4 bg-white border border-[#111111]/10 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                <MapPin size={15} />
                <span>CHECK DELIVERY &amp; COD AVAILABILITY</span>
              </div>
              <form onSubmit={handleCheckPinCode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN Code (e.g. 560038, 110001)"
                  value={pinCodeInput}
                  onChange={(e) => setPinCodeInput(e.target.value)}
                  className="flex-1 bg-[#F7F5F1] border border-neutral-300 px-3 py-2 text-xs text-[#111111] placeholder-neutral-400 focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer"
                >
                  CHECK
                </button>
              </form>
              {pinCheckResult && (
                <div
                  className={`text-xs p-2.5 flex items-start gap-2 ${
                    pinCheckResult.valid
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {pinCheckResult.valid && <Check size={14} className="mt-0.5 shrink-0" />}
                  <span>{pinCheckResult.message}</span>
                </div>
              )}
            </div>

            {/* Trust Highlights Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#111111]">
              <div className="flex items-center gap-2 p-2.5 bg-white border border-[#111111]/10">
                <Truck size={16} className="text-[#6B6B6B]" />
                <span>Free shipping above ₹999</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-white border border-[#111111]/10">
                <RotateCcw size={16} className="text-[#6B6B6B]" />
                <span>7-Day Doorstep Returns</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-white border border-[#111111]/10">
                <ShieldCheck size={16} className="text-[#6B6B6B]" />
                <span>UPI, Cards &amp; NetBanking</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-white border border-[#111111]/10">
                <Banknote size={16} className="text-[#6B6B6B]" />
                <span>Cash on Delivery Available</span>
              </div>
            </div>

            {/* Collapsible Accordions for Specifications */}
            <div className="border-t border-[#111111]/10 pt-4 divide-y divide-[#111111]/10 text-xs">
              
              {/* Accordion 1: Description & Fabric */}
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'fabric' ? null : 'fabric')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[#111111] text-left cursor-pointer"
                >
                  <span>FABRIC &amp; SPECIFICATIONS</span>
                  {openAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'fabric' && (
                  <div className="pt-3 space-y-2 text-[#6B6B6B] leading-relaxed">
                    <p>{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-neutral-800">
                      <div><strong>Material:</strong> {product.fabric}</div>
                      <div><strong>Weight:</strong> {product.gsm}</div>
                      <div><strong>Fit:</strong> {product.fit}</div>
                      <div><strong>Origin:</strong> Milled in India</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Wash & Care */}
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[#111111] text-left cursor-pointer"
                >
                  <span>WASH &amp; CARE INSTRUCTIONS</span>
                  {openAccordion === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'care' && (
                  <ul className="pt-3 list-disc pl-4 space-y-1 text-[#6B6B6B]">
                    {product.care.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-[#111111] text-left cursor-pointer"
                >
                  <span>SHIPPING &amp; 7-DAY RETURNS</span>
                  {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-3 space-y-2 text-[#6B6B6B] leading-relaxed">
                    <p>
                      Orders dispatched within 24 hours from our Delhi &amp; Bengaluru hubs. Standard delivery arrives in 3–5 business days across Indian metros.
                    </p>
                    <p>
                      Hassle-free 7-day doorstep return and size exchange policy. No questions asked for unworn items with tags intact.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Styles Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#111111]/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-1">
                  RECOMMENDED
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold uppercase text-[#111111]">
                  YOU MAY ALSO LIKE
                </h2>
              </div>
              <button
                onClick={() => navigateTo('shop', { gender: product.gender })}
                className="text-xs font-semibold uppercase tracking-wider underline hover:text-[#6B6B6B]"
              >
                View Collection
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Section 40: Sticky Mobile Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-black/10 p-3 z-30 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[11px] text-[#6B6B6B] uppercase font-semibold">
            {selectedSize} · {selectedColor.name}
          </p>
          <p className="text-sm font-bold text-[#111111] tabular-nums">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(true)}
          className="px-5 py-3 bg-[#111111] text-white text-xs font-bold tracking-widest uppercase hover:bg-black cursor-pointer shadow-sm"
        >
          ADD TO BAG
        </button>

        <button
          onClick={handleBuyNow}
          className="px-5 py-3 bg-[#E8E2D8] text-[#111111] text-xs font-bold tracking-widest uppercase hover:bg-[#D8CEBE] cursor-pointer"
        >
          BUY NOW
        </button>
      </div>
    </main>
  );
};
