import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useGtmEvents } from "@/hooks/useGtmEvents";
import axios from "axios";

export interface CartItem {
  productId: string;
  productName: string;
  color: string;
  image: string;
  quantity: number;
  price: number;
}

interface ProductCardProps {
  product: Product;
  onViewImage: (url: string) => void;
  onAddToCart: (product: Product, qty: number) => void;
}
interface Product {
  id: string;
  name: string;
  orderNumber: number;
  color: string;
  image: string;
  price: number;
  originalPrice: number;
  isActive: boolean;
}

interface ProductSelectionProps {
  onAddToCart: (item: CartItem) => void;
}

const AUTOPLAY_DELAY = 3000;
const API_URL = import.meta.env.VITE_API_BASE_URL;
export const ProductSelection = ({ onAddToCart }: ProductSelectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { trackContentView, trackAddToCart } = useGtmEvents();

  // States
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isHovered, setIsHovered] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addingProduct, setAddingProduct] = useState<string | null>(null);

  // Responsive visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/product`); // ← তোমার আসল API endpoint দাও

        // const activeProducts = response.data.data || [];

        const activeProducts = response.data.data.filter(
          (item: Product) => item.isActive
        );

        // setData(activeEntry || null);

        const formattedProducts: Product[] = activeProducts.map((p: any) => ({
          id: p._id,
          name: p.title || "প্রিমিয়াম পার্টি শাড়ি",
          color: p.variants?.value || "কালো",
          image: p.thumbnail || "/fallback-product.jpg",
          price: p.sellingPrice || 1650,
          originalPrice: p.regulerPrice || 2200,
          orderNumber: p.orderNumber || 1,
        }));

        setProducts(formattedProducts);
      } catch (err) {
        setError("প্রোডাক্ট লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Initialize quantities when products load
  useEffect(() => {
    if (products.length === 0) return;

    const initialQuantities = products.reduce((acc, p) => {
      acc[p.id] = 1;
      return acc;
    }, {} as Record<string, number>);

    setQuantities(initialQuantities);
  }, [products]);

  // Slider logic
  const maxIndex = Math.max(0, products.length - visibleCards);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [isAutoPlaying, maxIndex, products.length]);

  // GTM - section view tracking
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && products.length > 0) {
          // প্রথম দৃশ্যমান প্রোডাক্ট নির্ধারণ (currentIndex থেকে)
          const firstVisibleIndex = currentIndex;
          const featuredProduct = products[firstVisibleIndex];

          if (featuredProduct) {
            trackContentView({
              id: `premium-party-saree-${featuredProduct.id}`, // ডাইনামিক ID
              name: featuredProduct.name, // ডাইনামিক নাম
              price: featuredProduct.price, // ডাইনামিক মূল্য
            });
          } else {
            // ফলব্যাক - যদি কোনো কারণে প্রোডাক্ট না পাওয়া যায়
            trackContentView({
              id: "premium-party-saree",
              name: "Premium Party Saree Collection",
              price: 1650,
            });
          }

          observer.disconnect(); // একবারই ট্রিগার হবে
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [trackContentView, products, currentIndex]); // products ও currentIndex যোগ করা হয়েছে

  const updateQuantity = (id: string, qty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, qty),
    }));
  };

  const handleAddToCart = (product: Product) => {
    setAddingProduct(product.id);

    trackAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantities[product.id] || 1,
    });

    onAddToCart({
      productId: product.id,
      productName: product.name,
      color: product.color,
      image: product.image,
      quantity: quantities[product.id] || 1,
      price: product.price,
    });

    setTimeout(() => {
      setAddingProduct(null);
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

const sortedProducts = [...products].sort(
  (a, b) => Number(a.orderNumber ?? 9999) - Number(b.orderNumber ?? 9999)
);


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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
            <span className="ml-4 text-gray-700 font-medium">
              প্রোডাক্ট লোড হচ্ছে...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-rose-500 text-rose-600 hover:bg-rose-50"
            >
              আবার চেষ্টা করুন
            </Button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            এই মুহূর্তে কোনো অ্যাকটিভ প্রিমিয়াম পার্টি শাড়ি নেই
          </div>
        ) : (
          <div className="relative group">
            <div className="overflow-hidden px-1 -mx-3">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / visibleCards)
                  }%)`,
                }}
              >
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-full sm:min-w-[50%] lg:min-w-[25%] px-3"
                  >
                    <div className="bg-white rounded-2xl shadow-lg border h-full flex flex-col">
                      {/* Image Container - Vertical Aspect Ratio to see the full saree */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 rounded-t-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-fill transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/fallback-product.jpg";
                          }}
                        />

                        {/* Discount % Badge (Left) */}
                        {product.originalPrice > product.price && (
                          <div className="absolute top-4 left-4 bg-rose-600 border border-white text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            % ছাড়
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-bold mb-2 flex-grow line-clamp-2">
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-bold text-rose-600">
                              {product.price} ৳
                            </span>
                            <span className="line-through text-gray-500 text-lg">
                              {product.originalPrice} ৳
                            </span>
                          </div>
                          {/* Save Amount Badge (Right) */}
                          {product.originalPrice > product.price && (
                            <div className=" bg-yellow-400 text-black text-sm border-2 border-white font-bold px-3 py-1.5 rounded-full shadow-lg">
                              সেভ {product.originalPrice - product.price} ৳
                            </div>
                          )}
                        </div>

                        <div className="mb-6">
                          <label className="font-semibold block mb-2 text-sm text-gray-700">
                            পরিমাণ:
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  (quantities[product.id] || 1) - 1
                                )
                              }
                              className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
                              disabled={(quantities[product.id] || 1) <= 1}
                            >
                              −
                            </button>

                            <span className="w-12 text-center font-bold">
                              {quantities[product.id] || 1}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  (quantities[product.id] || 1) + 1
                                )
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

            {/* Dots */}
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
          </div>
        )}

        <div className="text-center mt-10 text-gray-600 font-medium flex justify-center items-center gap-4 text-sm md:text-base">
          <span className="flex items-center gap-1">🚚 দ্রুত ডেলিভারি</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span className="flex items-center gap-1">
            💯 কোয়ালিটি গ্যারান্টি
          </span>
        </div>
      </div>
    </section>
  );
};

// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
// import { useGtmEvents } from "@/hooks/useGtmEvents";
// import axios from "axios";

// export interface CartItem {
//   productId: string;
//   productName: string;
//   color: string;
//   image: string;
//   quantity: number;
//   price: number;
// }

// interface Product {
//   id: string;
//   name: string;
//   color: string;
//   image: string;
//   price: number;
//   originalPrice: number;
//    isActive: boolean;
// }

// interface ProductSelectionProps {
//   onAddToCart: (item: CartItem) => void;
// }

// const AUTOPLAY_DELAY = 3000;
//   const API_URL = import.meta.env.VITE_API_BASE_URL;
// export const ProductSelection = ({ onAddToCart }: ProductSelectionProps) => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const { trackContentView, trackAddToCart } = useGtmEvents();

//   // States
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [visibleCards, setVisibleCards] = useState(4);

//   const [quantities, setQuantities] = useState<Record<string, number>>({});
//   const [addingProduct, setAddingProduct] = useState<string | null>(null);

//   // Responsive visible cards
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) setVisibleCards(1);
//       else if (window.innerWidth < 1024) setVisibleCards(2);
//       else setVisibleCards(4);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//        const response = await axios.get(`${API_URL}/product`);// ← তোমার আসল API endpoint দাও

//         // const activeProducts = response.data.data || [];

//         const activeProducts = response.data.data.filter((item:Product) => item.isActive);
      
//         // setData(activeEntry || null);

//         const formattedProducts: Product[] = activeProducts.map((p: any) => ({
//           id: p._id,
//           name: p.title || "প্রিমিয়াম পার্টি শাড়ি",
//           color: p.variants?.value || "কালো",
//           image: p.thumbnail || "/fallback-product.jpg",
//           price: p.sellingPrice || 1650,
//           originalPrice: p.regulerPrice || 2200,
//         }));

//         setProducts(formattedProducts);
//       } catch (err) {
//         setError("প্রোডাক্ট লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
//         console.error("Product fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Initialize quantities when products load
//   useEffect(() => {
//     if (products.length === 0) return;

//     const initialQuantities = products.reduce((acc, p) => {
//       acc[p.id] = 1;
//       return acc;
//     }, {} as Record<string, number>);

//     setQuantities(initialQuantities);
//   }, [products]);

//   // Slider logic
//   const maxIndex = Math.max(0, products.length - visibleCards);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//   };

//   useEffect(() => {
//     if (!isAutoPlaying) return;
//     const timer = setInterval(nextSlide, AUTOPLAY_DELAY);
//     return () => clearInterval(timer);
//   }, [isAutoPlaying, maxIndex, products.length]);

//   // GTM - section view tracking
// useEffect(() => {
//   if (!sectionRef.current) return;

//   const observer = new IntersectionObserver(
//     (entries) => {
//       if (entries[0].isIntersecting && products.length > 0) {
//         // প্রথম দৃশ্যমান প্রোডাক্ট নির্ধারণ (currentIndex থেকে)
//         const firstVisibleIndex = currentIndex;
//         const featuredProduct = products[firstVisibleIndex];

//         if (featuredProduct) {
//           trackContentView({
//             id: `premium-party-saree-${featuredProduct.id}`, // ডাইনামিক ID
//             name: featuredProduct.name, // ডাইনামিক নাম
//             price: featuredProduct.price, // ডাইনামিক মূল্য
//           });
//         } else {
//           // ফলব্যাক - যদি কোনো কারণে প্রোডাক্ট না পাওয়া যায়
//           trackContentView({
//             id: "premium-party-saree",
//             name: "Premium Party Saree Collection",
//             price: 1650,
//           });
//         }

//         observer.disconnect(); // একবারই ট্রিগার হবে
//       }
//     },
//     { threshold: 0.4 }
//   );

//   observer.observe(sectionRef.current);
//   return () => observer.disconnect();
// }, [trackContentView, products, currentIndex]); // products ও currentIndex যোগ করা হয়েছে

//   const updateQuantity = (id: string, qty: number) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(1, qty),
//     }));
//   };

//   const handleAddToCart = (product: Product) => {
//     setAddingProduct(product.id);

//     trackAddToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: quantities[product.id] || 1,
//     });

//     onAddToCart({
//       productId: product.id,
//       productName: product.name,
//       color: product.color,
//       image: product.image,
//       quantity: quantities[product.id] || 1,
//       price: product.price,
//     });

//     setTimeout(() => {
//       setAddingProduct(null);
//       document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
//     }, 500);
//   };

//   // ────────────────────────────────────────────────────────────────
//   // RENDER
//   // ────────────────────────────────────────────────────────────────

//   return (
//     <section
//       ref={sectionRef}
//       id="product"
//       className="py-16 bg-gray-50"
//       onMouseEnter={() => setIsAutoPlaying(false)}
//       onMouseLeave={() => setIsAutoPlaying(true)}
//     >
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
//           প্রিমিয়াম কোয়ালিটির পার্টি শাড়ি
//         </h2>

//         <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
//           আপনার বিশেষ দিনগুলোকে আরও স্টাইলিশ ও আকর্ষণীয় করে তুলতে নিয়ে এলাম
//           প্রিমিয়াম কোয়ালিটির পার্টি শাড়ি। এখন মাত্র{" "}
//           <span className="font-bold text-rose-600">১৬৫০ টাকায়</span>।
//         </p>

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
//             <span className="ml-4 text-gray-700 font-medium">প্রোডাক্ট লোড হচ্ছে...</span>
//           </div>
//         ) : error ? (
//           <div className="text-center py-20">
//             <p className="text-red-600 mb-4">{error}</p>
//             <Button
//               variant="outline"
//               onClick={() => window.location.reload()}
//               className="border-rose-500 text-rose-600 hover:bg-rose-50"
//             >
//               আবার চেষ্টা করুন
//             </Button>
//           </div>
//         ) : products.length === 0 ? (
//           <div className="text-center py-20 text-gray-600">
//             এই মুহূর্তে কোনো অ্যাকটিভ প্রিমিয়াম পার্টি শাড়ি নেই
//           </div>
//         ) : (
//           <div className="relative group">
//             <div className="overflow-hidden px-1 -mx-3">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{
//                   transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
//                 }}
//               >
//                 {products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="min-w-full sm:min-w-[50%] lg:min-w-[25%] px-3"
//                   >
//                     <div className="bg-white rounded-2xl shadow-lg border h-full flex flex-col">
//                       <div className="relative overflow-hidden rounded-t-2xl h-72">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-110"
//                           onError={(e) => {
//                             (e.target as HTMLImageElement).src = "/fallback-product.jpg";
//                           }}
//                         />
//                       </div>

//                       <div className="p-6 flex-1 flex flex-col">
//                         <h3 className="font-bold mb-2 flex-grow line-clamp-2">
//                           {product.name}
//                         </h3>

//                         <div className="flex items-center gap-3 mb-4">
//                           <span className="text-2xl font-bold text-rose-600">
//                             {product.price} ৳
//                           </span>
//                           <span className="line-through text-gray-500 text-lg">
//                             {product.originalPrice} ৳
//                           </span>
//                         </div>

//                         <div className="mb-6">
//                           <label className="font-semibold block mb-2 text-sm text-gray-700">
//                             পরিমাণ:
//                           </label>
//                           <div className="flex items-center gap-3">
//                             <button
//                               onClick={() =>
//                                 updateQuantity(product.id, (quantities[product.id] || 1) - 1)
//                               }
//                               className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 transition-colors"
//                               disabled={(quantities[product.id] || 1) <= 1}
//                             >
//                               −
//                             </button>

//                             <span className="w-12 text-center font-bold">
//                               {quantities[product.id] || 1}
//                             </span>

//                             <button
//                               onClick={() =>
//                                 updateQuantity(product.id, (quantities[product.id] || 1) + 1)
//                               }
//                               className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>

//                         <Button
//                           className="w-full py-6 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-semibold shadow-rose-200 shadow-lg active:scale-95 transition-all"
//                           onClick={() => handleAddToCart(product)}
//                           disabled={addingProduct === product.id}
//                         >
//                           {addingProduct === product.id ? (
//                             "অ্যাড করা হচ্ছে..."
//                           ) : (
//                             <span className="flex items-center justify-center gap-2">
//                               <ShoppingCart className="w-5 h-5" />
//                               অর্ডার করুন
//                             </span>
//                           )}
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Navigation Arrows */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-5 bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-all z-10 opacity-0 group-hover:opacity-100 border border-gray-100"
//               aria-label="Previous slide"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>

//             <button
//               onClick={nextSlide}
//               className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-5 bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-all z-10 opacity-0 group-hover:opacity-100 border border-gray-100"
//               aria-label="Next slide"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>

//             {/* Dots */}
//             <div className="flex justify-center items-center gap-2 mt-8">
//               {Array.from({ length: maxIndex + 1 }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`transition-all duration-300 rounded-full ${
//                     currentIndex === index
//                       ? "w-8 h-2 bg-rose-500"
//                       : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="text-center mt-10 text-gray-600 font-medium flex justify-center items-center gap-4 text-sm md:text-base">
//           <span className="flex items-center gap-1">🚚 দ্রুত ডেলিভারি</span>
//           <span className="w-1 h-1 rounded-full bg-gray-400"></span>
//           <span className="flex items-center gap-1">💯 কোয়ালিটি গ্যারান্টি</span>
//         </div>
//       </div>
//     </section>
//   );
// };
