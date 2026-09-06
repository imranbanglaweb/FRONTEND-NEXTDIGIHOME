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
  BeakerIcon
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
  const [selectedNode, setSelectedNode] = useState<string>('home');

  const divisions: Record<string, DivisionItem> = {
    home: {
      id: 'home',
      name: 'NEXTDIGI HOME',
      badge: 'MARKETPLACE & ASSETS',
      tagline: 'Instant Access to World-Class Digital Assets',
      description: 'The premier marketplace for verified digital assets, website kits, developer tools, and operational workflows.',
      icon: ShoppingBagIcon,
      accentColor: '#00d4aa',
      gradient: 'from-[#00d4aa]/20 via-[#00d4aa]/5 to-transparent',
      borderGlow: 'border-[#00d4aa]/40 shadow-[0_0_30px_rgba(0,212,170,0.15)]',
      items: ['Digital Products', 'Templates', 'Business Tools', 'AI Resources'],
      ctaText: 'Browse Store',
      ctaLink: '/products'
    },
    solutions: {
      id: 'solutions',
      name: 'NEXTDIGI SOLUTIONS',
      badge: 'ENTERPRISE & AGENCY',
      tagline: 'Custom Engineering & Digital Acceleration',
      description: 'Full-cycle design, software engineering, e-commerce development, and managed cloud infrastructure for global businesses.',
      icon: GlobeAltIcon,
      accentColor: '#8b5cf6',
      gradient: 'from-[#8b5cf6]/20 via-[#8b5cf6]/5 to-transparent',
      borderGlow: 'border-[#8b5cf6]/40 shadow-[0_0_30px_rgba(139,92,246,0.15)]',
      items: ['Web Development', 'E-commerce', 'Apps', 'Software', 'Social Media', 'Hosting', 'Maintenance'],
      ctaText: 'Explore Services',
      ctaLink: '/services'
    },
    ai: {
      id: 'ai',
      name: 'NEXTDIGI AI',
      badge: 'INTELLIGENT SYSTEMS',
      tagline: 'Autonomous Agents & Intelligent Automation',
      description: 'Cutting-edge artificial intelligence solutions including autonomous support agents, generative video, and automated workflow pipelines.',
      icon: CpuChipIcon,
      accentColor: '#ec4899',
      gradient: 'from-[#ec4899]/20 via-[#ec4899]/5 to-transparent',
      borderGlow: 'border-[#ec4899]/40 shadow-[0_0_30px_rgba(236,72,153,0.15)]',
      items: ['AI Video', 'AI Agents', 'Automation', 'AI Support'],
      ctaText: 'Discover AI',
      ctaLink: '/services#ai'
    },
    labs: {
      id: 'labs',
      name: 'NEXTDIGI LABS',
      badge: 'R&D & INCUBATION',
      tagline: 'Building the Next Generation of SaaS & AI Products',
      description: 'The innovation incubator powered by NextDigi Solutions, creating proprietary software products and automation tools for global markets.',
      icon: BeakerIcon,
      accentColor: '#f59e0b',
      gradient: 'from-[#f59e0b]/20 via-[#f59e0b]/5 to-transparent',
      borderGlow: 'border-[#f59e0b]/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]',
      items: ['SaaS', 'AI Products', 'Business Tools'],
      ctaText: 'Contact Labs Team',
      ctaLink: '/contact'
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
      tag: 'B2B & D2C'
    },
    {
      id: 'social',
      name: 'NextDigi Social',
      category: 'AI Social Media Management & Distribution',
      desc: 'Autonomous multi-platform publishing, AI trend analytics, viral hook synthesis, and lead capture.',
      icon: '🚀',
      status: 'Private Beta',
      statusColor: 'bg-[#8b5cf6]/15 text-[#c4b5fd] border-[#8b5cf6]/30',
      tag: 'Growth Automation'
    },
    {
      id: 'automate',
      name: 'NextDigi Automate',
      category: 'Autonomous Enterprise Workflows & RPA',
      desc: 'Zero-touch document processing, API orchestration, CRM synchronization, and multi-agent coordination.',
      icon: '⚡',
      status: 'Active Expansion',
      statusColor: 'bg-[#ec4899]/15 text-[#f472b6] border-[#ec4899]/30',
      tag: 'Workflow AI'
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
              NEXTDIGI VENTURE ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#fafafa] tracking-tight mb-5">
            The Complete <span className="bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">NEXTDIGI Ecosystem</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8c8c9a] leading-relaxed">
            One interconnected powerhouse designed to build, launch, automate, and scale modern digital businesses from day one to enterprise scale.
          </p>
        </div>

        {/* ============================================================== */}
        {/* LEVEL 1: PARENT BRAND - NEXTDIGI CORE */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center">
          <div className="relative group w-full max-w-xl">
            {/* Ambient backglow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ec4899] rounded-3xl blur-md opacity-30 group-hover:opacity-70 transition duration-500" />
            
            <div className="relative rounded-2xl bg-[#121217] border border-white/15 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-[1.5px] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-ping" />
                Parent Venture & Holding Engine
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-3">
                <span>NEXTDIGI</span>
              </h3>
              
              {/* Core 4 pillars from diagram */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-[#d4d4d8]">
                <span className="px-3 py-1 rounded-lg bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-[#00d4aa]">Build</span>
                <span className="text-white/30">•</span>
                <span className="px-3 py-1 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 text-[#a78bfa]">Launch</span>
                <span className="text-white/30">•</span>
                <span className="px-3 py-1 rounded-lg bg-[#ec4899]/10 border border-[#ec4899]/25 text-[#f472b6]">Automate</span>
                <span className="text-white/30">•</span>
                <span className="px-3 py-1 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/25 text-[#fbbf24]">Grow</span>
              </div>
            </div>
          </div>

          {/* Desktop SVG Connector Pipeline (Parent to 3 Main Pillars) */}
          <div className="hidden lg:flex flex-col items-center w-full max-w-5xl my-4">
            {/* Center stem down */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-white/40 via-[#00d4aa] to-[#8b5cf6]" />
            {/* Horizontal splitter */}
            <div className="relative w-full">
              <div className="w-full h-0.5 bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ec4899]" />
              {/* Connector drops */}
              <div className="absolute left-[16.66%] -bottom-8 w-0.5 h-8 bg-[#00d4aa]" />
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-0.5 h-8 bg-[#8b5cf6]" />
              <div className="absolute right-[16.66%] -bottom-8 w-0.5 h-8 bg-[#ec4899]" />
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
        {/* LEVEL 2: 3 MAIN PILLARS (HOME • SOLUTIONS • AI) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start mb-12">
          
          {/* PILLAR 1: NEXTDIGI HOME */}
          <div 
            onClick={() => setSelectedNode('home')}
            className={`cursor-pointer rounded-2xl bg-[#121217] border p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group ${
              selectedNode === 'home' ? divisions.home.borderGlow : 'border-[#2a2a35] hover:border-[#00d4aa]/50'
            }`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${divisions.home.gradient} rounded-bl-full pointer-events-none`} />
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa]">
                <ShoppingBagIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/25">
                Marketplace
              </span>
            </div>

            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">
              NEXTDIGI HOME
            </h4>
            <p className="text-xs text-[#a1a1aa] mb-4 min-h-[36px]">
              {divisions.home.tagline}
            </p>

            {/* Offerings list from ASCII diagram */}
            <div className="space-y-2 mb-6">
              {divisions.home.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                  <CheckCircleIcon className="w-4 h-4 text-[#00d4aa] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href={divisions.home.ctaLink}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#00d4aa] text-[#0f0f12] hover:bg-[#00e6b8] transition shadow-lg shadow-[#00d4aa]/20"
            >
              <span>{divisions.home.ctaText}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* PILLAR 2: NEXTDIGI SOLUTIONS (Central pillar that leads to Labs) */}
          <div 
            onClick={() => setSelectedNode('solutions')}
            className={`cursor-pointer rounded-2xl bg-[#121217] border p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group ${
              selectedNode === 'solutions' ? divisions.solutions.borderGlow : 'border-[#2a2a35] hover:border-[#8b5cf6]/50'
            }`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${divisions.solutions.gradient} rounded-bl-full pointer-events-none`} />
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 flex items-center justify-center text-[#8b5cf6]">
                <GlobeAltIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/25">
                Solutions & Agency
              </span>
            </div>

            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#8b5cf6] transition-colors">
              NEXTDIGI SOLUTIONS
            </h4>
            <p className="text-xs text-[#a1a1aa] mb-4 min-h-[36px]">
              {divisions.solutions.tagline}
            </p>

            {/* Offerings list from ASCII diagram */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {divisions.solutions.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-[#d4d4d8]">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-[#8b5cf6] shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Link
                href={divisions.solutions.ctaLink}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#8b5cf6] text-white hover:bg-[#7c3aed] transition shadow-lg shadow-[#8b5cf6]/20"
              >
                <span>Services</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold border border-white/20 text-[#fafafa] hover:bg-white/5 transition"
              >
                Hire Team
              </Link>
            </div>
          </div>

          {/* PILLAR 3: NEXTDIGI AI */}
          <div 
            onClick={() => setSelectedNode('ai')}
            className={`cursor-pointer rounded-2xl bg-[#121217] border p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group ${
              selectedNode === 'ai' ? divisions.ai.borderGlow : 'border-[#2a2a35] hover:border-[#ec4899]/50'
            }`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${divisions.ai.gradient} rounded-bl-full pointer-events-none`} />
            
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#ec4899]/10 border border-[#ec4899]/30 flex items-center justify-center text-[#ec4899]">
                <CpuChipIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#ec4899]/10 text-[#f472b6] border border-[#ec4899]/25">
                Next-Gen AI
              </span>
            </div>

            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#ec4899] transition-colors">
              NEXTDIGI AI
            </h4>
            <p className="text-xs text-[#a1a1aa] mb-4 min-h-[36px]">
              {divisions.ai.tagline}
            </p>

            {/* Offerings list from ASCII diagram */}
            <div className="space-y-2 mb-6">
              {divisions.ai.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                  <CheckCircleIcon className="w-4 h-4 text-[#ec4899] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Link
              href={divisions.ai.ctaLink}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#ec4899] text-white hover:bg-[#db2777] transition shadow-lg shadow-[#ec4899]/20"
            >
              <span>Explore AI Systems</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LEVEL 3 & 4: INCUBATION BRIDGE: SOLUTIONS -> NEXTDIGI LABS -> SAAS */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center">
          
          {/* Connecting Pipe from Solutions Down to Labs */}
          <div className="flex flex-col items-center my-2">
            <div className="w-0.5 h-12 bg-gradient-to-b from-[#8b5cf6] via-[#f59e0b] to-[#f59e0b] animate-pulse" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[10px] font-bold text-[#fbbf24] uppercase tracking-wider my-1">
              <span>Incubation Engine</span>
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
              Software &amp; SaaS Research Lab
            </div>

            <h4 className="text-2xl font-black text-white mb-2">
              NEXTDIGI LABS
            </h4>
            <p className="text-sm text-[#a1a1aa] max-w-lg mx-auto mb-5">
              Where NextDigi invents, tests, and launches independent scalable software, intelligent SaaS products, and business automation platforms.
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
            {/* Splitter */}
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
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#71717a] py-1">Proprietary Products</div>
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
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#00d4aa] hover:underline"
                  >
                    <span>Inquire Access</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE NODE INSPECTOR / QUICK FACTS */}
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
                      Selected Branch:
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
