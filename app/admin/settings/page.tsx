'use client';

import { useState, useEffect } from 'react';
import { PhotoIcon, CogIcon, EnvelopeIcon, CheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '../../utils/api';

interface Settings {
  site_title: string;
  site_description: string;
  admin_title: string;
  admin_description: string;
  site_logo: string | null;
  admin_logo: string | null;
  favicon: string | null;
  mail_mailer: string;
  mail_host: string;
  mail_port: string;
  mail_username: string;
  mail_password: string;
  mail_encryption: string;
  mail_from_address: string;
  mail_from_name: string;
  // Email templates
  welcome_email_template: string;
  order_confirmation_template: string;
  password_reset_template: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [siteLogoFile, setSiteLogoFile] = useState<File | null>(null);
  const [adminLogoFile, setAdminLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [siteLogoPreview, setSiteLogoPreview] = useState<string | null>(null);
  const [adminLogoPreview, setAdminLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

const fetchSettings = async () => {
     try {
      const data = await apiFetch('/admin/settings');
      if (data?.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'site_logo' | 'admin_logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'site_logo') {
        setSiteLogoFile(file);
        setSiteLogoPreview(URL.createObjectURL(file));
      } else if (type === 'admin_logo') {
        setAdminLogoFile(file);
        setAdminLogoPreview(URL.createObjectURL(file));
      } else if (type === 'favicon') {
        setFaviconFile(file);
        setFaviconPreview(URL.createObjectURL(file));
      }
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      if (settings) {
        Object.entries(settings).forEach(([key, value]) => {
          if (value !== null && value !== undefined && typeof value === 'string') {
            formData.append(key, value);
          }
        });
      }

      if (siteLogoFile) formData.append('site_logo', siteLogoFile);
      if (adminLogoFile) formData.append('admin_logo', adminLogoFile);
      if (faviconFile) formData.append('favicon', faviconFile);

      const data = await apiFetch('/admin/settings', {
        method: 'POST',
        body: formData,
      });

      if (data?.success) {
        alert('Settings updated successfully!');
        fetchSettings();
        setSiteLogoFile(null);
        setAdminLogoFile(null);
        setFaviconFile(null);
        setSiteLogoPreview(null);
        setAdminLogoPreview(null);
        setFaviconPreview(null);
      } else {
        alert('Failed to update settings: ' + (data?.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => prev ? { ...prev, [name]: value } : null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="text-[#fafafa]">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#fafafa] mb-2">Settings</h1>
          <p className="text-[#737373]">Manage your site settings, logos, and email configuration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Site Settings */}
          <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
            <div className="flex items-center gap-3 mb-6">
              <CogIcon className="w-6 h-6 text-[#00d4aa]" />
              <h2 className="text-xl font-semibold">Site Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Site Title</label>
                <input
                  type="text"
                  name="site_title"
                  value={settings?.site_title || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Admin Title</label>
                <input
                  type="text"
                  name="admin_title"
                  value={settings?.admin_title || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Site Description</label>
                <textarea
                  name="site_description"
                  value={settings?.site_description || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Admin Description</label>
                <textarea
                  name="admin_description"
                  value={settings?.admin_description || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Logo Settings */}
          <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
            <div className="flex items-center gap-3 mb-6">
              <PhotoIcon className="w-6 h-6 text-[#00d4aa]" />
              <h2 className="text-xl font-semibold">Logo Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Site Logo */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#fafafa]">Site Logo</label>
                <div className="space-y-2">
                  {siteLogoPreview || settings?.admin_logo ? (
                    <img
                      src={siteLogoPreview || (settings?.admin_logo ? `/logo/${settings.admin_logo}` : '')} 
                      alt="Admin Logo"
                      className="w-full h-32 object-contain bg-[#1a1a1f] rounded-lg border border-[#2a2a30]"
                    />
                  ) : (
                    <div className="w-full h-32 bg-[#1a1a1f] rounded-lg border border-[#2a2a30] flex items-center justify-center">
                      <PhotoIcon className="w-8 h-8 text-[#737373]" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'admin_logo')} 
                    className="w-full text-sm text-[#737373] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#00d4aa] file:text-[#0f0f12] hover:file:bg-[#00d4aa]/80"
                  />
                </div>
              </div>

              {/* Admin Logo */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#fafafa]">Admin Logo</label>
                <div className="space-y-2">
                  {adminLogoPreview || settings?.admin_logo ? (
                    <img
                      src={adminLogoPreview || (settings?.admin_logo ? `/logo/${settings.admin_logo}` : '')}
                      alt="Admin Logo"
                      className="w-full h-32 object-contain bg-[#1a1a1f] rounded-lg border border-[#2a2a30]"
                    />
                  ) : (
                    <div className="w-full h-32 bg-[#1a1a1f] rounded-lg border border-[#2a2a30] flex items-center justify-center">
                      <PhotoIcon className="w-8 h-8 text-[#737373]" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'admin_logo')}
                    className="w-full text-sm text-[#737373] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#00d4aa] file:text-[#0f0f12] hover:file:bg-[#00d4aa]/80"
                  />
                </div>
              </div>

              {/* Favicon */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-[#fafafa]">Favicon</label>
                <div className="space-y-2">
                  {faviconPreview || settings?.favicon ? (
                    <img
                      src={faviconPreview || (settings?.favicon ? `/logo/${settings.favicon}` : '')}
                      alt="Favicon"
                      className="w-16 h-16 object-contain bg-[#1a1a1f] rounded-lg border border-[#2a2a30]"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-[#1a1a1f] rounded-lg border border-[#2a2a30] flex items-center justify-center">
                      <PhotoIcon className="w-6 h-6 text-[#737373]" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'favicon')}
                    className="w-full text-sm text-[#737373] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#00d4aa] file:text-[#0f0f12] hover:file:bg-[#00d4aa]/80"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
            <div className="flex items-center gap-3 mb-6">
              <EnvelopeIcon className="w-6 h-6 text-[#00d4aa]" />
              <h2 className="text-xl font-semibold">Email Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Mailer</label>
                <select
                  name="mail_mailer"
                  value={settings?.mail_mailer || 'smtp'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                >
                  <option value="smtp">SMTP</option>
                  <option value="mail">Mail</option>
                  <option value="sendmail">Sendmail</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Host</label>
                <input
                  type="text"
                  name="mail_host"
                  value={settings?.mail_host || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Port</label>
                <input
                  type="text"
                  name="mail_port"
                  value={settings?.mail_port || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Username</label>
                <input
                  type="text"
                  name="mail_username"
                  value={settings?.mail_username || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Password</label>
                <input
                  type="password"
                  name="mail_password"
                  value={settings?.mail_password || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Encryption</label>
                <select
                  name="mail_encryption"
                  value={settings?.mail_encryption || 'tls'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                >
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">From Address</label>
                <input
                  type="email"
                  name="mail_from_address"
                  value={settings?.mail_from_address || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">From Name</label>
                <input
                  type="text"
                  name="mail_from_name"
                  value={settings?.mail_from_name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Email Templates */}
          <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
            <div className="flex items-center gap-3 mb-6">
              <EnvelopeIcon className="w-6 h-6 text-[#00d4aa]" />
              <h2 className="text-xl font-semibold">Email Templates</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Welcome Email Template</label>
                <textarea
                  name="welcome_email_template"
                  value={settings?.welcome_email_template || ''}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="HTML template for welcome emails..."
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Order Confirmation Template</label>
                <textarea
                  name="order_confirmation_template"
                  value={settings?.order_confirmation_template || ''}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="HTML template for order confirmation emails..."
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#fafafa] mb-2">Password Reset Template</label>
                <textarea
                  name="password_reset_template"
                  value={settings?.password_reset_template || ''}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="HTML template for password reset emails..."
                  className="w-full px-4 py-2 bg-[#1a1a1f] border border-[#2a2a30] rounded-lg text-[#fafafa] focus:border-[#00d4aa] focus:outline-none font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="w-5 h-5" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}