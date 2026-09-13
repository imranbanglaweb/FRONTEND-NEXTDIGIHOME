import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  ShoppingBagIcon, 
  CodeBracketIcon, 
  DevicePhoneMobileIcon, 
  PaintBrushIcon, 
  BoltIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: "NextDigi Store | Digital Products & Business Resources",
  description: "Premium digital products, templates and business resources from NextDigi Store, a division of NEXTDIGIHOME.",
  path: "/store",
});

export default function NextDigiStorePage() {
  const storeCategories = [
    {
      title: 'Full-Stack Source Code',
      description: 'Production-grade web apps, admin portals, and API backends built with Next.js, Node.js, and Laravel.',
      icon: CodeBracketIcon,
      accent: '#00d4aa',
      href: '/products?category=source-code',
      count: 'Web Applications'
    },
    {
      title: 'Mobile App Templates',
      description: 'Cross-platform Flutter and React Native starter codebases with pre-wired authentication, states, and responsive layouts.',
      icon: DevicePhoneMobileIcon,
      accent: '#38bdf8',
      href: '/products?category=mobile-apps',
      count: 'iOS & Android'
    },
    {
      title: 'UI Design Kits & Systems',
      description: 'Handcrafted Figma component libraries, responsive design systems, and icon sets ready for design-to-code pipelines.',
      icon: PaintBrushIcon,
      accent: '#a855f7',
      href: '/products?category=ui-kits',
      count: 'Figma & Code'
    },
    {
      title: 'Automation & AI Tools',
      description: 'Python automation pipelines, deterministic AI agent workflows, and scraping toolkits to streamline operations.',
      icon: BoltIcon,
      accent: '#fbbf24',
      href: '/products?category=automation',
      count: 'Scripts & Workflows'
    }
  ];

  const guarantees = [
    {
      icon: ShieldCheckIcon,
      title: '100% Verified Quality',
      desc: 'Every template and codebase passes strict architecture and security review before listing.'
    },
    {
      icon: ArrowDownTrayIcon,
      title: 'Instant Secure Downloads',
      desc: 'Immediate access to clean GitHub repositories, ZIP archives, and license keys upon checkout.'
    },
    {
      icon: ArrowPathIcon,
      title: 'Lifetime Free Updates',
      desc: 'Receive all future version updates and dependency upgrades at zero additional cost.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-10 left-1/3 w-[650px] h-[350px] bg-[#00d4aa]/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-96 right-1/4 w-[500px] h-[300px] bg-[#8b5cf6]/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-[#00d4aa] font-medium">NextDigi Store</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-semibold tracking-wider text-[#00d4aa] uppercase mb-5">
            <ShoppingBagIcon className="w-4 h-4 text-[#00d4aa]" />
            NEXTDIGI STORE &bull; DIVISION OF NEXTDIGIHOME
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Digital Products &amp; <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">Resources</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Premium digital products, templates and business resources for modern creators and ambitious businesses. Explore our library of production-ready software source codes, UI design kits, mobile templates, and automation scripts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-7 py-3.5 rounded-xl font-semibold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 flex items-center gap-2"
            >
              Browse Full Catalog
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/refund"
              className="px-6 py-3.5 rounded-xl font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              30-Day Guarantee Policy
            </Link>
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {guarantees.map((g, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-[#00d4aa]/30 transition">
              <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-4">
                <g.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{g.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        {/* Store Categories Grid */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#00d4aa] uppercase">Curated Catalog</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Explore by Asset Category</h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-[#00d4aa] hover:underline inline-flex items-center gap-1 mt-2 sm:mt-0"
            >
              View all products in catalog <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storeCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  href={cat.href}
                  className="rounded-2xl border border-white/10 bg-[#0e131d]/80 hover:bg-[#111724] p-8 transition-all duration-300 flex items-start gap-5 hover:border-white/20 group hover:shadow-[0_0_30px_rgba(0,212,170,0.1)]"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shrink-0 group-hover:scale-105 transition-transform" style={{ color: cat.accent }}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00d4aa] transition">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400">
                        {cat.count}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-[#00d4aa] transition">
                      Browse Category <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Payment & Security Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111622] to-[#0a0d14] p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 mb-3">
              <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
              Secure Checkout Methods
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Pay with bKash, Nagad, Rocket or International Cards
            </h3>
            <p className="text-sm text-gray-400 max-w-xl">
              We provide localized Bangladeshi mobile banking alongside direct card payments. All transactions are SSL encrypted and protected by our 30-day money-back guarantee.
            </p>
          </div>
          <Link
            href="/products"
            className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 shrink-0"
          >
            Start Browsing Store
          </Link>
        </div>

      </div>
    </div>
  );
}
