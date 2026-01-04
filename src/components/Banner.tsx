import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

type BannerData = {
  _id: string;
  title: string;
  subTitle: string;
  details: string;
  offerText: string;
  keyword: string;
  buttonText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

const Banner = () => {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`${API_URL}/banner`);
        // Assuming API returns an array and we want the first active banner
        const activeBanner = response.data?.data?.find((b: BannerData) => b.isActive);
        setBanner(activeBanner || null);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null; // or a loader/spinner

  return (
    <section className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* 🔥 Discount Badge */}
        <div className="inline-block mb-5 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-foreground font-bold rounded-full shadow-lg animate-bounce text-sm sm:text-base">
          {banner.offerText}
        </div>

        {/* 🔹 Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-lg">
          {banner.title}  
          <br className="hidden sm:block" /> 
          {banner.subTitle}
        </h1>

        {/* 🔹 Description */}
        <p className="text-base sm:text-lg lg:text-2xl max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
          {banner.details}
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
          {banner.buttonText}
        </Button>
      </div>
    </section>
  );
};

export default Banner;
