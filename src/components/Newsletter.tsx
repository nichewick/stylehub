import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the Style Hub community! Check your inbox for 10% off.');
  };

  return (
    <section className="bg-[#111111] text-[#F7F5F1] py-16 sm:py-24 border-b border-neutral-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 block mb-3">
          NEWSLETTER
        </span>

        <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight uppercase">
          STAY IN STYLE.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-lg mx-auto font-light leading-relaxed">
          Get first access to new drops, exclusive offers and style inspiration. Receive an instant 10% coupon code for your first order.
        </p>

        {subscribed ? (
          <div className="mt-8 p-4 bg-neutral-900 border border-neutral-800 inline-flex items-center gap-3 text-sm text-[#F7F5F1]">
            <Check size={18} className="text-emerald-400" />
            <span>You're on the list! Use code <strong className="text-white">WELCOME10</strong> at checkout.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-neutral-900 border border-neutral-800 px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#F7F5F1] text-[#111111] text-xs font-bold tracking-widest uppercase hover:bg-white transition-all cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>JOIN STYLE HUB</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-neutral-500 tracking-wider">
          No spam. Just good style. Unsubscribe anytime with one click.
        </p>

      </div>
    </section>
  );
};
