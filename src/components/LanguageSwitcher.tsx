"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    // Assuming the first segment is the locale (e.g., /es/about -> ['', 'es', 'about'])
    segments[1] = locale;
    const newUrl = segments.join("/");
    router.push(newUrl);
  };

  const getLangName = (lang: string) => {
    switch (lang) {
      case "es":
        return "ES";
      case "en":
        return "EN";
      case "eu":
        return "EU";
      default:
        return "ES";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" className="h-9 w-9 px-0" />}
      >
        <Globe className="h-[1.2rem] w-[1.2rem] transition-all" />
        <span className="sr-only">Cambiar idioma</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("es")} className={currentLang === 'es' ? 'font-bold' : ''}>
          Español (ES)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("en")} className={currentLang === 'en' ? 'font-bold' : ''}>
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("eu")} className={currentLang === 'eu' ? 'font-bold' : ''}>
          Euskera (EU)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
