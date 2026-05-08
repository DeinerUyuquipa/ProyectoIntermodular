"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.5 5 4.6 4.6 6.7 4.2 12 4.2 12 4.2s5.3 0 7.4.4c2.1.4 2.1 2.5 2.1 2.5s.4 2.1.4 4.8v1.6c0 2.7-.4 4.8-.4 4.8s0 2.1-2.1 2.5c-2.1.4-7.4.4-7.4.4s-5.3 0-7.4-.4C2.5 18.6 2.5 16.5 2.5 16.5S2.1 14.4 2.1 11.7V10.1C2.1 7.4 2.5 7.1 2.5 7.1z"/><polygon points="9.7 14.3 15.3 11 9.7 7.7 9.7 14.3"/></svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-8-8v10z"/></svg>
);

export function Footer({ dictionary }: { dictionary?: any }) {
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] || 'es';

  const dict = dictionary?.footer || {
    description: "Trascendiendo la luthería tradicional mediante ingeniería de precisión e impresión 3D.",
    rights: "Todos los derechos reservados.",
    legal: "Legal y Soporte",
    returns: "Envíos y Devoluciones",
    terms: "Términos y Condiciones",
    privacy: "Política de Privacidad",
    follow: "Síguenos",
    community: "Únete a nuestra comunidad de creadores y luthiers."
  };

  return (
    <footer className="border-t border-border bg-background py-12 mt-auto transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col space-y-4">
            <span className="text-xl font-bold tracking-tight text-foreground">
              REBO <span className="text-muted-foreground font-medium">3D</span>
            </span>
            <p className="text-sm text-muted-foreground">
              {dict.description}
            </p>
            <div className="text-sm text-muted-foreground pt-4">
              &copy; {new Date().getFullYear()} REBO 3D. {dict.rights}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col space-y-3 md:items-center">
            <h4 className="text-foreground font-semibold mb-2">{dict.legal}</h4>
            <Link href={`/${currentLang}/returns`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {dict.returns}
            </Link>
            <Link href={`/${currentLang}/terms`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {dict.terms}
            </Link>
            <Link href={`/${currentLang}/privacy`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {dict.privacy}
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex flex-col space-y-4 md:items-end">
            <h4 className="text-foreground font-semibold mb-2">{dict.follow}</h4>
            <div className="flex space-x-4">
              <Link href="http://instagram.com/rebo.3d/" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <InstagramIcon className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.youtube.com/channel/UC6fMXKPdJ9ubUefAQF2y8Bg" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <YoutubeIcon className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="https://www.tiktok.com/@reboo3d" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <TiktokIcon className="w-5 h-5" />
                <span className="sr-only">TikTok</span>
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61572328940226" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <FacebookIcon className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="mailto:rebolero3d@gmail.com" className="p-2 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Mail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-2 max-w-[200px] text-right">
              {dict.community}
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
