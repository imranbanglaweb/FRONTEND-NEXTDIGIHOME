// utils/api.ts

function detectBackendBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) return envUrl;
  return 'https://backend.nextdigihome.com';
}

const BACKEND_BASE_URL = detectBackendBaseUrl();

const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH || '/api';

export { BACKEND_BASE_URL, API_BASE_PATH };

export const getApiUrl = (endpoint: string): string => {
  if (endpoint.startsWith('http')) return endpoint;
  return `${BACKEND_BASE_URL}${API_BASE_PATH}/${endpoint.replace(/^\//, '')}`;
};

export interface FetchOptions extends RequestInit {
  cacheTime?: number;
  silent?: boolean;
}

export const apiFetch = async <T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const url = getApiUrl(endpoint);
  
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
      let errorData: any = null;
      try {
        errorData = await response.json();
      } catch {
        const errorText = await response.text();
        errorData = { message: errorText };
      }
      if (!options.silent) {
        console.error(`API Error ${response.status} from ${endpoint}:`, errorData);
      }
      const error: any = new Error(`API Error: ${response.status} ${response.statusText}`);
      error.data = errorData;
      error.status = response.status;
      throw error;
    }

const data = await response.json();
    return data;
  } catch (error) {
    if (!options.silent && !(error instanceof Error && (error as any).status)) {
      console.error(`Failed to fetch from ${endpoint}:`, error instanceof Error ? error.message : error);
    }
    throw error;
  }
};

// Public API methods
export const fetchHomeContent = () => apiFetch('content/home');
export const fetchAboutContent = () => apiFetch('content/about');
export const fetchContactContent = () => apiFetch('content/contact');
export const fetchPrivacyContent = () => apiFetch('content/privacy');
export const fetchTermsContent = () => apiFetch('content/terms');
export const fetchProducts = (page: number = 1, perPage: number = 12) =>
  apiFetch(`products?page=${page}&per_page=${perPage}`);

// Laravel storage URLs
export const getStorageUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanPath = path.replace(/^\/+/, '');
  return `${BACKEND_BASE_URL}/storage/${cleanPath}`;
};

// Logo URLs - fetch from backend public folder
export const getLogoUrl = (filename: string | null | undefined): string | null => {
  if (!filename) return null;
  if (filename.startsWith('http')) return filename;
  const cleanFilename = filename.replace(/^\/+/, '');
  return `${BACKEND_BASE_URL}/public/admin_resource/assets/images/${cleanFilename}`;
};

// Public folder assets
export const getPublicUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.replace(/^\/+/, '');
  return `${BACKEND_BASE_URL}/public/${cleanPath}`;
};