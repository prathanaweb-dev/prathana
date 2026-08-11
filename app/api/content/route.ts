import { NextResponse } from 'next/server';
import { getPageContent, updatePageContent } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return NextResponse.json({ success: false, error: 'pageId is required' }, { status: 400 });
  }

  try {
    const data = await getPageContent(pageId);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching site content:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return NextResponse.json({ success: false, error: 'pageId is required' }, { status: 400 });
  }

  try {
    const { data } = await request.json();
    if (!data) {
      return NextResponse.json({ success: false, error: 'Content data is required' }, { status: 400 });
    }

    const result = await updatePageContent(pageId, data);
    return NextResponse.json({ success: result });
  } catch (error: any) {
    console.error('Error updating site content:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
