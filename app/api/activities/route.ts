import { NextResponse } from 'next/server';
import { getActivities, createActivity, updateActivity, deleteActivity } from '@/lib/db';

export async function GET() {
  try {
    const list = await getActivities();
    return NextResponse.json({ success: true, activities: list });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, title_mr, description, description_mr, image, category } = body;

    if (!title || !description || !image || !category) {
      return NextResponse.json({ success: false, error: 'Title, description, image, and category are required' }, { status: 400 });
    }

    const newAct = await createActivity({
      title,
      title_mr: title_mr || '',
      description,
      description_mr: description_mr || '',
      image,
      category,
    });

    if (!newAct) throw new Error('Creation failed');

    return NextResponse.json({ success: true, activity: newAct });
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

    const updated = await updateActivity(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Activity not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, activity: updated });
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

    const success = await deleteActivity(id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Activity not found or deletion failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
