import { NextResponse } from 'next/server';
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/db';

export async function GET() {
  try {
    const list = await getProjects();
    return NextResponse.json({ success: true, projects: list });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, image, status } = body;

    if (!title || !description || !image || !status) {
      return NextResponse.json({ success: false, error: 'Title, description, image, and status are required' }, { status: 400 });
    }

    const newProj = await createProject(body);

    if (!newProj) throw new Error('Creation failed');

    return NextResponse.json({ success: true, project: newProj });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Id is required' }, { status: 400 });
    }

    const updated = await updateProject(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Project not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
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

    const success = await deleteProject(id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Project not found or deletion failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
