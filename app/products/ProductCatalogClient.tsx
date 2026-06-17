'use client';

import { Suspense, useCallback, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon, ArrowDownTrayIcon, StarIcon, ArrowPathIcon, AdjustmentsHorizontalIcon, HeartIcon, EyeIcon, XMarkIcon, BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Swal from 'sweetalert2';
import { getStorageUrl, apiFetch } from '../utils/api';
import {
  getAccessLabel,
  getProductKindLabel,
  getPurchaseType,
  getPurchaseTypeLabel,
  getValidityDays,
  isSubscriptionPurchase,
  type CommercialInfo,
} from '../utils/commercial';

interface Product extends CommercialInfo {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number | string;
  compare_price: number | string | null;
  thumbnail: string | null;
  featured: boolean;
  category: string | null;
  category_id?: number | string | null;
  category_name?: string | null;
  category_slug?: string | null;
}

interface Category {
  id: number | string;
  category_name: string;
  slug: string;
}

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

const normalizeCategory = (value: unknown): string => {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const unwrapArray = <T,>(data: unknown): T[] => {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === 'object') {
    const first = (data as { data?: unknown }).data;
    if (Array.isArray(first)) return first as T[];
    if (first && typeof first === 'object') {
      const second = (first as { data?: unknown }).data;
      if (Array.isArray(second)) return second as T[];
    }
  }
  return [];
};

const PRODUCTS_PER_PAGE = 100;
const DEFAULT_PRICE_RANGE: { min: number; max: number | null } = { min: 0, max: null };

const readNumber = (value: unknown, fallback: number): number => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

const toProductPrice = (product: Product): number => readNumber(product.price, 0);

const PriceAndAccess = ({ product }: { product: Product }) => {
  const price = toProductPrice(product);
  const comparePrice = product.compare_price == null ? null : readNumber(product.compare_price, 0);
  const accessLabel = getAccessLabel(product);

  return (
    <div className="min-w-0">
      <div className="flex min-w-0 flex-wrap items-baseline gap-2">
        <span className="text-xl font-bold text-[#00d4aa]">
            ৳{price.toLocaleString('en-BD')}
        </span>
        {comparePrice != null && comparePrice > price && (
          <span className="text-sm text-[#737373] line-through">
              ৳{comparePrice.toLocaleString('en-BD')}
          </span>
        )}
      </div>
      <div className="mt-1 flex flex-wrap gap-1.5">
        <span className="rounded-md border border-[#00d4aa]/25 bg-[#00d4aa]/10 px-2 py-1 text-[11px] font-semibold text-[#b9fff1]">
          {getPurchaseTypeLabel(product)}
        </span>
        {isSubscriptionPurchase(product) && (
          <span className="rounded-md border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-2 py-1 text-[11px] font-semibold text-[#d8c8ff]">
            {accessLabel}
          </span>
        )}
      </div>
    </div>
  );
};

const getPaginationMeta = (data: unknown, fallbackPage: number) => {
  const root = data && typeof data === 'object' ? data as Record<string, unknown> : {};
  const nested = root.data && typeof root.data === 'object' && !Array.isArray(root.data)
    ? root.data as Record<string, unknown>
    : {};
  const meta = root.meta && typeof root.meta === 'object'
    ? root.meta as Record<string, unknown>
    : nested.meta && typeof nested.meta === 'object'
      ? nested.meta as Record<string, unknown>
      : {};

  const currentPage = readNumber(
    root.current_page ?? nested.current_page ?? meta.current_page,
    fallbackPage
  );
  const lastPage = readNumber(
    root.last_page ?? nested.last_page ?? meta.last_page,
    currentPage
  );

  return { currentPage, lastPage };
};

function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#0f0f12] py-12">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#737373]">Loading premium products...</p>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get('search') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [apiCategories, setApiCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(initialSearchQuery);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [priceRange, setPriceRange] = useState<{min: number, max: number | null}>(DEFAULT_PRICE_RANGE);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [animatingButtons, setAnimatingButtons] = useState<Set<number>>(new Set());
  const [loadingButtons, setLoadingButtons] = useState<Set<number>>(new Set());
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showQuickView, setShowQuickView] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let nextPage = 1;
        const allProducts: Product[] = [];

        while (!cancelled) {
          const data = await apiFetch(`products?page=${nextPage}&per_page=${PRODUCTS_PER_PAGE}`);
          const pageProducts = unwrapArray<Product>(data);
          const { currentPage, lastPage } = getPaginationMeta(data, nextPage);

          allProducts.push(...pageProducts);
          setProducts([...allProducts]);

          if (pageProducts.length === 0 || currentPage >= lastPage) {
            break;
          }

          nextPage = currentPage + 1;
        }

        if (cancelled) return;

        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await apiFetch('categories', { silent: true });
        setApiCategories(unwrapArray<Category>(data));
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    loadCategories();
  }, []);

  const selectedCategory = searchParams.get('category') || 'all';
  const urlSearchQuery = searchParams.get('search') || '';

  useEffect(() => {
    if (urlSearchQuery === searchQuery) return;
    const syncTimer = window.setTimeout(() => {
      setSearchQuery(urlSearchQuery);
      setDebouncedSearchQuery(urlSearchQuery);
    }, 0);

    return () => window.clearTimeout(syncTimer);
  }, [searchQuery, urlSearchQuery]);

  const setSelectedCategory = useCallback((category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    const queryString = params.toString();
    router.replace(queryString ? `/products?${queryString}` : '/products', { scroll: false });
  }, [router, searchParams]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextSearch = searchQuery.trim();
      setDebouncedSearchQuery(nextSearch);

      const params = new URLSearchParams(searchParams.toString());
      if (nextSearch) {
        params.set('search', nextSearch);
      } else {
        params.delete('search');
      }

      const queryString = params.toString();
      const nextUrl = queryString ? `/products?${queryString}` : '/products';
      router.replace(nextUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [router, searchParams, searchQuery]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setQuickViewProduct(null);
  };

  const addToCart = async (product: Product, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setLoadingButtons(prev => new Set(prev).add(product.id));
    setAnimatingButtons(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAnimatingButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 600);

    try {
      const token = localStorage.getItem('auth_token');
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
            confirmButton: 'bg-linear-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all',
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
    } finally {
      setLoadingButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const categoryOptions = useMemo(() => {
    const optionMap = new Map<string, { key: string; label: string; slug: string }>();

    apiCategories.forEach((category) => {
      const slug = category.slug || normalizeCategory(category.category_name);
      if (!slug) return;
      optionMap.set(slug, {
        key: slug,
        label: category.category_name,
        slug,
      });
    });

    products.forEach((product) => {
      const label = product.category_name || product.category;
      const slug = product.category_slug || normalizeCategory(label);
      if (!label || !slug || optionMap.has(slug)) return;
      optionMap.set(slug, {
        key: slug,
        label,
        slug,
      });
    });

    return [
      { key: 'all', label: 'All', slug: 'all' },
      ...Array.from(optionMap.values()),
    ];
  }, [apiCategories, products]);

  const getProductCategoryLabel = useCallback((product: Product) => {
    return product.category_name || product.category || '';
  }, []);

  const productMatchesCategory = useCallback((product: Product, selected: string) => {
    if (selected === 'all') return true;

    const productCategory = getProductCategoryLabel(product);
    const productCategoryId = product.category_id == null ? '' : String(product.category_id);
    const productCategorySlug = product.category_slug || normalizeCategory(productCategory);
    const selectedNormalized = normalizeCategory(selected);

    const matchedApiCategory = apiCategories.find((category) => {
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
  }, [apiCategories, getProductCategoryLabel]);

  const selectedCategoryLabel =
    selectedCategory === 'all'
      ? 'Products'
      : categoryOptions.find((category) => category.key === selectedCategory)?.label || selectedCategory;
  const activeFilterCount = Number(Boolean(debouncedSearchQuery)) + Number(selectedCategory !== 'all') + Number(priceRange.min > 0 || priceRange.max != null);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = productMatchesCategory(product, selectedCategory);
      const normalizedSearch = debouncedSearchQuery.toLowerCase();
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.category_name,
        product.category_slug,
      ].filter(Boolean).join(' ').toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const productPrice = toProductPrice(product);
      const matchesPrice = productPrice >= priceRange.min && (priceRange.max == null || productPrice <= priceRange.max);
      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = toProductPrice(a) - toProductPrice(b);
          break;
        case 'category':
          comparison = getProductCategoryLabel(a).localeCompare(getProductCategoryLabel(b));
          break;
        case 'featured':
          comparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [products, selectedCategory, debouncedSearchQuery, priceRange, sortBy, sortOrder, productMatchesCategory, getProductCategoryLabel]);

  const featuredProducts = filteredProducts.filter(p => p.featured);

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0f12] py-12">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#737373]">Loading premium products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f0f12] py-12">
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#fafafa]">Something went wrong</h2>
          <p className="text-[#737373] mb-6">{error}</p>
          <Link href="/" className="bg-[#00d4aa] text-[#0f0f12] px-6 py-3 rounded-lg hover:bg-[#00d4aa]/80 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-linear-to-br from-[#00d4aa]/12 via-[#101014] to-[#8b5cf6]/14" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,170,0.20)_0%,rgba(8,8,8,0)_58%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#00d4aa]/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#00d4aa]/25 bg-[#00d4aa]/10 px-4 py-2 mb-6 shadow-lg shadow-[#00d4aa]/5">
              <StarIcon className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-sm text-[#b9fff1]">Premium searchable catalog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Digital Products
            </h1>
            <p className="text-base sm:text-xl text-[#737373] max-w-2xl mx-auto">
              Curated selection of premium digital assets for local and international markets
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ['Instant access', 'Download-ready assets'],
                ['Smart filters', 'Find matching tools fast'],
                ['Commercial value', 'Built for business use'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-[#0f0f12]/60 p-4 text-left backdrop-blur">
                  <div className="text-sm font-semibold text-[#fafafa]">{title}</div>
                  <div className="mt-1 text-xs text-[#737373]">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filter Bar */}
      <div className="sticky top-20 sm:top-24 lg:top-28 z-30 bg-[#0f0f12]/95 backdrop-blur-xl border-b border-[#2a2a30]">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          {/* Main Filter Row */}
          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#737373]" />
              <input
                type="text"
                placeholder="Search products by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl pl-12 pr-4 py-3 text-[#fafafa] placeholder-[#737373] focus:outline-none focus:border-[#00d4aa] focus:ring-2 focus:ring-[#00d4aa]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#737373] hover:text-[#fafafa] transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort and Advanced Filters */}
            <div className="flex w-full flex-wrap items-center gap-3 xl:w-auto">
              <div className="rounded-lg border border-[#2a2a30] bg-[#1a1a1f] px-3 py-2 text-xs font-semibold text-[#737373]">
                {activeFilterCount} active
              </div>
              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-lg px-3 py-2 text-[#fafafa] text-sm focus:outline-none focus:border-[#00d4aa] appearance-none pr-8"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="category">Category</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {sortOrder === 'asc' ? <BarsArrowUpIcon className="w-4 h-4 text-[#737373]" /> : <BarsArrowDownIcon className="w-4 h-4 text-[#737373]" />}
                </div>
              </div>

              {/* Sort Order Toggle */}
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#737373] hover:text-[#00d4aa] hover:border-[#00d4aa]/30 transition-all"
                title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
              >
                {sortOrder === 'asc' ? <BarsArrowUpIcon className="w-4 h-4" /> : <BarsArrowDownIcon className="w-4 h-4" />}
              </button>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-2 rounded-lg transition-all ${
                  showAdvancedFilters
                    ? 'bg-[#00d4aa] text-[#0f0f12]'
                    : 'bg-[#1a1a1f] border border-[#2a2a30] text-[#737373] hover:text-[#00d4aa] hover:border-[#00d4aa]/30'
                }`}
                title="Advanced Filters"
              >
                <AdjustmentsHorizontalIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="mt-4 p-4 bg-[#1a1a1f] border border-[#2a2a30] rounded-xl animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-[#fafafa] mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({...prev, min: Number(e.target.value) || 0}))}
                      className="w-full bg-[#0f0f12] border border-[#2a2a30] rounded px-3 py-2 text-[#fafafa] text-sm focus:outline-none focus:border-[#00d4aa]"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max ?? ''}
                      onChange={(e) => {
                        const value = e.target.value.trim();
                        setPriceRange(prev => ({...prev, max: value ? Number(value) : null}));
                      }}
                      className="w-full bg-[#0f0f12] border border-[#2a2a30] rounded px-3 py-2 text-[#fafafa] text-sm focus:outline-none focus:border-[#00d4aa]"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-[#fafafa] mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-[#0f0f12] border border-[#2a2a30] rounded px-3 py-2 text-[#fafafa] text-sm focus:outline-none focus:border-[#00d4aa] appearance-none"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {categoryIconMap[cat.slug.toLowerCase()] || '📌'} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setPriceRange(DEFAULT_PRICE_RANGE);
                      setSortBy('featured');
                      setSortOrder('desc');
                    }}
                    className="w-full px-4 py-2 bg-[#2a2a30] text-[#737373] rounded-lg hover:bg-[#3a3a40] hover:text-[#fafafa] transition-all text-sm sm:w-auto"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

       {/* Products Grid */}
       <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Stats */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-[#fafafa]">
              {filteredProducts.length} {selectedCategoryLabel}
            </h2>
            <p className="text-[#737373]">
              {featuredProducts.length} featured {selectedCategory === 'all' ? '' : selectedCategoryLabel}
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2 text-sm text-[#737373]">
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span>{products.length} total items</span>
          </div>
        </div>

        {featuredProducts.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-semibold text-[#00d4aa] mb-6 flex items-center gap-2">
              <StarIcon className="w-5 h-5" />
              Featured Products
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
{featuredProducts.map((product) => (
                 <Link
                   key={product.id}
                   href={`/products/${product.id}`}
                   className="group glass-card rounded-2xl overflow-hidden border border-[#2a2a30] hover:border-[#00d4aa]/50 transition-all duration-300 animate-fade-in-up"
                 >
                    <div className="relative aspect-video overflow-hidden">
                       {product.thumbnail ? (
                         <img
                             src={getStorageUrl(product.thumbnail) || '/placeholder.png'}
                           alt={product.name}
                           loading="lazy"
                           decoding="async"
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                           onError={(e) => {
                             (e.target as HTMLImageElement).style.display = 'none';
                           }}
                         />
                       ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
                          <span className="text-[#737373]">No Image</span>
                        </div>
                      )}

                     {/* Overlay Actions */}
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                       <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <button
                           onClick={(e) => {
                             e.preventDefault();
                             e.stopPropagation();
                             toggleWishlist(product.id);
                           }}
                           className="p-2 bg-[#0f0f12]/80 backdrop-blur-sm rounded-full text-[#fafafa] hover:bg-[#00d4aa] hover:text-[#0f0f12] transition-all"
                           title={wishlist.has(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                         >
                           {wishlist.has(product.id) ? <HeartIconSolid className="w-4 h-4" /> : <HeartIcon className="w-4 h-4" />}
                         </button>
                         <button
                           onClick={(e) => {
                             e.preventDefault();
                             e.stopPropagation();
                             openQuickView(product);
                           }}
                           className="p-2 bg-[#0f0f12]/80 backdrop-blur-sm rounded-full text-[#fafafa] hover:bg-[#00d4aa] hover:text-[#0f0f12] transition-all"
                           title="Quick View"
                         >
                           <EyeIcon className="w-4 h-4" />
                         </button>
                       </div>
                     </div>

                     {product.featured && (
                       <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12]">
                           Featured
                         </span>
                       </div>
                     )}
                     <div className="absolute inset-0 bg-linear-to-t from-[#0f0f12] via-transparent to-transparent opacity-60" />
                   </div>
                  <div className="p-4 sm:p-6">
                    <span className="text-xs text-[#00d4aa] font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#fafafa] mt-2 mb-3 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#737373] line-clamp-2 mb-4">
                      {product.description}
                    </p>
                     <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                       <PriceAndAccess product={product} />
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => addToCart(product, e)}
                            disabled={loadingButtons.has(product.id)}
                            className={`w-full rounded bg-linear-to-r from-[#00d4aa] to-[#8b5cf6] px-3 py-2 text-xs font-bold text-[#0f0f12] transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:py-1 ${
                              animatingButtons.has(product.id) ? 'animate-bounce' : ''
                            }`}
                          >
                            {loadingButtons.has(product.id) ? (
                              <div className="flex items-center gap-1">
                                <ArrowPathIcon className="w-3 h-3 animate-spin" />
                                Adding...
                              </div>
                            ) : (
                              'Add to Cart'
                            )}
                          </button>
                        </div>
                     </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        {filteredProducts.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-[#fafafa] mb-6">
              All Products
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
{filteredProducts.map((product) => (
                 <Link
                   key={product.id}
                   href={`/products/${product.id}`}
                   className="group glass-card rounded-2xl overflow-hidden border border-[#2a2a30] hover:border-[#00d4aa]/50 transition-all duration-300 animate-fade-in-up"
                 >
                    <div className="relative aspect-video overflow-hidden">
                       {product.thumbnail ? (
                         <img
                             src={getStorageUrl(product.thumbnail) || '/placeholder.png'}
                           alt={product.name}
                           loading="lazy"
                           decoding="async"
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                           onError={(e) => {
                             (e.target as HTMLImageElement).style.display = 'none';
                           }}
                         />
                       ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
                          <span className="text-[#737373]">No Image</span>
                        </div>
                      )}

                     {/* Overlay Actions */}
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                       <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <button
                           onClick={(e) => {
                             e.preventDefault();
                             e.stopPropagation();
                             toggleWishlist(product.id);
                           }}
                           className="p-2 bg-[#0f0f12]/80 backdrop-blur-sm rounded-full text-[#fafafa] hover:bg-[#00d4aa] hover:text-[#0f0f12] transition-all"
                           title={wishlist.has(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                         >
                           {wishlist.has(product.id) ? <HeartIconSolid className="w-4 h-4" /> : <HeartIcon className="w-4 h-4" />}
                         </button>
                         <button
                           onClick={(e) => {
                             e.preventDefault();
                             e.stopPropagation();
                             openQuickView(product);
                           }}
                           className="p-2 bg-[#0f0f12]/80 backdrop-blur-sm rounded-full text-[#fafafa] hover:bg-[#00d4aa] hover:text-[#0f0f12] transition-all"
                           title="Quick View"
                         >
                           <EyeIcon className="w-4 h-4" />
                         </button>
                       </div>
                     </div>

                     <div className="absolute inset-0 bg-linear-to-t from-[#0f0f12] via-transparent to-transparent opacity-60" />
                   </div>
                  <div className="p-4 sm:p-6">
                    <span className="text-xs text-[#737373] font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#fafafa] mt-2 mb-3 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#737373] line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <PriceAndAccess product={product} />
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => addToCart(product, e)}
                          disabled={loadingButtons.has(product.id)}
                          className={`w-full rounded bg-linear-to-r from-[#00d4aa] to-[#8b5cf6] px-3 py-2 text-xs font-bold text-[#0f0f12] transition-all hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:py-1 ${
                            animatingButtons.has(product.id) ? 'animate-bounce' : ''
                          }`}
                        >
                          {loadingButtons.has(product.id) ? (
                            <div className="flex items-center gap-1">
                              <ArrowPathIcon className="w-3 h-3 animate-spin" />
                              Adding...
                            </div>
                          ) : (
                            'Add to Cart'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-[#fafafa] mb-4">No products found</h3>
            <p className="text-[#737373] mb-8">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange(DEFAULT_PRICE_RANGE);
              }}
              className="px-6 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] hover:border-[#00d4aa]/50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {loading && products.length > 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#2a2a30] bg-[#1a1a1f] text-[#737373]">
              <ArrowPathIcon className="w-4 h-4 animate-spin text-[#00d4aa]" />
              Loading more products...
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-card rounded-2xl sm:rounded-3xl border border-[#2a2a30] animate-fade-in">
            <div className="flex flex-col lg:flex-row">
              {/* Product Image */}
              <div className="lg:w-1/2 relative">
{quickViewProduct.thumbnail ? (
                    <img
                      src={getStorageUrl(quickViewProduct.thumbnail) || '/placeholder.png'}
                      alt={quickViewProduct.name}
                      loading="lazy"
                      decoding="async"
                     className="w-full h-64 lg:h-full object-cover"
                     onError={(e) => {
                       (e.target as HTMLImageElement).style.display = 'none';
                     }}
                   />
                 ) : (
                  <div className="w-full h-64 lg:h-full bg-linear-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
                    <span className="text-[#737373]">No Image</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-5 sm:p-8">
                <div className="flex justify-between items-start gap-3 mb-4">
                  <div>
                    <span className="text-xs text-[#00d4aa] font-medium uppercase tracking-wide">
                      {quickViewProduct.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#fafafa] mt-2">
                      {quickViewProduct.name}
                    </h2>
                  </div>
                  <button
                    onClick={closeQuickView}
                    className="p-2 text-[#737373] hover:text-[#fafafa] transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-[#737373] mb-6 leading-relaxed">
                  {quickViewProduct.description || 'No description available.'}
                </p>

                <div className="mb-6">
                  <PriceAndAccess product={quickViewProduct} />
                  <div className="mt-3 text-sm text-[#737373]">
                    {getProductKindLabel(quickViewProduct)}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={(e) => {
                      addToCart(quickViewProduct, e);
                      closeQuickView();
                    }}
                    disabled={loadingButtons.has(quickViewProduct.id)}
                    className={`flex-1 px-6 py-3 bg-linear-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                      animatingButtons.has(quickViewProduct.id) ? 'animate-bounce' : ''
                    }`}
                  >
                    {loadingButtons.has(quickViewProduct.id) ? (
                      <div className="flex items-center justify-center gap-2">
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        Adding...
                      </div>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 border border-[#2a2a30] rounded-xl hover:border-[#00d4aa] transition-all ${
                      wishlist.has(quickViewProduct.id)
                        ? 'bg-[#00d4aa] text-[#0f0f12]'
                        : 'bg-[#1a1a1f] text-[#737373] hover:text-[#00d4aa]'
                    }`}
                    title={wishlist.has(quickViewProduct.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    {wishlist.has(quickViewProduct.id) ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .gradient-text {
          background: linear-gradient(135deg, #00d4aa 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(26, 26, 31, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
