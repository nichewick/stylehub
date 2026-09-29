export type Gender = 'men' | 'women' | 'unisex';

export type Category = 
  | 'Tees' 
  | 'Shirts' 
  | 'Hoodies' 
  | 'Trousers' 
  | 'Jackets' 
  | 'Co-ords' 
  | 'Dresses' 
  | 'Streetwear';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  gender: Gender;
  price: number;
  mrp: number;
  discount: number; // percentage
  images: string[];
  colors: ProductColor[];
  sizes: Size[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  tags: string[];
  description: string;
  fabric: string;
  gsm: string;
  fit: string;
  care: string[];
}

export interface CartItem {
  id: string; // generated unique id (productId + size + color)
  product: Product;
  size: Size;
  color: ProductColor;
  quantity: number;
}

export interface IndianAddress {
  fullName: string;
  phone: string;
  email: string;
  houseNo: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pinCode: string;
}

export type DeliveryMethod = 'standard' | 'express';

export type PaymentMethodType = 'upi' | 'cards' | 'netbanking' | 'wallet' | 'cod';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: IndianAddress;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethodType;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  gstAmount: number;
  total: number;
  status: 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  courier: string;
  trackingId: string;
  estimatedDelivery: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}
