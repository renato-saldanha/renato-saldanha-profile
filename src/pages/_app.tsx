import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SocialBar from "@/components/SocialBar";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedBackground from "@/components/AnimatedBackground";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Enable smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return(
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Header/>
      <main className="pt-6 relative z-10">
        <Component {...pageProps} />
      </main>
      <Footer/>
      <SocialBar/>
      <ScrollIndicator/>
    </div>
  )
}
