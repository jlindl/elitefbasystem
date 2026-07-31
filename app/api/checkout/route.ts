import { NextResponse } from 'next/server';

// Online checkout is disabled. Enrolment now happens through a direct
// WhatsApp conversation with Jakub, so this endpoint no longer creates
// Stripe sessions. Kept as an explicit 410 so any stale client that still
// POSTs here gets a clear answer instead of a payment link.
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Online checkout is closed. Message Jakub on WhatsApp (+44 7765 977085) to enrol.',
      whatsapp: 'https://wa.me/447765977085',
    },
    { status: 410 },
  );
}
