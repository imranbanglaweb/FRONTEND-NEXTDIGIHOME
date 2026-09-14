// app/utils/analytics.ts
// Unified, Privacy-Centric Analytics & Conversion Dispatcher for NextDigiHome
// Supports GA4, Meta Pixel/Dataset, Google Ads Conversions, GTM dataLayer

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: Array<Record<string, any>>;
  }
}

export type AnalyticsEventName =
  | 'page_view'
  | 'service_page_view'
  | 'cta_click'
  | 'contact_form_start'
  | 'lead';

export interface BaseEventParams {
  [key: string]: any;
}

export interface PageViewParams extends BaseEventParams {
  page_path: string;
  page_title?: string;
  page_location?: string;
}

export interface ServicePageViewParams extends BaseEventParams {
  service_name: string;
  service_division: string;
  page_path: string;
}

export interface CtaClickParams extends BaseEventParams {
  cta_name: string;
  cta_location: 'hero' | 'mid_page' | 'case_study' | 'final_cta' | 'sticky_nav' | 'header' | 'footer' | string;
  service?: string;
  page_path: string;
}

export interface ContactFormStartParams extends BaseEventParams {
  form_name: string;
  service?: string;
  page_path: string;
}

export interface LeadConversionParams extends BaseEventParams {
  service: string;
  lead_source?: string;
  landing_page?: string;
  lead_id?: string;
  event_id?: string;
  value?: number | string;
  currency?: string;
}

// Strictly blacklist any PII fields from ever reaching analytics pipelines
const PII_KEYS = new Set([
  'name',
  'fullname',
  'first_name',
  'last_name',
  'email',
  'phone',
  'telephone',
  'whatsapp',
  'address',
  'description',
  'details',
  'message',
  'company',
  'website',
  'password',
]);

/**
 * Filter sensitive keys from event parameter payloads
 */
export function sanitizeParams(params: Record<string, any> = {}): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(params)) {
    const lowerKey = key.toLowerCase();
    if (!PII_KEYS.has(lowerKey) && val !== undefined && val !== null) {
      clean[key] = val;
    }
  }
  return clean;
}

const isDebug = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true';

/**
 * Log analytics events when debug mode is enabled
 */
function logDebug(platform: string, eventName: string, payload: Record<string, any>) {
  if (isDebug && typeof window !== 'undefined') {
    console.groupCollapsed(`%c[Analytics:${platform}] ${eventName}`, 'color: #00d4aa; font-weight: bold;');
    console.log('Payload:', payload);
    console.groupEnd();
  }
}

/**
 * Push an event to GTM dataLayer
 */
export function pushDataLayer(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    const payload = {
      event: eventName,
      ...sanitizeParams(params),
      timestamp: new Date().toISOString(),
    };
    window.dataLayer.push(payload);
    logDebug('dataLayer', eventName, payload);
  } catch (err) {
    if (isDebug) console.warn('[Analytics:dataLayer] Push error:', err);
  }
}

/**
 * Dispatch an event to Google Analytics 4
 */
export function trackGA4(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    const clean = sanitizeParams(params);
    window.gtag('event', eventName, clean);
    logDebug('GA4', eventName, clean);
  } catch (err) {
    if (isDebug) console.warn('[Analytics:GA4] Event dispatch error:', err);
  }
}

/**
 * Dispatch an event to Meta Pixel (fbq)
 */
export function trackMeta(
  eventName: string,
  params: Record<string, any> = {},
  eventId?: string
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  try {
    const clean = sanitizeParams(params);
    const options = eventId ? { eventID: eventId } : undefined;

    // Standard Meta Pixel events
    const standardEvents = new Set(['PageView', 'Lead', 'ViewContent', 'Contact', 'InitiateCheckout', 'Purchase']);
    if (standardEvents.has(eventName)) {
      if (options) {
        window.fbq('track', eventName, clean, options);
      } else {
        window.fbq('track', eventName, clean);
      }
    } else {
      if (options) {
        window.fbq('trackCustom', eventName, clean, options);
      } else {
        window.fbq('trackCustom', eventName, clean);
      }
    }
    logDebug('Meta', eventName, { ...clean, eventId });
  } catch (err) {
    if (isDebug) console.warn('[Analytics:Meta] Event dispatch error:', err);
  }
}

/**
 * Dispatch a conversion event to Google Ads
 */
export function trackGoogleAds(params: Record<string, any> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

  if (!adsId) return;

  try {
    const sendTo = label ? `${adsId}/${label}` : adsId;
    const clean = sanitizeParams({
      send_to: sendTo,
      ...params,
    });
    window.gtag('event', 'conversion', clean);
    logDebug('GoogleAds', 'conversion', clean);
  } catch (err) {
    if (isDebug) console.warn('[Analytics:GoogleAds] Conversion dispatch error:', err);
  }
}

// =========================================================================
// UNIFIED MEASUREMENT ARCHITECTURE METHODS
// =========================================================================

/**
 * 1. Page View (client-side route changes & initial landing)
 */
export function trackPageView(params: PageViewParams): void {
  const clean = sanitizeParams(params);
  pushDataLayer('page_view', clean);
  trackGA4('page_view', clean);
  trackMeta('PageView');
}

/**
 * 2. Service Landing Page View
 */
export function trackServicePageView(params: ServicePageViewParams): void {
  const clean = sanitizeParams(params);
  pushDataLayer('service_page_view', clean);
  trackGA4('service_page_view', clean);
  trackMeta('ViewContent', {
    content_name: params.service_name,
    content_category: params.service_division,
  });
}

/**
 * 3. CTA Click
 */
export function trackCtaClick(params: CtaClickParams): void {
  const clean = sanitizeParams(params);
  pushDataLayer('cta_click', clean);
  trackGA4('cta_click', clean);
}

/**
 * 4. Contact Form Start (fires only once per session on user interaction)
 */
export function trackContactFormStart(params: ContactFormStartParams): void {
  const clean = sanitizeParams(params);
  pushDataLayer('contact_form_start', clean);
  trackGA4('contact_form_start', clean);
  trackMeta('Contact', {
    content_name: params.service || 'General Inquiry',
  });
}

/**
 * 5. Official Website Lead Conversion
 * CRITICAL RULE: Fires ONLY after successful backend lead creation (HTTP 200)
 */
export function trackLeadConversion(params: LeadConversionParams): void {
  const clean = sanitizeParams(params);
  const eventId = params.event_id;

  // 1. DataLayer
  pushDataLayer('lead', clean);

  // 2. Google Analytics 4
  trackGA4('lead', {
    service: clean.service,
    lead_source: clean.lead_source || 'Website',
    landing_page: clean.landing_page,
    lead_id: clean.lead_id,
    currency: clean.currency || 'BDT',
  });

  // 3. Meta Pixel (Lead) with eventId deduplication
  trackMeta('Lead', {
    content_name: clean.service,
    content_category: 'Services',
    currency: clean.currency || 'BDT',
    lead_id: clean.lead_id,
  }, eventId);

  // 4. Google Ads Conversion
  trackGoogleAds({
    transaction_id: clean.lead_id,
    currency: clean.currency || 'BDT',
  });
}
