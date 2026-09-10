import { ORG, ORG_ID, SITE_NAME, SITE_TITLE, SITE_URL, WEBSITE_ID } from "@/lib/site";

/**
 * JSON-LD graph describing the organisation, the site, and the flagship
 * product. Blog posts add their own BlogPosting graph in app/blog/[slug].
 *
 * No `offers` block is emitted on the Product: no public price exists, and an
 * invented price would be a policy violation rather than a rich result.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: ORG.name,
      legalName: ORG.legalName,
      alternateName: ORG.alternateName,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: ORG.logo,
      },
      email: ORG.email,
      telephone: ORG.telephone,
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
          telephone: ORG.telephone,
          areaServed: ["Asia", "Europe", "North America", "South America", "Africa", "Middle East"],
          availableLanguage: ["en", "zh"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: ORG.logo },
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
      manufacturer: { "@id": ORG_ID },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Purity", value: "99.8%" },
        { "@type": "PropertyValue", name: "Physical form", value: "White crystalline powder" },
        { "@type": "PropertyValue", name: "Monthly supply capacity", value: "3,000+ metric tons" },
        { "@type": "PropertyValue", name: "Certifications", value: "ISO 9001, SGS verified" },
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
