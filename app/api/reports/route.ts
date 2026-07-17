import { NextResponse } from 'next/server';
import { getReports, addReport, deleteReport } from '@/lib/db';

export async function GET() {
  try {
    const reports = await getReports();
    return NextResponse.json({ success: true, reports });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, title_mr, description, type, year, file_url, cover_image } = body;
    if (!title || !file_url) {
      return NextResponse.json({ error: 'title and file_url are required' }, { status: 400 });
    }
    const report = await addReport({ title, title_mr, description, type: type || 'annual', year: year || new Date().getFullYear().toString(), file_url, cover_image });
    if (!report) return NextResponse.json({ error: 'Failed to add report' }, { status: 500 });
    return NextResponse.json({ success: true, report }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const ok = await deleteReport(id);
    return NextResponse.json({ success: ok });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
