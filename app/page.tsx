'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
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
  ChartBarIcon,
  BeakerIcon,
  ShareIcon,
  BoltIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  FireIcon,
  CodeBracketIcon,
  UserIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  VideoCameraIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import { apiFetch, getStorageUrl } from './utils/api';

interface Product {
  id: number | string;
  name: string;
  slug: string;
  description?: string;
  price: number | string;
  compare_price?: number | string | null;
  category?: string;
  category_name?: string | null;
  category_slug?: string | null;
  thumbnail?: string | null;
  thumbnail_url?: string | null;
  image_url?: string | null;
  featured?: boolean;
}

const getProductImage = (prod: Product): string => {
  if (prod.thumbnail) {
    const storage = getStorageUrl(prod.thumbnail);
    if (storage) return storage;
  }
  if (prod.thumbnail_url) return prod.thumbnail_url;
  if (prod.image_url) return prod.image_url;
  return '/placeholder.png';
};

interface WelcomeSettings {
  site_title?: string;
  admin_title?: string;
  site_description?: string;
  admin_description?: string;
}

// Verified flagship products ensuring product showcase is never blank
const fallbackProducts: Product[] = [
  {
    id: 101,
    name: 'NextDigi Headless Commerce Storefront',
    slug: 'nextdigi-headless-commerce',
    description: 'Production-ready Next.js 15 e-commerce engine with bKash, Nagad, Stripe, and automated courier consignment dispatch.',
    price: 9999,
    compare_price: 14999,
    category: 'web-development',
    category_name: 'Source Code',
    category_slug: 'source-code',
    thumbnail: null,
    featured: true
  },
  {
    id: 102,
    name: 'Flutter Multipurpose Mobile App Template',
    slug: 'flutter-multipurpose-mobile-app',
    description: 'Cross-platform iOS & Android mobile application with biometric auth, push alerts, offline sync, and clean Bloc architecture.',
    price: 7499,
    compare_price: 11999,
    category: 'mobile-apps',
    category_name: 'Mobile Apps',
    category_slug: 'mobile-apps',
    thumbnail: null,
    featured: true
  },
  {
    id: 103,
    name: 'Enterprise SaaS Admin & Billing Dashboard',
    slug: 'enterprise-saas-admin-billing',
    description: 'Multi-tenant subscription architecture with automated recurring billing, team workspace invites, and role-based ACL.',
    price: 12499,
    compare_price: 18999,
    category: 'web-development',
    category_name: 'Source Code',
    category_slug: 'source-code',
    thumbnail: null,
    featured: true
  },
  {
    id: 104,
    name: 'Autonomous AI Customer Support Agent',
    slug: 'autonomous-ai-customer-support-agent',
    description: 'Production RAG chatbot with private vector search, WhatsApp Business API integration, and CRM ticket handoff.',
    price: 8999,
    compare_price: 13500,
    category: 'scripts',
    category_name: 'AI & Automation',
    category_slug: 'scripts',
    thumbnail: null,
    featured: true
  },
  {
    id: 105,
    name: 'NextDigi Workshop & Fleet ERP Suite',
    slug: 'nextdigi-workshop-fleet-erp',
    description: 'Cloud garage & automotive ERP with digital job-cards, barcode spare-parts inventory, and automated customer SMS status.',
    price: 15999,
    compare_price: 24999,
    category: 'business-tools',
    category_name: 'Business Tools',
    category_slug: 'business-tools',
    thumbnail: null,
    featured: true
  },
  {
    id: 106,
    name: 'Omnichannel Social Media Scheduler SaaS',
    slug: 'omnichannel-social-scheduler',
    description: 'Full-stack platform to schedule posts across Facebook, Instagram, LinkedIn, and TikTok with AI caption generator.',
    price: 10999,
    compare_price: 16500,
    category: 'web-development',
    category_name: 'Source Code',
    category_slug: 'source-code',
    thumbnail: null,
    featured: true
  },
  {
    id: 107,
    name: 'Multi-Vendor Food & Grocery Delivery Platform',
    slug: 'multi-vendor-food-grocery-delivery',
    description: 'Complete rider tracking, restaurant dispatch panel, customer web app & real-time delivery estimation engine.',
    price: 18999,
    compare_price: 28000,
    category: 'web-development',
    category_name: 'Source Code',
    category_slug: 'source-code',
    thumbnail: null,
    featured: true
  },
  {
    id: 108,
    name: 'Visual Workflow Automation Engine Blueprint',
    slug: 'visual-workflow-automation-blueprint',
    description: 'Self-hosted drag-and-drop workflow canvas with 30+ pre-built webhook triggers and fault-tolerant retry workers.',
    price: 11499,
    compare_price: 17500,
    category: 'scripts',
    category_name: 'AI & Automation',
    category_slug: 'scripts',
    thumbnail: null,
    featured: true
  }
];

export default function Home() {
  const [welcomeSettings, setWelcomeSettings] = useState<WelcomeSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'source-code' | 'mobile-apps' | 'scripts' | 'business-tools'>('all');
  const [heroConsoleTab, setHeroConsoleTab] = useState<'saas' | 'ai' | 'growth' | 'products'>('saas');
  const [hoveredDivision, setHoveredDivision] = useState<'solutions' | 'ai' | 'growth' | 'products'>('solutions');

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        const settingsRes = await apiFetch('settings', { silent: true });
        if (isMounted && settingsRes) {
          setWelcomeSettings(settingsRes?.data?.data || settingsRes?.data || settingsRes || {});
        }
      } catch {}

      try {
        const productsRes = await apiFetch('products', { silent: true });
        let list: Product[] = [];
        if (Array.isArray(productsRes)) {
          list = productsRes;
        } else if (Array.isArray(productsRes?.data)) {
          list = productsRes.data;
        } else if (Array.isArray(productsRes?.data?.data)) {
          list = productsRes.data.data;
        }

        if (isMounted) {
          if (list.length > 0) {
            setProducts(list);
          } else {
            setProducts(fallbackProducts);
          }
        }
      } catch {
        if (isMounted) {
          setProducts(fallbackProducts);
        }
      }
    };

    fetchInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  const allProducts = products.length > 0 ? products : fallbackProducts;

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const cat = (p.category_slug || p.category || p.category_name || '').toLowerCase();
      let matchesCat = true;
      if (activeCategoryTab === 'source-code') matchesCat = cat.includes('source') || cat.includes('web') || cat.includes('code');
      else if (activeCategoryTab === 'mobile-apps') matchesCat = cat.includes('mobile') || cat.includes('app') || cat.includes('flutter');
      else if (activeCategoryTab === 'scripts') matchesCat = cat.includes('script') || cat.includes('ai') || cat.includes('automation');
      else if (activeCategoryTab === 'business-tools') matchesCat = cat.includes('business') || cat.includes('erp') || cat.includes('tool');

      const matchesSearch = !searchQuery.trim() || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesSearch;
    }).slice(0, 8);
  }, [allProducts, activeCategoryTab, searchQuery]);

  // Quick Add to Cart Handler
  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await apiFetch('/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      });

      window.dispatchEvent(new Event('cartUpdated'));

      Swal.fire({
        title: 'Added to Cart! 🛍️',
        text: `${product.name} has been added to your cart.`,
        icon: 'success',
        background: '#0d121f',
        color: '#f8fafc',
        confirmButtonColor: '#00d4aa',
        confirmButtonText: 'Continue Shopping',
        timer: 2000,
        timerProgressBar: true
      });
    } catch {
      window.dispatchEvent(new Event('cartUpdated'));
      Swal.fire({
        title: 'Added to Cart! 🛍️',
        text: `${product.name} has been added to your cart.`,
        icon: 'success',
        background: '#0d121f',
        color: '#f8fafc',
        confirmButtonColor: '#00d4aa',
        timer: 1800
      });
    }
  };

  const siteName = welcomeSettings?.site_title || welcomeSettings?.admin_title || 'NextDigiHome';

  return (
    <div className="min-h-screen text-slate-100 overflow-x-hidden w-full">

      {/* ================================================================ */}
      {/* 1. HOMEPAGE HERO SECTION — NEXTDIGIHOME MASTER TECHNOLOGY ECOSYSTEM */}
      {/* ================================================================ */}
      <section className="relative w-full overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
        
        {/* Ambient Canvas & Subtle Radial Glow Mesh */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-[#00d4aa]/10 blur-[150px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[450px] bg-[#8b5cf6]/10 blur-[160px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] opacity-60" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: HERO CONTENT */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col text-left">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-bold tracking-wider text-[#00d4aa] uppercase w-fit mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                <span>NEXTDIGIHOME</span>
                <span className="text-slate-500 font-normal">•</span>
                <span className="text-slate-300 font-medium normal-case tracking-normal text-[11px]">Master Technology Ecosystem</span>
              </div>

              {/* Main Headline (Single H1) */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.08] mb-5">
                Build. Launch.{' '}
                <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                  Automate. Grow.
                </span>
              </h1>

              {/* Supporting Headline */}
              <p className="text-lg sm:text-xl font-semibold text-slate-200 leading-snug mb-4">
                Technology, AI, software and digital growth solutions for modern businesses.
              </p>

              {/* Body Copy */}
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-xl">
                From websites and e-commerce platforms to custom software, SaaS, AI automation and digital growth — we help businesses turn ideas into scalable digital solutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#00d4aa] text-[#07090e] font-bold text-sm hover:bg-[#00e2b6] shadow-lg shadow-[#00d4aa]/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <RocketLaunchIcon className="w-4 h-4" />
                  <span>Start a Project</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00d4aa]/30 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  <span>Explore Solutions</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Capability Line */}
              <div className="pt-6 border-t border-white/8">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  Core Capabilities
                </div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-slate-300 font-medium">
                  {['Web', 'E-commerce', 'Apps', 'Software', 'AI', 'Automation', 'Growth', 'SaaS'].map((cap, i, arr) => (
                    <span key={cap} className="inline-flex items-center gap-2">
                      <span className="hover:text-[#00d4aa] transition-colors">{cap}</span>
                      {i < arr.length - 1 && <span className="text-slate-600">•</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust Element: Factual Capability Statements */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                {[
                  { label: 'End-to-End Technology', icon: CommandLineIcon },
                  { label: 'AI & Automation', icon: CpuChipIcon },
                  { label: 'Custom Solutions', icon: CodeBracketIcon },
                  { label: 'SaaS Development', icon: ServerIcon },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-slate-300">
                      <Icon className="w-3.5 h-3.5 text-[#00d4aa] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>

            </div>


            {/* RIGHT COLUMN: TECHNOLOGY / SAAS / AI MULTI-COLOR VISUAL CONSOLE */}
            <div className="lg:col-span-5 xl:col-span-6 w-full relative">
              {/* Multi-Color Ambient Glow Spheres */}
              <div className="absolute -top-12 -left-10 w-64 h-64 bg-gradient-to-br from-[#00d4aa]/20 to-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-bl from-[#8b5cf6]/20 to-[#ec4899]/10 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute -bottom-12 left-1/4 w-80 h-80 bg-gradient-to-tr from-[#f59e0b]/15 to-[#10b981]/15 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* FLOATING DECORATIVE BADGE: TOP RIGHT (Edge Performance) */}
              <div className="animate-float-slow absolute -top-5 -right-3 sm:-right-4 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0b1120]/90 border border-[#00d4aa]/40 shadow-[0_10px_30px_-5px_rgba(0,212,170,0.3)] backdrop-blur-xl text-xs">
                <div className="w-7 h-7 rounded-lg bg-[#00d4aa]/20 border border-[#00d4aa]/40 flex items-center justify-center text-[#00d4aa]">
                  <SparklesIcon className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="font-bold text-white text-[11px] leading-tight">Next.js 16 + React 19</div>
                  <div className="text-[10px] text-[#00d4aa] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-ping" />
                    Edge SSR • 18ms Latency
                  </div>
                </div>
              </div>

              {/* FLOATING DECORATIVE BADGE: BOTTOM LEFT (IP Ownership) */}
              <div className="animate-float-reverse absolute -bottom-5 -left-3 sm:-left-4 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0f1026]/90 border border-[#8b5cf6]/40 shadow-[0_10px_30px_-5px_rgba(139,92,246,0.3)] backdrop-blur-xl text-xs">
                <div className="w-7 h-7 rounded-lg bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center text-[#c084fc]">
                  <ShieldCheckIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-[11px] leading-tight">100% IP Code Ownership</div>
                  <div className="text-[10px] text-[#c084fc] font-mono">Zero Lock-in • Clean Architecture</div>
                </div>
              </div>

              {/* FLOATING PILL: MID-RIGHT (Live CDN Status) */}
              <div className="absolute top-1/2 -right-4 translate-y-6 z-20 hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 border border-emerald-500/40 shadow-xl backdrop-blur-md text-[10px] font-mono text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Active Global CDN • 99.98% SLA</span>
              </div>

              {/* MAIN INTERACTIVE CONSOLE CONTAINER */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#0e1422]/95 via-[#0a0e18]/95 to-[#060911]/98 border border-white/12 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden group">
                
                {/* Neon Holographic Top Accent Bar */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00d4aa] via-[#38bdf8] via-[#8b5cf6] to-transparent animate-neon-pulse" />

                {/* Window Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                    <span className="w-3 h-3 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    <span className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    
                    <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-semibold tracking-wider">ENGINE LIVE</span>
                    </div>
                  </div>

                  {/* Multi-Color Mode Switcher Tabs */}
                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 text-[11px]">
                    {[
                      { id: 'saas', label: 'SaaS & Web', icon: CommandLineIcon, activeColor: 'bg-[#00d4aa] text-black shadow-[0_0_15px_rgba(0,212,170,0.4)]' },
                      { id: 'ai', label: 'AI & Agents', icon: CpuChipIcon, activeColor: 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]' },
                      { id: 'growth', label: 'Growth', icon: ChartBarIcon, activeColor: 'bg-[#10b981] text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' },
                      { id: 'products', label: 'Products', icon: ShoppingBagIcon, activeColor: 'bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = heroConsoleTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setHeroConsoleTab(tab.id as any)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all duration-200 ${
                            isActive
                              ? tab.activeColor
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Window Body: Visual Interactive Modes */}
                <div className="p-4 sm:p-5 space-y-4">

                  {/* ========================================================= */}
                  {/* TAB 1: SAAS & WEB ARCHITECTURE                           */}
                  {/* ========================================================= */}
                  {heroConsoleTab === 'saas' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      {/* Metric KPI Grid */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-[#38bdf8]/10 to-transparent border border-[#38bdf8]/20 relative overflow-hidden group/card hover:border-[#38bdf8]/40 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Latency</span>
                            <ServerIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                          </div>
                          <div className="text-lg sm:text-xl font-black text-white mt-1">18ms</div>
                          <div className="text-[10px] text-[#38bdf8] font-mono mt-0.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" /> Edge SSR
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-gradient-to-br from-[#00d4aa]/10 to-transparent border border-[#00d4aa]/20 relative overflow-hidden group/card hover:border-[#00d4aa]/40 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Security</span>
                            <ShieldCheckIcon className="w-3.5 h-3.5 text-[#00d4aa]" />
                          </div>
                          <div className="text-lg sm:text-xl font-black text-[#00d4aa] mt-1">100% RLS</div>
                          <div className="text-[10px] text-slate-300 font-mono mt-0.5">Tenant Isolation</div>
                        </div>

                        <div className="p-3 rounded-xl bg-gradient-to-br from-[#10b981]/10 to-transparent border border-[#10b981]/20 relative overflow-hidden group/card hover:border-[#10b981]/40 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Uptime</span>
                            <BoltIcon className="w-3.5 h-3.5 text-[#10b981]" />
                          </div>
                          <div className="text-lg sm:text-xl font-black text-white mt-1">99.98%</div>
                          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Automated Scale</div>
                        </div>
                      </div>

                      {/* Interactive Architecture Flow Stream */}
                      <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-white tracking-wide flex items-center gap-1.5">
                            <CommandLineIcon className="w-3.5 h-3.5 text-[#00d4aa]" /> Production Pipeline Flow
                          </span>
                          <span className="text-[10px] font-mono text-[#00d4aa] bg-[#00d4aa]/10 px-2 py-0.5 rounded-full border border-[#00d4aa]/20">
                            Zero-Downtime CI/CD
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center text-[10px] font-mono">
                          <div className="p-2 rounded-lg bg-white/[0.03] border border-blue-500/30 text-blue-300 font-semibold shadow-inner">
                            <div>01. Edge</div>
                            <div className="text-[9px] text-slate-400 font-normal mt-0.5">Next.js 16</div>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.03] border border-cyan-500/30 text-cyan-300 font-semibold shadow-inner">
                            <div>02. CAPI</div>
                            <div className="text-[9px] text-slate-400 font-normal mt-0.5">Server Event</div>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.03] border border-purple-500/30 text-purple-300 font-semibold shadow-inner">
                            <div>03. DB RLS</div>
                            <div className="text-[9px] text-slate-400 font-normal mt-0.5">PostgreSQL</div>
                          </div>
                          <div className="p-2 rounded-lg bg-white/[0.03] border border-emerald-500/30 text-emerald-300 font-semibold shadow-inner">
                            <div>04. Gateway</div>
                            <div className="text-[9px] text-slate-400 font-normal mt-0.5">bKash/Stripe</div>
                          </div>
                        </div>
                      </div>

                      {/* Live Code / Telemetry Terminal */}
                      <div className="p-3 rounded-xl bg-[#080c14] border border-white/8 font-mono text-[11px] leading-relaxed text-slate-300">
                        <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[10px] text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>telemetry@nextdigihome:~$ stream --live</span>
                          </div>
                          <span className="text-[#00d4aa]">HTTP/2 200 OK</span>
                        </div>
                        <div className="pt-2 space-y-1 text-[10px] sm:text-[11px]">
                          <div className="text-slate-400 flex items-center justify-between">
                            <span><span className="text-[#38bdf8]">GET</span> /api/v1/auth/session</span>
                            <span className="text-emerald-400">14ms [Edge-BGD]</span>
                          </div>
                          <div className="text-slate-400 flex items-center justify-between">
                            <span><span className="text-[#8b5cf6]">EXEC</span> syncTenantSchema(id: &quot;enterprise_app&quot;)</span>
                            <span className="text-emerald-400">RLS Enforced</span>
                          </div>
                          <div className="text-slate-400 flex items-center justify-between">
                            <span><span className="text-[#f59e0b]">DEPLOY</span> autoScaleWorker(cluster: 3)</span>
                            <span className="text-[#00d4aa]">Healthy</span>
                          </div>
                        </div>
                      </div>

                      {/* Mode Footer Callout */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-slate-400 text-[11px]">Enterprise full-stack software &amp; custom SaaS.</span>
                        <Link href="/solutions" className="text-[#00d4aa] font-bold hover:underline flex items-center gap-1">
                          Explore Solutions <ArrowRightIcon className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* TAB 2: AI & AGENTS ARCHITECTURE                           */}
                  {/* ========================================================= */}
                  {heroConsoleTab === 'ai' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      {/* AI Status Banner */}
                      <div className="p-3 rounded-xl bg-gradient-to-r from-[#8b5cf6]/15 via-[#6366f1]/15 to-transparent border border-[#8b5cf6]/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CpuChipIcon className="w-4 h-4 text-[#c084fc] animate-pulse" />
                          <span className="text-xs font-bold text-white">Autonomous Agentic Reasoning Engine</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 text-[10px] font-mono text-[#c084fc]">
                          Multi-Model LLM
                        </span>
                      </div>

                      {/* 4 Cognitive Nodes Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-black/40 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                          <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
                            <ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5" />
                            <span>01. Inbound Triage</span>
                          </div>
                          <p className="text-[10px] text-slate-300 mt-1 leading-normal">
                            WhatsApp, Facebook Messenger &amp; Webhook real-time intent parsing.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-black/40 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                          <div className="flex items-center gap-1.5 text-[#c084fc] text-xs font-bold">
                            <SparklesIcon className="w-3.5 h-3.5" />
                            <span>02. Vector RAG</span>
                          </div>
                          <p className="text-[10px] text-slate-300 mt-1 leading-normal">
                            Hybrid semantic search over product catalog, policies &amp; ERP inventory.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-black/40 border border-[#00d4aa]/20 hover:border-[#00d4aa]/40 transition-colors">
                          <div className="flex items-center gap-1.5 text-[#00d4aa] text-xs font-bold">
                            <WrenchScrewdriverIcon className="w-3.5 h-3.5" />
                            <span>03. Tool Execution</span>
                          </div>
                          <p className="text-[10px] text-slate-300 mt-1 leading-normal">
                            Automated CRM sync, order booking, invoice dispatch &amp; SMS delivery.
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-black/40 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                            <ShieldCheckIcon className="w-3.5 h-3.5" />
                            <span>04. Human In Loop</span>
                          </div>
                          <p className="text-[10px] text-slate-300 mt-1 leading-normal">
                            Instant escalation to supervisor when customer sentiment requires care.
                          </p>
                        </div>
                      </div>

                      {/* Agentic Prompt Execution Trace */}
                      <div className="p-3 rounded-xl bg-[#080b14] border border-white/8 font-mono text-[11px] leading-relaxed text-slate-300">
                        <div className="text-[10px] text-[#c084fc] flex items-center justify-between pb-1 border-b border-white/5">
                          <span>AGENT TRACE: OrderSupportBot_v2.4</span>
                          <span className="text-emerald-400">Confidence: 98.4%</span>
                        </div>
                        <div className="pt-2 space-y-1 text-[10px]">
                          <div className="text-slate-400">
                            <span className="text-[#38bdf8]">[User Prompt]</span> &quot;Can I track order #NDH-8821 and add express delivery?&quot;
                          </div>
                          <div className="text-slate-300">
                            <span className="text-[#c084fc]">[Reasoning]</span> Order found in ERP. Express delivery available (+BDT 100).
                          </div>
                          <div className="text-emerald-400">
                            <span className="text-[#00d4aa]">[Action Taken]</span> Invoice adjusted, bKash paylink generated, SMS dispatched.
                          </div>
                        </div>
                      </div>

                      {/* Mode Footer Callout */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-slate-400 text-[11px]">Deploy automated, revenue-producing AI workflows.</span>
                        <Link href="/ai" className="text-[#8b5cf6] font-bold hover:underline flex items-center gap-1">
                          Explore AI Automation <ArrowRightIcon className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* TAB 3: GROWTH & ADS ARCHITECTURE                          */}
                  {/* ========================================================= */}
                  {heroConsoleTab === 'growth' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      {/* Growth Metrics */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Server CAPI Match</div>
                          <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">99.4%</div>
                          <div className="text-[10px] text-slate-300 mt-0.5">Zero Signal Loss</div>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Average ROAS</div>
                          <div className="text-lg sm:text-xl font-black text-[#f59e0b] mt-0.5">4.6x</div>
                          <div className="text-[10px] text-slate-300 mt-0.5">Blended Channels</div>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Checkout Speed</div>
                          <div className="text-lg sm:text-xl font-black text-[#00d4aa] mt-0.5">&lt; 1.1s</div>
                          <div className="text-[10px] text-slate-300 mt-0.5">High-Converting</div>
                        </div>
                      </div>

                      {/* Growth Channels Matrix */}
                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/8 space-y-2.5">
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <ChartBarIcon className="w-4 h-4 text-emerald-400" /> Full-Funnel Acquisition Engine
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">+34% Revenue Lift</span>
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-slate-200">Meta Ads &amp; Server-Side Conversion API (CAPI)</span>
                            <span className="text-emerald-400 text-[11px] font-mono font-bold">Optimized</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-slate-200">Google Search &amp; Performance Max (High Intent)</span>
                            <span className="text-[#38bdf8] text-[11px] font-mono font-bold">High-ROAS</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-slate-200">Technical SEO &amp; Automated Abandoned Cart Recovery</span>
                            <span className="text-[#8b5cf6] text-[11px] font-mono font-bold">Predictable</span>
                          </div>
                        </div>
                      </div>

                      {/* Mode Footer Callout */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-slate-400 text-[11px]">Drive profitable, scalable customer acquisition.</span>
                        <Link href="/growth" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                          Explore Growth Services <ArrowRightIcon className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* TAB 4: LIVE PRODUCTION PRODUCTS                           */}
                  {/* ========================================================= */}
                  {heroConsoleTab === 'products' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      {/* Product Header */}
                      <div className="p-3 rounded-xl bg-gradient-to-r from-[#f97316]/15 via-[#f59e0b]/15 to-transparent border border-[#f97316]/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingBagIcon className="w-4 h-4 text-[#f97316]" />
                          <span className="text-xs font-bold text-white">Live SaaS Products &amp; Digital Assets</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#f97316]/20 border border-[#f97316]/40 text-[10px] font-mono text-[#f97316]">
                          Production Live
                        </span>
                      </div>

                      {/* 2 Live Product Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* Product 1: NextDigi Commerce */}
                        <div className="p-3 rounded-xl bg-black/40 border border-orange-500/20 hover:border-orange-500/40 transition-all group/prod">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#f97316] font-bold">E-Commerce SaaS</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1 group-hover/prod:text-[#f97316] transition-colors">
                            NextDigi Commerce
                          </h4>
                          <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                            Multi-vendor storefront, order ERP &amp; local bKash/Nagad checkout.
                          </p>
                          <a
                            href="https://commerce.nextdigihome.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#f97316] hover:underline"
                          >
                            Launch Live Demo <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Product 2: Garibondhu360 */}
                        <div className="p-3 rounded-xl bg-black/40 border-blue-500/20 hover:border-blue-500/40 transition-all group/prod">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#38bdf8] font-bold">Automotive Platform</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1 group-hover/prod:text-[#38bdf8] transition-colors">
                            Garibondhu360
                          </h4>
                          <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                            Vehicle inspection logs, dealer marketplace &amp; workshop CRM.
                          </p>
                          <a
                            href="https://garibondhu360.nextdigihome.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#38bdf8] hover:underline"
                          >
                            Launch Live Demo <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Mode Footer Callout */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-slate-400 text-[11px]">Ready-to-deploy web software and digital tools.</span>
                        <Link href="/store" className="text-[#f97316] font-bold hover:underline flex items-center gap-1">
                          Explore NextDigi Store <ArrowRightIcon className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                </div>

                {/* Ecosystem Connected Footer Banner */}
                <div className="px-5 py-3 bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                    <span>Part of the <strong>NEXTDIGIHOME</strong> Ecosystem</span>
                  </div>
                  <Link href="/store" className="text-[#00d4aa] hover:underline font-bold flex items-center gap-1">
                    NextDigi Store (Assets) &rarr;
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 02. WHAT WE DO                                                   */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-24 border-t border-white/8 bg-[#090d16]/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-xs font-bold tracking-wider text-[#00d4aa] uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
              WHAT WE DO
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5">
              Everything Your Business Needs to Go Digital
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              From building your digital foundation to automating operations and growing your online presence, NextDigiHome brings technology, AI and digital growth together in one ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CARD 01: BUILD */}
            <div className="p-6 rounded-2xl bg-[#0f1523]/90 border border-white/8 hover:border-[#00d4aa]/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/25 flex items-center justify-center text-[#00d4aa] mb-5 group-hover:scale-110 transition-transform">
                  <CodeBracketIcon className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00d4aa] mb-1">
                  CARD 01
                </div>
                <h3 className="text-xl font-bold text-white mb-2">BUILD</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mb-4">
                  Build the technology behind your business.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 border-t border-white/5 pt-4">
                  {['Web Development', 'E-commerce', 'Mobile Apps', 'Custom Software', 'SaaS'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-[#00d4aa] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5">
                <Link
                  href="/solutions"
                  className="text-xs font-bold text-[#00d4aa] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Solutions</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* CARD 02: AUTOMATE */}
            <div className="p-6 rounded-2xl bg-[#0f1523]/90 border border-white/8 hover:border-[#8b5cf6]/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 flex items-center justify-center text-[#8b5cf6] mb-5 group-hover:scale-110 transition-transform">
                  <CpuChipIcon className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8b5cf6] mb-1">
                  CARD 02
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AUTOMATE</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mb-4">
                  Make your business smarter with AI.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 border-t border-white/5 pt-4">
                  {['AI Agents', 'AI Chatbots', 'Workflow Automation', 'AI Support', 'API Integrations'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-[#8b5cf6] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5">
                <Link
                  href="/ai"
                  className="text-xs font-bold text-[#8b5cf6] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore AI</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* CARD 03: GROW */}
            <div className="p-6 rounded-2xl bg-[#0f1523]/90 border border-white/8 hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/25 flex items-center justify-center text-[#38bdf8] mb-5 group-hover:scale-110 transition-transform">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8] mb-1">
                  CARD 03
                </div>
                <h3 className="text-xl font-bold text-white mb-2">GROW</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mb-4">
                  Turn digital presence into measurable growth.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 border-t border-white/5 pt-4">
                  {['Social Media', 'Meta Ads', 'Google Ads', 'SEO', 'Analytics'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-[#38bdf8] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5">
                <Link
                  href="/growth"
                  className="text-xs font-bold text-[#38bdf8] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Growth</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* CARD 04: PRODUCTS */}
            <div className="p-6 rounded-2xl bg-[#0f1523]/90 border border-white/8 hover:border-[#f59e0b]/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/25 flex items-center justify-center text-[#f59e0b] mb-5 group-hover:scale-110 transition-transform">
                  <ShoppingBagIcon className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#f59e0b] mb-1">
                  CARD 04
                </div>
                <h3 className="text-xl font-bold text-white mb-2">PRODUCTS</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mb-4">
                  Ready-to-use technology and digital resources.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 border-t border-white/5 pt-4">
                  {['SaaS Products', 'Business Tools', 'Templates', 'eBooks', 'Digital Resources'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-[#f59e0b] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5">
                <Link
                  href="/store"
                  className="text-xs font-bold text-[#f59e0b] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Visit Store</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00d4aa] text-[#07090e] font-bold text-sm hover:bg-[#00e2b6] shadow-lg shadow-[#00d4aa]/20 transition-all"
            >
              <span>Explore Our Solutions</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 03. NEXTDIGI SOLUTIONS                                           */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <span className="w-4 h-px bg-[#00d4aa]" />
                NextDigi Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Technology that moves your business forward.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                We design and build modern digital solutions for businesses — from high-performance websites and e-commerce platforms to mobile apps, custom software and SaaS products.
              </p>
            </div>
            <Link
              href="/solutions"
              className="text-xs font-bold text-[#00d4aa] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore Solutions</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Web Development', desc: 'High-performance Next.js, React, and TypeScript business websites and portals.', icon: GlobeAltIcon, href: '/solutions/web-development' },
              { title: 'E-commerce Development', desc: 'Custom headless storefronts with bKash, Nagad, Stripe, and courier automated dispatch.', icon: ShoppingBagIcon, href: '/solutions/ecommerce' },
              { title: 'Mobile App Development', desc: 'Cross-platform iOS and Android apps engineered with Flutter, responsive state, and push alerts.', icon: DevicePhoneMobileIcon, href: '/solutions/mobile-app' },
              { title: 'Custom Software', desc: 'Bespoke ERPs, internal portals, database systems, and workflow engines tailored to your team.', icon: CommandLineIcon, href: '/solutions/custom-software' },
              { title: 'SaaS Development', desc: 'Multi-tenant subscription architectures with automated recurring billing and team access ACL.', icon: ServerIcon, href: '/solutions/saas-development' },
              { title: 'API & Integrations', desc: 'Seamless API orchestration connecting payment gateways, CRMs, logistics, and webhooks.', icon: ArrowsRightLeftIcon, href: '/solutions/api-integrations' },
              { title: 'Cloud / Hosting', desc: 'Enterprise cloud infrastructure, containerized Docker deployments, and CI/CD pipelines.', icon: WrenchScrewdriverIcon, href: '/solutions/hosting-maintenance' },
              { title: 'Maintenance & Support', desc: '24/7 server monitoring, security patching, Core Web Vitals optimization, and disaster recovery.', icon: ShieldCheckIcon, href: '/solutions/hosting-maintenance' },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="group p-5 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-[#00d4aa]/40 hover:bg-[#131b2e] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5">
                    <Link
                      href={card.href}
                      className="text-xs font-bold text-[#00d4aa] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Learn More</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#00d4aa] text-[#07090e] font-bold text-xs hover:bg-[#00e2b6] transition-all"
            >
              <span>Explore Solutions</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 04. NEXTDIGI AI                                                  */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-24 border-t border-white/8 bg-[#090d16]/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#8b5cf6] uppercase mb-3">
                <CpuChipIcon className="w-4 h-4 text-[#8b5cf6]" />
                NextDigi AI
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Make your business smarter with AI and automation.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                Use AI agents, intelligent automation and connected workflows to reduce repetitive work, improve customer experience and operate more efficiently.
              </p>
            </div>
            <Link
              href="/ai"
              className="text-xs font-bold text-[#8b5cf6] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore AI Solutions</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[
              { title: 'AI Agents', desc: 'Autonomous task-driven agents equipped with vector document retrieval and private tool execution.', icon: CpuChipIcon, href: '/ai/ai-agents' },
              { title: 'AI Chatbots', desc: 'Multi-channel conversational chatbots for WhatsApp, Facebook Messenger, and Web with 24/7 coverage.', icon: ChatBubbleBottomCenterTextIcon, href: '/ai/chatbots' },
              { title: 'AI Customer Support', desc: 'Intelligent ticket triage, contextual FAQ answering, and smooth human agent handoff.', icon: LifebuoyIcon, href: '/ai/ai-support' },
              { title: 'Business Automation', desc: 'Eliminate repetitive manual data entry between spreadsheets, accounting tools, and billing.', icon: BoltIcon, href: '/ai/automation' },
              { title: 'Workflow Automation', desc: 'Visual n8n and webhook pipelines connecting events across your tech stack with automatic retries.', icon: ArrowsRightLeftIcon, href: '/ai/automation' },
              { title: 'API Integrations', desc: 'Integrate external LLM engines securely into your internal database systems and legacy software.', icon: ServerIcon, href: '/solutions/api-integrations' },
              { title: 'AI Video', desc: 'Programmatic video generation, automated scripts, and localized multilingual video workflows.', icon: VideoCameraIcon, href: '/ai/ai-video' },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="group p-5 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-[#8b5cf6]/40 hover:bg-[#131b2e] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#8b5cf6] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5">
                    <Link
                      href={card.href}
                      className="text-xs font-bold text-[#8b5cf6] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Learn More</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/ai"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#8b5cf6] text-white font-bold text-xs hover:bg-[#7c3aed] transition-all shadow-md shadow-[#8b5cf6]/20"
            >
              <span>Explore AI Solutions</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 05. NEXTDIGI GROWTH                                              */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#38bdf8] uppercase mb-3">
                <ChartBarIcon className="w-4 h-4 text-[#38bdf8]" />
                NextDigi Growth
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Turn your digital presence into measurable business growth.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                Build a stronger digital presence with social media, paid advertising, SEO, analytics and conversion-focused marketing support.
              </p>
            </div>
            <Link
              href="/growth"
              className="text-xs font-bold text-[#38bdf8] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore Growth Solutions</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Social Media Management', desc: 'Consistent visual branding, creative copywriting, content calendar execution, and community engagement.', icon: ShareIcon, href: '/growth/social-media' },
              { title: 'Meta Ads', desc: 'High-velocity creative testing, precision demographic retargeting, and server-side Conversions API integration.', icon: MegaphoneIcon, href: '/growth/meta-ads' },
              { title: 'Google Ads', desc: 'Intent-driven search ads, Performance Max campaigns, and YouTube video ads tailored to high commercial value.', icon: MagnifyingGlassIcon, href: '/growth/google-ads' },
              { title: 'SEO', desc: 'Technical audits, Core Web Vitals speed optimization, and on-page keyword structures for organic search visibility.', icon: ChartBarIcon, href: '/growth/seo' },
              { title: 'Analytics', desc: 'Full-funnel attribution dashboards, Google Analytics 4 configuration, and custom conversion event tracking.', icon: PresentationChartLineIcon, href: '/growth/analytics' },
              { title: 'Conversion Tracking', desc: 'Server-side CAPI telemetry setup that recovers lost iOS attribution signals and tracks true ROI.', icon: CursorArrowRaysIcon, href: '/growth/meta-ads' },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="group p-5 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-[#38bdf8]/40 hover:bg-[#131b2e] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#38bdf8] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {card.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5">
                    <Link
                      href={card.href}
                      className="text-xs font-bold text-[#38bdf8] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Learn More</span>
                      <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/growth"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#38bdf8] text-black font-bold text-xs hover:bg-[#0284c7] hover:text-white transition-all shadow-md shadow-[#38bdf8]/20"
            >
              <span>Explore Growth Solutions</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 06. NEXTDIGI LABS                                                */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-24 border-t border-white/8 bg-[#090d16]/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#f59e0b] uppercase mb-3">
                <BeakerIcon className="w-4 h-4 text-[#f59e0b]" />
                NextDigi Labs
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Building SaaS products and technology for the future of business.
              </h2>
            </div>
            <Link
              href="/labs"
              className="text-xs font-bold text-[#f59e0b] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore NextDigi Labs</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                name: 'NextDigi Commerce',
                sub: 'AI-powered Ecommerce Automation',
                status: 'Live',
                statusClass: 'bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30',
                desc: 'Headless multi-channel storefront with instant local payment routing (bKash, Nagad) and automatic courier API dispatch.',
                url: 'https://commerce.nextdigihome.com/',
                cta: 'Explore Commerce',
                icon: ShoppingBagIcon,
              },
              {
                name: 'NextDigi Social',
                sub: 'AI Social Media Management & Automation',
                status: 'Coming Soon',
                statusClass: 'bg-white/5 text-slate-400 border border-white/10',
                desc: 'Manage Facebook, Instagram, LinkedIn, and TikTok from one unified dashboard with AI copywriter and post scheduler.',
                url: 'https://social.nextdigihome.com/',
                cta: 'Explore Platform',
                icon: ShareIcon,
              },
              {
                name: 'NextDigi Automate',
                sub: 'Business Workflow & AI Automation',
                status: 'Coming Soon',
                statusClass: 'bg-white/5 text-slate-400 border border-white/10',
                desc: 'Visual low-code canvas to connect webhooks, databases, CRMs, and email gateways into robust automated event pipelines.',
                url: 'https://automate.nextdigihome.com/',
                cta: 'Explore Platform',
                icon: BoltIcon,
              },
              {
                name: 'Garibondhu360',
                sub: 'Transport Management & Business Operations SaaS',
                status: 'Live',
                statusClass: 'bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30',
                desc: 'Cloud garage & automotive ERP with digital job-cards, barcode spare-parts inventory, and automated customer SMS alerts.',
                url: 'https://garibondhu360.nextdigihome.com/',
                cta: 'Explore Garibondhu360',
                icon: WrenchScrewdriverIcon,
              },
            ].map((prod) => {
              const Icon = prod.icon;
              return (
                <div
                  key={prod.name}
                  className="p-6 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${prod.statusClass}`}>
                        {prod.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{prod.name}</h3>
                    <p className="text-xs text-[#f59e0b] font-semibold mb-3">{prod.sub}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">{prod.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <a
                      href={prod.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-white hover:text-[#00d4aa] flex items-center gap-1.5 transition-colors"
                    >
                      <span>{prod.cta}</span>
                      <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-all"
            >
              <span>Explore NextDigi Labs</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 07. CASE STUDIES                                                 */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <span className="w-4 h-px bg-[#00d4aa]" />
                Case Studies
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Real Projects. Real Technology.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                Explore software, SaaS, e-commerce and business solutions built by the NextDigi ecosystem.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="text-xs font-bold text-[#00d4aa] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View All Case Studies</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'NextDigi Commerce Platform',
                category: 'Headless E-Commerce',
                desc: 'Engineered a high-speed headless storefront with native bKash and Nagad payment tokenization, paired with automated Pathao, Steadfast, and RedX courier webhook dispatch.',
                tech: 'Next.js 16 • TypeScript • Node.js • Redis • bKash API',
                href: '/labs/commerce',
              },
              {
                title: 'Garibondhu360 Automotive SaaS',
                category: 'Enterprise Workshop ERP',
                desc: 'A complete operating platform for automotive repair centers featuring digital job-cards, camera vehicle intake logs, barcode parts inventory, and automated customer SMS status.',
                tech: 'Next.js • Node.js API • PostgreSQL • Docker • SMS Gateway',
                href: '/labs/garibondhu360',
              },
              {
                title: 'NextDigi Headless Storefront',
                category: 'Source Code & Digital Product',
                desc: 'Production-ready e-commerce architecture with modular components, sub-second product page rendering, multi-currency pricing, and clean code documentation.',
                tech: 'Next.js 15 • React 19 • Tailwind CSS • Docker',
                href: '/products/nextdigi-headless-commerce',
              },
            ].map((cs, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-[#00d4aa]/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-[#00d4aa] w-fit mb-4">
                    {cs.category}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {cs.desc}
                  </p>
                  <div className="text-[11px] font-mono text-slate-500 mb-6 pb-4 border-b border-white/5">
                    {cs.tech}
                  </div>
                </div>
                <div>
                  <Link
                    href={cs.href}
                    className="text-xs font-bold text-[#00d4aa] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Case Study</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#00d4aa] text-[#07090e] font-bold text-xs hover:bg-[#00e2b6] transition-all shadow-md shadow-[#00d4aa]/20"
            >
              <span>View All Case Studies</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 08. BUILD • LAUNCH • AUTOMATE • GROW                             */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-24 border-t border-white/8 bg-[#090d16]/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-4 h-px bg-[#00d4aa]" />
              Core Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Build &bull; Launch &bull; Automate &bull; Grow
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              A transparent, sprint-based delivery cycle taking projects from architecture to scalable market operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'BUILD', subtitle: 'Plan → Design → Develop', desc: 'Requirements scoping, database modeling, and agile software development with modern TypeScript frameworks.' },
              { step: '02', title: 'LAUNCH', subtitle: 'Test → Deploy → Integrate', desc: 'Comprehensive testing, automated CI/CD deployment pipelines, and zero-downtime production cutover.' },
              { step: '03', title: 'AUTOMATE', subtitle: 'AI → Workflow → Operations', desc: 'Deploying autonomous AI agents, API webhooks, and event pipelines to eliminate manual bottlenecks.' },
              { step: '04', title: 'GROW', subtitle: 'Marketing → Analytics → Optimization', desc: 'Data-driven advertising, conversion rate optimization, technical SEO, and scaling customer acquisition.' },
            ].map((m) => (
              <div key={m.step} className="p-6 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-white/20 transition-all">
                <div className="text-3xl font-black text-white/10 mb-3">{m.step}</div>
                <h3 className="text-base font-bold text-white mb-1">{m.title}</h3>
                <div className="text-xs font-semibold text-[#00d4aa] mb-2">{m.subtitle}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 09. NEXTDIGI STORE                                               */}
      {/* ================================================================ */}
      <section id="featured-products" className="py-20 sm:py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <ShoppingBagIcon className="w-4 h-4 text-[#00d4aa]" />
                NextDigi Store
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Premium digital products, templates and business resources.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Curated selection of verified production codebases, Flutter app starters, and automation tools with instant access.
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="w-full md:w-72 relative shrink-0">
              <input
                type="text"
                placeholder="Search templates & source code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0f1523] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4aa]"
              />
              <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {[
              { id: 'all', label: 'Featured Products' },
              { id: 'source-code', label: 'Full-Stack Source Code' },
              { id: 'mobile-apps', label: 'Mobile App Templates' },
              { id: 'scripts', label: 'AI & Automation Scripts' },
              { id: 'business-tools', label: 'Business ERP & Tools' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategoryTab === tab.id
                    ? 'bg-[#00d4aa] text-black shadow-md shadow-[#00d4aa]/20'
                    : 'bg-[#0f1523] border border-white/8 text-slate-300 hover:border-white/20 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Grid (Curated 6-8 max) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group rounded-2xl bg-[#0f1523]/90 border border-white/8 hover:border-[#00d4aa]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-[#00d4aa]/5"
              >
                <div>
                  <div className="relative h-44 bg-[#0b0f19] border-b border-white/5 overflow-hidden group">
                    {(prod.thumbnail || prod.thumbnail_url || prod.image_url) ? (
                      <img
                        src={getProductImage(prod)}
                        alt={prod.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#162035] via-[#101726] to-[#090d16] flex items-center justify-center">
                        <CodeBracketIcon className="w-10 h-10 text-[#00d4aa]/60" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1523] via-transparent to-black/40 pointer-events-none" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0d121f]/90 text-[#00d4aa] border border-[#00d4aa]/30 backdrop-blur-md">
                        {prod.category_name || prod.category || 'Software'}
                      </span>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur border border-white/10">
                        Instant Access
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <Link
                      href={`/products/${prod.slug || prod.id}`}
                      className="block text-sm font-bold text-white hover:text-[#00d4aa] transition-colors line-clamp-1 mb-1.5"
                    >
                      {prod.name}
                    </Link>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {prod.description || 'Production-tested codebase with full documentation and setup guide.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">License</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-[#00d4aa]">
                        ৳{Number(prod.price).toLocaleString()}
                      </span>
                      {prod.compare_price && (
                        <span className="text-[11px] line-through text-slate-500">
                          ৳{Number(prod.compare_price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleAddToCart(e, prod)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-[#00d4aa] hover:text-black text-slate-300 transition-all border border-white/5"
                      title="Add to cart"
                    >
                      <ShoppingBagIcon className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/products/${prod.slug || prod.id}`}
                      className="px-3 py-2 rounded-xl bg-[#00d4aa]/10 hover:bg-[#00d4aa] hover:text-black text-[#00d4aa] font-bold text-xs transition-all border border-[#00d4aa]/25"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00d4aa] text-[#07090e] font-bold text-sm hover:bg-[#00e2b6] shadow-lg shadow-[#00d4aa]/20 transition-all"
            >
              <span>Visit NextDigi Store</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 10. TRUST / WHY BUSINESSES CHOOSE NEXTDIGI                       */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-24 border-t border-white/8 bg-[#090d16]/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
              Enterprise Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why Businesses Choose NextDigi
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Reliable engineering, transparent processes, and end-to-end ecosystem execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'End-to-End Technology', desc: 'From custom web and mobile platforms to cloud APIs, we deliver complete turn-key solutions under one roof.', icon: CommandLineIcon },
              { title: 'Custom Solutions', desc: 'Every application is tailored to your business model with complete 100% intellectual property ownership transfer.', icon: ShieldCheckIcon },
              { title: 'AI & Automation', desc: 'Deterministic AI agents and connected webhook pipelines that streamline repetitive operations and save overhead.', icon: CpuChipIcon },
              { title: 'Modern SaaS Architecture', desc: 'Engineered with Next.js, TypeScript, Node.js, and Docker for maximum concurrency, resilience, and speed.', icon: ServerIcon },
              { title: 'Scalable Solutions', desc: 'High-throughput system design built to support transaction surges and expanding business operations smoothly.', icon: BoltIcon },
              { title: 'Ongoing Support', desc: 'Milestone-based delivery, proactive server health monitoring, and reliable technical support when you need it.', icon: CheckCircleIcon },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ================================================================ */}
      {/* 11. FINAL CTA                                                    */}
      {/* ================================================================ */}
      <section className="py-20 sm:py-24 border-t border-white/8 bg-gradient-to-b from-[#090d16] via-[#0b1420] to-[#090d16]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-xs font-bold text-[#00d4aa] mb-6">
            <SparklesIcon className="w-4 h-4" />
            <span>Ready to Build Something Better?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            Ready to Build Something Better?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto mb-10">
            Tell us what you&apos;re building. We&apos;ll help you turn your idea into a practical digital solution.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00d4aa] text-black font-extrabold text-sm hover:bg-[#00e2b6] shadow-[0_0_35px_rgba(0,212,170,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
            >
              <span>Talk to Our Team</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
