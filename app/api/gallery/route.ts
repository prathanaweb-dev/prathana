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
    const { url, thumbnail_url, media_type, title, title_mr, desc, desc_mr, category } = body;
    if (!url || !title || !category) {
      return NextResponse.json({ error: 'url, title and category are required' }, { status: 400 });
    }
    const isVid = media_type === 'video' || url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('youtube.com') || url.includes('youtu.be');
    const photo = await addGalleryPhoto({
      url,
      thumbnail_url,
      media_type: isVid ? 'video' : 'image',
      title,
      title_mr,
      desc,
      desc_mr,
      category,
    });
    if (!photo) return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
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
