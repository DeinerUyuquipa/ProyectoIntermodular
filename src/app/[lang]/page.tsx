import { Hero } from "@/components/home/Hero";
import { Narrative } from "@/components/home/Narrative";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { getDictionary } from "@/get-dictionary";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "es" | "en" | "eu");

  return (
    <SmoothScrolling>
      <Hero dictionary={dictionary} lang={lang} />
      <Narrative dictionary={dictionary} />
    </SmoothScrolling>
  );
}
