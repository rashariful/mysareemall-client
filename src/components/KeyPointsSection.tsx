"use client";

import React, { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCards } from "swiper/modules";
import axios from "axios";

type KeyPointData = {
  _id: string;
  title: string;
  keyPoint: string[];
  images: string[];
  isActive: boolean;
};

const KeyPointsSection = () => {
  const [data, setData] = useState<KeyPointData | null>(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchKeyPoints = async () => {
      try {
        const response = await axios.get(`${API_URL}/keypoint`);
        // Pick the first active entry
        const activeEntry = response.data.data.find((item: KeyPointData) => item.isActive);
        setData(activeEntry || null);
      } catch (error) {
        console.error("Error fetching key points:", error);
      }
    };

    fetchKeyPoints();
  }, []);

  if (!data) return null; // or a loader

  return (
    <section className="py-14 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-2 sm:border-4 border-rose-600 rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* 🔹 Left - Key Points */}
            <div className="space-y-5">
              <div className="bg-rose-600 px-4 py-3 rounded-lg sm:rounded-xl">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white text-center lg:text-left">
                  {data.title}
                </h2>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                {data.keyPoint.map((point, index) => (
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
                {data.images.map((img, index) => (
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
