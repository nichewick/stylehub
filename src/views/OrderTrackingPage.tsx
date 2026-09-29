import React, { useState } from 'react';
import {
  CheckCircle,
  Truck,
  Package,
  Clock,
  MapPin,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderTrackingPage: React.FC = () => {
  const { currentOrder, orderHistory, navigateTo } = useShop();

  const [searchOrderId, setSearchOrderId] = useState('');
  const activeOrder = (searchOrderId
    ? orderHistory.find((o) => o.id.toLowerCase() === searchOrderId.trim().toLowerCase())
    : currentOrder) || orderHistory[0];

  const steps = [
    { title: 'ORDER CONFIRMED', desc: 'Payment verified & order acknowledged', done: true, time: '28 Sep, 02:30 PM' },
    { title: 'PACKED AT ATELIER', desc: 'Quality inspected & sealed with eco-garment bag', done: true, time: '28 Sep, 06:15 PM' },
    { title: 'SHIPPED VIA DELHIVERY', desc: 'Handed over to Delhi Hub courier facility', done: activeOrder?.status !== 'confirmed' && activeOrder?.status !== 'packed', time: '29 Sep, 09:00 AM' },
    { title: 'OUT FOR DELIVERY', desc: 'Assigned to local field delivery agent', done: activeOrder?.status === 'out_for_delivery' || activeOrder?.status === 'delivered', time: 'Pending' },
    { title: 'DELIVERED', desc: 'Delivered to recipient with OTP signature', done: activeOrder?.status === 'delivered', time: 'Expected ' + (activeOrder?.estimatedDelivery || 'in 3 days') }
  ];

  return (
    <main className="bg-[#F7F5F1] min-h-screen py-8 sm:py-12 border-b border-[#111111]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigateTo('account')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] hover:text-black cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Back to Account</span>
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
            <ShieldCheck size={14} /> Live GPS Sync
          </span>
        </div>

        {/* Search Order Tracker Input */}
        <div className="bg-white border border-[#111111]/10 p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex-1 w-full relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Track different Order ID (e.g. SH26000123)"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value.toUpperCase())}
              className="w-full bg-[#F7F5F1] pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-black uppercase placeholder-neutral-400 border border-neutral-200"
            />
          </div>
          <span className="text-xs text-[#6B6B6B] font-medium">Tracking Order: <strong>#{activeOrder?.id}</strong></span>
        </div>

        {/* Tracking Card */}
        {activeOrder ? (
          <div className="bg-white border border-[#111111]/10 p-6 sm:p-10 space-y-8">
            
            {/* Order Meta Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#111111]/10 pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B] block">
                  LOGISTICS STATUS
                </span>
                <h1 className="font-editorial text-2xl sm:text-3xl font-bold uppercase text-[#111111]">
                  ORDER #{activeOrder.id}
                </h1>
                <p className="text-xs text-[#6B6B6B] mt-0.5">
                  Courier: <strong>{activeOrder.courier}</strong> · Tracking AWB: <strong>{activeOrder.trackingId}</strong>
                </p>
              </div>

              <div className="sm:text-right bg-[#F7F5F1] p-3 sm:p-4 border border-black/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B6B6B] block">
                  ESTIMATED ARRIVAL
                </span>
                <span className="text-base font-bold text-[#111111]">
                  {activeOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Step-by-Step Vertical Timeline */}
            <div className="space-y-6 relative pl-2 sm:pl-4">
              {steps.map((st, index) => (
                <div key={index} className="flex items-start gap-4 sm:gap-6 relative group">
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-3.5 sm:left-4 top-8 bottom-0 w-[2px] ${
                        st.done ? 'bg-[#111111]' : 'bg-neutral-200'
                      }`}
                    />
                  )}

                  {/* Icon Node */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                      st.done
                        ? 'bg-[#111111] text-white'
                        : 'bg-white border-2 border-neutral-300 text-neutral-400'
                    }`}
                  >
                    {st.done ? <CheckCircle size={14} /> : index + 1}
                  </div>

                  {/* Node Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-[#111111]">
                        {st.title}
                      </h4>
                      <span className="text-[11px] text-[#6B6B6B] font-medium tabular-nums">
                        {st.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-0.5 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Destination Card */}
            <div className="p-4 sm:p-5 bg-[#F7F5F1] border border-[#111111]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#111111]" />
                <div>
                  <p className="font-bold text-[#111111] uppercase tracking-wider">
                    DELIVERY ADDRESS
                  </p>
                  <p className="text-[#6B6B6B] mt-0.5">
                    {activeOrder.shippingAddress.fullName} · {activeOrder.shippingAddress.houseNo}, {activeOrder.shippingAddress.street}, {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} - {activeOrder.shippingAddress.pinCode}
                  </p>
                  <p className="text-[#6B6B6B]">Contact: +91 {activeOrder.shippingAddress.phone}</p>
                </div>
              </div>

              <button
                onClick={() => navigateTo('returns')}
                className="text-xs font-bold uppercase tracking-wider text-[#111111] underline hover:text-[#6B6B6B] whitespace-nowrap cursor-pointer"
              >
                Return or Exchange Item
              </button>
            </div>

          </div>
        ) : (
          <div className="bg-white border border-[#111111]/10 p-12 text-center text-xs text-[#6B6B6B]">
            No matching order found. Please check the order ID.
          </div>
        )}

      </div>
    </main>
  );
};
