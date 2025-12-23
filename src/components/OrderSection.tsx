"use client";

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CartItem } from "./ProductSelection";
import {
  ShoppingCart,
  Truck,
  MapPin,
  User,
  Phone,
  MessageSquare,
  Package,
  Gift,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGtmEvents } from "@/hooks/useGtmEvents";

interface OrderFormProps {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const OrderForm = ({ cartItems, setCartItems }: OrderFormProps) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { trackInitialCheckout, trackPurchase } = useGtmEvents();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">(
    "inside"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check mobile view on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const deliveryCharges = {
    inside: 80,
    outside: 150,
  };

  const productTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = deliveryCharges[deliveryArea];
  const grandTotal = productTotal + deliveryCharge;

  // ---------------- FIRE INITIAL CHECKOUT WHEN SECTION VISIBLE ---------------- //
  useEffect(() => {
    if (!sectionRef.current || cartItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackInitialCheckout({
            total: grandTotal,
            items: cartItems.map((item) => ({
              id: item.productId,
              name: item.productName,
              quantity: item.quantity,
              price: item.price,
            })),
          });

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [cartItems, grandTotal]);

  // ---------------- SUBMIT ORDER ---------------- //
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("দয়া করে সব তথ্য পূরণ করুন");
      setIsSubmitting(false);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("কমপক্ষে একটি পণ্য নির্বাচন করুন");
      setIsSubmitting(false);
      return;
    }

    try {
      const orderData = {
        customerInfo: formData,
        deliveryArea,
        items: cartItems,
        pricing: { productTotal, deliveryCharge, grandTotal },
      };

      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("অর্ডার সম্পন্ন করা যায়নি");
      }

      const orderId = response.data.id;

      // ---------------- FIRE PURCHASE EVENT ---------------- //
      trackPurchase({
        order_id: orderId,
        value: grandTotal,
        currency: "BDT",
        customer_name: formData.name,
        phone_number: formData.phone,
        delivery_area: deliveryArea,
        items: cartItems.map((item) => ({
          id: item.productId,
          name: item.productName,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      toast.success(
        <div className="space-y-2">
          <div className="font-bold">🎉 অর্ডার সফল!</div>
          <div>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</div>
        </div>,
        { duration: 5000 }
      );

      navigate("/order-confirmation", {
        state: { name: formData.name, total: grandTotal },
      });

      setFormData({ name: "", phone: "", address: "", notes: "" });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "কিছু ভুল হয়েছে। পরে আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- CART ITEM MANAGEMENT ---------------- //
  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, qty: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  return (
    <section
      ref={sectionRef}
      id="order"
      className="py-8 md:py-16 px-3 sm:px-4 bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Special Offer Banner - Mobile Optimized */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl md:rounded-2xl p-4 md:p-5 text-center text-white mb-4 md:mb-6 shadow-lg md:shadow-2xl shadow-purple-500/30 border-2 border-white/20 mx-2 sm:mx-0">
        <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <Gift className="w-5 h-5 md:w-8 md:h-8 animate-bounce" />
          <span className="font-bold text-lg md:text-4xl">
            🎁 অফার চলছেই সীমিত সময়—শাড়ি কিনুন, সেরা ১০ জনের ১ জন হয়ে নিন মান্থলি স্পেশাল গিফট! 🎁
          </span>
          <Gift
            className="w-5 h-5 md:w-8 md:h-8 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
       
      </div>

      {/* Trust Badges - Mobile Optimized */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 px-2">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-xs md:text-sm">১০০% নিরাপদ</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
          <Truck className="w-4 h-4 text-blue-500" />
          <span className="text-xs md:text-sm">দ্রুত ডেলিভারি</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
          <CheckCircle className="w-4 h-4 text-rose-500" />
          <span className="text-xs md:text-sm">কোয়ালিটি গ্যারান্টি</span>
        </div>
      </div>

      <div className="container mx-auto">
        {/* HEADER - Mobile Optimized */}
        <div className="text-center mb-8 md:mb-12 px-2">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            অর্ডার সম্পূর্ণ করুন
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            আপনার তথ্য দিন এবং আমরা আপনার অর্ডারটি প্রস্তুত করব
          </p>
        </div>

        {/* Mobile Cart Summary Banner (Only shows on mobile when cart has items) */}
        {isMobile && cartItems.length > 0 && (
          <div className="sticky top-0 z-40 bg-white shadow-lg rounded-b-2xl mb-6 p-4 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-rose-500" />
                <div>
                  <p className="font-bold text-sm">আপনার অর্ডার</p>
                  <p className="text-xs text-gray-500">
                    {cartItems.length} আইটেম • {grandTotal}৳
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-rose-500 hover:bg-rose-600 text-white text-sm"
                onClick={() => {
                  document.getElementById("order-summary")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                দেখুন
              </Button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* FORM SIDE - Mobile Optimized */}
          <div className="space-y-6 md:space-y-8">
            <Card className="border border-gray-200 md:border-2 md:border-gray-100 shadow-lg md:shadow-xl rounded-2xl md:rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 md:pb-4">
                <CardTitle className="flex items-center gap-2 md:gap-3 text-lg md:text-xl">
                  <User className="w-5 h-5 md:w-6 md:h-6" /> 
                  <span className="text-base md:text-lg">গ্রাহকের তথ্য</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 md:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* NAME */}
                  <div className="space-y-2 md:space-y-3">
                    <Label className="text-sm md:text-base font-semibold flex items-center gap-2">
                      <User className="w-3 h-3 md:w-4 md:h-4 text-rose-500" />
                      আপনার নাম *
                    </Label>
                    <Input
                      placeholder="আপনার পুরো নাম লিখুন"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-10 md:h-12 text-base md:text-lg border border-gray-300 md:border-2 md:border-gray-200 rounded-xl"
                    />
                  </div>

                  {/* PHONE */}
                  <div className="space-y-2 md:space-y-3">
                    <Label className="text-sm md:text-base font-semibold flex items-center gap-2">
                      <Phone className="w-3 h-3 md:w-4 md:h-4 text-rose-500" />
                      মোবাইল নম্বর *
                    </Label>
                    <Input
                      type="tel"
                      placeholder="০১XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="h-10 md:h-12 text-base md:text-lg border border-gray-300 md:border-2 md:border-gray-200 rounded-xl"
                    />
                    <p className="text-xs md:text-sm text-gray-500">
                      আমরা এই নম্বরে কল করে অর্ডার কনফার্ম করব
                    </p>
                  </div>

                  {/* ADDRESS */}
                  <div className="space-y-2 md:space-y-3">
                    <Label className="text-sm md:text-base font-semibold flex items-center gap-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-rose-500" />
                      সম্পূর্ণ ঠিকানা *
                    </Label>
                    <Textarea
                      placeholder="হাউস নম্বর, রোড, এলাকা, জেলা, থানা, গ্রাম"
                      rows={3}
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                      className="text-base md:text-lg border border-gray-300 md:border-2 md:border-gray-200 rounded-xl"
                    />
                  </div>

                  {/* NOTES */}
                  <div className="space-y-2 md:space-y-3">
                    <Label className="text-sm md:text-base font-semibold flex items-center gap-2">
                      <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-rose-500" />
                      অতিরিক্ত নোট (ঐচ্ছিক)
                    </Label>
                    <Textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="text-base md:text-lg border border-gray-300 md:border-2 md:border-gray-200 rounded-xl"
                      placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন"
                    />
                  </div>

                  {/* DELIVERY AREA - Mobile Optimized */}
                  <div className="space-y-3 md:space-y-4">
                    <Label className="text-sm md:text-base font-semibold flex items-center gap-2">
                      <Truck className="w-3 h-3 md:w-4 md:h-4 text-rose-500" />
                      ডেলিভারি এরিয়া *
                    </Label>

                    <RadioGroup
                      value={deliveryArea}
                      onValueChange={(value) =>
                        setDeliveryArea(value as "inside" | "outside")
                      }
                      className="space-y-2 md:space-y-3"
                    >
                      <div
                        className={`flex items-center space-x-3 p-3 md:p-4 border rounded-xl md:rounded-2xl cursor-pointer ${
                          deliveryArea === "inside"
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200"
                        }`}
                      >
                        <RadioGroupItem value="inside" id="inside" />
                        <Label
                          htmlFor="inside"
                          className="cursor-pointer flex-1"
                        >
                          <div className="font-semibold text-sm md:text-base">ঢাকার ভিতরে</div>
                          <div className="text-xs md:text-sm text-gray-600">
                            ডেলিভারি চার্জ: ৮০ টাকা • 1-2 দিনে ডেলিভারি
                          </div>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-3 md:p-4 border rounded-xl md:rounded-2xl cursor-pointer ${
                          deliveryArea === "outside"
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200"
                        }`}
                      >
                        <RadioGroupItem value="outside" id="outside" />
                        <Label
                          htmlFor="outside"
                          className="cursor-pointer flex-1"
                        >
                          <div className="font-semibold text-sm md:text-base">ঢাকার বাইরে</div>
                          <div className="text-xs md:text-sm text-gray-600">
                            ডেলিভারি চার্জ: 150 টাকা • 1-3 দিনে ডেলিভারি
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Important Notice - Mobile */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 md:p-4">
                    <p className="text-sm md:text-base font-semibold text-blue-800 mb-1">
                      ⚡ গুরুত্বপূর্ণ:
                    </p>
                    <ul className="text-xs md:text-sm text-blue-700 space-y-1">
                      <li>• অর্ডার কনফার্ম করতে আমরা আপনাকে কল করব</li>
                      <li>• ক্যাশ অন ডেলিভারি সুবিধা</li>
                      {/* <li>• ফ্রি গিফটসহ ডেলিভারি</li> */}
                    </ul>
                  </div>

                  {/* SUBMIT BUTTON - Mobile Optimized */}
                  <Button
                    type="submit"
                    variant="cta"
                    size={isMobile ? "default" : "lg"}
                    disabled={isSubmitting}
                    className="w-full h-12 md:h-14 text-base md:text-lg font-bold rounded-xl md:rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        অর্ডার সাবমিট হচ্ছে...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {cartItems.length > 0 
                          ? `${grandTotal}৳ দিয়ে অর্ডার করুন` 
                          : "অর্ডার সম্পন্ন করুন"}
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* SUMMARY SIDE - Mobile Optimized */}
          <div className="space-y-6" id="order-summary">
            <Card className="border border-gray-200 md:border-2 md:border-gray-100 shadow-lg md:shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 md:pb-4">
                <CardTitle className="flex items-center gap-2 md:gap-3 text-lg md:text-xl">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" /> 
                  <span className="text-base md:text-lg">আপনার অর্ডার</span>
                  {cartItems.length > 0 && (
                    <span className="bg-white/20 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                      {cartItems.length} আইটেম
                    </span>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 md:p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <Package className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                    <p className="text-gray-500 text-base md:text-lg mb-1 md:mb-2">
                      আপনার কার্ট খালি
                    </p>
                    <p className="text-gray-400 text-sm md:text-base">
                      অর্ডার করতে উপরের পণ্যগুলো থেকে সিলেক্ট করুন
                    </p>
                    <Button
                      className="mt-4 bg-rose-500 hover:bg-rose-600"
                      onClick={() => {
                        document.getElementById("product")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      পণ্য দেখুন
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items - Mobile Optimized */}
                    <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2">
                      {cartItems.map((item, index) => (
                        <div
                          key={`${item.productId}-${index}`}
                          className="flex gap-3 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-200"
                        >
                          {/* IMAGE */}
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-16 h-20 md:w-20 md:h-24 object-cover rounded-lg md:rounded-xl border"
                            />
                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          {/* INFO */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <p className="font-semibold text-sm md:text-base line-clamp-2">
                                {item.productName}
                              </p>
                            </div>

                            {/* QUANTITY - Mobile Optimized */}
                            <div className="flex items-center justify-between mt-2 md:mt-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(index, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="w-7 h-7 md:w-8 md:h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>

                                <span className="px-3 md:px-4 py-1 bg-white rounded-lg font-bold text-sm md:text-base min-w-[40px] text-center">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() =>
                                    updateQuantity(index, item.quantity + 1)
                                  }
                                  className="w-7 h-7 md:w-8 md:h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {/* PRICE */}
                              <p className="font-bold text-rose-600 text-base md:text-lg">
                                {item.price * item.quantity}৳
                              </p>
                            </div>

                            {/* Unit Price */}
                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                              ইউনিট মূল্য: {item.price}৳
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary - Mobile Optimized */}
                    <div className="border-t border-gray-200 pt-4 md:pt-6 space-y-3 md:space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm md:text-base">পণ্যের মূল্য:</span>
                        <span className="font-semibold text-sm md:text-base">{productTotal}৳</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm md:text-base">ডেলিভারি চার্জ:</span>
                        <span className="font-semibold text-sm md:text-base">{deliveryCharge}৳</span>
                      </div>

                      {/* Mobile Delivery Info */}
                      {isMobile && (
                        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                          <p>ডেলিভারি: {deliveryArea === "inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"}</p>
                        </div>
                      )}

                      <div className="flex justify-between text-lg md:text-2xl font-bold border-t border-gray-300 pt-3 md:pt-4">
                        <span>সর্বমোট:</span>
                        <span className="text-rose-600">{grandTotal}৳</span>
                      </div>

                      {/* Mobile Total Highlight */}
                      {isMobile && (
                        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-3">
                          <p className="text-center font-bold text-rose-700">
                            💰 মোট প্রদেয়: {grandTotal}৳
                          </p>
                          <p className="text-xs text-center text-gray-600 mt-1">
                            ক্যাশ অন ডেলিভারি
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mobile Quick Actions */}
                    {isMobile && cartItems.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <Button
                          className="w-full bg-green-500 hover:bg-green-600"
                          onClick={() => {
                            const formElement = document.querySelector('form');
                            if (formElement) {
                              formElement.scrollIntoView({
                                behavior: 'smooth'
                              });
                            }
                          }}
                        >
                          তথ্য পূরণ করুন
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            document.getElementById("product")?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                        >
                          আরও পণ্য দেখুন
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Additional Info - Mobile Hidden/Desktop Visible */}
            <div className={`${isMobile ? 'hidden md:block' : ''} space-y-4`}>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 md:p-6">
                <h3 className="font-bold text-lg md:text-xl text-green-800 mb-2">
                  ✅ কেন আমাদের সাথে অর্ডার করবেন?
                </h3>
                <ul className="space-y-2 text-sm md:text-base text-green-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5" />
                    <span>১০০% অরিজিনাল প্রোডাক্ট</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5" />
                    <span>ফ্রি হোম ডেলিভারি (ঢাকার ভিতরে)</span>
                  </li> */}
                  {/* <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5" />
                    <span>৭ দিনের রিটার্ন পলিসি</span>
                  </li> */}
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-0.5" />
                    <span>২৪/৭ কাস্টমার সাপোর্ট</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer Note */}
        {/* {isMobile && (
  <div className="mt-6 text-center text-xs text-gray-500 px-4">
    <p>📞 সাহায্যের জন্য কল করুন: 01707073790 / 01331370500</p>
    <p className="mt-1">© {new Date().getFullYear()} প্রিমিয়াম পার্টি শাড়ি। সব অধিকার সংরক্ষিত।</p>
  </div>
)} */}

      </div>
    </section>
  );
};
// "use client";

// import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { CartItem } from "./ProductSelection";
// import {
//   ShoppingCart,
//   Truck,
//   MapPin,
//   User,
//   Phone,
//   MessageSquare,
//   Package,
//   Gift,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useGtmEvents } from "@/hooks/useGtmEvents";

// interface OrderFormProps {
//   cartItems: CartItem[];
//   setCartItems: Dispatch<SetStateAction<CartItem[]>>; // এটি যোগ করতে হবে
// }

// // const API_BASE_URL = "https://tween-mart-backend.vercel.app/api/v1";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // console.log(API_BASE_URL)
// // ---------------- GTM EVENTS ---------------- //
//  export const OrderForm = ({ cartItems, setCartItems }: OrderFormProps) => {
//   const navigate = useNavigate();
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const { trackInitialCheckout, trackPurchase } = useGtmEvents();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     notes: "",
//   });

//   const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">(
//     "inside"
//   );
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const deliveryCharges = {
//     inside: 80,
//     outside: 150,
//   };

//   const productTotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const deliveryCharge = deliveryCharges[deliveryArea];
//   const grandTotal = productTotal + deliveryCharge;

//   // ---------------- FIRE INITIAL CHECKOUT WHEN SECTION VISIBLE ---------------- //
//   useEffect(() => {
//     if (!sectionRef.current || cartItems.length === 0) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           trackInitialCheckout({
//             total: grandTotal,
//             items: cartItems.map((item) => ({
//               id: item.id,
//               name: item.productName,
//               quantity: item.quantity,
//               price: item.price,
//             })),
//           });

//           observer.disconnect();
//         }
//       },
//       { threshold: 0.3 }
//     );

//     observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, [cartItems, grandTotal]);

//   // ---------------- SUBMIT ORDER ---------------- //

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!formData.name || !formData.phone || !formData.address) {
//       toast.error("দয়া করে সব তথ্য পূরণ করুন");
//       setIsSubmitting(false);
//       return;
//     }

//     if (cartItems.length === 0) {
//       toast.error("কমপক্ষে একটি পণ্য নির্বাচন করুন");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const orderData = {
//         customerInfo: formData,
//         deliveryArea,
//         items: cartItems,
//         pricing: { productTotal, deliveryCharge, grandTotal },
//       };

//       const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
//       // console.log(response, "order info");
//       if (response.status !== 200 && response.status !== 201) {
//         throw new Error("অর্ডার সম্পন্ন করা যায়নি");
//       }

//       const orderId = response.data.id;

//       // ---------------- FIRE PURCHASE EVENT ---------------- //
//       trackPurchase({
//         order_id: orderId,
//         value: grandTotal,
//         currency: "BDT",
//         customer_name: formData.name,
//         phone_number: formData.phone,
//         delivery_area: deliveryArea,
//         items: cartItems.map((item) => ({
//           id: item?.id,
//           name: item.productName,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//       });

//       toast.success(
//         <div className="space-y-2">
//           <div className="font-bold">🎉 অর্ডার সফল!</div>
//           <div>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব</div>
//         </div>,
//         { duration: 5000 }
//       );

//       navigate("/order-confirmation", {
//         state: { name: formData.name, total: grandTotal },
//       });

//       setFormData({ name: "", phone: "", address: "", notes: "" });
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           "কিছু ভুল হয়েছে। পরে আবার চেষ্টা করুন।"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ---------------- RENDER ---------------- //
// // ❌ Remove item
// const handleRemoveItem = (index: number) => {
//   setCartItems((prev) => prev.filter((_, i) => i !== index));
// };

// // ➕➖ Update quantity
// const updateQuantity = (index: number, qty: number) => {
//   setCartItems((prev) =>
//     prev.map((item, i) =>
//       i === index
//         ? { ...item, quantity: Math.max(1, qty) }
//         : item
//     )
//   );
// };

//   return (
//     <section
//       ref={sectionRef}
//       id="order"
//       className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white"
//     >
//       {/* Special Offer Banner */}
//       <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-5 text-center text-white mb-6 shadow-2xl shadow-purple-500/30 border-2 border-white/20">
//         <div className="flex items-center justify-center gap-4">
//           <Gift className="w-8 h-8 animate-bounce" />
//           <span className="font-bold text-2xl">
//             🎁 প্রতিটি অর্ডারে 🎁 ফ্রি গিফট!
//           </span>
//           <Gift
//             className="w-8 h-8 animate-bounce"
//             style={{ animationDelay: "0.5s" }}
//           />
//         </div>
//       </div>
//       <div className="container mx-auto">
//         {/* HEADER */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             অর্ডার সম্পূর্ণ করুন
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             আপনার তথ্য দিন এবং আমরা আপনার অর্ডারটি প্রস্তুত করব
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
//           {/* FORM SIDE */}
//           <div className="space-y-8">
//             <Card className="border-2 border-gray-100 shadow-xl rounded-3xl overflow-hidden">
//               <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white pb-4">
//                 <CardTitle className="flex items-center gap-3 text-xl">
//                   <User className="w-6 h-6" /> গ্রাহকের তথ্য
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="p-6 lg:p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {/* NAME */}
//                   <div className="space-y-3">
//                     <Label className="text-base font-semibold flex items-center gap-2">
//                       <User className="w-4 h-4 text-rose-500" />
//                       আপনার নাম *
//                     </Label>
//                     <Input
//                       placeholder="আপনার পুরো নাম লিখুন"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                       className="h-12 text-lg border-2 border-gray-200 rounded-xl"
//                     />
//                   </div>

//                   {/* PHONE */}
//                   <div className="space-y-3">
//                     <Label className="text-base font-semibold flex items-center gap-2">
//                       <Phone className="w-4 h-4 text-rose-500" />
//                       মোবাইল নম্বর *
//                     </Label>
//                     <Input
//                       type="tel"
//                       placeholder="০১XXXXXXXXX"
//                       value={formData.phone}
//                       onChange={(e) =>
//                         setFormData({ ...formData, phone: e.target.value })
//                       }
//                       required
//                       className="h-12 text-lg border-2 border-gray-200 rounded-xl"
//                     />
//                   </div>

//                   {/* ADDRESS */}
//                   <div className="space-y-3">
//                     <Label className="text-base font-semibold flex items-center gap-2">
//                       <MapPin className="w-4 h-4 text-rose-500" />
//                       সম্পূর্ণ ঠিকানা *
//                     </Label>
//                     <Textarea
//                       placeholder="বাসা/ফ্ল্যাট নম্বর, রোড, এলাকা, জেলা"
//                       rows={4}
//                       value={formData.address}
//                       onChange={(e) =>
//                         setFormData({ ...formData, address: e.target.value })
//                       }
//                       required
//                       className="text-lg border-2 border-gray-200 rounded-xl"
//                     />
//                   </div>

//                   {/* NOTES */}
//                   <div className="space-y-3">
//                     <Label className="text-base font-semibold flex items-center gap-2">
//                       <MessageSquare className="w-4 h-4 text-rose-500" />
//                       অতিরিক্ত নোট (ঐচ্ছিক)
//                     </Label>
//                     <Textarea
//                       rows={3}
//                       value={formData.notes}
//                       onChange={(e) =>
//                         setFormData({ ...formData, notes: e.target.value })
//                       }
//                       className="text-lg border-2 border-gray-200 rounded-xl"
//                       placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন"
//                     />
//                   </div>

//                   {/* DELIVERY AREA */}
//                   <div className="space-y-4">
//                     <Label className="text-base font-semibold flex items-center gap-2">
//                       <Truck className="w-4 h-4 text-rose-500" />
//                       ডেলিভারি এরিয়া *
//                     </Label>

//                     <RadioGroup
//                       value={deliveryArea}
//                       onValueChange={(value) =>
//                         setDeliveryArea(value as "inside" | "outside")
//                       }
//                       className="space-y-3"
//                     >
//                       <div
//                         className={`flex items-center space-x-4 p-4 border-2 rounded-2xl cursor-pointer ${
//                           deliveryArea === "inside"
//                             ? "border-rose-500 bg-rose-50"
//                             : "border-gray-200"
//                         }`}
//                       >
//                         <RadioGroupItem value="inside" id="inside" />
//                         <Label
//                           htmlFor="inside"
//                           className="cursor-pointer flex-1"
//                         >
//                           <div className="font-semibold">ঢাকার ভিতরে</div>
//                           <div className="text-sm text-gray-600">
//                             ডেলিভারি চার্জ: ৮০ টাকা
//                           </div>
//                         </Label>
//                       </div>

//                       <div
//                         className={`flex items-center space-x-4 p-4 border-2 rounded-2xl cursor-pointer ${
//                           deliveryArea === "outside"
//                             ? "border-rose-500 bg-rose-50"
//                             : "border-gray-200"
//                         }`}
//                       >
//                         <RadioGroupItem value="outside" id="outside" />
//                         <Label
//                           htmlFor="outside"
//                           className="cursor-pointer flex-1"
//                         >
//                           <div className="font-semibold">ঢাকার বাইরে</div>
//                           <div className="text-sm text-gray-600">
//                             ডেলিভারি চার্জ: ১৫০ টাকা
//                           </div>
//                         </Label>
//                       </div>
//                     </RadioGroup>
//                   </div>

//                   {/* SUBMIT BUTTON */}
//                   <Button
//                     type="submit"
//                     variant="cta"
//                     size="lg"
//                     disabled={isSubmitting}
//                     className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white"
//                   >
//                     {isSubmitting
//                       ? "অর্ডার সাবমিট হচ্ছে..."
//                       : "অর্ডার সম্পন্ন করুন"}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* SUMMARY */}
//           <div className="space-y-6">
//             <Card className="border-2 border-gray-100 shadow-2xl rounded-3xl sticky top-6 overflow-hidden">
//               <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-4">
//                 <CardTitle className="flex items-center gap-3 text-xl">
//                   <ShoppingCart className="w-6 h-6" /> অর্ডার সামারি
//                   {cartItems.length > 0 && (
//                     <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
//                       {cartItems.length} আইটেম
//                     </span>
//                   )}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="p-6">
//                 {cartItems.length === 0 ? (
//                   <div className="text-center py-12">
//                     <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                     <p className="text-gray-500 text-lg mb-2">
//                       কোনো পণ্য নির্বাচিত হয়নি
//                     </p>
//                     <p className="text-gray-400">
//                       অর্ডার করতে উপরের পণ্যগুলো থেকে সিলেক্ট করুন
//                     </p>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="space-y-4">
//                       {cartItems.map((item, index) => (
//                         <div
//                           key={`${item.productId}-${index}`}
//                           className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200"
//                         >
//                           {/* IMAGE */}
//                           <img
//                             src={item.image}
//                             alt={item.productName}
//                             className="w-20 h-24 object-cover rounded-xl border"
//                           />

//                           {/* INFO */}
//                           <div className="flex-1">
//                             <div className="flex justify-between items-start">
//                               <p className="font-bold">{item.productName}</p>

//                               {/* REMOVE */}
//                               <button
//                                 onClick={() => handleRemoveItem(index)}
//                                 className="text-red-500 hover:text-red-700"
//                               >
//                                 ✕
//                               </button>
//                             </div>

//                             {/* QUANTITY */}
//                             <div className="flex items-center gap-3 mt-3">
//                               <button
//                                 onClick={() =>
//                                   updateQuantity(index, item.quantity - 1)
//                                 }
//                                 disabled={item.quantity <= 1}
//                                 className="w-8 h-8 border rounded-lg"
//                               >
//                                 −
//                               </button>

//                               <span className="px-4 py-1 bg-white rounded-lg font-bold">
//                                 {item.quantity}
//                               </span>

//                               <button
//                                 onClick={() =>
//                                   updateQuantity(index, item.quantity + 1)
//                                 }
//                                 className="w-8 h-8 border rounded-lg"
//                               >
//                                 +
//                               </button>
//                             </div>

//                             {/* PRICE */}
//                             <p className="mt-2 font-bold text-rose-600">
//                               {item.price * item.quantity}৳
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="border-t border-gray-200 pt-6 space-y-4">
//                       <div className="flex justify-between text-lg">
//                         <span>পণ্যের মূল্য:</span>
//                         <span className="font-semibold">{productTotal}৳</span>
//                       </div>

//                       <div className="flex justify-between text-lg">
//                         <span>ডেলিভারি চার্জ:</span>
//                         <span className="font-semibold">{deliveryCharge}৳</span>
//                       </div>

//                       <div className="flex justify-between text-2xl font-bold border-t border-gray-300 pt-4">
//                         <span>সর্বমোট:</span>
//                         <span className="text-rose-600">{grandTotal}৳</span>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };