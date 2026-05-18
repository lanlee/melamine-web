"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProductsProps { lang: "en" | "zh"; }

const products = [
  {
    tag_en: "Best Seller", tag_zh: "畅销产品",
    featured: true,
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
        <polygon points="28,4 52,18 52,38 28,52 4,38 4,18" stroke="#0ea5e9" strokeWidth="1.5" fill="rgba(14,165,233,0.06)"/>
        <circle cx="28" cy="28" r="8" fill="rgba(14,165,233,0.2)"/>
        <circle cx="28" cy="28" r="4" fill="#0ea5e9"/>
      </svg>
    ),
    name_en: "Melamine Powder 99.8%",
    name_zh: "三聚氰胺粉末 99.8%",
    desc_en: "Premium purity melamine powder. Standard white crystalline form. The backbone of the laminate, adhesive, and coatings industries globally.",
    desc_zh: "高纯度三聚氰胺粉末。标准白色晶体形态。全球层压板、粘合剂和涂料行业的支柱原料。",
    specs: [
      { k: "Purity", v: "≥ 99.8%" }, { k: "Moisture", v: "≤ 0.1%" },
      { k: "Whiteness", v: "≥ 95" }, { k: "Packaging", v: "25 kg bags / Bulk" },
    ],
  },
  {
    tag_en: "", tag_zh: "",
    featured: false,
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
        <rect x="8" y="8" width="40" height="40" rx="4" stroke="#8b5cf6" strokeWidth="1.5" fill="rgba(139,92,246,0.06)"/>
        <rect x="16" y="16" width="24" height="24" rx="2" fill="rgba(139,92,246,0.12)"/>
        <circle cx="28" cy="28" r="5" fill="#8b5cf6"/>
      </svg>
    ),
    name_en: "Melamine Formaldehyde Resin",
    name_zh: "三聚氰胺甲醛树脂",
    desc_en: "Pre-condensed MF resin in liquid or powder form. Ideal for decorative laminates, particle board, plywood, and surface treatment applications.",
    desc_zh: "预缩合MF树脂（液态或粉末）。适用于装饰层压板、刨花板、胶合板和表面处理。",
    specs: [
      { k: "Solid Content", v: "50–70%" }, { k: "pH", v: "8.0–9.5" },
      { k: "Viscosity", v: "Custom" }, { k: "Packaging", v: "IBC / Drum" },
    ],
  },
  {
    tag_en: "", tag_zh: "",
    featured: false,
    icon: (
      <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
        <circle cx="28" cy="28" r="22" stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.06)"/>
        <path d="M17 28L24 35L39 20" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    name_en: "Industrial Grade Melamine",
    name_zh: "工业级三聚氰胺",
    desc_en: "Cost-effective industrial melamine for high-volume production. Suitable for concrete superplasticizers, fire retardants, and paper treatment.",
    desc_zh: "高性价比工业级三聚氰胺，适用于大批量生产。适用于混凝土超塑化剂、阻燃剂和纸张处理。",
    specs: [
      { k: "Purity", v: "≥ 99.5%" }, { k: "Moisture", v: "≤ 0.3%" },
      { k: "Form", v: "Powder" }, { k: "MOQ", v: "1 MT" },
    ],
  },
];

export default function Products({ lang }: ProductsProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#0ea5e9] mb-4">
            {lang === "en" ? "Our Products" : "我们的产品"}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            {lang === "en" ? "Industrial-Grade Melamine" : "工业级三聚氰胺"}
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            {lang === "en"
              ? "Every batch ships with full COA, MSDS, and SGS test reports."
              : "每批货物均附完整分析证书、安全数据表和SGS检测报告。"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative rounded-2xl border p-8 flex flex-col gap-5 card-hover ${
                p.featured
                  ? "border-sky-200 bg-gradient-to-br from-sky-50 to-white shadow-[0_8px_32px_rgba(14,165,233,0.12)]"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {p.tag_en && (
                <div className="absolute top-5 right-5 bg-[#0ea5e9] text-white text-[10px] font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(14,165,233,0.4)]">
                  {lang === "en" ? p.tag_en : p.tag_zh}
                </div>
              )}
              {p.icon}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{lang === "en" ? p.name_en : p.name_zh}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{lang === "en" ? p.desc_en : p.desc_zh}</p>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                {p.specs.map((s) => (
                  <div key={s.k} className="flex justify-between items-center bg-slate-50 rounded-lg px-4 py-2.5">
                    <span className="text-slate-400 text-xs font-medium">{s.k}</span>
                    <span className="text-[#0ea5e9] text-xs font-bold">{s.v}</span>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-2 block text-center border border-slate-200 hover:border-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white text-slate-600 text-sm font-bold py-3 rounded-xl transition-all duration-200"
              >
                {lang === "en" ? "Inquire Now →" : "立即询价 →"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
