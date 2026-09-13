'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  VideoCameraIcon,
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
  MagnifyingGlassIcon as SearchIcon
} from "@heroicons/react/24/outline";
import { getStorageUrl, apiFetch, getLogoUrl } from './utils/api';

interface Product {
  id: number | string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compare_price?: number;
  category?: string;
  category_name?: string | null;
  category_slug?: string | null;
  thumbnail?: string;
  featured?: boolean;
}

interface Category {
  id: number | string;
  category_name: string;
  slug: string;
}

interface WelcomeSettings {
  site_logo?: string | null;
  admin_logo?: string | null;
  site_title?: string;
  admin_title?: string;
  site_description?: string;
  admin_description?: string;
}

const normalizeCategory = (value: unknown): string => {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function Home() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [welcomeSettings, setWelcomeSettings] = useState<WelcomeSettings | null>(null);

  // Fetch products and categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiFetch('products?per_page=50');
        if (data?.data && Array.isArray(data.data)) {
          setAllProducts(data.data);
        } else if (Array.isArray(data)) {
          setAllProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiFetch('categories');
        if (Array.isArray(data)) {
          setAllCategories(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setAllCategories(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Welcome settings
  useEffect(() => {
    try {
      if (sessionStorage.getItem('nextdigihome_welcome_popup_seen') !== 'true') {
        const timer = window.setTimeout(() => setShowWelcomePopup(true), 1200);
        return () => window.clearTimeout(timer);
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  useEffect(() => {
    const fetchWelcomeSettings = async () => {
      try {
        const data = await apiFetch('settings', { silent: true });
        const settingsData = data?.data?.data || data?.data || data || {};
        setWelcomeSettings(settingsData);
      } catch (error) {
        console.warn('Failed to fetch welcome popup settings:', error);
      }
    };

    fetchWelcomeSettings();
  }, []);

  const closeWelcomePopup = () => {
    try {
      sessionStorage.setItem('nextdigihome_welcome_popup_seen', 'true');
    } catch (error) {
      console.warn('Failed to save welcome popup state:', error);
    }
    setShowWelcomePopup(false);
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const prodCategory = normalizeCategory(product.category_slug || product.category_name || product.category);
      const matchesCategory = selectedCategory === 'all' || prodCategory === normalizeCategory(selectedCategory);
      const matchesSearch = !searchQuery.trim() || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  const popupBrandName = welcomeSettings?.site_title || welcomeSettings?.admin_title || 'NextDigiHome';
  const popupTagline = welcomeSettings?.site_description || welcomeSettings?.admin_description || 'Build. Launch. Automate. Grow.';
  const popupLogo = getLogoUrl(welcomeSettings?.site_logo || welcomeSettings?.admin_logo) || '/logo.png';

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#00d4aa] selection:text-black">
      
      {/* Welcome Popup */}
      {showWelcomePopup && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#050507]/80 px-4 py-6 backdrop-blur-xl animate-fade-in-up"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-[500px] overflow-hidden rounded-3xl border border-white/10 bg-[#0e131d]/95 p-8 shadow-2xl ring-1 ring-[#00d4aa]/20">
            <button
              type="button"
              onClick={closeWelcomePopup}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white transition"
              aria-label="Close popup"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-semibold text-[#00d4aa] uppercase tracking-wider mb-4">
                Welcome to NextDigiHome
              </div>
              <h2 className="text-2xl font-black text-white mb-2">{popupBrandName}</h2>
              <p className="text-sm text-gray-300 mb-6">{popupTagline}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  onClick={closeWelcomePopup}
                  className="px-6 py-3 rounded-xl bg-[#00d4aa] hover:bg-[#00e2b6] text-black font-bold text-xs transition"
                >
                  Start a Project
                </Link>
                <Link
                  href="/products"
                  onClick={closeWelcomePopup}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition"
                >
                  Explore Store
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 1: HERO SECTION (MASTER BRAND) */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-[#00d4aa]/15 via-[#8b5cf6]/15 to-transparent blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#38bdf8]/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-gray-300 uppercase mb-8 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
              <span>NEXTDIGIHOME</span>
              <span className="text-gray-500">•</span>
              <span className="text-[#00d4aa]">BUILD. LAUNCH. AUTOMATE. GROW.</span>
            </div>

            {/* Master Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Technology, AI & Digital Solutions for{' '}
              <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl mx-auto mb-10">
              We architect high-performance web and custom software, deploy autonomous AI agents to eliminate manual operations, scale revenue with performance marketing, and operate proprietary SaaS platforms.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition-all duration-300 shadow-xl shadow-[#00d4aa]/25 flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/solutions"
                className="px-7 py-4 rounded-xl font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex items-center gap-2"
              >
                Explore Solutions
              </Link>
              <Link
                href="#store"
                className="px-5 py-4 text-xs font-semibold text-gray-400 hover:text-[#00d4aa] transition flex items-center gap-1"
              >
                Browse Digital Store <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Capability Badges / Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              {[
                { title: 'Custom Software & Web', href: '/solutions' },
                { title: 'Autonomous AI Agents', href: '/ai' },
                { title: 'Performance Marketing', href: '/growth' },
                { title: 'Turnkey SaaS Platforms', href: '/labs' },
                { title: 'Verified Digital Store', href: '/store' }
              ].map((pill, i) => (
                <Link
                  key={i}
                  href={pill.href}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 bg-[#0e131d] border border-white/10 hover:border-[#00d4aa]/50 hover:text-white transition"
                >
                  {pill.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 2: WHAT WE DO (4 PILLARS / ECOSYSTEM MATRIX) */}
      {/* ================================================================ */}
      <section className="py-20 relative border-t border-white/5 bg-[#080b11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4aa]">The Ecosystem Matrix</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 mb-4">
              Everything Your Business Needs to Operate Digitally
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Four specialized divisions engineered to work in harmony — from code and automation to paid customer acquisition and ready-to-deploy software assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: BUILD */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0e131d] hover:border-[#00d4aa]/40 transition group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-6">
                  <GlobeAltIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#00d4aa] font-bold">Pillar 01</span>
                <h3 className="text-2xl font-black text-white mt-1 mb-2">BUILD</h3>
                <p className="text-xs font-semibold text-gray-400 mb-4">NextDigi Solutions</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Websites, e-commerce storefronts, mobile apps, custom ERPs, and scalable multi-tenant SaaS platforms.
                </p>
              </div>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#00d4aa] hover:underline"
              >
                Explore Solutions <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Pillar 2: AUTOMATE */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0e131d] hover:border-[#8b5cf6]/40 transition group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] mb-6">
                  <CpuChipIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#8b5cf6] font-bold">Pillar 02</span>
                <h3 className="text-2xl font-black text-white mt-1 mb-2">AUTOMATE</h3>
                <p className="text-xs font-semibold text-gray-400 mb-4">NextDigi AI</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Autonomous task agents, bilingual customer chatbots, AI support ticket triaging, and zero-touch workflows.
                </p>
              </div>
              <Link
                href="/ai"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#8b5cf6] hover:underline"
              >
                Explore AI Division <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Pillar 3: GROW */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0e131d] hover:border-[#38bdf8]/40 transition group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] mb-6">
                  <PresentationChartLineIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#38bdf8] font-bold">Pillar 03</span>
                <h3 className="text-2xl font-black text-white mt-1 mb-2">GROW</h3>
                <p className="text-xs font-semibold text-gray-400 mb-4">NextDigi Growth</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Structured Meta & Google ad testing, search engine optimization (SEO), server-side CAPI tracking, and content.
                </p>
              </div>
              <Link
                href="/growth"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#38bdf8] hover:underline"
              >
                Explore Growth Division <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Pillar 4: PRODUCTS */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#0e131d] hover:border-[#f59e0b]/40 transition group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b] mb-6">
                  <ShoppingBagIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#f59e0b] font-bold">Pillar 04</span>
                <h3 className="text-2xl font-black text-white mt-1 mb-2">PRODUCTS</h3>
                <p className="text-xs font-semibold text-gray-400 mb-4">Labs & Store</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  SaaS products (Commerce, Social, Automate, Garibondhu360) plus verified source codes & developer tools.
                </p>
              </div>
              <Link
                href="/labs"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#f59e0b] hover:underline"
              >
                Explore Labs & Store <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 3: NEXTDIGI SOLUTIONS (SERVICE SHOWCASE) */}
      {/* ================================================================ */}
      <section className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-semibold text-[#00d4aa] uppercase tracking-wider mb-3">
                NextDigi Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Custom Engineering & Full-Stack Development
              </h2>
            </div>
            <Link
              href="/solutions"
              className="mt-4 md:mt-0 text-sm font-semibold text-[#00d4aa] hover:underline inline-flex items-center gap-1"
            >
              View All 8 Solutions <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'web-development', title: 'Web Development', desc: 'Fast, secure web apps using Next.js 16 and modern headless architectures.', icon: GlobeAltIcon, accent: '#00d4aa' },
              { id: 'ecommerce', title: 'E-commerce Platforms', desc: 'Custom storefronts with native bKash/Nagad checkout and courier sync.', icon: ShoppingBagIcon, accent: '#8b5cf6' },
              { id: 'mobile-app', title: 'Mobile Applications', desc: 'Cross-platform iOS and Android apps built with Flutter for 60fps fluidity.', icon: DevicePhoneMobileIcon, accent: '#38bdf8' },
              { id: 'custom-software', title: 'Custom Enterprise ERP', desc: 'Tailored business operating software, inventory systems, and portals.', icon: CommandLineIcon, accent: '#f59e0b' },
              { id: 'saas-development', title: 'SaaS Platforms', desc: 'Multi-tenant architecture, automated subscription billing, and metering.', icon: CpuChipIcon, accent: '#ec4899' },
              { id: 'api-integrations', title: 'API & Integrations', desc: 'Fault-tolerant webhooks, CRM connections, and data sync middleware.', icon: ServerIcon, accent: '#10b981' },
              { id: 'hosting-maintenance', title: 'Cloud Infrastructure', desc: 'High-availability server hosting, continuous monitoring, and security patching.', icon: WrenchScrewdriverIcon, accent: '#6366f1' },
              { id: 'custom-software', title: 'Security Audits', desc: 'Hardened HTTP headers, database encryption, and vulnerability prevention.', icon: ShieldCheckIcon, accent: '#00d4aa' }
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={idx}
                  href={`/solutions/${srv.id}`}
                  className="p-6 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-white/20 transition group hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform" style={{ color: srv.accent }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00d4aa] transition">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 4: NEXTDIGI AI (AI & AUTOMATION SHOWCASE) */}
      {/* ================================================================ */}
      <section className="py-24 relative border-t border-white/5 bg-[#080b11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs font-semibold text-[#a78bfa] uppercase tracking-wider mb-4">
                NextDigi AI
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Autonomous AI Agents & <br />
                <span className="text-[#8b5cf6]">Intelligent Automation</span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                Eliminate hours of manual data entry, slow customer response times, and repetitive tasks. We engineer deterministic AI agents and automated workflows that operate 24/7 without hallucination.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/ai"
                  className="px-7 py-3.5 rounded-xl font-bold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition shadow-lg shadow-[#8b5cf6]/25 flex items-center gap-2 text-sm"
                >
                  Explore AI Capabilities
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact?service=AI%20Agents"
                  className="px-6 py-3.5 rounded-xl font-semibold text-gray-300 hover:text-white bg-white/5 border border-white/10 text-sm transition"
                >
                  Request AI Consultation
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Autonomous AI Agents', desc: 'RAG-powered agents that query private databases and execute tools.', icon: CpuChipIcon, href: '/ai/ai-agents' },
                { title: 'Bilingual Chatbots', desc: 'WhatsApp and Web bots that speak Bengali & English fluently.', icon: ChatBubbleBottomCenterTextIcon, href: '/ai/chatbots' },
                { title: 'AI Support Triage', desc: 'Instant ticket classification and auto-drafting for customer desks.', icon: LifebuoyIcon, href: '/ai/ai-support' },
                { title: 'Zero-Touch Workflows', desc: 'n8n and webhook pipelines connecting CRM, billing, and alerts.', icon: ArrowsRightLeftIcon, href: '/ai/automation' },
              ].map((ai, i) => {
                const Icon = ai.icon;
                return (
                  <Link
                    key={i}
                    href={ai.href}
                    className="p-5 rounded-2xl bg-[#0e131d] border border-white/10 hover:border-[#8b5cf6]/40 transition group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#a78bfa] mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#a78bfa] transition">{ai.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{ai.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 5: NEXTDIGI GROWTH (DIGITAL GROWTH SHOWCASE) */}
      {/* ================================================================ */}
      <section className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-semibold text-[#00d4aa] uppercase tracking-wider mb-3">
                NextDigi Growth
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Predictable Customer Acquisition & Attribution
              </h2>
            </div>
            <Link
              href="/growth"
              className="mt-4 md:mt-0 text-sm font-semibold text-[#00d4aa] hover:underline inline-flex items-center gap-1"
            >
              View Growth Strategies <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Meta Ads & Creative Testing',
                tagline: 'Facebook & Instagram Media Buying',
                desc: 'Scientific creative variation testing, audience segmentation, and server-side Conversions API (CAPI) to bypass tracking loss.',
                icon: MegaphoneIcon,
                href: '/growth/meta-ads'
              },
              {
                title: 'Google Ads & Intent Search',
                tagline: 'Search, YouTube & Performance Max',
                desc: 'Capture high-intent buyers with tightly-grouped keywords, aggressive negative lists, and value-based conversion bidding.',
                icon: CursorArrowRaysIcon,
                href: '/growth/google-ads'
              },
              {
                title: 'SEO & Technical Authority',
                tagline: 'Compounding Organic Search Traffic',
                desc: 'Code-level technical SEO, schema rich snippets, topic clusters, and Core Web Vitals to rank for commercial intent searches.',
                icon: MagnifyingGlassIcon,
                href: '/growth/seo'
              }
            ].map((g, i) => {
              const Icon = g.icon;
              return (
                <div key={i} className="p-8 rounded-3xl bg-[#0c1017] border border-white/10 hover:border-[#00d4aa]/30 transition flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-[#00d4aa] font-semibold">{g.tagline}</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-3">{g.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">{g.desc}</p>
                  </div>
                  <Link
                    href={g.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#00d4aa] transition"
                  >
                    Channel Details <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Ethical Marketing Commitment */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-[#00d4aa] shrink-0" />
              <p className="text-xs sm:text-sm text-gray-300">
                <span className="font-bold text-white">Our Growth Standard:</span> Zero fraudulent ROAS guarantees. We use disciplined experimentation, accurate attribution, and high-converting landing pages to acquire customers sustainably.
              </p>
            </div>
            <Link
              href="/growth/analytics"
              className="text-xs font-bold text-[#00d4aa] hover:underline whitespace-nowrap"
            >
              See Attribution Systems →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 6: NEXTDIGI LABS (SAAS PRODUCTS SHOWCASE) */}
      {/* ================================================================ */}
      <section className="py-24 relative border-t border-white/5 bg-[#080b11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs font-semibold text-[#a78bfa] uppercase tracking-wider mb-3">
              NextDigi Labs
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Proprietary SaaS Products & Software Ecosystem
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              We engineer, operate, and incubate our own SaaS platforms to solve real operational bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                id: 'commerce',
                name: 'NextDigi Commerce',
                tagline: 'Headless Multi-Channel E-Commerce Engine',
                desc: 'Turnkey commerce with native bKash/Nagad payment routing, automatic courier dispatch (Pathao, Steadfast, RedX), and multi-warehouse inventory sync.',
                status: 'Live Production',
                statusColor: 'text-[#00d4aa] border-[#00d4aa]/30 bg-[#00d4aa]/10',
                accent: '#00d4aa',
                icon: ShoppingBagIcon,
                features: ['Instant Checkout', 'Courier Auto-Sync', 'Inventory Ledger'],
                href: '/labs/commerce',
                extUrl: 'https://commerce.nextdigihome.com'
              },
              {
                id: 'garibondhu360',
                name: 'Garibondhu360',
                tagline: 'Automotive Workshop & Fleet Management SaaS',
                desc: 'Complete cloud ERP for vehicle repair workshops, parts inventory tracking, digital job cards, and corporate fleet maintenance logs.',
                status: 'Live Platform',
                statusColor: 'text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/10',
                accent: '#38bdf8',
                icon: WrenchScrewdriverIcon,
                features: ['Digital Job Cards', 'Spare Parts Barcodes', 'Customer SMS Reminders'],
                href: '/labs/garibondhu360',
                extUrl: 'https://garibondhu360.nextdigihome.com'
              },
              {
                id: 'social',
                name: 'NextDigi Social',
                tagline: 'Multi-Channel Post Scheduler & Unified DM Inbox',
                desc: 'Manage Facebook, Instagram, LinkedIn, and TikTok from a single synchronized dashboard with AI caption generation and team approvals.',
                status: 'Private Beta',
                statusColor: 'text-[#8b5cf6] border-[#8b5cf6]/30 bg-[#8b5cf6]/10',
                accent: '#8b5cf6',
                icon: ShareIcon,
                features: ['Omnichannel Scheduler', 'Unified DM Inbox', 'AI Copy Assistant'],
                href: '/labs/social',
                extUrl: 'https://social.nextdigihome.com'
              },
              {
                id: 'automate',
                name: 'NextDigi Automate',
                tagline: 'Visual Low-Code Workflow Automation Engine',
                desc: 'Connect webhooks, databases, CRMs, and customer alerts into automated business pipelines with an intuitive visual node canvas.',
                status: 'Early Access',
                statusColor: 'text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10',
                accent: '#f59e0b',
                icon: BoltIcon,
                features: ['Visual Flow Builder', 'Pre-Built App Nodes', 'Fault-Tolerant Retries'],
                href: '/labs/automate',
                extUrl: 'https://automate.nextdigihome.com'
              }
            ].map((prod) => {
              const Icon = prod.icon;
              return (
                <div key={prod.id} className="p-8 rounded-3xl bg-[#0e131d] border border-white/10 hover:border-white/20 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: prod.accent }}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full border ${prod.statusColor}`}>
                        {prod.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{prod.name}</h3>
                    <p className="text-xs font-semibold text-gray-400 mb-3" style={{ color: prod.accent }}>{prod.tagline}</p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">{prod.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {prod.features.map((f, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-gray-300 flex items-center gap-1.5">
                          <CheckCircleIcon className="w-3.5 h-3.5 text-[#00d4aa]" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <Link
                      href={prod.href}
                      className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-center text-white transition"
                    >
                      Architecture Details
                    </Link>
                    <a
                      href={prod.extUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition"
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
      {/* SECTION 7: NEXTDIGI STORE (DIGITAL PRODUCTS MARKETPLACE) */}
      {/* ================================================================ */}
      <section id="store" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-semibold text-[#00d4aa] uppercase tracking-wider mb-3">
                NextDigi Store
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Verified Digital Products & Software Assets
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Production-ready source codes, UI kits, templates, and automation blueprints with instant download.
              </p>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 text-sm font-semibold text-[#00d4aa] hover:underline inline-flex items-center gap-1"
            >
              Browse Complete Catalog <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-[#00d4aa] text-black'
                    : 'bg-[#0e131d] text-gray-300 border border-white/10 hover:border-white/20'
                }`}
              >
                All Products
              </button>
              {allCategories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug || cat.category_name)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 ${
                    selectedCategory === (cat.slug || cat.category_name)
                      ? 'bg-[#00d4aa] text-black'
                      : 'bg-[#0e131d] text-gray-300 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat.category_name}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#0e131d] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa]"
              />
              <SearchIcon className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Products Grid */}
          {loadingProducts ? (
            <div className="py-16 text-center">
              <div className="w-10 h-10 border-2 border-[#00d4aa] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-gray-500">Loading catalog items...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl bg-[#0c1017] border border-white/10 overflow-hidden hover:border-white/20 transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-[16/10] bg-[#111622] relative overflow-hidden flex items-center justify-center">
                      {product.thumbnail ? (
                        <img
                          src={getStorageUrl(product.thumbnail)!}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <ShoppingBagIcon className="w-12 h-12 text-gray-600" />
                      )}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-[10px] font-mono text-[#00d4aa]">
                        {product.category_name || product.category || 'Asset'}
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="text-sm font-bold text-white line-clamp-1 mb-1 group-hover:text-[#00d4aa] transition">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                        {product.description || 'Verified production asset with clean documentation and instant setup instructions.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-auto">
                    <div className="text-base font-extrabold text-[#00d4aa]">
                      ৳{product.price}
                    </div>
                    <Link
                      href={`/products/${product.slug || product.id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00d4aa] hover:text-black border border-white/10 text-xs font-semibold text-white transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center rounded-2xl bg-[#0c1017] border border-white/10">
              <p className="text-sm text-gray-400 mb-4">No products found matching your search filter.</p>
              <button
                type="button"
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-xs font-semibold text-[#00d4aa] hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Store Guarantee Footer Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="w-5 h-5 text-[#00d4aa] shrink-0" />
              <p className="text-xs sm:text-sm text-gray-300">
                <span className="font-semibold text-white">Instant Automated Delivery & 30-Day Guarantee:</span> All purchases come with clean source files, license keys, and a full 30-day money-back guarantee.
              </p>
            </div>
            <Link
              href="/refund"
              className="text-xs text-gray-400 hover:text-white transition whitespace-nowrap"
            >
              Refund Policy Details →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 8: CASE STUDIES & PROVEN RESULTS */}
      {/* ================================================================ */}
      <section className="py-24 relative border-t border-white/5 bg-[#080b11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                Proven Engineering
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Real Projects. Real Engineering.
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="mt-4 md:mt-0 text-sm font-semibold text-[#00d4aa] hover:underline inline-flex items-center gap-1"
            >
              View Detailed Architecture Studies <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'NextDigi Headless Commerce',
                type: 'Headless E-Commerce & Payment Engine',
                desc: 'Engineered sub-second checkout, native bKash/Nagad direct webhooks, and automated Pathao/Steadfast consignment creation.',
                metric: 'Sub-45s Checkout Completion',
                accent: '#00d4aa'
              },
              {
                title: 'Garibondhu360 Automotive SaaS',
                type: 'Vertical Cloud ERP & Workshop OS',
                desc: 'Replaced paper slips with tablet digital job cards, barcode spare parts stock deduction, and automated customer SMS status updates.',
                metric: '100% Digital Job Tracking',
                accent: '#38bdf8'
              },
              {
                title: 'NextDigi Cloud Infrastructure',
                type: 'High-Concurrency Docker & Redis Architecture',
                desc: 'Edge-cached microservice architecture supporting high traffic bursts with automated container self-healing and zero downtime.',
                metric: '99.9% Production Uptime',
                accent: '#8b5cf6'
              }
            ].map((cs, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#0c1017] border border-white/10 hover:border-white/20 transition flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">{cs.type}</span>
                  <h3 className="text-xl font-bold text-white mb-3">{cs.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{cs.desc}</p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: cs.accent }}>{cs.metric}</span>
                  <Link href="/case-studies" className="text-xs text-gray-400 hover:text-white transition">Read Study →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 9: HOW WE WORK (METHODOLOGY) */}
      {/* ================================================================ */}
      <section className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4aa]">Engineering Lifecycle</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 mb-4">
              How We Work: Build • Launch • Automate • Grow
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              A disciplined, milestone-driven technical process designed to take projects from architecture to scalable market operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discover & Architect', desc: 'Requirements scoping, system architecture design, database modeling, and milestone scheduling.' },
              { step: '02', title: 'Build & Engineer', desc: 'Sprint-based agile engineering with strict TypeScript type safety, unit testing, and weekly demo builds.' },
              { step: '03', title: 'Automate & Integrate', desc: 'Connect payment gateways, CRMs, courier APIs, and autonomous AI agents for zero-touch workflows.' },
              { step: '04', title: 'Launch & Scale', desc: 'Production deployment on high-availability cloud hosting, attribution tracking, and disciplined growth scaling.' }
            ].map((m) => (
              <div key={m.step} className="p-7 rounded-3xl bg-[#0c1017] border border-white/10 hover:border-[#00d4aa]/30 transition">
                <div className="text-3xl font-black text-[#00d4aa]/40 mb-3">{m.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 10: WHY BUSINESSES CHOOSE NEXTDIGIHOME */}
      {/* ================================================================ */}
      <section className="py-24 relative border-t border-white/5 bg-[#080b11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4aa]">Capability Pillars</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 mb-4">
              Why Forward-Thinking Businesses Choose NextDigiHome
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Factual engineering strengths based on production experience, transparent billing, and complete code ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '8+ Years Combined Engineering',
                desc: 'Experienced full-stack engineers with extensive production background in high-throughput web applications, APIs, and cloud infrastructure.',
                icon: CommandLineIcon
              },
              {
                title: '100% Code & IP Ownership',
                desc: 'You own all intellectual property, source repositories, documentation, and cloud deployment credentials upon project completion.',
                icon: ShieldCheckIcon
              },
              {
                title: 'Battle-Tested in NextDigi Labs',
                desc: 'We test architectures on our own SaaS products first. The components we deploy for your business have processed thousands of live transactions.',
                icon: BeakerIcon
              },
              {
                title: 'Unified Technology Ecosystem',
                desc: 'No need to manage 5 disparate vendors. Solutions, AI automation, growth marketing, and digital assets operate under one cohesive roof.',
                icon: SparklesIcon
              },
              {
                title: 'SLA-Backed Support & Monitoring',
                desc: 'Proactive 24/7 server monitoring, automated daily encrypted backups, and rapid incident response to guarantee uptime.',
                icon: ClockIcon
              },
              {
                title: 'Transparent Milestone Billing',
                desc: 'Clear scope boundaries, transparent pricing, and milestone-tied deliverables with zero hidden surprises or vendor lock-in.',
                icon: CheckCircleIcon
              }
            ].map((prop, i) => {
              const Icon = prop.icon;
              return (
                <div key={i} className="p-7 rounded-3xl bg-[#0c1017] border border-white/10 hover:border-white/20 transition">
                  <div className="w-11 h-11 rounded-2xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{prop.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{prop.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 11: VERIFIED CLIENT FEEDBACK & TRUST */}
      {/* ================================================================ */}
      <section className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4aa]">Client Perspectives</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Engineered for Real Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                quote: "Unlike agencies that make wild 10x ROAS claims, the NextDigi Growth team implemented server-side CAPI tracking, creative testing, and clean attribution that gave us reliable metrics.",
                author: "Farhan Ahmed",
                role: "Founder, D2C Apparel Brand"
              }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#0c1017] border border-white/10 flex flex-col justify-between">
                <p className="text-sm text-gray-300 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 12: LEAD GENERATION CTA BANNER */}
      {/* ================================================================ */}
      <section className="py-24 relative border-t border-white/5 bg-[#070a10] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#00d4aa]/15 via-[#8b5cf6]/15 to-transparent blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl border border-[#00d4aa]/30 bg-gradient-to-b from-[#111722]/90 to-[#0c1017]/90 p-8 sm:p-14 text-center backdrop-blur-xl shadow-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-semibold text-[#00d4aa] uppercase tracking-wider mb-6">
              <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
              Let&apos;s Build Together
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Have a Business Idea? <br />
              <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                Let&apos;s Architect & Build It.
              </span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10">
              Speak directly with our technology architects to discuss user requirements, technical feasibility, timeline, and budget estimation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition-all duration-300 shadow-xl shadow-[#00d4aa]/25 flex items-center gap-2 text-sm sm:text-base hover:scale-[1.02]"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/8801918329829?text=Hello%20NextDigiHome%2C%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-xl font-bold text-black bg-[#25D366] hover:bg-[#20bd5a] transition-all duration-300 shadow-xl shadow-[#25D366]/20 flex items-center gap-2 text-sm sm:text-base"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-8">
              Confidential discovery • 100% IP ownership • SLA-backed engineering
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
