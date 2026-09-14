// app/components/AnalyticsProvider.tsx
'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { trackPageView, trackServicePageView } from '../utils/analytics';
import { syncAttribution } from '../utils/attribution';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

function AnalyticsRouteListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const queryString = searchParams?.toString();
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname;

    // Avoid duplicate page_view executions on the exact same route transition
    if (lastTrackedPath.current === fullPath) {
      return;
    }
    lastTrackedPath.current = fullPath;

    // 1. Sync First-Touch & Last-Touch UTM Attribution
    syncAttribution();

    // 2. Dispatch standardized page_view event
    trackPageView({
      page_path: fullPath,
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_location: typeof window !== 'undefined' ? window.location.href : '',
    });

    // 3. Detect and dispatch service_page_view for commercial landing pages
    const serviceMatch = pathname.match(/^\/(solutions|ai|growth|labs)\/([^/]+)/);
    if (serviceMatch) {
      const division = serviceMatch[1];
      const serviceSlug = serviceMatch[2];
      const formatName = serviceSlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      trackServicePageView({
        service_name: formatName,
        service_division: `NextDigi ${division.charAt(0).toUpperCase() + division.slice(1)}`,
        page_path: fullPath,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsProvider() {
  const primaryGoogleId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;

  return (
    <>
      {/* Route Listener wrapped in Suspense for Next.js searchParams */}
      <Suspense fallback={null}>
        <AnalyticsRouteListener />
      </Suspense>

      {/* Google Consent Mode v2 & dataLayer Initialization */}
      <Script
        id="ndh-consent-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted'
            });
          `,
        }}
      />

      {/* Google Analytics 4 / Google Ads Global Tag */}
      {primaryGoogleId && (
        <>
          <Script
            id="ndh-gtag-base"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${primaryGoogleId}`}
          />
          <Script
            id="ndh-gtag-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                gtag('js', new Date());
                ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });` : ''}
                ${GOOGLE_ADS_ID && GOOGLE_ADS_ID !== GA_MEASUREMENT_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
              `,
            }}
          />
        </>
      )}

      {/* Google Tag Manager (if configured) */}
      {GTM_CONTAINER_ID && (
        <Script
          id="ndh-gtm-container"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
            `,
          }}
        />
      )}

      {/* Meta Pixel (fbq) */}
      {META_PIXEL_ID && (
        <Script
          id="ndh-meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
            `,
          }}
        />
      )}
    </>
  );
}
