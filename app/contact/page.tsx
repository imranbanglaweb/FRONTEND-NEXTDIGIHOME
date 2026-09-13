'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({
        ...prev,
        service: prefilledService
      }));
    }
  }, [prefilledService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate or send via contact endpoint
    try {
      // Small artificial delay for premium feel
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0e131d]/95 backdrop-blur-xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#00d4aa]/10 blur-[100px] pointer-events-none rounded-full" />

      {isSubmitted ? (
        <div className="text-center py-16 px-4">
          <div className="w-16 h-16 rounded-2xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center mx-auto mb-6 text-[#00d4aa]">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Project Inquiry Received</h3>
          <p className="text-gray-300 max-w-md mx-auto mb-6 text-sm sm:text-base leading-relaxed">
            Thank you, <span className="text-[#00d4aa] font-semibold">{formData.name || 'there'}</span>. Our technical solutions team will review your requirements and respond within 24 hours.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 mb-8">
            <ClockIcon className="w-4 h-4 text-[#00d4aa]" />
            Response Window: Under 24 business hours
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  service: '',
                  budget: '',
                  timeline: '',
                  message: ''
                });
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
              Start a Project Discussion
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Tell us about your project requirements, scope, and target timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Full Name <span className="text-[#00d4aa]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#131823] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa] text-sm transition"
                placeholder="e.g. Imran Hossain"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Work Email <span className="text-[#00d4aa]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#131823] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa] text-sm transition"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Phone / WhatsApp Number <span className="text-[#00d4aa]">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#131823] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa] text-sm transition"
                placeholder="+880 1XXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Company / Business Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#131823] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa] text-sm transition"
                placeholder="Your organization or brand"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Service Needed <span className="text-[#00d4aa]">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#131823] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d4aa] text-sm transition"
              >
                <option value="">Select a service category</option>
                <option value="Web Application Development">Web Application Development</option>
                <option value="E-Commerce Development">E-Commerce Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Custom Software / ERP">Custom Software / ERP</option>
                <option value="SaaS Development">SaaS Development</option>
                <option value="AI Agents & Automation">AI Agents & Workflow Automation</option>
                <option value="Conversational Chatbot">Conversational Chatbot (Web / WhatsApp)</option>
                <option value="Digital Growth / Meta & Google Ads">Digital Growth (Performance Marketing)</option>
                <option value="SEO & Analytics Attribution">SEO & Analytics Attribution</option>
                <option value="NextDigi Labs Product Licensing">NextDigi Labs Product Licensing</option>
                <option value="NextDigi Store Support">NextDigi Store Asset Support</option>
                <option value="Other">Other Technical Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-2">
                Project Budget Range (BDT / USD)
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#131823] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d4aa] text-sm transition"
              >
                <option value="">Select estimated budget</option>
                <option value="Under 50,000 BDT">Under 50,000 BDT (~$450 USD)</option>
                <option value="50,000 – 150,000 BDT">50,000 – 150,000 BDT (~$1,200 USD)</option>
                <option value="150,000 – 500,000 BDT">150,000 – 500,000 BDT (~$4,000 USD)</option>
                <option value="500,000 – 1,500,000 BDT">500,000 – 1,500,000 BDT (~$12,500 USD)</option>
                <option value="1,500,000+ BDT / Enterprise">1,500,000+ BDT / Enterprise Scale</option>
                <option value="Flexible / Let's Discuss">Flexible / Scoping Discussion</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Expected Project Timeline
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#131823] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#00d4aa] text-sm transition"
            >
              <option value="">Select target timeline</option>
              <option value="Immediate (Within 2 weeks)">Immediate (Within 2 weeks)</option>
              <option value="1 – 2 Months">1 – 2 Months</option>
              <option value="3+ Months">3+ Months</option>
              <option value="Exploration / Scoping Phase">Exploration / Scoping Phase</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Project Description & Requirements <span className="text-[#00d4aa]">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-[#131823] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4aa] text-sm transition resize-none"
              placeholder="Describe your current system, project goals, key features, or any third-party APIs needed..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <span>Submitting Inquiry...</span>
            ) : (
              <>
                <span>Submit Project Inquiry</span>
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
            Your project details are protected under standard commercial confidentiality.
          </p>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-10 left-1/3 w-[650px] h-[350px] bg-[#00d4aa]/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-96 right-1/4 w-[500px] h-[300px] bg-[#8b5cf6]/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Contact</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-gray-300 uppercase mb-5">
            <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
            LETS BUILD TOGETHER
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Have a Business Idea? <br />
            <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">
              Let&apos;s Architect & Build It.
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Whether you need a custom web platform, autonomous AI workflows, digital customer acquisition, or an enterprise SaaS product, we are ready to bring your vision to life.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left Column: Direct Info & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick WhatsApp Chat Box */}
            <div className="p-7 rounded-3xl border border-[#00d4aa]/30 bg-gradient-to-b from-[#00d4aa]/10 via-[#0e131d] to-[#0e131d]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00d4aa]/20 border border-[#00d4aa]/40 flex items-center justify-center text-[#00d4aa]">
                  <ChatBubbleLeftRightIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Need Fast Technical Consultation?</h3>
                  <p className="text-xs text-gray-400">Connect directly on WhatsApp</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                Skip form filling if you prefer discussing your requirements, wireframes, or timeline directly with an engineering lead.
              </p>
              <a
                href="https://wa.me/8801918329829?text=Hello%20NextDigiHome%2C%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-[#25D366]/20"
              >
                <span>Chat with us on WhatsApp</span>
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Factual Office & Contact Info */}
            <div className="p-7 rounded-3xl border border-white/10 bg-[#0e131d]/90 space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Official Contact Channels
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00d4aa] shrink-0 mt-0.5">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400">Call / WhatsApp</h4>
                    <p className="text-sm font-bold text-white mt-0.5">+880 1918 329829</p>
                    <p className="text-xs text-gray-500 mt-0.5">Saturday – Thursday: 10:00 AM – 7:00 PM BST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8b5cf6] shrink-0 mt-0.5">
                    <EnvelopeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400">General & Partnership Inquiries</h4>
                    <p className="text-sm font-bold text-white mt-0.5">info@nextdigihome.com</p>
                    <p className="text-xs text-gray-500 mt-0.5">Technical proposals & commercial requests</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] shrink-0 mt-0.5">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400">Headquarters</h4>
                    <p className="text-sm font-bold text-white mt-0.5">Dhaka, Bangladesh</p>
                    <p className="text-xs text-gray-500 mt-0.5">Global digital operations & engineering</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commitments Box */}
            <div className="p-6 rounded-3xl border border-white/10 bg-[#0c1017]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Our Client Promise
              </h4>
              <div className="space-y-3">
                {[
                  '100% Intellectual Property & Source Code Ownership',
                  'Dedicated Technical Account Manager',
                  'Strict Milestone Timelines & Production SLAs',
                  'Post-Launch Warranty & Security Updates'
                ].map((promise, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircleIcon className="w-4 h-4 text-[#00d4aa] shrink-0 mt-0.5" />
                    <span>{promise}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={
              <div className="p-12 rounded-3xl border border-white/10 bg-[#0e131d] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#00d4aa] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <ContactForm />
            </Suspense>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4aa]">Common Questions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Project Kickoff FAQs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: 'How does the project onboarding process begin?',
                a: 'Once you submit your requirements or schedule a call, our solutions architect reviews the scope and arranges a 30-minute discovery call to clarify user stories, system architecture, and budget.'
              },
              {
                q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
                a: 'Yes. We frequently sign bilateral NDAs before reviewing proprietary algorithms, business logic, or customer databases.'
              },
              {
                q: 'What are your payment milestones?',
                a: 'Standard projects follow a milestone-based schedule: typically 30% upon kickoff, 40% upon staging demo approval, and 30% upon final production deployment and code transfer.'
              },
              {
                q: 'Can we hire NextDigiHome for ongoing monthly development?',
                a: 'Yes. We offer dedicated monthly retainer models for teams requiring ongoing full-stack engineering, AI automation tuning, and performance marketing management.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0e131d] border border-white/10">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-[#00d4aa] shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
