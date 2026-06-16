import { NextResponse } from 'next/server';
import { updateDonationStatus } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: 'Missing payment details' },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if it's a simulated order (or if API keys are not configured)
    if (razorpay_order_id.startsWith('order_mock_') || !keySecret) {
      // Simulation verification success
      const updated = await updateDonationStatus(razorpay_order_id, 'success', razorpay_payment_id);
      
      if (!updated) {
        return NextResponse.json(
          { error: 'Donation record not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully (Simulated)',
        donation: updated,
      });
    }

    // Real Razorpay signature verification
    if (!razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing payment signature' },
        { status: 400 }
      );
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body.toString())
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (isSignatureValid) {
      // Signature is valid, update donation record to success
      const updated = await updateDonationStatus(razorpay_order_id, 'success', razorpay_payment_id);

      if (!updated) {
        return NextResponse.json(
          { error: 'Donation record not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        donation: updated,
      });
    } else {
      // Signature invalid, mark donation failed
      await updateDonationStatus(razorpay_order_id, 'failed');
      
      return NextResponse.json(
        { error: 'Invalid signature. Payment verification failed.' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
