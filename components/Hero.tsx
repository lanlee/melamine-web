"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  { num: "3,000", unit: "MT", en: "Monthly Volume", zh: "月发货量" },
  { num: "40", unit: "+", en: "Countries Served", zh: "服务国家" },
  { num: "15", unit: "+", en: "Years Experience", zh: "行业经验" },
  { num: "99.8", unit: "%", en: "Purity Grade", zh: "纯度等级" },
];

interface HeroProps {
  lang: "en" | "zh";
}

export default function Hero({ lang }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const colors = ["rgba(96,239,255,", "rgba(167,139,250,", "rgba(52,211,153,"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.4 + 0.1),
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();
      });
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(96,239,255,0.07)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_70%,rgba(167,139,250,0.05)_0%,transparent_60%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#60efff]/25 bg-[#60efff]/8 text-[#60efff] text-xs font-bold tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#60efff] animate-pulse" />
          {lang === "en" ? "South China's #1 Melamine Wholesaler" : "华南第一三聚氰胺批发商"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-7xl lg:text-[96px] font-black leading-[1.02] tracking-[-3px] mb-8"
        >
          {lang === "en" ? (
            <>
              Global Melamine<br />
              <span className="gradient-text">Supply Leader</span>
            </>
          ) : (
            <>
              全球三聚氰胺<br />
              <span className="gradient-text">供应领导者</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#7a8eaa] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {lang === "en"
            ? "3,000+ metric tons shipped per month. Industrial-grade melamine powder and resin — trusted by manufacturers across 40+ countries."
            : "每月发货3,000+公吨。工业级三聚氰胺粉末和树脂——受到40多个国家制造商的信赖。"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-[#60efff] text-[#04070f] font-bold text-base hover:opacity-90 transition-all duration-200 shadow-[0_0_40px_rgba(96,239,255,0.35)] hover:shadow-[0_0_60px_rgba(96,239,255,0.5)] hover:-translate-y-0.5"
          >
            {lang === "en" ? "Request a Quote →" : "申请报价 →"}
          </a>
          <a
            href="#applications"
            className="px-8 py-4 rounded-full border border-white/10 text-white font-semibold text-base hover:border-[#60efff]/40 hover:text-[#60efff] transition-all duration-200"
          >
            {lang === "en" ? "Explore Applications" : "探索应用"}
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 border border-[rgba(96,239,255,0.1)] rounded-2xl overflow-hidden bg-[#080e1d]/60 backdrop-blur-xl glow-cyan"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-7 px-6 text-center ${
                i < stats.length - 1 ? "border-r border-[rgba(96,239,255,0.08)] lg:border-r-[rgba(96,239,255,0.08)]" : ""
              } ${i === 2 ? "border-r-0 lg:border-r border-b border-b-[rgba(96,239,255,0.08)] lg:border-b-0" : ""} ${
                i < 2 ? "border-b border-b-[rgba(96,239,255,0.08)] lg:border-b-0" : ""
              }`}
            >
              <div className="text-4xl font-black text-[#60efff] leading-none tracking-tight mb-1">
                {s.num}<span className="text-xl text-[#60efff]/60 ml-0.5">{s.unit}</span>
              </div>
              <div className="text-xs text-[#7a8eaa] font-medium mt-2">
                {lang === "en" ? s.en : s.zh}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#7a8eaa]">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#60efff] animate-scroll-line" />
        <span className="text-[10px] tracking-[3px] uppercase font-medium">
          {lang === "en" ? "Scroll" : "滚动"}
        </span>
      </div>
    </section>
  );
}
