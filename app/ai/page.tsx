import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  SparklesIcon, 
  ChatBubbleBottomCenterTextIcon, 
  LifebuoyIcon, 
  ArrowsRightLeftIcon, 
  VideoCameraIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: "NextDigi AI | AI Agents, Chatbots & Intelligent Workflow Automation",
  description: "Deploy autonomous AI agents, multi-channel customer chatbots, intelligent support triaging, and end-to-end workflow automations to eliminate repetitive business operations.",
  path: "/ai",
});

export default function NextDigiAIPage() {
  const aiServices = [
    {
      id: 'ai-agents',
      title: 'Autonomous AI Agents',
      tagline: 'Task-driven digital agents that execute complex multi-step workflows',
      description: 'Custom AI agents equipped with document retrieval (RAG), database querying, and tool-use capabilities to automate research, report generation, and data synchronization.',
      icon: CpuChipIcon,
      accent: '#8b5cf6',
      badge: 'Core Intelligence',
      features: ['Retrieval-Augmented Generation (RAG)', 'Tool & API Invocation', 'Document Analysis & Extraction', 'Custom Knowledge Sandboxes'],
      href: '/ai/ai-agents',
    },
    {
      id: 'chatbots',
      title: 'Conversational Chatbots',
      tagline: 'Multi-channel customer engagement on Web, WhatsApp & Facebook',
      description: 'Intelligent conversational interfaces that understand customer context, answer complex inquiries accurately, and qualify incoming leads 24/7 in English and Bengali.',
      icon: ChatBubbleBottomCenterTextIcon,
      accent: '#00d4aa',
      badge: 'Customer Engagement',
      features: ['WhatsApp Business API Ready', 'Bilingual (Bangla & English) NLU', 'Lead Qualification & Booking', 'Seamless Human Agent Handoff'],
      href: '/ai/chatbots',
    },
    {
      id: 'ai-support',
      title: 'AI Customer Support Triaging',
      tagline: 'Instant Level-1 support resolution and automated ticket routing',
      description: 'Reduce support desk backlogs by over 60%. Automatically categorize incoming support tickets, draft verified responses, and escalate urgent issues to human specialists.',
      icon: LifebuoyIcon,
      accent: '#38bdf8',
      badge: 'Support Operations',
      features: ['Ticket Sentiment & Urgency Scoring', 'Automated Knowledge Base Sync', 'CRM & Helpdesk Integration', 'Audit Trails & Human Review'],
      href: '/ai/ai-support',
    },
    {
      id: 'automation',
      title: 'Workflow Automation',
      tagline: 'Zero-touch integration between your CRM, billing & operations',
      description: 'Eliminate tedious manual data transfers. We build resilient pipelines using n8n, Make, Zapier, and custom Python microservices to automate end-to-end business workflows.',
      icon: ArrowsRightLeftIcon,
      accent: '#f59e0b',
      badge: 'Operational Efficiency',
      features: ['n8n & Custom Webhook Architecture', 'Automated Lead-to-CRM Routing', 'Financial & Invoice Automation', 'Multi-app Event Listeners'],
      href: '/ai/automation',
    },
    {
      id: 'ai-video',
      title: 'AI Video & Content Systems',
      tagline: 'Scalable avatar video generation and automated media pipelines',
      description: 'Scale your marketing and training media with AI-generated video avatars, multilingual voice synthesis, dynamic captions, and automated social video production.',
      icon: VideoCameraIcon,
      accent: '#ec4899',
      badge: 'Creative Production',
      features: ['Photorealistic AI Avatars', 'Natural Multilingual Voiceovers', 'Automated Short-form Video Cuts', 'Product Demonstration Video Kits'],
      href: '/ai/ai-video',
    },
  ];

  const benefits = [
    {
      title: 'Continuous 24/7 Availability',
      desc: 'Customer questions, lead capture, and data pipelines never sleep, operating uninterrupted day and night.',
      icon: BoltIcon,
    },
    {
      title: 'Zero Hallucination Guardrails',
      desc: 'We enforce strict factual grounding with vector databases and validation checkpoints before outputting answers.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Full Data Sovereignty',
      desc: 'Your proprietary company data is kept private with dedicated tenant sandboxes and enterprise LLM agreements.',
      icon: SparklesIcon,
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Background Neon Blurs */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[350px] bg-[#8b5cf6]/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-96 right-1/4 w-[500px] h-[300px] bg-[#00d4aa]/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-[#8b5cf6] font-medium">NextDigi AI</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs font-semibold tracking-wider text-[#a78bfa] uppercase mb-5">
            <SparklesIcon className="w-4 h-4 text-[#8b5cf6]" />
            DIVISION: NEXTDIGI AI
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Intelligent AI Agents & <span className="bg-gradient-to-r from-[#8b5cf6] via-[#a855f7] to-[#00d4aa] bg-clip-text text-transparent">Automated Operations</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Stop losing hours to repetitive tasks and slow support queues. We build custom conversational AI, task agents, and automated data pipelines that operate your business with machine precision.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?service=AI%20Automation"
              className="px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] hover:from-[#9d72f9] hover:to-[#8b5cf6] transition shadow-lg shadow-[#8b5cf6]/25 flex items-center gap-2"
            >
              Deploy an AI Solution
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="#services"
              className="px-6 py-3.5 rounded-xl font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Explore AI Capabilities
            </Link>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {benefits.map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0c1017] border border-white/10 hover:border-[#8b5cf6]/30 transition">
              <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#a78bfa] mb-4">
                <b.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* AI Services Grid */}
        <div id="services" className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#8b5cf6] uppercase">What We Build</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Our AI & Automation Systems</h2>
            </div>
            <p className="text-sm text-gray-400 mt-2 sm:mt-0 max-w-md">
              Engineered for actual business utility — zero gimmicks, pure operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="rounded-2xl border border-white/10 bg-[#0e131d]/80 hover:bg-[#111724] p-7 transition-all duration-300 flex flex-col justify-between hover:border-[#8b5cf6]/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-105 transition-transform" style={{ color: service.accent }}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#a78bfa] transition">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-[#8b5cf6] mb-3">
                      {service.tagline}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircleIcon className="w-4 h-4 text-[#8b5cf6] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition group-hover:border-[#8b5cf6]/40"
                  >
                    <span>View Specifications</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* How We Integrate AI Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111622] to-[#0a0d14] p-8 sm:p-12 mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wider">Implementation Methodology</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
              How NextDigi AI Deploys Into Your Stack
            </h2>
            <p className="text-sm text-gray-400">
              We do not introduce messy experimental scripts. We engineer stable, monitored, and compliant AI solutions that integrate cleanly into your existing database and CRM.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Audit & Knowledge Mapping', desc: 'Identify high-friction manual bottlenecks and map your business documents and rules.' },
              { step: '02', title: 'RAG & Tool Integration', desc: 'Connect LLMs to private vector stores, databases, and external APIs with validation guardrails.' },
              { step: '03', title: 'Sandboxed Testing', desc: 'Rigorous benchmark evaluation to eliminate hallucination risks and ensure accurate policy compliance.' },
              { step: '04', title: 'Continuous Monitoring', desc: 'Telemetry tracking latency, response quality, and human escalation handoffs with SLA support.' }
            ].map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl font-black text-[#8b5cf6]/50 block mb-2">{s.step}</span>
                <h4 className="text-sm font-bold text-white mb-1">{s.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl border border-[#8b5cf6]/30 bg-gradient-to-r from-[#8b5cf6]/15 via-[#00d4aa]/10 to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to automate your business operations?
            </h3>
            <p className="text-gray-300 max-w-xl text-sm sm:text-base">
              Consult with our AI engineering team to assess where autonomous agents and workflow automations will yield the highest operational return.
            </p>
          </div>
          <Link
            href="/contact?service=NextDigi%20AI"
            className="px-8 py-4 rounded-xl font-bold text-white bg-[#8b5cf6] hover:bg-[#7c3aed] transition shadow-lg shadow-[#8b5cf6]/30 shrink-0"
          >
            Start an AI Project
          </Link>
        </div>

      </div>
    </div>
  );
}
