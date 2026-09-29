/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { FilterDrawer } from './components/FilterDrawer';
import { ToastContainer } from './components/ToastContainer';

import { HomePage } from './views/HomePage';
import { ShopPage } from './views/ShopPage';
import { ProductDetailPage } from './views/ProductDetailPage';
import { CartPage } from './views/CartPage';
import { CheckoutPage } from './views/CheckoutPage';
import { OrderConfirmationPage } from './views/OrderConfirmationPage';
import { OrderTrackingPage } from './views/OrderTrackingPage';
import { AccountPage } from './views/AccountPage';
import { WishlistPage } from './views/WishlistPage';
import { ReturnsPage } from './views/ReturnsPage';

const AppContent: React.FC = () => {
  const { currentView } = useShop();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'track-order':
        return <OrderTrackingPage />;
      case 'account':
        return <AccountPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'returns':
        return <ReturnsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F1] text-[#111111]">
      <AnnouncementBar />
      <Header />
      
      <div className="flex-1">
        {renderCurrentView()}
      </div>

      <Footer />

      {/* Global Overlays and Modals */}
      <CartDrawer />
      <SearchModal />
      <SizeGuideModal />
      <FilterDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
