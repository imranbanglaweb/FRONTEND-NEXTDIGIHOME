import { Metadata } from "next";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nextdigihome.com";

/**
 * Generate page metadata with all SEO best practices
 */
export function generatePageMetadata(options: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path: string;
  type?: "website" | "article" | "product";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = `${BASE_URL}${options.path}`;
  const image = options.image || "/og-image.svg";

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
     // Open Graph
     openGraph: {
       title: options.title,
       description: options.description,
       url,
       images: [
         {
           url: image,
           width: 1200,
           height: 630,
           alt: options.title,
         },
       ],
       locale: "en_US",
       siteName: "NextDigiHome",
     },
     // Twitter Card
     twitter: {
       card: "summary_large_image",
       title: options.title,
       description: options.description,
       images: [
         {
           url: options.image || "/og-image.svg",
           alt: options.title,
         },
       ],
     },
    // JSON-LD Structured Data
    // Note: This is added via the StructuredData component in the layout
    // We return the data here so it can be used in the layout
    // Actually, we don't return the JSON-LD here because it's added via the component
    // Instead, we return the metadata for <head> and the JSON-LD is added via the StructuredData component
    // But note: the generatePageMetadata function is used to generate the Metadata object for the <head>
    // and the StructuredData is a separate component that returns a script tag.
    // So we don't include the JSON-LD in the Metadata object.
    // We'll just return the metadata for <head> and the Open Graph and Twitter Card.
    // The JSON-LD is handled by the StructuredData component.
    // However, note that the Metadata type from next does not have a field for JSON-LD.
    // So we are safe.
    // But wait: the Metadata type does have a field for `other` which can be used for custom tags?
    // Actually, the Metadata type from next is defined in next/dist/lib/metadata/metadata-types.d.ts
    // and it does not have a field for JSON-LD. We rely on the StructuredData component.
    // So we just return the standard metadata.
    ...(options.author && {
      authors: [{ name: options.author }],
    }),
    ...(options.publishedTime && {
      publishedTime: options.publishedTime,
    }),
    ...(options.modifiedTime && {
      modifiedTime: options.modifiedTime,
    }),
  };
}

/**
 * Generate JSON-LD schema for organization
 */
export function generateOrganizationSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NextDigiHome",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      `${BASE_URL}/facebook`,
      `${BASE_URL}/twitter`,
      `${BASE_URL}/instagram`,
      `${BASE_URL}/linkedin`,
    ],
  };
}

/**
 * Generate JSON-LD schema for website
 */
export function generateWebsiteSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
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
