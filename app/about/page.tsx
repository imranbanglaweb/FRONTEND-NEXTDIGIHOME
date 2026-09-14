'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  BeakerIcon,
  ChartBarIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
  BoltIcon,
  CommandLineIcon,
  ServerIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  ChevronDownIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  BuildingOffice2Icon,
  TruckIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

export default function AboutPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string>('solutions');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // 04. One Ecosystem Divisions
  const divisions = [
    {
      id: 'solutions',
      name: 'NextDigi Solutions',
      role: 'BUILD',
      tagline: 'Technology & Software Services',
      description:
        'Custom web applications, mobile platforms, API backends, and full-stack software tailored to exact business requirements with 100% IP ownership.',
      icon: CodeBracketIcon,
      accent: '#00d4aa',
      href: '/solutions',
      highlights: ['Custom Web Apps', 'Mobile Engineering', 'REST APIs', 'Cloud DevOps'],
    },
    {
      id: 'ai',
      name: 'NextDigi AI',
      role: 'AUTOMATE',
      tagline: 'AI & Automation Services',
      description:
        'Deterministic AI agents, smart customer support chatbots, and intelligent webhook automations that streamline repetitive business operations.',
      icon: CpuChipIcon,
      accent: '#ec4899',
      href: '/ai',
      highlights: ['AI Agents', 'Chatbots', 'RPA Pipelines', 'LLM Integrations'],
    },
    {
      id: 'growth',
      name: 'NextDigi Growth',
      role: 'MARKET',
      tagline: 'Digital Marketing & Growth Services',
      description:
        'Data-informed Meta Ads, Google Ads media buying, server-side Conversion API (CAPI) tracking, and technical search engine optimization.',
      icon: ChartBarIcon,
      accent: '#06b6d4',
      href: '/growth',
      highlights: ['Meta & Google Ads', 'Server-Side CAPI', 'Technical SEO', 'Conversion Funnels'],
    },
    {
      id: 'labs',
      name: 'NextDigi Labs',
      role: 'PRODUCTIZE',
      tagline: 'SaaS / Product Division',
      description:
        'Our internal incubator designing, engineering, and launching proprietary SaaS products and business infrastructure platforms.',
      icon: BeakerIcon,
      accent: '#f59e0b',
      href: '/labs',
      highlights: ['NextDigi Commerce', 'Garibondhu360', 'SaaS Engines', 'Business Platforms'],
    },
    {
      id: 'store',
      name: 'NextDigi Store',
      role: 'RESOURCES',
      tagline: 'Digital Products & Resources',
      description:
        'Verified production-ready software source codes, UI design kits, automation scripts, and digital business tools available for instant download.',
      icon: ShoppingBagIcon,
      accent: '#8b5cf6',
      href: '/store',
      highlights: ['Full-Stack Code', 'Mobile Templates', 'Developer Tools', 'Verified Assets'],
    },
  ];

  // 05. How We Think (Principles)
  const approaches = [
    {
      step: '01',
      title: 'BUSINESS FIRST',
      desc: 'Start with the business problem, not the technology. We understand business economics, user workflows, and operating goals before writing code.',
    },
    {
      step: '02',
      title: 'PRACTICAL TECHNOLOGY',
      desc: 'Choose technology based on requirements rather than trends. We prioritize stability, security, maintainability, and clean documentation.',
    },
    {
      step: '03',
      title: 'MEASURABLE EXECUTION',
      desc: 'Use analytics and feedback where measurable outcomes are possible. Tracking events, latency, and conversions guide iterative engineering.',
    },
    {
      step: '04',
      title: 'ITERATIVE DEVELOPMENT',
      desc: 'Build, test, learn, and improve. We release milestone-based deliverables that allow stakeholders to review progress in real-world contexts.',
    },
    {
      step: '05',
      title: 'LONG-TERM THINKING',
      desc: 'Design systems that can evolve as the business grows. We structure databases, APIs, and components for future extensibility.',
    },
  ];

  // 03. Why NextDigiHome (6 Cards)
  const whyChooseUs = [
    {
      num: '01',
      title: 'BUILD',
      desc: 'We develop websites, applications, SaaS platforms and custom software tailored to your specific commercial workflows.',
      icon: CommandLineIcon,
      accent: '#00d4aa',
    },
    {
      num: '02',
      title: 'AUTOMATE',
      desc: 'We use AI and automation to reduce repetitive workflows where it makes practical sense, saving operational hours.',
      icon: CpuChipIcon,
      accent: '#ec4899',
    },
    {
      num: '03',
      title: 'GROW',
      desc: 'We help businesses build digital presence, advertising, and measurable acquisition systems to connect with real buyers.',
      icon: ChartBarIcon,
      accent: '#06b6d4',
    },
    {
      num: '04',
      title: 'MEASURE',
      desc: 'We focus on analytics, conversion tracking, server-side data, and data-informed decisions rather than guesswork.',
      icon: BoltIcon,
      accent: '#f59e0b',
    },
    {
      num: '05',
      title: 'PRODUCTIZE',
      desc: 'We build reusable SaaS products and digital tools that create compounding and recurring business value over time.',
      icon: BeakerIcon,
      accent: '#8b5cf6',
    },
    {
      num: '06',
      title: 'SUPPORT',
      desc: 'We aim to maintain long-term relationships beyond initial implementation, providing continuous maintenance and upgrades.',
      icon: ShieldCheckIcon,
      accent: '#10b981',
    },
  ];

  // 10. Development Process (7 Steps)
  const processSteps = [
    { step: 'STEP 01', title: 'DISCOVERY', desc: 'Understand the business, requirements, target users, and existing systems.' },
    { step: 'STEP 02', title: 'STRATEGY', desc: 'Define technical architecture, data structures, milestone deliverables, and success criteria.' },
    { step: 'STEP 03', title: 'DESIGN', desc: 'Create user journeys, interface direction, responsive layouts, and interactive design tokens.' },
    { step: 'STEP 04', title: 'BUILD', desc: 'Develop the frontend, backend APIs, database schemas, and integration pipelines.' },
    { step: 'STEP 05', title: 'TEST', desc: 'Validate functionality, responsiveness, security posture, latency, and cross-browser reliability.' },
    { step: 'STEP 06', title: 'DEPLOY', desc: 'Launch the production system on scalable cloud servers with automated backups and monitoring.' },
    { step: 'STEP 07', title: 'IMPROVE', desc: 'Monitor telemetry, gather stakeholder feedback, and iteratively refine features as usage grows.' },
  ];

  // 12. Quality Principles (7 Items)
  const qualityPrinciples = [
    { num: '01', title: 'Clear Scope', desc: 'Precise requirement definitions before engineering commences.' },
    { num: '02', title: 'Maintainable Code', desc: 'Clean, modular, and readable codebases that internal or external teams can easily maintain.' },
    { num: '03', title: 'Responsive Experience', desc: 'Fast, ergonomic user experiences across mobile, tablet, and widescreen desktop devices.' },
    { num: '04', title: 'Security Awareness', desc: 'Sanitized inputs, token-based authentication, and protected database endpoints.' },
    { num: '05', title: 'Performance', desc: 'Optimized bundle sizes, server-rendered components, cached queries, and efficient assets.' },
    { num: '06', title: 'Scalable Architecture', desc: 'Decoupled services and normalized data structures that handle surging throughput.' },
    { num: '07', title: 'Transparent Communication', desc: 'Milestone tracking, honest status reporting, and direct developer communication.' },
  ];

  // 14. Technology Mindset
  const techStack = [
    { category: 'Frontend & UI', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3'] },
    { category: 'Backend & APIs', items: ['Laravel', 'PHP', 'Node.js', 'Express', 'RESTful APIs'] },
    { category: 'Databases & Storage', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
    { category: 'AI & Automation', items: ['OpenAI API', 'Anthropic Claude API', 'Google Gemini API', 'Python Automation'] },
    { category: 'Cloud & Infrastructure', items: ['Docker', 'Nginx', 'Linux VPS', 'Cloudflare CDN', 'Git CI/CD'] },
  ];

  // 16. Industries Served
  const industries = [
    { name: 'E-commerce & Retail', desc: 'Multi-vendor platforms, single-brand stores, catalog filtering, and payment gateway integrations.', icon: ShoppingBagIcon },
    { name: 'Transport & Operations', desc: 'Vehicle tracking, fleet scheduling, ticket booking, and automated trip logistics systems.', icon: TruckIcon },
    { name: 'Education & EdTech', desc: 'Course management portals, student dashboards, online exam engines, and resource delivery.', icon: AcademicCapIcon },
    { name: 'Professional Services', desc: 'Consulting agency websites, client portals, appointment scheduling, and lead acquisition.', icon: BuildingOffice2Icon },
    { name: 'Startups & SaaS Founders', desc: 'Minimum Viable Products (MVPs), multi-tenant SaaS architecture, and subscriber onboarding.', icon: RocketLaunchIcon },
    { name: 'Small & Medium Businesses', desc: 'Digital modernization, automated billing, internal admin dashboards, and operations management.', icon: WrenchScrewdriverIcon },
  ];

  // 18. FAQ (9 questions)
  const faqs = [
    {
      q: 'Who is NextDigiHome?',
      a: 'NextDigiHome is a technology-focused digital company helping businesses build, automate, market and grow through software development, AI automation, SaaS products, digital marketing systems, and digital product resources.',
    },
    {
      q: 'What services does NextDigiHome provide?',
      a: 'We provide end-to-end technology and growth services organized into five focused divisions: NextDigi Solutions (Custom Software & Web), NextDigi AI (AI & Automation), NextDigi Growth (Digital Marketing & Ads), NextDigi Labs (SaaS Products), and NextDigi Store (Digital Products & Resources).',
    },
    {
      q: 'Do you build custom software?',
      a: 'Yes. Through NextDigi Solutions, we develop custom web applications, mobile apps, enterprise admin portals, API backends, and bespoke software tailored to client specifications with 100% intellectual property ownership transfer.',
    },
    {
      q: 'Can you build SaaS products?',
      a: 'Yes. We architect scalable multi-tenant SaaS platforms featuring recurring billing integrations, role-based permission controls, secure APIs, and responsive frontends engineered with Next.js, Node.js, and Laravel.',
    },
    {
      q: 'Do you provide AI and automation services?',
      a: 'Yes. NextDigi AI builds deterministic AI agents, intelligent customer support chatbots, multi-agent reasoning workflows, and webhook-driven operational automations using modern LLM APIs.',
    },
    {
      q: 'Can you manage Meta and Google Ads?',
      a: 'Yes. NextDigi Growth manages data-backed Meta Ads, Google Search & Performance Max campaigns, server-side Conversion API (CAPI) setups, and technical SEO acquisition funnels.',
    },
    {
      q: 'Do you work with startups and small businesses?',
      a: 'Yes. We frequently partner with early-stage founders and growing businesses to design MVPs, streamline internal operations, build customer acquisition systems, and deploy scalable digital foundations.',
    },
    {
      q: 'Can you work with existing software?',
      a: 'Yes. We audit, refactor, integrate with, and upgrade existing codebases, databases, or legacy applications, ensuring clean migrations and improved system performance.',
    },
    {
      q: 'Can you provide ongoing support?',
      a: 'Yes. We maintain long-term technical relationships with our clients, providing milestone-driven enhancements, maintenance, infrastructure monitoring, and feature iteration post-launch.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#00d4aa] selection:text-black">
      {/* ==================================================================== */}
      {/* 01. HERO SECTION                                                     */}
      {/* ==================================================================== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/8">
        {/* Glow Accents */}
        <div className="absolute top-10 left-1/4 w-[600px] h-[350px] bg-[#00d4aa]/15 blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute top-48 right-1/4 w-[500px] h-[300px] bg-[#8b5cf6]/15 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#00d4aa] font-semibold">About NEXTDIGIHOME</span>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-bold tracking-wider text-[#00d4aa] uppercase mb-6 shadow-sm">
              <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
              <span>NEXTDIGIHOME &bull; MASTER TECHNOLOGY BRAND</span>
            </div>

            {/* Headline H1 */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              We Build{' '}
              <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                Digital Businesses.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
              NextDigiHome is a technology-focused digital company helping businesses build, automate, market and grow through software, AI, SaaS products, digital marketing and digital resources.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 flex items-center gap-2 text-sm md:text-base group"
              >
                <span>Start Your Project</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/case-studies"
                className="px-8 py-4 rounded-xl font-semibold text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm md:text-base"
              >
                Explore Our Work
              </Link>
            </div>

            {/* Ecosystem Pills */}
            <div className="mt-14 pt-10 border-t border-white/8 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-300">
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <CodeBracketIcon className="w-3.5 h-3.5 text-[#00d4aa]" />
                Software Development
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <CpuChipIcon className="w-3.5 h-3.5 text-[#ec4899]" />
                AI &amp; Automation
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <ChartBarIcon className="w-3.5 h-3.5 text-[#06b6d4]" />
                Digital Growth
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <BeakerIcon className="w-3.5 h-3.5 text-[#f59e0b]" />
                SaaS Products
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
                <ShoppingBagIcon className="w-3.5 h-3.5 text-[#8b5cf6]" />
                Digital Products
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 02. COMPANY STORY                                                    */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <span className="w-3 h-px bg-[#00d4aa]" />
                OUR STORY
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
                From Digital Products to a Complete Technology Ecosystem
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  NextDigiHome started around digital products and technology services. In working with businesses across diverse sectors, a consistent pattern emerged: companies rarely need just a static website, isolated software, or disjointed advertising campaigns.
                </p>
                <p>
                  They need a cohesive technology partner capable of designing the software architecture, automating operational workflows, building customer acquisition channels, and deploying reliable digital assets under one roof.
                </p>
                <p>
                  Today, NextDigiHome unites these capabilities into five dedicated divisions: <strong>NextDigi Solutions</strong> (software engineering), <strong>NextDigi AI</strong> (automation and intelligent agents), <strong>NextDigi Growth</strong> (performance marketing and data tracking), <strong>NextDigi Labs</strong> (proprietary SaaS platforms), and <strong>NextDigi Store</strong> (production codebases and digital tools).
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-[#0e131d] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4aa]/10 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircleIcon className="w-6 h-6 text-[#00d4aa]" />
                  What We Bring Together
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Software Engineering', desc: 'Modern web platforms, responsive mobile apps, and custom APIs.' },
                    { title: 'AI & Automation', desc: 'Deterministic LLM agents and multi-step webhook automations.' },
                    { title: 'Digital Growth', desc: 'Server-side CAPI tracking, Meta & Google media buying, and SEO.' },
                    { title: 'SaaS Platforms', desc: 'Proprietary cloud platforms built and maintained in-house.' },
                    { title: 'Digital Products', desc: 'Production-ready starter codebases, UI kits, and guides.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#00d4aa] mt-2 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-white">{item.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 03. WHY NEXTDIGIHOME                                                 */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-3 h-px bg-[#00d4aa]" />
              WHY NEXTDIGIHOME
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Why Businesses Choose a Technology-First Partner
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              We combine end-to-end engineering rigor with measurable marketing and long-term product thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-[#0e131d]/90 border border-white/8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 font-bold">{item.num}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00d4aa] transition">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 04. ONE ECOSYSTEM (VISUAL ARCHITECTURE)                              */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-3 h-px bg-[#00d4aa]" />
              UNIFIED CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              One Partner. Multiple Capabilities.
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              Clients access every digital capability under one master brand, eliminating the friction of coordinating multiple disjointed agencies.
            </p>
          </div>

          {/* Master Hub Diagram */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0e131d] border border-white/10 shadow-2xl mb-12">
            {/* Master Center Header */}
            <div className="text-center max-w-md mx-auto mb-10 pb-8 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-bold text-[#00d4aa] mb-2 uppercase">
                Master Brand
              </div>
              <h3 className="text-2xl font-black text-white">NEXTDIGIHOME</h3>
              <p className="text-xs text-gray-400 mt-1">
                Unified Technology &bull; Digital Growth &bull; Product Ecosystem
              </p>
            </div>

            {/* 5 Divisions Connected Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {divisions.map((d) => {
                const Icon = d.icon;
                return (
                  <Link
                    key={d.id}
                    href={d.href}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-105"
                        style={{ backgroundColor: `${d.accent}15`, color: d.accent }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: d.accent }}>
                        {d.role}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1 mb-2 group-hover:text-[#00d4aa] transition">
                        {d.name}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">{d.tagline}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center gap-1 text-[11px] font-semibold text-gray-300 group-hover:text-white transition">
                      <span>Explore</span>
                      <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 05. OUR APPROACH (HOW WE THINK)                                      */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-3 h-px bg-[#00d4aa]" />
              ENGINEERING PHILOSOPHY
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              How We Think
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              Our core principles ensure we deliver pragmatic, sustainable solutions instead of bloated or fragile experiments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approaches.map((app, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#0e131d]/90 border border-white/8 hover:border-[#00d4aa]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#00d4aa] block mb-3">{app.step}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{app.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 06. OUR SERVICES AT A GLANCE                                         */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
                <span className="w-3 h-px bg-[#00d4aa]" />
                SERVICES AT A GLANCE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Our Service Ecosystem
              </h2>
            </div>
            <Link
              href="/solutions"
              className="mt-4 sm:mt-0 text-xs font-bold text-[#00d4aa] hover:underline inline-flex items-center gap-1 self-start"
            >
              <span>Explore all solutions</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((div) => {
              const Icon = div.icon;
              return (
                <div
                  key={div.id}
                  className="p-8 rounded-2xl bg-[#0e131d] border border-white/8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${div.accent}15`, color: div.accent }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-300 uppercase">
                        {div.role}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{div.name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-5">{div.description}</p>

                    <div className="space-y-1.5 border-t border-white/5 pt-4 mb-6">
                      {div.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircleIcon className="w-4 h-4 text-[#00d4aa] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={div.href}
                    className="w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition"
                    style={{ backgroundColor: `${div.accent}20`, color: div.accent }}
                  >
                    <span>View {div.name}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 07. TECHNOLOGY MINDSET                                                */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-3 h-px bg-[#00d4aa]" />
              TECHNOLOGY MINDSET
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Built Around Technology
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              We engineer with proven, modern web technologies, robust APIs, fault-tolerant databases, and containerized cloud environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0e131d]/90 border border-white/8">
                <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
                  {stack.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-200"
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

      {/* ==================================================================== */}
      {/* 08. FOUNDER & TEAM LEADERSHIP                                        */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <UserGroupIcon className="w-4 h-4 text-[#00d4aa]" />
              THE PEOPLE BEHIND NEXTDIGIHOME
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Technology-Led, Founder-Driven Execution
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              An agile technology leadership team working across software engineering, operational execution, and digital growth.
            </p>
          </div>

          {/* Founder Spotlight Card */}
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#0e131d] border border-[#00d4aa]/20 shadow-2xl mb-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] p-1 shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-[#0c1017] flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-black text-white">IR</span>
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[11px] font-bold text-[#00d4aa] uppercase tracking-wider mb-2">
                  Founder &amp; Chief Executive Officer
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">Imran Rahman</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Visionary leader driving digital innovation and business growth. Guides software architecture, multi-tenant SaaS engineering, and AI automation strategies across the NextDigiHome ecosystem.
                </p>

                <div className="mt-5 pt-5 border-t border-white/5 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                    Software Architecture
                  </span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                    AI &amp; Automation
                  </span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                    SaaS Systems
                  </span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                    Strategic Growth
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Leadership & Contributors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8 flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 flex items-center justify-center text-[#8b5cf6] font-bold text-lg shrink-0">
                BA
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#8b5cf6] uppercase tracking-wider">Operations</span>
                <h4 className="text-base font-bold text-white">Bristy Akter</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Operations Manager. Directs client delivery timelines, sprint coordination, process optimization, and project management standards.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8 flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#00d4aa]/15 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa] font-bold text-lg shrink-0">
                IN
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#00d4aa] uppercase tracking-wider">Marketing</span>
                <h4 className="text-base font-bold text-white">Inaya</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Marketing Specialist. Coordinates digital marketing funnels, customer acquisition initiatives, and brand engagement strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 09. OUR DEVELOPMENT PROCESS                                          */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-3 h-px bg-[#00d4aa]" />
              LIFECYCLE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              From Idea to Launch
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              A structured 7-step engineering methodology that brings clarity, predictability, and velocity to every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-[#0e131d]/90 border border-white/8 flex flex-col justify-between ${
                  idx === 6 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#00d4aa] block mb-2">{step.step}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 10. CLIENT RELATIONSHIP & QUALITY PRINCIPLES                         */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <span className="w-3 h-px bg-[#00d4aa]" />
                PARTNERSHIP
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
                Built for Long-Term Relationships
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                A successful project is more than delivering code. We aim to understand the business, communicate clearly, and provide practical support as the system evolves.
              </p>
              <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <CheckCircleIcon className="w-4 h-4 text-[#00d4aa]" />
                  Direct Technical Transparency
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  No layers of account managers misinterpreting requirements. You work directly with experienced software engineers and digital strategists.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckBadgeIcon className="w-5 h-5 text-[#00d4aa]" />
                Our Quality Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qualityPrinciples.map((qp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0e131d] border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-[#00d4aa] font-bold">{qp.num}</span>
                      <h4 className="text-sm font-bold text-white">{qp.title}</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{qp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 11. TRUST THROUGH EVIDENCE & LIVE PRODUCTS                           */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
                <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
                PROVEN EXECUTION
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                See What We&apos;ve Built
              </h2>
              <p className="text-sm text-gray-400 mt-2 max-w-xl">
                Real software products and technology platforms actively deployed and serving users.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="mt-4 sm:mt-0 text-xs font-bold text-[#00d4aa] hover:underline inline-flex items-center gap-1 self-start"
            >
              <span>View portfolio &amp; case studies</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Live Product 1: NextDigi Commerce */}
            <div className="p-8 rounded-3xl bg-[#0e131d] border border-white/10 hover:border-[#00d4aa]/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[10px] font-bold text-[#00d4aa] uppercase tracking-wider">
                    Live SaaS Platform
                  </span>
                  <a
                    href="https://commerce.nextdigihome.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-[#00d4aa] transition mb-2">
                  NextDigi Commerce
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Turn-key eCommerce engine engineered with Next.js, Node.js, and automated inventory systems. Features multi-currency checkouts, automated customer invoices, and analytics dashboards.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono">commerce.nextdigihome.com</span>
                <a
                  href="https://commerce.nextdigihome.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition"
                >
                  Visit Platform
                </a>
              </div>
            </div>

            {/* Live Product 2: Garibondhu360 */}
            <div className="p-8 rounded-3xl bg-[#0e131d] border border-white/10 hover:border-[#38bdf8]/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[10px] font-bold text-[#38bdf8] uppercase tracking-wider">
                    Live Enterprise System
                  </span>
                  <a
                    href="https://garibondhu360.nextdigihome.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-[#38bdf8] transition mb-2">
                  Garibondhu360
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Intelligent transport management system (TMS) powering fleet dispatching, vehicle maintenance tracking, driver records, and real-time trip billing logistics.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono">garibondhu360.nextdigihome.com</span>
                <a
                  href="https://garibondhu360.nextdigihome.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition"
                >
                  Visit Platform
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 12. CUSTOMER-FACING MODEL                                            */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-3 h-px bg-[#00d4aa]" />
              HOW WE DELIVER
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The Complete Digital Lifecycle
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              From foundational engineering to continuous automation and scalable customer acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/15 text-[#00d4aa] mx-auto flex items-center justify-center mb-4">
                <CodeBracketIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#00d4aa] uppercase">Step 01</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">BUILD</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Custom digital platforms, websites, and bespoke web apps.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#ec4899]/15 text-[#ec4899] mx-auto flex items-center justify-center mb-4">
                <CpuChipIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#ec4899] uppercase">Step 02</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">AUTOMATE</h3>
              <p className="text-xs text-gray-400 leading-relaxed">AI agent workflows and webhook-driven operation systems.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#06b6d4]/15 text-[#06b6d4] mx-auto flex items-center justify-center mb-4">
                <ChartBarIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#06b6d4] uppercase">Step 03</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">GROW</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Performance advertising, server-side CAPI, and technical SEO.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/15 text-[#f59e0b] mx-auto flex items-center justify-center mb-4">
                <RocketLaunchIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#f59e0b] uppercase">Step 04</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">SCALE</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Infrastructure upgrades and reusable SaaS software evolution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 13. INDUSTRIES WE SERVE                                              */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-3 h-px bg-[#00d4aa]" />
              SECTORS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              We apply proven software patterns and digital systems across key commercial verticals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[#0e131d]/90 border border-white/8 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">{ind.name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 14. FREQUENTLY ASKED QUESTIONS                                       */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 bg-[#090d16]/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
              <span className="w-3 h-px bg-[#00d4aa]" />
              COMMON QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Learn about our capabilities, engagement structure, and technology practices.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/8 bg-[#0e131d]/90 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-white/[0.02]"
                  >
                    <span className="text-base font-bold text-white">{faq.q}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-[#00d4aa] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 15. FINAL CALL TO ACTION                                             */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00d4aa]/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-bold tracking-wider text-[#00d4aa] uppercase mb-6">
            <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
            PARTNER WITH NEXTDIGIHOME
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Have an Idea, Problem or Growth Goal?
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let&apos;s discuss what you want to build. From custom software engineering and AI automation to digital marketing systems, we are ready to help you execute.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 flex items-center gap-2"
            >
              <span>Start Your Project</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions"
              className="px-8 py-4 rounded-xl font-semibold text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
