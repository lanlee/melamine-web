"use client";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", en: "About", zh: "关于我们" },
  { href: "#products", en: "Products", zh: "产品" },
  { href: "#applications", en: "Applications", zh: "应用" },
  { href: "#why-us", en: "Why Us", zh: "优势" },
];

interface NavProps {
  lang: "en" | "zh";
  toggleLang: () => void;
}

export default function Nav({ lang, toggleLang }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#04070f]/95 backdrop-blur-2xl border-b border-[rgba(96,239,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 bg-[#60efff] rounded-lg flex items-center justify-center text-[#04070f] font-black text-sm tracking-tight">
            WLY
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-white leading-tight">Guangzhou WLY Material Co., Ltd</div>
            <div className="text-xs text-[#60efff]/70 font-medium">广州WLY材料有限公司</div>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 ml-auto list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-[#7a8eaa] hover:text-white font-medium transition-colors duration-200"
              >
                {lang === "en" ? l.en : l.zh}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="text-sm font-bold bg-[#60efff] text-[#04070f] px-5 py-2 rounded-full hover:opacity-85 transition-opacity duration-200"
            >
              {lang === "en" ? "Contact Us" : "联系我们"}
            </a>
          </li>
        </ul>

        {/* Lang toggle */}
        <button
          onClick={toggleLang}
          className="ml-auto lg:ml-4 border border-[rgba(96,239,255,0.2)] text-[#7a8eaa] hover:text-[#60efff] hover:border-[#60efff]/40 text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 flex-shrink-0"
        >
          {lang === "en" ? "中文" : "English"}
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="lg:hidden ml-2 flex flex-col gap-1.5 p-1"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-b border-[rgba(96,239,255,0.1)] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-[#7a8eaa] hover:text-white font-medium transition-colors"
            >
              {lang === "en" ? l.en : l.zh}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-base font-bold text-[#60efff] border border-[#60efff]/30 px-5 py-3 rounded-xl text-center"
          >
            {lang === "en" ? "Contact Us" : "联系我们"}
          </a>
        </div>
      )}
    </nav>
  );
}
