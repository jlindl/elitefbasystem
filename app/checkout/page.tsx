import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CheckoutForm } from "./_components/checkout-form";
import { CheckoutRedirect } from "./_components/checkout-redirect";

export const metadata: Metadata = {
  title: "Enroll - EliteFBA",
  description: "Create your account and join the Elite FBA mentorship.",
};

export default async function CheckoutPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-surface-alt pt-28 pb-20 px-6">
      <div className="mx-auto max-w-[460px]">
        <Link
          href="/"
          className="inline-block font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-ink mb-8"
        >
          EliteFBA<span className="text-accent">.</span>
        </Link>

        {user ? <CheckoutRedirect /> : <CheckoutForm />}

        <p className="mt-6 text-center font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-subtle">
          Secured by Stripe · 30-day money-back guarantee
        </p>
      </div>
    </main>
  );
}
