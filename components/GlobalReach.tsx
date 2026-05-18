"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GlobalProps { lang: "en" | "zh"; }

const regions = [
  { flag: "🇸🇬", en: "Southeast Asia", zh: "东南亚" },
  { flag: "🇩🇪", en: "Europe", zh: "欧洲" },
  { flag: "🇺🇸", en: "Americas", zh: "美洲" },
  { flag: "🇦🇪", en: "Middle East", zh: "中东" },
  { flag: "🇿🇦", en: "Africa", zh: "非洲" },
  { flag: "🇦🇺", en: "Oceania", zh: "大洋洲" },
];

const destinations = [
  { cx: 145, cy: 195, label: "EU" },
  { cx: 95, cy: 145, label: "US" },
  { cx: 250, cy: 195, label: "SEA" },
  { cx: 195, cy: 245, label: "AF" },
  { cx: 230, cy: 145, label: "ME" },
];

export default function GlobalReach({ lang }: GlobalProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 bg-[#f8faff]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#0ea5e9] mb-4">
              {lang === "en" ? "Global Reach" : "全球覆盖"}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
              {lang === "en" ? "From Guangzhou to the World" : "从广州到全球"}
            </h2>
            <p className="text-slate-500 text-base leading-loose mb-8">
              {lang === "en"
                ? "Shipping via Nansha Port (Guangzhou) and Yantian Port (Shenzhen) with direct ocean freight routes to Southeast Asia, Europe, North America, the Middle East, and Africa."
                : "通过广州南沙港和深圳盐田港发货，直达东南亚、欧洲、北美、中东和非洲的海运航线。"}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {regions.map((r) => (
                <div key={r.en}
                  className="flex items-center gap-2 bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 px-4 py-2 rounded-full text-sm font-medium text-slate-600 transition-all duration-200 cursor-default shadow-sm"
                >
                  <span>{r.flag}</span>
                  <span>{lang === "en" ? r.en : r.zh}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="text-2xl font-black text-[#0ea5e9] mb-1">2–3 hrs</div>
                <div className="text-slate-400 text-xs">{lang === "en" ? "Quote response time" : "报价响应时间"}</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="text-2xl font-black text-[#0ea5e9] mb-1">15+ yrs</div>
                <div className="text-slate-400 text-xs">{lang === "en" ? "Export experience" : "出口经验"}</div>
              </div>
            </div>
          </motion.div>

          {/* Globe visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-sky-100 blur-3xl opacity-60" />
              <svg viewBox="0 0 360 360" className="w-72 h-72 sm:w-[360px] sm:h-[360px] relative" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="globeG" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#e0f2fe"/>
                    <stop offset="100%" stopColor="#bae6fd"/>
                  </radialGradient>
                  <clipPath id="globe-clip">
                    <circle cx="180" cy="180" r="155"/>
                  </clipPath>
                </defs>

                {/* Globe sphere */}
                <circle cx="180" cy="180" r="155" fill="url(#globeG)" stroke="#7dd3fc" strokeWidth="1.5"/>

                {/* Grid lines */}
                <g clipPath="url(#globe-clip)" opacity="0.4">
                  {[0.25, 0.5, 0.75].map((t, i) => (
                    <ellipse key={i} cx="180" cy={180 - 155 + 155 * 2 * t}
                      rx={Math.sqrt(Math.max(0, 155 * 155 - Math.pow(155 - 155 * 2 * t, 2)))}
                      ry={155 * 0.32} fill="none" stroke="#38bdf8" strokeWidth="0.8"/>
                  ))}
                  <line x1="180" y1="25" x2="180" y2="335" stroke="#38bdf8" strokeWidth="0.8"/>
                  <path d="M 105 45 Q 180 180 105 315" fill="none" stroke="#38bdf8" strokeWidth="0.8"/>
                  <path d="M 255 45 Q 180 180 255 315" fill="none" stroke="#38bdf8" strokeWidth="0.8"/>
                </g>

                {/* Guangzhou pulsing dot */}
                <circle cx="265" cy="178" r="20" fill="#0ea5e9" opacity="0.12" className="animate-pulse-ring"/>
                <circle cx="265" cy="178" r="9" fill="#0ea5e9"/>
                <circle cx="265" cy="178" r="4" fill="white"/>
                <text x="275" y="170" fill="#0369a1" fontSize="10" fontWeight="700">GZ</text>

                {/* Connection lines */}
                {destinations.map((d, i) => (
                  <g key={i}>
                    <line x1="265" y1="178" x2={d.cx} y2={d.cy}
                      stroke="#0ea5e9" strokeWidth="1.2" opacity="0.4" strokeDasharray="4 4"/>
                    <circle cx={d.cx} cy={d.cy} r="6" fill="#8b5cf6" opacity="0.85"/>
                    <circle cx={d.cx} cy={d.cy} r="10" fill="#8b5cf6" opacity="0.1"/>
                    <text x={d.cx + 9} y={d.cy + 4} fill="#7c3aed" fontSize="8" fontWeight="600">{d.label}</text>
                  </g>
                ))}
              </svg>
              <div className="text-center mt-3 text-xs text-[#0ea5e9] font-bold tracking-widest uppercase">
                {lang === "en" ? "Guangzhou, China · Export Hub" : "中国广州 · 出口中心"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
