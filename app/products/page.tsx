'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, ArrowDownTrayIcon, StarIcon, ArrowPathIcon, AdjustmentsHorizontalIcon, HeartIcon, EyeIcon, XMarkIcon, BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Swal from 'sweetalert2';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  thumbnail: string | null;
  featured: boolean;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({min: 0, max: 1000});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [animatingButtons, setAnimatingButtons] = useState<Set<number>>(new Set());
  const [loadingButtons, setLoadingButtons] = useState<Set<number>>(new Set());
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showQuickView, setShowQuickView] = useState<boolean>(false);

  const fetchProducts = useCallback(async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/products?page=${page}&per_page=100`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      if (page === 1) {
        setProducts(data.data);
      } else {
        setProducts(prev => [...prev, ...data.data]);
      }

      setHasMore(data.current_page < data.last_page);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

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

    // Set loading state
    setLoadingButtons(prev => new Set(prev).add(product.id));

    // Trigger animation
    setAnimatingButtons(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAnimatingButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 600); // Match animation duration

    try {

    try {
      const response = await fetch('http://localhost:8000/api/cart', {
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
    } finally {
      // Clear loading state
      setLoadingButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const availableCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const categories = ['all', ...availableCategories];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                            product.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'featured':
          comparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [products, selectedCategory, debouncedSearchQuery, priceRange, sortBy, sortOrder]);

  const featuredProducts = filteredProducts.filter(p => p.featured);
  const regularProducts = filteredProducts.filter(p => !p.featured);

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
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00d4aa]/10 via-transparent to-[#8b5cf6]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,170,0.15)_0%,rgba(8,8,8,0)_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2a2a30] bg-[#1a1a1f]/50 mb-6">
              <StarIcon className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-sm text-[#737373]">Premium Collection</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Digital Products
            </h1>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Curated selection of premium digital assets for local and international markets
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Filter Bar */}
      <div className="sticky top-0 z-40 bg-[#0f0f12]/95 backdrop-blur-xl border-b border-[#2a2a30]">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          {/* Main Filter Row */}
          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#737373]" />
              <input
                type="text"
                placeholder="Search products..."
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
            <div className="flex items-center gap-3 flex-wrap">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#1a1a1f] border border-[#2a2a30] rounded-lg px-3 py-2 text-[#fafafa] text-sm focus:outline-none focus:border-[#00d4aa] appearance-none pr-8"
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
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({...prev, max: Number(e.target.value) || 1000}))}
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
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                      setPriceRange({min: 0, max: 1000});
                      setSortBy('featured');
                      setSortOrder('desc');
                    }}
                    className="px-4 py-2 bg-[#2a2a30] text-[#737373] rounded-lg hover:bg-[#3a3a40] hover:text-[#fafafa] transition-all text-sm"
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
       <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#fafafa]">
              {filteredProducts.length} {selectedCategory === 'all' ? 'Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
            </h2>
            <p className="text-[#737373]">
              {featuredProducts.length} featured {selectedCategory === 'all' ? '' : selectedCategory}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#737373]">
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
               {featuredProducts.slice(0, 6).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group glass-card rounded-2xl overflow-hidden border border-[#2a2a30] hover:border-[#00d4aa]/50 transition-all duration-300 animate-fade-in-up"
                >
                   <div className="relative aspect-video overflow-hidden">
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail.startsWith('http') ? product.thumbnail : `http://localhost:8000/storage/${product.thumbnail}`}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                       <div className="w-full h-full bg-gradient-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
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
                         <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12]">
                           Featured
                         </span>
                       </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-60" />
                   </div>
                  <div className="p-6">
                    <span className="text-xs text-[#00d4aa] font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#fafafa] mt-2 mb-3 line-clamp-1">
                      {product.name}
                    </h3>
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
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => addToCart(product, e)}
                            disabled={loadingButtons.has(product.id)}
                            className={`px-3 py-1 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] text-xs font-bold rounded hover:shadow-lg hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
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
        {regularProducts.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-[#fafafa] mb-6">
              All Products
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
               {regularProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group glass-card rounded-2xl overflow-hidden border border-[#2a2a30] hover:border-[#00d4aa]/50 transition-all duration-300 animate-fade-in-up"
                >
                   <div className="relative aspect-video overflow-hidden">
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail.startsWith('http') ? product.thumbnail : `http://localhost:8000/storage/${product.thumbnail}`}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                       <div className="w-full h-full bg-gradient-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
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

                     <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent opacity-60" />
                   </div>
                  <div className="p-6">
                    <span className="text-xs text-[#737373] font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#fafafa] mt-2 mb-3 line-clamp-1">
                      {product.name}
                    </h3>
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
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => addToCart(product, e)}
                          disabled={loadingButtons.has(product.id)}
                          className={`px-3 py-1 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] text-xs font-bold rounded hover:shadow-lg hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
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
              }}
              className="px-6 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] hover:border-[#00d4aa]/50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center py-12">
            <button
              onClick={loadMore}
              disabled={loading}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-2">
                {loading ? 'Loading...' : 'Load More Products'}
                <ArrowDownTrayIcon className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden glass-card rounded-3xl border border-[#2a2a30] animate-fade-in">
            <div className="flex flex-col lg:flex-row">
              {/* Product Image */}
              <div className="lg:w-1/2 relative">
                {quickViewProduct.thumbnail ? (
                  <img
                    src={quickViewProduct.thumbnail}
                    alt={quickViewProduct.name}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 lg:h-full bg-gradient-to-br from-[#1a1a1f] to-[#2a2a30] flex items-center justify-center">
                    <span className="text-[#737373]">No Image</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-[#00d4aa] font-medium uppercase tracking-wide">
                      {quickViewProduct.category}
                    </span>
                    <h2 className="text-2xl font-bold text-[#fafafa] mt-2">
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

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-[#00d4aa]">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.compare_price && quickViewProduct.compare_price > quickViewProduct.price && (
                    <span className="text-lg text-[#737373] line-through">
                      ${quickViewProduct.compare_price}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      addToCart(quickViewProduct, e);
                      closeQuickView();
                    }}
                    disabled={loadingButtons.has(quickViewProduct.id)}
                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
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