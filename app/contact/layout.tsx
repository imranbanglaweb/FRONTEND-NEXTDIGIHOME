import type { Metadata } from 'next';
import { generateBreadcrumbSchema, StructuredData } from '../utils/seo';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nextdigihome.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Contact NextDigiHome | Start Your Digital Project',
  description:
    'Contact NextDigiHome to discuss web development, SaaS, custom software, AI automation, digital marketing and other digital solutions.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
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
    title: 'Contact NextDigiHome | Start Your Digital Project',
    description:
      'Contact NextDigiHome to discuss web development, SaaS, custom software, AI automation, digital marketing and other digital solutions.',
    url: `${SITE_URL}/contact`,
    siteName: 'NEXTDIGIHOME',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'Contact NextDigiHome — Start Your Digital Project',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact NextDigiHome | Start Your Digital Project',
    description:
      'Contact NextDigiHome to discuss web development, SaaS, custom software, AI automation, digital marketing and other digital solutions.',
    images: [`${SITE_URL}/og-image.svg`],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: 'Home', path: '/' },
  { label: 'Contact', path: '/contact' },
]);

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact NextDigiHome',
  url: `${SITE_URL}/contact`,
  description:
    'Contact NextDigiHome to discuss web development, SaaS, custom software, AI automation, digital marketing and other digital solutions.',
  mainEntity: {
    '@type': 'Organization',
    name: 'NEXTDIGIHOME',
    url: `${SITE_URL}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+8801700000000',
      contactType: 'customer support',
      email: 'contact@nextdigihome.com',
      availableLanguage: ['English', 'Bengali'],
    },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={contactPageSchema} />
      {children}
    </>
  );
}
