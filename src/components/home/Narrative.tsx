"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Narrative({ dictionary }: { dictionary?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLHeadingElement[]>([]);

  const dict = dictionary?.narrative || {
    title1: "Ingeniería Limpia.",
    title2: "Precisión Absoluta.",
    title3: "Tu Sonido, Hecho a Medida.",
    description: "En REBO 3D, combinamos la luthería tradicional con manufactura aditiva de vanguardia. Nuestro taller es un laboratorio donde el filamento se transforma en resonancia perfecta.",
    badge: "Taller de Ingeniería"
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((text, i) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
              end: "bottom 60%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      
      gsap.fromTo(
        ".narrative-image",
        { opacity: 0, scale: 0.95, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          opacity: 1,
          scale: 1,
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".image-container",
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLHeadingElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="py-24 bg-secondary text-foreground overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-12 pr-0 lg:pr-12">
            <h2 ref={addToRefs} className="text-4xl lg:text-5xl font-bold tracking-tight">
              {dict.title1}
            </h2>
            <h2 ref={addToRefs} className="text-4xl lg:text-5xl font-bold tracking-tight text-muted-foreground">
              {dict.title2}
            </h2>
            <h2 ref={addToRefs} className="text-4xl lg:text-5xl font-bold tracking-tight">
              {dict.title3}
            </h2>
            <p className="text-lg text-muted-foreground font-medium max-w-xl pt-4">
              {dict.description}
            </p>
          </div>
          
          <div className="flex-1 w-full image-container">
            <div className="relative aspect-square md:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl narrative-image">
              {/* Fallback styling if image not loaded yet */}
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground font-mono text-sm tracking-widest uppercase">{dict.badge}</span>
              </div>
              <Image 
                src="/workshop.png" 
                alt="REBO 3D Engineering Workshop" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
