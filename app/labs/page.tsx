import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  BeakerIcon, 
  RocketLaunchIcon, 
  ShoppingBagIcon, 
  ShareIcon, 
  BoltIcon, 
  WrenchScrewdriverIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: "NextDigi Labs | Proprietary SaaS Products & Innovation Ecosystem",
  description: "Explore proprietary software products developed and incubated by NextDigiHome. Multi-channel commerce platforms, workflow automation, and specialized industry SaaS solutions.",
  path: "/labs",
});

export default function NextDigiLabsPage() {
  const products = [
    {
      id: 'commerce',
      name: 'NextDigi Commerce',
      tagline: 'Turnkey Multi-Channel E-Commerce Engine',
      description: 'A purpose-built commerce platform for modern businesses. Comes with native bKash/Nagad checkout, automated courier dispatching, and multi-warehouse inventory management.',
      status: 'In Active Production',
      statusColor: 'text-[#00d4aa] border-[#00d4aa]/30 bg-[#00d4aa]/10',
      accent: '#00d4aa',
      icon: ShoppingBagIcon,
      features: ['One-Click bKash/Nagad Checkout', 'Automated Courier Waybill Sync', 'Real-time Stock Management', 'Customer Order Tracking Portal'],
      href: '/labs/commerce',
      externalUrl: 'https://commerce.nextdigihome.com',
    },
    {
      id: 'social',
      name: 'NextDigi Social',
      tagline: 'Multi-Channel Social Scheduling & Unified Inbox',
      description: 'Manage, schedule, and analyze your brand content across Facebook, Instagram, LinkedIn, and TikTok from a single synchronized dashboard with AI caption generation.',
      status: 'Private Beta',
      statusColor: 'text-[#8b5cf6] border-[#8b5cf6]/30 bg-[#8b5cf6]/10',
      accent: '#8b5cf6',
      icon: ShareIcon,
      features: ['Omnichannel Post Scheduler', 'Unified Comment & DM Inbox', 'AI Caption & Hashtag Engine', 'Audience Growth Analytics'],
      href: '/labs/social',
      externalUrl: 'https://social.nextdigihome.com',
    },
    {
      id: 'automate',
      name: 'NextDigi Automate',
      tagline: 'Visual Low-Code Workflow Automation Engine',
      description: 'Connect internal spreadsheets, webhooks, databases, and customer notifications into autonomous business pipelines without writing custom backend scripts.',
      status: 'Early Access',
      statusColor: 'text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10',
      accent: '#f59e0b',
      icon: BoltIcon,
      features: ['Drag-and-Drop Workflow Canvas', 'Pre-Built Integration Connectors', 'Idempotent Webhook Listeners', 'Execution Log Observability'],
      href: '/labs/automate',
      externalUrl: 'https://automate.nextdigihome.com',
    },
    {
      id: 'garibondhu360',
      name: 'Garibondhu360',
      tagline: 'Automotive Workshop & Fleet Management SaaS',
      description: 'Specialized cloud ERP for automotive repair workshops, parts inventory, mechanic job cards, and corporate vehicle fleet maintenance scheduling.',
      status: 'Live Customer Platform',
      statusColor: 'text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/10',
      accent: '#38bdf8',
      icon: WrenchScrewdriverIcon,
      features: ['Digital Job Card Management', 'Spare Parts Inventory & Barcoding', 'Customer Service SMS Reminders', 'Fleet Maintenance Logs'],
      href: '/labs/garibondhu360',
      externalUrl: 'https://garibondhu360.nextdigihome.com',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#8b5cf6]/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-[#a78bfa] font-medium">NextDigi Labs</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs font-semibold tracking-wider text-[#a78bfa] uppercase mb-5">
            <BeakerIcon className="w-4 h-4 text-[#8b5cf6]" />
            DIVISION: NEXTDIGI LABS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Proprietary SaaS Products & <span className="bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#00d4aa] bg-clip-text text-transparent">Software Innovation</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            NextDigi Labs is the internal product incubation engine of NextDigiHome. We engineer, test, and operate our own software platforms to solve acute industry operational bottlenecks.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#products"
              className="px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#9d72f9] hover:to-[#8b5cf6] transition shadow-lg shadow-[#8b5cf6]/25 flex items-center gap-2"
            >
              Explore Products
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/contact?service=SaaS%20Partnership"
              className="px-6 py-3.5 rounded-xl font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Enterprise Licensing & Inquiries
            </Link>
          </div>
        </div>

        {/* Labs Mission Statement */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111622] to-[#0a0d14] p-8 sm:p-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <span className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wider block mb-2">Our Philosophy</span>
              <h3 className="text-lg font-bold text-white mb-2">Built From Real Need</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                We build products that solve friction we encountered ourselves when operating regional commerce and enterprise workflows.
              </p>
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-[#00d4aa] uppercase tracking-wider block mb-2">Engineering Standard</span>
              <h3 className="text-lg font-bold text-white mb-2">Production Battle-Tested</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Before any product is released, it processes thousands of real transactions and operations under strict latency and security requirements.
              </p>
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-[#38bdf8] uppercase tracking-wider block mb-2">Synergy</span>
              <h3 className="text-lg font-bold text-white mb-2">Client Solution Transfer</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                The battle-tested architectural components built in Labs directly power our custom client solutions, ensuring unmatched reliability.
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div id="products" className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#8b5cf6] uppercase">Active Ecosystem</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Our Incubated Products</h2>
            </div>
            <p className="text-sm text-gray-400 mt-2 sm:mt-0 max-w-md">
              SaaS platforms operating across retail commerce, digital content, workflow routing, and automotive industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="rounded-3xl border border-white/10 bg-[#0e131d]/90 hover:bg-[#121824] p-8 transition-all duration-300 flex flex-col justify-between hover:border-white/20 group hover:shadow-[0_0_35px_rgba(139,92,246,0.12)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-105 transition-transform" style={{ color: p.accent }}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${p.statusColor}`}>
                        {p.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#a78bfa] transition">
                      {p.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-300 mb-4" style={{ color: p.accent }}>
                      {p.tagline}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {p.description}
                    </p>

                    <div className="space-y-2.5 mb-8 pt-5 border-t border-white/5">
                      {p.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                          <CheckCircleIcon className="w-4 h-4 text-[#00d4aa] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <Link
                      href={p.href}
                      className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white text-center transition group-hover:border-white/20"
                    >
                      Product Architecture & Overview
                    </Link>
                    <a
                      href={p.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition shrink-0"
                      title="Visit platform"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-[#8b5cf6]/30 bg-gradient-to-r from-[#8b5cf6]/15 via-[#00d4aa]/10 to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Interested in white-labeling or licensing our SaaS platforms?
            </h3>
            <p className="text-gray-300 max-w-xl text-sm sm:text-base">
              We offer bespoke enterprise licensing, multi-tenant instances, and source code rights for qualified partners.
            </p>
          </div>
          <Link
            href="/contact?service=Labs%20Licensing"
            className="px-8 py-4 rounded-xl font-bold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition shadow-lg shadow-[#8b5cf6]/30 shrink-0"
          >
            Inquire About Licensing
          </Link>
        </div>

      </div>
    </div>
  );
}
