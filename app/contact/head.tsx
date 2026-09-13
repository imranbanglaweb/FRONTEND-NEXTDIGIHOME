import { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from '../utils/seo';

export const metadata: Metadata = {
  title: "Contact Us | NEXTDIGIHOME - Get in Touch",
  description: "Contact NEXTDIGIHOME for technology services, support, sales inquiries, or partnership opportunities. We respond within 24 hours.",
  alternates: {
    canonical: "https://nextdigihome.com/contact",
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "Contact", path: "/contact" },
]);

export default function ContactMetadata() {
  return <StructuredData data={breadcrumbSchema} />;
}