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
    default: "NextDigiHome | Technology, AI, Software & Digital Solutions",
    template: "%s | NextDigiHome",
  },
  description: "NextDigiHome helps modern businesses build, launch, automate and grow with web development, e-commerce, custom software, SaaS, AI automation and digital growth solutions.",
  keywords: [
    "NextDigiHome", "technology ecosystem", "software development", "web development", "ecommerce development",
    "mobile apps", "custom software", "SaaS development", "AI agents", "AI chatbots", "workflow automation",
    "digital growth", "SEO services", "NextDigi Solutions", "NextDigi AI", "NextDigi Growth", "NextDigi Labs", "NextDigi Store"
  ],
  authors: [{ name: "NextDigiHome", url: "https://nextdigihome.com" }],
  creator: "NextDigiHome",
  publisher: "NextDigiHome",
  applicationName: "NextDigiHome",
  category: "Technology Ecosystem & Software Solutions",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", type: "image/x-icon", sizes: "32x32" },
      { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", url: "/favicon.png", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "NextDigiHome | Technology, AI, Software & Digital Solutions",
    description: "NextDigiHome helps modern businesses build, launch, automate and grow with web development, e-commerce, custom software, SaaS, AI automation and digital growth solutions.",
    images: [
      {
        url: "https://nextdigihome.com/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NextDigiHome - Technology, AI, Software & Digital Solutions",
        type: "image/svg+xml",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "NextDigiHome",
    url: "https://nextdigihome.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextDigiHome | Technology, AI, Software & Digital Solutions",
    description: "NextDigiHome helps modern businesses build, launch, automate and grow with web development, e-commerce, custom software, SaaS, AI automation and digital growth solutions.",
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
              "name": "NextDigiHome",
              "url": "https://nextdigihome.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://nextdigihome.com/logo.png",
                "width": 512,
                "height": 512
              },
              "description": "NextDigiHome provides technology, AI, custom software, and digital growth solutions for modern businesses. Build, Launch, Automate, and Grow.",
              "email": "info@nextdigihome.com",
              "telephone": "+8801918329829",
              "address": {
                "@type": "PostalAddress",
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
              "knowsAbout": [
                "Web Development",
                "E-commerce Development",
                "Mobile App Development",
                "Custom Software",
                "SaaS Development",
                "AI Agents & Automation",
                "Workflow Automation",
                "Digital Growth & Marketing",
                "Digital Products & Developer Resources"
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
              "name": "NextDigiHome",
              "description": "Technology, AI, Software & Digital Growth Ecosystem",
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
