import outfit1 from "@/assets/outfit-1.jpg";
import outfit2 from "@/assets/outfit-2.jpg";
import outfit3 from "@/assets/outfit-3.jpg";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    id: 1,
    image: outfit1,
    title: "প্রিমিয়াম এমব্রয়ডারি সেট",
    description: "জটিল সূচিকর্ম সহ মার্জিত ডিজাইন",
  },
  {
    id: 2,
    image: outfit2,
    title: "ফ্লোরাল প্যারাডাইস কালেকশন",
    description: "প্রতিটি অনুষ্ঠানের জন্য সুন্দর ফুলের নকশা",
  },
  {
    id: 3,
    image: outfit3,
    title: "আধুনিক ট্রেন্ডি কালেকশন",
    description: "প্রাণবন্ত রঙের সাথে সমসাময়িক স্টাইল",
  },
];

const ProductGallery = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--accent)/0.15),transparent_60%)]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            আমাদের <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">কালেকশন</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            প্রতিটি স্টাইলের জন্য ডিজাইন করা আমাদের অত্যাশ্চর্য থ্রি-পিস পোশাক আবিষ্কার করুন
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-glow border-2 border-primary/20 hover:border-accent/60 transition-all duration-500 cursor-pointer hover:-translate-y-3 bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6 z-20">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-bold mb-3 drop-shadow-lg">{product.title}</h3>
                      <p className="text-sm opacity-90 drop-shadow-md">{product.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    দেখুন
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
