import type { Metadata } from "next";

import HomeClient from "@/components/HomeClient";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

/**
 * Declared here rather than in the root layout: a canonical in the layout
 * would be inherited by every future route that forgets to set its own, and
 * each of them would claim to be the homepage.
 */
export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/hanchenglogo.png", width: 512, height: 512, alt: SITE_NAME }],
  },
};

export default function Home() {
  return <HomeClient />;
}
