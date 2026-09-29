import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Banknote,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  MapPin,
  QrCode
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { INDIAN_STATES_AND_UTS, PIN_CODE_DATABASE } from '../data/products';
import { DeliveryMethod, PaymentMethodType } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    freeShippingThreshold,
    appliedCoupon,
    discountAmount,
    shippingAddress,
    setShippingAddress,
    deliveryMethod,
    setDeliveryMethod,
    paymentMethod,
    setPaymentMethod,
    placeOrder,
    navigateTo,
    lookupPinCode,
    showToast
  } = useShop();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [phoneError, setPhoneError] = useState('');
  const [pinError, setPinError] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'qr'>('gpay');
  const [isProcessing, setIsProcessing] = useState(false);

  // Address form validation
  const validateAddress = () => {
    let valid = true;
    if (!shippingAddress.fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return false;
    }
    const cleanPhone = shippingAddress.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!shippingAddress.email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }

    if (!shippingAddress.houseNo.trim()) {
      showToast('Please enter flat/house/building details', 'error');
      return false;
    }

    if (!shippingAddress.street.trim()) {
      showToast('Please enter street or locality', 'error');
      return false;
    }

    if (shippingAddress.pinCode.length !== 6 || !/^\d+$/.test(shippingAddress.pinCode)) {
      setPinError('Please enter a valid 6-digit Indian PIN code');
      valid = false;
    } else {
      setPinError('');
    }

    return valid;
  };

  const handlePinChange = (pin: string) => {
    setShippingAddress((prev) => ({ ...prev, pinCode: pin }));
    if (pin.length === 6) {
      const detected = lookupPinCode(pin);
      if (detected) {
        setShippingAddress((prev) => ({
          ...prev,
          city: detected.city,
          state: detected.state
        }));
        setPinError('');
        showToast(`Located ${detected.city}, ${detected.state}`);
      }
    }
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (!validateAddress()) return;
      setActiveStep(2);
    } else if (activeStep === 2) {
      setActiveStep(3);
    }
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder();
    }, 1200);
  };

  const shippingFee = cartSubtotal >= freeShippingThreshold
    ? (deliveryMethod === 'express' ? 99 : 0)
    : (deliveryMethod === 'express' ? 99 : 79);

  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const gstAmount = Math.round(taxableAmount * 0.12);
  const finalTotal = taxableAmount + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 bg-[#F7F5F1]">
        <h2 className="font-editorial text-2xl font-bold uppercase mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-[#6B6B6B] mb-6">Add items to proceed to checkout</p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  return (
    <main className="bg-[#F7F5F1] min-h-screen py-8 sm:py-12 border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link & Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigateTo('cart')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] hover:text-black cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Back to Bag</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <ShieldCheck size={16} />
            <span>Secure 256-Bit SSL Checkout</span>
          </div>
        </div>

        {/* 3-Step Checkout Flow Indicator */}
        <div className="bg-white border border-[#111111]/10 p-4 mb-8">
          <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-bold uppercase tracking-wider">
            <div
              onClick={() => setActiveStep(1)}
              className={`flex items-center gap-2 cursor-pointer ${
                activeStep === 1 ? 'text-[#111111]' : 'text-neutral-400'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                activeStep >= 1 ? 'bg-[#111111] text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>
                1
              </span>
              <span>Address</span>
            </div>

            <div className="w-12 h-[1px] bg-neutral-300"></div>

            <div
              onClick={() => {
                if (validateAddress()) setActiveStep(2);
              }}
              className={`flex items-center gap-2 cursor-pointer ${
                activeStep === 2 ? 'text-[#111111]' : 'text-neutral-400'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                activeStep >= 2 ? 'bg-[#111111] text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>
                2
              </span>
              <span>Delivery</span>
            </div>

            <div className="w-12 h-[1px] bg-neutral-300"></div>

            <div
              onClick={() => {
                if (validateAddress()) setActiveStep(3);
              }}
              className={`flex items-center gap-2 cursor-pointer ${
                activeStep === 3 ? 'text-[#111111]' : 'text-neutral-400'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                activeStep === 3 ? 'bg-[#111111] text-white' : 'bg-neutral-200 text-neutral-500'
              }`}>
                3
              </span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Checkout Forms (8 cols) + Order Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Checkout Step Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: Indian Delivery Address */}
            {activeStep === 1 && (
              <div className="bg-white border border-[#111111]/10 p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B6B6B] block mb-1">
                    STEP 1 OF 3
                  </span>
                  <h2 className="font-editorial text-2xl font-bold uppercase text-[#111111]">
                    DELIVERY ADDRESS (INDIA)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Full Name */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold uppercase tracking-wider text-[#111111]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Mehra"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="font-bold uppercase tracking-wider text-[#111111]">
                      Mobile Number (+91) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-neutral-200 border border-r-0 border-neutral-300 font-semibold text-neutral-700">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        placeholder="10-digit mobile number"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                    {phoneError && <p className="text-[11px] text-rose-600 font-medium">{phoneError}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="font-bold uppercase tracking-wider text-[#111111]">
                      Email Address (for order tracking) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. arjun@example.com"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Flat / House No */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold uppercase tracking-wider text-[#111111]">
                      Flat / House No. / Building / Floor *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 402, Signature Enclave"
                      value={shippingAddress.houseNo}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, houseNo: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Area / Street */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-bold uppercase tracking-wider text-[#111111]">
                      Street / Area / Locality *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12th Main Road, Indiranagar"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Landmark */}
                  <div className="space-y-1.5">
                    <label className="font-bold uppercase tracking-wider text-[#111111]">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near 100ft Road junction"
                      value={shippingAddress.landmark || ''}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, landmark: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* PIN Code */}
                  <div className="space-y-1.5">
                    <label className="font-bold uppercase tracking-wider text-[#111111]">
                      PIN Code (6 digits) *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="e.g. 560038, 110001"
                      value={shippingAddress.pinCode}
                      onChange={(e) => handlePinChange(e.target.value)}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs focus:outline-none focus:border-black"
                    />
                    {pinError && <p className="text-[11px] text-rose-600 font-medium">{pinError}</p>}
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="font-bold uppercase tracking-wider text-[#111111]">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru, Mumbai, Delhi"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* State Dropdown (All 28 Indian States & 8 UTs) */}
                  <div className="space-y-1.5">
                    <label className="font-bold uppercase tracking-wider text-[#111111]">
                      State / Union Territory *
                    </label>
                    <select
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full bg-[#F7F5F1] border border-neutral-300 px-3.5 py-3 text-xs font-semibold focus:outline-none focus:border-black cursor-pointer"
                    >
                      {INDIAN_STATES_AND_UTS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="w-full sm:w-auto px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>CONTINUE TO DELIVERY</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Delivery Options */}
            {activeStep === 2 && (
              <div className="bg-white border border-[#111111]/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#111111]/10 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B6B6B] block mb-1">
                      STEP 2 OF 3
                    </span>
                    <h2 className="font-editorial text-2xl font-bold uppercase text-[#111111]">
                      SELECT DELIVERY SPEED
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs text-[#111111] underline hover:text-[#6B6B6B] font-semibold"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Address Recap */}
                <div className="p-3.5 bg-[#F7F5F1] text-xs text-[#111111] flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#6B6B6B]" />
                  <div>
                    <p className="font-bold">{shippingAddress.fullName} · +91 {shippingAddress.phone}</p>
                    <p className="text-[#6B6B6B]">
                      {shippingAddress.houseNo}, {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
                    </p>
                  </div>
                </div>

                {/* Delivery Options Radio Cards */}
                <div className="space-y-3">
                  <label
                    onClick={() => setDeliveryMethod('standard')}
                    className={`p-4 border block cursor-pointer transition-all ${
                      deliveryMethod === 'standard'
                        ? 'border-black bg-[#F7F5F1]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryMethod === 'standard'}
                          onChange={() => setDeliveryMethod('standard')}
                          className="accent-black"
                        />
                        <div>
                          <p className="font-bold text-xs uppercase text-[#111111]">
                            STANDARD GROUND SHIPPING
                          </p>
                          <p className="text-xs text-[#6B6B6B]">
                            Estimated 4–6 business days via Delhivery / Bluedart
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-[#111111]">
                        {cartSubtotal >= freeShippingThreshold ? (
                          <span className="text-emerald-700">FREE</span>
                        ) : (
                          '₹79'
                        )}
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('express')}
                    className={`p-4 border block cursor-pointer transition-all ${
                      deliveryMethod === 'express'
                        ? 'border-black bg-[#F7F5F1]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryMethod === 'express'}
                          onChange={() => setDeliveryMethod('express')}
                          className="accent-black"
                        />
                        <div>
                          <p className="font-bold text-xs uppercase text-[#111111]">
                            PRIORITY AIR EXPRESS ⚡
                          </p>
                          <p className="text-xs text-[#6B6B6B]">
                            Dispatched same-day · 2–3 business days transit
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-[#111111]">₹99</span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] hover:text-black cursor-pointer"
                  >
                    ← Back to Address
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer flex items-center gap-2 shadow-sm"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Options (India-Focused) */}
            {activeStep === 3 && (
              <div className="bg-white border border-[#111111]/10 p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B6B6B] block mb-1">
                    STEP 3 OF 3
                  </span>
                  <h2 className="font-editorial text-2xl font-bold uppercase text-[#111111]">
                    PAYMENT METHOD
                  </h2>
                </div>

                {/* Payment Selection Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold uppercase">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-2 border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      paymentMethod === 'upi' ? 'bg-[#111111] text-white border-black' : 'bg-[#F7F5F1] text-neutral-700 hover:border-black'
                    }`}
                  >
                    <Smartphone size={16} />
                    <span>UPI</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cards')}
                    className={`py-3 px-2 border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      paymentMethod === 'cards' ? 'bg-[#111111] text-white border-black' : 'bg-[#F7F5F1] text-neutral-700 hover:border-black'
                    }`}
                  >
                    <CreditCard size={16} />
                    <span>CARDS</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-3 px-2 border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      paymentMethod === 'netbanking' ? 'bg-[#111111] text-white border-black' : 'bg-[#F7F5F1] text-neutral-700 hover:border-black'
                    }`}
                  >
                    <Building size={16} />
                    <span>NET BANKING</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('wallet')}
                    className={`py-3 px-2 border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      paymentMethod === 'wallet' ? 'bg-[#111111] text-white border-black' : 'bg-[#F7F5F1] text-neutral-700 hover:border-black'
                    }`}
                  >
                    <Wallet size={16} />
                    <span>WALLETS</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-2 border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer col-span-2 sm:col-span-1 ${
                      paymentMethod === 'cod' ? 'bg-[#111111] text-white border-black' : 'bg-[#F7F5F1] text-neutral-700 hover:border-black'
                    }`}
                  >
                    <Banknote size={16} />
                    <span>COD</span>
                  </button>
                </div>

                {/* UPI Panel */}
                {paymentMethod === 'upi' && (
                  <div className="p-5 bg-[#F7F5F1] border border-neutral-300 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                      Select UPI Application or Scan QR
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {[
                        { id: 'gpay', name: 'Google Pay' },
                        { id: 'phonepe', name: 'PhonePe' },
                        { id: 'paytm', name: 'Paytm' },
                        { id: 'bhim', name: 'BHIM UPI' },
                        { id: 'qr', name: 'Scan QR' }
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedUpiApp(app.id as any)}
                          className={`p-3 text-xs font-semibold border text-center transition-all cursor-pointer ${
                            selectedUpiApp === app.id
                              ? 'bg-white border-black shadow-xs font-bold text-black'
                              : 'bg-white/60 border-neutral-200 text-neutral-600 hover:bg-white'
                          }`}
                        >
                          {app.name}
                        </button>
                      ))}
                    </div>

                    {selectedUpiApp === 'qr' ? (
                      <div className="p-4 bg-white border border-neutral-300 flex flex-col items-center justify-center text-center space-y-2">
                        <QrCode size={96} className="text-[#111111]" />
                        <p className="text-xs font-bold uppercase">Scan with any UPI App</p>
                        <p className="text-[11px] text-neutral-500">GPay, PhonePe, Paytm, CRED UPI</p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 pt-2">
                        <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                          Enter UPI ID / VPA
                        </label>
                        <input
                          type="text"
                          defaultValue="arjun@okaxis"
                          placeholder="e.g. mobile@upi, name@okaxis"
                          className="w-full bg-white border border-neutral-300 px-3 py-2.5 text-xs focus:outline-none focus:border-black"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Cards Panel */}
                {paymentMethod === 'cards' && (
                  <div className="p-5 bg-[#F7F5F1] border border-neutral-300 space-y-3 text-xs">
                    <div className="flex items-center justify-between text-neutral-600 pb-2 border-b border-neutral-200">
                      <span>We accept:</span>
                      <span className="font-semibold text-neutral-800">RuPay · Visa · Mastercard · Amex</span>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-[#111111] uppercase">Card Number</label>
                      <input
                        type="text"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full bg-white border border-neutral-300 px-3 py-2.5 text-xs focus:outline-none focus:border-black tabular-nums"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-[#111111] uppercase">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          defaultValue="08/29"
                          className="w-full bg-white border border-neutral-300 px-3 py-2.5 text-xs focus:outline-none focus:border-black tabular-nums"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[#111111] uppercase">CVV</label>
                        <input
                          type="password"
                          defaultValue="842"
                          maxLength={4}
                          className="w-full bg-white border border-neutral-300 px-3 py-2.5 text-xs focus:outline-none focus:border-black tabular-nums"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking Panel */}
                {paymentMethod === 'netbanking' && (
                  <div className="p-5 bg-[#F7F5F1] border border-neutral-300 space-y-3 text-xs">
                    <p className="font-bold text-[#111111] uppercase">Popular Indian Banks</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((b, i) => (
                        <button
                          key={b}
                          type="button"
                          className={`p-2.5 bg-white border text-left text-xs font-medium cursor-pointer ${
                            i === 0 ? 'border-black font-bold' : 'border-neutral-200'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wallets */}
                {paymentMethod === 'wallet' && (
                  <div className="p-5 bg-[#F7F5F1] border border-neutral-300 space-y-3 text-xs">
                    <p className="font-bold text-[#111111] uppercase">Select Digital Wallet</p>
                    <div className="grid grid-cols-3 gap-2">
                      {['Paytm Wallet', 'Amazon Pay', 'PhonePe Wallet'].map((w, i) => (
                        <button
                          key={w}
                          type="button"
                          className={`p-3 bg-white border text-center text-xs font-semibold cursor-pointer ${
                            i === 0 ? 'border-black' : 'border-neutral-200'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* COD Panel */}
                {paymentMethod === 'cod' && (
                  <div className="p-5 bg-amber-50/60 border border-amber-200 space-y-2 text-xs text-amber-900">
                    <div className="flex items-center gap-2 font-bold uppercase">
                      <Banknote size={16} />
                      <span>Cash on Delivery</span>
                    </div>
                    <p>
                      COD availability is confirmed for PIN code <strong>{shippingAddress.pinCode}</strong> ({shippingAddress.city}). Please keep exact cash of <strong>₹{finalTotal.toLocaleString('en-IN')}</strong> ready at the time of delivery.
                    </p>
                  </div>
                )}

                {/* Submit Order Action */}
                <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] hover:text-black cursor-pointer"
                  >
                    ← Back to Delivery
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                    className="px-10 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-black cursor-pointer flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>PROCESSING PAYMENT...</span>
                    ) : (
                      <>
                        <span>PAY ₹{finalTotal.toLocaleString('en-IN')} &amp; PLACE ORDER</span>
                        <CheckCircle size={15} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: Order Summary Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#111111]/10 p-6 space-y-5 sticky top-24">
              <h3 className="font-editorial text-base font-bold uppercase tracking-wider text-[#111111] border-b border-[#111111]/10 pb-3">
                ORDER OVERVIEW ({cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'})
              </h3>

              {/* Items mini list */}
              <div className="max-h-56 overflow-y-auto divide-y divide-[#111111]/10 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-12 object-cover bg-neutral-200 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#111111] line-clamp-1">{item.product.name}</p>
                        <p className="text-[11px] text-[#6B6B6B]">
                          Qty: {item.quantity} · {item.size} · {item.color.name}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="space-y-2 text-xs text-[#6B6B6B] border-t border-[#111111]/10 pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#111111] tabular-nums">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span className="font-semibold tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-[#111111]">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-500">
                  <span>Estimated GST (12% Included)</span>
                  <span className="tabular-nums">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#111111] border-t border-[#111111]/10 pt-3">
                  <span>Payable Amount</span>
                  <span className="tabular-nums">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="text-[11px] text-[#6B6B6B] pt-2 space-y-1">
                <p>✓ All payments secured via 256-bit encryption</p>
                <p>✓ Hassle-free 7-day doorstep return policy</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
};
