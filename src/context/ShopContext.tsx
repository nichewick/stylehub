import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Size,
  ProductColor,
  IndianAddress,
  DeliveryMethod,
  PaymentMethodType,
  Order,
  Coupon,
  Gender,
  Category
} from '../types';
import { PRODUCTS, AVAILABLE_COUPONS, PIN_CODE_DATABASE } from '../data/products';

export type ViewType = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'track-order' 
  | 'account' 
  | 'wishlist' 
  | 'returns';

export interface FilterState {
  gender: Gender | 'all';
  category: Category | 'all';
  sizes: Size[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minDiscount: number;
}

export type SortOption = 
  | 'recommended' 
  | 'newest' 
  | 'price-asc' 
  | 'price-desc' 
  | 'popularity' 
  | 'discount-desc';

interface ToastState {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ShopContextType {
  // Navigation & View
  currentView: ViewType;
  navigateTo: (view: ViewType, params?: { productId?: string; category?: Category | 'all'; gender?: Gender | 'all'; query?: string }) => void;
  selectedProduct: Product | null;
  setSelectedProductId: (id: string | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: Size, color: ProductColor, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  freeShippingProgress: number;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistProducts: Product[];

  // Coupons
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;

  // Checkout & Orders
  shippingAddress: IndianAddress;
  setShippingAddress: React.Dispatch<React.SetStateAction<IndianAddress>>;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
  placeOrder: () => Order | null;
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  orderHistory: Order[];
  lookupPinCode: (pin: string) => { city: string; state: string; codAvailable: boolean } | null;

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Shop Page Filters & Controls
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  isLargeGrid: boolean;
  setIsLargeGrid: (large: boolean) => void;

  // Toast
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const FREE_SHIPPING_THRESHOLD = 999;

const DEFAULT_FILTERS: FilterState = {
  gender: 'all',
  category: 'all',
  sizes: [],
  colors: [],
  minPrice: 0,
  maxPrice: 5000,
  inStockOnly: false,
  minDiscount: 0,
};

const INITIAL_ADDRESS: IndianAddress = {
  fullName: 'Arjun Mehra',
  phone: '9876543210',
  email: 'arjun.mehra@example.com',
  houseNo: 'Flat 402, Signature Enclave',
  street: '12th Main Road, Indiranagar',
  landmark: 'Near 100ft Road junction',
  city: 'Bengaluru',
  state: 'Karnataka',
  pinCode: '560038'
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Cart & Wishlist with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('stylehub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('stylehub_wishlist');
      return saved ? JSON.parse(saved) : ['sh-m-01', 'sh-w-03'];
    } catch {
      return ['sh-m-01', 'sh-w-03'];
    }
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Checkout State
  const [shippingAddress, setShippingAddress] = useState<IndianAddress>(INITIAL_ADDRESS);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const [orderHistory, setOrderHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('stylehub_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Seed initial demo order so tracking and history are immediately testable
    return [
      {
        id: 'SH26000123',
        date: '28 Sep 2026',
        items: [
          {
            id: 'sh-m-01-L-Onyx Black',
            product: PRODUCTS[0],
            size: 'L',
            color: PRODUCTS[0].colors[0],
            quantity: 1
          }
        ],
        shippingAddress: INITIAL_ADDRESS,
        deliveryMethod: 'standard',
        paymentMethod: 'upi',
        subtotal: 799,
        discountAmount: 0,
        shippingFee: 79,
        gstAmount: 93,
        total: 878,
        status: 'shipped',
        courier: 'Delhivery Express',
        trackingId: 'DLV992817260IN',
        estimatedDelivery: '02 Oct 2026'
      }
    ];
  });

  // UI Overlays
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Shop Page Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [isLargeGrid, setIsLargeGrid] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stylehub_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stylehub_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // Sync orderHistory to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stylehub_orders', JSON.stringify(orderHistory));
    } catch {
      // ignore
    }
  }, [orderHistory]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (
    view: ViewType,
    params?: { productId?: string; category?: Category | 'all'; gender?: Gender | 'all'; query?: string }
  ) => {
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.category !== undefined) {
      setFilters((prev) => ({ ...prev, category: params.category! }));
    }
    if (params?.gender !== undefined) {
      setFilters((prev) => ({ ...prev, gender: params.gender! }));
    }
    if (params?.query !== undefined) {
      setSearchQuery(params.query);
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsCartDrawerOpen(false);
    setIsSearchModalOpen(false);
    setIsFilterDrawerOpen(false);
  };

  const selectedProduct = selectedProductId 
    ? PRODUCTS.find((p) => p.id === selectedProductId) || null 
    : null;

  // Cart Operations
  const addToCart = (
    product: Product,
    size: Size,
    color: ProductColor,
    quantity = 1,
    openDrawer = true
  ) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, size, color, quantity }];
    });

    showToast(`Added ${product.name} (${size}) to your bag`);
    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    const isPresent = wishlistIds.includes(productId);
    if (isPresent) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from wishlist', 'info');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      showToast('Saved to your wishlist');
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Coupon Logic
  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === clean);

    if (!found) {
      setCouponError('Invalid coupon code. Try WELCOME10 or STYLE20');
      showToast('Invalid coupon code', 'error');
      return false;
    }

    if (cartSubtotal < found.minOrder) {
      setCouponError(`This code applies on orders above ₹${found.minOrder.toLocaleString('en-IN')}`);
      showToast(`Minimum cart value ₹${found.minOrder} required`, 'error');
      return false;
    }

    setAppliedCoupon(found);
    setCouponError(null);
    showToast(`Coupon ${found.code} applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    showToast('Coupon removed', 'info');
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  // Pin Code auto-lookup
  const lookupPinCode = (pin: string) => {
    if (pin.length === 6 && PIN_CODE_DATABASE[pin]) {
      return PIN_CODE_DATABASE[pin];
    }
    return null;
  };

  // Place Order Simulation
  const placeOrder = (): Order | null => {
    if (cart.length === 0) return null;

    const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD 
      ? (deliveryMethod === 'express' ? 99 : 0)
      : (deliveryMethod === 'express' ? 99 : 79);

    const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
    // 12% GST breakdown included in apparel
    const gstAmount = Math.round(taxableAmount * 0.12);
    const finalTotal = taxableAmount + shippingFee;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SH26${randomSuffix}`;
    const trackingId = `DLV${Math.floor(100000000 + Math.random() * 900000000)}IN`;

    const estDays = deliveryMethod === 'express' ? 3 : 5;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + estDays);
    const estFormatted = estDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      items: [...cart],
      shippingAddress: { ...shippingAddress },
      deliveryMethod,
      paymentMethod,
      subtotal: cartSubtotal,
      discountAmount,
      shippingFee,
      gstAmount,
      total: finalTotal,
      status: 'confirmed',
      courier: 'Delhivery Express',
      trackingId,
      estimatedDelivery: estFormatted
    };

    setOrderHistory((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    navigateTo('order-confirmation');
    return newOrder;
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery('');
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        navigateTo,
        selectedProduct,
        setSelectedProductId,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        freeShippingProgress,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        wishlistProducts,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingAddress,
        setShippingAddress,
        deliveryMethod,
        setDeliveryMethod,
        paymentMethod,
        setPaymentMethod,
        placeOrder,
        currentOrder,
        setCurrentOrder,
        orderHistory,
        lookupPinCode,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        resetFilters,
        sortOption,
        setSortOption,
        isLargeGrid,
        setIsLargeGrid,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
