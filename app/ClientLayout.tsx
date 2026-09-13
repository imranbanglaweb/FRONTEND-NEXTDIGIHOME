'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { 
  ShoppingCartIcon, 
  Bars3Icon, 
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  SparklesIcon,
  GlobeAltIcon,
  CpuChipIcon,
  ChartBarIcon,
  BeakerIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";
import { apiFetch, BACKEND_BASE_URL, getStorageUrl, getLogoUrl } from './utils/api';
import NextDigiLogo from './components/NextDigiLogo';

const ANDROID_APP_DOWNLOAD_URL = '/nextdigihome.apk';

const getFaviconUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;
  const cleanPath = path.trim();
  if (!cleanPath) return null;

  if (/^https?:\/\//i.test(cleanPath)) {
    const match = cleanPath.match(/\/public\/(.+)$/);
    if (match) {
      return `/api/logo?file=${encodeURIComponent(match[1])}`;
    }
    return cleanPath;
  }

  const relativePath = cleanPath.replace(/^\/+/, '').replace(/^public\//i, '');
  const backendPath = relativePath.includes('/')
    ? relativePath
    : `admin_resource/assets/images/${relativePath}`;

  return `/api/logo?file=${encodeURIComponent(backendPath)}`;
};

const getFaviconType = (path: string | null | undefined): string => {
  const ext = (path || '').split('?')[0].toLowerCase().split('.').pop();
  const typeMap: Record<string, string> = {
    ico: 'image/x-icon',
    png: 'image/png',
    svg: 'image/svg+xml',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
  };
  return typeMap[ext || ''] || 'image/x-icon';
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenDropdown = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleCloseDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [settings, setSettings] = useState<{
      site_logo?: string | null;
      admin_logo?: string | null;
      site_title?: string;
      admin_title?: string;
      site_description?: string;
      admin_description?: string;
      seo_enabled?: boolean;
      seo_meta_title?: string;
      seo_meta_description?: string;
      seo_meta_keywords?: string;
      seo_og_image?: string | null;
      google_analytics_id?: string | null;
      favicon?: string | null;
    } | null>({ admin_title: 'Next Digi Home' });  // Simple default, no localStorage access to avoid hydration mismatch

  const [categories, setCategories] = useState<Array<{
    id: number;
    category_name: string;
    slug: string;
  }>>([
    { id: 1, category_name: 'Digital Marketing', slug: 'digital-marketing' },
    { id: 2, category_name: 'Web Development', slug: 'web-development' },
    { id: 3, category_name: 'Graphic Design', slug: 'graphic-design' },
    { id: 4, category_name: 'Business Tools', slug: 'business-tools' },
    { id: 5, category_name: 'Education', slug: 'education' },
    { id: 6, category_name: 'Photography', slug: 'photography' },
    { id: 7, category_name: 'Music & Audio', slug: 'music-audio' },
    { id: 8, category_name: 'Video & Animation', slug: 'video-animation' },
  ]);

  // Function declarations before useEffect hooks
  const fetchCartCount = async () => {
    try {
      const data = await apiFetch('/cart', { silent: true, credentials: 'include' });
      setCartCount(data.items?.length || 0);
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  };

  const fetchSettings = async () => {
    setIsLoading(true);
    const maxRetries = 3;
    const baseDelay = 1000;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const res = await apiFetch('/settings', { silent: true });
        const settingsData = res?.data?.data || res?.data || res || {};
        setSettings(settingsData);
        try {
          localStorage.setItem('nextdigihome_settings', JSON.stringify(settingsData));
        } catch (storageError) {
          console.warn('Failed to save settings to localStorage:', storageError);
        }
        setIsLoading(false);
        return;
      } catch (error) {
        if (i === maxRetries - 1) {
          console.log('Failed to fetch settings after retries, keeping current settings.');
          setIsLoading(false);
          return;
        } else {
          console.log(`Settings fetch attempt ${i + 1} failed, retrying...`);
        }
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await apiFetch('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

// Mark component as hydrated and load settings from localStorage
  useEffect(() => {
    setIsHydrated(true);
    try {
      const saved = localStorage.getItem('nextdigihome_settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isHydrated || !settings?.favicon) return;

    const faviconUrl = getFaviconUrl(settings.favicon);
    if (!faviconUrl) return;

    document
      .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
      .forEach((node) => node.parentNode?.removeChild(node));

    const type = getFaviconType(settings.favicon);
    const iconLink = document.createElement('link');
    iconLink.setAttribute('rel', 'icon');
    iconLink.setAttribute('href', faviconUrl);
    iconLink.setAttribute('type', type);
    document.head.appendChild(iconLink);

    const shortcutLink = document.createElement('link');
    shortcutLink.setAttribute('rel', 'shortcut icon');
    shortcutLink.setAttribute('href', faviconUrl);
    shortcutLink.setAttribute('type', type);
    document.head.appendChild(shortcutLink);
  }, [isHydrated, settings?.favicon]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);

    fetchCartCount();
    fetchSettings();
    fetchCategories();

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      fetchCartCount();
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleMobileSection = (key: string) => {
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category icons for footer (consistent with home page)
  // Typed as Record<string, string> to allow safe indexing with dynamic string keys from API
  const categoryIconMap: Record<string, string> = {
    'digital-marketing': '📱',
    'web-development': '💻',
    'graphic-design': '🎨',
    'business-tools': '🛠️',
    'education': '📚',
    'photography': '📷',
    'music-audio': '🎵',
    'video-animation': '🎬',
    'templates': '📄',
    'ui-kits': '🎨',
    'graphics': '🖼️',
    'presentations': '📊',
    'tools': '⚙️',
    'all': '⭐'
  };

  return (
    <>
      {/* Sophisticated Dark Ambiance with subtle cyan glow and tech grid */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#090d16]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#00d4aa]/8 via-[#38bdf8]/4 to-transparent blur-[160px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#6366f1]/4 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60" />
      </div>

      <header className={`header fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090d16]/95 backdrop-blur-xl border-white/10 shadow-lg shadow-black/30'
          : 'bg-[#090d16]/75 backdrop-blur-md border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 md:h-18 gap-6 justify-between">
            {/* Dynamic Backend Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <NextDigiLogo
                size="sm"
                subtitle=""
                customLogoUrl={getLogoUrl(settings?.site_logo || settings?.admin_logo || 'logo.png')}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 min-w-0 items-center gap-1.5 ml-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-xl text-sm transition-all ${
                  pathname === '/'
                    ? 'text-[#00d4aa] font-bold bg-[#00d4aa]/10 border border-[#00d4aa]/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                Home
              </Link>

              {/* About — directly after Home */}
              <Link
                href="/about"
                className={`px-3 py-2 rounded-xl text-sm transition-all ${
                  pathname === '/about'
                    ? 'text-[#00d4aa] font-bold bg-[#00d4aa]/10 border border-[#00d4aa]/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                About
              </Link>

              {/* Store — Single click navigates directly to show all dynamic digital products */}
              <Link
                href="/products"
                className={`px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-all ${
                  pathname.startsWith('/store') || pathname.startsWith('/products')
                    ? 'text-[#00d4aa] font-bold bg-[#00d4aa]/10 border border-[#00d4aa]/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                <ShoppingBagIcon className="w-4 h-4 text-[#00d4aa]" />
                <span>Store</span>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#00d4aa] text-black tracking-wider uppercase">Hot</span>
              </Link>

              {/* Solutions */}
              <div
                className="relative"
                onMouseEnter={() => handleOpenDropdown('solutions')}
                onMouseLeave={handleCloseDropdown}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                  className={`px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-all ${
                    pathname.startsWith('/solutions')
                      ? 'text-[#00d4aa] font-bold bg-[#00d4aa]/10 border border-[#00d4aa]/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'solutions' ? 'rotate-180 text-[#00d4aa]' : ''}`} />
                </button>
                {activeDropdown === 'solutions' && (
                  <div className="absolute top-full left-0 pt-2 z-50 animate-fade-in">
                    <div className="w-[520px] rounded-2xl bg-[#0d121f]/98 border border-white/10 p-3.5 shadow-2xl backdrop-blur-2xl">
                      <div className="px-3 py-2 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00d4aa]">Engineering Solutions</span>
                        <span className="text-[10px] text-slate-400">7 Core Verticals</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {[
                          { title: 'Web Development', href: '/solutions/web-development', desc: 'Next.js & React platforms' },
                          { title: 'E-commerce', href: '/solutions/ecommerce', desc: 'bKash, Nagad & Stripe checkout' },
                          { title: 'Mobile Apps', href: '/solutions/mobile-app', desc: 'Flutter iOS & Android' },
                          { title: 'Custom Software', href: '/solutions/custom-software', desc: 'Enterprise ERPs & systems' },
                          { title: 'SaaS Development', href: '/solutions/saas-development', desc: 'Multi-tenant cloud apps' },
                          { title: 'API & Integrations', href: '/solutions/api-integrations', desc: 'Payment, CRM & courier APIs' },
                          { title: 'Hosting & Maintenance', href: '/solutions/hosting-maintenance', desc: 'DevOps & 24/7 reliability' },
                        ].map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex flex-col px-3 py-2 rounded-xl hover:bg-white/5 transition-all group"
                          >
                            <span className="text-sm font-semibold text-white group-hover:text-[#00d4aa] transition-colors">{sub.title}</span>
                            <span className="text-[11px] text-slate-400 group-hover:text-slate-300">{sub.desc}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2.5 mt-2 border-t border-white/5">
                        <Link
                          href="/solutions"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-[#00d4aa] hover:underline"
                        >
                          View All Solutions <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* AI & Automation */}
              <div
                className="relative"
                onMouseEnter={() => handleOpenDropdown('ai')}
                onMouseLeave={handleCloseDropdown}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'ai' ? null : 'ai')}
                  className={`px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-all ${
                    pathname.startsWith('/ai')
                      ? 'text-[#00d4aa] font-bold bg-[#00d4aa]/10 border border-[#00d4aa]/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <span>AI &amp; Automation</span>
                  <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'ai' ? 'rotate-180 text-[#00d4aa]' : ''}`} />
                </button>
                {activeDropdown === 'ai' && (
                  <div className="absolute top-full left-0 pt-2 z-50 animate-fade-in">
                    <div className="w-80 rounded-2xl bg-[#0d121f]/98 border border-white/10 p-3 shadow-2xl backdrop-blur-2xl">
                      <div className="px-3 py-2 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00d4aa]">AI &amp; Automation</span>
                        <span className="text-[10px] text-slate-400">Autonomous Runtimes</span>
                      </div>
                      <div className="space-y-0.5">
                        {[
                          { title: 'AI Agents', href: '/ai/ai-agents', desc: 'Autonomous task & research agents' },
                          { title: 'AI Chatbots', href: '/ai/chatbots', desc: 'RAG-powered bots for web & WhatsApp' },
                          { title: 'AI Support', href: '/ai/ai-support', desc: '24/7 bilingual customer support' },
                          { title: 'Workflow Automation', href: '/ai/automation', desc: 'Zero-touch pipelines & APIs' },
                          { title: 'AI Video', href: '/ai/ai-video', desc: 'Synthetic avatars & marketing videos' },
                        ].map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex flex-col px-3 py-2 rounded-xl hover:bg-white/5 transition-all group"
                          >
                            <span className="text-sm font-semibold text-white group-hover:text-[#00d4aa] transition-colors">{sub.title}</span>
                            <span className="text-[11px] text-slate-400 group-hover:text-slate-300">{sub.desc}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2 mt-2 border-t border-white/5">
                        <Link
                          href="/ai"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-[#00d4aa] hover:underline"
                        >
                          Explore AI Division <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Growth */}
              <div
                className="relative"
                onMouseEnter={() => handleOpenDropdown('growth')}
                onMouseLeave={handleCloseDropdown}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'growth' ? null : 'growth')}
                  className={`px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-all ${
                    pathname.startsWith('/growth')
                      ? 'text-[#00d4aa] font-bold bg-[#00d4aa]/10 border border-[#00d4aa]/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <span>Growth</span>
                  <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'growth' ? 'rotate-180 text-[#00d4aa]' : ''}`} />
                </button>
                {activeDropdown === 'growth' && (
                  <div className="absolute top-full left-0 pt-2 z-50 animate-fade-in">
                    <div className="w-80 rounded-2xl bg-[#0d121f]/98 border border-white/10 p-3 shadow-2xl backdrop-blur-2xl">
                      <div className="px-3 py-2 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00d4aa]">Growth Marketing</span>
                        <span className="text-[10px] text-slate-400">Data-Driven Scale</span>
                      </div>
                      <div className="space-y-0.5">
                        {[
                          { title: 'Social Media', href: '/growth/social-media', desc: 'Content & brand distribution' },
                          { title: 'Meta Ads', href: '/growth/meta-ads', desc: 'Facebook & Instagram buying' },
                          { title: 'Google Ads', href: '/growth/google-ads', desc: 'Search & Performance Max' },
                          { title: 'SEO', href: '/growth/seo', desc: 'Technical & content SEO' },
                          { title: 'Analytics & Tracking', href: '/growth/analytics', desc: 'CAPI & conversion pixels' },
                        ].map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex flex-col px-3 py-2 rounded-xl hover:bg-white/5 transition-all group"
                          >
                            <span className="text-sm font-semibold text-white group-hover:text-[#00d4aa] transition-colors">{sub.title}</span>
                            <span className="text-[11px] text-slate-400 group-hover:text-slate-300">{sub.desc}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2 mt-2 border-t border-white/5">
                        <Link
                          href="/growth"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-[#00d4aa] hover:underline"
                        >
                          View Growth Services <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Products / Labs */}
              <div
                className="relative"
                onMouseEnter={() => handleOpenDropdown('products')}
                onMouseLeave={handleCloseDropdown}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
                  className={`px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-all ${
                    pathname.startsWith('/labs')
                      ? 'text-[#00d4aa] font-bold bg-[#00d4aa]/10 border border-[#00d4aa]/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <span>Labs</span>
                  <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'products' ? 'rotate-180 text-[#00d4aa]' : ''}`} />
                </button>
                {activeDropdown === 'products' && (
                  <div className="absolute top-full right-0 pt-2 z-50 animate-fade-in">
                    <div className="w-80 rounded-2xl bg-[#0d121f]/98 border border-white/10 p-3 shadow-2xl backdrop-blur-2xl">
                      <div className="px-3 py-2 mb-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00d4aa]">SaaS Products</span>
                        <span className="text-[10px] text-slate-400">NextDigi Labs</span>
                      </div>
                      <div className="space-y-0.5">
                        {[
                          { title: 'NextDigi Commerce', href: '/labs/commerce', sub: 'Headless e-commerce SaaS', badge: 'Live', ext: 'https://commerce.nextdigihome.com' },
                          { title: 'NextDigi Social', href: '/labs/social', sub: 'Multi-channel social scheduler', badge: 'Beta', ext: 'https://social.nextdigihome.com' },
                          { title: 'NextDigi Automate', href: '/labs/automate', sub: 'Visual workflow automation', badge: 'Soon', ext: 'https://automate.nextdigihome.com' },
                          { title: 'Garibondhu360', href: '/labs/garibondhu360', sub: 'Workshop & fleet management ERP', badge: 'Live', ext: 'https://garibondhu360.nextdigihome.com' },
                        ].map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 transition-all group">
                            <Link href={p.href} onClick={() => setActiveDropdown(null)} className="flex flex-col flex-1 min-w-0">
                              <span className="text-sm font-semibold text-white group-hover:text-[#00d4aa] transition-colors">{p.title}</span>
                              <span className="text-[11px] text-slate-400 group-hover:text-slate-300">{p.sub}</span>
                            </Link>
                            <a
                              href={p.ext}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20 shrink-0"
                            >
                              {p.badge}
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 mt-2 border-t border-white/5">
                        <Link
                          href="/labs"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-[#00d4aa] hover:underline"
                        >
                          View All Products <ArrowRightIcon className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </nav>

            {/* Right side: cart + CTA + auth */}
            <div className="hidden lg:flex items-center gap-3.5 ml-auto shrink-0">
              <Link href="/cart" className="relative p-2 text-gray-300 hover:text-[#00d4aa] transition-colors" title="Shopping Cart">
                <ShoppingCartIcon className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00d4aa] rounded-full text-[10px] font-bold text-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm bg-[#00d4aa] text-black hover:bg-[#00e2b6] shadow-[0_0_20px_rgba(0,212,170,0.25)] active:scale-95 transition-all"
              >
                <span>Start a Project</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-xs font-semibold text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                  <button
                    onClick={() => { localStorage.removeItem('auth_token'); localStorage.removeItem('customer_email'); window.location.href = '/'; }}
                    className="text-xs font-semibold text-gray-300 hover:text-red-400 transition-colors"
                  >Logout</button>
                </>
              ) : (
                <Link href="/signin" className="text-xs font-semibold text-gray-300 hover:text-white transition-colors">Sign In</Link>
              )}
            </div>

            {/* Tablet – compact CTA */}
            <div className="hidden md:flex lg:hidden items-center gap-2 ml-auto shrink-0">
              <Link href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs bg-[#00d4aa] text-black hover:bg-[#00e2b6] active:scale-95 transition-all">
                Start Project <ArrowRightIcon className="w-3 h-3" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2 ml-auto">
              <Link href="/cart" className="relative p-2 text-[#fafafa] hover:text-[#00d4aa] transition-colors">
                <ShoppingCartIcon className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full text-xs font-bold text-[#0f0f12] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#fafafa] hover:text-[#00d4aa] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        </header>

        {/* Mobile Menu Drawer with Expandable Accordions */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 overflow-y-auto bg-[#07090e]/98 backdrop-blur-2xl md:hidden">
            <div className="pt-28 pb-12 px-4 space-y-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${pathname === '/' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa]'}`}
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${pathname === '/about' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa]'}`}
              >
                About
              </Link>

              {/* Prominent Mobile Store Banner */}
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#00d4aa]/30 bg-gradient-to-r from-[#00d4aa]/15 via-[#8b5cf6]/10 to-transparent text-white font-bold"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBagIcon className="w-5 h-5 text-[#00d4aa]" />
                  <span>Digital Products Store</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#00d4aa] text-black font-extrabold">Show All Products</span>
              </Link>

              {/* Mobile Solutions Accordion */}
              <div className="rounded-xl border border-white/5 bg-[#121217]/50 overflow-hidden">
                <button
                  onClick={() => toggleMobileSection('solutions')}
                  className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
                    Solutions
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileExpanded['solutions'] ? 'rotate-180 text-[#00d4aa]' : ''}`} />
                </button>
                {mobileExpanded['solutions'] && (
                  <div className="px-4 pb-3 space-y-1.5 pt-1 border-t border-white/5">
                    {[
                      { title: 'Web Development', href: '/solutions/web-development' },
                      { title: 'E-commerce', href: '/solutions/ecommerce' },
                      { title: 'Mobile Apps', href: '/solutions/mobile-app' },
                      { title: 'Custom Software', href: '/solutions/custom-software' },
                      { title: 'SaaS Development', href: '/solutions/saas-development' },
                      { title: 'API & Integrations', href: '/solutions/api-integrations' },
                      { title: 'Hosting & Maintenance', href: '/solutions/hosting-maintenance' },
                      { title: 'All Solutions Overview →', href: '/solutions' },
                    ].map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-1.5 rounded-lg text-sm text-[#8c8c9a] hover:text-[#00d4aa] hover:bg-white/5"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile AI Accordion */}
              <div className="rounded-xl border border-white/5 bg-[#121217]/50 overflow-hidden">
                <button
                  onClick={() => toggleMobileSection('ai')}
                  className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                    AI &amp; Automation
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileExpanded['ai'] ? 'rotate-180 text-[#8b5cf6]' : ''}`} />
                </button>
                {mobileExpanded['ai'] && (
                  <div className="px-4 pb-3 space-y-1.5 pt-1 border-t border-white/5">
                    {[
                      { title: 'AI Agents', href: '/ai/ai-agents' },
                      { title: 'AI Chatbots', href: '/ai/chatbots' },
                      { title: 'AI Support', href: '/ai/ai-support' },
                      { title: 'Workflow Automation', href: '/ai/automation' },
                      { title: 'AI Video', href: '/ai/ai-video' },
                      { title: 'All AI Solutions →', href: '/ai' },
                    ].map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-1.5 rounded-lg text-sm text-[#8c8c9a] hover:text-[#a78bfa] hover:bg-white/5"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Growth Accordion */}
              <div className="rounded-xl border border-white/5 bg-[#121217]/50 overflow-hidden">
                <button
                  onClick={() => toggleMobileSection('growth')}
                  className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
                    Growth
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileExpanded['growth'] ? 'rotate-180 text-[#ec4899]' : ''}`} />
                </button>
                {mobileExpanded['growth'] && (
                  <div className="px-4 pb-3 space-y-1.5 pt-1 border-t border-white/5">
                    {[
                      { title: 'Social Media', href: '/growth/social-media' },
                      { title: 'Meta Ads', href: '/growth/meta-ads' },
                      { title: 'Google Ads', href: '/growth/google-ads' },
                      { title: 'SEO', href: '/growth/seo' },
                      { title: 'Analytics', href: '/growth/analytics' },
                      { title: 'All Growth Solutions →', href: '/growth' },
                    ].map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-1.5 rounded-lg text-sm text-[#8c8c9a] hover:text-[#f472b6] hover:bg-white/5"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Products Accordion */}
              <div className="rounded-xl border border-white/5 bg-[#121217]/50 overflow-hidden">
                <button
                  onClick={() => toggleMobileSection('products')}
                  className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                    Products &amp; Store
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileExpanded['products'] ? 'rotate-180 text-[#f59e0b]' : ''}`} />
                </button>
                {mobileExpanded['products'] && (
                  <div className="px-4 pb-3 space-y-1.5 pt-1 border-t border-white/5">
                    <a
                      href="https://commerce.nextdigihome.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-1.5 rounded-lg text-sm text-[#8c8c9a] hover:text-white"
                    >
                      NextDigi Commerce <span className="text-[10px] text-[#00d4aa] ml-1">(Live)</span>
                    </a>
                    <a
                      href="https://social.nextdigihome.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-1.5 rounded-lg text-sm text-[#8c8c9a] hover:text-white"
                    >
                      NextDigi Social <span className="text-[10px] text-[#a78bfa] ml-1">(Beta)</span>
                    </a>
                    <a
                      href="https://automate.nextdigihome.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-1.5 rounded-lg text-sm text-[#8c8c9a] hover:text-white"
                    >
                      NextDigi Automate <span className="text-[10px] text-[#ec4899] ml-1">(Soon)</span>
                    </a>
                    <a
                      href="https://garibondhu360.nextdigihome.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-1.5 rounded-lg text-sm text-[#8c8c9a] hover:text-white"
                    >
                      Garibondhu360 <span className="text-[10px] text-[#38bdf8] ml-1">(Live)</span>
                    </a>
                    <Link
                      href="/store"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1.5 rounded-lg text-sm font-semibold text-[#00d4aa]"
                    >
                      NextDigi Store (Marketplace) →
                    </Link>
                  </div>
                )}
              </div>


              {/* Mobile CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12]"
                >
                  Start a Project →
                </Link>
              </div>

              <hr className="border-[#2a2a30] my-3" />
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-base font-medium text-[#00d4aa]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('auth_token');
                      localStorage.removeItem('customer_email');
                      setMobileMenuOpen(false);
                      window.location.href = '/';
                    }}
                    className="block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2 pt-1">
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold bg-white/10 text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        <main className="relative z-10 flex-1 pt-16 md:pt-18">
        {children}
      </main>

      {/* Floating Social Buttons */}
      <div className="fixed bottom-5 left-4 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-3 sm:bottom-8 sm:left-8">
        <a
          href="https://wa.me/1234567890?text=Hello%20Next%20Digi%20Home%20Support"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-auto sm:min-w-16 sm:justify-start"
          title="Contact us on WhatsApp"
          aria-label="Contact us on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-[#25d366]/30 blur-xl transition-all duration-500 group-hover:bg-[#25d366]/45 group-hover:blur-2xl sm:inset-y-1 sm:left-1 sm:w-16" />
          <span className="absolute inset-0 rounded-full border border-[#25d366]/35 animate-whatsapp-pulse sm:inset-y-0 sm:left-0 sm:w-16" />
          <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/35 bg-linear-to-br from-[#2df070] via-[#25d366] to-[#0f8b64] text-white shadow-2xl shadow-[#25d366]/30 transition-all duration-300 group-hover:scale-110 group-hover:border-white/60 sm:h-16 sm:w-16">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_32%)] opacity-80" />
            <span className="absolute -inset-y-6 left-0 w-5 bg-white/35 blur-sm animate-whatsapp-shine" />
            <svg className="relative z-10 h-7 w-7 drop-shadow-lg sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16.01 3.2c-7.02 0-12.73 5.69-12.73 12.69 0 2.24.59 4.43 1.72 6.36L3.17 28.8l6.72-1.76a12.8 12.8 0 0 0 6.12 1.56c7.02 0 12.73-5.69 12.73-12.7S23.03 3.2 16.01 3.2Zm0 23.24c-1.9 0-3.77-.51-5.4-1.48l-.39-.23-3.99 1.04 1.06-3.87-.25-.4a10.45 10.45 0 0 1-1.6-5.61c0-5.81 4.74-10.53 10.57-10.53s10.57 4.72 10.57 10.53-4.74 10.55-10.57 10.55Zm5.8-7.89c-.32-.16-1.88-.92-2.17-1.03-.29-.11-.5-.16-.71.16-.21.31-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.29 3.27c.16.21 2.24 3.41 5.42 4.78.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.37Z" />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#facc15] shadow-lg shadow-[#facc15]/40" />
          </span>
          <span className="relative ml-3 hidden max-w-0 items-center overflow-hidden rounded-full border border-[#25d366]/30 bg-[#101512]/90 px-0 py-2 text-sm font-bold text-white shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-300 group-hover:max-w-44 group-hover:px-4 sm:flex">
            <span className="whitespace-nowrap">Live Chat</span>
          </span>
        </a>

        <a
          href="https://www.facebook.com/NextdigiHome/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-auto sm:min-w-16 sm:justify-start"
          title="Follow NextdigiHome on Facebook"
          aria-label="Follow NextdigiHome on Facebook"
        >
          <span className="absolute inset-0 rounded-full bg-[#1877f2]/30 blur-xl transition-all duration-500 group-hover:bg-[#1877f2]/45 group-hover:blur-2xl sm:inset-y-1 sm:left-1 sm:w-16" />
          <span className="absolute inset-0 rounded-full border border-[#1877f2]/35 animate-facebook-pulse sm:inset-y-0 sm:left-0 sm:w-16" />
          <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/35 bg-linear-to-br from-[#4da3ff] via-[#1877f2] to-[#0b4fba] text-white shadow-2xl shadow-[#1877f2]/30 transition-all duration-300 group-hover:scale-110 group-hover:border-white/60 sm:h-16 sm:w-16">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_32%)] opacity-80" />
            <span className="absolute -inset-y-6 left-0 w-5 bg-white/30 blur-sm animate-whatsapp-shine" />
            <svg className="relative z-10 h-7 w-7 drop-shadow-lg sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
            </svg>
          </span>
          <span className="relative ml-3 hidden max-w-0 items-center overflow-hidden rounded-full border border-[#1877f2]/30 bg-[#10131b]/90 px-0 py-2 text-sm font-bold text-white shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-300 group-hover:max-w-52 group-hover:px-4 sm:flex">
            <span className="whitespace-nowrap">NextdigiHome</span>
          </span>
        </a>
      </div>

      {/* Premium Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[60] w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1a1a1f] border border-[#2a2a30] hover:border-[#00d4aa] shadow-xl hover:shadow-2xl hover:shadow-[#00d4aa]/20 backdrop-blur-xl transition-all duration-300 flex items-center justify-center text-[#fafafa] group overflow-hidden ${
          showBackToTop
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-6 scale-75 pointer-events-none'
        }`}
        title="Back to top"
      >
        {/* Gradient glow on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-y-0.5 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-[8px] font-bold tracking-[1px] opacity-60 group-hover:opacity-100 transition-all mt-0.5">TOP</span>
        </div>
      </button>

      {/* Footer - Premium Ecosystem Architecture */}
      <footer className="relative z-20 border-t border-[#2a2a30] bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Brand Column (Span 4) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center group py-1">
                <NextDigiLogo
                  size="lg"
                  subtitle="BUILD • LAUNCH • AUTOMATE • GROW"
                  customLogoUrl={isHydrated && (settings?.site_logo || settings?.admin_logo) ? getLogoUrl(settings.site_logo || settings.admin_logo) : null}
                />
              </div>

              <p className="text-[#8c8c9a] text-xs sm:text-sm leading-relaxed pr-2" suppressHydrationWarning>
                {isHydrated ? (settings?.admin_description || "Empowering modern enterprises. Build • Launch • Automate • Grow with enterprise software development, intelligent AI systems, SaaS products, and digital growth solutions.") : "Empowering modern enterprises. Build • Launch • Automate • Grow with enterprise software development, intelligent AI systems, SaaS products, and digital growth solutions."}
              </p>

              {/* Division badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/25">Solutions</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#8b5cf6]/10 text-[#a78bfa] border border-[#8b5cf6]/25">AI &amp; RPA</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ec4899]/10 text-[#f472b6] border border-[#ec4899]/25">Growth</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#f59e0b]/10 text-[#fbbf24] border border-[#f59e0b]/25">Labs</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/5 text-[#d4d4d8] border border-white/10">Store</span>
              </div>

              {/* Social Icons */}
              <div className="flex gap-2 pt-2">
                {[
                  { 
                    icon: 'M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z', 
                    label: 'Facebook', 
                    href: 'https://www.facebook.com/NextdigiHome/' 
                  },
                  { 
                    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', 
                    label: 'YouTube', 
                    href: 'https://www.youtube.com/@FullStackSAPGuy' 
                  },
                  { 
                    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', 
                    label: 'LinkedIn', 
                    href: '#' 
                  }
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.label} 
                    className="w-9 h-9 rounded-xl border border-[#2a2a30] flex items-center justify-center text-[#737373] hover:text-[#00d4aa] hover:border-[#00d4aa] hover:bg-[#00d4aa]/5 transition-all duration-200 active:scale-95"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: SOLUTIONS (Span 2) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold mb-4 text-[#fafafa] tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                Solutions
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {[
                  { label: "Web Development", href: "/solutions/web-development" },
                  { label: "E-commerce", href: "/solutions/ecommerce" },
                  { label: "Mobile Apps", href: "/solutions/mobile-app" },
                  { label: "Custom Software", href: "/solutions/custom-software" },
                  { label: "SaaS Development", href: "/solutions/saas-development" },
                  { label: "API & Integrations", href: "/solutions/api-integrations" },
                  { label: "Hosting & Support", href: "/solutions/hosting-maintenance" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-[#8c8c9a] hover:text-[#00d4aa] transition-all duration-200 block truncate"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: AI & GROWTH (Span 2) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold mb-4 text-[#fafafa] tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                AI &amp; Growth
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {[
                  { label: "AI Agents", href: "/ai/ai-agents" },
                  { label: "AI Chatbots", href: "/ai/chatbots" },
                  { label: "AI Customer Support", href: "/ai/ai-support" },
                  { label: "Workflow Automation", href: "/ai/automation" },
                  { label: "Social Media Growth", href: "/growth/social-media" },
                  { label: "Meta & Google Ads", href: "/growth/meta-ads" },
                  { label: "SEO & Analytics", href: "/growth/seo" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-[#8c8c9a] hover:text-[#a78bfa] transition-all duration-200 block truncate"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: PRODUCTS & LABS (Span 2) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold mb-4 text-[#fafafa] tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                Products &amp; Labs
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {[
                  { label: "NextDigi Commerce", href: "https://commerce.nextdigihome.com/", badge: "Live" },
                  { label: "NextDigi Social", href: "https://social.nextdigihome.com/", badge: "Beta" },
                  { label: "NextDigi Automate", href: "https://automate.nextdigihome.com/", badge: "Soon" },
                  { label: "Garibondhu360", href: "https://garibondhu360.nextdigihome.com/", badge: "Live" },
                  { label: "NextDigi Store", href: "/store", badge: "Store" },
                  { label: "Browse Products", href: "/products", badge: "" },
                ].map((item, idx) => (
                  <li key={idx}>
                    {item.href.startsWith('http') ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-[#8c8c9a] hover:text-[#fbbf24] transition-all duration-200"
                      >
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white/10 text-white/80">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center justify-between text-[#8c8c9a] hover:text-[#fbbf24] transition-all duration-200"
                      >
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white/10 text-white/80">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: COMPANY & LEGAL (Span 2) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold mb-4 text-[#fafafa] tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                Company
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm mb-6">
                {[
                  { label: "About NextDigi", href: "/about" },
                  { label: "Case Studies", href: "/case-studies" },
                  { label: "Start a Project", href: "/contact" },
                  { label: "Careers & Jobs", href: "/contact?subject=Careers" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Refund Policy", href: "/refund" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-[#8c8c9a] hover:text-white transition-all duration-200 block truncate"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Android App & Subscription Banner */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center p-6 rounded-3xl border border-[#2a2a30] bg-[#0c0c0f]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00d4aa]/10 border border-[#00d4aa]/25 flex items-center justify-center text-[#00d4aa] shrink-0">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.2 9.1h9.6a1 1 0 0 1 1 1v7.1a1 1 0 0 1-1 1h-.7v2.1a1.2 1.2 0 0 1-2.4 0v-2.1H10.3v2.1a1.2 1.2 0 0 1-2.4 0v-2.1h-.7a1 1 0 0 1-1-1v-7.1a1 1 0 0 1 1-1Zm-3.1 1.2c.7 0 1.2.5 1.2 1.2v4.2a1.2 1.2 0 0 1-2.4 0v-4.2c0-.7.5-1.2 1.2-1.2Zm15.8 0c.7 0 1.2.5 1.2 1.2v4.2a1.2 1.2 0 0 1-2.4 0v-4.2c0-.7.5-1.2 1.2-1.2ZM8.4 3.4 7.3 1.5a.5.5 0 1 1 .9-.5l1.1 1.9A6.9 6.9 0 0 1 12 2.4c1 0 1.9.2 2.7.5L15.8 1a.5.5 0 1 1 .9.5l-1.1 1.9A6.2 6.2 0 0 1 18 8H6a6.2 6.2 0 0 1 2.4-4.6ZM9.4 5.9a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4Zm5.2 0a.7.7 0 1 0 0-1.4.7.7 0 0 0 0 1.4Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">NextDigi Mobile App (Android APK)</p>
                <p className="text-xs text-[#8c8c9a]">Access digital orders and software assets on the go.</p>
              </div>
              <a
                href={ANDROID_APP_DOWNLOAD_URL}
                download
                className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30 hover:bg-[#00d4aa] hover:text-[#0f0f12] transition-all"
              >
                Download APK
              </a>
            </div>

            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:gap-0">
              <input 
                type="email" 
                placeholder="Enter email for ecosystem updates..." 
                className="min-w-0 flex-1 rounded-xl border border-[#2a2a30] bg-[#0f0f12] px-4 py-2.5 text-xs sm:text-sm text-[#fafafa] placeholder:text-[#555] transition-colors focus:outline-none focus:border-[#00d4aa] sm:rounded-l-2xl sm:rounded-r-none" 
              />
              <button 
                onClick={() => {
                  setSubscribed(true);
                  setTimeout(() => setSubscribed(false), 2400);
                }}
                className="min-w-[80px] rounded-xl bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0f0f12] transition-all hover:brightness-110 sm:rounded-l-none sm:rounded-r-2xl"
              >
                {subscribed ? "Subscribed!" : "Join"}
              </button>
            </div>
          </div>


          {/* Premium Payment Methods */}
          <div className="mt-12 pt-8 border-t border-[#2a2a30]">
            <div className="flex flex-col items-center">
              <div className="text-center mb-5">
                <span className="text-xs tracking-[1.5px] sm:tracking-[3px] text-[#737373] font-medium">SECURE CHECKOUT • INSTANT DELIVERY</span>
              </div>
              <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    label: 'bKash',
                    tagline: 'Mobile Banking',
                    color: '#E2136E',
                    bg: 'from-[#2a0617] via-[#1a1a1f] to-[#12060b]',
                    logo: (
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#E2136E] text-white shadow-lg shadow-[#E2136E]/30">
                          <span className="absolute h-5 w-5 rotate-45 rounded-sm bg-white/92" />
                          <span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-full bg-[#E2136E]" />
                        </span>
                        <span className="text-xl font-black tracking-tight text-[#E2136E]">bKash</span>
                      </span>
                    ),
                  },
                  {
                    label: 'Rocket',
                    tagline: 'DBBL Wallet',
                    color: '#8D2B8C',
                    bg: 'from-[#210624] via-[#1a1a1f] to-[#120d18]',
                    logo: (
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#8D2B8C] text-white shadow-lg shadow-[#8D2B8C]/30">
                          <span className="absolute h-6 w-3 rounded-full border-2 border-white/95" />
                          <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-[#F7941D]" />
                        </span>
                        <span className="text-xl font-black italic tracking-tight text-[#F7941D]">Rocket</span>
                      </span>
                    ),
                  },
                  {
                    label: 'Nagad',
                    tagline: 'Digital Payment',
                    color: '#F15A24',
                    bg: 'from-[#2a1008] via-[#1a1a1f] to-[#171009]',
                    logo: (
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#F15A24] text-white shadow-lg shadow-[#F15A24]/30">
                          <span className="h-5 w-5 rounded-full border-[5px] border-white" />
                          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#F9B233]" />
                        </span>
                        <span className="text-xl font-black tracking-tight text-[#F15A24]">Nagad</span>
                      </span>
                    ),
                  },
                  {
                    label: 'Prime Bank',
                    tagline: 'Card & Bank Pay',
                    color: '#2E63B8',
                    bg: 'from-[#07142a] via-[#1a1a1f] to-[#071b16]',
                    logo: (
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#2E63B8] text-white shadow-lg shadow-[#2E63B8]/30">
                          <span className="absolute h-6 w-6 rounded-md border-2 border-white/90" />
                          <span className="absolute h-3 w-3 rounded-sm bg-[#00A651]" />
                        </span>
                        <span className="leading-none">
                          <span className="block text-sm font-black tracking-tight text-[#2E63B8]">Prime</span>
                          <span className="block text-sm font-black tracking-tight text-[#00A651]">Bank</span>
                        </span>
                      </span>
                    ),
                  },
                ].map((pm, i) => (
                  <div
                    key={pm.label}
                    className={`payment-badge group relative flex min-h-[5.5rem] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${pm.bg} p-3 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25`}
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(255,255,255,0.16),transparent_34%)] opacity-80" />
                    <span className="payment-badge-shine absolute -inset-y-8 left-0 w-8 bg-white/15 blur-md" style={{ animationDelay: `${i * 0.45}s` }} />
                    <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                    <span className="relative flex min-w-0 flex-1 flex-col justify-center gap-2">
                      {pm.logo}
                      <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-[#b0b0b0]">
                        {pm.tagline}
                      </span>
                    </span>
                    <span
                      className="absolute bottom-3 right-3 h-2 w-2 rounded-full shadow-[0_0_16px_currentColor] transition-transform duration-300 group-hover:scale-150"
                      style={{ backgroundColor: pm.color, color: pm.color }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {['SSL Secured', 'Instant Access', 'Verified Checkout'].map((item) => (
                  <div key={item} className="rounded-full border border-[#00d4aa]/20 bg-[#00d4aa]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-[#9ff5e4]">
                    {item}
                  </div>
                ))}
              </div>
              <p className="max-w-full text-center text-[10px] text-[#555] mt-4 tracking-wide sm:tracking-wider">256-BIT SSL • ALL TRANSACTIONS SECURE &amp; ENCRYPTED</p>
            </div>
          </div>

          {/* Premium Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-[#2a2a30] flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#737373]">
            <p>© 2026 Next Digi Home. All rights reserved. Crafted for ambitious businesses worldwide.</p>
            <div className="flex items-center gap-2 text-[11px]">
              <span>Powered by</span>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-medium">
                <div className="w-3.5 h-3.5 rounded bg-[#0f0f12]/80 flex items-center justify-center overflow-hidden">
                  {settings?.admin_logo ? (
                    <img src={getLogoUrl(settings.admin_logo)!} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  )}
                </div>
                <span className="font-bold tracking-widest text-[10px]">DIGI</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
