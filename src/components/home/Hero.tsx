"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero({ dictionary, lang }: { dictionary?: any; lang?: string }) {
  const dict = dictionary?.hero || {
    title_rebo: "REBO 3D:",
    title_future: "El Futuro de la Luthería.",
    subtitle: "Configura. Imprime. Toca.",
    enter_lab: "Entrar al Laboratorio",
    view_gallery: "Ver Galería"
  };
  
  const currentLang = lang || 'es';

  return (
    <section className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 flex flex-col items-center justify-center min-h-[90vh] py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content */}
          <div className="flex flex-col space-y-8 z-10 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
            >
              {dict.title_rebo} <br />
              <span className="text-muted-foreground">{dict.title_future}</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl font-medium text-primary tracking-wide"
            >
              {dict.subtitle}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Ocultado por ahora
              <Link href={`/${currentLang}/lab`} passHref>
                <Button size="lg" className="h-14 px-8 text-lg rounded-full">
                  {dict.enter_lab}
                </Button>
              </Link>
              */}
              <Link href={`/${currentLang}/gallery`} passHref>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
                  {dict.view_gallery}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* 3D Render Placeholder / Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex justify-center items-center h-[50vh] lg:h-[80vh] w-full"
          >
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[120px] rounded-full mix-blend-multiply" />
            
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              className="relative w-full h-full"
            >
              <Image 
                src="/hero-guitar.png" 
                alt="3D Printed Stratocaster Render" 
                fill 
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
