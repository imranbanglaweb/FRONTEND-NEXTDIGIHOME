import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  GlobeAltIcon, 
  ShoppingBagIcon, 
  DevicePhoneMobileIcon, 
  CommandLineIcon, 
  ServerIcon, 
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: "NextDigi Solutions | Web, E-commerce, Software & SaaS Development",
  description: "We design and build modern websites, e-commerce platforms, mobile applications, custom software and SaaS products for businesses that want to operate digitally.",
  path: "/solutions",
});

export default function SolutionsPage() {
  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      tagline: 'High-performance web applications, portals & business websites',
      description: 'Engineered with Next.js, React, TypeScript, and modern headless architectures. Fast, responsive, secure, and fully optimized for Core Web Vitals and search engines.',
      icon: GlobeAltIcon,
      accent: '#00d4aa',
      gradient: 'from-[#00d4aa]/20 to-transparent',
      borderGlow: 'hover:border-[#00d4aa]/50 hover:shadow-[0_0_30px_rgba(0,212,170,0.15)]',
      features: ['Next.js 16 & React 19', 'Core Web Vitals & SEO', 'Headless CMS Integration', 'Micro-frontend Architecture'],
      href: '/solutions/web-development',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Development',
      tagline: 'Custom storefronts, high-converting checkouts & payment routing',
      description: 'End-to-end e-commerce solutions with modular checkouts, multi-currency gateways (bKash, Nagad, Stripe, Prime Bank), automated order fulfillment, and ERP sync.',
      icon: ShoppingBagIcon,
      accent: '#8b5cf6',
      gradient: 'from-[#8b5cf6]/20 to-transparent',
      borderGlow: 'hover:border-[#8b5cf6]/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
      features: ['Custom Cart & Checkout', 'bKash, Nagad & Card Gateways', 'Inventory & Courier Sync', 'Omnichannel Retail Hub'],
      href: '/solutions/ecommerce',
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      tagline: 'Cross-platform iOS & Android apps built for performance',
      description: 'High-performing mobile applications using Flutter and native frameworks. Intuitive UX, offline-first data caching, push notifications, and seamless device API integrations.',
      icon: DevicePhoneMobileIcon,
      accent: '#38bdf8',
      gradient: 'from-[#38bdf8]/20 to-transparent',
      borderGlow: 'hover:border-[#38bdf8]/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]',
      features: ['Flutter & React Native', 'iOS & Android App Store Ready', 'Real-time Push Alerts', 'Biometric & Secure Auth'],
      href: '/solutions/mobile-app',
    },
    {
      id: 'custom-software',
      title: 'Custom Software',
      tagline: 'Bespoke business software, internal tools & ERP modules',
      description: 'We build tailor-made enterprise management software, operations dashboards, role-based workflows, and database engines specifically designed for your business logic.',
      icon: CommandLineIcon,
      accent: '#ec4899',
      gradient: 'from-[#ec4899]/20 to-transparent',
      borderGlow: 'hover:border-[#ec4899]/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]',
      features: ['Custom Business Logic', 'Granular Role-Based Access', 'Data Visualizations & Reports', 'Secure SQL & NoSQL Engines'],
      href: '/solutions/custom-software',
    },
    {
      id: 'saas-development',
      title: 'SaaS Development',
      tagline: 'Multi-tenant cloud platforms built to scale',
      description: 'Turn your software product idea into a marketable SaaS platform. Scalable subscription billing, tenant data isolation, API rate-limiting, and developer webhooks.',
      icon: CpuChipIcon,
      accent: '#f59e0b',
      gradient: 'from-[#f59e0b]/20 to-transparent',
      borderGlow: 'hover:border-[#f59e0b]/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
      features: ['Multi-Tenant Database Design', 'Recurring Billing & Invoicing', 'REST & GraphQL Developer APIs', 'Automated Provisioning'],
      href: '/solutions/saas-development',
    },
    {
      id: 'api-integrations',
      title: 'API & Integrations',
      tagline: 'Connect payment, courier, CRM & operational services',
      description: 'Eliminate data silos with custom webhook pipelines, third-party API orchestrations, and bi-directional synchronizations across payments, logistics, and enterprise systems.',
      icon: ServerIcon,
      accent: '#10b981',
      gradient: 'from-[#10b981]/20 to-transparent',
      borderGlow: 'hover:border-[#10b981]/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      features: ['Payment Gateway Integrations', 'Courier & Logistics Webhooks', 'CRM & ERP Synchronization', 'High-Reliability Queues'],
      href: '/solutions/api-integrations',
    },
    {
      id: 'hosting-deployment',
      title: 'Hosting & Deployment',
      tagline: 'High-availability cloud infrastructure & continuous delivery',
      description: 'Managed cloud architecture, containerized Docker deployments, CDN edge routing, automated SSL provisioning, and nightly encrypted backup protocols.',
      icon: ShieldCheckIcon,
      accent: '#06b6d4',
      gradient: 'from-[#06b6d4]/20 to-transparent',
      borderGlow: 'hover:border-[#06b6d4]/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
      features: ['99.9% Uptime Architecture', 'Global CDN Edge Caching', 'Automated CI/CD Pipelines', 'Encrypted Nightly Backups'],
      href: '/solutions/hosting-maintenance',
    },
    {
      id: 'maintenance-support',
      title: 'Maintenance & Support',
      tagline: 'Proactive monitoring, security audits & ongoing updates',
      description: 'Ensure your business systems stay fast, secure, and compliant. Proactive vulnerability scanning, library upgrades, bug resolution, and guaranteed service response times.',
      icon: WrenchScrewdriverIcon,
      accent: '#a855f7',
      gradient: 'from-[#a855f7]/20 to-transparent',
      borderGlow: 'hover:border-[#a855f7]/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
      features: ['24/7 Uptime Monitoring', 'Security Patches & Audits', 'Performance Optimization', 'Dedicated Developer SLA'],
      href: '/solutions/hosting-maintenance',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-b border-[#2a2a30]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,212,170,0.14),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.12),transparent_35%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa]">
              NEXTDIGI SOLUTIONS
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 max-w-4xl mx-auto">
            Technology That Moves Your <span className="bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">Business Forward</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#8c8c9a] max-w-3xl mx-auto leading-relaxed mb-10">
            We design and build modern websites, e-commerce platforms, mobile applications, custom software, and SaaS products for businesses that want to operate digitally and scale reliably.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] shadow-lg shadow-[#00d4aa]/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Start a Project</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-[#1a1a1f] border border-[#2a2a30] text-white hover:border-[#00d4aa]/50 hover:bg-white/5 transition-all"
            >
              <span>Explore Services</span>
            </a>
          </div>

          {/* Capability Indicators */}
          <div className="mt-14 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-[#a1a1aa]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
              Modern Next.js &amp; React Stack
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
              Production-Grade Architecture
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899]" />
              Direct Developer Communication
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
              Ongoing Technical Support
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Comprehensive Technology Services
            </h2>
            <p className="text-[#8c8c9a] text-sm sm:text-base leading-relaxed">
              From standalone web platforms to multi-tenant software suites, we deliver end-to-end engineering aligned with your business goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.id}
                  className={`rounded-2xl bg-[#121217] border border-[#2a2a30] p-6 flex flex-col justify-between transition-all duration-300 ${srv.borderGlow} group relative overflow-hidden`}
                >
                  <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${srv.gradient} rounded-bl-full pointer-events-none`} />

                  <div>
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/10"
                      style={{ backgroundColor: `${srv.accent}15`, color: srv.accent }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4aa] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#71717a] mb-3">
                      {srv.tagline}
                    </p>
                    <p className="text-xs text-[#8c8c9a] leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                      {srv.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#d4d4d8]">
                          <CheckCircleIcon className="w-3.5 h-3.5 shrink-0" style={{ color: srv.accent }} />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={srv.href}
                    className="inline-flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group/btn"
                  >
                    <span>View Service Details</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering Process */}
      <section className="py-20 bg-[#0a0a0d] border-t border-b border-[#22222a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-2">
              HOW WE WORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              The NextDigi Engineering Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discover & Scope', desc: 'We analyze your business model, requirements, user journeys, and technical constraints to create a clear blueprint.' },
              { step: '02', title: 'Design & Prototype', desc: 'Interactive UI/UX design systems and high-fidelity mockups tested for usability, conversions, and speed.' },
              { step: '03', title: 'Build & Test', desc: 'Clean, scalable code developed iteratively with weekly milestone demos and rigorous QA validation.' },
              { step: '04', title: 'Deploy & Support', desc: 'Production release on managed cloud infrastructure with continuous monitoring and responsive support.' },
            ].map((st, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#121217] border border-white/5 relative group hover:border-[#00d4aa]/40 transition-all">
                <span className="text-3xl font-black text-[#00d4aa]/30 group-hover:text-[#00d4aa] transition-colors block mb-4">
                  {st.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs text-[#8c8c9a] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-[#00d4aa]/30 bg-gradient-to-r from-[#121217] via-[#101917] to-[#121217] shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00d4aa]/10 blur-3xl rounded-full pointer-events-none" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00d4aa] block mb-3">
              HAVE A BUSINESS IDEA?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Let&apos;s Build Your Digital Solution
            </h2>
            <p className="text-sm sm:text-base text-[#8c8c9a] max-w-xl mx-auto mb-8">
              Tell us what you&apos;re planning. We&apos;ll help you evaluate feasibility, choose the right architecture, and turn the idea into a high-performing product.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] shadow-lg shadow-[#00d4aa]/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Start a Project</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
