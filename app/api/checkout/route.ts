import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Optional: parse body if you want to pass dynamic data (e.g., user ID or email)
    // const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Elite FBA System',
              description: 'Full access to the Elite FBA curriculum and community.',
            },
            // Replace this with your actual price (in cents, e.g., 99700 for $997.00)
            unit_amount: 99700, 
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      // You can add metadata here to pass the user's ID for the webhook to use
      // metadata: {
      //   userId: body.userId, 
      // },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
