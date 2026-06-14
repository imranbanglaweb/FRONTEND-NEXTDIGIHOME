'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { apiFetch, BACKEND_BASE_URL, getStorageUrl, getLogoUrl } from './utils/api';

const getFaviconUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;

  if (path.startsWith('http')) {
    const match = path.match(/\/public\/(.+)$/);
    if (match) {
      return `/api/logo?file=${encodeURIComponent(match[1])}`;
    }
    return null;
  }

  return `/api/logo?file=${encodeURIComponent(path.replace(/^\/+/, ''))}`;
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

// Update favicon dynamically when settings change
    useEffect(() => {
      if (!isHydrated || !settings?.favicon) return;
      const faviconUrl = getFaviconUrl(settings.favicon);
      if (faviconUrl) {
        let link = document.querySelector('link[rel="icon"]');
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'icon');
          document.head.appendChild(link);
        }
        link.setAttribute('href', faviconUrl);
        // Set correct MIME type based on file extension
        const ext = settings.favicon.toLowerCase().split('.').pop();
        const typeMap: Record<string, string> = {
          'ico': 'image/x-icon',
          'png': 'image/png',
          'svg': 'image/svg+xml',
        };
        link.setAttribute('type', typeMap[ext || ''] || 'image/x-icon');
      }
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
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,170,0.08)_0%,rgba(8,8,8,0)_50%)]" />
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#8b5cf6] opacity-15 mix-blend-screen blur-[90px] filter sm:-top-40 sm:-right-40 sm:h-96 sm:w-96 sm:opacity-20 sm:blur-[120px] animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/2 left-1/4 h-56 w-56 rounded-full bg-[#00d4aa] opacity-10 mix-blend-screen blur-[90px] filter sm:left-1/3 sm:h-96 sm:w-96 sm:opacity-15 sm:blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#8b5cf6] opacity-15 mix-blend-screen blur-[90px] filter sm:-bottom-40 sm:-left-40 sm:h-96 sm:w-96 sm:opacity-20 sm:blur-[120px] animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(42,42,48,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,42,48,0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

        <header className={`header fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0f12]/95 backdrop-blur-xl shadow-lg border-[#2a2a30]'
            : 'bg-transparent border-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 md:py-1 gap-2 lg:gap-4">
            <Link href="/" className="flex min-w-0 items-center group flex-shrink-0 gap-2 sm:gap-3">
              <div className="h-12 w-12 flex-shrink-0 rounded-xl sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 lg:rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden border border-[#2a2a30]">
                {isHydrated && (() => {
                  // Use site_logo, or fall back to admin_logo if site_logo is not set
                  const logoToUse = settings?.admin_logo || settings?.admin_logo;
                  const logoUrl = logoToUse ? getLogoUrl(logoToUse) : null;

                  return logoUrl ? (
                    <img
                      key={logoToUse}
                      src={logoUrl}
                      alt="Site Logo"
                      decoding="async"
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        console.warn(`Logo failed to load from: ${logoUrl}`);
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                  ) : null;
                })()}

                <svg 
                  className="h-7 w-7 text-[#00d4aa] sm:h-9 sm:w-9" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              {/* Site Title - Now shows from API */}
              <div className="hidden min-w-0 sm:block">
                <span className="block max-w-[11rem] truncate text-lg font-bold gradient-text tracking-tight lg:max-w-none lg:text-xl">
                  {settings?.admin_title || 'Next Digi Home'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex min-w-0 items-center gap-0.5 lg:gap-1">
              <Link href="/" className={`px-2.5 py-2 lg:px-4 rounded-lg transition-all duration-200 text-sm font-medium ${pathname === '/' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                Home
              </Link>
              <Link href="/products" className={`px-2.5 py-2 lg:px-4 rounded-lg transition-all duration-200 text-sm font-medium ${pathname.startsWith('/products') ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                Products
              </Link>
              <Link href="/about" className={`px-2.5 py-2 lg:px-4 rounded-lg transition-all duration-200 text-sm font-medium ${pathname === '/about' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                About
              </Link>
              <Link href="/blog" className={`px-2.5 py-2 lg:px-4 rounded-lg transition-all duration-200 text-sm font-medium ${pathname.startsWith('/blog') ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                Blog
              </Link>
              <Link href="/services" className={`px-2.5 py-2 lg:px-4 rounded-lg transition-all duration-200 text-sm font-medium ${pathname === '/services' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                Services
              </Link>
              <Link href="/contact" className={`px-2.5 py-2 lg:px-4 rounded-lg transition-all duration-200 text-sm font-medium ${pathname === '/contact' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-1 lg:gap-3">
              <Link href="/cart" className="relative p-2 text-[#fafafa] hover:text-[#00d4aa] transition-colors" title="Shopping Cart">
                <ShoppingCartIcon className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full text-xs font-bold text-[#0f0f12] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-[#00d4aa] hover:text-[#8b5cf6] transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('auth_token');
                      localStorage.removeItem('customer_email');
                      window.location.href = '/';
                    }}
                    className="px-4 py-2 text-sm font-medium text-[#fafafa] hover:text-red-400 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/signin" className="px-4 py-2 text-sm font-medium text-[#fafafa] hover:text-[#00d4aa] transition-colors">
                    Sign In
                  </Link>
                  <Link href="/signup" className="group relative px-5 py-2.5 font-medium text-sm">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative text-[#0f0f12] flex items-center gap-2">
                      Sign Up
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
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
              >
                {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 overflow-y-auto bg-[#0f0f12]/95 backdrop-blur-xl md:hidden">
            <div className="pt-20 pb-8 px-4 space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all ${pathname === '/' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all ${pathname.startsWith('/products') ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}
              >
                Products
                {cartCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full text-xs text-[#0f0f12]">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all ${pathname === '/about' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}
              >
                About
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all ${pathname.startsWith('/blog') ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}
              >
                Blog
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all ${pathname === '/services' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}
              >
                Services
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all ${pathname === '/contact' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}
              >
                Contact
              </Link>
              <hr className="border-[#2a2a30] my-4" />
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-lg font-medium text-[#00d4aa] hover:text-[#8b5cf6] hover:bg-[#2a2a30]/50 transition-all"
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
                    className="block w-full text-left px-4 py-3 rounded-lg text-lg font-medium text-[#fafafa] hover:text-red-400 hover:bg-[#2a2a30]/50 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-lg font-medium text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-lg font-medium bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        <main className="relative z-10 flex-1 pt-20 sm:pt-24 lg:pt-28">
        {children}
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890?text=Hello%20Next%20Digi%20Home%20Support"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-linear-to-br from-[#25d366] to-[#128c7e] text-xl text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl sm:bottom-8 sm:left-8 sm:h-16 sm:w-16 sm:text-2xl sm:border-3 group animate-float"
        title="Contact us on WhatsApp"
      >
        <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.782 1.176l-.002 1.146c0 4.995 4.027 9.06 9.03 9.06h.013c1.104 0 2.183-.153 3.22-.45l1.146.002h-.004c.573 0 1.088-.227 1.513-.652.425-.425.652-.94.652-1.513v-.146a9.87 9.87 0 00-9.077-8.723z"/>
        </svg>
        <div className="absolute -top-12 left-0 bg-linear-to-br from-[#25d366] to-[#128c7e] text-white px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us
        </div>
      </a>

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

      {/* Footer - Premium Enhanced */}
      <footer className="relative z-20 border-t border-[#2a2a30] bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Column - Now fully dynamic */}
            <div className="space-y-5">
              <div className="flex items-center space-x-3 group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden border border-[#2a2a30] group-hover:border-[#00d4aa]/40 transition-all">
                  {isHydrated && (() => {
                    // Use site_logo, or fall back to admin_logo if site_logo is not set
                    const logoToUse = settings?.admin_logo || settings?.admin_logo;
                    const logoUrl = logoToUse ? getLogoUrl(logoToUse) : null;
                    return logoUrl ? (
                      <img
                        key={logoToUse}
                        src={logoUrl}
                        alt="Site Logo"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.warn(`Footer logo failed to load from: ${logoUrl}`);
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null;
                  })()}
                  <svg className={`w-7 h-7 text-[#00d4aa] ${isHydrated && (settings?.admin_logo || settings?.admin_logo) ? 'hidden' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold gradient-text tracking-tight">
                    {isHydrated ? (settings?.admin_title || 'Next Digi Home') : 'Next Digi Home'}
                  </span>
                  <span className="text-[10px] text-[#737373] tracking-[2px] uppercase">Premium Digital Marketplace</span>
                </div>
              </div>

               <p className="text-[#737373] text-sm leading-relaxed pr-2" suppressHydrationWarning>
                 {isHydrated ? (settings?.admin_description || "Premium digital products engineered for modern businesses. Transform your business with our curated collection.") : "Premium digital products engineered for modern businesses. Transform your business with our curated collection."}
               </p>

              {/* Premium Social Icons */}
              <div className="flex gap-2 pt-1">
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

            {/* Dynamic Categories */}
            <div>
              <h4 className="text-sm font-semibold mb-5 text-[#fafafa] tracking-wider flex items-center gap-2">
                TOP CATEGORIES
                <span className="h-px flex-1 bg-gradient-to-r from-[#00d4aa]/30 to-transparent"></span>
              </h4>
              <ul className="space-y-2.5 text-sm">
                {categories.slice(0, 8).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/products?category=${category.slug || category.id}`}
                      className="flex items-center gap-2 text-[#737373] hover:text-[#00d4aa] transition-all duration-200 hover:translate-x-0.5"
                    >
                      <span className="text-base">{categoryIconMap[category.slug] || '📌'}</span>
                      {category.category_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

             {/* Company */}
             <div>
               <h4 className="text-sm font-semibold mb-5 text-[#fafafa] tracking-wider flex items-center gap-2">
                 COMPANY
                 <span className="h-px flex-1 bg-gradient-to-r from-[#00d4aa]/30 to-transparent"></span>
               </h4>
                <ul className="space-y-2.5 text-sm">
{[
                     { label: "About Us", href: "/about", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                     { label: "Blog", href: "/blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" },
                     { label: "Services", href: "/services", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 001.065 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
                    { label: "Sitemap", href: "/sitemap", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
                    { label: "Contact", href: "/contact", icon: "M3 8l7.89 5.26a2.01 2.01 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" },
                    { label: "Privacy Policy", href: "/privacy", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V9a4 4 0 00-8 0v1" },
                    { label: "Terms of Service", href: "/terms", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="flex items-center gap-2 text-[#737373] hover:text-[#00d4aa] transition-all duration-200 hover:translate-x-0.5">
                        <svg className="w-3.5 h-3.5 text-[#00d4aa]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                        </svg>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
            </div>

            {/* Connect + Premium Newsletter */}
            <div>
              <h4 className="text-sm font-semibold mb-5 text-[#fafafa] tracking-wider flex items-center gap-2">
                STAY CONNECTED
                <span className="h-px flex-1 bg-gradient-to-r from-[#00d4aa]/30 to-transparent"></span>
              </h4>
              <div className="space-y-2.5 text-sm text-[#737373] mb-6">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00d4aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2.01 2.01 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@nextdigihome.com
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00d4aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2 3 3 0 003 3v1m6 0v1a3 3 0 003 3 2 2 0 01-2 2h-1m-6 0H6a2 2 0 01-2-2v-1" />
                  </svg>
                  +880 1918-329829
                </p>
              </div>

              <div className="pt-4 border-t border-[#2a2a30]">
                <p className="text-xs text-[#737373] mb-3 tracking-wider">SUBSCRIBE FOR UPDATES</p>
                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:gap-0">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="min-w-0 flex-1 rounded-xl border border-[#2a2a30] bg-[#0f0f12] px-4 py-2.5 text-sm text-[#fafafa] placeholder:text-[#555] transition-colors focus:outline-none focus:border-[#00d4aa] sm:rounded-l-2xl sm:rounded-r-none" 
                  />
                  <button 
                    onClick={() => {
                      setSubscribed(true);
                      setTimeout(() => setSubscribed(false), 2400);
                    }}
                    className="min-w-[78px] rounded-xl bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] px-5 py-2.5 text-sm font-semibold text-[#0f0f12] transition-all hover:brightness-110 active:scale-[0.985] sm:rounded-l-none sm:rounded-r-2xl"
                  >
                    {subscribed ? "Thank you!" : "Join"}
                  </button>
                </div>
                <p className="text-[10px] text-[#555] mt-1.5">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>

          {/* Premium Payment Methods */}
          <div className="mt-12 pt-8 border-t border-[#2a2a30]">
            <div className="flex flex-col items-center">
              <div className="text-center mb-5">
                <span className="text-xs tracking-[1.5px] sm:tracking-[3px] text-[#737373] font-medium">SECURE CHECKOUT • INSTANT DELIVERY</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { label: 'bKash', color: '#E2136E' },
                  { label: 'Rocket', color: '#F7941D' },
                  { label: 'Nagad', color: '#00A651' },
                  { label: 'Prime Bank', color: '#3B82F6' },
                ].map((pm, i) => (
                  <div key={i} className="group relative flex min-w-[7rem] items-center justify-center rounded-xl border border-[#2a2a30] bg-[#1a1a1f] px-3 py-2 transition-all hover:border-[#00d4aa]/40 hover:bg-[#00d4aa]/5 sm:rounded-2xl sm:px-4">
                    <span className="text-xs font-bold text-[#fafafa] transition-all" style={{ color: pm.color }}>
                      {pm.label}
                    </span>
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
