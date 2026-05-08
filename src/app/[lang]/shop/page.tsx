import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import Image from "next/image";
import { getDictionary } from "@/get-dictionary";

export const metadata = {
  title: "Explora | REBO 3D",
  description: "Explora nuestra colección de instrumentos de última generación.",
};

export default async function ShopPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "es" | "en" | "eu");
  const dict = dictionary.shop;

  const products = [
    { id: 1, name: "REBO 3D Strat (Base)", category: dict.categories.guitars, price: 199, tag: dict.tags.popular, img: "/hero-guitar.png" },
    { id: 2, name: "REBO 3D Acoustic Shell", category: dict.categories.guitars, price: 249, tag: dict.tags.new, img: "/hero-guitar.png" },
    { id: 3, name: "Filamento REBO 3D PETG Mate", category: dict.categories.materials, price: 25, tag: "", img: "/filament_spool.png" },
    { id: 4, name: "Filamento REBO 3D PC Translúcido", category: dict.categories.materials, price: 40, tag: dict.tags.premium, img: "/filament_spool.png" },
    { id: 5, name: "Hardware REBO 3D: Pickups", category: dict.categories.hardware, price: 80, tag: "", img: "/guitar_hardware.png" },
    { id: 6, name: "Hardware REBO 3D: Fixed Bridge", category: dict.categories.hardware, price: 45, tag: "", img: "/guitar_hardware.png" },
  ];

  return (
    <div className="flex-1 w-full bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-16">
        
        {/* Header Options */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">{dict.title}</h1>
            <p className="text-muted-foreground">{dict.subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {dict.filter}
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-card">
              
              {/* Product Image Placeholder */}
              <div className="aspect-[4/3] w-full bg-muted relative overflow-hidden flex items-center justify-center">
                {product.tag && (
                  <Badge className="absolute top-4 left-4 z-10">{product.tag}</Badge>
                )}
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-0" />
                <Image src={product.img} fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt={product.name} />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">{product.category}</p>
                    <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                  </div>
                </div>
                
                <Button variant="secondary" disabled className="w-full opacity-60 cursor-not-allowed">
                  {dict.coming_soon}
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
