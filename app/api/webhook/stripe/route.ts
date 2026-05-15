import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

// Required for Stripe Webhooks to access the raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      
      console.log('Checkout session completed:', checkoutSessionCompleted);

      // TODO: Handle post-purchase fulfillment here
      // For example, grant the user access in Supabase:
      // const customerEmail = checkoutSessionCompleted.customer_details?.email;
      // const userId = checkoutSessionCompleted.metadata?.userId;
      // await supabase.from('profiles').update({ has_access: true }).eq('id', userId);
      
      break;
    
    // Add other event types here if needed (e.g., payment_intent.succeeded)

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse('Webhook processed successfully', { status: 200 });
}
