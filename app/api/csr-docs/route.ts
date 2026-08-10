import { NextResponse } from 'next/server';
import { getCsrDocuments, addCsrDocument } from '@/lib/db';

export async function GET() {
  try {
    const docs = await getCsrDocuments();
    return NextResponse.json({ success: true, documents: docs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newDoc = await addCsrDocument(body);
    if (!newDoc) throw new Error('Failed to add document');
    return NextResponse.json({ success: true, document: newDoc });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
