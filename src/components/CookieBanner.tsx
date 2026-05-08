"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { usePathname } from "next/navigation";

export function CookieBanner({ dictionary }: { dictionary?: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] || 'es';

  // Cookie preferences
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  // fix author
  const dict = dictionary?.cookie || {
    title: "Valoramos tu privacidad",
    description: "Utilizamos cookies propias y de terceros para mejorar tu experiencia en nuestra web, analizar el tráfico y personalizar el contenido. Puedes aceptar todas las cookies, rechazarlas o configurar tus preferencias. Para más información, lee nuestra ",
    privacy_link: "Política de Privacidad",
    reject: "Rechazar",
    options: "Opciones",
    accept: "Aceptar Todo",
    preferences_title: "Preferencias de Privacidad",
    preferences_desc: "Personaliza cómo utilizamos tus datos. Las cookies esenciales no se pueden desactivar ya que son necesarias para el funcionamiento de la web.",
    essential_title: "Esenciales (Estrictamente necesarias)",
    essential_desc: "Garantizan funciones básicas y la seguridad de la web.",
    analytics_title: "Analíticas",
    analytics_desc: "Nos ayudan a entender cómo interactúas con la web de forma anónima para mejorarla.",
    marketing_title: "Marketing y Publicidad",
    marketing_desc: "Se utilizan para rastrear a los visitantes y mostrar anuncios relevantes y atractivos.",
    back: "Volver",
    save: "Guardar Preferencias"
  };

  useEffect(() => {
    const cookieChoice = localStorage.getItem("rebo-cookie-consent");
    if (!cookieChoice) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("rebo-cookie-consent", JSON.stringify({ essential: true, analytics: true, marketing: true }));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("rebo-cookie-consent", JSON.stringify({ essential: true, analytics: false, marketing: false }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("rebo-cookie-consent", JSON.stringify({ essential: true, analytics, marketing }));
    setIsVisible(false);
  };

  // Custom Toggle Component
  const Toggle = ({ checked, onChange, disabled = false }: { checked: boolean; onChange?: (c: boolean) => void; disabled?: boolean }) => (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${checked ? "bg-primary" : "bg-muted"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? "translate-x-2.5" : "-translate-x-2.5"
          }`}
      />
    </button>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none"
        >
          <div className="bg-card text-card-foreground border border-border shadow-2xl rounded-2xl p-6 max-w-4xl w-full pointer-events-auto flex flex-col gap-6">

            {!showOptions ? (
              // Main Banner View
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start md:items-center gap-4">
                  <div className="hidden md:flex p-3 bg-secondary rounded-full text-foreground shrink-0">
                    <Cookie className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{dict.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-xl">
                      {dict.description}
                      <Link href={`/${currentLang}/privacy`} className="underline hover:text-primary transition-colors">
                        {dict.privacy_link}
                      </Link>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <Button variant="ghost" onClick={handleRejectAll} className="w-full sm:w-auto">
                    {dict.reject}
                  </Button>
                  <Button variant="outline" onClick={() => setShowOptions(true)} className="w-full sm:w-auto">
                    {dict.options}
                  </Button>
                  <Button onClick={handleAcceptAll} className="w-full sm:w-auto">
                    {dict.accept}
                  </Button>
                </div>
              </div>
            ) : (
              // Options View
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h3 className="font-bold text-xl mb-2">{dict.preferences_title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {dict.preferences_desc}
                  </p>
                </div>

                <div className="space-y-4 border-y border-border py-4">

                  {/* Essential Cookies */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{dict.essential_title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{dict.essential_desc}</p>
                    </div>
                    <Toggle checked={true} disabled={true} />
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{dict.analytics_title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{dict.analytics_desc}</p>
                    </div>
                    <Toggle checked={analytics} onChange={setAnalytics} />
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{dict.marketing_title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{dict.marketing_desc}</p>
                    </div>
                    <Toggle checked={marketing} onChange={setMarketing} />
                  </div>

                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost" onClick={() => setShowOptions(false)}>
                    {dict.back}
                  </Button>
                  <Button onClick={handleSavePreferences}>
                    {dict.save}
                  </Button>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
