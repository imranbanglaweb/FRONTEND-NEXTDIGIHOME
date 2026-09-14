// app/utils/attribution.ts
// Privacy-centric UTM & Multi-Touch Attribution Engine for NextDigiHome

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  referrer?: string;
  timestamp?: string;
}

export interface FullAttributionPayload {
  // First Touch
  first_utm_source?: string;
  first_utm_medium?: string;
  first_utm_campaign?: string;
  first_utm_content?: string;
  first_utm_term?: string;
  first_landing_page?: string;
  first_referrer?: string;
  first_touch_time?: string;

  // Last Touch
  last_utm_source?: string;
  last_utm_medium?: string;
  last_utm_campaign?: string;
  last_utm_content?: string;
  last_utm_term?: string;
  last_landing_page?: string;
  last_referrer?: string;
  last_touch_time?: string;

  // Current session/URL params
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  referrer?: string;

  // Generated Lead & Event Identifiers
  lead_id?: string;
  event_id?: string;
}

const FIRST_TOUCH_STORAGE_KEY = 'ndh_first_touch_v1';
const LAST_TOUCH_STORAGE_KEY = 'ndh_last_touch_v1';

/**
 * Generate a clean human-readable internal lead identifier: e.g. NDH-829104
 */
export function generateLeadId(): string {
  const timestampPart = Date.now().toString().slice(-6);
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString().slice(-2);
  return `NDH-${timestampPart}${randomPart}`;
}

/**
 * Generate unique event ID for Meta and server-side tracking deduplication
 */
export function generateEventId(prefix: string = 'evt'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Safely parse current URL search parameters for attribution
 */
export function parseCurrentUtms(): AttributionData {
  if (typeof window === 'undefined') return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source') || undefined;
    const medium = params.get('utm_medium') || undefined;
    const campaign = params.get('utm_campaign') || undefined;
    const content = params.get('utm_content') || undefined;
    const term = params.get('utm_term') || undefined;

    const currentPath = window.location.pathname + window.location.search;
    const referrer = document.referrer || 'Direct';

    return {
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
      utm_content: content,
      utm_term: term,
      landing_page: currentPath,
      referrer: referrer.startsWith(window.location.origin) ? 'Internal' : referrer,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    return {};
  }
}

/**
 * Record initial visit first-touch and update last-touch in storage
 */
export function syncAttribution(): void {
  if (typeof window === 'undefined') return;

  try {
    const current = parseCurrentUtms();
    const hasUtms = Boolean(
      current.utm_source ||
      current.utm_medium ||
      current.utm_campaign ||
      current.utm_content ||
      current.utm_term
    );

    // 1. First Touch Attribution (Write once, never overwrite)
    const existingFirst = localStorage.getItem(FIRST_TOUCH_STORAGE_KEY);
    if (!existingFirst) {
      localStorage.setItem(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(current));
    }

    // 2. Last Touch Attribution (Update on new campaign or new session)
    if (hasUtms || !sessionStorage.getItem(LAST_TOUCH_STORAGE_KEY)) {
      sessionStorage.setItem(LAST_TOUCH_STORAGE_KEY, JSON.stringify(current));
      localStorage.setItem(LAST_TOUCH_STORAGE_KEY, JSON.stringify(current));
    }
  } catch (e) {
    // Storage restricted or unavailable
  }
}

/**
 * Retrieve combined First & Last Touch attribution payload for lead submission
 */
export function getAttributionPayload(): FullAttributionPayload {
  if (typeof window === 'undefined') return {};

  try {
    const current = parseCurrentUtms();
    let first: AttributionData = {};
    let last: AttributionData = {};

    const rawFirst = localStorage.getItem(FIRST_TOUCH_STORAGE_KEY);
    if (rawFirst) {
      first = JSON.parse(rawFirst);
    } else {
      first = current;
    }

    const rawLast = sessionStorage.getItem(LAST_TOUCH_STORAGE_KEY) || localStorage.getItem(LAST_TOUCH_STORAGE_KEY);
    if (rawLast) {
      last = JSON.parse(rawLast);
    } else {
      last = current;
    }

    const leadId = generateLeadId();
    const eventId = generateEventId('lead');

    return {
      // First Touch
      first_utm_source: first.utm_source,
      first_utm_medium: first.utm_medium,
      first_utm_campaign: first.utm_campaign,
      first_utm_content: first.utm_content,
      first_utm_term: first.utm_term,
      first_landing_page: first.landing_page,
      first_referrer: first.referrer,
      first_touch_time: first.timestamp,

      // Last Touch
      last_utm_source: last.utm_source || current.utm_source,
      last_utm_medium: last.utm_medium || current.utm_medium,
      last_utm_campaign: last.utm_campaign || current.utm_campaign,
      last_utm_content: last.utm_content || current.utm_content,
      last_utm_term: last.utm_term || current.utm_term,
      last_landing_page: last.landing_page || current.landing_page,
      last_referrer: last.referrer || current.referrer,
      last_touch_time: last.timestamp || current.timestamp,

      // Primary active attribution
      utm_source: current.utm_source || last.utm_source || first.utm_source,
      utm_medium: current.utm_medium || last.utm_medium || first.utm_medium,
      utm_campaign: current.utm_campaign || last.utm_campaign || first.utm_campaign,
      utm_content: current.utm_content || last.utm_content || first.utm_content,
      utm_term: current.utm_term || last.utm_term || first.utm_term,
      landing_page: current.landing_page,
      referrer: current.referrer,

      lead_id: leadId,
      event_id: eventId,
    };
  } catch (err) {
    return {
      lead_id: generateLeadId(),
      event_id: generateEventId('lead'),
    };
  }
}
