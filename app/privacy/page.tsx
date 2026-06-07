import Link from "next/link";
import { ShieldCheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { fetchPrivacyContent } from "@/app/utils/api";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read Next Digi Home's privacy policy. We protect your data with industry-leading security while providing premium digital products and services.",
  robots: { index: true, follow: true },
};

export const dynamic = 'force-dynamic';

interface PrivacyContent {
  id: number;
  title: string;
  description: string;
  content: string;
}

async function getPrivacyContent(): Promise<PrivacyContent> {
  try {
    const data = await fetchPrivacyContent();
    
    if (data.success && data.data) {
      return data.data;
    }
  } catch (error) {
    console.error('Failed to fetch privacy content:', error);
  }

  // Fallback content
  return {
    id: 1,
    title: 'Privacy Policy',
    description: 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.',
    content: `
      <h2 className="text-2xl font-bold text-[#fafafa] mb-6">1. Information We Collect</h2>
      <p className="text-[#737373] mb-6 leading-relaxed">
        We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
      </p>

      <h2 className="text-2xl font-bold text-[#fafafa] mb-6">2. How We Use Your Information</h2>
      <p className="text-[#737373] mb-6 leading-relaxed">
        We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
      </p>

      <h2 className="text-2xl font-bold text-[#fafafa] mb-6">3. Data Security</h2>
      <p className="text-[#737373] mb-6 leading-relaxed">
        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access.
      </p>
    `
  };
}

export default async function PrivacyPage() {
  const content = await getPrivacyContent();
  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/10 via-transparent to-[#8b5cf6]/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheckIcon className="w-10 h-10 text-[#0f0f12]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              {content?.title || 'Privacy Policy'}
            </h1>
            <p className="text-xl text-[#737373] max-w-3xl mx-auto">
              {content?.description || 'Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.'}
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
                  <h2 className="text-2xl font-bold text-[#fafafa] mb-6">1. Information We Collect</h2>
                  <p className="text-[#737373] mb-6 leading-relaxed">
                    We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:
                  </p>
                  <ul className="text-[#737373] mb-8 space-y-2">
                    <li>• Name and contact information</li>
                    <li>• Payment information (processed securely by third parties)</li>
                    <li>• Account credentials and preferences</li>
                    <li>• Communications with our support team</li>
                    <li>• Usage data and analytics</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-[#fafafa] mb-6">2. How We Use Your Information</h2>
                  <p className="text-[#737373] mb-6 leading-relaxed">
                    We use the information we collect to:
                  </p>
                  <ul className="text-[#737373] mb-8 space-y-2">
                    <li>• Provide and improve our products and services</li>
                <li>• Process transactions and send related information</li>
                <li>• Send technical notices and support messages</li>
                <li>• Communicate with you about products, services, and promotions</li>
                <li>• Protect against fraud and unauthorized access</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">3. Information Sharing</h2>
              <p className="text-[#737373] mb-6 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
              </p>
              <ul className="text-[#737373] mb-8 space-y-2">
                <li>• With service providers who assist our operations</li>
                <li>• When required by law or to protect our rights</li>
                <li>• In connection with a business transfer</li>
                <li>• With your explicit consent</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">4. Data Security</h2>
              <p className="text-[#737373] mb-8 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
              </p>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">5. Your Rights</h2>
              <p className="text-[#737373] mb-6 leading-relaxed">
                You have the right to:
              </p>
              <ul className="text-[#737373] mb-8 space-y-2">
                <li>• Access and update your personal information</li>
                <li>• Request deletion of your data</li>
                <li>• Opt out of marketing communications</li>
                <li>• Request data portability</li>
                <li>• Lodge a complaint with supervisory authorities</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">6. Cookies and Tracking</h2>
              <p className="text-[#737373] mb-8 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie preferences through your browser settings.
              </p>

              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">7. Contact Us</h2>
              <p className="text-[#737373] mb-6 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-[#1a1a1f] rounded-xl p-6 border border-[#2a2a30] mb-8">
                <p className="text-[#fafafa] font-medium mb-2">DigitalHub Privacy Team</p>
                <p className="text-[#737373] mb-1">Email: info@nextdigihome.com</p>
                <p className="text-[#737373]">Address: 123 Digital Street, Tech City, TC 12345, United States</p>
              </div>

               <h2 className="text-2xl font-bold text-[#fafafa] mb-6">8. Changes to This Policy</h2>
                <p className="text-[#737373] mb-8 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                </p>
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
            <div className="w-16 h-16 mx-auto bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] rounded-2xl flex items-center justify-center mb-6">
              <LockClosedIcon className="w-8 h-8 text-[#0f0f12]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Your Data is Safe With Us
            </h2>
            <p className="text-lg text-[#737373] mb-8 max-w-2xl mx-auto">
              We are committed to protecting your privacy and maintaining the security of your personal information.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#1a1a1f] border border-[#2a2a30] text-[#fafafa] font-medium rounded-xl hover:border-[#00d4aa] hover:text-[#00d4aa] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}