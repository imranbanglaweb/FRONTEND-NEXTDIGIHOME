'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, ArrowRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<{site_logo?: string; site_title?: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetchSettings();

    // Check for OAuth callback parameters
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (success && token) {
      try {
        const userData = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;

        // Store authentication data
        localStorage.setItem('auth_token', token);
        if (userData?.email) {
          localStorage.setItem('customer_email', userData.email);
        }

        // Show success message and redirect
        setError('');
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } catch (err) {
        setError('Failed to process authentication data');
      }
    } else if (error) {
      let errorMessage = 'Authentication failed';
      switch (error) {
        case 'google_auth_failed':
          errorMessage = 'Google authentication failed. Please try again.';
          break;
        case 'facebook_auth_failed':
          errorMessage = 'Facebook authentication failed. Please try again.';
          break;
        default:
          errorMessage = 'Authentication failed. Please try again.';
      }
      setError(errorMessage);

      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      url.searchParams.delete('success');
      url.searchParams.delete('token');
      url.searchParams.delete('user');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://backend.nextdigihome.com/api/auth/google');
      const data = await response.json();

      if (data.success) {
        window.location.href = data.redirect_url;
      } else {
        setError(data.message || 'Failed to initiate Google login');
      }
    } catch (err) {
      setError('Failed to connect to Google authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://backend.nextdigihome.com/api/auth/facebook');
      const data = await response.json();

      if (data.success) {
        window.location.href = data.redirect_url;
      } else {
        setError(data.message || 'Failed to initiate Facebook login');
      }
    } catch (err) {
      setError('Failed to connect to Facebook authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Call API login
      const response = await fetch('https://backend.nextdigihome.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Store token in localStorage
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('customer_email', formData.email);

          // Redirect to dashboard
          window.location.href = '/dashboard';
        } else {
          setError(data.message || 'Login failed');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Failed to connect to authentication service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('https://backend.nextdigihome.com/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#f59e0b] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden">
              {settings?.site_logo ? (
                <img
                  src={`https://backend.nextdigihome.com/api/logo/${settings.site_logo}`}
                  alt="Site Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <ShieldCheckIcon className={`w-8 h-8 text-white ${settings?.site_logo ? 'hidden' : ''}`} />
            </div>
            <h1 className="text-4xl font-bold text-[#fafafa] mb-2">Welcome Back</h1>
            <p className="text-[#737373]">Sign in to access your digital products</p>
          </div>

          {/* Sign In Form */}
          <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#fafafa] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-4 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/50 transition-all duration-200 placeholder-[#737373]"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#fafafa] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-4 pr-12 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/50 transition-all duration-200 placeholder-[#737373]"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#737373] hover:text-[#fafafa] transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#00d4aa] bg-[#1a1a1f] border-[#2a2a30] rounded focus:ring-[#00d4aa] focus:ring-1"
                  />
                  <span className="ml-2 text-sm text-[#737373]">Remember me</span>
                </label>
                <a
                  href="https://backend.nextdigihome.com/password/reset"
                  className="text-sm text-[#00d4aa] hover:text-[#8b5cf6] transition-colors font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-fadeIn">
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full relative overflow-hidden px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(0,212,170,0.5)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0f0f12] border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2a2a30]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#0f0f12] text-[#737373]">or</span>
                </div>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-xl text-[#fafafa] hover:border-[#4285F4] hover:bg-[#4285F4]/10 transition-all duration-300"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {loading ? 'Connecting...' : 'Continue with Google'}
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-xl text-[#fafafa] hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all duration-300"
                onClick={handleFacebookLogin}
                disabled={loading}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                {loading ? 'Connecting...' : 'Continue with Facebook'}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-[#737373] text-sm">
                New to our platform?{' '}
                <a href="/signup" className="text-[#00d4aa] hover:text-[#8b5cf6] transition-colors font-semibold">
                  Create an account
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#737373]">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-[#00d4aa] hover:text-[#8b5cf6] transition-colors">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="/privacy" className="text-[#00d4aa] hover:text-[#8b5cf6] transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}