import type { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from "../utils/seo";

export const metadata: Metadata = {
  title: "About Next Digi Home",
  description: "Learn about Next Digi Home, a premium marketplace for business-ready digital products, templates, tools, and digital growth solutions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Next Digi Home",
    description: "A premium digital marketplace built for modern businesses and creators.",
    url: "/about",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "About Next Digi Home" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
]);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {children}
    </>
  );
}
