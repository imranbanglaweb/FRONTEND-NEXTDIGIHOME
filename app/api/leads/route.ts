import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface LeadNote {
  id: string;
  text: string;
  author: string;
  created_at: string;
}

export interface LeadActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface LeadFollowUp {
  date: string;
  note: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export interface Lead {
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

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

function ensureDataFile(): Lead[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([]), 'utf8');
      return [];
    }
    const content = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(content) as Lead[];
  } catch (error) {
    console.error('Error reading leads file:', error);
    return [];
  }
}

function saveLeads(leads: Lead[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing leads file:', error);
  }
}

function calculateLeadScore(data: Partial<Lead>): { score: number; reasons: string[]; priority: 'LOW' | 'MEDIUM' | 'HIGH' } {
  let score = 20; // Base score for valid submission
  const reasons: string[] = ['Valid inquiry submitted (+20)'];

  // Budget signal
  const budget = data.budget || '';
  if (budget.includes('3,00,000+') || budget.includes('1,00,000')) {
    score += 25;
    reasons.push('Enterprise/Growth budget range (+25)');
  } else if (budget.includes('50,000')) {
    score += 15;
    reasons.push('Standard commercial budget range (+15)');
  }

  // Timeline urgency
  const timeline = data.timeline || '';
  if (timeline === 'ASAP' || timeline.includes('2 Weeks')) {
    score += 20;
    reasons.push('High-urgency timeline target (+20)');
  } else if (timeline.includes('1 Month')) {
    score += 10;
    reasons.push('Active monthly timeline target (+10)');
  }

  // Company / Website verified
  if (data.company?.trim()) {
    score += 10;
    reasons.push('Company/Organization specified (+10)');
  }
  if (data.website?.trim()) {
    score += 10;
    reasons.push('Live business website provided (+10)');
  }

  // High-value service
  const s = (data.service || '').toLowerCase();
  if (s.includes('saas') || s.includes('custom software') || s.includes('ai') || s.includes('web app') || s.includes('e-commerce')) {
    score += 15;
    reasons.push('High-value core technology domain (+15)');
  }

  // Detailed description length
  if ((data.description || '').length > 80) {
    score += 10;
    reasons.push('Detailed project requirements provided (+10)');
  }

  // Direct phone / WhatsApp provided
  if (data.phone?.trim()) {
    score += 5;
    reasons.push('Direct contact phone verified (+5)');
  }

  // Determine priority
  let priority: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  if (score >= 65) priority = 'HIGH';
  else if (score >= 40) priority = 'MEDIUM';

  return { score, reasons, priority };
}

// GET: List all leads with filtering and KPI summary
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get('search') || '').toLowerCase().trim();
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');
  const service = searchParams.get('service');
  const source = searchParams.get('source');

  const leads = ensureDataFile();

  // Filter leads
  const filtered = leads.filter((lead) => {
    if (status && lead.status !== status) return false;
    if (priority && lead.priority !== priority) return false;
    if (service && !lead.service.toLowerCase().includes(service.toLowerCase())) return false;
    if (source && (lead.lead_source || '').toLowerCase() !== source.toLowerCase()) return false;

    if (search) {
      const nameMatch = lead.name.toLowerCase().includes(search);
      const emailMatch = lead.email.toLowerCase().includes(search);
      const phoneMatch = lead.phone.toLowerCase().includes(search);
      const companyMatch = (lead.company || '').toLowerCase().includes(search);
      const descMatch = lead.description.toLowerCase().includes(search);
      if (!nameMatch && !emailMatch && !phoneMatch && !companyMatch && !descMatch) {
        return false;
      }
    }

    return true;
  });

  // Sort newest first
  filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Calculate real database KPI summary
  const now = new Date();
  const summary = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'NEW').length,
    contacted: leads.filter((l) => l.status === 'CONTACTED').length,
    qualified: leads.filter((l) => l.status === 'QUALIFIED').length,
    proposals: leads.filter((l) => l.status === 'PROPOSAL' || l.status === 'NEGOTIATION').length,
    won: leads.filter((l) => l.status === 'WON').length,
    followUpsDue: leads.filter(
      (l) => l.follow_up?.status === 'PENDING' && new Date(l.follow_up.date) <= now
    ).length,
  };

  return NextResponse.json({
    success: true,
    data: filtered,
    summary,
    total: filtered.length,
  });
}

// POST: Create a new lead from contact form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Honeypot check for spam bots
    if (body._hp) {
      return NextResponse.json(
        { success: true, message: 'Inquiry received.' },
        { status: 200 }
      );
    }

    // 2. Required field validation
    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const phone = (body.phone || '').trim();
    const service = (body.service || '').trim();
    const description = (body.description || '').trim();

    if (!name) {
      return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Valid email is required' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ success: false, message: 'Phone or WhatsApp number is required' }, { status: 400 });
    }
    if (!service) {
      return NextResponse.json({ success: false, message: 'Service selection is required' }, { status: 400 });
    }
    if (!description) {
      return NextResponse.json({ success: false, message: 'Project description is required' }, { status: 400 });
    }

    // 3. Lead scoring
    const { score, reasons, priority } = calculateLeadScore({
      service,
      budget: body.budget,
      timeline: body.timeline,
      company: body.company,
      website: body.website,
      description,
      phone,
    });

    const timestamp = new Date().toISOString();
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 4. Construct comprehensive lead object
    const newLead: Lead = {
      id: leadId,
      name,
      email,
      phone,
      whatsapp: body.whatsapp || phone,
      company: (body.company || '').trim() || undefined,
      website: (body.website || '').trim() || undefined,
      service,
      services: Array.isArray(body.services) ? body.services : [service],
      service_details: body.service_details || {},
      description,
      budget: body.budget || 'Not Sure',
      timeline: body.timeline || 'Not Sure',
      contact_method: body.contact_method || 'Email',
      lead_source: body.lead_source || 'Website Direct',
      landing_page: body.landing_page || '/contact',
      referrer: body.referrer || 'Direct',
      utm_source: body.utm_source || undefined,
      utm_medium: body.utm_medium || undefined,
      utm_campaign: body.utm_campaign || undefined,
      utm_content: body.utm_content || undefined,
      utm_term: body.utm_term || undefined,
      file_name: body.file_name || undefined,
      file_size: body.file_size || undefined,
      file_type: body.file_type || undefined,
      status: 'NEW',
      priority,
      lead_score: score,
      score_reasons: reasons,
      notes: [],
      activities: [
        {
          id: `act_${Date.now()}`,
          type: 'LEAD_CREATED',
          description: `Lead created for ${service} (Score: ${score}, Priority: ${priority})`,
          timestamp,
        },
      ],
      created_at: timestamp,
      updated_at: timestamp,
    };

    // 5. Forward to backend Laravel inquiries API
    try {
      const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://backend.nextdigihome.com').replace(/\/$/, '');
      const detailSummary = Object.entries(newLead.service_details || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');

      const backendPayload = {
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        company: newLead.company || null,
        service: newLead.service,
        budget: newLead.budget,
        timeline: newLead.timeline,
        message: `${newLead.description}${detailSummary ? `\n\n[Service Requirements]: ${detailSummary}` : ''}${newLead.utm_source ? `\n[Attribution]: ${newLead.utm_source}/${newLead.utm_campaign || 'none'}` : ''}`,
      };

      const backendRes = await fetch(`${backendUrl}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(backendPayload),
      });

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        if (backendData?.data?.id) {
          newLead.backend_id = backendData.data.id;
        }
      }
    } catch (backendError) {
      console.warn('Backend inquiry sync note:', backendError);
      // DO NOT lose the lead! Continues to persist locally.
    }

    // 6. Save to local persistent store
    const leads = ensureDataFile();
    leads.unshift(newLead);
    saveLeads(leads);

    return NextResponse.json({
      success: true,
      message: "Thanks — We've Received Your Inquiry.",
      data: {
        id: newLead.id,
        name: newLead.name,
        service: newLead.service,
        created_at: newLead.created_at,
      },
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your inquiry. Please try again.' },
      { status: 500 }
    );
  }
}

// PATCH: Update lead status, priority, notes, follow-up, or assignment
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.id || request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Lead ID is required' }, { status: 400 });
    }

    const leads = ensureDataFile();
    const index = leads.findIndex((l) => l.id === id || String(l.backend_id) === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    const lead = leads[index];
    const timestamp = new Date().toISOString();

    // Handle status change
    if (body.status && body.status !== lead.status) {
      const oldStatus = lead.status;
      lead.status = body.status;
      lead.activities = lead.activities || [];
      lead.activities.unshift({
        id: `act_${Date.now()}`,
        type: 'STATUS_CHANGE',
        description: `Status changed from ${oldStatus} to ${body.status}`,
        timestamp,
      });
    }

    // Handle priority change
    if (body.priority && body.priority !== lead.priority) {
      const oldPriority = lead.priority;
      lead.priority = body.priority;
      lead.activities = lead.activities || [];
      lead.activities.unshift({
        id: `act_${Date.now()}`,
        type: 'PRIORITY_CHANGE',
        description: `Priority changed from ${oldPriority} to ${body.priority}`,
        timestamp,
      });
    }

    // Handle assignment
    if (body.assigned_to !== undefined && body.assigned_to !== lead.assigned_to) {
      lead.assigned_to = body.assigned_to;
      lead.activities = lead.activities || [];
      lead.activities.unshift({
        id: `act_${Date.now()}`,
        type: 'ASSIGNMENT_CHANGE',
        description: `Lead assigned to ${body.assigned_to || 'Unassigned'}`,
        timestamp,
      });
    }

    // Handle new note
    if (body.note && typeof body.note === 'string' && body.note.trim()) {
      const newNote: LeadNote = {
        id: `note_${Date.now()}`,
        text: body.note.trim(),
        author: body.author || 'Admin Team',
        created_at: timestamp,
      };
      lead.notes = lead.notes || [];
      lead.notes.unshift(newNote);
      lead.activities = lead.activities || [];
      lead.activities.unshift({
        id: `act_${Date.now()}`,
        type: 'NOTE_ADDED',
        description: `Internal note added by ${newNote.author}: "${newNote.text.substring(0, 40)}..."`,
        timestamp,
      });
    }

    // Handle follow-up update
    if (body.follow_up) {
      lead.follow_up = {
        date: body.follow_up.date,
        note: body.follow_up.note || '',
        status: body.follow_up.status || 'PENDING',
      };
      lead.activities = lead.activities || [];
      lead.activities.unshift({
        id: `act_${Date.now()}`,
        type: 'FOLLOW_UP_SCHEDULED',
        description: `Follow-up set for ${new Date(body.follow_up.date).toLocaleDateString()}: "${body.follow_up.note || 'No note'}"`,
        timestamp,
      });
    }

    lead.updated_at = timestamp;
    leads[index] = lead;
    saveLeads(leads);

    return NextResponse.json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    });
  } catch (error) {
    console.error('Lead update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

