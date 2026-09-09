"use client";

import { useState } from "react";
import Nav from "@/components/Nav";

export default function BlogNav() {
  const [lang, setLang] = useState<"en" | "zh">("en");
  return <Nav lang={lang} linkPrefix="/" toggleLang={() => setLang((value) => value === "en" ? "zh" : "en")} />;
}
