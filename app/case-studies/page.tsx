import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  CommandLineIcon, 
  ShoppingBagIcon, 
  WrenchScrewdriverIcon, 
  CpuChipIcon,
  ServerIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { generatePageMetadata } from '@/app/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: "Case Studies | Engineering & SaaS Architecture Case Studies",
  description: "Explore genuine engineering case studies by NextDigiHome: NextDigi Commerce, Garibondhu360, and high-availability cloud infrastructure builds.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      id: 'nextdigi-commerce',
      title: 'NextDigi Commerce Platform',
      category: 'Headless E-Commerce & Payment Integration',
      client: 'Retail & Multi-Vendor Merchants',
      timeline: '10 Weeks Engineering Lifecycle',
      accent: '#00d4aa',
      problem: 'Regional merchants struggled with traditional monolith platforms (e.g. standard WooCommerce) experiencing 4-7 second page load times, frequent checkout abandonment due to manual payment verification, and manual data re-entry into courier portals.',
      solution: 'We engineered a high-performance headless commerce platform using Next.js 16, Node.js, and Redis caching. We built a native tokenized checkout integrating bKash, Nagad, and Rocket, paired with automated API webhook listeners that create courier consignments (Pathao, Steadfast, RedX) instantly upon payment confirmation.',
      techStack: ['Next.js 16', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'bKash API', 'Nagad API', 'Docker'],
      impacts: [
        'Reduced checkout completion time from 3+ minutes to under 45 seconds',
        'Eliminated manual transaction slip verification with automated instant webhooks',
        'Achieved sub-second product catalog page rendering under peak traffic',
        'Automated 100% of shipping consignment creation without manual copy-pasting'
      ],
      href: '/labs/commerce'
    },
    {
      id: 'garibondhu360',
      title: 'Garibondhu360 Automotive SaaS',
      category: 'Vertical Enterprise SaaS & Workshop ERP',
      client: 'Automotive Workshops & Fleet Operators',
      timeline: '16 Weeks Engineering Lifecycle',
      accent: '#38bdf8',
      problem: 'Automotive repair centers faced continuous inventory shrinkage, unbilled mechanic labor hours, lost paper job cards, and lack of transparency with car owners, leading to customer disputes and delayed vehicle handovers.',
      solution: 'NextDigi Labs designed and built Garibondhu360, an end-to-end digital workshop operating system. Features include mobile-friendly vehicle intake with camera damage logs, barcode-scanned parts allocation directly linked to job cards, automated customer SMS status alerts, and multi-tenant fleet maintenance reporting.',
      techStack: ['Next.js', 'Node.js API', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'SMS Gateway API'],
      impacts: [
        'Transitioned workshops from physical paper slips to 100% digital job cards',
        'Accurate real-time parts inventory tracking preventing unauthorized stock shrinkage',
        'Automated customer SMS notifications reducing inbound inquiry phone calls by over 50%',
        'Transparent digital invoices with itemized labor and parts breakdown'
      ],
      href: '/labs/garibondhu360'
    },
    {
      id: 'nextdigi-platform',
      title: 'NextDigi High-Concurrency Cloud Architecture',
      category: 'Cloud Infrastructure & API Gateway',
      client: 'Internal Ecosystem & Enterprise Clients',
      timeline: 'Continuous Evolution',
      accent: '#8b5cf6',
      problem: 'Handling concurrent traffic surges, digital file delivery, automated license key provisioning, and multi-channel marketing attribution required a fault-tolerant, secure, and low-latency infrastructure.',
      solution: 'We architected a unified Next.js App Router frontend paired with Dockerized backend microservices, Redis caching layers, Cloudflare edge routing, and automated continuous deployment pipelines. Implemented server-side Conversions API (CAPI) and hardened CSRF/XSS security headers.',
      techStack: ['Next.js App Router', 'Docker', 'Redis', 'Cloudflare', 'PostgreSQL', 'Nginx', 'GitHub Actions CI/CD'],
      impacts: [
        'Maintained 99.9% application uptime with automated container self-healing',
        'Secure, automated digital license key provisioning within 3 seconds of payment',
        'Server-side tracking capture rate improved attribution accuracy by over 25%',
        'Zero-downtime rolling deployments via automated CI/CD pipelines'
      ],
      href: '/solutions/custom-software'
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-28 pb-20 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-10 left-1/3 w-[650px] h-[350px] bg-[#8b5cf6]/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-96 right-1/4 w-[500px] h-[300px] bg-[#00d4aa]/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">Case Studies</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-gray-300 uppercase mb-5">
            <CommandLineIcon className="w-4 h-4 text-[#00d4aa]" />
            PROVEN ENGINEERING
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Real Projects. <span className="bg-gradient-to-r from-[#00d4aa] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent">Real Engineering.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            We don’t rely on theoretical promises or vanity metrics. Explore how our engineering team builds, launches, and operates robust technology solutions for modern businesses.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="space-y-12 mb-20">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-3xl border border-white/10 bg-[#0e131d]/90 p-8 sm:p-12 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-80 h-80 blur-[130px] pointer-events-none rounded-full opacity-15"
                style={{ backgroundColor: study.accent }}
              />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
                      {study.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {study.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {study.timeline}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                  {/* Problem & Solution */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#ec4899] mb-2">
                        The Challenge & Operational Bottleneck
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {study.problem}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#00d4aa] mb-2">
                        The Architectural & Engineering Solution
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        Technologies Deployed
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {study.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Impact Highlights */}
                  <div className="lg:col-span-5 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a78bfa] mb-4">
                        Measurable Operational Results
                      </h3>
                      <div className="space-y-3.5">
                        {study.impacts.map((impact, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
                            <CheckCircleIcon className="w-5 h-5 text-[#00d4aa] shrink-0 mt-0.5" />
                            <span>{impact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <Link
                        href={study.href}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#00d4aa] transition"
                      >
                        Explore Relevant Architecture <ArrowRightIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-[#00d4aa]/30 bg-gradient-to-r from-[#00d4aa]/15 via-[#8b5cf6]/10 to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Have a complex technical project to solve?
            </h3>
            <p className="text-gray-300 max-w-xl text-sm sm:text-base">
              Speak directly with our technical leads to architect a custom platform built for your exact operational requirements.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl font-bold text-black bg-[#00d4aa] hover:bg-[#00e2b6] transition shadow-lg shadow-[#00d4aa]/30 shrink-0"
          >
            Start a Project Discussion
          </Link>
        </div>

      </div>
    </div>
  );
}
