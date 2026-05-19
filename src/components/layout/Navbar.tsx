"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function Navbar({ dictionary, lang }: { dictionary?: any; lang?: string }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Fallbacks if dictionary is not loaded properly in some edge case client components
  const dict = dictionary?.navbar || {
    explore: "Explora",
    configurator: "Configurador 3D",
    gallery: "Galería",
    about: "Nuestra Historia",
    support: "Soporte",
    login: "Login"
  };

  const currentLang = lang || 'es';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push(`/${currentLang}`);
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Logo Section */}
        <div className="flex flex-1 items-center justify-start">
          <Link href={`/${currentLang}`} className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-foreground">
              REBO <span className="text-muted-foreground font-medium">3D</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-12 text-sm font-medium">
          <Link href={`/${currentLang}/shop`} className="text-foreground/80 transition-colors hover:text-foreground">
            {dict.explore}
          </Link>
          <Link href={`/${currentLang}/gallery`} className="text-foreground/80 transition-colors hover:text-foreground">
            {dict.gallery}
          </Link>
          <Link href={`/${currentLang}/about`} className="text-foreground/80 transition-colors hover:text-foreground">
            {dict.about}
          </Link>
          <Link href={`/${currentLang}/support`} className="text-foreground/80 transition-colors hover:text-foreground">
            {dict.support}
          </Link>
        </div>

        {/* Actions Section */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LanguageSwitcher currentLang={currentLang} />
          <ThemeToggle />
          
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-full" })}>
                  <User className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-xs text-muted-foreground">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/${currentLang}/profile`} className="cursor-pointer w-full">Mi Perfil</Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link href={`/${currentLang}/admin`} className="cursor-pointer w-full">Panel Admin</Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={`/${currentLang}/login`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                {dict.login}
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="p-6 pt-12">
                <SheetTitle className="text-left font-bold mb-6">REBO 3D</SheetTitle>
                <div className="flex flex-col space-y-6 text-sm font-medium">
                  <Link href={`/${currentLang}/shop`} className="hover:text-primary transition-colors">{dict.explore}</Link>
                  <Link href={`/${currentLang}/gallery`} className="hover:text-primary transition-colors">{dict.gallery}</Link>
                  <Link href={`/${currentLang}/about`} className="hover:text-primary transition-colors">{dict.about}</Link>
                  <Link href={`/${currentLang}/support`} className="hover:text-primary transition-colors">{dict.support}</Link>
                  <div className="pt-4 border-t border-border">
                    {user ? (
                      <div className="flex flex-col space-y-4">
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                        <Link href={`/${currentLang}/profile`} className="hover:text-primary transition-colors text-sm font-medium">Mi Perfil</Link>
                        {user.role === 'admin' && (
                          <Link href={`/${currentLang}/admin`} className="hover:text-primary transition-colors text-sm font-medium">Panel Admin</Link>
                        )}
                        <Button variant="outline" onClick={handleSignOut} className="justify-start">Cerrar sesión</Button>
                      </div>
                    ) : (
                      <Link href={`/${currentLang}/login`} className={buttonVariants({ variant: "default", className: "w-full justify-center" })}>
                        {dict.login}
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
