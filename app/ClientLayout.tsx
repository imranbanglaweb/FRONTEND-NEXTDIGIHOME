'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

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
  const [settings, setSettings] = useState<{
    site_logo?: string;
    admin_logo?: string;
    site_title?: string;
    admin_title?: string;
    site_description?: string;
    admin_description?: string;
  } | null>({site_logo: 'logo.png', site_title: 'Next Digi Home'});

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cart', {
        credentials: 'include',
      });
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setCartCount(data.items?.length || 0);
        }
      }
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,170,0.08)_0%,rgba(8,8,8,0)_50%)]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(42,42,48,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,42,48,0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

        <header className={`header fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0f12]/95 backdrop-blur-xl shadow-lg border-[#2a2a30]'
            : 'bg-transparent border-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-0.5">
            <Link href="/" className="flex items-center group">
              <div className="w-24 h-24 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                {(() => {
                  const isAdminPage = pathname.startsWith('/admin');
                  // Use admin_logo for admin pages, site_logo for regular pages
                  const logoToUse = isAdminPage
                    ? settings?.admin_logo
                    : settings?.admin_logo;

                  return logoToUse ? (
                    <img
                      src={`http://localhost:8000/api/logo/${logoToUse}`}
                      alt={isAdminPage ? "Admin Logo" : "Site Logo"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to default icon if logo fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null;
                })()}
                <svg className={`w-8 h-8 text-[#00d4aa] ${(() => {
                  const isAdminPage = pathname.startsWith('/admin');
                  const logoToUse = isAdminPage 
                    ? settings?.admin_logo 
                    : (settings?.admin_logo || settings?.admin_logo);
                  return logoToUse ? 'hidden' : '';
                })()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/" className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${pathname === '/' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                Home
              </Link>
              <Link href="/products" className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${pathname.startsWith('/products') ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                Products
              </Link>
              <Link href="/about" className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${pathname === '/about' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                About
              </Link>
              <Link href="/services" className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${pathname === '/services' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                Services
              </Link>
              <Link href="/contact" className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${pathname === '/contact' ? 'text-[#00d4aa] bg-[#2a2a30]/50' : 'text-[#fafafa] hover:text-[#00d4aa] hover:bg-[#2a2a30]/50'}`}>
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
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
          <div className="fixed inset-0 z-40 bg-[#0f0f12]/95 backdrop-blur-xl md:hidden">
            <div className="pt-24 pb-6 px-4 space-y-2">
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

        <main className="relative z-10 flex-1 pt-28">
        {children}
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890?text=Hello%20Next%20Digi%20Home%20Support"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-[#25d366] to-[#128c7e] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white text-2xl group animate-float border-3 border-white"
        title="Contact us on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.782 1.176l-.002 1.146c0 4.995 4.027 9.06 9.03 9.06h.013c1.104 0 2.183-.153 3.22-.45l1.146.002h-.004c.573 0 1.088-.227 1.513-.652.425-.425.652-.94.652-1.513v-.146a9.87 9.87 0 00-9.077-8.723z"/>
        </svg>
        <div className="absolute -top-12 left-0 bg-gradient-to-br from-[#25d366] to-[#128c7e] text-white px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us
        </div>
      </a>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center text-white group ${
          showBackToTop
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        }`}
        title="Back to top"
      >
        <svg className="w-6 h-6 transform -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Footer */}
      <footer className="relative z-20 border-t border-[#2a2a30] bg-[#1a1a1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl  from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center overflow-hidden">
                  {settings?.admin_logo ? (
                    <img
                      src={`http://localhost:8000/api/logo/${settings.admin_logo}`}
                      alt="Site Logo"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to default icon if logo fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <svg className={`w-6 h-6 text-[#0f0f12] ${settings?.admin_logo ? 'hidden' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold gradient-text">
                  {settings?.site_title || 'Next Digi Home'}
                </span>
              </div>
              <p className="text-[#737373] text-sm leading-relaxed">
                Premium digital products engineered for modern businesses. Transform your business with our curated collection.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-full border border-[#2a2a30] flex items-center justify-center text-[#737373] hover:text-[#00d4aa] hover:border-[#00d4aa] transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#2a2a30] flex items-center justify-center text-[#737373] hover:text-[#00d4aa] hover:border-[#00d4aa] transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#2a2a30] flex items-center justify-center text-[#737373] hover:text-[#00d4aa] hover:border-[#00d4aa] transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-[#fafafa]">Top Categories</h4>
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 8).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/products?category=${category.id}`}
                      className="text-[#737373] hover:text-[#00d4aa] transition-colors"
                    >
                      {category.category_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-[#fafafa]">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-[#737373] hover:text-[#00d4aa] transition-colors">About Us</Link></li>
                <li><Link href="/services" className="text-[#737373] hover:text-[#00d4aa] transition-colors">Services</Link></li>
                <li><Link href="/contact" className="text-[#737373] hover:text-[#00d4aa] transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-[#737373] hover:text-[#00d4aa] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-[#737373] hover:text-[#00d4aa] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-[#fafafa]">Connect</h4>
              <p className="text-[#737373] text-sm mb-2">info@nextdigihome.com</p>
              <p className="text-[#737373] text-sm">01918329829</p>
              <div className="mt-4 pt-4 border-t border-[#2a2a30]">
                <p className="text-xs text-[#737373]">Subscribe to our newsletter</p>
                <div className="flex mt-2">
                  <input type="email" placeholder="Enter your email" className="flex-1 bg-[#0f0f12] border border-r-0 border-[#2a2a30] text-sm px-3 py-2 rounded-l-lg focus:outline-none focus:border-[#00d4aa] transition-colors" />
                  <button className="bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] text-sm font-medium px-3 py-2 rounded-r-lg hover:opacity-90 transition-opacity">
                    Go
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#2a2a30] flex flex-col md:flex-row justify-between items-center text-sm text-[#737373]">
            <p>&copy; 2026 Next Digi Home. All rights reserved. Built for modern businesses worldwide.</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-xs">Powered by</span>
              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center overflow-hidden">
                {settings?.admin_logo ? (
                  <img
                    src={`http://localhost:8000/api/logo/${settings.admin_logo}`}
                    alt="Site Logo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <svg className={`w-4 h-4 text-[#0f0f12] ${settings?.admin_logo ? 'hidden' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}