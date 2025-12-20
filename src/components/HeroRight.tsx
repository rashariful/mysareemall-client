import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";


import pink from "@/assets/socks-1.jpg";
import red from "@/assets/socks-3.jpg";
import gray from "@/assets/socks-2.jpg";
import brown from "@/assets/socks-4.jpg";



const colors = [
  { name: "Pink", color: "bg-pink-300", image: pink },
  { name: "Red", color: "bg-blue-300", image: red },
  { name: "Gray", color: "bg-green-300", image: gray },
  { name: "Brown", color: "bg-yellow-300", image: brown },
];

 const HeroRight = () => {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-discount text-discount-foreground px-4 py-1.5 text-sm font-semibold">
          38% OFF
        </Badge>
        <Badge variant="outline" className="border-primary text-primary px-4 py-1.5 text-sm">
          🎯 Premium Collection
        </Badge>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold leading-tight text-foreground md:text-5xl">
       
          পণ্য হাতে না পাওয়া পর্যন্ত কোনো টাকা নয় — ১০০% নিশ্চিন্তে অর্ডার দিন!
        </h1>
      </div>

      {/* Description */}
      <p className="text-lg text-muted-foreground leading-relaxed">
       শীতে আপনার বাচ্চাকে ঠান্ডা থেকে বাঁচাতে—আমাদের প্রিমিয়াম বেবি সকস!
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-lg font-semibold text-foreground">5.0</span>
        <span className="text-muted-foreground">(200+ reviews)</span>
      </div>

      {/* Pricing */}
    


      {/* CTA Button */}
      <Button
       onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
        size="lg"
        className="w-full bg-gradient-to-r from-primary to-[hsl(320,75%,68%)] py-6 text-lg font-semibold shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-hover)] hover:scale-[1.02]"
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Order Now
      </Button>

     
    </div>
  );
};

export default HeroRight