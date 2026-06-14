import type { Metadata } from "next";
import { generateBreadcrumbSchema, generatePageMetadata, StructuredData } from "../utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Premium Digital Products, Templates & Business Tools",
  description: "Search premium digital products, templates, UI kits, design assets, and business tools with instant downloads and lifetime access.",
  keywords: ["premium digital products", "search digital products", "templates", "UI kits", "business tools", "instant downloads"],
  imageAlt: "Next Digi Home product catalog with premium digital templates and business tools",
  path: "/products",
});

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
