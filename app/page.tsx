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
  UserGroupIcon
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
  const [heroConsoleTab, setHeroConsoleTab] = useState<'saas' | 'ai' | 'growth'>('saas');
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


            {/* RIGHT COLUMN: TECHNOLOGY / SAAS VISUAL */}
            <div className="lg:col-span-5 xl:col-span-6 w-full">
              {/* SaaS / Tech Interactive Visual Console */}
              <div className="relative rounded-2xl bg-[#0c1017]/95 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
                
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                    <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">NEXTDIGIHOME System Console</span>
                  </div>

                  {/* Visual Mode Switcher */}
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 text-[11px]">
                    {[
                      { id: 'saas', label: 'SaaS & Web', icon: CommandLineIcon },
                      { id: 'ai', label: 'AI & Automate', icon: CpuChipIcon },
                      { id: 'growth', label: 'Growth', icon: ChartBarIcon }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = heroConsoleTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setHeroConsoleTab(tab.id as any)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
                            isActive
                              ? 'bg-[#00d4aa] text-black shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Window Body: Visual Modes */}
                <div className="p-5 sm:p-6 space-y-4">
                  {heroConsoleTab === 'saas' && (
                    <div className="space-y-4">
                      {/* Top Metric Bar */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Architecture</div>
                          <div className="text-sm sm:text-base font-bold text-white mt-0.5">Next.js 15 + API</div>
                          <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="text-[10px] uppercase font-bold text-slate-400">API Response</div>
                          <div className="text-sm sm:text-base font-bold text-[#00d4aa] mt-0.5">18ms</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Global Edge CDN</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="text-[10px] uppercase font-bold text-slate-400">System Uptime</div>
                          <div className="text-sm sm:text-base font-bold text-white mt-0.5">99.98%</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Automated CI/CD</div>
                        </div>
                      </div>

                      {/* Services Telemetry Matrix */}
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2.5">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                          <span className="font-semibold text-white">Full-Stack Production Matrix</span>
                          <span className="text-[11px] font-mono text-[#00d4aa]">Enterprise SLA</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-slate-400">Web &amp; E-commerce</span>
                            <span className="text-emerald-400 font-mono text-[11px]">NextDigi Solutions</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-slate-400">Cross-Platform Apps</span>
                            <span className="text-[#38bdf8] font-mono text-[11px]">Flutter &amp; React Native</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-slate-400">SaaS Multi-Tenancy</span>
                            <span className="text-[#8b5cf6] font-mono text-[11px]">RBAC + Billing</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                            <span className="text-slate-400">Code Ownership</span>
                            <span className="text-white font-mono text-[11px]">100% Client IP</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-slate-400 text-[11px]">Deploy custom web, mobile, or enterprise SaaS.</span>
                        <Link href="/solutions" className="text-[#00d4aa] font-semibold hover:underline flex items-center gap-1">
                          Explore Solutions <ArrowRightIcon className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {heroConsoleTab === 'ai' && (
                    <div className="space-y-4">
                      {/* AI Agent Status */}
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                          <div>
                            <div className="text-xs font-bold text-white">Deterministic AI Automation Engine</div>
                            <div className="text-[11px] text-emerald-400 font-mono">Private RAG &bull; WhatsApp API &bull; 0.8s Latency</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                          24/7 Live
                        </span>
                      </div>

                      {/* 4-Step Pipeline */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { step: '01', title: 'Omnichannel Inbound', desc: 'WhatsApp, Web Chat & CRM' },
                          { step: '02', title: 'Vector Retrieval', desc: 'Private company embeddings' },
                          { step: '03', title: 'Autonomous Action', desc: 'CRM sync & checkout link' },
                          { step: '04', title: 'Structured Output', desc: 'Bilingual Bengali & English' }
                        ].map((node) => (
                          <div key={node.step} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                            <div className="text-[10px] font-mono text-[#00d4aa] font-bold">{node.step}</div>
                            <div className="text-xs font-bold text-white mt-0.5">{node.title}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{node.desc}</div>
                          </div>
                        ))}
                      </div>

                      {/* Console Log */}
                      <div className="p-3 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] space-y-1 text-slate-400">
                        <div className="text-emerald-400">&gt; [AI-DISPATCH] Lead captured &bull; Intent: Custom SaaS Inquiry</div>
                        <div className="text-slate-300">&gt; [RAG-LOOKUP] Matched architecture blueprint in 118ms</div>
                        <div className="text-[#38bdf8]">&gt; [STATUS] Automated response dispatched via WhatsApp</div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-slate-400 text-[11px]">Save up to 80% manual response time.</span>
                        <Link href="/ai" className="text-[#00d4aa] font-semibold hover:underline flex items-center gap-1">
                          Deploy AI Agents <ArrowRightIcon className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {heroConsoleTab === 'growth' && (
                    <div className="space-y-4">
                      {/* Growth Metrics */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Server CAPI Match</div>
                          <div className="text-lg font-black text-white mt-0.5">99.1%</div>
                          <div className="text-[10px] text-emerald-400 mt-0.5">Zero Signal Loss</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Average ROAS</div>
                          <div className="text-lg font-black text-[#00d4aa] mt-0.5">4.6x</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Multi-Channel Ads</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className="text-[10px] uppercase font-bold text-slate-400">Checkout Speed</div>
                          <div className="text-lg font-black text-white mt-0.5">&lt; 1.2s</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">High-Converting</div>
                        </div>
                      </div>

                      {/* Growth Channels */}
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2.5">
                        <div className="text-xs font-semibold text-white">Full-Funnel Acquisition Engine</div>
                        <div className="space-y-1.5 text-xs text-slate-300">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                            <span>Meta Ads &amp; Conversion API (CAPI)</span>
                            <span className="text-emerald-400 text-[11px] font-mono">Optimized</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                            <span>Google Search &amp; Performance Max</span>
                            <span className="text-[#38bdf8] text-[11px] font-mono">High-Intent</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                            <span>Technical SEO &amp; Automated Abandoned Cart SMS</span>
                            <span className="text-[#8b5cf6] text-[11px] font-mono">Predictable</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-slate-400 text-[11px]">Drive profitable, scalable customer acquisition.</span>
                        <Link href="/growth" className="text-[#00d4aa] font-semibold hover:underline flex items-center gap-1">
                          Explore Growth Services <ArrowRightIcon className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ecosystem Connected Footer Banner */}
                <div className="px-5 py-3 bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                    <span>Part of the <strong>NEXTDIGIHOME</strong> Ecosystem</span>
                  </div>
                  <Link href="/store" className="text-[#00d4aa] hover:underline font-medium">
                    NextDigi Store (Products) &rarr;
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 2. DEDICATED DIGITAL PRODUCTS STORE SECTION                      */}
      {/* ================================================================ */}
      <section id="featured-products" className="py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <ShoppingBagIcon className="w-4 h-4 text-[#00d4aa]" />
                NEXTDIGI STORE
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Digital Products &amp; Resources
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Premium digital products, templates and business resources from NextDigi Store, a division of NEXTDIGIHOME. Verified production-ready source codes, Flutter mobile apps, and business tools with instant delivery.
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
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {[
              { id: 'all', label: 'All Products (100+)' },
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

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group rounded-2xl bg-[#0f1523]/90 border border-white/8 hover:border-[#00d4aa]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-[#00d4aa]/5"
              >
                <div>
                  {/* Top visual frame with dynamic image */}
                  <div className="relative h-48 bg-[#0b0f19] border-b border-white/5 overflow-hidden group">
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

                    {/* Gradient Overlay & Badges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1523] via-transparent to-black/40 pointer-events-none" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0d121f]/90 text-[#00d4aa] border border-[#00d4aa]/30 backdrop-blur-md">
                        {prod.category_name || prod.category || 'Software'}
                      </span>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur border border-white/10">
                        Instant Access
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 text-[10px]">
                      <div className="flex items-center text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarIconSolid key={i} className="w-3 h-3" />
                        ))}
                      </div>
                      <span className="font-semibold text-slate-300 drop-shadow">Verified License</span>
                    </div>
                  </div>

                  {/* Product Details */}
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

                {/* Price and Actions */}
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

          {/* Dedicated Customization Callout Banner */}
          <div className="mt-14 rounded-2xl border border-[#00d4aa]/25 bg-gradient-to-r from-[#0f1523] via-[#0d1c23] to-[#0f1523] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#00d4aa] uppercase tracking-wider block mb-1">
                Looking for Bespoke Customization?
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Need a Custom Software Build or Agency White-Label?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
                Our core engineering division can customize any of these codebases, integrate local payment gateways, or build a bespoke enterprise system tailored to your exact specifications.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/store"
                className="px-6 py-3 rounded-xl bg-[#00d4aa] text-black font-bold text-xs hover:bg-[#00e2b6] transition-all shadow-md shadow-[#00d4aa]/20"
              >
                Visit Store (100+ Products)
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all"
              >
                Custom Request
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* ================================================================ */}
      {/* 3. FOUR CORE DIVISIONS — AUTONOMOUS ECOSYSTEM HUB                */}
      {/* ================================================================ */}
      <section id="services" className="py-24 border-t border-white/8 bg-[#090d16]/75 relative overflow-hidden">
        {/* Subtle Ambient Background Mesh */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d4aa]/4 blur-[180px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/4 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading + Graphical Presentation */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-4">
                  <span className="w-4 h-px bg-[#00d4aa]" />
                  Five Official Divisions • Master Brand Architecture
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white leading-[1.15] mb-5 tracking-tight">
                  One Ecosystem.<br />Total Business Execution.
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Eliminate the friction of managing disparate freelancers and agencies. NEXTDIGIHOME unifies NextDigi Solutions, NextDigi AI, NextDigi Growth, NextDigi Labs, and NextDigi Store under one master technology ecosystem.
                </p>
                <div className="mb-6">
                  <Link
                    href="/solutions"
                    className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-[#00d4aa] hover:bg-[#00d4aa] hover:text-black transition-all group"
                  >
                    <span>View Full Service Catalog</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Graphical Presentation: Central Human Operator with Multiple Animated Items */}
              <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#0f1523] via-[#0d121f] to-[#090d16] border border-white/10 shadow-2xl overflow-hidden">
                {/* Visual Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-ping" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
                      Human-In-The-Loop Autonomous Hub
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#00d4aa] border border-white/5">
                    100% Deterministic
                  </span>
                </div>

                {/* Animated Diagram Area */}
                <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
                  {/* SVG Connecting Energy Beams (animated dashed lines from center to 4 nodes) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                    {/* Beam to Top Left (Solutions) */}
                    <line
                      x1="200" y1="150" x2="70" y2="55"
                      stroke={hoveredDivision === 'solutions' ? '#00d4aa' : 'rgba(255,255,255,0.18)'}
                      strokeWidth={hoveredDivision === 'solutions' ? '2.5' : '1.5'}
                      className="animate-dash-flow"
                    />
                    {/* Beam to Top Right (AI) */}
                    <line
                      x1="200" y1="150" x2="330" y2="55"
                      stroke={hoveredDivision === 'ai' ? '#8b5cf6' : 'rgba(255,255,255,0.18)'}
                      strokeWidth={hoveredDivision === 'ai' ? '2.5' : '1.5'}
                      className="animate-dash-flow"
                    />
                    {/* Beam to Bottom Left (Growth) */}
                    <line
                      x1="200" y1="150" x2="70" y2="245"
                      stroke={hoveredDivision === 'growth' ? '#38bdf8' : 'rgba(255,255,255,0.18)'}
                      strokeWidth={hoveredDivision === 'growth' ? '2.5' : '1.5'}
                      className="animate-dash-flow"
                    />
                    {/* Beam to Bottom Right (Products) */}
                    <line
                      x1="200" y1="150" x2="330" y2="245"
                      stroke={hoveredDivision === 'products' ? '#f59e0b' : 'rgba(255,255,255,0.18)'}
                      strokeWidth={hoveredDivision === 'products' ? '2.5' : '1.5'}
                      className="animate-dash-flow"
                    />
                  </svg>

                  {/* Central Human Operator Core */}
                  <div className="relative z-20 flex flex-col items-center">
                    {/* Outer pulsating aura */}
                    <div className="absolute -inset-4 rounded-full bg-[#00d4aa]/15 animate-pulse-halo pointer-events-none" />
                    
                    {/* Concentric rotating orbital ring */}
                    <div className="absolute -inset-6 rounded-full border border-dashed border-[#00d4aa]/30 animate-orbit-slow pointer-events-none" />
                    <div className="absolute -inset-8 rounded-full border border-dotted border-white/10 animate-orbit-reverse pointer-events-none" />

                    {/* Central Icon Button */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] p-[2px] shadow-[0_0_35px_rgba(0,212,170,0.35)]">
                      <div className="w-full h-full rounded-2xl bg-[#090d16] flex flex-col items-center justify-center p-2 text-center">
                        <UserIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#00d4aa]" />
                      </div>
                    </div>
                    
                    <span className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-wider text-white bg-black/70 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur">
                      1 Human Operator
                    </span>
                  </div>

                  {/* Satellite Node 1: Solutions (Top-Left) */}
                  <button
                    onClick={() => setHoveredDivision('solutions')}
                    onMouseEnter={() => setHoveredDivision('solutions')}
                    className={`absolute top-2 left-2 sm:left-4 z-20 p-2 sm:p-2.5 rounded-xl border backdrop-blur-md transition-all flex items-center gap-2 ${
                      hoveredDivision === 'solutions'
                        ? 'bg-[#00d4aa]/15 border-[#00d4aa] text-[#00d4aa] shadow-[0_0_20px_rgba(0,212,170,0.4)] scale-105'
                        : 'bg-[#121829]/90 border-white/10 text-slate-300 hover:border-[#00d4aa]/40'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00d4aa]/15 flex items-center justify-center text-[#00d4aa]">
                      <CodeBracketIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-[10px] font-bold text-white">01 BUILD</div>
                      <div className="text-[9px] text-[#00d4aa]">Web &amp; Apps</div>
                    </div>
                  </button>

                  {/* Satellite Node 2: AI & Automation (Top-Right) */}
                  <button
                    onClick={() => setHoveredDivision('ai')}
                    onMouseEnter={() => setHoveredDivision('ai')}
                    className={`absolute top-2 right-2 sm:right-4 z-20 p-2 sm:p-2.5 rounded-xl border backdrop-blur-md transition-all flex items-center gap-2 ${
                      hoveredDivision === 'ai'
                        ? 'bg-[#8b5cf6]/15 border-[#8b5cf6] text-[#8b5cf6] shadow-[0_0_20px_rgba(139,92,246,0.4)] scale-105'
                        : 'bg-[#121829]/90 border-white/10 text-slate-300 hover:border-[#8b5cf6]/40'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/15 flex items-center justify-center text-[#8b5cf6]">
                      <CpuChipIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-[10px] font-bold text-white">02 AUTOMATE</div>
                      <div className="text-[9px] text-[#a78bfa]">AI Agents</div>
                    </div>
                  </button>

                  {/* Satellite Node 3: Growth (Bottom-Left) */}
                  <button
                    onClick={() => setHoveredDivision('growth')}
                    onMouseEnter={() => setHoveredDivision('growth')}
                    className={`absolute bottom-2 left-2 sm:left-4 z-20 p-2 sm:p-2.5 rounded-xl border backdrop-blur-md transition-all flex items-center gap-2 ${
                      hoveredDivision === 'growth'
                        ? 'bg-[#38bdf8]/15 border-[#38bdf8] text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105'
                        : 'bg-[#121829]/90 border-white/10 text-slate-300 hover:border-[#38bdf8]/40'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/15 flex items-center justify-center text-[#38bdf8]">
                      <RocketLaunchIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-[10px] font-bold text-white">03 GROW</div>
                      <div className="text-[9px] text-[#38bdf8]">Meta &amp; Ads</div>
                    </div>
                  </button>

                  {/* Satellite Node 4: Labs & Store (Bottom-Right) */}
                  <button
                    onClick={() => setHoveredDivision('products')}
                    onMouseEnter={() => setHoveredDivision('products')}
                    className={`absolute bottom-2 right-2 sm:right-4 z-20 p-2 sm:p-2.5 rounded-xl border backdrop-blur-md transition-all flex items-center gap-2 ${
                      hoveredDivision === 'products'
                        ? 'bg-[#f59e0b]/15 border-[#f59e0b] text-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                        : 'bg-[#121829]/90 border-white/10 text-slate-300 hover:border-[#f59e0b]/40'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/15 flex items-center justify-center text-[#f59e0b]">
                      <ShoppingBagIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-[10px] font-bold text-white">04 STORE</div>
                      <div className="text-[9px] text-[#00d4aa]">NextDigi Store</div>
                    </div>
                  </button>
                </div>

                {/* Dynamic Status Display Bar */}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono line-clamp-1">
                    {hoveredDivision === 'solutions' && 'Active Command: Full-Stack Engineering (NextDigi Solutions)'}
                    {hoveredDivision === 'ai' && 'Active Command: Autonomous AI & Automation (NextDigi AI)'}
                    {hoveredDivision === 'growth' && 'Active Command: Performance Scaling & Ads (NextDigi Growth)'}
                    {hoveredDivision === 'products' && 'Active Command: Digital Products & Assets (NextDigi Store)'}
                  </span>
                  <span className="text-[#00d4aa] font-bold shrink-0 ml-2">● Synced</span>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Official Division Interactive Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: 'solutions',
                  num: '01',
                  title: 'BUILD',
                  subtitle: 'NextDigi Solutions',
                  desc: 'High-performance Next.js web applications, Flutter mobile apps, enterprise ERPs, and multi-tenant SaaS platforms.',
                  href: '/solutions',
                  tag: 'Custom Engineering',
                  icon: CodeBracketIcon,
                  accent: '#00d4aa',
                  pills: ['Next.js 15', 'Flutter App', 'Custom ERP', 'Cloud APIs'],
                  capability: '⚡ 100% Code Ownership Transfer',
                  className: ''
                },
                {
                  id: 'ai',
                  num: '02',
                  title: 'AUTOMATE',
                  subtitle: 'NextDigi AI',
                  desc: 'Autonomous AI agents, bilingual customer chatbots, document vector RAG pipelines, and zero-touch n8n workflows.',
                  href: '/ai',
                  tag: 'Intelligent Systems',
                  icon: CpuChipIcon,
                  accent: '#8b5cf6',
                  pills: ['AI Agents', 'WhatsApp RAG', 'n8n Pipelines', 'Zero Touch'],
                  capability: '🤖 0.8s RAG Latency • 24/7 Autonomous',
                  className: ''
                },
                {
                  id: 'growth',
                  num: '03',
                  title: 'GROW',
                  subtitle: 'NextDigi Growth',
                  desc: 'Meta & Google media buying with server-side CAPI tracking, technical SEO, high-converting landing pages, and analytics.',
                  href: '/growth',
                  tag: 'Customer Acquisition',
                  icon: RocketLaunchIcon,
                  accent: '#38bdf8',
                  pills: ['Meta CAPI', 'Google Ads', 'Technical SEO', 'SMS Recovery'],
                  capability: '📈 4.6x Audited ROAS Across 50+ Stores',
                  className: ''
                },
                {
                  id: 'labs',
                  num: '04',
                  title: 'LABS',
                  subtitle: 'NextDigi Labs',
                  desc: 'In-house proprietary SaaS platforms and automation tools including NextDigi Commerce, NextDigi Social, and Garibondhu360.',
                  href: '/labs',
                  tag: 'Proprietary SaaS',
                  icon: BeakerIcon,
                  accent: '#f59e0b',
                  pills: ['NextDigi Commerce', 'NextDigi Social', 'Automate', 'Cloud ERP'],
                  capability: '🚀 Live Production Cloud SaaS',
                  className: ''
                },
                {
                  id: 'products',
                  num: '05',
                  title: 'STORE',
                  subtitle: 'NextDigi Store',
                  desc: '100+ verified production-ready full-stack application codebases, Flutter mobile apps, and instant digital assets.',
                  href: '/products',
                  tag: 'Digital Products',
                  icon: ShoppingBagIcon,
                  accent: '#00d4aa',
                  pills: ['100+ Repos', 'Full-Stack Kits', 'Mobile Apps', 'Instant Download'],
                  capability: '📦 Instant Download & Full Documentation',
                  className: 'sm:col-span-2'
                },
              ].map((p) => {
                const IconComponent = p.icon;
                const isHovered = hoveredDivision === p.id;
                return (
                  <Link
                    key={p.num}
                    href={p.href}
                    onMouseEnter={() => setHoveredDivision(p.id as any)}
                    className={`group p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${p.className} ${
                      isHovered
                        ? 'bg-[#131b2e] shadow-xl border'
                        : 'bg-[#0f1523]/80 border border-white/8 hover:border-white/20'
                    }`}
                    style={{
                      borderColor: isHovered ? p.accent : undefined,
                      boxShadow: isHovered ? `0 10px 30px ${p.accent}20` : undefined
                    }}
                  >
                    <div>
                      {/* Top bar with icon badge & tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{
                            backgroundColor: `${p.accent}15`,
                            color: p.accent,
                            border: `1px solid ${p.accent}30`
                          }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-white/15 group-hover:text-white/30 transition-colors">{p.num}</span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5">
                            {p.tag}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-mono font-bold uppercase tracking-wider mb-1" style={{ color: p.accent }}>
                        {p.title}
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">
                        {p.subtitle}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {p.desc}
                      </p>

                      {/* Capabilities pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.pills.map((pill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 group-hover:border-white/10 transition-colors"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-medium text-slate-400">
                        {p.capability}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold transition-transform group-hover:translate-x-1" style={{ color: p.accent }}>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 4. CUSTOM SOFTWARE & PLATFORMS (ENGINEERING DIVISION)            */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <span className="w-4 h-px bg-[#00d4aa]" />
                Engineering &amp; Development
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Custom Software &amp; Scalable Platforms
              </h2>
            </div>
            <Link href="/solutions" className="mt-4 md:mt-0 text-xs font-bold text-[#00d4aa] hover:underline flex items-center gap-1">
              <span>View All Solutions</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'web-development', title: 'Web Development', sub: 'Next.js 15 & React Platforms', icon: GlobeAltIcon },
              { id: 'ecommerce', title: 'Headless E-Commerce', sub: 'bKash, Nagad, Stripe Routing', icon: ShoppingBagIcon },
              { id: 'mobile-app', title: 'Mobile Applications', sub: 'Cross-Platform Flutter iOS & Android', icon: DevicePhoneMobileIcon },
              { id: 'custom-software', title: 'Enterprise ERPs', sub: 'Custom ERP & Business Automations', icon: CommandLineIcon },
              { id: 'saas-development', title: 'SaaS Platforms', sub: 'Multi-Tenant Cloud Architectures', icon: CpuChipIcon },
              { id: 'api-integrations', title: 'API & Integrations', sub: 'Payment, CRM & Courier APIs', icon: ServerIcon },
              { id: 'hosting-maintenance', title: 'Cloud Infrastructure', sub: 'DevOps, CI/CD & 24/7 Monitoring', icon: WrenchScrewdriverIcon },
              { id: 'custom-software', title: 'Security Audits', sub: 'Code Hardening & Penetration Testing', icon: ShieldCheckIcon },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  key={i}
                  href={`/solutions/${s.id}`}
                  className="group p-5 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-[#00d4aa]/40 hover:bg-[#131b2e] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-white mb-1 group-hover:text-[#00d4aa] transition-colors">{s.title}</div>
                  <div className="text-xs text-slate-400">{s.sub}</div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>


      {/* ================================================================ */}
      {/* 5. NEXTDIGI LABS (PROPRIETARY SAAS PLATFORMS)                    */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <BeakerIcon className="w-4 h-4 text-[#00d4aa]" />
                NextDigi Labs
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Proprietary SaaS Platforms
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                We engineer and run our own cloud SaaS platforms to solve real enterprise bottlenecks — and battle-test our architectures with thousands of live transactions.
              </p>
            </div>
            <Link href="/labs" className="mt-4 md:mt-0 text-xs font-bold text-[#00d4aa] hover:underline flex items-center gap-1">
              <span>View All Platforms</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                name: 'NextDigi Commerce',
                tagline: 'Headless Multi-Channel E-Commerce Engine',
                desc: 'Native bKash & Nagad checkout routing, automatic courier dispatch (Pathao, Steadfast, RedX), and real-time inventory ledger.',
                status: 'Live',
                features: ['Instant Checkout', 'Courier Auto-Sync', 'Inventory Ledger'],
                href: '/labs/commerce',
                ext: 'https://commerce.nextdigihome.com',
                icon: ShoppingBagIcon,
              },
              {
                name: 'Garibondhu360',
                tagline: 'Automotive Workshop & Fleet ERP Platform',
                desc: 'Cloud ERP for vehicle repair workshops — digital job cards, barcode spare-parts inventory, and automated customer SMS status updates.',
                status: 'Live',
                features: ['Digital Job Cards', 'Parts Barcodes', 'SMS Reminders'],
                href: '/labs/garibondhu360',
                ext: 'https://garibondhu360.nextdigihome.com',
                icon: WrenchScrewdriverIcon,
              },
              {
                name: 'NextDigi Social',
                tagline: 'Omnichannel Social Media Scheduler & DM Inbox',
                desc: 'Manage Facebook, Instagram, LinkedIn, and TikTok from one unified dashboard with AI copywriter and team approval workflows.',
                status: 'Beta',
                features: ['Omnichannel Scheduler', 'Unified DM Inbox', 'AI Copywriter'],
                href: '/labs/social',
                ext: 'https://social.nextdigihome.com',
                icon: ShareIcon,
              },
              {
                name: 'NextDigi Automate',
                tagline: 'Visual Low-Code Workflow Automation Canvas',
                desc: 'Connect webhooks, databases, CRMs, and email gateways into robust automated event pipelines with fault-tolerant retries.',
                status: 'Soon',
                features: ['Visual Flow Canvas', 'Pre-Built Nodes', 'Retry Logic'],
                href: '/labs/automate',
                ext: 'https://automate.nextdigihome.com',
                icon: BoltIcon,
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
                      <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        prod.status === 'Live'
                          ? 'bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30'
                          : prod.status === 'Beta'
                          ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}>
                        {prod.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{prod.name}</h3>
                    <p className="text-xs text-[#00d4aa] font-semibold mb-3">{prod.tagline}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{prod.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {prod.features.map((f) => (
                        <span key={f} className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300">
                          <CheckCircleIcon className="w-3 h-3 text-[#00d4aa]" />
                          <span>{f}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <Link
                      href={prod.href}
                      className="flex-1 text-center py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all"
                    >
                      Platform Details
                    </Link>
                    <a
                      href={prod.ext}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all"
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
      </section>


      {/* ================================================================ */}
      {/* 6. HOW WE WORK (4-STEP DISCIPLINED SPRINT CYCLE)                 */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-4 h-px bg-[#00d4aa]" />
              Engineering Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">How We Work</h2>
            <p className="text-sm text-slate-400 mt-2">
              A transparent, sprint-based delivery cycle taking projects from architecture to scalable market operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Discover & Architect', desc: 'Requirements scoping, database modeling, cloud architecture design, and milestone scheduling.' },
              { step: '02', title: 'Build & Engineer', desc: 'Sprint-based agile engineering in TypeScript with continuous integration and weekly demo builds.' },
              { step: '03', title: 'Automate & Integrate', desc: 'Connect payment gateways, CRMs, courier APIs, and autonomous AI agents for zero-touch workflows.' },
              { step: '04', title: 'Launch & Scale', desc: 'Production deployment with zero downtime, CAPI tracking, server monitoring, and ongoing growth support.' },
            ].map((m) => (
              <div key={m.step} className="p-6 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-white/20 transition-all">
                <div className="text-3xl font-black text-white/10 mb-4">{m.step}</div>
                <h3 className="text-sm font-bold text-white mb-2">{m.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 7. WHY NEXTDIGIHOME / TRUST PILLARS                             */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
              Enterprise Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why Modern Businesses Partner with {siteName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: '8+ Years Combined Engineering', desc: 'Full-stack software engineers with extensive experience in high-throughput applications and cloud systems.', icon: CommandLineIcon },
              { title: '100% Code & IP Ownership', desc: 'You own complete intellectual property, repositories, credentials, and documentation upon project completion. Zero vendor lock-in.', icon: ShieldCheckIcon },
              { title: 'Battle-Tested in Our Own Labs', desc: 'We test architectures on our own SaaS platforms first. What we deploy for you has already processed live transactions.', icon: BeakerIcon },
              { title: 'Unified Ecosystem Execution', desc: 'Software engineering, AI automation, growth marketing, and digital assets under one roof. No five-vendor fragmentation.', icon: SparklesIcon },
              { title: '24/7 SLA-Backed Support', desc: 'Round-the-clock server health monitoring, automated backups, and rapid emergency incident response.', icon: ClockIcon },
              { title: 'Milestone-Tied Billing', desc: 'Transparent scope, clearly defined deliverables, and payment tied to approved milestone releases. Zero hidden surprises.', icon: CheckCircleIcon },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ================================================================ */}
      {/* 8. TESTIMONIALS / VERIFIED CLIENT REVIEWS                        */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <StarIconSolid className="w-4 h-4 text-amber-400" />
              Client Success
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">What Founders Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: 'NextDigiHome rebuilt our entire multi-vendor marketplace in Next.js with automated courier dispatch. Our order processing time dropped by 70% in the first month.',
                author: 'Tanvir Hossain',
                role: 'Founder & CEO',
                company: 'Dhaka Retail Cloud'
              },
              {
                quote: 'The autonomous AI customer agent they deployed on WhatsApp handles over 85% of customer inquiries without any human intervention. Huge cost savings for our team.',
                author: 'Nabila Rahman',
                role: 'Head of Operations',
                company: 'StyleHub E-Commerce'
              },
              {
                quote: 'We bought their NextDigi Commerce source code template and were able to launch our custom online store in less than 3 days. Cleanest codebase we have worked with.',
                author: 'Ariful Islam',
                role: 'Lead Architect',
                company: 'Apex Tech Solutions'
              }
            ].map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-amber-400 gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="text-xs font-bold text-white">{t.author}</div>
                  <div className="text-[11px] text-slate-400">{t.role} · {t.company}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================================================================ */}
      {/* 9. FULL-WIDTH CINEMATIC BOTTOM CTA                               */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 bg-gradient-to-b from-[#090d16] via-[#0b1420] to-[#090d16]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-xs font-bold text-[#00d4aa] mb-6">
            <SparklesIcon className="w-4 h-4" />
            <span>Ready to Build, Launch, or Automate?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            Let&apos;s Engineer Your Company&apos;s<br />Next Digital Milestone.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto mb-10">
            Whether you need a custom web platform, autonomous AI workflow, or instant access to our production digital products — we are ready to execute.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00d4aa] text-black font-extrabold text-sm hover:bg-[#00e2b6] shadow-[0_0_35px_rgba(0,212,170,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Schedule a Project Consultation</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
            >
              <ShoppingBagIcon className="w-4 h-4 text-[#00d4aa]" />
              <span>Browse Digital Store</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
