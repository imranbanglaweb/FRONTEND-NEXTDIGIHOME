import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  MegaphoneIcon, 
  CursorArrowRaysIcon, 
  MagnifyingGlassIcon, 
  PresentationChartLineIcon, 
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

type GrowthServiceData = {
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

const growthData: Record<string, GrowthServiceData> = {
  'meta-ads': {
    id: 'meta-ads',
    title: 'Meta Ads (Facebook & Instagram)',
    division: 'NextDigi Growth',
    tagline: 'Structured media buying, creative testing & precision retargeting',
    description: 'We build high-converting paid social campaigns with systematic creative variation, audience segmentation, server-side Conversions API (CAPI) tracking, and ROAS-focused budget allocation.',
    longDescription: 'Running profitable Meta ads in modern digital markets requires technical precision and relentless creative iteration. We deploy full-funnel campaign structures backed by server-side Conversions API to eliminate signal loss, test 10-20 creative hooks weekly, and scale your winning ads with disciplined budget pacing.',
    accent: '#00d4aa',
    icon: MegaphoneIcon,
    capabilities: [
      { title: 'Server-Side Conversions API (CAPI)', desc: 'Bypass iOS privacy tracking loss with server-to-server event dispatching directly from your backend.' },
      { title: 'Creative Hook Testing Framework', desc: 'Isolate visual angles, video hooks, and copy variations in scientific sandbox campaigns.' },
      { title: 'Dynamic Product Ads (DPA)', desc: 'Automatically show personalized catalog items to shoppers who viewed or abandoned specific products.' },
      { title: 'Omnichannel Retargeting Sequences', desc: 'Nurture warm prospects with social proof, founder stories, and objection-handling video ads.' }
    ],
    deliverables: [
      'Configured Meta Business Manager, Pixel, and Server-Side CAPI tracking',
      'High-velocity creative production (video hooks, static cards, carousels)',
      'Weekly performance reporting detailing CAC, ROAS, and creative fatigue metrics',
      'Continuous campaign optimization and budget rebalancing'
    ],
    techStack: ['Meta Ads Manager', 'Meta Conversions API (CAPI)', 'Google Tag Manager', 'Canva Pro / Adobe Premiere', 'Looker Studio'],
    faqs: [
      {
        q: 'Do you guarantee a specific ROAS (Return on Ad Spend)?',
        a: 'We do not make fraudulent claims or fake ROAS promises. Instead, we use a disciplined scientific testing process to identify proven winning angles, optimize your sales funnels, and systematically lower your customer acquisition cost.'
      },
      {
        q: 'How much ad budget should we start with?',
        a: 'We recommend allocating a minimum testing budget that allows at least 30 to 50 conversion events per week, giving Meta algorithms sufficient data to exit the learning phase.'
      }
    ]
  },
  'google-ads': {
    id: 'google-ads',
    title: 'Google & YouTube Ads',
    division: 'NextDigi Growth',
    tagline: 'Capture high-intent search demand and intent-driven conversions',
    description: 'Capture active buyers when they search for your products or services. We manage Google Search, Performance Max, Display, and YouTube ad campaigns with strict cost-per-acquisition targets.',
    longDescription: 'When prospects search on Google, they already have purchase intent. We position your brand directly in front of those ready-to-buy customers using tightly-themed keyword groups, negative keyword filtration to stop wasted spend, and multi-channel Performance Max campaigns optimized for profit.',
    accent: '#38bdf8',
    icon: CursorArrowRaysIcon,
    capabilities: [
      { title: 'High-Intent Search Campaigns', desc: 'Precision keyword matching targeting bottom-of-funnel commercial searches with zero budget waste.' },
      { title: 'Performance Max (PMax) Architecture', desc: 'Asset-group segmented PMax campaigns leveraging Google AI across Search, YouTube, Gmail, and Maps.' },
      { title: 'Negative Keyword Shielding', desc: 'Aggressive negative keyword lists to prevent your budget from being spent on irrelevant searches.' },
      { title: 'Enhanced Conversions & Value Bidding', desc: 'First-party conversion value feeding to train Google bidding algorithms toward higher basket sizes.' }
    ],
    deliverables: [
      'Comprehensive Google Ads account architecture and tracking setup',
      'Keyword research matrix categorized by commercial intent',
      'Ad copy variations with dynamic keyword insertion (DKI) and sitelink extensions',
      'Bi-weekly search term audits and bid adjustment management'
    ],
    techStack: ['Google Ads', 'Performance Max', 'Google Tag Manager', 'GA4 Enhanced Conversions', 'Google Merchant Center'],
    faqs: [
      {
        q: 'How do you prevent money being wasted on irrelevant clicks?',
        a: 'We implement daily search query auditing, strict exact/phrase match hierarchies, and maintain over 1,000 global negative keywords to exclude non-commercial traffic.'
      }
    ]
  },
  'seo': {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    division: 'NextDigi Growth',
    tagline: 'Technical architecture, Core Web Vitals & organic authority building',
    description: 'Build compounding organic search traffic. We optimize technical site architecture, schema markup, content topic clusters, and Core Web Vitals to rank for revenue-generating keywords.',
    longDescription: 'Organic search is the most sustainable, high-margin customer acquisition channel in technology. We engineer deep technical SEO into your Next.js application, build semantic topic clusters that demonstrate domain authority, and optimize speed metrics so Google treats your site as a primary resource.',
    accent: '#8b5cf6',
    icon: MagnifyingGlassIcon,
    capabilities: [
      { title: 'Core Web Vitals & Technical SEO', desc: 'Sub-second LCP, zero CLS shifts, and optimized server-side rendering for flawless crawling.' },
      { title: 'Structured Schema & Rich Snippets', desc: 'JSON-LD schema for Products, Organizations, FAQs, and Breadcrumbs to capture Google rich results.' },
      { title: 'Semantic Topic Cluster Architecture', desc: 'Interlinked content hubs that build topical authority around your core commercial products.' },
      { title: 'Indexation & Crawl Budget Optimization', desc: 'Robots.txt, dynamic sitemaps, canonical tags, and HTTP header auditing.' }
    ],
    deliverables: [
      'Complete Technical SEO audit and code-level remediation',
      'Keyword research strategy focused on commercial intent and low-difficulty wins',
      'Structured JSON-LD schema implementation across all page templates',
      'Monthly keyword ranking and organic traffic growth reporting'
    ],
    techStack: ['Google Search Console', 'Ahrefs / Semrush', 'Next.js Metadata API', 'Schema.org', 'Screaming Frog'],
    faqs: [
      {
        q: 'How soon can we expect organic search ranking improvements?',
        a: 'Technical SEO and crawl fixes often yield noticeable indexation and ranking improvements within 4 to 8 weeks, while competitive commercial keywords typically mature over 3 to 6 months.'
      }
    ]
  },
  'analytics': {
    id: 'analytics',
    title: 'Analytics & Attribution Systems',
    division: 'NextDigi Growth',
    tagline: 'Accurate conversion tracking, GA4 & multi-touch attribution',
    description: 'Eliminate blind ad spending. We implement server-side tracking, Google Analytics 4, Meta CAPI, and custom Looker Studio dashboards so you know exactly which channel generates real profit.',
    longDescription: 'With browser privacy restrictions and ad blockers, standard client-side analytics can lose up to 30% of conversion data. We engineer server-side tracking pipelines that capture every transaction with 100% integrity, feeding clean attribution data into custom executive dashboards.',
    accent: '#f59e0b',
    icon: PresentationChartLineIcon,
    capabilities: [
      { title: 'Server-Side Google Tag Manager (sGTM)', desc: 'Run tracking containers on your own cloud subdomain for maximum reliability and data security.' },
      { title: 'Multi-Touch Customer Attribution', desc: 'Track the full user journey from first ad impression to final checkout across web and mobile.' },
      { title: 'Custom Looker Studio Dashboards', desc: 'Unified real-time dashboards combining ad spend, e-commerce revenue, and net profit margins.' },
      { title: 'Automated Anomaly & Discrepancy Alerts', desc: 'Immediate notification triggers if tracking events or checkout completions drop unexpectedly.' }
    ],
    deliverables: [
      'Server-side GTM container setup on custom cloud domain',
      'Verified Google Analytics 4 e-commerce tracking with purchase validation',
      'Unified cross-channel executive dashboard in Looker Studio',
      'Data layer documentation and tagging taxonomy runbook'
    ],
    techStack: ['Google Tag Manager (Server & Web)', 'Google Analytics 4', 'Looker Studio', 'BigQuery', 'Meta Conversions API'],
    faqs: [
      {
        q: 'Why is server-side tracking superior to traditional pixel scripts?',
        a: 'Server-side tracking bypasses browser ad-blockers, extends cookie lifespans on iOS/Safari, reduces client-side JavaScript execution time, and keeps customer PII data strictly secure.'
      }
    ]
  },
  'social-media': {
    id: 'social-media',
    title: 'Social Media Strategy & Content',
    division: 'NextDigi Growth',
    tagline: 'Brand narrative, visual assets & community engagement',
    description: 'Build a commanding social presence that commands trust. We produce compelling graphic designs, short-form video hooks, and strategic content calendars that turn followers into customers.',
    longDescription: 'Social media should be a driver of commercial credibility, not just pretty pictures. We produce targeted visual content, educational carousels, and high-energy short-form video clips designed to position your brand as the definitive authority in your industry.',
    accent: '#ec4899',
    icon: ChartBarIcon,
    capabilities: [
      { title: 'Strategic Content Architecture', desc: 'Categorized pillars balancing commercial offers, educational insights, and community proof.' },
      { title: 'High-Impact Visual Assets', desc: 'Modern, typographic-driven social graphic design tailored to your core brand aesthetic.' },
      { title: 'Short-Form Video Production', desc: 'Reels and TikTok scripts, video editing, motion graphics, and engaging subtitle styling.' },
      { title: 'Active Community Moderation', desc: 'Prompt comment monitoring and lead routing to ensure no potential customer inquiry is lost.' }
    ],
    deliverables: [
      'Monthly editorial content calendar with scheduled publication assets',
      'Custom-designed social templates and branding guidelines',
      'Short-form vertical video assets with engaging hooks',
      'Monthly audience growth, reach, and engagement analytics report'
    ],
    techStack: ['Adobe Photoshop / Illustrator', 'Adobe Premiere / After Effects', 'Canva Pro', 'Meta Business Suite', 'CapCut'],
    faqs: [
      {
        q: 'Do you create original video content or just static graphics?',
        a: 'We produce both: high-converting static carousels and motion reels with dynamic text overlays, sound design, and video editing.'
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(growthData).map((service) => ({ service }));
}

type PageProps = {
  params: Promise<{ service: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const data = growthData[service];

  if (!data) {
    return {
      title: 'Growth Service Not Found | NextDigi Growth',
      description: 'The requested growth strategy could not be found.',
    };
  }

  return generatePageMetadata({
    title: `${data.title} | ${data.division}`,
    description: `${data.tagline}. ${data.description}`,
    path: `/growth/${service}`,
  });
}

export default async function GrowthServiceDetailPage({ params }: PageProps) {
  const { service } = await params;
  const data = growthData[service];

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
          <Link href="/growth" className="hover:text-[#00d4aa] transition">NextDigi Growth</Link>
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
                  Request {data.title} Strategy
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/growth"
                  className="px-6 py-3.5 rounded-xl font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  View All Growth Channels
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10">
                  <IconComponent className="w-8 h-8" style={{ color: data.accent }} />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Platforms & Tools
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
                Full attribution transparency & zero vanity metrics
              </div>
            </div>
          </div>
        </div>

        {/* Technical Capabilities */}
        <div className="mb-16">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Execution Architecture
            </h2>
            <p className="text-gray-400">
              Systematic workflows designed to test, validate, and scale customer acquisition.
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
                    <ArrowTrendingUpIcon className="w-4 h-4" style={{ color: data.accent }} />
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

        {/* CTA */}
        <div className="rounded-3xl border border-[#00d4aa]/30 bg-gradient-to-r from-[#00d4aa]/15 via-[#38bdf8]/10 to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to scale with {data.title.toLowerCase()}?
            </h3>
            <p className="text-gray-300 max-w-xl">
              Connect with our performance marketing leads to conduct an audit of your ad accounts, pixel data, and conversion funnels.
            </p>
          </div>
          <Link
            href={`/contact?service=${encodeURIComponent(data.title)}`}
            className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/30 shrink-0"
          >
            Start Growth Strategy
          </Link>
        </div>

      </div>
    </div>
  );
}
