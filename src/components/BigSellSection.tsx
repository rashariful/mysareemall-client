import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const BigSellSection = () => {
  return (
    <section className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* 🔥 Discount Badge */}
        <div className="inline-block mb-5 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-foreground font-bold rounded-full shadow-lg animate-bounce text-sm sm:text-base">
          🎉 ২০% – 25% পর্যন্ত বিশেষ ছাড়!
        </div>

        {/* 🔹 Bengali AI Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-lg">
          🎉 25% পর্যন্ত ছাড় —  
          <br className="hidden sm:block" />
          অগ্রিম পেমেন্ট ছাড়াই সারা বাংলাদেশে হোম ডেলিভারি
        </h1>

        {/* 🔹 Description */}
        <p className="text-base sm:text-lg lg:text-2xl max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
          পছন্দের প্রিমিয়াম শাড়ি এখন পাচ্ছেন বিশেষ ছাড়ে। ইন্ডিয়ান প্রিমিয়াম কোয়ালিটি নরম এবং আরামদায়ক পিওর জর্জেট পার্টি শাড়ি, ট্রেন্ডি ডিজাইন ও দীর্ঘস্থায়ী রঙ — সবকিছু একসাথে।
          <span className="block mt-2 font-semibold">
            স্টক সীমিত, তাই দেরি না করে আজই অর্ডার করুন।
          </span>
        </p>

        {/* 🔹 CTA Button */}
        <Button
          onClick={() =>
            document
              .getElementById("product")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          size="lg"
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-foreground font-bold px-7 sm:px-10 py-4 sm:py-5 text-base sm:text-xl shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <ShoppingBag className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
          অর্ডার দিন এখনই
        </Button>
      </div>
    </section>
  );
};

export default BigSellSection;
