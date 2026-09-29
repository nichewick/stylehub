import React, { useState } from 'react';
import {
  Package,
  Heart,
  MapPin,
  User,
  CreditCard,
  RotateCcw,
  Headphones,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AccountPage: React.FC = () => {
  const {
    orderHistory,
    shippingAddress,
    wishlistProducts,
    navigateTo,
    setCurrentOrder,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<
    'orders' | 'profile' | 'addresses' | 'payments' | 'returns' | 'support'
  >('orders');

  const [userProfile, setUserProfile] = useState({
    name: 'Arjun Mehra',
    email: 'arjun.mehra@example.com',
    phone: '+91 9876543210',
    memberSince: 'March 2026'
  });

  const handleTrackSpecificOrder = (order: any) => {
    setCurrentOrder(order);
    navigateTo('track-order');
  };

  return (
    <main className="bg-[#F7F5F1] min-h-screen py-8 sm:py-12 border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Top Banner */}
        <div className="border-b border-[#111111]/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B6B6B] block mb-1">
              STYLE HUB PRIVILEGE
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold uppercase text-[#111111]">
              MY ACCOUNT
            </h1>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Welcome back, <strong>{userProfile.name}</strong> · Member since {userProfile.memberSince}
            </p>
          </div>
          <button
            onClick={() => showToast('Signed out of session', 'info')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6B6B6B] hover:text-black cursor-pointer self-start sm:self-auto"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* 2-Column Layout: Sidebar Nav (4 cols) + Content Stage (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 space-y-1 bg-white border border-[#111111]/10 p-3 self-start">
            {[
              { id: 'orders', name: 'My Orders', icon: Package, count: orderHistory.length },
              { id: 'profile', name: 'Profile Information', icon: User },
              { id: 'addresses', name: 'Saved Addresses', icon: MapPin },
              { id: 'payments', name: 'Saved Payment Methods', icon: CreditCard },
              { id: 'returns', name: 'Returns & Exchanges', icon: RotateCcw },
              { id: 'support', name: 'Customer Concierge', icon: Headphones },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full p-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#111111] text-white'
                      : 'text-neutral-700 hover:bg-[#F7F5F1] hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{tab.name}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-[11px] px-2 py-0.5 ${isActive ? 'bg-white text-black' : 'bg-[#E8E2D8] text-neutral-800'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-[#111111]/10 px-3 pb-2 text-[11px] text-[#6B6B6B] space-y-1">
              <p>Need urgent styling assistance?</p>
              <p className="font-semibold text-black">concierge@stylehub.in</p>
            </div>
          </div>

          {/* Main Stage */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-editorial text-xl font-bold uppercase text-[#111111]">
                    PAST ORDERS ({orderHistory.length})
                  </h2>
                </div>

                {orderHistory.length === 0 ? (
                  <div className="bg-white border border-[#111111]/10 p-10 text-center text-xs text-[#6B6B6B]">
                    No past orders yet. Discover our latest collection today.
                  </div>
                ) : (
                  orderHistory.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-[#111111]/10 p-5 sm:p-6 space-y-4 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#111111]/10 pb-4 text-xs">
                        <div>
                          <span className="font-bold text-sm text-[#111111]">ORDER #{order.id}</span>
                          <span className="text-[#6B6B6B] ml-2">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                            {order.status.replace(/_/g, ' ')}
                          </span>
                          <button
                            onClick={() => handleTrackSpecificOrder(order)}
                            className="inline-flex items-center gap-1 font-bold text-[#111111] hover:underline cursor-pointer"
                          >
                            <span>TRACK</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-[#111111]/10">
                        {order.items.map((item) => (
                          <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-12 h-16 object-cover bg-neutral-200"
                              />
                              <div>
                                <h4 className="font-bold text-[#111111]">{item.product.name}</h4>
                                <p className="text-[#6B6B6B]">
                                  Size: {item.size} · Color: {item.color.name} · Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold tabular-nums">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="pt-3 border-t border-[#111111]/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6B6B6B] gap-2">
                        <span>
                          Shipped to: <strong>{order.shippingAddress.city}, {order.shippingAddress.state}</strong>
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-[#111111] tabular-nums">
                            Total: ₹{order.total.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => navigateTo('returns')}
                            className="text-[#111111] underline font-medium hover:text-[#6B6B6B] cursor-pointer"
                          >
                            Return/Exchange
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-[#111111]/10 p-6 sm:p-8 space-y-6">
                <h2 className="font-editorial text-xl font-bold uppercase text-[#111111] border-b border-[#111111]/10 pb-4">
                  PERSONAL INFORMATION
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold uppercase text-[#111111]">Full Name</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-2.5 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase text-[#111111]">Email Address</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-2.5 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase text-[#111111]">Phone Number</label>
                    <input
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-2.5 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase text-[#111111]">Country</label>
                    <input
                      type="text"
                      disabled
                      value="India 🇮🇳"
                      className="w-full bg-neutral-200 border border-neutral-300 px-3.5 py-2.5 text-neutral-600 font-semibold"
                    />
                  </div>
                </div>

                <button
                  onClick={() => showToast('Profile details saved')}
                  className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer"
                >
                  SAVE CHANGES
                </button>
              </div>
            )}

            {/* TAB: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white border border-[#111111]/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#111111]/10 pb-4">
                  <h2 className="font-editorial text-xl font-bold uppercase text-[#111111]">
                    SAVED ADDRESSES
                  </h2>
                </div>

                <div className="p-5 border-2 border-black bg-[#F7F5F1] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold uppercase text-[#111111]">DEFAULT DELIVERY ADDRESS</span>
                    <span className="text-[10px] bg-black text-white px-2 py-0.5 uppercase font-semibold">Home</span>
                  </div>
                  <p className="font-bold text-sm text-[#111111]">{shippingAddress.fullName}</p>
                  <p className="text-[#6B6B6B]">
                    {shippingAddress.houseNo}, {shippingAddress.street}
                    {shippingAddress.landmark ? `, Near ${shippingAddress.landmark}` : ''}
                  </p>
                  <p className="text-[#6B6B6B]">
                    {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
                  </p>
                  <p className="text-neutral-700 font-medium pt-1">
                    Phone: +91 {shippingAddress.phone}
                  </p>
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="bg-white border border-[#111111]/10 p-6 sm:p-8 space-y-6">
                <h2 className="font-editorial text-xl font-bold uppercase text-[#111111] border-b border-[#111111]/10 pb-4">
                  SAVED PAYMENT METHODS
                </h2>
                <div className="p-4 border border-[#111111]/20 bg-[#F7F5F1] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-[#111111]" />
                    <div>
                      <p className="font-bold text-black uppercase">RuPay Platinum · Ending in 4444</p>
                      <p className="text-[#6B6B6B]">Expires 08/29 · Primary Card</p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold uppercase text-[10px]">Verified</span>
                </div>
              </div>
            )}

            {/* TAB: RETURNS */}
            {activeTab === 'returns' && (
              <div className="bg-white border border-[#111111]/10 p-6 sm:p-8 space-y-4">
                <h2 className="font-editorial text-xl font-bold uppercase text-[#111111] border-b border-[#111111]/10 pb-4">
                  RETURNS &amp; REPLACEMENTS
                </h2>
                <p className="text-xs text-[#6B6B6B]">
                  Have an item that needs a different size or return? All orders delivered within the last 7 days are eligible.
                </p>
                <button
                  onClick={() => navigateTo('returns')}
                  className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer inline-flex items-center gap-2"
                >
                  <span>GO TO RETURNS PORTAL</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* TAB: SUPPORT */}
            {activeTab === 'support' && (
              <div className="bg-white border border-[#111111]/10 p-6 sm:p-8 space-y-4 text-xs">
                <h2 className="font-editorial text-xl font-bold uppercase text-[#111111] border-b border-[#111111]/10 pb-4">
                  CUSTOMER CONCIERGE
                </h2>
                <div className="space-y-3 text-[#6B6B6B]">
                  <p>
                    Our dedicated Indian concierge team is available Monday to Saturday, 9:00 AM to 8:00 PM IST.
                  </p>
                  <div className="p-4 bg-[#F7F5F1] space-y-1 text-black font-semibold">
                    <p>📞 Toll-Free Helpline: 1800-STYLE-HUB (1800 789 534)</p>
                    <p>✉️ Email Concierge: support@stylehub.in</p>
                    <p>💬 WhatsApp Concierge: +91 98765 43210</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
};
