import React, { useState } from 'react';
import { RotateCcw, CheckCircle, Package, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ReturnsPage: React.FC = () => {
  const { orderHistory, showToast, navigateTo } = useShop();

  const [orderIdInput, setOrderIdInput] = useState('SH26000123');
  const [returnReason, setReturnReason] = useState('size_issue');
  const [returnType, setReturnType] = useState<'return' | 'exchange'>('exchange');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      showToast('Please enter an Order ID', 'error');
      return;
    }
    setSubmitted(true);
    showToast(`${returnType === 'exchange' ? 'Exchange' : 'Return'} request registered successfully!`);
  };

  return (
    <main className="bg-[#F7F5F1] min-h-screen py-10 sm:py-16 border-b border-[#111111]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-2">
            HASSLE-FREE PROMISE
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111]">
            EASY RETURNS.
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
            Eligible products can be returned or exchanged within 7 days of delivery. Doorstep pickup arranged from your address with zero convenience fee.
          </p>
        </div>

        {/* 4 Pillars of Return Policy */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10 text-xs text-[#111111]">
          <div className="bg-white p-4 border border-[#111111]/10">
            <span className="font-bold block uppercase mb-1">7-DAY WINDOW</span>
            <p className="text-[#6B6B6B]">From the day your package is marked delivered by the courier.</p>
          </div>
          <div className="bg-white p-4 border border-[#111111]/10">
            <span className="font-bold block uppercase mb-1">FREE PICKUP</span>
            <p className="text-[#6B6B6B]">Courier representative collects directly from your shipping address.</p>
          </div>
          <div className="bg-white p-4 border border-[#111111]/10">
            <span className="font-bold block uppercase mb-1">INSTANT EXCHANGE</span>
            <p className="text-[#6B6B6B]">Size replacement dispatched immediately upon pickup scan.</p>
          </div>
          <div className="bg-white p-4 border border-[#111111]/10">
            <span className="font-bold block uppercase mb-1">QUICK REFUND</span>
            <p className="text-[#6B6B6B]">Refunds back to original UPI/Card or Bank within 24–48 hours.</p>
          </div>
        </div>

        {/* Return / Exchange Form */}
        <div className="bg-white border border-[#111111]/10 p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
              <h2 className="font-editorial text-2xl font-bold uppercase text-[#111111]">
                REQUEST RECEIVED!
              </h2>
              <p className="text-xs text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
                Your {returnType} request for Order #{orderIdInput} has been initiated. Our logistics partner Delhivery will pick up the package within 48 hours. Please ensure tags are intact.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => navigateTo('track-order')}
                  className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black"
                >
                  TRACK STATUS
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 border border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-[#F7F5F1]"
                >
                  NEW REQUEST
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitReturn} className="space-y-6 text-xs">
              <div className="border-b border-[#111111]/10 pb-4">
                <h3 className="font-editorial text-xl font-bold uppercase text-[#111111]">
                  INITIATE A RETURN OR SIZE EXCHANGE
                </h3>
                <p className="text-[#6B6B6B] mt-0.5">
                  Enter your order details below to generate a doorstep return label.
                </p>
              </div>

              {/* Return vs Exchange Toggle */}
              <div className="space-y-2">
                <label className="font-bold uppercase tracking-wider text-[#111111]">
                  Request Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReturnType('exchange')}
                    className={`py-3 px-4 border text-center font-bold uppercase tracking-wider cursor-pointer ${
                      returnType === 'exchange' ? 'bg-[#111111] text-white border-black' : 'bg-[#F7F5F1] text-neutral-600 hover:border-black'
                    }`}
                  >
                    Size Exchange (Fastest)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReturnType('return')}
                    className={`py-3 px-4 border text-center font-bold uppercase tracking-wider cursor-pointer ${
                      returnType === 'return' ? 'bg-[#111111] text-white border-black' : 'bg-[#F7F5F1] text-neutral-600 hover:border-black'
                    }`}
                  >
                    Return &amp; Refund to Bank
                  </button>
                </div>
              </div>

              {/* Order ID */}
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-[#111111]">
                  Order ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SH26000123"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
                  className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs uppercase font-semibold focus:outline-none focus:border-black"
                />
              </div>

              {/* Reason */}
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-[#111111]">
                  Reason for Return / Exchange *
                </label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs font-medium focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="size_issue">Size did not fit (Need larger / smaller)</option>
                  <option value="color_preference">Color looks different from expectations</option>
                  <option value="fabric_feel">Fabric handfeel preference</option>
                  <option value="change_of_mind">Changed my mind / Not needed</option>
                  <option value="defect_rare">Damaged or defective on arrival</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#111111] hover:bg-black text-[#F7F5F1] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>SUBMIT {returnType.toUpperCase()} REQUEST</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </main>
  );
};
