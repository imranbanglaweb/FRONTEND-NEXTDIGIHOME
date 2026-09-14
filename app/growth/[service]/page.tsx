import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/app/utils/seo';
import ServiceLandingPage, { type ServiceLandingPageData } from '@/app/components/ServiceLandingPage';

const growthServicesData: Record<string, ServiceLandingPageData> = {
  'meta-ads': {
    slug: 'meta-ads',
    division: 'NextDigi Growth',
    divisionPath: '/growth',
    eyebrow: 'Meta Advertising',
    title: 'Performance Meta Ads Engineered for Measurable ROAS & Scale.',
    tagline: 'Structured media buying, creative testing frameworks & server-side Conversions API (CAPI) tracking.',
    description: 'Stop guessing on Facebook and Instagram. We deploy scientific creative sandbox testing, audience segmentation, and server-side tracking to acquire high-value customers at disciplined customer acquisition costs.',
    contactServiceParam: 'meta-ads',
    accent: '#00d4aa',
    heroStats: [
      { label: 'Tracking Architecture', value: 'Server-Side CAPI' },
      { label: 'Creative Velocity', value: '10–20 Hooks/Mo' },
      { label: 'Targeting Methodology', value: 'Intent & Retargeting' },
      { label: 'Attribution Fidelity', value: '100% Unblocked' },
    ],
    problems: {
      headline: 'Most Businesses Waste Thousands on Meta Ads Due to Signal Loss & Creative Fatigue.',
      items: [
        {
          title: 'iOS Tracking Signal Loss',
          desc: 'Client-side pixel scripts losing 30%+ of purchase events due to browser privacy blocks, blinding Meta bidding algorithms.',
        },
        {
          title: 'Rapid Creative Fatigue',
          desc: 'Ad fatigue setting in after 2 weeks because single ad graphics run continuously without systematic hook testing.',
        },
        {
          title: 'Boosting Posts Without Funnels',
          desc: 'Spending money on "Boost Post" vanity engagement metrics that produce likes but zero qualified commercial sales.',
        },
        {
          title: 'Unscientific Budget Scaling',
          desc: 'Doubling ad spend on winning campaigns too quickly, breaking the Meta machine learning phase and causing CPA to skyrocket.',
        },
      ],
    },
    solution: {
      headline: 'Scientific Media Buying Built Around Creative Iteration & Server-Side Data.',
      description: 'NextDigi Growth treats paid social as a disciplined engineering discipline: we combine server-to-server Conversions API (CAPI) tracking with rapid creative testing to scale your revenue profitably.',
      pillars: [
        {
          title: 'Server-Side Conversions API (CAPI)',
          desc: 'Dispatch purchase and lead events directly from your backend server to Meta, bypassing browser ad-blockers and iOS privacy restrictions.',
        },
        {
          title: 'Systematic Creative Testing Matrix',
          desc: 'Isolate visual hooks, emotional problem angles, and call-to-action variants in controlled sandbox ad sets before scaling spend.',
        },
        {
          title: 'Full-Funnel Omnichannel Retargeting',
          desc: 'Nurture abandoned carts and past page visitors with social proof, customer testimonials, and direct objection-handling video ads.',
        },
      ],
    },
    capabilities: [
      { title: 'Server-Side CAPI Infrastructure', desc: 'Direct server-to-Meta event pipeline ensuring 100% data fidelity and maximum Event Quality Scores.' },
      { title: 'Dynamic Product Ads (DPA)', desc: 'Automatically show personalized catalog items to shoppers who viewed specific products on your store.' },
      { title: 'Video Hook & Creative Production', desc: 'High-energy vertical UGC clips, motion graphics, and typographic benefit carousels designed to stop thumbs.' },
      { title: 'Custom Audience & LTV Segmentation', desc: 'VIP customer exclusions, repeat purchaser funnels, and high-value Lookalike audience modeling.' },
    ],
    deliverables: [
      'Configured Meta Business Manager, verified Pixel, and Server-Side CAPI tracking',
      'High-velocity creative asset library (video hooks, static benefit cards, carousel designs)',
      'Weekly performance reporting detailing CAC, Blended ROAS, and creative fatigue alerts',
      'Continuous daily campaign optimization, negative exclusion audits, and budget rebalancing',
    ],
    audience: [
      { title: 'E-commerce & Consumer Brands', desc: 'Online storefronts looking to scale monthly gross merchandise volume profitably.' },
      { title: 'B2B & High-Ticket Services', desc: 'Agencies, software firms, and consultancies requiring qualified inbound executive leads.' },
      { title: 'Educational & Course Platforms', desc: 'Institutions enrolling students through structured webinar and video lead magnets.' },
      { title: 'Healthcare & Real Estate', desc: 'High-ticket local businesses capturing direct consultation requests.' },
    ],
    useCases: [
      { category: 'E-commerce', title: 'Catalog Scaling Campaign', desc: 'Dynamic Product Ads + CAPI tracking scaling monthly revenue with disciplined target ROAS.' },
      { category: 'B2B Lead Gen', title: 'High-Ticket Lead Funnel', desc: 'Interactive lead generation campaigns feeding qualified prospects directly into WhatsApp sales reps.' },
      { category: 'Retail', title: 'Local Foot-Traffic Campaign', desc: 'Geo-targeted store promotion with WhatsApp booking integration and local map routing.' },
    ],
    techStack: ['Meta Ads Manager', 'Meta Conversions API (CAPI)', 'Google Tag Manager', 'Looker Studio', 'Canva Pro / Adobe Premiere'],
    faqs: [
      {
        q: 'Do you guarantee a specific ROAS (Return on Ad Spend)?',
        a: 'We do not make fraudulent claims or fake guaranteed ROAS promises. Instead, we use disciplined scientific testing, server-side data attribution, and high-converting landing pages to systematically lower your customer acquisition cost.',
      },
      {
        q: 'How much ad budget should we start with?',
        a: 'We recommend allocating an ad budget that supports at least 30 to 50 conversion events per week, giving Meta algorithms sufficient data to exit the learning phase effectively.',
      },
      {
        q: 'How does Server-Side Conversions API (CAPI) help our ad performance?',
        a: 'CAPI sends conversion events directly from your server to Meta without relying on browser cookies. This eliminates data loss from iOS privacy protections, boosts Meta Event Quality Scores, and allows Meta to target buyers more accurately.',
      },
      {
        q: 'Do you produce the ad creatives (videos, images, copy)?',
        a: 'Yes. Our growth team scriptwrites, designs, and edits complete creative sets including video hooks, graphic carousels, and persuasive ad copy tailored to your brand voice.',
      },
      {
        q: 'Can we track leads generated from Meta ads in our CRM?',
        a: 'Yes. Every ad includes UTM parameters that automatically carry through the lead submission form into your NextDigiHome CRM pipeline.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Solutions', title: 'E-commerce Storefronts', href: '/solutions/ecommerce', desc: 'Maximize your Meta ad ROAS with an ultra-fast headless store.' },
      { division: 'NextDigi Growth', title: 'Analytics & Attribution', href: '/growth/analytics', desc: 'Track multi-touch customer journeys and eliminate blind ad spend.' },
      { division: 'NextDigi AI', title: 'WhatsApp AI Chatbots', href: '/ai/ai-agents', desc: 'Capture and qualify Meta ad clicks automatically 24/7 on WhatsApp.' },
    ],
  },

  'google-ads': {
    slug: 'google-ads',
    division: 'NextDigi Growth',
    divisionPath: '/growth',
    eyebrow: 'Google Ads Management',
    title: 'Capture High-Intent Commercial Search Demand on Google.',
    tagline: 'Precision Search campaigns, Performance Max (PMax) & Enhanced Conversion tracking.',
    description: 'Capture active buyers at the exact moment they search for your solutions. We architect Google Search, Performance Max, and YouTube campaigns with aggressive negative keyword filtration and strict target CPA limits.',
    contactServiceParam: 'google-ads',
    accent: '#38bdf8',
    heroStats: [
      { label: 'Intent Targeting', value: 'High Commercial' },
      { label: 'Waste Mitigation', value: '1,000+ Negatives' },
      { label: 'Campaign Engine', value: 'Search & PMax' },
      { label: 'Conversion Tracking', value: 'Enhanced Conversions' },
    ],
    problems: {
      headline: 'Most Google Ads Budgets Are Burned on Irrelevant, Non-Commercial Clicks.',
      items: [
        {
          title: 'Broad Match Keyword Waste',
          desc: 'Google spending your budget on irrelevant searches like "free download" or "job vacancy" instead of paying commercial customers.',
        },
        {
          title: 'Unoptimized Performance Max',
          desc: 'Black-box PMax campaigns burning your budget on junk mobile app display placements rather than active searchers.',
        },
        {
          title: 'Landing Pages That Don’t Match Intent',
          desc: 'Sending paid search traffic to a generic homepage where visitors cannot find the specific service they searched for, resulting in instant bounces.',
        },
        {
          title: 'Missing Conversion Value Bidding',
          desc: 'Failing to send revenue values back to Google, causing Smart Bidding to optimize for low-value clicks rather than profit.',
        },
      ],
    },
    solution: {
      headline: 'Tightly-Themed Search Intent Paired With Dedicated Landing Pages.',
      description: 'We position your brand directly in front of ready-to-buy customers by matching high-intent search queries to dedicated service landing pages with strict negative keyword shielding.',
      pillars: [
        {
          title: 'Intent-Driven Keyword Grouping',
          desc: 'Isolate high-intent commercial keywords into tightly-themed ad groups with exact ad copy alignment for 9/10 Quality Scores.',
        },
        {
          title: 'Aggressive Negative Keyword Shields',
          desc: 'Deploy extensive global negative keyword lists to prevent your daily budget from being drained by informational or career searches.',
        },
        {
          title: 'Google Enhanced Conversions Tracking',
          desc: 'First-party conversion hashing that trains Google machine learning toward higher-value transactions and validated customer leads.',
        },
      ],
    },
    capabilities: [
      { title: 'High-Intent Search Campaigns', desc: 'Precision keyword matching targeting bottom-of-funnel commercial searches with zero budget waste.' },
      { title: 'Performance Max (PMax) Architecture', desc: 'Asset-group segmented PMax campaigns leveraging Google AI across Search, YouTube, Gmail, and Maps.' },
      { title: 'Ad Copy & Asset Extensions', desc: 'Dynamic keyword insertion (DKI), structured callouts, sitelinks, and local phone number extensions.' },
      { title: 'Bid Strategy Optimization', desc: 'Discipline transitions from Manual CPC to Target CPA and Target ROAS once conversion volume matures.' },
    ],
    deliverables: [
      'Comprehensive Google Ads account architecture and tracking setup',
      'Curated keyword research matrix categorized by commercial search intent',
      'High-converting ad copy variations with sitelink and callout extensions',
      'Bi-weekly search term audits and negative keyword filtration management',
    ],
    audience: [
      { title: 'B2B & Enterprise Services', desc: 'Software firms, industrial suppliers, and corporate services targeting corporate decision makers.' },
      { title: 'Professional & Local Practices', desc: 'Specialized clinics, law firms, and financial advisors capturing emergency or local search demand.' },
      { title: 'E-commerce & Retailers', desc: 'Online brands capturing Google Shopping searchers comparing specific product models.' },
      { title: 'SaaS Platforms', desc: 'Software companies capturing competitor-alternative and software-category search queries.' },
    ],
    useCases: [
      { category: 'B2B', title: 'Enterprise Software Search', desc: 'Targeting searches like "custom erp software company" with dedicated landing page routing.' },
      { category: 'E-commerce', title: 'Google Shopping & PMax', desc: 'Automated product feed synchronization displaying price, ratings, and instant buy links.' },
      { category: 'Local Services', title: 'Commercial Emergency Search', desc: 'Call-only and click-to-call mobile ads targeting urgent local technical and repair requirements.' },
    ],
    techStack: ['Google Ads', 'Performance Max', 'Google Tag Manager', 'GA4 Enhanced Conversions', 'Google Merchant Center'],
    faqs: [
      {
        q: 'How do you prevent money from being wasted on irrelevant clicks?',
        a: 'We implement daily search query auditing, strict exact/phrase match hierarchies, and maintain over 1,000 global negative keywords to exclude non-commercial traffic.',
      },
      {
        q: 'How long before Google Ads campaigns produce qualified leads?',
        a: 'Unlike SEO which takes months to build organic ranking, Google Ads can begin delivering targeted commercial traffic and inquiries within 24 to 48 hours of campaign launch.',
      },
      {
        q: 'Why should search ads link to specific service landing pages instead of our homepage?',
        a: 'When an ad links directly to a page answering the exact keyword query, conversion rates increase by over 200% and Google Quality Scores rise, which reduces your actual cost-per-click.',
      },
      {
        q: 'Can we track phone calls generated from Google Ads?',
        a: 'Yes. We configure Google call tracking extensions and dynamic website number insertion to attribute phone inquiries directly to specific campaigns.',
      },
      {
        q: 'Do you manage Google Merchant Center for e-commerce shopping feeds?',
        a: 'Yes. We configure and troubleshoot Google Merchant Center feeds, resolve product disapproval errors, and launch optimized Shopping asset groups.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Solutions', title: 'High-Converting Landing Pages', href: '/solutions/web-development', desc: 'Match your paid search clicks to sub-second commercial landing pages.' },
      { division: 'NextDigi Growth', title: 'SEO Architecture', href: '/growth/seo', desc: 'Pair paid search with long-term compounding organic search engine dominance.' },
      { division: 'NextDigi Growth', title: 'Attribution & Analytics', href: '/growth/analytics', desc: 'Verify exact revenue return and customer lifetime value from search clicks.' },
    ],
  },

  'social-media': {
    slug: 'social-media',
    division: 'NextDigi Growth',
    divisionPath: '/growth',
    eyebrow: 'Social Media Strategy',
    title: 'Social Media Strategy & Creative Production Built for Authority.',
    tagline: 'Brand narrative, visual asset production & high-energy short-form video clips.',
    description: 'Build an authoritative social presence that commands commercial trust. We produce compelling graphic designs, educational carousels, and high-energy short-form video hooks that turn passive followers into paying clients.',
    contactServiceParam: 'social-media',
    accent: '#ec4899',
    heroStats: [
      { label: 'Creative Content', value: 'Graphics & Video' },
      { label: 'Publishing Cadence', value: 'Scheduled Calendar' },
      { label: 'Brand Strategy', value: 'Authority Positioning' },
      { label: 'Community Support', value: 'Active Moderation' },
    ],
    problems: {
      headline: 'Inconsistent, Generic Social Posts Fail to Generate Real Commercial Inquiries.',
      items: [
        {
          title: 'Inconsistent Publishing',
          desc: 'Posting erratically whenever someone remembers, causing algorithms to suppress your reach and signaling inactivity to prospects.',
        },
        {
          title: 'Generic Stock Visuals',
          desc: 'Using low-effort Canva templates that look identical to every competitor and fail to establish premium brand trust.',
        },
        {
          title: 'Zero Lead Capture Strategy',
          desc: 'Accumulating vanity likes that never translate into customer inquiries, phone calls, or sales pipeline progression.',
        },
        {
          title: 'Slow Comment & Message Response',
          desc: 'Leaving hot prospect questions unanswered for 24+ hours on post comments and messaging inboxes, losing deals to competitors.',
        },
      ],
    },
    solution: {
      headline: 'Editorial Strategy Focused on Authority, Engagement, and Conversion.',
      description: 'We position your brand as the definitive authority in your space through disciplined weekly content calendars, custom typographic graphics, and strategic customer conversion funnels.',
      pillars: [
        {
          title: 'Structured Content Pillars',
          desc: 'Balance educational breakdowns, client proof demonstrations, and direct commercial offers to keep audience interest high.',
        },
        {
          title: 'Short-Form Video Production',
          desc: 'High-retention Reels, TikToks, and Shorts with dynamic animated captions, sound design, and persuasive problem-solving hooks.',
        },
        {
          title: 'Active Inbound Lead Routing',
          desc: 'Monitor comments and direct messages proactively, routing prospective client inquiries immediately into your sales pipeline.',
        },
      ],
    },
    capabilities: [
      { title: 'Monthly Editorial Calendars', desc: 'Pre-planned content calendars with complete visual assets, copy, and hashtag strategies ready for review.' },
      { title: 'Custom Brand Visual Assets', desc: 'Typographic carousels, infographics, and promotional static assets styled to your brand guidelines.' },
      { title: 'Short-Form Video Editing', desc: 'Vertical video assembly with dynamic subtitle overlays, b-roll footage, and sound design for social reels.' },
      { title: 'Community & Comment Moderation', desc: 'Prompt brand representation answering product questions and filtering spam from public posts.' },
    ],
    deliverables: [
      'Monthly editorial content calendar scheduled across Facebook, Instagram, and LinkedIn',
      'Custom-designed social templates and master branding style guidelines',
      'Short-form vertical video assets formatted for maximum mobile retention',
      'Monthly audience growth, engagement velocity, and referral traffic reporting',
    ],
    audience: [
      { title: 'B2B & Tech Companies', desc: 'Firms needing LinkedIn and social authority to attract enterprise talent and B2B clients.' },
      { title: 'E-commerce Brands', desc: 'Retailers building organic lifestyle communities that drive recurring repeat orders.' },
      { title: 'Founders & Thought Leaders', desc: 'Executives building personal brand credibility and speaking authority.' },
      { title: 'Professional Services', desc: 'Clinics, agencies, and financial firms establishing local community trust.' },
    ],
    useCases: [
      { category: 'B2B', title: 'LinkedIn Authority Series', desc: 'Technical case study carousels and founder insights establishing market leadership in software.' },
      { category: 'Retail', title: 'Product Launch Campaign', desc: 'Multi-week countdown teaser reels, customer unboxing clips, and launch day live promotions.' },
      { category: 'Engagement', title: 'Interactive Educational Content', desc: 'Actionable tips and industry myth-busting carousels that drive high organic saves and shares.' },
    ],
    techStack: ['Adobe Photoshop / Illustrator', 'Adobe Premiere / After Effects', 'CapCut Pro', 'Meta Business Suite', 'LinkedIn Page Manager'],
    faqs: [
      {
        q: 'Do you create original video content or just static graphics?',
        a: 'We produce both: high-impact typographic carousels and dynamic short-form vertical video reels with captions, pacing, and sound design.',
      },
      {
        q: 'Do we have approval before posts go live?',
        a: 'Yes. We deliver your monthly editorial calendar 7 days in advance for your team to review, comment on, and approve before any asset is published.',
      },
      {
        q: 'Which social media channels do you support?',
        a: 'We actively manage Facebook, Instagram, LinkedIn, YouTube Shorts, and TikTok based on where your ideal customers spend their time.',
      },
      {
        q: 'How does social media support our paid ad campaigns?',
        a: 'A credible, active social profile provides crucial social proof: when prospects see your ads, over 40% inspect your social profile before deciding to purchase.',
      },
      {
        q: 'Can you route comments and inquiries into our CRM?',
        a: 'Yes. We monitor incoming questions and direct hot prospect details into your NextDigiHome CRM pipeline for sales team follow-up.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Growth', title: 'Meta Ads Management', href: '/growth/meta-ads', desc: 'Amplify your top-performing organic social posts with paid ad budget.' },
      { division: 'NextDigi AI', title: 'Conversational Chatbots', href: '/ai/ai-agents', desc: 'Automate instant replies to incoming social comments and direct messages.' },
      { division: 'NextDigi Solutions', title: 'Web Development', href: '/solutions/web-development', desc: 'Direct your social media traffic to a high-converting digital platform.' },
    ],
  },

  'seo': {
    slug: 'seo',
    division: 'NextDigi Growth',
    divisionPath: '/growth',
    eyebrow: 'Technical SEO',
    title: 'Technical SEO & Search Architecture That Compounds Authority.',
    tagline: 'Technical audits, Core Web Vitals optimization, semantic topic clusters & structured JSON-LD schema.',
    description: 'Build sustainable, compounding organic search traffic. We optimize technical site architectures, schema markup, semantic content clusters, and Core Web Vitals to rank for revenue-generating commercial keywords.',
    contactServiceParam: 'seo',
    accent: '#8b5cf6',
    heroStats: [
      { label: 'Technical Health Target', value: '100% Crawlable' },
      { label: 'Structured Schema', value: 'Rich Snippets' },
      { label: 'Core Web Vitals', value: 'Sub-second LCP' },
      { label: 'Architecture Model', value: 'Topic Clusters' },
    ],
    problems: {
      headline: 'Low Organic Visibility Traps You in an Endless Cycle of Paid Ad Spend.',
      items: [
        {
          title: 'Total Dependence on Paid Ads',
          desc: 'The moment you pause your ad budget, your website traffic drops to zero because you have zero compounding organic search presence.',
        },
        {
          title: 'Severe Core Web Vitals Penalties',
          desc: 'Slow JavaScript execution and cumulative layout shifts (CLS) causing Google to downgrade your ranking in favor of faster competitors.',
        },
        {
          title: 'Missing Structured Schema Markup',
          desc: 'Search engines unable to parse your services, products, pricing, and FAQ snippets, missing out on rich search result cards.',
        },
        {
          title: 'Keyword Cannibalization & Poor Structure',
          desc: 'Multiple disorganized pages competing for the same search term, diluting domain authority and confusing search engine crawlers.',
        },
      ],
    },
    solution: {
      headline: 'Code-Level Technical SEO Built Directly Into Next.js Applications.',
      description: 'We treat SEO as a technical engineering discipline: we build semantic DOM hierarchies, implement comprehensive JSON-LD schemas, and optimize edge caching for maximum crawl budget efficiency.',
      pillars: [
        {
          title: 'Sub-Second Core Web Vitals',
          desc: 'Eliminate render-blocking scripts, optimize responsive images, and pre-render critical routes for perfect 100/100 Lighthouse performance.',
        },
        {
          title: 'Semantic Schema & Rich Snippets',
          desc: 'Implement deep structured data for Organization, Services, Products, FAQs, and Breadcrumbs to dominate Google search result real estate.',
        },
        {
          title: 'Interlinked Topic Cluster Architecture',
          desc: 'Organize related content into authoritative silos that demonstrate topical depth and climb search engine results pages.',
        },
      ],
    },
    capabilities: [
      { title: 'Code-Level Technical SEO Audits', desc: 'Identifies crawl bottlenecks, canonical misconfigurations, broken redirect chains, and indexing barriers.' },
      { title: 'Commercial Keyword Research', desc: 'Identifies high-intent buyer searches with realistic ranking difficulty to drive commercial inquiries.' },
      { title: 'Structured Schema.org Markup', desc: 'Machine-readable JSON-LD schemas providing Google with clear entities, relationships, and product attributes.' },
      { title: 'Dynamic XML Sitemaps & Robots.txt', desc: 'Automated sitemap generation keeping search engines immediately updated as new pages and products launch.' },
    ],
    deliverables: [
      'Comprehensive Technical SEO audit with prioritized code remediation checklist',
      'Commercial keyword mapping matrix aligned with your service landing pages',
      'Production structured schema markup implemented across all dynamic page templates',
      'Monthly search performance reporting detailing impressions, clicks, rankings, and indexation',
    ],
    audience: [
      { title: 'Technology & SaaS Companies', desc: 'Software platforms looking to capture category search terms and lower customer acquisition costs.' },
      { title: 'E-commerce Storefronts', desc: 'Retailers competing for high-volume product category and brand search queries.' },
      { title: 'B2B & Professional Practices', desc: 'Specialized firms aiming to rank on Google Page 1 for commercial service keywords.' },
      { title: 'Content & Publishing Hubs', desc: 'Editorial portals maximizing crawl efficiency and Google Discover inclusion.' },
    ],
    useCases: [
      { category: 'SaaS', title: 'Software Category SEO', desc: 'Optimizes commercial search architecture to rank for "workshop erp software" and "b2b billing platform".' },
      { category: 'E-commerce', title: 'Product Catalog Indexation', desc: 'Automated category breadcrumb schemas and product availability feeds generating rich Google shopping cards.' },
      { category: 'B2B', title: 'Local Commercial Authority', desc: 'Ranks specialized corporate engineering services for regional and international enterprise searchers.' },
    ],
    techStack: ['Google Search Console', 'Ahrefs / Semrush', 'Next.js Metadata API', 'Schema.org JSON-LD', 'Screaming Frog'],
    faqs: [
      {
        q: 'How long does it take to see organic search ranking improvements?',
        a: 'Technical SEO fixes and crawl optimizations often yield noticeable indexation and ranking gains within 4 to 8 weeks, while competitive commercial keywords typically mature over 3 to 6 months of compounding authority.',
      },
      {
        q: 'How does Next.js server-side rendering help with SEO?',
        a: 'Next.js pre-renders complete HTML on the server, meaning Google crawlers receive fully structured content instantly without having to execute complex client-side JavaScript, ensuring 100% reliable indexation.',
      },
      {
        q: 'Do you engage in black-hat or risky link-building practices?',
        a: 'No. We strictly adhere to Google Search Essentials: we focus on solid technical architecture, sub-second speed, high-value content, and ethical digital PR, protecting your domain from algorithm penalties.',
      },
      {
        q: 'Can you fix indexing issues on our current website?',
        a: 'Yes. We audit your Google Search Console coverage reports to identify and resolve "Crawled - currently not indexed", 404 redirect errors, canonical mismatches, and blocked resources.',
      },
      {
        q: 'Will SEO continue to deliver results after initial optimization?',
        a: 'Yes. Unlike paid ads that stop the second you stop paying, technical SEO and authoritative content remain permanent digital assets that generate compounding search traffic for years.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Solutions', title: 'Web Development Services', href: '/solutions/web-development', desc: 'Build an ultra-fast website engineered with SEO best practices from Day 1.' },
      { division: 'NextDigi Growth', title: 'Google Ads Management', href: '/growth/google-ads', desc: 'Capture instant search traffic with Google Ads while your organic SEO matures.' },
      { division: 'NextDigi Growth', title: 'Analytics & Attribution', href: '/growth/analytics', desc: 'Measure the exact commercial inquiries and revenue generated by organic search.' },
    ],
  },

  'analytics': {
    slug: 'analytics',
    division: 'NextDigi Growth',
    divisionPath: '/growth',
    eyebrow: 'Marketing Attribution',
    title: 'Server-Side Analytics & Precision Attribution Tracking.',
    tagline: 'Google Analytics 4, Server-Side GTM, Meta CAPI & Looker Studio executive dashboards.',
    description: 'Eliminate blind ad spending and unverified marketing claims. We build server-side tracking pipelines, Google Analytics 4 architectures, and custom Looker Studio dashboards so you know exactly which marketing dollar generates real net profit.',
    contactServiceParam: 'analytics',
    accent: '#f59e0b',
    heroStats: [
      { label: 'Attribution Fidelity', value: '100% Server-Side' },
      { label: 'Reporting Hub', value: 'Live Looker Studio' },
      { label: 'Privacy Compliance', value: 'Strict First-Party' },
      { label: 'Event Tracking', value: 'Enhanced E-commerce' },
    ],
    problems: {
      headline: 'Browser Ad-Blockers & Privacy Restrictions Blind Modern Marketing Analytics.',
      items: [
        {
          title: 'Missing Conversion Data',
          desc: 'Browser ad-blockers and iOS privacy restrictions causing standard client-side analytics to miss up to 30% of actual customer orders.',
        },
        {
          title: 'Disconnected Ad Spend & Revenue',
          desc: 'Marketing teams unable to verify whether high-spend Facebook ad campaigns actually generated profitable customer purchases.',
        },
        {
          title: 'Confusing GA4 Configurations',
          desc: 'Default Google Analytics 4 installations showing confusing event lists rather than clear conversion funnels and revenue attribution.',
        },
        {
          title: 'Single-Touch Attribution Bias',
          desc: 'Crediting 100% of a sale to the final click, ignoring the top-of-funnel educational videos and search campaigns that created the demand.',
        },
      ],
    },
    solution: {
      headline: 'First-Party Server-Side Tracking for Absolute Measurement Fidelity.',
      description: 'We deploy server-side Google Tag Manager (sGTM) and direct Conversions API pipelines that capture transactions at the server level, providing clean, tamper-proof customer attribution.',
      pillars: [
        {
          title: 'Server-Side Google Tag Manager (sGTM)',
          desc: 'Process tracking events on your own cloud subdomain (data.yourdomain.com), bypassing browser ad-blockers and preserving cookie lifespans.',
        },
        {
          title: 'Multi-Touch Attribution Modeling',
          desc: 'Track the complete buyer journey from first discovery ad impression through to checkout and repeat contract renewals.',
        },
        {
          title: 'Executive Looker Studio Dashboards',
          desc: 'Consolidated real-time dashboards unifying Meta ad spend, Google search costs, e-commerce revenue, and net profit margins.',
        },
      ],
    },
    capabilities: [
      { title: 'Server-Side GTM Cloud Setup', desc: 'Deploys dedicated container instances on Google Cloud or AWS for secure first-party data dispatching.' },
      { title: 'GA4 Enhanced E-commerce Tracking', desc: 'Tracks view_item, add_to_cart, begin_checkout, and purchase events with verified order IDs.' },
      { title: 'Meta CAPI & Google Offline Conversions', desc: 'Feeds validated backend transactions back to ad platforms to train smart bidding algorithms on real revenue.' },
      { title: 'Anomaly & Discrepancy Alerts', desc: 'Automated notification alerts if checkout tracking drops or payment webhook verification fails.' },
    ],
    deliverables: [
      'Server-side Google Tag Manager container running on custom cloud subdomain',
      'Verified Google Analytics 4 Enhanced E-commerce and lead event implementation',
      'Live executive Looker Studio dashboard connecting ad spend with gross revenue',
      'Comprehensive tagging taxonomy and data layer documentation for your developers',
    ],
    audience: [
      { title: 'E-commerce & Retail Brands', desc: 'Storefronts managing substantial monthly ad budgets requiring accurate ROAS measurement.' },
      { title: 'B2B & Lead Generation', desc: 'Companies needing to track which ad campaigns deliver high-ticket sales vs unqualified tire-kickers.' },
      { title: 'SaaS Platforms', desc: 'Subscription products measuring free trial to paid subscriber conversion funnels.' },
      { title: 'Marketing Directors & CMOs', desc: 'Executives who need transparent, auditable reporting to justify marketing investments to board members.' },
    ],
    useCases: [
      { category: 'E-commerce', title: 'Revenue Reconciliation Dashboard', desc: 'Cross-checks Meta ad reported revenue against actual bank and bKash deposits in Looker Studio.' },
      { category: 'B2B', title: 'Multi-Touch Lead Tracking', desc: 'Attributes high-value closed enterprise deals back to the original Google Search click that started the relationship.' },
      { category: 'SaaS', title: 'Funnel Drop-Off Analysis', desc: 'Pinpoints the exact onboarding step where trial users drop off to guide product UX improvements.' },
    ],
    techStack: ['Google Tag Manager (Server & Web)', 'Google Analytics 4', 'Looker Studio', 'BigQuery', 'Meta Conversions API', 'Cloudflare Workers'],
    faqs: [
      {
        q: 'Why is server-side tracking superior to standard client-side tracking pixels?',
        a: 'Server-side tracking processes events on your own cloud subdomain rather than in the visitor browser. This completely bypasses browser ad-blockers, extends cookie lifespans on Apple Safari/iOS, speeds up page load times, and protects customer PII data.',
      },
      {
        q: 'Can Looker Studio combine data from Facebook, Google Ads, and our database?',
        a: 'Yes. We engineer unified Looker Studio dashboards that blend ad platform costs with real sales revenue from your database, giving you a live view of true Blended ROAS and Net Profit.',
      },
      {
        q: 'How do you prevent duplicate conversion tracking?',
        a: 'We implement unique transaction event IDs. When both a browser pixel and server-side CAPI event fire, ad platforms automatically deduplicate the event, maintaining 100% accurate metrics.',
      },
      {
        q: 'Does server-side tracking require ongoing cloud server hosting fees?',
        a: 'Deploying server-side GTM typically costs between $10 to $25 per month on Google Cloud or AWS, which easily pays for itself by recovering 20-30% of lost conversion data.',
      },
      {
        q: 'Can we track offline phone sales or bank transfers back to the original ad click?',
        a: 'Yes. We set up Google and Meta Offline Conversion uploads: when a deal closes via bank transfer or phone, the transaction is uploaded with the customer click ID to attribute the revenue accurately.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Growth', title: 'Meta Ads Management', href: '/growth/meta-ads', desc: 'Feed accurate server-side conversion signals to maximize Meta algorithm efficiency.' },
      { division: 'NextDigi Growth', title: 'Google Ads Management', href: '/growth/google-ads', desc: 'Implement Google Enhanced Conversions to scale search campaign profitability.' },
      { division: 'NextDigi Solutions', title: 'E-commerce Storefronts', href: '/solutions/ecommerce', desc: 'Build an ultra-fast store with native data layer events built into the checkout.' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(growthServicesData).map((service) => ({ service }));
}

type PageProps = {
  params: Promise<{ service: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const data = growthServicesData[service];

  if (!data) {
    return {
      title: 'Growth Service Not Found | NextDigi Growth',
      description: 'The requested growth strategy could not be found.',
    };
  }

  return generatePageMetadata({
    title: `${data.title} | ${data.division}`,
    description: `${data.tagline} ${data.description}`,
    path: `/growth/${service}`,
  });
}

export default async function GrowthServiceDetailPage({ params }: PageProps) {
  const { service } = await params;
  const data = growthServicesData[service];

  if (!data) {
    notFound();
  }

  return <ServiceLandingPage data={data} />;
}
