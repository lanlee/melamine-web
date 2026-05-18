interface FooterProps { lang: "en" | "zh"; }

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-[#06080f] border-t border-[rgba(96,239,255,0.08)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#60efff] rounded-lg flex items-center justify-center text-[#04070f] font-black text-sm">
              WLY
            </div>
            <div>
              <div className="font-bold text-base">Guangzhou WLY Material Co., Ltd</div>
              <div className="text-sm text-[#7a8eaa]">广州WLY材料有限公司</div>
            </div>
          </div>
          <div className="text-sm text-[#7a8eaa] max-w-sm text-right hidden sm:block">
            {lang === "en"
              ? "South China's Largest Melamine Wholesaler — Going Global"
              : "华南最大三聚氰胺批发商——走向全球"}
          </div>
        </div>
        <div className="h-px bg-[rgba(96,239,255,0.06)] mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#7a8eaa] text-xs">
          <span>© 2025 Guangzhou WLY Material Co., Ltd. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span>{lang === "en" ? "Guangzhou · Guangdong · China" : "广州·广东·中国"}</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
              <span className="text-[#34d399] font-medium">{lang === "en" ? "Accepting Orders" : "接受订单"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
