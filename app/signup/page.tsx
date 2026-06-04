'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, ArrowRightIcon, UserPlusIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { getLogoUrl, apiFetch } from '../utils/api';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [settings, setSettings] = useState<{admin_logo?: string; admin_title?: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, []);

  useEffect(() => {
    // Calculate password strength
    const strength = calculatePasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [formData.password]);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-yellow-500';
    if (passwordStrength < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setLoading(false);
      return;
    }

    try {
      // Call API register
      const response = await apiFetch('register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Registration successful, redirect to signin
          router.push('/signin?message=Registration successful! Please sign in.');
        } else {
          setError(data.message || 'Registration failed');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to registration service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await apiFetch('settings');
      if (response.ok) {
        const data = await response.json();
        // Safely extract settings data
        const settingsData = data?.data?.data || data?.data || data || {};
        setSettings(settingsData);
      } else {
        console.warn(`Settings API returned ${response.status}, using defaults`);
      }
    } catch (error) {
      console.warn('Failed to fetch settings, using defaults:', error instanceof Error ? error.message : error);
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
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#f59e0b] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#8b5cf6] to-[#00d4aa] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden">
              {settings?.admin_logo ? (
                <img
                   src={getLogoUrl(settings.admin_logo)!}
                  alt="Site Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <UserPlusIcon className={`w-8 h-8 text-white ${settings?.admin_logo ? 'hidden' : ''}`} />
            </div>
            <h1 className="text-4xl font-bold text-[#fafafa] mb-2">Create Account</h1>
            <p className="text-[#737373]">Join our community and start exploring</p>
          </div>

          {/* Sign Up Form */}
          <div className="glass-card rounded-2xl p-8 border border-[#2a2a30] shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#fafafa] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-4 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/50 transition-all duration-200 placeholder-[#737373]"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#fafafa] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-4 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/50 transition-all duration-200 placeholder-[#737373]"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#fafafa] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-4 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/50 transition-all duration-200 placeholder-[#737373]"
                  placeholder="+880 1XX XXX XXXX"
                />
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
                    placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#737373]">Password Strength</span>
                      <span className={`text-xs font-medium ${passwordStrength >= 75 ? 'text-green-400' : passwordStrength >= 50 ? 'text-blue-400' : passwordStrength >= 25 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-[#1a1a1f] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-semibold text-[#fafafa] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1a1a1f] border border-[#2a2a30] rounded-xl px-4 py-4 pr-12 text-[#fafafa] focus:outline-none focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/50 transition-all duration-200 placeholder-[#737373]"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#737373] hover:text-[#fafafa] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {formData.password_confirmation && (
                  <div className="mt-2 flex items-center gap-2">
                    {formData.password === formData.password_confirmation ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-red-400">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-[#00d4aa] bg-[#1a1a1f] border-[#2a2a30] rounded focus:ring-[#00d4aa] focus:ring-1"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-[#737373] leading-relaxed">
                  I agree to the{' '}
                  <a href="/terms" className="text-[#00d4aa] hover:text-[#8b5cf6] transition-colors font-medium">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-[#00d4aa] hover:text-[#8b5cf6] transition-colors font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-fadeIn">
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading || !formData.agreeToTerms}
                className="group w-full relative overflow-hidden px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#8b5cf6] to-[#00d4aa] text-[#0f0f12] hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0f0f12] border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-[#737373] text-sm">
                Already have an account?{' '}
                <a href="/signin" className="text-[#00d4aa] hover:text-[#8b5cf6] transition-colors font-semibold">
                  Sign in here
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#737373]">
              Your data is secure and will never be shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}