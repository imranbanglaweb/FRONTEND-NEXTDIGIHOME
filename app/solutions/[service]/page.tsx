import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  GlobeAltIcon, 
  ShoppingBagIcon, 
  DevicePhoneMobileIcon, 
  CommandLineIcon, 
  ServerIcon, 
  WrenchScrewdriverIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ClockIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

type ServiceData = {
  id: string;
  title: string;
  division: string;
  tagline: string;
  description: string;
  longDescription: string;
  accent: string;
  icon: any;
  capabilities: { title: string; desc: string }[];
  deliverables: string[];
  techStack: string[];
  faqs: { q: string; a: string }[];
};

const solutionsData: Record<string, ServiceData> = {
  'web-development': {
    id: 'web-development',
    title: 'Web Development',
    division: 'NextDigi Solutions',
    tagline: 'High-performance web applications, enterprise portals & digital platforms',
    description: 'We build modern, resilient, and blazing-fast web applications using Next.js, React, and modern full-stack architectures. Designed for frictionless customer conversion and scalable operations.',
    longDescription: 'Our web engineering practice delivers mission-critical web applications, high-converting marketing hubs, and internal operational dashboards. Every line of code is structured for modularity, strict TypeScript type safety, Core Web Vitals performance, and search engine dominance.',
    accent: '#00d4aa',
    icon: GlobeAltIcon,
    capabilities: [
      { title: 'Server-Side Rendering (SSR) & Edge Caching', desc: 'Instant page delivery with Next.js App Router, caching strategies, and global edge CDNs.' },
      { title: 'Modular Architecture & Micro-frontends', desc: 'Scalable codebases built with reusable component systems and strict design token consistency.' },
      { title: 'Headless CMS & API Integration', desc: 'Decoupled content authoring paired with custom GraphQL or REST endpoints for effortless updates.' },
      { title: 'Enterprise Security & Compliance', desc: 'Hardened HTTP headers, CSRF/XSS mitigations, automated rate limiting, and encrypted session handling.' }
    ],
    deliverables: [
      'Production-ready Next.js / React application with full source code',
      'Fully responsive UI across mobile, tablet, desktop, and ultra-wide screens',
      'SEO metadata architecture, OpenGraph cards, XML sitemaps, and Schema markup',
      'Automated CI/CD deployment pipelines on Vercel, AWS, or custom VPS',
      'Comprehensive documentation and developer handoff training'
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL / Supabase', 'Docker'],
    faqs: [
      {
        q: 'How long does a typical web application project take?',
        a: 'Standard business applications typically launch within 3 to 6 weeks, while complex enterprise platforms take 8 to 12 weeks depending on integration scope.'
      },
      {
        q: 'Will I own 100% of the intellectual property and source code?',
        a: 'Yes. Upon project completion, all intellectual property, source repositories, and deployment credentials are fully transferred to you.'
      },
      {
        q: 'Do you provide ongoing maintenance and security patches after launch?',
        a: 'Yes. We offer continuous SLA-backed maintenance plans covering uptime monitoring, dependency updates, and security auditing.'
      }
    ]
  },
  'ecommerce': {
    id: 'ecommerce',
    title: 'E-commerce Development',
    division: 'NextDigi Solutions',
    tagline: 'Custom storefronts, high-converting checkouts & payment routing',
    description: 'We build end-to-end commerce platforms with seamless payment gateways (bKash, Nagad, Stripe, Prime Bank), automated order fulfillment, and multi-channel inventory sync.',
    longDescription: 'Our commerce solutions eliminate the clunky friction of traditional template platforms. We engineer bespoke digital storefronts with instant product search, dynamic cart mechanics, multi-currency pricing, and deep logistics integration for local and international markets.',
    accent: '#8b5cf6',
    icon: ShoppingBagIcon,
    capabilities: [
      { title: 'Custom Checkout & Payment Gateways', desc: 'Native bKash, Nagad, Rocket, Stripe, and direct bank transfer integrations with instant webhooks.' },
      { title: 'Real-Time Inventory & Courier Logistics', desc: 'Automated consignment creation with Pathao, Steadfast, RedX, and warehouse inventory syncing.' },
      { title: 'Cart Abandonment & Conversion Optimizations', desc: 'One-click checkout flows, localized OTP SMS verification, and persistent user carts.' },
      { title: 'Admin Order & Revenue Analytics', desc: 'Detailed dashboard tracking gross margin, order status, courier delivery rates, and customer LTV.' }
    ],
    deliverables: [
      'Full headless commerce storefront with lightning-fast catalog search',
      'Automated multi-gateway payment processing with automated invoice generation',
      'Order management dashboard with automated courier dispatching',
      'Customer account portal with order tracking and history',
      'Standardized security protocol with PCI-DSS aligned data handling'
    ],
    techStack: ['Next.js', 'Node.js / Laravel API', 'PostgreSQL / MySQL', 'Redis Caching', 'bKash / Nagad APIs', 'Stripe API'],
    faqs: [
      {
        q: 'Can you integrate local Bangladeshi payment methods alongside international cards?',
        a: 'Yes. We build unified payment routing that supports bKash, Nagad, Rocket, and Bangladeshi bank gateways as well as Stripe for international credit cards.'
      },
      {
        q: 'Can the store handle high traffic spikes during flash sales?',
        a: 'Yes. We implement Redis caching, database connection pooling, and edge-rendered catalog pages to absorb intense traffic surges smoothly.'
      }
    ]
  },
  'mobile-app': {
    id: 'mobile-app',
    title: 'Mobile App Development',
    division: 'NextDigi Solutions',
    tagline: 'Cross-platform iOS & Android mobile applications engineered for speed',
    description: 'We design and engineer high-performance mobile applications using Flutter and native frameworks, delivering native fluid experiences with unified cross-platform codebases.',
    longDescription: 'Whether launching a customer-facing consumer service, an on-demand booking utility, or an internal enterprise workforce app, we craft mobile experiences that feel responsive, look stunning, and operate reliably even on intermittent network connections.',
    accent: '#38bdf8',
    icon: DevicePhoneMobileIcon,
    capabilities: [
      { title: 'Unified Flutter Architecture', desc: 'Write once, deploy to both Apple iOS App Store and Google Play Store with native 60fps performance.' },
      { title: 'Offline-First Data Synchronization', desc: 'Local SQLite/Hive persistence ensuring uninterrupted app functionality in low-signal environments.' },
      { title: 'Push Notifications & Deep Linking', desc: 'Segmented user re-engagement via Firebase Cloud Messaging (FCM) and universal deep links.' },
      { title: 'Biometric & Secure Device Authentication', desc: 'Fingerprint, FaceID, and secure keychain encryption for customer peace of mind.' }
    ],
    deliverables: [
      'Complete iOS and Android binaries ready for App Store and Play Store review',
      'Full source code with modular architecture and clean state management (Bloc / Provider)',
      'Backend REST / GraphQL API endpoints and administration console',
      'App Store submission assistance and approval guidance'
    ],
    techStack: ['Flutter', 'Dart', 'React Native', 'Firebase', 'REST APIs', 'SQLite', 'Apple App Store / Google Play'],
    faqs: [
      {
        q: 'Do you manage the App Store and Google Play submission process?',
        a: 'Yes. We handle app signing, store asset preparation, privacy disclosure setup, and the complete submission review process until published.'
      },
      {
        q: 'Can our mobile app share the same database as our web application?',
        a: 'Yes. We architect centralized REST or GraphQL APIs so web, mobile, and backend admin portals share synchronized live data.'
      }
    ]
  },
  'custom-software': {
    id: 'custom-software',
    title: 'Custom Software Development',
    division: 'NextDigi Solutions',
    tagline: 'Tailored ERP, CRM, portal & operational software built for unique workflows',
    description: 'Eliminate off-the-shelf software bottlenecks. We engineer custom enterprise systems, internal operating dashboards, and automated management software built exactly for your business logic.',
    longDescription: 'Standard commercial software often forces businesses into rigid workflows and excessive per-seat license fees. NextDigi Solutions builds proprietary systems that model your exact operational rules, inventory hierarchies, role permissions, and financial reporting metrics.',
    accent: '#f59e0b',
    icon: CommandLineIcon,
    capabilities: [
      { title: 'Role-Based Access Control (RBAC)', desc: 'Granular permissions, multi-tenant data segregation, and immutable administrative audit trails.' },
      { title: 'Complex Workflow Automation', desc: 'Multi-stage approval hierarchies, automated document generation, and digital signature integration.' },
      { title: 'Legacy System Modernization', desc: 'Safe extraction of data from legacy spreadsheets or legacy databases into modern web dashboards.' },
      { title: 'Real-Time Operational Reporting', desc: 'Configurable analytical charts, automated end-of-day revenue summaries, and CSV/PDF export engines.' }
    ],
    deliverables: [
      'Proprietary operational software platform tailored to your specific organizational hierarchy',
      'Interactive dashboard for executives, managers, and operational staff',
      'Automated backup and database replication setup',
      'Staff onboarding sessions and video documentation walkthroughs'
    ],
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Prisma ORM', 'Tailwind CSS', 'Redis'],
    faqs: [
      {
        q: 'Why should we invest in custom software instead of buying existing SaaS licenses?',
        a: 'Custom software eliminates recurring per-user licensing fees, safeguards your proprietary operational advantage, and adapts directly to your process rather than forcing compromises.'
      }
    ]
  },
  'saas-development': {
    id: 'saas-development',
    title: 'SaaS Development',
    division: 'NextDigi Solutions',
    tagline: 'Multi-tenant architectures, subscription billing & scalable cloud infrastructure',
    description: 'We turn software ideas into high-margin subscription products. From architecture and tenant isolation to recurring billing and metering, we build SaaS ready for scale.',
    longDescription: 'Building a SaaS platform requires sophisticated engineering: robust tenant isolation, automated onboarding, usage metering, subscription lifecycle management, and reliable background worker queues. We have built and operated our own SaaS products in NextDigi Labs and apply those direct lessons to your build.',
    accent: '#ec4899',
    icon: CpuChipIcon,
    capabilities: [
      { title: 'Multi-Tenant Data Architecture', desc: 'Secure row-level security (RLS) or schema-isolated architectures ensuring absolute tenant privacy.' },
      { title: 'Stripe & Regional Billing Integration', desc: 'Automated recurring billing, seat-based subscriptions, usage metering, invoices, and dunning.' },
      { title: 'Team Workspaces & Invitation Flows', desc: 'Self-serve workspace creation, user invitations, permission scopes, and session security.' },
      { title: 'Background Processing & Job Queues', desc: 'Heavy background task distribution powered by Redis queues, BullMQ, and serverless workers.' }
    ],
    deliverables: [
      'Complete multi-tenant SaaS application codebase with full administrative console',
      'Customer billing portal with automated prorated tier upgrading and cancellations',
      'Usage metrics and product analytics dashboards',
      'Automated unit, integration, and end-to-end testing suite'
    ],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL (Supabase / RDS)', 'Stripe Billing', 'Redis / BullMQ', 'Tailwind CSS'],
    faqs: [
      {
        q: 'Do you help with MVP scoping to launch faster?',
        a: 'Yes. We specialize in identifying the highest-leverage Core Value Proposition to deliver a polished, revenue-ready MVP in 4 to 8 weeks.'
      }
    ]
  },
  'api-integrations': {
    id: 'api-integrations',
    title: 'API & Systems Integration',
    division: 'NextDigi Solutions',
    tagline: 'Connect CRMs, payment gateways, ERPs, messaging & external services',
    description: 'We build resilient middleware, webhook consumers, and bidirectional API bridges that connect disparate business platforms into a unified, synchronized ecosystem.',
    longDescription: 'Disjointed software silos slow down growth and produce costly data entry mistakes. We engineer robust, fault-tolerant API pipelines that synchronize customer records, transactions, inventory counts, and notification events across your entire tech stack.',
    accent: '#10b981',
    icon: ServerIcon,
    capabilities: [
      { title: 'Bidirectional Data Synchronization', desc: 'Real-time synchronization between CRM, ERP, accounting software, and front-end portals.' },
      { title: 'Fault-Tolerant Webhook Handlers', desc: 'Idempotent webhook ingestion with automatic retry policies, dead-letter queues, and audit logging.' },
      { title: 'Custom REST & GraphQL Endpoints', desc: 'Securely exposed APIs with OpenAPI / Swagger documentation and tokenized rate-limiting.' },
      { title: 'Third-Party Provider Connectors', desc: 'Native connections to WhatsApp Business API, Twilio, SendGrid, Meta Graph API, and accounting tools.' }
    ],
    deliverables: [
      'Production API integration gateway with retry handlers and health monitoring',
      'Interactive Swagger / Postman API documentation collections',
      'Comprehensive error alert webhooks into Slack or Telegram for incident response'
    ],
    techStack: ['Node.js', 'Express / Fastify', 'TypeScript', 'Redis', 'PostgreSQL', 'Docker'],
    faqs: [
      {
        q: 'What happens if a third-party service experiences downtime?',
        a: 'Our middleware is engineered with resilient message queues (Redis/RabbitMQ) that buffer events and automatically retry with exponential backoff until success.'
      }
    ]
  },
  'hosting-maintenance': {
    id: 'hosting-maintenance',
    title: 'Cloud Hosting & Maintenance',
    division: 'NextDigi Solutions',
    tagline: 'Reliable cloud infrastructure, proactive 24/7 monitoring & security management',
    description: 'We manage your cloud hosting environments, perform continuous security updates, monitor server health, and provide rapid developer support whenever you need it.',
    longDescription: 'A software platform is an ongoing asset that requires vigilant maintenance, regular dependency upgrades, zero-day patch deployments, and automated database backups. NextDigi Solutions provides dedicated engineering oversight to keep your business operating 24/7 without interruption.',
    accent: '#6366f1',
    icon: WrenchScrewdriverIcon,
    capabilities: [
      { title: '24/7 Uptime & Synthetic Monitoring', desc: 'Continuous endpoint health verification with instant SMS, Telegram, and email alerting on degradation.' },
      { title: 'Automated Daily Encrypted Backups', desc: 'Point-in-time database snapshots stored off-site with tested automated disaster recovery plans.' },
      { title: 'Security Audits & Patching', desc: 'Proactive dependency audits, firewall management, and SSL/TLS certificate automated renewals.' },
      { title: 'Cloud Optimization & Cost Tuning', desc: 'Right-sizing cloud instances, serverless tuning, and CDN edge optimization to lower cloud bills.' }
    ],
    deliverables: [
      'SLA-backed technical support and emergency intervention team',
      'Monthly infrastructure health, security, and performance report',
      'Automated disaster recovery protocol with under-30-minute RTO targets'
    ],
    techStack: ['AWS', 'DigitalOcean', 'Vercel', 'Docker', 'Linux / Ubuntu', 'Cloudflare', 'Grafana / Uptime Kuma'],
    faqs: [
      {
        q: 'What is your response time during critical outages?',
        a: 'For emergency outages on our dedicated maintenance plans, our engineering team responds within 15 to 30 minutes with active mitigation.'
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(solutionsData).map((service) => ({ service }));
}

type PageProps = {
  params: Promise<{ service: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const data = solutionsData[service];

  if (!data) {
    return {
      title: 'Service Not Found | NextDigi Solutions',
      description: 'The requested technology solution could not be found.',
    };
  }

  return generatePageMetadata({
    title: `${data.title} | ${data.division}`,
    description: `${data.tagline}. ${data.description}`,
    path: `/solutions/${service}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { service } = await params;
  const data = solutionsData[service];

  if (!data) {
    notFound();
  }

  const IconComponent = data.icon;

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Glow background accents */}
      <div 
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[140px] pointer-events-none rounded-full opacity-20"
        style={{ backgroundColor: data.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/solutions" className="hover:text-[#00d4aa] transition">Solutions</Link>
          <span>/</span>
          <span className="text-white font-medium">{data.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111622]/90 to-[#0c0f17]/90 backdrop-blur-xl p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-gray-300 uppercase mb-5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.accent }} />
            {data.division}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {data.title}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-gray-300 mb-6">
                {data.tagline}
              </p>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                {data.longDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/contact?service=${encodeURIComponent(data.title)}`}
                  className="px-7 py-3.5 rounded-xl font-semibold text-black transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  style={{ backgroundColor: data.accent }}
                >
                  Start Your {data.title} Project
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/solutions"
                  className="px-6 py-3.5 rounded-xl font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  View All Solutions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10">
                  <IconComponent className="w-8 h-8" style={{ color: data.accent }} />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Technologies & Frameworks
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {data.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/40 border border-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-gray-400 flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
                Direct engineering handoff with 100% code ownership
              </div>
            </div>
          </div>
        </div>

        {/* Technical Capabilities */}
        <div className="mb-16">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Engineering Capabilities
            </h2>
            <p className="text-gray-400">
              Structured for scalability, security, and sustained business efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.capabilities.map((cap, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-[#0e131d] border border-white/10 hover:border-white/20 transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 shrink-0 mt-1">
                    <SparklesIcon className="w-4 h-4" style={{ color: data.accent }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4aa] transition">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="mb-16 bg-[#0c1017] rounded-3xl border border-white/10 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-6">
            What You Receive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-[#00d4aa] shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-4xl">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0e131d] border border-white/10">
                <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-[#00d4aa]" />
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step CTA */}
        <div className="rounded-3xl border border-[#00d4aa]/30 bg-gradient-to-r from-[#00d4aa]/10 via-[#8b5cf6]/10 to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to build your {data.title.toLowerCase()}?
            </h3>
            <p className="text-gray-300 max-w-xl">
              Talk directly with our solutions architects to discuss technical requirements, timelines, and budget estimation.
            </p>
          </div>
          <Link
            href={`/contact?service=${encodeURIComponent(data.title)}`}
            className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/20 shrink-0"
          >
            Start a Project
          </Link>
        </div>

      </div>
    </div>
  );
}
