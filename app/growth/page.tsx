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
  FunnelIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: "NextDigi Growth | Performance Marketing, Meta & Google Ads, SEO & Analytics",
  description: "Data-driven digital marketing and growth systems. We scale revenue with structured ad testing, search engine optimization, full-funnel attribution, and high-converting creatives.",
  path: "/growth",
});

export default function NextDigiGrowthPage() {
  const growthServices = [
    {
      id: 'meta-ads',
      title: 'Meta Ads (Facebook & Instagram)',
      tagline: 'Structured media buying, creative testing & precision retargeting',
      description: 'We build high-converting paid social campaigns with systematic creative variation, audience segmentation, server-side Conversions API (CAPI) tracking, and ROAS-focused budget allocation.',
      icon: MegaphoneIcon,
      accent: '#00d4aa',
      badge: 'Paid Social',
      features: ['Meta Conversions API (CAPI)', 'High-Velocity Creative Testing', 'Dynamic Product Ads (DPA)', 'Full-Funnel Retargeting Architecture'],
      href: '/growth/meta-ads',
    },
    {
      id: 'google-ads',
      title: 'Google & YouTube Ads',
      tagline: 'Capture high-intent search demand and intent-driven conversions',
      description: 'Capture active buyers when they search for your products or services. We manage Google Search, Performance Max, Display, and YouTube ad campaigns with strict cost-per-acquisition targets.',
      icon: CursorArrowRaysIcon,
      accent: '#38bdf8',
      badge: 'Paid Search',
      features: ['Search & Performance Max Campaigns', 'Keyword Intent & Negative Filtering', 'Enhanced Conversions Tracking', 'YouTube Video Action Campaigns'],
      href: '/growth/google-ads',
    },
    {
      id: 'seo',
      title: 'Search Engine Optimization (SEO)',
      tagline: 'Technical architecture, Core Web Vitals & organic authority building',
      description: 'Build compounding organic search traffic. We optimize technical site architecture, schema markup, content topic clusters, and Core Web Vitals to rank for revenue-generating keywords.',
      icon: MagnifyingGlassIcon,
      accent: '#8b5cf6',
      badge: 'Organic Search',
      features: ['Technical & Architecture Auditing', 'Semantic Keyword Strategy', 'Core Web Vitals Optimization', 'Structured Data & Rich Snippets'],
      href: '/growth/seo',
    },
    {
      id: 'analytics',
      title: 'Analytics & Attribution Systems',
      tagline: 'Accurate conversion tracking, GA4 & multi-touch attribution',
      description: 'Eliminate blind ad spending. We implement server-side tracking, Google Analytics 4, Meta CAPI, and custom Looker Studio dashboards so you know exactly which channel generates real profit.',
      icon: PresentationChartLineIcon,
      accent: '#f59e0b',
      badge: 'Data & Tracking',
      features: ['Google Tag Manager & GA4', 'Server-Side CAPI & Offline Sync', 'Customer Journey Attribution', 'Executive Looker Studio Dashboards'],
      href: '/growth/analytics',
    },
    {
      id: 'social-media',
      title: 'Social Media Strategy & Content',
      tagline: 'Brand narrative, visual assets & community engagement',
      description: 'Build a commanding social presence that commands trust. We produce compelling graphic designs, short-form video hooks, and strategic content calendars that turn followers into customers.',
      icon: ChartBarIcon,
      accent: '#ec4899',
      badge: 'Content & Brand',
      features: ['Editorial Calendar & Strategy', 'High-Converting Visual Creatives', 'Short-form Reels & Video Hooks', 'Brand Identity & Community Growth'],
      href: '/growth/social-media',
    },
  ];

  const pillars = [
    {
      title: 'Data-Driven Testing',
      desc: 'We never guess. We run structured creative and audience split tests to let verified conversion metrics guide budget allocation.',
      icon: FunnelIcon,
    },
    {
      title: 'Ethical Marketing Tone',
      desc: 'No false get-rich guarantees or vanity numbers. We focus on real customer acquisition cost (CAC), return on ad spend, and lifetime value.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Full-Funnel Alignment',
      desc: 'Ads perform better when aligned with fast web pages and frictionless checkouts built by our engineering division.',
      icon: ArrowTrendingUpIcon,
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Background Neon Blurs */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[350px] bg-[#00d4aa]/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-96 right-1/4 w-[500px] h-[300px] bg-[#38bdf8]/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-[#00d4aa] font-medium">NextDigi Growth</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-semibold tracking-wider text-[#00d4aa] uppercase mb-5">
            <ArrowTrendingUpIcon className="w-4 h-4 text-[#00d4aa]" />
            DIVISION: NEXTDIGI GROWTH
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Predictable Customer Acquisition & <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">Digital Growth</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Scaling a modern business requires more than running random ads. We engineer full-funnel acquisition systems combining high-impact creative testing, search dominance, and airtight attribution tracking.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?service=Digital%20Growth"
              className="px-7 py-3.5 rounded-xl font-semibold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 flex items-center gap-2"
            >
              Request Growth Strategy
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="#services"
              className="px-6 py-3.5 rounded-xl font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Explore Growth Channels
            </Link>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-[#00d4aa]/30 transition">
              <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-4">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Growth Services Grid */}
        <div id="services" className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#00d4aa] uppercase">What We Manage</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Our Growth Services</h2>
            </div>
            <p className="text-sm text-gray-400 mt-2 sm:mt-0 max-w-md">
              Focused on metrics that matter: acquisition cost, qualified leads, and measurable lifetime revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {growthServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="rounded-2xl border border-white/10 bg-[#0e131d]/80 hover:bg-[#111724] p-7 transition-all duration-300 flex flex-col justify-between hover:border-[#00d4aa]/40 hover:shadow-[0_0_30px_rgba(0,212,170,0.12)] group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-105 transition-transform" style={{ color: service.accent }}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00d4aa] transition">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-[#00d4aa] mb-3">
                      {service.tagline}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircleIcon className="w-4 h-4 text-[#00d4aa] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition group-hover:border-[#00d4aa]/40"
                  >
                    <span>Explore Channel Strategy</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growth Pipeline Methodology */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111622] to-[#0a0d14] p-8 sm:p-12 mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold text-[#00d4aa] uppercase tracking-wider">Growth Framework</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
              How NextDigi Growth Executes Campaigns
            </h2>
            <p className="text-sm text-gray-400">
              We replace guesswork with an iterative scientific growth loop designed to find winning creatives and scale them profitably.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Tracking & Pixel Audit', desc: 'Fix signal loss with GA4, server-side CAPI, and enhanced conversions tracking.' },
              { step: '02', title: 'Creative Production', desc: 'Produce high-contrast video hooks, product showcases, and psychological benefit angles.' },
              { step: '03', title: 'Controlled Testing', desc: 'Isolate variables (audiences, angles, formats) in dedicated low-spend testing ad sets.' },
              { step: '04', title: 'Scaling Profitable Winners', desc: 'Consolidate winning ads into high-volume scaling sets and optimize landing page speed.' }
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl font-black text-[#00d4aa]/50 block mb-2">{s.step}</span>
                <h4 className="text-sm font-bold text-white mb-1">{s.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl border border-[#00d4aa]/30 bg-gradient-to-r from-[#00d4aa]/15 via-[#38bdf8]/10 to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to acquire customers systematically?
            </h3>
            <p className="text-gray-300 max-w-xl text-sm sm:text-base">
              Schedule a strategy discussion with our performance growth leads to review your current acquisition channels and conversion tracking.
            </p>
          </div>
          <Link
            href="/contact?service=NextDigi%20Growth"
            className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/30 shrink-0"
          >
            Start Growth Strategy
          </Link>
        </div>

      </div>
    </div>
  );
}
