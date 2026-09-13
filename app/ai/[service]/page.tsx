import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  CpuChipIcon, 
  ChatBubbleBottomCenterTextIcon, 
  LifebuoyIcon, 
  ArrowsRightLeftIcon, 
  VideoCameraIcon,
  ShieldCheckIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

type AIServiceData = {
  id: string;
  title: string;
  division: string;
  tagline: string;
  description: string;
  longDescription: string;
  accent: string;
  icon: any;
  capabilities: { title: string; desc: string }[];
  deliverables: string[];
  techStack: string[];
  faqs: { q: string; a: string }[];
};

const aiData: Record<string, AIServiceData> = {
  'ai-agents': {
    id: 'ai-agents',
    title: 'Autonomous AI Agents',
    division: 'NextDigi AI',
    tagline: 'Task-driven digital agents that execute complex multi-step workflows',
    description: 'Custom AI agents equipped with document retrieval (RAG), database querying, and tool-use capabilities to automate research, report generation, and data synchronization.',
    longDescription: 'Autonomous AI agents bridge the gap between simple chat models and real business execution. We engineer deterministic agent systems with LangChain, LlamaIndex, and Python that can read files, query internal databases, invoke third-party APIs, and produce finished work without constant human micromanagement.',
    accent: '#8b5cf6',
    icon: CpuChipIcon,
    capabilities: [
      { title: 'Retrieval-Augmented Generation (RAG)', desc: 'Ground your agent in proprietary manuals, customer records, and product databases with sub-second vector search.' },
      { title: 'Tool & API Invocation', desc: 'Allow agents to look up orders, trigger emails, update CRMs, and generate invoices autonomously.' },
      { title: 'Self-Correction & Verification Loops', desc: 'Deterministic validation steps that cross-examine agent outputs against strict business rules before delivery.' },
      { title: 'Audit Logs & Human-in-the-Loop', desc: 'Complete observability of every thought, decision, and tool call with manual approval gates when required.' }
    ],
    deliverables: [
      'Production-deployed AI agent service running on dedicated cloud infrastructure',
      'Vector database configuration with continuous document ingestion pipelines',
      'Admin dashboard to inspect agent traces, token usage, and execution logs',
      'API endpoints and webhook triggers for seamless external software invocation'
    ],
    techStack: ['Python', 'LangChain / LlamaIndex', 'OpenAI / Claude / DeepSeek', 'Pinecone / pgvector', 'FastAPI', 'Docker'],
    faqs: [
      {
        q: 'How do you prevent the AI agent from making mistakes or hallucinating?',
        a: 'We implement strict RAG constraints (the agent cannot answer outside verified documents), schema validation on tool outputs, and optional human confirmation for high-stakes actions.'
      },
      {
        q: 'Can the agent connect to our internal private database?',
        a: 'Yes. We deploy agents inside private VPC networks with read-only database roles and masked personal data (PII) filtering.'
      }
    ]
  },
  'chatbots': {
    id: 'chatbots',
    title: 'Conversational Chatbots',
    division: 'NextDigi AI',
    tagline: 'Multi-channel customer engagement on Web, WhatsApp & Facebook',
    description: 'Intelligent conversational interfaces that understand customer context, answer complex inquiries accurately, and qualify incoming leads 24/7 in English and Bengali.',
    longDescription: 'Standard rule-based chatbots frustrate customers with generic menus. NextDigi AI chatbots understand conversational nuances, handle multi-turn questions, speak both Bengali and English, and seamlessly guide prospects through product selection or support resolution.',
    accent: '#00d4aa',
    icon: ChatBubbleBottomCenterTextIcon,
    capabilities: [
      { title: 'WhatsApp Business API Integration', desc: 'Native WhatsApp communication for order confirmations, customer support, and instant lead capture.' },
      { title: 'Bilingual Bengali & English Understanding', desc: 'Fine-tuned language processing that accurately interprets colloquial Bangla, Banglish, and English.' },
      { title: 'Dynamic Lead Qualification', desc: 'Gathers prospect requirements, budget, and contact info, then syncs instantly into your CRM.' },
      { title: 'Frictionless Human Agent Handoff', desc: 'Instantly transitions complex conversations to live staff with complete previous chat summaries.' }
    ],
    deliverables: [
      'Full multi-channel chatbot integration across website widget, WhatsApp, and Facebook Messenger',
      'Knowledge base ingestion and continuous FAQ learning pipeline',
      'Unified inbox dashboard for your human customer support team',
      'Monthly performance analysis and intent detection reports'
    ],
    techStack: ['Meta WhatsApp Cloud API', 'OpenAI GPT-4o / Claude', 'Node.js / Python', 'WebSockets', 'Tailwind CSS Widget'],
    faqs: [
      {
        q: 'Can the chatbot answer questions about live product inventory or order status?',
        a: 'Yes. The chatbot connects directly to your e-commerce or ERP API to provide real-time order tracking and stock availability.'
      }
    ]
  },
  'ai-support': {
    id: 'ai-support',
    title: 'AI Customer Support Triaging',
    division: 'NextDigi AI',
    tagline: 'Instant Level-1 support resolution and automated ticket routing',
    description: 'Reduce support desk backlogs by over 60%. Automatically categorize incoming support tickets, draft verified responses, and escalate urgent issues to human specialists.',
    longDescription: 'High customer support ticket volume burns out agents and leads to slow resolution times. Our AI Support Triage system reads incoming emails, portal tickets, and messages, understands sentiment and urgency, drafts accurate answers from your knowledge base, and routes tickets to the right human specialist.',
    accent: '#38bdf8',
    icon: LifebuoyIcon,
    capabilities: [
      { title: 'Automatic Categorization & Tagging', desc: 'Sorts tickets into bug reports, billing issues, product questions, or feature requests instantly.' },
      { title: 'Automated Draft Suggestions', desc: 'Pre-fills accurate replies for human support agents to review and send in one click.' },
      { title: 'Sentiment & SLA Urgency Detection', desc: 'Detects angry or high-priority clients and escalates them immediately to senior managers.' },
      { title: 'Knowledge Base Self-Healing', desc: 'Identifies recurring customer questions that lack documentation and suggests new knowledge base articles.' }
    ],
    deliverables: [
      'Integration with Zendesk, Freshdesk, Crisp, or custom support portals',
      'Automated Level-1 ticket auto-responder with safety validation',
      'SLA tracking dashboard with resolution time metrics',
      'Agent training and feedback loop system'
    ],
    techStack: ['Python', 'OpenAI API', 'Zendesk / Freshdesk APIs', 'PostgreSQL', 'FastAPI'],
    faqs: [
      {
        q: 'Does the AI send messages directly to customers without human review?',
        a: 'You have full control: you can configure it in "Co-pilot mode" (drafts for human review) or "Autonomous mode" (sends replies for routine inquiries with high confidence scores).'
      }
    ]
  },
  'automation': {
    id: 'automation',
    title: 'Workflow Automation',
    division: 'NextDigi AI',
    tagline: 'Zero-touch integration between your CRM, billing & operations',
    description: 'Eliminate tedious manual data transfers. We build resilient pipelines using n8n, Make, Zapier, and custom Python microservices to automate end-to-end business workflows.',
    longDescription: 'Manual copy-pasting between spreadsheets, email inboxes, accounting software, and CRMs costs your team hundreds of productive hours. We engineer robust, enterprise-grade workflow pipelines that execute automatically whenever a trigger event occurs.',
    accent: '#f59e0b',
    icon: ArrowsRightLeftIcon,
    capabilities: [
      { title: 'Self-Hosted n8n & Open-Source Pipelines', desc: 'Avoid expensive per-task SaaS fees with dedicated, secure self-hosted automation infrastructure.' },
      { title: 'Lead-to-Cash Pipeline Automation', desc: 'Instant pipeline progression from form submission to CRM record, proposal delivery, and invoice generation.' },
      { title: 'Automated Notifications & Reporting', desc: 'Send daily executive summaries and real-time transaction alerts directly to Slack or Telegram.' },
      { title: 'Error Retries & Failure Alerting', desc: 'Fault-tolerant workflows with automated retry queues that guarantee zero lost customer records.' }
    ],
    deliverables: [
      'Turnkey automated workflows running on private, self-hosted n8n or cloud platforms',
      'Custom webhook endpoints and data transformation microservices',
      'Workflow visual maps and operational runbooks',
      'Proactive error alert channels for IT teams'
    ],
    techStack: ['n8n', 'Python', 'Make / Zapier', 'Docker', 'REST Webhooks', 'PostgreSQL'],
    faqs: [
      {
        q: 'Why self-hosted n8n instead of Zapier?',
        a: 'Self-hosted n8n keeps your company data strictly on your own cloud servers, eliminates expensive tiered per-task subscription costs, and allows unlimited workflow executions.'
      }
    ]
  },
  'ai-video': {
    id: 'ai-video',
    title: 'AI Video & Content Systems',
    division: 'NextDigi AI',
    tagline: 'Scalable avatar video generation and automated media pipelines',
    description: 'Scale your marketing and training media with AI-generated video avatars, multilingual voice synthesis, dynamic captions, and automated social video production.',
    longDescription: 'Producing high-quality video content typically requires expensive studio time, lighting equipment, and endless video editing. We build programmatic AI video workflows that turn script text into studio-grade presenter videos, product showcases, and localized educational content in minutes.',
    accent: '#ec4899',
    icon: VideoCameraIcon,
    capabilities: [
      { title: 'Custom Digital Twin Avatars', desc: 'Create realistic digital likenesses of founders, trainers, or brand spokespersons for scalable content.' },
      { title: 'Multilingual Natural Voice Cloning', desc: 'Synthesize audio in dozens of languages with natural inflection, pauses, and expressive delivery.' },
      { title: 'Programmatic Video Assembly', desc: 'Automate rendering of product promotions, customer testimonials, and localized marketing reels.' },
      { title: 'Dynamic Captions & Formatting', desc: 'Auto-generate engaging animated captions formatted for vertical TikTok/Reels or widescreen YouTube.' }
    ],
    deliverables: [
      'Configured AI video pipeline and template workflows',
      'Trained digital avatar and cloned voice profiles (with verified legal consent)',
      'Automated batch rendering scripts for rapid video generation',
      'Brand style presets including fonts, colors, and motion overlays'
    ],
    techStack: ['HeyGen / ElevenLabs APIs', 'Remotion', 'FFmpeg', 'Python', 'Node.js'],
    faqs: [
      {
        q: 'Are AI-generated voiceovers and avatars legally compliant for advertising?',
        a: 'Yes. We ensure all voice and avatar training follows strict verified consent procedures, providing full commercial usage rights for your marketing channels.'
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(aiData).map((service) => ({ service }));
}

type PageProps = {
  params: Promise<{ service: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const data = aiData[service];

  if (!data) {
    return {
      title: 'AI Service Not Found | NextDigi AI',
      description: 'The requested AI solution could not be found.',
    };
  }

  return generatePageMetadata({
    title: `${data.title} | ${data.division}`,
    description: `${data.tagline}. ${data.description}`,
    path: `/ai/${service}`,
  });
}

export default async function AIServiceDetailPage({ params }: PageProps) {
  const { service } = await params;
  const data = aiData[service];

  if (!data) {
    notFound();
  }

  const IconComponent = data.icon;

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Background Accent */}
      <div 
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[140px] pointer-events-none rounded-full opacity-20"
        style={{ backgroundColor: data.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href="/ai" className="hover:text-[#8b5cf6] transition">NextDigi AI</Link>
          <span>/</span>
          <span className="text-white font-medium">{data.title}</span>
        </nav>

        {/* Hero Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111622]/90 to-[#0c0f17]/90 backdrop-blur-xl p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-gray-300 uppercase mb-5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.accent }} />
            {data.division}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {data.title}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-gray-300 mb-6">
                {data.tagline}
              </p>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                {data.longDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/contact?service=${encodeURIComponent(data.title)}`}
                  className="px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  style={{ backgroundColor: data.accent }}
                >
                  Deploy {data.title}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai"
                  className="px-6 py-3.5 rounded-xl font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  View All AI Solutions
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10">
                  <IconComponent className="w-8 h-8" style={{ color: data.accent }} />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Tech & Integration Ecosystem
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {data.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/40 border border-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-gray-400 flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
                Zero hallucination guardrails & strict data privacy
              </div>
            </div>
          </div>
        </div>

        {/* Technical Capabilities */}
        <div className="mb-16">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Capabilities & Architecture
            </h2>
            <p className="text-gray-400">
              Deterministic, observable, and built to solve actual business bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.capabilities.map((cap, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-[#0e131d] border border-white/10 hover:border-white/20 transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 shrink-0 mt-1">
                    <SparklesIcon className="w-4 h-4" style={{ color: data.accent }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#a78bfa] transition">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="mb-16 bg-[#0c1017] rounded-3xl border border-white/10 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-6">
            What You Receive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-[#00d4aa] shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-4xl">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0e131d] border border-white/10">
                <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-[#8b5cf6]" />
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-[#8b5cf6]/30 bg-gradient-to-r from-[#8b5cf6]/15 via-[#00d4aa]/10 to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to automate with {data.title.toLowerCase()}?
            </h3>
            <p className="text-gray-300 max-w-xl">
              Talk directly with our AI architects to explore how intelligent automation can transform your operations.
            </p>
          </div>
          <Link
            href={`/contact?service=${encodeURIComponent(data.title)}`}
            className="px-8 py-4 rounded-xl font-bold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition shadow-lg shadow-[#8b5cf6]/30 shrink-0"
          >
            Start an AI Project
          </Link>
        </div>

      </div>
    </div>
  );
}
