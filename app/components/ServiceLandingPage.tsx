'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TrackedCTA from './TrackedCTA';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  DevicePhoneMobileIcon,
  CommandLineIcon,
  ServerIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowsRightLeftIcon,
  MegaphoneIcon,
  CursorArrowRaysIcon,
  MagnifyingGlassIcon,
  PresentationChartLineIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  BuildingOffice2Icon,
  CheckIcon,
} from '@heroicons/react/24/outline';

export interface ProblemItem {
  title: string;
  desc: string;
}

export interface CapabilityItem {
  title: string;
  desc: string;
}

export interface UseCaseItem {
  title: string;
  category: string;
  desc: string;
}

export interface AudienceItem {
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface CrossSellItem {
  title: string;
  division: string;
  href: string;
  desc: string;
}

export interface LiveProductItem {
  title: string;
  type: string;
  url: string;
  desc: string;
  badge?: string;
}

export interface ServiceLandingPageData {
  slug: string;
  division: string;
  divisionPath: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  contactServiceParam: string;
  accent: string;
  heroVisualType?: 'dashboard' | 'ecommerce' | 'saas' | 'ai' | 'ads' | 'analytics';
  heroStats?: { label: string; value: string }[];
  problems: {
    headline: string;
    items: ProblemItem[];
  };
  solution: {
    headline: string;
    description: string;
    pillars: { title: string; desc: string }[];
  };
  capabilities: CapabilityItem[];
  deliverables: string[];
  audience: AudienceItem[];
  useCases: UseCaseItem[];
  techStack: string[];
  liveProduct?: LiveProductItem;
  faqs: FAQItem[];
  crossSell: CrossSellItem[];
}

const PROCESS_STEPS = [
  { step: '01', title: 'Discover', desc: 'Requirements analysis, technical feasibility scoping, and architectural mapping.' },
  { step: '02', title: 'Plan', desc: 'Milestone roadmaps, database schema modeling, and sprint velocity definition.' },
  { step: '03', title: 'Design', desc: 'High-fidelity UI/UX design, accessible component tokens, and interactive prototypes.' },
  { step: '04', title: 'Build', desc: 'Modular TypeScript development with strict test coverage and clean API architecture.' },
  { step: '05', title: 'Test', desc: 'Automated unit tests, end-to-end user journey verification, and security audits.' },
  { step: '06', title: 'Deploy', desc: 'Zero-downtime CI/CD deployment, global CDN edge caching, and SSL hardening.' },
  { step: '07', title: 'Improve', desc: 'Continuous performance profiling, conversion attribution analysis, and scaling.' },
];

export default function ServiceLandingPage({ data }: { data: ServiceLandingPageData }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const contactUrl = `/contact?service=${encodeURIComponent(data.contactServiceParam)}`;

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#00d4aa] selection:text-black pt-28 pb-20 relative overflow-hidden font-sans">
      {/* Background glow meshes */}
      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[150px] pointer-events-none rounded-full opacity-15"
        style={{ backgroundColor: data.accent }}
      />
      <div className="absolute top-96 right-1/4 w-[450px] h-[300px] bg-[#8b5cf6]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href={data.divisionPath} className="hover:text-[#00d4aa] transition">{data.division}</Link>
          <span>/</span>
          <span className="text-white font-medium">{data.eyebrow}</span>
        </nav>

        {/* ================================================================ */}
        {/* 1. HERO SECTION                                                  */}
        {/* ================================================================ */}
        <section className="mb-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111622]/90 to-[#0c0f17]/90 backdrop-blur-xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Hero Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.accent }} />
                  <span className="text-gray-200">{data.division}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-[#00d4aa] font-bold">{data.eyebrow}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
                  {data.title}
                </h1>

                <p className="text-lg sm:text-xl font-medium text-gray-300 leading-snug mb-4">
                  {data.tagline}
                </p>

                <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mb-8">
                  {data.description}
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
                  <TrackedCTA
                    href={contactUrl}
                    ctaName="start_project"
                    ctaLocation="hero"
                    service={data.contactServiceParam}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-black transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    style={{ backgroundColor: data.accent }}
                  >
                    <RocketLaunchIcon className="w-4 h-4" />
                    <span>Start Your Project</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </TrackedCTA>

                  <Link
                    href="/case-studies"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <span>View Our Work</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-400 w-full">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa] shrink-0" />
                    <span>100% IP Code Transfer</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ClockIcon className="w-4 h-4 text-[#38bdf8] shrink-0" />
                    <span>Milestone-Based Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                    <CheckCircleIcon className="w-4 h-4 text-[#8b5cf6] shrink-0" />
                    <span>Dedicated Architecture SLA</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Column: Interactive Tech & Stats Card */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#090d16]/90 border border-white/10 shadow-xl space-y-6 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-gray-400 ml-2">nextdigi-core.ts</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300">
                      v2.4
                    </span>
                  </div>

                  {/* Core Metrics Grid */}
                  {data.heroStats && data.heroStats.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {data.heroStats.map((stat, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                          <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                          <div className="text-xl font-bold text-white mt-1" style={{ color: data.accent }}>
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Preview */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                      Core Technology Engine
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {data.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/50 border border-white/10 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fast Conversion Hook */}
                  <div className="p-4 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 text-xs text-gray-300 space-y-1">
                    <div className="font-bold text-[#00d4aa] flex items-center gap-1.5">
                      <SparklesIcon className="w-4 h-4" />
                      Direct Discovery Scoping
                    </div>
                    <p className="text-[11px] text-gray-300">
                      Submit your requirements to receive an architectural scope and milestone roadmap from our engineering team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 2. PROBLEM SECTION                                               */}
        {/* ================================================================ */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-rose-400 uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              THE COMMERCIAL BOTTLENECK
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {data.problems.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.problems.items.map((prob, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/40 border border-rose-500/20 hover:border-rose-500/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{prob.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. SOLUTION SECTION                                              */}
        {/* ================================================================ */}
        <section className="mb-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0e1422] to-[#0a0d16] border border-white/10 relative overflow-hidden">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <CheckCircleIcon className="w-4 h-4 text-[#00d4aa]" />
                THE NEXTDIGIHOME SOLUTION
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                {data.solution.headline}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {data.solution.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.solution.pillars.map((pillar, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00d4aa]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 text-[#00d4aa] flex items-center justify-center mb-4">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Mid-Page Quick CTA */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-300 text-center sm:text-left">
                Need a customized solution architecture tailored to your business rules?
              </div>
              <TrackedCTA
                href={contactUrl}
                ctaName="discuss_requirements"
                ctaLocation="mid_page"
                service={data.contactServiceParam}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-black transition-all hover:scale-105"
                style={{ backgroundColor: data.accent }}
              >
                Discuss Your Requirements →
              </TrackedCTA>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. CAPABILITIES & DELIVERABLES                                   */}
        {/* ================================================================ */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Capabilities */}
            <div className="lg:col-span-7">
              <div className="mb-8">
                <div className="text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
                  CORE SPECIFICATIONS
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Engineered Capabilities
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0c1017] border border-white/8 hover:border-white/20 transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-[#00d4aa] transition-colors mb-2">
                      {cap.title}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-[#00d4aa]" />
                    What We Deliver
                  </h3>
                  <p className="text-xs text-gray-400 mb-6">
                    Every project includes complete production-grade assets and documentation.
                  </p>

                  <ul className="space-y-3.5">
                    {data.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircleIcon className="w-4 h-4 text-[#00d4aa] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <TrackedCTA
                    href={contactUrl}
                    ctaName="request_estimate"
                    ctaLocation="mid_page"
                    service={data.contactServiceParam}
                    className="w-full py-3 rounded-xl text-center text-xs font-bold text-black block transition-all hover:opacity-95"
                    style={{ backgroundColor: data.accent }}
                  >
                    Request Project Estimate
                  </TrackedCTA>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 5. WHO IT'S FOR & PRACTICAL USE CASES                            */}
        {/* ================================================================ */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-bold tracking-widest text-[#38bdf8] uppercase mb-2">
              TARGET AUDIENCE &amp; FIT
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Who We Engineer This For
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Designed for organizations that require disciplined engineering rather than fragile templates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {data.audience.map((aud, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#0e131d] border border-white/8 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 text-[#38bdf8] flex items-center justify-center font-bold text-xs">
                  <UserGroupIcon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">{aud.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>

          {/* Practical Use Cases */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-[#00d4aa]" />
              Practical Commercial Use Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.useCases.map((uc, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00d4aa]/10 text-[#00d4aa] inline-block">
                    {uc.category}
                  </span>
                  <div className="text-sm font-bold text-white">{uc.title}</div>
                  <p className="text-xs text-gray-400 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. HOW WE WORK (7-STAGE PROCESS)                                 */}
        {/* ================================================================ */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
              EXECUTION DISCIPLINE
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              How We Work
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              A transparent, milestone-driven development process from initial discovery to continuous scaling.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0d111a] border border-white/8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#00d4aa] block mb-2">{step.step}</span>
                  <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 text-xs text-gray-400">
            Learn more about our company standards on our{' '}
            <Link href="/about" className="text-[#00d4aa] underline hover:text-white">
              About &amp; Trust page
            </Link>
            .
          </div>
        </section>

        {/* ================================================================ */}
        {/* 7. LIVE PRODUCTS / EVIDENCE & CASE STUDIES                       */}
        {/* ================================================================ */}
        <section className="mb-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0e1422] to-slate-900 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase">
                  <BuildingOffice2Icon className="w-4 h-4" />
                  EVIDENCE-BASED ENGINEERING
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Real Products Engineered &amp; Operated by NextDigiHome
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  We don&apos;t just build client prototypes — we design, ship, and operate our own commercial SaaS and e-commerce platforms. That real-world operational experience protects your investment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">NextDigi Commerce</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00d4aa]/20 text-[#00d4aa]">
                        E-commerce
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Cloud commerce engine with multi-gateway payment processing, live Pathao courier sync, and automated billing.
                    </p>
                    <a
                      href="https://commerce.nextdigihome.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#00d4aa] hover:underline inline-flex items-center gap-1 pt-1"
                    >
                      View Live Product →
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Garibondhu360</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8b5cf6]/20 text-[#8b5cf6]">
                        Automotive ERP
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      SaaS platform for workshops with digital job-cards, barcode inventory, and automated customer SMS status.
                    </p>
                    <a
                      href="https://garibondhu360.nextdigihome.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-[#8b5cf6] hover:underline inline-flex items-center gap-1 pt-1"
                    >
                      View Live Product →
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 text-center lg:text-right space-y-3">
                <Link
                  href="/case-studies"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors inline-block border border-white/10"
                >
                  Explore All Case Studies →
                </Link>
                <div className="text-[11px] text-gray-500">
                  Read verified case studies &amp; architectural walkthroughs
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 8. WHY NEXTDIGIHOME                                              */}
        {/* ================================================================ */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
              THE NEXTDIGI ADVANTAGE
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Why Businesses Choose NextDigiHome
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0c1017] border border-white/8 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 text-[#00d4aa] flex items-center justify-center font-bold">
                <CommandLineIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Full Ecosystem Under One Roof</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Technology solutions, AI automation, and digital growth marketing collaborate as a single coordinated engineering unit, eliminating vendor finger-pointing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1017] border border-white/8 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center font-bold">
                <ShieldCheckIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">100% Intellectual Property Ownership</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                You receive full source code, database architectures, and deployment keys. No proprietary lock-in, recurring developer licensing, or hidden hostage fees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1017] border border-white/8 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center font-bold">
                <CpuChipIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Practical, Measurable Automation</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We engineer deterministic AI workflows and conversion tracking pipelines focused on tangible revenue, conversion rates, and operational overhead reduction.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 9. FAQ SECTION (ACCORDION)                                       */}
        {/* ================================================================ */}
        <section className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Questions &amp; Answers
            </h2>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#0e131d] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-[#00d4aa] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#00d4aa]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================ */}
        {/* 10. CONTEXTUAL CROSS-SELL                                        */}
        {/* ================================================================ */}
        {data.crossSell && data.crossSell.length > 0 && (
          <section className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
                CONNECTED SERVICES
              </div>
              <h3 className="text-lg font-bold text-white">
                Complementary Solutions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.crossSell.map((cs, idx) => (
                <Link
                  key={idx}
                  href={cs.href}
                  className="p-5 rounded-2xl bg-[#0c1017] border border-white/8 hover:border-[#00d4aa]/40 transition-all group"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    {cs.division}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#00d4aa] transition-colors mb-1.5 flex items-center justify-between">
                    <span>{cs.title}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{cs.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================ */}
        {/* 11. FINAL QUALIFICATION CONVERSION CTA                           */}
        {/* ================================================================ */}
        <section className="rounded-3xl bg-gradient-to-b from-[#101726] via-[#090d16] to-[#090d16] border border-white/10 p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-xs font-bold text-[#00d4aa]">
              <SparklesIcon className="w-4 h-4" />
              <span>LET&apos;S WORK TOGETHER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Build?
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
              Tell us what you need and we&apos;ll help define the right next step. Share your project requirements for an architectural consultation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <TrackedCTA
                href={contactUrl}
                ctaName="start_project"
                ctaLocation="final_cta"
                service={data.contactServiceParam}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-extrabold text-sm text-black transition-all shadow-[0_0_35px_rgba(0,212,170,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: data.accent }}
              >
                <span>Start Your Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </TrackedCTA>

              <TrackedCTA
                href={contactUrl}
                ctaName="talk_to_us"
                ctaLocation="final_cta"
                service={data.contactServiceParam}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
              >
                <span>Talk to Us</span>
              </TrackedCTA>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Mobile Conversion Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#0b0e17]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-between gap-3">
        <div className="text-xs truncate">
          <span className="font-bold text-white block truncate">{data.eyebrow}</span>
          <span className="text-[10px] text-gray-400">Direct Engineering Inquiry</span>
        </div>
        <TrackedCTA
          href={contactUrl}
          ctaName="start_project"
          ctaLocation="sticky_nav"
          service={data.contactServiceParam}
          className="px-4 py-2 rounded-lg font-bold text-xs text-black shrink-0 flex items-center gap-1.5 shadow-md"
          style={{ backgroundColor: data.accent }}
        >
          <span>Start Project</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </TrackedCTA>
      </div>
    </div>
  );
}
