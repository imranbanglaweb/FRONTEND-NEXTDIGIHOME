import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/app/utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Sitemap - Next Digi Home",
  description: "HTML sitemap of Next Digi Home. Navigate to the important public pages of our digital products marketplace.",
  keywords: ["sitemap", "navigation", "site map", "website structure"],
  path: "/sitemap",
});

type SitemapSection = {
  title: string;
  links: Array<{
    href: string;
    label: string;
    external?: boolean;
  }>;
};

const sections: SitemapSection[] = [
  {
    title: "Main Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact Us" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/products", label: "All Products" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/cart", label: "Shopping Cart" },
      { href: "/checkout", label: "Checkout" },
      { href: "/signin", label: "Sign In" },
      { href: "/signup", label: "Sign Up" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Search Engine Files",
    links: [
      { href: "/robots.txt", label: "Robots.txt", external: true },
      { href: "/sitemap.xml", label: "XML Sitemap", external: true },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-[#0f0f12] text-[#fafafa] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#737373]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#00d4aa] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Sitemap</span>
        </nav>

        <h1 className="text-3xl font-bold gradient-text mb-8">Sitemap</h1>
        <p className="mb-10 max-w-3xl text-[#737373]">
          Browse the important pages on Next Digi Home, including products, company pages, account pages, and search engine files.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl font-semibold text-[#00d4aa]">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#00d4aa] transition-colors"
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a30] text-center text-xs">
          <p className="text-[#737373]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}
