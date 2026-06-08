export function BoxSpecCard() {
  return (
    <div className="my-8 rounded-2xl border-2 border-line bg-gradient-to-br from-slate-50 via-surface to-lime-50/30 p-5 md:p-6">
      <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle mb-1">
        📦 Outer Box Rules
      </p>
      <p className="text-[0.85rem] text-ink-muted mb-5">
        Amazon enforces two hard limits on every outer box you send into FBA.
        Stay inside both and the box passes receiving without flags. Cross
        either and the shipment can be refused at the warehouse door, or
        Amazon will charge you a non-compliance fee to handle it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border-2 border-lime-300 bg-white p-5">
          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-lime-700 mb-2">
            Maximum dimensions
          </p>
          <p className="font-display text-3xl font-bold text-ink leading-none">
            63.5 cm
          </p>
          <p className="text-[0.88rem] text-ink-muted leading-snug mt-1">
            on the longest single side
          </p>
          <p className="text-[0.85rem] text-ink leading-relaxed mt-3">
            No single edge of the outer box can exceed 63.5 cm (25 inches).
            That applies to the longest side; the other two can be shorter.
            For most multipack bundles this is plenty of room; only oversized
            categories run into this limit.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-lime-300 bg-white p-5">
          <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-lime-700 mb-2">
            Maximum weight
          </p>
          <p className="font-display text-3xl font-bold text-ink leading-none">
            23 kg
          </p>
          <p className="text-[0.88rem] text-ink-muted leading-snug mt-1">
            including the box itself, packed
          </p>
          <p className="text-[0.85rem] text-ink leading-relaxed mt-3">
            The complete packed box, with all polybagged units inside and the
            tape sealing it, must weigh 23 kg or less on a scale. If it
            weighs more, split the shipment into two smaller boxes.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border-2 border-amber-400 bg-amber-50 p-5">
        <div className="flex items-start gap-4">
          <span className="text-4xl leading-none flex-shrink-0">⚠️</span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-amber-800 mb-1">
              The 15 kg rule
            </p>
            <h4 className="font-display text-lg font-bold text-amber-900 leading-tight">
              Any box over 15 kg needs a Heavy Package warning label
            </h4>
            <p className="text-[0.9rem] text-amber-900 leading-relaxed mt-2">
              If your packed box weighs more than 15 kg (and up to the 23 kg
              maximum), Amazon requires a bright black-and-yellow Heavy
              Package warning sticker applied to the outside of the box. The
              sticker tells the carrier and the warehouse staff to lift it as
              a two-person job. A box over 15 kg without this label can be
              refused on arrival, and you pay both the return shipping and a
              non-compliance fee.
            </p>
            <div className="mt-3 rounded-lg bg-white border border-amber-200 px-3 py-2">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-amber-800 mb-1">
                The simple rule of thumb
              </p>
              <p className="text-[0.85rem] text-amber-900 leading-snug">
                Under 15 kg: ship as normal. 15 to 23 kg: apply the Heavy
                Package label before handing the box to the carrier. Over 23
                kg: split into two boxes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-lg border-l-4 border-blue-500 bg-blue-50 px-4 py-3">
        <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-blue-700 mb-1">
          💡 Packing tip
        </p>
        <p className="text-[0.88rem] text-blue-900 leading-relaxed">
          Pack the box so the contents do not move when you shake it gently.
          Use kraft paper or air pillows to fill any empty space. A box that
          rattles in transit damages your bundles and damages your account
          health when customers receive crushed units.
        </p>
      </div>
    </div>
  );
}
