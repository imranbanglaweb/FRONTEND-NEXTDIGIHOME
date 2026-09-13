'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  SparklesIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  CpuChipIcon, 
  GlobeAltIcon, 
  ShoppingBagIcon,
  BeakerIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface DivisionItem {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  gradient: string;
  borderGlow: string;
  items: string[];
  ctaText: string;
  ctaLink: string;
}

export default function NextDigiEcosystem() {
  const [selectedNode, setSelectedNode] = useState<string>('solutions');

  const divisions: Record<string, DivisionItem> = {
    solutions: {
      id: 'solutions',
      name: 'NextDigi Solutions',
      badge: 'TECHNOLOGY & SOFTWARE SERVICES',
      tagline: 'Custom Engineering & Scalable Platforms',
      description: 'Full-cycle web development, mobile applications, custom software engineering, e-commerce platforms, and managed cloud infrastructure for ambitious businesses.',
      icon: GlobeAltIcon,
      accentColor: '#8b5cf6',
      gradient: 'from-[#8b5cf6]/20 via-[#8b5cf6]/5 to-transparent',
      borderGlow: 'border-[#8b5cf6]/40 shadow-[0_0_30px_rgba(139,92,246,0.15)]',
      items: ['Web Development', 'E-commerce', 'Mobile Apps', 'Custom Software', 'Cloud DevOps'],
      ctaText: 'Explore Solutions',
      ctaLink: '/solutions'
    },
    ai: {
      id: 'ai',
      name: 'NextDigi AI',
      badge: 'AI & AUTOMATION',
      tagline: 'Autonomous Agents & Intelligent Automation',
      description: 'Cutting-edge artificial intelligence solutions including autonomous support agents, multi-agent pipelines, and zero-touch workflow automation.',
      icon: CpuChipIcon,
      accentColor: '#ec4899',
      gradient: 'from-[#ec4899]/20 via-[#ec4899]/5 to-transparent',
      borderGlow: 'border-[#ec4899]/40 shadow-[0_0_30px_rgba(236,72,153,0.15)]',
      items: ['AI Agents', 'Intelligent Chatbots', 'Workflow Automation', 'RPA Pipelines'],
      ctaText: 'Discover AI',
      ctaLink: '/ai'
    },
    growth: {
      id: 'growth',
      name: 'NextDigi Growth',
      badge: 'DIGITAL MARKETING & GROWTH',
      tagline: 'Data-Driven Acquisition & Brand Acceleration',
      description: 'High-ROI performance marketing, server-side Meta CAPI tracking, Google Ads media buying, and enterprise SEO growth funnels.',
      icon: ChartBarIcon,
      accentColor: '#06b6d4',
      gradient: 'from-[#06b6d4]/20 via-[#06b6d4]/5 to-transparent',
      borderGlow: 'border-[#06b6d4]/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]',
      items: ['Performance Marketing', 'Meta & Google Ads', 'Enterprise SEO', 'Conversion Funnels'],
      ctaText: 'Explore Growth',
      ctaLink: '/growth'
    },
    store: {
      id: 'store',
      name: 'NextDigi Store',
      badge: 'DIGITAL PRODUCTS & RESOURCES',
      tagline: 'Instant Access to Verified Digital Assets',
      description: 'The premier ecosystem marketplace for verified production source codes, full-stack application kits, Flutter mobile apps, and business workflows.',
      icon: ShoppingBagIcon,
      accentColor: '#00d4aa',
      gradient: 'from-[#00d4aa]/20 via-[#00d4aa]/5 to-transparent',
      borderGlow: 'border-[#00d4aa]/40 shadow-[0_0_30px_rgba(0,212,170,0.15)]',
      items: ['Full-Stack Source Code', 'Mobile App Templates', 'AI & Script Kits', 'Business Tools'],
      ctaText: 'Browse Store',
      ctaLink: '/products'
    },
    labs: {
      id: 'labs',
      name: 'NextDigi Labs',
      badge: 'SAAS & TECHNOLOGY PRODUCTS',
      tagline: 'Proprietary SaaS & Enterprise Innovation',
      description: 'The innovation incubator powered by NEXTDIGIHOME, inventing, battle-testing, and scaling proprietary software platforms and automation engines.',
      icon: BeakerIcon,
      accentColor: '#f59e0b',
      gradient: 'from-[#f59e0b]/20 via-[#f59e0b]/5 to-transparent',
      borderGlow: 'border-[#f59e0b]/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]',
      items: ['NextDigi Commerce', 'NextDigi Social', 'NextDigi Automate', 'Garibondhu360'],
      ctaText: 'Explore Labs',
      ctaLink: '/labs'
    }
  };

  const labsSubProducts = [
    {
      id: 'commerce',
      name: 'NextDigi Commerce',
      category: 'Headless E-Commerce & Checkout Engine',
      desc: 'High-conversion modular checkout system, automated order routing, and omnichannel retail inventory.',
      icon: '🛍️',
      status: 'Live & Deployable',
      statusColor: 'bg-[#00d4aa]/15 text-[#00d4aa] border-[#00d4aa]/30',
      tag: 'B2B & D2C',
      link: 'https://commerce.nextdigihome.com/'
    },
    {
      id: 'social',
      name: 'NextDigi Social',
      category: 'AI Social Media Management & Distribution',
      desc: 'Autonomous multi-platform publishing, AI trend analytics, viral hook synthesis, and lead capture.',
      icon: '🚀',
      status: 'Private Beta',
      statusColor: 'bg-[#8b5cf6]/15 text-[#c4b5fd] border-[#8b5cf6]/30',
      tag: 'Growth Automation',
      link: 'https://social.nextdigihome.com/'
    },
    {
      id: 'automate',
      name: 'NextDigi Automate',
      category: 'Autonomous Enterprise Workflows & RPA',
      desc: 'Zero-touch document processing, API orchestration, CRM synchronization, and multi-agent coordination.',
      icon: '⚡',
      status: 'Active Expansion',
      statusColor: 'bg-[#ec4899]/15 text-[#f472b6] border-[#ec4899]/30',
      tag: 'Workflow AI',
      link: 'https://automate.nextdigihome.com/'
    }
  ];

  return (
    <section id="ecosystem" className="relative py-20 sm:py-28 overflow-hidden bg-[#0a0a0d] border-t border-b border-[#22222a]">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-[#00d4aa]/10 via-[#8b5cf6]/10 to-transparent blur-[110px] opacity-70" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#8b5cf6]/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#00d4aa]/5 blur-[120px] rounded-full" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,212,170,0.2)]">
            <SparklesIcon className="w-4 h-4 text-[#00d4aa] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa]">
              NEXTDIGIHOME BRAND ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#fafafa] tracking-tight mb-5">
            The Complete <span className="bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">NEXTDIGIHOME Ecosystem</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8c8c9a] leading-relaxed">
            One interconnected master technology ecosystem designed to build, launch, automate, and scale modern digital businesses from day one to enterprise scale.
          </p>
        </div>

        {/* ============================================================== */}
        {/* LEVEL 1: MASTER / PARENT BRAND - NEXTDIGIHOME                  */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center">
          <div className="relative group w-full max-w-xl">
            {/* Ambient backglow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ec4899] rounded-3xl blur-md opacity-30 group-hover:opacity-70 transition duration-500" />
            
            <div className="relative rounded-2xl bg-[#121217] border border-white/15 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-[1.5px] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-ping" />
                Master / Parent Brand
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                <span>NEXTDIGIHOME</span>
              </h3>
              <p className="text-xs font-semibold text-[#00d4aa] mt-1 tracking-wider uppercase">
                Master Technology Ecosystem
              </p>
              
              {/* 5 Official Divisions */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#d4d4d8]">
                <span className="px-2.5 py-1 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 text-[#a78bfa]">Solutions</span>
                <span className="text-white/30">•</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#ec4899]/10 border border-[#ec4899]/25 text-[#f472b6]">AI</span>
                <span className="text-white/30">•</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/25 text-[#22d3ee]">Growth</span>
                <span className="text-white/30">•</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/25 text-[#fbbf24]">Labs</span>
                <span className="text-white/30">•</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-[#00d4aa]">Store</span>
              </div>
            </div>
          </div>

          {/* Desktop SVG Connector Pipeline */}
          <div className="hidden lg:flex flex-col items-center w-full max-w-5xl my-4">
            <div className="w-0.5 h-10 bg-gradient-to-b from-white/40 via-[#00d4aa] to-[#8b5cf6]" />
            <div className="relative w-full">
              <div className="w-full h-0.5 bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#00d4aa]" />
              <div className="absolute left-[12.5%] -bottom-8 w-0.5 h-8 bg-[#8b5cf6]" />
              <div className="absolute left-[37.5%] -bottom-8 w-0.5 h-8 bg-[#ec4899]" />
              <div className="absolute left-[62.5%] -bottom-8 w-0.5 h-8 bg-[#06b6d4]" />
              <div className="absolute left-[87.5%] -bottom-8 w-0.5 h-8 bg-[#00d4aa]" />
            </div>
            <div className="h-8" />
          </div>

          {/* Mobile/Tablet Connector Line */}
          <div className="lg:hidden flex flex-col items-center my-6">
            <div className="w-0.5 h-10 bg-gradient-to-b from-white/40 to-[#00d4aa]" />
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#71717a] py-1">Divisions</div>
            <div className="w-0.5 h-6 bg-gradient-to-b from-[#00d4aa] to-white/20" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* LEVEL 2: 4 CORE SERVICE & PRODUCT PILLARS                      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start mb-12">
          
          {/* PILLAR 1: NEXTDIGI SOLUTIONS */}
          <div 
            onClick={() => setSelectedNode('solutions')}
            className={`cursor-pointer rounded-2xl bg-[#121217] border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between h-full ${
              selectedNode === 'solutions' ? divisions.solutions.borderGlow : 'border-[#2a2a35] hover:border-[#8b5cf6]/50'
            }`}
          >
            <div>
              <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${divisions.solutions.gradient} rounded-bl-full pointer-events-none`} />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 flex items-center justify-center text-[#8b5cf6]">
                  <GlobeAltIcon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/25">
                  Solutions
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#8b5cf6] transition-colors">
                NextDigi Solutions
              </h4>
              <p className="text-xs text-[#a1a1aa] mb-4 min-h-[32px]">
                {divisions.solutions.tagline}
              </p>

              <div className="space-y-1.5 mb-6">
                {divisions.solutions.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-[#8b5cf6] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={divisions.solutions.ctaLink}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed] transition shadow-lg shadow-[#8b5cf6]/20"
            >
              <span>{divisions.solutions.ctaText}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* PILLAR 2: NEXTDIGI AI */}
          <div 
            onClick={() => setSelectedNode('ai')}
            className={`cursor-pointer rounded-2xl bg-[#121217] border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between h-full ${
              selectedNode === 'ai' ? divisions.ai.borderGlow : 'border-[#2a2a35] hover:border-[#ec4899]/50'
            }`}
          >
            <div>
              <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${divisions.ai.gradient} rounded-bl-full pointer-events-none`} />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#ec4899]/10 border border-[#ec4899]/30 flex items-center justify-center text-[#ec4899]">
                  <CpuChipIcon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#ec4899]/10 text-[#f472b6] border border-[#ec4899]/25">
                  AI &amp; Automation
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#ec4899] transition-colors">
                NextDigi AI
              </h4>
              <p className="text-xs text-[#a1a1aa] mb-4 min-h-[32px]">
                {divisions.ai.tagline}
              </p>

              <div className="space-y-1.5 mb-6">
                {divisions.ai.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-[#ec4899] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={divisions.ai.ctaLink}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#ec4899] text-white hover:bg-[#db2777] transition shadow-lg shadow-[#ec4899]/20"
            >
              <span>{divisions.ai.ctaText}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* PILLAR 3: NEXTDIGI GROWTH */}
          <div 
            onClick={() => setSelectedNode('growth')}
            className={`cursor-pointer rounded-2xl bg-[#121217] border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between h-full ${
              selectedNode === 'growth' ? divisions.growth.borderGlow : 'border-[#2a2a35] hover:border-[#06b6d4]/50'
            }`}
          >
            <div>
              <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${divisions.growth.gradient} rounded-bl-full pointer-events-none`} />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/30 flex items-center justify-center text-[#06b6d4]">
                  <ChartBarIcon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#06b6d4]/10 text-[#22d3ee] border border-[#06b6d4]/25">
                  Growth &amp; Ads
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#06b6d4] transition-colors">
                NextDigi Growth
              </h4>
              <p className="text-xs text-[#a1a1aa] mb-4 min-h-[32px]">
                {divisions.growth.tagline}
              </p>

              <div className="space-y-1.5 mb-6">
                {divisions.growth.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-[#06b6d4] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={divisions.growth.ctaLink}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#06b6d4] text-[#0f0f12] hover:bg-[#22d3ee] transition shadow-lg shadow-[#06b6d4]/20"
            >
              <span>{divisions.growth.ctaText}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* PILLAR 4: NEXTDIGI STORE */}
          <div 
            onClick={() => setSelectedNode('store')}
            className={`cursor-pointer rounded-2xl bg-[#121217] border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between h-full ${
              selectedNode === 'store' ? divisions.store.borderGlow : 'border-[#2a2a35] hover:border-[#00d4aa]/50'
            }`}
          >
            <div>
              <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${divisions.store.gradient} rounded-bl-full pointer-events-none`} />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa]">
                  <ShoppingBagIcon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/25">
                  Store
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#00d4aa] transition-colors">
                NextDigi Store
              </h4>
              <p className="text-xs text-[#a1a1aa] mb-4 min-h-[32px]">
                {divisions.store.tagline}
              </p>

              <div className="space-y-1.5 mb-6">
                {divisions.store.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-[#00d4aa] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={divisions.store.ctaLink}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#00d4aa] text-[#0f0f12] hover:bg-[#00e6b8] transition shadow-lg shadow-[#00d4aa]/20"
            >
              <span>{divisions.store.ctaText}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* ============================================================== */}
        {/* LEVEL 3 & 4: INCUBATION BRIDGE: NEXTDIGI LABS -> SAAS           */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center">
          
          {/* Connecting Pipe Down to Labs */}
          <div className="flex flex-col items-center my-2">
            <div className="w-0.5 h-10 bg-gradient-to-b from-[#8b5cf6] via-[#f59e0b] to-[#f59e0b] animate-pulse" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[10px] font-bold text-[#fbbf24] uppercase tracking-wider my-1">
              <span>SaaS &amp; Incubation Division</span>
              <span className="text-xs">↓</span>
            </div>
            <div className="w-0.5 h-6 bg-[#f59e0b]" />
          </div>

          {/* NEXTDIGI LABS NODE */}
          <div 
            onClick={() => setSelectedNode('labs')}
            className={`w-full max-w-2xl cursor-pointer rounded-2xl bg-[#15151c] border p-6 sm:p-8 text-center transition-all duration-300 relative overflow-hidden ${
              selectedNode === 'labs' ? divisions.labs.borderGlow : 'border-[#f59e0b]/30 hover:border-[#f59e0b]'
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#f59e0b]/15 to-transparent rounded-bl-full pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/25 text-[11px] font-bold text-[#fbbf24] uppercase tracking-widest mb-3">
              <BeakerIcon className="w-3.5 h-3.5 text-[#fbbf24]" />
              SaaS &amp; Technology Products
            </div>

            <h4 className="text-2xl font-black text-white mb-2">
              NextDigi Labs
            </h4>
            <p className="text-sm text-[#a1a1aa] max-w-lg mx-auto mb-5">
              The innovation incubator of NEXTDIGIHOME, inventing, battle-testing, and scaling proprietary software platforms and automation engines.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {divisions.labs.items.map((item, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-[#fafafa] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop Branching Pipeline: Labs to 3 SaaS Products */}
          <div className="hidden lg:flex flex-col items-center w-full max-w-5xl my-4">
            <div className="w-0.5 h-10 bg-gradient-to-b from-[#f59e0b] to-[#00d4aa]" />
            <div className="relative w-full">
              <div className="w-full h-0.5 bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ec4899]" />
              <div className="absolute left-[16.66%] -bottom-8 w-0.5 h-8 bg-[#00d4aa]" />
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-0.5 h-8 bg-[#8b5cf6]" />
              <div className="absolute right-[16.66%] -bottom-8 w-0.5 h-8 bg-[#ec4899]" />
            </div>
            <div className="h-8" />
          </div>

          {/* Mobile connector */}
          <div className="lg:hidden flex flex-col items-center my-6">
            <div className="w-0.5 h-8 bg-gradient-to-b from-[#f59e0b] to-white/30" />
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#71717a] py-1">Proprietary Applications</div>
            <div className="w-0.5 h-6 bg-white/20" />
          </div>

          {/* 3 LABS SAAS PRODUCTS */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {labsSubProducts.map((prod) => (
              <div 
                key={prod.id}
                className="rounded-2xl bg-[#111116] border border-white/10 p-5 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">
                      {prod.icon}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${prod.statusColor}`}>
                      {prod.status}
                    </span>
                  </div>

                  <h5 className="text-base font-bold text-white group-hover:text-[#00d4aa] transition-colors mb-1">
                    {prod.name}
                  </h5>
                  <p className="text-[11px] font-semibold text-[#a1a1aa] mb-3">
                    {prod.category}
                  </p>
                  <p className="text-xs text-[#71717a] leading-relaxed mb-4">
                    {prod.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#a1a1aa]">
                    {prod.tag}
                  </span>
                  <a
                    href={prod.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#00d4aa] hover:underline"
                  >
                    <span>Launch Platform</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE NODE INSPECTOR / QUICK FACTS                       */}
        {/* ============================================================== */}
        {selectedNode && divisions[selectedNode] && (
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#121218] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                  style={{ 
                    backgroundColor: `${divisions[selectedNode].accentColor}15`,
                    borderColor: `${divisions[selectedNode].accentColor}40`,
                    color: divisions[selectedNode].accentColor 
                  }}
                >
                  {React.createElement(divisions[selectedNode].icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#a1a1aa]">
                      Selected Ecosystem Division:
                    </span>
                    <span 
                      className="text-xs font-extrabold uppercase px-2 py-0.5 rounded"
                      style={{ 
                        backgroundColor: `${divisions[selectedNode].accentColor}20`,
                        color: divisions[selectedNode].accentColor 
                      }}
                    >
                      {divisions[selectedNode].badge}
                    </span>
                  </div>
                  <h4 className="text-xl font-black text-white mt-1">
                    {divisions[selectedNode].name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1 max-w-2xl">
                    {divisions[selectedNode].description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Link
                  href={divisions[selectedNode].ctaLink}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-[#0f0f12] transition duration-200 hover:brightness-110 shadow-lg"
                  style={{ backgroundColor: divisions[selectedNode].accentColor }}
                >
                  <span>{divisions[selectedNode].ctaText}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
