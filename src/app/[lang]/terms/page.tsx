import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/get-dictionary";

export const metadata = {
  title: "Términos y Condiciones | REBO 3D",
  description: "Términos y Condiciones de uso del servicio de impresión 3D y luthería de REBO 3D.",
};

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "es" | "en" | "eu");
  const dict = dictionary.terms;

  return (
    <div className="flex-1 w-full bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-4xl px-4 sm:px-8 py-16">
        
        <Link href={`/${lang}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {dict.back_home}
        </Link>

        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">{dict.title}</h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-muted-foreground">
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{dict.s1_title}</h2>
            <p>{dict.s1_p}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{dict.s2_title}</h2>
            <p>{dict.s2_p1}</p>
            <p className="mt-2">{dict.s2_p2}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{dict.s3_title}</h2>
            <p>{dict.s3_p1}</p>
            <p className="mt-2">{dict.s3_p2}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{dict.s4_title}</h2>
            <p>{dict.s4_p}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{dict.s5_title}</h2>
            <p>{dict.s5_p}</p>
          </section>

        </div>

      </div>
    </div>
  );
}
