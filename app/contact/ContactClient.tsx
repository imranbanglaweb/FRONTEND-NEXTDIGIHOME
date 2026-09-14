'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  CodeBracketIcon,
  CpuChipIcon,
  ChartBarIcon,
  PaperClipIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ShoppingBagIcon,
  BeakerIcon,
  WrenchScrewdriverIcon,
  MegaphoneIcon,
  MagnifyingGlassIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

const SERVICES = [
  { id: 'Website Development', label: 'Website Development', category: 'Solutions', icon: GlobeAltIcon },
  { id: 'Web Application', label: 'Web Application', category: 'Solutions', icon: CodeBracketIcon },
  { id: 'Mobile Application', label: 'Mobile Application', category: 'Solutions', icon: DevicePhoneMobileIcon },
  { id: 'E-commerce', label: 'E-commerce', category: 'Solutions', icon: ShoppingBagIcon },
  { id: 'SaaS Development', label: 'SaaS Development', category: 'Labs', icon: BeakerIcon },
  { id: 'Custom Software', label: 'Custom Software', category: 'Solutions', icon: WrenchScrewdriverIcon },
  { id: 'AI / Automation', label: 'AI / Automation', category: 'AI', icon: CpuChipIcon },
  { id: 'Chatbot / AI Agent', label: 'Chatbot / AI Agent', category: 'AI', icon: ChatBubbleLeftRightIcon },
  { id: 'Digital Marketing', label: 'Digital Marketing', category: 'Growth', icon: ChartBarIcon },
  { id: 'Meta Ads', label: 'Meta Ads', category: 'Growth', icon: MegaphoneIcon },
  { id: 'Google Ads', label: 'Google Ads', category: 'Growth', icon: MegaphoneIcon },
  { id: 'SEO', label: 'SEO', category: 'Growth', icon: MagnifyingGlassIcon },
  { id: 'Social Media Management', label: 'Social Media', category: 'Growth', icon: ChartBarIcon },
  { id: 'Video / Creative Services', label: 'Creative & Video', category: 'Growth', icon: VideoCameraIcon },
  { id: 'Digital Products', label: 'Digital Products', category: 'Store', icon: ShoppingBagIcon },
  { id: 'Other', label: 'Other', category: 'General', icon: SparklesIcon },
];

const BUDGET_RANGES = [
  'Under ৳25,000',
  '৳25,000–৳50,000',
  '৳50,000–৳1,00,000',
  '৳1,00,000–৳3,00,000',
  '৳3,00,000+',
  'Not Sure',
];

const TIMELINE_OPTIONS = [
  'ASAP',
  'Within 2 Weeks',
  'Within 1 Month',
  '1–3 Months',
  '3+ Months',
  'Not Sure',
];

const SOURCES = [
  'Google',
  'Facebook',
  'Instagram',
  'LinkedIn',
  'YouTube',
  'Referral',
  'Direct',
  'Other',
];

const CONTACT_METHODS = ['Email', 'Phone', 'WhatsApp'];

// Map safe query strings to service names
const SERVICE_ALIAS_MAP: Record<string, string> = {
  web: 'Website Development',
  website: 'Website Development',
  'web-development': 'Website Development',
  webapp: 'Web Application',
  'web-application': 'Web Application',
  mobile: 'Mobile Application',
  'mobile-app': 'Mobile Application',
  ecommerce: 'E-commerce',
  'e-commerce': 'E-commerce',
  saas: 'SaaS Development',
  'saas-development': 'SaaS Development',
  software: 'Custom Software',
  'custom-software': 'Custom Software',
  ai: 'AI / Automation',
  automation: 'AI / Automation',
  'ai-automation': 'AI / Automation',
  'ai-agents': 'AI / Automation',
  chatbot: 'Chatbot / AI Agent',
  'ai-agent': 'Chatbot / AI Agent',
  'ai-chatbot': 'Chatbot / AI Agent',
  chatbots: 'Chatbot / AI Agent',
  'ai-integration': 'AI / Automation',
  'ai-support': 'AI / Automation',
  'ai-video': 'Video / Creative Services',
  marketing: 'Digital Marketing',
  'digital-marketing': 'Digital Marketing',
  growth: 'Digital Marketing',
  'meta-ads': 'Meta Ads',
  'google-ads': 'Google Ads',
  seo: 'SEO',
  analytics: 'Digital Marketing',
  'social-media': 'Social Media Management',
  store: 'Digital Products',
  'digital-products': 'Digital Products',
};

export default function ContactClient() {
  const searchParams = useSearchParams();
  const rawServiceParam = searchParams.get('service') || '';

  // Resolve initial service from query param
  const initialService = useMemo(() => {
    if (!rawServiceParam) return 'Website Development';
    const clean = rawServiceParam.toLowerCase().trim();
    return SERVICE_ALIAS_MAP[clean] || 'Website Development';
  }, [rawServiceParam]);

  // Form State
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [budget, setBudget] = useState('৳50,00,00–৳1,00,000');
  const [timeline, setTimeline] = useState('Within 1 Month');
  const [contactMethod, setContactMethod] = useState('Email');
  const [leadSource, setLeadSource] = useState('Google');
  const [description, setDescription] = useState('');
  const [consent, setConsent] = useState(true);

  // Honeypot field (spam trap)
  const [honeypot, setHoneypot] = useState('');

  // Service-specific conditional questions
  const [serviceDetails, setServiceDetails] = useState<Record<string, string>>({});

  // File Upload
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number; type: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{ id: string; name: string; service: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync service from URL if param changes
  useEffect(() => {
    if (rawServiceParam) {
      const clean = rawServiceParam.toLowerCase().trim();
      const mapped = SERVICE_ALIAS_MAP[clean];
      if (mapped) {
        setSelectedService(mapped);
      }
    }
  }, [rawServiceParam]);

  // Handle service-specific detail changes
  const handleServiceDetailChange = (key: string, value: string) => {
    setServiceDetails((prev) => ({ ...prev, [key]: value }));
  };

  // Handle file selection with validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please upload a smaller document.');
      return;
    }

    // Check allowed extensions
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.png', '.jpg', '.jpeg', '.webp'];
    const lowerName = file.name.toLowerCase();
    const isAllowed = allowedExtensions.some((ext) => lowerName.endsWith(ext));

    if (!isAllowed) {
      alert('Invalid file format. Allowed formats: PDF, DOCX, XLSX, PNG, JPG, WEBP.');
      return;
    }

    setSelectedFile({
      name: file.name,
      size: file.size,
      type: file.type,
    });
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit Lead
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!consent) {
      setErrorMessage('Please accept the consent checkbox to submit your inquiry.');
      return;
    }

    setSubmitting(true);

    try {
      // Capture UTM & Attribution data
      const utm_source = searchParams.get('utm_source') || undefined;
      const utm_medium = searchParams.get('utm_medium') || undefined;
      const utm_campaign = searchParams.get('utm_campaign') || undefined;
      const utm_content = searchParams.get('utm_content') || undefined;
      const utm_term = searchParams.get('utm_term') || undefined;
      const landing_page = typeof window !== 'undefined' ? window.location.pathname : '/contact';
      const referrer = typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Direct';

      const payload = {
        name,
        email,
        phone,
        whatsapp: whatsapp || phone,
        company,
        website,
        service: selectedService,
        service_details: serviceDetails,
        budget,
        timeline,
        contact_method: contactMethod,
        lead_source: leadSource,
        description,
        file_name: selectedFile?.name,
        file_size: selectedFile?.size,
        file_type: selectedFile?.type,
        landing_page,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        _hp: honeypot, // Honeypot field
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedLead({
          id: data.data?.id || `lead_${Date.now()}`,
          name,
          service: selectedService,
        });

        // 31. Trigger Meta Pixel Lead event only after successful submission
        if (typeof window !== 'undefined' && (window as any).fbq) {
          try {
            (window as any).fbq('track', 'Lead', {
              content_name: selectedService,
              content_category: 'Lead Inquiry',
              value: budget,
              currency: 'BDT',
            });
          } catch (pixelErr) {
            console.warn('Meta Pixel dispatch error:', pixelErr);
          }
        }

        // 32. Trigger GA4 lead event only after successful submission
        if (typeof window !== 'undefined' && (window as any).gtag) {
          try {
            (window as any).gtag('event', 'lead_success', {
              event_category: 'engagement',
              event_label: selectedService,
              service_name: selectedService,
            });
            (window as any).gtag('event', 'contact_form_submit', {
              service_name: selectedService,
            });
          } catch (gaErr) {
            console.warn('GA4 dispatch error:', gaErr);
          }
        }
      } else {
        setErrorMessage(data.message || 'Unable to submit inquiry. Please review your details and try again.');
      }
    } catch (err) {
      console.error('Submission network error:', err);
      setErrorMessage('Network connection error. Please check your internet connection or reach us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // Service conditional helper
  const isWebOrApp = ['Website Development', 'Web Application', 'Mobile Application', 'E-commerce'].includes(selectedService);
  const isSaaS = selectedService === 'SaaS Development' || selectedService === 'Custom Software';
  const isAI = ['AI / Automation', 'Chatbot / AI Agent'].includes(selectedService);
  const isMarketing = ['Digital Marketing', 'Meta Ads', 'Google Ads', 'SEO', 'Social Media Management'].includes(selectedService);

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#00d4aa] selection:text-black pt-32 pb-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/3 w-[650px] h-[350px] bg-[#00d4aa]/12 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-96 right-1/4 w-[500px] h-[300px] bg-[#8b5cf6]/12 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-[#00d4aa] font-semibold">Contact &amp; Lead Generation</span>
        </nav>

        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-bold tracking-wider text-[#00d4aa] uppercase mb-6 shadow-sm">
            <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
            <span>LET&apos;S WORK TOGETHER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Tell Us What You{' '}
            <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
              Want to Build.
            </span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            Have a website, software, SaaS, AI, automation or digital growth requirement? Tell us what you need and we&apos;ll help define the right next step.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-300">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
              Direct Solutions Architecture
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4 text-[#38bdf8]" />
              Clear Milestone Proposals
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
              <CheckCircleIcon className="w-4 h-4 text-[#8b5cf6]" />
              100% IP Ownership Transfer
            </span>
          </div>
        </div>

        {/* MAIN FORM / SUCCESS CONTAINER */}
        <div className="max-w-4xl mx-auto">
          {submittedLead ? (
            /* 26. SUCCESS STATE */
            <div className="p-8 sm:p-14 rounded-3xl bg-[#0e131d] border border-[#00d4aa]/30 shadow-2xl text-center relative overflow-hidden animate-fade-in">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00d4aa]/15 blur-3xl pointer-events-none" />

              <div className="w-20 h-20 rounded-3xl bg-[#00d4aa]/15 border border-[#00d4aa]/40 flex items-center justify-center mx-auto mb-6 text-[#00d4aa]">
                <CheckCircleIcon className="w-12 h-12" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-4">
                Reference ID: <strong className="text-[#00d4aa]">{submittedLead.id}</strong>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Thanks — We&apos;ve Received Your Inquiry.
              </h2>

              <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
                Your project details for <strong className="text-[#00d4aa]">{submittedLead.service}</strong> have been submitted successfully. Our solutions team will review your requirements and contact you regarding the next step.
              </p>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-md mx-auto mb-10 text-left text-xs space-y-2.5 text-gray-300">
                <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4 text-[#00d4aa]" />
                  What Happens Next?
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] mt-1.5 shrink-0" />
                  <span>Our solution architects analyze your requirements and feasibility.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] mt-1.5 shrink-0" />
                  <span>We schedule an initial discovery call or send an initial milestone proposal.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] mt-1.5 shrink-0" />
                  <span>Clear scope, estimated timeline, and architecture options outlined.</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 flex items-center gap-2"
                >
                  <span>Back to NextDigiHome</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="px-8 py-4 rounded-xl font-semibold text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  Explore Our Work
                </Link>
              </div>
            </div>
          ) : (
            /* LEAD CAPTURE FORM */
            <form onSubmit={handleSubmit} className="p-6 sm:p-12 rounded-3xl bg-[#0e131d] border border-white/10 shadow-2xl relative">
              {/* Invisible Honeypot Spam Trap */}
              <input
                type="text"
                name="_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="opacity-0 absolute -z-50 w-0 h-0 p-0 m-0"
              />

              {errorMessage && (
                <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                  <XMarkIcon className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* STEP 1: SERVICE SELECTION                                     */}
              {/* ------------------------------------------------------------- */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-bold text-white tracking-wide uppercase">
                    1. What Service Do You Need? <span className="text-[#00d4aa]">*</span>
                  </label>
                  <span className="text-xs text-gray-400">Select primary requirement</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {SERVICES.map((s) => {
                    const isSelected = selectedService === s.id;
                    const Icon = s.icon;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#00d4aa]/15 border-[#00d4aa] text-white shadow-[0_0_20px_rgba(0,212,170,0.15)] font-bold'
                            : 'bg-[#121824] border-white/5 text-gray-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#00d4aa]' : 'text-gray-400'}`} />
                        <span className="text-xs truncate">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* STEP 2: SERVICE-SPECIFIC REQUIREMENTS (CONDITIONAL REVEAL)   */}
              {/* ------------------------------------------------------------- */}
              {(isWebOrApp || isSaaS || isAI || isMarketing) && (
                <div className="mb-12 p-6 rounded-2xl bg-[#121824]/70 border border-[#00d4aa]/20">
                  <h3 className="text-xs font-bold text-[#00d4aa] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4" />
                    2. Specific Requirements for {selectedService}
                  </h3>

                  {isWebOrApp && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-gray-300 mb-1.5">Existing Website URL (if any)</label>
                        <input
                          type="url"
                          placeholder="https://example.com"
                          value={serviceDetails.existing_site || ''}
                          onChange={(e) => handleServiceDetailChange('existing_site', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1.5">Project Nature</label>
                        <select
                          value={serviceDetails.project_nature || 'Brand New Build'}
                          onChange={(e) => handleServiceDetailChange('project_nature', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#00d4aa]"
                        >
                          <option value="Brand New Build">Brand New Build from Scratch</option>
                          <option value="Complete Redesign">Redesign Existing Platform</option>
                          <option value="Feature Expansion">Feature Expansion / Maintenance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1.5">Estimated Number of Pages / Screens</label>
                        <select
                          value={serviceDetails.page_count || '1–5 Pages'}
                          onChange={(e) => handleServiceDetailChange('page_count', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#00d4aa]"
                        >
                          <option value="1–5 Pages">1–5 Pages / Screens</option>
                          <option value="6–15 Pages">6–15 Pages / Screens</option>
                          <option value="16–30 Pages">16–30 Pages / Screens</option>
                          <option value="30+ Pages">30+ Pages / High Complexity</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1.5">Online Payment Gateways Required?</label>
                        <select
                          value={serviceDetails.payment_gateway || 'Yes (bKash/Nagad/Cards)'}
                          onChange={(e) => handleServiceDetailChange('payment_gateway', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#00d4aa]"
                        >
                          <option value="Yes (bKash/Nagad/Cards)">Yes (bKash, Nagad, Cards)</option>
                          <option value="International Only (Stripe/PayPal)">International (Stripe / PayPal)</option>
                          <option value="Not Needed">No Payments Needed</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {isSaaS && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-gray-300 mb-1.5">Current Project Stage</label>
                        <select
                          value={serviceDetails.saas_stage || 'Idea / Concept'}
                          onChange={(e) => handleServiceDetailChange('saas_stage', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#00d4aa]"
                        >
                          <option value="Idea / Concept">Idea / Concept Phase</option>
                          <option value="MVP Needed">Require MVP Built for Launch</option>
                          <option value="Scaling Existing Platform">Scaling Existing Live Application</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1.5">Target Deployment Platforms</label>
                        <select
                          value={serviceDetails.target_platforms || 'Web SaaS'}
                          onChange={(e) => handleServiceDetailChange('target_platforms', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#00d4aa]"
                        >
                          <option value="Web SaaS">Web Application (Next.js / Cloud)</option>
                          <option value="Web + Mobile Apps">Web + Cross-Platform Mobile Apps</option>
                          <option value="Mobile First">Mobile First (iOS & Android)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {isAI && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-gray-300 mb-1.5">Target Workflow to Automate</label>
                        <input
                          type="text"
                          placeholder="e.g. Customer support, lead qualification, document parsing"
                          value={serviceDetails.ai_target || ''}
                          onChange={(e) => handleServiceDetailChange('ai_target', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1.5">Current Software Tools Used</label>
                        <input
                          type="text"
                          placeholder="e.g. Slack, WhatsApp, Google Sheets, CRM"
                          value={serviceDetails.ai_tools || ''}
                          onChange={(e) => handleServiceDetailChange('ai_tools', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa]"
                        />
                      </div>
                    </div>
                  )}

                  {isMarketing && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-gray-300 mb-1.5">Active Advertising Channels</label>
                        <select
                          value={serviceDetails.ad_channels || 'None / Starting Fresh'}
                          onChange={(e) => handleServiceDetailChange('ad_channels', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#00d4aa]"
                        >
                          <option value="None / Starting Fresh">None / Starting Fresh</option>
                          <option value="Meta Ads Only">Meta Ads (Facebook & Instagram)</option>
                          <option value="Google Ads Only">Google Search & Performance Max</option>
                          <option value="Meta + Google Ads">Omnichannel (Meta + Google)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1.5">Current Monthly Ad Spend</label>
                        <input
                          type="text"
                          placeholder="e.g. ৳25,000 / month, $500 / month"
                          value={serviceDetails.ad_spend || ''}
                          onChange={(e) => handleServiceDetailChange('ad_spend', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* STEP 3: BUDGET & TIMELINE RANGES                              */}
              {/* ------------------------------------------------------------- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <label className="block text-sm font-bold text-white tracking-wide uppercase mb-3">
                    3. Estimated Budget Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          budget === b
                            ? 'bg-[#00d4aa] text-black border-[#00d4aa] font-bold shadow-md shadow-[#00d4aa]/20'
                            : 'bg-[#121824] border-white/5 text-gray-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white tracking-wide uppercase mb-3">
                    4. Target Timeline
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIMELINE_OPTIONS.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTimeline(t)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          timeline === t
                            ? 'bg-[#00d4aa] text-black border-[#00d4aa] font-bold shadow-md shadow-[#00d4aa]/20'
                            : 'bg-[#121824] border-white/5 text-gray-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* STEP 4: CONTACT INFORMATION                                   */}
              {/* ------------------------------------------------------------- */}
              <div className="mb-12">
                <label className="block text-sm font-bold text-white tracking-wide uppercase mb-4">
                  5. Your Contact Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Full Name <span className="text-[#00d4aa]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Imran Rahman"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#121824] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00d4aa] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Work Email <span className="text-[#00d4aa]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#121824] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00d4aa] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Phone Number <span className="text-[#00d4aa]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1700 000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#121824] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00d4aa] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      WhatsApp Number (if different)
                    </label>
                    <input
                      type="tel"
                      placeholder="+880 1700 000000"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#121824] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00d4aa] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Company / Organization Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corporation"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#121824] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00d4aa] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Current Website (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#121824] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00d4aa] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Preferred Contact Method
                    </label>
                    <select
                      value={contactMethod}
                      onChange={(e) => setContactMethod(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#121824] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00d4aa]"
                    >
                      {CONTACT_METHODS.map((m) => (
                        <option key={m} value={m} className="bg-[#0e131d] text-white">
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      How Did You Hear About Us?
                    </label>
                    <select
                      value={leadSource}
                      onChange={(e) => setLeadSource(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#121824] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00d4aa]"
                    >
                      {SOURCES.map((src) => (
                        <option key={src} value={src} className="bg-[#0e131d] text-white">
                          {src}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* STEP 5: PROJECT DESCRIPTION & OPTIONAL FILE                   */}
              {/* ------------------------------------------------------------- */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-white tracking-wide uppercase mb-2">
                  6. Project Description <span className="text-[#00d4aa]">*</span>
                </label>
                <p className="text-xs text-gray-400 mb-3">
                  Tell us about your business, project, current challenge and what you want to achieve.
                </p>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your business, project, current challenge and what you want to achieve."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#121824] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00d4aa] transition leading-relaxed"
                />
              </div>

              {/* File Upload (Optional) */}
              <div className="mb-10">
                <label className="block text-xs font-bold text-white tracking-wide uppercase mb-2">
                  Optional Document / Brief Attachment
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp"
                    className="hidden"
                    id="lead-file-upload"
                  />
                  <label
                    htmlFor="lead-file-upload"
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer transition flex items-center gap-2"
                  >
                    <PaperClipIcon className="w-4 h-4 text-[#00d4aa]" />
                    <span>Upload Requirements / Brief (Max 10MB)</span>
                  </label>

                  {selectedFile && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs text-[#00d4aa]">
                      <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="text-gray-400 hover:text-white"
                        title="Remove file"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5">
                  Supported formats: PDF, DOC, DOCX, XLSX, PNG, JPG, WEBP.
                </p>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* STEP 6: CONSENT & SUBMISSION                                  */}
              {/* ------------------------------------------------------------- */}
              <div className="mb-10 pt-6 border-t border-white/5">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded bg-black/40 border-white/20 text-[#00d4aa] focus:ring-0 focus:ring-offset-0"
                  />
                  <span className="text-xs text-gray-400 leading-relaxed">
                    I agree to be contacted regarding my inquiry in accordance with the{' '}
                    <Link href="/privacy" className="text-[#00d4aa] hover:underline">
                      Privacy Policy
                    </Link>
                    . We respect your confidentiality and never share your data.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 flex items-center justify-center gap-2 text-base active:scale-[0.99] disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing Your Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Start Your Project</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* TRUST & DIRECT CONTACT STRIP */}
        <div className="mt-20 pt-16 border-t border-white/8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="p-6 rounded-2xl bg-[#0e131d]/60 border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 text-[#00d4aa] flex items-center justify-center shrink-0">
              <EnvelopeIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Direct Inquiries</div>
              <div className="text-sm font-bold text-white mt-0.5">contact@nextdigihome.com</div>
              <p className="text-[11px] text-gray-500 mt-1">Direct developer &amp; architecture desk</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e131d]/60 border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center shrink-0">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Telephone / WhatsApp</div>
              <div className="text-sm font-bold text-white mt-0.5">+880 1700-000000</div>
              <p className="text-[11px] text-gray-500 mt-1">Mon–Fri: 9:00 AM – 7:00 PM (GMT+6)</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e131d]/60 border border-white/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center shrink-0">
              <ShieldCheckIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Consultation Assurance</div>
              <div className="text-sm font-bold text-white mt-0.5">Confidential &amp; Secure</div>
              <p className="text-[11px] text-gray-500 mt-1">Non-disclosure agreements supported</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
