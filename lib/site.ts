/**
 * Single source of truth for the canonical origin and organisation facts.
 *
 * Every SEO surface (sitemap.ts, robots.ts, page metadata, JSON-LD) reads from
 * here so the production domain can never drift back to a preview host. The
 * old public/sitemap.xml pointed at melamine-web.vercel.app, which returns 404
 * — this file is the guard against that recurring.
 *
 * All facts below are taken verbatim from the site's own copy (components/
 * About.tsx, Contact.tsx, Footer.tsx).
 */
export const SITE_URL = "https://www.hanchengmaterial.com";

export const SITE_NAME = "Guangdong HanCheng Material";

export const SITE_LEGAL_NAME = "广东翰成物资有限公司";

export const SITE_TITLE = "Guangdong HanCheng Material | Global Melamine Supplier";

export const SITE_DESCRIPTION =
  "South China's largest melamine wholesaler. 3,000+ metric tons/month. Industrial-grade melamine powder shipped to 40+ countries worldwide.";

export const ORG = {
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  alternateName: ["HanCheng Material", "广东翰成物资有限公司"],
  logo: `${SITE_URL}/hanchenglogo.png`,
  email: "lan@hanchengmaterial.com",
  telephone: "+852 5911 2191",
  foundingDate: "2001",
  description:
    "South China's largest melamine wholesaler, distributing over 3,000 metric tons of industrial-grade melamine powder each month to customers across Asia, Europe, the Americas, the Middle East, and Africa.",
  address: {
    streetAddress: "Room 1005, No. 268 Huangpu East Road",
    addressLocality: "Guangzhou",
    addressRegion: "Guangdong",
    addressCountry: "CN",
  },
};

/** Absolute URL helper for schema.org values, which must never be relative. */
export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).toString();
}

/** Shared node IDs so JSON-LD blocks can reference one entity graph. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
