import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'FREE SHIPPING',
      desc: 'On orders above ₹999 across India'
    },
    {
      icon: ShieldCheck,
      title: 'SECURE PAYMENTS',
      desc: 'UPI, RuPay, Cards & Net Banking'
    },
    {
      icon: RotateCcw,
      title: 'EASY RETURNS',
      desc: '7-day hassle-free doorstep pickup'
    },
    {
      icon: Sparkles,
      title: 'PREMIUM QUALITY',
      desc: '100% bio-washed organic cotton'
    }
  ];

  return (
    <section className="border-b border-[#111111]/10 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 min-w-[240px] sm:min-w-0 shrink-0"
              >
                <div className="w-10 h-10 rounded-none bg-[#F7F5F1] border border-[#111111]/10 flex items-center justify-center shrink-0 text-[#111111]">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] mt-0.5 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
