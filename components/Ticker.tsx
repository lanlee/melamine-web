export default function Ticker() {
  const items = [
    "Guangzhou WLY Material Co., Ltd",
    "广州WLY材料有限公司",
    "3,000 MT / Month · 每月3000公吨",
    "South China's Largest Melamine Wholesaler · 华南最大三聚氰胺批发商",
    "Global Shipping · 全球配送",
    "ISO 9001 Certified · SGS Verified",
    "99.8% Purity Grade · 40+ Countries",
    "Melamine Powder · MF Resin · Industrial Grade",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-[rgba(96,239,255,0.1)] bg-[#080e1d] py-4">
      <div className="flex gap-12 whitespace-nowrap animate-ticker">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12 flex-shrink-0">
            <span className="text-sm text-[#7a8eaa] font-medium">{item}</span>
            <span className="text-[#60efff] text-base">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
