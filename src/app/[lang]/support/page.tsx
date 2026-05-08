"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Plus, Minus } from "lucide-react";

export default function SupportPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const [dict, setDict] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const loadDict = async () => {
      let d;
      if (lang === 'en') d = await import('@/dictionaries/en.json');
      else if (lang === 'eu') d = await import('@/dictionaries/eu.json');
      else d = await import('@/dictionaries/es.json');
      setDict(d.default.support);
    };
    loadDict();
  }, [lang]);

  if (!dict) return null;

  return (
    <div className="flex-1 w-full bg-secondary bg-opacity-30">
      <div className="container mx-auto max-w-5xl px-4 sm:px-8 py-16">
        
        <div className="max-w-2xl mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{dict.title}</h1>
          <p className="text-lg text-muted-foreground">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* FAQs */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">{dict.faq_title}</h2>
              <div className="space-y-4">
                {dict.faqs.map((faq: any, idx: number) => (
                  <div key={idx} className="border border-border/60 bg-card rounded-lg overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex justify-between items-center p-5 text-left font-semibold text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      {faq.question}
                      {openFaq === idx ? <Minus className="h-4 w-4 text-muted-foreground" /> : <Plus className="h-4 w-4 text-muted-foreground" />}
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/40 pt-4">
                         {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 border border-border/50 rounded-2xl shadow-xl shadow-primary/5">
            <h2 className="text-2xl font-bold mb-2">{dict.contact_title}</h2>
            <p className="text-muted-foreground text-sm mb-8">{dict.contact_subtitle}</p>
            
            {sent ? (
              <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{dict.sent_title}</h3>
                <p className="text-muted-foreground">{dict.sent_desc}</p>
                <Button variant="outline" onClick={() => setSent(false)} className="mt-4">
                  {dict.send_another}
                </Button>
              </div>
            ) : (
              <form 
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{dict.name_label}</label>
                  <Input required placeholder={dict.name_placeholder} className="bg-secondary/20 h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{dict.email_label}</label>
                  <Input required type="email" placeholder={dict.email_placeholder} className="bg-secondary/20 h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{dict.message_label}</label>
                  <textarea 
                    required 
                    placeholder={dict.message_placeholder} 
                    className="flex min-h-[120px] w-full rounded-md border border-border bg-secondary/20 px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
                <Button type="submit" className="w-full h-12 font-bold text-md mt-4">
                  {dict.send}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
