'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  DevicePhoneMobileIcon,
  CommandLineIcon,
  ServerIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  ChatBubbleBottomCenterTextIcon,
  LifebuoyIcon,
  ArrowsRightLeftIcon,
  MegaphoneIcon,
  CursorArrowRaysIcon,
  MagnifyingGlassIcon,
  PresentationChartLineIcon,
  BeakerIcon,
  ShareIcon,
  BoltIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { apiFetch } from './utils/api';

interface WelcomeSettings {
  site_title?: string;
  admin_title?: string;
  site_description?: string;
  admin_description?: string;
}

export default function Home() {
  const [welcomeSettings, setWelcomeSettings] = useState<WelcomeSettings | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await apiFetch('settings', { silent: true });
        setWelcomeSettings(data?.data?.data || data?.data || data || {});
      } catch {}
    };
    fetch();
  }, []);

  const siteName = welcomeSettings?.site_title || welcomeSettings?.admin_title || 'NextDigiHome';

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-40 pb-28 md:pt-52 md:pb-36 overflow-hidden">
        {/* Single ambient glow — not a rainbow */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#00d4aa]/6 to-transparent pointer-events-none" />
        <div className="absolute top-32 right-0 w-[600px] h-[400px] bg-[#00d4aa]/4 blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-8">
              <span className="w-6 h-px bg-[#00d4aa]" />
              Technology & Digital Agency — Bangladesh
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-8">
              We Build, Launch,<br />
              <span className="text-[#00d4aa]">Automate</span> &amp; Grow<br />
              Your Business.
            </h1>

            {/* Sub-copy */}
            <p className="text-lg text-[#888] leading-relaxed max-w-2xl mb-10">
              NextDigiHome is a full-spectrum technology company. We engineer custom software, deploy AI automation, run performance marketing, operate proprietary SaaS products — and sell verified digital assets through our store.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00d4aa] text-black font-bold text-sm hover:bg-[#00e2b6] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(0,212,170,0.2)]"
              >
                Start a Project
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/10 text-white font-semibold text-sm hover:border-white/25 hover:bg-white/4 transition-all"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-20 pt-10 border-t border-white/6 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl">
            {[
              { val: '150+', label: 'Projects Delivered' },
              { val: '8+', label: 'Years Combined Exp.' },
              { val: '5', label: 'Service Divisions' },
              { val: '50+', label: 'Active Clients' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-white">{s.val}</div>
                <div className="text-xs text-[#555] mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────── */}
      <section id="services" className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-4">What We Do</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
                Four Divisions.<br />One Ecosystem.
              </h2>
              <p className="text-sm text-[#666] leading-relaxed mb-8">
                Every capability you need to run, grow, and automate a modern business — without managing five vendors.
              </p>
              <Link href="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d4aa] hover:gap-3 transition-all">
                View All Services <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  num: '01',
                  title: 'BUILD',
                  subtitle: 'NextDigi Solutions',
                  desc: 'High-performance web platforms, headless e-commerce, mobile apps, custom ERPs and multi-tenant SaaS products.',
                  href: '/solutions',
                },
                {
                  num: '02',
                  title: 'AUTOMATE',
                  subtitle: 'NextDigi AI',
                  desc: 'Autonomous AI agents, bilingual chatbots, document pipelines, and zero-touch workflow automation.',
                  href: '/ai',
                },
                {
                  num: '03',
                  title: 'GROW',
                  subtitle: 'NextDigi Growth',
                  desc: 'Meta & Google ads with server-side CAPI tracking, SEO, social media, and attribution analytics.',
                  href: '/growth',
                },
                {
                  num: '04',
                  title: 'PRODUCTS',
                  subtitle: 'NextDigi Labs & Store',
                  desc: 'Proprietary SaaS platforms plus 100+ verified digital assets, source codes and templates.',
                  href: '/store',
                },
              ].map((p) => (
                <Link
                  key={p.num}
                  href={p.href}
                  className="group p-7 rounded-2xl bg-[#111] border border-white/5 hover:border-[#00d4aa]/30 hover:bg-[#0f1a17] transition-all duration-300"
                >
                  <div className="text-4xl font-black text-white/8 mb-4 group-hover:text-[#00d4aa]/20 transition-colors">{p.num}</div>
                  <div className="text-xs font-mono font-bold text-[#00d4aa] uppercase tracking-widest mb-1">{p.title}</div>
                  <h3 className="text-base font-bold text-white mb-3">{p.subtitle}</h3>
                  <p className="text-sm text-[#666] leading-relaxed">{p.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#444] group-hover:text-[#00d4aa] transition-colors">
                    Learn more <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS / ENGINEERING ─────────────────────── */}
      <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-3">Engineering & Development</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Custom Software & Web Platforms</h2>
            </div>
            <Link href="/solutions" className="mt-5 md:mt-0 text-sm font-semibold text-[#555] hover:text-white transition inline-flex items-center gap-1.5">
              All Solutions <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'web-development', title: 'Web Development', sub: 'Next.js & React', icon: GlobeAltIcon },
              { id: 'ecommerce', title: 'E-commerce', sub: 'bKash, Nagad, Stripe', icon: ShoppingBagIcon },
              { id: 'mobile-app', title: 'Mobile Apps', sub: 'Flutter iOS & Android', icon: DevicePhoneMobileIcon },
              { id: 'custom-software', title: 'Enterprise ERP', sub: 'Custom Business Systems', icon: CommandLineIcon },
              { id: 'saas-development', title: 'SaaS Platforms', sub: 'Multi-tenant Cloud', icon: CpuChipIcon },
              { id: 'api-integrations', title: 'API & Integrations', sub: 'CRM, Payment, Courier', icon: ServerIcon },
              { id: 'hosting-maintenance', title: 'Cloud Hosting', sub: 'DevOps & Monitoring', icon: WrenchScrewdriverIcon },
              { id: 'custom-software', title: 'Security Audits', sub: 'Hardening & Compliance', icon: ShieldCheckIcon },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  key={i}
                  href={`/solutions/${s.id}`}
                  className="group p-5 rounded-2xl bg-[#111] border border-white/5 hover:border-white/12 hover:bg-[#161616] transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/4 border border-white/5 flex items-center justify-center text-[#00d4aa] mb-4 group-hover:bg-[#00d4aa]/10 transition-colors">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{s.title}</div>
                  <div className="text-xs text-[#555]">{s.sub}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI & AUTOMATION ──────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-4">AI & Automation</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
                Autonomous AI Agents &amp; Intelligent Workflows
              </h2>
              <p className="text-[#666] text-sm leading-relaxed mb-8">
                Eliminate manual data entry, slow customer response times, and repetitive back-office tasks. We engineer deterministic AI agents and automated pipelines that operate 24/7.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/ai" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00d4aa] text-black font-bold text-sm hover:bg-[#00e2b6] transition-all">
                  Explore AI Capabilities <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link href="/contact?service=AI" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/8 text-white font-semibold text-sm hover:border-white/20 transition-all">
                  Get a Consultation
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Autonomous AI Agents', desc: 'RAG-powered agents that query private data and execute tools.', icon: CpuChipIcon, href: '/ai/ai-agents' },
                { title: 'Bilingual Chatbots', desc: 'WhatsApp and web bots fluent in Bengali & English.', icon: ChatBubbleBottomCenterTextIcon, href: '/ai/chatbots' },
                { title: 'AI Support Triage', desc: 'Auto-classify and draft replies for customer tickets.', icon: LifebuoyIcon, href: '/ai/ai-support' },
                { title: 'Zero-Touch Workflows', desc: 'n8n pipelines connecting CRM, billing, and alerts.', icon: ArrowsRightLeftIcon, href: '/ai/automation' },
              ].map((ai, i) => {
                const Icon = ai.icon;
                return (
                  <Link key={i} href={ai.href} className="group p-5 rounded-2xl bg-[#111] border border-white/5 hover:border-white/12 hover:bg-[#161616] transition-all">
                    <div className="w-9 h-9 rounded-xl bg-white/4 border border-white/5 flex items-center justify-center text-[#00d4aa] mb-4 group-hover:bg-[#00d4aa]/10 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{ai.title}</h3>
                    <p className="text-xs text-[#555] leading-relaxed">{ai.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── GROWTH MARKETING ─────────────────────────────── */}
      <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-3">Growth Marketing</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Predictable Customer Acquisition</h2>
            </div>
            <Link href="/growth" className="mt-5 md:mt-0 text-sm font-semibold text-[#555] hover:text-white transition inline-flex items-center gap-1.5">
              Growth Strategies <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { title: 'Meta Ads', sub: 'Facebook & Instagram Media Buying', desc: 'Creative testing, audience segmentation, and server-side Conversions API (CAPI) to bypass tracking loss.', icon: MegaphoneIcon, href: '/growth/meta-ads' },
              { title: 'Google Ads', sub: 'Search, YouTube & Performance Max', desc: 'High-intent keyword targeting, negative list hygiene, and value-based smart bidding strategies.', icon: CursorArrowRaysIcon, href: '/growth/google-ads' },
              { title: 'SEO & Technical Authority', sub: 'Compounding Organic Traffic', desc: 'Code-level technical SEO, schema markup, topic clusters, and Core Web Vitals optimisation.', icon: MagnifyingGlassIcon, href: '/growth/seo' },
            ].map((g, i) => {
              const Icon = g.icon;
              return (
                <Link key={i} href={g.href} className="group p-7 rounded-2xl bg-[#111] border border-white/5 hover:border-white/12 hover:bg-[#141414] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/5 flex items-center justify-center text-[#00d4aa] mb-5 group-hover:bg-[#00d4aa]/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-[#555] mb-1">{g.sub}</div>
                  <h3 className="text-base font-bold text-white mb-3">{g.title}</h3>
                  <p className="text-sm text-[#555] leading-relaxed">{g.desc}</p>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#111] border border-white/5 text-sm text-[#555]">
            <ShieldCheckIcon className="w-5 h-5 text-[#00d4aa] shrink-0" />
            <span><strong className="text-white font-semibold">Our Growth Standard:</strong> Zero fraudulent ROAS guarantees. Disciplined experimentation, clean attribution, and high-converting landing pages only.</span>
          </div>
        </div>
      </section>

      {/* ── SAAS PRODUCTS / LABS ─────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-3">NextDigi Labs</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Proprietary SaaS Platforms</h2>
              <p className="text-sm text-[#555] mt-3 max-w-lg">We build and operate our own SaaS products to solve real industry problems — and eat our own cooking first.</p>
            </div>
            <Link href="/labs" className="mt-5 md:mt-0 text-sm font-semibold text-[#555] hover:text-white transition inline-flex items-center gap-1.5">
              All Products <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'NextDigi Commerce',
                tagline: 'Headless Multi-Channel E-Commerce Engine',
                desc: 'Native bKash/Nagad payment routing, automatic courier dispatch (Pathao, Steadfast, RedX), and multi-warehouse inventory sync.',
                status: 'Live',
                features: ['Instant Checkout', 'Courier Auto-Sync', 'Inventory Ledger'],
                href: '/labs/commerce',
                ext: 'https://commerce.nextdigihome.com',
                icon: ShoppingBagIcon,
              },
              {
                name: 'Garibondhu360',
                tagline: 'Automotive Workshop & Fleet Management SaaS',
                desc: 'Cloud ERP for vehicle repair workshops — digital job cards, barcode spare parts, and automated customer SMS status updates.',
                status: 'Live',
                features: ['Digital Job Cards', 'Parts Barcodes', 'SMS Reminders'],
                href: '/labs/garibondhu360',
                ext: 'https://garibondhu360.nextdigihome.com',
                icon: WrenchScrewdriverIcon,
              },
              {
                name: 'NextDigi Social',
                tagline: 'Multi-Channel Post Scheduler & Unified DM Inbox',
                desc: 'Manage Facebook, Instagram, LinkedIn, and TikTok from one dashboard with AI caption generation and team approvals.',
                status: 'Beta',
                features: ['Omnichannel Scheduler', 'Unified DM Inbox', 'AI Copy'],
                href: '/labs/social',
                ext: 'https://social.nextdigihome.com',
                icon: ShareIcon,
              },
              {
                name: 'NextDigi Automate',
                tagline: 'Visual Low-Code Workflow Automation Engine',
                desc: 'Connect webhooks, databases, CRMs, and alerts into automated pipelines with a visual node canvas.',
                status: 'Soon',
                features: ['Visual Flow Builder', 'Pre-Built Nodes', 'Fault-Tolerant Retries'],
                href: '/labs/automate',
                ext: 'https://automate.nextdigihome.com',
                icon: BoltIcon,
              },
            ].map((prod) => {
              const Icon = prod.icon;
              return (
                <div key={prod.name} className="p-7 rounded-2xl bg-[#111] border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/8 border border-[#00d4aa]/15 flex items-center justify-center text-[#00d4aa]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${prod.status === 'Live' ? 'bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20' : prod.status === 'Beta' ? 'bg-white/5 text-[#888] border border-white/8' : 'bg-white/5 text-[#555] border border-white/5'}`}>
                        {prod.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{prod.name}</h3>
                    <p className="text-xs text-[#00d4aa] font-semibold mb-3">{prod.tagline}</p>
                    <p className="text-sm text-[#555] leading-relaxed mb-5">{prod.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {prod.features.map((f) => (
                        <span key={f} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white/4 border border-white/5 text-[#888]">
                          <CheckCircleIcon className="w-3 h-3 text-[#00d4aa]" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <Link href={prod.href} className="flex-1 text-center py-2.5 rounded-xl bg-white/4 border border-white/5 text-xs font-semibold text-white hover:bg-white/8 hover:border-white/10 transition-all">
                      Platform Details
                    </Link>
                    <a href={prod.ext} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/4 border border-white/5 text-[#555] hover:text-white transition-all" title="Visit platform">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DIGITAL STORE CTA ────────────────────────────── */}
      <section className="py-20 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl border border-[#00d4aa]/20 bg-[#0d1a16] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-3">NextDigi Store</p>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                100+ Verified Digital Products &amp; Source Codes
              </h2>
              <p className="text-sm text-[#666] max-w-xl">
                Skip weeks of development. Download production-ready Next.js storefronts, Flutter mobile apps, SaaS admin dashboards, AI automation kits, UI component libraries, and more.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {['Source Code', 'Flutter Apps', 'SaaS Templates', 'AI Kits', 'UI Libraries', 'Automation Scripts'].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-lg border border-white/8 text-[#666] bg-white/2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col items-center gap-3">
              <Link
                href="/store"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00d4aa] text-black font-bold text-sm hover:bg-[#00e2b6] transition-all whitespace-nowrap shadow-[0_0_30px_rgba(0,212,170,0.15)]"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Browse Store
              </Link>
              <Link
                href="/products"
                className="text-xs font-semibold text-[#555] hover:text-white transition whitespace-nowrap"
              >
                View all products →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ──────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">How We Work</h2>
            <p className="text-sm text-[#555] leading-relaxed">
              A disciplined, milestone-driven process taking projects from architecture to scalable market operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Discover & Architect', desc: 'Requirements scoping, system architecture, database modeling, and milestone scheduling.' },
              { step: '02', title: 'Build & Engineer', desc: 'Sprint-based agile engineering with TypeScript, unit testing, and weekly demo builds.' },
              { step: '03', title: 'Automate & Integrate', desc: 'Connect payment gateways, CRMs, courier APIs, and AI agents for zero-touch workflows.' },
              { step: '04', title: 'Launch & Scale', desc: 'Production deployment on high-availability cloud with attribution tracking and growth scaling.' },
            ].map((m) => (
              <div key={m.step} className="p-7 rounded-2xl bg-[#111] border border-white/5 hover:border-white/10 transition-all">
                <div className="text-4xl font-black text-white/6 mb-5">{m.step}</div>
                <h3 className="text-sm font-bold text-white mb-2.5">{m.title}</h3>
                <p className="text-xs text-[#555] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NEXTDIGIHOME ─────────────────────────────── */}
      <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-3">Why Us</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Why Forward-Thinking Businesses Choose {siteName}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: '8+ Years Combined Engineering', desc: 'Experienced full-stack engineers with extensive production background in high-throughput web applications and cloud infrastructure.', icon: CommandLineIcon },
              { title: '100% Code & IP Ownership', desc: 'You own all intellectual property, source repos, documentation, and cloud credentials upon project completion. Zero lock-in.', icon: ShieldCheckIcon },
              { title: 'Battle-Tested in Our Own Labs', desc: 'We test architectures on our own SaaS products first. What we deploy for you has already processed thousands of live transactions.', icon: BeakerIcon },
              { title: 'Unified Technology Ecosystem', desc: 'No need to manage 5 disparate vendors. Solutions, AI automation, growth marketing, and digital assets — one roof.', icon: SparklesIcon },
              { title: 'SLA-Backed Support & Monitoring', desc: '24/7 server monitoring, automated daily backups, and rapid incident response to guarantee production uptime.', icon: ClockIcon },
              { title: 'Transparent Milestone Billing', desc: 'Clear scope, transparent pricing, and milestone-tied deliverables. Zero hidden surprises or scope creep.', icon: CheckCircleIcon },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="p-7 rounded-2xl bg-[#111] border border-white/5 hover:border-white/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/8 border border-[#00d4aa]/12 flex items-center justify-center text-[#00d4aa] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2.5">{p.title}</h3>
                  <p className="text-xs text-[#555] leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-3">Client Perspectives</p>
            <h2 className="text-3xl font-black text-white">Engineered for Real Impact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                quote: "NextDigiHome completely modernized our e-commerce platform. Moving to their headless Next.js architecture with bKash and courier auto-sync cut our checkout drops dramatically.",
                author: "Tariqul Islam",
                role: "Operations Director, Retail Commerce"
              },
              {
                quote: "The automated WhatsApp chatbot and ticket triaging they built handles over 60% of our daily customer inquiries in both Bangla and English without human intervention.",
                author: "Sabrina Rahman",
                role: "Customer Experience Lead"
              },
              {
                quote: "Unlike agencies that make wild ROAS guarantees, the NextDigi Growth team implemented server-side CAPI tracking and clean attribution that gave us reliable, real metrics.",
                author: "Farhan Ahmed",
                role: "Founder, D2C Apparel Brand"
              }
            ].map((t, i) => (
              <div key={i} className="p-7 rounded-2xl bg-[#111] border border-white/5 flex flex-col justify-between">
                <p className="text-sm text-[#888] leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="text-sm font-bold text-white">{t.author}</div>
                  <div className="text-xs text-[#555] mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-[#00d4aa] uppercase mb-5">Ready to Start?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            Have a Business Idea<br />or an Existing Problem?
          </h2>
          <p className="text-[#555] text-base leading-relaxed max-w-xl mx-auto mb-10">
            Book a free discovery call. We will assess your requirements, propose a technology strategy, and deliver a clear scope with a transparent quote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00d4aa] text-black font-bold text-sm hover:bg-[#00e2b6] transition-all hover:scale-[1.02] shadow-[0_0_40px_rgba(0,212,170,0.2)]"
            >
              Start a Project
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/8 text-white font-semibold text-sm hover:border-white/20 transition-all"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              Browse Digital Store
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
