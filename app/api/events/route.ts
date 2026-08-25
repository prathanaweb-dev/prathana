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
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    const newEvt = await createEvent(body);
    if (!newEvt) throw new Error('Creation failed');

    return NextResponse.json({ success: true, event: newEvt });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const id = body.id;
    const updates = body.updates ? body.updates : { ...body };
    delete updates.id;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Id is required' }, { status: 400 });
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
