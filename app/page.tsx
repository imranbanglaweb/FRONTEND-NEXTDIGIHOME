'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightIcon, CogIcon, ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';

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
  thumbnail?: string;
  featured?: boolean;
  active?: boolean;
}

interface HomeContent {
  hero_sliders: HeroSlide[];
  stats: Stat[];
  features: Feature[];
}

export default function Home() {
  const pathname = usePathname();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 80) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const nextSlide = useCallback(() => {
    if (homeContent?.hero_sliders) {
      setCurrentSlide((prev) => (prev + 1) % homeContent.hero_sliders.length);
    }
  }, [homeContent]);

  const prevSlide = useCallback(() => {
    if (homeContent?.hero_sliders) {
      setCurrentSlide((prev) => (prev - 1 + homeContent.hero_sliders.length) % homeContent.hero_sliders.length);
    }
  }, [homeContent]);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await fetch('https://backend.nextdigihome.com/api/content/home');

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (data.success && data.data) {
              setHomeContent(data.data);
            } else {
              console.warn('API returned success but no data:', data);
            }
          } else {
            console.warn('Home content API returned non-JSON response');
          }
        } else {
          console.error('API request failed:', response.status, response.statusText);
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
        const response = await fetch('https://backend.nextdigihome.com/api/products?per_page=50');
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setAllProducts(data.data);
          } else {
            console.warn('Products API returned non-JSON response');
          }
        } else {
          console.error('Failed to fetch products');
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
        const response = await fetch('https://backend.nextdigihome.com/api/categories');
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setAllCategories(data);
          } else {
            console.warn('Categories API returned non-JSON response');
          }
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
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

  const heroSlides = homeContent?.hero_sliders || fallbackSlides;
  const stats = homeContent?.stats || fallbackStats;
  const features = homeContent?.features || fallbackFeatures;

  const availableCategories = allCategories.map(c => c.slug) as string[];
  const categories = ['all', ...availableCategories];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || (product.category?.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  const addToCart = async (product: Product) => {
    try {
      const response = await fetch('https://backend.nextdigihome.com/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (data.success) {
            // Trigger cart count update
            window.dispatchEvent(new Event('cartUpdated'));

            // Premium SweetAlert
            Swal.fire({
              title: 'Added to Cart! 🛒',
              text: `${product.name} has been added to your cart`,
              icon: 'success',
              background: '#0f0f12',
              color: '#fafafa',
              confirmButtonColor: '#00d4aa',
              confirmButtonText: 'Continue Shopping',
              showClass: {
                popup: 'swal2-show',
                backdrop: 'swal2-backdrop-show',
                icon: 'swal2-icon-show'
              },
              hideClass: {
                popup: 'swal2-hide',
                backdrop: 'swal2-backdrop-hide',
                icon: 'swal2-icon-hide'
              },
              customClass: {
                popup: 'glass-card border border-[#2a2a30] rounded-2xl',
                confirmButton: 'bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all',
                title: 'text-2xl font-bold text-[#fafafa] mb-4',
                htmlContainer: 'text-[#737373] text-lg'
              },
              buttonsStyling: false,
              timer: 3000,
              timerProgressBar: true,
              showCloseButton: true,
              closeButtonHtml: '<span style="color: #737373; font-size: 24px;">&times;</span>',
            });
          } else {
            Swal.fire({
              title: 'Failed to Add',
              text: 'Could not add item to cart. Please try again.',
              icon: 'error',
              background: '#0f0f12',
              color: '#fafafa',
              confirmButtonColor: '#ff4444',
              confirmButtonText: 'Try Again',
              customClass: {
                popup: 'glass-card border border-red-500/30 rounded-2xl',
                confirmButton: 'bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition-all',
                title: 'text-2xl font-bold text-red-400 mb-4',
                htmlContainer: 'text-[#737373] text-lg'
              },
              buttonsStyling: false,
            });
          }
        } else {
          console.warn('Cart API returned non-JSON response');
          Swal.fire({
            title: 'Server Error',
            text: 'Unable to connect to server. Please check your connection.',
            icon: 'warning',
            background: '#0f0f12',
            color: '#fafafa',
            confirmButtonColor: '#f59e0b',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'glass-card border border-yellow-500/30 rounded-2xl',
              confirmButton: 'bg-yellow-500 text-[#0f0f12] font-bold px-6 py-3 rounded-xl hover:bg-yellow-600 transition-all',
              title: 'text-2xl font-bold text-yellow-400 mb-4',
              htmlContainer: 'text-[#737373] text-lg'
            },
            buttonsStyling: false,
          });
        }
      } else {
        console.warn('Cart API request failed');
        Swal.fire({
          title: 'Failed to Add',
          text: 'Could not add item to cart. Please try again.',
          icon: 'error',
          background: '#0f0f12',
          color: '#fafafa',
          confirmButtonColor: '#ff4444',
          confirmButtonText: 'Try Again',
          customClass: {
            popup: 'glass-card border border-red-500/30 rounded-2xl',
            confirmButton: 'bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition-all',
            title: 'text-2xl font-bold text-red-400 mb-4',
            htmlContainer: 'text-[#737373] text-lg'
          },
          buttonsStyling: false,
        });
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
      Swal.fire({
        title: 'Connection Error',
        text: 'Failed to add to cart. Please check your internet connection.',
        icon: 'error',
        background: '#0f0f12',
        color: '#fafafa',
        confirmButtonColor: '#ff4444',
        confirmButtonText: 'Retry',
        customClass: {
          popup: 'glass-card border border-red-500/30 rounded-2xl',
          confirmButton: 'bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition-all',
          title: 'text-2xl font-bold text-red-400 mb-4',
          htmlContainer: 'text-[#737373] text-lg'
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div>
      {/* Hero Slider Section - Premium Edition */}
      <section className="relative min-h-screen overflow-hidden">
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
        <div className="slider-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {!loading && heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-1000 ease-in-out absolute inset-0 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0 z-10'
                  : 'opacity-0 translate-y-8 z-0'
              }`}
            >
              <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-6 lg:gap-16 items-start w-full max-w-7xl pt-20">
                  {/* Premium Content Left */}
                  <div className="text-center lg:text-left space-y-8">
                    {/* Brand Badge */}
                    <div className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/5 backdrop-blur-md mb-6 animate-fade-in-up hover:border-[#00d4aa]/60 transition-all group cursor-pointer">
                      <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] animate-pulse"></span>
                      <span className="text-sm font-semibold bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] bg-clip-text text-transparent">Next Digi Home Premium Marketplace</span>
                      <span className="text-xs text-[#00d4aa] ml-1">★ Trusted by 50K+ Users</span>
                    </div>

                    {/* Main Heading - Premium Typography */}
                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight animate-fade-in-up tracking-tight">
                        <span className="block text-[#fafafa] mb-2">{slide.title}</span>
                        <span className="block bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ff6b9d] bg-clip-text text-transparent animate-pulse">
                          {slide.subtitle}
                        </span>
                      </h1>
                    </div>

                    {/* Premium Description */}
                    <p className="text-base md:text-lg lg:text-xl text-[#b0b0b0] max-w-2xl leading-relaxed animate-fade-in-up font-light">
                      {slide.description}
                    </p>



                    {/* Premium CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up">
                      <Link
                        href={slide.cta_link || "/products"}
                        className="group relative px-8 py-4 bg-gradient-to-r from-[#00d4aa] via-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg border border-[#00d4aa]/30"
                      >
                        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="relative flex items-center justify-center gap-2">
                          <span>✨</span>
                          {slide.cta_text || "Explore Premium Products"}
                          <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                        </span>
                      </Link>
                      <Link
                        href="/products"
                        className="group relative px-8 py-4 border-2 border-[#00d4aa]/50 text-[#fafafa] font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#00d4aa] hover:text-[#00d4aa] bg-[#1a1a1f]/20 backdrop-blur-sm"
                      >
                        <span className="absolute inset-0 bg-[#00d4aa]/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        <span className="relative flex items-center justify-center gap-2">
                          Browse All Products
                          <ArrowRightIcon className="w-4 h-4" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Premium Right Side - Product Showcase */}
                  <div className="relative animate-fade-in-up hidden md:block max-h-fit">
                    {/* Main Premium Card Showcase */}
                    <div className="relative group">
                      {/* Glowing background */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ff6b9d] rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                      
                      {/* Card */}
                      <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#0f0f12] rounded-2xl p-6 border border-[#2a2a30] group-hover:border-[#00d4aa]/50 transition-all duration-500 overflow-hidden">
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#00d4aa]/10 via-transparent to-[#8b5cf6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 text-center">
                          {/* Product Icon/Image */}
                          <div className="mb-6">
                             <div className="inline-block p-4 rounded-xl bg-gradient-to-br from-[#00d4aa]/20 to-[#8b5cf6]/20 border border-[#00d4aa]/30 mb-3 group-hover:scale-110 transition-transform duration-300">
                               {slide.image && slide.image.startsWith('http') ? (
                                 <img
                                   src={slide.image}
                                   alt={slide.title}
                                   className="w-16 h-16 object-cover rounded-lg filter drop-shadow-lg"
                                 />
                               ) : (
                                 <div className="text-5xl filter drop-shadow-lg">{slide.image || '🎯'}</div>
                               )}
                             </div>
                            <h3 className="text-sm font-bold text-[#fafafa] mb-3">{slide.title}</h3>
                            <div className="w-full h-1 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full"></div>
                          </div>

                          {/* Dynamic Features List from API */}
                          <div className="space-y-2">
                            {features.slice(0, 3).map((feature, idx) => (
                              <div key={feature.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#2a2a30]/30 backdrop-blur-sm border border-[#2a2a30]/50 hover:border-[#00d4aa]/30 transition-all group/item">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center text-xs font-bold text-[#0f0f12] flex-shrink-0 mt-0.5">{feature.icon}</div>
                                <div className="flex-1">
                                  <div className="text-xs font-semibold text-[#fafafa]">{feature.title}</div>
                                  <div className="text-xs text-[#737373]">{(feature.description || 'Premium feature').substring(0, 40)}...</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Feature Cards from API - Movable & Rotatable */}
                    <div className="relative mt-6 grid grid-cols-3 gap-3 perspective">
                      <style>{`
                        @keyframes floatRotate {
                          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                          25% { transform: translateY(-10px) rotateX(5deg) rotateY(5deg) rotateZ(3deg); }
                          50% { transform: translateY(-15px) rotateX(-5deg) rotateY(-5deg) rotateZ(-3deg); }
                          75% { transform: translateY(-8px) rotateX(3deg) rotateY(-3deg) rotateZ(5deg); }
                        }
                        @keyframes floatRotate2 {
                          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                          25% { transform: translateY(-12px) rotateX(-4deg) rotateY(6deg) rotateZ(-4deg); }
                          50% { transform: translateY(-18px) rotateX(4deg) rotateY(-6deg) rotateZ(4deg); }
                          75% { transform: translateY(-6px) rotateX(-3deg) rotateY(3deg) rotateZ(-5deg); }
                        }
                        @keyframes floatRotate3 {
                          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
                          25% { transform: translateY(-8px) rotateX(6deg) rotateY(-5deg) rotateZ(5deg); }
                          50% { transform: translateY(-16px) rotateX(-6deg) rotateY(5deg) rotateZ(-5deg); }
                          75% { transform: translateY(-10px) rotateX(4deg) rotateY(-4deg) rotateZ(3deg); }
                        }
                        .feature-card-rotatable {
                          perspective: 1200px;
                          transform-style: preserve-3d;
                          transition: all 0.3s ease-out;
                        }
                        .feature-card-rotatable:hover {
                          filter: brightness(1.1) drop-shadow(0 0 30px rgba(0, 212, 170, 0.4));
                        }
                      `}</style>
                      {features.slice(0, 3).map((feature, idx) => {
                        const colors = [
                          { from: '#00d4aa', to: '#8b5cf6', border: '#00d4aa' },
                          { from: '#8b5cf6', to: '#00d4aa', border: '#8b5cf6' },
                          { from: '#00d4aa', to: '#8b5cf6', border: '#00d4aa' }
                        ];
                        const color = colors[idx % 3];
                        const animationNames = ['floatRotate', 'floatRotate2', 'floatRotate3'];
                        return (
                          <div 
                            key={feature.id} 
                            className="feature-card-rotatable w-full h-20 rounded-lg p-2 shadow-lg opacity-90 border hover:scale-110 hover:brightness-125 cursor-grab active:cursor-grabbing" 
                            style={{ 
                              backgroundImage: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)`, 
                              borderColor: `${color.border}80`,
                              animation: `${animationNames[idx]} 6s ease-in-out infinite`,
                              animationDelay: `${idx * 0.2}s`,
                              transformStyle: 'preserve-3d'
                            }}
                          >
                            <div className="w-full h-full rounded-md bg-[#0f0f12] flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-95">
                              <div className="text-lg mb-0.5 transition-transform duration-300 hover:rotate-12">{feature.icon || '⭐'}</div>
                              <div className="text-xs font-bold text-center text-[#fafafa] group-hover:text-opacity-100">{(feature.title || 'Feature').substring(0, 12)}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Enhanced Loading state */}
          {loading && (
            <div className="min-h-screen flex items-center justify-center">
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

        {/* Enhanced Navigation Controls - Fixed Positioning */}
        <div className="navigation-container">
          <div className="slider-navigation absolute top-1/2 -translate-y-1/2 left-4 z-20">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border border-[#2a2a30] bg-[#1a1a1f]/90 backdrop-blur-md flex items-center justify-center text-[#fafafa] hover:border-[#00d4aa] hover:text-[#00d4aa] hover:shadow-lg hover:scale-110 transition-all duration-300 group"
            >
              <ChevronLeftIcon className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
            </button>
          </div>

          <div className="slider-navigation absolute top-1/2 -translate-y-1/2 right-4 z-20">
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border border-[#2a2a30] bg-[#1a1a1f]/90 backdrop-blur-md flex items-center justify-center text-[#fafafa] hover:border-[#00d4aa] hover:text-[#00d4aa] hover:shadow-lg hover:scale-110 transition-all duration-300 group"
            >
              <ChevronRightIcon className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => {
            const indicatorClass =
              index === currentSlide
                ? 'h-2 w-8 rounded-full transition-all duration-300 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6]'
                : 'h-2 w-2 rounded-full transition-all duration-300 bg-[#2a2a30] hover:bg-[#737373]';
            return (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={indicatorClass}
              />
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
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

      {/* Product Categories Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f12] to-[#1a1a1f]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Product Categories
            </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Explore our diverse range of digital products across multiple categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {loadingCategories ? (
              // Loading state for categories
              Array.from({ length: 12 }, (_, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-[#1a1a1f] border border-[#2a2a30] animate-pulse">
                  <div className="aspect-square flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#2a2a30] rounded-full mb-3 mx-auto"></div>
                      <div className="w-20 h-4 bg-[#2a2a30] rounded mx-auto"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              allCategories.slice(0, 12).map((category, index) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-[#1a1a1f] border border-[#2a2a30] hover:border-[#00d4aa]/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,170,0.3)]"
                >
                  <div className="aspect-square flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-3">
                        {['🎨', '💻', '📊', '📱', '🎵', '🎬', '📝', '⚙️', '🌐', '📱', '🎯', '📈'][index % 12]}
                      </div>
                      <h3 className="text-lg font-bold text-[#fafafa] group-hover:text-[#00d4aa] transition-colors">
                        {category.category_name}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00d4aa]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
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
                      src={product.thumbnail.startsWith('http') ? product.thumbnail : `https://backend.nextdigihome.com/storage/${product.thumbnail}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
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
                        ${product.price}
                      </span>
                      {product.compare_price && (
                        <span className="text-sm text-[#737373] line-through">
                          ${product.compare_price}
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
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#0f0f12] mb-4">
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
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#8b5cf6] to-[#00d4aa] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#0f0f12] mb-4">
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
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#00d4aa] to-[#ff6b6b] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#0f0f12] mb-4">
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

      {/* Features Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,170,0.05)_0%,rgba(8,8,8,0)_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
               Why Choose Next Digi Home
             </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Premium quality digital assets engineered for exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.id} className="glass-card rounded-2xl p-8 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all duration-300 hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4aa]/20 to-[#8b5cf6]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-4xl leading-none select-none" role="img" aria-label={feature.title}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#fafafa]">{feature.title}</h3>
                <p className="text-[#737373] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,92,246,0.1)_0%,rgba(8,8,8,0)_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Product Categories
            </h2>
            <p className="text-xl text-[#737373]">
              Find exactly what you need to elevate your business
            </p>
          </div>

          {/* Left Sidebar Categories + Right Products */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-[#fafafa] mb-6">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`block w-full text-left px-4 py-3 rounded-lg border transition-all ${
                    selectedCategory === 'all'
                      ? 'border-[#00d4aa] bg-[#00d4aa]/10 text-[#00d4aa]'
                      : 'border-[#2a2a30] bg-[#1a1a1f] text-[#fafafa] hover:border-[#00d4aa]/50 hover:text-[#00d4aa]'
                  }`}
                >
                  All Products
                </button>
                {loadingCategories ? (
                  // Loading state for sidebar categories
                  Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="px-4 py-3 rounded-lg border border-[#2a2a30] bg-[#1a1a1f] animate-pulse">
                      <div className="w-24 h-4 bg-[#2a2a30] rounded"></div>
                    </div>
                  ))
                ) : (
                  allCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`block w-full text-left px-4 py-3 rounded-lg border transition-all ${
                        selectedCategory === category.slug
                          ? 'border-[#00d4aa] bg-[#00d4aa]/10 text-[#00d4aa]'
                          : 'border-[#2a2a30] bg-[#1a1a1f] text-[#fafafa] hover:border-[#00d4aa]/50 hover:text-[#00d4aa]'
                      }`}
                    >
                      {category.category_name}
                    </button>
                  ))
                )}
              </div>

              {/* Search Bar */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-[#737373] mb-3">Quick Search</h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-lg pl-4 pr-10 py-3 text-[#fafafa] placeholder-[#737373] focus:outline-none focus:border-[#00d4aa] transition-colors"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#737373] hover:text-[#00d4aa]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Products with Search and Filter */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#fafafa]">
                  {filteredProducts.length} {selectedCategory === 'all' ? 'Products' : `${allCategories.find(c => c.slug === selectedCategory)?.category_name || selectedCategory}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </h3>
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
                  {filteredProducts.slice(0, 9).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group glass-card rounded-2xl overflow-hidden border border-[#2a2a30] hover:border-[#00d4aa]/50 transition-all duration-300 animate-fade-in-up"
                    >
                      <div className="relative aspect-video overflow-hidden">
                         {product.thumbnail ? (
                           <img
                             src={product.thumbnail.startsWith('http') ? product.thumbnail : `https://backend.nextdigihome.com/storage/${product.thumbnail}`}
                             alt={product.name}
                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                           />
                         ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
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
                              ${product.price}
                            </span>
                            {product.compare_price && product.compare_price > product.price && (
                              <span className="text-sm text-[#737373] line-through">
                                ${product.compare_price}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#737373]">View Details →</span>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {filteredProducts.length > 9 && (
                    <div className="glass-card rounded-2xl border border-[#2a2a30] flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center">
                          <ArrowRightIcon className="w-8 h-8 text-[#0f0f12]" />
                        </div>
                        <h4 className="text-lg font-semibold text-[#fafafa] mb-2">
                          {filteredProducts.length - 9} More Products
                        </h4>
                        <p className="text-sm text-[#737373] mb-4">Explore the complete collection</p>
                        <Link href="/products" className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-medium rounded-lg hover:scale-105 transition-transform">
                          Browse All <ArrowRightIcon className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {filteredProducts.length === 0 && (
                    <div className="col-span-full text-center py-20">
                      <h4 className="text-xl font-semibold text-[#fafafa] mb-4">No products found</h4>
                      <p className="text-[#737373] mb-8">Try adjusting your search or category filter</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
                        className="px-6 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] hover:border-[#00d4aa]/50 transition-colors"
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

      {/* Trending & Featured Products Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f12] via-[#1a1a2e]/30 to-[#0f0f12]" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-float animate-delay-2000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/5 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse"></span>
              <span className="text-sm font-semibold text-[#00d4aa]">🔥 TRENDING NOW</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Trending & Featured Products
            </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Discover the most popular and highest-rated products trusted by thousands of professionals
            </p>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Premium Featured Card 1 */}
            {allProducts[0] && (
            <div className="group relative animate-fade-in-up">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ff6b9d] rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#0f0f12] rounded-2xl overflow-hidden border border-[#2a2a30] group-hover:border-[#00d4aa]/50 transition-all duration-300">
                <div className="absolute top-0 right-0 px-4 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#8b5cf6] rounded-bl-xl">
                  <span className="text-xs font-bold text-white">BESTSELLER</span>
                </div>
                <div className="h-40 bg-gradient-to-br from-[#00d4aa]/20 to-[#8b5cf6]/20 flex items-center justify-center overflow-hidden relative group/img">
                  {allProducts[0].thumbnail ? (
                    <img src={allProducts[0].thumbnail} alt={allProducts[0].name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="text-6xl group-hover/img:scale-110 transition-transform duration-300">🎨</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[#fafafa] flex-1">{allProducts[0].name}</h3>
                    <div className="flex gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-xs font-bold text-[#fafafa]">4.9</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#737373] mb-4">{truncateText(allProducts[0].description || 'Premium digital product')}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text">${allProducts[0].price}</span>
                    <button
                      onClick={() => addToCart(allProducts[0])}
                      className="px-4 py-2 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Premium Featured Card 2 */}
            {allProducts[1] && (
            <div className="group relative animate-fade-in-up">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8b5cf6] via-[#ff6b9d] to-[#00d4aa] rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#0f0f12] rounded-2xl overflow-hidden border border-[#2a2a30] group-hover:border-[#8b5cf6]/50 transition-all duration-300">
                <div className="absolute top-0 right-0 px-4 py-2 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-bl-xl">
                  <span className="text-xs font-bold text-[#0f0f12]">⚡ NEW</span>
                </div>
                <div className="h-40 bg-gradient-to-br from-[#8b5cf6]/20 to-[#ff6b9d]/20 flex items-center justify-center overflow-hidden relative group/img">
                  {allProducts[1].thumbnail ? (
                    <img src={allProducts[1].thumbnail} alt={allProducts[1].name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="text-6xl group-hover/img:scale-110 transition-transform duration-300">💼</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[#fafafa] flex-1">{allProducts[1].name}</h3>
                    <div className="flex gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-xs font-bold text-[#fafafa]">4.8</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#737373] mb-4">{truncateText(allProducts[1].description || 'Business automation tools')}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text">${allProducts[1].price}</span>
                    <button
                      onClick={() => addToCart(allProducts[1])}
                      className="px-4 py-2 bg-gradient-to-r from-[#8b5cf6] to-[#ff6b9d] text-[#0f0f12] font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Premium Featured Card 3 */}
            {allProducts[2] && (
            <div className="group relative animate-fade-in-up">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6b9d] via-[#00d4aa] to-[#8b5cf6] rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#0f0f12] rounded-2xl overflow-hidden border border-[#2a2a30] group-hover:border-[#ff6b9d]/50 transition-all duration-300">
                <div className="absolute top-0 right-0 px-4 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#00d4aa] rounded-bl-xl">
                  <span className="text-xs font-bold text-white">HOT</span>
                </div>
                <div className="h-40 bg-gradient-to-br from-[#ff6b9d]/20 to-[#00d4aa]/20 flex items-center justify-center overflow-hidden relative group/img">
                  {allProducts[2].thumbnail ? (
                    <img src={allProducts[2].thumbnail} alt={allProducts[2].name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="text-6xl group-hover/img:scale-110 transition-transform duration-300">📱</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[#fafafa] flex-1">{allProducts[2].name}</h3>
                    <div className="flex gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-xs font-bold text-[#fafafa]">5.0</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#737373] mb-4">{truncateText(allProducts[2].description || 'Responsive website templates')}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text">${allProducts[2].price}</span>
                    <button
                      onClick={() => addToCart(allProducts[2])}
                      className="px-4 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#00d4aa] text-[#0f0f12] font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Premium Featured Card 4 */}
            {allProducts[3] && (
            <div className="group relative animate-fade-in-up">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4aa] via-[#ff6b9d] to-[#8b5cf6] rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#0f0f12] rounded-2xl overflow-hidden border border-[#2a2a30] group-hover:border-[#00d4aa]/50 transition-all duration-300">
                <div className="absolute top-0 right-0 px-4 py-2 bg-gradient-to-r from-[#8b5cf6] to-[#00d4aa] rounded-bl-xl">
                  <span className="text-xs font-bold text-white">PREMIUM</span>
                </div>
                <div className="h-40 bg-gradient-to-br from-[#00d4aa]/20 to-[#8b5cf6]/20 flex items-center justify-center overflow-hidden relative group/img">
                  {allProducts[3].thumbnail ? (
                    <img src={allProducts[3].thumbnail} alt={allProducts[3].name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="text-6xl group-hover/img:scale-110 transition-transform duration-300">🚀</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[#fafafa] flex-1">{allProducts[3].name}</h3>
                    <div className="flex gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-xs font-bold text-[#fafafa]">4.9</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#737373] mb-4">{truncateText(allProducts[3].description || 'All-in-one startup toolkit')}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-text">${allProducts[3].price}</span>
                    <button
                      onClick={() => addToCart(allProducts[3])}
                      className="px-4 py-2 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* View All Products Button */}
          <div className="flex justify-center mt-12">
            <Link
              href="/products"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ff6b9d] text-[#0f0f12] font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-2">
                View All Products
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>



      {/* Premium Bottom Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/5 via-transparent to-[#8b5cf6]/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Notifications Card */}
            <div className="glass-card rounded-2xl border border-[#2a2a30] overflow-hidden hover:border-[#00d4aa]/30 transition-all duration-300 hover-lift animate-fade-in-up">
              <div className="bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] p-6 border-b border-[#2a2a30]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                      🔔
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">System Updates</h3>
                      <p className="text-sm text-blue-200">Latest announcements</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold">3 New</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-[#2a2a30]">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#fafafa]">New Premium Features Released</p>
                    <p className="text-xs text-[#737373] mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-[#2a2a30]">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#fafafa]">Marketplace Maintenance Completed</p>
                    <p className="text-xs text-[#737373] mt-1">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#fafafa]">Security Update Available</p>
                    <p className="text-xs text-[#737373] mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products Card */}
            <div className="glass-card rounded-2xl border border-[#2a2a30] overflow-hidden hover:border-[#8b5cf6]/30 transition-all duration-300 hover-lift animate-fade-in-up">
              <div className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] p-6 border-b border-[#2a2a30]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                      ⭐
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Top Products</h3>
                      <p className="text-sm text-purple-200">Best performers</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-[#2a2a30]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffd700] to-[#ffed4e] flex items-center justify-center text-lg font-bold">🏆</div>
                    <div>
                      <p className="text-sm font-semibold text-[#fafafa]">Premium Templates Pack</p>
                      <p className="text-xs text-[#737373]">#1 Bestseller</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold gradient-text">2.5K</p>
                    <p className="text-xs text-[#737373]">sales</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-[#2a2a30]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c0c0c0] to-[#e8e8e8] flex items-center justify-center text-lg font-bold">🥈</div>
                    <div>
                      <p className="text-sm font-semibold text-[#fafafa]">Design Tools Suite</p>
                      <p className="text-xs text-[#737373]">#2 Popular</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold gradient-text">1.8K</p>
                    <p className="text-xs text-[#737373]">sales</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#cd7f32] to-[#d4a574] flex items-center justify-center text-lg font-bold">🥉</div>
                    <div>
                      <p className="text-sm font-semibold text-[#fafafa]">Stock Resources Bundle</p>
                      <p className="text-xs text-[#737373]">#3 Trending</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold gradient-text">1.2K</p>
                    <p className="text-xs text-[#737373]">sales</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="glass-card rounded-2xl border border-[#2a2a30] overflow-hidden hover:border-[#00d4aa]/30 transition-all duration-300 hover-lift animate-fade-in-up">
              <div className="bg-gradient-to-r from-[#06b6d4] to-[#0891b2] p-6 border-b border-[#2a2a30]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                      👥
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Marketplace Stats</h3>
                      <p className="text-sm text-cyan-200">Real-time metrics</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-[#2a2a30]/50 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center mx-auto mb-2">
                      📦
                    </div>
                    <p className="text-2xl font-bold gradient-text">20K+</p>
                    <p className="text-xs text-[#737373] mt-1">Products</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-[#2a2a30]/50 border border-[#2a2a30] hover:border-[#8b5cf6]/30 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#00d4aa] flex items-center justify-center mx-auto mb-2">
                      🛒
                    </div>
                    <p className="text-2xl font-bold gradient-text">100K+</p>
                    <p className="text-xs text-[#737373] mt-1">Sales</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-[#2a2a30]/50 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center mx-auto mb-2">
                      🏷️
                    </div>
                    <p className="text-2xl font-bold gradient-text">24</p>
                    <p className="text-xs text-[#737373] mt-1">Categories</p>
                  </div>
                </div>
              </div>
            </div>
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center text-xl">🚀</div>
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#00d4aa] flex items-center justify-center text-xl">💼</div>
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center text-xl">🎨</div>
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#8b5cf6] flex items-center justify-center text-xl">📊</div>
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#ff6b9d] flex items-center justify-center text-xl">🎓</div>
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ff6b9d] flex items-center justify-center text-xl">🛍️</div>
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

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 font-bold z-30"
        title="Back to top"
      >
        ↑
      </button>
    </div>
  );
}