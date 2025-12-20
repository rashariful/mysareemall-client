"use client";

import { CircleCheckBig } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCards } from "swiper/modules";


import meron from "@/assets/meron.jpg";
import nil from "@/assets/nil.jpg";
import black from "@/assets/black.jpg";
import golden from "@/assets/golden.jpeg";
import red from "@/assets/red.jpeg";
import pink from "@/assets/pink.jpg";
import green from "@/assets/green.jpeg";
import white from "@/assets/white.jpeg"
// শাড়ির সিরিয়াল ১-কালো-২ মেরুন-৩-নীল-৪-গোল্ডেন-৫-পিঙ্ক-৬ সি-গ্রীন-৭-সাদা-৮-লাল

const images = [black,  meron,nil, golden, pink, green, white, red];

const keyPoints = [
  "ইন্ডিয়ান প্রিমিয়াম কোয়ালিটি নরম এবং আরামদায়ক পিওর জর্জেট পার্টি শাড়ি",
  "শাড়ি 12 হাত, ব্লাউজের পিস আলেদা থাকবে 1 গজ",
  "পার্টি, বিয়ে, গেট-টুগেদার সব জায়গায় একদম পারফেক্ট",
  "বাজেটের মধ্যে প্রিমিয়াম লুক",
  "দীর্ঘস্থায়ী রঙ ও মান",
  "ট্রেন্ডি ডিজাইন",
  "পণ্য হাতে পাওয়ার পরই টাকা পরিশোধ",
  "ক্যাশ অন ডেলিভারি – সারা বাংলাদেশে",
];

const KeyPointsSection = () => {
  return (
    <section className="py-14 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-2 sm:border-4 border-rose-600 rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* 🔹 Left - Key Points */}
            <div className="space-y-5">
              <div className="bg-rose-600 px-4 py-3 rounded-lg sm:rounded-xl">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white text-center lg:text-left">
                  কেন এই শাড়ি বিশেষ?
                </h2>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                {keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <CircleCheckBig className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 mt-1 shrink-0" />
                    <span className="text-base sm:text-lg lg:text-xl font-semibold text-gray-700 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 🔹 Right - Image Slider */}
            <div className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-md mx-auto">
              <Swiper
                effect="cards"
                grabCursor
                modules={[EffectCards]}
                className="mySwiper"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border border-rose-200 shadow-xl">
                      <img
                        src={img}
                        alt={`Saree ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default KeyPointsSection;
