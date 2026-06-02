import { Metadata } from "next";
import { generatePageMetadata } from "@/app/utils/seo";
import Link from "next/link";

export const metadata: Metadata = generatePageMetadata({
  title: "Sitemap - Next Digi Home",
  description: "HTML sitemap of Next Digi Home - Navigate to all important pages of our premium digital products marketplace.",
  keywords: ["sitemap", "navigation", "site map", "website structure"],
  path: "/sitemap",
});

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#fafafa] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-[#737373]">
          <Link href="/" className="hover:text-[#00d4aa] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Sitemap</span>
        </nav>

        <h1 className="text-3xl font-bold gradient-text mb-8">
          Sitemap
        </h1>

        <p className="mb-10 text-[#737373]">
          Explore the complete structure of Next Digi Home. Use this sitemap to navigate to any section of our premium digital products marketplace.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Main Pages */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-[#00d4aa]">
              Main Pages
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">🏠</span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">ℹ️</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">🛠️</span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">📞</span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">🔒</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">📜</span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Shopping */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-[#00d4aa]">
              Products & Shopping
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">🛍️</span>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">🛒</span>
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">💳</span>
                  Checkout
                </Link>
              </li>
              <li>
                <Link href="/checkout/success" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">✅</span>
                  Order Confirmation
                </Link>
              </li>
              <li>
                <Link href="/signin" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">🔐</span>
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">📝</span>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Legal */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-[#00d4aa]">
              Account & Legal
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">📊</span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors" target="_blank" rel="noopener noreferrer">
                  <span className="text-[--]">🤖</span>
                  Robots.txt (for search engines)
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors" target="_blank" rel="noopener noreferrer">
                  <span className="text-[--]">📋</span>
                  XML Sitemap (for search engines)
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog & Resources (if available) */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-[#00d4aa]">
              Blog & Resources
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="flex items-center gap-2 hover:text-[#00d4aa] transition-colors">
                  <span className="text-[--]">📝</span>
                  Blog
                </Link>
              </li>
              {/* Add more blog/resource links as needed */}
            </ul>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-[#2a2a30] text-center text-[--] text-xs">
          <p className="text-[#737373]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-[#737373] mt-2">
            For the most current site structure, please refer to our main navigation menu.
          </p>
        </div>
      </div>
    </div>
  );
}