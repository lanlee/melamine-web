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
          ? "bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-sm"
          : "bg-white/70 backdrop-blur-xl border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-11 h-11 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-full flex items-center justify-center text-white font-black text-xl">
            HC
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-slate-900 leading-tight">Guangdong HC Material Co., Ltd</div>
            <div className="text-xs text-[#6366f1] font-medium">广东翰成物资有限公司</div>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 ml-auto list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors duration-200"
              >
                {lang === "en" ? l.en : l.zh}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="text-sm font-bold bg-[#6366f1] text-white px-5 py-2 rounded-full hover:bg-[#4f46e5] transition-colors duration-200"
            >
              {lang === "en" ? "Contact Us" : "联系我们"}
            </a>
          </li>
        </ul>

        {/* Lang toggle */}
        <button
          onClick={toggleLang}
          className="ml-auto lg:ml-4 border border-slate-200 text-slate-500 hover:text-[#6366f1] hover:border-[#6366f1]/40 text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 flex-shrink-0 bg-white"
        >
          {lang === "en" ? "中文" : "English"}
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="lg:hidden ml-2 flex flex-col gap-1.5 p-1"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-lg px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {lang === "en" ? l.en : l.zh}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-base font-bold text-[#6366f1] border border-[#6366f1]/30 px-5 py-3 rounded-xl text-center hover:bg-indigo-50 transition-colors"
          >
            {lang === "en" ? "Contact Us" : "联系我们"}
          </a>
        </div>
      )}
    </nav>
  );
}
