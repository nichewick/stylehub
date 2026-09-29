import React from 'react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, setIsSizeGuideOpen } = useShop();

  return (
    <footer className="bg-[#111111] text-[#F7F5F1] pt-16 sm:pt-20 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12 pb-16 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 0-3 3c0 .8.3 1.5.8 2.1L2 14.5A2.5 2.5 0 0 0 4.5 17h15a2.5 2.5 0 0 0 2.5-2.5L14.2 7.1A3 3 0 0 0 15 5a3 3 0 0 0-3-3Z" />
              </svg>
              <span className="font-editorial text-2xl font-bold tracking-tight text-white uppercase">
                STYLE HUB
              </span>
            </div>

            <p className="text-sm text-neutral-400 max-w-sm font-light leading-relaxed">
              More Than Just Clothes. Contemporary Indian fashion, minimal luxury, and modern streetwear designed for everyday confidence and comfort.
            </p>

            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <p>📍 Delhi · Mumbai · Bengaluru</p>
              <p>✉️ support@stylehub.in · 📞 1800-STYLE-HUB</p>
            </div>
          </div>

          {/* Col 1: SHOP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <li>
                <button
                  onClick={() => navigateTo('shop', { gender: 'men' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { gender: 'women' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { gender: 'all' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { gender: 'all' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Streetwear' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Streetwear Drops
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { gender: 'all' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Offers &amp; Sales
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: HELP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              HELP
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <li>
                <button
                  onClick={() => navigateTo('returns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('track-order')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping &amp; Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ &amp; Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: COMPANY */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Style Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainable Mills
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Made for India */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            <p>© 2026 Style Hub Apparel Pvt Ltd. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-semibold text-neutral-200">
              Made for India 🇮🇳
            </span>
            <span className="text-neutral-500">·</span>
            <span>UPI &amp; RuPay Enabled</span>
            <span className="text-neutral-500">·</span>
            <span>GST Registered</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
