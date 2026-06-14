import type { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from "../utils/seo";

export const metadata: Metadata = {
  title: "Contact Next Digi Home",
  description: "Contact Next Digi Home for premium digital products, technical support, custom services, partnerships, and business inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Next Digi Home",
    description: "Reach our team for product support, custom digital services, and partnership inquiries.",
    url: "/contact",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Contact Next Digi Home" }],
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
