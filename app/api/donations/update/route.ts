import { NextResponse } from 'next/server';
import { updateDonationStatus } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donation_id, status } = body;

    if (!donation_id || !status) {
      return NextResponse.json(
        { error: 'donation_id and status are required' },
        { status: 400 }
      );
    }

    if (status !== 'success' && status !== 'failed') {
      return NextResponse.json(
        { error: 'Invalid status. Must be success or failed.' },
        { status: 400 }
      );
    }

    const updated = await updateDonationStatus(donation_id, status);
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Donation not found or failed to update' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, donation: updated });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
