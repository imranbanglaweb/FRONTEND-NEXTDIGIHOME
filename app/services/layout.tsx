import type { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from "../utils/seo";

export const metadata: Metadata = {
  title: "Premium Digital Services for Web, Marketing & Design",
  description: "Explore premium web development, e-commerce, SEO, digital marketing, UI/UX design, and business growth services from Next Digi Home.",
  keywords: ["digital services", "web development", "SEO services", "digital marketing", "UI UX design", "e-commerce development"],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Services | Next Digi Home",
    description: "Premium digital services for business websites, marketing, design, and e-commerce growth.",
    url: "/services",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Next Digi Home services" }],
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
