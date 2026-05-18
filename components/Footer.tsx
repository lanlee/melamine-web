interface FooterProps { lang: "en" | "zh"; }

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0ea5e9] rounded-lg flex items-center justify-center text-white font-black text-sm shadow-[0_4px_14px_rgba(14,165,233,0.4)]">
              HC
            </div>
            <div>
              <div className="font-bold text-base text-white">Guangdong HC Material Co., Ltd</div>
              <div className="text-sm text-[#0ea5e9]">广东瀚成物资有限公司</div>
            </div>
          </div>
          <div className="text-sm text-slate-400 max-w-sm text-right hidden sm:block">
            {lang === "en"
              ? "South China's Largest Melamine Wholesaler — Going Global"
              : "华南最大三聚氰胺批发商——走向全球"}
          </div>
        </div>
        <div className="h-px bg-slate-800 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <span>© 2025 Guangdong HC Material Co., Ltd. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span>{lang === "en" ? "Guangzhou · Guangdong · China" : "广州·广东·中国"}</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">{lang === "en" ? "Accepting Orders" : "接受订单"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
