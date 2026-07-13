import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Guangdong HanCheng Material | Global Melamine Supplier",
  description:
    "South China's largest melamine wholesaler. 3,000+ metric tons/month. Industrial-grade melamine powder shipped to 40+ countries worldwide.",
  keywords: [
    "melamine powder",
    "melamine supplier China",
    "melamine formaldehyde resin",
    "industrial melamine",
    "melamine manufacturer",
    "bulk melamine powder",
    "Guangdong HanCheng Material",
    "Chinese melamine exporter",
  ],
  openGraph: {
    title: "Guangdong HanCheng Material | Global Melamine Supplier",
    description:
      "South China's largest melamine wholesaler. Premium melamine powder ≥99.8% purity. 3,000+ MT/month. Shipped to 40+ countries.",
    url: "https://www.hanchengmaterial.com",
    siteName: "Guangdong HanCheng Material",
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guangdong HanCheng Material | Global Melamine Supplier",
    description:
      "South China's largest melamine wholesaler. Premium melamine powder ≥99.8% purity shipped worldwide.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.hanchengmaterial.com",
  },
  icons: {
    icon: "/hanchenglogo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
