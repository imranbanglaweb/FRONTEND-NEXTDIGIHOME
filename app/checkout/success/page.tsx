'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon, ArrowDownTrayIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transaction');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#737373]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12]">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-[#0f0f12]" />
          </div>

          <h1 className="text-3xl font-bold text-[#fafafa] mb-4">Order Placed Successfully!</h1>
          <p className="text-[#737373] mb-8 max-w-md mx-auto">
            Thank you for your purchase. Your order has been received and is now awaiting payment verification.
          </p>

          {transactionId && (
            <div className="bg-[#1a1a1f] rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-[#fafafa] mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#737373]">Transaction ID:</span>
                  <span className="text-[#fafafa] font-mono text-sm">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Status:</span>
                  <span className="text-[#f59e0b] font-medium">Pending Verification</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#00d4aa]/10 border border-[#00d4aa]/30 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-[#00d4aa] mb-3">What&apos;s Next?</h3>
            <ol className="text-left text-[#737373] space-y-2 list-decimal list-inside">
              <li>Complete your payment via bank transfer</li>
              <li>Return to your order page to upload payment proof</li>
              <li>Wait for admin verification (usually within 24 hours)</li>
              <li>Receive email with download link once approved</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="px-6 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] hover:border-[#00d4aa]/50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Upload Payment Proof
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              View Orders
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] hover:border-[#00d4aa]/50 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border border-[#00d4aa] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#737373]">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
