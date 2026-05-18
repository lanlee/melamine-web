"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WhyProps { lang: "en" | "zh"; }

const reasons = [
  {
    num: "01",
    en: "Scale & Reliability",
    zh: "规模与可靠性",
    desc_en: "3,000 MT/month output backed by a 5,000+ MT buffer warehouse. No supply disruptions, no delays — ever.",
    desc_zh: "每月3,000公吨产量，5,000+公吨缓冲仓储支撑。永不中断供应，永无延误。",
  },
  {
    num: "02",
    en: "Competitive Pricing",
    zh: "有竞争力的价格",
    desc_en: "Direct factory relationships and bulk procurement give us structural cost advantages consistently below market benchmarks.",
    desc_zh: "直接工厂关系和批量采购使我们拥有持续低于市场基准的结构性成本优势。",
  },
  {
    num: "03",
    en: "Certified Quality",
    zh: "认证质量",
    desc_en: "Every batch tested in-house and verified by SGS/Intertek. Full COA, MSDS, and customs documentation on every shipment.",
    desc_zh: "每批货物均经内部检测和SGS/Intertek验证。每批货物均提供完整分析证书、安全数据表和海关文件。",
  },
  {
    num: "04",
    en: "Export Expertise",
    zh: "出口专业知识",
    desc_en: "15+ years of export experience. We handle HS codes, REACH declarations, fumigation, and LC/TT payments seamlessly.",
    desc_zh: "15年以上出口经验。我们无缝处理HS编码、REACH声明、熏蒸和信用证/电汇付款。",
  },
  {
    num: "05",
    en: "Flexible Packaging",
    zh: "灵活包装",
    desc_en: "25 kg woven bags, 500 kg jumbo bags, or bulk container. Custom labeling. We adapt to your logistics requirements.",
    desc_zh: "25公斤编织袋、500公斤集装袋或散装集装箱。可定制标签。我们根据您的物流需求调整。",
  },
  {
    num: "06",
    en: "Responsive Team",
    zh: "响应迅速的团队",
    desc_en: "Bilingual (EN/ZH) sales team, 6 days a week. Quotes within 2 hours. Samples dispatched within 48 hours.",
    desc_zh: "英中双语销售团队，每周6天。2小时内报价。48小时内发货样品。",
  },
];

export default function WhyUs({ lang }: WhyProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-us" className="py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28"
          >
            <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#0ea5e9] mb-4">
              {lang === "en" ? "Why Choose HC" : "为什么选择瀚成"}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
              {lang === "en" ? "The Competitive Edge You Need" : "您需要的竞争优势"}
            </h2>
            <p className="text-slate-500 text-base leading-loose mb-8">
              {lang === "en"
                ? "15+ years of export excellence. One partner for sourcing, QC, logistics, and documentation."
                : "15年以上出口卓越经验。采购、质控、物流和文件的一站式合作伙伴。"}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-bold bg-[#0ea5e9] text-white px-6 py-3 rounded-full hover:bg-sky-600 transition-colors shadow-[0_4px_20px_rgba(14,165,233,0.3)]"
            >
              {lang === "en" ? "Get a Quote" : "获取报价"} →
            </a>
          </motion.div>

          {/* Right grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 card-hover shadow-sm"
              >
                <div className="text-5xl font-black text-slate-100 mb-3 leading-none tracking-tighter select-none">
                  {r.num}
                </div>
                <h4 className="font-bold text-base text-slate-900 mb-2">{lang === "en" ? r.en : r.zh}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {lang === "en" ? r.desc_en : r.desc_zh}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
