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
  BoltIcon,
  CommandLineIcon,
  CircleStackIcon,
  CodeBracketIcon,
  ChevronRightIcon,
  ArrowRightCircleIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  MegaphoneIcon,
  PuzzlePieceIcon,
  BeakerIcon,
  EyeIcon,
  LockClosedIcon,
  ServerIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';


export const metadata: Metadata = generatePageMetadata({
  title: 'NextDigi AI | AI Agents, Automation & Intelligent Business Solutions',
  description:
    'NextDigi AI builds practical AI agents, chatbots, business automation, AI integrations and intelligent software solutions for modern businesses.',
  path: '/ai',
  keywords: [
    'AI agents', 'AI chatbots', 'business automation', 'workflow automation',
    'AI integration', 'AI customer support', 'AI content', 'NextDigi AI',
    'intelligent automation', 'AI software solutions Bangladesh',
  ],
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const AI_SERVICES = [
  {
    id: 'ai-agents', number: '01', title: 'AI Agents',
    description: 'Build AI agents that can understand instructions, use tools and perform defined business tasks.',
    icon: CpuChipIcon, accent: '#8b5cf6',
    gradient: 'from-[#8b5cf6]/20 to-transparent',
    borderGlow: 'hover:border-[#8b5cf6]/50 hover:shadow-[0_0_28px_rgba(139,92,246,0.10)]',
    examples: ['Lead Qualification', 'Customer Support', 'Internal Knowledge Assistance', 'Task Automation', 'Data Processing'],
    cta: 'Build an AI Agent',
  },
  {
    id: 'ai-chatbots', number: '02', title: 'AI Chatbots',
    description: 'Deploy conversational AI for websites, customer portals and business applications.',
    icon: ChatBubbleBottomCenterTextIcon, accent: '#00d4aa',
    gradient: 'from-[#00d4aa]/20 to-transparent',
    borderGlow: 'hover:border-[#00d4aa]/50 hover:shadow-[0_0_28px_rgba(0,212,170,0.10)]',
    examples: ['Customer FAQ', 'Product Questions', 'Lead Capture', 'Appointment Assistance', 'Support'],
    cta: 'Build an AI Chatbot',
  },
  {
    id: 'ai-support', number: '03', title: 'AI Customer Support',
    description: 'Automate repetitive customer questions while keeping escalation paths for human support.',
    icon: LifebuoyIcon, accent: '#38bdf8',
    gradient: 'from-[#38bdf8]/20 to-transparent',
    borderGlow: 'hover:border-[#38bdf8]/50 hover:shadow-[0_0_28px_rgba(56,189,248,0.10)]',
    examples: ['FAQ Automation', 'Order Status', 'Product Information', 'Support Routing', 'Lead Collection'],
    cta: 'Automate Customer Support',
  },
  {
    id: 'business-automation', number: '04', title: 'Business Automation',
    description: 'Connect AI with business workflows to reduce repetitive manual tasks.',
    icon: BoltIcon, accent: '#f59e0b',
    gradient: 'from-[#f59e0b]/20 to-transparent',
    borderGlow: 'hover:border-[#f59e0b]/50 hover:shadow-[0_0_28px_rgba(245,158,11,0.10)]',
    examples: ['Lead Processing', 'Email Automation', 'Notifications', 'Data Entry', 'Document Processing', 'Approval Workflows'],
    cta: 'Automate My Business',
  },
  {
    id: 'workflow-automation', number: '05', title: 'Workflow Automation',
    description: 'Design automated workflows between business systems.',
    icon: ArrowsRightLeftIcon, accent: '#10b981',
    gradient: 'from-[#10b981]/20 to-transparent',
    borderGlow: 'hover:border-[#10b981]/50 hover:shadow-[0_0_28px_rgba(16,185,129,0.10)]',
    examples: ['CRM', 'Email', 'Forms', 'Databases', 'APIs', 'Webhooks', 'Notifications', 'Internal Systems'],
    cta: 'Automate a Workflow',
  },
  {
    id: 'ai-integration', number: '06', title: 'AI + API Integration',
    description: 'Connect AI models with existing business software.',
    icon: PuzzlePieceIcon, accent: '#ec4899',
    gradient: 'from-[#ec4899]/20 to-transparent',
    borderGlow: 'hover:border-[#ec4899]/50 hover:shadow-[0_0_28px_rgba(236,72,153,0.10)]',
    examples: ['REST APIs', 'Business APIs', 'CRM Integration', 'ERP Integration', 'E-commerce', 'Internal Databases'],
    cta: 'Integrate AI',
  },
  {
    id: 'ai-content', number: '07', title: 'AI Content & Video',
    description: 'Create AI-assisted content and video workflows for businesses.',
    icon: VideoCameraIcon, accent: '#a78bfa',
    gradient: 'from-[#a78bfa]/20 to-transparent',
    borderGlow: 'hover:border-[#a78bfa]/50 hover:shadow-[0_0_28px_rgba(167,139,250,0.10)]',
    examples: ['AI Video Production', 'Product Videos', 'Social Media Videos', 'Marketing Creatives', 'AI Content Workflows'],
    cta: 'Create AI Content',
  },
  {
    id: 'ai-powered-systems', number: '08', title: 'AI-Powered Business Systems',
    description: 'Add AI capabilities to existing software.',
    icon: CommandLineIcon, accent: '#06b6d4',
    gradient: 'from-[#06b6d4]/20 to-transparent',
    borderGlow: 'hover:border-[#06b6d4]/50 hover:shadow-[0_0_28px_rgba(6,182,212,0.10)]',
    examples: ['AI Search', 'AI Recommendations', 'AI Reporting', 'AI Summaries', 'AI Data Analysis', 'AI Knowledge Bases'],
    cta: 'Add AI To My Software',
  },
];

const USE_CASES = [
  { id: 'sales', icon: ChartBarIcon, title: 'Sales', accent: '#00d4aa', description: 'Automatically qualify incoming leads and route high-intent prospects to your team for faster follow-up.' },
  { id: 'customer-support', icon: LifebuoyIcon, title: 'Customer Support', accent: '#8b5cf6', description: 'Answer common questions and route complex cases to the right team member — reducing repetitive support work.' },
  { id: 'marketing', icon: MegaphoneIcon, title: 'Marketing', accent: '#38bdf8', description: 'Assist with content generation, campaign workflows, audience segmentation and marketing data analysis.' },
  { id: 'operations', icon: WrenchScrewdriverIcon, title: 'Operations', accent: '#f59e0b', description: 'Automate repetitive tasks across multiple systems — data entry, approvals, notifications and document processing.' },
  { id: 'ecommerce', icon: BuildingStorefrontIcon, title: 'E-commerce', accent: '#ec4899', description: 'Support product discovery, customer questions, order status and post-purchase workflows.' },
  { id: 'reporting', icon: ChartBarIcon, title: 'Reporting', accent: '#10b981', description: 'Turn business data into readable summaries, scheduled reports and actionable insights.' },
  { id: 'hr', icon: UserGroupIcon, title: 'HR', accent: '#a78bfa', description: 'Assist with internal queries, onboarding information, policy FAQs and routine HR administrative tasks.' },
  { id: 'knowledge', icon: CircleStackIcon, title: 'Internal Knowledge', accent: '#06b6d4', description: 'Build AI assistants that can search your company documents, SOPs and knowledge base on demand.' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discover', description: 'Identify the business problem and determine whether AI is actually the right solution.', accent: '#00d4aa' },
  { step: '02', title: 'Design', description: 'Define the AI workflow, data sources, tools and human oversight requirements.', accent: '#8b5cf6' },
  { step: '03', title: 'Build', description: 'Develop the AI agent, assistant or automation workflow with proper safeguards.', accent: '#38bdf8' },
  { step: '04', title: 'Integrate', description: 'Connect APIs, databases, business systems and required third-party tools.', accent: '#ec4899' },
  { step: '05', title: 'Test', description: 'Evaluate accuracy, reliability, security and failure/escalation scenarios.', accent: '#f59e0b' },
  { step: '06', title: 'Launch & Improve', description: 'Deploy, monitor and continuously improve the system based on real usage.', accent: '#10b981' },
];

const AUTOMATION_EXAMPLES = [
  { id: 'lead', title: 'Lead Automation', accent: '#00d4aa', steps: ['Facebook / Website Lead', 'AI Qualification', 'CRM / Database', 'Notification', 'Sales Team'] },
  { id: 'support', title: 'Customer Support', accent: '#8b5cf6', steps: ['Customer Question', 'AI Assistant', 'Knowledge Base', 'Answer', 'Human Escalation'] },
  { id: 'ecommerce', title: 'E-commerce', accent: '#38bdf8', steps: ['Customer', 'AI Product Assistant', 'Product Data', 'Recommendation', 'Purchase'] },
  { id: 'operations', title: 'Internal Operations', accent: '#f59e0b', steps: ['Employee Request', 'AI Assistant', 'Business Data', 'Workflow', 'Result'] },
];

const RESPONSIBLE_AI = [
  { icon: EyeIcon, title: 'Human Oversight', description: 'AI systems are designed with appropriate human review and escalation paths.', accent: '#00d4aa' },
  { icon: LockClosedIcon, title: 'Access Control', description: 'Permissions are scoped to what each system needs — nothing more.', accent: '#8b5cf6' },
  { icon: ShieldCheckIcon, title: 'Data Protection', description: 'Business data is handled according to the agreed scope and access requirements.', accent: '#38bdf8' },
  { icon: CheckCircleIcon, title: 'Validation', description: 'AI outputs are validated before they affect business decisions or customer responses.', accent: '#ec4899' },
  { icon: ServerIcon, title: 'Monitoring', description: 'Deployed systems are monitored for accuracy, failures and edge cases.', accent: '#f59e0b' },
  { icon: ArrowsRightLeftIcon, title: 'Fallback Workflows', description: 'Every automation has defined fallback paths when AI cannot handle a case.', accent: '#10b981' },
];

const ENGAGEMENT_MODELS = [
  { number: '01', title: 'AI Consultation', description: 'Identify opportunities and define an AI implementation roadmap.', accent: '#00d4aa' },
  { number: '02', title: 'AI Prototype', description: 'Build and validate a focused AI use case.', accent: '#8b5cf6' },
  { number: '03', title: 'AI Implementation', description: 'Deploy AI into an existing business workflow or application.', accent: '#38bdf8' },
  { number: '04', title: 'Custom AI System', description: 'Build a more advanced AI-powered business solution.', accent: '#f59e0b' },
];

const AI_TECH_STACK = [
  { category: 'AI APIs & LLMs', accent: '#8b5cf6', techs: ['OpenAI API', 'Google Gemini API', 'Anthropic Claude API'] },
  { category: 'Automation Platforms', accent: '#00d4aa', techs: ['n8n', 'Custom Webhooks', 'REST API Pipelines'] },
  { category: 'Vector & Knowledge', accent: '#38bdf8', techs: ['Vector Databases', 'RAG Systems', 'Knowledge Bases'] },
  { category: 'Integration', accent: '#f59e0b', techs: ['REST APIs', 'Webhooks', 'CRM APIs', 'ERP APIs'] },
  { category: 'Infrastructure', accent: '#ec4899', techs: ['Cloud Hosting', 'Docker', 'Vercel', 'Node.js'] },
  { category: 'Data', accent: '#10b981', techs: ['MySQL', 'MongoDB', 'PostgreSQL'] },
];

const AGENT_FLOW = [
  { label: 'User', sub: 'Sends a request or question', accent: '#00d4aa' },
  { label: 'AI Agent', sub: 'Receives and processes input', accent: '#8b5cf6' },
  { label: 'Understand', sub: 'Interprets intent and context', accent: '#38bdf8' },
  { label: 'Reason', sub: 'Determines the appropriate action', accent: '#a78bfa' },
  { label: 'Use Tools', sub: 'Calls APIs, searches data sources', accent: '#ec4899' },
  { label: 'Access Data', sub: 'Retrieves relevant information', accent: '#f59e0b' },
  { label: 'Take Action', sub: 'Executes the task or workflow', accent: '#10b981' },
  { label: 'Report Result', sub: 'Returns the outcome to the user', accent: '#06b6d4' },
];

const FAQ = [
  { q: 'What kind of AI solutions does NextDigi build?', a: 'We build practical AI agents, chatbots, business automation workflows, AI-integrated software systems and AI-assisted content pipelines. Our focus is on real business utility rather than AI for its own sake.' },
  { q: 'Can you add AI to our existing website or software?', a: 'Yes. We can add AI capabilities — such as search, Q&A assistants, automation and data processing — to existing websites, e-commerce platforms, SaaS products and custom business software.' },
  { q: 'Can you build custom AI agents?', a: 'Yes. We design and build AI agents tailored to specific business tasks — lead qualification, support routing, internal knowledge retrieval, document processing and defined operational workflows.' },
  { q: 'Can AI connect to our existing APIs and databases?', a: 'Yes. AI systems can be integrated with your existing REST APIs, databases, CRM systems, ERP platforms and business tools as part of a defined integration scope.' },
  { q: 'Can you automate customer support?', a: 'We can build AI systems that handle frequently asked questions and routine inquiries. Human escalation paths are always defined so complex cases reach your team appropriately.' },
  { q: 'Can you integrate AI with e-commerce?', a: 'Yes. AI can assist with product discovery, customer Q&A, order-related queries and post-purchase workflows in e-commerce environments.' },
  { q: 'How do you handle human escalation?', a: 'Every AI system we build includes defined escalation paths. When the AI cannot confidently resolve a query, the system routes the case to a human operator or support channel.' },
  { q: 'How does an AI project start?', a: 'We begin with a discovery conversation to understand the business problem, current systems and where AI can create measurable value. From there we define scope, approach and timeline.' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NextDigiAIPage() {
  return (
    <div className="min-h-screen bg-[#0f0f12]">

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section id="ai-hero" aria-label="NextDigi AI hero" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden border-b border-[#1e1e26]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,92,246,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(0,212,170,0.09) 0%, transparent 50%)' }} />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 backdrop-blur-md mb-7">
              <SparklesIcon className="w-3.5 h-3.5 text-[#a78bfa]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#a78bfa]">NEXTDIGI AI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight mb-6 leading-[1.08]">
              AI That Works For{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #00d4aa 60%, #38bdf8 100%)' }}>
                Your Business.
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#8c8c9a] max-w-3xl mx-auto leading-relaxed mb-10">
              We design practical AI agents, intelligent automation and AI-powered business systems that reduce repetitive work, improve customer experiences and help teams operate more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link id="hero-ai-project-btn" href="/contact?service=ai" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white shadow-lg shadow-[#8b5cf6]/25 hover:brightness-110 active:scale-95 transition-all" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                <span>Start an AI Project</span>
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a id="hero-ai-specialist-btn" href="#services" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-[#1a1a1f] border border-[#2a2a30] text-white hover:border-[#8b5cf6]/50 hover:bg-white/5 transition-all">
                Talk to an AI Specialist
              </a>
            </div>
            <div className="border-t border-white/[0.06] pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {[{ label: 'AI Agents', accent: '#8b5cf6' }, { label: 'Chatbots', accent: '#00d4aa' }, { label: 'Automation', accent: '#38bdf8' }, { label: 'AI Integrations', accent: '#f59e0b' }, { label: 'AI Content', accent: '#ec4899' }, { label: 'AI Systems', accent: '#10b981' }].map((cap) => (
                <span key={cap.label} className="flex items-center gap-2 text-xs font-semibold text-[#a1a1aa]">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cap.accent }} />
                  {cap.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DO ────────────────────────────────────────────────── */}
      <section id="what-we-do" aria-labelledby="what-we-do-heading" className="py-20 lg:py-28 bg-[#0a0a0d] border-b border-[#1e1e26] relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#8b5cf6]/[0.05] blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">WHAT WE DO</span>
            <h2 id="what-we-do-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">Practical AI for Real Business Problems</h2>
            <p className="text-[#8c8c9a] text-base sm:text-lg leading-relaxed">
              We help businesses identify repetitive processes, customer-service bottlenecks and operational tasks where AI and automation can create measurable efficiency. We build systems that are genuinely useful — not AI for its own sake.
            </p>
          </div>
        </div>
      </section>

      {/* ─── AI SERVICES ───────────────────────────────────────────────── */}
      <section id="services" aria-labelledby="services-heading" className="py-20 lg:py-28 relative">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#8b5cf6]/[0.04] blur-[140px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">AI SERVICES</span>
            <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">What We Build</h2>
            <p className="text-[#8c8c9a] text-base sm:text-lg leading-relaxed">From conversational AI to full automation workflows — engineered for actual business utility.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {AI_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div key={srv.id} className={`rounded-2xl bg-[#121217] border border-[#222229] p-6 flex flex-col justify-between transition-all duration-300 ${srv.borderGlow} group relative overflow-hidden`}>
                  <div aria-hidden="true" className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${srv.gradient} rounded-bl-full pointer-events-none`} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0" style={{ backgroundColor: `${srv.accent}18`, color: srv.accent }}>
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <span aria-hidden="true" className="text-2xl font-black opacity-20 group-hover:opacity-50 transition-opacity tabular-nums" style={{ color: srv.accent }}>{srv.number}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#8b5cf6] transition-colors">{srv.title}</h3>
                    <p className="text-xs text-[#8c8c9a] leading-relaxed mb-5">{srv.description}</p>
                    <div className="space-y-1.5 mb-5 pt-4 border-t border-white/[0.06]">
                      {srv.examples.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                          <CheckCircleIcon className="w-3.5 h-3.5 shrink-0" style={{ color: srv.accent }} aria-hidden="true" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href={`/contact?service=${encodeURIComponent(srv.title)}`} id={`ai-service-cta-${srv.id}`} className="relative z-10 inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl text-xs font-bold bg-white/[0.04] border border-white/10 text-white hover:bg-white/[0.09] hover:border-white/20 transition-all group/btn mt-2" aria-label={`${srv.cta} — ${srv.title}`}>
                    <span>{srv.cta}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─────────────────────────────────────────────────── */}
      <section id="use-cases" aria-labelledby="use-cases-heading" className="py-20 lg:py-28 bg-[#0a0a0d] border-t border-b border-[#1e1e26] relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[350px] bg-[#00d4aa]/[0.04] blur-[130px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">USE CASES</span>
            <h2 id="use-cases-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">Where AI Can Help</h2>
            <p className="text-[#8c8c9a] text-base leading-relaxed">Practical AI and automation applications across common business functions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USE_CASES.map((uc) => {
              const UcIcon = uc.icon;
              return (
                <div key={uc.id} className="rounded-2xl bg-[#121217] border border-[#222229] p-6 hover:border-white/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-white/10" style={{ backgroundColor: `${uc.accent}18`, color: uc.accent }}>
                    <UcIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[#8b5cf6] transition-colors">{uc.title}</h3>
                  <p className="text-xs text-[#8c8c9a] leading-relaxed">{uc.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── AI AGENT WORKFLOW ─────────────────────────────────────────── */}
      <section id="ai-workflow" aria-labelledby="workflow-heading" className="py-20 lg:py-28 relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#8b5cf6]/[0.05] blur-[130px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">AI AGENT FLOW</span>
            <h2 id="workflow-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">From Question to Action</h2>
            <p className="text-[#8c8c9a] text-base leading-relaxed">How a NextDigi AI agent processes a business task — from input to result.</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {AGENT_FLOW.map((node, idx) => (
                <div key={node.label} className="relative flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border transition-all group-hover:scale-105" style={{ backgroundColor: `${node.accent}18`, borderColor: `${node.accent}30` }}>
                    <span className="text-xs font-black tabular-nums" style={{ color: node.accent }}>{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  {idx % 4 !== 3 && idx < AGENT_FLOW.length - 1 && (
                    <div aria-hidden="true" className="absolute right-0 top-7 -translate-y-1/2 hidden sm:block">
                      <ChevronRightIcon className="w-4 h-4 opacity-30 text-white" />
                    </div>
                  )}
                  <p className="text-xs font-bold text-white mb-1">{node.label}</p>
                  <p className="text-[10px] text-[#71717a] leading-relaxed">{node.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-[#71717a] italic">Conceptual architecture — actual implementation varies based on project requirements and scope.</p>
          </div>
        </div>
      </section>

      {/* ─── AUTOMATION EXAMPLES ───────────────────────────────────────── */}
      <section id="automation-examples" aria-labelledby="examples-heading" className="py-20 lg:py-28 bg-[#0a0a0d] border-t border-b border-[#1e1e26] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">EXAMPLES</span>
            <h2 id="examples-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">Automation Architecture Examples</h2>
            <p className="text-[#8c8c9a] text-base leading-relaxed">Representative workflow patterns — not claimed client deployments.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AUTOMATION_EXAMPLES.map((ex) => (
              <div key={ex.id} className="rounded-2xl bg-[#121217] border border-[#222229] p-6 hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
                <div aria-hidden="true" className="absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full opacity-15 pointer-events-none" style={{ backgroundColor: ex.accent }} />
                <h3 className="text-sm font-bold mb-5 relative z-10" style={{ color: ex.accent }}>{ex.title}</h3>
                <div className="relative z-10 space-y-2">
                  {ex.steps.map((step, i) => (
                    <div key={step} className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 border border-white/10" style={{ backgroundColor: `${ex.accent}18`, color: ex.accent }}>{i + 1}</div>
                        <span className="text-xs text-[#d4d4d8]">{step}</span>
                      </div>
                      {i < ex.steps.length - 1 && <div className="ml-3 w-px h-3 bg-white/10 my-0.5" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI TECHNOLOGY STACK ───────────────────────────────────────── */}
      <section id="ai-technology" aria-labelledby="ai-tech-heading" className="py-20 lg:py-28 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">TECHNOLOGY</span>
            <h2 id="ai-tech-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">AI Technology Stack</h2>
            <p className="text-[#8c8c9a] text-base leading-relaxed">Technologies we use and support in AI project implementations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_TECH_STACK.map((group) => (
              <div key={group.category} className="rounded-2xl bg-[#121217] border border-[#222229] p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-5">
                  <div aria-hidden="true" className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.accent }} />
                  <span className="text-xs font-bold uppercase tracking-[2px]" style={{ color: group.accent }}>{group.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.techs.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#d4d4d8] hover:border-white/25 hover:text-white transition-colors cursor-default">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#71717a] mt-6">AI providers listed as supported integration targets — not claimed official partnerships.</p>
        </div>
      </section>

      {/* ─── HOW WE BUILD AI ───────────────────────────────────────────── */}
      <section id="process" aria-labelledby="process-heading" className="py-20 lg:py-28 bg-[#0a0a0d] border-t border-b border-[#1e1e26] relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#8b5cf6]/[0.04] blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-[#00d4aa]/[0.04] blur-[100px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">PROCESS</span>
            <h2 id="process-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">How We Build AI Systems</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((st) => (
              <div key={st.step} className="relative p-7 rounded-2xl bg-[#121217] border border-[#222229] group hover:border-white/20 transition-all duration-300 overflow-hidden">
                <span aria-hidden="true" className="text-5xl font-black block mb-4 transition-opacity opacity-20 group-hover:opacity-60 tabular-nums" style={{ color: st.accent }}>{st.step}</span>
                <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                <p className="text-sm text-[#8c8c9a] leading-relaxed">{st.description}</p>
                <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${st.accent}60, transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESPONSIBLE AI ────────────────────────────────────────────── */}
      <section id="responsible-ai" aria-labelledby="responsible-heading" className="py-20 lg:py-28 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#8b5cf6]/20 bg-[#0e0e14] p-8 sm:p-12 relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 w-72 h-72 bg-[#8b5cf6]/[0.07] blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="max-w-2xl mb-10">
                <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">RESPONSIBLE AI</span>
                <h2 id="responsible-heading" className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">Built With Human Oversight</h2>
                <p className="text-[#8c8c9a] text-base leading-relaxed">
                  AI systems should be designed with appropriate permissions, validation, monitoring and human escalation. We build automation around practical business requirements rather than blindly automating critical decisions.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {RESPONSIBLE_AI.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/15 transition-all">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10" style={{ backgroundColor: `${item.accent}18`, color: item.accent }}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-[#8c8c9a] leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEXTDIGI LABS ─────────────────────────────────────────────── */}
      <section id="ai-products" aria-labelledby="labs-heading" className="py-20 lg:py-28 bg-[#0a0a0d] border-t border-b border-[#1e1e26] relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-[#00d4aa]/[0.04] blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">NEXTDIGI LABS</span>
            <h2 id="labs-heading" className="text-3xl sm:text-4xl font-black text-white mb-4">AI-Powered Products From NextDigi Labs</h2>
            <p className="text-[#8c8c9a] text-base leading-relaxed">Internal products built and operated by the NextDigi team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-[#121217] border border-[#00d4aa]/30 p-6 hover:border-[#00d4aa]/50 transition-all group relative overflow-hidden">
              <div aria-hidden="true" className="absolute top-0 right-0 w-28 h-28 bg-[#00d4aa]/10 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 text-[10px] font-bold uppercase tracking-[1.5px] text-[#00d4aa] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse" aria-hidden="true" />
                  Live Product
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">NextDigi Commerce</h3>
                <p className="text-xs text-[#8c8c9a] leading-relaxed mb-5">AI-powered e-commerce automation platform with automated payment webhooks, courier consignment dispatch and order management workflows.</p>
                <a href="https://commerce.nextdigihome.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#00d4aa] hover:text-white transition-colors">
                  Visit NextDigi Commerce
                  <ArrowRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-[#121217] border border-[#222229] p-6 relative overflow-hidden opacity-70">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-bold uppercase tracking-[1.5px] text-[#71717a] mb-4">Coming Soon</div>
                <h3 className="text-lg font-bold text-white mb-2">NextDigi Social</h3>
                <p className="text-xs text-[#71717a] leading-relaxed">AI-assisted social media scheduling and content workflow platform. In development.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-[#121217] border border-[#222229] p-6 relative overflow-hidden opacity-70">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-bold uppercase tracking-[1.5px] text-[#71717a] mb-4">Coming Soon</div>
                <h3 className="text-lg font-bold text-white mb-2">NextDigi Automate</h3>
                <p className="text-xs text-[#71717a] leading-relaxed">Visual workflow automation platform for business process automation. In development.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/labs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#1a1a1f] border border-[#2a2a30] text-white hover:border-[#8b5cf6]/50 hover:text-[#a78bfa] transition-all">
              Explore NextDigi Labs
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── AI SOLUTIONS IN DEVELOPMENT ──────────────────────────────── */}
      <section id="ai-development" aria-labelledby="ai-dev-heading" className="py-20 lg:py-28 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#8b5cf6]/20 bg-[#0e0e14] p-8 sm:p-12 relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 left-0 w-64 h-64 bg-[#8b5cf6]/[0.06] blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 mb-4">
                  <BeakerIcon className="w-3.5 h-3.5 text-[#a78bfa]" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#a78bfa]">AI SOLUTIONS</span>
                </div>
                <h2 id="ai-dev-heading" className="text-2xl sm:text-3xl font-black text-white mb-3">AI Solutions in Development</h2>
                <p className="text-sm text-[#8c8c9a] max-w-xl leading-relaxed">The NextDigi team is actively building and testing AI systems internally. As these are validated, implementation services become available to clients. We share what we genuinely build — not what we claim.</p>
              </div>
              <Link href="/case-studies" className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border border-[#8b5cf6]/40 bg-[#8b5cf6]/15 text-[#c4b5fd] hover:bg-[#8b5cf6]/25 hover:border-[#8b5cf6]/60 transition-all whitespace-nowrap">
                View Case Studies
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CROSS-SELL: SOLUTIONS ─────────────────────────────────────── */}
      <section id="solutions-crossell" aria-label="NextDigi Solutions cross-sell" className="py-16 lg:py-20 bg-[#0a0a0d] border-t border-b border-[#1e1e26] relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00d4aa]/[0.04] blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#00d4aa]/20 bg-[#0e0e14] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div aria-hidden="true" className="absolute bottom-0 right-0 w-72 h-72 bg-[#00d4aa]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 mb-4">
                <CodeBracketIcon className="w-3.5 h-3.5 text-[#00d4aa]" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#00d4aa]">NEXTDIGI SOLUTIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Already Have Software? Make It Smarter.</h2>
              <p className="text-sm text-[#8c8c9a] max-w-xl leading-relaxed">We can add AI capabilities to websites, e-commerce platforms, mobile apps, SaaS products and custom business software built with any stack.</p>
            </div>
            <Link id="solutions-crossell-btn" href="/solutions" className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border border-[#00d4aa]/35 bg-[#00d4aa]/10 text-[#00d4aa] hover:bg-[#00d4aa]/20 hover:border-[#00d4aa]/55 transition-all whitespace-nowrap">
              Upgrade My Software
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CROSS-SELL: GROWTH ────────────────────────────────────────── */}
      <section id="growth-crossell" aria-label="NextDigi Growth cross-sell" className="py-16 lg:py-20 border-t border-[#1e1e26] relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-[#38bdf8]/[0.04] blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#38bdf8]/20 bg-[#0e0e14] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 left-0 w-60 h-60 bg-[#38bdf8]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38bdf8]/30 bg-[#38bdf8]/10 mb-4">
                <ChartBarIcon className="w-3.5 h-3.5 text-[#38bdf8]" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#38bdf8]">NEXTDIGI GROWTH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">AI Meets Digital Growth</h2>
              <p className="text-sm text-[#8c8c9a] max-w-xl leading-relaxed">Combine AI-powered content and automation with social media, paid advertising, SEO and analytics through NextDigi Growth.</p>
            </div>
            <Link id="growth-crossell-btn" href="/growth" className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border border-[#38bdf8]/35 bg-[#38bdf8]/10 text-[#38bdf8] hover:bg-[#38bdf8]/20 hover:border-[#38bdf8]/55 transition-all whitespace-nowrap">
              Explore NextDigi Growth
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT MODELS ─────────────────────────────────────────── */}
      <section id="engagement-models" aria-labelledby="engagement-heading" className="py-20 lg:py-28 bg-[#0a0a0d] border-t border-b border-[#1e1e26] relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">ENGAGEMENT</span>
            <h2 id="engagement-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">Flexible AI Engagement Models</h2>
            <p className="text-[#8c8c9a] text-base leading-relaxed">AI projects vary significantly in scope. Choose the model that fits your situation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {ENGAGEMENT_MODELS.map((model) => (
              <div key={model.title} className="rounded-2xl bg-[#121217] border border-[#222229] p-7 hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
                <div aria-hidden="true" className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at top right, ${model.accent}, transparent)` }} />
                <span aria-hidden="true" className="text-4xl font-black block mb-4 opacity-20 group-hover:opacity-60 transition-opacity tabular-nums" style={{ color: model.accent }}>{model.number}</span>
                <h3 className="text-base font-bold text-white mb-2">{model.title}</h3>
                <p className="text-sm text-[#8c8c9a] leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link id="engagement-ai-btn" href="/contact?service=ai" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white shadow-lg shadow-[#8b5cf6]/20 hover:brightness-110 active:scale-95 transition-all" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
              Discuss Your AI Project
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" aria-labelledby="faq-heading" className="py-20 lg:py-28 relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#8b5cf6]/[0.04] blur-[130px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#8b5cf6] block mb-3">FAQ</span>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-black text-white">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div key={i} className="rounded-2xl bg-[#121217] border border-[#222229] p-6 hover:border-white/20 transition-all">
                <div className="flex items-start gap-4">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">{item.q}</h3>
                    <p className="text-sm text-[#8c8c9a] leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section id="final-cta" aria-label="Start an AI project" className="py-24 lg:py-32 bg-[#0a0a0d] border-t border-[#1e1e26] relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#8b5cf6]/[0.06] blur-[160px] rounded-full" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00d4aa]/[0.04] blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#8b5cf6]/20 bg-[#0e0e14] p-10 sm:p-16 text-center relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 right-0 w-80 h-80 bg-[#8b5cf6]/[0.08] blur-[120px] rounded-full pointer-events-none" />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-64 h-64 bg-[#00d4aa]/[0.05] blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 mb-6">
                <SparklesIcon className="w-3.5 h-3.5 text-[#a78bfa]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[2px] text-[#a78bfa]">START AN AI PROJECT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">Ready to Bring AI Into Your Business?</h2>
              <p className="text-base sm:text-lg text-[#8c8c9a] max-w-2xl mx-auto mb-10 leading-relaxed">
                Tell us about your business problem. We&apos;ll assess whether AI is the right approach, and if so, how to implement it practically and responsibly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link id="final-ai-start-btn" href="/contact?service=ai" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white shadow-lg shadow-[#8b5cf6]/20 hover:brightness-110 active:scale-95 transition-all" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                  Start an AI Project
                  <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link id="final-ai-contact-btn" href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-[#1a1a1f] border border-[#2a2a30] text-white hover:border-[#8b5cf6]/50 hover:bg-white/5 transition-all">
                  Contact Us
                </Link>
              </div>
              <div className="border-t border-white/[0.06] pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-[#71717a]">
                {[
                  { label: 'NextDigi Solutions', href: '/solutions' },
                  { label: 'NextDigi Growth', href: '/growth' },
                  { label: 'Labs', href: '/labs' },
                  { label: 'Case Studies', href: '/case-studies' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link key={link.label} href={link.href} className="hover:text-[#a78bfa] transition-colors flex items-center gap-1.5">
                    <ArrowRightCircleIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
