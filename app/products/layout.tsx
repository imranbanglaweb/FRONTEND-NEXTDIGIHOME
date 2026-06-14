import type { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from "../utils/seo";

export const metadata: Metadata = {
  title: "Premium Digital Products, Templates & Business Tools",
  description: "Search premium digital products, templates, UI kits, design assets, and business tools with instant downloads and lifetime access.",
  keywords: ["premium digital products", "search digital products", "templates", "UI kits", "business tools", "instant downloads"],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Premium Digital Products | Next Digi Home",
    description: "Find premium templates, UI kits, business tools, and digital assets for modern teams.",
    url: "/products",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Next Digi Home product catalog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Digital Products | Next Digi Home",
    description: "Search premium templates, UI kits, business tools, and digital assets.",
    images: ["/og-image.svg"],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
]);

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {children}
    </>
  );
}
