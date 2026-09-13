import type { Metadata } from "next";
import { generateBreadcrumbSchema, StructuredData } from "../utils/seo";

export const metadata: Metadata = {
  title: "About NEXTDIGIHOME",
  description: "Learn about NEXTDIGIHOME, the master technology ecosystem covering software engineering, AI automation, SaaS platforms, and digital growth.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About NEXTDIGIHOME",
    description: "Master technology ecosystem built for modern businesses and creators.",
    url: "/about",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "About NEXTDIGIHOME" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
]);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      {children}
    </>
  );
}
