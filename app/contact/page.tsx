'use client';

import { useState, useEffect } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { BACKEND_BASE_URL, apiFetch } from '../utils/api';

interface ContactInfo {
  id: number;
  type: string;
  label: string;
  value: string;
  icon?: string;
  description?: string;
}

interface ContactContent {
  hero: {
    id: number;
    title: string;
    description: string;
  };
  contact_info: ContactInfo[];
  faq: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [content, setContent] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const response = await apiFetch('/content/contact');
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (data.success && data.data) {
              setContent(data.data);
            }
          } else {
            console.warn('Contact content API returned non-JSON response');
          }
        } else {
          console.warn('Contact content API request failed');
        }
      } catch (error) {
        console.error('Failed to fetch contact content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactContent();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fallback contact information
  const defaultContactInfo = [
    {
      id: 1,
      type: 'email',
      label: 'Email Us',
      value: 'info@nextdigihome.com',
      description: 'We respond within 24 hours'
    },
    {
      id: 2,
      type: 'phone',
      label: 'Call Us',
      value: '01918329829',
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      id: 3,
      type: 'address',
      label: 'Visit Us',
      value: '123 Digital Street, Tech City, TC 12345',
      description: 'United States'
    },
    {
      id: 4,
      type: 'hours',
      label: 'Business Hours',
      value: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
      description: 'Saturday: 10:00 AM - 4:00 PM EST'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f12] py-12">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#737373]">Loading content...</p>
        </div>
      </div>
    );
  }

  const contactInfo = content?.contact_info?.length ? content.contact_info : defaultContactInfo;

  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/10 via-transparent to-[#8b5cf6]/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Contact Us
            </h1>
            <p className="text-xl text-[#737373] max-w-3xl mx-auto mb-8">
              Get in touch with our expert team. We&apos;re here to help you succeed with premium digital products and solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,170,0.05)_0%,rgba(8,8,8,0)_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold mb-8 gradient-text">Get In Touch</h2>

              <div className="space-y-8">
                {contactInfo.map((info) => {
                  const getIcon = () => {
                    switch (info.type) {
                      case 'email':
                        return <EnvelopeIcon className="w-6 h-6 text-[#0f0f12]" />;
                      case 'phone':
                        return <PhoneIcon className="w-6 h-6 text-[#0f0f12]" />;
                      case 'address':
                        return <MapPinIcon className="w-6 h-6 text-[#0f0f12]" />;
                      case 'hours':
                        return <ClockIcon className="w-6 h-6 text-[#0f0f12]" />;
                      default:
                        return <EnvelopeIcon className="w-6 h-6 text-[#0f0f12]" />;
                    }
                  };

                  const gradients = [
                    'from-[#00d4aa] to-[#8b5cf6]',
                    'from-[#8b5cf6] to-[#00d4aa]',
                    'from-[#00d4aa] to-[#ff6b6b]',
                    'from-[#ff6b6b] to-[#8b5cf6]'
                  ];

                  return (
                    <div key={info.id} className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${gradients[info.id % gradients.length]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        {getIcon()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#fafafa] mb-2">{info.label}</h3>
                        <p className="text-[#737373] mb-1">{info.value}</p>
                        {info.description && <p className="text-sm text-[#737373]">{info.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Placeholder */}
              <div className="mt-12 glass-card rounded-2xl p-8 border border-[#2a2a30]">
                <div className="aspect-video bg-gradient-to-br from-[#1a1a1f] to-[#2a2a30] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="w-16 h-16 text-[#00d4aa] mx-auto mb-4" />
                    <p className="text-[#737373]">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="glass-card rounded-3xl p-8 border border-[#2a2a30]">
                <h3 className="text-2xl font-bold text-[#fafafa] mb-6">Send us a Message</h3>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircleIcon className="w-16 h-16 text-[#00d4aa] mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-[#fafafa] mb-2">Thank You!</h4>
                    <p className="text-[#737373]">Your message has been sent successfully. We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#fafafa] mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-xl text-[#fafafa] placeholder-[#737373] focus:outline-none focus:border-[#00d4aa] transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#fafafa] mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-xl text-[#fafafa] placeholder-[#737373] focus:outline-none focus:border-[#00d4aa] transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#fafafa] mb-2">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-xl text-[#fafafa] focus:outline-none focus:border-[#00d4aa] transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#fafafa] mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-[#1a1a1f] border border-[#2a2a30] rounded-xl text-[#fafafa] placeholder-[#737373] focus:outline-none focus:border-[#00d4aa] transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1f] via-[#0f0f12] to-[#1a1a1f]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Quick Answers
            </h2>
            <p className="text-xl text-[#737373]">
              Common questions about contacting us
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
              <h3 className="text-xl font-bold text-[#fafafa] mb-3">How quickly do you respond to inquiries?</h3>
              <p className="text-[#737373] leading-relaxed">
                We typically respond to all inquiries within 24 hours during business days. For urgent technical support, we aim to respond within 2-4 hours.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
              <h3 className="text-xl font-bold text-[#fafafa] mb-3">Do you offer phone support?</h3>
              <p className="text-[#737373] leading-relaxed">
                Yes, we offer phone support during our business hours (9 AM - 6 PM EST, Monday-Friday). For complex technical issues, we recommend scheduling a call with our specialists.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-[#2a2a30]">
              <h3 className="text-xl font-bold text-[#fafafa] mb-3">Can I schedule a demo or consultation?</h3>
              <p className="text-[#737373] leading-relaxed">
                Absolutely! We offer free consultations and product demos. Contact our sales team to schedule a personalized session with our experts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}