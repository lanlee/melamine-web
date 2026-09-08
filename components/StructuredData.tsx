import { ORG, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

/**
 * JSON-LD graph describing the organisation, the site, the landing page, and
 * the flagship product. Facts come from the live site copy and source: legal
 * and Chinese names, the Guangzhou address, the lan@ contact address, the
 * 2001 founding year, 3,000+ MT/month, and ISO 9001 / SGS verification.
 *
 * No offers block is emitted on the Product: no public price exists, and an
 * invented price would be a policy violation rather than a rich result.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: SITE_NAME,
      alternateName: ORG.alternateName,
      url: SITE_URL,
      logo: ORG.logo,
      email: ORG.email,
      foundingDate: ORG.foundingDate,
      description: ORG.description,
      address: {
        "@type": "PostalAddress",
        ...ORG.address,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: ORG.email,
          areaServed: [
            "Asia",
            "Europe",
            "North America",
            "South America",
            "Africa",
            "Middle East",
          ],
          availableLanguage: ["en", "zh"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: ORG.logo,
      inLanguage: "en",
    },
    {
      "@type": "Product",
      "@id": `${SITE_URL}/#melamine-powder`,
      name: "Melamine Powder 99.8%",
      alternateName: "Industrial-grade melamine powder",
      description:
        "Premium purity (99.8%) white crystalline melamine powder — the backbone of the laminate, adhesive, and coatings industries. Every batch ships with full COA, MSDS, and SGS test reports.",
      category: "Industrial Chemicals > Melamine",
      image: ORG.logo,
      brand: { "@type": "Brand", name: SITE_NAME },
      manufacturer: { "@id": `${SITE_URL}/#organization` },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Purity", value: "99.8%" },
        {
          "@type": "PropertyValue",
          name: "Physical form",
          value: "White crystalline powder",
        },
        {
          "@type": "PropertyValue",
          name: "Monthly supply capacity",
          value: "3,000+ metric tons",
        },
        {
          "@type": "PropertyValue",
          name: "Certifications",
          value: "ISO 9001, SGS verified",
        },
      ],
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
