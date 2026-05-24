'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  StarIcon,
  CheckIcon,
  TagIcon,
  FolderIcon,
  ClockIcon,
  BoltIcon,
  TruckIcon,
  ArrowRightIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import { getStorageUrl, BACKEND_BASE_URL } from '../../utils/api';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  detailed_description: string | null;
  price: number;
  compare_price: number | null;
  stock: number;
  digital: boolean;
  file_url: string | null;
  preview_url: string | null;
  category: string;
  tags: string[] | null;
  thumbnail: string | null;
  images: string[] | null;
  featured: boolean;
  active: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // =========================
  // FETCH PRODUCT
  // =========================
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(
         `${BACKEND_BASE_URL}/api/products/${params.id}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Product not found');
      }

      const data = await response.json();

      setProduct(data);

      // Fetch related products (same category, exclude current)
      try {
        const relatedRes = await fetch(
          `${BACKEND_BASE_URL}/api/products?category=${encodeURIComponent(data.category)}&per_page=12`
        );
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          const all = relatedData.data || relatedData || [];
          const filtered = all.filter((p: Product) => p.id !== data.id);
          setRelatedProducts(filtered.slice(0, 8));
        }
      } catch (e) {
        console.error('Failed to load related products');
        // Fallback: show some other products if category filter fails
        try {
          const fallbackRes = await fetch(`${BACKEND_BASE_URL}/api/products?per_page=8`);
          if (fallbackRes.ok) {
            const fbData = await fallbackRes.json();
            const all = fbData.data || fbData || [];
            const filtered = all.filter((p: Product) => p.id !== data.id);
            setRelatedProducts(filtered.slice(0, 8));
          }
        } catch {}
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // =========================
  // IMAGES
  // =========================
  const images = useMemo(() => {
    if (!product) return [];

    let productImages = [];

    if (Array.isArray(product.images)) {
      productImages = product.images.filter(Boolean);
    } else if (typeof product.images === 'string') {
      try {
        // Handle legacy double-encoded JSON strings
        const parsed = JSON.parse(product.images);
        productImages = Array.isArray(parsed) ? parsed.filter(Boolean) : [];
      } catch (e) {
        console.error('Failed to parse images:', e);
      }
    }

    if (productImages.length > 0) {
      return productImages;
    }

    if (product.thumbnail) {
      return [getStorageUrl(product.thumbnail)!];
    }

    return [];
  }, [product]);

  const totalImages = images.length;

  // =========================
  // AUTO SLIDER
  // =========================
  useEffect(() => {
    if (!isPlaying || totalImages <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === totalImages - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, totalImages]);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === totalImages - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalImages - 1 : prev - 1
    );
  };

  // =========================
  // DISCOUNT
  // =========================
  const discount =
    product?.compare_price && product.compare_price > product.price
      ? Math.round(
          ((product.compare_price - product.price) /
            product.compare_price) *
            100
        )
      : 0;

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async () => {
    if (!product) return;

    try {
      setIsLoadingCart(true);

      const response = await fetch(
         `${BACKEND_BASE_URL}/api/cart`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            product_id: product.id,
            quantity,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: 'Added to Cart',
          text: `${product.name} added successfully`,
          icon: 'success',
          background: '#111',
          color: '#fff',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to add cart',
        icon: 'error',
        background: '#111',
        color: '#fff',
      });
    } finally {
      setIsLoadingCart(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">
            Product Not Found
          </h1>

          <p className="text-gray-400 mb-6">{error}</p>

          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-[#00d4aa] text-black font-bold"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-[#0f0f12] text-white">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-[#0f0f12]/95 backdrop-blur border-b border-[#2a2a30]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-[#00d4aa] transition"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>

          <div className="hidden md:flex items-center gap-3 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">
              Home
            </Link>

            <span>/</span>

            <Link
              href="/products"
              className="text-gray-400 hover:text-white"
            >
              Products
            </Link>

            <span>/</span>

            <span className="text-white truncate max-w-[200px]">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-10">
        {/* TITLE */}
        <div className="mb-8 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-4 py-2 rounded-full bg-[#00d4aa]/20 text-[#00d4aa] border border-[#00d4aa]/30 text-sm">
              {product.category}
            </span>

            {product.featured && (
              <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 flex items-center gap-2 text-sm">
                <StarIcon className="w-4 h-4" />
                Featured
              </span>
            )}

            {product.digital && (
              <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-2 text-sm">
                <CheckIcon className="w-4 h-4" />
                Digital Product
              </span>
            )}
          </div>

       
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* IMAGE SECTION */}
          <div className="lg:col-span-6 w-full">
            <div className="sticky top-20 sm:top-24 space-y-3 sm:space-y-4">
              {/* MAIN IMAGE */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[#2a2a30] bg-[#16161a] w-full shadow-2xl">
                {images.length > 0 ? (
                  <>
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
                    >
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="min-w-full flex-shrink-0"
                        >
                           <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/9] overflow-hidden bg-[#0f0f12]">
                              <img
                                src={getStorageUrl(image)!}
                               alt={`${product.name}-${index}`}
                               className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                               loading={index === 0 ? "eager" : "lazy"}
                             />
                             {/* Image overlay indicator */}
                             <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 bg-black/70 backdrop-blur-xl px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm text-white font-semibold border border-[#00d4aa]/40 shadow-lg">
                               <span className="text-[#00d4aa] font-bold">{index + 1}</span>
                               <span className="mx-1 text-white/70">/</span>
                               <span className="text-white/90">{totalImages}</span>
                             </div>
                           </div>
                        </div>
                      ))}
                    </div>

                     {/* PREV */}
                     <button
                       onClick={prevImage}
                       className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:scale-110 transition-all duration-200 z-20 shadow-lg"
                     >
                       <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                       </svg>
                     </button>

                     {/* NEXT */}
                     <button
                       onClick={nextImage}
                       className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:scale-110 transition-all duration-200 z-20 shadow-lg"
                     >
                       <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                       </svg>
                     </button>

                     {/* DOTS */}
                     <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-black/60 backdrop-blur-md z-20 border border-white/10">
                       {images.map((_, index) => (
                         <button
                           key={index}
                           onClick={() => setCurrentIndex(index)}
                           className={`rounded-full transition-all duration-300 hover:scale-125 ${
                             currentIndex === index
                               ? 'bg-[#00d4aa] w-5 h-2 sm:w-7 sm:h-2.5 shadow-lg shadow-[#00d4aa]/50'
                               : 'bg-white/50 hover:bg-white/80 w-2 h-2 sm:w-2.5 sm:h-2.5'
                           }`}
                         />
                       ))}
                     </div>
                  </>
                ) : (
                  <div className="aspect-square flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="w-full">
                  <div className="flex justify-center">
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 max-w-2xl">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`relative overflow-hidden rounded-lg sm:rounded-xl border-2 transition-all duration-300 aspect-square group ${
                            currentIndex === index
                              ? 'border-[#00d4aa] ring-2 ring-[#00d4aa]/40 shadow-lg shadow-[#00d4aa]/20'
                              : 'border-[#2a2a30] hover:border-[#00d4aa]/60 hover:shadow-md'
                          }`}
                        >
                          <img
                            src={getStorageUrl(image)!}
                            alt={`thumb-${index}`}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                            loading="lazy"
                          />
                          {currentIndex === index && (
                            <div className="absolute inset-0 bg-[#00d4aa]/25 backdrop-blur-[1px] flex items-center justify-center">
                              <div className="w-3 h-3 bg-[#00d4aa] rounded-full animate-pulse shadow-lg"></div>
                            </div>
                          )}
                          {/* Image index indicator */}
                          <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {index + 1}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            {/* PREMIUM PRICE CARD */}
            <div className="relative bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-7 md:p-8 shadow-2xl overflow-hidden">
              {/* GRADIENT BACKGROUND ACCENT */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#00d4aa]/10 to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10">
                {/* PRICE SECTION */}
                <div className="mb-8">
                  <div className="flex flex-wrap items-end gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Price</p>
                      <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] bg-clip-text text-transparent">
                        ৳{product.price}
                      </span>
                    </div>

                    {product.compare_price &&
                      product.compare_price > product.price && (
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-lg sm:text-xl text-gray-500 line-through">
                            ৳{product.compare_price}
                          </span>
                          <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600/30 to-red-500/20 text-red-300 border border-red-500/40 font-bold text-sm shadow-lg">
                            Save {discount}%
                          </span>
                        </div>
                      )}
                  </div>
                </div>

                {/* STOCK INDICATOR - ENHANCED */}
                <div className="mb-8 p-5 rounded-2xl bg-[#0f0f12]/60 backdrop-blur border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full shadow-lg ${
                          product.stock > 0
                            ? 'bg-green-400'
                            : 'bg-red-400'
                        }`}
                      />
                      <span className="font-semibold text-[#fafafa]">
                        {product.stock > 0
                          ? `${product.stock} Items Available`
                          : 'Out of Stock'}
                      </span>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      product.stock > 10 ? 'bg-green-500/20 text-green-300' : product.stock > 0 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Unavailable'}
                    </span>
                  </div>
                  {/* STOCK PROGRESS BAR */}
                  <div className="w-full bg-[#1a1a1f] rounded-full h-2 overflow-hidden border border-[#2a2a30]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        product.stock > 10 
                          ? 'bg-gradient-to-r from-green-500 to-green-400' 
                          : product.stock > 0 
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                          : 'bg-gradient-to-r from-red-500 to-red-400'
                      }`}
                      style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* QUANTITY SELECTOR - PREMIUM */}
                <div className="mb-8">
                  <label className="block mb-4 text-sm font-semibold text-[#fafafa]">
                    Quantity
                  </label>

                  <div className="flex items-center gap-2 bg-[#0f0f12]/60 backdrop-blur rounded-2xl p-1 border border-[#2a2a30] w-fit">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="w-12 h-12 rounded-xl hover:bg-[#00d4aa]/20 text-[#00d4aa] font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                      </svg>
                    </button>

                    <div className="w-16 h-12 flex items-center justify-center text-2xl font-bold text-[#fafafa] bg-[#1a1a1f] rounded-xl border border-[#2a2a30]">
                      {quantity}
                    </div>

                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(product.stock, prev + 1)
                        )
                      }
                      className="w-12 h-12 rounded-xl hover:bg-[#00d4aa]/20 text-[#00d4aa] font-bold transition-all duration-200 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ACTION BUTTONS - PREMIUM */}
                <div className="space-y-3 mb-8">
                  <button 
                    disabled={product.stock === 0}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#00d4aa] to-[#00b88e] text-black font-bold text-lg hover:shadow-lg hover:shadow-[#00d4aa]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Buy Now
                  </button>

                  <button
                    onClick={addToCart}
                    disabled={isLoadingCart || product.stock === 0}
                    className="w-full h-14 rounded-2xl border-2 border-[#00d4aa] text-[#00d4aa] font-bold text-lg hover:bg-[#00d4aa]/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    {isLoadingCart
                      ? 'Adding to Cart...'
                      : 'Add To Cart'}
                  </button>

                  <button className="w-full h-12 rounded-2xl border border-[#2a2a30] text-gray-300 font-semibold hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/5 transition-all duration-300 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Wishlist
                  </button>
                </div>

                {/* TRUST BADGES */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f12]/60 backdrop-blur border border-[#2a2a30] hover:border-green-500/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-300">Verified Seller</div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f12]/60 backdrop-blur border border-[#2a2a30] hover:border-blue-500/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-300">Secure Payment</div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f12]/60 backdrop-blur border border-[#2a2a30] hover:border-purple-500/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-300">Easy Return</div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0f0f12]/60 backdrop-blur border border-[#2a2a30] hover:border-yellow-500/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-300">Quality Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILS - PREMIUM SECTION */}
            <div className="bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center">
                  <BoltIcon className="w-5 h-5 text-black" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Product Details</h2>
              </div>

              <div className="space-y-5">
                {/* Product Type */}
                <div className="flex items-start gap-4 pb-5 border-b border-[#2a2a30] hover:border-[#00d4aa]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4aa]/20 to-[#8b5cf6]/20 border border-[#00d4aa]/30 flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Product Type</div>
                    <div className="font-semibold text-[#fafafa] mt-1.5 text-sm">
                      {product.digital ? '🔹 Digital Product' : '📦 Physical Product'}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-4 pb-5 border-b border-[#2a2a30] hover:border-[#00d4aa]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-[#8b5cf6]/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <FolderIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Category</div>
                    <div className="font-semibold text-[#fafafa] mt-1.5 text-sm">
                      {product.category}
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex items-start gap-4 pb-5 border-b border-[#2a2a30] hover:border-[#00d4aa]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-[#00d4aa]/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    {product.digital ? (
                      <BoltIcon className="w-5 h-5 text-green-400" />
                    ) : (
                      <TruckIcon className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Delivery & Shipping</div>
                    <div className="font-semibold text-[#fafafa] mt-1.5 text-sm">
                      {product.digital ? '⚡ Instant Download' : '🚚 Standard Shipping (3-5 days)'}
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-start gap-4 pb-5 border-b border-[#2a2a30] hover:border-[#00d4aa]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-[#8b5cf6]/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Last Updated</div>
                    <div className="font-semibold text-[#fafafa] mt-1.5 text-sm">
                      {new Date(product.updated_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-4 pb-0 hover:border-[#00d4aa]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4aa]/20 to-green-500/20 border border-[#00d4aa]/30 flex items-center justify-center flex-shrink-0">
                    <StarIcon className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Availability</div>
                    <div className="font-semibold text-[#fafafa] mt-1.5 text-sm flex items-center gap-2">
                      {product.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
                          ⭐ Featured
                        </span>
                      )}
                      {product.active ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold">
                          ✓ Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-400 text-xs font-bold">
                          ✗ Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="pt-5 border-t border-[#2a2a30]">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00d4aa]/10 to-[#8b5cf6]/10 border border-[#00d4aa]/30 text-sm text-[#00d4aa] font-semibold hover:border-[#00d4aa]/60 hover:bg-[#00d4aa]/20 transition-all cursor-pointer"
                        >
                          <span>#</span>{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PREVIEW SECTION (keep in sidebar) */}
            {product.preview_url && (
              <a
                href={product.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full h-14 rounded-2xl border-2 border-purple-500 text-purple-400 font-bold hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview Product
              </a>
            )}
          </div>
        </div>

        {/* FULL WIDTH DESCRIPTION - Moved to bottom single column as requested */}
        {product.detailed_description && (
          <div className="max-w-7xl mx-auto px-4 mt-10">
            <div className="bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-3xl p-8 sm:p-10 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#00d4aa]/20 border border-[#8b5cf6]/30 flex items-center justify-center">
                  <DocumentTextIcon className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">About This Product</h2>
              </div>

              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-base">
                <p className="whitespace-pre-wrap text-[#c8c8c8]">
                  {product.detailed_description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOMER REVIEWS SECTION */}
        <div className="mt-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Customer Reviews</h2>
            <p className="text-gray-400 text-sm">See what our customers think about this product</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* REVIEW SUMMARY */}
            <div className="bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-2xl p-8 flex flex-col items-center justify-center">
              <div className="text-6xl font-bold text-[#00d4aa] mb-3">4.8</div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-400 text-sm text-center">Based on 128 customer reviews</p>
              <button className="mt-6 w-full py-2.5 rounded-lg bg-[#00d4aa]/10 border border-[#00d4aa]/40 text-[#00d4aa] font-semibold text-sm hover:bg-[#00d4aa]/20 transition-all">
                Write a Review
              </button>
            </div>

            {/* REVIEWS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {/* REVIEW ITEM 1 */}
              <div className="bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-xl p-5 hover:border-[#00d4aa]/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-white mb-1">Excellent Quality!</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">5 days ago</span>
                </div>
                <p className="text-sm text-gray-400">The product exceeded my expectations! Great packaging and fast delivery. Highly recommend!</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <button className="hover:text-[#00d4aa] transition">👍 Helpful (12)</button>
                  <button className="hover:text-[#00d4aa] transition">👎 Not helpful</button>
                </div>
              </div>

              {/* REVIEW ITEM 2 */}
              <div className="bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-xl p-5 hover:border-[#00d4aa]/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-white mb-1">Worth Every Taka</div>
                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                        </svg>
                      ))}
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">2 weeks ago</span>
                </div>
                <p className="text-sm text-gray-400">Amazing product! Very satisfied with the quality and customer service. Will definitely buy again.</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <button className="hover:text-[#00d4aa] transition">👍 Helpful (8)</button>
                  <button className="hover:text-[#00d4aa] transition">👎 Not helpful</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* FREE SHIPPING */}
          <div className="bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-xl p-6 hover:border-green-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 6V3L8 8l5 5v-3c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-3.9-3.1-7-7-7zm0 5v2.07C9.67 13.23 7.42 11.17 7.42 8.5c0-1.47.78-2.74 1.93-3.45L13 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-400">On orders over ৳500. Fast & reliable delivery to your doorstep.</p>
          </div>

          {/* EASY RETURNS */}
          <div className="bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-xl p-6 hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Easy Returns</h3>
            <p className="text-sm text-gray-400">30-day return window. No questions asked return policy.</p>
          </div>

          {/* SECURE PAYMENT */}
          <div className="bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-xl p-6 hover:border-purple-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Secure</h3>
            <p className="text-sm text-gray-400">Your payment information is encrypted and secure.</p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="mt-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-sm">Common questions about this product</p>
          </div>

          <div className="space-y-3 sm:space-y-4 bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-2xl p-6 sm:p-8">
            {/* FAQ ITEM 1 */}
            <details className="group border-b border-[#2a2a30] last:border-0 pb-4 last:pb-0 cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-white hover:text-[#00d4aa] transition-colors py-2">
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00d4aa]/20 border border-[#00d4aa]/40 text-[#00d4aa] text-xs font-bold flex items-center justify-center group-open:bg-[#00d4aa] group-open:text-black transition-all">
                    +
                  </span>
                  What is your return policy?
                </span>
                <svg className="w-5 h-5 text-[#00d4aa] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-gray-400 text-sm ml-9 mt-3">We offer a 30-day return window. If you're not satisfied with your purchase, you can return it for a full refund or exchange.</p>
            </details>

            {/* FAQ ITEM 2 */}
            <details className="group border-b border-[#2a2a30] last:border-0 pb-4 last:pb-0 cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-white hover:text-[#00d4aa] transition-colors py-2">
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00d4aa]/20 border border-[#00d4aa]/40 text-[#00d4aa] text-xs font-bold flex items-center justify-center group-open:bg-[#00d4aa] group-open:text-black transition-all">
                    +
                  </span>
                  How long does shipping take?
                </span>
                <svg className="w-5 h-5 text-[#00d4aa] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-gray-400 text-sm ml-9 mt-3">Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for faster delivery.</p>
            </details>

            {/* FAQ ITEM 3 */}
            <details className="group border-b border-[#2a2a30] last:border-0 pb-4 last:pb-0 cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-white hover:text-[#00d4aa] transition-colors py-2">
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00d4aa]/20 border border-[#00d4aa]/40 text-[#00d4aa] text-xs font-bold flex items-center justify-center group-open:bg-[#00d4aa] group-open:text-black transition-all">
                    +
                  </span>
                  Is this product authentic?
                </span>
                <svg className="w-5 h-5 text-[#00d4aa] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-gray-400 text-sm ml-9 mt-3">Yes! All products are 100% authentic and sourced directly from authorized distributors. We guarantee authenticity or your money back.</p>
            </details>

            {/* FAQ ITEM 4 */}
            <details className="group border-b border-[#2a2a30] last:border-0 pb-4 last:pb-0 cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-white hover:text-[#00d4aa] transition-colors py-2">
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#00d4aa]/20 border border-[#00d4aa]/40 text-[#00d4aa] text-xs font-bold flex items-center justify-center group-open:bg-[#00d4aa] group-open:text-black transition-all">
                    +
                  </span>
                  Do you offer warranty?
                </span>
                <svg className="w-5 h-5 text-[#00d4aa] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </summary>
              <p className="text-gray-400 text-sm ml-9 mt-3">Yes! All products come with manufacturer warranty. Details vary by product type. Check the product documentation for specific warranty information.</p>
            </details>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">You Might Also Like</h2>
              <p className="text-gray-400 text-sm">Discover similar products from our collection</p>
            </div>
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/40 text-[#00d4aa] font-semibold hover:bg-[#00d4aa]/20 hover:border-[#00d4aa]/60 transition-all duration-300"
            >
              View All Products
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="relative">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/products/${related.slug || related.id}`}
                    className="group flex-shrink-0 w-80 sm:w-96 bg-gradient-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-2xl overflow-hidden hover:border-[#00d4aa]/60 transition-all duration-300 snap-start shadow-lg hover:shadow-2xl hover:shadow-[#00d4aa]/10"
                  >
                    {/* IMAGE SECTION */}
                    <div className="relative aspect-video bg-[#0f0f12] overflow-hidden">
                      {related.thumbnail ? (
                        <>
                          <img
                            src={getStorageUrl(related.thumbnail)!}
                            alt={related.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* GRADIENT OVERLAY */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-600">
                          📦
                        </div>
                      )}
                      
                      {/* BADGE */}
                      {related.featured && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-bold">
                          ⭐ Featured
                        </div>
                      )}
                    </div>

                    {/* CONTENT SECTION */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* CATEGORY & TITLE */}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#00d4aa] opacity-80">
                          {related.category}
                        </span>
                        <h3 className="font-bold text-[#fafafa] line-clamp-2 group-hover:text-[#00d4aa] transition-colors mt-1.5 text-sm sm:text-base">
                          {related.name}
                        </h3>
                      </div>

                      {/* PRICE & STOCK */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#2a2a30]">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl sm:text-2xl font-bold text-[#00d4aa]">
                            ৳{related.price}
                          </span>
                        </div>
                        <div className={`text-xs font-bold px-2.5 py-1.5 rounded-full ${
                          related.stock > 0 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                          {related.stock > 0 ? `${related.stock} Left` : 'Out of Stock'}
                        </div>
                      </div>

                      {/* CTA BUTTON */}
                      <button className="w-full py-2.5 rounded-lg bg-[#00d4aa]/10 border border-[#00d4aa]/40 text-[#00d4aa] font-semibold text-sm hover:bg-[#00d4aa]/20 hover:border-[#00d4aa]/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#00d4aa]/10">
                        View Details
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-[#16161a] rounded-2xl border border-[#2a2a30]">
              <p className="text-gray-400 text-sm">No related products found yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}