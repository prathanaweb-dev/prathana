import { NextResponse } from 'next/server';
import { recordDonation } from '@/lib/db';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { amount, campaignId, donorName, donorEmail } = await request.json();

    if (!amount || !campaignId || !donorName || !donorEmail) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      // Real Razorpay integration
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: Math.round(Number(amount) * 100), // amount in paisa
        currency: 'INR',
        receipt: `rcpt_${Math.random().toString(36).substring(2, 9)}`,
      };

      const order = await razorpay.orders.create(options);

      // Record pending donation in database
      await recordDonation({
        campaign_id: campaignId,
        donor_name: donorName,
        donor_email: donorEmail,
        amount: Number(amount),
        payment_id: order.id,
        payment_status: 'pending',
      });

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: 'INR',
        keyId: keyId,
        mock: false,
      });
    } else {
      // Mock / Simulation mode (credentials not configured)
      const mockOrderId = `order_mock_${Math.random().toString(36).substring(2, 9)}`;

      // Record pending donation in database
      await recordDonation({
        campaign_id: campaignId,
        donor_name: donorName,
        donor_email: donorEmail,
        amount: Number(amount),
        payment_id: mockOrderId,
        payment_status: 'pending',
      });

      return NextResponse.json({
        success: true,
        orderId: mockOrderId,
        amount: Math.round(Number(amount) * 100),
        currency: 'INR',
        keyId: 'rzp_test_mock_keys',
        mock: true,
      });
    }
  } catch (error: any) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
