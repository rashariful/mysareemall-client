import { useState } from "react";

import HeroSection from "@/components/HeroSection";
import OfferSection from "@/components/OfferSection";
import { ProductSelection, CartItem } from "@/components/ProductSelection";
import { OrderForm } from "@/components/OrderSection";
import Footer from "@/components/Footer";
import BigSellSection from "@/components/BigSellSection";
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
<SupportSticky/>
<BigSellSection/>
      {/* Hero */}
      {/* <HeroSection /> */}
<KeyPointsSection/>
      {/* Product Selection */}
      <ProductSelection onAddToCart={handleAddToCart} />

      {/* Offer */}
      <OfferSection />
      <DeliveryPolicySection/>

      {/* Order / Checkout Section */}
      <OrderForm
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {/* Footer */}
      <Footer/>
    </main>
  );
};

export default Index;

// import HeroSection from "@/components/HeroSection";
// import VideoSection from "@/components/VideoSection";
// import ImageSlider from "@/components/ImageSlider";
// import ProductGallery from "@/components/ProductGallery";
// import FeaturesSection from "@/components/FeaturesSection";
// import OfferSection from "@/components/OfferSection";
// import StockAlertSection from "@/components/StockAlertSection";
// import HeroRight from "@/components/HeroRight";
// import { useState } from "react";
// import { ProductSelection,CartItem } from "@/components/ProductSelection";
// import { OrderForm } from "@/components/OrderSection";

// const Index = () => {
//     const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const handleAddToCart = (item: CartItem) => {
//     setCartItems(prev => [...prev, item]);
//   };
//   return (
//     <main className="min-h-screen">
      
//       <HeroSection />
//      <ProductSelection onAddToCart={handleAddToCart}/>
//       {/* <VideoSection /> */}
//       {/* <StockAlertSection total={10000} remaining={4500}/> */}
//       {/* <ImageSlider />
//       <ProductGallery /> */}
//       <OfferSection/>
//       {/* <FeaturesSection /> */}
//       <ProductSelection onAddToCart={handleAddToCart}/>
//       <OrderForm cartItems={cartItems}/>
      
//       {/* Footer */}
//       <footer className="bg-foreground text-background py-8">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-sm">
//            © ২০২৫ My saree mall all right reserved call +880-1647-629051

//           </p>
//         </div>
//       </footer>
//     </main>
//   );
// };

// export default Index;
