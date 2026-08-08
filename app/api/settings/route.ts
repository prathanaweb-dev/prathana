import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error('API /settings GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { upiId, bankName, accountName, accountNumber, ifscCode, branch } = body;

    const updated = await updateSettings({
      upiId,
      bankName,
      accountName,
      accountNumber,
      ifscCode,
      branch
    });

    if (updated) {
      return NextResponse.json({ success: true, settings: updated });
    }
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  } catch (error: any) {
    console.error('API /settings POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
