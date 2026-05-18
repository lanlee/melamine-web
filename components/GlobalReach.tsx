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

// Guangzhou: upper-right region of globe (East Asia)
const GZ = { cx: 258, cy: 162 };

// Bezier arc routes from GZ to each world region
const routes = [
  { cx: 284, cy: 220, label: "SEA", delay: 0.2, d: "M 258 162 Q 308 142 284 220" },
  { cx: 148, cy: 148, label: "ME",  delay: 0.5, d: "M 258 162 Q 232 88  148 148" },
  { cx: 78,  cy: 108, label: "EU",  delay: 0.8, d: "M 258 162 Q 175 50  78  108" },
  { cx: 50,  cy: 190, label: "US",  delay: 1.1, d: "M 258 162 Q 145 90  50  190" },
  { cx: 122, cy: 258, label: "AF",  delay: 1.4, d: "M 258 162 Q 168 252 122 258" },
  { cx: 295, cy: 272, label: "OC",  delay: 1.7, d: "M 258 162 Q 310 240 295 272" },
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
            <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#6366f1] mb-4">
              {lang === "en" ? "Global Reach" : "全球覆盖"}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
              {lang === "en" ? "From Guangzhou to the World" : "从广州到全球"}
            </h2>
            <p className="text-slate-500 text-base leading-loose mb-8">
              {lang === "en"
                ? "Shipping via all major Chinese ports with direct ocean freight routes to Southeast Asia, Europe, North America, the Middle East, and Africa."
                : "通过中国所有主要港口发货，直达东南亚、欧洲、北美、中东和非洲的海运航线。"}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {regions.map((r) => (
                <div key={r.en}
                  className="flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 px-4 py-2 rounded-full text-sm font-medium text-slate-600 transition-all duration-200 cursor-default"
                >
                  <span>{r.flag}</span>
                  <span>{lang === "en" ? r.en : r.zh}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="text-2xl font-black text-[#6366f1] mb-1">2–3 hrs</div>
                <div className="text-slate-400 text-xs">{lang === "en" ? "Quote response time" : "报价响应时间"}</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="text-2xl font-black text-[#6366f1] mb-1">25+ yrs</div>
                <div className="text-slate-400 text-xs">{lang === "en" ? "Export experience" : "出口经验"}</div>
              </div>
            </div>
          </motion.div>

          {/* Spinning Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-indigo-100 blur-3xl opacity-70" />
              <svg
                viewBox="0 0 360 360"
                className="w-72 h-72 sm:w-90 sm:h-90 relative"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="globeGrad" cx="36%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#e0e7ff" />
                    <stop offset="55%" stopColor="#c7d2fe" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </radialGradient>
                  <clipPath id="globeClip">
                    <circle cx="180" cy="180" r="150" />
                  </clipPath>
                </defs>

                {/* Sphere */}
                <circle cx="180" cy="180" r="150" fill="url(#globeGrad)" />

                {/* Spinning longitude lines */}
                <g clipPath="url(#globeClip)">
                  {[0, 30, 60, 90, 120, 150].map((angle) => {
                    const rx = Math.max(2, 150 * Math.abs(Math.sin((angle * Math.PI) / 180)));
                    return (
                      <ellipse
                        key={angle}
                        cx="180" cy="180"
                        rx={rx} ry="150"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="0.8"
                        opacity="0.28"
                      />
                    );
                  })}
                </g>

                {/* Static latitude lines */}
                <g clipPath="url(#globeClip)">
                  {[-60, -30, 0, 30, 60].map((lat) => {
                    const rad = (lat * Math.PI) / 180;
                    const y = 180 + 150 * Math.sin(rad);
                    const rx = 150 * Math.cos(rad);
                    return (
                      <ellipse
                        key={lat}
                        cx="180" cy={y}
                        rx={rx} ry={rx * 0.22}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth={lat === 0 ? "1" : "0.7"}
                        opacity={lat === 0 ? 0.4 : 0.25}
                      />
                    );
                  })}
                </g>

                {/* Sphere rim */}
                <circle cx="180" cy="180" r="150" fill="none" stroke="#818cf8" strokeWidth="1.5" />
                {/* Specular highlight */}
                <ellipse cx="148" cy="146" rx="30" ry="20" fill="white" opacity="0.1" transform="rotate(-30 148 146)" />

                {/* Animated arc routes from Guangzhou */}
                {inView && routes.map((route) => (
                  <motion.path
                    key={route.label}
                    d={route.d}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    opacity={0.65}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, delay: route.delay, ease: "easeOut" }}
                  />
                ))}

                {/* Destination dots — appear after arc finishes */}
                {inView && routes.map((route) => (
                  <motion.g
                    key={`d-${route.label}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: route.delay + 1.35 }}
                  >
                    <circle cx={route.cx} cy={route.cy} r="12" fill="#6366f1" opacity="0.13" />
                    <circle cx={route.cx} cy={route.cy} r="5" fill="#6366f1" />
                    <circle cx={route.cx} cy={route.cy} r="2.2" fill="white" />
                    <text x={route.cx + 8} y={route.cy + 4} fill="#4f46e5" fontSize="8" fontWeight="700">
                      {route.label}
                    </text>
                  </motion.g>
                ))}

                {/* Guangzhou origin — pulsing ring */}
                <motion.circle
                  cx={GZ.cx} cy={GZ.cy} r="20"
                  fill="#6366f1"
                  animate={{ opacity: [0.08, 0.22, 0.08] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <circle cx={GZ.cx} cy={GZ.cy} r="9" fill="#6366f1" />
                <circle cx={GZ.cx} cy={GZ.cy} r="4" fill="white" />
                <text x={GZ.cx + 12} y={GZ.cy + 4} fill="#4f46e5" fontSize="10" fontWeight="800">GZ</text>
              </svg>

              <div className="text-center mt-3 text-xs text-[#6366f1] font-bold tracking-widest uppercase">
                {lang === "en" ? "Guangzhou, China · Export Hub" : "中国广州 · 出口中心"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
