import type { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from "../utils/seo";

export const metadata: Metadata = {
  title: "Contact NEXTDIGIHOME",
  description: "Contact NEXTDIGIHOME for technology services, AI & automation, custom software, digital growth, partnerships, and support.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact NEXTDIGIHOME",
    description: "Reach our team for product support, custom digital services, and partnership inquiries.",
    url: "/contact",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Contact NEXTDIGIHOME" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "Contact", path: "/contact" },
]);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {children}
    </>
  );
}
