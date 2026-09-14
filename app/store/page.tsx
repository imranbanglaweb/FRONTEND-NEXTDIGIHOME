import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import StoreClient, { type Product, type CategoryItem } from './StoreClient';
import { getApiUrl } from '../utils/api';
import { StructuredData, generateBreadcrumbSchema } from '../utils/seo';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nextdigihome.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'NextDigi Store | Digital Products, Templates & Business Resources',
  description:
    'Explore NextDigi Store for digital products, templates, guides, business resources and practical tools for entrepreneurs, creators and modern businesses.',
  alternates: {
    canonical: `${SITE_URL}/store`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'NextDigi Store | Digital Products, Templates & Business Resources',
    description:
      'Explore NextDigi Store for digital products, templates, guides, business resources and practical tools for entrepreneurs, creators and modern businesses.',
    url: `${SITE_URL}/store`,
    siteName: 'NextDigi Store',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'NextDigi Store — Digital Products & Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextDigi Store | Digital Products, Templates & Business Resources',
    description:
      'Explore NextDigi Store for digital products, templates, guides, business resources and practical tools for entrepreneurs, creators and modern businesses.',
    images: [`${SITE_URL}/og-image.svg`],
  },
};

const unwrapArray = <T,>(data: unknown): T[] => {
  if (Array.isArray(data)) return data as T[];
  if (!data || typeof data !== 'object') return [];

  const root = data as { data?: unknown };
  if (Array.isArray(root.data)) return root.data as T[];
  if (root.data && typeof root.data === 'object') {
    const nested = root.data as { data?: unknown };
    if (Array.isArray(nested.data)) return nested.data as T[];
  }

  return [];
};

async function fetchJson<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      headers: { Accept: 'application/json' },
      next: { revalidate: 1800 },
    });

    if (!response.ok) return [];
    const data = await response.json();
    return unwrapArray<T>(data);
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
}

export default async function StorePage() {
  const [products, categories] = await Promise.all([
    fetchJson<Product>('products?per_page=100'),
    fetchJson<CategoryItem>('categories'),
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: 'NextDigi Store', path: '/store' },
  ]);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NextDigi Store Products & Resources',
    url: `${SITE_URL}/store`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/products/${encodeURIComponent(String(product.slug || product.id))}`,
      name: product.name || `Product ${product.id}`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What type of digital products are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NextDigi Store provides production-ready web application source code, mobile app codebases, developer UI kits, automation scripts, productivity tool subscriptions, and practical guides. All products are digitally delivered with clean documentation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I purchase a product?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Browse our catalog, click "Add to Cart" or "Buy Now", review your order in the cart, and proceed to checkout using local mobile banking (bKash, Nagad, Rocket) or international credit/debit cards.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I receive my digital product?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Digital delivery is immediate upon payment confirmation. You will receive an instant download link on the checkout confirmation screen, a receipt sent to your email, and ongoing permanent access in your customer dashboard under "Downloads".',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I access my purchases later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Once an order is completed, your purchased files, license keys, and downloadable assets remain accessible indefinitely inside your registered NextDigi account dashboard.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support all major Bangladeshi mobile banking systems including bKash, Nagad, and Rocket, along with Visa, MasterCard, and direct digital payments via SSLCommerz secure checkout.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get support after purchasing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Each product includes initial onboarding instructions and technical support for setup or file access via email or the support ticket portal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are digital products refundable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We stand behind the quality of our digital assets with a standard 30-day policy. In cases where the digital file is demonstrably defective, broken, or not as described, and our support team is unable to resolve the issue, a refund or credit can be requested via our refund policy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I request a custom product?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If your business needs a tailored software platform, custom mobile application, or bespoke AI automation workflow that goes beyond our ready-made store products, our NextDigi Solutions division can design, engineer, and deploy a custom solution tailored to your exact specifications.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={itemListSchema} />
      <StructuredData data={faqSchema} />
      <Suspense fallback={<div className="min-h-screen bg-[#07090e] pt-32 text-center text-gray-400">Loading NextDigi Store...</div>}>
        <StoreClient initialProducts={products} initialCategories={categories} />
      </Suspense>
    </>
  );
}
