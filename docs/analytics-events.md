# NextDigiHome — Analytics & Conversion Measurement Architecture

## 1. Overview & Objectives
This document establishes the official measurement, tracking, and attribution taxonomy for the NextDigiHome production platform.

The architecture is engineered around an end-to-end commercial funnel:
```
TRAFFIC (Organic, Paid Search, Paid Social, Direct, Referral)
   ↓
ENGAGEMENT (Page Views, Service Landing Page Views)
   ↓
CTA CLICK (Hero, Mid-Page, Sticky Nav, Final Banner, Header)
   ↓
CONTACT FORM START (First Interaction with Lead Form)
   ↓
LEAD (Verified Backend Submission — Official Conversion)
   ↓
QUALIFIED LEAD (CRM Status Transition)
   ↓
PROPOSAL (Scoping & Pricing)
   ↓
WON CUSTOMER (Deal Closed)
   ↓
REVENUE
```

---

## 2. Official Website Conversion Definition
- **Primary Conversion**: `lead`
- **Definition**: A prospective customer has completed the `/contact` multi-step requirements form, passed validation, honeypot spam traps, and has been **successfully committed to the backend database** (HTTP 200 response with `{ success: true }`).
- **Strict Rule**: The `lead` conversion event **NEVER** fires on page load, CTA click, form open, input focus, or submit click. It fires **ONLY** after successful backend confirmation.

---

## 3. Standardized Event Inventory

| Event Name | Trigger | Parameters | Destinations | Business Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `page_view` | Initial page load and client-side route transitions (deduplicated). | `page_path`, `page_title`, `page_location` | GA4, Meta Pixel (`PageView`), GTM dataLayer | Track overall site traffic and user journey across pages without duplicate triggers. |
| `service_page_view` | Visitor lands on or navigates to any `/solutions/*`, `/ai/*`, `/growth/*`, or `/labs/*` landing page. | `service_name`, `service_division`, `page_path` | GA4, Meta Pixel (`ViewContent`), GTM dataLayer | Measure commercial interest in specific agency divisions and service offerings. |
| `cta_click` | Visitor clicks a primary call-to-action button (e.g. "Start a Project", "Discuss Requirements"). | `cta_name`, `cta_location`, `service`, `page_path` | GA4, GTM dataLayer | Measure user intent and compare performance across CTA locations (hero, mid_page, final_cta, sticky_nav, header). |
| `contact_form_start` | Visitor takes their first interactive step on the `/contact` form (selecting a service, choosing budget, focusing an input). Fires once per session. | `form_name`, `service`, `page_path` | GA4, Meta Pixel (`Contact`), GTM dataLayer | Measure form drop-off and form completion rate (`lead` / `contact_form_start`). |
| `lead` | Lead inquiry accepted and saved by `/api/leads` (HTTP 200). | `service`, `lead_source`, `landing_page`, `lead_id`, `event_id`, `value`, `currency` | GA4 (`lead`), Meta Pixel (`Lead`), Google Ads (`conversion`), GTM dataLayer | The official commercial conversion event for ROI and attribution reporting. |

---

## 4. Multi-Touch Attribution Engine (First Touch & Last Touch)

Attribution is captured automatically by [`app/utils/attribution.ts`](file:///d:/TMSPROJECT/htdocs/NEXTDIGIHOMEFRONTEND/app/utils/attribution.ts) and synchronized to browser storage on every visit:

### First-Touch Attribution (Origin)
- Stored permanently in `localStorage` upon first discovery of the website.
- **Fields**:
  - `first_utm_source`: e.g. `google`, `facebook`, `linkedin`
  - `first_utm_medium`: e.g. `cpc`, `paid_social`, `organic`
  - `first_utm_campaign`: e.g. `saas_launch_v1`
  - `first_utm_content`: Ad creative or variation ID
  - `first_utm_term`: Search keyword or audience
  - `first_landing_page`: e.g. `/solutions/saas-development`
  - `first_referrer`: e.g. `https://www.google.com/`
  - `first_touch_time`: ISO 8601 timestamp

### Last-Touch Attribution (Conversion Session)
- Updated in `sessionStorage` whenever the user enters through a new campaign or referral.
- **Fields**:
  - `last_utm_source`, `last_utm_medium`, `last_utm_campaign`, `last_utm_content`, `last_utm_term`, `last_landing_page`, `last_referrer`, `last_touch_time`.

### CRM Submission
When `/api/leads` receives an inquiry, both First-Touch and Last-Touch attributes are stored directly on the lead record, accessible in `/admin/leads` for sales intelligence and marketing optimization.

---

## 5. Event Deduplication Architecture
- Every lead generation payload generates:
  1. A human-readable internal Lead ID: `NDH-XXXXXX` (used across website, CRM, proposal, and client billing).
  2. A unique Event ID: `lead_TIMESTAMP_RANDOM` (passed as `eventID` to Meta Pixel `fbq('track', 'Lead', params, { eventID })`).
- This allows future Meta Conversions API (server-side CAPI) to deduplicate browser and server events cleanly using the matching `eventID`.

---

## 6. Privacy & PII Protection Standards
In compliance with international data protection laws and ad platform policies:
- **STRICT PROHIBITION**: Personally Identifiable Information (PII) is **NEVER** sent to GA4, Meta Pixel, Google Ads, or GTM `dataLayer`.
- The following fields are stripped by the central sanitizer:
  - Full Name, First Name, Last Name
  - Email Address
  - Phone Number, WhatsApp Number
  - Physical Address
  - Detailed Project Scope or Messages
  - Client Credentials
- Only non-sensitive commercial dimensions (`service`, `budget`, `lead_source`, `landing_page`, `lead_id`, `event_id`) are transmitted.

---

## 7. Environment Variables Configuration

The following environment variables control the measurement pipeline without modifying source code:

| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Google Analytics 4 Measurement ID |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Google Tag Manager Container ID (optional) |
| `NEXT_PUBLIC_META_PIXEL_ID` | `123456789012345` | Meta Pixel / Meta Dataset ID |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-XXXXXXXXXX` | Google Ads Account / Tag ID |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | `aBcD_XyZ123` | Google Ads Conversion Action Label |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | `true` / `false` | Enables rich console logging of all dispatches in dev/testing |

---

## 8. Sources of Truth
- **CRM (`/admin/leads`)**: Source of truth for actual leads, qualified opportunities, customer accounts, and revenue.
- **Google Analytics 4**: Source of truth for site-wide user behavior, session paths, and engagement funnels.
- **Ad Platforms (Meta Ads, Google Ads)**: Source of truth for ad impressions, clicks, cost-per-click (CPC), and platform-attributed conversion delivery.
