import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useGtmEvents } from "@/hooks/useGtmEvents";

// Placeholder images to replace local assets for the demo
import meron from "@/assets/meron.jpg";
import nil from "@/assets/nil.jpg";
import black from "@/assets/black.jpg";
import golden from "@/assets/golden.jpeg";
import red from "@/assets/red.jpeg";
import pink from "@/assets/pink.jpg";
import green from "@/assets/green.jpeg";
import white from "@/assets/white.jpeg"
export interface CartItem {
  productId: string;
  productName: string;
  color: string;
  image: string;
  quantity: number;
  price: number;
}



const productOptions = [
    {
    id: "black",
    name: "কালো রঙের প্রিমিয়াম পার্টি শাড়ি",
    color: "কালো",
    image: black,
    price: 1650,
    originalPrice: 2200,
  },
 {
    id: "meron",
    name: "মেরুন রঙের প্রিমিয়াম পার্টি শাড়ি",
    color: "মেরুন",
    image: meron,
    price: 1650,
    originalPrice: 2200,
  },
    {
    id: "nill",
    name: "নীল রঙের প্রিমিয়াম পার্টি শাড়ি",
    color: "নীল",
    image: nil,
    price: 1650,
    originalPrice: 2200,
  },
  
  {
    id: "golden",
    name: "গোল্ডেন রঙের প্রিমিয়াম পার্টি শাড়ি",
    color: "গোল্ডেন",
    image: golden,
    price: 1650,
    originalPrice: 2200,
  },
  {
    id: "pink",
    name: "পিঙ্ক রঙের প্রিমিয়াম পার্টি শাড়ি",
    color: "pink",
    image: pink,
    price: 1650,
    originalPrice: 2200,
  },
  {
    id: "green",
    name: "সি-গ্রীন- রঙের প্রিমিয়াম পার্টি শাড়ি",
    color: "green",
    image: green,
    price: 1650,
    originalPrice: 2200,
  },
  {
    id: "white",
    name: "সাদা রঙের প্রিমিয়াম পার্টি শাড়ি",
    color: "white",
    image: white,
    price: 1650,
    originalPrice: 2200,
  },
 
  {
    id: "red",
    name: "লাল রঙের প্রিমিয়াম পার্টি শাড়ি",
    color: "red",
    image: red,
    price: 1650,
    originalPrice: 2200,
  },
 


];

interface ProductSelectionProps {
  onAddToCart: (item: CartItem) => void;
}

const AUTOPLAY_DELAY = 3000;

export const ProductSelection = ({ onAddToCart }: ProductSelectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { trackContentView, trackAddToCart } = useGtmEvents();

  /* ---------------- Slider State ---------------- */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4); // Default to desktop view

  /* ---------------- Quantity State ---------------- */
  const [quantities, setQuantities] = useState(
    productOptions.reduce((acc, p) => {
      acc[p.id] = 1;
      return acc;
    }, {} as Record<string, number>)
  );
  const [addingProduct, setAddingProduct] = useState<string | null>(null);

  /* ---------------- Responsive Visible Cards ---------------- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- Helpers ---------------- */
  // Dynamically calculate the maximum index we can scroll to
  const maxIndex = Math.max(0, productOptions.length - visibleCards);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  /* ---------------- Autoplay ---------------- */
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [isAutoPlaying, maxIndex]); // Add maxIndex to dependency to reset correctly on resize

  /* ---------------- GTM ---------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackContentView({
            id: "premium-party-saree",
            title: "Premium Party Saree Collection",
            price: 1650,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------------- Logic ---------------- */
  const updateQuantity = (id: string, qty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, qty),
    }));
  };

  const handleAddToCart = (product: (typeof productOptions)[0]) => {
    setAddingProduct(product.id);

    trackAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantities[product.id],
    });

    onAddToCart({
      productId: product.id,
      productName: product.name,
      color: product.color,
      image: product.image,
      quantity: quantities[product.id],
      price: product.price,
    });

    // Simulate async delay
    setTimeout(() => {
        setAddingProduct(null);
        document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  /* ---------------- JSX ---------------- */
  return (
    <section
      ref={sectionRef}
      id="product"
      className="py-16 bg-gray-50"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          প্রিমিয়াম কোয়ালিটির পার্টি শাড়ি
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          আপনার বিশেষ দিনগুলোকে আরও স্টাইলিশ ও আকর্ষণীয় করে তুলতে নিয়ে এলাম
          প্রিমিয়াম কোয়ালিটির পার্টি শাড়ি। এখন মাত্র{" "}
          <span className="font-bold text-rose-600">১৬৫০ টাকায়</span>।
        </p>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden px-1 -mx-3">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                // Calculate translation percentage based on how many cards are visible
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {productOptions.map((product, i) => (
                <div
                  key={`${product.id}-${i}`}
                  // Width Calculation:
                  // Mobile (1 visible) = 100% width
                  // Tablet (2 visible) = 50% width
                  // Desktop (4 visible) = 25% width
                  className="min-w-full sm:min-w-[50%] lg:min-w-[25%] px-3"
                >
                  <div className="bg-white rounded-2xl shadow-lg border h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-t-2xl h-72">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold mb-2 flex-grow">{product.name}</h3>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-rose-600">
                          {product.price} ৳
                        </span>
                        <span className="line-through text-gray-500 text-lg">
                          {product.originalPrice} ৳
                        </span>
                      </div>

                      <div className="mb-6">
                        <label className="font-semibold block mb-2 text-sm text-gray-700">
                          পরিমাণ:
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(product.id, quantities[product.id] - 1)
                            }
                            className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            disabled={quantities[product.id] <= 1}
                          >
                            −
                          </button>

                          <span className="w-12 text-center font-bold">
                            {quantities[product.id]}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(product.id, quantities[product.id] + 1)
                            }
                            className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <Button
                        className="w-full py-6 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-semibold shadow-rose-200 shadow-lg active:scale-95 transition-all"
                        onClick={() => handleAddToCart(product)}
                        disabled={addingProduct === product.id}
                      >
                        {addingProduct === product.id ? (
                          "অ্যাড করা হচ্ছে..."
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <ShoppingCart className="w-5 h-5" />
                            অর্ডার করুন
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-5 bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-all z-10 opacity-0 group-hover:opacity-100 border border-gray-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-5 bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-all z-10 opacity-0 group-hover:opacity-100 border border-gray-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index 
                  ? "w-8 h-2 bg-rose-500" 
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-10 text-gray-600 font-medium flex justify-center items-center gap-4 text-sm md:text-base">
            <span className="flex items-center gap-1">🚚 দ্রুত ডেলিভারি</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span className="flex items-center gap-1">💯 কোয়ালিটি গ্যারান্টি</span>
        </div>
      </div>
    </section>
  );
};


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";
// import brownImage from "@/assets/borka-brown.jpg";
// import blackImage from "@/assets/borka-black.jpg";
// import greenImage from "@/assets/borka-green.jpg";
// import purpleImage from "@/assets/borka-purple.jpg";

// export interface CartItem {
//   productId: string;
//   productName: string;
//   size: string;
//   withHijab: boolean;
//   quantity: number;
//   price: number;
// }

// const productOptions = [
//   {
//     id: "brown",
//     name: "ব্রাউন বোরকা",
//     image: brownImage,
//     originalPrice: 750,
//     price: 490,
//     popular: true,
//   },
//   {
//     id: "black",
//     name: "কালো বোরকা",
//     image: blackImage,
//     originalPrice: 750,
//     price: 490,
//     bestseller: true,
//   },
//   {
//     id: "green",
//     name: "সবুজ বোরকা",
//     image: greenImage,
//     originalPrice: 750,
//     price: 490,
//   },
//   {
//     id: "purple",
//     name: "বেগুনি বোরকা",
//     image: purpleImage,
//     originalPrice: 750,
//     price: 490,
//     new: true,
//   },
// ];

// const sizes = ["৫০", "৫২", "৫৪", "৫৬", "৫৮"];

// interface ProductCardState {
//   size: string;
//   withHijab: string;
//   quantity: number;
// }

// interface ProductSelectionProps {
//   onAddToCart: (item: CartItem) => void;
// }

// export const ProductSelection = ({ onAddToCart }: ProductSelectionProps) => {
//   const [productStates, setProductStates] = useState<
//     Record<string, ProductCardState>
//   >(
//     productOptions.reduce((acc, product) => {
//       acc[product.id] = {
//         size: "৫২",
//         withHijab: "with",
//         quantity: 1,
//       };
//       return acc;
//     }, {} as Record<string, ProductCardState>)
//   );

//   const [addingProduct, setAddingProduct] = useState<string | null>(null);

//   const updateProductState = (
//     productId: string,
//     updates: Partial<ProductCardState>
//   ) => {
//     setProductStates((prev) => ({
//       ...prev,
//       [productId]: { ...prev[productId], ...updates },
//     }));
//   };

//   const handleAddToCart = async (product: (typeof productOptions)[0]) => {
//     setAddingProduct(product.id);

//     const state = productStates[product.id];
//     const cartItem: CartItem = {
//       productId: product.id,
//       productName: product.name,
//       size: state.size,
//       withHijab: state.withHijab === "with",
//       quantity: state.quantity,
//       price: product.price,
//     };

//     await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading
//     onAddToCart(cartItem);
//     setAddingProduct(null);

//     const orderSection = document.getElementById("order-section");
//     orderSection?.scrollIntoView({ behavior: "smooth" });
//   };

//   const calculateDiscount = (original: number, current: number) => {
//     return Math.round(((original - current) / original) * 100);
//   };

//   return (
//     <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
//       <div className="container max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             আমাদের কালেকশন থেকে পছন্দের বোরকা বাছাই করুন
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             উচ্চ-quality কাপড়, আরামদায়ক ফিট এবং স্টাইলিশ ডিজাইনের বোরকা। আপনার
//             পছন্দ মতো রং, সাইজ এবং স্টাইল সিলেক্ট করুন।
//           </p>
//         </div>

//         {/* Trust Badges */}
//         <div className="flex justify-center flex-wrap gap-8 mb-12">
//           {[
//             { icon: Truck, text: "ফ্রি ডেলিভারি", subtext: "ঢাকা শহরে" },
//             {
//               icon: Shield,
//               text: "কuality গ্যারান্টি",
//               subtext: "১০০% অরিজিনাল",
//             },
//             { icon: RotateCcw, text: "রিটার্ন পলিসি", subtext: "৭ দিন" },
//             { icon: Star, text: "৫ Star রেটিং", subtext: "২০০+ Reviews" },
//           ].map((item, index) => (
//             <div key={index} className="flex flex-col items-center text-center">
//               <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-2">
//                 <item.icon className="w-6 h-6 text-rose-600" />
//               </div>
//               <span className="font-semibold text-gray-900">{item.text}</span>
//               <span className="text-sm text-gray-500">{item.subtext}</span>
//             </div>
//           ))}
//         </div>

//         {/* Products Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {productOptions.map((product) => {
//             const state = productStates[product.id];
//             const discount = calculateDiscount(
//               product.originalPrice,
//               product.price
//             );

//             return (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
//               >
//                 {/* Product Image */}
//                 <div className="relative">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-72 object-cover"
//                   />

//                   {/* Badges */}
//                   <div className="absolute top-3 left-3 flex flex-col gap-2">
//                     {product.bestseller && (
//                       <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0">
//                         🏆 বেস্টসেলার
//                       </Badge>
//                     )}
//                     {product.popular && (
//                       <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-0">
//                         🔥 জনপ্রিয়
//                       </Badge>
//                     )}
//                     {product.new && (
//                       <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
//                         ✨ নতুন
//                       </Badge>
//                     )}
//                     <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0">
//                       {discount}% ছাড়
//                     </Badge>
//                   </div>
//                 </div>

//                 {/* Product Content */}
//                 <div className="p-6">
//                   <h3 className="font-bold text-xl mb-3 text-gray-900">
//                     {product.name}
//                   </h3>

//                   {/* Price */}
//                   <div className="flex items-center gap-3 mb-4">
//                     <span className="text-2xl font-bold text-rose-600">
//                       {product.price} ৳
//                     </span>
//                     <span className="text-lg text-gray-500 line-through">
//                       {product.originalPrice} ৳
//                     </span>
//                   </div>

//                   <div className="space-y-5">
//                     {/* Size Selection */}
//                     <div>
//                       <Label className="text-sm font-semibold mb-3 block text-gray-700">
//                         সাইজ সিলেক্ট করুন:
//                       </Label>
//                       <div className="flex flex-wrap gap-2">
//                         {sizes.map((size) => (
//                           <button
//                             key={size}
//                             onClick={() =>
//                               updateProductState(product.id, { size })
//                             }
//                             className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
//                               state.size === size
//                                 ? "bg-rose-500 text-white border-rose-500 shadow-lg scale-105"
//                                 : "border-gray-200 text-gray-700 hover:border-rose-300 hover:bg-rose-50"
//                             }`}
//                           >
//                             {size}
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Hijab Option */}
//                     <div>
//                       <Label className="text-sm font-semibold mb-3 block text-gray-700">
//                         হিজাব অপশন:
//                       </Label>
//                       <RadioGroup
//                         value={state.withHijab}
//                         onValueChange={(value) =>
//                           updateProductState(product.id, { withHijab: value })
//                         }
//                         className="flex gap-4"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem
//                             value="with"
//                             id={`with-${product.id}`}
//                             className="text-rose-500 border-2 border-gray-300"
//                           />
//                           <Label
//                             htmlFor={`with-${product.id}`}
//                             className="cursor-pointer font-medium text-gray-700"
//                           >
//                             হিজাব সহ
//                           </Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem
//                             value="without"
//                             id={`without-${product.id}`}
//                             className="text-rose-500 border-2 border-gray-300"
//                           />
//                           <Label
//                             htmlFor={`without-${product.id}`}
//                             className="cursor-pointer font-medium text-gray-700"
//                           >
//                             হিজাব ছাড়া
//                           </Label>
//                         </div>
//                       </RadioGroup>
//                     </div>

//                     {/* Quantity */}
//                     <div>
//                       <Label className="text-sm font-semibold mb-3 block text-gray-700">
//                         পরিমাণ:
//                       </Label>
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() =>
//                             updateProductState(product.id, {
//                               quantity: Math.max(1, state.quantity - 1),
//                             })
//                           }
//                           disabled={state.quantity <= 1}
//                           className="w-10 h-10 border-2 border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//                         >
//                           −
//                         </button>
//                         <span className="px-6 py-2 bg-gray-100 rounded-lg font-bold text-lg min-w-12 text-center">
//                           {state.quantity}
//                         </span>
//                         <button
//                           onClick={() =>
//                             updateProductState(product.id, {
//                               quantity: state.quantity + 1,
//                             })
//                           }
//                           className="w-10 h-10 border-2 border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>

//                     {/* Add to Cart Button */}
//                     <Button
//                       variant="cta"
//                       className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
//                         addingProduct === product.id
//                           ? "bg-rose-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl"
//                       }`}
//                       onClick={() => handleAddToCart(product)}
//                       disabled={addingProduct === product.id}
//                     >
//                       {addingProduct === product.id ? (
//                         <div className="flex items-center gap-2">
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                           অ্যাড করা হচ্ছে...
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-2">
//                           <ShoppingCart className="w-5 h-5" />
//                           অর্ডার করুন
//                         </div>
//                       )}
//                     </Button>

//                     {/* Quick Info */}
//                     <div className="text-center">
//                       <p className="text-sm text-gray-500">
//                         ✅ স্টক আছে • 🚚 ২৪ ঘণ্টার মধ্যে ডেলিভারি
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Footer Note */}
//         <div className="text-center mt-12 p-6 bg-rose-50 rounded-2xl border border-rose-100">
//           <p className="text-gray-700 text-lg">
//             💫 <strong>বিশেষ অফার!</strong> ১৫০০৳+ অর্ডারে ফ্রি শিপিং • কোনো
//             প্রশ্ন থাকলে কল করুন <strong>০১৭৯৯২০৯২৯৯</strong>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };
