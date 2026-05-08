import Image from "next/image";
import { getDictionary } from "@/get-dictionary";

export const metadata = {
  title: "Nuestra Historia | REBO 3D",
  description: "Conoce el origen de REBO 3D, nuestra pasión por el 3D y la visión para el futuro de la música.",
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "es" | "en" | "eu");
  const dict = dictionary.about;

  return (
    <div className="flex-1 w-full bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-8 py-24 lg:py-32">
        {/* Section 1: The Beginning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none">
              {dict.title_our} <br />
              <span className="text-primary">{dict.title_story}</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
            
            <div className="space-y-6 text-xl text-muted-foreground font-light leading-relaxed">
              <p>
                <strong className="text-foreground font-semibold">{dict.p1}</strong>{dict.p1_cont}
              </p>
              <p>
                {dict.p2_start}<strong className="text-foreground font-medium">{dict.p2_bold}</strong>{dict.p2_end}
              </p>
              <p>
                {dict.p3}
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl border border-border bg-card">
              <Image 
                src="/workshop_3d_guitar.png" 
                alt="REBO 3D Workshop" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Section 2: The Guitars & The Future */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="aspect-square rounded-2xl overflow-hidden relative shadow-2xl border border-border bg-card">
              <Image 
                src="/custom_3d_guitar.png" 
                alt="Custom 3D Guitar" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Overlay badge */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border p-6 rounded-2xl shadow-xl max-w-[200px] z-10 hidden md:block">
              <h4 className="text-4xl font-black text-foreground">100%</h4>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">{dict.customized}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-tight">{dict.customized_desc}</p>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              {dict.section2_title1} <br />
              {dict.section2_title2}<span className="text-primary italic">{dict.section2_title3}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
            
            <div className="space-y-6 text-xl text-muted-foreground font-light leading-relaxed">
              <p>
                {dict.p4_start}<strong>{dict.p4_bold}</strong>{dict.p4_end}
              </p>
              <p>
                {dict.p5_start}<strong className="text-foreground font-medium">{dict.p5_bold}</strong>{dict.p5_end}
              </p>
              <blockquote className="border-l-4 border-primary pl-6 py-2 mt-8">
                <p className="text-2xl italic text-foreground font-serif">
                  {dict.quote}
                </p>
              </blockquote>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
