import type { Metadata } from "next";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nextdigihome.com";
const DEFAULT_IMAGE = "/og-image.svg";
const SITE_NAME = "Next Digi Home";

/**
 * Generate page metadata with all SEO best practices
 */
export function generatePageMetadata(options: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  path: string;
  type?: "website" | "article" | "product";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  index?: boolean;
}): Metadata {
  const url = `${BASE_URL}${options.path}`;
  const image = options.image || DEFAULT_IMAGE;
  const imageAlt = options.imageAlt || options.title;
  const shouldIndex = options.index !== false;

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    applicationName: SITE_NAME,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Digital Marketplace",
    alternates: {
      canonical: options.path,
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      type: options.type === "article" ? "article" : "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: "en_US",
      siteName: SITE_NAME,
      ...(options.type === "article" && options.publishedTime ? { publishedTime: options.publishedTime } : {}),
      ...(options.type === "article" && options.modifiedTime ? { modifiedTime: options.modifiedTime } : {}),
      ...(options.type === "article" && options.author ? { authors: [options.author] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
      creator: "@nextdigihome",
      site: "@nextdigihome",
    },
    ...(options.author && {
      authors: [{ name: options.author }],
    }),
  };
}

export function generateNoIndexMetadata(title: string, description: string, path: string): Metadata {
  return generatePageMetadata({
    title,
    description,
    path,
    index: false,
  });
}

/**
 * Generate JSON-LD schema for organization
 */
export function generateOrganizationSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "NextDigiHome",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      "https://www.facebook.com/NextdigiHome/",
      "https://www.youtube.com/@FullStackSAPGuy",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@nextdigihome.com",
      telephone: "+8801918329829",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Bengali"],
    },
  };
}

/**
 * Generate JSON-LD schema for website
 */
export function generateWebsiteSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate JSON-LD schema for breadcrumb
 * @param items Array of { label: string; path: string }
 */
export function generateBreadcrumbSchema(items: { label: string; path: string }[]): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

/**
 * Generate JSON-LD schema for product
 * @param product Product data
 */
export function generateProductSchema(product: {
  id: string;
  name: string;
  image: string | string[];
  description: string;
  sku: string;
  brand: string;
  offers: {
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  }[];
  review?: {
    ratingValue: string;
    bestRating: string;
    worstRating: string;
    reviewCount: string;
  };
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: Array.isArray(product.image) ? product.image : [product.image],
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: product.offers[0].price,
      highPrice: product.offers[product.offers.length - 1].price,
      priceCurrency: product.offers[0].priceCurrency,
      itemCondition: "http://schema.org/NewCondition",
      offerCount: product.offers.length,
      offers: product.offers.map((offer) => ({
        "@type": "Offer",
        url: offer.url,
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        availability: offer.availability,
      })),
    },
    ...(product.review && {
      review: {
        "@type": "Review",
        ratingValue: product.review.ratingValue,
        bestRating: product.review.bestRating,
        worstRating: product.review.worstRating,
        reviewCount: product.review.reviewCount,
      },
    }),
  };
}

/**
 * Wrap JSON-LD in script tag component
 */
export function StructuredData({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
