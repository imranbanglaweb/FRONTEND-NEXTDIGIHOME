'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch } from '../utils/api';

interface ContentItem {
  id: number;
  page: string;
  section: string;
  title?: string;
  content?: string;
  sort_order: number;
  is_active: boolean;
}

export default function AdminPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

const fetchContent = async () => {
    try {
      const data = await apiFetch('/content/all');
       if (data?.success) {
        const allContent: ContentItem[] = [];

        data.data.hero_sliders?.forEach((item: any) => {
          allContent.push({
            id: item.id,
            page: 'home',
            section: 'hero_slider',
            title: item.title,
            content: item.description,
            sort_order: item.sort_order,
            is_active: item.is_active,
          });
        });

        data.data.page_contents?.forEach((item: any) => {
          allContent.push({
            id: item.id,
            page: item.page,
            section: item.section,
            title: item.title,
            content: item.content,
            sort_order: item.sort_order,
            is_active: item.is_active,
          });
        });

        setContent(allContent);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

   const updateContent = async (item: ContentItem) => {
    try {
      await apiFetch(`/page-content/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: item.title,
          content: item.content,
          is_active: item.is_active,
        }),
      });

      await fetchContent();
      setSelectedItem(null);
    } catch (error) {
      console.error('Failed to update content:', error);
    }
  };



  return (
    <div className="min-h-screen bg-[#0b0e17] text-[#fafafa] font-sans">
      {/* Admin Nav */}
      <header className="border-b border-slate-800 bg-[#0d111a]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm border border-cyan-500/30">
            ND
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">NextDigiHome Admin</h1>
            <p className="text-xs text-slate-400">Enterprise Operations &amp; Growth Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>Lead CRM Pipeline</span>
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            Live Site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* CRM Summary Section (Section 41) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">CRM &amp; Lead Generation Overview</h2>
              <p className="text-xs text-slate-400">Real-time counts from Phase 12 agency lead funnel</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Open Full CRM Pipeline →
            </Link>
          </div>

          <CRMSummaryRow />
        </div>

        {/* Quick Links & Management Modules */}
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider text-xs">
            Admin Management Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/leads"
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                Agency Leads &amp; CRM Pipeline
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Triage new inquiries, qualify prospects, track proposals, record follow-ups, and manage status transitions.
              </p>
            </Link>

            <Link
              href="/admin/settings"
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                System &amp; SEO Settings
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Configure brand metadata, tracking integrations, and site-wide operational preferences.
              </p>
            </Link>

            <Link
              href="/contact"
              target="_blank"
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                Lead Capture Funnel
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Preview the live public /contact page with service parameter preselection and interactive qualification chips.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function CRMSummaryRow() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.summary) {
          setSummary(json.summary);
        }
      })
      .catch((err) => console.error('Failed to load CRM summary:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 animate-pulse h-20"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
        <div className="text-xs font-medium text-cyan-400">New Leads</div>
        <div className="text-2xl font-bold text-cyan-200 mt-1">{summary?.new ?? 0}</div>
        <div className="text-[10px] text-cyan-500/70 mt-0.5">Awaiting first contact</div>
      </div>
      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
        <div className="text-xs font-medium text-emerald-400">Qualified Leads</div>
        <div className="text-2xl font-bold text-emerald-200 mt-1">{summary?.qualified ?? 0}</div>
        <div className="text-[10px] text-emerald-500/70 mt-0.5">Requirements scoped</div>
      </div>
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
        <div className="text-xs font-medium text-purple-400">Proposals</div>
        <div className="text-2xl font-bold text-purple-200 mt-1">{summary?.proposals ?? 0}</div>
        <div className="text-[10px] text-purple-500/70 mt-0.5">Active negotiations</div>
      </div>
      <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/20">
        <div className="text-xs font-medium text-teal-400">Won Projects</div>
        <div className="text-2xl font-bold text-teal-200 mt-1">{summary?.won ?? 0}</div>
        <div className="text-[10px] text-teal-500/70 mt-0.5">Closed deals</div>
      </div>
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
        <div className="text-xs font-medium text-amber-400">Follow-ups Due</div>
        <div className="text-2xl font-bold text-amber-200 mt-1">{summary?.followUpsDue ?? 0}</div>
        <div className="text-[10px] text-amber-500/70 mt-0.5">Pending reminder dates</div>
      </div>
    </div>
  );
}