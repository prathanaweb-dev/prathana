import { NextResponse } from 'next/server';
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/lib/db';

export async function GET() {
  try {
    const list = await getEvents();
    return NextResponse.json({ success: true, events: list });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, title_mr, content, content_mr, featured_image, published_date } = body;

    if (!title || !content || !featured_image || !published_date) {
      return NextResponse.json({ success: false, error: 'Title, content, featured image, and published date are required' }, { status: 400 });
    }

    const newEvt = await createEvent({
      title,
      title_mr: title_mr || '',
      content,
      content_mr: content_mr || '',
      featured_image,
      published_date,
    });

    if (!newEvt) throw new Error('Creation failed');

    return NextResponse.json({ success: true, event: newEvt });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json({ success: false, error: 'Id and updates are required' }, { status: 400 });
    }

    const updated = await updateEvent(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Event not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, event: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Id is required' }, { status: 400 });
    }

    const success = await deleteEvent(id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Event not found or deletion failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
