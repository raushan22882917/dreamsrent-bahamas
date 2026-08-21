import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_51MockBahamasLuxuryDriveSecretKey2026';
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-02-24.acacia' as any
});

export async function POST(req: Request) {
  try {
    const { amount, vehicleTitle, customerEmail, reservationNumber } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid amount' }, { status: 400 });
    }

    // Amount in cents
    const amountInCents = Math.round(Number(amount) * 100);

    // If live Stripe key is configured, create real payment intent
    if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('Mock')) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        metadata: {
          reservationNumber: reservationNumber || `DR-${Date.now()}`,
          vehicleTitle: vehicleTitle || 'Rental Vehicle',
          customerEmail: customerEmail || 'customer@bahamasluxurydrive.com'
        },
        automatic_payment_methods: { enabled: true }
      });

      return NextResponse.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    }

    // Mock Client Secret for prototyping / testing when no secret key is set in environment
    const mockPaymentIntentId = `pi_mock_${Date.now()}_bahamasluxurydrive`;
    const mockClientSecret = `${mockPaymentIntentId}_secret_test`;

    return NextResponse.json({
      success: true,
      clientSecret: mockClientSecret,
      paymentIntentId: mockPaymentIntentId,
      amount: amountInCents / 100,
      currency: 'usd'
    });
  } catch (error: any) {
    console.error('Stripe Payment Intent Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
