import { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from '../utils/seo';

export const metadata: Metadata = {
  title: "Premium Digital Products | Templates, UI Kits & Business Tools",
  description: "Browse 10,000+ premium digital products including templates, UI kits, and business tools. Instant downloads for entrepreneurs with lifetime access.",
  keywords: ["digital products", "templates", "UI kits", "business tools", "premium downloads", "web templates", "graphic design"],
  alternates: {
    canonical: "https://nextdigihome.com/products",
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  };
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
]);

export default function ProductsMetadata() {
  return <StructuredData data={breadcrumbSchema} />;
}