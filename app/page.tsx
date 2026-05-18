"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Products from "@/components/Products";
import Applications from "@/components/Applications";
import WhyUs from "@/components/WhyUs";
import GlobalReach from "@/components/GlobalReach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "zh" : "en"));

  return (
    <>
      <Nav lang={lang} toggleLang={toggleLang} />
      <Hero lang={lang} />
      <Ticker />
      <About lang={lang} />
      <Products lang={lang} />
      <Applications lang={lang} />
      <WhyUs lang={lang} />
      <GlobalReach lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
