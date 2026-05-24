import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Next Digi Home | Premium Digital Products & Templates",
    template: "%s | Next Digi Home",
  },
  description: "Discover premium digital products, templates, tools, and assets engineered for modern businesses. Boost productivity with 10K+ high-quality resources trusted by 50K+ professionals worldwide.",
  keywords: [
    "digital products", "premium templates", "business tools", "web templates", "graphic design assets",
    "digital downloads", "ecommerce templates", "UI kits", "stock graphics", "marketing tools",
    "Next Digi Home", "instant download", "professional templates"
  ],
  authors: [{ name: "Next Digi Home", url: "https://nextdigihome.com" }],
  creator: "Next Digi Home",
  publisher: "Next Digi Home",
  applicationName: "Next Digi Home",
  category: "Digital Marketplace",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Next Digi Home | Premium Digital Products for Modern Businesses",
    description: "Premium digital products, templates, UI kits & business tools. Instant downloads. Trusted by 50K+ businesses worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Next Digi Home - Premium Digital Products Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "Next Digi Home",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Digi Home | Premium Digital Products",
    description: "Premium digital products engineered for modern businesses. 10K+ resources, instant downloads.",
    images: ["/og-image.jpg"],
    creator: "@nextdigihome",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://nextdigihome.com"),
  alternates: {
    canonical: "https://nextdigihome.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body suppressHydrationWarning={true} className="min-h-full flex flex-col bg-[#0f0f12] text-[#fafafa] selection:bg-[#00d4aa] selection:text-[#0f0f12]">
        <ClientLayout>{children}</ClientLayout>
        {/* Organization Structured Data for SEO & Trust */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Next Digi Home",
              "url": "https://nextdigihome.com",
              "logo": "https://nextdigihome.com/logo.png",
              "description": "Premium digital products, templates, and business tools for modern enterprises.",
              "email": "info@nextdigihome.com",
              "telephone": "+8801918329829",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BD"
              },
              "sameAs": [
                "https://facebook.com/nextdigihome",
                "https://twitter.com/nextdigihome",
                "https://linkedin.com/company/nextdigihome"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "15200"
              }
            })
          }}
        />
      </body>
    </html>
  );
}