'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface LeadNote {
  id: string;
  text: string;
  author: string;
  created_at: string;
}

interface LeadActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface LeadFollowUp {
  date: string;
  note: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  company?: string;
  website?: string;
  service: string;
  services?: string[];
  service_details?: Record<string, any>;
  description: string;
  budget?: string;
  timeline?: string;
  contact_method?: string;
  lead_source?: string;
  landing_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  first_utm_source?: string;
  first_utm_medium?: string;
  first_utm_campaign?: string;
  first_utm_content?: string;
  first_utm_term?: string;
  first_landing_page?: string;
  first_referrer?: string;
  first_touch_time?: string;
  last_utm_source?: string;
  last_utm_medium?: string;
  last_utm_campaign?: string;
  last_utm_content?: string;
  last_utm_term?: string;
  last_landing_page?: string;
  last_referrer?: string;
  last_touch_time?: string;
  event_id?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST' | 'NURTURE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  lead_score: number;
  score_reasons: string[];
  notes: LeadNote[];
  follow_up?: LeadFollowUp;
  assigned_to?: string;
  activities: LeadActivity[];
  backend_id?: number | string;
  created_at: string;
  updated_at: string;
}

interface CRMSummary {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  proposals: number;
  won: number;
  followUpsDue: number;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  NEW: { label: 'New Lead', bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  CONTACTED: { label: 'Contacted', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  QUALIFIED: { label: 'Qualified', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  PROPOSAL: { label: 'Proposal Sent', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  NEGOTIATION: { label: 'Negotiation', bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  WON: { label: 'Won Deal', bg: 'bg-teal-500/20', text: 'text-teal-300', border: 'border-teal-500/50' },
  LOST: { label: 'Lost', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
  NURTURE: { label: 'Nurture', bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' },
};

const PRIORITY_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  HIGH: { label: 'High Priority', bg: 'bg-rose-500/10', text: 'text-rose-400', dot: 'bg-rose-500' },
  MEDIUM: { label: 'Medium', bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-500' },
  LOW: { label: 'Low', bg: 'bg-slate-500/10', text: 'text-slate-400', dot: 'bg-slate-500' },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [summary, setSummary] = useState<CRMSummary>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    proposals: 0,
    won: 0,
    followUpsDue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  // Tab in modal
  const [activeTab, setActiveTab] = useState<'details' | 'pipeline' | 'notes' | 'attribution'>('details');

  // New Note form state
  const [newNoteText, setNewNoteText] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('Admin Team');
  const [savingNote, setSavingNote] = useState(false);

  // Follow-up form state
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpNote, setFollowUpNote] = useState('');
  const [followUpStatus, setFollowUpStatus] = useState<'PENDING' | 'COMPLETED' | 'CANCELLED'>('PENDING');
  const [savingFollowUp, setSavingFollowUp] = useState(false);

  // Status/Priority quick update
  const [updatingPipeline, setUpdatingPipeline] = useState(false);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      if (priorityFilter) params.set('priority', priorityFilter);
      if (serviceFilter) params.set('service', serviceFilter);
      if (sourceFilter) params.set('source', sourceFilter);

      const res = await fetch(`/api/leads?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setLeads(json.data || []);
        if (json.summary) {
          setSummary(json.summary);
        }
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter, serviceFilter, sourceFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Sync modal state when selected lead changes
  useEffect(() => {
    if (selectedLead) {
      if (selectedLead.follow_up) {
        setFollowUpDate(selectedLead.follow_up.date ? selectedLead.follow_up.date.substring(0, 10) : '');
        setFollowUpNote(selectedLead.follow_up.note || '');
        setFollowUpStatus(selectedLead.follow_up.status || 'PENDING');
      } else {
        setFollowUpDate('');
        setFollowUpNote('');
        setFollowUpStatus('PENDING');
      }
    }
  }, [selectedLead]);

  const handleUpdatePipeline = async (updates: { status?: string; priority?: string; assigned_to?: string }) => {
    if (!selectedLead) return;
    try {
      setUpdatingPipeline(true);
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedLead.id, ...updates }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setSelectedLead(json.data);
        setLeads((prev) => prev.map((l) => (l.id === json.data.id ? json.data : l)));
        // Refresh summary
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to update pipeline:', err);
    } finally {
      setUpdatingPipeline(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    try {
      setSavingNote(true);
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedLead.id,
          note: newNoteText.trim(),
          author: noteAuthor.trim() || 'Admin Team',
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setSelectedLead(json.data);
        setLeads((prev) => prev.map((l) => (l.id === json.data.id ? json.data : l)));
        setNewNoteText('');
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setSavingNote(false);
    }
  };

  const handleSaveFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !followUpDate) return;
    try {
      setSavingFollowUp(true);
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedLead.id,
          follow_up: {
            date: followUpDate,
            note: followUpNote.trim(),
            status: followUpStatus,
          },
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setSelectedLead(json.data);
        setLeads((prev) => prev.map((l) => (l.id === json.data.id ? json.data : l)));
        fetchLeads();
      }
    } catch (err) {
      console.error('Failed to save follow-up:', err);
    } finally {
      setSavingFollowUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 font-sans pb-24">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-[#0b0e17]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
              title="Back to Admin Dashboard"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">Agency Leads &amp; CRM Pipeline</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Phase 12
                </span>
              </div>
              <p className="text-xs text-slate-400">NextDigiHome Central Agency Inquiries &amp; Qualification Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => fetchLeads()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/60"
            >
              <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <Link
              href="/contact"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-semibold hover:opacity-90 transition-opacity"
            >
              <span>View Public /contact</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-xs font-medium text-slate-400">Total Leads</div>
            <div className="text-2xl font-bold text-white mt-1">{summary.total}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">All time submissions</div>
          </div>
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
            <div className="text-xs font-medium text-cyan-400">New Inquiries</div>
            <div className="text-2xl font-bold text-cyan-200 mt-1">{summary.new}</div>
            <div className="text-[10px] text-cyan-500/70 mt-0.5">Awaiting triage</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <div className="text-xs font-medium text-emerald-400">Qualified</div>
            <div className="text-2xl font-bold text-emerald-200 mt-1">{summary.qualified}</div>
            <div className="text-[10px] text-emerald-500/70 mt-0.5">Ready for scope</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
            <div className="text-xs font-medium text-purple-400">Proposals</div>
            <div className="text-2xl font-bold text-purple-200 mt-1">{summary.proposals}</div>
            <div className="text-[10px] text-purple-500/70 mt-0.5">Proposal / Negotiation</div>
          </div>
          <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/20">
            <div className="text-xs font-medium text-teal-400">Won Projects</div>
            <div className="text-2xl font-bold text-teal-200 mt-1">{summary.won}</div>
            <div className="text-[10px] text-teal-500/70 mt-0.5">Converted deals</div>
          </div>
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
            <div className="text-xs font-medium text-amber-400">Follow-ups Due</div>
            <div className="text-2xl font-bold text-amber-200 mt-1">{summary.followUpsDue}</div>
            <div className="text-[10px] text-amber-500/70 mt-0.5">Needs immediate touch</div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads by name, email, phone, company, or requirement..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
              />
              <svg className="w-4 h-4 text-slate-500 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter leads by pipeline status"
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
            >
              <option value="">All Pipeline Statuses</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="PROPOSAL">Proposal</option>
              <option value="NEGOTIATION">Negotiation</option>
              <option value="WON">Won</option>
              <option value="LOST">Lost</option>
              <option value="NURTURE">Nurture</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filter leads by priority level"
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
            >
              <option value="">All Priorities</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>

            {/* Service Filter */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              aria-label="Filter leads by requested service"
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
            >
              <option value="">All Services</option>
              <option value="Web Development">Website Development</option>
              <option value="SaaS Development">SaaS Development</option>
              <option value="AI">AI &amp; Automation</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Custom Software">Custom Software</option>
              <option value="E-commerce">E-commerce</option>
            </select>

            {/* Source Filter */}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              aria-label="Filter leads by marketing attribution source"
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
            >
              <option value="">All Sources</option>
              <option value="Google">Google</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="YouTube">YouTube</option>
              <option value="Referral">Referral</option>
              <option value="Direct">Direct</option>
            </select>
          </div>
        </div>

        {/* Lead Table / List */}
        <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Leads ({leads.length})
            </h2>
            <span className="text-xs text-slate-400">Sorted by most recent submission</span>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs text-slate-400">Loading pipeline leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div className="text-sm font-medium text-slate-300">No leads match your criteria</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Inquiries submitted via the <Link href="/contact" className="text-cyan-400 underline">/contact</Link> page will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 font-medium border-b border-slate-800/80">
                  <tr>
                    <th className="py-3.5 px-4">Contact / Company</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Budget &amp; Timeline</th>
                    <th className="py-3.5 px-4">Score / Priority</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Submitted</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {leads.map((lead) => {
                    const statusConf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;
                    const priorityConf = PRIORITY_CONFIG[lead.priority] || PRIORITY_CONFIG.MEDIUM;
                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-slate-800/30 transition-colors cursor-pointer group"
                        onClick={() => setSelectedLead(lead)}
                      >
                        {/* Contact */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                            {lead.name}
                          </div>
                          {lead.company && (
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span>{lead.company}</span>
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[180px]">
                            {lead.email}
                          </div>
                        </td>

                        {/* Service */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                            {lead.service}
                          </span>
                          <div className="text-[11px] text-slate-400 mt-1 line-clamp-1 max-w-[200px]">
                            {lead.description}
                          </div>
                        </td>

                        {/* Budget & Timeline */}
                        <td className="py-3.5 px-4">
                          <div className="text-slate-200 font-medium">{lead.budget || 'Not specified'}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Timeline: {lead.timeline || 'Flexible'}
                          </div>
                        </td>

                        {/* Score / Priority */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-white border border-slate-700">
                              {lead.lead_score}
                            </div>
                            <div>
                              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${priorityConf.bg} ${priorityConf.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${priorityConf.dot}`}></span>
                                {priorityConf.label}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}>
                            {statusConf.label}
                          </span>
                          {lead.assigned_to && (
                            <div className="text-[10px] text-slate-500 mt-1">
                              Owner: {lead.assigned_to}
                            </div>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium transition-colors border border-slate-700/60"
                          >
                            Manage →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Lead Detail Slide-out Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-2xl h-full bg-[#0d111a] border-l border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-slide-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-800/80 bg-slate-900/60 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_CONFIG[selectedLead.status]?.bg} ${STATUS_CONFIG[selectedLead.status]?.text} ${STATUS_CONFIG[selectedLead.status]?.border}`}>
                    {STATUS_CONFIG[selectedLead.status]?.label}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                  <span>ID: {selectedLead.id}</span>
                  <span>•</span>
                  <span>Received: {new Date(selectedLead.created_at).toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                aria-label="Close lead details modal"
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Pipeline Status Selector */}
            <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Pipeline Status:</span>
                <select
                  value={selectedLead.status}
                  disabled={updatingPipeline}
                  onChange={(e) => handleUpdatePipeline({ status: e.target.value })}
                  aria-label="Update lead pipeline status"
                  className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 font-semibold focus:outline-none focus:border-cyan-500"
                >
                  <option value="NEW">New Lead</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified</option>
                  <option value="PROPOSAL">Proposal</option>
                  <option value="NEGOTIATION">Negotiation</option>
                  <option value="WON">Won Deal</option>
                  <option value="LOST">Lost</option>
                  <option value="NURTURE">Nurture</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Priority:</span>
                <select
                  value={selectedLead.priority}
                  disabled={updatingPipeline}
                  onChange={(e) => handleUpdatePipeline({ priority: e.target.value })}
                  aria-label="Update lead priority"
                  className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 font-semibold focus:outline-none focus:border-cyan-500"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High Priority</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Owner:</span>
                <input
                  type="text"
                  defaultValue={selectedLead.assigned_to || ''}
                  placeholder="Assign owner..."
                  onBlur={(e) => {
                    if (e.target.value !== (selectedLead.assigned_to || '')) {
                      handleUpdatePipeline({ assigned_to: e.target.value.trim() });
                    }
                  }}
                  className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 text-xs w-32 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 border-b border-slate-800 bg-slate-900/30 flex gap-4 text-xs font-medium">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Project &amp; Contact
              </button>
              <button
                onClick={() => setActiveTab('pipeline')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'pipeline'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Score &amp; Follow-up
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`py-3 border-b-2 transition-colors relative ${
                  activeTab === 'notes'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Notes &amp; Activity ({selectedLead.notes.length + (selectedLead.activities?.length || 0)})
              </button>
              <button
                onClick={() => setActiveTab('attribution')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'attribution'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Attribution &amp; UTM
              </button>
            </div>

            {/* Tab Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300">
              {/* TAB: DETAILS */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Contact Info Card */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                    <h4 className="font-semibold text-slate-100 text-xs uppercase tracking-wider text-cyan-400">
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[11px] text-slate-500">Full Name</div>
                        <div className="text-slate-200 font-medium mt-0.5">{selectedLead.name}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">Email Address</div>
                        <a href={`mailto:${selectedLead.email}`} className="text-cyan-400 hover:underline font-medium mt-0.5 block truncate">
                          {selectedLead.email}
                        </a>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">Phone / WhatsApp</div>
                        <div className="text-slate-200 font-medium mt-0.5">
                          {selectedLead.phone}
                          {selectedLead.whatsapp && selectedLead.whatsapp !== selectedLead.phone && (
                            <span className="text-[10px] text-emerald-400 block">WA: {selectedLead.whatsapp}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">Preferred Contact Method</div>
                        <div className="text-slate-200 font-medium mt-0.5 capitalize">
                          {selectedLead.contact_method || 'Email'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">Company / Business</div>
                        <div className="text-slate-200 font-medium mt-0.5">
                          {selectedLead.company || 'Not provided'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">Website</div>
                        {selectedLead.website ? (
                          <a
                            href={selectedLead.website.startsWith('http') ? selectedLead.website : `https://${selectedLead.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:underline font-medium mt-0.5 block truncate"
                          >
                            {selectedLead.website}
                          </a>
                        ) : (
                          <div className="text-slate-500 mt-0.5">Not provided</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Scope Card */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                    <h4 className="font-semibold text-slate-100 text-xs uppercase tracking-wider text-cyan-400">
                      Project Requirements
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[11px] text-slate-500">Requested Service</div>
                        <div className="text-slate-100 font-semibold mt-0.5">{selectedLead.service}</div>
                        {selectedLead.services && selectedLead.services.length > 1 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedLead.services.map((s, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">Budget Range</div>
                        <div className="text-slate-100 font-semibold mt-0.5">{selectedLead.budget || 'Not specified'}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">Target Timeline</div>
                        <div className="text-slate-100 font-semibold mt-0.5">{selectedLead.timeline || 'Flexible'}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-500">Attached File</div>
                        <div className="text-slate-300 mt-0.5">
                          {selectedLead.file_name ? (
                            <span className="text-cyan-400 flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              {selectedLead.file_name} ({Math.round((selectedLead.file_size || 0) / 1024)} KB)
                            </span>
                          ) : (
                            'No file attached'
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <div className="text-[11px] text-slate-500 mb-1">Project Description / Problem Statement</div>
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-200 text-xs whitespace-pre-wrap leading-relaxed">
                        {selectedLead.description}
                      </div>
                    </div>
                  </div>

                  {/* Service Specific Questionnaire Details */}
                  {selectedLead.service_details && Object.keys(selectedLead.service_details).length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                      <h4 className="font-semibold text-slate-100 text-xs uppercase tracking-wider text-cyan-400">
                        Service-Specific Qualification Answers
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(selectedLead.service_details).map(([key, value]) => (
                          <div key={key} className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
                            <div className="text-[10px] text-slate-500 capitalize">
                              {key.replace(/_/g, ' ')}
                            </div>
                            <div className="text-slate-200 font-medium mt-0.5">
                              {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: PIPELINE & SCORING */}
              {activeTab === 'pipeline' && (
                <div className="space-y-6">
                  {/* Score Card */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-100 text-xs uppercase tracking-wider text-cyan-400">
                        Algorithmic Lead Qualification Score
                      </h4>
                      <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-sm border border-cyan-500/30">
                        {selectedLead.lead_score} / 100
                      </div>
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] text-slate-400 font-medium">Transparent Scoring Factors:</div>
                      {selectedLead.score_reasons && selectedLead.score_reasons.length > 0 ? (
                        <ul className="space-y-1">
                          {selectedLead.score_reasons.map((reason, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-slate-300 text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-500">Standard lead submission</p>
                      )}
                    </div>
                  </div>

                  {/* Follow-up Scheduler */}
                  <form onSubmit={handleSaveFollowUp} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-100 text-xs uppercase tracking-wider text-amber-400">
                        Follow-Up Scheduler &amp; Reminders
                      </h4>
                      {selectedLead.follow_up && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          selectedLead.follow_up.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : selectedLead.follow_up.status === 'CANCELLED'
                            ? 'bg-slate-500/20 text-slate-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {selectedLead.follow_up.status}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Follow-Up Date</label>
                        <input
                          type="date"
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Follow-Up Status</label>
                        <select
                          value={followUpStatus}
                          onChange={(e) => setFollowUpStatus(e.target.value as any)}
                          className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        >
                          <option value="PENDING">Pending (Active Reminder)</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Reminder Action / Agenda</label>
                      <input
                        type="text"
                        value={followUpNote}
                        onChange={(e) => setFollowUpNote(e.target.value)}
                        placeholder="e.g. Call prospect regarding architecture scoping proposal..."
                        className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={savingFollowUp || !followUpDate}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
                      >
                        {savingFollowUp ? 'Saving...' : 'Save Follow-Up Reminder'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB: NOTES & ACTIVITY */}
              {activeTab === 'notes' && (
                <div className="space-y-6">
                  {/* Add Note Card */}
                  <form onSubmit={handleAddNote} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                    <h4 className="font-semibold text-slate-100 text-xs uppercase tracking-wider text-cyan-400">
                      Add Internal Team Note
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <label className="text-[10px] text-slate-400 block mb-1">Author</label>
                        <input
                          type="text"
                          value={noteAuthor}
                          onChange={(e) => setNoteAuthor(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] text-slate-400 block mb-1">Note Content</label>
                        <input
                          type="text"
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder="Add team observation, meeting summary, or requirement note..."
                          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={savingNote || !newNoteText.trim()}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
                      >
                        {savingNote ? 'Posting...' : 'Post Internal Note'}
                      </button>
                    </div>
                  </form>

                  {/* Notes List */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-300">Internal Notes Thread ({selectedLead.notes.length})</div>
                    {selectedLead.notes.length === 0 ? (
                      <p className="text-xs text-slate-500 italic p-3 rounded bg-slate-950/40 border border-slate-800/40">
                        No internal notes yet. Use the form above to record team insights.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {selectedLead.notes.map((note) => (
                          <div key={note.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-cyan-400">{note.author}</span>
                              <span className="text-slate-500">{new Date(note.created_at).toLocaleString()}</span>
                            </div>
                            <p className="text-slate-200 text-xs leading-relaxed">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Activity Audit Log */}
                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    <div className="text-xs font-semibold text-slate-300">
                      Audit &amp; Activity Log ({selectedLead.activities?.length || 0})
                    </div>
                    <div className="space-y-2">
                      {(selectedLead.activities || []).map((act) => (
                        <div key={act.id} className="flex items-start gap-2.5 p-2 rounded bg-slate-950/40 border border-slate-800/40 text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 flex-shrink-0"></span>
                          <div className="flex-1">
                            <div className="text-slate-300 font-medium">{act.description}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{new Date(act.timestamp).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: ATTRIBUTION */}
              {activeTab === 'attribution' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                    <h4 className="font-semibold text-slate-100 text-xs uppercase tracking-wider text-cyan-400">
                      Marketing Attribution &amp; Source
                    </h4>
                    <div className="space-y-4 text-xs">
                      {/* First Touch vs Last Touch Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                          <div className="text-[10px] uppercase font-bold text-[#00d4aa] tracking-wider mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
                            First Touch (Origin)
                          </div>
                          <div className="space-y-1.5 text-[11px]">
                            <div className="flex justify-between"><span className="text-slate-500">Source:</span> <span className="text-slate-200 font-medium">{selectedLead.first_utm_source || selectedLead.utm_source || 'Direct'}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Medium:</span> <span className="text-slate-200">{selectedLead.first_utm_medium || selectedLead.utm_medium || 'None'}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Campaign:</span> <span className="text-slate-200">{selectedLead.first_utm_campaign || selectedLead.utm_campaign || 'None'}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Landing Page:</span> <span className="text-slate-200 truncate max-w-[180px]">{selectedLead.first_landing_page || selectedLead.landing_page || '/'}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Referrer:</span> <span className="text-slate-200 truncate max-w-[180px]">{selectedLead.first_referrer || selectedLead.referrer || 'Direct'}</span></div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                          <div className="text-[10px] uppercase font-bold text-sky-400 tracking-wider mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            Last Touch (Conversion)
                          </div>
                          <div className="space-y-1.5 text-[11px]">
                            <div className="flex justify-between"><span className="text-slate-500">Source:</span> <span className="text-slate-200 font-medium">{selectedLead.last_utm_source || selectedLead.utm_source || 'Direct'}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Medium:</span> <span className="text-slate-200">{selectedLead.last_utm_medium || selectedLead.utm_medium || 'None'}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Campaign:</span> <span className="text-slate-200">{selectedLead.last_utm_campaign || selectedLead.utm_campaign || 'None'}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Landing Page:</span> <span className="text-slate-200 truncate max-w-[180px]">{selectedLead.last_landing_page || selectedLead.landing_page || '/contact'}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Event ID:</span> <span className="text-slate-300 font-mono text-[10px] truncate max-w-[180px]">{selectedLead.event_id || 'N/A'}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
