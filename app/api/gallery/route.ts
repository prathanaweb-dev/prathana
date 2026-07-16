import { NextResponse } from 'next/server';
import { getGalleryPhotos, addGalleryPhoto, deleteGalleryPhoto } from '@/lib/db';

export async function GET() {
  try {
    const photos = await getGalleryPhotos();
    return NextResponse.json({ success: true, photos });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, title, title_mr, desc, category } = body;
    if (!url || !title || !category) {
      return NextResponse.json({ error: 'url, title and category are required' }, { status: 400 });
    }
    const photo = await addGalleryPhoto({ url, title, title_mr, desc, category });
    if (!photo) return NextResponse.json({ error: 'Failed to add photo' }, { status: 500 });
    return NextResponse.json({ success: true, photo }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const ok = await deleteGalleryPhoto(id);
    return NextResponse.json({ success: ok });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
