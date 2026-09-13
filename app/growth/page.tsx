import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ChartBarIcon,
  MegaphoneIcon,
  MagnifyingGlassIcon,
  PresentationChartLineIcon,
  CursorArrowRaysIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  FunnelIcon,
  SparklesIcon,
  VideoCameraIcon,
  ArrowRightCircleIcon,
  ChevronRightIcon,
  BoltIcon,
  CpuChipIcon,
  BuildingStorefrontIcon,
  ArrowsRightLeftIcon,
  CodeBracketIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon,
  CircleStackIcon,
  EyeIcon,
  QuestionMarkCircleIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'NextDigi Growth | Digital Marketing, Meta Ads, Google Ads & SEO',
  description:
    'NextDigi Growth helps businesses grow online through social media, Meta Ads, Google Ads, SEO, conversion tracking, analytics, landing pages and digital marketing.',
  path: '/growth',
  keywords: [
    'Digital Marketing',
    'Meta Ads',
    'Google Ads',
    'SEO',
    'Conversion Tracking',
    'Analytics',
    'Landing Pages',
    'Social Media Management',
    'NextDigi Growth',
    'Performance Marketing Bangladesh',
  ],
});

// ─── DATA DEFINITIONS ────────────────────────────────────────────────────────

const GROWTH_SERVICES = [
  {
    id: 'social-media',
    number: '01',
    title: 'Social Media Management',
    tagline: 'Consistent, strategic brand presence across primary social channels',
    description:
      'Help businesses establish and maintain a consistent social presence with structured editorial planning, creative asset production, and community oversight.',
    icon: UserGroupIcon,
    accent: '#00d4aa',
    borderGlow: 'hover:border-[#00d4aa]/50 hover:shadow-[0_0_28px_rgba(0,212,170,0.12)]',
    items: [
      'Content Planning',
      'Post Creation',
      'Reels & Short Video',
      'Creative Design',
      'Content Calendar',
      'Community Management',
      'Performance Monitoring',
    ],
    cta: 'Manage My Social Media',
    href: '/contact?service=Social%20Media%20Management',
    disclaimer: 'Focuses on brand consistency and engagement. We do not make false promises of guaranteed follower growth.',
  },
  {
    id: 'meta-ads',
    number: '02',
    title: 'Meta Ads (Facebook & Instagram)',
    tagline: 'Paid customer acquisition through systematic testing and precision audiences',
    description:
      'Plan, launch and optimize campaigns across Facebook and Instagram with structured creative variation, audience research, and conversion tracking.',
    icon: MegaphoneIcon,
    accent: '#38bdf8',
    borderGlow: 'hover:border-[#38bdf8]/50 hover:shadow-[0_0_28px_rgba(56,189,248,0.12)]',
    items: [
      'Campaign Strategy',
      'Campaign Setup',
      'Audience Research',
      'Creative Testing',
      'Lead Campaigns',
      'Sales Campaigns',
      'Retargeting',
      'Conversion Tracking',
      'Performance Optimization',
    ],
    cta: 'Run My Meta Ads',
    href: '/contact?service=Meta%20Ads',
    disclaimer: 'We test and optimize rigorously. We never guarantee arbitrary sales, ROAS, or lead volume without contractual baseline parameters.',
  },
  {
    id: 'google-ads',
    number: '03',
    title: 'Google Ads (Search & Performance)',
    tagline: 'Capture active demand when prospective buyers search for your services',
    description:
      'Reach customers actively searching for products and services across Google Search, Display, and Performance Max with controlled cost-per-click management.',
    icon: CursorArrowRaysIcon,
    accent: '#8b5cf6',
    borderGlow: 'hover:border-[#8b5cf6]/50 hover:shadow-[0_0_28px_rgba(139,92,246,0.12)]',
    items: [
      'Search Campaigns',
      'Display Networks',
      'Performance Max (where appropriate)',
      'Remarketing',
      'Keyword Intent Research',
      'Conversion Tracking',
      'Campaign Optimization',
    ],
    cta: 'Run My Google Ads',
    href: '/contact?service=Google%20Ads',
    disclaimer: 'We configure and manage supported campaign types aligned with verified commercial search intent.',
  },
  {
    id: 'seo',
    number: '04',
    title: 'Search Engine Optimization (SEO)',
    tagline: 'Structured organic visibility through technical architecture and topic authority',
    description:
      'Improve organic search visibility through methodical technical audits, on-page optimization, semantic keyword strategy, and crawlability improvements.',
    icon: MagnifyingGlassIcon,
    accent: '#10b981',
    borderGlow: 'hover:border-[#10b981]/50 hover:shadow-[0_0_28px_rgba(16,185,129,0.12)]',
    items: [
      'Technical SEO',
      'On-page SEO',
      'Keyword Research',
      'Content Strategy',
      'Internal Linking',
      'Structured Data (Schema)',
      'Sitemap & Robots',
      'Search Console Audits',
      'Performance Monitoring',
    ],
    cta: 'Improve My SEO',
    href: '/contact?service=SEO%20%26%20Analytics%20Attribution',
    disclaimer: 'We follow search engine webmaster guidelines. We never guarantee #1 Google rankings or arbitrary traffic spikes.',
  },
  {
    id: 'analytics',
    number: '05',
    title: 'Conversion Tracking & Analytics',
    tagline: 'Airtight attribution to understand user journeys and campaign return',
    description:
      'Measure what visitors and customers actually do on your web properties through clean client and server-side tracking pipelines.',
    icon: PresentationChartLineIcon,
    accent: '#f59e0b',
    borderGlow: 'hover:border-[#f59e0b]/50 hover:shadow-[0_0_28px_rgba(245,158,11,0.12)]',
    items: [
      'Google Analytics 4 (GA4)',
      'Google Tag Manager (GTM)',
      'Meta Pixel Setup',
      'Meta Conversions API (CAPI)',
      'Custom Event Tracking',
      'Conversion Funnel Tracking',
      'Funnel Drop-Off Analysis',
      'Dashboard & Reporting Views',
    ],
    cta: 'Fix My Tracking',
    href: '/contact?service=SEO%20%26%20Analytics%20Attribution',
    disclaimer: 'Configured strictly using tools we support. We account for browser privacy restrictions and client implementation environments.',
  },
  {
    id: 'landing-pages',
    number: '06',
    title: 'Landing Pages & Conversion Optimization',
    tagline: 'High-speed, message-matched pages engineered around conversion actions',
    description:
      'Build dedicated campaign landing pages designed around a single commercial objective, minimizing distraction and friction for paid traffic.',
    icon: CodeBracketIcon,
    accent: '#ec4899',
    borderGlow: 'hover:border-[#ec4899]/50 hover:shadow-[0_0_28px_rgba(236,72,153,0.12)]',
    items: [
      'Landing Page Design',
      'Campaign-Specific Pages',
      'Lead Capture Forms',
      'CTA & Copy Optimization',
      'A/B Testing (where appropriate)',
      'Conversion Tracking Integration',
    ],
    cta: 'Build My Landing Page',
    href: '/contact?service=Web%20Application%20Development',
    disclaimer: 'Built on high-performance web frameworks with zero bloat to preserve critical mobile load speeds.',
  },
  {
    id: 'creative-video',
    number: '07',
    title: 'Creative & AI Video',
    tagline: 'Performance-engineered visual assets and short-form video hooks',
    description:
      'Produce marketing assets engineered for social media and paid campaigns, combining graphic storytelling, motion design, and AI-assisted workflow variations.',
    icon: VideoCameraIcon,
    accent: '#00d4aa',
    borderGlow: 'hover:border-[#00d4aa]/50 hover:shadow-[0_0_28px_rgba(0,212,170,0.12)]',
    items: [
      'Short-form Videos',
      'AI-assisted Videos',
      'Product Showcase Videos',
      'Static Ad Creatives',
      'Social Reels & Stories',
      'Motion Graphics',
      'Creative Angle Variations',
    ],
    cta: 'Create My Marketing Content',
    href: '/contact?service=Digital%20Growth%20%2F%20Meta%20%26%20Google%20Ads',
    disclaimer: 'Creative concepts designed around audience retention metrics and clear calls-to-action.',
  },
  {
    id: 'lead-generation',
    number: '08',
    title: 'Lead Generation Systems',
    tagline: 'Connected end-to-end acquisition loops from first ad click to sales handoff',
    description:
      'Build an integrated lead-generation system connecting your paid ads, landing pages, forms, CRM, and internal sales notification alerts.',
    icon: FunnelIcon,
    accent: '#38bdf8',
    borderGlow: 'hover:border-[#38bdf8]/50 hover:shadow-[0_0_28px_rgba(56,189,248,0.12)]',
    items: [
      'Lead Generation Campaigns',
      'Frictionless Lead Forms',
      'Targeted Landing Pages',
      'CRM System Integration',
      'Email / WhatsApp Alert Workflows',
      'End-to-End Lead Attribution',
    ],
    cta: 'Build My Lead System',
    href: '/contact?service=Digital%20Growth%20%2F%20Meta%20%26%20Google%20Ads',
    disclaimer: 'Connects data and alerts seamlessly. We do not claim arbitrary guaranteed lead counts.',
  },
  {
    id: 'ecommerce-growth',
    number: '09',
    title: 'E-commerce Growth',
    tagline: 'Customer acquisition, dynamic catalog funnels, and repeat purchase retention',
    description:
      'Help online stores improve customer acquisition, catalog visibility, and repeat purchase rates through coordinated paid social and search.',
    icon: BuildingStorefrontIcon,
    accent: '#a855f7',
    borderGlow: 'hover:border-[#a855f7]/50 hover:shadow-[0_0_28px_rgba(168,85,247,0.12)]',
    items: [
      'Product Catalog Campaigns',
      'Meta Dynamic Product Ads',
      'Google Shopping & Search',
      'Purchase Event Tracking (CAPI)',
      'Product Feed Optimization',
      'Cart Abandonment Sequences',
      'E-commerce Retention Analytics',
    ],
    cta: 'Grow My E-commerce',
    href: '/contact?service=E-Commerce%20Development',
    disclaimer: 'Engineered in synergy with e-commerce platforms like NextDigi Commerce for reliable catalog synchronizations.',
  },
];

const FUNNEL_STEPS = [
  {
    step: '01',
    phase: 'DISCOVER',
    title: 'Prospect sees content or ad',
    desc: 'Targeted audiences discover your message via Meta feed, Google search intent, short-form reels, or organic content.',
    badge: 'Traffic Source',
    color: '#00d4aa',
  },
  {
    step: '02',
    phase: 'VISIT',
    title: 'Arrival on dedicated page',
    desc: 'The visitor lands on a fast, mobile-optimized page or store matching the exact context and promise of the ad.',
    badge: 'First Impression',
    color: '#38bdf8',
  },
  {
    step: '03',
    phase: 'ENGAGE',
    title: 'Interaction with offer',
    desc: 'User explores value propositions, views product specs, reviews proof points, or checks pricing details.',
    badge: 'Consideration',
    color: '#8b5cf6',
  },
  {
    step: '04',
    phase: 'CONVERT',
    title: 'Commercial action taken',
    desc: 'Prospect submits a qualified lead form, registers for an account, or initiates an e-commerce checkout purchase.',
    badge: 'Conversion Event',
    color: '#f59e0b',
  },
  {
    step: '05',
    phase: 'FOLLOW UP',
    title: 'Immediate automation & alerts',
    desc: 'Lead data instantly syncs with your CRM, triggers email/WhatsApp confirmation, and alerts your sales representatives.',
    badge: 'Sales Handoff',
    color: '#10b981',
  },
  {
    step: '06',
    phase: 'OPTIMIZE',
    title: 'Data feeds algorithmic learning',
    desc: 'Verified conversion signals loop back into ad platforms and GA4, allowing smarter bidding and lower acquisition costs.',
    badge: 'Attribution Loop',
    color: '#ec4899',
  },
];

const FRAMEWORK_STEPS = [
  {
    step: 'STEP 01',
    title: 'STRATEGY',
    summary: 'Understand business goals, target audience, competitive landscape, and core offer.',
    points: ['Customer avatar definition', 'Unit economics & margin review', 'Channel selection matrix'],
  },
  {
    step: 'STEP 02',
    title: 'ATTRACT',
    summary: 'Deploy coordinated content, social channels, SEO, and paid advertising to reach active buyers.',
    points: ['High-intent search capture', 'Social engagement calendar', 'Audience segmentation'],
  },
  {
    step: 'STEP 03',
    title: 'CONVERT',
    summary: 'Build high-velocity landing pages, compelling offers, concise forms, and optimized user journeys.',
    points: ['Frictionless mobile layouts', 'Clear single-goal calls to action', 'Message-matched ad copy'],
  },
  {
    step: 'STEP 04',
    title: 'MEASURE',
    summary: 'Capture clean behavioral data across GA4, GTM, Meta CAPI, and server-side tracking pipelines.',
    points: ['Server-to-server CAPI sync', 'Standard event taxonomy', 'Cross-channel attribution'],
  },
  {
    step: 'STEP 05',
    title: 'OPTIMIZE',
    summary: 'Scientifically test ad creatives, visual angles, campaign structures, and funnel drop-off points.',
    points: ['Weekly creative hook tests', 'Audience fatigue management', 'Landing page A/B tests'],
  },
  {
    step: 'STEP 06',
    title: 'SCALE',
    summary: 'Prudently expand budget only into channels and campaigns that demonstrate sustainable unit economics.',
    points: ['Budget rebalancing to winners', 'Retention & retargeting layers', 'Controlled expansion pacing'],
  },
];

const PLATFORMS = [
  {
    name: 'Meta (Facebook & Instagram)',
    role: 'Paid Social & Community',
    desc: 'Feed ads, Stories, Reels, lead-generation forms, dynamic product catalogs, and organic content management.',
    accent: '#00d4aa',
  },
  {
    name: 'Google Ads',
    role: 'Paid Search & Intent',
    desc: 'High-intent search campaigns, Performance Max, Display Network, and commercial query keyword targeting.',
    accent: '#38bdf8',
  },
  {
    name: 'YouTube',
    role: 'Video & Action Campaigns',
    desc: 'Bumper video ads, In-feed discovery, long-form explainer distribution, and contextual remarketing.',
    accent: '#f59e0b',
  },
  {
    name: 'TikTok',
    role: 'Short-Form Video',
    desc: 'High-tempo vertical video creatives, Spark ads, trend alignment, and youth consumer discovery.',
    accent: '#ec4899',
  },
  {
    name: 'LinkedIn',
    role: 'B2B & Professional',
    desc: 'Account-based marketing, B2B lead generation forms, executive thought leadership, and industry targeting.',
    accent: '#8b5cf6',
  },
];

const TRACKING_TOOLS = [
  {
    name: 'Google Analytics 4',
    badge: 'Behavioral Analytics',
    desc: 'User journey tracking, exploration reports, event parameters, and cross-platform engagement data.',
  },
  {
    name: 'Google Tag Manager',
    badge: 'Tag Infrastructure',
    desc: 'Centralized, version-controlled client-side container managing all conversion scripts without codebase clutter.',
  },
  {
    name: 'Meta Pixel & Events Manager',
    badge: 'Browser Tracking',
    desc: 'Standard client events including ViewContent, AddToCart, InitiateCheckout, Lead, and Purchase.',
  },
  {
    name: 'Meta Conversions API (CAPI)',
    badge: 'Server-Side Tracking',
    desc: 'Direct server-to-server event dispatching to restore signal fidelity affected by browser ad-blockers and privacy restrictions.',
  },
  {
    name: 'Google Search Console',
    badge: 'Search Health',
    desc: 'Direct organic click metrics, search query impressions, mobile crawl errors, and sitemap indexing status.',
  },
  {
    name: 'UTM Tracking & Architecture',
    badge: 'Attribution Hygiene',
    desc: 'Strict taxonomy across source, medium, campaign, content, and term to ensure clean attribution in reporting.',
  },
];

const REPORTING_METRICS = [
  { label: 'Reach & Impressions', desc: 'Volume of unique prospective buyers exposed to your campaigns.' },
  { label: 'Clicks & CTR', desc: 'Click-through rates verifying creative relevance and message resonance.' },
  { label: 'Cost Per Click (CPC)', desc: 'Efficiency metric measuring traffic acquisition cost per visitor.' },
  { label: 'Qualified Leads', desc: 'Count of prospective clients completing validated inquiry submissions.' },
  { label: 'Cost Per Lead (CPL)', desc: 'Direct acquisition cost per qualified commercial inquiry.' },
  { label: 'Conversion Rate (CVR)', desc: 'Percentage of page visitors taking meaningful business actions.' },
  { label: 'Purchase Conversions', desc: 'Count of completed transactions captured via e-commerce checkouts.' },
  { label: 'ROAS (Where Applicable)', desc: 'Return on ad spend calculated strictly when e-commerce revenue is tracked.' },
];

const INTERNAL_PROJECTS = [
  {
    title: 'NextDigi Commerce Marketing Setup',
    type: 'Internal Ecosystem Architecture',
    desc: 'Engineered full-funnel Meta Conversions API (CAPI) server integrations, dynamic product feed synchronization, and WhatsApp lead checkout sequences for the NextDigi Commerce platform.',
    impact: 'Clean server-side attribution and zero data loss on iOS transactions.',
    link: 'https://commerce.nextdigihome.com/',
    isExternal: true,
  },
  {
    title: 'NextDigiHome Content & SEO Architecture',
    type: 'Internal Organic Strategy',
    desc: 'Structured comprehensive semantic topic clusters, technical Core Web Vitals optimization, and structured schema markup across NextDigiHome master and division pages.',
    impact: '100% crawl indexability, pristine lighthouse performance, and rich snippet readiness.',
    link: '/',
    isExternal: false,
  },
  {
    title: 'Unified Attribution & Inquiry Pipeline',
    type: 'Internal Growth Engineering',
    desc: 'Designed unified GTM container with GA4 custom event taxonomy, routing incoming service inquiries directly to internal review webhooks and notification channels.',
    impact: 'Zero-delay sales alerts and transparent channel source tagging.',
    link: '/contact',
    isExternal: false,
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'social-mgmt',
    number: 'OPTION 01',
    title: 'Social Media Management',
    desc: 'Ongoing content creation, editorial planning, graphic design, and brand management across your primary social channels.',
    highlights: ['Monthly editorial calendar', 'Custom graphic design & reels', 'Community engagement oversight', 'Monthly performance summary'],
    cta: 'Discuss Social Engagement',
  },
  {
    id: 'paid-ads',
    number: 'OPTION 02',
    title: 'Paid Ads Management',
    desc: 'Professional campaign setup, media buying, creative angle testing, and ongoing budget rebalancing on Meta or Google Ads.',
    highlights: ['Campaign structure & audience build', 'Continuous creative testing', 'Weekly bid & budget rebalancing', 'Bi-weekly attribution reporting'],
    cta: 'Discuss Paid Media',
  },
  {
    id: 'growth-package',
    number: 'OPTION 03',
    title: 'Growth Package',
    desc: 'Unified growth engine combining strategic content, active paid ad campaigns, conversion tracking, and ongoing optimization.',
    highlights: ['Content planning + Meta/Google ads', 'Meta CAPI & GA4 tracking setup', 'Ad creative asset production', 'Comprehensive monthly review'],
    cta: 'Discuss Growth Package',
  },
  {
    id: 'custom-system',
    number: 'OPTION 04',
    title: 'Custom Growth System',
    desc: 'End-to-end full-funnel architecture: campaign creation, custom landing pages, advanced analytics, and automated CRM lead pipelines.',
    highlights: ['High-performance custom landing page', 'Multi-channel ad management', 'Server-side tracking & custom dashboards', 'Automated lead alert workflows'],
    cta: 'Discuss Custom System',
  },
];

const ONBOARDING_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We analyze your business model, customer profiles, unit economics, and primary growth objectives.',
  },
  {
    step: '02',
    title: 'Audit',
    desc: 'We review existing ad accounts, social presence, website user experience, and tracking instrumentation.',
  },
  {
    step: '03',
    title: 'Strategy',
    desc: 'We define the target audience, priority channels, core commercial offer, and measurement benchmarks.',
  },
  {
    step: '04',
    title: 'Implement',
    desc: 'We configure tracking tags, build campaign architecture, produce initial creatives, and set up landing pages.',
  },
  {
    step: '05',
    title: 'Optimize',
    desc: 'We monitor incoming conversion events, test creative variations, and rebalance spend toward winning angles.',
  },
  {
    step: '06',
    title: 'Report',
    desc: 'We provide transparent performance reviews detailing verified business metrics and actionable next steps.',
  },
];

const FAQS = [
  {
    q: 'What digital marketing services do you provide?',
    a: 'NextDigi Growth provides a connected digital marketing service combining social media management, Meta Ads (Facebook & Instagram), Google Ads, SEO, conversion tracking, landing page design, marketing creative production, and e-commerce growth systems.',
  },
  {
    q: 'Can you manage our Facebook and Instagram ads?',
    a: 'Yes. We handle end-to-end Meta Ads management including audience research, campaign structure, creative angle testing, ad copywriting, Meta Pixel and Conversions API setup, and ongoing performance optimization.',
  },
  {
    q: 'Can you set up Meta Pixel and conversion tracking?',
    a: 'Yes. We configure standard Meta Pixel events as well as server-side Meta Conversions API (CAPI) through Google Tag Manager or direct backend integrations to ensure events are captured reliably despite browser privacy settings.',
  },
  {
    q: 'Can you configure Google Analytics and Google Tag Manager?',
    a: 'Yes. We establish clean Google Analytics 4 properties and Google Tag Manager containers with standardized event naming conventions, cross-domain tracking, and custom conversion funnels.',
  },
  {
    q: 'Can you manage Google Ads?',
    a: 'Yes. We manage Google Search campaigns targeted at commercial intent keywords, Display remarketing, and Performance Max campaigns where appropriate for your business goals and ad budget.',
  },
  {
    q: 'Can you help with SEO?',
    a: 'Yes. We offer structured technical SEO audits, on-page optimization, content strategy, structured schema markup, and Google Search Console performance monitoring. We focus on ethical, sustainable search architecture.',
  },
  {
    q: 'Can you create social media videos?',
    a: 'Yes. We produce short-form video content, social reels, motion graphics, and AI-assisted video variations designed to capture audience attention in modern mobile feeds.',
  },
  {
    q: 'Can you build a landing page for our campaign?',
    a: 'Yes. Through synergy with NextDigi Solutions, we design and build ultra-fast, mobile-optimized landing pages engineered around a single call-to-action to maximize paid traffic conversion rates.',
  },
  {
    q: 'Can you manage e-commerce advertising?',
    a: 'Yes. We manage dynamic product ads (DPA), catalog feeds, abandoned checkout retargeting, and Google Shopping campaigns, working smoothly with platforms like NextDigi Commerce, WooCommerce, and Shopify.',
  },
  {
    q: 'How do you measure campaign performance?',
    a: 'We evaluate campaigns using verified business metrics: qualified leads, cost per lead, click-through rates, cost per acquisition, and ROAS (when e-commerce revenue tracking is in place). We never rely on vanity metrics alone.',
  },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function NextDigiGrowthPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#00d4aa] selection:text-black">

      {/* ─── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <section id="growth-hero" aria-label="NextDigi Growth Hero" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        {/* Background glow accents */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00d4aa]/[0.08] blur-[150px] rounded-full" />
          <div className="absolute top-48 right-10 w-[450px] h-[350px] bg-[#38bdf8]/[0.06] blur-[130px] rounded-full" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-[#8b5cf6]/[0.05] blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#71717a] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3 text-[#3f3f46]" aria-hidden="true" />
            <span className="text-[#00d4aa] font-medium">NextDigi Growth</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 mb-6">
                <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-[#00d4aa]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa]">
                  NEXTDIGI GROWTH
                </span>
                <span className="text-xs text-[#71717a]">|</span>
                <span className="text-xs font-semibold text-gray-300">
                  Digital Marketing &amp; Growth
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
                Turn Digital Presence Into{' '}
                <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                  Business Growth.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-2xl mb-8">
                We help businesses build their digital presence, reach the right audience and improve conversion through social media, paid advertising, SEO, analytics and technology-driven growth strategies.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <Link
                  id="hero-start-growth-btn"
                  href="/contact?service=Digital%20Growth%20%2F%20Meta%20%26%20Google%20Ads"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 active:scale-95"
                >
                  Start a Growth Project
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  id="hero-talk-specialist-btn"
                  href="/contact?service=Digital%20Growth%20%2F%20Meta%20%26%20Google%20Ads"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#131823] hover:bg-[#1a2130] border border-white/10 hover:border-[#00d4aa]/40 transition active:scale-95"
                >
                  Talk to a Growth Specialist
                </Link>
              </div>

              {/* Capability Pill Tags */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap gap-2 text-xs text-[#94a3b8]">
                {[
                  'Social Media',
                  'Meta Ads',
                  'Google Ads',
                  'SEO',
                  'Analytics',
                  'Conversion Tracking',
                  'Landing Pages',
                  'Lead Systems',
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

            {/* Right Hero Visual: Interactive Marketing Analytics Dashboard Mockup */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-white/10 bg-[#0d121c]/90 backdrop-blur-md p-6 shadow-2xl shadow-black/80">
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-[#94a3b8] ml-2">growth.analytics.io</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse" />
                    ATTRIBUTION ACTIVE
                  </span>
                </div>

                {/* Dashboard Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-[#131823] border border-white/5">
                    <div className="text-[11px] text-[#94a3b8] font-medium">Tracking Status</div>
                    <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                      <CheckCircleIcon className="w-4 h-4 text-[#00d4aa]" />
                      GA4 + CAPI Synced
                    </div>
                    <div className="text-[10px] text-[#00d4aa] mt-1">Hybrid Event Bridge</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#131823] border border-white/5">
                    <div className="text-[11px] text-[#94a3b8] font-medium">Active Channels</div>
                    <div className="text-base font-bold text-white mt-0.5">Meta &amp; Google Ads</div>
                    <div className="text-[10px] text-sky-400 mt-1">Cross-Channel Attributed</div>
                  </div>
                </div>

                {/* Growth Funnel Visualization Widget */}
                <div className="p-4 rounded-xl bg-[#131823]/80 border border-white/5 mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-3">
                    <span>Funnel Conversion Flow</span>
                    <span className="text-[10px] font-mono text-[#94a3b8]">Live Pipeline</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { stage: 'Ad Impression', width: '100%', color: 'bg-white/20' },
                      { stage: 'Landing Page Visit', width: '74%', color: 'bg-[#00d4aa]/40' },
                      { stage: 'Offer Engagement', width: '48%', color: 'bg-[#38bdf8]/50' },
                      { stage: 'Lead / Checkout Conversion', width: '28%', color: 'bg-[#8b5cf6]/70' },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[10px] text-[#94a3b8]">
                          <span>{item.stage}</span>
                          <span className="font-mono text-gray-400">{item.width}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Event Activity Stream */}
                <div className="p-3.5 rounded-xl bg-[#101520] border border-white/5">
                  <div className="text-[11px] font-semibold text-gray-300 mb-2 flex items-center justify-between">
                    <span>Recent Attribution Events</span>
                    <span className="text-[10px] text-[#00d4aa]">Server-Side CAPI</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Lead Form Submitted
                      </span>
                      <span className="text-[#71717a]">GTM Container #204</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        InitiateCheckout (Commerce)
                      </span>
                      <span className="text-[#71717a]">Meta Pixel + CAPI</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Search Term Match (Intent)
                      </span>
                      <span className="text-[#71717a]">Google Ads API</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[10px] text-[#71717a]">
                    Demonstration Interface • Real Systems Connected to Client GA4 &amp; Ad APIs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. WHAT WE DO: COMPLETE DIGITAL GROWTH SYSTEM ──────────────────── */}
      <section id="what-we-do" aria-labelledby="what-we-do-heading" className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              WHAT WE DO
            </span>
            <h2 id="what-we-do-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              A Complete Digital Growth System
            </h2>
            <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed">
              We connect marketing channels, creative production, advertising and measurement so your digital activity works toward clear business objectives.
            </p>
          </div>

          {/* 3 Core System Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-2xl bg-[#0e131d] border border-white/[0.08] hover:border-[#00d4aa]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-5">
                <FunnelIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Strategy &amp; Content</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Rather than disjointed social posts, we architect coordinated messaging, editorial schedules, and high-contrast creative angles designed around customer intent.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e131d] border border-white/[0.08] hover:border-[#38bdf8]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] mb-5">
                <MegaphoneIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Paid Media &amp; Search</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Disciplined media buying across Meta and Google. We systematically test audience segments, eliminate budget leakage, and align campaigns with revenue-generating search queries.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e131d] border border-white/[0.08] hover:border-[#8b5cf6]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] mb-5">
                <PresentationChartLineIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tracking &amp; Conversion</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                A campaign without tracking is blind. We configure server-side CAPI, Google Analytics 4, and conversion funnels so you see exactly which channel produces real business leads and sales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. DIGITAL GROWTH SERVICES (9 SERVICES) ────────────────────────── */}
      <section id="services" aria-labelledby="services-heading" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-2">
                GROWTH SERVICES
              </span>
              <h2 id="services-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Digital Growth Services
              </h2>
            </div>
            <p className="text-sm text-[#94a3b8] mt-3 sm:mt-0 max-w-md">
              Targeted, performance-driven capabilities covering social media, paid advertising, search engine optimization, analytics, and landing pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GROWTH_SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  id={`service-${svc.id}`}
                  className={`rounded-2xl border border-white/[0.08] bg-[#0c1017] p-7 transition-all duration-300 flex flex-col justify-between ${svc.borderGlow} group`}
                >
                  <div>
                    {/* Header: Number and Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-bold text-[#71717a]">
                        {svc.number}
                      </span>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-105 transition-transform"
                        style={{ color: svc.accent }}
                      >
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs font-medium text-gray-400 mb-3">
                      {svc.tagline}
                    </p>
                    <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">
                      {svc.description}
                    </p>

                    {/* Services Items List */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.06]">
                      {svc.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircleIcon
                            className="w-4 h-4 shrink-0"
                            style={{ color: svc.accent }}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Disclaimer Note */}
                    <div className="mb-6 p-3 rounded-lg bg-[#111622] border border-white/[0.04]">
                      <p className="text-[11px] text-[#94a3b8] leading-relaxed italic">
                        {svc.disclaimer}
                      </p>
                    </div>
                  </div>

                  {/* Service CTA */}
                  <Link
                    href={svc.href}
                    className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition group-hover:border-[#00d4aa]/40"
                    aria-label={`${svc.cta} for ${svc.title}`}
                  >
                    <span>{svc.cta}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. GROWTH FUNNEL: FROM CLICK TO CUSTOMER ───────────────────────── */}
      <section id="growth-funnel" aria-labelledby="funnel-heading" className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative overflow-hidden">
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00d4aa]/[0.05] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              CONVERSION ARCHITECTURE
            </span>
            <h2 id="funnel-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              From Click to Customer
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              We engineer an uninterrupted 6-stage journey turning cold attention into measurable business revenue and continuous algorithmic refinement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUNNEL_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#0e131d] border border-white/[0.08] relative hover:border-[#00d4aa]/40 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-white/40">
                    {step.step}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                    style={{ color: step.color }}
                  >
                    {step.badge}
                  </span>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#71717a] mb-1">
                  PHASE: {step.phase}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. THE NEXTDIGI GROWTH FRAMEWORK ───────────────────────────────── */}
      <section id="growth-framework" aria-labelledby="framework-heading" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              METHODOLOGY
            </span>
            <h2 id="framework-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              The NextDigi Growth Framework
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              A scientific, step-by-step approach to digital marketing that replaces blind spending with data-backed progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {FRAMEWORK_STEPS.map((f) => (
              <div key={f.step} className="p-6 rounded-2xl bg-[#0c1017] border border-white/[0.08] hover:border-white/20 transition-all">
                <div className="text-xs font-mono font-bold text-[#00d4aa] mb-1">{f.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-4">
                  {f.summary}
                </p>
                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  {f.points.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Important Framing Callout */}
          <div className="p-5 rounded-xl bg-[#111622] border border-white/10 flex items-start gap-3">
            <ShieldCheckIcon className="w-5 h-5 text-[#00d4aa] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              <strong className="text-white">Responsible Scaling Note:</strong> We never recommend arbitrarily inflating ad spend before conversion funnels, unit margins, and attribution tracking have been validated with real baseline data.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 6. PLATFORM SECTION: WHERE WE HELP YOU GROW ────────────────────── */}
      <section id="platforms" aria-labelledby="platforms-heading" className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              PLATFORM SUPPORT
            </span>
            <h2 id="platforms-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Where We Help You Grow
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              We manage campaigns across established digital channels where prospective buyers discover, evaluate, and purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {PLATFORMS.map((p) => (
              <div key={p.name} className="p-6 rounded-2xl bg-[#0e131d] border border-white/[0.08] hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-400">
                    {p.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-[#71717a]">
              Platform names are displayed as service channels managed by NextDigi Growth. We operate as an independent digital marketing agency and do not claim official exclusive partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 7. TRACKING STACK: MEASURE WHAT MATTERS ────────────────────────── */}
      <section id="tracking-stack" aria-labelledby="tracking-heading" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-2">
                MEASUREMENT ARCHITECTURE
              </span>
              <h2 id="tracking-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Measure What Matters
              </h2>
            </div>
            <p className="text-sm text-[#94a3b8] mt-3 sm:mt-0 max-w-md">
              Accurate tracking is the foundation of profitable advertising. We deploy clean client and server-side pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {TRACKING_TOOLS.map((tool) => (
              <div key={tool.name} className="p-6 rounded-2xl bg-[#0c1017] border border-white/[0.08] hover:border-[#00d4aa]/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white">{tool.name}</h3>
                  <span className="text-[10px] font-bold text-[#00d4aa] uppercase tracking-wider">
                    {tool.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Privacy & Configuration Reality Callout */}
          <div className="p-5 rounded-xl bg-[#111622] border border-white/10 flex items-start gap-3">
            <PresentationChartLineIcon className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              <strong className="text-white">Measurement Integrity:</strong> Accurate tracking depends on client platform architecture, privacy settings, browser ad-blockers, and cookie consent implementations. We engineer hybrid client-server setups to deliver the highest practical signal fidelity.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 8. REPORTING: CLEAR REPORTING. BETTER DECISIONS ────────────────── */}
      <section id="reporting" aria-labelledby="reporting-heading" className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              TRANSPARENCY &amp; METRICS
            </span>
            <h2 id="reporting-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Clear Reporting. Better Decisions.
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              We monitor and report on metrics directly tied to commercial outcomes, avoiding vanity numbers and unsubstantiated claims.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {REPORTING_METRICS.map((m, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#0e131d] border border-white/[0.06] hover:border-white/20 transition">
                <h3 className="text-sm font-bold text-white mb-1.5">{m.label}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Example Looker Studio Demo View */}
          <div className="rounded-2xl border border-white/10 bg-[#0e131d] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00d4aa]">SAMPLE DASHBOARD VIEW</span>
                <h3 className="text-lg font-bold text-white">Executive Growth Performance Overview</h3>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300">
                Example Dashboard (Demonstration)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-[#131823] border border-white/5">
                <span className="text-xs text-[#94a3b8]">Tracked Channel</span>
                <div className="text-lg font-bold text-white mt-1">Paid Meta &amp; Search</div>
                <span className="text-[10px] text-[#00d4aa]">Campaign Group A</span>
              </div>
              <div className="p-4 rounded-xl bg-[#131823] border border-white/5">
                <span className="text-xs text-[#94a3b8]">Conversion Metric</span>
                <div className="text-lg font-bold text-white mt-1">Qualified Inquiries</div>
                <span className="text-[10px] text-sky-400">Validated Submissions</span>
              </div>
              <div className="p-4 rounded-xl bg-[#131823] border border-white/5">
                <span className="text-xs text-[#94a3b8]">Attribution Model</span>
                <div className="text-lg font-bold text-white mt-1">Data-Driven (GA4)</div>
                <span className="text-[10px] text-purple-400">Cross-Device</span>
              </div>
              <div className="p-4 rounded-xl bg-[#131823] border border-white/5">
                <span className="text-xs text-[#94a3b8]">Review Cadence</span>
                <div className="text-lg font-bold text-white mt-1">Weekly / Bi-weekly</div>
                <span className="text-[10px] text-emerald-400">Executive Notes</span>
              </div>
            </div>

            <p className="text-xs text-[#71717a] text-center">
              All live reporting dashboards are customized per client and connected directly to verified GA4, Meta Ads, and Google Ads APIs. We do not display synthetic client results.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 9. CASE STUDIES / INTERNAL PROJECTS ─────────────────────────────── */}
      <section id="case-studies" aria-labelledby="case-studies-heading" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              REAL IMPLEMENTATION
            </span>
            <h2 id="case-studies-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Growth Systems In Progress
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              We believe in demonstrable engineering over manufactured claims. Below are active setups and internal marketing architectures within the NextDigi ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {INTERNAL_PROJECTS.map((proj, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-[#0c1017] border border-white/[0.08] flex flex-col justify-between hover:border-[#00d4aa]/40 transition-all">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00d4aa] block mb-2">
                    {proj.type}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">{proj.title}</h3>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-4">
                    {proj.desc}
                  </p>
                  <div className="p-3 rounded-lg bg-[#111622] border border-white/5 mb-6">
                    <span className="text-[11px] font-semibold text-gray-300 block mb-1">Architecture Impact:</span>
                    <span className="text-xs text-[#00d4aa] font-medium">{proj.impact}</span>
                  </div>
                </div>

                {proj.isExternal ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#00d4aa] transition-colors"
                  >
                    <span>View Project Platform</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={proj.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#00d4aa] transition-colors"
                  >
                    <span>Inspect Infrastructure</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#0e131d] border border-white/10 text-center">
            <p className="text-xs text-[#94a3b8]">
              We do not publish unverified client logos, synthetic revenue screenshots, or fabricated ROAS figures. Client production growth case studies are released only with validated multi-quarter datasets and explicit client consent.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 10. NEXTDIGI SOLUTIONS CROSS-SELL ──────────────────────────────── */}
      <section id="solutions-crossell" aria-label="NextDigi Solutions cross-sell" className="py-16 lg:py-20 bg-[#0a0d14] border-t border-[#1a1f2c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#00d4aa]/20 bg-gradient-to-r from-[#00d4aa]/10 via-[#0e131d] to-[#07090e] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-2">
                ENGINEERING SYNERGY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Need a Better Website?
              </h2>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                Campaign performance depends on the experience customers see after they click. NextDigi Solutions can build landing pages, e-commerce platforms and custom web applications designed around your growth goals.
              </p>
            </div>
            <Link
              id="crossell-solutions-btn"
              href="/solutions"
              className="px-8 py-4 rounded-xl font-bold text-sm text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 shrink-0"
            >
              Explore NextDigi Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 11. NEXTDIGI AI CROSS-SELL ─────────────────────────────────────── */}
      <section id="ai-crossell" aria-label="NextDigi AI cross-sell" className="py-16 lg:py-20 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#8b5cf6]/20 bg-gradient-to-r from-[#8b5cf6]/10 via-[#0e131d] to-[#07090e] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[2px] text-[#a78bfa] block mb-2">
                AUTOMATION &amp; INTELLIGENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Add AI to Your Growth Engine.
              </h2>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                Use AI for content workflows, customer support, lead qualification and marketing automation. NextDigi AI builds practical AI agents and multi-channel conversational chatbots.
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

      {/* ─── 12. NEXTDIGI LABS CROSS-SELL ───────────────────────────────────── */}
      <section id="labs-crossell" aria-label="NextDigi Labs cross-sell" className="py-16 lg:py-20 bg-[#0a0d14] border-t border-[#1a1f2c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-[#0c1017] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-sky-400 block mb-2">
                PROPRIETARY SOFTWARE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Technology Behind the Growth
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8] max-w-xl leading-relaxed">
                Discover proprietary digital products and automation engines engineered by NextDigi Labs to power scalable business growth.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <BuildingStorefrontIcon className="w-4 h-4 text-[#00d4aa]" />
                  NextDigi Commerce: AI-powered Ecommerce Platform
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="https://commerce.nextdigihome.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#131823] hover:bg-[#1a2130] border border-white/10 transition"
              >
                Visit NextDigi Commerce
              </a>
              <Link
                href="/labs"
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
              >
                Explore NextDigi Labs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 13. ENGAGEMENT MODELS: FLEXIBLE GROWTH ENGAGEMENTS ─────────────── */}
      <section id="engagement-models" aria-labelledby="engagement-heading" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              PARTNERSHIP OPTIONS
            </span>
            <h2 id="engagement-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Flexible Growth Engagements
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              Transparent, structured agency engagement models tailored to your current commercial scale and marketing requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.id} className="p-6 rounded-2xl bg-[#0c1017] border border-white/[0.08] flex flex-col justify-between hover:border-[#00d4aa]/40 transition-all">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#00d4aa] block mb-1">
                    {model.number}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{model.title}</h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-5">{model.desc}</p>
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    {model.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircleIcon className="w-3.5 h-3.5 text-[#00d4aa] shrink-0" aria-hidden="true" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href="/contact?service=Digital%20Growth%20%2F%20Meta%20%26%20Google%20Ads"
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition hover:border-[#00d4aa]/40"
                >
                  {model.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-[#71717a]">
              We do not publish arbitrary fixed monthly pricing. Growth engagements are scoped based on business goals, ad channel complexity, creative volume, and technical tracking requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 14. CLIENT ONBOARDING: 6-STEP PROCESS ──────────────────────────── */}
      <section id="onboarding" aria-labelledby="onboarding-heading" className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              HOW WE START
            </span>
            <h2 id="onboarding-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Client Onboarding Process
            </h2>
            <p className="text-base text-[#94a3b8] leading-relaxed">
              How we transition from your initial strategy discussion to active, monitored growth campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ONBOARDING_STEPS.map((s) => (
              <div key={s.step} className="p-6 rounded-2xl bg-[#0e131d] border border-white/[0.08]">
                <span className="text-2xl font-black font-mono text-[#00d4aa]/60 block mb-2">
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

      {/* ─── 15. RESPONSIBLE MARKETING: DATA, NOT PROMISES ──────────────────── */}
      <section id="responsible-marketing" aria-labelledby="responsible-heading" className="py-20 lg:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 mb-6">
            <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa]">
              ETHICAL MARKETING COMMITMENT
            </span>
          </div>

          <h2 id="responsible-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5">
            Marketing Based on Data, Not Promises.
          </h2>

          <p className="text-base sm:text-lg text-[#94a3b8] leading-relaxed mb-10 max-w-2xl mx-auto">
            We focus on proper strategy, measurement, testing and optimization rather than promising guaranteed sales, rankings or advertising results.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-5 rounded-xl bg-[#0c1017] border border-white/[0.08]">
              <div className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-[#00d4aa]" />
                Zero Vanity Metrics
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                We do not prioritize superficial likes or fake impressions over real qualified customer inquiries and measurable checkout revenue.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#0c1017] border border-white/[0.08]">
              <div className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-[#00d4aa]" />
                Scientific Ad Testing
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                We isolate variables—video hooks, copy angles, audience groups—in low-spend sandboxes before allocating substantial budgets.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#0c1017] border border-white/[0.08]">
              <div className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-[#00d4aa]" />
                Privacy &amp; Policy Adherence
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                All ad campaigns and tracking setups comply strictly with platform terms, advertising guidelines, and modern user privacy standards.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#0c1017] border border-white/[0.08]">
              <div className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-[#00d4aa]" />
                Engineering Synergy
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Because NextDigiHome engineers software and e-commerce platforms, our growth division can solve deep technical tracking and speed bottlenecks in-house.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 16. FREQUENTLY ASKED QUESTIONS ─────────────────────────────────── */}
      <section id="faq" aria-labelledby="faq-heading" className="py-20 lg:py-28 bg-[#0a0d14] border-t border-[#1a1f2c] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#94a3b8]">
              Factual, transparent answers regarding our digital marketing, paid ads, SEO, and analytics services.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-white/[0.08] bg-[#0e131d] p-6 [&_summary::-webkit-details-marker]:hidden open:border-[#00d4aa]/30 transition"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-bold text-white text-base">
                  <span>{faq.q}</span>
                  <ChevronRightIcon className="w-4 h-4 text-[#71717a] transition-transform duration-200 group-open:rotate-90 shrink-0" />
                </summary>
                <p className="mt-4 text-sm text-[#94a3b8] leading-relaxed pt-3 border-t border-white/5">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 17. FINAL CTA: START A GROWTH PROJECT ──────────────────────────── */}
      <section id="final-cta" aria-label="Start a Growth Project" className="py-24 lg:py-32 relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#00d4aa]/[0.08] blur-[160px] rounded-full" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#38bdf8]/[0.05] blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#00d4aa]/30 bg-[#0d121c] p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 mb-6">
                <SparklesIcon className="w-3.5 h-3.5 text-[#00d4aa]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa]">
                  START GROWING TODAY
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
                Ready to Turn Digital Presence Into Business Growth?
              </h2>

              <p className="text-base sm:text-lg text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
                Tell us about your business, target audience, and marketing challenges. We&apos;ll outline a practical, data-driven growth roadmap tailored to your objectives.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link
                  id="final-start-growth-btn"
                  href="/contact?service=Digital%20Growth%20%2F%20Meta%20%26%20Google%20Ads"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 active:scale-95"
                >
                  Start a Growth Project
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  id="final-talk-specialist-btn"
                  href="/contact?service=Digital%20Growth%20%2F%20Meta%20%26%20Google%20Ads"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-[#131823] border border-white/10 text-white hover:border-[#00d4aa]/50 hover:bg-[#1a2130] transition active:scale-95"
                >
                  Talk to a Growth Specialist
                </Link>
              </div>

              {/* Ecosystem Quick Links */}
              <div className="border-t border-white/[0.08] pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-[#71717a]">
                {[
                  { label: 'NextDigi Solutions', href: '/solutions' },
                  { label: 'NextDigi AI', href: '/ai' },
                  { label: 'NextDigi Labs', href: '/labs' },
                  { label: 'NextDigi Store', href: '/store' },
                  { label: 'Contact Us', href: '/contact' },
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
