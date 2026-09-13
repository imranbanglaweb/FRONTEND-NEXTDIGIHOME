import type { Metadata } from "next";
import { generateBreadcrumbSchema, generatePageMetadata, StructuredData } from "../utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "NextDigi Store | Digital Products & Business Resources",
  description: "Premium digital products, templates and business resources from NextDigi Store, a division of NEXTDIGIHOME.",
  keywords: ["NextDigi Store", "digital products", "business resources", "software templates", "UI kits", "instant downloads"],
  imageAlt: "NextDigi Store - Digital Products & Resources",
  path: "/products",
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "Store", path: "/products" },
]);

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {children}
    </>
  );
}
