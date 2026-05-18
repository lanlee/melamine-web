"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ContactProps { lang: "en" | "zh"; }

export default function Contact({ lang }: ContactProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#0ea5e9] mb-4">
              {lang === "en" ? "Get a Quote" : "获取报价"}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-5">
              {lang === "en" ? "Start Your Order Today" : "立即开始您的订单"}
            </h2>
            <p className="text-slate-500 text-base leading-loose mb-10">
              {lang === "en"
                ? "Our bilingual team responds within 2 business hours. Free samples available on request."
                : "我们的双语团队在2个工作小时内回复。可按要求提供免费样品。"}
            </p>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: "📍",
                  label_en: "Address", label_zh: "地址",
                  val: "Guangzhou, Guangdong Province, China\n中国广东省广州市",
                },
                {
                  icon: "📧",
                  label_en: "Email", label_zh: "邮箱",
                  val: "info@wlymaterial.com",
                },
                {
                  icon: "📱",
                  label_en: "WhatsApp / WeChat", label_zh: "WhatsApp / 微信",
                  val: "+86 138 0000 0000",
                },
                {
                  icon: "🕐",
                  label_en: "Office Hours", label_zh: "办公时间",
                  val: lang === "en" ? "Mon–Sat, 08:00–18:00 CST" : "周一至周六 08:00–18:00（北京时间）",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                      {lang === "en" ? item.label_en : item.label_zh}
                    </div>
                    {item.val.split("\n").map((line, j) => (
                      <div key={j} className="text-sm text-slate-700">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-[0_8px_40px_rgba(14,165,233,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-2xl text-[#0ea5e9] font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#0ea5e9]">
                  {lang === "en" ? "Inquiry Sent!" : "询盘已发送！"}
                </h3>
                <p className="text-slate-500 text-sm text-center">
                  {lang === "en"
                    ? "We'll reply within 2 business hours."
                    : "我们将在2个工作小时内回复。"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field lang={lang} label_en="Your Name" label_zh="您的姓名" placeholder="John Smith" type="text" required />
                  <Field lang={lang} label_en="Company" label_zh="公司名称" placeholder="Acme Industries" type="text" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field lang={lang} label_en="Email" label_zh="邮箱" placeholder="you@company.com" type="email" required />
                  <Field lang={lang} label_en="Country" label_zh="国家" placeholder="United States" type="text" required />
                </div>
                <Field
                  lang={lang}
                  label_en="Product & Quantity"
                  label_zh="产品与数量"
                  placeholder={lang === "en" ? "e.g. Melamine Powder 99.8%, 20 MT/month" : "例如：三聚氰胺粉末99.8%，每月20公吨"}
                  type="text"
                  required
                />
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {lang === "en" ? "Message" : "留言"}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={lang === "en" ? "Tell us about your requirements..." : "请告诉我们您的需求..."}
                    className="bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#0ea5e9] text-white font-bold py-4 rounded-xl hover:bg-sky-600 transition-all duration-200 shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_8px_32px_rgba(14,165,233,0.4)] hover:-translate-y-0.5 text-base"
                >
                  {lang === "en" ? "Send Inquiry" : "发送询盘"}
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                    <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <p className="text-center text-slate-400 text-xs">
                  {lang === "en" ? "We respond within 2 business hours." : "我们在2个工作小时内回复。"}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  lang, label_en, label_zh, placeholder, type, required,
}: {
  lang: "en" | "zh"; label_en: string; label_zh: string;
  placeholder: string; type: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {lang === "en" ? label_en : label_zh}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="bg-slate-50 border border-slate-200 focus:border-[#0ea5e9] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all duration-200"
      />
    </div>
  );
}
