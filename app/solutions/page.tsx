import React from 'react';
import Link from 'next/link';
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
  PencilSquareIcon,
  CloudArrowUpIcon,
  BoltIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BuildingStorefrontIcon,
  BuildingOffice2Icon,
  CodeBracketIcon,
  ChartBarIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'NextDigi Solutions | Web, Mobile, Software & SaaS Development',
  description:
    'NextDigi Solutions builds websites, e-commerce platforms, mobile apps, custom software, SaaS products and business automation solutions for modern businesses.',
  path: '/solutions',
  keywords: [
    'web development', 'e-commerce development', 'mobile app development',
    'custom software', 'SaaS development', 'API integration', 'UI UX design',
    'cloud hosting', 'business automation', 'NextDigi Solutions',
    'technology services Bangladesh', 'software development agency',
  ],
});


// ─── Service data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'website-development',
    number: '01',
    title: 'Website Development',
    description: 'Build fast, responsive and conversion-focused websites for businesses, organizations and brands.',
    icon: GlobeAltIcon,
    accent: '#00d4aa',
    gradient: 'from-[#00d4aa]/20 to-transparent',
    borderGlow: 'hover:border-[#00d4aa]/50 hover:shadow-[0_0_28px_rgba(0,212,170,0.10)]',
    include: ['Corporate Websites', 'Business Portals', 'Landing Pages', 'CMS Integration', 'Custom Web Applications'],
    cta: 'Explore Website Development',
    href: '/contact?service=website-development',
  },
  {
    id: 'ecommerce',
    number: '02',
    title: 'E-commerce Development',
    description: 'Build scalable online stores with modern commerce functionality.',
    icon: ShoppingBagIcon,
    accent: '#8b5cf6',
    gradient: 'from-[#8b5cf6]/20 to-transparent',
    borderGlow: 'hover:border-[#8b5cf6]/50 hover:shadow-[0_0_28px_rgba(139,92,246,0.10)]',
    include: ['Product Management', 'Cart & Checkout', 'Payments', 'Courier Integration', 'Order Management', 'Analytics'],
    cta: 'Explore E-commerce',
    href: '/contact?service=ecommerce',
  },
  {
    id: 'mobile-app',
    number: '03',
    title: 'Mobile App Development',
    description: 'Build mobile experiences for Android and iOS.',
    icon: DevicePhoneMobileIcon,
    accent: '#38bdf8',
    gradient: 'from-[#38bdf8]/20 to-transparent',
    borderGlow: 'hover:border-[#38bdf8]/50 hover:shadow-[0_0_28px_rgba(56,189,248,0.10)]',
    include: ['Business Apps', 'Customer Apps', 'Booking Apps', 'Management Apps', 'E-commerce Apps', 'API-connected Apps'],
    cta: 'Explore Mobile Development',
    href: '/contact?service=mobile-app',
  },
  {
    id: 'custom-software',
    number: '04',
    title: 'Custom Software Development',
    description: 'Turn business processes into purpose-built software.',
    icon: CommandLineIcon,
    accent: '#ec4899',
    gradient: 'from-[#ec4899]/20 to-transparent',
    borderGlow: 'hover:border-[#ec4899]/50 hover:shadow-[0_0_28px_rgba(236,72,153,0.10)]',
    include: ['Business Management Systems', 'ERP-related Solutions', 'CRM & HRM', 'Inventory Systems', 'Reporting & Workflow'],
    cta: 'Explore Custom Software',
    href: '/contact?service=custom-software',
  },
  {
    id: 'saas-development',
    number: '05',
    title: 'SaaS Development',
    description: 'Build subscription-based software products from idea to production.',
    icon: CpuChipIcon,
    accent: '#f59e0b',
    gradient: 'from-[#f59e0b]/20 to-transparent',
    borderGlow: 'hover:border-[#f59e0b]/50 hover:shadow-[0_0_28px_rgba(245,158,11,0.10)]',
    include: ['Multi-tenant Architecture', 'Authentication & Subscriptions', 'Billing & Admin Panels', 'APIs & Analytics', 'Cloud Deployment'],
    cta: 'Build a SaaS Product',
    href: '/contact?service=saas-development',
  },
  {
    id: 'api-integrations',
    number: '06',
    title: 'API & System Integration',
    description: 'Connect the systems your business already uses.',
    icon: ServerIcon,
    accent: '#10b981',
    gradient: 'from-[#10b981]/20 to-transparent',
    borderGlow: 'hover:border-[#10b981]/50 hover:shadow-[0_0_28px_rgba(16,185,129,0.10)]',
    include: ['REST APIs', 'Third-party APIs', 'Payment & Courier APIs', 'ERP & CRM Integration', 'Webhooks', 'Data Synchronization'],
    cta: 'Explore Integrations',
    href: '/contact?service=api-integration',
  },
  {
    id: 'ui-ux-design',
    number: '07',
    title: 'UI/UX & Product Design',
    description: 'Design intuitive digital experiences before development begins.',
    icon: PencilSquareIcon,
    accent: '#a78bfa',
    gradient: 'from-[#a78bfa]/20 to-transparent',
    borderGlow: 'hover:border-[#a78bfa]/50 hover:shadow-[0_0_28px_rgba(167,139,250,0.10)]',
    include: ['UX Research', 'Wireframes', 'UI Design', 'Design Systems', 'Responsive Design', 'Product Prototyping'],
    cta: 'Explore Product Design',
    href: '/contact?service=ui-ux-design',
  },
  {
    id: 'cloud-hosting',
    number: '08',
    title: 'Cloud, Hosting & Deployment',
    description: 'Deploy and maintain reliable production infrastructure.',
    icon: CloudArrowUpIcon,
    accent: '#06b6d4',
    gradient: 'from-[#06b6d4]/20 to-transparent',
    borderGlow: 'hover:border-[#06b6d4]/50 hover:shadow-[0_0_28px_rgba(6,182,212,0.10)]',
    include: ['Cloud Deployment', 'Domain & SSL', 'Server Configuration', 'CI/CD Pipelines', 'Backups & Monitoring'],
    cta: 'Explore Infrastructure',
    href: '/contact?service=cloud-hosting',
  },
  {
    id: 'maintenance-support',
    number: '09',
    title: 'Maintenance & Support',
    description: 'Keep your digital systems secure, updated and operational.',
    icon: WrenchScrewdriverIcon,
    accent: '#a855f7',
    gradient: 'from-[#a855f7]/20 to-transparent',
    borderGlow: 'hover:border-[#a855f7]/50 hover:shadow-[0_0_28px_rgba(168,85,247,0.10)]',
    include: ['Bug Fixes', 'Security Updates', 'Performance Monitoring', 'Backups', 'Feature Updates', 'Technical Support'],
    cta: 'Get Support',
    href: '/contact?service=maintenance-support',
  },
  {
    id: 'business-automation',
    number: '10',
    title: 'Business Automation',
    description: 'Reduce repetitive work through connected digital workflows.',
    icon: BoltIcon,
    accent: '#f97316',
    gradient: 'from-[#f97316]/20 to-transparent',
    borderGlow: 'hover:border-[#f97316]/50 hover:shadow-[0_0_28px_rgba(249,115,22,0.10)]',
    include: ['Workflow Automation', 'Notifications', 'Data Processing', 'API Workflows', 'AI-assisted Operations'],
    cta: 'Explore Automation',
    href: '/contact?service=business-automation',
    aiNote: true,
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discover', description: 'Understand your business, users, goals and requirements.', accent: '#00d4aa' },
  { step: '02', title: 'Plan', description: 'Define scope, architecture, technology and delivery milestones.', accent: '#38bdf8' },
  { step: '03', title: 'Design', description: 'Create user flows, interface design and product structure.', accent: '#8b5cf6' },
  { step: '04', title: 'Develop', description: 'Build, integrate and test the solution.', accent: '#ec4899' },
  { step: '05', title: 'Launch', description: 'Deploy the production system and complete final checks.', accent: '#f59e0b' },
  { step: '06', title: 'Support', description: 'Monitor, improve and maintain the platform after launch.', accent: '#10b981' },
];

const TECH_STACK = [
  { category: 'Frontend', accent: '#00d4aa', techs: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { category: 'Mobile', accent: '#38bdf8', techs: ['Flutter', 'React Native'] },
  { category: 'Backend', accent: '#8b5cf6', techs: ['Laravel', 'PHP', 'Node.js'] },
  { category: 'Database', accent: '#ec4899', techs: ['MySQL', 'MongoDB', 'PostgreSQL'] },
  { category: 'Enterprise', accent: '#f59e0b', techs: ['SAP', 'ABAP', 'SAP Fiori', 'OData', 'CDS Views'] },
  { category: 'Infrastructure', accent: '#10b981', techs: ['Vercel', 'cPanel', 'Cloud Hosting', 'Git', 'Docker'] },
];

const BUSINESS_TYPES = [
  { icon: RocketLaunchIcon, title: 'Startups', description: 'Validate and launch your digital product.', accent: '#00d4aa' },
  { icon: BuildingStorefrontIcon, title: 'Small & Medium Businesses', description: 'Digitize operations and customer experiences.', accent: '#8b5cf6' },
  { icon: ShoppingBagIcon, title: 'E-commerce Businesses', description: 'Build and optimize online commerce systems.', accent: '#38bdf8' },
  { icon: BuildingOffice2Icon, title: 'Enterprise Teams', description: 'Integrate and improve business software.', accent: '#ec4899' },
  { icon: CodeBracketIcon, title: 'Product Founders', description: 'Turn SaaS ideas into production-ready products.', accent: '#f59e0b' },
];

const CASE_STUDIES = [
  {
    id: 'nextdigi-commerce',
    title: 'NextDigi Commerce Platform',
    category: 'Headless E-Commerce & Payment Integration',
    description: 'A high-performance headless commerce platform with native tokenized payment checkout (bKash, Nagad, Rocket) and automated courier webhook integrations.',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'bKash API', 'Nagad API'],
    accent: '#00d4aa',
    href: '/case-studies',
  },
  {
    id: 'garibondhu360',
    title: 'Garibondhu360 Automotive SaaS',
    category: 'Vertical Enterprise SaaS & Workshop ERP',
    description: 'An end-to-end digital workshop operating system with mobile-friendly vehicle intake, barcode-scanned parts allocation and automated customer SMS alerts.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'SMS Gateway'],
    accent: '#38bdf8',
    href: '/case-studies',
  },
  {
    id: 'nextdigi-platform',
    title: 'NextDigi Cloud Infrastructure',
    category: 'Cloud Architecture & API Gateway',
    description: 'Unified Next.js App Router frontend with Dockerized backend microservices, Redis caching, Cloudflare edge routing and automated CI/CD deployment pipelines.',
    techStack: ['Next.js App Router', 'Docker', 'Redis', 'Cloudflare', 'PostgreSQL', 'Nginx'],
    accent: '#8b5cf6',
    href: '/case-studies',
  },
];

const ENGAGEMENT_MODELS = [
  { number: '01', title: 'Project-Based', description: 'Best for defined software or website projects.', accent: '#00d4aa' },
  { number: '02', title: 'Dedicated Development', description: 'Best for ongoing product development.', accent: '#8b5cf6' },
  { number: '03', title: 'Monthly Support', description: 'Best for maintenance and continuous improvement.', accent: '#38bdf8' },
  { number: '04', title: 'Custom', description: 'Best for complex business requirements.', accent: '#f59e0b' },
];

const CREDIBILITY_SIGNALS = [
  { label: 'Experienced Technology Team', accent: '#00d4aa' },
  { label: 'Full-Stack Development', accent: '#8b5cf6' },
  { label: 'AI & Automation', accent: '#38bdf8' },
  { label: 'SaaS Development', accent: '#ec4899' },
  { label: 'Enterprise Technology', accent: '#f59e0b' },
  { label: 'End-to-End Support', accent: '#10b981' },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f12]">

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section
        id="solutions-hero"
        aria-label="NextDigi Solutions hero"
        className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden border-b border-[#1e1e26]"
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,212,170,0.12) 0%, transparent 60%),' +
              'radial-gradient(ellipse 50% 40% at 85% 80%, rgba(139,92,246,0.10) 0%, transparent 50%)',
          }}
        />
        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 backdrop-blur-md mb-7">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#00d4aa]">
              NEXTDIGI SOLUTIONS
            </span>
          </div>

          {/* H1 — single per page */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight mb-6 leading-[1.08] max-w-5xl mx-auto">
            Technology Built Around{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #00d4aa 0%, #8b5cf6 55%, #ec4899 100%)' }}
            >
              Your Business.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#8c8c9a] max-w-3xl mx-auto leading-relaxed mb-10">
            We design and develop websites, e-commerce platforms, mobile apps, custom software and SaaS
            products that help businesses operate, serve customers and scale digitally.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              id="hero-start-project-btn"
              href="/contact?service=solutions"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-[#0f0f12] shadow-lg shadow-[#00d4aa]/20 hover:brightness-110 active:scale-95 transition-all"
              style={{ background: 'linear-gradient(135deg, #00d4aa 0%, #8b5cf6 100%)' }}
            >
              <span>Start a Project</span>
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              id="hero-view-services-btn"
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-[#1a1a1f] border border-[#2a2a30] text-white hover:border-[#00d4aa]/50 hover:bg-white/5 transition-all"
            >
              View Our Services
            </a>
          </div>

          {/* Capability line */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm font-medium text-[#71717a] mb-12">
            {['Web', 'E-commerce', 'Mobile', 'Software', 'SaaS', 'APIs'].map((cap, i, arr) => (
              <span key={cap} className="flex items-center gap-2 sm:gap-3">
                <span className="text-[#a1a1aa]">{cap}</span>
                {i < arr.length - 1 && <span aria-hidden="true" className="text-[#3a3a40]">•</span>}
              </span>
            ))}
          </div>

          {/* Credibility signals */}
          <div className="border-t border-white/[0.06] pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {CREDIBILITY_SIGNALS.map((sig) => (
              <span key={sig.label} className="flex items-center gap-2 text-xs font-semibold text-[#a1a1aa]">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: sig.accent }} />
                {sig.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT WE BUILD ─────────────────────────────────────────────── */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="py-20 lg:py-28 relative"
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#8b5cf6]/[0.05] blur-[140px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#00d4aa] block mb-3">SERVICES</span>
            <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              What We Build
            </h2>
            <p className="text-[#8c8c9a] text-base sm:text-lg leading-relaxed">
              From your first digital idea to a production-ready platform, our engineering team can
              design, develop and launch the technology your business needs.
            </p>
          </div>

          {/* Services grid — 2 cols md, 3 cols lg, 4 cols xl */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className={`rounded-2xl bg-[#121217] border border-[#222229] p-6 flex flex-col justify-between transition-all duration-300 ${srv.borderGlow} group relative overflow-hidden`}
                >
                  {/* Corner gradient */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${srv.gradient} rounded-bl-full pointer-events-none`}
                  />

                  <div className="relative z-10">
                    {/* Icon + Number */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0"
                        style={{ backgroundColor: `${srv.accent}18`, color: srv.accent }}
                      >
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <span
                        aria-hidden="true"
                        className="text-2xl font-black opacity-20 group-hover:opacity-50 transition-opacity tabular-nums"
                        style={{ color: srv.accent }}
                      >
                        {srv.number}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-[#8c8c9a] leading-relaxed mb-5">{srv.description}</p>

                    {/* Include list */}
                    <div className="space-y-1.5 mb-5 pt-4 border-t border-white/[0.06]">
                      {srv.include.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                          <CheckCircleIcon className="w-3.5 h-3.5 shrink-0" style={{ color: srv.accent }} aria-hidden="true" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* AI note badge */}
                    {srv.aiNote && (
                      <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-[10px] font-semibold text-[#c4b5fd]">
                        <SparklesIcon className="w-3 h-3" aria-hidden="true" />
                        Powered with NextDigi AI where applicable
                      </div>
                    )}
                  </div>

                  <Link
                    href={srv.href}
                    id={`service-cta-${srv.id}`}
                    className="relative z-10 inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl text-xs font-bold bg-white/[0.04] border border-white/10 text-white hover:bg-white/[0.09] hover:border-white/20 transition-all group/btn mt-2"
                    aria-label={`${srv.cta} — ${srv.title}`}
                  >
                    <span>{srv.cta}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW WE BUILD ──────────────────────────────────────────────── */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="py-20 lg:py-28 bg-[#0a0a0d] border-t border-b border-[#1e1e26] relative overflow-hidden"
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#00d4aa]/[0.04] blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-[#8b5cf6]/[0.04] blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#00d4aa] block mb-3">PROCESS</span>
            <h2 id="process-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              How We Build
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((st) => (
              <div
                key={st.step}
                className="relative p-7 rounded-2xl bg-[#121217] border border-[#222229] group hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="text-5xl font-black block mb-4 transition-opacity opacity-20 group-hover:opacity-60 tabular-nums"
                  style={{ color: st.accent }}
                >
                  {st.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                <p className="text-sm text-[#8c8c9a] leading-relaxed">{st.description}</p>
                {/* Bottom accent */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${st.accent}60, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECHNOLOGY STACK ──────────────────────────────────────────── */}
      <section
        id="technology"
        aria-labelledby="technology-heading"
        className="py-20 lg:py-28 relative"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#00d4aa] block mb-3">TECHNOLOGY</span>
            <h2 id="technology-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Our Technology Stack
            </h2>
            <p className="text-[#8c8c9a] text-base leading-relaxed">
              We work with technologies we genuinely use and have production experience with.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_STACK.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl bg-[#121217] border border-[#222229] p-6 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.accent }} />
                  <span className="text-xs font-bold uppercase tracking-[2px]" style={{ color: group.accent }}>
                    {group.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#d4d4d8] hover:border-white/25 hover:text-white transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUSINESS TYPES ────────────────────────────────────────────── */}
      <section
        id="business-types"
        aria-labelledby="business-types-heading"
        className="py-20 lg:py-28 bg-[#0a0a0d] border-t border-b border-[#1e1e26] relative overflow-hidden"
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[600px] h-[300px] bg-[#38bdf8]/[0.04] blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#00d4aa] block mb-3">WHO WE SERVE</span>
            <h2 id="business-types-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Solutions For Different Business Needs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {BUSINESS_TYPES.map((bt) => {
              const BtIcon = bt.icon;
              return (
                <div
                  key={bt.title}
                  className="rounded-2xl bg-[#121217] border border-[#222229] p-6 text-center hover:border-white/20 transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/10"
                    style={{ backgroundColor: `${bt.accent}18`, color: bt.accent }}
                  >
                    <BtIcon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">{bt.title}</h3>
                  <p className="text-xs text-[#8c8c9a] leading-relaxed">{bt.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES PREVIEW ──────────────────────────────────────── */}
      <section
        id="case-studies"
        aria-labelledby="case-studies-heading"
        className="py-20 lg:py-28 relative"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#00d4aa] block mb-3">PROJECTS</span>
            <h2 id="case-studies-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Built With Technology.{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #00d4aa, #8b5cf6)' }}
              >
                Designed For Results.
              </span>
            </h2>
            <p className="text-[#8c8c9a] text-base leading-relaxed">
              A selection of genuine projects built by the NextDigi engineering team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.id}
                className="rounded-2xl bg-[#121217] border border-[#222229] p-7 flex flex-col hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-44 h-44 blur-[90px] rounded-full opacity-15 pointer-events-none"
                  style={{ backgroundColor: cs.accent }}
                />
                <div className="relative z-10 flex-1">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[2px] mb-3 block"
                    style={{ color: cs.accent }}
                  >
                    {cs.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00d4aa] transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-[#8c8c9a] leading-relaxed mb-5">{cs.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cs.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/10 text-[#a1a1aa]"
                      >
                        {tech}
                      </span>
                    ))}
                    {cs.techStack.length > 4 && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/10 text-[#a1a1aa]">
                        +{cs.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={cs.href}
                  className="relative z-10 inline-flex items-center gap-2 text-xs font-bold text-[#a1a1aa] hover:text-white transition-colors group/link"
                  aria-label={`View Case Study: ${cs.title}`}
                >
                  <span>View Case Study</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/case-studies"
              id="all-case-studies-btn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#1a1a1f] border border-[#2a2a30] text-white hover:border-[#00d4aa]/50 hover:text-[#00d4aa] transition-all"
            >
              <span>View All Case Studies</span>
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── NEXTDIGI AI CROSS-SELL ────────────────────────────────────── */}
      <section
        id="ai-crossell"
        aria-label="NextDigi AI cross-sell"
        className="py-16 lg:py-20 border-t border-[#1e1e26] relative overflow-hidden"
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#8b5cf6]/[0.06] blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#8b5cf6]/25 bg-[#0e0e14] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 w-72 h-72 bg-[#8b5cf6]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 mb-4">
                <SparklesIcon className="w-3.5 h-3.5 text-[#a78bfa]" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#a78bfa]">NEXTDIGI AI</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Need More Than Software?</h2>
              <p className="text-lg font-bold text-[#c4b5fd] mb-3">Make Your Business Smarter With AI.</p>
              <p className="text-sm text-[#8c8c9a] max-w-xl leading-relaxed">
                Extend your software with AI agents, intelligent automation, AI support and connected
                workflows through NextDigi AI.
              </p>
            </div>
            <Link
              id="ai-crossell-btn"
              href="/ai"
              className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border border-[#8b5cf6]/40 bg-[#8b5cf6]/15 text-[#c4b5fd] hover:bg-[#8b5cf6]/25 hover:border-[#8b5cf6]/60 transition-all whitespace-nowrap"
            >
              <span>Explore NextDigi AI</span>
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── NEXTDIGI GROWTH CROSS-SELL ────────────────────────────────── */}
      <section
        id="growth-crossell"
        aria-label="NextDigi Growth cross-sell"
        className="py-16 lg:py-20 border-t border-[#1e1e26] relative overflow-hidden"
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[300px] bg-[#00d4aa]/[0.04] blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#00d4aa]/20 bg-[#0e0e14] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div aria-hidden="true" className="absolute bottom-0 right-0 w-72 h-72 bg-[#00d4aa]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 mb-4">
                <ChartBarIcon className="w-3.5 h-3.5 text-[#00d4aa]" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#00d4aa]">NEXTDIGI GROWTH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Built Your Product. Ready To Grow?
              </h2>
              <p className="text-sm text-[#8c8c9a] max-w-xl leading-relaxed">
                Launch your digital presence with social media, paid advertising, SEO, analytics and
                conversion-focused growth services.
              </p>
            </div>
            <Link
              id="growth-crossell-btn"
              href="/growth"
              className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border border-[#00d4aa]/35 bg-[#00d4aa]/10 text-[#00d4aa] hover:bg-[#00d4aa]/20 hover:border-[#00d4aa]/55 transition-all whitespace-nowrap"
            >
              <span>Explore NextDigi Growth</span>
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT MODELS ─────────────────────────────────────────── */}
      <section
        id="engagement-models"
        aria-labelledby="engagement-heading"
        className="py-20 lg:py-28 bg-[#0a0a0d] border-t border-b border-[#1e1e26] relative overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#00d4aa] block mb-3">ENGAGEMENT</span>
            <h2 id="engagement-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Flexible Engagement Models
            </h2>
            <p className="text-[#8c8c9a] text-base leading-relaxed">
              We don&apos;t apply fixed pricing to custom development. Choose the model that fits
              your project and business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.title}
                className="rounded-2xl bg-[#121217] border border-[#222229] p-7 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${model.accent}, transparent)` }}
                />
                <span
                  aria-hidden="true"
                  className="text-4xl font-black block mb-4 opacity-20 group-hover:opacity-60 transition-opacity tabular-nums"
                  style={{ color: model.accent }}
                >
                  {model.number}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{model.title}</h3>
                <p className="text-sm text-[#8c8c9a] leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              id="engagement-discuss-btn"
              href="/contact?service=solutions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-[#0f0f12] shadow-lg shadow-[#00d4aa]/20 hover:brightness-110 active:scale-95 transition-all"
              style={{ background: 'linear-gradient(135deg, #00d4aa 0%, #8b5cf6 100%)' }}
            >
              <span>Discuss Your Project</span>
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section
        id="final-cta"
        aria-label="Start a project"
        className="py-24 lg:py-32 relative overflow-hidden"
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#00d4aa]/[0.05] blur-[160px] rounded-full" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8b5cf6]/[0.05] blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#00d4aa]/20 bg-[#0e0e14] p-10 sm:p-16 text-center relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 w-80 h-80 bg-[#00d4aa]/[0.07] blur-[120px] rounded-full pointer-events-none" />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b5cf6]/[0.06] blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 mb-6">
                <RocketLaunchIcon className="w-3.5 h-3.5 text-[#00d4aa]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa]">START A PROJECT</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                Have a Digital Project in Mind?
              </h2>

              <p className="text-base sm:text-lg text-[#8c8c9a] max-w-2xl mx-auto mb-10 leading-relaxed">
                Tell us what you&apos;re trying to build, improve or automate. We&apos;ll help you define
                the right technical approach.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link
                  id="final-cta-start-btn"
                  href="/contact?service=solutions"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-[#0f0f12] shadow-lg shadow-[#00d4aa]/20 hover:brightness-110 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #00d4aa 0%, #8b5cf6 100%)' }}
                >
                  <span>Start a Project</span>
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  id="final-cta-contact-btn"
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-[#1a1a1f] border border-[#2a2a30] text-white hover:border-[#00d4aa]/50 hover:bg-white/5 transition-all"
                >
                  Contact Us
                </Link>
              </div>

              {/* Internal ecosystem links */}
              <div className="border-t border-white/[0.06] pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-[#71717a]">
                {[
                  { label: 'NextDigi AI', href: '/ai' },
                  { label: 'NextDigi Growth', href: '/growth' },
                  { label: 'Labs', href: '/labs' },
                  { label: 'Case Studies', href: '/case-studies' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="hover:text-[#00d4aa] transition-colors flex items-center gap-1.5"
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
