"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

async function getOrigin() {
  const h = await headers();
  return (
    h.get("origin") ??
    (h.get("host") ? `https://${h.get("host")}` : "http://localhost:3000")
  );
}

/* ------------------------------------------------------------------ */
/* Magic link                                                         */
/* ------------------------------------------------------------------ */

export type MagicLinkState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "error"; message: string };

export async function signInWithMagicLink(
  _prev: MagicLinkState,
  formData: FormData,
): Promise<MagicLinkState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      shouldCreateUser: true,
    },
  });

  if (error) return { status: "error", message: error.message };
  return { status: "success", email };
}

/* ------------------------------------------------------------------ */
/* Password sign-in                                                    */
/* ------------------------------------------------------------------ */

export type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string };

export async function signInWithPassword(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (password.length === 0) {
    return { status: "error", message: "Enter your password." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const msg =
      error.message === "Invalid login credentials"
        ? "That email and password don't match."
        : error.message;
    return { status: "error", message: msg };
  }

  redirect("/dashboard");
}

/* ------------------------------------------------------------------ */
/* Password sign-up                                                    */
/* ------------------------------------------------------------------ */

export type SignUpState =
  | { status: "idle" }
  | { status: "check-email"; email: string }
  | { status: "error"; message: string };

export async function signUpWithPassword(
  _prev: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (password.length < MIN_PASSWORD) {
    return {
      status: "error",
      message: `Password must be at least ${MIN_PASSWORD} characters.`,
    };
  }

  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  // Identities array empty => account already exists with that email.
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      status: "error",
      message: "An account with that email already exists. Try logging in.",
    };
  }

  // If email confirmation is on, no session is returned yet.
  if (!data.session) {
    return { status: "check-email", email };
  }

  redirect("/dashboard");
}
