import { APPLY_PATH } from "../../lib/blog-config";
import { ArrowRight } from "../icons";

// The one call to action a post may place mid-article (seo-engine ctaComponent),
// also shown at the end of every post.
export function ApplyCta() {
  return (
    <aside className="not-prose my-10 rounded-3xl border border-line bg-surface-alt p-6 md:p-8">
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent">The Elite FBA mentorship</p>
      <p className="mt-3 font-display text-[1.4rem] font-medium leading-tight tracking-[-0.02em] text-ink">
        Want a full-time seller looking at your numbers every week?
      </p>
      <p className="mt-3 text-ink-muted">
        Weekly 1-to-1 calls with Jakub, direct messaging between calls, the 9-module course and every SOP he uses.
        Limited places, no upsells.
      </p>
      <a href={APPLY_PATH} className="btn btn-primary mt-5 inline-flex items-center gap-2">
        Apply for the mentorship
        <ArrowRight size={16} />
      </a>
    </aside>
  );
}
