import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Viewport configuration for mobile SEO
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f12" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Next Digi Home | Premium Digital Products & Templates",
    template: "%s | Next Digi Home",
  },
  description: "Discover premium digital products, templates, tools, and assets engineered for modern businesses. Boost productivity with 10K+ high-quality resources trusted by 50K+ professionals worldwide.",
  keywords: [
    "digital products", "premium templates", "business tools", "web templates", "graphic design assets",
    "digital downloads", "ecommerce templates", "UI kits", "stock graphics", "marketing tools",
    "Next Digi Home", "instant download", "professional templates", "business software"
  ],
  authors: [{ name: "Next Digi Home", url: "https://nextdigihome.com" }],
  creator: "Next Digi Home",
  publisher: "Next Digi Home",
  applicationName: "Next Digi Home",
  category: "Digital Marketplace",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", type: "image/x-icon", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Next Digi Home | Premium Digital Products for Modern Businesses",
    description: "Premium digital products, templates, UI kits & business tools. Instant downloads. Trusted by 50K+ businesses worldwide.",
    images: [
      {
        url: "https://nextdigihome.com/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Next Digi Home - Premium Digital Products Marketplace",
        type: "image/svg+xml",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "Next Digi Home",
    url: "https://nextdigihome.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Digi Home | Premium Digital Products",
    description: "Premium digital products engineered for modern businesses. 10K+ resources, instant downloads.",
    images: ["https://nextdigihome.com/og-image.svg"],
    creator: "@nextdigihome",
    site: "@nextdigihome",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    languages: {
      "en-US": "https://nextdigihome.com",
    },
  },
  manifest: "/manifest.json",
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
      <head>
        {/* Additional Meta Tags for SEO & Performance */}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//nextdigihome.com" />
      </head>
      <body suppressHydrationWarning={true} className="min-h-full flex flex-col bg-[#0f0f12] text-[#fafafa] selection:bg-[#00d4aa] selection:text-[#0f0f12]">
        <ClientLayout>{children}</ClientLayout>
        
        {/* Organization Structured Data for SEO & Trust */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://nextdigihome.com",
              "name": "Next Digi Home",
              "url": "https://nextdigihome.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://nextdigihome.com/logo.png",
                "width": 512,
                "height": 512
              },
              "description": "Premium digital products, templates, and business tools for modern enterprises.",
              "email": "info@nextdigihome.com",
              "telephone": "+8801918329829",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address",
                "addressLocality": "Dhaka",
                "addressCountry": "BD",
                "postalCode": "1000"
              },
              "sameAs": [
                "https://facebook.com/nextdigihome",
                "https://twitter.com/nextdigihome",
                "https://linkedin.com/company/nextdigihome",
                "https://instagram.com/nextdigihome"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "15200",
                "bestRating": "5",
                "worstRating": "1"
              },
              "knowsAbout": [
                "Digital Products",
                "Templates",
                "UI Kits",
                "Business Tools",
                "Graphic Design",
                "Web Development"
              ]
            })
          }}
        />

        {/* WebSite Schema with Search Action */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://nextdigihome.com",
              "name": "Next Digi Home",
              "description": "Premium Digital Products Marketplace",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://nextdigihome.com/products?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
