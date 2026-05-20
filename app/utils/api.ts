// utils/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH || '/api';

export const getApiUrl = (endpoint: string): string => {
  // If endpoint starts with http, use it as-is
  if (endpoint.startsWith('http')) {
    return endpoint;
  }

  // Remove leading /api from endpoint if API_URL already includes /api
  let cleanEndpoint = endpoint;
  if (API_URL.endsWith('/api') && endpoint.startsWith('/api/')) {
    cleanEndpoint = endpoint.replace('/api/', '/');
  }

  // If endpoint starts with /, prepend API_URL
  if (cleanEndpoint.startsWith('/')) {
    return `${API_URL}${cleanEndpoint}`;
  }

  // Otherwise, prepend API_URL and API_BASE_PATH
  return `${API_URL}${API_BASE_PATH}/${cleanEndpoint}`;
};

export interface FetchOptions extends RequestInit {
  cacheTime?: number;
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
    console.error(`Failed to fetch from ${endpoint}:`, error);
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
