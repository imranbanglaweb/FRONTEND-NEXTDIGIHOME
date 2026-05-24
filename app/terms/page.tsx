import Link from "next/link";
import { DocumentTextIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { fetchTermsContent } from "@/app/utils/api";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms of service for Next Digi Home. Learn about our 30-day money-back guarantee, licensing, and usage rights for all premium digital products.",
  robots: { index: true, follow: true },
};

export const dynamic = 'force-dynamic';

interface TermsContent {
  id: number;
  title: string;
  description: string;
  content: string;
}

async function getTermsContent(): Promise<TermsContent> {
  try {
    const data = await fetchTermsContent();
    
    if (data.success && data.data) {
      return data.data;
    }
  } catch (error) {
    console.error('Failed to fetch terms content:', error);
  }

  // Fallback content
  return {
    id: 1,
    title: 'Terms of Service',
    description: 'Please read these terms carefully before using our services. By using Next Digi Home, you agree to be bound by these terms.',
    content: `
      <h2 className="text-2xl font-bold text-[#fafafa] mb-6">1. Acceptance of Terms</h2>
      <p className="text-[#737373] mb-8 leading-relaxed">
        By accessing and using our services, you accept and agree to be bound by these terms.
      </p>

      <h2 className="text-2xl font-bold text-[#fafafa] mb-6">2. Use License</h2>
      <p className="text-[#737373] mb-6 leading-relaxed">
        Permission is granted to temporarily download materials for personal, non-commercial viewing only.
      </p>

      <h2 className="text-2xl font-bold text-[#fafafa] mb-6">3. Digital Product License</h2>
      <p className="text-[#737373] mb-6 leading-relaxed">
        Digital products purchased are licensed, not sold. You are granted a personal, non-transferable license to use them.
      </p>
    `
  };
}

export default async function TermsPage() {
  const content = await getTermsContent();
  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/10 via-transparent to-[#8b5cf6]/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] rounded-2xl flex items-center justify-center mb-6">
              <ScaleIcon className="w-10 h-10 text-[#0f0f12]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              {content?.title || 'Terms of Service'}
            </h1>
            <p className="text-xl text-[#737373] max-w-3xl mx-auto">
              {content?.description || 'Please read these terms carefully before using our services. By using Next Digi Home, you agree to be bound by these terms.'}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,170,0.05)_0%,rgba(8,8,8,0)_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 border border-[#2a2a30]">
            <div className="prose prose-invert max-w-none">
              <p className="text-sm text-[#737373] mb-8">Last updated: {new Date().toLocaleDateString()}</p>

              <div className="text-[#737373] leading-relaxed" dangerouslySetInnerHTML={{ __html: content?.content || '' }} />

              {/* Default content if no content from API */}
              {!content?.content && (
                <>
                  <h2 className="text-2xl font-bold text-[#fafafa] mb-6">1. Acceptance of Terms</h2>
                  <p className="text-[#737373] mb-8 leading-relaxed">
                    By accessing and using Next Digi Home, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>

                  <h2 className="text-2xl font-bold text-[#fafafa] mb-6">2. Use License</h2>
                  <p className="text-[#737373] mb-6 leading-relaxed">
                    Permission is granted to temporarily download one copy of the materials on Next Digi Home for personal, non-commercial transitory viewing only.
                  </p>
                  <ul className="text-[#737373] mb-8 space-y-2">
                    <li>• Modify or copy the materials</li>
                    <li>• Use the materials for any commercial purpose or for any public display</li>
                    <li>• Attempt to decompile or reverse engineer any software contained on our website</li>
                    <li>• Remove any copyright or other proprietary notations from the materials</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#fafafa] mb-6">3. Digital Product License</h2>
                  <p className="text-[#737373] mb-6 leading-relaxed">
                When you purchase a digital product from Next Digi Home, you are granted a non-exclusive, non-transferable license to use the product according to the following terms:
              </p>
              <ul className="text-[#737373] mb-8 space-y-2">
                <li>• Use the product for personal or commercial projects</li>
                <li>• Modify the product for your specific needs</li>
                <li>• Include the product in end products for sale</li>
                <li>• You may not resell, redistribute, or share the original product files</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">4. Refund Policy</h2>
              <p className="text-[#737373] mb-8 leading-relaxed">
                We offer a 30-day money-back guarantee on all digital products. If you are not completely satisfied with your purchase, you may request a full refund within 30 days of purchase. Refunds will be processed within 5-7 business days after approval.
              </p>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">5. User Accounts</h2>
              <p className="text-[#737373] mb-6 leading-relaxed">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:
              </p>
              <ul className="text-[#737373] mb-8 space-y-2">
                <li>• Safeguarding your account password</li>
                <li>• All activities that occur under your account</li>
                <li>• Notifying us immediately of any unauthorized use</li>
                <li>• Ensuring your information remains accurate and up-to-date</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">6. Prohibited Uses</h2>
              <p className="text-[#737373] mb-6 leading-relaxed">
                You may not use our products or services:
              </p>
              <ul className="text-[#737373] mb-8 space-y-2">
                <li>• For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>• To submit false or misleading information</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">7. Intellectual Property</h2>
              <p className="text-[#737373] mb-8 leading-relaxed">
                The service and its original content, features, and functionality are and will remain the exclusive property of Next Digi Home and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">8. Termination</h2>
              <p className="text-[#737373] mb-8 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.
              </p>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">9. Limitation of Liability</h2>
              <p className="text-[#737373] mb-8 leading-relaxed">
                In no event shall Next Digi Home, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">10. Governing Law</h2>
              <p className="text-[#737373] mb-8 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">11. Changes to Terms</h2>
              <p className="text-[#737373] mb-8 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>

               <h2 className="text-2xl font-bold text-[#fafafa] mb-6">12. Contact Information</h2>
               <p className="text-[#737373] mb-6 leading-relaxed">
                 If you have any questions about these Terms of Service, please contact us:
               </p>
                <div className="bg-[#1a1a1f] rounded-xl p-6 border border-[#2a2a30] mb-8">
                  <p className="text-[#fafafa] font-medium mb-2">DigitalHub Legal Team</p>
                  <p className="text-[#737373] mb-1">Email: info@nextdigihome.com</p>
                  <p className="text-[#737373]">Address: 123 Digital Street, Tech City, TC 12345, United States</p>
                </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/10 via-[#8b5cf6]/10 to-[#00d4aa]/10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-12 border border-[#2a2a30]">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] rounded-2xl flex items-center justify-center mb-6">
              <DocumentTextIcon className="w-8 h-8 text-[#0f0f12]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Have Questions About Our Terms?
            </h2>
            <p className="text-lg text-[#737373] mb-8 max-w-2xl mx-auto">
              Our legal team is here to help clarify any questions you may have about our terms of service.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#1a1a1f] border border-[#2a2a30] text-[#fafafa] font-medium rounded-xl hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors"
            >
              Contact Legal Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}