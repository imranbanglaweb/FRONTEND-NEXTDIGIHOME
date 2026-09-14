import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { type Lead } from '../route';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

function getLeads(): Lead[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    const content = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(content) as Lead[];
  } catch {
    return [];
  }
}

function saveLeads(leads: Lead[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving leads:', error);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const leads = getLeads();
  const lead = leads.find((l) => l.id === id || String(l.backend_id) === id);

  if (!lead) {
    return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: lead });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const leads = getLeads();
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
      lead.activities.unshift({
        id: `act_${Date.now()}`,
        type: 'ASSIGNMENT_CHANGE',
        description: `Lead assigned to ${body.assigned_to || 'Unassigned'}`,
        timestamp,
      });
    }

    // Handle new note
    if (body.note && typeof body.note === 'string' && body.note.trim()) {
      const newNote = {
        id: `note_${Date.now()}`,
        text: body.note.trim(),
        author: body.author || 'Admin User',
        created_at: timestamp,
      };
      lead.notes.unshift(newNote);
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
