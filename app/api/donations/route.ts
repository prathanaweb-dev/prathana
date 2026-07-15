import { NextResponse } from 'next/server';
import { getDonations, getAggregatedStats, recordDonation } from '@/lib/db';

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { campaign_id, donor_name, donor_email, amount, payment_id, payment_status } = body;

    if (!campaign_id || !donor_name || !donor_email || !amount || !payment_id) {
      return NextResponse.json(
        { error: 'campaign_id, donor_name, donor_email, amount and payment_id are required' },
        { status: 400 }
      );
    }

    const donation = await recordDonation({
      campaign_id,
      donor_name,
      donor_email,
      amount: Number(amount),
      payment_id,
      payment_status: payment_status || 'pending',
    });

    if (!donation) {
      return NextResponse.json({ error: 'Failed to record donation' }, { status: 500 });
    }

    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
