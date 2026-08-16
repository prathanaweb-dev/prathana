import { NextResponse } from 'next/server';
import { isFirebaseConfigured, firestore } from '@/lib/db';
import { collection, getDocs, doc, setDoc, getDoc, query, orderBy } from 'firebase/firestore';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read: boolean;
  created_at: string;
}

export async function GET() {
  try {
    if (isFirebaseConfigured && firestore) {
      const q = query(collection(firestore, 'contacts'), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      const contacts = snapshot.docs.map(d => d.data() as ContactMessage);
      return NextResponse.json({ success: true, contacts });
    }
    return NextResponse.json({ success: true, contacts: [] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

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
      subject: subject || '',
      message,
      read: false,
      created_at: new Date().toISOString(),
    };

    if (isFirebaseConfigured && firestore) {
      const docRef = doc(firestore, 'contacts', contact.id);
      await setDoc(docRef, { ...contact });
    }

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    if (isFirebaseConfigured && firestore) {
      const docRef = doc(firestore, 'contacts', id);
      const snap = await getDoc(docRef);
      if (!snap.exists()) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      const updated = { ...snap.data(), read: true } as ContactMessage;
      await setDoc(docRef, updated);
      return NextResponse.json({ success: true, contact: updated });
    }

    return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
