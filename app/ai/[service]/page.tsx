import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/app/utils/seo';
import ServiceLandingPage, { type ServiceLandingPageData } from '@/app/components/ServiceLandingPage';

const aiServicesData: Record<string, ServiceLandingPageData> = {
  'ai-agents': {
    slug: 'ai-agents',
    division: 'NextDigi AI',
    divisionPath: '/ai',
    eyebrow: 'Autonomous Agents',
    title: 'Autonomous AI Agents That Execute Complex Business Workflows.',
    tagline: 'Deterministic AI agents with document retrieval, database access & multi-step tool execution.',
    description: 'Bridge the gap between basic chat assistants and real operational execution. We engineer custom AI agents equipped with private knowledge base retrieval (RAG), internal database querying, and tool-use capabilities to automate research, triage, and data pipelines without human micromanagement.',
    contactServiceParam: 'ai-agents',
    accent: '#8b5cf6',
    heroStats: [
      { label: 'Agent Architecture', value: 'RAG + Tool Use' },
      { label: 'Model Support', value: 'Claude, GPT-4o, DeepSeek' },
      { label: 'Execution Mode', value: 'Autonomous & Human Gate' },
      { label: 'Data Privacy', value: 'VPC Encrypted' },
    ],
    problems: {
      headline: 'Generic AI Chat Tools Hallucinate and Cannot Perform Actual Business Work.',
      items: [
        {
          title: 'Unreliable Hallucinations',
          desc: 'Consumer AI tools making up factual answers that cannot be trusted with real customer accounts or operational data.',
        },
        {
          title: 'Disconnected From Internal Data',
          desc: 'Standard AI models having zero access to your live product databases, customer order histories, or private SOP documents.',
        },
        {
          title: 'Unable to Take Action',
          desc: 'Chat tools that can only output text, unable to update your CRM, query an ERP ledger, or trigger a shipping dispatch webhook.',
        },
        {
          title: 'Data Privacy & Leakage Concerns',
          desc: 'Employees pasting confidential proprietary financial records into public web tools without enterprise data shielding.',
        },
      ],
    },
    solution: {
      headline: 'Deterministic, Tool-Equipped Agents Operating Under Strict Business Constraints.',
      description: 'NextDigi AI engineers custom autonomous agent architectures using Python, LangChain, and private vector stores that strictly ground outputs in your verified business data and require explicit human confirmation for high-stakes actions.',
      pillars: [
        {
          title: 'Retrieval-Augmented Generation (RAG)',
          desc: 'Ground every agent action in proprietary company manuals, inventory databases, and customer records with sub-second vector search.',
        },
        {
          title: 'Deterministic Tool & API Execution',
          desc: 'Agents invoke verified software endpoints to search orders, calculate shipping rates, generate invoices, and route support tickets.',
        },
        {
          title: 'Human-in-the-Loop Safeguards',
          desc: 'Configure automated approval thresholds so high-value financial actions or outbound communications require human one-click sign-off.',
        },
      ],
    },
    capabilities: [
      { title: 'Autonomous Research & Synthesis', desc: 'Ingests hundreds of documents, PDFs, and spreadsheets to synthesize executive briefings and audit reports.' },
      { title: 'Intelligent Lead Qualification', desc: 'Interviews incoming prospects, assesses technical scope, calculates lead priority scores, and syncs to CRM.' },
      { title: 'Automated Ticket Resolution', desc: 'Resolves repetitive Level-1 technical support requests by retrieving exact step-by-step guides.' },
      { title: 'Full Traceability & Audit Logs', desc: 'Inspect every decision step, prompt chain, token cost, and tool output in a centralized administrative console.' },
    ],
    deliverables: [
      'Production AI agent service deployed on secure, dedicated cloud infrastructure',
      'Configured private vector database (pgvector / Pinecone) with automated document ingestion',
      'Observability dashboard tracking agent decision paths, latency, and token consumption',
      'REST and Webhook integration endpoints for seamless invocation by your web and mobile apps',
    ],
    audience: [
      { title: 'B2B & Professional Services', desc: 'Firms needing automated research, RFP response drafting, and compliance document verification.' },
      { title: 'Customer Support Operations', desc: 'High-volume organizations looking to automate 60%+ of routine inquiries without hiring additional staff.' },
      { title: 'E-commerce & Logistics', desc: 'Operations requiring automated order status triaging and parcel tracking routing.' },
      { title: 'SaaS & Technology Companies', desc: 'Product teams embedding autonomous AI agent capabilities into their customer software.' },
    ],
    useCases: [
      { category: 'Support', title: 'Level-1 Technical Support Agent', desc: 'Analyzes user error screenshots, queries knowledge manuals, and delivers verified remediation steps.' },
      { category: 'Sales', title: 'Autonomous Inbound Sales SDR', desc: 'Qualifies inbound website leads, identifies project budget ranges, and books discovery calls.' },
      { category: 'Operations', title: 'Document Data Extraction Agent', desc: 'Extracts line items, tax numbers, and dates from supplier PDF invoices into relational database tables.' },
    ],
    techStack: ['Python', 'LangChain / LlamaIndex', 'OpenAI GPT-4o / Claude 3.5', 'pgvector / Pinecone', 'FastAPI', 'Docker'],
    faqs: [
      {
        q: 'How do you prevent the AI agent from making mistakes or hallucinating?',
        a: 'We implement strict RAG boundary conditions: if a question falls outside verified documentation, the agent is instructed to state it does not have that information and escalates to a human. We also enforce schema validation on all API tool outputs.',
      },
      {
        q: 'Can the agent connect securely to our private internal database?',
        a: 'Yes. We deploy agents inside private VPC networks with read-only database connections and masked personally identifiable information (PII) filtering.',
      },
      {
        q: 'Do you implement human approval for important actions?',
        a: 'Yes. You can configure "Co-pilot mode" (drafts actions for human one-click approval) or "Autonomous mode" (executes automatically only when confidence scores exceed 95%).',
      },
      {
        q: 'Can the agent understand colloquial Bengali and English?',
        a: 'Yes. Our agents are tuned to understand mixed Bengali, Banglish, and English phrasing, making them highly effective for local and regional customer interactions.',
      },
      {
        q: 'How are cloud API and token costs managed?',
        a: 'We implement semantic caching (Redis) so identical questions do not re-invoke model APIs, saving up to 40% in monthly token expenses, alongside hard spend alert caps.',
      },
    ],
    crossSell: [
      { division: 'NextDigi AI', title: 'Workflow Automation', href: '/ai/ai-automation', desc: 'Connect your AI agent to existing business tools with automated webhooks.' },
      { division: 'NextDigi Solutions', title: 'Web Application Development', href: '/solutions/web-application', desc: 'Embed your custom agent into a secure internal employee dashboard.' },
      { division: 'NextDigi Growth', title: 'Meta & Google Ads', href: '/growth/meta-ads', desc: 'Feed qualified inbound traffic directly to your 24/7 AI qualification agent.' },
    ],
  },

  'ai-chatbot': {
    slug: 'ai-chatbot',
    division: 'NextDigi AI',
    divisionPath: '/ai',
    eyebrow: 'Conversational Chatbots',
    title: 'Multi-Channel AI Chatbots for 24/7 Lead Capture & Support.',
    tagline: 'Intelligent conversational interfaces that understand customer context on Web, WhatsApp & Messenger.',
    description: 'Transform passive website visitors into qualified commercial leads. We build intelligent bilingual chatbots that understand customer context, answer complex product questions accurately, and qualify incoming prospects 24/7.',
    contactServiceParam: 'ai-chatbot',
    accent: '#00d4aa',
    heroStats: [
      { label: 'Channels Supported', value: 'Web, WhatsApp, Messenger' },
      { label: 'Languages', value: 'Bengali, Banglish, English' },
      { label: 'Availability', value: '24/7 Sub-second' },
      { label: 'Human Handoff', value: 'Instant Notification' },
    ],
    problems: {
      headline: 'Traditional Rule-Based Chatbots Frustrate Customers and Miss Leads.',
      items: [
        {
          title: 'Rigid Multiple-Choice Menus',
          desc: 'Frustrating customers with repetitive button loops that cannot answer direct, natural-language questions.',
        },
        {
          title: 'Lost Inquiries Outside Business Hours',
          desc: 'Over 50% of commercial website inquiries arrive during evenings and weekends when human sales teams are offline.',
        },
        {
          title: 'Language Barriers in Local Markets',
          desc: 'Generic tools that break down completely when prospects write in natural Bengali or colloquial Banglish.',
        },
        {
          title: 'No CRM or Order Synchronization',
          desc: 'Chat transcripts trapped in isolated messaging inboxes without updating your central sales pipeline.',
        },
      ],
    },
    solution: {
      headline: 'Conversational Intelligence That Engages, Qualifies, and Converts.',
      description: 'NextDigi AI chatbots understand conversational context, handle complex multi-turn discussions, speak fluent Bengali and English, and seamlessly guide prospects into your sales pipeline.',
      pillars: [
        {
          title: 'True Multi-Channel Presence',
          desc: 'Deploy a unified brain across your website widget, official WhatsApp Business API, and Facebook Messenger.',
        },
        {
          title: 'Native Bilingual Understanding',
          desc: 'Fine-tuned language processing that accurately interprets colloquial Bangla, Banglish phonetic spellings, and English.',
        },
        {
          title: 'Seamless Human Agent Handoff',
          desc: 'Instantly escalates high-value prospects to your human sales reps with complete conversation summaries in Telegram or Slack.',
        },
      ],
    },
    capabilities: [
      { title: 'WhatsApp Business API Integration', desc: 'Official Cloud API messaging for automated order confirmations, catalogs, and instant customer service.' },
      { title: 'Dynamic Lead Capture & Scoring', desc: 'Collects visitor requirements, budget, timeline, and phone numbers, syncing directly into your CRM.' },
      { title: 'Live Inventory & Order Tracking', desc: 'Direct connections to your e-commerce or ERP database to give live shipment status and stock updates.' },
      { title: 'Continuous Knowledge Learning', desc: 'Admin interface to easily add new FAQs, product catalogs, and policies with zero coding required.' },
    ],
    deliverables: [
      'Configured multi-channel chatbot deployed on website, WhatsApp, and Facebook',
      'Connected knowledge base trained on your company FAQs, catalogs, and documentation',
      'Unified team inbox dashboard for human customer support agents',
      'Automated webhook bridge feeding new leads directly into your CRM',
    ],
    audience: [
      { title: 'E-commerce Retailers', desc: 'Stores fielding hundreds of repetitive order tracking, size advice, and payment inquiries.' },
      { title: 'Real Estate & Automotive', desc: 'Businesses that must capture high-ticket lead contact information before the visitor bounces.' },
      { title: 'Educational Institutions', desc: 'Colleges and training platforms answering admissions, fee structure, and syllabus questions.' },
      { title: 'Healthcare & Clinics', desc: 'Practices providing instant clinic hours, doctor schedules, and appointment requests.' },
    ],
    useCases: [
      { category: 'E-commerce', title: 'WhatsApp Order Assistant', desc: 'Guides customers through product selection, takes delivery addresses, and generates invoice links on WhatsApp.' },
      { category: 'B2B', title: 'Website Inbound Lead Qualifier', desc: 'Engages high-intent website visitors, verifies project budget, and captures contact numbers for sales follow-up.' },
      { category: 'Services', title: '24/7 Appointment Booking Bot', desc: 'Checks doctor or consultant availability and books consultation slots directly into Google Calendar.' },
    ],
    techStack: ['Meta WhatsApp Cloud API', 'OpenAI GPT-4o / Claude', 'Node.js / Python', 'WebSockets', 'Tailwind CSS Widget'],
    faqs: [
      {
        q: 'Can the chatbot connect to our verified WhatsApp Business phone number?',
        a: 'Yes. We configure the official Meta WhatsApp Cloud API directly with your registered business number, maintaining verified green badge compliance.',
      },
      {
        q: 'What happens when a customer asks something the chatbot does not know?',
        a: 'The chatbot politely acknowledges its limitation, captures the customer phone number or email, and triggers an instant alert to your team via Telegram or Slack for human takeover.',
      },
      {
        q: 'Can the chatbot check real-time product stock or shipment status?',
        a: 'Yes. The chatbot connects securely to your e-commerce platform API (such as NextDigi Commerce or WooCommerce) to retrieve live order status and inventory counts.',
      },
      {
        q: 'Is it easy to update the chatbot knowledge base when prices or policies change?',
        a: 'Yes. We provide an intuitive knowledge management portal where you can edit text, upload new PDF manuals, or add FAQs with immediate effect.',
      },
      {
        q: 'Does using the WhatsApp API incur recurring Meta conversation fees?',
        a: 'Meta provides 1,000 free service conversations per month. Beyond that, standard Meta utility/marketing rates apply directly through your Meta Business Manager account.',
      },
    ],
    crossSell: [
      { division: 'NextDigi Solutions', title: 'E-commerce Development', href: '/solutions/ecommerce', desc: 'Integrate your WhatsApp chatbot directly into an ultra-fast headless store.' },
      { division: 'NextDigi AI', title: 'Autonomous AI Agents', href: '/ai/ai-agents', desc: 'Upgrade from chat support to autonomous multi-step operational agents.' },
      { division: 'NextDigi Growth', title: 'Meta Ads Management', href: '/growth/meta-ads', desc: 'Run Click-to-WhatsApp Meta Ads that feed directly into your automated chatbot.' },
    ],
  },

  'ai-automation': {
    slug: 'ai-automation',
    division: 'NextDigi AI',
    divisionPath: '/ai',
    eyebrow: 'Workflow Automation',
    title: 'Enterprise Workflow Automation Powered by AI & Webhooks.',
    tagline: 'Zero-touch integration between your CRM, spreadsheets, invoicing, messaging & operations.',
    description: 'Eliminate tedious manual data entry and disjointed administrative bottlenecks. We build resilient automation pipelines using self-hosted n8n, Python microservices, and modern webhooks to connect your entire operational stack.',
    contactServiceParam: 'ai-automation',
    accent: '#f59e0b',
    heroStats: [
      { label: 'Platform Engine', value: 'Self-Hosted n8n' },
      { label: 'Execution Capacity', value: 'Unlimited Tasks' },
      { label: 'Data Security', value: 'Private On-Prem / Cloud' },
      { label: 'Reliability Protocol', value: 'Automated Retry Queues' },
    ],
    problems: {
      headline: 'Repetitive Manual Copy-Pasting Burns Hundreds of Staff Hours Every Month.',
      items: [
        {
          title: 'Manual Data Entry Overhead',
          desc: 'Employees spending valuable hours transferring customer details between forms, Google Sheets, CRMs, and accounting software.',
        },
        {
          title: 'Exorbitant Per-Task SaaS Fees',
          desc: 'Paying hundreds of dollars monthly to platforms like Zapier whose tiered task pricing penalizes you as your transaction volume grows.',
        },
        {
          title: 'Silent Workflow Failures',
          desc: 'Fragile scripts that break silently when an external API changes, resulting in lost customer orders and unaccounted transactions.',
        },
        {
          title: 'Data Privacy Exposure',
          desc: 'Routing sensitive company contracts and customer PII records through third-party multi-tenant automation clouds.',
        },
      ],
    },
    solution: {
      headline: 'Self-Hosted, Enterprise-Grade Pipelines Built for Unlimited Execution.',
      description: 'We deploy self-hosted automation infrastructure (n8n) and custom webhook microservices on your private servers, ensuring zero task-limit fees and ironclad data privacy.',
      pillars: [
        {
          title: 'Self-Hosted n8n on Your Private Cloud',
          desc: 'Run unlimited workflow executions with zero recurring per-task charges while keeping company records strictly on your servers.',
        },
        {
          title: 'Lead-to-Cash Pipeline Automation',
          desc: 'Instantly progress incoming website leads into CRM records, generate tailored proposal PDFs, and dispatch notification alerts.',
        },
        {
          title: 'Fault-Tolerant Message Queuing',
          desc: 'Automated exponential backoff retries and dead-letter queues guarantee zero lost transaction records during third-party service outages.',
        },
      ],
    },
    capabilities: [
      { title: 'End-to-End Sales Funnel Automation', desc: 'Syncs incoming inquiries across email, CRM, WhatsApp notifications, and Google Sheets simultaneously.' },
      { title: 'Automated Document & Invoice Generation', desc: 'Parses database records to automatically compile, render, and email PDF invoices and tax receipts.' },
      { title: 'Real-Time Incident & Milestone Alerts', desc: 'Dispatches instant push alerts into Slack or Telegram whenever high-priority events or errors occur.' },
      { title: 'AI-Powered Data Normalization', desc: 'Uses lightweight AI models to clean, standardize, and categorize unstructured customer input.' },
    ],
    deliverables: [
      'Turnkey self-hosted n8n automation server deployed on dedicated cloud infrastructure',
      'Configured production workflow pipelines with visual execution runbooks',
      'Proactive error-alert channels integrated into your team Slack or Telegram',
      'Comprehensive workflow documentation and staff handoff training',
    ],
    audience: [
      { title: 'Growing B2B Enterprises', desc: 'Organizations handling hundreds of weekly client proposals, contracts, and billing notices.' },
      { title: 'E-commerce & Distribution', desc: 'Businesses syncing orders between storefronts, couriers, and warehouse accounting ledgers.' },
      { title: 'Agencies & Service Firms', desc: 'Teams automating client onboarding, project milestone notifications, and reporting.' },
      { title: 'Finance & Compliance Teams', desc: 'Departments requiring reliable reconciliation between bank payment gateways and ERP ledgers.' },
    ],
    useCases: [
      { category: 'Sales', title: 'Lead-to-Deal Automation', desc: 'Form submission -> CRM deal creation -> Slack sales alert -> Automated WhatsApp intro message.' },
      { category: 'Finance', title: 'Automated Billing Pipeline', desc: 'Completed payment webhook -> PDF tax invoice generated -> Customer email dispatched -> Accounting ledger updated.' },
      { category: 'Operations', title: 'Multi-Channel Inventory Sync', desc: 'Catalog inventory update -> Stock synchronized across online store, physical POS, and warehouse database.' },
    ],
    techStack: ['n8n', 'Python', 'Docker', 'REST Webhooks', 'PostgreSQL', 'Redis', 'Telegram & Slack APIs'],
    faqs: [
      {
        q: 'Why choose self-hosted n8n over Zapier or Make?',
        a: 'Self-hosted n8n runs on your own dedicated cloud server, providing 100% data privacy and unlimited workflow executions without costly tiered per-task charges.',
      },
      {
        q: 'What happens if an external API experiences downtime?',
        a: 'Our workflows feature automated retry queues with exponential backoff: events are buffered in memory and retried automatically until the external service recovers.',
      },
      {
        q: 'Can we automate communication between legacy software and modern cloud tools?',
        a: 'Yes. We build custom webhook listeners and database polling microservices that safely bridge legacy on-premises databases with modern cloud APIs.',
      },
      {
        q: 'Is technical knowledge required to monitor our workflows?',
        a: 'No. n8n provides an intuitive visual flowchart interface. We also configure automated Slack or Telegram alerts that notify your team only if an anomaly requires human attention.',
      },
      {
        q: 'Can automation workflows incorporate AI decision logic?',
        a: 'Yes. We easily embed AI nodes to summarize customer notes, categorize inquiry intent, or translate languages within the automation pipeline.',
      },
    ],
    crossSell: [
      { division: 'NextDigi AI', title: 'Autonomous AI Agents', href: '/ai/ai-agents', desc: 'Combine workflow automation with cognitive AI agents for intelligent decision-making.' },
      { division: 'NextDigi Solutions', title: 'Custom Software Development', href: '/solutions/custom-software', desc: 'Build the central database application that powers your operational workflows.' },
      { division: 'NextDigi Growth', title: 'Analytics & Attribution', href: '/growth/analytics', desc: 'Feed automated conversion events directly into your reporting dashboards.' },
    ],
  },

  'ai-integration': {
    slug: 'ai-integration',
    division: 'NextDigi AI',
    divisionPath: '/ai',
    eyebrow: 'AI Systems Integration',
    title: 'Embed Cutting-Edge AI Models Directly Into Your Existing Software.',
    tagline: 'Modernize legacy platforms and SaaS software with intelligent AI APIs, embeddings & search.',
    description: 'Upgrade your existing software without rebuilding from scratch. We architect secure AI microservices, private vector embeddings, and API bridges that integrate the power of OpenAI, Claude, and DeepSeek directly into your current tech stack.',
    contactServiceParam: 'ai-integration',
    accent: '#ec4899',
    heroStats: [
      { label: 'Integration Architecture', value: 'Microservices & APIs' },
      { label: 'Model Flexibility', value: 'Multi-LLM Routing' },
      { label: 'Latency Target', value: 'Streaming Sub-second' },
      { label: 'Security Standard', value: 'PII Masking & VPC' },
    ],
    problems: {
      headline: 'Integrating AI Into Existing Codebases Requires Specialized Architecture.',
      items: [
        {
          title: 'Unpredictable API Latency',
          desc: 'Direct LLM API calls taking 5 to 10 seconds to respond, freezing your web applications and frustrating active users.',
        },
        {
          title: 'Exploding Token Costs',
          desc: 'Unoptimized prompts and repetitive model invocations driving cloud AI expenses to thousands of dollars per month.',
        },
        {
          title: 'Model Vendor Lock-in',
          desc: 'Tightly coupling your code to a single AI provider, leaving your software vulnerable to API outages, price hikes, or deprecations.',
        },
        {
          title: 'Customer PII Data Exposure',
          desc: 'Accidentally transmitting sensitive customer personal data to third-party model providers without proper anonymization.',
        },
      ],
    },
    solution: {
      headline: 'Resilient, Cost-Optimized AI Middleware Engineered for Your Stack.',
      description: 'We build an intelligent abstraction layer between your existing software and commercial AI models, providing streaming responses, semantic caching, PII masking, and multi-model fallback redundancy.',
      pillars: [
        {
          title: 'Semantic Redis Caching',
          desc: 'Caches answers to recurring customer queries, delivering instant 50ms responses while slashing external API costs by up to 45%.',
        },
        {
          title: 'Multi-Model Fallback Gateway',
          desc: 'Automatically route requests across OpenAI, Anthropic Claude, and DeepSeek based on cost, speed, and real-time provider uptime.',
        },
        {
          title: 'Client-Side Real-Time Streaming',
          desc: 'Implement token-by-token Server-Sent Events (SSE) streaming so users see instant generation rather than waiting on loading spinners.',
        },
      ],
    },
    capabilities: [
      { title: 'Intelligent Semantic Search', desc: 'Replaces rigid keyword search with vector embeddings that understand user intent, synonyms, and natural phrasing.' },
      { title: 'Automated Content & Text Synthesis', desc: 'Programmatically generates product descriptions, localized summaries, and customer communications.' },
      { title: 'PII Anonymization Layer', desc: 'Sanitizes credit card numbers, phone numbers, and customer names before prompts reach external model providers.' },
      { title: 'Audio & Voice Transcription', desc: 'Integrates Whisper voice models for automated phone call transcription and voice-enabled app commands.' },
    ],
    deliverables: [
      'Production AI middleware gateway deployed on dedicated cloud infrastructure',
      'OpenAPI specification endpoints with client SDKs for your existing engineering team',
      'Administrative token metering and cost allocation dashboard',
      'Comprehensive error handling and multi-provider failover configurations',
    ],
    audience: [
      { title: 'SaaS Product Teams', desc: 'Companies adding AI features to maintain competitive advantage against emerging AI-native competitors.' },
      { title: 'E-commerce Platforms', desc: 'Retailers deploying semantic natural-language product search and AI-assisted shopping.' },
      { title: 'Healthcare & Legal Services', desc: 'Organizations requiring secure document summarization with zero data retention.' },
      { title: 'Media & Publishers', desc: 'Portals generating dynamic summaries, audio transcriptions, and localized language translations.' },
    ],
    useCases: [
      { category: 'Search', title: 'Vector Semantic Product Search', desc: 'Allows shoppers to search "something warm for winter travel" and view relevant fleece jackets instantly.' },
      { category: 'SaaS', title: 'AI Assistant Inside Existing CRM', desc: 'Adds an intelligent side-panel that drafts client email replies and summarizes past call transcripts.' },
      { category: 'Finance', title: 'Automated Document Summarization', desc: 'Summarizes 50-page financial audits into key balance sheet bullet points in under 3 seconds.' },
    ],
    techStack: ['Python / FastAPI', 'TypeScript / Node.js', 'LiteLLM / OpenRouter', 'Redis Semantic Cache', 'pgvector / Qdrant', 'Docker'],
    faqs: [
      {
        q: 'Do we have to rewrite our existing application to integrate AI?',
        a: 'No. We deploy a lightweight, decoupled AI microservice gateway. Your existing backend simply makes standard REST or GraphQL calls to our gateway, requiring minimal changes to your existing codebase.',
      },
      {
        q: 'What happens if OpenAI or Claude experiences an API outage?',
        a: 'Our middleware is engineered with intelligent model fallbacks: if your primary model provider is degraded or down, requests automatically route to your configured secondary provider without disruption.',
      },
      {
        q: 'How do you keep token expenses predictable and affordable?',
        a: 'We implement semantic caching (Redis) so identical questions return cached responses instantly for $0, alongside strict per-user token quotas and prompt compression techniques.',
      },
      {
        q: 'Will our proprietary business data be used to train public AI models?',
        a: 'No. We configure commercial enterprise API access with strict Zero Data Retention (ZDR) agreements, ensuring your data is never used for training foundation models.',
      },
      {
        q: 'How fast can our team begin using the AI integration?',
        a: 'A focused AI microservice integration (such as semantic search or an AI assistant feature) is typically deployed to staging within 2 to 4 weeks.',
      },
    ],
    crossSell: [
      { division: 'NextDigi AI', title: 'Autonomous AI Agents', href: '/ai/ai-agents', desc: 'Upgrade API integrations into autonomous multi-step operational agents.' },
      { division: 'NextDigi Solutions', title: 'SaaS Development', href: '/solutions/saas-development', desc: 'Incorporate AI features into a brand-new scalable subscription platform.' },
      { division: 'NextDigi Growth', title: 'Analytics & Attribution', href: '/growth/analytics', desc: 'Measure the exact user retention and revenue impact of your new AI features.' },
    ],
  },
};

// Aliases for historical / alternate routes
aiServicesData['chatbots'] = aiServicesData['ai-chatbot'];
aiServicesData['automation'] = aiServicesData['ai-automation'];

export function generateStaticParams() {
  return Object.keys(aiServicesData).map((service) => ({ service }));
}

type PageProps = {
  params: Promise<{ service: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const data = aiServicesData[service];

  if (!data) {
    return {
      title: 'AI Service Not Found | NextDigi AI',
      description: 'The requested AI solution could not be found.',
    };
  }

  return generatePageMetadata({
    title: `${data.title} | ${data.division}`,
    description: `${data.tagline} ${data.description}`,
    path: `/ai/${service}`,
  });
}

export default async function AIServiceDetailPage({ params }: PageProps) {
  const { service } = await params;
  const data = aiServicesData[service];

  if (!data) {
    notFound();
  }

  return <ServiceLandingPage data={data} />;
}
