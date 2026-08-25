import { NextResponse } from 'next/server';
import { getReports, addReport, updateReport, deleteReport } from '@/lib/db';

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
    const { title, title_mr, description, summary, type, category, year, file_url, pdf_url, cover_image } = body;
    const url = file_url || pdf_url;
    if (!title || !url) {
      return NextResponse.json({ error: 'Title and document PDF URL are required' }, { status: 400 });
    }
    const report = await addReport({
      title,
      title_mr: title_mr || '',
      description: description || summary || '',
      type: type || category || 'annual',
      year: year || '2024-25',
      file_url: url,
      cover_image,
    });
    if (!report) return NextResponse.json({ error: 'Failed to add report' }, { status: 500 });
    return NextResponse.json({ success: true, report }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;
    const updates = body.updates ? body.updates : { ...body };
    delete updates.id;

    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 });
    }

    if (updates.pdf_url && !updates.file_url) updates.file_url = updates.pdf_url;
    if (updates.summary && !updates.description) updates.description = updates.summary;
    if (updates.category && !updates.type) updates.type = updates.category;

    const report = await updateReport(id, updates);
    if (!report) return NextResponse.json({ error: 'Report not found or update failed' }, { status: 404 });
    return NextResponse.json({ success: true, report });
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
