import type { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from "../utils/seo";

export const metadata: Metadata = {
  title: "Premium Technology Services, AI & Growth Solutions",
  description: "Explore custom web development, e-commerce, software engineering, AI automation, and digital growth services from NEXTDIGIHOME.",
  keywords: ["technology services", "web development", "AI automation", "custom software", "digital growth", "e-commerce development"],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Technology Services & Solutions | NEXTDIGIHOME",
    description: "Premium technology services for enterprise platforms, AI automation, and scalable digital growth.",
    url: "/services",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "NEXTDIGIHOME services" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
]);

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {children}
    </>
  );
}
