import { NextResponse } from 'next/server';
import { getDonations, getAggregatedStats } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId') || undefined;
    const statsRequested = searchParams.get('stats') === 'true';

    if (statsRequested) {
      const stats = await getAggregatedStats();
      return NextResponse.json({ success: true, stats });
    }

    const donations = await getDonations(campaignId);
    return NextResponse.json({ success: true, donations });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}
