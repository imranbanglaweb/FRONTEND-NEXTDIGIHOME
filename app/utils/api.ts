// utils/api.ts

// Clean base URL (always without trailing /api)
const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/NEXTDIGIHOMEBACKEND';
export const BACKEND_BASE_URL = RAW_API_URL.replace(/\/api\/?$/, '');

const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH || '/api';

export const getApiUrl = (endpoint: string): string => {
  // If endpoint starts with http, use it as-is
  if (endpoint.startsWith('http')) {
    return endpoint;
  }

  // If endpoint starts with /, prepend BACKEND_BASE_URL
  if (endpoint.startsWith('/')) {
    return `${BACKEND_BASE_URL}${endpoint}`;
  }

  // Otherwise, prepend BACKEND_BASE_URL + API_BASE_PATH
  return `${BACKEND_BASE_URL}${API_BASE_PATH}/${endpoint}`;
};

export interface FetchOptions extends RequestInit {
  cacheTime?: number;
  silent?: boolean;
}

export const apiFetch = async <T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const url = getApiUrl(endpoint);
  
  // Set default fetch options
  const fetchOptions: RequestInit = {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Only log if not silent
    if (!options.silent) {
      console.error(`Failed to fetch from ${endpoint}:`, error);
    }
    throw error;
  }
};

// Specific API methods for content
export const fetchHomeContent = () => apiFetch('/api/content/home');
export const fetchAboutContent = () => apiFetch('/api/content/about');
export const fetchContactContent = () => apiFetch('/api/content/contact');
export const fetchPrivacyContent = () => apiFetch('/api/content/privacy');
export const fetchTermsContent = () => apiFetch('/api/content/terms');
export const fetchProducts = (page: number = 1, perPage: number = 12) =>
  apiFetch(`/api/products?page=${page}&per_page=${perPage}`);

// Helper for Laravel storage URLs (thumbnails, logos, etc.)
export const getStorageUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.replace(/^\/+/, '');
  return `${BACKEND_BASE_URL}/storage/${cleanPath}`;
};

// Helper for public folder assets (e.g. /public/images/payment/*.jpg)
export const getPublicUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.replace(/^\/+/, '');
  return `${BACKEND_BASE_URL}/public/${cleanPath}`;
};
