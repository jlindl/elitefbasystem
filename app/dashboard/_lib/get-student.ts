import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type Student = {
  firstName: string;
  fullName: string;
  initials: string;
  email: string;
  plan: string;
  hasAccess: boolean;
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

export async function getCurrentStudent(): Promise<Student> {
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

  const { displayName, firstName, initials } = deriveDisplay(
    profile?.full_name ?? null,
    user.email ?? "",
  );

  return {
    firstName,
    fullName: displayName,
    initials,
    email: user.email ?? "",
    plan: profile?.has_access ? "Mentorship Member" : "Awaiting Enrollment",
    hasAccess: !!profile?.has_access,
  };
}
