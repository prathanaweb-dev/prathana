import { NextResponse } from 'next/server';
import { deleteCsrDocument } from '@/lib/db';

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
