import type { Metadata } from "next";
import { generatePageMetadata, StructuredData, generateProductSchema, generateBreadcrumbSchema } from "@/app/utils/seo";

// Example: Replace /app/products/page.tsx with this structure

export const metadata: Metadata = generatePageMetadata({
  title: "Premium Digital Products | Templates, UI Kits & Business Tools",
  description: "Browse 10,000+ premium digital products including templates, UI kits, graphic design assets, and business tools. Instant downloads for entrepreneurs and professionals.",
  keywords: [
    "digital products",
    "premium templates",
    "UI kits",
    "business tools",
    "graphic design",
    "stock templates",
    "web templates",
    "design assets"
  ],
  path: "/products",
  image: "https://nextdigihome.com/og-image.svg",
});

export default function ProductsPage() {
  // Breadcrumb Schema
  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
  ];

  return (
    <main>
       {/* Breadcrumb Navigation - improves UX and SEO */}
       <nav aria-label="Breadcrumb">
         <ol>
           {breadcrumbs.map((crumb, index) => (
             <li key={index}>
               <a href={crumb.path}>{crumb.label}</a>
               {index < breadcrumbs.length - 1 && " / "}
             </li>
           ))}
         </ol>
       </nav>

      {/* Main Content */}
      <section>
        <h1>Premium Digital Products</h1>
        <p>Discover our collection of 10,000+ premium templates, UI kits, and business tools.</p>
        {/* Your products grid here */}
      </section>

      {/* Structured Data - Breadcrumb Schema */}
      <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
