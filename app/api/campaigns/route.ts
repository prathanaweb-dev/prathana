import { NextResponse } from 'next/server';
import { getCampaigns, createCampaign, updateCampaign } from '@/lib/db';

export async function GET() {
  try {
    const campaigns = await getCampaigns();
    return NextResponse.json({ success: true, campaigns });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, goal_amount, image } = await request.json();

    if (!title || !description || !goal_amount) {
      return NextResponse.json(
        { error: 'Missing required campaign details' },
        { status: 400 }
      );
    }

    const campaign = await createCampaign({
      title,
      description,
      goal_amount: Number(goal_amount),
      image: image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    });

    if (!campaign) {
      return NextResponse.json(
        { error: 'Failed to create campaign' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, campaign });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create campaign' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, updates } = await request.json();

    if (!id || !updates) {
      return NextResponse.json(
        { error: 'Missing required update parameters' },
        { status: 400 }
      );
    }

    const campaign = await updateCampaign(id, updates);

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found or failed to update' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, campaign });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update campaign' },
      { status: 500 }
    );
  }
}

