"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AppProps { lang: "en" | "zh"; }

const apps = [
  {
    color: "#0ea5e9", bg: "rgba(14,165,233,0.08)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="3" y="7" width="26" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="5" width="26" height="5" rx="1.5" fill="currentColor" opacity="0.3"/>
        <line x1="9" y1="17" x2="23" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="9" y1="21" x2="19" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    en: "Decorative Laminates & Furniture",
    zh: "装饰层压板与家具",
    desc_en: "Melamine-impregnated paper laminated onto MDF and particleboard creates the scratch-resistant, hygienic surfaces used in furniture, kitchen cabinets, and flooring worldwide.",
    desc_zh: "三聚氰胺浸渍纸层压在中密度板和刨花板上，形成全球家具、厨柜和地板使用的耐划伤、卫生表面。",
    stat_en: "~40% of global melamine demand",
    stat_zh: "约占全球三聚氰胺需求的40%",
  },
  {
    color: "#8b5cf6", bg: "rgba(139,92,246,0.08)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.5"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
    en: "Dishware & Kitchenware",
    zh: "餐具与厨具",
    desc_en: "Melamine-formaldehyde molding compounds produce lightweight, impact-resistant tableware — bowls, plates, and trays favored across foodservice and hospitality sectors.",
    desc_zh: "三聚氰胺甲醛模塑料生产轻质耐冲击餐具——碗、盘、托盘，广受餐饮和酒店业青睐。",
    stat_en: "500M+ units produced annually",
    stat_zh: "年产量超5亿件",
  },
  {
    color: "#f59e0b", bg: "rgba(245,158,11,0.08)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="4" y="20" width="24" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <polygon points="4,20 16,6 28,20" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
        <line x1="13" y1="20" x2="13" y2="28" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="19" y1="20" x2="19" y2="28" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    en: "Construction & Concrete",
    zh: "建筑与混凝土",
    desc_en: "Melamine-based superplasticizers dramatically reduce water content in concrete mixes, improving compressive strength and workability for high-performance structural projects.",
    desc_zh: "三聚氰胺基超塑化剂显著降低混凝土水含量，提高高性能结构项目的抗压强度和工作性。",
    stat_en: "Used in 60%+ of major infrastructure projects",
    stat_zh: "应用于60%以上重大基础设施项目",
  },
  {
    color: "#ef4444", bg: "rgba(239,68,68,0.08)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M6 26 Q6 6 16 6 Q26 6 26 26" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="16" cy="12" r="3" fill="currentColor" opacity="0.4"/>
        <path d="M10 26 Q10 17 16 17 Q22 17 22 26" fill="currentColor" opacity="0.2"/>
      </svg>
    ),
    en: "Flame Retardants",
    zh: "阻燃剂",
    desc_en: "Melamine and its salts (cyanurate, polyphosphate) serve as halogen-free flame retardants in cables, textiles, foam, and electronics — meeting REACH, RoHS, and UL standards.",
    desc_zh: "三聚氰胺及其盐作为电缆、纺织品、泡沫和电子产品中的无卤阻燃剂，符合REACH、RoHS和UL标准。",
    stat_en: "REACH & RoHS compliant grades available",
    stat_zh: "提供REACH & RoHS合规等级",
  },
  {
    color: "#10b981", bg: "rgba(16,185,129,0.08)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 4 Q22 11 22 16 Q22 21 16 28 Q10 21 10 16 Q10 11 16 4 Z" fill="currentColor" opacity="0.15"/>
        <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
    en: "Paper & Textile Treatment",
    zh: "纸张与纺织品处理",
    desc_en: "Melamine-urea resins provide wet-strength treatment for tissue and packaging paper, and crease-resistance finishing for cotton and blended textile fabrics.",
    desc_zh: "三聚氰胺-尿素树脂为纸巾和包装纸提供湿强度处理，为棉和混纺纺织品提供抗皱整理。",
    stat_en: "Key input for premium tissue manufacturers",
    stat_zh: "高档纸巾制造商的关键原料",
  },
  {
    color: "#3b82f6", bg: "rgba(59,130,246,0.08)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="11" cy="11" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="21" cy="11" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="11" cy="21" r="3" fill="currentColor" opacity="0.4"/>
        <circle cx="21" cy="21" r="3" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
    en: "Coatings & Adhesives",
    zh: "涂料与粘合剂",
    desc_en: "MF resins act as cross-linking agents in alkyd, acrylic, and polyester coatings, delivering hardness, gloss retention, and chemical resistance in automotive and industrial finishes.",
    desc_zh: "MF树脂作为醇酸、丙烯酸和聚酯涂料中的交联剂，为汽车和工业涂层提供硬度、光泽保持和化学耐受性。",
    stat_en: "Used by top automotive OEMs globally",
    stat_zh: "全球顶级汽车OEM使用",
  },
];

export default function Applications({ lang }: AppProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="applications" className="py-28 bg-[#f8faff]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#0ea5e9] mb-4">
            {lang === "en" ? "Real Use Cases" : "真实应用场景"}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            {lang === "en" ? "Where Melamine Powers the World" : "三聚氰胺如何驱动世界"}
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            {lang === "en"
              ? "From kitchen countertops to skyscraper foundations — melamine is the invisible backbone of modern manufacturing."
              : "从厨房台面到摩天大楼地基——三聚氰胺是现代制造业的隐形支柱。"}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white border border-slate-200 rounded-2xl p-7 flex flex-col gap-4 card-hover shadow-sm"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ color: a.color, background: a.bg }}
              >
                {a.icon}
              </div>
              <h4 className="text-base font-bold leading-snug text-slate-900">
                {lang === "en" ? a.en : a.zh}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                {lang === "en" ? a.desc_en : a.desc_zh}
              </p>
              <div
                className="text-xs font-semibold px-3 py-1.5 rounded-full border self-start"
                style={{ color: a.color, borderColor: `${a.color}30`, background: a.bg }}
              >
                {lang === "en" ? a.stat_en : a.stat_zh}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
