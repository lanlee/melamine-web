"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AboutProps { lang: "en" | "zh"; }

const features = [
  {
    en: "Largest in South China",
    zh: "华南规模最大",
    sub_en: "Unmatched regional capacity & stock depth",
    sub_zh: "无与伦比的区域产能和库存深度",
  },
  {
    en: "Direct Factory Access",
    zh: "直接工厂接入",
    sub_en: "Partnered with China's top melamine producers",
    sub_zh: "与中国顶级三聚氰胺生产商合作",
  },
  {
    en: "Global Logistics",
    zh: "全球物流网络",
    sub_en: "Guangzhou · Shenzhen · Shanghai ports",
    sub_zh: "广州港·深圳港·上海港",
  },
];

export default function About({ lang }: AboutProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 bg-[#f8faff]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Molecule card */}
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-200/40 to-violet-200/30 blur-2xl" />
              <div className="relative bg-white border border-slate-200 rounded-3xl p-10 flex flex-col items-center gap-6 shadow-[0_8px_40px_rgba(14,165,233,0.1),0_2px_8px_rgba(0,0,0,0.04)]">
                <svg
                  viewBox="0 0 300 300"
                  className="w-52 h-52 animate-slow-spin"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="nGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  {/* Ring bonds */}
                  {[
                    [150, 80, 220, 150], [220, 150, 190, 240], [190, 240, 110, 240],
                    [110, 240, 80, 150], [80, 150, 150, 80],
                  ].map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
                  ))}
                  {/* NH2 branches */}
                  {[
                    [150, 80, 150, 28], [220, 150, 268, 118],
                    [190, 240, 222, 282], [110, 240, 78, 282], [80, 150, 32, 118],
                  ].map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#8b5cf6" strokeWidth="1.5" opacity="0.7" />
                  ))}
                  {/* Ring nodes */}
                  {[[150,80,"N"],[220,150,"C"],[190,240,"N"],[110,240,"C"],[80,150,"N"]].map(([cx,cy,label], i) => (
                    <g key={i}>
                      <circle cx={cx as number} cy={cy as number} r="14" fill="url(#nGrad)" filter="url(#glow)" />
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
                        fill="white" fontSize="9" fontWeight="700">{label}</text>
                    </g>
                  ))}
                  {/* NH2 nodes */}
                  {[[150,28],[268,118],[222,282],[78,282],[32,118]].map(([cx,cy], i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="11" fill="#8b5cf6" filter="url(#glow)" />
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
                        fill="white" fontSize="6" fontWeight="600">NH₂</text>
                    </g>
                  ))}
                </svg>
                <div className="text-center">
                  <div className="text-2xl font-black text-[#0ea5e9] tracking-tight">C₃H₆N₆</div>
                  <div className="text-sm text-slate-400 font-medium mt-1">Melamine · 三聚氰胺</div>
                </div>
              </div>
            </div>

            {/* Cert badges */}
            <div className="flex gap-4 flex-wrap justify-center">
              {[
                { top: "ISO", bot: "9001" },
                { top: "SGS", bot: "Verified" },
                { top: "REACH", bot: "Compliant" },
              ].map((badge) => (
                <div key={badge.top}
                  className="bg-white border border-slate-200 px-4 py-3 rounded-xl text-center shadow-sm"
                >
                  <div className="text-[#0ea5e9] font-bold text-sm">{badge.top}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{badge.bot}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#0ea5e9] mb-4">
              {lang === "en" ? "About the Company" : "公司简介"}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight text-slate-900 mb-6">
              {lang === "en" ? "Powering Industries Worldwide Since 2009" : "自2009年起为全球产业赋能"}
            </h2>
            <p className="text-slate-500 text-base leading-loose mb-4">
              {lang === "en"
                ? "Guangzhou WLY Material Co., Ltd (广州市文力源物资有限公司) is headquartered in Guangzhou, Guangdong — the heart of South China's chemical manufacturing belt. We are the region's largest melamine wholesaler, distributing over 3,000 metric tons each month to customers across Asia, Europe, the Americas, the Middle East, and Africa."
                : "广州市文力源物资有限公司总部位于广东广州——华南化工制造带的核心地带。我们是该地区最大的三聚氰胺批发商，每月向亚洲、欧洲、美洲、中东和非洲的客户分销超过3,000公吨。"}
            </p>
            <p className="text-slate-500 text-base leading-loose mb-10">
              {lang === "en"
                ? "Our supply chain is fully integrated: from upstream urea procurement to rigorous in-house QC. We offer flexible MOQs, sea and air freight, and dedicated export documentation support for every market."
                : "我们的供应链完全整合：从上游尿素采购到严格的内部质量控制。我们为每个市场提供灵活的最小订购量、海运和空运，以及专业的出口文件支持。"}
            </p>

            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 bg-white border border-slate-200 hover:border-sky-300 rounded-xl p-4 transition-colors duration-200 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 mb-0.5">{lang === "en" ? f.en : f.zh}</div>
                    <div className="text-slate-400 text-xs">{lang === "en" ? f.sub_en : f.sub_zh}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
