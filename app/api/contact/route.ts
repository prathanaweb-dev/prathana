import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  created_at: string;
}

const CONTACTS_PATH = path.join(process.cwd(), 'lib', 'contacts.json');

function readContacts(): ContactMessage[] {
  try {
    if (fs.existsSync(CONTACTS_PATH)) {
      return JSON.parse(fs.readFileSync(CONTACTS_PATH, 'utf8'));
    }
  } catch {
    // ignore parse errors — start fresh
  }
  return [];
}

function writeContacts(contacts: ContactMessage[]) {
  const dir = path.dirname(CONTACTS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CONTACTS_PATH, JSON.stringify(contacts, null, 2), 'utf8');
}

export async function GET() {
  try {
    const contacts = readContacts();
    return NextResponse.json({ success: true, contacts });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'name, email and message are required' },
        { status: 400 }
      );
    }

    const contact: ContactMessage = {
      id: 'msg-' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      phone: phone || '',
      message,
      read: false,
      created_at: new Date().toISOString(),
    };

    const existing = readContacts();
    existing.unshift(contact);
    writeContacts(existing);

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const contacts = readContacts();
    const idx = contacts.findIndex(c => c.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    contacts[idx].read = true;
    writeContacts(contacts);

    return NextResponse.json({ success: true, contact: contacts[idx] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
