import { Truck, Shield, Star, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Truck,
    title: "দ্রুত ডেলিভারি",
    description: "২-৩ কর্মদিবসের মধ্যে আপনার অর্ডার পেয়ে যান",
  },
  {
    icon: Shield,
    title: "মান নিশ্চয়তা",
    description: "প্রিমিয়াম কাপড় এবং বিশেষজ্ঞ কারুশিল্প",
  },
  {
    icon: Star,
    title: "ট্রেন্ডি ডিজাইন",
    description: "অপ্রতিরোধ্য দামে সর্বশেষ ফ্যাশন ট্রেন্ড",
  },
  {
    icon: CreditCard,
    title: "ক্যাশ অন ডেলিভারি",
    description: "পণ্য পাওয়ার পর টাকা দিন",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted via-background to-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.1),transparent_70%)]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            কেন আমাদের <span className="text-primary">বেছে নেবেন?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            আমরা মানসম্পন্ন এবং স্টাইলিশ পণ্য সাশ্রয়ী দামে সরবরাহ করি
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 border-primary/10 shadow-md hover:shadow-accent hover:border-accent/40 transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm group"
            >
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent shadow-primary group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
