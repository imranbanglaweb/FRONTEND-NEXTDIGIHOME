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
          `${BACKEND_BASE_URL}/api/products?category=${data.category}&per_page=8`
        );
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          const filtered = (relatedData.data || []).filter(
            (p: Product) => p.id !== data.id
          );
          setRelatedProducts(filtered.slice(0, 8));
        }
      } catch (e) {
        console.error('Failed to load related products');
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
            {/* PRICE CARD */}
            <div className="bg-[#16161a] border border-[#2a2a30] rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-xl">
              {/* PRICE */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-4xl sm:text-5xl font-bold text-[#00d4aa]">
                      ৳{product.price}
                  </span>

                  {product.compare_price &&
                    product.compare_price > product.price && (
                      <>
                        <span className="text-xl sm:text-2xl text-gray-500 line-through">
                            ৳{product.compare_price}
                        </span>

                        <span className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 font-bold">
                          -{discount}%
                        </span>
                      </>
                    )}
                </div>
              </div>

              {/* STOCK */}
              <div className="mb-6 p-4 rounded-2xl bg-[#0f0f12] border border-[#2a2a30]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      product.stock > 0
                        ? 'bg-green-400'
                        : 'bg-red-400'
                    }`}
                  />

                  <span className="font-semibold">
                    {product.stock > 0
                      ? `${product.stock} In Stock`
                      : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* QUANTITY */}
              <div className="mb-6">
                <label className="block mb-3 text-sm text-gray-400">
                  Quantity
                </label>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="w-12 h-12 rounded-xl bg-[#0f0f12] border border-[#2a2a30]"
                  >
                    -
                  </button>

                  <div className="w-20 h-12 rounded-xl bg-[#0f0f12] border border-[#2a2a30] flex items-center justify-center text-xl font-bold">
                    {quantity}
                  </div>

                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(product.stock, prev + 1)
                      )
                    }
                    className="w-12 h-12 rounded-xl bg-[#0f0f12] border border-[#2a2a30]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="space-y-4">
                <button className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-black font-bold text-lg hover:opacity-90 transition">
                  Buy Now
                </button>

                <button
                  onClick={addToCart}
                  disabled={isLoadingCart}
                  className="w-full h-14 rounded-2xl border-2 border-[#00d4aa] text-[#00d4aa] font-bold text-lg hover:bg-[#00d4aa]/10 transition"
                >
                  {isLoadingCart
                    ? 'Adding...'
                    : 'Add To Cart'}
                </button>
              </div>
            </div>

            {/* DETAILS - PREMIUM ICON STYLE */}
            <div className="bg-[#16161a] border border-[#2a2a30] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center">
                  <BoltIcon className="w-5 h-5 text-black" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Product Details</h2>
              </div>

              <div className="space-y-6">
                {/* Product Type */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#2a2a30]">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-9 h-9 rounded-xl bg-[#0f0f12] border border-[#2a2a30] flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Product Type</div>
                      <div className="font-semibold text-[#fafafa] mt-0.5">
                        {product.digital ? 'Digital Product' : 'Physical Product'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#2a2a30]">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-9 h-9 rounded-xl bg-[#0f0f12] border border-[#2a2a30] flex items-center justify-center flex-shrink-0">
                      <FolderIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-semibold text-[#fafafa] mt-0.5">
                        {product.category}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#2a2a30]">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-9 h-9 rounded-xl bg-[#0f0f12] border border-[#2a2a30] flex items-center justify-center flex-shrink-0">
                      {product.digital ? (
                        <BoltIcon className="w-4 h-4" />
                      ) : (
                        <TruckIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Delivery</div>
                      <div className="font-semibold text-[#fafafa] mt-0.5">
                        {product.digital ? 'Instant Download' : 'Standard Shipping'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#2a2a30]">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-9 h-9 rounded-xl bg-[#0f0f12] border border-[#2a2a30] flex items-center justify-center flex-shrink-0">
                      <ClockIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Last Updated</div>
                      <div className="font-semibold text-[#fafafa] mt-0.5">
                        {new Date(product.updated_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-center gap-3 text-gray-400 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0f0f12] border border-[#2a2a30] flex items-center justify-center flex-shrink-0">
                        <TagIcon className="w-4 h-4" />
                      </div>
                      <div className="text-sm text-gray-500">Tags</div>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-12">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-[#0f0f12] border border-[#2a2a30] text-sm hover:border-[#00d4aa]/50 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PREVIEW */}
            {product.preview_url && (
              <a
                href={product.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full h-14 rounded-2xl border border-purple-500 text-purple-400 font-bold hover:bg-purple-500/10 transition"
              >
                Preview Product
              </a>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS CAROUSEL */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">You might also like</h2>
              <Link 
                href="/products" 
                className="text-sm text-[#00d4aa] hover:underline flex items-center gap-1"
              >
                View all products <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/products/${related.slug || related.id}`}
                    className="group flex-shrink-0 w-64 sm:w-72 bg-[#16161a] border border-[#2a2a30] rounded-2xl overflow-hidden hover:border-[#00d4aa]/40 transition-all duration-300 snap-start"
                  >
                    <div className="relative aspect-video bg-[#0f0f12]">
                      {related.thumbnail ? (
                        <img
                          src={getStorageUrl(related.thumbnail)!}
                          alt={related.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-600">
                          📦
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-[#fafafa] line-clamp-2 group-hover:text-[#00d4aa] transition-colors">
                        {related.name}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-bold text-[#00d4aa]">
                          ৳{related.price}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-[#0f0f12] border border-[#2a2a30] text-gray-400">
                          {related.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}