import { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from '../utils/seo';

export const metadata: Metadata = {
  title: "Digital Services | Web Development, Marketing & Design | Next Digi Home",
  description: "Professional digital services including web development, e-commerce solutions, digital marketing, and UI/UX design. Transform your business with our expert team.",
  keywords: ["web development", "digital marketing", "e-commerce", "UI design", "business growth", "consulting"],
  alternates: {
    canonical: "https://nextdigihome.com/services",
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
]);

export default function ServicesMetadata() {
  return <StructuredData data={breadcrumbSchema} />;
}