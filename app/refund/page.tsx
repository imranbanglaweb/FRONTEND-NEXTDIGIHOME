import Link from "next/link";
import { ArrowLeftIcon, ShieldCheckIcon, CheckCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import type { Metadata } from 'next';
import { generatePageMetadata } from "@/app/utils/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Refund Policy",
  description: "NextDigiHome Refund Policy. Learn about our customer satisfaction terms, digital asset refund criteria, and service guarantees.",
  path: "/refund",
});

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-[#2a2a30]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/5 via-transparent to-[#8b5cf6]/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#00d4aa] mb-6 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/5 backdrop-blur-md mb-6">
              <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
              <span className="text-sm font-semibold text-[#00d4aa]">TRANSPARENT GUARANTEE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="text-lg text-[#737373] max-w-2xl mx-auto">
              Our commitment to fair, transparent terms for both digital marketplace products and technology services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-8 sm:p-12 border border-[#2a2a30] space-y-10">
            
            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-[#2a2a30]">
              <div className="bg-[#121217] p-5 rounded-xl border border-white/5">
                <ArrowPathIcon className="w-8 h-8 text-[#00d4aa] mb-3" />
                <h3 className="text-white font-bold text-base mb-1">30-Day Guarantee</h3>
                <p className="text-xs text-[#8c8c9a]">Valid on eligible defective or misdescribed digital assets.</p>
              </div>
              <div className="bg-[#121217] p-5 rounded-xl border border-white/5">
                <CheckCircleIcon className="w-8 h-8 text-[#8b5cf6] mb-3" />
                <h3 className="text-white font-bold text-base mb-1">Service Milestones</h3>
                <p className="text-xs text-[#8c8c9a]">Solutions projects protected by staged deliverable sign-offs.</p>
              </div>
              <div className="bg-[#121217] p-5 rounded-xl border border-white/5">
                <ShieldCheckIcon className="w-8 h-8 text-[#ec4899] mb-3" />
                <h3 className="text-white font-bold text-base mb-1">Direct Support</h3>
                <p className="text-xs text-[#8c8c9a]">Dedicated resolution within 24-48 business hours.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#fafafa] mb-4">1. Digital Products (NextDigi Store)</h2>
              <p className="text-[#8c8c9a] leading-relaxed mb-4">
                Because digital goods (templates, code bundles, UI kits, design resources) are instantly delivered upon payment, general change-of-mind refunds are restricted once files are downloaded.
              </p>
              <p className="text-[#8c8c9a] leading-relaxed mb-4">
                However, you are eligible for a full refund or replacement under our <strong>30-Day Quality Guarantee</strong> if:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#b0b0b0]">
                <li>The downloaded asset is corrupted, broken, or critically defective and our support team cannot provide a working fix within 48 hours.</li>
                <li>The product materially differs from the description, preview, or stated technical specifications.</li>
                <li>You were double-charged due to a payment gateway processing anomaly.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#fafafa] mb-4">2. Technology &amp; Software Services (NextDigi Solutions)</h2>
              <p className="text-[#8c8c9a] leading-relaxed mb-4">
                Custom software engineering, web development, mobile apps, and SaaS projects are governed by individual Service Level Agreements (SLAs) with milestone-based invoicing:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#b0b0b0]">
                <li>Deposit payments cover initial architecture, system design, and dedicated resource allocation. Deposits are refundable prior to project kickoff minus administrative setup fees.</li>
                <li>Completed and client-approved milestones are non-refundable.</li>
                <li>If NextDigiHome fails to meet contractual obligations defined in the approved statement of work, unearned milestone balances will be promptly returned.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#fafafa] mb-4">3. AI &amp; Cloud Subscription Services (NextDigi AI &amp; Labs)</h2>
              <p className="text-[#8c8c9a] leading-relaxed mb-4">
                Recurring SaaS licenses (e.g. NextDigi Commerce subscriptions, AI agent APIs) can be cancelled at any time from your dashboard. Cancellation takes effect at the end of the current billing cycle with no cancellation penalties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#fafafa] mb-4">4. How to Request a Refund</h2>
              <p className="text-[#8c8c9a] leading-relaxed mb-4">
                To request a refund, email our dedicated support team at <strong className="text-white">support@nextdigihome.com</strong> or WhatsApp <strong className="text-white">+8801918329829</strong> with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#b0b0b0]">
                <li>Your Order ID or Transaction Number</li>
                <li>Account email associated with the purchase</li>
                <li>Detailed description and screenshots of the issue</li>
              </ul>
              <p className="text-[#8c8c9a] leading-relaxed mt-4">
                Approved refunds are processed to the original payment method (bKash, Nagad, Rocket, Bank Card) within 3 to 7 business days.
              </p>
            </div>

            <div className="bg-[#121217] rounded-xl p-6 border border-[#2a2a30]">
              <h3 className="text-[#fafafa] font-bold mb-2">NextDigiHome Support &amp; Billing</h3>
              <p className="text-[#8c8c9a] text-sm mb-1">Email: support@nextdigihome.com | billing@nextdigihome.com</p>
              <p className="text-[#8c8c9a] text-sm">Customer Helpline: +8801918329829</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
