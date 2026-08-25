import { NextResponse } from 'next/server';
import { deleteCsrDocument, updateCsrDocument } from '@/lib/db';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const cleanUpdates: any = { ...body };
    delete cleanUpdates.id;

    const updated = await updateCsrDocument(id, cleanUpdates);
    if (!updated) throw new Error('Document not found or update failed');
    return NextResponse.json({ success: true, document: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = await deleteCsrDocument(id);
    if (!success) throw new Error('Failed to delete document');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
