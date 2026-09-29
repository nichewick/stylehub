import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { navigateTo } = useShop();

  if (dismissed) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#111111] text-[#F7F5F1] text-[11px] font-medium tracking-widest uppercase border-b border-neutral-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Mobile scrolling / desktop centered text */}
        <div className="flex-1 flex items-center justify-center gap-4 text-center overflow-x-auto no-scrollbar py-0.5">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            FREE SHIPPING ON ORDERS ABOVE ₹999
            <span className="opacity-40 text-[9px] mx-1.5">●</span>
            EASY 7-DAY RETURNS
            <span className="opacity-40 text-[9px] mx-1.5">●</span>
            CASH ON DELIVERY AVAILABLE
          </span>
          <button
            onClick={() => navigateTo('shop')}
            className="hidden sm:inline-flex items-center gap-0.5 underline hover:text-[#E8E2D8] transition-colors ml-2 cursor-pointer font-semibold text-[10px]"
          >
            SHOP NOW <ChevronRight size={12} />
          </button>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-neutral-400 hover:text-white p-1 ml-2 transition-colors cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X size={13} />
        </button>
      </div>
    </aside>
  );
};
