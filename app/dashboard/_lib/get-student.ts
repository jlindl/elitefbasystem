import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validatePersonName } from "./person-name";

export type Student = {
  /** Supabase auth user id. */
  id: string;
  firstName: string;
  fullName: string;
  initials: string;
  email: string;
  plan: string;
  hasAccess: boolean;
  /** ISO timestamp the account was created. */
  memberSince: string;
  /** False when the name is only derived from the email address (no profile name saved yet). */
  nameIsSet: boolean;
};

function deriveDisplay(fullName: string | null, email: string) {
  const name = fullName?.trim() || email.split("@")[0] || "there";
  const parts = name.split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "there";
  const initials =
    parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : (parts[0]?.slice(0, 2) ?? "").toUpperCase();
  return { displayName: name, firstName, initials };
}

/** The signed-in student (redirects home if signed out). Shared by everything in one request. */
export const getCurrentStudent = cache(async (): Promise<Student> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, has_access")
    .eq("id", user.id)
    .single();

  // Names saved before validation existed (e.g. at sign-up) only count if they pass it.
  const checked = profile?.full_name ? validatePersonName(profile.full_name) : null;
  const savedName = checked?.ok ? checked.name : null;
  const { displayName, firstName, initials } = deriveDisplay(savedName, user.email ?? "");

  return {
    id: user.id,
    firstName,
    fullName: displayName,
    initials,
    email: user.email ?? "",
    plan: profile?.has_access ? "Mentorship Member" : "Full Plan",
    hasAccess: !!profile?.has_access,
    memberSince: user.created_at,
    nameIsSet: !!savedName,
  };
});
