import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useShop, ViewType } from '../context/ShopContext';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    wishlistIds,
    setIsCartDrawerOpen,
    setIsSearchModalOpen,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: ViewType, params?: { gender?: 'men' | 'women' | 'all'; category?: any }) => {
    navigateTo(view, params);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F5F1]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(17,17,17,0.08)] py-3'
          : 'bg-[#F7F5F1] border-b border-[#111111]/10 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* ZONE 1: Brand Wordmark with subtle clothes hanger symbol */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-none"
              aria-label="Style Hub Home"
            >
              <svg
                className="w-5 h-5 text-[#111111] transition-transform duration-300 group-hover:-rotate-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Hanger hook */}
                <path d="M12 2a3 3 0 0 0-3 3c0 .8.3 1.5.8 2.1L2 14.5A2.5 2.5 0 0 0 4.5 17h15a2.5 2.5 0 0 0 2.5-2.5L14.2 7.1A3 3 0 0 0 15 5a3 3 0 0 0-3-3Z" />
                <path d="M7 17v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2" opacity="0.4" />
              </svg>
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
                STYLE HUB
              </span>
            </button>
          </div>

          {/* ZONE 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-xs lg:text-[13px] font-medium tracking-wide uppercase">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors hover:text-[#111111] cursor-pointer py-1 relative ${
                currentView === 'home'
                  ? 'text-[#111111] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#111111]'
                  : 'text-[#6B6B6B]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', { gender: 'all' })}
              className={`transition-colors hover:text-[#111111] cursor-pointer py-1 relative ${
                currentView === 'shop'
                  ? 'text-[#111111] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#111111]'
                  : 'text-[#6B6B6B]'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('shop', { gender: 'men' })}
              className="text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer py-1"
            >
              Men
            </button>
            <button
              onClick={() => handleNavClick('shop', { gender: 'women' })}
              className="text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer py-1"
            >
              Women
            </button>
            <button
              onClick={() => handleNavClick('shop', { gender: 'all' })}
              className="text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer py-1"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('shop', { gender: 'all' })}
              className="text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer py-1 flex items-center gap-1"
            >
              Offers
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111]"></span>
            </button>
          </nav>

          {/* ZONE 3: Actions (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-[#111111] hover:text-[#6B6B6B] transition-colors cursor-pointer"
              aria-label="Search collection"
              title="Search"
            >
              <Search size={19} strokeWidth={1.8} />
            </button>

            <button
              onClick={() => handleNavClick('account')}
              className="hidden sm:inline-flex p-2 text-[#111111] hover:text-[#6B6B6B] transition-colors cursor-pointer"
              aria-label="My Account"
              title="My Account"
            >
              <User size={19} strokeWidth={1.8} />
            </button>

            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 text-[#111111] hover:text-[#6B6B6B] transition-colors cursor-pointer"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart size={19} strokeWidth={1.8} />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-[#F7F5F1] text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-[#111111] hover:text-[#6B6B6B] transition-colors cursor-pointer"
              aria-label="Shopping bag"
              title="Shopping Bag"
            >
              <ShoppingBag size={19} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-[#F7F5F1] text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#111111] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5F1] border-b border-[#111111]/15 px-6 py-6 animate-fadeIn">
          <div className="flex flex-col gap-5 text-sm font-medium tracking-wide uppercase">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left text-[#111111] py-1 border-b border-black/5"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', { gender: 'all' })}
              className="text-left text-[#111111] py-1 border-b border-black/5"
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick('shop', { gender: 'men' })}
              className="text-left text-[#111111] py-1 border-b border-black/5"
            >
              Men’s Collection
            </button>
            <button
              onClick={() => handleNavClick('shop', { gender: 'women' })}
              className="text-left text-[#111111] py-1 border-b border-black/5"
            >
              Women’s Collection
            </button>
            <button
              onClick={() => handleNavClick('shop', { gender: 'all' })}
              className="text-left text-[#111111] py-1 border-b border-black/5"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('returns')}
              className="text-left text-[#6B6B6B] py-1 border-b border-black/5 text-xs"
            >
              Easy Returns & Exchanges
            </button>
            <button
              onClick={() => handleNavClick('account')}
              className="text-left text-[#6B6B6B] py-1 text-xs flex items-center justify-between"
            >
              <span>My Account & Orders</span>
              <User size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
