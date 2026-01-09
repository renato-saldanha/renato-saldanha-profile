import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SocialBar from "@/components/SocialBar";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedBackground from "@/components/AnimatedBackground";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Enable smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return(
    <div className={`min-h-screen relative ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <AnimatedBackground />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Pular para o conteúdo principal
      </a>
      <Header/>
      <AnimatePresence mode="wait">
        <motion.main
          key={router.pathname}
          id="main-content"
          className="pt-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
      <Footer/>
      <SocialBar/>
      <ScrollIndicator/>
    </div>
  )
}
