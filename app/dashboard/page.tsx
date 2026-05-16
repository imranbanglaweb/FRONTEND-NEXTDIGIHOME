'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  ChartBarIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  CogIcon,
  BellIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  FunnelIcon,
  BarsArrowUpIcon
} from "@heroicons/react/24/outline";

interface Purchase {
  id: number;
  transaction_id: string;
  total: number;
  status: string;
  customer_name: string;
  customer_email: string;
  payment_method: string;
  quantity: number;
  created_at: string;
  download_token: string;
  download_expires_at: string | null;
  download_count: number;
  last_download_at: string | null;
  delivered_at: string | null;
  product?: {
    id: number;
    digital: boolean;
    file_url: string | null;
    name: string;
    price: number;
  };
}

interface DashboardStats {
  totalPurchases: number;
  totalSpent: number;
  pendingDownloads: number;
  completedDownloads: number;
}

export default function DashboardPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [searched, setSearched] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'purchases' | 'downloads' | 'account'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const searchPurchases = async (email: string) => {
    if (!email) return;
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/checkout/purchases?email=${encodeURIComponent(email)}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setPurchases(Array.isArray(data) ? data : (data.purchases || []));
          setFilteredPurchases(Array.isArray(data) ? data : (data.purchases || []));
          calculateStats(Array.isArray(data) ? data : (data.purchases || []));
        } else {
          console.warn('Purchases API returned non-JSON response');
          setPurchases([]);
          setFilteredPurchases([]);
          setStats(null);
        }
      } else {
        setPurchases([]);
        setFilteredPurchases([]);
        setStats(null);
      }
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
      setPurchases([]);
      setFilteredPurchases([]);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const searchPurchasesForAuthenticatedUser = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch('http://localhost:8000/api/checkout/purchases', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          const purchasesData = Array.isArray(data) ? data : [];
          setPurchases(purchasesData);
          setFilteredPurchases(purchasesData);
          calculateStats(purchasesData);
        } else {
          console.warn('Purchases API returned non-JSON response');
          setPurchases([]);
          setFilteredPurchases([]);
          setStats(null);
        }
      } else {
        // Token might be invalid
        localStorage.removeItem('auth_token');
        setAuthenticated(false);
        setPurchases([]);
        setFilteredPurchases([]);
        setStats(null);
      }
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
      localStorage.removeItem('auth_token');
      setAuthenticated(false);
      setPurchases([]);
      setFilteredPurchases([]);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (purchases: Purchase[]) => {
    const stats: DashboardStats = {
      totalPurchases: purchases.length,
      totalSpent: purchases.reduce((sum, p) => sum + (typeof p.total === 'string' ? parseFloat(p.total) : p.total), 0),
      pendingDownloads: purchases.filter(p => p.product?.digital && p.status === 'completed' && !p.delivered_at).length,
      completedDownloads: purchases.filter(p => p.delivered_at).length,
    };
    setStats(stats);
  };

  const filterAndSortPurchases = () => {
    let filtered = [...purchases];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(purchase =>
        purchase.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(purchase => purchase.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        case 'amount':
          aValue = parseFloat(a.total.toString());
          bValue = parseFloat(b.total.toString());
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPurchases(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPurchases(email);
  };

  // Filter and sort effect
  useEffect(() => {
    if (purchases.length > 0) {
      filterAndSortPurchases();
    }
  }, [purchases, searchTerm, statusFilter, sortBy, sortOrder]);

  // Check authentication on mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      // Try to access a protected API endpoint to check authentication
      const response = await fetch('http://localhost:8000/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAuthenticated(true);
        // Get purchases for authenticated user
        searchPurchasesForAuthenticatedUser();
      } else {
        // Token invalid, clear it
        localStorage.removeItem('auth_token');
        setAuthenticated(false);
        setLoading(false);
      }
    } catch (error) {
      // If API call fails, assume user is not authenticated
      localStorage.removeItem('auth_token');
      setAuthenticated(false);
      setLoading(false);
    }
  };

  const handleDownload = async (token: string, fileName?: string) => {
    try {
      const response = await fetch(`/api/download?token=${token}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          alert(errorData.message || 'Download failed');
          return;
        }

        // Handle file download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'digital-product.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // Refresh data after successful download
        if (searched) {
          searchPurchases(email);
        }
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          alert(errorData.message || 'Download failed');
        } else {
          alert('Download failed. Token may be invalid or expired.');
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download product');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]',
      completed: 'bg-[#ecfdf5] text-[#065f46] border-[#6ee7b7]',
      delivered: 'bg-[#d1fae5] text-[#047857] border-[#6ee7b7]',
      processing: 'bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]',
      failed: 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]',
    };
    const icons = {
      pending: <ClockIcon className="w-4 h-4" />,
      completed: <CheckCircleIcon className="w-4 h-4" />,
      delivered: <CheckCircleIcon className="w-4 h-4" />,
      processing: <ClockIcon className="w-4 h-4" />,
      failed: <XCircleIcon className="w-4 h-4" />,
    };
    const labels = {
      pending: 'Pending Verification',
      completed: 'Payment Approved',
      delivered: 'Downloaded',
      processing: 'Processing',
      failed: 'Failed',
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status as keyof typeof styles] || 'bg-[#1a1a1f] text-[#737373]'}`}>
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const getDownloadStatus = (purchase: Purchase) => {
    if (!purchase.product?.digital) return null;

    if (purchase.download_expires_at) {
      const expiryDate = new Date(purchase.download_expires_at);
      const now = new Date();
      const daysLeft = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (daysLeft < 0) {
        return { status: 'expired', text: 'Expired', color: 'text-red-500' };
      } else if (daysLeft <= 7) {
        return { status: 'expiring', text: `${daysLeft} days left`, color: 'text-yellow-500' };
      }
    }

    if (purchase.status === 'completed' && !purchase.delivered_at) {
      return { status: 'available', text: 'Available', color: 'text-green-500' };
    }

    if (purchase.delivered_at) {
      return { status: 'downloaded', text: `Downloaded ${purchase.download_count || 0} times`, color: 'text-blue-500' };
    }

    return null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading while checking authentication
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#737373]">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (authenticated === false) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#fafafa] mb-4">Authentication Required</h1>
            <p className="text-[#737373] mb-6">
              Please sign in to access your dashboard and manage your purchases.
            </p>
            <a
              href="/signin"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:scale-[1.02] transition-transform"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-[#fafafa]">Welcome back!</h1>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#00d4aa]/20 to-[#8b5cf6]/20 rounded-full border border-[#00d4aa]/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-[#00d4aa] font-medium">Active</span>
                </div>
              </div>
              <p className="text-[#737373]">Manage your digital products, downloads, and account settings</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  // Logout functionality - clear token and redirect to signin
                  localStorage.removeItem('auth_token');
                  localStorage.removeItem('customer_email');
                  window.location.href = '/signin';
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] hover:border-red-500/50 hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-full flex items-center justify-center shadow-lg">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        {searched && (
          <div className="mb-8">
            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30] bg-gradient-to-r from-[#00d4aa]/5 to-[#8b5cf6]/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#fafafa] mb-2">Your Digital Library</h3>
                  <p className="text-[#737373] text-sm leading-relaxed mb-3">
                    Access your purchased digital products, manage downloads, and track your order history.
                    All your digital assets are securely stored and available for instant download.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-[#00d4aa]">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Secure Downloads</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b5cf6]">
                      <ClockIcon className="w-4 h-4" />
                      <span>24/7 Access</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#f59e0b]">
                      <EyeIcon className="w-4 h-4" />
                      <span>Private & Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        {searched && (
          <div className="mb-8">
            <div className="flex space-x-1 bg-[#1a1a1f] p-1 rounded-xl border border-[#2a2a30]">
              {[
                { id: 'overview', label: 'Overview', icon: ChartBarIcon },
                { id: 'purchases', label: 'Purchase History', icon: ShoppingBagIcon },
                { id: 'downloads', label: 'Downloads', icon: ArrowDownTrayIcon },
                { id: 'account', label: 'Account', icon: CogIcon },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-white shadow-lg'
                        : 'text-[#737373] hover:text-[#fafafa] hover:bg-[#2a2a30]'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'overview' && searched && stats && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-xl flex items-center justify-center">
                    <ShoppingBagIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#fafafa]">{stats.totalPurchases}</p>
                    <p className="text-sm text-[#737373]">Total Purchases</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-xl flex items-center justify-center">
                    <CreditCardIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#fafafa]">${stats.totalSpent.toFixed(2)}</p>
                    <p className="text-sm text-[#737373]">Total Spent</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] rounded-xl flex items-center justify-center">
                    <ArrowDownTrayIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#fafafa]">{stats.pendingDownloads}</p>
                    <p className="text-sm text-[#737373]">Pending Downloads</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#fafafa]">{stats.completedDownloads}</p>
                    <p className="text-sm text-[#737373]">Downloaded</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Purchases */}
            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#fafafa]">Recent Purchases</h3>
                <button
                  onClick={() => setActiveTab('purchases')}
                  className="text-[#00d4aa] hover:text-[#8b5cf6] transition-colors font-medium"
                >
                  View All
                </button>
              </div>

              {filteredPurchases.slice(0, 5).length > 0 ? (
                <div className="space-y-4">
                  {filteredPurchases.slice(0, 5).map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-4 bg-[#1a1a1f] rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#2a2a30] flex items-center justify-center">
                          {purchase.product?.digital ? (
                            <ArrowDownTrayIcon className="w-5 h-5 text-[#00d4aa]" />
                          ) : (
                            <ShoppingBagIcon className="w-5 h-5 text-[#737373]" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[#fafafa]">{purchase.product?.name || 'Product'}</p>
                          <p className="text-sm text-[#737373]">{formatDate(purchase.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(purchase.status)}
                        <span className="font-bold text-[#fafafa]">${(typeof purchase.total === 'string' ? parseFloat(purchase.total) : purchase.total).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBagIcon className="w-12 h-12 text-[#2a2a30] mx-auto mb-4" />
                  <p className="text-[#737373]">No purchases found</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
              <h3 className="text-xl font-bold text-[#fafafa] mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/products"
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#00d4aa]/10 to-[#8b5cf6]/10 rounded-xl border border-[#00d4aa]/30 hover:border-[#00d4aa] hover:scale-105 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingBagIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#fafafa]">Browse Products</p>
                    <p className="text-sm text-[#737373]">Find new items</p>
                  </div>
                </Link>

                <button
                  onClick={() => setActiveTab('downloads')}
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#8b5cf6]/10 to-[#a855f7]/10 rounded-xl border border-[#8b5cf6]/30 hover:border-[#8b5cf6] hover:scale-105 transition-all duration-200 text-left"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowDownTrayIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#fafafa]">Manage Downloads</p>
                    <p className="text-sm text-[#737373]">Access your files</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('account')}
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#f59e0b]/10 to-[#fbbf24]/10 rounded-xl border border-[#f59e0b]/30 hover:border-[#f59e0b] hover:scale-105 transition-all duration-200 text-left"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CogIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#fafafa]">Account Settings</p>
                    <p className="text-sm text-[#737373]">Update preferences</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('purchases')}
                  className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[#10b981]/10 to-[#059669]/10 rounded-xl border border-[#10b981]/30 hover:border-[#10b981] hover:scale-105 transition-all duration-200 text-left"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#fafafa]">Order History</p>
                    <p className="text-sm text-[#737373]">View all purchases</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Purchases Tab */}
        {activeTab === 'purchases' && searched && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#fafafa]">Purchase History</h3>

                {/* Search */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#737373]" />
                    <input
                      type="text"
                      placeholder="Search purchases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:outline-none focus:border-[#00d4aa] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <FunnelIcon className="w-4 h-4 text-[#737373]" />
                  <span className="text-sm text-[#737373]">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#1a1a1f] border border-[#2a2a30] rounded-lg px-3 py-1 text-sm text-[#fafafa] focus:outline-none focus:border-[#00d4aa]"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="delivered">Delivered</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <BarsArrowUpIcon className="w-4 h-4 text-[#737373]" />
                  <span className="text-sm text-[#737373]">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#1a1a1f] border border-[#2a2a30] rounded-lg px-3 py-1 text-sm text-[#fafafa] focus:outline-none focus:border-[#00d4aa]"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="status">Status</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-1 text-[#737373] hover:text-[#fafafa] transition-colors"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>

            {/* Purchases List */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredPurchases.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 border border-[#2a2a30] text-center">
                <div className="w-20 h-20 bg-[#1a1a1f] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBagIcon className="w-10 h-10 text-[#2a2a30]" />
                </div>
                <h3 className="text-xl font-bold text-[#fafafa] mb-2">No purchases found</h3>
                <p className="text-[#737373] mb-6">
                  {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'Start by exploring our products!'}
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:scale-[1.02] transition-transform"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPurchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="glass-card rounded-2xl p-6 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-xl bg-[#1a1a1f] overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {purchase.product?.digital ? (
                              <ArrowDownTrayIcon className="w-8 h-8 text-[#00d4aa]" />
                            ) : (
                              <ShoppingBagIcon className="w-8 h-8 text-[#737373]" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#fafafa]">
                              {purchase.product?.name || 'Digital Product'}
                            </h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-[#737373]">
                              <span>Qty: {purchase.quantity}</span>
                              <span>•</span>
                              <span>{formatDate(purchase.created_at)}</span>
                              <span>•</span>
                              <span className="font-mono">{purchase.transaction_id}</span>
                            </div>
                            {purchase.customer_name && (
                              <p className="text-sm text-[#737373] mt-1">
                                Purchased by: {purchase.customer_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="flex items-center gap-3">
                          {getStatusBadge(purchase.status)}
                          <span className="text-[#fafafa] font-bold">${parseFloat(purchase.total.toString()).toFixed(2)}</span>
                        </div>

                        {purchase.product?.digital && purchase.status === 'completed' && (
                          <button
                            onClick={() => handleDownload(purchase.download_token, `${purchase.product?.name || 'product'}.zip`)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] text-sm font-medium rounded-lg hover:scale-105 transition-transform"
                          >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Download
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Download Status */}
                    {purchase.product?.digital && (() => {
                      const downloadStatus = getDownloadStatus(purchase);
                      return downloadStatus ? (
                        <div className="mt-4 pt-4 border-t border-[#2a2a30]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ShieldCheckIcon className="w-4 h-4 text-[#00d4aa]" />
                              <span className="text-sm font-medium text-[#fafafa]">Download Status:</span>
                              <span className={`text-sm font-medium ${downloadStatus.color}`}>
                                {downloadStatus.text}
                              </span>
                            </div>
                            {purchase.download_expires_at && (
                              <div className="text-xs text-[#737373]">
                                Expires: {new Date(purchase.download_expires_at).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {/* Status Messages */}
                    {purchase.status === 'pending' && (
                      <div className="mt-4 pt-4 border-t border-[#2a2a30]">
                        <div className="flex items-center gap-2 text-sm">
                          <ClockIcon className="w-4 h-4 text-[#f59e0b]" />
                          <span className="text-[#f59e0b]">
                            Your payment is being verified. You&apos;ll receive an email once it&apos;s approved.
                          </span>
                        </div>
                      </div>
                    )}

                    {purchase.status === 'completed' && !purchase.delivered_at && (
                      <div className="mt-4 pt-4 border-t border-[#2a2a30]">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircleIcon className="w-4 h-4 text-[#00d4aa]" />
                          <span className="text-[#00d4aa]">
                            Payment approved! Your download link is ready.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Downloads Tab */}
        {activeTab === 'downloads' && searched && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
              <h3 className="text-xl font-bold text-[#fafafa] mb-6">Download Management</h3>

              {filteredPurchases.filter(p => p.product?.digital).length === 0 ? (
                <div className="text-center py-8">
                  <ArrowDownTrayIcon className="w-12 h-12 text-[#2a2a30] mx-auto mb-4" />
                  <p className="text-[#737373]">No downloadable products found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPurchases.filter(p => p.product?.digital).map((purchase) => {
                    const downloadStatus = getDownloadStatus(purchase);
                    return (
                      <div key={purchase.id} className="flex items-center justify-between p-4 bg-[#1a1a1f] rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-[#2a2a30] flex items-center justify-center">
                            <ArrowDownTrayIcon className="w-6 h-6 text-[#00d4aa]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#fafafa]">{purchase.product?.name}</p>
                            <p className="text-sm text-[#737373]">
                              {downloadStatus ? downloadStatus.text : 'Not available'}
                            </p>
                            {purchase.last_download_at && (
                              <p className="text-xs text-[#737373]">
                                Last downloaded: {formatDate(purchase.last_download_at)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {downloadStatus?.status === 'expired' && (
                            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                          )}
                          {purchase.status === 'completed' && downloadStatus?.status !== 'expired' && (
                            <button
                              onClick={() => handleDownload(purchase.download_token, `${purchase.product?.name || 'product'}.zip`)}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] text-sm font-medium rounded-lg hover:scale-105 transition-transform"
                            >
                              <ArrowDownTrayIcon className="w-4 h-4" />
                              Download
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && searched && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
              <h3 className="text-xl font-bold text-[#fafafa] mb-6">Account Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#737373] mb-2">Email Address</label>
                  <div className="bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-3 text-[#fafafa]">
                    {email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#737373] mb-2">Account Status</label>
                  <div className="bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-3 text-[#00d4aa] font-medium">
                    Active Customer
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#2a2a30]">
                <h4 className="text-lg font-semibold text-[#fafafa] mb-4">Notification Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#fafafa]">Order confirmations</span>
                    <div className="w-12 h-6 bg-[#00d4aa] rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#fafafa]">Download notifications</span>
                    <div className="w-12 h-6 bg-[#00d4aa] rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#fafafa]">Marketing emails</span>
                    <div className="w-12 h-6 bg-[#8b5cf6] rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
              <h3 className="text-xl font-bold text-[#fafafa] mb-6">Support & Help</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="mailto:info@nextdigihome.com"
                  className="flex items-center gap-4 p-4 bg-[#1a1a1f] rounded-xl hover:bg-[#2a2a30] transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                    <BellIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#fafafa]">Email Support</p>
                    <p className="text-sm text-[#737373]">Get help from our team</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-4 p-4 bg-[#1a1a1f] rounded-xl hover:bg-[#2a2a30] transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                    <EyeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#fafafa]">Help Center</p>
                    <p className="text-sm text-[#737373]">Browse FAQs</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Search Section - Only show when not searched */}
        {!searched && (
          <div className="max-w-md mx-auto">
            <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] mb-8">
              <h2 className="text-xl font-bold text-[#fafafa] mb-4 text-center">Find Your Orders</h2>
              <p className="text-[#737373] text-sm mb-6 text-center">
                Enter your email address to view your purchases and downloads
              </p>
              <form onSubmit={handleSearch} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-3 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Find My Orders'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Purchases List */}
        {searched && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#fafafa]">
                {purchases.length > 0 ? 'Your Orders' : 'No Orders Found'}
              </h2>
              <button
                onClick={() => { setSearched(false); setEmail(''); setPurchases([]); }}
                className="text-sm text-[#00d4aa] hover:underline"
              >
                Search Different Email
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : purchases.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 border border-[#2a2a30] text-center">
                <div className="w-20 h-20 bg-[#1a1a1f] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ArrowDownTrayIcon className="w-10 h-10 text-[#2a2a30]" />
                </div>
                <h3 className="text-xl font-bold text-[#fafafa] mb-2">No orders found</h3>
                <p className="text-[#737373] mb-6">
                  {email ? 'No purchases associated with your account.' : 'Welcome! Start by exploring our products!'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:scale-[1.02] transition-transform"
                  >
                    Browse Products
                  </Link>
                  {!email && (
                    <button
                      onClick={() => setActiveTab('account')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1f] border border-[#2a2a30] text-[#fafafa] font-medium rounded-xl hover:border-[#00d4aa] transition-colors"
                    >
                      View Account
                    </button>
                  )}
                </div>
              </div>
            ) : (
              purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="glass-card rounded-2xl p-6 border border-[#2a2a30] hover:border-[#00d4aa]/30 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-[#1a1a1f] overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {purchase.product?.digital ? (
                            <ArrowDownTrayIcon className="w-8 h-8 text-[#00d4aa]" />
                          ) : (
                            <ShoppingBagIcon className="w-8 h-8 text-[#737373]" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#fafafa]">
                            {purchase.product?.name || 'Digital Product'}
                          </h3>
                          <p className="text-sm text-[#737373]">Qty: {purchase.quantity}</p>
                          <p className="text-xs text-[#737373] mt-1">
                            Purchased: {new Date(purchase.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-[#737373] font-mono mt-1">
                            {purchase.transaction_id}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="flex items-center gap-3">
                        {getStatusBadge(purchase.status)}
                        <span className="text-[#fafafa] font-bold">${(typeof purchase.total === 'string' ? parseFloat(purchase.total) : purchase.total).toFixed(2)}</span>
                      </div>

                    {purchase.product?.digital && purchase.status === 'completed' && (
                      <button
                        onClick={() => handleDownload(purchase.download_token)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] text-sm font-medium rounded-lg hover:scale-105 transition-transform"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Download
                      </button>
                    )}

                    {purchase.product?.digital && purchase.status !== 'completed' && (
                      <span className="text-sm text-[#737373] italic">
                        {purchase.status === 'pending' ? 'Awaiting verification...' : 'Processing...'}
                      </span>
                    )}
                    </div>
                  </div>

                  {purchase.status === 'pending' && (
                    <div className="mt-4 pt-4 border-t border-[#2a2a30]">
                      <p className="text-sm text-[#f59e0b] flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        Your payment is being verified. You&apos;ll receive an email once it&apos;s approved.
                      </p>
                    </div>
                  )}

                  {purchase.status === 'completed' && !purchase.delivered_at && (
                    <div className="mt-4 pt-4 border-t border-[#2a2a30]">
                      <p className="text-sm text-[#00d4aa] flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4" />
                        Payment approved! Download link available above.
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
