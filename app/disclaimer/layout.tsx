import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Income Disclaimer | Elite FBA",
  description:
    "Elite FBA income disclaimer: no guarantee of earnings, examples are illustrative only, and your results depend on your own execution and market conditions.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerLayout({ children }: { children: ReactNode }) {
  return children;
}
