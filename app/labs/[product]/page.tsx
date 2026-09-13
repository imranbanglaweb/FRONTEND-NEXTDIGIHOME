import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  ShoppingBagIcon, 
  ShareIcon, 
  BoltIcon, 
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
  ServerIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

type ProductData = {
  id: string;
  name: string;
  division: string;
  tagline: string;
  description: string;
  longDescription: string;
  status: string;
  accent: string;
  icon: any;
  externalUrl: string;
  architectureHighlights: { title: string; desc: string }[];
  keyModules: string[];
  techStack: string[];
};

const productsData: Record<string, ProductData> = {
  'commerce': {
    id: 'commerce',
    name: 'NextDigi Commerce',
    division: 'NextDigi Labs',
    tagline: 'Turnkey Multi-Channel E-Commerce Engine for Growing Brands',
    description: 'A purpose-built commerce platform with native bKash/Nagad checkout, automated courier dispatching, and multi-warehouse inventory management.',
    longDescription: 'NextDigi Commerce was developed inside NextDigi Labs to solve the real operational friction regional merchants face: sluggish checkout pages, complex courier dispatch procedures, and untracked stock discrepancies. Built on a headless Next.js frontend with high-throughput API microservices, it delivers sub-second page loads and seamless multi-channel transaction processing.',
    status: 'In Active Production',
    accent: '#00d4aa',
    icon: ShoppingBagIcon,
    externalUrl: 'https://commerce.nextdigihome.com',
    architectureHighlights: [
      { title: 'One-Click Local Checkout', desc: 'Integrated tokenized bKash and Nagad direct pay reducing checkout drop-offs.' },
      { title: 'Courier Waybill Auto-Generation', desc: 'Direct API integrations with Pathao, Steadfast, and RedX to create consignments automatically.' },
      { title: 'Multi-Warehouse Inventory Ledger', desc: 'Double-entry stock management with automated out-of-stock guards and barcode scanning.' },
      { title: 'High-Concurrency Edge Caching', desc: 'Absorbs flash-sale traffic surges with distributed Redis caching and static catalog optimization.' }
    ],
    keyModules: [
      'Storefront Catalog & Instant Search Engine',
      'Unified Payment Gateway Hub (bKash, Nagad, Cards)',
      'Automated Courier Dispatch & Consignment Tracking',
      'Customer Loyalty & Promo Code Discount Rules',
      'Financial Reconciliation & Profit Margin Dashboard'
    ],
    techStack: ['Next.js 16', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker']
  },
  'social': {
    id: 'social',
    name: 'NextDigi Social',
    division: 'NextDigi Labs',
    tagline: 'Multi-Channel Social Scheduling & Unified Inbox',
    description: 'Manage, schedule, and analyze your brand content across Facebook, Instagram, LinkedIn, and TikTok from a single synchronized dashboard with AI caption generation.',
    longDescription: 'NextDigi Social eliminates the hassle of switching between multiple social media dashboards. It provides social media managers and agencies with an intuitive multi-channel calendar, AI-assisted copy refinement, automated comment moderation, and unified customer DM handling in one cohesive workspace.',
    status: 'Private Beta',
    accent: '#8b5cf6',
    icon: ShareIcon,
    externalUrl: 'https://social.nextdigihome.com',
    architectureHighlights: [
      { title: 'Universal Content Scheduler', desc: 'Queue visual posts, reels, stories, and carousels with automated platform-specific formatting.' },
      { title: 'Unified Direct Message Inbox', desc: 'Handle Facebook Messenger, Instagram DMs, and comments from a single collaborative inbox.' },
      { title: 'AI Copy & Hook Assistant', desc: 'Generate engaging social captions, hashtag sets, and video hook ideas tailored to your brand voice.' },
      { title: 'Team Approval Hierarchies', desc: 'Client review portals and internal approval stages to prevent accidental post publishing.' }
    ],
    keyModules: [
      'Visual Interactive Drag-and-Drop Calendar',
      'Multi-Account Social Token Manager (OAuth 2.0)',
      'Cross-Platform DM & Comment Triage Inbox',
      'Hashtag Performance & Follower Growth Analytics',
      'AI Caption & Video Script Co-Pilot'
    ],
    techStack: ['React', 'Next.js', 'Meta Graph API', 'LinkedIn API', 'PostgreSQL', 'Python / AI Services']
  },
  'automate': {
    id: 'automate',
    name: 'NextDigi Automate',
    division: 'NextDigi Labs',
    tagline: 'Visual Low-Code Workflow Automation Engine',
    description: 'Connect internal spreadsheets, webhooks, databases, and customer notifications into autonomous business pipelines without writing custom backend scripts.',
    longDescription: 'NextDigi Automate was engineered to give non-technical operational leaders the power to build automated systems. Featuring a visual node-based workflow builder, it captures lead forms, checks payment status, updates databases, and sends customer SMS/WhatsApp confirmations automatically.',
    status: 'Early Access',
    accent: '#f59e0b',
    icon: BoltIcon,
    externalUrl: 'https://automate.nextdigihome.com',
    architectureHighlights: [
      { title: 'Visual Node Canvas', desc: 'Drag, drop, and wire together triggers, conditional branches, filters, and actions.' },
      { title: 'Resilient Webhook Gateway', desc: 'Buffers millions of webhook calls with automatic exponential backoff retry algorithms.' },
      { title: 'Custom JavaScript Sandboxes', desc: 'Execute precise data transformation snippets directly inside any pipeline node.' },
      { title: 'Real-Time Execution Telemetry', desc: 'Visual debugging with exact input/output payloads at every step of your workflow.' }
    ],
    keyModules: [
      'Drag-and-Drop Flow Canvas (React Flow)',
      'Library of 80+ Pre-Configured App Connectors',
      'Persistent Job Queue (BullMQ / Redis)',
      'Custom HTTP Request & Webhook Builder',
      'Role-Based Pipeline Sharing & Audit Logging'
    ],
    techStack: ['Node.js', 'Next.js', 'Redis / BullMQ', 'PostgreSQL', 'Docker', 'Tailwind CSS']
  },
  'garibondhu360': {
    id: 'garibondhu360',
    name: 'Garibondhu360',
    division: 'NextDigi Labs',
    tagline: 'Automotive Workshop & Fleet Management SaaS Platform',
    description: 'Specialized cloud ERP for automotive repair workshops, parts inventory, mechanic job cards, and corporate vehicle fleet maintenance scheduling.',
    longDescription: 'Garibondhu360 transforms traditional, pen-and-paper vehicle repair centers into high-efficiency digital workshops. Mechanics and service managers track repair job cards on tablets, inspect vehicle health, issue automated digital quotes to car owners, and manage spare parts inventory with automated barcoding.',
    status: 'Live Customer Platform',
    accent: '#38bdf8',
    icon: WrenchScrewdriverIcon,
    externalUrl: 'https://garibondhu360.nextdigihome.com',
    architectureHighlights: [
      { title: 'Digital Job Card Workflow', desc: 'Mobile-friendly vehicle intake, damage photography, mechanic assignment, and task checklist.' },
      { title: 'Parts Inventory & Margin Control', desc: 'Automated stock deduction as mechanics attach parts to job cards, ensuring zero inventory leakage.' },
      { title: 'Customer SMS & WhatsApp Updates', desc: 'Sends vehicle owners live progress updates, invoice links, and upcoming maintenance alerts.' },
      { title: 'Fleet Maintenance Hub', desc: 'Corporate portal for transport companies to track service history and recurring repair schedules.' }
    ],
    keyModules: [
      'Vehicle Intake & Digital Inspection Checklists',
      'Mechanic Workload & Labor Time Tracking',
      'Automated Spare Parts Stock & Purchase Orders',
      'Automated SMS / WhatsApp Notification Engine',
      'Workshop Revenue, Margin & Tax Invoicing'
    ],
    techStack: ['Next.js', 'Node.js API', 'PostgreSQL', 'Tailwind CSS', 'Twilio / Regional SMS Gateways']
  }
};

export function generateStaticParams() {
  return Object.keys(productsData).map((product) => ({ product }));
}

type PageProps = {
  params: Promise<{ product: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { product } = await params;
  const data = productsData[product];

  if (!data) {
    return {
      title: 'Product Not Found | NextDigi Labs',
      description: 'The requested SaaS product could not be found.',
    };
  }

  return generatePageMetadata({
    title: `${data.name} | ${data.division}`,
    description: `${data.tagline}. ${data.description}`,
    path: `/labs/${product}`,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { product } = await params;
  const data = productsData[product];

  if (!data) {
    notFound();
  }

  const IconComponent = data.icon;

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Background Accent */}
      <div 
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[140px] pointer-events-none rounded-full opacity-20"
        style={{ backgroundColor: data.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/labs" className="hover:text-[#a78bfa] transition">NextDigi Labs</Link>
          <span>/</span>
          <span className="text-white font-medium">{data.name}</span>
        </nav>

        {/* Hero Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111622]/90 to-[#0c0f17]/90 backdrop-blur-xl p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-gray-300 uppercase">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.accent }} />
              {data.division}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-[#00d4aa]">
              {data.status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {data.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-gray-300 mb-6" style={{ color: data.accent }}>
                {data.tagline}
              </p>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                {data.longDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={data.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-xl font-semibold text-black transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  style={{ backgroundColor: data.accent }}
                >
                  Visit {data.name}
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </a>
                <Link
                  href={`/contact?service=${encodeURIComponent(data.name + ' Inquiry')}`}
                  className="px-6 py-3.5 rounded-xl font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  Request Partnership / Demo
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10">
                  <IconComponent className="w-8 h-8" style={{ color: data.accent }} />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Built With Technology Stack
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
                Operated on high-availability cloud infrastructure
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Highlights */}
        <div className="mb-16">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Architecture & Product Highlights
            </h2>
            <p className="text-gray-400">
              Key engineering innovations that power {data.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.architectureHighlights.map((cap, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-[#0e131d] border border-white/10 hover:border-white/20 transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 shrink-0 mt-1">
                    <SparklesIcon className="w-4 h-4" style={{ color: data.accent }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition">
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

        {/* Core Modules List */}
        <div className="mb-16 bg-[#0c1017] rounded-3xl border border-white/10 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Platform Functional Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.keyModules.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-[#00d4aa] shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-[#8b5cf6]/30 bg-gradient-to-r from-[#8b5cf6]/15 via-[#00d4aa]/10 to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Interested in {data.name} for your organization?
            </h3>
            <p className="text-gray-300 max-w-xl">
              Inquire about enterprise deployment, custom feature development, or partnership integration.
            </p>
          </div>
          <Link
            href={`/contact?service=${encodeURIComponent(data.name)}`}
            className="px-8 py-4 rounded-xl font-bold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition shadow-lg shadow-[#8b5cf6]/30 shrink-0"
          >
            Inquire About {data.name}
          </Link>
        </div>

      </div>
    </div>
  );
}
