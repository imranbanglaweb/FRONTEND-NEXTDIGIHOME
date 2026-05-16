'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, CheckCircleIcon, GlobeAltIcon, UsersIcon } from "@heroicons/react/24/outline";

interface Mission {
  id: number;
  title: string;
  description: string;
  content?: string;
}

interface Vision {
  id: number;
  title: string;
  description: string;
  content?: string;
}

interface Stat {
  id: number;
  key: string;
  value: string;
  label: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio?: string;
  image?: string;
}

interface AboutContent {
  mission: Mission;
  vision: Vision;
  stats: Stat[];
  team: TeamMember[];
}

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/content/about');
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (data.success && data.data) {
              setContent(data.data);
            }
          } else {
            console.warn('About content API returned non-JSON response');
          }
        } else {
          console.warn('About content API request failed');
        }
      } catch (error) {
        console.error('Failed to fetch about content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  const fallbackStats = [
    { id: 1, key: 'countries', value: '5+', label: 'Countries Served' },
    { id: 2, key: 'customers', value: '50K+', label: 'Happy Customers' },
    { id: 3, key: 'products', value: '10K+', label: 'Products Available' },
    { id: 4, key: 'satisfaction', value: '99%', label: 'Customer Satisfaction' }
  ];

  const fallbackMission = {
    id: 1,
    title: 'Our Mission',
    description: 'Empower businesses worldwide with affordable, high-quality digital products and solutions',
    content: 'We believe every business deserves access to premium digital assets. Our mission is to democratize digital products by providing curated, professionally-crafted templates, tools, and resources at prices that make a real difference.'
  };

  const fallbackVision = {
    id: 1,
    title: 'Our Vision',
    description: 'Be the leading digital marketplace trusted by businesses globally',
    content: 'We envision a world where creative professionals and entrepreneurs can access world-class digital assets instantly, enabling them to focus on growing their business instead of starting from scratch.'
  };

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

  const stats = content?.stats || fallbackStats;
  const mission = content?.mission || fallbackMission;
  const vision = content?.vision || fallbackVision;

  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,170,0.08)_0%,rgba(8,8,8,0)_50%)]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00d4aa] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/10 via-transparent to-[#8b5cf6]/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              About Next Digi Home
            </h1>
            <p className="text-xl text-[#737373] max-w-3xl mx-auto mb-8">
              Empowering businesses worldwide with premium digital products and innovative solutions since 2020.
            </p>
            <div className="flex items-center justify-center gap-6 text-[#737373]">
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="w-5 h-5" />
                <span>5+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                <span>20K+ Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span>10K+ Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,212,170,0.05)_0%,rgba(8,8,8,0)_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                {mission.title}
              </h2>
              <p className="text-xl text-[#737373] mb-8 leading-relaxed">
                {mission.description}
              </p>
              <p className="text-[#737373] mb-8 leading-relaxed">
                {mission.content}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#00d4aa]" />
                  <span className="text-[#fafafa]">Quality over quantity</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#00d4aa]" />
                  <span className="text-[#fafafa]">Innovation-driven approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#00d4aa]" />
                  <span className="text-[#fafafa]">Customer-centric solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#00d4aa]" />
                  <span className="text-[#fafafa]">Global accessibility</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass-card rounded-3xl p-8 border border-[#2a2a30]">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-[#fafafa] mb-4">{vision.title}</h3>
                </div>
                <p className="text-[#737373] leading-relaxed">
                  {vision.description}
                </p>
                {vision.content && (
                  <p className="text-[#737373] leading-relaxed mt-4">
                    {vision.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/5 via-transparent to-[#8b5cf6]/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.id} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-[#737373] text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1f] to-[#0f0f12]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Meet Our Team
            </h2>
            <p className="text-xl text-[#737373] max-w-2xl mx-auto">
              Passionate experts dedicated to delivering exceptional digital products and experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content?.team && content.team.length > 0 ? (
              content.team.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] rounded-full flex items-center justify-center mb-6">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-3xl text-[#0f0f12] font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-[#fafafa] mb-2">{member.name}</h3>
                  <p className="text-[#00d4aa] font-medium mb-3">{member.position}</p>
                  {member.bio && <p className="text-[#737373]">{member.bio}</p>}
                </div>
              ))
            ) : (
              <>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#00d4aa] to-[#8b5cf6] rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl text-[#0f0f12] font-bold">IR</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#fafafa] mb-2">Imran Rahman</h3>
                  <p className="text-[#00d4aa] font-medium mb-3">CEO</p>
                  <p className="text-[#737373]">Visionary leader driving digital innovation and business growth</p>
                </div>

                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#8b5cf6] to-[#00d4aa] rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl text-[#0f0f12] font-bold">BA</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#fafafa] mb-2">Bristy Akter</h3>
                  <p className="text-[#00d4aa] font-medium mb-3">Operations Manager</p>
                  <p className="text-[#737373]">Expert in streamlining operations and enhancing team productivity</p>
                </div>

                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#00d4aa] to-[#ff6b6b] rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl text-[#0f0f12] font-bold">I</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#fafafa] mb-2">Inaya</h3>
                  <p className="text-[#00d4aa] font-medium mb-3">Marketing Specialist</p>
                  <p className="text-[#737373]">Creative marketing professional driving brand awareness and engagement</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/10 via-[#8b5cf6]/10 to-[#00d4aa]/10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-12 border border-[#2a2a30]">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-[#737373] mb-10 max-w-2xl mx-auto">
              Discover premium digital products that will transform your business and join thousands of satisfied customers.
            </p>
            <Link
              href="/products"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(0,212,170,0.5)]"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center gap-2">
                Explore Products
                <ArrowLeftIcon className="w-5 h-5 rotate-180 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}