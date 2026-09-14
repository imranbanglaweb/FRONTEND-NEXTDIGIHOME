import type { Metadata } from 'next';
import { generateBreadcrumbSchema, StructuredData } from '../utils/seo';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nextdigihome.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'About NextDigiHome | Technology, AI, SaaS & Digital Growth',
  description:
    'Learn about NextDigiHome, a technology-focused company providing software development, AI automation, SaaS products, digital growth services and digital resources.',
  alternates: {
    canonical: `${SITE_URL}/about`,
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
    title: 'About NextDigiHome | Technology, AI, SaaS & Digital Growth',
    description:
      'Learn about NextDigiHome, a technology-focused company providing software development, AI automation, SaaS products, digital growth services and digital resources.',
    url: `${SITE_URL}/about`,
    siteName: 'NEXTDIGIHOME',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'About NEXTDIGIHOME — Technology, AI, SaaS & Digital Growth',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About NextDigiHome | Technology, AI, SaaS & Digital Growth',
    description:
      'Learn about NextDigiHome, a technology-focused company providing software development, AI automation, SaaS products, digital growth services and digital resources.',
    images: [`${SITE_URL}/og-image.svg`],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
]);

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NEXTDIGIHOME',
  url: `${SITE_URL}`,
  logo: `${SITE_URL}/og-image.svg`,
  description:
    'NextDigiHome is a technology-focused digital company helping businesses build, automate, market and grow through software, AI, SaaS products, digital marketing and digital resources.',
  founder: {
    '@type': 'Person',
    name: 'Imran Rahman',
    jobTitle: 'Founder & CEO',
  },
  sameAs: [
    'https://twitter.com/nextdigihome',
    'https://www.linkedin.com/company/nextdigihome',
    'https://facebook.com/nextdigihome',
  ],
  knowsAbout: [
    'Software Engineering',
    'Web Development',
    'AI & Automation',
    'SaaS Platforms',
    'Digital Marketing & Growth',
    'Digital Products & Source Code',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is NextDigiHome?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NextDigiHome is a technology-focused digital company helping businesses build, automate, market and grow through custom software development, AI agent workflows, SaaS platforms, digital marketing systems, and digital product resources.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does NextDigiHome provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We deliver comprehensive digital capabilities organized across five focused divisions: NextDigi Solutions (Software & Web Development), NextDigi AI (AI & Automation), NextDigi Growth (Digital Marketing & Performance Ads), NextDigi Labs (SaaS Products), and NextDigi Store (Digital Products & Resources).',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you build custom software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Through NextDigi Solutions, we engineer custom web applications, mobile apps, enterprise portals, API backends, and bespoke database architectures tailored to client specifications with 100% intellectual property ownership transfer.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you build SaaS products?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We architect scalable multi-tenant SaaS platforms featuring recurring billing, modular permission systems, secure APIs, and responsive frontends engineered with Next.js, Node.js, and Laravel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide AI and automation services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NextDigi AI develops deterministic AI agents, intelligent customer support chatbots, multi-model reasoning pipelines, and webhook-driven workflow automations using modern LLM APIs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you manage Meta and Google Ads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NextDigi Growth manages data-backed Meta Ads, Google Search & Performance Max campaigns, server-side Conversion API (CAPI) setups, and technical SEO acquisition funnels.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with startups and small businesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We frequently partner with early-stage founders and growing small businesses to design MVPs, streamline business operations, build acquisition systems, and deploy scalable digital foundations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you work with existing software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We audit, refactor, integrate with, and upgrade existing codebases, databases, or legacy applications, ensuring clean migrations and improved system performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you provide ongoing support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We maintain long-term technical relationships with our clients, providing milestone-driven enhancements, maintenance, infrastructure monitoring, and feature iteration post-launch.',
      },
    },
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={organizationSchema} />
      <StructuredData data={faqSchema} />
      {children}
    </>
  );
}
