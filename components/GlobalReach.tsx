"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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

// Destination points on the simplified globe SVG [cx, cy]
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
    <section className="py-28 bg-[#06080f]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#60efff] mb-4">
              {lang === "en" ? "Global Reach" : "全球覆盖"}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
              {lang === "en" ? "From Guangzhou to the World" : "从广州到全球"}
            </h2>
            <p className="text-[#7a8eaa] text-base leading-loose mb-8">
              {lang === "en"
                ? "Shipping via Nansha Port (Guangzhou) and Yantian Port (Shenzhen) with direct ocean freight routes to Southeast Asia, Europe, North America, the Middle East, and Africa."
                : "通过广州南沙港和深圳盐田港发货，直达东南亚、欧洲、北美、中东和非洲的海运航线。"}
            </p>
            <div className="flex flex-wrap gap-3">
              {regions.map((r) => (
                <div key={r.en}
                  className="flex items-center gap-2 bg-[#080e1d] border border-[rgba(96,239,255,0.1)] hover:border-[rgba(96,239,255,0.3)] px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-default"
                >
                  <span>{r.flag}</span>
                  <span>{lang === "en" ? r.en : r.zh}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="bg-[#080e1d] border border-[rgba(96,239,255,0.1)] rounded-xl p-5">
                <div className="text-2xl font-black text-[#60efff] mb-1">2–3 hrs</div>
                <div className="text-[#7a8eaa] text-xs">{lang === "en" ? "Quote response time" : "报价响应时间"}</div>
              </div>
              <div className="bg-[#080e1d] border border-[rgba(96,239,255,0.1)] rounded-xl p-5">
                <div className="text-2xl font-black text-[#60efff] mb-1">15+ yrs</div>
                <div className="text-[#7a8eaa] text-xs">{lang === "en" ? "Export experience" : "出口经验"}</div>
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
              <div className="absolute inset-0 rounded-full bg-[#60efff]/5 blur-3xl" />
              <svg viewBox="0 0 360 360" className="w-72 h-72 sm:w-[360px] sm:h-[360px]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="globeG" cx="38%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#1e3a5f"/>
                    <stop offset="100%" stopColor="#04070f"/>
                  </radialGradient>
                  <clipPath id="globe-clip">
                    <circle cx="180" cy="180" r="155"/>
                  </clipPath>
                </defs>

                {/* Globe sphere */}
                <circle cx="180" cy="180" r="155" fill="url(#globeG)" stroke="rgba(96,239,255,0.2)" strokeWidth="1"/>

                {/* Grid lines clipped to sphere */}
                <g clipPath="url(#globe-clip)" opacity="0.25">
                  {/* Latitude */}
                  {[0.25, 0.5, 0.75].map((t, i) => {
                    const ry = 155 * t;
                    const rx = Math.sqrt(155*155 - (155*t - 155*0.5 + 155*0.5 - 155*t)*(155*t - 155*0.5 + 155*0.5 - 155*t));
                    const cy = 25 + 155 * (1 - t) * 2;
                    return <ellipse key={i} cx="180" cy={180 - 155 + 155*2*t} rx={Math.sqrt(Math.max(0, 155*155 - Math.pow(155 - 155*2*t, 2)))} ry={155*0.32} fill="none" stroke="#60efff" strokeWidth="0.8"/>;
                  })}
                  {/* Longitude */}
                  <line x1="180" y1="25" x2="180" y2="335" stroke="#60efff" strokeWidth="0.8"/>
                  <path d="M 105 45 Q 180 180 105 315" fill="none" stroke="#60efff" strokeWidth="0.8"/>
                  <path d="M 255 45 Q 180 180 255 315" fill="none" stroke="#60efff" strokeWidth="0.8"/>
                </g>

                {/* Guangzhou pulsing dot */}
                <circle cx="265" cy="178" r="20" fill="#60efff" opacity="0.06" className="animate-pulse-ring"/>
                <circle cx="265" cy="178" r="8" fill="#60efff" opacity="0.8"/>
                <circle cx="265" cy="178" r="4" fill="#fff"/>
                <text x="275" y="170" fill="#60efff" fontSize="10" fontWeight="700">GZ</text>

                {/* Connection lines */}
                {destinations.map((d, i) => (
                  <g key={i}>
                    <line
                      x1="265" y1="178" x2={d.cx} y2={d.cy}
                      stroke="#60efff" strokeWidth="1" opacity="0.35"
                      strokeDasharray="4 4"
                    />
                    <circle cx={d.cx} cy={d.cy} r="5" fill="#a78bfa" opacity="0.9"/>
                    <circle cx={d.cx} cy={d.cy} r="9" fill="#a78bfa" opacity="0.12"/>
                    <text x={d.cx + 8} y={d.cy + 4} fill="#a78bfa" fontSize="8" fontWeight="600">{d.label}</text>
                  </g>
                ))}
              </svg>
              <div className="text-center mt-3 text-xs text-[#60efff] font-bold tracking-widest uppercase">
                {lang === "en" ? "Guangzhou, China · Export Hub" : "中国广州 · 出口中心"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
