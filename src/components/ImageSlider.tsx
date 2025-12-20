"use client";
import { useState, useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ZoomIn, 
  Heart, 
  Share2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import your images
import outfit1 from "@/assets/outfit-1.jpg";
import outfit2 from "@/assets/outfit-2.jpg";
import outfit3 from "@/assets/outfit-3.jpg";
import outfit4 from "@/assets/outfit-4.jpg";
import outfit5 from "@/assets/outfit-5.jpg";
import outfit6 from "@/assets/outfit-6.jpg";
import heroOutfit from "@/assets/hero-outfit.jpg";

const ImageSlider = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { 
      src: outfit1, 
      alt: "থ্রি-পিস ১",
      title: "প্রিমিয়াম থ্রি-পিস",
      description: "এক্সক্লুসিভ ডিজাইনের থ্রি-পিস সেট",
      price: "৳ ২,৫৯৯",
      category: "প্রিমিয়াম"
    },
    { 
      src: outfit2, 
      alt: "থ্রি-পিস ২",
      title: "ক্লাসিক কালেকশন",
      description: "ট্রাডিশনাল ডিজাইনের সাথে মডার্ন টাচ",
      price: "৳ ২,২৯৯",
      category: "ক্লাসিক"
    },
    { 
      src: outfit3, 
      alt: "থ্রি-পিস ৩",
      title: "ডিজাইনার স্পেশাল",
      description: "ইউনিক প্যাটার্ন এবং প্রিমিয়াম ফেব্রিক",
      price: "৳ ২,৯৯৯",
      category: "ডিজাইনার"
    },
    { 
      src: outfit4, 
      alt: "থ্রি-পিস ৪",
      title: "ফেস্টিভ কালেকশন",
      description: "উৎসবের জন্য স্পেশাল ডিজাইন",
      price: "৳ ২,৭৯৯",
      category: "ফেস্টিভ"
    },
    { 
      src: outfit5, 
      alt: "থ্রি-পিস ৫",
      title: "মিনিমালিস্ট সেট",
      description: "সিম্পল এন্ড এলিগেন্ট ডিজাইন",
      price: "৳ ১,৯৯৯",
      category: "মিনিমাল"
    },
    { 
      src: outfit6, 
      alt: "থ্রি-পিস ৬",
      title: "প্রিমিয়াম সিল্ক",
      description: "হাই-কোয়ালিটি সিল্ক ফেব্রিক",
      price: "৳ ৩,৪৯৯",
      category: "সিল্ক"
    },
    { 
      src: heroOutfit, 
      alt: "থ্রি-পিস ৭",
      title: "লাক্সারি এডিশন",
      description: "লিমিটেড এডিশন লাক্সারি পিস",
      price: "৳ ৩,৯৯৯",
      category: "লাক্সারি"
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || selectedImage !== null) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedImage, images.length]);

  const toggleLike = useCallback((index: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const shareImage = async (image: typeof images[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${image.title} - ${window.location.href}`);
      alert('লিংক কপি করা হয়েছে!');
    }
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'next') {
      setSelectedImage((prev) => (prev! + 1) % images.length);
    } else {
      setSelectedImage((prev) => (prev! - 1 + images.length) % images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-pink-200/40 to-purple-200/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-r from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-4 py-2 text-sm font-semibold bg-pink-500/10 text-pink-600 border-pink-200 hover:bg-pink-500/15 transition-all duration-300">
            এক্সক্লুসিভ কালেকশন
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-gray-900 to-pink-600 bg-clip-text text-transparent">
            ✨ আমাদের স্পেশাল কালেকশন ✨
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our exclusive three-piece collections that blend traditional elegance with modern style
          </p>
        </motion.div> */}

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: "ltr",
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.03,
                      y: -8
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: "easeOut" 
                    }}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(index)}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                          <p className="text-sm text-white/80 mb-2">{image.description}</p>
                          <div className="flex items-center justify-between">
                            {/* <span className="font-bold text-pink-200">{image.price}</span> */}

                            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                              {image.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(index);
                          }}
                        >
                          <Heart 
                            className={`w-4 h-4 ${
                              likedImages.has(index) 
                                ? "fill-red-500 text-red-500" 
                                : "text-gray-700"
                            }`} 
                          />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareImage(image);
                          }}
                        >
                          <Share2 className="w-4 h-4 text-gray-700" />
                        </Button>
                      </div>

                      {/* Zoom Indicator */}
                      <div className="absolute top-3 left-3">
                        <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Enhanced Navigation Buttons */}
            <CarouselPrevious className="!left-3 !top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl rounded-full w-12 h-12 text-gray-700 hover:text-pink-600 transition-all duration-300 active:scale-95 border-0" />
            <CarouselNext className="!right-3 !top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl rounded-full w-12 h-12 text-gray-700 hover:text-pink-600 transition-all duration-300 active:scale-95 border-0" />
          </Carousel>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-8">
            <Button 
                size="lg" 
                variant="hero" 
                className="text-lg h-14 animate-pulse-glow"
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              >
                এখনই অর্ডার করুন
              </Button>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="rounded-full gap-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause Auto-play
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play Auto-play
                </>
              )}
            </Button> */}
          </div>
        </motion.div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-6xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg border-0"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg border-0"
                  onClick={() => navigateImage('prev')}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg border-0"
                  onClick={() => navigateImage('next')}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Image */}
                <img
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  className="w-full h-full object-contain max-h-[80vh] rounded-2xl"
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">{images[selectedImage].title}</h3>
                    <p className="text-white/80 mb-3">{images[selectedImage].description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* <span className="text-xl font-bold text-pink-200">{images[selectedImage].price}</span> */}
                        <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                          {images[selectedImage].category}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
                          onClick={() => toggleLike(selectedImage)}
                        >
                          <Heart 
                            className={`w-5 h-5 ${
                              likedImages.has(selectedImage) 
                                ? "fill-red-500 text-red-500" 
                                : "text-white"
                            }`} 
                          />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
                          onClick={() => shareImage(images[selectedImage])}
                        >
                          <Share2 className="w-5 h-5 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ImageSlider;