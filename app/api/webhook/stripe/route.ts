import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

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
      const session = event.data.object;

      try {
        const userId = session.metadata?.userId;
        const email = session.customer_details?.email;

        if (!userId) {
          console.error('No userId in metadata');
          break;
        }

        // Grant user access by updating their profile
        const { error } = await supabase
          .from('profiles')
          .update({ has_access: true })
          .eq('id', userId);

        if (error) {
          console.error('Failed to grant access:', error);
        } else {
          console.log(`Access granted to user ${userId} (${email})`);
        }
      } catch (err) {
        console.error('Error processing checkout session:', err);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse('Webhook processed successfully', { status: 200 });
}
