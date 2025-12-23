import { Phone } from "lucide-react";

const OfferSection = () => {
  return (
    <div className="max-w-7xl mx-auto my-12 lg:my-16 px-4">
      
      {/* Center Wrapper */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-4xl bg-gradient-to-br from-blue-50 to-cyan-100 border-4 border-dashed border-blue-400 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-2xl lg:hover:scale-105">
          
          {/* Highlighted Badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 sm:px-6 py-2 rounded-xl text-sm sm:text-lg font-bold shadow-lg border-2 border-white whitespace-nowrap">
            আপনি চাইলে ফোন দিয়ে অর্ডার কনফার্ম করতে পারেন
          </div>

          {/* Icon */}
          <div className="mb-6 mt-4 flex justify-center">
            <div className="p-4 bg-white rounded-2xl shadow-xl border-2 border-blue-300 animate-pulse">
              <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            পার্টি শাড়ি নিয়ে কোন প্রশ্ন?
          </h3>

          <p className="text-gray-700 text-base sm:text-lg mb-6 font-medium">
            আমাদের এক্সপার্টদের সাথে সরাসরি কথা বলে নিশ্চিত হোন
          </p>

          {/* Call Buttons */}
        <div className="flex justify-center">
  <a
    href="tel:+8801926923688"
    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 sm:px-6 py-4 rounded-2xl font-bold text-sm sm:text-xl shadow-xl shadow-green-400/30 hover:shadow-green-400/50 transition-all duration-300 border-2 border-white/20 whitespace-nowrap"
  >
    <Phone className="w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0" />
    <span>
      অর্ডার করতে কল করুন: <span className="font-extrabold">+880 1926-923-688</span>
    </span>
  </a>
</div>


          <p className="text-sm sm:text-base text-gray-700 mt-4 font-medium">
            (ইমু / হোয়াটসঅ্যাপ কল এভেলেবেল)
          </p>

          <p className="text-sm text-gray-600 mt-2 font-medium">
            🕘 সার্ভিস টাইম: সকাল 09টা – রাত 01 টা
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;