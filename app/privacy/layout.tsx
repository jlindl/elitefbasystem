import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | Elite FBA",
  description:
    "How Elite FBA, run by JMW Holdings Group Limited, collects, uses and protects your personal information across our website and mentorship programmes.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
