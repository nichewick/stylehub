import React from 'react';
import { CheckCircle2, Truck, ArrowRight, Package, MapPin, Calendar } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationPage: React.FC = () => {
  const { currentOrder, orderHistory, navigateTo } = useShop();

  const order = currentOrder || orderHistory[0];

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-editorial text-2xl font-bold uppercase mb-4">No active order found</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <main className="bg-[#F7F5F1] min-h-screen py-12 sm:py-16 border-b border-[#111111]/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Success Banner Card */}
        <div className="bg-white border border-[#111111]/10 p-8 sm:p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#6B6B6B] block">
            THANK YOU FOR CHOOSING STYLE HUB
          </span>

          <h1 className="font-editorial text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111]">
            ORDER PLACED!
          </h1>

          <p className="text-sm font-semibold text-[#111111] tracking-wider">
            ORDER #{order.id}
          </p>

          <p className="text-xs text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
            We’ve sent the invoice and tracking confirmation to{' '}
            <strong className="text-black">{order.shippingAddress.email}</strong> and SMS updates to{' '}
            <strong className="text-black">+91 {order.shippingAddress.phone}</strong>.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('track-order')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] hover:bg-black text-[#F7F5F1] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Truck size={15} />
              <span>TRACK ORDER</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#111111] text-[#111111] text-xs font-bold tracking-widest uppercase hover:bg-[#F7F5F1] cursor-pointer"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>

        {/* Order Details Breakdown Card */}
        <div className="bg-white border border-[#111111]/10 p-6 sm:p-8 mt-6 space-y-6">
          <h3 className="font-editorial text-lg font-bold uppercase tracking-wider text-[#111111] border-b border-[#111111]/10 pb-3">
            ORDER SPECIFICATIONS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs border-b border-[#111111]/10 pb-6">
            <div className="space-y-1">
              <span className="text-[#6B6B6B] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Calendar size={13} /> Estimated Delivery
              </span>
              <p className="font-bold text-sm text-[#111111]">{order.estimatedDelivery}</p>
              <p className="text-[#6B6B6B]">{order.courier}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#6B6B6B] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={13} /> Destination
              </span>
              <p className="font-bold text-[#111111]">{order.shippingAddress.fullName}</p>
              <p className="text-[#6B6B6B] line-clamp-2">
                {order.shippingAddress.houseNo}, {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[#6B6B6B] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Package size={13} /> Total Amount
              </span>
              <p className="font-bold text-sm text-[#111111] tabular-nums">
                ₹{order.total.toLocaleString('en-IN')}
              </p>
              <p className="text-[#6B6B6B] uppercase font-medium">
                Payment: {order.paymentMethod} (Verified)
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              ITEMS IN THIS SHIPMENT ({order.items.length})
            </h4>
            <div className="divide-y divide-[#111111]/10">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover bg-neutral-200"
                    />
                    <div>
                      <p className="font-bold text-[#111111]">{item.product.name}</p>
                      <p className="text-[11px] text-[#6B6B6B]">
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
          </div>
        </div>

      </div>
    </main>
  );
};
