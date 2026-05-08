import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getDictionary } from "@/get-dictionary";

export const metadata = {
  title: "Galería | REBO 3D",
  description: "Descubre las creaciones de nuestra comunidad.",
};

export default async function GalleryPage({ params }: { params: Promise<{ lang: "es" | "en" | "eu" }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const dict = dictionary.gallery;

  const galleryItems = [
    { id: 1, title: "Stratocaster Negra Mate", maker: "@luthier_x", height: "h-[400px]", img: "/gallery_black_strat.png" },
    { id: 2, title: "Acústica Translúcida", maker: "@3D_minds", height: "h-[300px]", img: "/gallery_translucent_acoustic.png" },
    { id: 3, title: "Custom Headstock", maker: "@rebo_official", height: "h-[350px]", img: "/gallery_headstock.png" },
    { id: 4, title: "Cuerpo Hollow en Madera", maker: "@wood_prints", height: "h-[450px]", img: "/hero-guitar.png" },
    { id: 5, title: "REBO Custom Shop", maker: "@goldtone", height: "h-[300px]", img: "/custom_3d_guitar.png" },
    { id: 6, title: "Kit Base Ensamblado", maker: "@beginner_3d", height: "h-[400px]", img: "/workshop_3d_guitar.png" },
  ];

  return (
    <div className="flex-1 w-full bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-16">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{dict.title}</h1>
          <p className="text-lg text-muted-foreground">
            {dict.subtitle}
          </p>
        </div>

        {/* Masonry-like Grid using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item) => (
            <div key={item.id} className={`relative w-full rounded-2xl overflow-hidden group break-inside-avoid shadow-sm border border-border/50 bg-card flex flex-col items-center justify-center ${item.height}`}>
              <div className="absolute inset-0 z-0">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-white/70 text-sm font-medium">{dict.by} {item.maker}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" disabled className="rounded-full px-8 h-14 opacity-60 cursor-not-allowed">
            {dict.upload}
          </Button>
        </div>

      </div>
    </div>
  );
}
