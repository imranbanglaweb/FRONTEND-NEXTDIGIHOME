import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/app/utils/seo';
import ServiceLandingPage, { type ServiceLandingPageData } from '@/app/components/ServiceLandingPage';

const solutionsData: Record<string, ServiceLandingPageData> = {
  'web-development': {
    slug: 'web-development',
    division: 'NextDigi Solutions',
    divisionPath: '/solutions',
    eyebrow: 'Web Development',
    title: 'Websites & Digital Platforms Built for Business.',
    tagline: 'High-performance websites, corporate hubs & web portals engineered for measurable conversion.',
    description: 'We design and develop fast, responsive, and scalable web experiences tailored to your business requirements. No bloated page-builders — only clean TypeScript, Next.js, and hardened architecture.',
    contactServiceParam: 'web-development',
    accent: '#00d4aa',
    heroStats: [
      { label: 'Core Web Vitals Target', value: 'Sub-second LCP' },
      { label: 'Code Architecture', value: 'Next.js 16 + TS' },
      { label: 'SEO & Structured Data', value: '100% Schema' },
      { label: 'Intellectual Property', value: '100% Transferred' },
    ],
    problems: {
      headline: 'Your Website Should Not Hold Your Business Back.',
      items: [
        {
          title: 'Sluggish Load Times',
          desc: 'Heavy plugins and generic WordPress themes create 5+ second load times, causing 40%+ of visitors to bounce before seeing your offer.',
        },
        {
          title: 'Poor Mobile Experience',
          desc: 'Clunky navigation, unreadable text, and misaligned touch targets on mobile devices ruin customer trust and destroy conversion rates.',
        },
        {
          title: 'Rigid Template Limits',
          desc: 'Pre-made templates fail when you need custom business logic, CRM routing, localized payment checkouts, or ERP sync.',
        },
        {
          title: 'Low Organic Visibility',
          desc: 'Missing schema markup, messy DOM hierarchies, and poor Core Web Vitals keep your business invisible on search engines.',
        },
      ],
    },
    solution: {
      headline: 'Digital Experiences Engineered Around Your Commercial Goals.',
      description: 'We build digital platforms around your business goals, user workflows, and revenue targets — not just around a predefined template. From sub-second page rendering to automated lead capture, our websites drive tangible bottom-line growth.',
      pillars: [
        {
          title: 'Server-Side Rendering (SSR) & Edge Caching',
          desc: 'Instant page delivery with Next.js App Router and global edge CDN caching for seamless mobile browsing.',
        },
        {
          title: 'Conversion-Focused Information Architecture',
          desc: 'Clear visual hierarchies, compelling value propositions, and frictionless CTA funnels that maximize inquiries.',
        },
        {
          title: 'Search Engine Dominance',
          desc: 'Built-in semantic HTML5, clean JSON-LD structured data, dynamic XML sitemaps, and OpenGraph social previews.',
        },
      ],
    },
    capabilities: [
      { title: 'Corporate & Brand Platforms', desc: 'Authoritative digital presences that establish credibility for enterprise clients and investors.' },
      { title: 'High-Converting Landing Pages', desc: 'Focused campaign destinations designed specifically for Meta and Google Ads conversion.' },
      { title: 'Headless CMS Architecture', desc: 'Effortless visual content authoring decoupled from the frontend for rapid updates without developer reliance.' },
      { title: 'API & Marketing Integrations', desc: 'Direct webhook connections to your CRM, WhatsApp Business API, Meta Pixel CAPI, and Google Analytics 4.' },
    ],
    deliverables: [
      'Production-deployed Next.js application with complete TypeScript source code',
      'Fully responsive UI across mobile (375px+), tablet, and desktop viewports',
      'Structured JSON-LD schema markup for Organization, WebSite, and BreadcrumbList',
      'Automated CI/CD deployment pipeline with zero-downtime releases',
      'Comprehensive developer handoff documentation and ongoing maintenance access',
    ],
    audience: [
      { title: 'Growing B2B Companies', desc: 'Organizations that need an authoritative web presence to win high-ticket enterprise contracts.' },
      { title: 'Funded Startups & Founders', desc: 'Fast-moving teams requiring modern web hubs that validate product-market fit quickly.' },
      { title: 'Professional Service Firms', desc: 'Consultancies, legal teams, and healthcare practices needing verified credibility and lead capture.' },
      { title: 'Commercial Brands', desc: 'Retailers and manufacturers expanding direct-to-consumer digital channels.' },
    ],
    useCases: [
      { category: 'Enterprise', title: 'Corporate Investor Hub', desc: 'High-trust multi-page corporate website with executive bios, financial disclosures, and press releases.' },
      { category: 'Growth', title: 'PPC Lead Funnel', desc: 'Laser-focused paid advertising landing pages with localized form validation and sub-second load times.' },
      { category: 'Media', title: 'Content & Publication Portal', desc: 'Fast editorial publishing hub with automated newsletter capture and search engine indexing.' },
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker'],
    liveProduct: {
      title: 'NextDigi Commerce',
      type: 'Live E-commerce Platform',
      url: 'https://commerce.nextdigihome.com/',
      desc: 'See our high-performance web architecture in action with instant catalog filtering, dynamic checkout, and sub-second page transitions.',
    },
    faqs: [
      {
        q: 'How long does a web development project take?',
        a: 'Standard business platforms typically launch within 3 to 6 weeks, while large corporate or multi-region websites take 6 to 10 weeks depending on custom integrations.',
      },
      {
        q: 'Do we own the source code upon project completion?',
        a: 'Yes. 100% of all custom source code, design assets, and deployment keys are transferred to your organization upon project completion. There are no recurring developer lock-in fees.',
      },
      {
        q: 'Can our marketing team update content without developers?',
        a: 'Yes. We integrate modern Headless CMS systems or intuitive admin panels allowing your marketing team to create blog posts, edit pages, and update media without writing any code.',
      },
      {
        q: 'How do you ensure fast page speeds and high Google Core Web Vitals?',
        a: 'We engineer with Next.js server-side rendering, automated image optimization (AVIF/WebP), responsive asset sizing, and zero bloated script bundles to ensure sub-second Largest Contentful Paint (LCP).',
      },
      {
        q: 'Do you provide maintenance and security updates after launch?',
        a: 'Yes. We offer dedicated SLA maintenance agreements covering 24/7 uptime monitoring, server security updates, daily database backups, and ongoing developer hours.',
      },
    ],
    crossSell: [
      { division: 'NextDigi AI', title: 'AI Chatbots & Agents', href: '/ai/ai-agents', desc: 'Add 24/7 lead qualification chatbots to your new web platform.' },
      { division: 'NextDigi Growth', title: 'Meta & Google Ads', href: '/growth/meta-ads', desc: 'Drive high-intent commercial buyers directly to your high-converting landing pages.' },
      { division: 'NextDigi Solutions', title: 'Web Applications', href: '/solutions/web-application', desc: 'Upgrade public websites into full operational customer dashboards.' },
    ],
  },

  'web-application': {
    slug: 'web-application',
    division: 'NextDigi Solutions',
    divisionPath: '/solutions',
    eyebrow: 'Web Applications',
    title: 'Web Applications Engineered for Mission-Critical Operations.',
    tagline: 'Custom dashboards, role-based customer portals & automated operational workflows.',
    description: 'Transform manual spreadsheets and disconnected tools into unified, high-concurrency cloud applications. We build secure, role-based web platforms engineered to handle complex business logic and high transaction volumes.',
    contactServiceParam: 'web-application',
    accent: '#38bdf8',
    heroStats: [
      { label: 'Concurrency Engine', value: '10k+ Req/Sec' },
      { label: 'Security Standard', value: 'RBAC & Auth' },
      { label: 'Database Architecture', value: 'PostgreSQL / Redis' },
      { label: 'API Protocols', value: 'REST & WebSockets' },
    ],
    problems: {
      headline: 'Disconnected Spreadsheets & Fragmented Tools Cost You Thousands in Lost Time.',
      items: [
        {
          title: 'Spreadsheet Bottlenecks',
          desc: 'Critical business numbers buried across 20+ shared Google Sheets with no audit trails, version control, or access security.',
        },
        {
          title: 'Manual Data Re-entry',
          desc: 'Staff spending hours manually copy-pasting customer orders, invoice details, and tracking numbers across disconnected systems.',
        },
        {
          title: 'Zero Role-Based Access Control',
          desc: 'Staff either have access to all sensitive business data or none, creating internal security vulnerabilities and compliance risks.',
        },
        {
          title: 'Inability to Scale Operations',
          desc: 'Off-the-shelf software charges exorbitant per-seat monthly license fees that penalize you as your team grows.',
        },
      ],
    },
    solution: {
      headline: 'Proprietary Cloud Applications Built for Your Exact Business Logic.',
      description: 'We engineer custom web applications that mirror your company’s organizational structure, operational hierarchy, and approval chains with zero per-user licensing fees.',
      pillars: [
        {
          title: 'Granular Role-Based Permissions (RBAC)',
          desc: 'Define custom access tiers for executives, branch managers, technicians, and external clients with immutable audit logs.',
        },
        {
          title: 'Automated Multi-Stage Workflows',
          desc: 'Automate requisition approvals, invoice generation, customer notification triggers, and live status updates.',
        },
        {
          title: 'Real-Time Operational Intelligence',
          desc: 'Consolidated executive dashboards displaying daily revenues, department KPIs, and inventory turnover in real time.',
        },
      ],
    },
    capabilities: [
      { title: 'Interactive Admin Dashboards', desc: 'Fast, responsive management consoles with real-time filtering, chart visualizations, and CSV exports.' },
      { title: 'Customer & Partner Portals', desc: 'Secure self-serve portals where clients track project progress, submit tickets, and download invoices.' },
      { title: 'Automated Billing & Invoicing', desc: 'Automated recurring invoice generation, digital signature workflows, and payment gateway reconciliation.' },
      { title: 'Legacy Data Migration', desc: 'Clean, lossless data extraction and normalization from legacy database systems into modern cloud architectures.' },
    ],
    deliverables: [
      'Full-stack web application with complete source code repository',
      'Role-based authentication system with secure session token management',
      'Configured relational database schema with automated daily point-in-time backups',
      'Interactive Swagger / Postman API documentation for third-party integrations',
      'Staff training documentation and administrator operational runbooks',
    ],
    audience: [
      { title: 'Mid-Market Enterprises', desc: 'Businesses outgrowing off-the-shelf tools and needing centralized operational control.' },
      { title: 'Logistics & Fleet Operators', desc: 'Transportation, dispatch, and delivery networks requiring real-time tracking.' },
      { title: 'Financial & Professional Services', desc: 'Firms requiring strict customer portal data segregation and audit logging.' },
      { title: 'Healthcare & Clinical Services', desc: 'Providers managing patient records, appointments, and diagnostic reporting.' },
    ],
    useCases: [
      { category: 'Operations', title: 'Internal Operations ERP', desc: 'Multi-branch management platform unifying purchase orders, staff timecards, and warehouse stock.' },
      { category: 'Client Care', title: 'Self-Serve Client Portal', desc: 'Secure customer hub for viewing contracts, submitting support tickets, and approving design deliverables.' },
      { category: 'Finance', title: 'Automated Billing Gateway', desc: 'Custom invoice reconciliation engine integrating bKash, bank transfers, and international payment webhooks.' },
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js / Express', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker'],
    liveProduct: {
      title: 'Garibondhu360',
      type: 'Workshop & Fleet ERP Suite',
      url: 'https://garibondhu360.nextdigihome.com/',
      desc: 'Explore our multi-user workshop operations web app featuring job-card tracking, barcode inventory, and automated customer SMS status.',
    },
    faqs: [
      {
        q: 'Why should we invest in custom web application development over monthly SaaS tools?',
        a: 'Custom web applications eliminate recurring monthly per-seat licensing costs, protect your unique proprietary business advantage, and adapt 100% to your workflows instead of forcing compromises.',
      },
      {
        q: 'How secure is our company and customer data?',
        a: 'We implement industry standard security: cryptographic password hashing (bcrypt/argon2), JWT token revocation, CSRF protection, SQL injection prevention via parameterized ORMs, and encrypted database connections.',
      },
      {
        q: 'Can the application integrate with our existing software and accounting tools?',
        a: 'Yes. We build custom REST or GraphQL API connectors that synchronize live data with QuickBooks, Tally, Zoho, SAP, or custom legacy databases.',
      },
      {
        q: 'Can mobile apps share the same backend as the web application?',
        a: 'Yes. We architect centralized API backends so your web application, iOS app, and Android app share the same database and real-time business rules.',
      },
      {
        q: 'How do you handle data backups and disaster recovery?',
        a: 'We configure automated daily encrypted database snapshots with off-site replication, enabling rapid point-in-time recovery in under 30 minutes in case of emergency.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Solutions', title: 'Custom Software', href: '/solutions/custom-software', desc: 'Deep-dive into bespoke enterprise ERP and database architecture.' },
      { division: 'NextDigi AI', title: 'Workflow Automation', href: '/ai/ai-automation', desc: 'Automate background data sync between your web app and external tools.' },
      { division: 'NextDigi Solutions', title: 'Mobile Applications', href: '/solutions/mobile-app', desc: 'Extend your web application into cross-platform mobile apps for field staff.' },
    ],
  },

  'ecommerce': {
    slug: 'ecommerce',
    division: 'NextDigi Solutions',
    divisionPath: '/solutions',
    eyebrow: 'E-commerce Engineering',
    title: 'Custom E-commerce Platforms Engineered for Growth.',
    tagline: 'High-converting storefronts, multi-channel payment routing & automated courier logistics.',
    description: 'Eliminate clunky Shopify/WooCommerce template limitations. We build custom headless commerce platforms engineered for rapid product search, 1-click checkout, automated courier consignment, and high transaction surges.',
    contactServiceParam: 'ecommerce',
    accent: '#8b5cf6',
    heroStats: [
      { label: 'Catalog Search Speed', value: '<50ms Instant' },
      { label: 'Payment Integrations', value: 'bKash, Nagad, Cards' },
      { label: 'Logistics Automation', value: 'Pathao, Steadfast' },
      { label: 'Checkout Conversion', value: '+35% Industry Avg' },
    ],
    problems: {
      headline: 'Template E-commerce Stores Suffer From High Drop-Offs & Manual Fulfillment.',
      items: [
        {
          title: 'Slow Product Browsing',
          desc: 'Sluggish catalog filtering and slow page refreshes cause impulse buyers to abandon their shopping intent.',
        },
        {
          title: 'Checkout Friction & Failed Payments',
          desc: 'Multi-step checkouts without local mobile banking support (bKash/Nagad) trigger over 65% cart abandonment rates.',
        },
        {
          title: 'Manual Courier Consignment Entry',
          desc: 'Staff spending hours manually copying customer addresses into Pathao, Steadfast, or RedX dashboards instead of shipping orders.',
        },
        {
          title: 'Traffic Crashes During Flash Sales',
          desc: 'Shared hosting and monolithic commerce plugins crashing the moment you run a high-budget Facebook ad campaign or flash sale.',
        },
      ],
    },
    solution: {
      headline: 'Headless Commerce Architecture Designed to Convert and Scale.',
      description: 'We decouple the fast customer storefront from the administrative backend, creating sub-second shopping experiences that convert traffic into paid orders at industry-leading rates.',
      pillars: [
        {
          title: 'Instant 1-Click Checkout with Local OTP',
          desc: 'Streamlined checkout flows supporting mobile OTP authentication, saved delivery addresses, and single-click reordering.',
        },
        {
          title: 'Automated Courier & Order Dispatching',
          desc: 'Instant parcel booking via Pathao, Steadfast, and RedX APIs with automated barcode shipping label printing.',
        },
        {
          title: 'Elastic Concurrency for Campaign Surges',
          desc: 'Next.js edge caching and Redis database pooling engineered to handle tens of thousands of concurrent shoppers during major ad campaigns.',
        },
      ],
    },
    capabilities: [
      { title: 'Custom Headless Storefront', desc: 'Ultra-fast Next.js store with instant category filtering, smart search, and persistent cart memory.' },
      { title: 'Unified Payment Gateway Routing', desc: 'Direct API integrations for bKash, Nagad, Rocket, Visa, MasterCard, and international Stripe checkout.' },
      { title: 'Automated Logistics Fulfillment', desc: 'Direct courier API integrations that generate consignment tracking IDs and SMS notifications automatically.' },
      { title: 'Dynamic Inventory & Discount Engine', desc: 'Automated stock management, bulk discount rules, coupon codes, and bundle promotions.' },
    ],
    deliverables: [
      'Complete headless e-commerce store with modern customer-facing UI',
      'Comprehensive administrative backend to manage products, categories, stock, and orders',
      'Automated multi-gateway payment processing with digital invoice generation',
      'Integrated courier API connectors with automatic shipping slip generation',
      'Meta Pixel CAPI & Google Analytics 4 Enhanced E-commerce tracking pre-configured',
    ],
    audience: [
      { title: 'Direct-to-Consumer Brands', desc: 'Retail and consumer brands ready to graduate from basic social selling to an authoritative online store.' },
      { title: 'High-Volume Retailers', desc: 'Businesses processing hundreds of daily orders that need automated courier and stock synchronization.' },
      { title: 'Wholesalers & B2B Distributors', desc: 'Suppliers requiring custom customer tier pricing, credit limits, and bulk order mechanics.' },
      { title: 'Multi-Brand Marketplaces', desc: 'Platforms connecting multiple vendor catalogs under a centralized checkout system.' },
    ],
    useCases: [
      { category: 'Fashion & Apparel', title: 'High-Volume Direct Store', desc: 'Visual lifestyle catalog with dynamic size/color swatch selectors, quick-add carts, and instant bKash checkout.' },
      { category: 'Electronics', title: 'Component & Device Store', desc: 'Structured technical attribute filters, serial number inventory tracking, and warranty verification portals.' },
      { category: 'B2B Wholesale', title: 'Bulk Order Wholesale Portal', desc: 'Tiered wholesale pricing, minimum order quantities (MOQs), and automated GST/VAT invoices.' },
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js / Laravel API', 'PostgreSQL / MySQL', 'Redis', 'bKash / Nagad APIs', 'Pathao / Steadfast APIs'],
    liveProduct: {
      title: 'NextDigi Commerce',
      type: 'Live Flagship Product',
      url: 'https://commerce.nextdigihome.com/',
      desc: 'Experience our production commerce engine live: test product search, add items to cart, and observe sub-second performance.',
    },
    faqs: [
      {
        q: 'Can the store support both local Bangladeshi payment gateways and international cards?',
        a: 'Yes. We configure intelligent payment routing that supports bKash, Nagad, Rocket, and Bangladeshi bank gateways as well as Stripe for international credit cards in USD.',
      },
      {
        q: 'How does automated courier dispatching work?',
        a: 'When an order is marked confirmed in your admin dashboard, our system invokes the Pathao or Steadfast API, books the pickup parcel, generates the tracking number, and prints the shipping label in one click.',
      },
      {
        q: 'Will our e-commerce platform crash during massive Facebook ad traffic surges?',
        a: 'No. By using Next.js edge caching and Redis database connection pooling, catalog and product pages are served with zero database stress, absorbing high traffic spikes smoothly.',
      },
      {
        q: 'Is conversion tracking pre-installed for our ad campaigns?',
        a: 'Yes. We pre-install Meta Pixel with Server-Side Conversions API (CAPI) and GA4 Enhanced E-commerce tracking to ensure 100% accurate purchase attribution.',
      },
      {
        q: 'Can we manage inventory across multiple physical retail branches?',
        a: 'Yes. We engineer multi-warehouse and multi-branch inventory tracking with automated stock deductions upon confirmed customer order dispatch.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Growth', title: 'Meta Ads Management', href: '/growth/meta-ads', desc: 'Scale store revenue with structured creative testing and Dynamic Product Ads.' },
      { division: 'NextDigi Growth', title: 'Google Ads & Shopping', href: '/growth/google-ads', desc: 'Capture high-intent buyers searching directly for your product catalog.' },
      { division: 'NextDigi AI', title: 'Conversational Chatbots', href: '/ai/ai-agents', desc: 'Automate 24/7 customer order tracking and product questions on WhatsApp.' },
    ],
  },

  'mobile-app': {
    slug: 'mobile-app',
    division: 'NextDigi Solutions',
    divisionPath: '/solutions',
    eyebrow: 'Mobile Engineering',
    title: 'Cross-Platform iOS & Android Mobile Applications.',
    tagline: 'High-performance mobile applications engineered with Flutter for unified speed and fluid user experiences.',
    description: 'Reach your customers directly on their primary device. We design and develop cross-platform mobile apps for iOS and Android using Flutter, delivering native 60fps performance with unified codebases that cut maintenance costs in half.',
    contactServiceParam: 'mobile-app',
    accent: '#00d4aa',
    heroStats: [
      { label: 'Platform Coverage', value: 'iOS + Android' },
      { label: 'Architecture', value: 'Flutter & Bloc' },
      { label: 'Offline Capability', value: 'Local Cache Sync' },
      { label: 'Push Notifications', value: 'FCM Deep Links' },
    ],
    problems: {
      headline: 'Building Separate iOS and Android Codebases Doubles Costs and Creates Discrepancies.',
      items: [
        {
          title: 'Double the Development Costs',
          desc: 'Hiring separate Swift (iOS) and Kotlin (Android) developers doubles engineering expenses and doubles QA testing cycles.',
        },
        {
          title: 'Inconsistent Feature Sets',
          desc: 'One platform gets new features while the other lags months behind, creating fragmented user experiences and negative reviews.',
        },
        {
          title: 'App Store Rejection Roadblocks',
          desc: 'Complex Apple App Store and Google Play guidelines causing weeks of approval delays and frustrating rejections.',
        },
        {
          title: 'Sluggish Hybrid Performance',
          desc: 'Cheap WebView wrappers that stutter on older devices and fail when internet connectivity drops.',
        },
      ],
    },
    solution: {
      headline: 'Single Codebase, Native 60fps Performance on Both Platforms.',
      description: 'Using Google Flutter, we compile high-performance native machine code for both iOS and Android from a single structured codebase, cutting time-to-market and maintenance overhead in half.',
      pillars: [
        {
          title: 'Native 60fps Fluid Rendering',
          desc: 'Hardware-accelerated Skia/Impeller graphics engine providing smooth animations, native gestures, and responsive touch feedback.',
        },
        {
          title: 'Offline-First Local Synchronization',
          desc: 'Local SQLite and Hive database caching ensuring your app remains fully functional and responsive even on intermittent cellular connections.',
        },
        {
          title: 'Guaranteed Store Submission Approval',
          desc: 'We manage privacy disclosures, cryptographic certificates, asset guidelines, and review communications until live in both stores.',
        },
      ],
    },
    capabilities: [
      { title: 'Cross-Platform Flutter Development', desc: 'Unified codebase powering beautiful iOS and Android apps with zero feature drift.' },
      { title: 'Biometric & Secure Device Auth', desc: 'Fingerprint, FaceID, and secure keychain credentials for frictionless and secure customer logins.' },
      { title: 'Push Notifications & Deep Linking', desc: 'Automated transactional alerts, re-engagement pushes, and universal deep links using Firebase Cloud Messaging.' },
      { title: 'In-App Purchases & Local Payments', desc: 'Seamless integration with Apple App Store subscriptions, Google Play billing, and regional gateways (bKash/Nagad).' },
    ],
    deliverables: [
      'Complete iOS and Android production binaries ready for deployment',
      'Full Flutter / Dart source code repository with clean state management architecture',
      'Centralized REST or GraphQL backend API documentation',
      'App Store Connect and Google Play Console publishing assistance and approval guarantee',
    ],
    audience: [
      { title: 'On-Demand Service Platforms', desc: 'Ride-sharing, food delivery, and booking platforms requiring real-time geolocation tracking.' },
      { title: 'E-commerce Brands', desc: 'Retailers building repeat customer loyalty through direct push notifications and 1-tap purchasing.' },
      { title: 'Fintech & Digital Banking', desc: 'Services requiring biometric authentication, secure ledger syncing, and transaction security.' },
      { title: 'Field Operations & Logistics', desc: 'Companies outfitting warehouse staff, drivers, or inspectors with offline-ready data capture tools.' },
    ],
    useCases: [
      { category: 'Logistics', title: 'Driver & Delivery Dispatch App', desc: 'Turn-by-turn navigation, real-time parcel barcode scanning, and instant digital proof of delivery.' },
      { category: 'Retail', title: 'Customer Brand Shopping App', desc: 'Personalized product feeds, flash sale push notifications, and saved payment token checkouts.' },
      { category: 'Enterprise', title: 'Field Service Inspection Tool', desc: 'Offline checklist completion, photo documentation with metadata, and automatic cloud syncing when connected.' },
    ],
    techStack: ['Flutter', 'Dart', 'Firebase (FCM, Auth)', 'REST / GraphQL APIs', 'SQLite / Hive', 'Apple iOS App Store', 'Google Play Store'],
    faqs: [
      {
        q: 'Do you manage the entire App Store and Google Play review process?',
        a: 'Yes. We prepare all app screenshots, privacy policy declarations, cryptographic build signings, and handle direct developer review communications with Apple and Google until your app is published.',
      },
      {
        q: 'Can the mobile app share the same database and admin panel as our website?',
        a: 'Yes. We engineer centralized REST/GraphQL API backends so your website, mobile app, and management dashboard share synchronized live data.',
      },
      {
        q: 'How does Flutter perform compared to separate native Swift and Kotlin apps?',
        a: 'Flutter compiles directly to native ARM machine code rather than running in an interpreted JavaScript bridge, delivering identical 60fps to 120fps fluid performance while eliminating duplicate engineering overhead.',
      },
      {
        q: 'Can the app send push notifications to specific user segments?',
        a: 'Yes. We integrate Firebase Cloud Messaging (FCM) to allow broadcasting promotional campaigns or automated triggers based on customer activity.',
      },
      {
        q: 'What happens when Apple or Google release new OS versions?',
        a: 'Our maintenance SLAs include updating build dependencies and testing against new iOS and Android releases to guarantee continued store compliance.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Solutions', title: 'Web Application Development', href: '/solutions/web-application', desc: 'Build the central cloud API backend and administrator dashboard for your app.' },
      { division: 'NextDigi Growth', title: 'App Install Campaigns', href: '/growth/meta-ads', desc: 'Drive high-volume iOS and Android app installs with targeted Meta Ads.' },
      { division: 'NextDigi AI', title: 'Autonomous AI Agents', href: '/ai/ai-agents', desc: 'Embed intelligent AI conversational assistance directly into your mobile application.' },
    ],
  },

  'custom-software': {
    slug: 'custom-software',
    division: 'NextDigi Solutions',
    divisionPath: '/solutions',
    eyebrow: 'Custom Software',
    title: 'Proprietary Software Systems Built for Your Exact Workflows.',
    tagline: 'Tailored ERP, inventory, CRM & operational platforms built for unique organizational rules.',
    description: 'Eliminate rigid off-the-shelf software bottlenecks. We engineer proprietary enterprise systems, internal operating dashboards, and automated management software built directly around your operational workflows.',
    contactServiceParam: 'custom-software',
    accent: '#f59e0b',
    heroStats: [
      { label: 'System Customization', value: '100% Exact Logic' },
      { label: 'Recurring License Fees', value: '৳0 Zero Per-Seat' },
      { label: 'Data Segregation', value: 'Private Database' },
      { label: 'Audit Logging', value: 'Immutable Trails' },
    ],
    problems: {
      headline: 'Generic Software Forces You to Compromise Your Core Competitive Advantage.',
      items: [
        {
          title: 'Expensive Per-Seat Monthly Licensing',
          desc: 'Paying tens of thousands of dollars each month for bloated SaaS tools where your team only uses 10% of the features.',
        },
        {
          title: 'Rigid Inflexible Workflows',
          desc: 'Off-the-shelf software forcing your team to change proven business processes to match how an external vendor decided software should work.',
        },
        {
          title: 'Data Held Hostage',
          desc: 'Your critical business data trapped in proprietary vendor clouds with costly extraction fees and vendor lock-in.',
        },
        {
          title: 'Lack of Local Integrations',
          desc: 'Global ERP systems that cannot natively connect to local Bangladeshi payment gateways, SMS gateways, or local courier services.',
        },
      ],
    },
    solution: {
      headline: 'Custom Software That Adapts to You — Never the Other Way Around.',
      description: 'NextDigi Solutions builds bespoke systems that model your exact operational rules, inventory hierarchies, role permissions, and financial reporting metrics.',
      pillars: [
        {
          title: '100% Intellectual Property Ownership',
          desc: 'You own the complete system, database schemas, and codebase. No recurring per-seat fees or developer hostage clauses.',
        },
        {
          title: 'Designed Around Your Exact Rules',
          desc: 'Built to mirror your specific inventory calculations, multi-stage approval hierarchies, and commission structures.',
        },
        {
          title: 'Seamless Integration with Local Services',
          desc: 'Native connections to local banking portals, bKash API, SMS providers, and regional logistics fleets.',
        },
      ],
    },
    capabilities: [
      { title: 'Custom ERP & Resource Planning', desc: 'Integrated operational platforms connecting purchasing, manufacturing, inventory, and sales.' },
      { title: 'Proprietary CRM & Pipeline Systems', desc: 'Lead tracking, quotation generation, and customer account histories tailored to your sales process.' },
      { title: 'Automated Document & Invoice Engines', desc: 'One-click generation of PDF quotations, tax-compliant invoices, and delivery challans.' },
      { title: 'Multi-Branch Inventory Synchronization', desc: 'Real-time stock transfers, barcode tracking, and low-stock replenishment alert thresholds.' },
    ],
    deliverables: [
      'Production enterprise software deployment on dedicated cloud infrastructure',
      'Complete proprietary source code repository with comprehensive architecture documentation',
      'Configured relational database with daily automated encrypted snapshots',
      'Hands-on staff onboarding sessions and recorded video operational walkthroughs',
    ],
    audience: [
      { title: 'Manufacturing & Distribution', desc: 'Firms managing raw materials, production batches, and complex wholesale pricing tiers.' },
      { title: 'Automotive & Workshop Fleets', desc: 'Service centers handling multi-stage repair job-cards and spare-parts inventory.' },
      { title: 'Trading & Import Enterprises', desc: 'Importers tracking letters of credit (LC), customs clearances, and warehouse dispatching.' },
      { title: 'Healthcare & Clinical Labs', desc: 'Diagnostic centers requiring secure patient specimen tracking and digital report delivery.' },
    ],
    useCases: [
      { category: 'Automotive', title: 'Automotive Workshop ERP', desc: 'Digital job-cards, technician labor allocation, spare-parts barcode scanning, and automated SMS status.' },
      { category: 'Wholesale', title: 'Trading & Inventory Suite', desc: 'Multi-warehouse stock valuation, customer credit ledger enforcement, and automated VAT invoices.' },
      { category: 'Manufacturing', title: 'Production Scheduling System', desc: 'Bill of materials (BOM) tracking, batch QA verification, and packaging line output monitoring.' },
    ],
    techStack: ['Next.js', 'Node.js / Express', 'PostgreSQL / MySQL', 'Prisma ORM', 'Redis', 'Docker', 'Linux / Ubuntu'],
    liveProduct: {
      title: 'Garibondhu360',
      type: 'Production Workshop ERP',
      url: 'https://garibondhu360.nextdigihome.com/',
      desc: 'See our custom software capabilities in production with Garibondhu360: digital job-cards, inventory management, and technician scheduling.',
    },
    faqs: [
      {
        q: 'How much does custom software development cost compared to buying software licenses?',
        a: 'While custom software requires an initial upfront investment, it completely eliminates recurring monthly per-seat license costs, yielding significant cost savings by Year 2 while delivering an asset that belongs 100% to your company.',
      },
      {
        q: 'How do you handle changes to our business process during development?',
        a: 'We work in agile milestone sprints with regular visual demonstrations, allowing you to test working software and refine requirements before final deployment.',
      },
      {
        q: 'Can we run the software on our own private office servers or cloud account?',
        a: 'Yes. You have full freedom: we can deploy to your private AWS, DigitalOcean, or on-premises local server infrastructure.',
      },
      {
        q: 'Will you train our staff on how to use the new system?',
        a: 'Yes. Every custom software engagement includes live staff onboarding workshops and a complete video training library for new employees.',
      },
      {
        q: 'Can you migrate data from our existing spreadsheets or old software?',
        a: 'Yes. We perform complete data extraction, cleaning, deduplication, and verification from Excel, Access, or legacy databases into your new system.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Solutions', title: 'Web Applications', href: '/solutions/web-application', desc: 'Provide your clients with dedicated self-service web portals.' },
      { division: 'NextDigi AI', title: 'Workflow Automation', href: '/ai/ai-automation', desc: 'Automate repetitive tasks between your custom software and third-party tools.' },
      { division: 'NextDigi Solutions', title: 'Mobile Applications', href: '/solutions/mobile-app', desc: 'Give your field staff mobile access with custom Flutter apps.' },
    ],
  },

  'saas-development': {
    slug: 'saas-development',
    division: 'NextDigi Solutions',
    divisionPath: '/solutions',
    eyebrow: 'SaaS Architecture',
    title: 'Multi-Tenant SaaS Products Engineered to Scale.',
    tagline: 'Turn software ideas into high-margin subscription platforms with multi-tenant architecture and automated recurring billing.',
    description: 'We turn software concepts into production subscription products. From tenant isolation and self-serve onboarding to automated billing, usage metering, and API keys, we build SaaS platforms ready for commercial scale.',
    contactServiceParam: 'saas-development',
    accent: '#ec4899',
    heroStats: [
      { label: 'Architecture Model', value: 'Multi-Tenant RLS' },
      { label: 'Billing Engine', value: 'Stripe & Regional' },
      { label: 'Deployment Strategy', value: 'Containerized CI/CD' },
      { label: 'MVP Velocity', value: '4 to 8 Weeks' },
    ],
    problems: {
      headline: 'Building a Scalable SaaS Requires Solving Complex Multi-Tenant Architecture.',
      items: [
        {
          title: 'Tenant Data Bleed Risks',
          desc: 'Fragile architectures that risk exposing one tenant’s confidential business records to another tenant, destroying company reputation.',
        },
        {
          title: 'Complex Subscription Edge-Cases',
          desc: 'Prorated upgrades, cancellations, seat additions, failed card retries, and dunning cycles that break manual billing scripts.',
        },
        {
          title: 'Slow MVP Time-to-Market',
          desc: 'Spending 9+ months building basic authentication and billing instead of testing your core differentiated value proposition.',
        },
        {
          title: 'Unpredictable Background Workloads',
          desc: 'Long-running tasks freezing web servers because job queues and distributed workers were not architected from Day 1.',
        },
      ],
    },
    solution: {
      headline: 'Production-Grade SaaS Foundations Built by Experienced SaaS Founders.',
      description: 'At NextDigi Labs, we engineer and operate our own commercial SaaS platforms (NextDigi Commerce, Garibondhu360). We bring those battle-tested architectures directly to your new subscription venture.',
      pillars: [
        {
          title: 'Ironclad Multi-Tenant Data Isolation',
          desc: 'PostgreSQL Row-Level Security (RLS) or schema-isolated architectures ensuring absolute tenant privacy and enterprise compliance.',
        },
        {
          title: 'Turnkey Subscription & Usage Billing',
          desc: 'Integrated Stripe Billing and regional gateway support handling monthly/annual plans, seat add-ons, and automated invoices.',
        },
        {
          title: 'Distributed Asynchronous Job Queues',
          desc: 'Heavy background task distribution powered by Redis and BullMQ, keeping web dashboards blazing fast under heavy load.',
        },
      ],
    },
    capabilities: [
      { title: 'Self-Serve Workspace Onboarding', desc: 'Smooth user signups, organization creation, team invitations, and role-based permissions.' },
      { title: 'Tiered Subscription Management', desc: 'Configurable pricing tiers, feature-gated access flags, and automated usage limit enforcement.' },
      { title: 'Developer API & Webhook Systems', desc: 'Secure customer API key provisioning, rate-limiting, and outbound event webhooks for your users.' },
      { title: 'Administrative Metrics Console', desc: 'Founder dashboard tracking Monthly Recurring Revenue (MRR), Churn Rate, Active Workspaces, and ARPU.' },
    ],
    deliverables: [
      'Complete multi-tenant SaaS application codebase with modular TypeScript architecture',
      'Configured customer billing portal with self-serve plan modifications and receipt downloads',
      'Founder super-admin console to manage tenant accounts, feature flags, and system metrics',
      'Automated CI/CD deployment pipelines on AWS, Vercel, or custom containerized VPS',
    ],
    audience: [
      { title: 'SaaS Founders & Entrepreneurs', desc: 'Founders with validated market opportunities who need a production-grade MVP built fast.' },
      { title: 'Agencies Productizing Services', desc: 'Service firms turning repetitive client workflows into recurring subscription revenue.' },
      { title: 'Vertical Industry Specialists', desc: 'Domain experts creating specialized software for niches like legal, logistics, or real estate.' },
      { title: 'Enterprise Product Divisions', desc: 'Established organizations launching new commercial digital product subsidiaries.' },
    ],
    useCases: [
      { category: 'B2B', title: 'Vertical Industry SaaS', desc: 'Niche operational software for dental clinics or logistics fleets with specialized job scheduling.' },
      { category: 'Productivity', title: 'Team Collaboration Hub', desc: 'Shared document review, client approval tracking, and task delegation for agency teams.' },
      { category: 'Fintech', title: 'Automated Invoicing SaaS', desc: 'Multi-currency invoicing platform with automated recurring payment collection and ledger export.' },
    ],
    techStack: ['Next.js 16', 'TypeScript', 'PostgreSQL (Supabase / RDS)', 'Stripe Billing', 'Redis / BullMQ', 'Docker', 'Tailwind CSS'],
    liveProduct: {
      title: 'Garibondhu360 SaaS',
      type: 'Production Multi-Tenant SaaS',
      url: 'https://garibondhu360.nextdigihome.com/',
      desc: 'View our production SaaS architecture in action with multi-tier workspace isolation, role permissions, and recurring billing.',
    },
    faqs: [
      {
        q: 'How fast can you deliver a production-ready SaaS MVP?',
        a: 'By leveraging our battle-tested modular SaaS foundations, we can design, engineer, and deploy a polished, revenue-ready MVP within 6 to 10 weeks.',
      },
      {
        q: 'How is tenant data kept secure and separated?',
        a: 'We implement PostgreSQL Row-Level Security (RLS) or dedicated schema tenant isolation, ensuring database queries can only execute within the authenticated tenant context.',
      },
      {
        q: 'Can the platform support local Bangladeshi payment methods for recurring subscriptions?',
        a: 'Yes. In addition to Stripe for global cards, we integrate local tokenized subscription mechanisms and recurring invoice payment links via bKash and Nagad.',
      },
      {
        q: 'Can our SaaS offer API access to third-party developers?',
        a: 'Yes. We architect tokenized API key generation with granular permission scopes and automated rate-limiting so your users can build integrations.',
      },
      {
        q: 'Do you take equity or do we own 100% of the SaaS product?',
        a: 'You own 100% of the product, intellectual property, brand, and customer relationships. We operate on a milestone software engineering model with zero equity dilution.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Labs', title: 'NextDigi Labs Products', href: '/labs', desc: 'Learn how NextDigi Labs builds and commercializes proprietary digital products.' },
      { division: 'NextDigi Growth', title: 'SaaS Growth & Meta Ads', href: '/growth/meta-ads', desc: 'Acquire your first 100 paying SaaS subscribers with targeted acquisition campaigns.' },
      { division: 'NextDigi AI', title: 'AI Features Integration', href: '/ai/ai-agents', desc: 'Supercharge your SaaS product with native AI-powered automated workflows.' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(solutionsData).map((service) => ({ service }));
}

type PageProps = {
  params: Promise<{ service: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const data = solutionsData[service];

  if (!data) {
    return {
      title: 'Service Not Found | NextDigi Solutions',
      description: 'The requested technology solution could not be found.',
    };
  }

  return generatePageMetadata({
    title: `${data.title} | ${data.division}`,
    description: `${data.tagline} ${data.description}`,
    path: `/solutions/${service}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { service } = await params;
  const data = solutionsData[service];

  if (!data) {
    notFound();
  }

  return <ServiceLandingPage data={data} />;
}
