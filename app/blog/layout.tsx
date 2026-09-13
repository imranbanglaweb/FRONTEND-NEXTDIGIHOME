import type { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from "../utils/seo";

export const metadata: Metadata = {
  title: "Digital Product Insights, Technology & Growth Guides",
  description: "Read practical guides on software engineering, AI automation, digital products, and growth strategies from NEXTDIGIHOME.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "NEXTDIGIHOME Blog",
    description: "Guides and insights for technology services, AI, SaaS, and digital growth.",
    url: "/blog",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "NEXTDIGIHOME blog" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blog" },
]);

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {children}
    </>
  );
}
