'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, ArrowLeftIcon, BanknotesIcon, PhotoIcon, CreditCardIcon, BuildingStorefrontIcon, DevicePhoneMobileIcon, BuildingLibraryIcon, ClockIcon, CloudArrowUpIcon, EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { getStorageUrl, apiFetch } from '../utils/api';
import {
  getAccessLabel,
  getPurchaseType,
  getPurchaseTypeLabel,
  getValidityDays,
  type CommercialInfo,
} from '../utils/commercial';

interface CartItem extends CommercialInfo {
  id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string | null;
}

interface CheckoutResponse {
  success?: boolean;
  message?: string;
  purchases?: Array<{
    transaction_id?: string;
  }>;
}

interface VerificationResponse {
  success?: boolean;
  message?: string;
}

type ApiError = Error & {
  status?: number;
  data?: {
    message?: string;
  };
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<{name: string, email: string, phone?: string} | null>(null);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    payment_method: 'bkash',
    notes: '',
    sender_number: '',
    transaction_id: '',
  });

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error', visible: boolean} | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<number, boolean>>({});

const fetchUser = async (token: string) => {
    try {
      const data = await apiFetch('/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (data?.user) {
        setUser(data.user);
        const autoFillFormData = {
          customer_name: data.user.name,
          customer_email: data.user.email,
          customer_phone: data.user.phone || '',
          payment_method: 'bkash',
          notes: '',
          sender_number: '',
          transaction_id: '',
        };
        setFormData(autoFillFormData);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('auth_token');
      setIsAuthenticated(false);
      window.location.href = '/signup';
    }
  };

const checkAuthentication = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setIsAuthenticated(false);
      window.location.href = '/signup';
      return;
    }

    setIsAuthenticated(true);
    fetchUser(token);
  };

const fetchCart = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const data = await apiFetch('/cart', {
        credentials: 'include',
        headers,
      });
      if (data?.items?.length === 0) {
        window.location.href = '/cart';
        return;
      }
      setItems((data?.items || []).map((item: CartItem) => ({
        ...item,
        price: Number(item.price),
        total: Number(item.total),
      })));
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
    fetchCart();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPaymentProof(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPaymentProofPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type, visible: true });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const clearCheckoutCart = async (token: string) => {
    try {
      await apiFetch('/cart', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
    } catch (cartError) {
      console.error('Failed to clear cart after checkout:', cartError);
    } finally {
      setItems([]);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };



  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Prepare items array from cart
      const orderItems = items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        purchase_type: getPurchaseType(item),
        validity_days: getValidityDays(item),
      }));

      const checkoutPayload = {
        ...formData,
        items: JSON.stringify(orderItems),
      };

       const data = await apiFetch<CheckoutResponse>('/checkout', {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${token}`,
           'Accept': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify(checkoutPayload),
       });

      if (data.success) {
        const firstPurchase = data.purchases?.[0];
        const newTransactionId = firstPurchase?.transaction_id || formData.transaction_id || null;
        setTransactionId(newTransactionId);
        localStorage.setItem('customer_email', formData.customer_email);
        setStep('payment');
      } else {
        alert(data.message || 'Checkout failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const apiError = error as ApiError;
      if (apiError.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/cart';
        return;
      }
      alert(apiError.data?.message || 'Failed to complete order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    const paymentTransactionId = formData.transaction_id.trim();
    const senderNumber = formData.sender_number.trim();

    if (!paymentTransactionId) {
      alert('Please enter transaction ID');
      return;
    }
    if (!senderNumber) {
      alert('Please enter sender number');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formDataVerification = new FormData();
      if (transactionId) {
        formDataVerification.append('order_transaction_id', transactionId);
      }
      formDataVerification.append('transaction_id', paymentTransactionId);
      formDataVerification.append('sender_number', senderNumber);
      if (paymentProof) {
        formDataVerification.append('payment_proof', paymentProof);
      }
      if (formData.notes) {
        formDataVerification.append('notes', formData.notes);
      }

       const data = await apiFetch<VerificationResponse>(`/checkout/verify`, {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${token}`,
         },
         credentials: 'include',
         body: formDataVerification,
       });

      if (data.success) {
        await clearCheckoutCart(token);
        setTransactionId(paymentTransactionId);
        setStep('success');
      } else {
        alert(data.message || 'Verification failed');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Verification error:', error);
      const apiError = error as ApiError;
      if (apiError.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/cart';
        return;
      }
      alert(apiError.data?.message || 'Failed to submit verification. Please try again.');
      setSubmitting(false);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  const getPaymentDetails = (method: string) => {
    switch (method) {
      case 'bkash':
        return {
          icon: DevicePhoneMobileIcon,
          title: 'bKash Payment',
          color: 'from-[#e2136e] to-[#f15a29]',
          instructions: 'Send money to our bKash account',
          details: [
            { label: 'bKash Number', value: '01712-345678' },
            { label: 'Account Name', value: 'Next Digi Home Ltd.' },
            { label: 'Reference', value: transactionId || 'Your Transaction ID' }
          ]
        };
      case 'rocket':
        return {
          icon: DevicePhoneMobileIcon,
          title: 'Rocket Payment',
          color: 'from-[#8b5cf6] to-[#a855f7]',
          instructions: 'Send money to our Rocket account',
          details: [
            { label: 'Rocket Number', value: '01912-345678' },
            { label: 'Account Name', value: 'Next Digi Home Ltd.' },
            { label: 'Reference', value: transactionId || 'Your Transaction ID' }
          ]
        };
      case 'nagad':
        return {
          icon: DevicePhoneMobileIcon,
          title: 'Nagad Payment',
          color: 'from-[#f59e0b] to-[#fbbf24]',
          instructions: 'Send money to our Nagad account',
          details: [
            { label: 'Nagad Number', value: '01812-345678' },
            { label: 'Account Name', value: 'Next Digi Home Ltd.' },
            { label: 'Reference', value: transactionId || 'Your Transaction ID' }
          ]
        };
      case 'bank':
        return {
          icon: BuildingLibraryIcon,
          title: 'Bank Transfer',
          color: 'from-[#00d4aa] to-[#8b5cf6]',
          instructions: 'Transfer money to our bank account',
          details: [
            { label: 'Bank Name', value: 'ABC Bank Ltd.' },
            { label: 'Account Number', value: '1234-5678-9012-3456' },
            { label: 'Account Name', value: 'Next Digi Home Ltd.' },
            { label: 'Routing Number', value: '123456789' },
            { label: 'Reference', value: transactionId || 'Your Transaction ID' }
          ]
        };
      default:
        return null;
    }
  };

  if (loading || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0f0f12] py-12">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#737373]">{loading ? 'Loading checkout...' : 'Checking authentication...'}</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect happens in checkAuthentication
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#0f0f12] py-12">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#737373]">Redirecting to sign up...</p>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#0f0f12] py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 opacity-5">
              <div className="w-full h-full bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <CheckCircleIcon className="w-14 h-14 text-[#0f0f12]" />
              </div>

            <h1 className="text-3xl font-bold text-[#fafafa] mb-4">Order Placed Successfully!</h1>
            <p className="text-[#737373] mb-8">
              Thank you for your purchase. Your payment proof has been submitted and is awaiting admin verification.
            </p>

            <div className="bg-[#1a1a1f] rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-[#fafafa] mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#737373]">Transaction ID:</span>
                  <span className="text-[#fafafa] font-mono">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Status:</span>
                  <span className="text-[#f59e0b] font-medium">Pending Verification</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Total:</span>
                  <span className="text-[#fafafa] font-bold">৳${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#00d4aa]/10 border border-[#00d4aa]/30 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-[#00d4aa] mb-3">What&apos;s Next?</h3>
              <ol className="text-left text-[#737373] space-y-2 list-decimal list-inside">
                <li>Our admin will review your payment proof (usually within 24 hours)</li>
                <li>Once approved, you&apos;ll receive an email with your download link</li>
                <li>You can also access your downloads from your account dashboard</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-6 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] hover:border-[#00d4aa]/50 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Go to Dashboard
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-[#0f0f12] py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#fafafa] font-medium">Details</span>
                </div>
                <div className="w-8 h-0.5 bg-[#00d4aa]"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#00d4aa] rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                  <span className="text-[#fafafa] font-medium">Payment</span>
                </div>
                <div className="w-8 h-0.5 bg-[#2a2a30]"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#2a2a30] rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-[#737373]">3</span>
                  </div>
                  <span className="text-[#737373] font-medium">Success</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-[#2a2a30] rounded-full h-2">
              <div className="bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] h-2 rounded-full" style={{ width: '66%' }}></div>
            </div>
          </div>

          <div className="mb-8">
            <button
              onClick={() => setStep('details')}
              className="flex items-center gap-2 text-[#737373] hover:text-[#00d4aa] transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Details
            </button>
            <h1 className="text-3xl font-bold text-[#fafafa] mt-4 mb-2">Payment Verification</h1>
            <p className="text-[#737373]">Upload your payment proof to complete the order</p>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 opacity-5">
              <div className="w-full h-full bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Payment Process and Payment Information */}
                <div className="space-y-6">
                  {/* Process Steps */}
                  <div className="bg-linear-to-br from-[#1a1a1f] to-[#141418] rounded-xl p-6 border border-[#2a2a30]/50 shadow-lg">
                    <h3 className="text-lg font-semibold text-[#fafafa] mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                        <BanknotesIcon className="w-4 h-4 text-white" />
                      </div>
                      Payment Process
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#00d4aa]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-[#00d4aa]">1</span>
                        </div>
                        <div>
                          <p className="text-[#fafafa] font-medium text-sm">Complete Payment</p>
                          <p className="text-[#737373] text-xs">Use the payment details below to send money</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#00d4aa]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <PhotoIcon className="w-4 h-4 text-[#00d4aa]" />
                        </div>
                        <div>
                          <p className="text-[#fafafa] font-medium text-sm">Capture Proof</p>
                          <p className="text-[#737373] text-xs">Take a screenshot of your payment confirmation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#00d4aa]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CloudArrowUpIcon className="w-4 h-4 text-[#00d4aa]" />
                        </div>
                        <div>
                          <p className="text-[#fafafa] font-medium text-sm">Upload Proof</p>
                          <p className="text-[#737373] text-xs">Submit your payment proof below</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#00d4aa]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <EyeIcon className="w-4 h-4 text-[#00d4aa]" />
                        </div>
                        <div>
                          <p className="text-[#fafafa] font-medium text-sm">Admin Review</p>
                          <p className="text-[#737373] text-xs">Our team verifies your payment (24 hours)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#00d4aa]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ArrowDownTrayIcon className="w-4 h-4 text-[#00d4aa]" />
                        </div>
                        <div>
                          <p className="text-[#fafafa] font-medium text-sm">Get Downloads</p>
                          <p className="text-[#737373] text-xs">Receive download links via email</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Payment Proof */}
                  <div className="bg-linear-to-br from-[#1a1a1f] to-[#141418] rounded-xl p-6 border border-[#2a2a30]/50 shadow-lg">
                    <h3 className="text-lg font-semibold text-[#fafafa] mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                        <CloudArrowUpIcon className="w-4 h-4 text-white" />
                      </div>
                      Submit Payment Proof
                    </h3>

                    <form onSubmit={handlePaymentVerification} className="space-y-4">
                      {/* Sender Number */}
                      <div>
                        <label className="block text-sm font-medium text-[#fafafa] mb-2">
                          Sender Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.sender_number}
                          onChange={(e) => setFormData(prev => ({ ...prev, sender_number: e.target.value }))}
                          className="w-full px-4 py-3 bg-[#0f0f12] border border-[#2a2a30] rounded-lg text-[#fafafa] placeholder-[#737373] focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa] transition-all duration-200"
                          placeholder="Enter your mobile number"
                          required
                        />
                      </div>

                      {/* Transaction ID */}
                      <div>
                        <label className="block text-sm font-medium text-[#fafafa] mb-2">
                          Transaction ID <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.transaction_id}
                          onChange={(e) => setFormData(prev => ({ ...prev, transaction_id: e.target.value }))}
                          className="w-full px-4 py-3 bg-[#0f0f12] border border-[#2a2a30] rounded-lg text-[#fafafa] placeholder-[#737373] focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa] transition-all duration-200"
                          placeholder="Enter transaction ID"
                          required
                        />
                      </div>

                      {/* Payment Proof Upload */}
                      <div>
                        <label className="block text-sm font-medium text-[#fafafa] mb-3">
                          Upload Payment Proof <span className="text-[#737373]">(Optional)</span>
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#2a2a30] border-dashed rounded-2xl cursor-pointer bg-linear-to-br from-[#0f0f12] to-[#1a1a1f] hover:border-[#00d4aa] hover:bg-linear-to-br hover:from-[#00d4aa]/5 hover:to-[#8b5cf6]/5 transition-all duration-300 group">
                            <div className="flex flex-col items-center justify-center pt-3 pb-4">
                              {paymentProofPreview ? (
                                <div className="relative">
                                  <img src={paymentProofPreview} alt="Payment proof" className="max-h-20 rounded-lg shadow-lg border border-[#2a2a30]/50" />
                                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#00d4aa] rounded-full flex items-center justify-center">
                                    <CheckCircleIcon className="w-3 h-3 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="w-8 h-8 bg-[#00d4aa]/20 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#00d4aa]/30 transition-colors">
                                    <CloudArrowUpIcon className="w-4 h-4 text-[#00d4aa]" />
                                  </div>
                                  <p className="text-xs text-[#fafafa] font-medium mb-1">
                                    Click to upload payment proof
                                  </p>
                                  <p className="text-xs text-[#737373]">PNG, JPG, PDF up to 5MB</p>
                                </>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setPaymentProof(file);
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setPaymentProofPreview(e.target?.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="group relative w-full bg-gradient-to-r from-[#00d4aa] via-[#8b5cf6] to-[#00d4aa] text-white font-semibold py-4 px-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {submitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <CheckCircleIcon className="w-5 h-5" />
                              Complete Order
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#00d4aa] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>

                      <p className="text-center text-sm text-[#737373]">
                        By submitting, you confirm that the payment has been made as per the instructions above.
                      </p>
                    </form>
                  </div>


                </div>

                {/* Right Column: Payment Information, Order Summary and Customer Details */}
                <div className="space-y-6">
                  {/* Payment Information - Right Column */}
                  <div className="bg-linear-to-br from-[#1a1a1f] to-[#141418] rounded-xl p-6 border border-[#2a2a30]/50 shadow-lg">
                    <h4 className="text-lg font-semibold text-[#fafafa] mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                        <CreditCardIcon className="w-4 h-4 text-white" />
                      </div>
                      Payment Information
                    </h4>
                    {(() => {
                      const paymentDetails = getPaymentDetails(formData.payment_method);
                      if (!paymentDetails) return null;

                      const IconComponent = paymentDetails.icon;

                      return (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-[#0f0f12] rounded-lg border border-[#2a2a30]/30">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h5 className="text-[#fafafa] font-medium">{paymentDetails.title}</h5>
                              <p className="text-[#737373] text-sm">{paymentDetails.instructions}</p>
                            </div>
                          </div>

                          <div className="bg-[#0f0f12] rounded-lg p-4 border border-[#2a2a30]/30">
                            <div className="grid grid-cols-1 gap-3">
                              {paymentDetails.details.map((detail, index) => {
                                const copied = copiedStates[index] || false;

                                const handleCopy = async () => {
                                  try {
                                    await navigator.clipboard.writeText(detail.value);
                                    setCopiedStates(prev => ({ ...prev, [index]: true }));
                                    setTimeout(() => {
                                      setCopiedStates(prev => ({ ...prev, [index]: false }));
                                    }, 2000);
                                  } catch (err) {
                                    console.error('Failed to copy:', err);
                                  }
                                };
                                
                                return (
                                  <div key={index} className="flex justify-between items-center">
                                    <span className="font-medium opacity-80 text-sm text-[#fafafa]">{detail.label}:</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono font-bold bg-[#00d4aa]/20 text-[#00d4aa] px-3 py-1 rounded text-sm">
                                        {detail.value}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={handleCopy}
                                        className={`p-1.5 rounded transition-all duration-300 flex items-center justify-center ${
                                          copied
                                            ? 'bg-[#00d4aa]/20 text-[#00d4aa] scale-110'
                                            : 'text-[#737373] hover:text-[#00d4aa] hover:bg-[#00d4aa]/10'
                                        }`}
                                        title={`Copy ${detail.label}`}
                                      >
                                        {copied ? (
                                          <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        ) : (
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                          </svg>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-[#00d4aa]/10 to-[#8b5cf6]/10 rounded-lg p-4 border border-[#00d4aa]/20">
                            <div className="flex justify-between items-center">
                              <span className="text-[#fafafa] font-semibold">Amount to Pay:</span>
                              <span className="text-[#00d4aa] font-bold text-xl">৳${subtotal.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="bg-linear-to-br from-[#1a1a1f] to-[#141418] rounded-xl p-6 border border-[#2a2a30]/50 shadow-lg">
                    <h4 className="text-lg font-semibold text-[#fafafa] mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                        <BuildingStorefrontIcon className="w-4 h-4 text-white" />
                      </div>
                      Order Summary
                    </h4>
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-[#0f0f12] rounded-lg border border-[#2a2a30]/30">
                          <div className="flex-1">
                            <p className="text-[#fafafa] font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-[#737373]">Qty: {item.quantity}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              <span className="rounded-md border border-[#00d4aa]/25 bg-[#00d4aa]/10 px-2 py-1 text-[11px] font-semibold text-[#b9fff1]">
                                {getPurchaseTypeLabel(item)}
                              </span>
                              <span className="rounded-md border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-2 py-1 text-[11px] font-semibold text-[#d8c8ff]">
                                {getAccessLabel(item)}
                              </span>
                            </div>
                          </div>
                          <p className="text-[#00d4aa] font-bold text-sm">৳${item.total.toFixed(2)}</p>
                        </div>
                      ))}
                      <hr className="border-[#2a2a30] my-4" />
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#00d4aa]/10 to-[#8b5cf6]/10 rounded-lg border border-[#00d4aa]/20">
                        <span className="text-[#fafafa] font-bold text-lg">Total</span>
                        <span className="text-[#00d4aa] font-bold text-xl">৳${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {user && (
                    <div className="bg-linear-to-br from-[#1a1a1f] to-[#141418] rounded-xl p-6 border border-[#2a2a30]/50 shadow-lg">
                      <h4 className="text-sm font-semibold text-[#fafafa] mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                          <CheckCircleIcon className="w-3 h-3 text-white" />
                        </div>
                        Customer Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-2 bg-[#0f0f12] rounded-lg">
                          <div className="w-8 h-8 bg-[#00d4aa]/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-[#00d4aa]">N</span>
                          </div>
                          <div>
                            <p className="text-xs text-[#737373]">Name</p>
                            <p className="text-[#fafafa] font-medium text-sm">{user.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-[#0f0f12] rounded-lg">
                          <div className="w-8 h-8 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-[#8b5cf6]">@</span>
                          </div>
                          <div>
                            <p className="text-xs text-[#737373]">Email</p>
                            <p className="text-[#fafafa] font-medium text-sm">{user.email}</p>
                          </div>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-3 p-2 bg-[#0f0f12] rounded-lg">
                            <div className="w-8 h-8 bg-[#f59e0b]/20 rounded-full flex items-center justify-center">
                              <DevicePhoneMobileIcon className="w-3 h-3 text-[#f59e0b]" />
                            </div>
                            <div>
                              <p className="text-xs text-[#737373]">Phone</p>
                              <p className="text-[#fafafa] font-medium text-sm">{user.phone}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }

  // Customer Details Step
  return (
    <div className="min-h-screen bg-[#0f0f12] py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/cart'}
            className="flex items-center gap-2 text-[#737373] hover:text-[#00d4aa] transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-[#fafafa] mt-4 mb-2">Checkout</h1>
          <p className="text-[#737373]">Complete your order details</p>
        </div>

        {/* Order Summary */}
        <div className="glass-card rounded-2xl p-6 border border-[#2a2a30] mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <BuildingStorefrontIcon className="w-full h-full" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
              <BanknotesIcon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#fafafa]">Order Summary</h3>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="text-[#fafafa] font-medium">{item.name}</p>
                  <p className="text-sm text-[#737373]">Qty: {item.quantity}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-md border border-[#00d4aa]/25 bg-[#00d4aa]/10 px-2 py-1 text-[11px] font-semibold text-[#b9fff1]">
                      {getPurchaseTypeLabel(item)}
                    </span>
                    <span className="rounded-md border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-2 py-1 text-[11px] font-semibold text-[#d8c8ff]">
                      {getAccessLabel(item)}
                    </span>
                  </div>
                </div>
                <p className="text-[#00d4aa] font-bold">৳${item.total.toFixed(2)}</p>
              </div>
            ))}
            <hr className="border-[#2a2a30] my-3" />
            <div className="flex justify-between text-lg">
              <span className="text-[#fafafa] font-bold">Total</span>
              <span className="text-[#00d4aa] font-bold">৳${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="glass-card rounded-2xl p-8 border border-[#2a2a30] space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <div className="w-full h-full bg-linear-to-br from-[#00d4aa] to-[#8b5cf6] rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full flex items-center justify-center">
                <CreditCardIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#fafafa]">Contact Information</h2>
            </div>

          <div>
            <label htmlFor="customer_name" className="block text-sm font-medium text-[#737373] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
              required
              className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-3 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="customer_email" className="block text-sm font-medium text-[#737373] mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="customer_email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleInputChange}
              required
              className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-3 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] transition-colors"
              placeholder="your@email.com"
            />
            <p className="text-xs text-[#737373] mt-1">Your download link will be sent to this email</p>
          </div>

          <div>
            <label htmlFor="customer_phone" className="block text-sm font-medium text-[#737373] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="customer_phone"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleInputChange}
              className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-3 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] transition-colors"
              placeholder="01918329829"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-[#737373] mb-2">
              Order Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-3 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] transition-colors resize-none"
              placeholder="Any special requests or notes..."
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#fafafa] flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-4 h-4 text-white" />
              </div>
              Choose Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* bKash */}
              <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                formData.payment_method === 'bkash'
                  ? 'border-[#e2136e] bg-linear-to-br from-[#e2136e]/15 to-[#f15a29]/15 shadow-lg shadow-[#e2136e]/20'
                  : 'border-[#2a2a30] bg-linear-to-br from-[#1a1a1f] to-[#141418] hover:border-[#e2136e]/60 hover:shadow-lg hover:shadow-[#e2136e]/10'
              }`}>
                <input
                  type="radio"
                  id="bkash"
                  name="payment_method"
                  value="bkash"
                  checked={formData.payment_method === 'bkash'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label htmlFor="bkash" className="flex items-center gap-4 p-5 cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r from-[#e2136e] to-[#f15a29] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <DevicePhoneMobileIcon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#fafafa] font-bold text-base">bKash</p>
                    <p className="text-sm text-[#737373]">Mobile banking</p>
                  </div>
                  {formData.payment_method === 'bkash' && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#e2136e] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </label>
              </div>

              {/* Rocket */}
              <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                formData.payment_method === 'rocket'
                  ? 'border-[#8b5cf6] bg-linear-to-br from-[#8b5cf6]/15 to-[#a855f7]/15 shadow-lg shadow-[#8b5cf6]/20'
                  : 'border-[#2a2a30] bg-linear-to-br from-[#1a1a1f] to-[#141418] hover:border-[#8b5cf6]/60 hover:shadow-lg hover:shadow-[#8b5cf6]/10'
              }`}>
                <input
                  type="radio"
                  id="rocket"
                  name="payment_method"
                  value="rocket"
                  checked={formData.payment_method === 'rocket'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label htmlFor="rocket" className="flex items-center gap-4 p-5 cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <DevicePhoneMobileIcon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#fafafa] font-bold text-base">Rocket</p>
                    <p className="text-sm text-[#737373]">Dutch-Bangla Bank</p>
                  </div>
                  {formData.payment_method === 'rocket' && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#8b5cf6] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </label>
              </div>

              {/* Nagad */}
              <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                formData.payment_method === 'nagad'
                  ? 'border-[#f59e0b] bg-linear-to-br from-[#f59e0b]/15 to-[#fbbf24]/15 shadow-lg shadow-[#f59e0b]/20'
                  : 'border-[#2a2a30] bg-linear-to-br from-[#1a1a1f] to-[#141418] hover:border-[#f59e0b]/60 hover:shadow-lg hover:shadow-[#f59e0b]/10'
              }`}>
                <input
                  type="radio"
                  id="nagad"
                  name="payment_method"
                  value="nagad"
                  checked={formData.payment_method === 'nagad'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label htmlFor="nagad" className="flex items-center gap-4 p-5 cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <DevicePhoneMobileIcon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#fafafa] font-bold text-base">Nagad</p>
                    <p className="text-sm text-[#737373]">Digital wallet</p>
                  </div>
                  {formData.payment_method === 'nagad' && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#f59e0b] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </label>
              </div>

              {/* Bank Transfer */}
              <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                formData.payment_method === 'bank'
                  ? 'border-[#10b981] bg-linear-to-br from-[#10b981]/15 to-[#34d399]/15 shadow-lg shadow-[#10b981]/20'
                  : 'border-[#2a2a30] bg-linear-to-br from-[#1a1a1f] to-[#141418] hover:border-[#10b981]/60 hover:shadow-lg hover:shadow-[#10b981]/10'
              }`}>
                <input
                  type="radio"
                  id="bank"
                  name="payment_method"
                  value="bank"
                  checked={formData.payment_method === 'bank'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <label htmlFor="bank" className="flex items-center gap-4 p-5 cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <BuildingLibraryIcon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#fafafa] font-bold text-base">Bank Transfer</p>
                    <p className="text-sm text-[#737373]">Direct bank transfer</p>
                  </div>
                  {formData.payment_method === 'bank' && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#00d4aa] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full group relative overflow-hidden px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(0,212,170,0.5)]"
          >
            {submitting ? 'Processing...' : `Place Order - ৳${subtotal.toFixed(2)}`}
          </button>

            <p className="text-center text-xs text-[#737373]">
              By placing this order, you agree to our terms and conditions.
            </p>
          </div>
        </form>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 ${
          notification.type === 'success'
            ? 'bg-green-500/90 border-green-400 text-white'
            : 'bg-red-500/90 border-red-400 text-white'
        }`}>
          <div className="flex-shrink-0">
            {notification.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
