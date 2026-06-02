import { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from '../utils/seo';

export const metadata: Metadata = {
  title: "Contact Us | Next Digi Home - Get in Touch",
  description: "Contact Next Digi Home for support, sales inquiries, or partnership opportunities. We respond within 24 hours.",
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