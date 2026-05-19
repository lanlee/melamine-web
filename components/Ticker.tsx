export default function Ticker() {
  const items = [
    "Guangdong HanCheng Material",
    "广东翰成物资有限公司",
    "3,000+ Tons / Month · 每月3000吨",
    "South China's Largest Melamine Wholesaler · 华南最大三聚氰胺批发商",
    "Global Shipping · 全球配送",
    "ISO 9001 Certified · SGS Verified",
    "99.8% Purity Grade · 40+ Countries",
    "Melamine Powder · MF Resin · Industrial Grade",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-slate-100 bg-slate-50 py-4">
      <div className="flex gap-12 whitespace-nowrap animate-ticker">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12 flex-shrink-0">
            <span className="text-sm text-slate-500 font-medium">{item}</span>
            <span className="text-[#6366f1] text-base">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
