import { Star, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

import meron from "@/assets/meron.jpg";
import blue from "@/assets/blue.jpg";
import black from "@/assets/black.jpg";
import golden from "@/assets/golden.jpg";

const products = [
  { name: "Black", color: "bg-red-300", image: black },
  { name: "Blue", color: "bg-blue-300", image: blue },
  { name: "Meron", color: "bg-green-300", image: meron },
  { name: "Yellow", color: "bg-yellow-300", image: golden },
];

const ShariShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Image Gallery */}
          <div className="space-y-6">
            {/* Main Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-card shadow-2xl border border-border/50">
              <img
                src={products[currentIndex].image}
                alt={`শাড়ি ${products[currentIndex].name} রঙের`}
                className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
              />
              
              {/* Navigation Buttons */}
              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={prevImage}
                  className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:scale-110 transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={nextImage}
                  className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:scale-110 transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-foreground/90 px-4 py-2 text-sm text-background backdrop-blur-sm font-medium">
                {currentIndex + 1} / {products.length}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white px-3 py-2 text-base font-bold border-2 border-white shadow-lg">
                  20% OFF
                </Badge>
              </div>
            </div>

            {/* Color Selection Thumbnails */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Choose Color:</h3>
              <div className="grid grid-cols-4 gap-4">
                {products.map((product, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorSelect(index)}
                    className={`relative aspect-square overflow-hidden rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                      index === selectedColor
                        ? "scale-105 border-primary shadow-xl ring-2 ring-primary ring-offset-2"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm font-medium py-1 text-center backdrop-blur-sm">
                      {product.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-8">
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-green-500 text-white px-4 py-2 text-sm font-bold border-2 border-white shadow-lg">
                🎯 Premium Collection
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-600 px-4 py-2 text-sm font-semibold bg-blue-50">
                💫 100% Pure Fabric
              </Badge>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-foreground bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Premium শাড়ি - Festive Collection
              </h1>
              <p className="text-2xl lg:text-3xl font-semibold leading-tight text-foreground mt-4">
                পণ্য হাতে না পাওয়া পর্যন্ত কোনো টাকা নয় — ১০০% নিশ্চিন্তে অর্ডার দিন!
              </p>
            </div>

            {/* Description */}
            <p className="text-xl text-muted-foreground shadow leading-relaxed bg-muted/50 p-6 rounded-2xl border-l-4 border-r-4 border-primary">
              আমাদের প্রিমিয়াম শাড়ি দিয়ে নিজেকে ও পরিবারের জন্য সবচেয়ে সুন্দর সাজ করুন। 
              নরম, আরামদায়ক এবং উজ্জ্বল রঙের ফ্যাব্রিক ব্যবহার।
            </p>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 p-6 bg-card rounded-2xl shadow-lg border border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-7 w-7 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                  ))}
                </div>
                <span className="text-2xl font-bold text-foreground">4.9</span>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div>
                <span className="text-lg font-semibold text-foreground">150+</span>
                <span className="text-muted-foreground ml-2">Happy Customers</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl border border-primary/20">
              <div className="text-4xl font-bold text-foreground">৳ 1200</div>
              <div className="text-2xl text-muted-foreground line-through">৳ 1500</div>
              <Badge className="bg-green-500 text-white px-3 py-1 text-sm font-bold">
                Save ৳ 300
              </Badge>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-purple-600 py-8 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform border-2 border-white"
            >
              <ShoppingBag className="mr-3 h-6 w-6" />
              Order Now - 100% Risk Free
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-card rounded-xl border border-border/50">
                <div className="text-2xl">🚚</div>
                <div className="text-sm font-semibold mt-2">Fast Delivery</div>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border/50">
                <div className="text-2xl">↩️</div>
                <div className="text-sm font-semibold mt-2">7 Day Return</div>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border/50">
                <div className="text-2xl">🛡️</div>
                <div className="text-sm font-semibold mt-2">Quality Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShariShowcase;
