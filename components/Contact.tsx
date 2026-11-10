"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ContactProps { lang: "en" | "zh"; }

export default function Contact({ lang }: ContactProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const submitting = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setSending(true);
    setError(false);
    const form = e.currentTarget;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(30_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Inquiry failed");
      form.reset();
      setSent(true);
    } catch {
      setError(true);
    } finally {
      submitting.current = false;
      setSending(false);
    }
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
            <div className="text-[11px] font-bold tracking-[3px] uppercase text-[#6366f1] mb-4">
              {lang === "en" ? "Get a Quote" : "获取报价"}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-5">
              {lang === "en" ? "Start Your Order Today" : "立即开始您的订单"}
            </h2>
            <p className="text-slate-500 text-base leading-loose mb-10">
              {lang === "en"
                ? "Our bilingual team responds within 2 business hours."
                : "我们的双语团队在2个工作小时内回复。"}
            </p>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: "📍",
                  label_en: "Address", label_zh: "地址",
                  val: "Room 1005, No. 268 Huangpu East Road, Guangzhou, China\n中国广东省广州市黄埔东路268号1005室",
                },
                {
                  icon: "📧",
                  label_en: "Email", label_zh: "邮箱",
                  val: "sales@hanchengmaterial.com",
                },
                {
                  icon: "📱",
                  label_en: "WhatsApp / WeChat", label_zh: "WhatsApp / 微信",
                  val: "+852 5911 2191",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg flex-shrink-0">
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
            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-[0_8px_40px_rgba(99,102,241,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
          >
            {sent ? (
              <div role="status" className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-2xl text-[#6366f1] font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#6366f1]">
                  {lang === "en" ? "Inquiry Sent!" : "询盘已发送！"}
                </h3>
                <p className="text-slate-500 text-sm text-center">
                  {lang === "en"
                    ? "We'll reply within 2 business hours."
                    : "我们将在2个工作小时内回复。"}
                </p>
                <button type="button" onClick={() => setSent(false)} className="text-sm font-semibold text-[#6366f1] underline">
                  {lang === "en" ? "Send another inquiry" : "发送另一条询盘"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} aria-busy={sending} className="flex flex-col gap-5">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field name="name" maxLength={100} lang={lang} label_en="Your Name" label_zh="您的姓名" placeholder="John Smith" type="text" required />
                  <Field name="company" maxLength={200} lang={lang} label_en="Company" label_zh="公司名称" placeholder="Acme Industries" type="text" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field name="email" maxLength={254} lang={lang} label_en="Email" label_zh="邮箱" placeholder="you@company.com" type="email" required />
                  <Field name="country" maxLength={100} lang={lang} label_en="Country" label_zh="国家" placeholder="United States" type="text" required />
                </div>
                <Field
                  name="product"
                  maxLength={500}
                  lang={lang}
                  label_en="Product & Quantity"
                  label_zh="产品与数量"
                  placeholder={lang === "en" ? "e.g. Melamine Powder 99.8%, 20 MT/month" : "例如：三聚氰胺粉末99.8%，每月20公吨"}
                  type="text"
                  required
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {lang === "en" ? "Message" : "留言"}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    maxLength={4000}
                    rows={4}
                    placeholder={lang === "en" ? "Tell us about your requirements..." : "请告诉我们您的需求..."}
                    className="bg-slate-50 border border-slate-200 focus:border-[#6366f1] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all duration-200 resize-none"
                  />
                </div>
                {error && (
                  <p role="alert" className="text-sm text-red-700">
                    {lang === "en" ? "We couldn't send your inquiry. Please try again or email " : "询盘发送失败，请重试或发送邮件至 "}
                    <a href="mailto:sales@hanchengmaterial.com" className="underline">sales@hanchengmaterial.com</a>.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center justify-center gap-2 bg-[#6366f1] text-white font-bold py-4 rounded-xl hover:bg-[#4f46e5] transition-all duration-200 hover:-translate-y-0.5 text-base disabled:opacity-60 disabled:cursor-wait"
                >
                  {sending ? (lang === "en" ? "Sending…" : "发送中…") : (lang === "en" ? "Send Inquiry" : "发送询盘")}
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
  name, maxLength, lang, label_en, label_zh, placeholder, type, required,
}: {
  name: string; maxLength: number;
  lang: "en" | "zh"; label_en: string; label_zh: string;
  placeholder: string; type: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`contact-${name}`} className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {lang === "en" ? label_en : label_zh}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        maxLength={maxLength}
        type={type}
        placeholder={placeholder}
        required={required}
        className="bg-slate-50 border border-slate-200 focus:border-[#6366f1] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all duration-200"
      />
    </div>
  );
}
