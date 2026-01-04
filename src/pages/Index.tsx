import { useState } from "react";

import OfferSection from "@/components/OfferSection";
import { ProductSelection, CartItem } from "@/components/ProductSelection";
import { OrderForm } from "@/components/OrderSection";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import KeyPointsSection from "@/components/KeyPointsSection";
import { DeliveryPolicySection } from "@/components/DeliveryPolicySection";
import SupportSticky from "@/components/SupportSticky";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <main className="min-h-screen">
      <SupportSticky />
      <Banner />
      <KeyPointsSection />
      <ProductSelection onAddToCart={handleAddToCart} />
      <OfferSection />
      <DeliveryPolicySection />
      <OrderForm cartItems={cartItems} setCartItems={setCartItems} />
      <Footer />
    </main>
  );
};

export default Index;
