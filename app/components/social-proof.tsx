const features = [
  "FORBES",
  "ECOMCREW",
  "SELLERSESSIONS",
  "AMZ ADVISERS",
  "HELIUM 10",
  "JUNGLE SCOUT",
];

export function SocialProof() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-10 md:py-12">
        <p className="label-mono text-center mb-7">As featured in</p>

        {/* desktop grid */}
        <ul className="hidden md:grid grid-cols-6 items-center gap-x-8">
          {features.map((name) => (
            <li
              key={name}
              className="font-display text-center font-medium tracking-[0.16em] text-ink-subtle hover:text-ink transition-colors duration-200 text-[0.95rem]"
            >
              {name}
            </li>
          ))}
        </ul>

        {/* mobile marquee */}
        <div className="md:hidden overflow-hidden">
          <div className="marquee-track flex gap-12 whitespace-nowrap will-change-transform">
            {[...features, ...features].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display font-medium tracking-[0.16em] text-ink-subtle text-[0.95rem]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
