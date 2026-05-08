import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieBanner } from "@/components/CookieBanner";
import { getDictionary } from "@/get-dictionary";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REBO 3D | El Futuro de la Luthería",
  description: "Configura. Imprime. Toca. REBO 3D es tu destino para impresión 3D de instrumentos High-End.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: "es" | "en" | "eu" }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar dictionary={dictionary} lang={lang} />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer dictionary={dictionary} />
          <CookieBanner dictionary={dictionary} />
        </ThemeProvider>
      </body>
    </html>
  );
}
