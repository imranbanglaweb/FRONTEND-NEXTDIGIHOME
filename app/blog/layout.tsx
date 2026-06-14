import type { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from "../utils/seo";

export const metadata: Metadata = {
  title: "Digital Product Insights, Business Tools & Growth Guides",
  description: "Read practical guides on digital products, templates, online business tools, SEO, design, and growth strategies from Next Digi Home.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Next Digi Home Blog",
    description: "Guides and insights for digital products, business tools, SEO, and design.",
    url: "/blog",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Next Digi Home blog" }],
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
