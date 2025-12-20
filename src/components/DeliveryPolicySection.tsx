// DeliveryPolicySection.tsx
import { Package, Shield, Scale, Truck, CheckCircle } from "lucide-react";

export const DeliveryPolicySection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            আমাদের ডেলিভারি ও কোয়ালিটি নিশ্চয়তা
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            আমরা শুধু কাস্টমার স্যাটিসফেকশনের জন্য কাজ করি। আমাদের প্রতিটি পলিসি
            আপনার সুবিধার কথা চিন্তা করে তৈরি।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Quality Assurance Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                কোয়ালিটি গ্যারান্টি
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">১০০% প্রিমিয়াম ফেব্রিক</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">হ্যান্ডওয়ার্ক চেকড</span>
              </li>
              {/* <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">৭ দিন রিটার্ন পলিসি</span>
              </li> */}
            </ul>
          </div>

          {/* Delivery Policy Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                ডেলিভারি পলিসি
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-500 font-bold">৳</span>
                </div>
                <span className="text-gray-700">
                  ঢাকার ভিতরে: <strong>৮০ টাকা</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-500 font-bold">৳</span>
                </div>
                <span className="text-gray-700">
                  ঢাকার বাইরে: <strong>১৫০ টাকা</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-500 font-bold">⏱️</span>
                </div>
                <span className="text-gray-700">1-2 দিনে ডেলিভারি</span>
              </li>
            </ul>
          </div>

          {/* Courier Minimum Weight Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Scale className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                কুরিয়ার পলিসি
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-semibold text-amber-800 mb-2">
                  ⚠️ গুরুত্বপূর্ণ নোট:
                </p>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      কুরিয়ার সার্ভিসে <strong>মিনিমাম ০.৫ কেজি</strong> ওয়েট
                      গণনা করা হয়
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      কুরিয়ার অপশন না নিলেও কাস্টমারকে{" "}
                      <strong>ফুল ডেলিভারি চার্জ</strong> দিতে হবে
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                আমরা কুরিয়ারের নিয়ম অনুসরণ করি। মিনিমাম চার্জ এপ্লাই হয়।
              </p>
            </div>
          </div>

          {/* Free Gift & Support Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                বিশেষ অফার ও সাপোর্ট
              </h3>
            </div>
            <ul className="space-y-3">
              {/* <li className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-500 font-bold">🎁</span>
                </div>
                <span className="text-gray-700">
                  প্রতিটি অর্ডারে <strong>ফ্রি গিফট</strong>
                </span>
              </li> */}
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-500 font-bold">💰</span>
                </div>
                <span className="text-gray-700">
                  100% <strong>ক্যাশ অন ডেলিভারি</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-500 font-bold">📞</span>
                </div>
                <span className="text-gray-700">
                  ২৪/৭ কাস্টমার সাপোর্ট
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Notice Bar */}
        <div className="mt-10 md:mt-12 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg md:text-xl text-rose-800 mb-2">
                কুরিয়ার পলিসি সম্পর্কে বিশেষ তথ্য
              </h4>
              <div className="text-rose-700 space-y-2">
                <p>
                  <strong>মনে রাখবেন:</strong> কুরিয়ার কোম্পানি সবসময় মিনিমাম ০.৫
                  কেজি ওয়েট ধরে চার্জ করে। যদি আপনার পার্সেলের ওজন ০.৫ কেজির কমও
                  হয়, তবুও মিনিমাম চার্জ এপ্লাই হবে।
                </p>
                <p>
                  <strong>অনুরোধ:</strong> কুরিয়ার অপশন নিলে বা না নিলেও
                  কাস্টমারকে ফুল ডেলিভারি চার্জ বহন করতে হবে। এটা কুরিয়ার
                  কোম্পানির পলিসি, আমাদের নিয়ন্ত্রণে নেই।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};