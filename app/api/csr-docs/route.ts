import { NextResponse } from 'next/server';
import { getCsrDocuments, addCsrDocument, updateCsrDocument } from '@/lib/db';

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

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;
    const updates = body.updates ? body.updates : { ...body };
    delete updates.id;

    if (!id) {
      return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });
    }

    const updated = await updateCsrDocument(id, updates);
    if (!updated) return NextResponse.json({ success: false, error: 'Document not found or update failed' }, { status: 404 });
    return NextResponse.json({ success: true, document: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
