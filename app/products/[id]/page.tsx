'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  StarIcon,
  CheckIcon,
  FolderIcon,
  ClockIcon,
  BoltIcon,
  TruckIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PlayCircleIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import { getStorageUrl, apiFetch } from '../../utils/api';

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];

const getProductAssetUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;

  const cleanPath = path.trim();
  if (!cleanPath) return null;

  if (/^www\./i.test(cleanPath)) {
    return `https://${cleanPath}`;
  }

  if (
    cleanPath.startsWith('http') ||
    cleanPath.startsWith('//') ||
    cleanPath.startsWith('/') ||
    cleanPath.startsWith('#') ||
    cleanPath.startsWith('mailto:') ||
    cleanPath.startsWith('tel:')
  ) {
    return cleanPath;
  }

  return getStorageUrl(cleanPath);
};

const isVideoAsset = (path: string | null | undefined): boolean => {
  if (!path) return false;
  const cleanPath = path.split('?')[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((extension) => cleanPath.endsWith(extension));
};

const decodeBasicHtmlEntities = (content: string): string => {
  return content
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ');
};

const escapeHtml = (content: string): string => {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const renderCkEditorContent = (content: string): string => {
  const decoded = decodeBasicHtmlEntities(content).trim();
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(decoded);

  if (!hasHtml) {
    return decoded
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`)
      .join('');
  }

  return decoded
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*[^\s>]+/gi, '')
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, '')
    .replace(/\s(href|src)\s*=\s*javascript:[^\s>]*/gi, '');
};

const parseStringArray = (value: string[] | string | null | undefined): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  }

  if (typeof value !== 'string' || !value.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return parseStringArray(parsed);
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const formatPrice = (price: number): string => `৳${Number(price || 0).toLocaleString('en-BD')}`;

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
  tags: string[] | string | null;
  thumbnail: string | null;
  images: string[] | string | null;
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
  const [isPlaying] = useState<boolean>(true);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // =========================
  // FETCH PRODUCT
  // =========================
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);

      const data = await apiFetch(`products/${params.id}`, {
        credentials: 'include',
      });

      const currentProduct = data.data || data;
      setProduct(currentProduct);
      setQuantity(1);
      setCurrentIndex(0);

      // Fetch related products (same category, exclude current)
      try {
        const relatedData = await apiFetch(`products?category=${encodeURIComponent(currentProduct.category)}&per_page=12`);
        const all = relatedData.data || relatedData || [];
        const filtered = all.filter((p: Product) => p.id !== currentProduct.id);
        setRelatedProducts(filtered.slice(0, 8));
      } catch {
        console.error('Failed to load related products');
        // Fallback: show some other products if category filter fails
        try {
          const fbData = await apiFetch(`/products?per_page=8`);
          const all = fbData.data || fbData || [];
          const filtered = all.filter((p: Product) => p.id !== currentProduct.id);
          setRelatedProducts(filtered.slice(0, 8));
        } catch {}
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProduct();
  }, [fetchProduct]);

  // =========================
  // IMAGES
  // =========================
  const images = useMemo(() => {
    if (!product) return [];

    const productImages = parseStringArray(product.images)
      .map(getProductAssetUrl)
      .filter((image): image is string => Boolean(image));
      
    if (productImages.length > 0) {
      return productImages;
    }

    const thumbnailUrl = getProductAssetUrl(product.thumbnail);
    if (thumbnailUrl) return [thumbnailUrl];

    return [];
  }, [product]);

  const tags = useMemo(() => parseStringArray(product?.tags), [product?.tags]);
  const totalImages = images.length;
  const previewUrl = getProductAssetUrl(product?.preview_url);
  const fileUrl = getProductAssetUrl(product?.file_url);
  const videoUrl = isVideoAsset(product?.preview_url)
    ? previewUrl
    : isVideoAsset(product?.file_url)
      ? fileUrl
      : null;
  const productDescriptionContent = product?.detailed_description || product?.description || '';

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

      const data = await apiFetch('/cart', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify({
           product_id: product.id,
           quantity: quantity,
         }),
      });

      if (data.success) {
         // Trigger cart count update
         window.dispatchEvent(new Event('cartUpdated'));
         
         Swal.fire({
           title: 'Added to Cart',
           text: `${product.name} added successfully`,
           icon: 'success',
           background: '#111',
           color: '#fff',
         });
       }
    } catch {
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
        <div className="mx-auto flex h-16 w-full max-w-[1800px] items-center justify-between px-4 sm:px-6 lg:px-8 2xl:px-10">
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
      <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10 2xl:px-10">
        {/* TITLE */}
        <div className="mb-7 rounded-2xl border border-[#2a2a30]/80 bg-[#141418]/70 px-4 py-5 shadow-2xl shadow-black/20 sm:px-6 lg:px-7">
          <h1 className="max-w-6xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <span className="rounded-lg border border-[#00d4aa]/30 bg-[#00d4aa]/10 px-3 py-1.5 text-xs font-semibold text-[#00d4aa]">
              {product.category}
            </span>

            {product.featured && (
              <span className="flex items-center gap-1.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-300">
                <StarIcon className="w-4 h-4" />
                Featured
              </span>
            )}

            {product.digital && (
              <span className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300">
                <CheckIcon className="w-4 h-4" />
                Digital Product
              </span>
            )}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12 xl:gap-8 2xl:gap-10">
          {/* IMAGE SECTION */}
          <div className="w-full xl:col-span-7">
            <div className="sticky top-20 space-y-4">
              {/* MAIN IMAGE */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-[#2a2a30] bg-[#16161a] shadow-2xl shadow-black/30">
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
                           <div className="relative w-full aspect-square overflow-hidden bg-[#0f0f12] sm:aspect-[4/3] xl:aspect-[16/9]">
                              <Image
                                src={image}
                               alt={`${product.name}-${index}`}
                               className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                               fill
                               priority={index === 0}
                               sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 55vw, 100vw"
                             />
                             {/* Image overlay indicator */}
                             <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-xl px-3 py-1.5 rounded-lg text-xs text-white font-semibold border border-white/10 shadow-lg">
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
                       className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/90 transition-all duration-200 z-20 shadow-lg"
                     >
                       <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                       </svg>
                     </button>

                     {/* NEXT */}
                     <button
                       onClick={nextImage}
                       className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-black/90 transition-all duration-200 z-20 shadow-lg"
                     >
                       <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                       </svg>
                     </button>

                     {/* DOTS */}
                     <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/55 backdrop-blur-md z-20 border border-white/10">
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
                          <Image
                            src={image}
                            alt={`thumb-${index}`}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                            fill
                            sizes="(min-width: 1280px) 8vw, (min-width: 640px) 16vw, 25vw"
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

              {videoUrl && (
                <section className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#2a2a30] bg-linear-to-br from-[#16161a] to-[#1a1a1f] shadow-xl">
                  <div className="flex items-center justify-between gap-3 border-b border-[#2a2a30] px-4 py-3 sm:px-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#00d4aa]/30 bg-[#00d4aa]/15">
                        <VideoCameraIcon className="h-5 w-5 text-[#00d4aa]" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-bold text-white sm:text-lg">
                          Product Video
                        </h2>
                        <p className="text-xs text-gray-400">
                          Watch the preview before purchase
                        </p>
                      </div>
                    </div>

                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#2a2a30] text-gray-300 transition hover:border-[#00d4aa]/50 hover:text-[#00d4aa]"
                      title="Open video in new tab"
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </a>
                  </div>

                  <div className="relative aspect-video bg-black">
                    <video
                      src={videoUrl}
                      controls
                      preload="metadata"
                      playsInline
                      className="absolute inset-0 h-full w-full bg-black object-contain"
                      poster={images[0]}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="space-y-4 xl:col-span-5">
            {/* PREMIUM PRICE CARD */}
            <div className="relative overflow-hidden rounded-2xl border border-[#2a2a30] bg-[#16161a] p-5 shadow-2xl shadow-black/25 sm:p-6">
              {/* GRADIENT BACKGROUND ACCENT */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-[#00d4aa]/10 to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10">
                {/* PRICE SECTION */}
                <div className="mb-5">
                  <div className="flex flex-wrap items-end gap-4">
                    <div>
                      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">Price</p>
                      <span className="bg-linear-to-r from-[#00d4aa] to-[#8b5cf6] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {product.compare_price &&
                      product.compare_price > product.price && (
                        <div className="flex flex-col items-start gap-1.5 sm:items-end">
                          <span className="text-base text-gray-500 line-through">
                            {formatPrice(product.compare_price)}
                          </span>
                          <span className="rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-300">
                            Save {discount}%
                          </span>
                        </div>
                      )}
                  </div>
                </div>

                {/* STOCK INDICATOR - ENHANCED */}
                <div className="mb-5 rounded-xl border border-[#2a2a30] bg-[#0f0f12]/55 p-4 backdrop-blur">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full shadow-lg ${
                          product.stock > 0
                            ? 'bg-green-400'
                            : 'bg-red-400'
                        }`}
                      />
                      <span className="text-sm font-semibold text-[#fafafa]">
                        {product.stock > 0
                          ? `${product.stock} Items Available`
                          : 'Out of Stock'}
                      </span>
                    </div>
                    <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
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
                          ? 'bg-linear-to-r from-green-500 to-green-400' 
                          : product.stock > 0 
                          ? 'bg-linear-to-r from-yellow-500 to-yellow-400'
                          : 'bg-linear-to-r from-red-500 to-red-400'
                      }`}
                      style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* QUANTITY SELECTOR - PREMIUM */}
                <div className="mb-5">
                  <label className="mb-2.5 block text-sm font-semibold text-[#fafafa]">
                    Quantity
                  </label>

                  <div className="flex w-fit items-center gap-1 rounded-xl border border-[#2a2a30] bg-[#0f0f12]/60 p-1 backdrop-blur">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-[#00d4aa] transition-all duration-200 hover:bg-[#00d4aa]/15"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                      </svg>
                    </button>

                    <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-[#2a2a30] bg-[#1a1a1f] text-lg font-bold text-[#fafafa]">
                      {quantity}
                    </div>

                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(product.stock, prev + 1)
                        )
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-[#00d4aa] transition-all duration-200 hover:bg-[#00d4aa]/15"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ACTION BUTTONS - PREMIUM */}
                <div className="mb-5 space-y-2.5">
                  <button 
                    disabled={product.stock === 0}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#00d4aa] to-[#00b88e] text-base font-bold text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4aa]/30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Buy Now
                  </button>

                  <button
                    onClick={addToCart}
                    disabled={isLoadingCart || product.stock === 0}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#00d4aa] text-base font-bold text-[#00d4aa] transition-all duration-300 hover:bg-[#00d4aa]/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    {isLoadingCart
                      ? 'Adding to Cart...'
                      : 'Add To Cart'}
                  </button>

                  <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#2a2a30] font-semibold text-gray-300 transition-all duration-300 hover:border-[#8b5cf6]/70 hover:bg-[#8b5cf6]/5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Wishlist
                  </button>
                </div>

                {/* TRUST BADGES */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 rounded-xl border border-[#2a2a30] bg-[#0f0f12]/55 p-3 backdrop-blur">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-300">Verified Seller</div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-[#2a2a30] bg-[#0f0f12]/55 p-3 backdrop-blur">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-300">Secure Payment</div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-[#2a2a30] bg-[#0f0f12]/55 p-3 backdrop-blur">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-300">Easy Return</div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-[#2a2a30] bg-[#0f0f12]/55 p-3 backdrop-blur">
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

            {/* DETAILS SECTION */}
            <div className="product-spec-card overflow-hidden rounded-2xl border border-[#2a2a30] bg-[#16161a] shadow-xl">
              <div className="flex items-center justify-between gap-3 border-b border-[#2a2a30] px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-[#00d4aa]/25 bg-[#00d4aa]/10">
                    <BoltIcon className="h-5 w-5 text-[#00d4aa]" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight text-white">Product Details</h2>
                    <p className="mt-0.5 text-xs text-gray-500">Key information before checkout</p>
                  </div>
                </div>
                <span
                  className={`flex-shrink-0 rounded-lg border px-2.5 py-1 text-xs font-bold ${
                    product.active
                      ? 'border-green-500/30 bg-green-500/10 text-green-300'
                      : 'border-gray-500/30 bg-gray-500/10 text-gray-400'
                  }`}
                >
                  {product.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Product Type */}
                <div className="flex items-start gap-3 border-b border-[#2a2a30] pb-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-[#00d4aa]/30 bg-[#00d4aa]/10">
                    <CheckIcon className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Product Type</div>
                    <div className="mt-1 text-sm font-semibold text-[#fafafa]">
                      {product.digital ? 'Digital Product' : 'Physical Product'}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-3 border-b border-[#2a2a30] pb-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">
                    <FolderIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Category</div>
                    <div className="mt-1 text-sm font-semibold text-[#fafafa]">
                      {product.category}
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex items-start gap-3 border-b border-[#2a2a30] pb-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10">
                    {product.digital ? (
                      <BoltIcon className="w-5 h-5 text-green-400" />
                    ) : (
                      <TruckIcon className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Delivery & Shipping</div>
                    <div className="mt-1 text-sm font-semibold text-[#fafafa]">
                      {product.digital ? 'Instant Download' : 'Standard Shipping (3-5 days)'}
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-start gap-3 border-b border-[#2a2a30] pb-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10">
                    <ClockIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Last Updated</div>
                    <div className="mt-1 text-sm font-semibold text-[#fafafa]">
                      {new Date(product.updated_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-3 pb-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-[#00d4aa]/30 bg-[#00d4aa]/10">
                    <StarIcon className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Availability</div>
                    <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#fafafa]">
                      {product.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
                          Featured
                        </span>
                      )}
                      {product.active ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-400 text-xs font-bold">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="border-t border-[#2a2a30] pt-4">
                    <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#00d4aa]/30 bg-[#00d4aa]/10 px-2.5 py-1.5 text-xs font-semibold text-[#00d4aa]"
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
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full h-14 rounded-2xl border-2 border-purple-500 text-purple-400 font-bold hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 gap-2"
              >
                <PlayCircleIcon className="h-5 w-5" />
                Preview Product
              </a>
            )}
          </div>
        </div>

        {/* FULL WIDTH DESCRIPTION */}
        {productDescriptionContent && (
          <section className="mt-12 overflow-hidden rounded-2xl border border-[#2a2a30] bg-[#141418] shadow-2xl shadow-black/25">
            <div className="border-b border-[#2a2a30] bg-linear-to-r from-[#16161a] via-[#171720] to-[#111115] px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-5xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#00d4aa]/25 bg-[#00d4aa]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#00d4aa]">
                    <SparklesIcon className="h-4 w-4" />
                    Product Description
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    About This Product
                  </h2>
                  {product.description && product.detailed_description && (
                    <p className="mt-3 max-w-4xl text-base leading-7 text-gray-300">
                      {product.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-lg border border-[#2a2a30] bg-[#0f0f12]/80 px-3 py-1.5 font-semibold text-gray-300">
                    {product.digital ? 'Digital Product' : 'Physical Product'}
                  </span>
                  <span className="rounded-lg border border-[#2a2a30] bg-[#0f0f12]/80 px-3 py-1.5 font-semibold text-gray-300">
                    {product.category}
                  </span>
                  <span className="rounded-lg border border-[#00d4aa]/25 bg-[#00d4aa]/10 px-3 py-1.5 font-semibold text-[#00d4aa]">
                    {product.stock > 0 ? 'Available Now' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>

            <article className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
                <div
                  className="ck-content max-w-none text-left text-gray-300"
                  dangerouslySetInnerHTML={{ __html: renderCkEditorContent(productDescriptionContent) }}
                />
              </div>

              <aside className="border-t border-[#2a2a30] bg-[#101014] p-4 sm:p-6 lg:border-l lg:border-t-0">
                <div className="sticky top-24 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-[#2a2a30] bg-[#16161a] p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#8b5cf6]/25 bg-[#8b5cf6]/10">
                      <DocumentTextIcon className="h-5 w-5 text-[#a78bfa]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Overview</p>
                      <p className="text-sm font-bold text-white">Details from the product editor</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                    <div className="rounded-xl border border-[#2a2a30] bg-[#16161a] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Type</p>
                      <p className="mt-1 text-sm font-semibold text-white">{product.digital ? 'Digital' : 'Physical'}</p>
                    </div>
                    <div className="rounded-xl border border-[#2a2a30] bg-[#16161a] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">Category</p>
                      <p className="mt-1 text-sm font-semibold text-white">{product.category}</p>
                    </div>
                  </div>
                </div>
              </aside>
            </article>
          </section>
        )}

        {/* CUSTOMER REVIEWS SECTION */}
        <div className="mt-14">
          <div className="mb-5">
            <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-white">Customer Reviews</h2>
            <p className="text-gray-400 text-sm">See what our customers think about this product</p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* REVIEW SUMMARY */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2a2a30] bg-[#16161a] p-6">
              <div className="mb-2 text-5xl font-bold text-[#00d4aa]">4.8</div>
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
            <div className="space-y-3.5 lg:col-span-2">
              {/* REVIEW ITEM 1 */}
              <div className="rounded-xl border border-[#2a2a30] bg-[#16161a] p-4 transition-colors hover:border-[#00d4aa]/30">
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
              <div className="rounded-xl border border-[#2a2a30] bg-[#16161a] p-4 transition-colors hover:border-[#00d4aa]/30">
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
        
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* FREE SHIPPING */}
          <div className="group rounded-xl border border-[#2a2a30] bg-[#16161a] p-5 transition-colors hover:border-green-500/30">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/15">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 6V3L8 8l5 5v-3c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-3.9-3.1-7-7-7zm0 5v2.07C9.67 13.23 7.42 11.17 7.42 8.5c0-1.47.78-2.74 1.93-3.45L13 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-400">On orders over ৳500. Fast & reliable delivery to your doorstep.</p>
          </div>

          {/* EASY RETURNS */}
          <div className="group rounded-xl border border-[#2a2a30] bg-[#16161a] p-5 transition-colors hover:border-blue-500/30">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/15">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Easy Returns</h3>
            <p className="text-sm text-gray-400">30-day return window. No questions asked return policy.</p>
          </div>

          {/* SECURE PAYMENT */}
          <div className="group rounded-xl border border-[#2a2a30] bg-[#16161a] p-5 transition-colors hover:border-purple-500/30">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/15">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Secure</h3>
            <p className="text-sm text-gray-400">Your payment information is encrypted and secure.</p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="mt-14">
          <div className="mb-5">
            <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-sm">Common questions about this product</p>
          </div>

          <div className="space-y-3 rounded-2xl border border-[#2a2a30] bg-[#16161a] p-5 sm:p-6">
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
              <p className="text-gray-400 text-sm ml-9 mt-3">We offer a 30-day return window. If you are not satisfied with your purchase, you can return it for a full refund or exchange.</p>
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
        
        <div className="mt-14">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-white">You Might Also Like</h2>
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
                    className="group flex-shrink-0 w-80 sm:w-96 bg-linear-to-br from-[#16161a] to-[#1a1a1f] border border-[#2a2a30] rounded-2xl overflow-hidden hover:border-[#00d4aa]/60 transition-all duration-300 snap-start shadow-lg hover:shadow-2xl hover:shadow-[#00d4aa]/10"
                  >
                    {/* IMAGE SECTION */}
                    <div className="relative aspect-video bg-[#0f0f12] overflow-hidden">
                      {related.thumbnail ? (
                        <>
                          <Image
                            src={getStorageUrl(related.thumbnail)!}
                            alt={related.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            fill
                            sizes="(min-width: 640px) 24rem, 20rem"
                          />
                          {/* GRADIENT OVERLAY */}
                          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                            {formatPrice(related.price)}
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

      <style jsx global>{`
        .product-spec-card > div:first-child {
          background: linear-gradient(90deg, rgba(0, 212, 170, 0.08), rgba(139, 92, 246, 0.05));
        }

        .product-spec-card > .grid {
          gap: 0;
        }

        .product-spec-card > .grid > div {
          min-height: 84px;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #2a2a30;
        }

        @media (min-width: 640px) {
          .product-spec-card > .grid > div:nth-child(odd) {
            border-right: 1px solid #2a2a30;
          }
        }

        .product-spec-card > .grid > div:not(.border-t) > div:first-child {
          width: 2rem;
          height: 2rem;
          border-radius: 0.75rem;
        }

        .product-spec-card > .grid > div:not(.border-t) > div:first-child svg {
          width: 1rem;
          height: 1rem;
        }

        .product-spec-card > .grid > div:not(.border-t) > div:nth-child(2) {
          display: block;
          min-width: 0;
        }

        .product-spec-card > .grid > div:not(.border-t) > div:nth-child(2) > div:first-child {
          color: #71717a;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          line-height: 1rem;
        }

        .product-spec-card > .grid > div:not(.border-t) > div:nth-child(2) > div:nth-child(2),
        .product-spec-card > .grid > div:not(.border-t) > div:nth-child(2) > div:last-child {
          color: #fafafa;
          font-size: 0.9rem;
          font-weight: 650;
          line-height: 1.45;
        }

        .product-spec-card .rounded-full {
          border-radius: 0.5rem;
          padding: 0.25rem 0.6rem;
          font-size: 0.72rem;
          line-height: 1rem;
        }

        .product-spec-card .border-t {
          grid-column: 1 / -1;
          margin-top: 0;
          padding: 1rem 1.25rem;
        }

        .product-spec-card .border-t .rounded-lg {
          border-color: #2a2a30;
          background: rgba(15, 15, 18, 0.75);
          color: #d4d4d8;
        }

        .ck-content {
          color: #d4d4d8;
          font-size: 1rem;
          line-height: 1.85;
          word-break: break-word;
        }

        .ck-content > *:first-child {
          margin-top: 0;
        }

        .ck-content > *:last-child {
          margin-bottom: 0;
        }

        .ck-content p {
          max-width: 78rem;
          margin: 0 0 1.15rem;
        }

        .ck-content h1,
        .ck-content h2,
        .ck-content h3,
        .ck-content h4,
        .ck-content h5,
        .ck-content h6 {
          color: #ffffff;
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: 0;
          margin: 2rem 0 0.8rem;
        }

        .ck-content h1 {
          font-size: clamp(1.9rem, 3vw, 2.75rem);
        }

        .ck-content h2 {
          font-size: clamp(1.55rem, 2vw, 2.1rem);
        }

        .ck-content h3 {
          font-size: 1.35rem;
        }

        .ck-content h4 {
          font-size: 1.1rem;
        }

        .ck-content strong,
        .ck-content b {
          color: #ffffff;
          font-weight: 700;
        }

        .ck-content em,
        .ck-content i {
          color: #e5e7eb;
        }

        .ck-content a {
          color: #00d4aa;
          font-weight: 700;
          text-decoration: underline;
          text-decoration-color: rgba(0, 212, 170, 0.45);
          text-underline-offset: 4px;
        }

        .ck-content ul,
        .ck-content ol {
          max-width: 78rem;
          margin: 1rem 0 1.35rem;
          padding-left: 1.35rem;
        }

        .ck-content ul {
          list-style: disc;
        }

        .ck-content ol {
          list-style: decimal;
        }

        .ck-content li {
          margin: 0.45rem 0;
          padding-left: 0.25rem;
        }

        .ck-content blockquote {
          max-width: 82rem;
          margin: 1.5rem 0;
          border-left: 4px solid #00d4aa;
          border-radius: 0 14px 14px 0;
          background: linear-gradient(90deg, rgba(0, 212, 170, 0.12), rgba(139, 92, 246, 0.06));
          padding: 1rem 1.2rem;
          color: #f4f4f5;
        }

        .ck-content pre {
          max-width: 82rem;
          margin: 1.5rem 0;
          overflow-x: auto;
          border: 1px solid #2a2a30;
          border-radius: 14px;
          background: #0b0b0f;
          padding: 1rem;
          color: #d8fdf5;
          font-size: 0.85rem;
          line-height: 1.6;
        }

        .ck-content code {
          border: 1px solid rgba(0, 212, 170, 0.25);
          border-radius: 6px;
          background: rgba(0, 212, 170, 0.1);
          padding: 0.1rem 0.3rem;
          color: #9fffea;
          font-size: 0.9em;
        }

        .ck-content pre code {
          border: 0;
          background: transparent;
          padding: 0;
          color: inherit;
        }

        .ck-content table {
          display: block;
          width: 100%;
          margin: 1.5rem 0;
          overflow-x: auto;
          border-collapse: collapse;
          border-radius: 14px;
        }

        .ck-content th,
        .ck-content td {
          border: 1px solid #2a2a30;
          padding: 0.8rem 0.95rem;
          text-align: left;
          vertical-align: top;
        }

        .ck-content th {
          background: rgba(0, 212, 170, 0.12);
          color: #ffffff;
          font-weight: 700;
        }

        .ck-content img {
          max-width: 100%;
          height: auto;
          margin: 1.6rem auto;
          border-radius: 16px;
          border: 1px solid #2a2a30;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
        }

        .ck-content figure {
          margin: 1.6rem 0;
        }

        .ck-content figcaption {
          margin-top: 0.45rem;
          color: #9ca3af;
          font-size: 0.8rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
