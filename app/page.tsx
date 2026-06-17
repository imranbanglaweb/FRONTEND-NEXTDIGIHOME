'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getStorageUrl, apiFetch, getLogoUrl } from './utils/api';

// Category Icons Mapping
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

interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  cta_text?: string;
  cta_link?: string;
  image?: string;
  background_color?: string;
  text_color?: string;
  sort_order: number;
  is_active: boolean;
}

interface Stat {
  id: number;
  key: string;
  value: string;
  label: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
}



interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compare_price?: number;
  category?: string;
  category_id?: number | string | null;
  category_name?: string | null;
  category_slug?: string | null;
  thumbnail?: string;
  featured?: boolean;
  active?: boolean;
}

interface Category {
  id: number | string;
  category_name: string;
  slug: string;
}

interface HomeContent {
  hero_sliders: HeroSlide[];
  stats: Stat[];
  features: Feature[];
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [welcomeSettings, setWelcomeSettings] = useState<WelcomeSettings | null>(null);

  const nextSlide = useCallback(() => {
    const sliderCount = Math.max(allProducts.length, homeContent?.hero_sliders?.length || 0, 6);
    setCurrentSlide((prev) => (prev + 1) % sliderCount);
  }, [allProducts.length, homeContent]);

  const prevSlide = useCallback(() => {
    const sliderCount = Math.max(allProducts.length, homeContent?.hero_sliders?.length || 0, 6);
    setCurrentSlide((prev) => (prev - 1 + sliderCount) % sliderCount);
  }, [allProducts.length, homeContent]);

   useEffect(() => {
     const fetchHomeContent = async () => {
       try {
         const data = await apiFetch('content/home');
         if (data.success && data.data) {
           setHomeContent(data.data);
         } else {
           console.warn('API returned success but no data:', data);
         }
       } catch (error) {
         console.error('Failed to fetch home content:', error);
       } finally {
         setLoading(false);
       }
     };

     fetchHomeContent();
   }, []);

   useEffect(() => {
     const fetchProducts = async () => {
       try {
         const data = await apiFetch(`products?per_page=${50}`);
         setAllProducts(data.data);
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
         setAllCategories(data);
       } catch (error) {
         console.error('Failed to fetch categories:', error);
       } finally {
         setLoadingCategories(false);
       }
     };

     fetchCategories();
   }, []);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('nextdigihome_settings');
      if (savedSettings) {
        window.setTimeout(() => setWelcomeSettings(JSON.parse(savedSettings)), 0);
      }

      if (sessionStorage.getItem('nextdigihome_welcome_popup_seen') !== 'true') {
        const timer = window.setTimeout(() => setShowWelcomePopup(true), 450);
        return () => window.clearTimeout(timer);
      }
    } catch (error) {
      console.warn('Failed to initialize welcome popup:', error);
      window.setTimeout(() => setShowWelcomePopup(true), 0);
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

  useEffect(() => {
    if (homeContent?.hero_sliders?.length) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [homeContent, nextSlide]);

  // Enhanced fallback content if API fails
  const fallbackSlides = [
    {
      id: 1,
      title: "Transform Your Business",
      subtitle: "Premium Digital Solutions",
      description: "Discover our curated marketplace of premium digital products, templates, tools, and resources designed to accelerate your business growth and success.",
      cta_text: "Explore Marketplace",
      cta_link: "/products",
      image: "🚀",
      background_color: "#0f0f12",
      text_color: "#fafafa",
      sort_order: 1,
      is_active: true
    },
    {
      id: 2,
      title: "Professional Templates",
      subtitle: "Ready-to-Use Designs",
      description: "High-quality website templates, presentation decks, and document templates crafted by professional designers for immediate business use.",
      cta_text: "Browse Templates",
      cta_link: "/products?category=templates",
      image: "📄",
      background_color: "#1a1a2e",
      text_color: "#fafafa",
      sort_order: 2,
      is_active: true
    },
    {
      id: 3,
      title: "Productivity Tools",
      subtitle: "Boost Your Workflow",
      description: "Powerful software tools, plugins, and automation resources that streamline your operations and increase productivity.",
      cta_text: "View Tools",
      cta_link: "/products?category=tools",
      image: "⚡",
      background_color: "#16213e",
      text_color: "#fafafa",
      sort_order: 3,
      is_active: true
    }
  ];

  const fallbackStats = [
    { id: 1, key: 'total_products', value: '2.5K+', label: 'Digital Products', sort_order: 1, is_active: true },
    { id: 2, key: 'happy_customers', value: '15K+', label: 'Active Customers', sort_order: 2, is_active: true },
    { id: 3, key: 'total_sales', value: '45K+', label: 'Successful Sales', sort_order: 3, is_active: true },
    { id: 4, key: 'average_rating', value: '4.8★', label: 'Customer Rating', sort_order: 4, is_active: true }
  ];

  const fallbackFeatures = [
    {
      id: 1,
      title: 'Instant Digital Delivery',
      description: 'Download your purchased digital products immediately after payment. No shipping delays or waiting periods.',
      icon: '⚡',
      sort_order: 1,
      is_active: true
    },
    {
      id: 2,
      title: 'Professional Quality',
      description: 'Every product undergoes rigorous testing and quality assurance to ensure professional-grade performance.',
      icon: '⭐',
      sort_order: 2,
      is_active: true
    },
    {
      id: 3,
      title: 'Lifetime Support',
      description: 'Get ongoing support and updates for your digital purchases. Our expert team is always here to help.',
      icon: '🛠️',
      sort_order: 3,
      is_active: true
    }
  ];

  const fallbackProducts: Product[] = [
    { id: 101, name: "Premium Website Templates", slug: "premium-templates", description: "Modern responsive designs", price: 29, category: "templates" },
    { id: 102, name: "Business Dashboard UI Kit", slug: "dashboard-ui-kit", description: "Analytics & admin templates", price: 39, category: "ui-kits" },
    { id: 103, name: "Social Media Graphics Pack", slug: "social-graphics", description: "Ready-to-use marketing assets", price: 19, category: "graphics" },
    { id: 104, name: "Startup Pitch Deck Templates", slug: "pitch-decks", description: "Investor-ready presentations", price: 24, category: "presentations" },
    { id: 105, name: "E-commerce Conversion Toolkit", slug: "ecommerce-toolkit", description: "Landing page & funnel assets", price: 34, category: "templates" },
    { id: 106, name: "AI Prompt Engineering Library", slug: "ai-prompts", description: "Advanced ChatGPT workflows", price: 15, category: "tools" },
  ];

  const heroSlides = homeContent?.hero_sliders || fallbackSlides;
  const stats = homeContent?.stats || fallbackStats;
  const features = homeContent?.features || fallbackFeatures;
  const sliderProducts = allProducts.length > 0 ? allProducts : fallbackProducts;
  const sliderCount = Math.max(sliderProducts.length, heroSlides.length, 1);

  const getProductCategoryLabel = (product: Product) => {
    return product.category_name || product.category || '';
  };

  const productMatchesCategory = (product: Product, selected: string) => {
    if (selected === 'all') return true;

    const productCategory = getProductCategoryLabel(product);
    const productCategoryId = product.category_id == null ? '' : String(product.category_id);
    const productCategorySlug = product.category_slug || normalizeCategory(productCategory);
    const selectedNormalized = normalizeCategory(selected);
    const matchedApiCategory = allCategories.find((category) => {
      const categoryId = String(category.id);
      const categorySlug = category.slug || normalizeCategory(category.category_name);
      const categoryName = normalizeCategory(category.category_name);

      return (
        categoryId === productCategoryId ||
        categorySlug === productCategorySlug ||
        categoryName === normalizeCategory(productCategory)
      );
    });

    const acceptedValues = [
      productCategoryId,
      productCategorySlug,
      normalizeCategory(productCategory),
      matchedApiCategory ? String(matchedApiCategory.id) : '',
      matchedApiCategory?.slug || '',
      matchedApiCategory ? normalizeCategory(matchedApiCategory.category_name) : '',
    ].filter(Boolean);

    return acceptedValues.includes(selected) || acceptedValues.includes(selectedNormalized);
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = productMatchesCategory(product, selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });
  const productCatalogHref = `/products${(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    const query = params.toString();
    return query ? `?${query}` : '';
  })()}`;

  const submitProductSearch = () => {
    router.push(productCatalogHref);
  };

  const closeWelcomePopup = () => {
    try {
      sessionStorage.setItem('nextdigihome_welcome_popup_seen', 'true');
    } catch (error) {
      console.warn('Failed to save welcome popup state:', error);
    }
    setShowWelcomePopup(false);
  };

  const popupBrandName = welcomeSettings?.site_title || welcomeSettings?.admin_title || 'Next Digi Home';
  const popupTagline =
    welcomeSettings?.site_description ||
    welcomeSettings?.admin_description ||
    'Premium digital products engineered for modern businesses.';
  const popupLogo = getLogoUrl(welcomeSettings?.site_logo || welcomeSettings?.admin_logo) || '/logo.png';

  return (
    <div>
      {showWelcomePopup && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#050507]/80 px-4 py-6 backdrop-blur-xl animate-fade-in-up"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-popup-title"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,212,170,0.18),transparent_34%),radial-gradient(circle_at_18%_80%,rgba(139,92,246,0.16),transparent_28%)]" />
          <div className="relative w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/10 bg-[#101014]/95 shadow-[0_30px_90px_rgba(0,0,0,0.72)] ring-1 ring-[#00d4aa]/20">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4aa] to-transparent" />
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#8b5cf6]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#00d4aa]/15 blur-3xl" />

            <button
              type="button"
              onClick={closeWelcomePopup}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#b0b0b0] transition hover:border-[#00d4aa]/50 hover:text-white"
              aria-label="Close welcome popup"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="relative px-6 pb-7 pt-8 text-center sm:px-9 sm:pb-9 sm:pt-10">
              <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-[#00d4aa]/25 bg-gradient-to-br from-[#1a1a1f] to-[#0a0a0d] p-2 shadow-2xl shadow-[#00d4aa]/10 sm:h-28 sm:w-28">
                <img
                  src={popupLogo}
                  alt={`${popupBrandName} logo`}
                  className="h-full w-full object-contain"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <svg className="hidden h-12 w-12 text-[#00d4aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <div className="mb-4 inline-flex items-center rounded-full border border-[#00d4aa]/25 bg-[#00d4aa]/8 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#00d4aa]">
                Premium Digital Marketplace
              </div>

              <h2 id="welcome-popup-title" className="mb-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {popupBrandName}
              </h2>

              <p className="mx-auto max-w-md text-sm leading-6 text-[#b0b0b0] sm:text-base">
                {popupTagline}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/products"
                  onClick={closeWelcomePopup}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] px-6 py-3.5 text-sm font-extrabold text-[#0f0f12] transition hover:brightness-110"
                >
                  Explore Products
                  <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
                <button
                  type="button"
                  onClick={closeWelcomePopup}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:border-[#00d4aa]/50 hover:bg-[#00d4aa]/10"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Slider Section - Premium Edition */}
      <section className="relative h-[590px] overflow-hidden sm:h-[630px] lg:h-[660px]">
        {/* Enhanced Background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f12] via-[#1a1a2e]/50 to-[#0f0f12]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[150px] opacity-25 animate-float" />
          <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-float animate-delay-2000" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-float animate-delay-4000" />
          <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#ff6b9d] rounded-full mix-blend-screen filter blur-[160px] opacity-10 animate-float animate-delay-3000" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(42,42,48,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,42,48,0.1)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />

        {/* Slider Content */}
        <div className="slider-content absolute inset-0 z-10 mx-auto w-full max-w-[78rem] px-4 sm:px-6 lg:px-8">
          {!loading && Array.from({ length: sliderCount }).map((_, index) => index === currentSlide ? (
            <div
              key={index}
              className={`transition-all duration-1000 ease-in-out absolute inset-0 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0 z-10'
                  : 'opacity-0 translate-y-8 z-0'
              }`}
            >
              <div className="flex h-full items-center justify-center px-3 pb-10 pt-6 sm:px-5 sm:pb-8 sm:pt-8 lg:px-6">
                <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-8 w-full max-w-[78rem]">
                  {/* Premium Content Left - Dynamic from Products */}
                  {(() => {
                    const activeProduct = sliderProducts[currentSlide % Math.max(sliderProducts.length, 1)] || sliderProducts[0];
                    if (!activeProduct) return null;

                    return (
                      <div className="text-center lg:text-left space-y-5 lg:space-y-6">
                        {/* Brand Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/5 backdrop-blur-md mb-2 animate-fade-in-up hover:border-[#00d4aa]/60 transition-all group cursor-pointer">
                          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] animate-pulse"></span>
                          <span className="text-sm font-semibold bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] bg-clip-text text-transparent">Next Digi Home Premium Marketplace</span>
                          <span className="text-xs text-[#00d4aa] ml-1">★ Trusted by 50K+ Users</span>
                        </div>

                         {/* Main Heading - Dynamic from Product - Better mobile scaling */}
                         <div className="space-y-2 sm:space-y-3">
                           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] sm:leading-tight animate-fade-in-up tracking-[-1.5px] sm:tracking-tight">
                             <span className="block text-[#fafafa] mb-1.5 sm:mb-2">{activeProduct.name}</span>
                             <span className="block bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ff6b9d] bg-clip-text text-transparent animate-pulse text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                               {activeProduct.category || "Premium Digital Product"}
                             </span>
                           </h1>
                         </div>

                         {/* Premium Description - Dynamic from Product */}
                         <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#b0b0b0] max-w-2xl leading-relaxed animate-fade-in-up font-light">
                           {activeProduct.description || "High-quality digital asset crafted for modern professionals."}
                         </p>

                         {/* Premium CTA Buttons */}
                         <div className="flex flex-col sm:flex-row gap-4 pt-1 animate-fade-in-up">
                           <Link
                             href={`/products/${activeProduct.slug || activeProduct.id}`}
                             className="group relative px-8 py-4 border-2 border-[#00d4aa]/50 text-[#fafafa] font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00d4aa] hover:text-[#00d4aa] bg-[#1a1a1f]/20 backdrop-blur-sm"
                           >
                             <span className="absolute inset-0 bg-[#00d4aa]/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                             <span className="relative flex items-center justify-center gap-2">
                               View This Product
                               <ArrowRightIcon className="w-4 h-4" />
                             </span>
                           </Link>
                         </div>

                         {/* Mobile-only compact product preview for better slider UX on phones */}
                         <div className="md:hidden mt-4 bg-[#0a0a0d]/80 backdrop-blur border border-white/10 rounded-2xl p-4 flex gap-4 items-center">
                           {activeProduct.thumbnail && (
                             <img 
                               src={getStorageUrl(activeProduct.thumbnail)!} 
                               alt={activeProduct.name}
                               loading="lazy"
                               decoding="async"
                             className="h-20 w-20 flex-shrink-0 rounded-xl border border-white/10 object-contain bg-[#0f0f12] sm:h-24 sm:w-24" 
                             />
                           )}
                           <div className="min-w-0 flex-1">
                             <div className="font-semibold text-sm text-[#fafafa] line-clamp-2">{activeProduct.name}</div>
                             <div className="text-[#00d4aa] font-bold text-lg mt-0.5">৳{activeProduct.price}</div>
                           </div>
                         </div>
                       </div>
                     );
                    })()}

                       {/* Premium Right Side - Single Product (synced via currentSlide % 6) - Responsive from md up */}
                     <div className="relative hidden md:block">
                       <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto xl:max-w-[600px]">
                         {/* Deep luxurious glow */}
                         <div className="absolute -inset-4 bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ff6b9d] rounded-[2.5rem] blur-[70px] opacity-[0.14]"></div>

                          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0d]/95 p-4 shadow-[0_24px_70px_rgb(0,0,0,0.65)] ring-1 ring-white/5 backdrop-blur-3xl lg:p-5">
                            {/* Inner subtle glow */}
                            <div className="absolute inset-0 bg-linear-to-br from-[#00d4aa]/5 via-transparent to-[#8b5cf6]/5 pointer-events-none" />
                            
                           {(() => {
                             const currentProduct = sliderProducts[currentSlide % Math.max(sliderProducts.length, 1)] || sliderProducts[0];
                             if (!currentProduct) return null;

                             return (
                               <>
                                 {/* Single Premium Product - Enhanced */}
                                 <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#0f0f12] shadow-2xl lg:rounded-2xl">
                                   {currentProduct.thumbnail ? (
                                     <img
                                       src={getStorageUrl(currentProduct.thumbnail)!}
                                       alt={currentProduct.name}
                                       loading="eager"
                                       decoding="async"
                                       className="h-full w-full object-contain p-2 transition-all duration-700 group-hover:scale-[1.03] lg:p-3"
                                     />
                                   ) : (
                                     <div className="w-full h-full bg-linear-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center text-7xl">
                                       🚀
                                     </div>
                                   )}
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                   
                                   <div className="absolute top-4 left-4 px-3.5 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[10px] font-semibold tracking-[1px] text-white">
                                     PREMIUM
                                   </div>
                                   
                                   <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur text-xs font-bold text-[#00d4aa] rounded">
                                     {currentProduct.category}
                                   </div>
                                 </div>
 
                                 <div className="px-1 relative z-10">
                                   <div className="flex items-end justify-between mb-3">
                                     <h3 className="text-[15px] md:text-xl font-semibold tracking-[-0.5px] text-[#fafafa] pr-3 leading-tight line-clamp-2">
                                       {currentProduct.name}
                                     </h3>
                                     <div className="text-right flex-shrink-0">
                                        <div className="text-2xl md:text-3xl font-bold text-[#00d4aa] leading-none">
                                           ৳{currentProduct.price}
                                        </div>
                                     </div>
                                   </div>
 
                                   <p className="text-[#9ca3af] text-xs mb-5 line-clamp-1 opacity-90">
                                     {currentProduct.description || "Premium digital asset"}
                                   </p>
 
                                    <div>
                                      <Link
                                        href={`/products/${currentProduct.slug || currentProduct.id}`}
                                        className="block text-center px-5 py-2.5 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] rounded-2xl text-sm font-bold transition-all hover:brightness-110 active:scale-[0.985] shadow-lg"
                                      >
                                        View Details
                                      </Link>
                                    </div>
                                 </div>
                               </>
                             );
                           })()}
                         </div>
                      </div>
                    </div>
                </div>


                
              </div>
            </div>
          ) : null)}

          {/* Enhanced Loading state */}
          {loading && (
            <div className="flex h-full items-center justify-center">
              <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#00d4aa]/30 border-t-[#00d4aa] rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-[#8b5cf6] rounded-full animate-reverse-spin mx-auto"></div>
            </div>
                <div className="space-y-2">
                  <p className="text-[#fafafa] text-lg font-semibold">Loading Next Digi Home</p>
                  <p className="text-[#737373] text-sm">Preparing premium marketplace experience...</p>
                </div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-[#00d4aa] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#8b5cf6] rounded-full animate-bounce animate-delay-100"></div>
              <div className="w-2 h-2 bg-[#ff6b9d] rounded-full animate-bounce animate-delay-200"></div>
            </div>
              </div>
            </div>
          )}

        </div>

        {/* Enhanced Navigation Controls - Fixed Positioning - Mobile Responsive */}
        <div className="navigation-container">
          <div className="slider-navigation absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 z-40">
            <button
              onClick={prevSlide}
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-[#2a2a30] bg-[#1a1a1f]/90 backdrop-blur-md flex items-center justify-center text-[#fafafa] hover:border-[#00d4aa] hover:text-[#00d4aa] hover:shadow-lg hover:scale-110 transition-all duration-300 group active:scale-95"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-1" />
            </button>
          </div>

          <div className="slider-navigation absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 z-40">
            <button
              onClick={nextSlide}
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-[#2a2a30] bg-[#1a1a1f]/90 backdrop-blur-md flex items-center justify-center text-[#fafafa] hover:border-[#00d4aa] hover:text-[#00d4aa] hover:shadow-lg hover:scale-110 transition-all duration-300 group active:scale-95"
            >
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

            {/* Product slider navigation */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-30 flex max-w-[calc(100%-2rem)] -translate-x-1/2 gap-2 overflow-x-auto rounded-full border border-white/10 bg-[#0f0f12]/70 px-3 py-2 backdrop-blur">
              {Array.from({ length: sliderCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2.5 flex-shrink-0 rounded-full transition-all touch-manipulation ${
                    i === currentSlide
                      ? 'bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] w-8 sm:w-4'
                      : 'w-2.5 bg-white/30 hover:bg-white/60 active:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
       </section>

      {/* Stats Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/5 via-transparent to-[#8b5cf6]/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={stat.key} className="text-center animate-fade-in-up">
          <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
          <div className="text-[#737373] text-sm font-medium">{stat.label}</div>
        </div>
      ))}
           </div>
         </div>
        </section>

       {/* Premium Features Section - Dynamic from API */}
       <section className="relative py-20 overflow-hidden border-y border-[#2a2a30]">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#00d4aa0a_0%,transparent_70%)]" />
         
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-14">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4aa]/20 bg-[#00d4aa]/5 text-xs font-semibold tracking-[2px] text-[#00d4aa] mb-4">
               WHY CHOOSE US
             </div>
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
               Built for <span className="gradient-text">Modern Businesses</span>
             </h2>
             <p className="text-lg text-[#737373] max-w-lg mx-auto">
               Everything you need to succeed — delivered instantly.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {features.map((feature: any, index: number) => (
               <div 
                 key={feature.id || index}
                 className="group relative glass-card rounded-3xl p-8 border border-[#2a2a30] hover:border-[#00d4aa]/40 transition-all duration-500 hover:-translate-y-1 flex flex-col"
               >
                 <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                   {feature.icon || '✨'}
                 </div>

                 <h3 className="text-2xl font-semibold tracking-tight text-[#fafafa] mb-3">
                   {feature.title}
                 </h3>
                 
                 <p className="text-[#737373] leading-relaxed flex-1">
                   {feature.description}
                 </p>

                 <div className="mt-6 pt-5 border-t border-[#2a2a30] flex items-center text-xs font-medium text-[#00d4aa] group-hover:gap-2 transition-all">
                   LEARN MORE 
                   <ArrowRightIcon className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>

       {/* Real World Professional Use Cases Section */}
       <section className="relative py-24 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1f] to-[#0f0f12]" />
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
               Featured Products
             </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Discover our most popular digital products trusted by thousands of businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="group relative bg-[#1a1a1f] rounded-2xl border border-[#2a2a30] overflow-hidden hover:border-[#00d4aa]/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,170,0.3)]">
                <div className="aspect-video relative overflow-hidden">
                  {product.thumbnail ? (
                    <img
                      src={getStorageUrl(product.thumbnail)!}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
                      <span className="text-[#737373]">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-60" />
                  {product.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12]">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs text-[#737373] font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h4 className="text-lg font-semibold text-[#fafafa] mt-2 mb-2 line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-sm text-[#737373] line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#00d4aa]">
                                ৳{product.price}
                      </span>
                      {product.compare_price && (
                        <span className="text-sm text-[#737373] line-through">
                                  ৳{product.compare_price}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.slug || product.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(0,212,170,0.5)]"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-2">
                Explore All Products
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1f] via-[#0f0f12] to-[#1a1a1f]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Simple steps to transform your business with premium digital products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#0f0f12] mb-4">
                  1
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] opacity-50 hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#fafafa] mb-4">Choose Your Product</h3>
              <p className="text-[#737373] leading-relaxed">
                Browse our curated collection of premium digital products. Filter by category, price, or rating to find exactly what you need.
              </p>
            </div>

            <div className="text-center animate-fade-in-up">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-linear-to-br from-[#8b5cf6] to-[#00d4aa] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#0f0f12] mb-4">
                  2
                </div>
                <div className="absolute top-10 left-0 w-1/2 h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#00d4aa] opacity-50 hidden md:block"></div>
                <div className="absolute top-10 right-0 w-1/2 h-0.5 bg-gradient-to-l from-[#8b5cf6] to-[#00d4aa] opacity-50 hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#fafafa] mb-4">Instant Download</h3>
              <p className="text-[#737373] leading-relaxed">
                Secure payment processing with instant access to your digital products. No shipping delays or waiting periods.
              </p>
            </div>

            <div className="text-center animate-fade-in-up">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-linear-to-br from-[#00d4aa] to-[#ff6b6b] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#0f0f12] mb-4">
                  3
                </div>
                <div className="absolute top-10 right-1/2 transform translate-x-1/2 w-full h-0.5 bg-gradient-to-l from-[#00d4aa] to-[#ff6b6b] opacity-50 hidden md:block"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#fafafa] mb-4">Scale Your Business</h3>
              <p className="text-[#737373] leading-relaxed">
                Implement your new digital assets and watch your business grow. Our 24/7 support team is here to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Product Categories Section */}
      <section className="relative py-20 overflow-hidden bg-[#0a0a0d]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#00d4aa05_0%,transparent_70%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#00d4aa]/20 bg-[#00d4aa]/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]"></span>
              <span className="text-xs font-semibold tracking-[2px] text-[#00d4aa]">EXPLORE BY CATEGORY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] mb-4">
              Discover by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-lg text-[#737373] max-w-md mx-auto">
              Curated collections of premium digital assets for every professional need
            </p>
          </div>

          {/* Premium Categories + Products Layout */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Premium Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-[#121214] border border-[#2a2a30] rounded-3xl p-6 sticky top-28">
                <h3 className="text-sm font-semibold text-[#fafafa] mb-5 tracking-wider flex items-center gap-2">
                  BROWSE CATEGORIES
                  <span className="flex-1 h-px bg-gradient-to-r from-[#2a2a30] to-transparent"></span>
                </h3>
                
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-medium transition-all flex items-center gap-3 ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] shadow-lg'
                        : 'text-[#fafafa] hover:bg-[#1a1a1f] border border-transparent hover:border-[#2a2a30]'
                    }`}
                  >
                    <span className="text-lg">⭐</span>
                    <span>All Products</span>
                  </button>

                  {loadingCategories ? (
                    Array.from({ length: 6 }, (_, index) => (
                      <div key={index} className="px-5 py-3 rounded-2xl border border-[#2a2a30] bg-[#1a1a1f] animate-pulse">
                        <div className="w-28 h-4 bg-[#2a2a30] rounded"></div>
                      </div>
                    ))
                  ) : (
                    allCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-medium transition-all flex items-center gap-3 ${
                          selectedCategory === category.slug
                            ? 'bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] shadow-lg'
                            : 'text-[#fafafa] hover:bg-[#1a1a1f] border border-transparent hover:border-[#2a2a30]'
                        }`}
                      >
                        <span className="text-xl flex-shrink-0">{categoryIconMap[category.slug.toLowerCase()] || '📌'}</span>
                        <span className="truncate">{category.category_name}</span>
                      </button>
                    ))
                  )}
                </div>

                {/* Premium Quick Search */}
                <div className="mt-8 pt-6 border-t border-[#2a2a30]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          submitProductSearch();
                        }
                      }}
                      className="w-full bg-[#0f0f12] border border-[#2a2a30] rounded-2xl pl-5 pr-11 py-3 text-sm text-[#fafafa] placeholder-[#555] focus:outline-none focus:border-[#00d4aa] transition-all"
                    />
                    <button
                      type="button"
                      onClick={submitProductSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#737373] transition-colors hover:bg-[#1a1a1f] hover:text-[#00d4aa]"
                      aria-label="Search full catalog"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Products with Search and Filter */}
            <div className="lg:col-span-3">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-xs uppercase tracking-[3px] text-[#00d4aa] font-medium mb-1">RESULTS</div>
                  <h3 className="text-2xl font-semibold text-[#fafafa]">
                    {filteredProducts.length} {selectedCategory === 'all' ? 'Products' : allCategories.find(c => c.slug === selectedCategory)?.category_name || selectedCategory}
                    {searchQuery && <span className="text-[#737373] text-lg font-normal"> matching “{searchQuery}”</span>}
                  </h3>
                </div>
                <Link href={productCatalogHref} className="hidden md:block text-sm text-[#00d4aa] hover:underline">View all products →</Link>
              </div>

              {loadingProducts ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-[#00d4aa]/30 border-t-[#00d4aa] rounded-full animate-spin mx-auto"></div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[#fafafa] text-lg font-semibold">Loading Products</p>
                      <p className="text-[#737373] text-sm">Fetching premium digital assets...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group glass-card rounded-3xl overflow-hidden border border-[#2a2a30] hover:border-[#00d4aa]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00d4aa]/10 flex flex-col"
                    >
                      <div className="relative aspect-video overflow-hidden">
                         {product.thumbnail ? (
                           <img
                             src={getStorageUrl(product.thumbnail)!}
                             alt={product.name}
                             loading="lazy"
                             decoding="async"
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                           />
                         ) : (
                          <div className="w-full h-full bg-linear-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
                            <span className="text-[#737373]">No Image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        
                        {product.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white/90 text-[#0f0f12] shadow-lg">
                              FEATURED
                            </span>
                          </div>
                        )}
                        
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur text-white rounded-full">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="text-lg font-semibold text-[#fafafa] tracking-[-0.3px] mb-2 line-clamp-2 group-hover:text-[#00d4aa] transition-colors">
                          {product.name}
                        </h4>
                        
                        <p className="text-sm text-[#737373] line-clamp-2 flex-1 mb-5">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            <span className="text-2xl font-bold text-[#00d4aa]">
                              ৳{product.price}
                            </span>
                            {product.compare_price && product.compare_price > product.price && (
                              <span className="ml-2 text-sm text-[#737373] line-through">
                                ৳{product.compare_price}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-medium text-[#00d4aa] group-hover:underline transition-all">View →</span>
                        </div>
                      </div>
                    </Link>
                  ))}

                   {filteredProducts.length === 0 && (
                     <div className="col-span-full text-center py-16">
                       <div className="mx-auto w-16 h-16 rounded-2xl bg-[#1a1a1f] border border-[#2a2a30] flex items-center justify-center mb-6">
                         <span className="text-3xl">🔍</span>
                       </div>
                       <h4 className="text-2xl font-semibold text-[#fafafa] mb-3">No products found</h4>
                       <p className="text-[#737373] max-w-xs mx-auto mb-8">Try adjusting your search or selecting a different category.</p>
                       <button
                         onClick={() => {
                           setSearchQuery('');
                           setSelectedCategory('all');
                         }}
                         className="px-8 py-3 bg-[#1a1a1f] border border-[#2a2a30] hover:border-[#00d4aa] text-[#fafafa] rounded-2xl text-sm font-medium transition-all"
                       >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/10 via-[#00d4aa]/10 to-[#8b5cf6]/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/5 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse"></span>
              <span className="text-sm font-semibold text-[#8b5cf6]">⭐ CUSTOMER REVIEWS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              What Our Customers Say
            </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their business with our premium digital products
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all duration-300 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#fafafa]">Sarah Johnson</h3>
                  <p className="text-sm text-[#737373]">E-commerce Owner</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-[#737373] leading-relaxed">
                "NextDigi Home transformed our business completely. The templates saved us months of development time, and the support team is incredibly responsive. Highly recommended!"
              </p>
              <div className="mt-6 pt-6 border-t border-[#2a2a30]">
                <p className="text-sm text-[#00d4aa] font-semibold">+250% ROI in 3 months</p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all duration-300 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#fafafa]">Michael Chen</h3>
                  <p className="text-sm text-[#737373]">Agency Founder</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-[#737373] leading-relaxed">
                "The quality of the digital assets is unmatched. We've been using NextDigi Home for 2 years now and it's become essential to our development process. Best investment we've made."
              </p>
              <div className="mt-6 pt-6 border-t border-[#2a2a30]">
                <p className="text-sm text-[#00d4aa] font-semibold">Used by 500+ clients</p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all duration-300 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#fafafa]">Emily Rodriguez</h3>
                  <p className="text-sm text-[#737373]">Startup Founder</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-[#737373] leading-relaxed">
                "Outstanding platform! The variety of products and the quality of customer support is exceptional. They helped us scale from startup to 7-figures in revenue."
              </p>
              <div className="mt-6 pt-6 border-t border-[#2a2a30]">
                <p className="text-sm text-[#00d4aa] font-semibold">Scaled to 7-figures</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <p className="text-[#737373] text-lg mb-6">Ready to join thousands of successful customers?</p>
            <Link
              href="/products"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-2">
                Explore Our Products
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>







      {/* Trust & Security Badges - Enhanced Trust Building */}
      <section className="relative py-16 border-y border-[#2a2a30] bg-[#0a0a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/5 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse"></span>
              <span className="text-sm font-semibold text-[#00d4aa]">TRUSTED WORLDWIDE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
              Why 50,000+ Businesses Trust Us
            </h2>
            <p className="text-[#737373] max-w-xl mx-auto">Premium quality, secure transactions, and unmatched support — every time.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: "🛡️", title: "30-Day Guarantee", desc: "Full refund if not satisfied" },
              { icon: "🔒", title: "SSL Secure", desc: "256-bit encryption" },
              { icon: "⚡", title: "Instant Delivery", desc: "Download immediately" },
              { icon: "✅", title: "Verified Products", desc: "100% authentic sources" },
              { icon: "💬", title: "24/7 Support", desc: "Real humans, real help" },
              { icon: "⭐", title: "4.8/5 Average", desc: "From 15K+ reviews" },
            ].map((badge, index) => (
              <div key={index} className="glass-card rounded-xl p-5 text-center border border-[#2a2a30] hover:border-[#00d4aa]/40 transition-all group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{badge.icon}</div>
                <h4 className="font-semibold text-[#fafafa] text-sm mb-1 tracking-wide">{badge.title}</h4>
                <p className="text-[#737373] text-xs leading-tight">{badge.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#737373] flex items-center justify-center gap-2">
              <span>🔐</span> All payments secured &amp; encrypted. We never store your card details.
            </p>
          </div>
        </div>
      </section>

      {/* Real World Professional Use Cases Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/50 via-[#0f0f12] to-[#1a1a2e]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Real World Professional Use Cases
            </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              See how industry professionals and enterprises leverage our premium digital products to solve real business challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Use Case 1 */}
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all duration-300 hover-lift animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center text-xl">🚀</div>
                <h3 className="text-2xl font-bold text-[#fafafa]">Startup Launch</h3>
              </div>
              <p className="text-[#737373] mb-6 leading-relaxed">
                Fast-track your startup with our professional templates, branding kits, and business tools. Launch 10x faster with pre-built infrastructure.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4aa]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Website & Landing Pages</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4aa]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Brand Identity Templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4aa]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Pitch Deck Presentations</span>
                </div>
              </div>
              <span className="inline-flex items-center text-[#00d4aa] font-medium group hover:translate-x-1 transition-transform cursor-pointer">
                View More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </span>
            </div>

            {/* Use Case 2 */}
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#8b5cf6]/30 transition-all duration-300 hover-lift animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#8b5cf6] to-[#00d4aa] flex items-center justify-center text-xl">💼</div>
                <h3 className="text-2xl font-bold text-[#fafafa]">Enterprise Solutions</h3>
              </div>
              <p className="text-[#737373] mb-6 leading-relaxed">
                Scale your enterprise with our comprehensive suite of business automation tools, CRM templates, and workflow solutions.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[#8b5cf6]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Business Process Templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#8b5cf6]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Analytics & Reporting Tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#8b5cf6]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Integration Frameworks</span>
                </div>
              </div>
              <span className="inline-flex items-center text-[#8b5cf6] font-medium group hover:translate-x-1 transition-transform cursor-pointer">
                View More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </span>
            </div>

            {/* Use Case 3 */}
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all duration-300 hover-lift animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center text-xl">🎨</div>
                <h3 className="text-2xl font-bold text-[#fafafa]">Creative Agencies</h3>
              </div>
              <p className="text-[#737373] mb-6 leading-relaxed">
                Empower your creative team with premium design assets, UI kits, and stock resources for client projects.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4aa]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">UI/UX Design Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4aa]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Premium Stock Assets</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4aa]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Design Tools & Plugins</span>
                </div>
              </div>
              <span className="inline-flex items-center text-[#00d4aa] font-medium group hover:translate-x-1 transition-transform cursor-pointer">
                View More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </span>
            </div>

            {/* Use Case 4 */}
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#ff6b9d]/30 transition-all duration-300 hover-lift animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#ff6b9d] to-[#8b5cf6] flex items-center justify-center text-xl">📊</div>
                <h3 className="text-2xl font-bold text-[#fafafa]">Data & Analytics</h3>
              </div>
              <p className="text-[#737373] mb-6 leading-relaxed">
                Transform raw data into actionable insights with our analytics platforms and business intelligence tools.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[#ff6b9d]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Dashboard Templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#ff6b9d]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Visualization Tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#ff6b9d]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Report Generation</span>
                </div>
              </div>
              <span className="inline-flex items-center text-[#ff6b9d] font-medium group hover:translate-x-1 transition-transform cursor-pointer">
                View More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </span>
            </div>

            {/* Use Case 5 */}
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all duration-300 hover-lift animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#00d4aa] to-[#ff6b9d] flex items-center justify-center text-xl">🎓</div>
                <h3 className="text-2xl font-bold text-[#fafafa]">Education & Training</h3>
              </div>
              <p className="text-[#737373] mb-6 leading-relaxed">
                Create engaging educational content with course templates, learning materials, and certification systems.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4aa]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Course Templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4aa]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Learning Management Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4aa]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Assessment Tools</span>
                </div>
              </div>
              <span className="inline-flex items-center text-[#00d4aa] font-medium group hover:translate-x-1 transition-transform cursor-pointer">
                View More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </span>
            </div>

            {/* Use Case 6 */}
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#8b5cf6]/30 transition-all duration-300 hover-lift animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#8b5cf6] to-[#ff6b9d] flex items-center justify-center text-xl">🛍️</div>
                <h3 className="text-2xl font-bold text-[#fafafa]">E-Commerce</h3>
              </div>
              <p className="text-[#737373] mb-6 leading-relaxed">
                Launch and scale your online store with complete e-commerce solutions, payment integrations, and inventory tools.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[#8b5cf6]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Store Templates</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#8b5cf6]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Payment Integrations</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#8b5cf6]">✓</span>
                  <span className="text-sm text-[#b0b0b0]">Inventory Management</span>
                </div>
              </div>
              <span className="inline-flex items-center text-[#8b5cf6] font-medium group hover:translate-x-1 transition-transform cursor-pointer">
                View More <ArrowRightIcon className="w-4 h-4 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
