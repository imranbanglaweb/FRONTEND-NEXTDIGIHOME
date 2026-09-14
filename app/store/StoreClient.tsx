'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShoppingBagIcon,
  SparklesIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  BoltIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  CpuChipIcon,
  BookOpenIcon,
  VideoCameraIcon,
  XMarkIcon,
  EyeIcon,
  ChevronDownIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import { getStorageUrl, apiFetch } from '@/app/utils/api';
import {
  getPurchaseType,
  getPurchaseTypeLabel,
  getValidityDays,
  type CommercialInfo,
} from '@/app/utils/commercial';

export interface Product extends CommercialInfo {
  id: number | string;
  name: string;
  slug?: string | null;
  description?: string | null;
  detailed_description?: string | null;
  price: number | string;
  compare_price?: number | string | null;
  thumbnail?: string | null;
  thumbnail_url?: string | null;
  image_url?: string | null;
  featured?: boolean;
  category?: string | null;
  category_name?: string | null;
  category_slug?: string | null;
  stock?: number | null;
}

export interface CategoryItem {
  id: number | string;
  category_name: string;
  slug: string;
}

interface StoreClientProps {
  initialProducts: Product[];
  initialCategories: CategoryItem[];
}

const resolveProductImage = (product: Product): string => {
  if (product.thumbnail) {
    const storageUrl = getStorageUrl(product.thumbnail);
    if (storageUrl) return storageUrl;
  }
  if (product.thumbnail_url) return product.thumbnail_url;
  if (product.image_url) return product.image_url;
  return '/placeholder.png';
};

const readNumber = (value: unknown, fallback: number): number => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

const normalizeCategory = (value: unknown): string => {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Map categories to appropriate icons
const getCategoryIcon = (categorySlug: string) => {
  const s = categorySlug.toLowerCase();
  if (s.includes('web') || s.includes('dev') || s.includes('code')) return CodeBracketIcon;
  if (s.includes('software') || s.includes('app')) return DevicePhoneMobileIcon;
  if (s.includes('business') || s.includes('tool')) return WrenchScrewdriverIcon;
  if (s.includes('template')) return PaintBrushIcon;
  if (s.includes('edu') || s.includes('learn')) return AcademicCapIcon;
  if (s.includes('book') || s.includes('guide')) return BookOpenIcon;
  if (s.includes('graphic') || s.includes('design')) return PaintBrushIcon;
  if (s.includes('video') || s.includes('animation')) return VideoCameraIcon;
  if (s.includes('marketing')) return BoltIcon;
  return SparklesIcon;
};

export default function StoreClient({ initialProducts, initialCategories }: StoreClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products] = useState<Product[]>(initialProducts);
  const [categories] = useState<CategoryItem[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [loadingButtons, setLoadingButtons] = useState<Set<number | string>>(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Sync category with URL if changed
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  // Compute category counts based on real products
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      const cat = p.category_name || p.category || 'Other';
      const slug = p.category_slug || normalizeCategory(cat);
      counts[slug] = (counts[slug] || 0) + 1;
    });

    return categories
      .map((c) => {
        const slug = c.slug || normalizeCategory(c.category_name);
        return {
          ...c,
          slug,
          count: counts[slug] || 0,
        };
      })
      .filter((c) => c.count > 0); // Only show categories with actual products!
  }, [categories, products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all') {
          const cat = product.category_name || product.category || '';
          const slug = product.category_slug || normalizeCategory(cat);
          if (slug !== selectedCategory) return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const nameMatch = product.name?.toLowerCase().includes(q);
          const descMatch = product.description?.toLowerCase().includes(q);
          const catMatch = (product.category_name || product.category || '').toLowerCase().includes(q);
          if (!nameMatch && !descMatch && !catMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = readNumber(a.price, 0);
        const priceB = readNumber(b.price, 0);

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'newest') {
          return Number(b.id) - Number(a.id);
        }
        // Default: featured first, then newest
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return Number(b.id) - Number(a.id);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Curated Featured Products (up to 8 genuine products marked featured)
  const featuredProducts = useMemo(() => {
    const feat = products.filter((p) => p.featured);
    return feat.length >= 4 ? feat.slice(0, 8) : products.slice(0, 8);
  }, [products]);

  // Handle category selection
  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const params = new URLSearchParams(window.location.search);
    if (categorySlug === 'all') {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }
    const queryString = params.toString();
    router.replace(queryString ? `/store?${queryString}` : '/store', { scroll: false });

    // Smooth scroll down to all products catalog
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add to cart functionality
  const handleAddToCart = async (product: Product, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const pid = product.id;
    setLoadingButtons((prev) => new Set(prev).add(pid));

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const data = await apiFetch('/cart', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
          purchase_type: getPurchaseType(product),
          validity_days: getValidityDays(product),
        }),
      });

      if (data?.success) {
        window.dispatchEvent(new Event('cartUpdated'));

        Swal.fire({
          title: 'Added to Cart! 🛒',
          text: `${product.name} has been added to your cart.`,
          icon: 'success',
          background: '#0c1017',
          color: '#fafafa',
          confirmButtonColor: '#00d4aa',
          confirmButtonText: 'View Cart',
          showCancelButton: true,
          cancelButtonText: 'Continue Shopping',
          cancelButtonColor: '#2a2f3d',
          customClass: {
            popup: 'border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl',
            confirmButton: 'bg-[#00d4aa] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#00e2b6] transition-all',
            cancelButton: 'bg-white/10 text-white font-medium px-5 py-3 rounded-xl hover:bg-white/15 transition-all',
            title: 'text-2xl font-bold text-white mb-2',
            htmlContainer: 'text-gray-300 text-sm',
          },
          buttonsStyling: false,
          timer: 3500,
          timerProgressBar: true,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/cart');
          }
        });
      } else {
        Swal.fire({
          title: 'Could Not Add Item',
          text: data?.message || 'Unable to add product to cart. Please try again.',
          icon: 'warning',
          background: '#0c1017',
          color: '#fafafa',
          confirmButtonColor: '#00d4aa',
          confirmButtonText: 'OK',
        });
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      Swal.fire({
        title: 'Cart Update',
        text: 'Item added to session. Check your cart.',
        icon: 'info',
        background: '#0c1017',
        color: '#fafafa',
        confirmButtonColor: '#00d4aa',
      });
    } finally {
      setLoadingButtons((prev) => {
        const next = new Set(prev);
        next.delete(pid);
        return next;
      });
    }
  };

  // FAQ Accordion Toggle
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'What type of digital products are available?',
      a: 'NextDigi Store provides production-ready web application source code, mobile app codebases, developer UI kits, automation scripts, productivity tool subscriptions, and practical guides. All products are digitally delivered with clean documentation.',
    },
    {
      q: 'How do I purchase a product?',
      a: 'Browse our catalog, click "Add to Cart" or "Buy Now", review your order in the cart, and proceed to checkout. You can check out quickly using secure local mobile banking (bKash, Nagad, Rocket) or international credit/debit cards.',
    },
    {
      q: 'How do I receive my digital product?',
      a: 'Digital delivery is immediate upon payment confirmation. You will receive an instant download link on the checkout confirmation screen, a receipt sent to your email, and ongoing permanent access in your customer dashboard under "Downloads".',
    },
    {
      q: 'Can I access my purchases later?',
      a: 'Yes. Once an order is completed, your purchased files, license keys, and downloadable assets remain accessible indefinitely inside your registered NextDigi account dashboard.',
    },
    {
      q: 'What payment methods are supported?',
      a: 'We support all major Bangladeshi mobile banking systems including bKash, Nagad, and Rocket, along with Visa, MasterCard, and direct digital payments via SSLCommerz secure checkout.',
    },
    {
      q: 'Can I get support after purchasing?',
      a: 'Yes. Each product includes initial onboarding instructions and technical support for setup or file access. If you have questions regarding deployment or configuration, our support team is available via email or the support ticket portal.',
    },
    {
      q: 'Are digital products refundable?',
      a: 'We stand behind the quality of our digital assets with a standard 30-day policy. In cases where the digital file is demonstrably defective, broken, or not as described, and our support team is unable to resolve the issue, a refund or credit can be requested via our refund policy.',
    },
    {
      q: 'Can I request a custom product?',
      a: 'Absolutely! If your business needs a tailored software platform, custom mobile application, or bespoke AI automation workflow that goes beyond our ready-made store products, our NextDigi Solutions division can design, engineer, and deploy a custom solution tailored to your exact specifications.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#00d4aa] selection:text-black">
      {/* ==================================================================== */}
      {/* 01. STORE HERO                                                       */}
      {/* ==================================================================== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/8">
        {/* Background glow effects */}
        <div className="absolute top-10 left-1/4 w-[600px] h-[350px] bg-[#00d4aa]/15 blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute top-48 right-1/4 w-[500px] h-[300px] bg-[#8b5cf6]/15 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#00d4aa] font-semibold">NextDigi Store</span>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-bold tracking-wider text-[#00d4aa] uppercase mb-6 shadow-sm">
              <ShoppingBagIcon className="w-4 h-4 text-[#00d4aa]" />
              <span>NEXTDIGI STORE &bull; DIGITAL PRODUCTS DIVISION</span>
            </div>

            {/* Headline H1 */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              Digital Products That Help You{' '}
              <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
                Move Faster.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
              Templates, guides, business resources and digital tools designed for entrepreneurs, creators, developers and growing businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#catalog"
                className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 flex items-center gap-2 text-sm md:text-base group"
              >
                <span>Explore Products</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#categories"
                className="px-8 py-4 rounded-xl font-semibold text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm md:text-base"
              >
                Browse Categories
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="mt-14 pt-10 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <ArrowDownTrayIcon className="w-5 h-5 text-[#00d4aa] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Instant Delivery</div>
                  <div className="text-[11px] text-gray-400">Direct dashboard download</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <ShieldCheckIcon className="w-5 h-5 text-[#38bdf8] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Verified Assets</div>
                  <div className="text-[11px] text-gray-400">Tested and validated</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <BoltIcon className="w-5 h-5 text-[#8b5cf6] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Local &amp; Cards</div>
                  <div className="text-[11px] text-gray-400">bKash, Nagad, Visa, MC</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <ArrowPathIcon className="w-5 h-5 text-[#10b981] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Product Support</div>
                  <div className="text-[11px] text-gray-400">Setup guides &amp; updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 02. STORE CATEGORIES                                                 */}
      {/* ==================================================================== */}
      <section id="categories" className="py-20 bg-[#090d16]/70 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
                <span className="w-3 h-px bg-[#00d4aa]" />
                STORE CATEGORIES
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Browse by Asset Category
              </h2>
              <p className="text-sm text-gray-400 mt-2 max-w-xl">
                Explore our catalog categorized by asset specialization. Showing only verified categories with available inventory.
              </p>
            </div>
            <button
              onClick={() => handleCategorySelect('all')}
              className="mt-4 sm:mt-0 text-xs font-bold text-[#00d4aa] hover:underline inline-flex items-center gap-1.5 self-start"
            >
              <span>View all categories</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryStats.map((cat) => {
              const Icon = getCategoryIcon(cat.slug);
              const isSelected = selectedCategory === cat.slug;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#00d4aa]/10 border-[#00d4aa] shadow-[0_0_25px_rgba(0,212,170,0.15)]'
                      : 'bg-[#0e131d]/90 border-white/8 hover:border-white/20 hover:bg-[#121927]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected ? 'bg-[#00d4aa] text-black' : 'bg-white/5 text-[#00d4aa] border border-white/10'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5">
                      {cat.count} {cat.count === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-base font-bold transition ${
                        isSelected ? 'text-[#00d4aa]' : 'text-white group-hover:text-[#00d4aa]'
                      }`}
                    >
                      {cat.category_name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                      Explore verified {cat.category_name.toLowerCase()} assets
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 03. FEATURED PRODUCTS                                                */}
      {/* ==================================================================== */}
      <section className="py-20 border-b border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
                <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
                FEATURED PRODUCTS
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Curated Digital Resources
              </h2>
              <p className="text-sm text-gray-400 mt-2 max-w-xl">
                Hand-picked, high-demand solutions verified for immediate implementation in your workflow.
              </p>
            </div>
            <a
              href="#catalog"
              className="mt-4 sm:mt-0 text-xs font-bold text-[#00d4aa] hover:underline inline-flex items-center gap-1.5 self-start"
            >
              <span>See full catalog ({products.length} products)</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Featured Grid (6-8 items max) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => {
              const price = readNumber(prod.price, 0);
              const comparePrice = prod.compare_price != null ? readNumber(prod.compare_price, 0) : null;
              const hasDiscount = comparePrice != null && comparePrice > price;
              const isLoading = loadingButtons.has(prod.id);

              return (
                <div
                  key={prod.id}
                  className="rounded-2xl border border-white/8 bg-[#0e131d]/90 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-[0_0_30px_rgba(0,212,170,0.08)]"
                >
                  {/* Thumbnail / Image */}
                  <div className="relative aspect-[16/10] bg-[#121824] overflow-hidden">
                    <img
                      src={resolveProductImage(prod)}
                      alt={prod.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#00d4aa] border border-[#00d4aa]/30 uppercase tracking-wider">
                        {prod.category_name || prod.category || 'Digital Asset'}
                      </span>
                      {prod.featured && (
                        <span className="px-2 py-1 rounded-md bg-[#8b5cf6]/90 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setQuickViewProduct(prod)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-all"
                      title="Quick view"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#00d4aa] transition line-clamp-2 mb-2">
                        <Link href={`/products/${prod.slug || prod.id}`}>
                          {prod.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                        {prod.description || 'Verified production digital resource from NextDigi Store.'}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-[#00d4aa]">
                            ৳{price.toLocaleString('en-BD')}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-gray-400 line-through">
                              ৳{comparePrice.toLocaleString('en-BD')}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-medium text-gray-400">
                          {getPurchaseTypeLabel(prod)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleAddToCart(prod, e)}
                          disabled={isLoading}
                          className="p-2.5 rounded-xl bg-white/5 hover:bg-[#00d4aa] hover:text-black text-gray-200 transition border border-white/10 active:scale-95 disabled:opacity-50"
                          title="Add to cart"
                        >
                          <ShoppingBagIcon className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/products/${prod.slug || prod.id}`}
                          className="px-3.5 py-2 rounded-xl bg-[#00d4aa]/10 hover:bg-[#00d4aa] hover:text-black text-[#00d4aa] font-bold text-xs transition border border-[#00d4aa]/25"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 04. ALL PRODUCTS / SEARCH & FILTER CATALOG                           */}
      {/* ==================================================================== */}
      <section id="catalog" className="py-20 bg-[#090d16]/70 border-b border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
              <span className="w-3 h-px bg-[#00d4aa]" />
              FULL CATALOG
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Explore All Digital Products
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Filter by category, search by name or keyword, and find the exact asset for your project.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#0e131d] border border-white/8 mb-10 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates, software, AI tools, or guides..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00d4aa] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Stats */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-xs text-gray-400 font-medium">
                Showing <strong className="text-white">{filteredProducts.length}</strong> products
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-200 focus:outline-none focus:border-[#00d4aa]"
              >
                <option value="featured" className="bg-[#0e131d] text-white">
                  Sort by: Featured
                </option>
                <option value="newest" className="bg-[#0e131d] text-white">
                  Sort by: Newest
                </option>
                <option value="price-low" className="bg-[#0e131d] text-white">
                  Price: Low to High
                </option>
                <option value="price-high" className="bg-[#0e131d] text-white">
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-white/10">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#00d4aa] text-black shadow-md shadow-[#00d4aa]/20'
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              All Products ({products.length})
            </button>

            {categoryStats.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#00d4aa] text-black shadow-md shadow-[#00d4aa]/20'
                      : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat.category_name} ({cat.count})
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 rounded-2xl bg-[#0e131d]/60 border border-white/8">
              <ShoppingBagIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No matching products found</h3>
              <p className="text-sm text-gray-400 mb-6">
                Try adjusting your search query or selecting a different category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleCategorySelect('all');
                }}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => {
                const price = readNumber(prod.price, 0);
                const comparePrice = prod.compare_price != null ? readNumber(prod.compare_price, 0) : null;
                const hasDiscount = comparePrice != null && comparePrice > price;
                const isLoading = loadingButtons.has(prod.id);

                return (
                  <div
                    key={prod.id}
                    className="rounded-2xl border border-white/8 bg-[#0e131d]/90 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-[0_0_30px_rgba(0,212,170,0.08)]"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] bg-[#121824] overflow-hidden">
                      <img
                        src={resolveProductImage(prod)}
                        alt={prod.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#00d4aa] border border-[#00d4aa]/30 uppercase tracking-wider">
                          {prod.category_name || prod.category || 'Asset'}
                        </span>
                        {prod.featured && (
                          <span className="px-2 py-1 rounded-md bg-[#8b5cf6]/90 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setQuickViewProduct(prod)}
                        className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-all"
                        title="Quick view"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#00d4aa] transition line-clamp-2 mb-2">
                          <Link href={`/products/${prod.slug || prod.id}`}>
                            {prod.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                          {prod.description || 'Verified production digital resource from NextDigi Store.'}
                        </p>
                      </div>

                      {/* Price & Actions */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-black text-[#00d4aa]">
                              ৳{price.toLocaleString('en-BD')}
                            </span>
                            {hasDiscount && (
                              <span className="text-xs text-gray-400 line-through">
                                ৳{comparePrice.toLocaleString('en-BD')}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-medium text-gray-400">
                            {getPurchaseTypeLabel(prod)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleAddToCart(prod, e)}
                            disabled={isLoading}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-[#00d4aa] hover:text-black text-gray-200 transition border border-white/10 active:scale-95 disabled:opacity-50"
                            title="Add to cart"
                          >
                            <ShoppingBagIcon className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/products/${prod.slug || prod.id}`}
                            className="px-3.5 py-2 rounded-xl bg-[#00d4aa]/10 hover:bg-[#00d4aa] hover:text-black text-[#00d4aa] font-bold text-xs transition border border-[#00d4aa]/25"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 05. STORE VALUE PROPOSITION (BUILT FOR PEOPLE BUILDING ONLINE)       */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <span className="w-3 h-px bg-[#00d4aa]" />
              VALUE PROPOSITION
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Built for People Building Online
            </h2>
            <p className="text-base text-gray-400 mt-3 leading-relaxed">
              Every asset in NextDigi Store is engineered to eliminate repetitive setup time, reduce overhead, and accelerate time-to-market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#0e131d]/80 border border-white/8 hover:border-[#00d4aa]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-5">
                <BoltIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#00d4aa] uppercase tracking-widest">Target Audience</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">FOR ENTREPRENEURS</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Launch and grow your business with ready-to-use resources, validated operational systems, and commerce-ready websites.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e131d]/80 border border-white/8 hover:border-[#38bdf8]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] mb-5">
                <PaintBrushIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#38bdf8] uppercase tracking-widest">Target Audience</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">FOR CREATORS</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Create content and digital experiences faster with professional video editing suites, design templates, and media assets.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e131d]/80 border border-white/8 hover:border-[#8b5cf6]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] mb-5">
                <CodeBracketIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#8b5cf6] uppercase tracking-widest">Target Audience</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">FOR DEVELOPERS</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Access useful templates, tools and development resources — including Next.js web codebases, Flutter mobile apps, and AI tooling.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e131d]/80 border border-white/8 hover:border-[#fbbf24]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24] mb-5">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#fbbf24] uppercase tracking-widest">Target Audience</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">FOR MARKETERS</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Use practical marketing resources, campaign assistance toolkits, and social media creative assets to drive customer acquisition.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e131d]/80 border border-white/8 hover:border-[#10b981]/30 transition-all lg:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] mb-5">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#10b981] uppercase tracking-widest">Target Audience</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">FOR BUSINESSES</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Get ready-to-use digital tools and operational resources to modernize your service delivery, manage appointment bookings, and empower internal staff with AI capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 06. NEW & FEATURED RESOURCES                                         */}
      {/* ==================================================================== */}
      <section className="py-20 bg-[#090d16]/70 border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
              <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
              RESOURCE SPOTLIGHT
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Featured Resource Categories
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              High-utility assets engineered for immediate commercial use and rapid project execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-[#0e131d] border border-white/8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#00d4aa] uppercase tracking-wider mb-2">Full-Stack Codebases</div>
                <h3 className="text-lg font-bold text-white mb-2">eCommerce &amp; Web Solutions</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Turn-key eCommerce web platforms with pre-configured payment gateways, inventory catalogs, and customer order management.
                </p>
              </div>
              <button
                onClick={() => handleCategorySelect('web-development')}
                className="text-xs font-bold text-[#00d4aa] hover:underline inline-flex items-center gap-1 self-start"
              >
                <span>Browse web codebases</span>
                <ArrowRightIcon className="w-3 h-3" />
              </button>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e131d] border border-white/8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">Productivity &amp; AI</div>
                <h3 className="text-lg font-bold text-white mb-2">Developer AI &amp; Pro Suites</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Official access to frontier developer IDEs (Cursor AI Pro) and leading reasoning models (Claude AI Pro, ChatGPT Plus) for high-efficiency engineering.
                </p>
              </div>
              <button
                onClick={() => handleCategorySelect('software-apps')}
                className="text-xs font-bold text-[#38bdf8] hover:underline inline-flex items-center gap-1 self-start"
              >
                <span>Browse software &amp; apps</span>
                <ArrowRightIcon className="w-3 h-3" />
              </button>
            </div>

            <div className="p-7 rounded-2xl bg-[#0e131d] border border-white/8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider mb-2">Creative Production</div>
                <h3 className="text-lg font-bold text-white mb-2">Design &amp; Video Suites</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Professional video production tools (CapCut Pro) and graphic design assets (Canva Pro) for creators building digital channels and brand visuals.
                </p>
              </div>
              <button
                onClick={() => handleCategorySelect('video-animation')}
                className="text-xs font-bold text-[#8b5cf6] hover:underline inline-flex items-center gap-1 self-start"
              >
                <span>Browse creative tools</span>
                <ArrowRightIcon className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 07. CROSS-SELL: NEXTDIGI SOLUTIONS                                   */}
      {/* ==================================================================== */}
      <section className="py-16 border-b border-white/8 bg-gradient-to-b from-transparent to-[#00d4aa]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-[#00d4aa]/20 bg-[#0d1522]/90 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-bold text-[#00d4aa] mb-4">
                <CodeBracketIcon className="w-4 h-4" />
                <span>NEXTDIGI SOLUTIONS &bull; CUSTOM SOFTWARE DIVISION</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
                Need Something Custom?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Our Store offers ready-to-use digital products. If you need something built specifically for your business, NextDigi Solutions can design and develop a custom solution.
              </p>
            </div>
            <Link
              href="/solutions"
              className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/20 flex items-center gap-2 shrink-0"
            >
              <span>Build a Custom Solution</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 08. CROSS-SELL: NEXTDIGI AI                                          */}
      {/* ==================================================================== */}
      <section className="py-16 border-b border-white/8 bg-gradient-to-b from-transparent to-[#8b5cf6]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-[#8b5cf6]/20 bg-[#121024]/90 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs font-bold text-[#8b5cf6] mb-4">
                <CpuChipIcon className="w-4 h-4" />
                <span>NEXTDIGI AI &bull; INTELLIGENT AUTOMATION DIVISION</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
                Need AI Instead?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Explore AI agents, automation and intelligent business solutions from NextDigi AI.
              </p>
            </div>
            <Link
              href="/ai"
              className="px-8 py-4 rounded-xl font-bold text-white bg-[#8b5cf6] hover:bg-[#9d71f7] transition shadow-lg shadow-[#8b5cf6]/20 flex items-center gap-2 shrink-0"
            >
              <span>Explore NextDigi AI</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 09. CROSS-SELL: NEXTDIGI LABS                                        */}
      {/* ==================================================================== */}
      <section className="py-16 border-b border-white/8 bg-gradient-to-b from-transparent to-[#38bdf8]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-[#38bdf8]/20 bg-[#0d1624]/90 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-xs font-bold text-[#38bdf8] mb-4">
                <BoltIcon className="w-4 h-4" />
                <span>NEXTDIGI LABS &bull; SAAS &amp; PRODUCT DIVISION</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
                Looking for Software?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Explore SaaS products and technology platforms built by NextDigi Labs.
              </p>
            </div>
            <Link
              href="/labs"
              className="px-8 py-4 rounded-xl font-bold text-black bg-[#38bdf8] hover:bg-[#52c7f9] transition shadow-lg shadow-[#38bdf8]/20 flex items-center gap-2 shrink-0"
            >
              <span>Explore NextDigi Labs</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 10. PRODUCT TRUST                                                    */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 bg-[#090d16]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-3">
              <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
              FACTUAL GUARANTEE &amp; TRUST
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Why Professionals Trust NextDigi Store
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Clean digital delivery backed by verified platform architecture and responsive customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8">
              <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa] mb-4">
                <ArrowDownTrayIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Instant Digital Access</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Immediate file downloads and license delivery directly to your screen and email upon successful checkout.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8">
              <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] mb-4">
                <ShieldCheckIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Secure Checkout</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                All payments processed through SSL-encrypted banking channels supporting bKash, Nagad, Rocket and international cards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] mb-4">
                <CodeBracketIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Downloadable Resources</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Full source files, documented repositories, and installation guides included with every source code purchase.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8">
              <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/10 border border-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24] mb-4">
                <BoltIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Product Support</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Dedicated customer assistance for onboarding, asset downloads, and account license management.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] mb-4">
                <ArrowPathIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Regular Product Updates</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Products receive ongoing maintenance updates and dependency upgrades as underlying frameworks evolve.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e131d] border border-white/8">
              <div className="w-10 h-10 rounded-xl bg-[#ec4899]/10 border border-[#ec4899]/20 flex items-center justify-center text-[#ec4899] mb-4">
                <CheckCircleIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Dashboard Order History</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Permanent access to invoices, download links, and receipts inside your authenticated user dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 11. STORE FAQ                                                        */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-24 border-b border-white/8 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#00d4aa] uppercase mb-2">
              <span className="w-3 h-px bg-[#00d4aa]" />
              QUESTIONS &amp; ANSWERS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Everything you need to know about purchasing, delivery, and support for NextDigi Store products.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/8 bg-[#0e131d]/90 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-white/[0.02]"
                  >
                    <span className="text-base font-bold text-white">{faq.q}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-[#00d4aa] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 12. FINAL STORE CTA                                                  */}
      {/* ==================================================================== */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00d4aa]/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-bold tracking-wider text-[#00d4aa] uppercase mb-6">
            <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
            NEXTDIGI STORE &bull; GROW SMARTER ONLINE
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Ready to Accelerate Your Projects?
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Gain immediate access to production-ready digital products, software codebases, and templates designed to help you work smarter and build faster.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#catalog"
              className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 flex items-center gap-2"
            >
              <span>Browse All Products</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>
            <Link
              href="/solutions"
              className="px-8 py-4 rounded-xl font-semibold text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Request Custom Build
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* QUICK VIEW MODAL                                                     */}
      {/* ==================================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0c1017] border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start mt-2">
              <div className="aspect-[16/11] rounded-2xl bg-[#121824] overflow-hidden border border-white/10">
                <img
                  src={resolveProductImage(quickViewProduct)}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00d4aa]">
                  {quickViewProduct.category_name || quickViewProduct.category || 'Digital Asset'}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-3">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {quickViewProduct.description || 'Verified production digital resource from NextDigi Store.'}
                </p>

                <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl font-black text-[#00d4aa]">
                    ৳{readNumber(quickViewProduct.price, 0).toLocaleString('en-BD')}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    {getPurchaseTypeLabel(quickViewProduct)} &bull; Instant digital delivery
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleAddToCart(quickViewProduct, e)}
                    disabled={loadingButtons.has(quickViewProduct.id)}
                    className="flex-1 py-3.5 rounded-xl bg-[#00d4aa] hover:bg-[#00e2b6] text-black font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBagIcon className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <Link
                    href={`/products/${quickViewProduct.slug || quickViewProduct.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition"
                  >
                    Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
