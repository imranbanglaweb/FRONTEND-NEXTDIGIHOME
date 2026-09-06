'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { 
  CogIcon, 
  ShieldCheckIcon, 
  StarIcon, 
  CheckCircleIcon, 
  ArrowLeftIcon, 
  SparklesIcon,
  GlobeAltIcon,
  CpuChipIcon,
  BeakerIcon,
  ArrowRightIcon,
  CommandLineIcon,
  ServerIcon,
  DevicePhoneMobileIcon,
  VideoCameraIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'solutions' | 'ai' | 'labs'>('all');

  // NEXTDIGI SOLUTIONS (7 core services from architecture diagram)
  const solutionsServices = [
    {
      id: 'web-dev',
      division: 'solutions',
      title: "Web Development",
      category: "NEXTDIGI SOLUTIONS",
      description: "Fullstack web applications and modern portals built with Next.js, React, and robust API architectures. Fast, responsive, and SEO-maximized.",
      features: ["Next.js & React 19", "Tailwind CSS & Vanilla Design", "REST & GraphQL APIs", "Core Web Vitals Optimized"],
      icon: "🌐",
      gradient: "from-[#00d4aa] to-[#00b894]",
      accentColor: "#00d4aa",
      price: "Custom Project"
    },
    {
      id: 'ecommerce',
      division: 'solutions',
      title: "E-commerce",
      category: "NEXTDIGI SOLUTIONS",
      description: "End-to-end e-commerce solutions with custom storefronts, payment gateways (bKash, Nagad, Stripe, Cards), inventory routing, and CRM integration.",
      features: ["Multi-Currency Checkout", "Automated Order Routing", "Inventory Management", "Custom Cart Architecture"],
      icon: "🛒",
      gradient: "from-[#8b5cf6] to-[#6d28d9]",
      accentColor: "#8b5cf6",
      price: "Enterprise"
    },
    {
      id: 'apps',
      division: 'solutions',
      title: "Apps",
      category: "NEXTDIGI SOLUTIONS",
      description: "Cross-platform mobile applications for iOS & Android built with Flutter and React Native. High performance, native look, and offline capabilities.",
      features: ["Flutter & React Native", "iOS & Android Releases", "Push Notifications", "Biometric & Secure Auth"],
      icon: "📱",
      gradient: "from-[#38bdf8] to-[#0284c7]",
      accentColor: "#38bdf8",
      price: "Turnkey"
    },
    {
      id: 'software',
      division: 'solutions',
      title: "Software",
      category: "NEXTDIGI SOLUTIONS",
      description: "Enterprise software systems, internal business portals, custom ERP modules, and bespoke database architectures engineered for scale.",
      features: ["Custom SaaS Engines", "Role-Based Access Control", "Microservices & Docker", "High-Throughput Databases"],
      icon: "💻",
      gradient: "from-[#ec4899] to-[#be185d]",
      accentColor: "#ec4899",
      price: "Bespoke"
    },
    {
      id: 'social-media',
      division: 'solutions',
      title: "Social Media",
      category: "NEXTDIGI SOLUTIONS",
      description: "Strategic digital marketing, brand elevation, social content production, and organic & paid customer acquisition campaigns.",
      features: ["Campaign Management", "Content Engine & Copy", "Conversion Tracking", "Influencer & Ads Strategy"],
      icon: "📢",
      gradient: "from-[#ff6b6b] to-[#ee5a6f]",
      accentColor: "#ff6b6b",
      price: "Monthly Retainer"
    },
    {
      id: 'hosting',
      division: 'solutions',
      title: "Hosting",
      category: "NEXTDIGI SOLUTIONS",
      description: "High-availability cloud hosting, containerized deployments, CDN orchestration, SSL, and automated nightly backups.",
      features: ["99.99% Uptime SLA", "Global CDN Acceleration", "DDoS Mitigation", "Auto-scaling Infrastructure"],
      icon: "☁️",
      gradient: "from-[#06b6d4] to-[#0891b2]",
      accentColor: "#06b6d4",
      price: "Managed Cloud"
    },
    {
      id: 'maintenance',
      division: 'solutions',
      title: "Maintenance",
      category: "NEXTDIGI SOLUTIONS",
      description: "Continuous 24/7 system monitoring, vulnerability scanning, security patches, framework upgrades, and performance tuning.",
      features: ["24/7 Health Monitoring", "Security Audits & Patching", "Regular Disaster Backups", "Performance Optimization"],
      icon: "🛡️",
      gradient: "from-[#10b981] to-[#059669]",
      accentColor: "#10b981",
      price: "Service Level"
    }
  ];

  // NEXTDIGI AI (4 core systems from architecture diagram)
  const aiServices = [
    {
      id: 'ai-video',
      division: 'ai',
      title: "AI Video",
      category: "NEXTDIGI AI",
      description: "Hyper-realistic synthetic video creation, AI digital avatars, dynamic product showcases, and localized multilingual voiceovers.",
      features: ["Digital Avatar Synthesis", "Multi-Language Dubbing", "Dynamic Video Ads", "Script-to-Video Pipelines"],
      icon: "🎬",
      gradient: "from-[#a855f7] to-[#7e22ce]",
      accentColor: "#a855f7",
      price: "AI Engine"
    },
    {
      id: 'ai-agents',
      division: 'ai',
      title: "AI Agents",
      category: "NEXTDIGI AI",
      description: "Autonomous AI agents capable of executing complex business tasks, sales prospecting, customer inquiry handling, and research synthesis.",
      features: ["Multi-Agent Orchestration", "Knowledge-Base Integration", "Autonomous Task Execution", "CRM & Slack Integrations"],
      icon: "🤖",
      gradient: "from-[#ec4899] to-[#db2777]",
      accentColor: "#ec4899",
      price: "Deployment"
    },
    {
      id: 'automation',
      division: 'ai',
      title: "Automation",
      category: "NEXTDIGI AI",
      description: "End-to-end robotic process automation (RPA), zero-touch document workflows, webhook integrations, and API synchronizations.",
      features: ["Zero-Touch Processing", "Webhook & API Pipelines", "Document OCR & Extraction", "Error-Free Reconciliation"],
      icon: "⚡",
      gradient: "from-[#f59e0b] to-[#d97706]",
      accentColor: "#f59e0b",
      price: "Workflow"
    },
    {
      id: 'ai-support',
      division: 'ai',
      title: "AI Support",
      category: "NEXTDIGI AI",
      description: "24/7 autonomous support bots that resolve up to 80% of customer inquiries instantly across WhatsApp, web, and messenger.",
      features: ["Instant Query Resolution", "WhatsApp & Web Embed", "Human Escalation Gateways", "Sentiment Analytics"],
      icon: "💬",
      gradient: "from-[#00d4aa] to-[#059669]",
      accentColor: "#00d4aa",
      price: "Subscription"
    }
  ];

  // NEXTDIGI LABS (Proprietary SaaS products from architecture diagram)
  const labsServices = [
    {
      id: 'nextdigi-commerce',
      division: 'labs',
      title: "NextDigi Commerce",
      category: "NEXTDIGI LABS SAAS",
      description: "Headless e-commerce infrastructure with modular checkout pipelines, multi-gateway payments, and rapid merchant onboarding.",
      features: ["Headless API Architecture", "bKash & Global Gateways", "Inventory Sync Engine", "Conversion-Focused UX"],
      icon: "🛍️",
      gradient: "from-[#00d4aa] to-[#38bdf8]",
      accentColor: "#00d4aa",
      price: "SaaS Product"
    },
    {
      id: 'nextdigi-social',
      division: 'labs',
      title: "NextDigi Social",
      category: "NEXTDIGI LABS SAAS",
      description: "Intelligent social media automation engine for automated viral hook generation, scheduling across 7+ channels, and audience growth.",
      features: ["Autonomous Post Scheduling", "AI Viral Hook Synthesis", "Cross-Platform Analytics", "Audience Engagement AI"],
      icon: "🚀",
      gradient: "from-[#8b5cf6] to-[#ec4899]",
      accentColor: "#8b5cf6",
      price: "Private Beta"
    },
    {
      id: 'nextdigi-automate',
      division: 'labs',
      title: "NextDigi Automate",
      category: "NEXTDIGI LABS SAAS",
      description: "Enterprise workflow automation platform that unifies accounting, lead routing, customer communication, and team operations.",
      features: ["Visual Flow Builder", "100+ Pre-built Connectors", "Secure Cloud Execution", "Live Activity Auditing"],
      icon: "⚙️",
      gradient: "from-[#f59e0b] to-[#ef4444]",
      accentColor: "#f59e0b",
      price: "Enterprise SaaS"
    }
  ];

  const allItems = [...solutionsServices, ...aiServices, ...labsServices];

  const displayItems = activeTab === 'all' 
    ? allItems 
    : activeTab === 'solutions' 
      ? solutionsServices 
      : activeTab === 'ai' 
        ? aiServices 
        : labsServices;

  const stats = [
    { number: "7+", label: "Solutions Disciplines" },
    { number: "4", label: "Autonomous AI Engines" },
    { number: "3", label: "Proprietary SaaS Platforms" },
    { number: "99.9%", label: "System Reliability" }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,170,0.08)_0%,rgba(8,8,8,0)_50%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#ec4899] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-[#f59e0b] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-float" style={{ animationDelay: '6s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d4aa]/5 via-transparent to-[#8b5cf6]/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#00d4aa] hover:text-[#00d4aa]/80 mb-8 transition text-sm font-semibold">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to NEXTDIGI HOME
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 mb-6 shadow-lg shadow-[#00d4aa]/10">
              <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-xs font-extrabold uppercase tracking-[2px] text-[#00d4aa]">
                NEXTDIGI SOLUTIONS • AI • LABS
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
              <span className="block text-[#fafafa]">Engineering &amp; Intelligence</span>
              <span className="block bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
                To Build, Launch, Automate &amp; Grow
              </span>
            </h1>
            
            <p className="text-base sm:text-xl text-[#a1a1aa] max-w-3xl mx-auto leading-relaxed mb-10">
              Explore our full spectrum of professional engineering, enterprise web systems, autonomous AI agents, and proprietary SaaS platforms built for modern commerce.
            </p>

            {/* Division Switcher Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#15151c] border border-white/10 max-w-2xl mx-auto">
              {[
                { key: 'all', label: 'All Disciplines', badge: allItems.length },
                { key: 'solutions', label: 'Solutions', badge: solutionsServices.length, color: '#8b5cf6' },
                { key: 'ai', label: 'AI Systems', badge: aiServices.length, color: '#ec4899' },
                { key: 'labs', label: 'Labs (SaaS)', badge: labsServices.length, color: '#f59e0b' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.key
                      ? 'bg-white/10 text-white shadow-lg border border-white/20'
                      : 'text-[#71717a] hover:text-[#d4d4d8] hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10">
                    {tab.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-b from-[#15151c] to-[#0f0f12] border-y border-[#22222a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-5 bg-[#121217] border border-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <p className="text-[#a1a1aa] text-xs font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-[#0f0f12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-[#fafafa] mb-3">
              {activeTab === 'all' && 'All NEXTDIGI Offerings'}
              {activeTab === 'solutions' && 'NEXTDIGI SOLUTIONS: Enterprise Engineering'}
              {activeTab === 'ai' && 'NEXTDIGI AI: Autonomous Intelligence Systems'}
              {activeTab === 'labs' && 'NEXTDIGI LABS: Proprietary SaaS Products'}
            </h2>
            <p className="text-sm sm:text-base text-[#71717a] max-w-xl mx-auto">
              Precision-built solutions tailored to drive tangible ROI and competitive advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayItems.map((service) => (
              <div
                key={service.id}
                className="group relative p-6 sm:p-7 bg-[#131318] border border-[#22222a] rounded-2xl hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Top accent bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ backgroundColor: service.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-4xl p-2.5 rounded-xl bg-white/5 border border-white/10">
                      {service.icon}
                    </div>
                    <span 
                      className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                      style={{ 
                        backgroundColor: `${service.accentColor}15`, 
                        borderColor: `${service.accentColor}30`,
                        color: service.accentColor
                      }}
                    >
                      {service.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#fafafa] mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8c8c9a] mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2.5 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                        <CheckCircleIcon 
                          className="w-4 h-4 shrink-0" 
                          style={{ color: service.accentColor }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-[#71717a]">
                    {service.price}
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#0f0f12] transition-all hover:brightness-110"
                    style={{ backgroundColor: service.accentColor }}
                  >
                    <span>Inquire Now</span>
                    <ArrowRightIcon className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#00d4aa]/10 via-transparent to-[#8b5cf6]/10 border-y border-[#2a2a30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#fafafa] mb-3">
              Why Partner With NEXTDIGI?
            </h2>
            <p className="text-sm sm:text-base text-[#71717a]">
              The core advantages of working with our multidisciplinary ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-[#121217] border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center mx-auto mb-5 text-[#00d4aa]">
                <StarIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#fafafa] mb-2">Architectural Excellence</h3>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">Modern codebases, clean microservices, and battle-tested workflows engineered to scale reliably.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[#121217] border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 flex items-center justify-center mx-auto mb-5 text-[#8b5cf6]">
                <ShieldCheckIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#fafafa] mb-2">End-to-End Automation</h3>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">Integrated AI agents and RPA pipelines that eliminate manual operational overhead from day one.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[#121217] border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-[#ec4899]/10 border border-[#ec4899]/30 flex items-center justify-center mx-auto mb-5 text-[#ec4899]">
                <CogIcon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#fafafa] mb-2">Continuous Innovation</h3>
              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">Backed by NextDigi Labs R&amp;D, giving your business early access to next-generation SaaS tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0f0f12] to-[#1a1a1f] relative">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 mb-6">
            <SparklesIcon className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00d4aa]">Build • Launch • Automate • Grow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#fafafa] mb-6 leading-tight">
            Ready to Accelerate With NEXTDIGI?
          </h2>
          <p className="text-sm sm:text-lg text-[#8c8c9a] mb-10 max-w-2xl mx-auto leading-relaxed">
            Schedule a confidential discovery session with our engineering and AI specialists to map out your architecture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] rounded-xl font-bold hover:brightness-110 transition shadow-lg shadow-[#00d4aa]/25"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-[#fafafa] rounded-xl font-bold hover:bg-white/5 transition"
            >
              Browse NextDigi Home Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
