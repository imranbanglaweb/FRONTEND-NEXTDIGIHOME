import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  BeakerIcon,
  ShoppingBagIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  ShareIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ChevronRightIcon,
  ArrowRightCircleIcon,
  ClockIcon,
  CircleStackIcon,
  CubeTransparentIcon,
  ServerIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  CpuChipIcon,
  LightBulbIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  DocumentCheckIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'NextDigi Labs | SaaS Products, AI & Business Technology',
  description:
    'Explore NextDigi Labs, where we build SaaS products, AI-powered platforms, business tools and technology solutions for modern businesses.',
  path: '/labs',
  keywords: [
    'NextDigi Labs',
    'SaaS Products',
    'NextDigi Commerce',
    'Garibondhu360',
    'NextDigi Social',
    'NextDigi Automate',
    'AI Platforms',
    'Business Tools',
    'Software Products Bangladesh',
  ],
});

// ─── DATA DEFINITIONS ────────────────────────────────────────────────────────

type ProductItem = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  status: 'LIVE' | 'BETA' | 'IN DEVELOPMENT' | 'COMING SOON' | 'ARCHIVED';
  statusColor: string;
  statusBorder: string;
  statusBg: string;
  description: string;
  accent: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  url: string;
  detailUrl: string;
  isExternal: boolean;
  features: string[];
  plannedFeatures?: string[];
  ctaText: string;
};

const LIVE_PRODUCTS: ProductItem[] = [
  {
    id: 'commerce',
    name: 'NextDigi Commerce',
    slug: 'commerce',
    tagline: 'AI-powered Ecommerce Automation Platform',
    category: 'Commerce Automation & Operations',
    status: 'LIVE',
    statusColor: 'text-[#00d4aa]',
    statusBorder: 'border-[#00d4aa]/30',
    statusBg: 'bg-[#00d4aa]/10',
    accent: '#00d4aa',
    icon: ShoppingBagIcon,
    url: 'https://commerce.nextdigihome.com/',
    detailUrl: '/labs/commerce',
    isExternal: true,
    description:
      'A complete, turnkey e-commerce operating platform engineered for high-growth online retailers. Built with native automated courier booking, local payment gateway integrations, and AI business assistance.',
    features: [
      'E-commerce Storefront & Catalog',
      'Premium Responsive Themes',
      'AI Business Assistant & Product Copy',
      'Product & Stock Inventory Management',
      'Order & Consignment Management',
      'Payment Integration (bKash, Nagad, Cards)',
      'Automated Courier Integration (Pathao, Steadfast, RedX)',
      'Marketing & Discount Coupon Tools',
      'Customer CRM & Account Portals',
      'Sales & Revenue Analytics',
      'Custom Domain & Automated SSL',
      'Automated WhatsApp & SMS Notifications',
    ],
    ctaText: 'Visit NextDigi Commerce',
  },
  {
    id: 'garibondhu360',
    name: 'Garibondhu360',
    slug: 'garibondhu360',
    tagline: 'Transport Management & Business Operations SaaS',
    category: 'Transport & Fleet Logistics ERP',
    status: 'LIVE',
    statusColor: 'text-[#38bdf8]',
    statusBorder: 'border-[#38bdf8]/30',
    statusBg: 'bg-[#38bdf8]/10',
    accent: '#38bdf8',
    icon: TruckIcon,
    url: 'https://garibondhu360.nextdigihome.com/',
    detailUrl: '/labs/garibondhu360',
    isExternal: true,
    description:
      'Specialized enterprise operations and transport management software for automotive workshops, corporate transport fleets, and vehicle service maintenance centers.',
    features: [
      'Transport & Trip Management',
      'Vehicle & Asset Registry',
      'Maintenance Schedules & Job Cards',
      'Spare Parts Inventory Tracking',
      'Comprehensive Operations Reports',
      'User Management & Role-Based Access',
      'Mobile-Optimized Dispatch Interface',
    ],
    ctaText: 'Explore Garibondhu360',
  },
];

const COMING_SOON_PRODUCTS: ProductItem[] = [
  {
    id: 'social',
    name: 'NextDigi Social',
    slug: 'social',
    tagline: 'Social Media Management & Automation Platform',
    category: 'Social Publishing & Content',
    status: 'COMING SOON',
    statusColor: 'text-[#8b5cf6]',
    statusBorder: 'border-[#8b5cf6]/30',
    statusBg: 'bg-[#8b5cf6]/10',
    accent: '#8b5cf6',
    icon: ShareIcon,
    url: 'https://social.nextdigihome.com/',
    detailUrl: '/labs/social',
    isExternal: false,
    description:
      'A unified publishing, calendar, and analytics console engineered to schedule and automate brand social media campaigns across multiple channels from a single workspace.',
    features: [],
    plannedFeatures: [
      'Multi-platform Publishing (Meta, LinkedIn, TikTok, YouTube)',
      'Interactive Visual Content Calendar',
      'Automated Post Scheduling & Queues',
      'Cross-Channel Engagement Analytics',
      'AI Content & Caption Assistance',
      'Centralized Brand Social Account Management',
    ],
    ctaText: 'Coming Soon',
  },
  {
    id: 'automate',
    name: 'NextDigi Automate',
    slug: 'automate',
    tagline: 'AI Business Workflow Automation Platform',
    category: 'Workflow Orchestration & AI',
    status: 'COMING SOON',
    statusColor: 'text-[#f59e0b]',
    statusBorder: 'border-[#f59e0b]/30',
    statusBg: 'bg-[#f59e0b]/10',
    accent: '#f59e0b',
    icon: BoltIcon,
    url: 'https://automate.nextdigihome.com/',
    detailUrl: '/labs/automate',
    isExternal: false,
    description:
      'A visual business workflow automation engine that connects databases, spreadsheets, messaging channels, and AI agents into autonomous, resilient operational pipelines.',
    features: [],
    plannedFeatures: [
      'Visual Node-Based Workflow Canvas',
      'Autonomous Task-Driven AI Agents',
      'Custom Business Logic Automation',
      'API & Webhook Event Listeners',
      'Automated WhatsApp & Email Alert Triggers',
      'Bi-Directional CRM & Database Sync',
    ],
    ctaText: 'Coming Soon',
  },
];

const ECOSYSTEM_HIERARCHY = [
  {
    name: 'NextDigi Commerce',
    status: 'LIVE',
    statusColor: 'text-[#00d4aa]',
    desc: 'AI-Powered Ecommerce Automation',
    url: 'https://commerce.nextdigihome.com/',
  },
  {
    name: 'Garibondhu360',
    status: 'LIVE',
    statusColor: 'text-[#38bdf8]',
    desc: 'Transport & Fleet Logistics SaaS',
    url: 'https://garibondhu360.nextdigihome.com/',
  },
  {
    name: 'NextDigi Social',
    status: 'COMING SOON',
    statusColor: 'text-[#8b5cf6]',
    desc: 'Omnichannel Social Publishing',
    url: 'https://social.nextdigihome.com/',
  },
  {
    name: 'NextDigi Automate',
    status: 'COMING SOON',
    statusColor: 'text-[#f59e0b]',
    desc: 'AI Workflow Orchestration Engine',
    url: 'https://automate.nextdigihome.com/',
  },
];

const BUILD_STEPS = [
  {
    step: '01',
    title: 'IDENTIFY',
    desc: 'Find an acute, real-world business operational bottleneck worth solving with software.',
  },
  {
    step: '02',
    title: 'VALIDATE',
    desc: 'Conduct structured research with industry operators, analyze competitive friction, and confirm market demand.',
  },
  {
    step: '03',
    title: 'DESIGN',
    desc: 'Architect the end-to-end user experience, data models, schema relationships, and API contract specifications.',
  },
  {
    step: '04',
    title: 'BUILD',
    desc: 'Develop the production-grade MVP focusing on core functional stability and high-concurrency performance.',
  },
  {
    step: '05',
    title: 'TEST',
    desc: 'Rigorously stress-test edge cases, checkout flows, security postures, latency profiles, and failure modes.',
  },
  {
    step: '06',
    title: 'LAUNCH',
    desc: 'Deploy on containerized cloud infrastructure and onboard early pilot business operators.',
  },
  {
    step: '07',
    title: 'IMPROVE',
    desc: 'Incorporate continuous user feedback, telemetry, and conversion data into weekly release iterations.',
  },
];

const LIFECYCLE_STAGES = [
  { stage: 'IDEA', desc: 'Real problem identified' },
  { stage: 'VALIDATION', desc: 'Customer demand verified' },
  { stage: 'MVP', desc: 'Core functional build' },
  { stage: 'BETA', desc: 'Controlled pilot testing' },
  { stage: 'LAUNCH', desc: 'Production deployment' },
  { stage: 'GROW', desc: 'Adoption & feature polish' },
  { stage: 'SCALE', desc: 'Enterprise infrastructure' },
];

const TECH_CATEGORIES = [
  {
    name: 'Frontend & UI Frameworks',
    techs: ['Next.js', 'React', 'Vue.js', 'Tailwind CSS', 'TypeScript'],
    desc: 'Sub-second page rendering, responsive component architecture, and high-conversion user interfaces.',
  },
  {
    name: 'Backend & Microservices',
    techs: ['Laravel (PHP)', 'Node.js', 'REST APIs', 'Webhook Pipelines'],
    desc: 'Robust business logic, transaction isolation, queue processing, and third-party API orchestration.',
  },
  {
    name: 'Database & Caching Systems',
    techs: ['MySQL', 'MongoDB', 'Redis', 'SQL Server'],
    desc: 'Relational data integrity, high-throughput session caching, and scalable document storage.',
  },
  {
    name: 'Cloud & Infrastructure',
    techs: ['Docker Containers', 'Linux / Ubuntu', 'Automated SSL', 'Git Version Control'],
    desc: 'Automated CI/CD deployments, zero-downtime rolling updates, and enterprise data security.',
  },
];

const PRODUCT_PRINCIPLES = [
  {
    number: '01',
    title: 'Solve Real Problems',
    desc: 'We never build software for novelty. Every product in NextDigi Labs is created to remove measurable commercial or operational friction for businesses.',
  },
  {
    number: '02',
    title: 'Keep It Practical',
    desc: 'Useful functionality and reliable performance matter infinitely more than complex, bloated menus that confuse daily business operators.',
  },
  {
    number: '03',
    title: 'Build For Scale',
    desc: 'Data schemas, queuing architectures, and API endpoints are designed from day one to handle high concurrency and expanding transaction volumes.',
  },
  {
    number: '04',
    title: 'Automate Where It Helps',
    desc: 'We integrate practical AI and event-driven automation only where it saves hours of repetitive human data entry and eliminates costly manual errors.',
  },
  {
    number: '05',
    title: 'Listen To Users',
    desc: 'Our roadmap is steered by actual usage logs, telemetry, and direct feedback from businesses using our platforms in production every day.',
  },
];

// JSON-LD Structured Data for SoftwareApplication
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'NextDigi Commerce',
      operatingSystem: 'Web-based cloud application',
      applicationCategory: 'BusinessApplication',
      url: 'https://commerce.nextdigihome.com/',
      description:
        'AI-powered Ecommerce Automation Platform with native courier dispatch, local payment gateways, and inventory management.',
      creator: {
        '@type': 'Organization',
        name: 'NextDigiHome',
        url: 'https://nextdigihome.com',
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Garibondhu360',
      operatingSystem: 'Web-based cloud application',
      applicationCategory: 'BusinessApplication',
      url: 'https://garibondhu360.nextdigihome.com/',
      description:
        'Transport Management & Business Operations SaaS for fleet logistics and automotive service workshops.',
      creator: {
        '@type': 'Organization',
        name: 'NextDigiHome',
        url: 'https://nextdigihome.com',
      },
    },
  ],
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function NextDigiLabsPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#8b5cf6] selection:text-white">
      {/* Schema Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ─── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <section
        id="labs-hero"
        aria-label="NextDigi Labs Hero"
        className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden"
      >
        {/* Background glow accents */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[#8b5cf6]/[0.09] blur-[160px] rounded-full" />
          <div className="absolute top-48 right-10 w-[500px] h-[350px] bg-[#00d4aa]/[0.06] blur-[140px] rounded-full" />
          <div className="absolute bottom-10 left-10 w-[450px] h-[300px] bg-[#38bdf8]/[0.05] blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#71717a] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3 text-[#3f3f46]" aria-hidden="true" />
            <span className="text-[#a78bfa] font-medium">NextDigi Labs</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 mb-6">
                <BeakerIcon className="w-3.5 h-3.5 text-[#a78bfa]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[2px] text-[#a78bfa]">
                  NEXTDIGI LABS
                </span>
                <span className="text-xs text-[#71717a]">|</span>
                <span className="text-xs font-semibold text-gray-300">
                  Build. Experiment. Launch.
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
                Technology We{' '}
                <span className="bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#00d4aa] bg-clip-text text-transparent">
                  Build Ourselves.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-2xl mb-8">
                NextDigi Labs creates SaaS products, business platforms and intelligent digital tools for modern businesses. From commerce automation to business management and AI-powered workflows, we turn practical ideas into scalable software products.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <Link
                  id="hero-explore-products-btn"
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#9d72f9] hover:to-[#8b5cf6] transition shadow-lg shadow-[#8b5cf6]/25 active:scale-95"
                >
                  Explore Our Products
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  id="hero-build-product-btn"
                  href="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#131823] hover:bg-[#1a2130] border border-white/10 hover:border-[#8b5cf6]/40 transition active:scale-95"
                >
                  Build a Product With Us
                </Link>
              </div>

              {/* Capability Pill Tags */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap gap-2 text-xs text-[#94a3b8]">
                {[
                  'SaaS Products',
                  'Technology Products',
                  'Internal Products',
                  'Product R&D',
                  'Business Tools',
                  'AI-Powered Platforms',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-[#131823] border border-white/[0.06] text-gray-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Hero Visual: Connected SaaS Engineering Studio Mockup */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-white/10 bg-[#0d121c]/95 backdrop-blur-md p-6 shadow-2xl shadow-black/80">
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-[#94a3b8] ml-2">labs.nextdigihome.internal</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse" />
                    2 LIVE PLATFORMS
                  </span>
                </div>

                {/* Active Products Telemetry Grid */}
                <div className="space-y-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-[#131823] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa]">
                        <ShoppingBagIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">NextDigi Commerce</div>
                        <div className="text-[10px] font-mono text-[#71717a]">commerce.nextdigihome.com</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30">
                      LIVE
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#131823] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8]">
                        <TruckIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Garibondhu360</div>
                        <div className="text-[10px] font-mono text-[#71717a]">garibondhu360.nextdigihome.com</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* Pipeline Health Monitor */}
                <div className="p-4 rounded-xl bg-[#101520] border border-white/5 mb-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-300 mb-2">
                    <span>Engineering Architecture Stack</span>
                    <span className="text-[10px] text-[#a78bfa]">Continuous Deployment</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04] text-gray-400">
                      <span className="text-white block font-sans font-bold">Next.js + React</span>
                      Sub-second Edge Storefronts
                    </div>
                    <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04] text-gray-400">
                      <span className="text-white block font-sans font-bold">Laravel Core</span>
                      Transactional ERP &amp; APIs
                    </div>
                    <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04] text-gray-400">
                      <span className="text-white block font-sans font-bold">MySQL &amp; Redis</span>
                      High-Throughput Datastores
                    </div>
                    <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04] text-gray-400">
                      <span className="text-white block font-sans font-bold">Docker Microservices</span>
                      Isolated Production Pods
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-[#71717a]">
                    NextDigi Labs Studio Engine • Proprietary Software Incubation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. PRODUCT ECOSYSTEM ───────────────────────────────────────────── */}
      <section
        id="product-ecosystem"
        aria-labelledby="ecosystem-heading"
        className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#a78bfa] block mb-3">
              INTEGRATED PORTFOLIO
            </span>
            <h2 id="ecosystem-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              The NextDigi Product Ecosystem
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              One master technology ecosystem powering multiple specialized SaaS platforms engineered for high-concurrency business operations.
            </p>
          </div>

          {/* Ecosystem Visual Tree */}
          <div className="max-w-4xl mx-auto">
            {/* Master Node */}
            <div className="flex flex-col items-center">
              <div className="px-6 py-3.5 rounded-2xl bg-[#131823] border border-[#8b5cf6]/40 text-center shadow-lg shadow-[#8b5cf6]/10">
                <div className="text-xs font-bold uppercase tracking-[2px] text-[#a78bfa]">
                  NEXTDIGIHOME
                </div>
                <div className="text-[11px] text-gray-400 font-medium">
                  Master Technology Ecosystem
                </div>
              </div>

              {/* Connecting vertical line */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-[#8b5cf6]/50 to-white/10 my-1" />

              {/* Products Nodes Grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                {ECOSYSTEM_HIERARCHY.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-xl bg-[#0e131d] border border-white/[0.08] text-center hover:border-white/20 transition-all"
                  >
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${item.statusColor} inline-block mb-2`}
                    >
                      {item.status}
                    </span>
                    <h3 className="text-sm font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-[11px] text-[#94a3b8] leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. LIVE PRODUCTS ───────────────────────────────────────────────── */}
      <section id="products" aria-labelledby="live-products-heading" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[11px] font-bold text-[#00d4aa] uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                ACTIVE IN PRODUCTION
              </div>
              <h2 id="live-products-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Live SaaS Products
              </h2>
            </div>
            <p className="text-sm text-[#94a3b8] mt-3 sm:mt-0 max-w-md">
              Fully operational software applications currently deployed and processing real transactions in production.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {LIVE_PRODUCTS.map((prod) => {
              const Icon = prod.icon;
              return (
                <div
                  key={prod.id}
                  id={`product-${prod.id}`}
                  className="rounded-3xl border border-white/10 bg-[#0c1017] p-8 transition-all duration-300 flex flex-col justify-between hover:border-white/20 hover:shadow-[0_0_35px_rgba(0,212,170,0.10)] group"
                >
                  <div>
                    {/* Card Header: Icon, Category & Status */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-105 transition-transform"
                        style={{ color: prod.accent }}
                      >
                        <Icon className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                          {prod.category}
                        </span>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${prod.statusColor} ${prod.statusBorder} ${prod.statusBg}`}
                        >
                          {prod.status}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#00d4aa] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: prod.accent }}>
                      {prod.tagline}
                    </p>
                    <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                      {prod.description}
                    </p>

                    {/* Verified Capabilities Checklist */}
                    <div className="mb-8 pt-5 border-t border-white/5">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-3">
                        Implemented Capabilities &amp; Modules
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prod.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                            <CheckCircleIcon className="w-4 h-4 text-[#00d4aa] shrink-0" aria-hidden="true" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Launch Live App + Architecture Overview */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-6 border-t border-white/5">
                    <a
                      href={prod.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3.5 px-5 rounded-xl font-bold text-xs text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/20 flex items-center justify-center gap-2"
                    >
                      <span>{prod.ctaText}</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <Link
                      href={prod.detailUrl}
                      className="py-3.5 px-5 rounded-xl font-semibold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/10 text-center transition"
                    >
                      Architecture Overview
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. COMING SOON PRODUCTS ────────────────────────────────────────── */}
      <section
        id="coming-soon-products"
        aria-labelledby="coming-soon-heading"
        className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#8b5cf6] block mb-2">
                R&amp;D PIPELINE
              </span>
              <h2 id="coming-soon-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Products In Development
              </h2>
            </div>
            <p className="text-sm text-[#94a3b8] mt-3 sm:mt-0 max-w-md">
              Software platforms currently in active engineering, prototyping, or private development stages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {COMING_SOON_PRODUCTS.map((prod) => {
              const Icon = prod.icon;
              return (
                <div
                  key={prod.id}
                  id={`product-${prod.id}`}
                  className="rounded-3xl border border-white/[0.08] bg-[#0c1017] p-8 flex flex-col justify-between hover:border-white/20 transition-all group"
                >
                  <div>
                    {/* Card Header: Icon, Category & Status */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10"
                        style={{ color: prod.accent }}
                      >
                        <Icon className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                          {prod.category}
                        </span>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${prod.statusColor} ${prod.statusBorder} ${prod.statusBg}`}
                        >
                          {prod.status}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-2xl font-black text-white mb-2">
                      {prod.name}
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: prod.accent }}>
                      {prod.tagline}
                    </p>
                    <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                      {prod.description}
                    </p>

                    {/* Planned Capabilities List */}
                    <div className="mb-8 pt-5 border-t border-white/5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                          Planned Capabilities
                        </span>
                        <span className="text-[10px] text-[#8b5cf6] font-mono">
                          In Active Specification
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prod.plannedFeatures?.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-6 border-t border-white/5">
                    <button
                      type="button"
                      disabled
                      className="flex-1 py-3.5 px-5 rounded-xl font-bold text-xs text-gray-400 bg-white/5 border border-white/10 text-center cursor-not-allowed"
                    >
                      {prod.ctaText}
                    </button>
                    <Link
                      href={prod.detailUrl}
                      className="py-3.5 px-5 rounded-xl font-semibold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/10 text-center transition"
                    >
                      Planned Architecture
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-[#111622] border border-white/10 text-center">
            <p className="text-xs text-[#94a3b8]">
              Planned features represent engineering roadmap specifications and are subject to validation during beta test cycles. We do not display synthetic mockups as live functionality.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 5. HOW WE BUILD PRODUCTS ───────────────────────────────────────── */}
      <section
        id="how-we-build"
        aria-labelledby="build-process-heading"
        className="py-20 lg:py-28 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#a78bfa] block mb-3">
              ENGINEERING METHODOLOGY
            </span>
            <h2 id="build-process-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              How We Build Products
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              Our systematic 7-step discipline that turns acute market friction into stable, scalable software solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUILD_STEPS.map((s) => (
              <div
                key={s.step}
                className="p-6 rounded-2xl bg-[#0c1017] border border-white/[0.08] hover:border-[#8b5cf6]/40 transition-all"
              >
                <span className="text-2xl font-black font-mono text-[#8b5cf6]/60 block mb-2">
                  {s.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. FROM IDEA TO SAAS (PRODUCT LIFECYCLE) ───────────────────────── */}
      <section
        id="lifecycle"
        aria-labelledby="lifecycle-heading"
        className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative overflow-hidden"
      >
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#8b5cf6]/[0.05] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              PRODUCT PHILOSOPHY
            </span>
            <h2 id="lifecycle-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              From Idea to Scaled SaaS
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              Every platform in NextDigi Labs journeys through a structured validation and scaling pipeline.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {LIFECYCLE_STAGES.map((st, idx) => (
              <div
                key={st.stage}
                className="p-4 rounded-xl bg-[#0e131d] border border-white/[0.06] text-center hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#71717a] block mb-1">
                    0{idx + 1}
                  </span>
                  <div className="text-sm font-black text-white mb-1.5">{st.stage}</div>
                </div>
                <p className="text-[11px] text-[#94a3b8] leading-tight mt-2">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. TECHNOLOGY ──────────────────────────────────────────────────── */}
      <section
        id="technology"
        aria-labelledby="tech-heading"
        className="py-20 lg:py-28 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              PRODUCTION STACK
            </span>
            <h2 id="tech-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Built With Modern Technology
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              Technologies genuinely deployed across NextDigi Labs platforms to ensure enterprise reliability, high transactional throughput, and sub-second page performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECH_CATEGORIES.map((cat) => (
              <div key={cat.name} className="p-7 rounded-2xl bg-[#0c1017] border border-white/[0.08]">
                <h3 className="text-lg font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-5">
                  {cat.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {cat.techs.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. PRODUCT PRINCIPLES ──────────────────────────────────────────── */}
      <section
        id="principles"
        aria-labelledby="principles-heading"
        className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#a78bfa] block mb-3">
              CORE VALUES
            </span>
            <h2 id="principles-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              What We Believe
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              Five foundational product principles that steer every design choice, architectural pattern, and code deployment in NextDigi Labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_PRINCIPLES.map((pr) => (
              <div
                key={pr.number}
                className="p-7 rounded-2xl bg-[#0e131d] border border-white/[0.08] hover:border-[#8b5cf6]/40 transition-all"
              >
                <span className="text-xs font-mono font-bold text-[#a78bfa] block mb-2">
                  PRINCIPLE {pr.number}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{pr.title}</h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {pr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. PRODUCT ROADMAP ─────────────────────────────────────────────── */}
      <section
        id="roadmap"
        aria-labelledby="roadmap-heading"
        className="py-20 lg:py-28 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              PORTFOLIO TRAJECTORY
            </span>
            <h2 id="roadmap-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Product Roadmap
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              A transparent view of our current live portfolio, active pipeline, and future software horizons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* CURRENT */}
            <div className="p-7 rounded-2xl bg-[#0c1017] border border-[#00d4aa]/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase text-[#00d4aa]">
                  CURRENT HORIZON
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20">
                  LIVE
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Production SaaS</h3>
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-sm font-bold text-white">NextDigi Commerce</div>
                  <div className="text-xs text-[#00d4aa]">AI-Powered Ecommerce Automation</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-sm font-bold text-white">Garibondhu360</div>
                  <div className="text-xs text-[#38bdf8]">Transport &amp; Fleet Logistics ERP</div>
                </div>
              </div>
            </div>

            {/* NEXT */}
            <div className="p-7 rounded-2xl bg-[#0c1017] border border-[#8b5cf6]/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase text-[#8b5cf6]">
                  NEXT HORIZON
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20">
                  DEVELOPMENT
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Pipeline Applications</h3>
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-sm font-bold text-white">NextDigi Social</div>
                  <div className="text-xs text-[#8b5cf6]">Social Media Management Platform</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-sm font-bold text-white">NextDigi Automate</div>
                  <div className="text-xs text-[#f59e0b]">AI Business Workflow Automation</div>
                </div>
              </div>
            </div>

            {/* FUTURE */}
            <div className="p-7 rounded-2xl bg-[#0c1017] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase text-gray-400">
                  FUTURE HORIZON
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                  RESEARCH
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Exploratory R&amp;D</h3>
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-sm font-bold text-white">Autonomous Agent Tools</div>
                  <div className="text-xs text-[#94a3b8]">Domain-specific reasoning pipelines</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-sm font-bold text-white">Industry Vertical Tools</div>
                  <div className="text-xs text-[#94a3b8]">Specialized regional business ERPs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-[#71717a]">
              We do not attach synthetic launch dates. Products transition from development to beta and public availability based strictly on functional verification and stability metrics.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 10. NEXTDIGI SOLUTIONS CROSS-SELL ──────────────────────────────── */}
      <section
        id="solutions-crossell"
        aria-label="NextDigi Solutions cross-sell"
        className="py-16 lg:py-20 bg-[#0a0d14] border-t border-[#1a1f2c]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#00d4aa]/20 bg-gradient-to-r from-[#00d4aa]/10 via-[#0e131d] to-[#07090e] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-2">
                CUSTOM SOFTWARE ENGINEERING
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Have Your Own SaaS Idea?
              </h2>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                NextDigi Labs builds our own products, while NextDigi Solutions helps businesses and founders engineer custom software, bespoke ERPs, and client-owned SaaS products.
              </p>
            </div>
            <Link
              id="crossell-solutions-btn"
              href="/solutions"
              className="px-8 py-4 rounded-xl font-bold text-sm text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 shrink-0"
            >
              Build My SaaS
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 11. NEXTDIGI AI CROSS-SELL ─────────────────────────────────────── */}
      <section
        id="ai-crossell"
        aria-label="NextDigi AI cross-sell"
        className="py-16 lg:py-20 border-t border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#8b5cf6]/20 bg-gradient-to-r from-[#8b5cf6]/10 via-[#0e131d] to-[#07090e] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#a78bfa] block mb-2">
                INTELLIGENT SYSTEMS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Want AI Inside Your Product?
              </h2>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                Add AI agents, intelligent assistants, and autonomous workflow automation to your software through NextDigi AI.
              </p>
            </div>
            <Link
              id="crossell-ai-btn"
              href="/ai"
              className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition shadow-lg shadow-[#8b5cf6]/25 shrink-0"
            >
              Explore NextDigi AI
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 12. NEXTDIGI STORE CROSS-SELL ──────────────────────────────────── */}
      <section
        id="store-crossell"
        aria-label="NextDigi Store cross-sell"
        className="py-16 lg:py-20 bg-[#0a0d14] border-t border-[#1a1f2c]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-[#0c1017] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-sky-400 block mb-2">
                DIGITAL ASSETS &amp; KITS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Resources for Builders &amp; Businesses
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8] max-w-xl leading-relaxed">
                Explore premium website templates, UI kits, design systems, and developer tools ready for immediate download in the NextDigi Store.
              </p>
            </div>
            <Link
              id="crossell-store-btn"
              href="/store"
              className="px-7 py-3.5 rounded-xl font-bold text-xs text-white bg-[#131823] hover:bg-[#1a2130] border border-white/10 transition shrink-0"
            >
              Visit NextDigi Store
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 13. FINAL CTA ──────────────────────────────────────────────────── */}
      <section id="final-cta" aria-label="Explore Labs Products" className="py-24 lg:py-32 relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#8b5cf6]/[0.08] blur-[160px] rounded-full" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00d4aa]/[0.05] blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#8b5cf6]/30 bg-[#0d121c] p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 mb-6">
                <SparklesIcon className="w-3.5 h-3.5 text-[#a78bfa]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[2px] text-[#a78bfa]">
                  NEXTDIGI LABS
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                Software Engineered for Real Businesses.
              </h2>

              <p className="text-base sm:text-lg text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
                Whether you need a live e-commerce automation platform, a transport logistics ERP, or custom SaaS engineering, NextDigiHome delivers practical technology.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link
                  id="final-explore-btn"
                  href="#products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#9d72f9] hover:to-[#8b5cf6] transition shadow-lg shadow-[#8b5cf6]/25 active:scale-95"
                >
                  Explore Our Products
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  id="final-licensing-btn"
                  href="/contact?service=NextDigi%20Labs%20Product%20Licensing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-[#131823] border border-white/10 text-white hover:border-[#8b5cf6]/50 hover:bg-[#1a2130] transition active:scale-95"
                >
                  Inquire About Licensing
                </Link>
              </div>

              {/* Ecosystem Quick Links */}
              <div className="border-t border-white/[0.08] pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-[#71717a]">
                {[
                  { label: 'NextDigi Solutions', href: '/solutions' },
                  { label: 'NextDigi AI', href: '/ai' },
                  { label: 'NextDigi Growth', href: '/growth' },
                  { label: 'NextDigi Store', href: '/store' },
                  { label: 'Contact Us', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="hover:text-[#a78bfa] transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRightCircleIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
