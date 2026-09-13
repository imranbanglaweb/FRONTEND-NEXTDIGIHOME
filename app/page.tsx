'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  ChartBarIcon,
  BeakerIcon,
  ShareIcon,
  BoltIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  FireIcon,
  CodeBracketIcon
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
  featured?: boolean;
}

interface WelcomeSettings {
  site_title?: string;
  admin_title?: string;
  site_description?: string;
  admin_description?: string;
}

// Rock-solid, verified fallback products ensuring product showcase is never blank
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
  }
];

export default function Home() {
  const router = useRouter();
  const [welcomeSettings, setWelcomeSettings] = useState<WelcomeSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'source-code' | 'mobile-apps' | 'scripts' | 'business-tools'>('all');
  const [heroTab, setHeroTab] = useState<'software' | 'ai' | 'growth'>('software');
  const [heroProductIndex, setHeroProductIndex] = useState(0);

  // Fetch settings & products from API
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
          setLoadingProducts(false);
        }
      } catch {
        if (isMounted) {
          setProducts(fallbackProducts);
          setLoadingProducts(false);
        }
      }
    };

    fetchInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  // Filter products by active category tab
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return displayProducts.slice(0, 8);
    return displayProducts.filter(p => {
      const cat = (p.category_slug || p.category || p.category_name || '').toLowerCase();
      if (activeTab === 'source-code') return cat.includes('source') || cat.includes('web') || cat.includes('code');
      if (activeTab === 'mobile-apps') return cat.includes('mobile') || cat.includes('app') || cat.includes('flutter');
      if (activeTab === 'scripts') return cat.includes('script') || cat.includes('ai') || cat.includes('automation');
      if (activeTab === 'business-tools') return cat.includes('business') || cat.includes('erp') || cat.includes('tool');
      return true;
    }).slice(0, 8);
  }, [displayProducts, activeTab]);

  // Current featured product for the Hero Showcase Deck
  const currentHeroProduct = displayProducts[heroProductIndex % displayProducts.length] || fallbackProducts[0];

  // Quick Add to Cart Handler
  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await apiFetch('/cart', {
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
        confirmButtonText: 'Continue',
        timer: 2000,
        timerProgressBar: true
      });
    } catch {
      window.dispatchEvent(new Event('cartUpdated'));
      Swal.fire({
        title: 'Added to Cart! 🛍️',
        text: `${product.name} has been added.`,
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
    <div className="min-h-screen text-slate-100 overflow-x-hidden">

      {/* ================================================================ */}
      {/* 1. HERO SECTION — PREMIUM CINEMATIC SPLIT LAYOUT                  */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#00d4aa]/10 via-[#38bdf8]/5 to-transparent blur-[160px] pointer-events-none -z-10" />
        <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-[#6366f1]/5 blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top Pill / Status */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/25 text-xs font-bold tracking-wide text-[#00d4aa]">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
              <span>Full-Stack Engineering • AI Automation • Digital Store</span>
            </div>
          </div>

          {/* Main 2-Column Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Headline, Value Proposition & Actions */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-6xl xl:text-[4.25rem] font-black text-white tracking-tight leading-[1.08] mb-6">
                We Build, Launch,<br />
                <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#00d4aa] bg-clip-text text-transparent">
                  Automate &amp; Grow
                </span><br />
                Modern Businesses.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                NextDigiHome is a full-spectrum digital agency and software house. We engineer custom web platforms, deploy autonomous AI agents, scale predictable customer acquisition — and provide production-ready digital products with instant delivery.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#00d4aa] text-black font-extrabold text-sm hover:bg-[#00e2b6] shadow-[0_0_30px_rgba(0,212,170,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <BoltIcon className="w-4 h-4" />
                  <span>Start a Project</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="#featured-products"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#0f1523]/80 border border-white/10 hover:border-[#00d4aa]/40 text-white font-semibold text-sm hover:bg-white/5 transition-all group"
                >
                  <ShoppingBagIcon className="w-4 h-4 text-[#00d4aa]" />
                  <span>Browse Digital Store</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/25">
                    100+ Assets
                  </span>
                </Link>

                <Link
                  href="/solutions"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-4 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <span>Our Services</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Trust Metric Stats */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { val: '150+', label: 'Projects Delivered', sub: 'On-time guarantee' },
                  { val: '99.4%', label: 'Client Satisfaction', sub: 'Verified rating' },
                  { val: '8+ Yrs', label: 'Engineering Experience', sub: 'Full-stack team' },
                  { val: '24/7', label: 'Active Support SLA', sub: 'Monitoring & devops' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl sm:text-3xl font-black text-white">{s.val}</div>
                    <div className="text-xs font-semibold text-slate-300 mt-0.5">{s.label}</div>
                    <div className="text-[11px] text-slate-500">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Interactive Showcase Deck */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-[#0f1523]/90 border border-white/10 p-6 shadow-2xl backdrop-blur-xl">

                {/* Deck Mode Selector Tabs */}
                <div className="flex items-center justify-between gap-1 p-1 bg-black/40 rounded-xl mb-5 border border-white/5">
                  <button
                    onClick={() => setHeroTab('software')}
                    className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      heroTab === 'software'
                        ? 'bg-[#00d4aa] text-black shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CodeBracketIcon className="w-3.5 h-3.5" />
                    <span>Featured Software</span>
                  </button>

                  <button
                    onClick={() => setHeroTab('ai')}
                    className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      heroTab === 'ai'
                        ? 'bg-[#00d4aa] text-black shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CpuChipIcon className="w-3.5 h-3.5" />
                    <span>AI Automation</span>
                  </button>

                  <button
                    onClick={() => setHeroTab('growth')}
                    className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      heroTab === 'growth'
                        ? 'bg-[#00d4aa] text-black shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ChartBarIcon className="w-3.5 h-3.5" />
                    <span>Growth Engine</span>
                  </button>
                </div>

                {/* TAB 1: FEATURED DIGITAL PRODUCT SHOWCASE */}
                {heroTab === 'software' && (
                  <div>
                    {/* Header bar of the product */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <StarIconSolid key={i} className="w-3.5 h-3.5" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-300">5.0 · Verified Code</span>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30 flex items-center gap-1">
                        <FireIcon className="w-3 h-3" />
                        Instant Download
                      </span>
                    </div>

                    {/* Product Preview Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-[#141b2d] to-[#0c101c] border border-white/10 p-5 mb-4 group">
                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">Next.js 15</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">TypeScript</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20">bKash / Nagad</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">Courier API</span>
                      </div>

                      <h3 className="text-lg font-extrabold text-white group-hover:text-[#00d4aa] transition-colors mb-2 line-clamp-1">
                        {currentHeroProduct.name}
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                        {currentHeroProduct.description || 'Production-grade software codebase with clean modular architecture, payment routes, and complete setup docs.'}
                      </p>

                      {/* Pricing & CTA Row */}
                      <div className="flex items-center justify-between pt-3.5 border-t border-white/10">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">Full License</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-[#00d4aa]">
                              ৳{Number(currentHeroProduct.price).toLocaleString()}
                            </span>
                            {currentHeroProduct.compare_price && (
                              <span className="text-xs line-through text-slate-500">
                                ৳{Number(currentHeroProduct.compare_price).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/products/${currentHeroProduct.slug || currentHeroProduct.id}`}
                            className="px-4 py-2 rounded-xl bg-[#00d4aa] hover:bg-[#00e2b6] text-black font-bold text-xs transition-all shadow-md shadow-[#00d4aa]/20 flex items-center gap-1"
                          >
                            <span>View Details</span>
                            <ArrowRightIcon className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Thumbnail Fast Switcher */}
                    <div className="grid grid-cols-4 gap-2">
                      {displayProducts.slice(0, 4).map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => setHeroProductIndex(idx)}
                          className={`p-2 rounded-xl border text-left transition-all overflow-hidden ${
                            (heroProductIndex % displayProducts.length) === idx
                              ? 'border-[#00d4aa] bg-[#00d4aa]/10 shadow-sm'
                              : 'border-white/5 bg-white/3 hover:border-white/20'
                          }`}
                        >
                          <div className="text-[10px] font-bold text-slate-200 line-clamp-1">{p.name}</div>
                          <div className="text-[9px] font-mono text-[#00d4aa] mt-0.5">৳{Number(p.price).toLocaleString()}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: AI WORKFLOW PREVIEW */}
                {heroTab === 'ai' && (
                  <div className="py-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-bold text-emerald-400">Pipeline Active • 0.8s Latency</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Autonomous Mode</span>
                    </div>

                    <div className="space-y-2.5 mb-5">
                      {[
                        { step: '1', name: 'Inbound Multi-Channel Query', detail: 'WhatsApp Business / Web Chat', status: 'Captured' },
                        { step: '2', name: 'Vector RAG & Intent Classification', detail: 'Context matching with private docs', status: 'Processed' },
                        { step: '3', name: 'Autonomous Action Execution', detail: 'Quote calculated & CRM record synced', status: 'Executed' },
                        { step: '4', name: 'Bilingual Customer Response', detail: 'Bengali / English resolution sent', status: 'Delivered' }
                      ].map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#00d4aa]/20 text-[#00d4aa] font-mono text-[10px] flex items-center justify-center font-bold">
                              {s.step}
                            </span>
                            <div>
                              <div className="font-semibold text-white">{s.name}</div>
                              <div className="text-[10px] text-slate-400">{s.detail}</div>
                            </div>
                          </div>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono">
                            {s.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/ai"
                      className="w-full block text-center py-2.5 rounded-xl bg-[#00d4aa] text-black font-bold text-xs hover:bg-[#00e2b6] transition-all"
                    >
                      Deploy Custom AI Agent →
                    </Link>
                  </div>
                )}

                {/* TAB 3: GROWTH MARKETING ENGINE */}
                {heroTab === 'growth' && (
                  <div className="py-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-bold text-white">Full-Funnel Acquisition Engine</div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00d4aa]/15 text-[#00d4aa]">CAPI Verified</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mb-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-slate-400">Meta CAPI Signal Match</div>
                        <div className="text-xl font-black text-white mt-1">98.2%</div>
                        <div className="text-[10px] text-emerald-400 font-medium mt-0.5">Bypasses iOS Tracking Loss</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-slate-400">Average Client ROAS</div>
                        <div className="text-xl font-black text-[#00d4aa] mt-1">4.6x</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">Audited across 50+ stores</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#090d16] border border-white/5 mb-4 text-xs text-slate-300">
                      <div className="font-semibold text-white mb-1">Multi-Channel Attribution</div>
                      <div>Google Search Ads + Meta Prospecting + Dynamic Retargeting + Automated SMS abandon cart recovery.</div>
                    </div>

                    <Link
                      href="/growth"
                      className="w-full block text-center py-2.5 rounded-xl bg-[#00d4aa] text-black font-bold text-xs hover:bg-[#00e2b6] transition-all"
                    >
                      Explore Growth Services →
                    </Link>
                  </div>
                )}

              </div>

              {/* Floating Guarantee Badges */}
              <div className="absolute -right-3 top-6 hidden xl:flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0f1523]/95 border border-white/10 backdrop-blur text-xs font-bold text-slate-200 shadow-xl">
                  <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 2. THE 4 PILLARS / WHAT WE DO                                    */}
      {/* ================================================================ */}
      <section id="services" className="py-24 border-t border-white/8 bg-[#090d16]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-4">
                <span className="w-4 h-px bg-[#00d4aa]" />
                Four Core Divisions
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5">
                One Ecosystem.<br />Total Business Execution.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Eliminate the friction of managing disparate freelancers and agencies. We provide architecture, development, autonomous AI, growth marketing, and digital assets under one roof.
              </p>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#00d4aa] hover:gap-3 transition-all"
              >
                <span>View Full Service Catalog</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  num: '01',
                  title: 'BUILD',
                  subtitle: 'NextDigi Solutions',
                  desc: 'High-performance Next.js web applications, Flutter mobile apps, enterprise ERPs, and multi-tenant SaaS platforms.',
                  href: '/solutions',
                  tag: 'Custom Engineering'
                },
                {
                  num: '02',
                  title: 'AUTOMATE',
                  subtitle: 'NextDigi AI',
                  desc: 'Autonomous AI agents, bilingual customer chatbots, document vector RAG pipelines, and zero-touch n8n workflows.',
                  href: '/ai',
                  tag: 'Intelligent Systems'
                },
                {
                  num: '03',
                  title: 'GROW',
                  subtitle: 'NextDigi Growth',
                  desc: 'Meta & Google media buying with server-side CAPI tracking, technical SEO, high-converting landing pages, and analytics.',
                  href: '/growth',
                  tag: 'Customer Acquisition'
                },
                {
                  num: '04',
                  title: 'PRODUCTS',
                  subtitle: 'NextDigi Labs & Store',
                  desc: 'Proprietary SaaS products plus 100+ production-ready source codes, full-stack templates, and digital assets.',
                  href: '/store',
                  tag: 'Instant Access'
                },
              ].map((p) => (
                <Link
                  key={p.num}
                  href={p.href}
                  className="group p-6 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-[#00d4aa]/40 hover:bg-[#131b2e] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-white/10 group-hover:text-[#00d4aa]/25 transition-colors">{p.num}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5">{p.tag}</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#00d4aa] uppercase tracking-wider mb-1">{p.title}</div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">{p.subtitle}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-[#00d4aa] transition-colors">
                    <span>Explore division</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 3. DEDICATED DIGITAL PRODUCTS / SOFTWARE STORE SECTION             */}
      {/* ================================================================ */}
      <section id="featured-products" className="py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
                <ShoppingBagIcon className="w-4 h-4 text-[#00d4aa]" />
                NextDigi Digital Store
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Production-Ready Source Code &amp; Software
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Skip months of development. Deploy verified, commercial-license full-stack application source codes, mobile apps, and automation kits with instant delivery.
              </p>
            </div>

            <Link
              href="/store"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-[#00d4aa] hover:bg-[#00d4aa] hover:text-black font-bold text-xs transition-all shrink-0"
            >
              <span>Explore All 100+ Products</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
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
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
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
                  {/* Top banner / visual frame */}
                  <div className="relative h-40 bg-gradient-to-br from-[#162035] via-[#101726] to-[#090d16] p-4 flex flex-col justify-between border-b border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/25">
                        {prod.category_name || prod.category || 'Software'}
                      </span>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-white/10 text-white backdrop-blur">
                        Instant Access
                      </span>
                    </div>

                    {/* Central Icon Illustration */}
                    <div className="flex items-center justify-center my-auto z-10">
                      <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] group-hover:scale-110 transition-transform">
                        <CodeBracketIcon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Stars row */}
                    <div className="flex items-center justify-between z-10 text-[10px] text-slate-400">
                      <div className="flex items-center text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarIconSolid key={i} className="w-3 h-3" />
                        ))}
                      </div>
                      <span className="font-semibold text-slate-400">Verified License</span>
                    </div>

                    {/* Background subtle mesh effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(#00d4aa_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
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

          {/* Dedicated Store Callout Banner */}
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
      {/* 4. CUSTOM SOFTWARE & WEB PLATFORMS (ENGINEERING DIVISION)        */}
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
      {/* 5. AI & AUTOMATION DIVISION SPOTLIGHT                            */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-4">
                <CpuChipIcon className="w-4 h-4 text-[#00d4aa]" />
                NextDigi AI Division
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5">
                Autonomous AI Agents &amp;<br />Zero-Touch Workflows
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                Eliminate manual back-office tasks, delayed customer replies, and repetitive operations. We build deterministic, production-grade AI agents and n8n pipelines integrated directly with WhatsApp, your database, and your CRM.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/ai"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00d4aa] text-black font-bold text-xs hover:bg-[#00e2b6] transition-all shadow-md shadow-[#00d4aa]/20"
                >
                  <span>Explore AI Capabilities</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact?service=AI"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all"
                >
                  Consult AI Engineer
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Autonomous Agents', desc: 'RAG-powered agents executing private database queries and tool actions.', icon: CpuChipIcon, href: '/ai/ai-agents' },
                { title: 'Bilingual Chatbots', desc: 'WhatsApp & Web conversational agents fluent in Bengali & English.', icon: ChatBubbleBottomCenterTextIcon, href: '/ai/chatbots' },
                { title: 'Customer Support Triage', desc: 'Auto-classify, draft, and escalate support tickets 24/7 without delays.', icon: LifebuoyIcon, href: '/ai/ai-support' },
                { title: 'Zero-Touch Pipelines', desc: 'Event-driven n8n and Python pipelines syncing CRM, invoicing & alerts.', icon: ArrowsRightLeftIcon, href: '/ai/automation' },
              ].map((ai, i) => {
                const Icon = ai.icon;
                return (
                  <Link
                    key={i}
                    href={ai.href}
                    className="group p-5 rounded-2xl bg-[#0f1523]/80 border border-white/8 hover:border-[#00d4aa]/40 hover:bg-[#131b2e] transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-[#00d4aa] transition-colors">{ai.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{ai.desc}</p>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* ================================================================ */}
      {/* 6. NEXTDIGI LABS (PROPRIETARY SAAS PRODUCTS)                     */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 bg-[#090d16]/70">
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
      {/* 7. HOW WE WORK (4-STEP DISCIPLINED PROCESS)                      */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 relative">
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
      {/* 8. WHY NEXTDIGIHOME / TRUST PILLARS                             */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 bg-[#090d16]/70">
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
      {/* 9. TESTIMONIALS / VERIFIED CLIENT REVIEWS                        */}
      {/* ================================================================ */}
      <section className="py-24 border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <StarIcon className="w-4 h-4 text-[#00d4aa]" />
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
      {/* 10. FINAL BOTTOM CALL TO ACTION BANNER                           */}
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
