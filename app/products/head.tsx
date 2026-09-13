import { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from '../utils/seo';

export const metadata: Metadata = {
  title: "NextDigi Store | Digital Products & Business Resources",
  description: "Premium digital products, templates and business resources from NextDigi Store, a division of NEXTDIGIHOME.",
  keywords: ["NextDigi Store", "digital products", "business resources", "software templates", "UI kits", "instant downloads"],
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
  { label: "Store", path: "/products" },
]);

export default function ProductsMetadata() {
  return <StructuredData data={breadcrumbSchema} />;
}